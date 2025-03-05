import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
            ],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
];

export default eslintConfig;
