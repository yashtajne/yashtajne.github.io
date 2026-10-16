"""Build public/resume.pdf from src/lib/resume.js content (mirrored below).

Run:  python scripts/make_resume.py
"""
from pathlib import Path
from fpdf import FPDF

OUT = Path(__file__).resolve().parent.parent / "public" / "resume.pdf"

INK = (33, 29, 20)
FADED = (110, 103, 90)
RED = (156, 50, 38)
LINE = (200, 190, 165)


class Resume(FPDF):
    def rule(self):
        self.set_draw_color(*LINE)
        self.set_line_width(0.4)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(3)

    def section(self, title):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*RED)
        self.cell(0, 6, title.upper(), new_x="LMARGIN", new_y="NEXT")
        self.rule()

    def body(self, txt):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*INK)
        self.multi_cell(0, 5.2, txt)
        self.ln(1)

    def bullet(self, txt):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*INK)
        x = self.get_x()
        self.cell(5, 5.2, "-")
        self.multi_cell(0, 5.2, txt)
        self.ln(0.5)


pdf = Resume(format="A4")
pdf.set_margins(18, 16, 18)
pdf.set_auto_page_break(True, margin=16)
pdf.add_page()

pdf.set_font("Helvetica", "B", 22)
pdf.set_text_color(*INK)
pdf.cell(0, 10, "Yash Tajne", new_x="LMARGIN", new_y="NEXT")
pdf.set_font("Helvetica", "", 11)
pdf.set_text_color(*FADED)
pdf.cell(0, 6, "Systems Developer  |  github.com/yashtajne", new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)
pdf.rule()

pdf.section("Summary")
pdf.body(
    "Systems developer working in C, C++, Rust, and Go. Started in web development "
    "and left it for low-level work: freestanding runtimes, shells, emulators, and "
    "desktop tooling. Comfortable with no-libc builds, custom ISAs, and Win32 / Linux / X11 targets."
)

pdf.section("Skills")
pdf.bullet("Languages: C (freestanding C99), C++, Rust, Go; plus Java, Python, Shell, JavaScript from earlier work.")
pdf.bullet("Systems: CPU interpreters, custom ISA design, virtual memory, assemblers, MMIO device models, Win32 API, X11.")
pdf.bullet("Toolchain: Clang / GCC, -nostdlib -ffreestanding builds, batch + shell scripting, Git.")

pdf.section("Selected projects (independent)")
pdf.set_font("Helvetica", "B", 10)
pdf.set_text_color(*INK)
pdf.cell(0, 6, "Pure  --  cross-platform C runtime (github.com/yashtajne/Pure)", new_x="LMARGIN", new_y="NEXT")
pdf.bullet("Freestanding runtime replacing the libc pieces actually needed: exact-width ints, own bool, size macros, Windows/Linux/macOS detection.")
pdf.bullet("Relative includes only, no -I flags; Build.py driver. Base layer for PureShell and VIRE.")

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "PureShell  --  shell on the Pure CRT (github.com/yashtajne/PureShell)", new_x="LMARGIN", new_y="NEXT")
pdf.bullet("Prompt PS <cwd>>, builtins exit / clean / clear / cd, ;-chained commands; parser in Lang/, executor in Program/.")
pdf.bullet("Links -lPureCore -lPureStd and -lkernel32; builds with build.bat into Shell.exe, zero libc.")

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "VIRE  --  virtual hardware emulator, MIT (github.com/yashtajne/VIRE)", new_x="LMARGIN", new_y="NEXT")
pdf.bullet("Custom 64-bit ISA (16 GPRs, 3 privilege levels), sparse virtual RAM, assembler; headers in Include/VenV/, impl in Src/.")
pdf.bullet("Roadmap: console/disk I/O, virtual NIC, then a Linux guest port.")

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "oblivian, Mangobar, cdotenv, todo  --  smaller tools (C / Rust)", new_x="LMARGIN", new_y="NEXT")
pdf.bullet("oblivian: minimal X11 window manager. Mangobar: status bar in C. cdotenv: dotenv reader in C. todo: small Rust todo.")

pdf.section("Open source")
pdf.body("25 public repositories at github.com/yashtajne: systems code plus earlier web/ML experiments and Geektoberfest collaborations.")

pdf.section("Availability")
pdf.body("Open to work -- systems / low-level roles (C, C++, Rust, Go). Contact via GitHub: github.com/yashtajne.")

OUT.parent.mkdir(parents=True, exist_ok=True)
pdf.output(str(OUT))
print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
