// Notes From a Passive-Aggressive Fridge.
// A smart fridge leaves exactly one note on its door screen, written to
// /output/entry.txt. The note is a single line: the fridge caught its owner
// putting the milk back with one sip left in it, and it is not letting it go.
import fs from "node:fs";

const NOTE =
  "You put the milk back with one sip left. One sip. I have seen crimes with less planning.";

const GATE_MAX_CHARS = 200;

const trimmed = NOTE.trim();
if (trimmed.length === 0 || NOTE.length > GATE_MAX_CHARS) {
  throw new Error(`note is ${NOTE.length} chars, gate needs 1-${GATE_MAX_CHARS}`);
}
if (NOTE.includes("\n") || NOTE.includes("\r")) {
  throw new Error("note must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(`${outDir}/entry.txt`, NOTE);

console.log(`note written to ${outDir}/entry.txt (${NOTE.length} chars)`);
