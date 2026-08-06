import { Meta, StoryObj } from "@storybook/nextjs";
import UiLink from "@/core/components/ui/shared/UiLink/UiLink";

const meta: Meta<typeof UiLink> = {
  title: "UI/UiLink",
  component: UiLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UiLink>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
