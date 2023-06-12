const eventTypes = `
dblclick, mousedown, mouseenter, mouseleave, mousemove, mouseout, mouseover, mouseup,
touchstart, touchend, touchcancel, touchmove
`
.split(',')
.map(s => s.trim())

class Gesture {
    node: HTMLElement

    constructor(node: HTMLElement) {
        this.node = node;
        // prevent default events
        eventTypes.forEach(eventType => node.addEventListener(eventType, event => event.preventDefault()))
        node.addEventListener("mousedown", this.down)
    }

    down = (e: MouseEvent | TouchEvent) => {
        console.log("Received a down event in gestures")
        type Info = { detail: { e: Event, message: string }} | Event
        const info: Info = {
            detail: {
                e,
                message: "Event: Someone activated a down event"
            }
        }
        const event = new CustomEvent(
            "down",
            info
        )
        this.node.dispatchEvent(event)
    }
}

function gestures(node: HTMLElement) {
    new Gesture(node)
}

export default gestures