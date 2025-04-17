import je, { createContext as vr, useReducer as pr, useContext as br } from "react";
var Q = { exports: {} }, N = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xe;
function gr() {
  if (xe)
    return N;
  xe = 1;
  var a = je, d = Symbol.for("react.element"), f = Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, c = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, b = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(w, g, m) {
    var h, _ = {}, j = null, M = null;
    m !== void 0 && (j = "" + m), g.key !== void 0 && (j = "" + g.key), g.ref !== void 0 && (M = g.ref);
    for (h in g)
      l.call(g, h) && !b.hasOwnProperty(h) && (_[h] = g[h]);
    if (w && w.defaultProps)
      for (h in g = w.defaultProps, g)
        _[h] === void 0 && (_[h] = g[h]);
    return { $$typeof: d, type: w, key: j, ref: M, props: _, _owner: c.current };
  }
  return N.Fragment = f, N.jsx = x, N.jsxs = x, N;
}
var W = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ce;
function mr() {
  return Ce || (Ce = 1, process.env.NODE_ENV !== "production" && function() {
    var a = je, d = Symbol.for("react.element"), f = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), w = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), ee = Symbol.iterator, Pe = "@@iterator";
    function Ie(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = ee && e[ee] || e[Pe];
      return typeof r == "function" ? r : null;
    }
    var I = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ke("error", e, t);
      }
    }
    function ke(e, r, t) {
      {
        var n = I.ReactDebugCurrentFrame, s = n.getStackAddendum();
        s !== "" && (r += "%s", t = t.concat([s]));
        var u = t.map(function(i) {
          return String(i);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var Ae = !1, De = !1, Fe = !1, $e = !1, Ne = !1, re;
    re = Symbol.for("react.module.reference");
    function We(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === l || e === b || Ne || e === c || e === m || e === h || $e || e === M || Ae || De || Fe || typeof e == "object" && e !== null && (e.$$typeof === j || e.$$typeof === _ || e.$$typeof === x || e.$$typeof === w || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === re || e.getModuleId !== void 0));
    }
    function Me(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var s = r.displayName || r.name || "";
      return s !== "" ? t + "(" + s + ")" : t;
    }
    function te(e) {
      return e.displayName || "Context";
    }
    function C(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case l:
          return "Fragment";
        case f:
          return "Portal";
        case b:
          return "Profiler";
        case c:
          return "StrictMode";
        case m:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            var r = e;
            return te(r) + ".Consumer";
          case x:
            var t = e;
            return te(t._context) + ".Provider";
          case g:
            return Me(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : C(e.type) || "Memo";
          case j: {
            var s = e, u = s._payload, i = s._init;
            try {
              return C(i(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var O = Object.assign, D = 0, ne, ae, oe, ie, se, ue, le;
    function ce() {
    }
    ce.__reactDisabledLog = !0;
    function Ye() {
      {
        if (D === 0) {
          ne = console.log, ae = console.info, oe = console.warn, ie = console.error, se = console.group, ue = console.groupCollapsed, le = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ce,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        D++;
      }
    }
    function Ue() {
      {
        if (D--, D === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: O({}, e, {
              value: ne
            }),
            info: O({}, e, {
              value: ae
            }),
            warn: O({}, e, {
              value: oe
            }),
            error: O({}, e, {
              value: ie
            }),
            group: O({}, e, {
              value: se
            }),
            groupCollapsed: O({}, e, {
              value: ue
            }),
            groupEnd: O({}, e, {
              value: le
            })
          });
        }
        D < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = I.ReactCurrentDispatcher, z;
    function Y(e, r, t) {
      {
        if (z === void 0)
          try {
            throw Error();
          } catch (s) {
            var n = s.stack.trim().match(/\n( *(at )?)/);
            z = n && n[1] || "";
          }
        return `
` + z + e;
      }
    }
    var B = !1, U;
    {
      var Ve = typeof WeakMap == "function" ? WeakMap : Map;
      U = new Ve();
    }
    function fe(e, r) {
      if (!e || B)
        return "";
      {
        var t = U.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      B = !0;
      var s = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = G.current, G.current = null, Ye();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (R) {
              n = R;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (R) {
              n = R;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (R) {
            n = R;
          }
          e();
        }
      } catch (R) {
        if (R && n && typeof R.stack == "string") {
          for (var o = R.stack.split(`
`), y = n.stack.split(`
`), v = o.length - 1, p = y.length - 1; v >= 1 && p >= 0 && o[v] !== y[p]; )
            p--;
          for (; v >= 1 && p >= 0; v--, p--)
            if (o[v] !== y[p]) {
              if (v !== 1 || p !== 1)
                do
                  if (v--, p--, p < 0 || o[v] !== y[p]) {
                    var T = `
` + o[v].replace(" at new ", " at ");
                    return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), typeof e == "function" && U.set(e, T), T;
                  }
                while (v >= 1 && p >= 0);
              break;
            }
        }
      } finally {
        B = !1, G.current = u, Ue(), Error.prepareStackTrace = s;
      }
      var A = e ? e.displayName || e.name : "", P = A ? Y(A) : "";
      return typeof e == "function" && U.set(e, P), P;
    }
    function Le(e, r, t) {
      return fe(e, !1);
    }
    function Ge(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function V(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return fe(e, Ge(e));
      if (typeof e == "string")
        return Y(e);
      switch (e) {
        case m:
          return Y("Suspense");
        case h:
          return Y("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Le(e.render);
          case _:
            return V(e.type, r, t);
          case j: {
            var n = e, s = n._payload, u = n._init;
            try {
              return V(u(s), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var F = Object.prototype.hasOwnProperty, de = {}, ve = I.ReactDebugCurrentFrame;
    function L(e) {
      if (e) {
        var r = e._owner, t = V(e.type, e._source, r ? r.type : null);
        ve.setExtraStackFrame(t);
      } else
        ve.setExtraStackFrame(null);
    }
    function ze(e, r, t, n, s) {
      {
        var u = Function.call.bind(F);
        for (var i in e)
          if (u(e, i)) {
            var o = void 0;
            try {
              if (typeof e[i] != "function") {
                var y = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              o = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (v) {
              o = v;
            }
            o && !(o instanceof Error) && (L(s), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof o), L(null)), o instanceof Error && !(o.message in de) && (de[o.message] = !0, L(s), E("Failed %s type: %s", t, o.message), L(null));
          }
      }
    }
    var Be = Array.isArray;
    function J(e) {
      return Be(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function qe(e) {
      try {
        return pe(e), !1;
      } catch {
        return !0;
      }
    }
    function pe(e) {
      return "" + e;
    }
    function be(e) {
      if (qe(e))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), pe(e);
    }
    var $ = I.ReactCurrentOwner, Ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, me, q;
    q = {};
    function Xe(e) {
      if (F.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function He(e) {
      if (F.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      if (typeof e.ref == "string" && $.current && r && $.current.stateNode !== r) {
        var t = C($.current.type);
        q[t] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C($.current.type), e.ref), q[t] = !0);
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          ge || (ge = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var t = function() {
          me || (me = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, t, n, s, u, i) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(o, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(o, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function tr(e, r, t, n, s) {
      {
        var u, i = {}, o = null, y = null;
        t !== void 0 && (be(t), o = "" + t), He(r) && (be(r.key), o = "" + r.key), Xe(r) && (y = r.ref, Ze(r, s));
        for (u in r)
          F.call(r, u) && !Ke.hasOwnProperty(u) && (i[u] = r[u]);
        if (e && e.defaultProps) {
          var v = e.defaultProps;
          for (u in v)
            i[u] === void 0 && (i[u] = v[u]);
        }
        if (o || y) {
          var p = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && Qe(i, p), y && er(i, p);
        }
        return rr(e, o, y, s, n, $.current, i);
      }
    }
    var K = I.ReactCurrentOwner, he = I.ReactDebugCurrentFrame;
    function k(e) {
      if (e) {
        var r = e._owner, t = V(e.type, e._source, r ? r.type : null);
        he.setExtraStackFrame(t);
      } else
        he.setExtraStackFrame(null);
    }
    var X;
    X = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function Ee() {
      {
        if (K.current) {
          var e = C(K.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function nr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var ye = {};
    function ar(e) {
      {
        var r = Ee();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Re(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = ar(r);
        if (ye[t])
          return;
        ye[t] = !0;
        var n = "";
        e && e._owner && e._owner !== K.current && (n = " It was passed a child from " + C(e._owner.type) + "."), k(e), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), k(null);
      }
    }
    function _e(e, r) {
      {
        if (typeof e != "object")
          return;
        if (J(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            H(n) && Re(n, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var s = Ie(e);
          if (typeof s == "function" && s !== e.entries)
            for (var u = s.call(e), i; !(i = u.next()).done; )
              H(i.value) && Re(i.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = C(r);
          ze(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !X) {
          X = !0;
          var s = C(r);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", s || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            k(e), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), k(null);
            break;
          }
        }
        e.ref !== null && (k(e), E("Invalid attribute `ref` supplied to `React.Fragment`."), k(null));
      }
    }
    var Te = {};
    function Se(e, r, t, n, s, u) {
      {
        var i = We(e);
        if (!i) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var y = nr(s);
          y ? o += y : o += Ee();
          var v;
          e === null ? v = "null" : J(e) ? v = "array" : e !== void 0 && e.$$typeof === d ? (v = "<" + (C(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : v = typeof e, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", v, o);
        }
        var p = tr(e, r, t, s, u);
        if (p == null)
          return p;
        if (i) {
          var T = r.children;
          if (T !== void 0)
            if (n)
              if (J(T)) {
                for (var A = 0; A < T.length; A++)
                  _e(T[A], e);
                Object.freeze && Object.freeze(T);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _e(T, e);
        }
        if (F.call(r, "key")) {
          var P = C(e), R = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), Z = R.length > 0 ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Te[P + Z]) {
            var fr = R.length > 0 ? "{" + R.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Z, P, fr, P), Te[P + Z] = !0;
          }
        }
        return e === l ? ir(p) : or(p), p;
      }
    }
    function sr(e, r, t) {
      return Se(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Se(e, r, t, !1);
    }
    var lr = ur, cr = sr;
    W.Fragment = l, W.jsx = lr, W.jsxs = cr;
  }()), W;
}
process.env.NODE_ENV === "production" ? Q.exports = gr() : Q.exports = mr();
var S = Q.exports;
const hr = {
  config: {
    groups: [],
    orientation: "horizontal",
    size: "medium",
    position: "top"
  },
  activeItem: null
}, Er = (a, d) => {
  switch (d.type) {
    case "REGISTER_ITEM": {
      const f = d.payload, l = a.config.groups.findIndex((c) => c.id === f.group);
      if (l === -1)
        return {
          ...a,
          config: {
            ...a.config,
            groups: [
              ...a.config.groups,
              {
                id: f.group || "default",
                label: f.group || "Default",
                items: [f]
              }
            ]
          }
        };
      {
        const c = [...a.config.groups];
        return c[l] = {
          ...c[l],
          items: [...c[l].items, f]
        }, {
          ...a,
          config: {
            ...a.config,
            groups: c
          }
        };
      }
    }
    case "UNREGISTER_ITEM": {
      const f = d.payload, l = a.config.groups.map((c) => ({
        ...c,
        items: c.items.filter((b) => b.id !== f)
      })).filter((c) => c.items.length > 0);
      return {
        ...a,
        config: {
          ...a.config,
          groups: l
        }
      };
    }
    case "SET_ACTIVE_ITEM":
      return {
        ...a,
        activeItem: d.payload
      };
    case "UPDATE_ITEM": {
      const { id: f, updates: l } = d.payload, c = a.config.groups.map((b) => ({
        ...b,
        items: b.items.map(
          (x) => x.id === f ? { ...x, ...l } : x
        )
      }));
      return {
        ...a,
        config: {
          ...a.config,
          groups: c
        }
      };
    }
    default:
      return a;
  }
}, we = vr(void 0), Tr = ({ children: a }) => {
  const [d, f] = pr(Er, hr), l = (m) => {
    f({ type: "REGISTER_ITEM", payload: m });
  }, c = (m) => {
    f({ type: "UNREGISTER_ITEM", payload: m });
  }, b = (m) => {
    f({ type: "SET_ACTIVE_ITEM", payload: m });
  }, g = {
    state: d,
    registerItem: l,
    unregisterItem: c,
    setActiveItem: b,
    executeAction: (m) => {
      for (const h of d.config.groups) {
        const _ = h.items.find((j) => j.id === m);
        if (_ && !_.disabled) {
          _.action(), b(m);
          break;
        }
      }
    },
    updateItemState: (m, h) => {
      f({
        type: "UPDATE_ITEM",
        payload: { id: m, updates: h }
      });
    }
  };
  return /* @__PURE__ */ S.jsx(we.Provider, { value: g, children: a });
}, Oe = () => {
  const a = br(we);
  if (a === void 0)
    throw new Error("useToolbar must be used within a ToolbarProvider");
  return a;
};
const yr = ({ item: a }) => {
  const { state: d, executeAction: f } = Oe(), l = d.activeItem === a.id, c = () => {
    a.disabled || f(a.id);
  }, b = `vcut-toolbar-item ${l ? "active" : ""} ${a.disabled ? "disabled" : ""}`.trim();
  return /* @__PURE__ */ S.jsxs(
    "button",
    {
      className: b,
      onClick: c,
      disabled: a.disabled,
      title: a.tooltip || a.label,
      "aria-label": a.label,
      "data-shortcut": a.shortcut,
      children: [
        /* @__PURE__ */ S.jsx("span", { className: "vcut-toolbar-item-icon", children: a.icon }),
        /* @__PURE__ */ S.jsx("span", { className: "vcut-toolbar-item-label", children: a.label }),
        a.shortcut && /* @__PURE__ */ S.jsx("span", { className: "vcut-toolbar-item-shortcut", children: a.shortcut })
      ]
    }
  );
};
const Rr = ({ group: a }) => /* @__PURE__ */ S.jsxs("div", { className: "vcut-toolbar-group", role: "group", "aria-label": a.label, children: [
  /* @__PURE__ */ S.jsx("div", { className: "vcut-toolbar-group-label", children: a.label }),
  /* @__PURE__ */ S.jsx("div", { className: "vcut-toolbar-group-items", children: a.items.map((d) => /* @__PURE__ */ S.jsx(yr, { item: d }, d.id)) })
] });
const Sr = ({ className: a = "", style: d }) => {
  const { state: f } = Oe(), { config: l } = f, c = `vcut-toolbar ${l.orientation || "horizontal"} ${l.position || "top"} ${l.size || "medium"} ${a}`.trim();
  return /* @__PURE__ */ S.jsx("div", { className: c, style: d, role: "toolbar", "aria-orientation": l.orientation, children: l.groups.map((b) => /* @__PURE__ */ S.jsx(
    Rr,
    {
      group: b
    },
    b.id
  )) });
};
export {
  Sr as Toolbar,
  Tr as ToolbarProvider,
  Oe as useToolbar
};
