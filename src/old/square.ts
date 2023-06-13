class Square {
    container: HTMLElement
    node: HTMLElement
    size: number = 0

    constructor(node: HTMLElement) {
        console.log(node)
        this.node = node;
        this.container = node.parentElement as HTMLElement
        window.addEventListener("resize", this.computeSquare)
        this.computeSquare()
    }

    computeSquare = () => {
        const oldSize = this.size
        const styles = window.getComputedStyle(this.container)
        const h = parseFloat(styles['height'])
        const w = parseFloat(styles['width'])
        this.size = h
        // if w is smaller than h it will be the new size
        if (0 < w && w < h) this.size = w
    
        if (oldSize != this.size) this.computeSize()
    }

    computeSize = () => {
        const outer = window.getComputedStyle(this.node.parentElement as HTMLElement)
        const inner = window.getComputedStyle(this.node)
        const { padding, border, margin } = inner
        const outerPadding = outer.padding
        const extra = parseFloat(padding) + parseFloat(border) + 
                      parseFloat(margin) + parseFloat(outerPadding)
        console.log(extra)
        console.log(this.size)
        const s = Math.round(this.size - 2 * extra) + 'px'
        console.log(s)
        
        this.node.style.height = s
        this.node.style.width = s
    }
}

export default function square(node: HTMLElement) {
    new Square(node)
}