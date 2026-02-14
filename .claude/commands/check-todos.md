# Check Blog TODOs

Search for TODO comments in blog posts and drafts that need attention.

## Instructions

1. Search for TODO patterns in all blog posts and drafts:
   - `TODO-CLAUDE` - Tasks specifically for Claude to handle
   - `TODO` - General todos
   - `FIXME` - Items that need fixing

2. Search locations:
   - `pages/blog/**/*.mdx`
   - `drafts/**/*.mdx`

3. For each TODO found, report:
   - File path and line number
   - The TODO content
   - Surrounding context (2-3 lines)

4. Summarize findings with a count and list of actionable items.

## Output Format

### Found TODOs

**File:** `path/to/file.mdx:42`
**TODO:** Description of what needs to be done
**Context:** Brief surrounding context

---

### Summary
- Total TODOs found: X
- TODO-CLAUDE items: X
- General TODOs: X
