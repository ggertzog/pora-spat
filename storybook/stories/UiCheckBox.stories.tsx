import { Meta, StoryObj } from "@storybook/nextjs";
import UiCheckBox from "@/core/components/ui/shared/UiCheckBox/UiCheckBox";

const meta: Meta<typeof UiCheckBox> = {
  title: "UI/UiCheckBox",
  component: UiCheckBox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UiCheckBox>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
