"use strict"

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

        this.#loadFont()

        setInterval(this.#drawCursor, 500)
    }

    async #loadFont() {
        // load font
        this.#fontImage = new Image()
        this.#fontImage.src = "img/Main.png"

        await new Promise((resolve, reject) => {
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

    putChar = (ev: KeyboardEvent) => {
        let key = ev.key
        this.#ctx.fillRect(this.#curX * 8, this.#curY * 16, 8, 16);
        this.printChar(this.#videoRam[this.#curX + this.#curY * 80])
        switch (key) {
            case "Enter":
                this.#curX = 0
                this.#curY++
                break
            case "Escape":
                // clear screen
                this.#curX = this.#curY = 0
                this.#ctx.fillRect(0, 0, 640, 480)
                break
            case "Shift":
            case "Control":
            case "Alt":
            case "Tab":
                ev.preventDefault()
                break
            default:
                if (key.length < 2) {
                    this.#videoRam[this.#curX + this.#curY * 80] = key
                    this.printChar(key.charCodeAt(0))
                } else {
                    this.printChar(1)
                }
    
                this.#curX++
                if (this.#curX >= 640 / 8) {
                    this.#curX = 0
                    this.#curY++
                }
                if (this.#curY >= 480 / 16) {
                    this.#curY = 0
                }
        }
    }
}

const canvas = document.getElementById("screen")
const term = new Terminal(canvas as HTMLCanvasElement)

window.onkeydown = (ev: KeyboardEvent) => { term.putChar(ev) }

// const logger = document.getElementById("logger")


// canvas.onmousemove = (e) => {
//     logger.innerText = `
//     Offset X/Y: ${e.offsetX}, ${e.offsetY}
//     Viewport X/Y: ${e.clientX}, ${e.clientY}
//     Page X/Y: ${e.pageX}, ${e.pageY}
//     Screen X/Y: ${e.screenX}, ${e.screenY}`;
// }
