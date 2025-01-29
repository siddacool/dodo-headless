import type { Snippet } from 'svelte';
export interface SelectProps {
    title?: string;
    class?: string;
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    error?: string;
    onchange?: () => void;
    onblur?: () => void;
    onfocus?: () => void;
    before?: Snippet;
    after?: Snippet;
    readonly?: boolean;
    options: any[];
    renderOption?: Snippet;
    searchable?: boolean;
}
declare const Select: import("svelte").Component<SelectProps, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
