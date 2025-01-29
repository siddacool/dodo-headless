export type { NumberIncrementProps } from './NumberIncrement.svelte';

declare const NumberIncrement: import('svelte').Component<NumberIncrementProps, object, 'value'>;
type NumberIncrement = ReturnType<typeof NumberIncrement>;
export default NumberIncrement;
