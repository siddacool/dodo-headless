<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface NumberIncrementProps {
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
    onAdd?: () => void;
    onRemove?: () => void;
    min?: number;
    max?: number;
    step?: number;
    decimals?: number;
    allowNegatives?: boolean;
    labelAdd?: Snippet | string;
    labelRemove?: Snippet | string;
    readonly?: boolean;
  }
</script>

<script lang="ts">
  import { getValidNumericValue } from '../NumberInput/NumberInput.svelte';

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
    onAdd,
    onRemove,
    disabled = false,
    error,
    class: className = '',
    step = 1,
    decimals = 0,
    allowNegatives = false,
    min,
    max,
    labelAdd = '+',
    labelRemove = '-',
    readonly,
  }: NumberIncrementProps = $props();

  let active = $state(false);

  function getValidMinMaxValue(value: string) {
    if (value.trim() === '') {
      return 0;
    }

    const valueFormatted = getValidNumericValue(value, allowNegatives, decimals);

    if (min || min === 0) {
      if (valueFormatted < min) {
        return min;
      }
    }

    if (max || max === 0) {
      if (valueFormatted > max) {
        return max;
      }
    }

    return valueFormatted;
  }

  function getFilteredValue(e: Event) {
    const target = e.target as HTMLInputElement;

    return getValidMinMaxValue(target.value);
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

  function remove() {
    if (onRemove) {
      onRemove();

      return;
    }

    const newValue = value - step;

    if (!allowNegatives && newValue < 0) {
      value = 0;

      return;
    }

    value = getValidMinMaxValue(`${newValue}`);
  }

  function add() {
    if (onAdd) {
      onAdd();

      return;
    }

    const newValue = value + step;

    value = getValidMinMaxValue(`${newValue}`);
  }
</script>

<div class={`NumberIncrement ${className}`}>
  {#if label}
    <label for={name} class:error class:active class:disabled class="FormLabel">
      {label}
    </label>
  {/if}

  <div class="input-holder" class:error class:active class:disabled>
    <div class="input-subordinate input-subordinate--before">
      <button
        class="Button Button-remove"
        disabled={disabled ||
          ((min || min === 0) && (value || value === 0) && value <= min ? true : false)}
        onclick={remove}
      >
        {#if typeof labelRemove === 'function'}
          {@render labelRemove()}
        {:else}
          {labelRemove}
        {/if}
      </button>
    </div>
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
      {readonly}
    />
    <div class="input-subordinate input-subordinate--after">
      <button
        class="Button Button-add"
        disabled={disabled ||
          ((max || max === 0) && (value || value === 0) && value >= max ? true : false)}
        onclick={add}
      >
        {#if typeof labelAdd === 'function'}
          {@render labelAdd()}
        {:else}
          {labelAdd}
        {/if}
      </button>
    </div>
  </div>

  {#if error}
    <p class="ErrorMessage">{error || ''}</p>
  {/if}
</div>

<style lang="scss">
  .NumberIncrement {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .input-holder {
      flex: 1;
      display: flex;
      box-sizing: border-box;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      -moz-appearance: textfield;
      appearance: textfield;
      /* Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      flex: 1;
      outline: 0;
      font-size: 1rem;
      border: 1px solid;
      height: 35px;
      padding: 0 8px;
      border-radius: 4px;
    }

    .FormLabel {
      display: block;
      box-sizing: border-box;
      margin-bottom: 5px;
    }

    .ErrorMessage {
      margin-bottom: 0;
      box-sizing: border-box;
    }

    .Button {
      background-color: transparent;
      font-size: 1rem;
      font-family: inherit;
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid;
      outline: 0;
      height: 35px;
      border-radius: 4px;
      padding: 0 12px;
    }

    .input-subordinate {
      box-sizing: border-box;
      &--before {
        margin-right: 5px;
      }

      &--after {
        margin-left: 5px;
      }
    }
  }
</style>
