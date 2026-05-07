import { Meta, StoryObj } from "@storybook/nextjs";
import StockCard from "@/core/components/ui/shared/StockCard/StockCard";

const meta: Meta<typeof StockCard> = {
  title: "UI/StockCard",
  component: StockCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StockCard>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
