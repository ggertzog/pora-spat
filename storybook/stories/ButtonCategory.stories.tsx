import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonCategory from "@/core/components/ui/shared/ButtonCategory/ButtonCategory";

const meta: Meta<typeof ButtonCategory> = {
  title: "UI/ButtonCategory",
  component: ButtonCategory,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonCategory>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
