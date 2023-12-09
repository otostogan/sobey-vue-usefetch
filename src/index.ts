// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { reactive, UnwrapRef, ref, onBeforeUnmount } from "vue";

export enum RequestStatus {
	INIT = "init",
	LOADING = "loading",
	FULFILLED = "fulfilled",
	REJECTED = "rejected",
}

export interface State<T> {
	data: T | null;
	status: RequestStatus;
	error: any | null;
}

export type RequestFunction<T, A> = (args: A) => Promise<T>;

export interface IOptions<T, A = void> {
	request: RequestFunction<T, A>;
	defaultData?: T;
}

export function useFetch<T, A = void>({
	request,
	defaultData,
}: IOptions<T, A>): [
	State<T>,
	(args?: A, refetch?: number) => Promise<T>,
	() => void,
	number | null
] {
	const interval = ref<number | null>(null);

	const state = reactive<State<T>>({
		data: defaultData !== undefined ? defaultData : null,
		status: RequestStatus.INIT,
		error: null,
	});

	const useFetch = async (args?: A, refetch?: number) => {
		const fetch = () => {
			state.status = RequestStatus.LOADING;
			return request(args!)
				.then((response) => {
					state.data = response as unknown as UnwrapRef<T>;
					state.status = RequestStatus.FULFILLED;
					state.error = null;
					return response;
				})
				.catch((error) => {
					console.error(error);
					state.error = error;
					state.status = RequestStatus.REJECTED;
					throw error;
				});
		};
		if (refetch) {
			interval.value = setInterval(() => {
				fetch();
			}, refetch);

			return Promise.resolve(state.data as T);
		} else {
			return fetch();
		}
	};

	const resetInterval = () => {
		if (interval.value) {
			clearInterval(interval.value);
			interval.value = null;
		}
	};

	onBeforeUnmount(() => {
		resetInterval();
	});

	return [state as State<T>, useFetch, resetInterval, interval.value];
}
