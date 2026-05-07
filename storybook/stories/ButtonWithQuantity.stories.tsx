import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonWithQuantity from "@/core/components/ui/shared/ButtonWithQuantity/ButtonWithQuantity";

const meta: Meta<typeof ButtonWithQuantity> = {
  title: "UI/ButtonWithQuantity",
  component: ButtonWithQuantity,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonWithQuantity>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
