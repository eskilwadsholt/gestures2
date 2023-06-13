import 'svelte/elements'

declare module 'svelte/elements' {
    type DownEventHandler<T extends EventTarget> = EventHandler<MouseEvent | TouchEvent, T>;

    interface DOMAttributes<T extends EventTarget> {
        /**
         * A pointing device (either mouse or touch) is pressed on an element.
         */
        'on:down'?: DownEventHandler<T> | undefined | null
    }
}