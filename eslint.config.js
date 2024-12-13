import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
    },
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        ignores: ["resources/js/shadcnui/**/*"],
    },
    {
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/no-unescaped-entities": "warn",
            "react/prop-types": "off",
        }
    },
    {
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    pluginPrettierRecommended
];
