<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ButtonVariant } from '../Button.svelte';

  interface Props {
    variant?: ButtonVariant;
    disabled?: boolean;
    name?: string;
    title?: string;
    class?: string;
    type?: 'button' | 'submit';
    label?: Snippet | string;
    onclick?: (e: MouseEvent) => void;
  }

  const {
    variant = 'default',
    class: className = '',
    type = 'button',
    disabled = false,
    onclick,
    name,
    title,
    label,
  }: Props = $props();
</script>

<button
  class={`IconButton variant variant--${variant} ${className}`}
  {disabled}
  {onclick}
  {name}
  {title}
  {type}
>
  {#if typeof label === 'function'}
    {@render label()}
  {:else}
    {label}
  {/if}
</button>

<style lang="scss">
</style>
