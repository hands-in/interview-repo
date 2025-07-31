import type { Config } from "jest";

export default {
	displayName: "website",
	coverageDirectory: "../../coverage/apps/website",
	preset: "../../jest.preset.js",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
} satisfies Config;
