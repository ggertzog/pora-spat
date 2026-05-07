import { Meta, StoryObj } from "@storybook/nextjs";
import ProductTag from "@/core/components/ui/shared/ProductTag/ProductTag";

const meta: Meta<typeof ProductTag> = {
  title: "UI/ProductTag",
  component: ProductTag,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductTag>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
