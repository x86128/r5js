'use strict'

// text tracing enable flag
const tracing = false

// instruction opcodes 
const opMOV = 0,
    opLSL = 1, opASR = 2, opROR = 3,               // shifts
    opAND = 4, opANN = 5, opIOR = 6, opXOR = 7,  // logic 
    opADD = 8, opSUB = 9, opMUL = 10, opDIV = 11, // arith
    opFADD = 12, opFSUB = 13, opFMUL = 14, opFDIV = 15 // floating point (unimplemented)

// consition codes
const
    cMI = 0, cPL = 8,  // negative / positive
    cEQ = 1, cNE = 9,  // equal / not equal
    cCS = 2, cCC = 10, // carry set / carry clear
    cVS = 3, cVC = 11, // overflow set / overflow clear
    cLS = 4, cHI = 12, // less or same, high
    cLT = 5, cGE = 13, // less then / greater
    cLE = 6, cGT = 14, // less or equal / greater then
    cT = 7, cF = 15

const condToStr = {
    0: "MI", 8: "PL",  // negative / positive
    1: "EQ", 9: "NE",  // equal / not equal
    2: "CS", 10: "CC", // carry set / carry clear
    3: "VS", 11: "VC", // overflow set / overflow clear
    4: "LS", 12: "HI", // less or same, high
    5: "LT", 13: "GE", // less then / greater
    6: "LE", 14: "GT", // less or equal / greater then
    7: "T", 15: "F"
}

// ROM addresses
const ROMStartAddress = 0xFFFFF800
const ROMEndAddress = 0xFFFFFFC0

// RAM addresses
const RAMStartAddress = 0x0
const RAMEndAddress = RAMStartAddress + 1024 * 1024

// IO addresses
const IOStartAddress = 0xFFFFFFC0

// get bit b in 31...0 from word w
const bit = (w: number, b: number) => { return (w >>> b) & 1 }
const hex32 = (w: number) => { return `0x${(w >>> 0).toString(16).padStart(8, "0")}` }
class Risc5 {
    private PC: number;
    private R: Int32Array;
    private H: number

    // flags
    private N: boolean
    private Z: boolean
    private C: boolean
    private V: boolean

    // memory
    private ram: Int32Array
    private rom: Int32Array
    private devices: Map<number,object>

    constructor(ram: Int32Array, rom: Int32Array, devices) {
        this.PC = ROMStartAddress / 4
        this.R = new Int32Array(16)
        this.H = 0

        this.N = this.Z = this.C = this.V = false

        this.rom = rom
        this.ram = ram

        this.devices = devices
    }

    reset() {
        this.PC = ROMStartAddress / 4
        this.R = new Int32Array(16)
    }

    loadWord(address: number) {
        let adr = address >>> 0
        if (adr >= 0 && adr < RAMEndAddress)
            return this.ram[adr >> 2]
        else if (adr >= ROMStartAddress && adr < ROMEndAddress)
            return this.rom[(adr - ROMStartAddress) >> 2]
        else if (adr >= IOStartAddress)
            return this.loadIO(adr)
        throw Error(`Reading from void: ${adr}`)
    }

    loadIO(address: number) {
        let adr = address >>> 0
        let res = 0
        if (adr == 0xFFFFFFD4) {
            // spi status always ready
            res = 1
        } else if (adr == 0xFFFFFFC4) {
            // switches
            res = 0
        }
        if (tracing) console.log(`Load IO: Ra <- (${hex32(adr)}) ; ${hex32(res)}`)
        return res
    }

    storeWord(address: number, data: number) {
        let adr = address >>> 0
        if (adr >= 0 && adr < RAMEndAddress)
            this.ram[adr >> 2] = data
        else if (adr >= IOStartAddress)
            this.storeIO(adr, data)
    }

