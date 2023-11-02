declare enum RequestStatus {
    INIT = "init",
    LOADING = "loading",
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}
interface State<T> {
    data: T | null;
    status: RequestStatus;
    error: any | null;
}
type RequestFunction<T, A> = (args: A) => Promise<T>;
interface IOptions<T, A = void> {
    request: RequestFunction<T, A>;
    defaultData?: T;
}
declare function useFetch<T, A = void>({ request, defaultData, }: IOptions<T, A>): [
    State<T>,
    (args?: A, refetch?: number) => Promise<T>,
    () => void
];

export { IOptions, RequestFunction, RequestStatus, State, useFetch };
