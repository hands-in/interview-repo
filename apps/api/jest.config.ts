import type { Config } from "jest";

export default {
	displayName: "api",
	coverageDirectory: "../../coverage/apps/api",
	preset: "../../jest.preset.js",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
} satisfies Config;
