export type { TextAreaProps } from './TextArea.svelte';

declare const TextArea: import('svelte').Component<TextAreaProps, object, 'value'>;
type TextArea = ReturnType<typeof TextArea>;
export default TextArea;
