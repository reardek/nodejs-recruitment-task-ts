import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  maxWorkers: 1,
  testEnvironment: "node",
  preset: "ts-jest",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
export default config;
