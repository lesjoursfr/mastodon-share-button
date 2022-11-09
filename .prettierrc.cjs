module.exports = {
	printWidth: 120,
	trailingComma: "es5",
	overrides: [
		{
			files: [".eslintrc.cjs", ".prettierrc.cjs", "*.json"],
			options: {
				printWidth: 80,
			},
		},
	],
};
