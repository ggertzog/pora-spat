import { Meta, StoryObj } from "@storybook/nextjs";
import RatingButton from "@/core/components/ui/shared/RatingButton/RatingButton";

const meta: Meta<typeof RatingButton> = {
  title: "UI/RatingButton",
  component: RatingButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RatingButton>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
