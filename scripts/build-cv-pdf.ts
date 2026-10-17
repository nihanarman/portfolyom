import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const exportPort = 3101;

const targets = [
  {
    name: "tr",
    url: `http://127.0.0.1:${exportPort}/ozgecmis/yazdir`,
    output: path.join(rootDir, "public", "cv", "nihan-arman-tr.pdf"),
  },
  {
    name: "en",
    url: `http://127.0.0.1:${exportPort}/en/cv/print`,
    output: path.join(rootDir, "public", "cv", "nihan-arman-en.pdf"),
  },
] as const;

const waitForUrl = async (url: string, maxAttempts = 60) => {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.status < 500) {
        return;
      }
    } catch {
      // retry until server is ready
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Timed out waiting for ${url}`);
};

const main = async () => {
  await mkdir(path.join(rootDir, "public", "cv"), { recursive: true });

  const buildCommand = process.platform === "win32" ? "cmd.exe" : "/bin/bash";
  const buildArgs = process.platform === "win32"
    ? ["/d", "/s", "/c", "npx next build"]
    : ["-lc", "npx next build"];

  const buildProcess = spawn(buildCommand, buildArgs, {
    cwd: rootDir,
    stdio: "inherit",
    shell: false,
  });

  await new Promise<void>((resolve, reject) => {
    buildProcess.once("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`next build failed with exit code ${code}`));
    });
    buildProcess.once("error", reject);
  });

  const serverCommand = process.platform === "win32" ? "cmd.exe" : "/bin/bash";
  const serverArgs = process.platform === "win32"
    ? ["/d", "/s", "/c", `npx next start -H 127.0.0.1 -p ${exportPort}`]
    : ["-lc", `npx next start -H 127.0.0.1 -p ${exportPort}`];

  const serverProcess = spawn(serverCommand, serverArgs, {
    cwd: rootDir,
    stdio: "inherit",
    shell: false,
  });

  try {
    await waitForUrl(`http://127.0.0.1:${exportPort}/`);

    const browser = await chromium.launch({ headless: true });

    try {
      for (const target of targets) {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1700 } });
        await page.goto(target.url, {
          waitUntil: "domcontentloaded",
          timeout: 120000,
        });
        await page.waitForLoadState("networkidle", { timeout: 30000 });
        await page.pdf({
          path: target.output,
          format: "A4",
          printBackground: true,
          margin: {
            top: "18mm",
            right: "18mm",
            bottom: "18mm",
            left: "18mm",
          },
        });
        await page.close();
      }

      console.log("CV PDF export completed.");
    } finally {
      await browser.close();
    }
  } finally {
    serverProcess.kill("SIGTERM");
  }

  await writeFile(path.join(rootDir, "public", "cv", ".generated-flag"), "ok");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
