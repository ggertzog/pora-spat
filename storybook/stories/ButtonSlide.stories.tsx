import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonSlide from "@/core/components/ui/shared/ButtonSlide/ButtonSlide";

const meta: Meta<typeof ButtonSlide> = {
  title: "UI/ButtonSlide",
  component: ButtonSlide,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonSlide>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
