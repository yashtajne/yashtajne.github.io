<script>
  import { onMount } from 'svelte'
  import { snapshot, API } from './lib/repos.js'

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
    <span>oct 2026 · third rewrite of this page · <a href="https://github.com/yashtajne">github.com/yashtajne</a></span>
  </div>
  <hr class="masthead-rule" />

  <h1>I write C that avoids libc.</h1>
  <p class="standfirst">
    My name is Yash. Most of what I do is small, freestanding systems code —
    compiled with <code>clang -nostdlib -ffreestanding</code>, no libc to hide behind.
    Three things take up most of my time: <a href="https://github.com/yashtajne/Pure">Pure</a>,
    <a href="https://github.com/yashtajne/PureShell">PureShell</a>, and
    <a href="https://github.com/yashtajne/VIRE">VIRE</a>. The rest is below, in roughly
    decreasing order of how much I still think about it.
  </p>

  <ol class="contents">
    <li><span class="n">01</span> <a href="#currently">what i'm working on</a></li>
    <li><span class="n">02</span> <a href="#projects">everything else, with a filter</a></li>
    <li><span class="n">03</span> <a href="#how">how i build</a></li>
    <li><span class="n">04</span> <a href="#contact">contact</a></li>
  </ol>

  <h2 id="currently"><span class="sec-no">01</span> What I'm working on</h2>
  <p class="section-note">Three projects. All C. All on purpose without the standard library.</p>

  <div class="entry">
    <div class="entry-head">
      <h3><span class="idx">001</span> <a href="https://github.com/yashtajne/Pure">Pure</a></h3>
      <span class="entry-meta">C · updated oct 11 · the base layer</span>
    </div>
    <p>
      A cross-platform C runtime to replace the parts of libc I actually need.
      Exact-width integers, my own <code>bool</code>, size macros, platform detection
      for Windows / Linux / macOS — one <code>Pure.h</code> plus
      <code>Interface / Implementation / Platform / Compiler</code> directories and a
      <code>Build.py</code> driver. Everything else I write sits on this.
    </p>
    <div class="margin-note">I got tired of include-path soup, so includes are relative. No <code>-I</code> flags. Minor hill, willing to die on it.</div>
    <div class="clone">git clone https://github.com/yashtajne/Pure.git</div>
  </div>

  <div class="entry">
    <div class="entry-head">
      <h3><span class="idx">002</span> <a href="https://github.com/yashtajne/PureShell">PureShell</a></h3>
      <span class="entry-meta">C · updated oct 11 · links -lPureCore -lPureStd</span>
    </div>
    <p>
      A shell that runs on Pure and nothing else. Prompt looks like
      <code>PS &lt;cwd&gt;&gt;</code>. Four builtins — <code>exit, clean, clear, cd</code> —
      everything else is spawned as a process. Separate commands with <code>;</code>.
      Parser in <code>Lang/</code>, execution in <code>Program/</code>, build with
      <code>build.bat</code> into <code>Shell.exe</code>.
    </p>
    <ul>
      <li><code>clean</code> clears the visible window, <code>clear</code> clears scrollback too. Yes, they're different. No, I won't merge them.</li>
      <li>Bare <code>cd</code> prints where you are. Old habit from somewhere, keeping it.</li>
    </ul>
    <div class="clone">git clone https://github.com/yashtajne/PureShell.git</div>
  </div>

  <div class="entry">
    <div class="entry-head">
      <h3><span class="idx">003</span> <a href="https://github.com/yashtajne/VIRE">VIRE</a></h3>
      <span class="entry-meta">C · MIT · the long one</span>
    </div>
    <p>
      <strong>Virtual Isolated Runtime Environment.</strong> A virtual <em>hardware</em>
      emulator, not a container — custom 64-bit ISA, 16 registers, three privilege
      levels, virtual RAM / disk / console / timer / NIC. The idea is that a guest
      Linux eventually runs on top. Currently: CPU interpreter, sparse virtual memory,
      and an assembler work; devices are next.
    </p>
    <ul>
      <li>Fixed 32-bit little-endian instructions. <code>ecall, ebreak, mret, wfi</code> included.</li>
      <li>Headers in <code>Include/VenV/</code> (<code>ISA.h, CPU.h, Memory.h, Device.h…</code>), impl in <code>Src/</code>.</li>
      <li>Phase list is in the repo readme — devices, then console/disk I/O, then networking, then the Linux port. Slow on purpose.</li>
    </ul>
    <div class="clone">git clone https://github.com/yashtajne/VIRE.git</div>
  </div>

  <h2 id="projects"><span class="sec-no">02</span> Everything else</h2>
  <p class="section-note">
    Pulled from github — {live ? 'live copy' : 'committed copy'}. Forks (a dozen Geektoberfest repos)
    are hidden unless you ask. {#if followers !== null}One follower at last count, hi.{/if}
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

  <h2 id="how"><span class="sec-no">03</span> How I build</h2>
  <p class="section-note">Short version, since the repos already show it.</p>
  <div class="two-col">
    <ul>
      <li><strong>Languages:</strong> C first, then Rust, some C++, Java, Python, shell, JS when needed.</li>
      <li><strong>Systems bits:</strong> Win32, X11 (see <a href="https://github.com/yashtajne/oblivian">oblivian</a>, a minimal WM), MMIO, assemblers.</li>
    </ul>
    <ul>
      <li><strong>Toolchain:</strong> clang or gcc, C99, <code>-nostdlib -ffreestanding</code>. Batch files on Windows, shell elsewhere.</li>
      <li><strong><span class="strike">Docker</span>:</strong> VIRE emulates the machine; the guest OS does the OS part. Different layer, on purpose.</li>
    </ul>
  </div>

  <h2 id="contact"><span class="sec-no">04</span> Contact</h2>
  <p>
    Best way is GitHub — open an issue on whichever repo it concerns, I read them.
    Profile: <a href="https://github.com/yashtajne">github.com/yashtajne</a>.
    Currently open to work; low-level C / systems stuff is what I'm good for.
  </p>

  <div class="colophon">
    <p>colophon — set in Georgia + monospace. built with svelte 5 + vite, installed and built with bun.</p>
    <p>no tracking, no cookies, no framework-in-the-browser beyond svelte. this page is a static build; the repo list re-fetches live.</p>
    <p><a href="./">top</a> · <a href="https://github.com/yashtajne?tab=repositories">all repos</a> · .nojekyll included so /data paths serve raw on pages</p>
  </div>
</div>
