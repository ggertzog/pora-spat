# Scripts Documentation

## Автоматическая генерация Storybook Stories

В проекте настроена автоматическая генерация stories для компонентов.

### Команды

```bash
# Сгенерировать stories для иконок
npm run generate:icons

# Сгенерировать stories для shared компонентов
npm run generate:shared

# Сгенерировать все stories
npm run generate:stories

# Запустить Storybook (автоматически генерирует stories)
npm run storybook
```

### Как это работает

#### 1. Icons Stories (`generate-icon-stories.mjs`)

**Что делает:**
- Сканирует папку `src/core/components/ui/icons/`
- Автоматически создает импорты для всех иконок
- Генерирует `storybook/stories/Icons.stories.tsx` с галереей всех иконок

**Как добавить новую иконку:**
1. Создайте файл `.tsx` в папке `icons/`
2. Запустите `npm run generate:icons` (или просто `npm run storybook`)
3. Иконка автоматически появится в Storybook

#### 2. Shared Components Stories (`generate-shared-stories.mjs`)

**Что делает:**
- Сканирует папку `src/core/components/ui/shared/`
- Для каждого компонента создает отдельный `.stories.tsx` файл
- Использует предустановленные примеры для известных компонентов

**Как добавить новый компонент:**
1. Создайте папку с компонентом в `shared/`
2. Опционально: добавьте конфигурацию в `componentConfigs` скрипта
3. Запустите `npm run generate:shared`
4. Story файл будет создан автоматически

**Как настроить примеры:**

Отредактируйте объект `componentConfigs` в `generate-shared-stories.mjs`:

```javascript
const componentConfigs = {
  YourComponent: {
    stories: [
      {
        name: "Default",
        args: {
          prop1: "value1",
          prop2: "value2",
        },
      },
      {
        name: "Variant",
        args: {
          prop1: "different value",
        },
      },
    ],
  },
};
```

### Структура файлов

```
scripts/
├── generate-icon-stories.mjs      # Генерация stories для иконок
└── generate-shared-stories.mjs    # Генерация stories для компонентов

storybook/stories/
├── Icons.stories.tsx              # Автогенерированная галерея иконок
├── Button.stories.tsx             # Автогенерированные stories компонентов
├── Input.stories.tsx
└── ...
```

### Преимущества

✅ **Автоматизация** - не нужно вручную создавать stories
✅ **Консистентность** - все stories имеют единый формат
✅ **Масштабируемость** - легко добавлять новые компоненты
✅ **DX** - stories автоматически обновляются при запуске Storybook
