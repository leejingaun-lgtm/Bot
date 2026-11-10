# OwnBot on Windows

OwnBot uses your own Claude or Codex CLI sign-in. It does not include or sell an AI subscription. Your existing plan must include the selected CLI, and its normal usage limits apply.

## Run from source

Install Node.js 24 or newer and Git. In PowerShell, from this checkout:

```powershell
npm install -g pnpm@10.33.0
pnpm install --frozen-lockfile
pnpm start:desktop
```

Keep the terminal open while the app runs. Source-mode data stays in `.ownbot` inside this checkout. In Settings → Engines, connect your official provider CLI. For Codex, the official npm package is `@openai/codex`; install it and use `codex login` with a ChatGPT plan that includes Codex, then select Codex in OwnBot. Do not paste your ChatGPT password into this repository or a config file.

The browser-only source launcher is `pnpm start`. It starts the same server and chat interface.

## Build a Windows installer

On Windows x64, from this checkout:

```powershell
pnpm package:win
```

This creates `release/OwnBot-0.1.0-setup.exe` and a Windows ZIP. The native preparation step deliberately requires Windows x64 and validates the upstream computer-use binary against its pinned checksum and version. It must not be bypassed to produce an apparently complete package on Linux.

Alternatively, after the source has been pushed, open this repository's GitHub Actions, choose **Build OwnBot desktop**, select **windows**, and run it. Download the **OwnBot-windows** artifact when the run succeeds. The workflow is manual and does not publish a release. Check GitHub Actions billing for your account before running it.

No installer has been built or tested on Windows during this Linux development session. The default packaging configuration is unsigned; a public release should use your own signing identity and be tested on a clean Windows machine.

## Verified in the development environment

- TypeScript checks, production frontend build, and bundled backend build passed.
- 161 focused tests passed, including provider adapter, branding, onboarding, and analytics policy checks.
- The isolated test engine completed API and browser chat turns; messages remained after a page reload.
- The bundled server passed its packaging smoke checks without source dependencies nearby.
- The browser flow produced no page errors or PostHog requests.

Real subscription authentication, Windows installation, native computer control, voice, and optional connected services remain to be tested on the target computer. Test-engine replies are simulated, not proof of real AI inference.
