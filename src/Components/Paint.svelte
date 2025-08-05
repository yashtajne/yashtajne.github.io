
<script>
    import Panel from "../Components/Panel.svelte";
    import Button from "../Components/Button.svelte";
    import Whitebox from "../Components/Whitebox.svelte";

    import { onMount } from "svelte";

    let colorPicker;
    let colorPickerBtn;

    onMount(() => {
        colorPicker.addEventListener('input', (event) => {
            console.log('Selected color:', event.target.value);
            colorPickerBtn.style.color = event.target.value;
        });
    })

    let currentTool = $state("PENCIL");

    let canvas;
    let ctx;
    let penY;
    let penX;
    let isDrawing = false;

    onMount(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        console.log("canvas size: ", canvas.height, canvas.width);

        ctx = canvas.getContext("2d");
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
    });

    function startDrawing(e) {
        isDrawing = true;
        [penX, penY] = getMousePos(e);

        if (currentTool === "PENCIL") {
            ctx = canvas.getContext("2d");
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
        }
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(e) {
        if (!isDrawing) return;
        const [x, y] = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(penX, penY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [penX, penY] = [x, y];
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return [
            e.clientX - rect.left,
            e.clientY - rect.top
        ];
    }
</script>


<input bind:this={colorPicker} type="color" style="display:none;">

<Panel label="Paint">
    <div class="paint">
        <div>
            <Button>
                &#x270E;
            </Button>
            <Button>
                &#x232B;
            </Button>
            <Button onClick={() => colorPicker.click()}>
                ⬤
            </Button>
            <Button></Button>
            <Button></Button>
            <Button></Button>
            <Button></Button>
            <Button></Button>
        </div>
        <Whitebox>
            <canvas
                bind:this={canvas}
                onmousedown={startDrawing}
                onmouseup={stopDrawing}
                onmouseleave={stopDrawing}
                onmousemove={draw}
            ></canvas>
        </Whitebox>
    </div>
</Panel>

<style>
    .paint {
        height: 10rem;
        display: flex;
        gap: 5px;
    }

    .paint div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(6, 1fr);
        gap: 5px;
    }

    .paint canvas {
        height: 100%;
        width: 100%;
    }
</style>
