import { Meta, StoryObj } from "@storybook/nextjs";
import Tag from "@/core/components/ui/shared/Tag/Tag";

const meta: Meta<typeof Tag> = {
  title: "UI/Tag",
  component: Tag,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
