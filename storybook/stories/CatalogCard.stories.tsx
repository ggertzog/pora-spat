import { Meta, StoryObj } from "@storybook/nextjs";
import CatalogCard from "@/core/components/ui/shared/CatalogCard/CatalogCard";

const meta: Meta<typeof CatalogCard> = {
  title: "UI/CatalogCard",
  component: CatalogCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CatalogCard>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
