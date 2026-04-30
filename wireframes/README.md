# Agentic Developer Portal — UX Rationale

Live Demo: https://benrondeau.github.io/agentic-developer-portal/wireframes/unified-wireframe.html

## User Archetype

A software engineer working across multiple repositories who needs to launch and supervise AI agents without leaving their flow. They live in monospaced terminals and IDEs, scan dense information quickly, and distrust UIs that hide what an automated process is actually doing. The portal should feel like a developer tool, not a marketing dashboard.

## Layout: 3 Persistent Columns

The dashboard is anchored in a **3-column layout** — repo list (left), repo insights + task launcher (center), agent activity (right) — that stays stable across every state. This was chosen over a wizard or a tab-based flow for three reasons:

1. **Context never disappears.** Engineers work in parallel; they want to see the repo they're on, the agent that's running, and what they could trigger next, all at once. A stepper would force them to navigate away from one to see another.
2. **Spatial memory.** The same panel always lives in the same place, so users build muscle memory for "where do I go to launch a task" vs. "where do I check on progress."
3. **Mirrors how engineers already work.** It echoes the file-tree / editor / terminal layout of VS Code, JetBrains, and most modern IDEs — a familiar mental model for the audience.

The portal expects a minimum 1024px device width to match what a developer uses for a desktop monitor. I did not optimize for mobile or tablet; this is a workstation tool.

## Information Architecture

**Left — Repo list.** A scrollable, searchable list with `⌘K` visual cue, filter chips (All / Active / Needs Attention), and per-repo badges showing live agent activity (`2 running`) or warnings. The active repo gets a left-edge accent bar — a small, scannable signal that costs almost no pixels. Language tags (`[py]`, `[ts]`, `[k8s]`) replace icons because monospaced abbreviations are unambiguous and don't drift in meaning the way emoji do.

**Center — Insights + task launcher.** This panel answers "what is this repo and what can I do to it." It opens with at-a-glance stats (open PRs, coverage, CVEs), then a 6-task grid (Create PR, Refactor, Sec Scan, Upgrade Deps, Run Tests, Dep Map), then suggestion cards that proactively surface work the agent has already noticed needs doing. Suggestions are first-class CTAs, not banners — each one is one click from launching the right agent for the problem.

**Right — Agent activity.** The most distinctive panel. It has three view modes (`log` / `split` / `steps`) so the developer chooses how they want to monitor: raw terminal stream, structured step list, or both side-by-side. The default is `split` because most users want both signals at once — the high-level "where are we" and the low-level "what is it actually doing right now." When multiple agents run, they appear as tabs across the top so switching between them is one click.

## Empty State Matters

State 1 (empty, no repo selected) deliberately keeps the three-column scaffold visible with placeholder messages in the middle and right panels. This teaches the layout before the user has done anything — they immediately understand "I pick a repo on the left, see info in the middle, watch agents on the right." A blank canvas would have shipped a worse first impression and a steeper learning curve.

## Trust and Safety Affordances

Agentic systems take action with consequences (open PRs, modify files, hit external APIs). The UI was built around three trust principles:

- **No surprise launches.** State 3b is a confirmation modal that appears before any agent runs, showing description, estimated duration, token usage, and dollar cost. Users opt in with full information.
- **Live observability.** The terminal pane streams every step in real time with timestamps. The step tracker shows progress as a checklist with done / running / pending states. There is no "trust us, it's working" black box.
- **Reversibility.** Every running agent has a visible `abort` button in its toolbar. Completed agents expose their output (e.g. `view PR #214`) and a `copy log` action for handoff or debugging.

## Cross-Context Awareness

Two drawers handle the "what's happening across my whole org" cases without disrupting the main flow:

- **Org switcher (1b)** — slides in from the left when the user clicks the org name in the nav. Multi-org engineers switch context all day; this shouldn't require a page navigation.
- **Global agents drawer (4)** — slides in from the right when the user clicks the `● 12 agents active` badge in the nav. It lists every running agent across every repo in the org, so the developer can supervise work happening on repos they aren't currently looking at.

Both are overlays rather than full-page navigations because they're reference views, not destinations.

## Dark / Light Mode

 Engineers commonly switch UI themes by time of day, so this slider exists to make the change quick and easy.
