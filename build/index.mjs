var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import { reactive, ref, onBeforeUnmount } from "vue";
var RequestStatus = /* @__PURE__ */ ((RequestStatus2) => {
  RequestStatus2["INIT"] = "init";
  RequestStatus2["LOADING"] = "loading";
  RequestStatus2["FULFILLED"] = "fulfilled";
  RequestStatus2["REJECTED"] = "rejected";
  return RequestStatus2;
})(RequestStatus || {});
function useFetch({
  request,
  defaultData
}) {
  const interval = ref(null);
  const state = reactive({
    data: defaultData !== void 0 ? defaultData : null,
    status: "init" /* INIT */,
    error: null
  });
  const useFetch2 = (args, refetch) => __async(this, null, function* () {
    const fetch = () => {
      state.status = "loading" /* LOADING */;
      return request(args).then((response) => {
        state.data = response;
        state.status = "fulfilled" /* FULFILLED */;
        state.error = null;
        return response;
      }).catch((error) => {
        console.error(error);
        state.error = error;
        state.status = "rejected" /* REJECTED */;
        throw error;
      });
    };
    if (refetch) {
      interval.value = setInterval(() => {
        fetch();
      }, refetch);
      return Promise.resolve(state.data);
    } else {
      return fetch();
    }
  });
  const resetInterval = () => {
    if (interval.value) {
      clearInterval(interval.value);
      interval.value = null;
    }
  };
  onBeforeUnmount(() => {
    resetInterval();
  });
  return [state, useFetch2, resetInterval, interval];
}
export {
  RequestStatus,
  useFetch
};
//# sourceMappingURL=index.mjs.map