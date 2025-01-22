<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FormLabel from './FormLabel.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'components/Form/FormLabel',
    component: FormLabel,
    tags: ['autodocs'],
    argTypes: {},
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'This is form label' }} />
