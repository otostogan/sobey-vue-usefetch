"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = exports.RequestStatus = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vue_1 = require("vue");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["INIT"] = "init";
    RequestStatus["LOADING"] = "loading";
    RequestStatus["FULFILLED"] = "fulfilled";
    RequestStatus["REJECTED"] = "rejected";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
function useFetch({ request, defaultData, }) {
    const interval = (0, vue_1.ref)(null);
    const state = (0, vue_1.reactive)({
        data: defaultData ? defaultData : null,
        status: RequestStatus.INIT,
        error: null,
    });
    const useFetch = (args, refetch) => __awaiter(this, void 0, void 0, function* () {
        const fetch = () => {
            state.status = RequestStatus.LOADING;
            return request(args)
                .then((response) => {
                state.data = response;
                state.status = RequestStatus.FULFILLED;
                return response;
            })
                .catch((error) => {
                console.log(error);
                state.error = error;
                state.status = RequestStatus.REJECTED;
                throw error;
            });
        };
        if (refetch) {
            interval.value = setInterval(() => {
                fetch();
            }, refetch);
            return Promise.resolve(state.data);
        }
        else {
            return fetch();
        }
    });
    const resetInterval = () => {
        if (interval.value) {
            clearInterval(interval.value);
        }
    };
    (0, vue_1.onBeforeUnmount)(() => {
        resetInterval();
    });
    return [state, useFetch, resetInterval];
}
exports.useFetch = useFetch;
