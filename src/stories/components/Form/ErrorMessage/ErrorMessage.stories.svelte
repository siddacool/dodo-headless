<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ErrorMessage from './ErrorMessage.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'components/Form/ErrorMessage',
    component: ErrorMessage,
    tags: ['autodocs'],
    argTypes: {},
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ message: 'This is error message' }} />
