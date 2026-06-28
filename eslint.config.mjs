import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [
      "**/*.config.js",
      "**/*.config.cjs",
      "**/*.config.ts",
      "**/node_modules/",
      "**/.next/",
      "**/dist/"
    ]
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
    settings: {
      next: {
        rootDir: "taybeen-frontend/"
      }
    }
  }
];