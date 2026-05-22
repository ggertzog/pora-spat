import { Meta, StoryObj } from "@storybook/nextjs";
import NewsCard from "@/core/components/ui/shared/NewsCard/NewsCard";

const meta: Meta<typeof NewsCard> = {
  title: "UI/NewsCard",
  component: NewsCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NewsCard>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
