<script>
  import { onMount } from 'svelte'
  import { snapshot, API } from './lib/repos.js'
  import { resume } from './lib/resume.js'

  let filter = $state('')
  let lang = $state('all')
  let showForks = $state(false)
  let repos = $state(snapshot)
  let live = $state(false)
  let fetchNote = $state('using committed list — fetching live rows from api.github.com…')
  let followers = $state(null)

  let langs = $derived(
    ['all', ...new Set(repos.map((r) => r.language).filter(Boolean)).values()].sort()
  )

  let shown = $derived(
    repos
      .filter((r) => (showForks ? true : !r.fork))
      .filter((r) => (lang === 'all' ? true : r.language === lang))
      .filter((r) => {
        const q = filter.trim().toLowerCase()
        if (!q) return true
        return `${r.name} ${r.description ?? ''} ${r.language ?? ''}`.toLowerCase().includes(q)
      })
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
  )

  onMount(async () => {
    try {
      const res = await fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
      if (!res.ok) throw new Error('http ' + res.status)
      const data = await res.json()
      if (Array.isArray(data) && data.length) {
        repos = data
        live = true
        fetchNote = `live — ${data.length} rows from api.github.com, just now.`
      }
    } catch {
      fetchNote = `live fetch failed (offline or rate-limited) — showing ${snapshot.length} committed rows.`
    }
    try {
      const p = await (await fetch('https://api.github.com/users/yashtajne')).json()
      if (p && typeof p.followers === 'number') followers = p.followers
    } catch { /* not important */ }
  })
</script>

<a class="skip-link" href="#projects">skip to project list</a>

<div class="page">
  <div class="top-line">
    <span>yash tajne — /home/yash</span>
    <span>oct 2026 · fourth rewrite · <a href="https://github.com/yashtajne">github.com/yashtajne</a></span>
  </div>
  <hr class="masthead-rule" />

  <div class="headline-row">
    <h1>Systems developer<span class="red-dot">.</span></h1>
    <span class="stamp" aria-label="systems, not web">ex-web</span>
  </div>
  <p class="standfirst">
    I'm Yash. I work in <strong>C, C++, Rust, and Go</strong> — runtimes, shells,
    emulators, the kind of code that ships without libc. I used to do web development
    and left it. These days most of my time goes to
    <a href="https://github.com/yashtajne/Pure">Pure</a>,
    <a href="https://github.com/yashtajne/PureShell">PureShell</a>, and
    <a href="https://github.com/yashtajne/VIRE">VIRE</a>.
  </p>

  <dl class="glance">
    <div><dt>languages</dt><dd>C · C++ · Rust · Go</dd></div>
    <div><dt>currently</dt><dd>Pure + PureShell + VIRE</dd></div>
    <div><dt>builds with</dt><dd><code>-nostdlib -ffreestanding</code></dd></div>
    <div><dt>resume</dt><dd><a href="./resume.pdf">resume.pdf ↓</a></dd></div>
  </dl>

  <ol class="contents">
    <li><span class="n">01</span> <a href="#currently">the three main projects</a></li>
    <li><span class="n">02</span> <a href="#machine">inside the machine room</a></li>
    <li><span class="n">03</span> <a href="#projects">everything else, with a filter</a></li>
    <li><span class="n">04</span> <a href="#resume">resume</a></li>
    <li><span class="n">05</span> <a href="#contact">contact</a></li>
  </ol>

  <h2 id="currently"><span class="sec-no">01</span> The three main projects</h2>
  <p class="section-note">In dependency order: the runtime, the shell on top of it, the emulator beside it.</p>

  <div class="entry">
    <div class="entry-head">
      <h3><span class="idx">001</span> <a href="https://github.com/yashtajne/Pure">Pure</a></h3>
      <span class="stamp small">base layer</span>
    </div>
    <p class="entry-meta">C · updated oct 11 · <span class="chip c">C</span> cross-platform runtime</p>
    <p>
      The libc replacement for everything I write: exact-width integers, my own
      <code>bool</code>, size macros, platform detection for Windows / Linux / macOS —
      one <code>Pure.h</code> plus <code>Interface / Implementation / Platform / Compiler</code>
      and a <code>Build.py</code> driver.
    </p>
    <pre class="filetree">Pure.h          ← you include this
Interface/      ← what you call
Implementation/ ← what runs
Platform/       ← win32 / linux / macos
Compiler/       ← clang + gcc shims</pre>
    <div class="margin-note">Includes are relative, no <code>-I</code> flags. Minor hill, willing to die on it.</div>
    <div class="clone">git clone https://github.com/yashtajne/Pure.git</div>
  </div>

  <div class="entry">
    <div class="entry-head">
      <h3><span class="idx">002</span> <a href="https://github.com/yashtajne/PureShell">PureShell</a></h3>
      <span class="stamp small">active</span>
    </div>
    <p class="entry-meta">C · updated oct 11 · <span class="chip c">C</span> <span class="chip shell">Win32</span> links <code>-lPureCore -lPureStd</code></p>
    <p>
      A shell that runs on Pure and nothing else. Prompt reads
      <code>PS &lt;cwd&gt;&gt;</code>; four builtins — <code>exit, clean, clear, cd</code> —
      everything else spawns as a process. Commands chain with <code>;</code>.
    </p>
    <pre class="filetree">Shell.c / Shell.h   ← main loop
