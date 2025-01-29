<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Select from './Select.svelte';

  type Option = { label: String; value: String };

  const options: Option[] = [
    { value: 'One', label: 'One' },
    { value: 'Two', label: 'Two' },
    { value: 'Three', label: 'Three' },
  ];

  let option: Option = $state(options[0]);

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'components/Form/Select',
    component: Select,
    tags: ['autodocs'],
    argTypes: {},
    args: {
      options,
      onchange: (value: any) => {
        const valueTyped = value as Option;

        option = { ...valueTyped };
      },
      // svelte-ignore state_referenced_locally
      value: option,
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Default' }} />

<Story name="Searchable" args={{ label: 'Searchable', searchable: true }} />

<Story name="Clearable" args={{ label: 'Clearable', clearable: true }} />
