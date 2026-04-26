Manually bump version and publish to npm.

Arguments: $ARGUMENTS (optional: "patch" | "minor" | "major", defaults to "patch")

Steps:
1. Determine the bump type from $ARGUMENTS. If empty or not one of patch/minor/major, use "patch".
2. Run `bun run build` to compile the project
3. Run `bun run typecheck` to verify no TypeScript errors
4. Run `npm version <bump_type>` to bump the version in package.json and create a git tag
5. Run `git push && git push --tags` to push to remote
6. Run `npm publish --access public` to publish to npm

If any step fails, stop and report the error. Do not proceed to publish if build or typecheck fails.

After success, report the new version number and the npm package URL.
