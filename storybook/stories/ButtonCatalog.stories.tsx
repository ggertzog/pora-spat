import { Meta, StoryObj } from "@storybook/nextjs";
import ButtonCatalog from "@/core/components/ui/shared/ButtonCatalog/ButtonCatalog";

const meta: Meta<typeof ButtonCatalog> = {
  title: "UI/ButtonCatalog",
  component: ButtonCatalog,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonCatalog>;

export const Default: Story = {
  args: {
    // TODO: Добавьте props для компонента
  },
};
