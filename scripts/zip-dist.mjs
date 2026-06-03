import { existsSync, mkdirSync, readFileSync } from "fs";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { join, resolve } from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf-8"));
const date = new Date().toISOString().slice(0, 10);
const releasesDir = join(root, "releases");
const outFile = join(releasesDir, `${pkg.name || "site"}-${date}.zip`);

mkdirSync(releasesDir, { recursive: true });

if (!existsSync(join(root, "dist"))) {
  throw new Error("dist folder missing. Run vite build before zipping.");
}

try {
  execFileSync("zip", ["-r", outFile, "."], { cwd: join(root, "dist") });
  console.log(`Zipped: ${outFile}`);
} catch {
  execFileSync("powershell", [
    "-Command",
    `if (Test-Path '${outFile}') { Remove-Item '${outFile}' -Force }; Compress-Archive -Path '${join(root, "dist")}\\*' -DestinationPath '${outFile}' -Force`,
  ]);
  console.log(`Zipped (PowerShell): ${outFile}`);
}