Lang/               ← parse(), parse_segment()
Program/            ← builtins, cd, launch
build.bat           → Shell.exe</pre>
    <ul>
      <li><code>clean</code> clears the window, <code>clear</code> clears scrollback too. Different things. Staying different.</li>
      <li>Bare <code>cd</code> prints where you are. Old habit, keeping it.</li>
    </ul>
    <div class="clone">git clone https://github.com/yashtajne/PureShell.git</div>
  </div>

  <div class="entry">
    <div class="entry-head">
      <h3><span class="idx">003</span> <a href="https://github.com/yashtajne/VIRE">VIRE</a></h3>
      <span class="stamp small alt">long haul</span>
    </div>
    <p class="entry-meta">C · MIT · <span class="chip c">C</span> <span class="chip emu">emulator</span> virtual hardware, not containers</p>
    <p>
      <strong>Virtual Isolated Runtime Environment.</strong> A custom 64-bit ISA with
      16 registers and three privilege levels, sparse virtual RAM, and an assembler —
      the long-term goal being a Linux guest on top. CPU, memory, and assembler work;
      devices are next.
    </p>
    <pre class="filetree">Include/VenV/   ← ISA.h CPU.h Memory.h Device.h Timer.h Console.h Block.h Net.h
Src/            ← CPU.c Memory.c Assembler.c
Test/           ← test_vire.c</pre>
    <div class="clone">git clone https://github.com/yashtajne/VIRE.git</div>
  </div>

  <h2 id="machine"><span class="sec-no">02</span> Inside the machine room</h2>
  <p class="section-note">The part I'm actually proud of. Fixed-width everything.</p>

  <div class="band">
    <div class="band-col">
      <h3>vire registers</h3>
      <pre>x0        zero, always
x1–x13    general purpose
x14       sp — stack pointer
x15       ra — return address
pc        program counter
status    interrupts + privilege
164-bit regs · 32-bit LE instrs</pre>
    </div>
    <div class="band-col">
      <h3>how anything here builds</h3>
      <pre>clang -nostdlib -ffreestanding
  -o test_vire Test/test_vire.c
  Src/CPU.c Src/Memory.c
  Src/Assembler.c

no libc. the Interface/
layer is the libc.</pre>
    </div>
  </div>

  <h2 id="projects"><span class="sec-no">03</span> Everything else</h2>
  <p class="section-note">
    Pulled from github — {live ? 'live copy' : 'committed copy'}. Forks (a dozen Geektoberfest repos)
    stay hidden unless asked. {#if followers !== null}One follower at last count, hi.{/if}
  </p>

  <div class="prompt-row">
    <span class="ps1">$</span>
    <span>filter</span>
    <input type="search" bind:value={filter} placeholder="try: rust, bar, wm…" aria-label="Filter repositories" />
    <select bind:value={lang} aria-label="Filter by language">
      {#each langs as L}<option value={L}>{L === 'all' ? 'all langs' : L}</option>{/each}
    </select>
  </div>
  <div class="checkline">
    <label><input type="checkbox" bind:checked={showForks} /> include forks</label>
    <span>{shown.length} of {repos.length} shown</span>
  </div>
  <p class="fetchline">{fetchNote}</p>

  <ol class="repo-list">
    {#each shown as r}
      <li>
        <span>
          <a class="r-name" href={r.html_url} target="_blank" rel="noopener">{r.name}</a>{#if r.fork}<span class="forkflag">fork</span>{/if}<br />
          <span class="r-desc">{r.description ?? 'no description — it compiles, that was the bar.'}</span>
        </span>
        <span class="r-side">{r.language ?? '—'} · ★ {r.stargazers_count ?? 0}</span>
      </li>
    {/each}
  </ol>
  {#if !shown.length}<p>Nothing matches. Clear the filter.</p>{/if}

  <h2 id="resume"><span class="sec-no">04</span> Resume</h2>
  <p class="section-note">One page, no padding. The PDF is generated from the same text.</p>

  <article class="resume-card">
    <header>
      <div>
        <strong>{resume.name}</strong>
        <span>{resume.title} · {resume.links[0]}</span>
      </div>
      <a class="btn-paper" href="./resume.pdf" download>resume.pdf ↓</a>
    </header>
    <p>{resume.summary}</p>
    <ul class="r-skills">
      {#each resume.skills as s}<li><strong>{s.k}:</strong> {s.v}</li>{/each}
    </ul>
    <ol class="r-proj">
      {#each resume.projects as p}
        <li><strong>{p.name}</strong> <span>— {p.meta}</span>
          <ul>{#each p.points as pt}<li>{pt}</li>{/each}</ul>
        </li>
      {/each}
    </ol>
    <p class="r-foot">{resume.availability}</p>
  </article>

  <h2 id="contact"><span class="sec-no">05</span> Contact</h2>
  <p>
    GitHub is the fastest way — open an issue on whichever repo it concerns, I read them:
    <a href="https://github.com/yashtajne">github.com/yashtajne</a>.
    Open to systems / low-level work in C, C++, Rust, or Go.
  </p>

  <div class="colophon">
    <p>colophon — Georgia + monospace on paper. svelte 5 + vite, bun-built. resume.pdf is generated by <code>scripts/make_resume.py</code>.</p>
    <p>no tracking, no cookies. repo list re-fetches live; everything else is static.</p>
    <p><a href="./">top</a> · <a href="./resume.pdf">resume</a> · <a href="https://github.com/yashtajne?tab=repositories">all repos</a></p>
  </div>
</div>
