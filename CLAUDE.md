## UI

- Use Shadcn components for all new UI, use shadcn over classic html components
- Ensure all buttons have hover/interactive states
- ALWAYS use Tailwind for styling
- ALWAYS use the theme for styling. Never use custom color codes
- When using Playwright MCP for screenshots, use JPEG format
- After UI changes to interactive elements (forms, radio buttons, modals), run `ui-validator` agent; ALWAYS use this after UI changes to validate and not guess
  - Acceptance: clicking element X selects/activates element X (not a neighbor)
  - Acceptance: hover states visible, focus rings present

## Images

- Images use blur placeholders for better loading UX
- Blur data is pre-generated and stored in `lib/blur-data.json`
- After adding new images to `public/images/`, regenerate blur data: `node scripts/gen-blur-placeholders.mjs`
- The build script runs this automatically before deploy

## Development Server

- The dev server runs in a tmux session named `blog`
- To check dev server output: `tmux capture-pane -t blog -p -S -50` (shows last 50 lines)
- To attach to the session: `tmux attach -t blog`
- Always check the tmux session when debugging build errors, runtime errors, or when you need to see console output

# General

- ALWAYS use bun as package manager
- NEVER duplicate state between layouts
- NEVER copy changes between layouts without explicit instruction
- NEVER ever add Co-Authored by Claude to the commits
