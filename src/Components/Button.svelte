


<button>
    <slot></slot>
</button>

<style>
    button {
        background-color: var(--bg1);
        border-top: 2px solid var(--c1);
        border-left: 2px solid var(--c1);
        border-right: 2px solid black;
        border-bottom: 2px solid black;
        padding: 5px 8px;
        cursor: pointer;
        text-align: left;
    }

    button:active {
        border-top: 2px solid black;
        border-left: 2px solid black;
        border-right: 2px solid var(--c1);
        border-bottom: 2px solid var(--c1);
    }
</style>
