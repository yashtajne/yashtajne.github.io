


<script lang="ts">
    import Button from "../Components/Button.svelte";
    let { label = "" }: { label: string } = $props();
</script>



<panel>
    <h3><span style="margin-left: 5px;">{label}</span><Button>✖</Button></h3>
    <slot></slot>
</panel>



<style>
    panel {
        background-color: var(--bg1);
        border-top: 2px solid var(--c1);
        border-left: 2px solid var(--c1);
        border-right: 2px solid black;
        border-bottom: 2px solid black;
        padding: 0.2rem;
        display: flex;
        flex-direction: column;
        margin: 3.5rem 3rem;
        width: 100%;
        box-sizing: border-box;
    }

    h3 {
        margin: 0 0 0.4rem 0;
        background: linear-gradient(to right, var(--bg2), transparent);
        padding: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
