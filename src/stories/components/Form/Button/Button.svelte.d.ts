export type { ButtonProps } from './Button.svelte';

declare const Button: import('svelte').Component<ButtonProps, object, ''>;
type Button = ReturnType<typeof Button>;
export default Button;
