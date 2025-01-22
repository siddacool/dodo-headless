<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TextInput from './TextInput.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'components/Form/TextInput',
    component: TextInput,
    tags: ['autodocs'],
    argTypes: {},
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Default' }} />
