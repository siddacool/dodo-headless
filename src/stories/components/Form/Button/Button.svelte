<script lang="ts" module>
  export interface ButtonProps {
    disabled?: boolean;
    name?: string;
    title?: string;
    class?: string;
    type?: 'button' | 'submit';
    label?: Snippet | string;
    onclick?: (e: MouseEvent) => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  const {
    class: className = '',
    type = 'button',
    disabled = false,
    onclick,
    name,
    title,
    label,
  }: ButtonProps = $props();
</script>

<button class={`Button ${className}`} {disabled} {onclick} {name} {title} {type}>
  {#if typeof label === 'function'}
    {@render label()}
  {:else}
    {label}
  {/if}
</button>

<style lang="scss">
  .Button {
    background-color: transparent;
    font-size: 1rem;
    font-family: inherit;
    box-sizing: border-box;
    cursor: pointer;
  }
</style>
