import type { Meta, StoryObj } from "@storybook/react";

import { ImageBlock } from "../app/components/ImageBlock";

const meta = {
  title: "Example/ImageBlock",
  component: ImageBlock,

  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    author: "Daniel",
    id: "30",
    width: 1000,
    height: 1000,
    url: "url",
    download_url: "string",
  },
};

export const BackgroundColor: Story = {
  args: {
    author: "Daniel",
    id: "30",
    width: 1000,
    height: 1000,
    url: "url",
    download_url: "string",
    tWBackgroundColor: "bg-orange-400",
  },
};
