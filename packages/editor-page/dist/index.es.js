import Ae, { createContext as gr, useReducer as br, useCallback as T, useContext as _r, useState as Rr, useEffect as Ie } from "react";
var oe = { exports: {} }, Y = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var De;
function Sr() {
  if (De)
    return Y;
  De = 1;
  var t = Ae, a = Symbol.for("react.element"), f = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, c = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function P(j, y, k) {
    var E, R = {}, O = null, D = null;
    k !== void 0 && (O = "" + k), y.key !== void 0 && (O = "" + y.key), y.ref !== void 0 && (D = y.ref);
    for (E in y)
      h.call(y, E) && !C.hasOwnProperty(E) && (R[E] = y[E]);
    if (j && j.defaultProps)
      for (E in y = j.defaultProps, y)
        R[E] === void 0 && (R[E] = y[E]);
    return { $$typeof: a, type: j, key: O, ref: D, props: R, _owner: c.current };
  }
  return Y.Fragment = f, Y.jsx = P, Y.jsxs = P, Y;
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
var Fe;
function xr() {
  return Fe || (Fe = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Ae, a = Symbol.for("react.element"), f = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), j = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), D = Symbol.for("react.offscreen"), M = Symbol.iterator, S = "@@iterator";
    function l(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = M && e[M] || e[S];
      return typeof r == "function" ? r : null;
    }
    var F = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
          n[i - 1] = arguments[i];
        Ne("error", e, n);
      }
    }
    function Ne(e, r, n) {
      {
        var i = F.ReactDebugCurrentFrame, d = i.getStackAddendum();
        d !== "" && (r += "%s", n = n.concat([d]));
        var p = n.map(function(u) {
          return String(u);
        });
        p.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, p);
      }
    }
    var Ue = !1, $e = !1, Ve = !1, We = !1, Ye = !1, le;
    le = Symbol.for("react.module.reference");
    function Ge(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === C || Ye || e === c || e === k || e === E || We || e === D || Ue || $e || Ve || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === R || e.$$typeof === P || e.$$typeof === j || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === le || e.getModuleId !== void 0));
    }
    function Be(e, r, n) {
      var i = e.displayName;
      if (i)
        return i;
      var d = r.displayName || r.name || "";
      return d !== "" ? n + "(" + d + ")" : n;
    }
    function ue(e) {
      return e.displayName || "Context";
    }
    function I(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case f:
          return "Portal";
        case C:
          return "Profiler";
        case c:
          return "StrictMode";
        case k:
          return "Suspense";
        case E:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case j:
            var r = e;
            return ue(r) + ".Consumer";
          case P:
            var n = e;
            return ue(n._context) + ".Provider";
          case y:
            return Be(e, e.render, "ForwardRef");
          case R:
            var i = e.displayName || null;
            return i !== null ? i : I(e.type) || "Memo";
          case O: {
            var d = e, p = d._payload, u = d._init;
            try {
              return I(u(p));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, $ = 0, ce, de, fe, pe, ve, he, ye;
    function me() {
    }
    me.__reactDisabledLog = !0;
    function ze() {
      {
        if ($ === 0) {
          ce = console.log, de = console.info, fe = console.warn, pe = console.error, ve = console.group, he = console.groupCollapsed, ye = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: me,
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
              value: ce
            }),
            info: A({}, e, {
              value: de
            }),
            warn: A({}, e, {
              value: fe
            }),
            error: A({}, e, {
              value: pe
            }),
            group: A({}, e, {
              value: ve
            }),
            groupCollapsed: A({}, e, {
              value: he
            }),
            groupEnd: A({}, e, {
              value: ye
            })
          });
        }
        $ < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Z = F.ReactCurrentDispatcher, H;
    function B(e, r, n) {
      {
        if (H === void 0)
          try {
            throw Error();
          } catch (d) {
            var i = d.stack.trim().match(/\n( *(at )?)/);
            H = i && i[1] || "";
          }
        return `
` + H + e;
      }
    }
    var Q = !1, z;
    {
      var Je = typeof WeakMap == "function" ? WeakMap : Map;
      z = new Je();
    }
    function Ee(e, r) {
      if (!e || Q)
        return "";
      {
        var n = z.get(e);
        if (n !== void 0)
          return n;
      }
      var i;
      Q = !0;
      var d = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var p;
      p = Z.current, Z.current = null, ze();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (x) {
              i = x;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (x) {
              i = x;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            i = x;
          }
          e();
        }
      } catch (x) {
        if (x && i && typeof x.stack == "string") {
          for (var s = x.stack.split(`
`), _ = i.stack.split(`
`), v = s.length - 1, m = _.length - 1; v >= 1 && m >= 0 && s[v] !== _[m]; )
            m--;
          for (; v >= 1 && m >= 0; v--, m--)
            if (s[v] !== _[m]) {
              if (v !== 1 || m !== 1)
                do
                  if (v--, m--, m < 0 || s[v] !== _[m]) {
                    var w = `
` + s[v].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && z.set(e, w), w;
                  }
                while (v >= 1 && m >= 0);
              break;
            }
        }
      } finally {
        Q = !1, Z.current = p, Ke(), Error.prepareStackTrace = d;
      }
      var U = e ? e.displayName || e.name : "", L = U ? B(U) : "";
      return typeof e == "function" && z.set(e, L), L;
    }
    function qe(e, r, n) {
      return Ee(e, !1);
    }
    function Xe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function K(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ee(e, Xe(e));
      if (typeof e == "string")
        return B(e);
      switch (e) {
        case k:
          return B("Suspense");
        case E:
          return B("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return qe(e.render);
          case R:
            return K(e.type, r, n);
          case O: {
            var i = e, d = i._payload, p = i._init;
            try {
              return K(p(d), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var V = Object.prototype.hasOwnProperty, ge = {}, be = F.ReactDebugCurrentFrame;
    function J(e) {
      if (e) {
        var r = e._owner, n = K(e.type, e._source, r ? r.type : null);
        be.setExtraStackFrame(n);
      } else
        be.setExtraStackFrame(null);
    }
    function Ze(e, r, n, i, d) {
      {
        var p = Function.call.bind(V);
        for (var u in e)
          if (p(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var _ = Error((i || "React class") + ": " + n + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              s = e[u](r, u, i, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (v) {
              s = v;
            }
            s && !(s instanceof Error) && (J(d), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", n, u, typeof s), J(null)), s instanceof Error && !(s.message in ge) && (ge[s.message] = !0, J(d), b("Failed %s type: %s", n, s.message), J(null));
          }
      }
    }
    var He = Array.isArray;
    function ee(e) {
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
        return _e(e), !1;
      } catch {
        return !0;
      }
    }
    function _e(e) {
      return "" + e;
    }
    function Re(e) {
      if (er(e))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), _e(e);
    }
    var W = F.ReactCurrentOwner, rr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Se, xe, re;
    re = {};
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
        re[n] || (b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(W.current.type), e.ref), re[n] = !0);
      }
    }
    function ir(e, r) {
      {
        var n = function() {
          Se || (Se = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
          xe || (xe = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var sr = function(e, r, n, i, d, p, u) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: u,
        // Record the component responsible for creating this element.
        _owner: p
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function lr(e, r, n, i, d) {
      {
        var p, u = {}, s = null, _ = null;
        n !== void 0 && (Re(n), s = "" + n), nr(r) && (Re(r.key), s = "" + r.key), tr(r) && (_ = r.ref, ar(r, d));
        for (p in r)
          V.call(r, p) && !rr.hasOwnProperty(p) && (u[p] = r[p]);
        if (e && e.defaultProps) {
          var v = e.defaultProps;
          for (p in v)
            u[p] === void 0 && (u[p] = v[p]);
        }
        if (s || _) {
          var m = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && ir(u, m), _ && or(u, m);
        }
        return sr(e, s, _, d, i, W.current, u);
      }
    }
    var te = F.ReactCurrentOwner, je = F.ReactDebugCurrentFrame;
    function N(e) {
      if (e) {
        var r = e._owner, n = K(e.type, e._source, r ? r.type : null);
        je.setExtraStackFrame(n);
      } else
        je.setExtraStackFrame(null);
    }
    var ne;
    ne = !1;
    function ae(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function Te() {
      {
        if (te.current) {
          var e = I(te.current.type);
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
    var we = {};
    function cr(e) {
      {
        var r = Te();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function Pe(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = cr(r);
        if (we[n])
          return;
        we[n] = !0;
        var i = "";
        e && e._owner && e._owner !== te.current && (i = " It was passed a child from " + I(e._owner.type) + "."), N(e), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, i), N(null);
      }
    }
    function Oe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ee(e))
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            ae(i) && Pe(i, r);
          }
        else if (ae(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = l(e);
          if (typeof d == "function" && d !== e.entries)
            for (var p = d.call(e), u; !(u = p.next()).done; )
              ae(u.value) && Pe(u.value, r);
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
        else if (typeof r == "object" && (r.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          n = r.propTypes;
        else
          return;
        if (n) {
          var i = I(r);
          Ze(n, e.props, "prop", i, e);
        } else if (r.PropTypes !== void 0 && !ne) {
          ne = !0;
          var d = I(r);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function fr(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var i = r[n];
          if (i !== "children" && i !== "key") {
            N(e), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", i), N(null);
            break;
          }
        }
        e.ref !== null && (N(e), b("Invalid attribute `ref` supplied to `React.Fragment`."), N(null));
      }
    }
    var Ce = {};
    function ke(e, r, n, i, d, p) {
      {
        var u = Ge(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = ur(d);
          _ ? s += _ : s += Te();
          var v;
          e === null ? v = "null" : ee(e) ? v = "array" : e !== void 0 && e.$$typeof === a ? (v = "<" + (I(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : v = typeof e, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", v, s);
        }
        var m = lr(e, r, n, d, p);
        if (m == null)
          return m;
        if (u) {
          var w = r.children;
          if (w !== void 0)
            if (i)
              if (ee(w)) {
                for (var U = 0; U < w.length; U++)
                  Oe(w[U], e);
                Object.freeze && Object.freeze(w);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Oe(w, e);
        }
        if (V.call(r, "key")) {
          var L = I(e), x = Object.keys(r).filter(function(Er) {
            return Er !== "key";
          }), ie = x.length > 0 ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ce[L + ie]) {
            var mr = x.length > 0 ? "{" + x.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ie, L, mr, L), Ce[L + ie] = !0;
          }
        }
        return e === h ? fr(m) : dr(m), m;
      }
    }
    function pr(e, r, n) {
      return ke(e, r, n, !0);
    }
    function vr(e, r, n) {
      return ke(e, r, n, !1);
    }
    var hr = vr, yr = pr;
    G.Fragment = h, G.jsx = hr, G.jsxs = yr;
  }()), G;
}
process.env.NODE_ENV === "production" ? oe.exports = Sr() : oe.exports = xr();
var o = oe.exports;
let q;
const jr = new Uint8Array(16);
function Tr() {
  if (!q && (q = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !q))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return q(jr);
}
const g = [];
for (let t = 0; t < 256; ++t)
  g.push((t + 256).toString(16).slice(1));
function wr(t, a = 0) {
  return g[t[a + 0]] + g[t[a + 1]] + g[t[a + 2]] + g[t[a + 3]] + "-" + g[t[a + 4]] + g[t[a + 5]] + "-" + g[t[a + 6]] + g[t[a + 7]] + "-" + g[t[a + 8]] + g[t[a + 9]] + "-" + g[t[a + 10]] + g[t[a + 11]] + g[t[a + 12]] + g[t[a + 13]] + g[t[a + 14]] + g[t[a + 15]];
}
const Pr = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Me = {
  randomUUID: Pr
};
function se(t, a, f) {
  if (Me.randomUUID && !a && !t)
    return Me.randomUUID();
  t = t || {};
  const h = t.random || (t.rng || Tr)();
  if (h[6] = h[6] & 15 | 64, h[8] = h[8] & 63 | 128, a) {
    f = f || 0;
    for (let c = 0; c < 16; ++c)
      a[f + c] = h[c];
    return a;
  }
  return wr(h);
}
const X = {
  currentMode: "video",
  project: {
    id: se(),
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
  var f;
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
      const h = t.history.past[t.history.past.length - 1], c = t.history.past.slice(0, t.history.past.length - 1);
      return {
        ...h,
        history: {
          past: c,
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
          ...((f = a.payload) == null ? void 0 : f.project) || {},
          id: se(),
          created: /* @__PURE__ */ new Date(),
          lastModified: /* @__PURE__ */ new Date()
        }
      };
    default:
      return t;
  }
}, Le = gr({
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
}), Lr = ({ children: t }) => {
  const [a, f] = br(Or, X), h = T((l) => {
    f({ type: "SET_MODE", payload: l });
  }, []), c = T((l) => {
    f({ type: "SET_PROJECT", payload: l });
  }, []), C = T((l) => {
    const F = {
      ...l,
      id: se()
    };
    f({ type: "ADD_MEDIA_FILE", payload: F });
  }, []), P = T((l) => {
    f({ type: "REMOVE_MEDIA_FILE", payload: l });
  }, []), j = T((l) => {
    f({ type: "SELECT_MEDIA_FILE", payload: l });
  }, []), y = T((l) => {
    f({ type: "SET_TIMELINE_ZOOM", payload: l });
  }, []), k = T((l) => {
    f({ type: "SET_TIMELINE_SCROLL", payload: l });
  }, []), E = T((l) => {
    f({ type: "TOGGLE_SIDEBAR", payload: l });
  }, []), R = T((l) => {
    f({ type: "SET_ACTIVE_PANEL", payload: l });
  }, []), O = T((l) => {
    f({ type: "TOGGLE_FULLSCREEN", payload: l });
  }, []), D = T(() => {
    f({ type: "UNDO" });
  }, []), M = T(() => {
    f({ type: "REDO" });
  }, []), S = T((l) => {
    f({ type: "RESET_STATE", payload: l });
  }, []);
  return /* @__PURE__ */ o.jsx(
    Le.Provider,
    {
      value: {
        state: a,
        dispatch: f,
        setMode: h,
        updateProject: c,
        addMediaFile: C,
        removeMediaFile: P,
        selectMediaFile: j,
        setTimelineZoom: y,
        setTimelineScroll: k,
        toggleSidebar: E,
        setActivePanel: R,
        toggleFullscreen: O,
        undo: D,
        redo: M,
        resetState: S
      },
      children: t
    }
  );
}, Cr = () => {
  const t = _r(Le);
  if (t === void 0)
    throw new Error("useEditorPage must be used within a EditorPageProvider");
  return t;
}, kr = () => /* @__PURE__ */ o.jsx("div", { className: "mock-playhead", style: {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#333",
  color: "white"
}, children: "Playhead 컴포넌트 (목업)" }), Ir = ({ zoom: t, scrollPosition: a }) => /* @__PURE__ */ o.jsxs("div", { className: "mock-timeline", style: {
  width: "100%",
  height: "100%",
  backgroundColor: "#252525",
  color: "white",
  padding: "10px"
}, children: [
  /* @__PURE__ */ o.jsx("p", { children: "Timeline 컴포넌트 (목업)" }),
  /* @__PURE__ */ o.jsxs("p", { children: [
    "줌: ",
    t,
    ", 스크롤 위치: ",
    a
  ] })
] }), Dr = ({ currentMode: t, onModeChange: a }) => /* @__PURE__ */ o.jsxs("div", { className: "mock-toolbar", style: {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2d2d2d",
  color: "white",
  padding: "0 10px"
}, children: [
  /* @__PURE__ */ o.jsxs("span", { children: [
    "Toolbar 컴포넌트 (목업) - 현재 모드: ",
    t
  ] }),
  /* @__PURE__ */ o.jsxs("div", { style: { marginLeft: "auto", display: "flex", gap: "10px" }, children: [
    /* @__PURE__ */ o.jsx("button", { onClick: () => a("video"), children: "비디오" }),
    /* @__PURE__ */ o.jsx("button", { onClick: () => a("audio"), children: "오디오" }),
    /* @__PURE__ */ o.jsx("button", { onClick: () => a("text"), children: "텍스트" }),
    /* @__PURE__ */ o.jsx("button", { onClick: () => a("effects"), children: "효과" })
  ] })
] }), Fr = ({ mediaFiles: t, selectedMediaId: a }) => /* @__PURE__ */ o.jsxs("div", { className: "mock-media-browser", style: {
  width: "100%",
  height: "100%",
  backgroundColor: "#252525",
  color: "white",
  padding: "10px"
}, children: [
  /* @__PURE__ */ o.jsx("p", { children: "MediaBrowser 컴포넌트 (목업)" }),
  /* @__PURE__ */ o.jsxs("p", { children: [
    "미디어 파일 수: ",
    t.length
  ] }),
  /* @__PURE__ */ o.jsxs("p", { children: [
    "선택된 미디어 ID: ",
    a || "없음"
  ] })
] }), Mr = () => /* @__PURE__ */ o.jsxs("div", { className: "mock-effects-panel", style: {
  width: "100%",
  height: "100%",
  backgroundColor: "#252525",
  color: "white",
  padding: "10px"
}, children: [
  /* @__PURE__ */ o.jsx("p", { children: "EffectsPanel 컴포넌트 (목업)" }),
  /* @__PURE__ */ o.jsxs("ul", { children: [
    /* @__PURE__ */ o.jsx("li", { children: "효과 1" }),
    /* @__PURE__ */ o.jsx("li", { children: "효과 2" }),
    /* @__PURE__ */ o.jsx("li", { children: "효과 3" })
  ] })
] });
const Nr = ({
  projectId: t,
  initialData: a,
  onSave: f,
  onExport: h
}) => {
  const {
    state: c,
    setMode: C,
    toggleSidebar: P,
    setActivePanel: j,
    toggleFullscreen: y
  } = Cr(), [k, E] = Rr(!0);
  Ie(() => {
    E(!1);
  }, [a, t]), Ie(() => {
    const S = (l) => {
      l.ctrlKey && l.key === "s" && (l.preventDefault(), R()), l.ctrlKey && l.key === "z" && l.preventDefault(), l.ctrlKey && l.key === "y" && l.preventDefault(), l.key === "F11" && (l.preventDefault(), y());
    };
    return window.addEventListener("keydown", S), () => {
      window.removeEventListener("keydown", S);
    };
  }, [y]);
  const R = () => {
    if (f) {
      const S = {
        ...c.project,
        mediaFiles: c.mediaFiles
        // 기타 저장할 데이터
      };
      f(S);
    }
  }, O = (S) => {
    h && h(S);
  }, D = (S) => {
    C(S);
  }, M = (S) => {
    j(S);
  };
  return k ? /* @__PURE__ */ o.jsx("div", { className: "editor-page-loading", children: "로딩 중..." }) : /* @__PURE__ */ o.jsxs("div", { className: `editor-page ${c.uiState.fullscreen ? "fullscreen" : ""}`, children: [
    /* @__PURE__ */ o.jsx("div", { className: "editor-page-toolbar", children: /* @__PURE__ */ o.jsx(
      Dr,
      {
        currentMode: c.currentMode,
        onModeChange: D,
        onSave: R,
        onExport: O
      }
    ) }),
    /* @__PURE__ */ o.jsxs("div", { className: "editor-page-content", children: [
      c.uiState.sidebarOpen && /* @__PURE__ */ o.jsxs("div", { className: "editor-page-sidebar", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "sidebar-tabs", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: c.uiState.activePanelId === "media" ? "active" : "",
              onClick: () => M("media"),
              children: "미디어"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: c.uiState.activePanelId === "effects" ? "active" : "",
              onClick: () => M("effects"),
              children: "효과"
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "sidebar-content", children: [
          c.uiState.activePanelId === "media" && /* @__PURE__ */ o.jsx(
            Fr,
            {
              mediaFiles: c.mediaFiles,
              selectedMediaId: c.selectedMediaId
            }
          ),
          c.uiState.activePanelId === "effects" && /* @__PURE__ */ o.jsx(Mr, {})
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "editor-page-main", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "editor-page-preview", children: [
          /* @__PURE__ */ o.jsx(kr, {}),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "toggle-sidebar-btn",
              onClick: () => P(),
              children: c.uiState.sidebarOpen ? "◀" : "▶"
            }
          )
        ] }),
        /* @__PURE__ */ o.jsx("div", { className: "editor-page-timeline", children: /* @__PURE__ */ o.jsx(
          Ir,
          {
            zoom: c.timelineState.zoom,
            scrollPosition: c.timelineState.scrollPosition
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "editor-page-statusbar", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "project-info", children: [
        c.project.name,
        " | ",
        c.project.resolution.width,
        "x",
        c.project.resolution.height,
        " | ",
        c.project.frameRate,
        "fps"
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "zoom-controls", children: [
        /* @__PURE__ */ o.jsx("label", { children: "확대/축소: " }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "range",
            min: "0.1",
            max: "2",
            step: "0.1",
            value: c.timelineState.zoom,
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
