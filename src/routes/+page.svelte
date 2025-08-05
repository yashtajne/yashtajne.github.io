

<script>
    import Panel from "../Components/Panel.svelte";
    import Section from "../Components/Section.svelte";
    import Button from "../Components/Button.svelte";
    import Dummy from "../Components/Dummy.svelte";
    import Whitebox from "../Components/Whitebox.svelte";
    import Paint from "../Components/Paint.svelte";

    import { marked } from "marked";

    const md1 = `
# Hi, <br>I'm Yashraj

I'm an Computer engineer from India.
`
</script>


<div class="big-container">
    <div class="sidebar">
        <Panel label="Explore" >
            <div class="explorer">
                <Section label="About Me">
                    <div class="explorer-btns">
                        <Button> 1. Who I Am</Button>
                        <Button> 2. What I’m Into Now</Button>
                        <Button> 3. What I’m Exploring</Button>
                        <Button> 4. Interests & Hobbies</Button>
                    </div>
                </Section>
                <Section label="Projects">
                    <div class="explorer-btns">
                    </div>
                </Section>
            </div>
        </Panel>
    </div>
    <main>
        {@html marked.parse(md1)}
    </main>
</div>


<style>
    .big-container {
        display: flex;
        height: 100%;
        width: 100%;
        background-color: #008080;
    }

    .sidebar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 1fr;
        display: flex;
        padding: 3rem;
        box-sizing: border-box;
    }

    .explorer {
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 2rem;
        margin-top: 1rem;
    }

    .explorer-btns {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    main {
        flex: 1;
        padding: 4rem 10rem 4rem 2rem;
        overflow-y: auto;
        margin-left: 25%;
    }

    @media only screen and (max-width: 768px) {
        .sidebar {
            right: 5px;
            transform: translateX(-100%);
        }
    }
</style>
