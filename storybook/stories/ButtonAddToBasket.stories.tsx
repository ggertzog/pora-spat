import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonAddToBasket from "@/core/components/ui/shared/ButtonAddToBasket/ButtonAddToBasket";

const meta: Meta<typeof ButtonAddToBasket> = {
  title: "UI/ButtonAddToBasket",
  component: ButtonAddToBasket,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonAddToBasket>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
