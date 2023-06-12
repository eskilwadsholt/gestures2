<script lang="ts">
    import gestures from "$lib/gestures.js"
	import square from "./square.js"
    
    let container: HTMLElement
    type report = {
        message: string,
        timestamp: Array<number>
    }
    let box: Array<report> = []

    const reportDown = (info: any | { detail: { message: any; }; }) => {
        const now = new Date()
        const h = now.getHours()
        const m = now.getMinutes()
        const s = now.getSeconds()
        const ms = now.getMilliseconds()
        box.push({
            message: info.detail.message as string,
            timestamp: [ h, m, s, ms ]
        })
        box = box.slice(-3)
        console.log(box)
    }

    const formatTime = (i: number, newTime: Array<number>): Array<string> =>  {
        console.log(i)
        let formatted = [ 
            "\xa0\xa0", 
            "\xa0\xa0", 
            "\xa0\xa0", 
            "\xa0\xa0\xa0" 
        ]
        let index = 0
        if (i > 0) {
            const oldTime = box[i - 1].timestamp
            index = timeIndex(oldTime, newTime)
        }
        for (let j = index; j < newTime.length; j++) {
            if (j < 3) formatted[j] = zeroPad(newTime[j], 2)
            else formatted[3] = zeroPad(newTime[3], 3)
        }
        console.log(formatted)
        return formatted
    }

    const timeIndex = (oldTime: Array<number>, newTime: Array<number>) => {
        return oldTime.findIndex((val, i) => newTime[i] != val)
    }

    const zeroPad = (time: number, size: number) => {
        return String(time).padStart(size, '0')
    }
</script>

<main>
    <div class="top blue" bind:this={container}>
        <div 
            class="square red"
            use:gestures
            on:down={reportDown}
            use:square
        />
    </div>
    <div class="bottom red">
        <div 
            class="square blue"
            use:square
        />
    </div>
</main>

{#if box.length}
    <div class="box">
        {#each box as report, i}
            <div class="report">
                <div class="timestamp">
                    {#each formatTime(i, report.timestamp) as t}
                        <div class="time">
                            {t}
                        </div>
                    {/each}
                </div>
                <div class="message">
                    {report.message}
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .box {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border: 2px solid gray;
        padding: 5px;
        background: #fffa;
    }
    .report {
        display: flex;
        gap: 10px;
    }
    .timestamp {
        display: flex;
        font-family: 'Courier New', Courier, monospace;
        background: #aaa;
        color: white;
    }
    .time {
        padding: 2px;
        border: 1px solid white;
    }
    .message {
        flex: 1;
    }
    :global(html, body) {
        height: 100%;
        width: 100%;
        margin: 0;
    }
    main {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
    .top, .bottom {
        position: relative;
        flex: 1;
        margin: 20px;
        padding: 15px;
    }
    .top {
        margin-bottom: 10px;
    }
    .bottom {
        margin-top: 10px;
    }
    .blue {
        background: #8af;
    }
    .red  {
        background: #fac;
    }
    .square {
        position: absolute;
        padding: 15px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid black;
    }
</style>

