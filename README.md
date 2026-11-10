# OwnBot

Your own local-first team of AI bots, built from OpenMausBot's Apache-2.0 core. OwnBot is independent of xAI and OpenMausBot. The imported source revision and exclusions are recorded in [UPSTREAM.json](UPSTREAM.json).

Start with the [Windows setup and installer guide](WINDOWS.md) for your selected platform.

## Start the app

Requires Node.js 24+ and pnpm 10.33.0.

```sh
pnpm install --frozen-lockfile
pnpm start
```

Open the address printed by Vite. To open the Electron desktop shell instead:

```sh
pnpm start:desktop
```

The launcher starts the API and interface together, waits for both, and stops them when you press Ctrl+C. Source launches keep conversations and settings in the ignored `.ownbot/` folder. Packaged desktop launches use `~/.ownbot`. `OMB_DATA_DIR` selects another directory. OwnBot does not migrate OpenMausBot's data automatically.

## Connect a brain

The app includes bot profiles, multiple threads, group channels, streaming responses, local history, approval cards, and provider selection. A working AI provider is required to produce real responses.

- **Existing subscription:** install and sign in to the official Codex, Claude, or Grok CLI on your computer, then select that engine in Settings. Your provider's subscription rules and limits still apply.
- **Local models:** run Ollama or LM Studio on the same computer, enable its OpenAI-compatible server, and add it under Settings → Engines. See [the local model example](examples/ownbot-local-model.json) and [custom engine setup](docs/custom-engines.md). Replace the example model with a model you have actually downloaded.
- **Your API key:** choose a provider in Settings. Keys belong in the app's local settings, never in source control. API providers may charge for usage.

Local model capability and speed depend on the model and your computer. Computer use and structured tools need a model that supports them. Connecting Ollama is not the same as installing or downloading a model.

## Costs and independence

OwnBot adds no app subscription or payment service. The Apache-2.0 core at the pinned revision remains available under that license, even if upstream changes its future plans. This checkout excludes the separately licensed `enterprise/` implementation. Original copyright and third-party notices remain intact.

OwnBot disables upstream product analytics and its desktop cloud purchase offers. Its desktop updater cannot replace OwnBot with an upstream OpenMausBot release. Optional integrations inherited from the core, such as cloud computers, voice APIs, and connected-app services, can have their own charges if you deliberately connect them. Self-hosting can also cost money. Local models avoid metered cloud model calls, but need your own hardware and electricity.

## Build and check

```sh
pnpm typecheck
pnpm build
pnpm exec vitest run src/lib/ownbot-policy.test.ts src/lib/brand.test.ts src/lib/analytics.test.ts server/enterprise.test.ts server/brand.test.ts server/drivers/openai-compat.test.ts
```

Native installers must be built and verified on the target platform. The inherited `package:win`, `package:mac`, and `package:linux` commands also prepare optional native computer-use resources. They are not verified release artifacts yet; macOS signing needs your own developer identity. All packaging commands use `--publish never`.

A manual **Build OwnBot desktop** GitHub Actions workflow is included. Once you push this source to your repository, select an operating system and run it to produce a downloadable build artifact. It does not create a release or run on pushes. GitHub's runner billing rules still apply; the workflow has not been run here. The default build has no signing identity.

The upstream verification fixtures use a simulated engine to exercise the real API without charging a model provider. A passing fixture does not establish that your real provider is signed in.

## Source and licensing

- [Apache-2.0 license](LICENSE), [attribution and third-party notices](NOTICE), and [fork changes](FORK.md).
- [Original upstream README](docs/UPSTREAM_README.md) and inherited [technical documentation](docs/README.md). Upstream docs can mention upstream branding, cloud plans, or enterprise capabilities that are not included here.
- REA is a separate MIT-licensed software inspection tool. It was reviewed as an alternative; no REA runtime is required for OwnBot.
