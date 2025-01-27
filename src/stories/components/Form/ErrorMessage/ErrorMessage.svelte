<script lang="ts" module>
  export interface ErrorMessageProps {
    message: string;
    class?: string;
  }
</script>

<script lang="ts">
  const { message, class: className = '' }: ErrorMessageProps = $props();
</script>

<p class={`ErrorMessage ${className}`}>{message}</p>

<style lang="scss">
  p {
    margin-bottom: 0;
  }
</style>
