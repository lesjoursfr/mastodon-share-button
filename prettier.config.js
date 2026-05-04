const config = {
  printWidth: 120,
  trailingComma: "es5",
  overrides: [
    {
      files: ["eslint.config.js", "prettier.config.js", "*.json", "*.md"],
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
