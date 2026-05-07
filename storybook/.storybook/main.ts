import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: "@storybook/nextjs",
  staticDirs: [
    "../../public",
    { from: "../../public/fonts", to: "/fonts" },
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../../src"),
      };
    }

    const stylesPath = path.resolve(__dirname, "../../src/core/styles");
    const patchSassLoader = (rules: any[]) => {
      for (const rule of rules) {
        if (!rule || typeof rule !== "object") continue;
        if (Array.isArray(rule.oneOf)) patchSassLoader(rule.oneOf);
        const uses = Array.isArray(rule.use) ? rule.use : [];
        for (const use of uses) {
          if (use?.loader?.includes?.("sass-loader")) {
            use.options = {
              ...use.options,
              sassOptions: {
                ...use.options?.sassOptions,
                loadPaths: [stylesPath],
                silenceDeprecations: ["import"],
              },
            };
          }
        }
      }
    };
    if (config.module?.rules) {
      patchSassLoader(config.module.rules as any[]);
    }

    return config;
  },
};
export default config;
