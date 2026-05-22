import { Meta, StoryObj } from "@storybook/nextjs";
import ProductCard from "@/core/components/ui/shared/ProductCard/ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "UI/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
