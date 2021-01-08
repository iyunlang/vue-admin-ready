declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type Nullable<T> = T | null;

declare type RefType<T> = T | null;
