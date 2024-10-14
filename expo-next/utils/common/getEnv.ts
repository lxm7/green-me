import fs from "fs";

function parseEnvFile(filePath: string) {
  const env: Record<string, string> = {};
  const content = fs.readFileSync(filePath, "utf-8");
  content.split("\n").forEach((line: string) => {
    const [key, value] = line.split("=");
    if (key && value) {
      env[key.trim()] = value.trim();
    }
  });
  return env;
}

const envVariables = parseEnvFile("./.env.development");
export { envVariables };
