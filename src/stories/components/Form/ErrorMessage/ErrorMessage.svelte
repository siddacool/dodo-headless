<script lang="ts">
  interface ErrorProps {
    message: string;
    class?: string;
  }

  const { message, class: className = '' }: ErrorProps = $props();
</script>

<p class={`ErrorMessage ${className}`}>{message}</p>
