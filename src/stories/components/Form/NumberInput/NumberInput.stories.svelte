<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NumberInput from './NumberInput.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'components/Form/NumberInput',
    component: NumberInput,
    tags: ['autodocs'],
    argTypes: {},
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Default' }} />
