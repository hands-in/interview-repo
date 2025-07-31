import type { Config } from "jest";

export default {
	displayName: "api-e2e",
	coverageDirectory: "../../coverage/apps/api-e2e",
	preset: "../../jest.preset.js",
	globalSetup: "<rootDir>/src/setup/global-setup.ts",
	globalTeardown: "<rootDir>/src/setup/global-teardown.ts",
	setupFiles: ["<rootDir>/src/setup/test-setup.ts"],
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js", "json", "html"],
} satisfies Config;
