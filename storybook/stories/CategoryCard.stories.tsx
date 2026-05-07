import { Meta, StoryObj } from "@storybook/nextjs";
import CategoryCard from "@/core/components/ui/shared/CategoryCard/CategoryCard";

const meta: Meta<typeof CategoryCard> = {
  title: "UI/CategoryCard",
  component: CategoryCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
