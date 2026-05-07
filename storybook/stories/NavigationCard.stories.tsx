import { Meta, StoryObj } from "@storybook/nextjs";
import NavigationCard from "@/core/components/ui/shared/NavigationCard/NavigationCard";

const meta: Meta<typeof NavigationCard> = {
  title: "UI/NavigationCard",
  component: NavigationCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NavigationCard>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
