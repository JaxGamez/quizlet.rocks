const obfuscator = require("javascript-obfuscator");
const fs = require("fs");

const files = fs.readdirSync("dist/js").filter(fn => fn.includes("app."));
files.forEach(f => {
  let contents = fs.readFileSync(`dist/js/${f}`, "utf-8");
  const obfuscated = obfuscator.obfuscate(contents);
  contents = obfuscated.getObfuscatedCode();
  fs.writeFileSync(`dist/js/${f}`, contents);
});
