import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonIcon from "@/core/components/ui/shared/ButtonIcon/ButtonIcon";

const meta: Meta<typeof ButtonIcon> = {
  title: "UI/ButtonIcon",
  component: ButtonIcon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
