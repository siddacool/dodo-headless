<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NumberIncrement from './NumberIncrement.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'components/Form/NumberIncrement',
    component: NumberIncrement,
    tags: ['autodocs'],
    argTypes: {},
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Normal" args={{ value: 0 }} />
