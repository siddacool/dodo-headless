<script lang="ts" module>
  export interface FormLabelProps {
    name?: string;
    label: string;
    error?: string;
    disabled?: boolean;
    active?: boolean;
    class?: string;
  }
</script>

<script lang="ts">
  let {
    name,
    label,
    disabled = false,
    active = false,
    error,
    class: className = '',
  }: FormLabelProps = $props();
</script>

<label for={name} class:error class:active class:disabled class={`FormLabel ${className}`}>
  {label}
</label>

<style lang="scss">
  .FormLabel {
    display: block;
    box-sizing: border-box;
  }
</style>
