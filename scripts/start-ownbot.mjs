import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = process.env.OMB_DATA_DIR || join(root, ".ownbot");
mkdirSync(dataDir, { recursive: true, mode: 0o700 });
const env = {
  ...process.env,
  OMB_DATA_DIR: dataDir,
  ELECTRON_START_URL: process.env.ELECTRON_START_URL || `http://127.0.0.1:${process.env.OMB_UI_PORT || 5199}`,
};
const children = new Set();
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  const deadline = setTimeout(() => {
    for (const child of children) child.kill("SIGKILL");
    process.exit(code);
  }, 5000);
  deadline.unref();
  if (!children.size) process.exit(code);
  process.exitCode = code;
}

function start(args) {
  const child = spawn(process.execPath, args, { cwd: root, env, stdio: "inherit" });
  children.add(child);
  child.on("error", error => { console.error(error.message); stop(1); });
  child.on("exit", code => {
    children.delete(child);
    if (!stopping) stop(code || 1);
  });
}

async function waitFor(url) {
  for (let attempt = 0; attempt < 120; attempt++) {
    if (stopping) throw new Error("A required service stopped.");
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error(`Service did not become ready: ${url}`);
}

process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
try {
  start(["--experimental-strip-types", "server/dev-server.ts"]);
  start(["node_modules/vite/bin/vite.js", "--strictPort"]);
  await Promise.all([
    waitFor(`http://127.0.0.1:${env.OMB_PORT || 8799}/api/edition`),
    waitFor(`http://127.0.0.1:${env.OMB_UI_PORT || 5199}/`),
  ]);
  console.log(`OwnBot is ready. Local data: ${dataDir}`);
  if (process.argv.includes("--desktop")) start(["node_modules/electron/cli.js", "."]);
} catch (error) {
  console.error(error.message);
  stop(1);
}
