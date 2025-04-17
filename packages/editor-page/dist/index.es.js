import Le, { createContext as gr, useReducer as br, useCallback as T, useContext as _r, useState as Rr, useEffect as De } from "react";
var se = { exports: {} }, Y = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function Sr() {
  if (Fe)
    return Y;
  Fe = 1;
  var t = Le, a = Symbol.for("react.element"), g = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function P(j, h, k) {
    var m, R = {}, O = null, D = null;
    k !== void 0 && (O = "" + k), h.key !== void 0 && (O = "" + h.key), h.ref !== void 0 && (D = h.ref);
    for (m in h)
      v.call(h, m) && !C.hasOwnProperty(m) && (R[m] = h[m]);
    if (j && j.defaultProps)
      for (m in h = j.defaultProps, h)
        R[m] === void 0 && (R[m] = h[m]);
    return { $$typeof: a, type: j, key: O, ref: D, props: R, _owner: i.current };
  }
  return Y.Fragment = g, Y.jsx = P, Y.jsxs = P, Y;
}
var G = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Me;
function xr() {
  return Me || (Me = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Le, a = Symbol.for("react.element"), g = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), j = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), D = Symbol.for("react.offscreen"), M = Symbol.iterator, S = "@@iterator";
    function b(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = M && e[M] || e[S];
      return typeof r == "function" ? r : null;
    }
    var F = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function l(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          n[o - 1] = arguments[o];
        Z("error", e, n);
      }
    }
    function Z(e, r, n) {
      {
        var o = F.ReactDebugCurrentFrame, d = o.getStackAddendum();
        d !== "" && (r += "%s", n = n.concat([d]));
        var f = n.map(function(c) {
          return String(c);
        });
        f.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, f);
      }
    }
    var Ue = !1, $e = !1, Ve = !1, We = !1, Ye = !1, ue;
    ue = Symbol.for("react.module.reference");
    function Ge(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === v || e === C || Ye || e === i || e === k || e === m || We || e === D || Ue || $e || Ve || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === R || e.$$typeof === P || e.$$typeof === j || e.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ue || e.getModuleId !== void 0));
    }
    function Be(e, r, n) {
      var o = e.displayName;
      if (o)
        return o;
      var d = r.displayName || r.name || "";
      return d !== "" ? n + "(" + d + ")" : n;
    }
    function ce(e) {
      return e.displayName || "Context";
    }
    function I(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && l("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case v:
          return "Fragment";
        case g:
          return "Portal";
        case C:
          return "Profiler";
        case i:
          return "StrictMode";
        case k:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case j:
            var r = e;
            return ce(r) + ".Consumer";
          case P:
            var n = e;
            return ce(n._context) + ".Provider";
          case h:
            return Be(e, e.render, "ForwardRef");
          case R:
            var o = e.displayName || null;
            return o !== null ? o : I(e.type) || "Memo";
          case O: {
            var d = e, f = d._payload, c = d._init;
            try {
              return I(c(f));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, $ = 0, de, fe, pe, ve, he, ye, me;
    function Ee() {
    }
    Ee.__reactDisabledLog = !0;
    function ze() {
      {
        if ($ === 0) {
          de = console.log, fe = console.info, pe = console.warn, ve = console.error, he = console.group, ye = console.groupCollapsed, me = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Ee,
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
        $++;
      }
    }
    function Ke() {
      {
        if ($--, $ === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, e, {
              value: de
            }),
            info: A({}, e, {
              value: fe
            }),
            warn: A({}, e, {
              value: pe
            }),
            error: A({}, e, {
              value: ve
            }),
            group: A({}, e, {
              value: he
            }),
            groupCollapsed: A({}, e, {
              value: ye
            }),
            groupEnd: A({}, e, {
              value: me
            })
          });
        }
        $ < 0 && l("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var H = F.ReactCurrentDispatcher, Q;
    function B(e, r, n) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (d) {
            var o = d.stack.trim().match(/\n( *(at )?)/);
            Q = o && o[1] || "";
          }
        return `
` + Q + e;
      }
    }
    var ee = !1, z;
    {
      var Je = typeof WeakMap == "function" ? WeakMap : Map;
      z = new Je();
    }
    function ge(e, r) {
      if (!e || ee)
        return "";
      {
        var n = z.get(e);
        if (n !== void 0)
          return n;
      }
      var o;
      ee = !0;
      var d = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var f;
      f = H.current, H.current = null, ze();
      try {
        if (r) {
          var c = function() {
            throw Error();
          };
          if (Object.defineProperty(c.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(c, []);
            } catch (x) {
              o = x;
            }
            Reflect.construct(e, [], c);
          } else {
            try {
              c.call();
            } catch (x) {
              o = x;
            }
            e.call(c.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            o = x;
          }
          e();
        }
      } catch (x) {
        if (x && o && typeof x.stack == "string") {
          for (var u = x.stack.split(`
`), _ = o.stack.split(`
`), p = u.length - 1, y = _.length - 1; p >= 1 && y >= 0 && u[p] !== _[y]; )
            y--;
          for (; p >= 1 && y >= 0; p--, y--)
            if (u[p] !== _[y]) {
              if (p !== 1 || y !== 1)
                do
                  if (p--, y--, y < 0 || u[p] !== _[y]) {
                    var w = `
` + u[p].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && z.set(e, w), w;
                  }
                while (p >= 1 && y >= 0);
              break;
            }
        }
      } finally {
        ee = !1, H.current = f, Ke(), Error.prepareStackTrace = d;
      }
      var U = e ? e.displayName || e.name : "", L = U ? B(U) : "";
      return typeof e == "function" && z.set(e, L), L;
    }
    function qe(e, r, n) {
      return ge(e, !1);
    }
    function Xe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function K(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, Xe(e));
      if (typeof e == "string")
        return B(e);
      switch (e) {
        case k:
          return B("Suspense");
        case m:
          return B("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            return qe(e.render);
          case R:
            return K(e.type, r, n);
          case O: {
            var o = e, d = o._payload, f = o._init;
            try {
              return K(f(d), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var V = Object.prototype.hasOwnProperty, be = {}, _e = F.ReactDebugCurrentFrame;
    function J(e) {
      if (e) {
        var r = e._owner, n = K(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(n);
      } else
        _e.setExtraStackFrame(null);
    }
    function Ze(e, r, n, o, d) {
      {
        var f = Function.call.bind(V);
        for (var c in e)
          if (f(e, c)) {
            var u = void 0;
            try {
              if (typeof e[c] != "function") {
                var _ = Error((o || "React class") + ": " + n + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              u = e[c](r, c, o, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (p) {
              u = p;
            }
            u && !(u instanceof Error) && (J(d), l("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", n, c, typeof u), J(null)), u instanceof Error && !(u.message in be) && (be[u.message] = !0, J(d), l("Failed %s type: %s", n, u.message), J(null));
          }
      }
    }
    var He = Array.isArray;
    function re(e) {
      return He(e);
    }
    function Qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function er(e) {
      try {
        return Re(e), !1;
      } catch {
        return !0;
      }
    }
    function Re(e) {
      return "" + e;
    }
    function Se(e) {
      if (er(e))
        return l("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), Re(e);
    }
    var W = F.ReactCurrentOwner, rr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, xe, je, te;
    te = {};
    function tr(e) {
      if (V.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function nr(e) {
      if (V.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ar(e, r) {
      if (typeof e.ref == "string" && W.current && r && W.current.stateNode !== r) {
        var n = I(W.current.type);
        te[n] || (l('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(W.current.type), e.ref), te[n] = !0);
      }
    }
    function ir(e, r) {
      {
        var n = function() {
          xe || (xe = !0, l("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function or(e, r) {
      {
        var n = function() {
          je || (je = !0, l("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var sr = function(e, r, n, o, d, f, c) {
      var u = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: c,
        // Record the component responsible for creating this element.
        _owner: f
      };
      return u._store = {}, Object.defineProperty(u._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(u, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(u, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(u.props), Object.freeze(u)), u;
    };
    function lr(e, r, n, o, d) {
      {
        var f, c = {}, u = null, _ = null;
        n !== void 0 && (Se(n), u = "" + n), nr(r) && (Se(r.key), u = "" + r.key), tr(r) && (_ = r.ref, ar(r, d));
        for (f in r)
          V.call(r, f) && !rr.hasOwnProperty(f) && (c[f] = r[f]);
        if (e && e.defaultProps) {
          var p = e.defaultProps;
          for (f in p)
            c[f] === void 0 && (c[f] = p[f]);
        }
        if (u || _) {
          var y = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          u && ir(c, y), _ && or(c, y);
        }
        return sr(e, u, _, d, o, W.current, c);
      }
    }
    var ne = F.ReactCurrentOwner, Te = F.ReactDebugCurrentFrame;
    function N(e) {
      if (e) {
        var r = e._owner, n = K(e.type, e._source, r ? r.type : null);
        Te.setExtraStackFrame(n);
      } else
        Te.setExtraStackFrame(null);
    }
    var ae;
    ae = !1;
    function ie(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function we() {
      {
        if (ne.current) {
          var e = I(ne.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ur(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + r + ":" + n + ".";
        }
        return "";
      }
    }
    var Pe = {};
    function cr(e) {
      {
        var r = we();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function Oe(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = cr(r);
        if (Pe[n])
          return;
        Pe[n] = !0;
        var o = "";
        e && e._owner && e._owner !== ne.current && (o = " It was passed a child from " + I(e._owner.type) + "."), N(e), l('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, o), N(null);
      }
    }
    function Ce(e, r) {
      {
        if (typeof e != "object")
          return;
        if (re(e))
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            ie(o) && Oe(o, r);
          }
        else if (ie(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = b(e);
          if (typeof d == "function" && d !== e.entries)
            for (var f = d.call(e), c; !(c = f.next()).done; )
              ie(c.value) && Oe(c.value, r);
        }
      }
    }
    function dr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          n = r.propTypes;
        else
          return;
        if (n) {
          var o = I(r);
          Ze(n, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !ae) {
          ae = !0;
          var d = I(r);
          l("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && l("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function fr(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var o = r[n];
          if (o !== "children" && o !== "key") {
            N(e), l("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), N(null);
            break;
          }
        }
        e.ref !== null && (N(e), l("Invalid attribute `ref` supplied to `React.Fragment`."), N(null));
      }
    }
    var ke = {};
    function Ie(e, r, n, o, d, f) {
      {
        var c = Ge(e);
        if (!c) {
          var u = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = ur(d);
          _ ? u += _ : u += we();
          var p;
          e === null ? p = "null" : re(e) ? p = "array" : e !== void 0 && e.$$typeof === a ? (p = "<" + (I(e.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : p = typeof e, l("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, u);
        }
        var y = lr(e, r, n, d, f);
        if (y == null)
          return y;
        if (c) {
          var w = r.children;
          if (w !== void 0)
            if (o)
              if (re(w)) {
                for (var U = 0; U < w.length; U++)
                  Ce(w[U], e);
                Object.freeze && Object.freeze(w);
              } else
                l("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ce(w, e);
        }
        if (V.call(r, "key")) {
          var L = I(e), x = Object.keys(r).filter(function(Er) {
            return Er !== "key";
          }), oe = x.length > 0 ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ke[L + oe]) {
            var mr = x.length > 0 ? "{" + x.join(": ..., ") + ": ...}" : "{}";
            l(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, oe, L, mr, L), ke[L + oe] = !0;
          }
        }
        return e === v ? fr(y) : dr(y), y;
      }
    }
    function pr(e, r, n) {
      return Ie(e, r, n, !0);
    }
    function vr(e, r, n) {
      return Ie(e, r, n, !1);
    }
    var hr = vr, yr = pr;
    G.Fragment = v, G.jsx = hr, G.jsxs = yr;
  }()), G;
}
process.env.NODE_ENV === "production" ? se.exports = Sr() : se.exports = xr();
var s = se.exports;
let q;
const jr = new Uint8Array(16);
function Tr() {
  if (!q && (q = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !q))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return q(jr);
}
const E = [];
for (let t = 0; t < 256; ++t)
  E.push((t + 256).toString(16).slice(1));
function wr(t, a = 0) {
  return E[t[a + 0]] + E[t[a + 1]] + E[t[a + 2]] + E[t[a + 3]] + "-" + E[t[a + 4]] + E[t[a + 5]] + "-" + E[t[a + 6]] + E[t[a + 7]] + "-" + E[t[a + 8]] + E[t[a + 9]] + "-" + E[t[a + 10]] + E[t[a + 11]] + E[t[a + 12]] + E[t[a + 13]] + E[t[a + 14]] + E[t[a + 15]];
}
const Pr = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ae = {
  randomUUID: Pr
};
function le(t, a, g) {
  if (Ae.randomUUID && !a && !t)
    return Ae.randomUUID();
  t = t || {};
  const v = t.random || (t.rng || Tr)();
  if (v[6] = v[6] & 15 | 64, v[8] = v[8] & 63 | 128, a) {
    g = g || 0;
    for (let i = 0; i < 16; ++i)
      a[g + i] = v[i];
    return a;
  }
  return wr(v);
}
const X = {
  currentMode: "video",
  project: {
    id: le(),
    name: "새 프로젝트",
    created: /* @__PURE__ */ new Date(),
    lastModified: /* @__PURE__ */ new Date(),
    duration: 0,
    resolution: {
      width: 1920,
      height: 1080
    },
    frameRate: 30
  },
  mediaFiles: [],
  selectedMediaId: null,
  history: {
    past: [],
    future: []
  },
  timelineState: {
    zoom: 1,
    scrollPosition: 0
  },
  uiState: {
    sidebarOpen: !0,
    activePanelId: "media",
    fullscreen: !1
  }
}, Or = (t, a) => {
  var g;
  switch (a.type) {
    case "SET_MODE":
      return {
        ...t,
        currentMode: a.payload
      };
    case "SET_PROJECT":
      return {
        ...t,
        project: {
          ...t.project,
          ...a.payload,
          lastModified: /* @__PURE__ */ new Date()
        }
      };
    case "ADD_MEDIA_FILE":
      return {
        ...t,
        mediaFiles: [...t.mediaFiles, a.payload],
        selectedMediaId: a.payload.id
      };
    case "REMOVE_MEDIA_FILE":
      return {
        ...t,
        mediaFiles: t.mediaFiles.filter((j) => j.id !== a.payload),
        selectedMediaId: t.selectedMediaId === a.payload ? null : t.selectedMediaId
      };
    case "SELECT_MEDIA_FILE":
      return {
        ...t,
        selectedMediaId: a.payload
      };
    case "SET_TIMELINE_ZOOM":
      return {
        ...t,
        timelineState: {
          ...t.timelineState,
          zoom: a.payload
        }
      };
    case "SET_TIMELINE_SCROLL":
      return {
        ...t,
        timelineState: {
          ...t.timelineState,
          scrollPosition: a.payload
        }
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...t,
        uiState: {
          ...t.uiState,
          sidebarOpen: a.payload !== void 0 ? a.payload : !t.uiState.sidebarOpen
        }
      };
    case "SET_ACTIVE_PANEL":
      return {
        ...t,
        uiState: {
          ...t.uiState,
          activePanelId: a.payload
        }
      };
    case "TOGGLE_FULLSCREEN":
      return {
        ...t,
        uiState: {
          ...t.uiState,
          fullscreen: a.payload !== void 0 ? a.payload : !t.uiState.fullscreen
        }
      };
    case "UNDO":
      if (t.history.past.length === 0)
        return t;
      const v = t.history.past[t.history.past.length - 1], i = t.history.past.slice(0, t.history.past.length - 1);
      return {
        ...v,
        history: {
          past: i,
          future: [t, ...t.history.future]
        }
      };
    case "REDO":
      if (t.history.future.length === 0)
        return t;
      const C = t.history.future[0], P = t.history.future.slice(1);
      return {
        ...C,
        history: {
          past: [...t.history.past, t],
          future: P
        }
      };
    case "RESET_STATE":
      return {
        ...X,
        ...a.payload,
        project: {
          ...X.project,
          ...((g = a.payload) == null ? void 0 : g.project) || {},
          id: le(),
          created: /* @__PURE__ */ new Date(),
          lastModified: /* @__PURE__ */ new Date()
        }
      };
    default:
      return t;
  }
}, Ne = gr({
  state: X,
  dispatch: () => {
  },
  setMode: () => {
  },
  updateProject: () => {
  },
  addMediaFile: () => {
  },
  removeMediaFile: () => {
  },
  selectMediaFile: () => {
  },
  setTimelineZoom: () => {
  },
  setTimelineScroll: () => {
  },
  toggleSidebar: () => {
  },
  setActivePanel: () => {
  },
  toggleFullscreen: () => {
  },
  undo: () => {
  },
  redo: () => {
  },
  resetState: () => {
  }
}), Lr = ({
  children: t,
  mcpFactory: a,
  ffmpegService: g
}) => {
  const [v, i] = br(Or, X), C = T((l) => {
    i({ type: "SET_MODE", payload: l });
  }, []), P = T((l) => {
    i({ type: "SET_PROJECT", payload: l });
  }, []), j = T((l) => {
    const Z = {
      ...l,
      id: le()
    };
    i({ type: "ADD_MEDIA_FILE", payload: Z });
  }, []), h = T((l) => {
    i({ type: "REMOVE_MEDIA_FILE", payload: l });
  }, []), k = T((l) => {
    i({ type: "SELECT_MEDIA_FILE", payload: l });
  }, []), m = T((l) => {
    i({ type: "SET_TIMELINE_ZOOM", payload: l });
  }, []), R = T((l) => {
    i({ type: "SET_TIMELINE_SCROLL", payload: l });
  }, []), O = T((l) => {
    i({ type: "TOGGLE_SIDEBAR", payload: l });
  }, []), D = T((l) => {
    i({ type: "SET_ACTIVE_PANEL", payload: l });
  }, []), M = T((l) => {
    i({ type: "TOGGLE_FULLSCREEN", payload: l });
  }, []), S = T(() => {
    i({ type: "UNDO" });
  }, []), b = T(() => {
    i({ type: "REDO" });
  }, []), F = T((l) => {
    i({ type: "RESET_STATE", payload: l });
  }, []);
  return /* @__PURE__ */ s.jsx(
    Ne.Provider,
    {
      value: {
        state: v,
        dispatch: i,
        setMode: C,
        updateProject: P,
        addMediaFile: j,
        removeMediaFile: h,
        selectMediaFile: k,
        setTimelineZoom: m,
        setTimelineScroll: R,
        toggleSidebar: O,
        setActivePanel: D,
        toggleFullscreen: M,
        undo: S,
        redo: b,
        resetState: F,
        mcpFactory: a,
        ffmpegService: g
      },
      children: t
    }
  );
}, Cr = () => {
  const t = _r(Ne);
  if (t === void 0)
    throw new Error("useEditorPage must be used within a EditorPageProvider");
  return t;
}, kr = () => /* @__PURE__ */ s.jsx("div", { className: "mock-playhead", style: {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#333",
  color: "white"
}, children: "Playhead 컴포넌트 (목업)" }), Ir = ({ zoom: t, scrollPosition: a }) => /* @__PURE__ */ s.jsxs("div", { className: "mock-timeline", style: {
  width: "100%",
  height: "100%",
  backgroundColor: "#252525",
  color: "white",
  padding: "10px"
}, children: [
  /* @__PURE__ */ s.jsx("p", { children: "Timeline 컴포넌트 (목업)" }),
  /* @__PURE__ */ s.jsxs("p", { children: [
    "줌: ",
    t,
    ", 스크롤 위치: ",
    a
  ] })
] }), Dr = ({ currentMode: t, onModeChange: a }) => /* @__PURE__ */ s.jsxs("div", { className: "mock-toolbar", style: {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2d2d2d",
  color: "white",
  padding: "0 10px"
}, children: [
  /* @__PURE__ */ s.jsxs("span", { children: [
    "Toolbar 컴포넌트 (목업) - 현재 모드: ",
    t
  ] }),
  /* @__PURE__ */ s.jsxs("div", { style: { marginLeft: "auto", display: "flex", gap: "10px" }, children: [
    /* @__PURE__ */ s.jsx("button", { onClick: () => a("video"), children: "비디오" }),
    /* @__PURE__ */ s.jsx("button", { onClick: () => a("audio"), children: "오디오" }),
    /* @__PURE__ */ s.jsx("button", { onClick: () => a("text"), children: "텍스트" }),
    /* @__PURE__ */ s.jsx("button", { onClick: () => a("effects"), children: "효과" })
  ] })
] }), Fr = ({ mediaFiles: t, selectedMediaId: a }) => /* @__PURE__ */ s.jsxs("div", { className: "mock-media-browser", style: {
  width: "100%",
  height: "100%",
  backgroundColor: "#252525",
  color: "white",
  padding: "10px"
}, children: [
  /* @__PURE__ */ s.jsx("p", { children: "MediaBrowser 컴포넌트 (목업)" }),
  /* @__PURE__ */ s.jsxs("p", { children: [
    "미디어 파일 수: ",
    t.length
  ] }),
  /* @__PURE__ */ s.jsxs("p", { children: [
    "선택된 미디어 ID: ",
    a || "없음"
  ] })
] }), Mr = () => /* @__PURE__ */ s.jsxs("div", { className: "mock-effects-panel", style: {
  width: "100%",
  height: "100%",
  backgroundColor: "#252525",
  color: "white",
  padding: "10px"
}, children: [
  /* @__PURE__ */ s.jsx("p", { children: "EffectsPanel 컴포넌트 (목업)" }),
  /* @__PURE__ */ s.jsxs("ul", { children: [
    /* @__PURE__ */ s.jsx("li", { children: "효과 1" }),
    /* @__PURE__ */ s.jsx("li", { children: "효과 2" }),
    /* @__PURE__ */ s.jsx("li", { children: "효과 3" })
  ] })
] });
const Nr = ({
  projectId: t,
  initialData: a,
  onSave: g,
  onExport: v
}) => {
  const {
    state: i,
    setMode: C,
    toggleSidebar: P,
    setActivePanel: j,
    toggleFullscreen: h
  } = Cr(), [k, m] = Rr(!0);
  De(() => {
    m(!1);
  }, [a, t]), De(() => {
    const S = (b) => {
      b.ctrlKey && b.key === "s" && (b.preventDefault(), R()), b.ctrlKey && b.key === "z" && b.preventDefault(), b.ctrlKey && b.key === "y" && b.preventDefault(), b.key === "F11" && (b.preventDefault(), h());
    };
    return window.addEventListener("keydown", S), () => {
      window.removeEventListener("keydown", S);
    };
  }, [h]);
  const R = () => {
    if (g) {
      const S = {
        ...i.project,
        mediaFiles: i.mediaFiles
        // 기타 저장할 데이터
      };
      g(S);
    }
  }, O = (S) => {
    v && v(S);
  }, D = (S) => {
    C(S);
  }, M = (S) => {
    j(S);
  };
  return k ? /* @__PURE__ */ s.jsx("div", { className: "editor-page-loading", children: "로딩 중..." }) : /* @__PURE__ */ s.jsxs("div", { className: `editor-page ${i.uiState.fullscreen ? "fullscreen" : ""}`, children: [
    /* @__PURE__ */ s.jsx("div", { className: "editor-page-toolbar", children: /* @__PURE__ */ s.jsx(
      Dr,
      {
        currentMode: i.currentMode,
        onModeChange: D,
        onSave: R,
        onExport: O
      }
    ) }),
    /* @__PURE__ */ s.jsxs("div", { className: "editor-page-content", children: [
      i.uiState.sidebarOpen && /* @__PURE__ */ s.jsxs("div", { className: "editor-page-sidebar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sidebar-tabs", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              className: i.uiState.activePanelId === "media" ? "active" : "",
              onClick: () => M("media"),
              children: "미디어"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              className: i.uiState.activePanelId === "effects" ? "active" : "",
              onClick: () => M("effects"),
              children: "효과"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "sidebar-content", children: [
          i.uiState.activePanelId === "media" && /* @__PURE__ */ s.jsx(
            Fr,
            {
              mediaFiles: i.mediaFiles,
              selectedMediaId: i.selectedMediaId
            }
          ),
          i.uiState.activePanelId === "effects" && /* @__PURE__ */ s.jsx(Mr, {})
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "editor-page-main", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "editor-page-preview", children: [
          /* @__PURE__ */ s.jsx(kr, {}),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              className: "toggle-sidebar-btn",
              onClick: () => P(),
              children: i.uiState.sidebarOpen ? "◀" : "▶"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "editor-page-timeline", children: /* @__PURE__ */ s.jsx(
          Ir,
          {
            zoom: i.timelineState.zoom,
            scrollPosition: i.timelineState.scrollPosition
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "editor-page-statusbar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "project-info", children: [
        i.project.name,
        " | ",
        i.project.resolution.width,
        "x",
        i.project.resolution.height,
        " | ",
        i.project.frameRate,
        "fps"
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "zoom-controls", children: [
        /* @__PURE__ */ s.jsx("label", { children: "확대/축소: " }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "range",
            min: "0.1",
            max: "2",
            step: "0.1",
            value: i.timelineState.zoom,
            onChange: () => {
            }
          }
        )
      ] })
    ] })
  ] });
};
export {
  Nr as EditorPage,
  Lr as EditorPageProvider,
  Cr as useEditorPage
};
