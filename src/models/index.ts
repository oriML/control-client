export interface InfinitePagesInterface<T> {
    nextId?: number;
    previousId?: number;
    data: T;
    count: number;
}