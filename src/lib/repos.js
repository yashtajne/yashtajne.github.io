// Committed fallback for when api.github.com rate-limits or is offline.
// Fields: name, description, language, stargazers_count, fork, html_url, updated_at, pushed_at
export const snapshot = [
  { name: 'Pure', description: 'Cross Platform C Runtime library.', language: 'C', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/Pure', updated_at: '2026-10-11' },
  { name: 'PureShell', description: 'Shell Program', language: 'C', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/PureShell', updated_at: '2026-10-11' },
  { name: 'VIRE', description: 'Virtual Isolated Runtime Environment — custom-ISA hardware emulator.', language: 'C', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/VIRE', updated_at: '2026-09-18' },
  { name: 'oblivian', description: 'Minimal Window Manager (X11)', language: 'C', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/oblivian', updated_at: '2026-01-01' },
  { name: 'Mangobar', description: 'status bar, in C', language: 'C', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/Mangobar', updated_at: '2026-01-01' },
  { name: 'cdotenv', description: 'dotenv reader in C', language: 'C', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/cdotenv', updated_at: '2026-01-01' },
  { name: 'todo', description: 'small todo in Rust', language: 'Rust', stargazers_count: 2, fork: false, html_url: 'https://github.com/yashtajne/todo', updated_at: '2026-01-01' },
  { name: 're', description: null, language: 'Rust', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/re', updated_at: '2026-01-01' },
  { name: 'jorge', description: null, language: 'Java', stargazers_count: 1, fork: false, html_url: 'https://github.com/yashtajne/jorge', updated_at: '2026-01-01' },
  { name: 'dotfiles', description: null, language: 'Shell', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/dotfiles', updated_at: '2026-01-01' },
  { name: 'IntentClassExtract', description: null, language: 'C++', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/IntentClassExtract', updated_at: '2026-01-01' },
  { name: 'ML', description: 'ML Lab Practicals', language: 'Jupyter Notebook', stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/ML', updated_at: '2026-10-15' },
  { name: 'quizzy', description: null, language: null, stargazers_count: 0, fork: false, html_url: 'https://github.com/yashtajne/quizzy', updated_at: '2026-01-01' }
]

export const USER = 'yashtajne'
export const API = `https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`
