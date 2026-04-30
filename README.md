# Agentic Developer Portal

**Live Demo:** https://agentic-developer-portal-five.vercel.app/

**Wireframes + UX Explanation:** https://github.com/benrondeau/agentic-developer-portal/tree/main/wireframes

## UX Overview

The user interface is comprised of the following elements:

### NavBar

- **Org switcher** (left) opens a left-side drawer to switch orgs.
- **Active-agent counter** (right) shows the number of running agents across all repos. Clicking it opens the global agents drawer (right side). A green dot pulses when at least one agent is running.
- **Theme toggle** flips between light and dark; the choice is persisted to `localStorage` and respects `prefers-color-scheme` on first load.

### Repo list (left pane)

- Filter chips at the top (language, health, etc.) plus a free-text search box.
- Each row shows the repo's language icon, name, last-push label, file count, open-PR count, and any warn flags from the underlying repo data.
- Clicking a row navigates to `/repo/<slug>` and selects it as the active repo.

### Insights panel (center pane)

The center pane is the per-repo dashboard and shows everything you'd want before launching an agent:

- **Repo header** — language badge, repo name, last-push timestamp, file count, and a **branch dropdown**. Selecting a branch updates `?branch=<name>` in the URL and re-derives every section below from a per-branch "personality" profile (release/develop/feat/hotfix vs. main): file count, last-push time, the 6 stat tiles, AI suggestions, and recent runs all change.
- **At-a-glance stats** — open PRs, open issues, test coverage, dep issues, code health, and CI pass rate. Tiles tinted orange when warning thresholds trip (coverage <75%, dep issues >4, etc.).
- **AI Suggestions** — context-aware prompts to launch a specific agent. On non-default branches the list is led by a branch-specific suggestion (e.g. on a `hotfix/*` branch: "hotfix ready — open PR to main").
- **Run Agent Task** — a 6-tile grid of available agents (`create-pr`, `refactor`, `sec-scan`, `dep-upgrade`, `run-tests`, `dep-map`). Clicking a tile sets `?launch=<taskId>` to open the confirmation modal.
- **Recent Agent Runs** — historical run rows for the current branch.
- **README** — repo description, getting-started commands, stack chips, contributing notes.
- **Command bar** — slash-command input (e.g. `/upgrade-deps --target=all --auto-pr`) with autocomplete, keyboard nav (`↑/↓` to choose, `Tab` to complete, `Enter` to launch). Resolves to a known task and routes to the launch modal.

### Agent confirmation modal

