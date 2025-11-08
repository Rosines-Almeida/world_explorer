import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from '../app/shared/components/button/button';

const meta: Meta<Button> = {
  title: 'SHARED/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit'],
    },
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
    type: 'button'
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
  },
};