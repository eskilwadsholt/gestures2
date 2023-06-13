<script lang="ts">
    import gestures, { type Point, type Info } from "$lib/gestures"

    let points: Array<Point> = []

    const handleDown = (info: Info) => {
        const P = {
            x: info.det
        }
    }
</script>

<main>
    <div class="top blue">

    </div>
    <div 
        class="bottom red"
        use:gestures
        on:down={handleDown}
    >
    </div>
</main>

<style>
    :global(html, body) {
        height: 100%;
        width: 100%;
        margin: 0;
    }
    main {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        background: #0001;
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
</style>
