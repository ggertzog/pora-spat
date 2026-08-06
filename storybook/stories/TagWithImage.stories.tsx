import { Meta, StoryObj } from "@storybook/nextjs";
import TagWithImage from "@/core/components/ui/shared/TagWithImage/TagWithImage";

const meta: Meta<typeof TagWithImage> = {
  title: "UI/TagWithImage",
  component: TagWithImage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TagWithImage>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
