import { Meta, StoryObj } from "@storybook/nextjs";
import SearchForm from "@/core/components/ui/shared/SearchForm/SearchForm";

const meta: Meta<typeof SearchForm> = {
  title: "UI/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {
    // ANOTHER: Добавьте props для компонента
  },
};
