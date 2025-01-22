<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
  import { fn } from '@storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'components/Form/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {},
    args: {
      onclick: fn(),
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Default' }} />

<Story name="Primary" args={{ variant: 'primary', label: 'Primary' }} />

<Story name="Danger" args={{ variant: 'danger', label: 'Danger' }} />

<Story name="Safe" args={{ variant: 'safe', label: 'Safe' }} />

<Story name="Warning" args={{ variant: 'warning', label: 'Warning' }} />

<Story name="Info" args={{ variant: 'info', label: 'Info' }} />
