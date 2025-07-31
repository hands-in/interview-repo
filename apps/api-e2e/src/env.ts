import { Environment } from "@acme/globals";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),
		LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal"]),
		ENVIRONMENT: z.nativeEnum(Environment),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV ?? "development",
		LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
		ENVIRONMENT: process.env.ENVIRONMENT ?? "local",
	},
	isServer: true,
});
