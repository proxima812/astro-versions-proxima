Build the project and run type checking.

Run the following steps in order:

1. Run `bun run build` to compile TypeScript → dist/ via tsup
2. Run `bun run typecheck` to verify no TypeScript errors
3. Report the results — show any errors clearly, or confirm success with the sizes of dist/ files

If there are errors, analyze them and fix them before reporting done.
