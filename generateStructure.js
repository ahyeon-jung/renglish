import fs from "node:fs";
import path from "node:path";

const excludeExtensions = [".ts", ".tsx", ".svg", ".webp", ".png", ".ico", ".css"];
const excludeFolders = [
  "node_modules",
  ".git",
  ".github",
  ".husky",
  ".idea",
  ".vscode",
  "dist",
  ".next",
];

const generateStructure = (dirPath, prefix = "") => {
  let structure = "";

  const files = fs.readdirSync(dirPath).filter((file) => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (excludeFolders.includes(file)) return false;
    if (excludeExtensions.some((ext) => file.endsWith(ext))) return false;
    return true;
  });

  const lastIndex = files.length - 1;

  files.forEach((file, index) => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);
    const isLast = index === lastIndex;
    const connector = isLast ? "└── " : "├── ";
    const line = `${prefix}${connector}${file}${stats.isDirectory() ? "/" : ""}\n`;

    structure += line;

    if (stats.isDirectory()) {
      const nextPrefix = prefix + (isLast ? "    " : "|   ");
      structure += generateStructure(fullPath, nextPrefix);
    }

    if (isLast) {
      structure += `${prefix}\n`;
    }
  });

  return structure;
};

const rootDir = process.cwd();
const treeStructure = generateStructure(rootDir);

console.log(`Project Structure:\n${treeStructure}`);
