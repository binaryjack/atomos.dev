# Git Subtree Sync Guide

This document explains how to sync the Atomos UI library between the Kompartido monorepo and the standalone atomos.dev repository.

## Setup

### Initial Configuration

Add the atomos.dev repository as a remote:

```bash
cd /e/Sources/kompartido
git remote add atomos-origin https://github.com/binaryjack/atomos.dev.git
```

Verify the remote:

```bash
git remote -v
```

## Syncing Workflow

### Push Changes from Kompartido to atomos.dev

When you've made changes to `packages/atomos` in Kompartido:

```bash
# 1. Commit your changes in Kompartido
git add packages/atomos
git commit -m "feat: update Atomos UI components"

# 2. Push to Kompartido
git push origin dev

# 3. Push the subtree to atomos.dev
git subtree push --prefix=packages/atomos atomos-origin main
```

### Pull Changes from atomos.dev to Kompartido

If changes are made directly in the atomos.dev repository:

```bash
# Pull subtree changes from atomos.dev
git subtree pull --prefix=packages/atomos atomos-origin main --squash
```

### Initial Push (First Time Only)

If atomos.dev is a new empty repository:

```bash
# Push the entire packages/atomos directory to atomos.dev
git subtree push --prefix=packages/atomos atomos-origin main
```

## Common Workflows

### Development Workflow

1. **Work in Kompartido** (`packages/atomos`)
2. **Test locally** with Kompartido frontend
3. **Commit and push** to Kompartido
4. **Sync to atomos.dev** when ready for release

### Release Workflow

1. Update version in `packages/atomos/package.json`
2. Update CHANGELOG
3. Commit changes
4. Push to both repos:
   ```bash
   git push origin dev
   git subtree push --prefix=packages/atomos atomos-origin main
   ```
5. Create GitHub release in atomos.dev
6. Publish to npm (from atomos.dev repo)

## Directory Structure

```
kompartido/                           atomos.dev/
  packages/
    atomos/          ←→  (synced)  →  (root)
      src/                              src/
      package.json                      package.json
      README.md                         README.md
      .storybook/                       .storybook/
```

## Tips

- **Always commit before subtree operations**
- **Use `--squash`** when pulling to avoid messy git history
- **Test builds** in both environments before pushing
- **Keep package.json in sync** between both repos
- **Tag releases** in atomos.dev for npm publishing

## Troubleshooting

### Conflicts During Pull

```bash
# Abort the pull
git merge --abort

# Manually resolve conflicts
# Then commit and try again
```

### Force Push (Use with Caution)

```bash
git push atomos-origin `git subtree split --prefix=packages/atomos dev`:main --force
```

## Automation (Optional)

Consider creating npm scripts in the root package.json:

```json
{
  "scripts": {
    "atomos:push": "git subtree push --prefix=packages/atomos atomos-origin main",
    "atomos:pull": "git subtree pull --prefix=packages/atomos atomos-origin main --squash"
  }
}
```

Usage:

```bash
pnpm atomos:push
pnpm atomos:pull
```

## References

- [Git Subtree Documentation](https://www.atlassian.com/git/tutorials/git-subtree)
- [Kompartido Repository](https://github.com/binaryjack/kompartido)
- [Atomos.dev Repository](https://github.com/binaryjack/atomos.dev)
