'use strict'

class Terminal {
    #ctx: CanvasRenderingContext2D
    #fontImage: HTMLImageElement

    // cursor
    #cursorState = false
    #curX = 0
    #curY = 0

    // video ram
    #videoRam = Array(640 / 8 * 480 / 16)

    constructor(canvas: HTMLCanvasElement) {
        this.#ctx = canvas.getContext("2d")!
        // clear screen
        this.#ctx.fillStyle = "black"
        this.#ctx.fillRect(0, 0, 640, 480);

        // this.loadFont()

        // setInterval(this.#drawCursor, 500)
    }

    async loadFont() {
        // load font
        this.#fontImage = new Image()
        this.#fontImage.src = "img/Main.png"

        return new Promise((resolve, reject) => {
            this.#fontImage.onload = (ev) => {
                resolve(ev)
            }
            this.#fontImage.onerror = (re) => {
                console.log("Font loading err")
                reject(re)
            }
        })
    }

    #drawCursor = () => {
        this.#cursorState = !this.#cursorState
        
        this.#ctx.fillRect(this.#curX * 8, this.#curY * 16, 8, 16);
        this.printChar(this.#videoRam[this.#curX + this.#curY * 80])
        
        if (this.#cursorState) {
            this.printChar(0x281)
        }
    }

    printChar = (code: number) => {
        if (0x400 <= code && code <= 0x500) {
            code -= 0x100
        }
    
        if (code != 0x281) {
            
        }
    
        const fx = (code % 16) * 8
        const fy = ((code / 16) & 0xFFFF) * 16
    
        this.#ctx.drawImage(this.#fontImage, fx, fy, 8, 16, this.#curX * 8, this.#curY * 16, 8, 16)
    }

    putChar = (char: string) => {
        let key = char.codePointAt(0)!
        
        // clear cursor
        this.#ctx.fillRect(this.#curX * 8, this.#curY * 16, 8, 16);
        this.printChar(this.#videoRam[this.#curX + this.#curY * 80])

        // save incoming char in videoram
        this.#videoRam[this.#curX + this.#curY * 80] = key
        this.printChar(key)

        this.#curX++
        if (this.#curX >= 640 / 8) {
            this.#curX = 0
            this.#curY++
        }
        if (this.#curY >= 480 / 16) {
            this.#curY = 0
        }
    }

    setXY (x,y) {
        this.#curX = x % 80
        this.#curY = y % 30
    }

    puts (s: string) {
        for (let c of s) {
            this.putChar(c)
        }
    }
}

export default Terminal;