<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface TextInputProps {
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
    onblur?: () => void;
    onfocus?: () => void;
    before?: Snippet;
    after?: Snippet;
    maxlength?: number;
    readonly?: boolean;
  }
</script>

<script lang="ts">
  let {
    name,
    id,
    label,
    placeholder,
    value = $bindable<string>(),
    onchange,
    oninput,
    onblur,
    onfocus,
    disabled = false,
    error,
    class: className = '',
    type = 'text',
    before,
    after,
    maxlength,
    readonly,
  }: TextInputProps = $props();

  let active = $state(false);

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

<div class={`TextInput ${className}`}>
  {#if label}
    <label for={name} class:error class:active class:disabled class="FormLabel">
      {label}
    </label>
  {/if}

  <div class="input-holder" class:error class:active class:disabled>
    {#if before}
      <div class="input-subordinate input-subordinate--before">
        {@render before()}
      </div>
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
      onfocus={onfocusEvent}
      onblur={onblurEvent}
      class:error
      {maxlength}
      {readonly}
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
  .TextInput {
    display: flex;
    flex-direction: column;

    .input-holder {
      flex: 1;
      border: 1px solid;
      display: flex;
      overflow: hidden;
      border-radius: 4px;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      border: 0;
      outline: 0;
      font-size: 1rem;
      height: 35px;
      padding: 0 8px;
    }

    .FormLabel {
      display: block;
      box-sizing: border-box;
      margin-bottom: 5px;
    }

    .ErrorMessage {
      margin-bottom: 0;
    }
  }
</style>
