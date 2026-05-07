import { Meta, StoryObj } from "@storybook/nextjs";
import ColorLink from "@/core/components/ui/shared/ColorLink/ColorLink";

const meta: Meta<typeof ColorLink> = {
  title: "UI/ColorLink",
  component: ColorLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ColorLink>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
