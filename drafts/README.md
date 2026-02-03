# Blog Drafts

Organize blog post ideas and work-in-progress here.

## Folders

- **ideas/** - Early concepts, rough notes, topic brainstorms
- **in-progress/** - Actively writing, structured drafts

## Publishing Workflow

1. Move the `.mdx` file from `drafts/` to `pages/blog/`
2. Add entry to `components/BlogPostList.tsx`
3. Add images to `public/images/blog/<post-name>/`
4. Run `node scripts/gen-blur-placeholders.mjs` if using images
