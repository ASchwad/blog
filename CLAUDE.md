## UI

- Ensure all buttons have hover/interactive states
- ALWAYS use the theme for styling. Never use custom color codes

## Development Server

- The dev server runs in a tmux session named `blog`
- To check dev server output: `tmux capture-pane -t blog -p -S -50` (shows last 50 lines)
- To attach to the session: `tmux attach -t blog`
- Always check the tmux session when debugging build errors, runtime errors, or when you need to see console output

- NEVER duplicate state between layouts
- NEVER copy changes between layouts without explicit instruction
- NEVER ever add Co-Authored by Claude to the commits
