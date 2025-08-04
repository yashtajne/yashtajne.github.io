
<script lang="ts">
    let { label = "" }: { label: string } = $props();
</script>

<section>
    <div>
        <span>{label}</span>
        <slot></slot>
    </div>
</section>


<style>
    section {
        position: relative;
    }

    span {
        position: absolute;
        top: -15px;
        left: 25px;
        font-weight: 700;
        background-color: var(--bg1);
        padding: 5px;
        color: #000000BB;
    }

    div {
        border: 3px solid var(--bg2);
        padding: 1rem;
    }
</style>
