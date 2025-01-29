<script lang="ts" module>
  import type { HTMLAttributeAnchorTarget } from 'svelte/elements';

  export interface ButtonProps {
    disabled?: boolean;
    type?: 'button' | 'submit';
    name?: string;
    title?: string;
    class?: string;
    label?: Snippet | string;
    onclick?: (e: MouseEvent) => void;
    href?: string;
    target?: HTMLAttributeAnchorTarget | undefined | null;
    download?: any;
    hreflang?: string | undefined | null;
    media?: string | undefined | null;
    ping?: string | undefined | null;
    rel?: string | undefined | null;
    anchorType?: string | undefined | null;
    referrerpolicy?: ReferrerPolicy | undefined | null;
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
    href,
    target,
    download,
    hreflang,
    media,
    ping,
    rel,
    referrerpolicy,
    anchorType,
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    {href}
    class={`Button ${className}`}
    class:disabled
    {title}
    {target}
    type={anchorType}
    {download}
    {hreflang}
    {media}
    {ping}
    {rel}
    {referrerpolicy}
  >
    {#if typeof label === 'function'}
      {@render label()}
    {:else}
      {label}
    {/if}
  </a>
{:else}
  <button class={`Button ${className}`} {disabled} {onclick} {name} {title} {type}>
    {#if typeof label === 'function'}
      {@render label()}
    {:else}
      {label}
    {/if}
  </button>
{/if}

<style lang="scss">
  .Button {
    background-color: transparent;
    font-size: 1rem;
    font-family: inherit;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid;
    outline: 0;
    text-decoration: none;
    color: inherit;
    padding: 0;
  }
</style>
