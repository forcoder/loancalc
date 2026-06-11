#!/usr/bin/env node
import { execSync } from "node:child_process";

const commands = ["npm run typecheck", "npm run test:run", "npm run build"];

for (const cmd of commands) {
  console.log(`\n=== Running: ${cmd} ===`);
  try {
    const out = execSync(cmd, { encoding: "utf-8", stdio: "pipe" });
    process.stdout.write(out);
  } catch (e) {
    console.error(`FAILED: ${cmd}`);
    if (e.stdout) console.error(e.stdout.toString());
    if (e.stderr) console.error(e.stderr.toString());
    process.exit(1);
  }
}

console.log("\n=== ALL CHECKS PASSED ===");
