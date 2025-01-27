export type { TextInputProps } from './TextInput.svelte';

declare const TextInput: import('svelte').Component<TextInputProps, object, 'value'>;
type TextInput = ReturnType<typeof TextInput>;
export default TextInput;
