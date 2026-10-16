// Single source for the on-page resume preview and scripts/make_resume.py.
// Keep facts to what the repos show — no invented employers, degrees, or emails.
export const resume = {
  name: 'Yash Tajne',
  title: 'Systems Developer',
  links: ['github.com/yashtajne'],
  summary:
    'Systems developer working in C, C++, Rust, and Go. Started in web development and left it for low-level work: freestanding runtimes, shells, emulators, and desktop tooling. Comfortable with no-libc builds, custom ISAs, and Win32 / Linux / X11 targets.',
  skills: [
    { k: 'Languages', v: 'C (freestanding C99), C++, Rust, Go — plus Java, Python, Shell, JavaScript from earlier work' },
    { k: 'Systems', v: 'CPU interpreters, custom ISA design, virtual memory, assemblers, MMIO device models, Win32 API, X11' },
    { k: 'Toolchain', v: 'Clang / GCC, -nostdlib -ffreestanding builds, batch + shell scripting, Git' }
  ],
  projects: [
    {
      name: 'Pure',
      meta: 'C · cross-platform runtime · github.com/yashtajne/Pure',
      points: [
        'Freestanding C runtime replacing the libc pieces actually needed: exact-width ints, own bool, size macros, Windows / Linux / macOS detection.',
        'Relative includes only, no -I flags; Build.py driver. Base layer for PureShell and VIRE.'
      ]
    },
    {
      name: 'PureShell',
      meta: 'C · shell · github.com/yashtajne/PureShell',
      points: [
        'Shell on the Pure CRT only (links -lPureCore -lPureStd, -lkernel32). Prompt PS <cwd>>, builtins exit / clean / clear / cd, ;-chained commands.',
        'Split parser (Lang/) and executor (Program/); builds with build.bat into Shell.exe, zero libc.'
      ]
    },
    {
      name: 'VIRE',
      meta: 'C · MIT · github.com/yashtajne/VIRE',
      points: [
        'Virtual Isolated Runtime Environment: virtual-hardware emulator with a custom 64-bit ISA (16 GPRs, 3 privilege levels), sparse virtual RAM, assembler.',
        'Headers in Include/VenV/ (ISA, CPU, Memory, devices), implementation in Src/; roadmap toward console/disk I/O, NIC, and a Linux guest port.'
      ]
    },
    {
      name: 'oblivian, Mangobar, cdotenv, todo',
      meta: 'C / Rust · smaller tools',
      points: [
        'oblivian — minimal X11 window manager. Mangobar — status bar in C. cdotenv — dotenv reader in C. todo — small Rust todo (most-starred repo).'
      ]
    }
  ],
  oss: '25 public repositories at github.com/yashtajne — systems code plus earlier web/ML experiments and Geektoberfest collaborations.',
  availability: 'Open to work — systems / low-level roles (C, C++, Rust, Go). Contact via GitHub.'
}
