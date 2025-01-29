export type { NumberInputProps } from './NumberInput.svelte';
export { getValidNumericValue } from './NumberInput.svelte';

declare const NumberInput: import('svelte').Component<NumberInputProps, object, 'value'>;
type NumberInput = ReturnType<typeof NumberInput>;
export default NumberInput;
