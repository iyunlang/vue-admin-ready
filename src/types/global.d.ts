declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

declare type Nullable<T> = T | null;
