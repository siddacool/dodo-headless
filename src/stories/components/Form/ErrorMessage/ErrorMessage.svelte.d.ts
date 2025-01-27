export type { ErrorMessageProps } from './ErrorMessage.svelte';

declare const ErrorMessage: import('svelte').Component<ErrorMessageProps, object, ''>;
type ErrorMessage = ReturnType<typeof ErrorMessage>;
export default ErrorMessage;
