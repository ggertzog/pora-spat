import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonRadio from "@/core/components/ui/shared/ButtonRadio/ButtonRadio";

const meta: Meta<typeof ButtonRadio> = {
  title: "UI/ButtonRadio",
  component: ButtonRadio,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonRadio>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
