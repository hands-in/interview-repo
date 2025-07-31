import type { Config } from "jest";

export default {
	displayName: "fullstack-nextjs-weather",
	coverageDirectory: "../../coverage/apps/fullstack-nextjs-weather",
	preset: "../../jest.preset.js",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
} satisfies Config;