Launched via `?launch=<taskId>` (from any agent trigger) or `?retry=<taskId>` (from the toolbar's re-run button). Shows the task's bullet plan, estimated tokens (in/out split), estimated cost, estimated duration, and a draft-PR disclaimer.

### Agent activity panel (right pane)

The right pane shows live and recent runs for the **current repo** as tabs.

- **Tab bar** — one tab per visible run, with a status dot (running / done / error / aborted). The active tab auto-scrolls into view when set externally (e.g. from the global drawer).
- **Stale-run banner** — if the URL points at a run that's no longer in this repo (dismissed, deep-link, wrong slug), a banner explains why the latest run is showing instead, with a one-click dismiss.
- **View modes** — toggle between split (steps + log), steps only, or log only.
- **Step list** — checklist of agent steps with current status and details; running steps show a pulse.
- **Live log (Terminal)** — animated terminal output. Lines are added incrementally as the run progresses, with a blinking "working…" line at the tail while running.
- **Run metadata** — token usage, cost, elapsed/duration.
- **Toolbar** — context-sensitive buttons:
  - `running` → **abort** (immediate, marks the run aborted)
  - `done` with a PR result → **view PR #N**
  - `done` with a report result → **view report** (opens the report viewer modal)
  - `error` → **re-run agent** (opens the confirmation modal in retry mode)
  - all states → **copy log** (button flips to "copied!" with a check icon for ~1.5 s on success)
  - non-running → **dismiss** (hides the run from the tab bar but preserves history)

### Global agents drawer

Right-side overlay opened from the NavBar's agent counter. Lists every active and recently-finished run grouped by repo, with a live progress bar and elapsed timer per row. A row of filter chips at the top (`all` / `running` / `done` / `failed`) narrows the list, with live counts shown next to each chip. Clicking any row closes the drawer and navigates to that repo with the clicked agent pre-selected as the active tab — implemented by setting `?run=<id>` on the destination URL.

### Org drawer

Left-side overlay for switching orgs (mocked).

### URL state

State that should survive reload, deep-link, or the back button lives in URL query params. They compose freely:

| Param            | Purpose                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `?branch=<name>` | Currently checked-out branch — drives all per-branch data derivation.          |
| `?run=<id>`      | Currently focused run in the agent panel (set by the drawer or by tab clicks). |
| `?launch=<task>` | Show the launch-confirmation modal for `task`.                                 |
| `?retry=<task>`  | Show the same modal in retry mode (from the agent toolbar).                    |
| `?report=<id>`   | Open the report-artifact viewer for a completed run.                           |
| `?drawer=agents` | Open the global agents drawer.                                                 |
| `?drawer=org`    | Open the org-switcher drawer.                                                  |

All param updates go through a small `useUrlParam(key)` hook ([src/hooks/useUrlParam.ts](src/hooks/useUrlParam.ts)) that reads, writes, and deletes a single param while preserving every other one — a single place to enforce that invariant.

Updates to one param always preserve the others (e.g. switching tabs while on `?branch=develop` keeps the branch).

### Theming

CSS-variable-driven light and dark themes via `data-theme="light|dark"` on `<html>`. The toggle persists to `localStorage`; first load uses `prefers-color-scheme`. All component colors come from `var(--c-*)` tokens.

### Keyboard

- `↑ / ↓` — navigate command-bar suggestions.
- `Tab` — autocomplete the highlighted command.
- `Enter` — launch the resolved or highlighted command.
- `Esc` — close popovers, drawers, modals.

## Technical info

### Stack

| Layer           | Choice                                           |
| --------------- | ------------------------------------------------ |
| Framework       | React 19 (with the React Compiler enabled)       |
| Language        | TypeScript (strict)                              |
| Bundler         | Vite 8 + Rolldown (`@rolldown/plugin-babel`)     |
| Routing         | React Router 7 (data routers, `useSearchParams`) |
| Styling         | Tailwind CSS v4 (CSS-first config) + PostCSS     |
| Linting         | ESLint 10 + `typescript-eslint`                  |
| Package manager | pnpm                                             |

### Project layout

```
src/
├── App.tsx                       # router + providers
├── main.tsx                      # entry
├── routes/
│   ├── Layout.tsx                # 3-pane shell + drawers + modal controller
│   ├── EmptyHome.tsx             # no-repo-selected state
│   └── RepoView.tsx              # reads ?branch=, derives per-branch view
├── components/
│   ├── chrome/                   # NavBar, ThemeToggle
│   ├── repos/                    # RepoList, RepoListItem, filters, search
│   ├── insights/                 # center pane sections
│   ├── agents/                   # right pane (tabs, steps, terminal, toolbar)
│   ├── drawers/                  # GlobalAgentsDrawer, OrgDrawer, DrawerShell
│   ├── modals/                   # AgentConfirmModal, LaunchModalController, ReportModalController
│   └── primitives/               # Button, Badge, Icon, ProgressBar, etc.
├── state/
│   ├── ThemeContext.tsx          # theme provider + persistence
│   └── AgentRuntimeContext.tsx   # the in-memory agent runtime
├── hooks/                        # useTheme, useAgentRuntime, useNow, useUrlParam
├── data/
│   ├── repos.ts                  # repo seed + per-branch view derivation
│   ├── tasks.ts                  # the 6 agent task definitions
│   ├── agentTemplates.ts         # canned step + log script per task
│   ├── seedRuns.ts               # initial runs visible on first load
│   ├── suggestions.ts            # AI suggestions per (repo, branch)
│   └── orgs.ts                   # mocked orgs
├── types/                        # Repo, AgentRun, Task, Suggestion, Org
└── utils/                        # cn, format
```

### The agent runtime

`AgentRuntimeContext` is the heart of the simulation. It exposes a small reducer-backed store with these actions: `launch`, `abort`, `dismiss`, and an internal `tick`. A `setInterval(250 ms)` dispatches `tick`, and the reducer advances every `running` run via `progressRun(run, now)`, which:

1. Computes a target percent from elapsed time vs. the task's estimated duration, plus a small forward jitter (≤ 1.5%) so progress doesn't feel perfectly linear. The result is clamped to be monotonic — pct can only move forward.
2. Looks up the run's template (`templatesByTaskId[taskId]`) for ordered step definitions and a log script.
3. Re-derives step statuses from each step's `doneAtPct` threshold (`pending` → `running` → `done`).
4. Appends any log lines whose `atPct` threshold has now been crossed, plus a blinking `working…` line at the tail.
5. Resolves to `done` at 100% (attaching the template's `successResult` artifact, if any) or to `error` at the template's `failAtPct` (used by the `sec-scan` template to demonstrate failure).

Step transitions, log lines, and the failure outcome are all data, not timers — the only randomness is the per-tick jitter, which can't change the end state. Templates may declare a `successResult` of either `kind: 'pr'` (PR number + title) or `kind: 'report'` (summary + findings); the toolbar surfaces a different button per kind, and the report viewer modal renders the findings list.

### Per-branch data derivation

`getRepoForBranch(repo, branch)` ([src/data/repos.ts](src/data/repos.ts)) projects a per-branch view onto a repo by applying a "branch profile" (one of `develop`, `release/*`, `feat/*`, `hotfix/*`) to the headline numbers. Multipliers and deltas adjust open PRs, open issues, test coverage, dep issues, CI pass rate, file count, last-push label, and warn state. Top-level repo metadata (description, stack, contributing, getting started) stays branch-agnostic.

### Performance

- The React Compiler (`babel-plugin-react-compiler`) handles memoization, so explicit `useMemo` / `useCallback` are largely unnecessary.
- The 250 ms tick mutates only running runs; finished runs are returned by reference and skip re-render cascades.
- The agent panel re-renders on every tick (it's the consumer), but the insights panel is unaffected because the runtime context is a separate provider.

### Strict mode

`tsconfig.app.json` has `"strict": true` plus `noUnusedLocals` / `noUnusedParameters` / `noFallthroughCasesInSwitch`. The build runs `tsc -b` before Vite, so type errors fail CI-equivalent runs.

---

## Running it

```bash
pnpm install
pnpm dev            # http://localhost:5173
pnpm build          # tsc -b && vite build → dist/
pnpm preview        # serve the production build
pnpm lint           # eslint
pnpm format         # prettier --write .
pnpm format:check   # prettier --check .
```

Node 20+ recommended.
