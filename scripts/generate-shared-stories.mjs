#!/usr/bin/env node

/**
 * Скрипт для автоматической генерации stories для shared компонентов
 * Использование: node scripts/generate-shared-stories.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SHARED_DIR = path.join(__dirname, "../src/core/components/ui/shared");
const OUTPUT_DIR = path.join(__dirname, "../storybook/stories");

// Конфигурация с примерами для каждого компонента
const componentConfigs = {
  Accordeon: {
    decorator: `(Story) => (
      <div style={{ maxWidth: "640px", padding: "20px" }}>
        <Story />
      </div>
    )`,
    stories: [
      {
        name: "Default",
        args: {
          openIndexes: [0],
          onClick: "() => {}",
          data: {
            parts: [
              {
                question: "Как это работает?",
                answer: "Нажмите на заголовок, чтобы открыть/закрыть секцию.",
              },
              {
                question: "Можно ли добавить больше пунктов?",
                answer: "Да, просто добавьте элементы в массив parts.",
              },
            ],
          },
        },
      },
      {
        name: "Wallet",
        args: {
          openIndexes: [0],
          onClick: "() => {}",
          isWallet: true,
          data: {
            parts: [
              {
                question: "Баллы кошелька",
                answer: "Пример ответа для режима wallet.",
              },
            ],
          },
        },
      },
    ],
  },
  Button: {
    decorator: `(Story) => (
      <div style={{ maxWidth: "200px" }}>
        <Story />
      </div>
    )`,
    stories: [
      {
        name: "Main",
        args: {
          asType: "button",
          variant: "main",
          children: "Main Button",
        },
        argTypes: {
          asType: { table: { disable: true } },
        },
      },
      {
        name: "Secondary",
        args: {
          asType: "button",
          variant: "secondary",
          children: "Secondary Button",
        },
        argTypes: {
          asType: { table: { disable: true } },
        },
      },
      {
        name: "AsLink",
        args: {
          asType: "link",
          href: "#",
          variant: "main",
          children: "Link Button",
        },
      },
    ],
  },
  Input: {
    decorator: `(Story) => (
      <div style={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <Story />
      </div>
    )`,
    stories: [
      {
        name: "Default",
        args: {
          type: "text",
          placeholder: "Enter text...",
        },
      },
      {
        name: "WithLabel",
        args: {
          type: "text",
          placeholder: "Enter text...",
          text: "Label",
        },
      },
    ],
  },
  BurgerButton: {
    stories: [
      {
        name: "Default",
        args: {},
      },
    ],
  },
  Logo: {
    stories: [
      {
        name: "Default",
        args: {
          isHeader: false,
        },
      },
      {
        name: "Footer",
        args: {
          isHeader: true,
        },
      },
    ],
  },
  SimpleCard: {
    decorator: `(Story) => (
      <div style={{ maxWidth: "225px" }}>
        <Story />
      </div>
    )`,
    stories: [
      {
        name: "Default",
        needsImageImport: true,
        args: {
          card: {
            id: 1,
            name: "Крым",
            cities: [{ id: 1, name: "Крым" }],
            image: "__PLACEHOLDER_IMAGE_SRC__",
            hotels_count: 12,
            minimal_price: 5000,
          },
          type: "travel",
        },
      },
    ],
  },
  YandexMaps: {
    import: { kind: "named" },
    decorator: `(Story) => (
      <div style={{ width: "800px", height: "500px" }}>
        <Story />
      </div>
    )`,
    stories: [
      {
        name: "Default",
        args: {
          location: {
            center: [37.6173, 55.7558],
            zoom: 10,
          },
          markerCoordinates: [],
          link: "",
          balloonContent: "() => null",
        },
      },
    ],
  },
};

// Читаем все папки из shared
const componentDirs = fs
  .readdirSync(SHARED_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .sort();

// Генерируем story для каждого компонента
const generatedFiles = [];
componentDirs.forEach((componentName) => {
  const componentPath = path.join(SHARED_DIR, componentName);
  const componentFile = path.join(componentPath, `${componentName}.tsx`);

  // Проверяем, существует ли файл компонента
  if (!fs.existsSync(componentFile)) {
    console.warn(`⚠️  ${componentName}.tsx not found, skipping...`);
    return;
  }

  // Генерируем содержимое story
  const config = componentConfigs[componentName];
  const storyContent = generateStoryContent(componentName, config);

  // Путь для output файла
  const outputFile = path.join(OUTPUT_DIR, `${componentName}.stories.tsx`);

  // Записываем файл
  fs.writeFileSync(outputFile, storyContent, "utf8");
  generatedFiles.push(outputFile);
});

// Форматируем все сгенерированные файлы с помощью Prettier
if (generatedFiles.length > 0) {
  try {
    execSync(`npx prettier --write ${generatedFiles.join(" ")}`, {
      cwd: path.join(__dirname, ".."),
      stdio: "inherit",
    });
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.warn("⚠️  Prettier formatting failed, but files were generated");
  }
}

function generateStoryContent(componentName, config) {
  let storiesCode = "";
  let additionalImports = "";
  let decoratorCode = "";
  let importLine = `import ${componentName} from "@/core/components/ui/shared/${componentName}/${componentName}";`;

  if (config?.import?.kind === "named") {
    importLine = `import { ${componentName} } from "@/core/components/ui/shared/${componentName}/${componentName}";`;
  }

  if (config && config.stories) {
    // Генерируем несколько stories на основе конфига
    storiesCode = config.stories
      .map((story) => {
        let argsString;
        let argTypesString = "";

        // Если нужен импорт изображения
        if (story.needsImageImport) {
          additionalImports = `import placeholderImage from "@/core/assets/images/crimea.jpg";\n`;

          // Заменяем маркер на переменную
          argsString = JSON.stringify(story.args, null, 4).replace(
            '"__PLACEHOLDER_IMAGE__"',
            "placeholderImage"
          );
          argsString = argsString.replace(
            '"__PLACEHOLDER_IMAGE_SRC__"',
            "placeholderImage.src"
          );
        } else {
          argsString = JSON.stringify(story.args, null, 4);
        }

        // Позволяем пробросить в args функции как строку-выражение,
        // чтобы генерировать валидный TS-код для stories.
        argsString = argsString.replaceAll('"() => {}"', "() => {}");
        argsString = argsString.replaceAll('"() => null"', "() => null");

        // Если есть argTypes, добавляем их
        if (story.argTypes) {
          argTypesString = `,
  argTypes: ${JSON.stringify(story.argTypes, null, 4)}`;
        }

        return `
export const ${story.name}: Story = {
  args: ${argsString}${argTypesString},
};`;
      })
      .join("\n");
  } else {
    // Дефолтная story
    storiesCode = `
export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};`;
  }

  // Если есть декоратор, добавляем его
  if (config && config.decorator) {
    decoratorCode = `
  decorators: [
    ${config.decorator},
  ],`;
  }

  return `import { Meta, StoryObj } from "@storybook/nextjs";
${importLine}
${additionalImports}
const meta: Meta<typeof ${componentName}> = {
  title: "UI/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],${decoratorCode}
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;
${storiesCode}
`;
}
