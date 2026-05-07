import { Meta, StoryObj } from "@storybook/nextjs";
import UiTabs from "@/core/components/ui/shared/UiTabs/UiTabs";

const meta: Meta<typeof UiTabs> = {
  title: "UI/UiTabs",
  component: UiTabs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UiTabs>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
