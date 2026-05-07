import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonIconRounded from "@/core/components/ui/shared/ButtonIconRounded/ButtonIconRounded";

const meta: Meta<typeof ButtonIconRounded> = {
  title: "UI/ButtonIconRounded",
  component: ButtonIconRounded,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonIconRounded>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
