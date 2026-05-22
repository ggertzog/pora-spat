import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

const meta: Meta<typeof ButtonRounded> = {
  title: "UI/ButtonRounded",
  component: ButtonRounded,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonRounded>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
