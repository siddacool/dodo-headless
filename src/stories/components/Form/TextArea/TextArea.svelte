<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface TextAreaProps {
    title?: string;
    class?: string;
    name?: string;
    id?: string;
    label?: string;
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
    rows?: number;
    cols?: number;
    resize?: 'both' | 'vertical' | 'horizontal';
  }
</script>

<script lang="ts">
  let {
    name,
    id,
    label,
    value = $bindable<string>(),
    onchange,
    oninput,
    onblur,
    onfocus,
    disabled = false,
    error,
    class: className = '',
    before,
    after,
    maxlength,
    readonly,
    rows,
    cols,
    resize = 'both',
  }: TextAreaProps = $props();

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

<div class={`TextArea ${className}`}>
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
    <textarea
      {name}
      {id}
      {onchange}
      {oninput}
      {disabled}
      onfocus={onfocusEvent}
      onblur={onblurEvent}
      class:error
      {maxlength}
      {readonly}
      {rows}
      {cols}
      class={`resize resize--${resize}`}
    >
      {value}
    </textarea>
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
  .TextArea {
    display: flex;
    flex-direction: column;

    .input-holder {
      flex: 1;
      border: 1px solid;
      display: flex;
      overflow: hidden;
      border-radius: 4px;
    }

    textarea {
      width: 100%;
      box-sizing: border-box;
      border: 0;
      outline: 0;
      padding: 8px;
      font-size: 1rem;

      &.resize {
        &--both {
          resize: both;
        }

        &--vertical {
          resize: vertical;
        }

        &--horizontal {
          resize: horizontal;
        }
      }
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
