const config = {
  printWidth: 120,
  trailingComma: "es5",
  overrides: [
    {
      files: ["eslint.config.mjs", "prettier.config.mjs", "*.json", "*.md"],
      options: {
        printWidth: 80,
      },
    },
    {
      files: ["*.scss"],
      options: {
        singleQuote: true,
      },
    },
  ],
};

export default config;
