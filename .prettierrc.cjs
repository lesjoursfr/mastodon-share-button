module.exports = {
	printWidth: 120,
	trailingComma: "es5",
	overrides: [
		{
			files: [".eslintrc.*", ".prettierrc.*", "*.json", "*.md"],
			options: {
				printWidth: 80,
			},
		},
		{
			files: ["tsconfig.json"],
			options: {
				trailingComma: "none",
			},
		},
	],
};
