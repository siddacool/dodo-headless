<script lang="ts">
  import ErrorMessage from '../ErrorMessage/ErrorMessage.svelte';
  import FormLabel from '../FormLabel/FormLabel.svelte';

  interface Props {
    title?: string;
    class?: string;
    type?: 'text' | 'email' | 'mobile' | 'number';
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    error?: string;
    onchange?: (e: Event) => void;
    oninput?: (e: Event) => void;
  }

  let {
    name,
    id,
    label,
    placeholder,
    value = $bindable<string>(),
    onchange,
    oninput,
    disabled = false,
    error,
    class: className = '',
    type = 'text',
  }: Props = $props();

  let active = $state(false);
</script>

<div class={`TextInput ${className}`}>
  {#if label}
    <FormLabel {name} {error} {active} {disabled} {label} />
  {/if}

  <input
    {type}
    {name}
    {id}
    {placeholder}
    bind:value
    {onchange}
    {oninput}
    {disabled}
    onfocus={() => (active = true)}
    onblur={() => (active = false)}
    class:error
  />

  {#if error && !disabled}
    <ErrorMessage message={error} />
  {/if}
</div>

<style lang="scss">
</style>
