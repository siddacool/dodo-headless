<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface NumberInputProps {
    title?: string;
    class?: string;
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: number;
    disabled?: boolean;
    error?: string;
    onchange?: (value: number | undefined, e: Event) => void;
    oninput?: (value: number | undefined, e: Event) => void;
    onblur?: () => void;
    onfocus?: () => void;
    before?: Snippet;
    after?: Snippet;
    decimals?: number;
    allowNegatives?: boolean;
    showControls?: boolean;
  }

  export function getValidNumericValue(value: string, allowNegatives: boolean, decimals: number) {
    let filteredValue = value.replace(/[^0-9-]/g, '');

    if (allowNegatives && filteredValue.indexOf('-') > 0) {
      filteredValue = filteredValue.replace(/-/g, '');
    } else {
      filteredValue = filteredValue.replace(/-/g, '');
    }

    const numericValue = parseFloat(filteredValue).toFixed(decimals);

    const numberValue = Number(numericValue);

    if (Number.isNaN(numberValue)) {
      return undefined;
    }

    return numberValue;
  }
</script>

<script lang="ts">
  let {
    name,
    id,
    label,
    placeholder,
    value = $bindable<number>(),
    onchange,
    oninput,
    onblur,
    onfocus,
    disabled = false,
    error,
    class: className = '',
    before,
    after,
    decimals = 0,
    allowNegatives = false,
    showControls = false,
  }: NumberInputProps = $props();

  let active = $state(false);

  function getFilteredValue(e: Event) {
    const target = e.target as HTMLInputElement;

    return getValidNumericValue(target.value, allowNegatives, decimals);
  }

  function onchangeEvent(e: Event) {
    const filtredValue = getFilteredValue(e);

    if (onchange) {
      onchange(filtredValue, e);
    }
  }

  function oninputEvent(e: Event) {
    const filtredValue = getFilteredValue(e);

    if (oninput) {
      oninput(filtredValue, e);
    }
  }

  function onfocusEvent() {
    if (onfocus) {
      onfocus();
    }

    active = true;
  }

  function onblurEvent() {
    if (onblur) {
      onblur();
    }

    active = false;
  }
</script>

<div class={`NumberInput ${showControls ? 'showControls' : 'dontShowControls'} ${className}`}>
  {#if label}
    <label for={name} class:error class:active class:disabled class="FormLabel">
      {label}
    </label>
  {/if}

  <div class="input-holder">
    {#if before}
      <div class="input-subordinate input-subordinate--before">
        {@render before()}
      </div>
    {/if}
    <input
      type="number"
      {name}
      {id}
      {placeholder}
      bind:value
      onchange={onchangeEvent}
      oninput={oninputEvent}
      {disabled}
      onfocus={onfocusEvent}
      onblur={onblurEvent}
      class:error
    />
    {#if after}
      <div class="input-subordinate input-subordinate--after">
        {@render after()}
      </div>
    {/if}
  </div>

  {#if error}
    <p class="ErrorMessage">{error || ''}</p>
  {/if}
</div>

<style lang="scss">
  .NumberInput {
    display: flex;
    flex-direction: column;

    .input-holder {
      flex: 1;
    }

    input {
      width: 100%;
      box-sizing: border-box;
    }

    .FormLabel {
      display: block;
      box-sizing: border-box;
    }

    .ErrorMessage {
      margin-bottom: 0;
    }

    &.dontShowControls {
      input {
        -moz-appearance: textfield;
        appearance: textfield;
        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
</style>
