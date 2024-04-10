"use strict"

// import BootRom from "./prom/boot-rom.ts"
import BootRom from "./prom/hello.ts"
import Risc5 from "./risc5.ts"
import Terminal from "./term.ts"

const canvas = document.getElementById("screen")
const term = new Terminal(canvas as HTMLCanvasElement)

const ram = new Int32Array(1024 * 1024 / 4)
const rom = BootRom

let cpu = new Risc5(ram, rom, {terminal: term})

term.loadFont().then(
    () => {
        for (let i = 0; i < 200; i++) {
            cpu.step()
        }
    }
)
