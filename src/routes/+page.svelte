

<script lang="ts">
    import Panel from "../Components/Panel.svelte";
    import Section from "../Components/Section.svelte";
    import Button from "../Components/Button.svelte";
    import Dummy from "../Components/Dummy.svelte";
    import Whitebox from "../Components/Whitebox.svelte";
</script>


<div class="big-container">
    <div class="sidebar">
        <Panel label="Explore" >
            <div style="display: flex; flex-direction: column; padding: 10px; gap: 2rem; margin-top: 1rem;">
                <Section label="About Me">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem">
                        <Button>Who I Am</Button>
                        <Button>What I’m Into Now</Button>
                        <Button>What I’m Exploring</Button>
                        <Button>Interests & Hobbies</Button>
                    </div>
                </Section>
                <Section label="Projects">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem">
                    </div>
                </Section>
            </div>
        </Panel>
    </div>
    <main>
        <div>
            <h1 class="hi-msg">Hi,<br>Im Yashraj</h1>
        </div>
        <p class="my-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
        </p>
        <div style="display: flex;">
            <Panel label="Tech Stacks & Frameworks">
                <Whitebox>
                    <ul class="tech-stack-showcase">
                        <li>Java</li>
                        <li>C</li>
                        <li>C++</li>
                    </ul>
                </Whitebox>
            </Panel>
        </div>
        <Dummy />
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
        width: 28%;
        display: flex;
    }

    main {
        flex: 1;
        padding: 4rem 10rem 4rem 2rem;
        overflow-y: auto;
    }

    .hi-msg {
        font-size: 7rem;
        margin: 50px 0 0 100px;
    }

    .my-description {
        text-align: justify;
        margin-top: 4rem;
    }

    .tech-stack-showcase {
       display: inline-flex;
       animation: animMarquee 10s linear infinite;
       padding: 0;
       margin: 0;
       list-style: none;
       gap: 2rem;
    }

    .tech-stack-showcase li {
       flex-shrink: 0;
       font-size: 1.2rem;
    }

    @keyframes animMarquee {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
</style>
