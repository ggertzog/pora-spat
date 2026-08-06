import { Meta, StoryObj } from "@storybook/nextjs";
import UiForm from "@/core/components/ui/shared/UiForm/UiForm";

const meta: Meta<typeof UiForm> = {
  title: "UI/UiForm",
  component: UiForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UiForm>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
