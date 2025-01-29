<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface SelectProps {
    title?: string;
    class?: string;
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: any;
    disabled?: boolean;
    error?: string;
    onchange?: (value: any) => void;
    onblur?: () => void;
    onfocus?: () => void;
    before?: Snippet;
    after?: Snippet;
    readonly?: boolean;
    options: any[];
    renderOption?: Snippet;
    renderText?: Snippet;
    searchable?: boolean;
    clearable?: boolean;
  }
</script>

<script lang="ts">
  let {
    name,
    id,
    label,
    placeholder,
    value = $bindable<any>(),
    onchange,
    onblur,
    onfocus,
    disabled = false,
    error,
    class: className = '',
    before,
    after,
    readonly,
    options,
    renderOption,
    renderText,
    searchable = false,
    clearable = false,
  }: SelectProps = $props();

  let active = $state(false);
  let serachTerm = $state((value?.label as string) || '');
  let filteredOptions = $state(options);
  let clickableElement: HTMLButtonElement | null = $state(null);
  let inputElement: HTMLInputElement | null = $state(null);
  let selectElement: HTMLUListElement | null = $state(null);

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

  function onclickOption(val: any) {
    if (onchange) {
      onchange(val);
    }

    serachTerm = (val?.label as string) || '';

    onblurEvent();
  }

  function onclickClickable() {
    const toggleState = !active;

    if (toggleState) {
      onfocusEvent();
    } else {
      onblurEvent();
    }
  }

  function onClear() {
    serachTerm = '';
    value = undefined;
    onblurEvent();
  }

  // Effect to detect clicks outside
  $effect(() => {
    function handleClick(event: MouseEvent): void {
      if (active) {
        if (
          !clickableElement?.contains(event.target as Node) &&
          !inputElement?.contains(event.target as Node) &&
          !selectElement?.contains(event.target as Node)
        ) {
          onblurEvent();
        }
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  $effect(() => {
    filteredOptions = searchable
      ? options.filter((item) => {
          let label = (item?.label as string) || '';

          if (!serachTerm.trim()) {
            return true;
          }

          if (label.trim().toLocaleLowerCase().includes(serachTerm.trim().toLocaleLowerCase())) {
            return true;
          }

          return false;
        })
      : options;
  });
</script>

<div class={`Select ${className}`}>
  {#if label}
    <label for={name} class:error class:active class:disabled class="FormLabel">
      {label}
    </label>
  {/if}

  <div class="SelectContainer">
    <div class="input-holder" class:error class:active class:disabled>
      {#if before}
        <div class="input-subordinate input-subordinate--before">
          {@render before()}
        </div>
      {/if}

      <div class="search-input">
        {#if typeof renderText === 'function' || !searchable}
          <button
            class="clickable"
            class:error
            class:active
            class:disabled
            onclick={onclickClickable}
            aria-label="clickable"
            bind:this={clickableElement}
          >
            {#if typeof renderText === 'function'}
              {@render renderText()}
            {:else}
              {serachTerm}
            {/if}
          </button>
        {:else}
          <input
            {name}
            {id}
            {placeholder}
            {disabled}
            onfocus={onfocusEvent}
            class:error
            {readonly}
            bind:this={inputElement}
            bind:value={serachTerm}
          />
        {/if}
      </div>

      <div class="input-subordinate input-subordinate--after">
        {#if clearable}
          <button class="clearable" onclick={onClear}>x</button>
        {/if}
        {#if after}
          {@render after()}
        {/if}
      </div>
    </div>

    {#if active}
      <ul class="select-options" bind:this={selectElement}>
        {#each filteredOptions as option}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <li
            class={`select-option ${value?.value === option?.value ? 'selected' : ''}`}
            onclick={() => onclickOption(option)}
          >
            {#if renderOption}
              renderOption(option)
            {:else}
              {option?.label || ''}
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if error}
    <p class="ErrorMessage">{error || ''}</p>
  {/if}
</div>

<style lang="scss">
  .Select {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .input-holder {
      flex: 1;
      border: 1px solid;
      box-sizing: border-box;
      display: flex;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      border: 0;
      outline: 0;
      height: 100%;
      flex: 1;
    }

    .FormLabel {
      display: block;
      box-sizing: border-box;
    }

    .ErrorMessage {
      margin-bottom: 0;
    }

    .SelectContainer {
      display: flex;
      flex-direction: column;
      position: relative;
      box-sizing: border-box;
    }

    .search-input {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .clickable {
      display: flex;
      height: 100%;
      background-color: transparent;
      width: 100%;
      cursor: pointer;
      border: 0;
      outline: 0;
      text-decoration: none;
      color: inherit;
      padding: 0;
      border: 0;
      outline: 0;
      box-sizing: border-box;
      align-items: center;
    }

    .select-options {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      border: 1px solid;
      position: absolute;
      width: 100%;
      top: 30px;
      box-sizing: border-box;
    }

    .select-option {
      margin: 0;
      padding: 0;
      display: flex;
      border-bottom: 1px solid;

      &:last-child {
        border-bottom: 0;
      }
    }

    .input-subordinate {
      &--after {
        &:empty {
          display: none;
        }
      }
    }

    .clearable {
      background-color: transparent;
      font-size: 1rem;
      font-family: inherit;
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid;
      outline: 0;
      text-decoration: none;
      color: inherit;
    }
  }
</style>