    storeIO(address: number, data: number) {
        let adr = address >>> 0
        if (adr == 0xFFFFFFC4) {
            this.devices["terminal"].setXY(0,29)
            this.devices["terminal"].puts(`LEDs: ${(data & 0xff).toString(2)}`)
            if (tracing) console.log(`LEDs: ${(data & 0xff).toString(2)}`)
        } else if (adr == 0xFFFFFFC8) {
            // rs-232 data
            this.devices["terminal"].puts(String.fromCharCode(data & 0xFFFF))
        } else if (adr == 0xFFFFFFE0) {
            // term set XY
            this.devices["terminal"].setXY(data & 0xFF, data >> 8 & 0xFF)
        }
        if (tracing) console.log(`Store IO: (${adr.toString(16)}) <- ${data.toString(16)}`)
    }

    setReg(Ra: number, A: number) {
        this.R[(Ra >>> 0) & 0xF] = A
        this.N = A < 0
        this.Z = A == 0
    }

    step() {
        let IR = this.loadWord(this.PC << 2) >>> 0 // convert to uint32
        let PC_next = this.PC + 1

        const p = bit(IR, 31)
        const q = bit(IR, 30)
        const u = bit(IR, 29)
        const v = bit(IR, 28)
        const Ra = (IR >>> 24) & 0xF
        const Rb = (IR >>> 20) & 0xF
        const op = (IR >>> 16) & 0xF
        const Rc = IR & 0xF
        let A = this.R[Ra] | 0 // convert to signed
        const B = this.R[Rb] | 0
        let C = 0

        if (tracing) console.log(`${hex32(this.PC << 2)}: IR:${hex32(IR)}`)

        // C = ...
        if (p == 0) {
            if (q == 0) {
                // F0 instruction format C = R.c
                C = this.R[Rc]
            } else {
                // F1 instuctions format C =  imm (or H)
                if (u == 0) {
                    if (v == 0) { C = IR & 0xFFFF } else { C = 0xFFFF0000 | (IR & 0xFFFF) }
                } else {
                    if (v == 0) { C = ((IR & 0xFFFF) << 16) | 0 } else { C = this.H }
                }
            }
        }
        if (p == 0) {
            // register instruction
            switch (op) {
                case opMOV: A = C; break
                case opLSL: A = B << C; break
                case opASR: A = B >> (C & 31); break
                case opROR: A = (B >>> (C ^ 31)) | (B << (32 - (C ^ 31))); break
                case opAND: A = B & C; break
                case opANN: A = B & ~C; break
                case opIOR: A = B | C; break
                case opXOR: A = B ^ C; break
                case opADD: A = B + C; break
                case opSUB: A = B - C; break
                case opMUL: A = B * C; break
                case opDIV: A = B / C; this.H = B % C; break
                default:
                    throw Error(`Unimpl instr: ${hex32(op)}`)
            }
            this.setReg(Ra, A)
        } else if (p == 1 && q == 0) {
            // memory instruction
            let adr = IR & 0xFFFFF
            if (adr > 0x7FFFF) adr -= 0x100000

            if (u == 0) {
                A = this.loadWord(adr + B)
                this.setReg(Ra, A)
            } else {
                this.storeWord(adr + B, A)
            }
        } else {
            // branch instruction
            let cc = Ra
            let t = false
            switch (cc & 7) {
                case cMI: t = this.N; break
                case cEQ: t = this.Z; break
                case cCS: t = this.C; break
                case cVS: t = this.V; break
                case cLS: t = !this.C || this.Z; break
                case cLT: t = this.N != this.V; break
                case cLE: t = (this.N != this.V) || this.Z; break
                case cT: t = true; break
            }
            if (cc > 7) t = !t

            // if need link
            let link = v == 1
            if (link) { this.R[15] = PC_next << 2 }

            let off = IR & 0x00FFFFFF
            if (off >= 0x00800000) { off -= 0x01000000 }

            if (t) {
                if (u == 0) {
                    PC_next = this.R[Rc] >> 2
                } else {
                    PC_next = PC_next + off
                }
            }
        }
        this.PC = PC_next
    }
}


export default Risc5;
