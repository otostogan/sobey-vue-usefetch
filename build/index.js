"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var src_exports = {};
__export(src_exports, {
  RequestStatus: () => RequestStatus,
  useFetch: () => useFetch
});
module.exports = __toCommonJS(src_exports);
var import_vue = require("vue");
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
  const interval = (0, import_vue.ref)(null);
  const state = (0, import_vue.reactive)({
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
  (0, import_vue.onBeforeUnmount)(() => {
    resetInterval();
  });
  return [state, useFetch2, resetInterval, interval.value];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RequestStatus,
  useFetch
});
//# sourceMappingURL=index.js.map