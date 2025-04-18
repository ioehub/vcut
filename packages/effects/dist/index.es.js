var br = Object.defineProperty;
var xr = (r, n, i) => n in r ? br(r, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[n] = i;
var oe = (r, n, i) => (xr(r, typeof n != "symbol" ? n + "" : n, i), i);
import Ne, { createContext as Rr, useReducer as Tr, useContext as _r, useEffect as Cr } from "react";
var le = { exports: {} }, M = {};
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
function Or() {
  if (De)
    return M;
  De = 1;
  var r = Ne, n = Symbol.for("react.element"), i = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, d = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, x = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(b, o, p) {
    var R, j = {}, y = null, C = null;
    p !== void 0 && (y = "" + p), o.key !== void 0 && (y = "" + o.key), o.ref !== void 0 && (C = o.ref);
    for (R in o)
      c.call(o, R) && !x.hasOwnProperty(R) && (j[R] = o[R]);
    if (b && b.defaultProps)
      for (R in o = b.defaultProps, o)
        j[R] === void 0 && (j[R] = o[R]);
    return { $$typeof: n, type: b, key: y, ref: C, props: j, _owner: d.current };
  }
  return M.Fragment = i, M.jsx = g, M.jsxs = g, M;
}
var J = {};
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
function Sr() {
  return Fe || (Fe = 1, process.env.NODE_ENV !== "production" && function() {
    var r = Ne, n = Symbol.for("react.element"), i = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), b = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), w = Symbol.iterator, D = "@@iterator";
    function X(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = w && e[w] || e[D];
      return typeof t == "function" ? t : null;
    }
    var I = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
          a[s - 1] = arguments[s];
        Ue("error", e, a);
      }
    }
    function Ue(e, t, a) {
      {
        var s = I.ReactDebugCurrentFrame, v = s.getStackAddendum();
        v !== "" && (t += "%s", a = a.concat([v]));
        var E = a.map(function(f) {
          return String(f);
        });
        E.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, E);
      }
    }
    var Be = !1, $e = !1, We = !1, Ye = !1, Me = !1, ce;
    ce = Symbol.for("react.module.reference");
    function Je(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === x || Me || e === d || e === p || e === R || Ye || e === C || Be || $e || We || typeof e == "object" && e !== null && (e.$$typeof === y || e.$$typeof === j || e.$$typeof === g || e.$$typeof === b || e.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ce || e.getModuleId !== void 0));
    }
    function ze(e, t, a) {
      var s = e.displayName;
      if (s)
        return s;
      var v = t.displayName || t.name || "";
      return v !== "" ? a + "(" + v + ")" : a;
    }
    function ue(e) {
      return e.displayName || "Context";
    }
    function A(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case c:
          return "Fragment";
        case i:
          return "Portal";
        case x:
          return "Profiler";
        case d:
          return "StrictMode";
        case p:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case b:
            var t = e;
            return ue(t) + ".Consumer";
          case g:
            var a = e;
            return ue(a._context) + ".Provider";
          case o:
            return ze(e, e.render, "ForwardRef");
          case j:
            var s = e.displayName || null;
            return s !== null ? s : A(e.type) || "Memo";
          case y: {
            var v = e, E = v._payload, f = v._init;
            try {
              return A(f(E));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var N = Object.assign, $ = 0, fe, de, pe, ve, ye, Ee, me;
    function ge() {
    }
    ge.__reactDisabledLog = !0;
    function Ge() {
      {
        if ($ === 0) {
          fe = console.log, de = console.info, pe = console.warn, ve = console.error, ye = console.group, Ee = console.groupCollapsed, me = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ge,
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
    function qe() {
      {
        if ($--, $ === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: N({}, e, {
              value: fe
            }),
            info: N({}, e, {
              value: de
            }),
            warn: N({}, e, {
              value: pe
            }),
            error: N({}, e, {
              value: ve
            }),
            group: N({}, e, {
              value: ye
            }),
            groupCollapsed: N({}, e, {
              value: Ee
            }),
            groupEnd: N({}, e, {
              value: me
            })
          });
        }
        $ < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Z = I.ReactCurrentDispatcher, Q;
    function z(e, t, a) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (v) {
            var s = v.stack.trim().match(/\n( *(at )?)/);
            Q = s && s[1] || "";
          }
        return `
` + Q + e;
      }
    }
    var ee = !1, G;
    {
      var Ke = typeof WeakMap == "function" ? WeakMap : Map;
      G = new Ke();
    }
    function he(e, t) {
      if (!e || ee)
        return "";
      {
        var a = G.get(e);
        if (a !== void 0)
          return a;
      }
      var s;
      ee = !0;
      var v = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var E;
      E = Z.current, Z.current = null, Ge();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (S) {
              s = S;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (S) {
              s = S;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (S) {
            s = S;
          }
          e();
        }
      } catch (S) {
        if (S && s && typeof S.stack == "string") {
          for (var u = S.stack.split(`
`), O = s.stack.split(`
`), m = u.length - 1, h = O.length - 1; m >= 1 && h >= 0 && u[m] !== O[h]; )
            h--;
          for (; m >= 1 && h >= 0; m--, h--)
            if (u[m] !== O[h]) {
              if (m !== 1 || h !== 1)
                do
                  if (m--, h--, h < 0 || u[m] !== O[h]) {
                    var P = `
` + u[m].replace(" at new ", " at ");
                    return e.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", e.displayName)), typeof e == "function" && G.set(e, P), P;
                  }
                while (m >= 1 && h >= 0);
              break;
            }
        }
      } finally {
        ee = !1, Z.current = E, qe(), Error.prepareStackTrace = v;
      }
      var U = e ? e.displayName || e.name : "", V = U ? z(U) : "";
      return typeof e == "function" && G.set(e, V), V;
    }
    function He(e, t, a) {
      return he(e, !1);
    }
    function Xe(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function q(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return he(e, Xe(e));
      if (typeof e == "string")
        return z(e);
      switch (e) {
        case p:
          return z("Suspense");
        case R:
          return z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case o:
            return He(e.render);
          case j:
            return q(e.type, t, a);
          case y: {
            var s = e, v = s._payload, E = s._init;
            try {
              return q(E(v), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    var W = Object.prototype.hasOwnProperty, be = {}, xe = I.ReactDebugCurrentFrame;
    function K(e) {
      if (e) {
        var t = e._owner, a = q(e.type, e._source, t ? t.type : null);
        xe.setExtraStackFrame(a);
      } else
        xe.setExtraStackFrame(null);
    }
    function Ze(e, t, a, s, v) {
      {
        var E = Function.call.bind(W);
        for (var f in e)
          if (E(e, f)) {
            var u = void 0;
            try {
              if (typeof e[f] != "function") {
                var O = Error((s || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              u = e[f](t, f, s, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (m) {
              u = m;
            }
            u && !(u instanceof Error) && (K(v), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", a, f, typeof u), K(null)), u instanceof Error && !(u.message in be) && (be[u.message] = !0, K(v), _("Failed %s type: %s", a, u.message), K(null));
          }
      }
    }
    var Qe = Array.isArray;
    function re(e) {
      return Qe(e);
    }
    function er(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function rr(e) {
      try {
        return Re(e), !1;
      } catch {
        return !0;
      }
    }
    function Re(e) {
      return "" + e;
    }
    function Te(e) {
      if (rr(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", er(e)), Re(e);
    }
    var Y = I.ReactCurrentOwner, tr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, _e, Ce, te;
    te = {};
    function nr(e) {
      if (W.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ar(e) {
      if (W.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ir(e, t) {
      if (typeof e.ref == "string" && Y.current && t && Y.current.stateNode !== t) {
        var a = A(Y.current.type);
        te[a] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', A(Y.current.type), e.ref), te[a] = !0);
      }
    }
    function sr(e, t) {
      {
        var a = function() {
          _e || (_e = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function or(e, t) {
      {
        var a = function() {
          Ce || (Ce = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var lr = function(e, t, a, s, v, E, f) {
      var u = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: a,
        props: f,
        // Record the component responsible for creating this element.
        _owner: E
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
        value: s
      }), Object.defineProperty(u, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: v
      }), Object.freeze && (Object.freeze(u.props), Object.freeze(u)), u;
    };
    function cr(e, t, a, s, v) {
      {
        var E, f = {}, u = null, O = null;
        a !== void 0 && (Te(a), u = "" + a), ar(t) && (Te(t.key), u = "" + t.key), nr(t) && (O = t.ref, ir(t, v));
        for (E in t)
          W.call(t, E) && !tr.hasOwnProperty(E) && (f[E] = t[E]);
        if (e && e.defaultProps) {
          var m = e.defaultProps;
          for (E in m)
            f[E] === void 0 && (f[E] = m[E]);
        }
        if (u || O) {
          var h = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          u && sr(f, h), O && or(f, h);
        }
        return lr(e, u, O, v, s, Y.current, f);
      }
    }
    var ne = I.ReactCurrentOwner, Oe = I.ReactDebugCurrentFrame;
    function L(e) {
      if (e) {
        var t = e._owner, a = q(e.type, e._source, t ? t.type : null);
        Oe.setExtraStackFrame(a);
      } else
        Oe.setExtraStackFrame(null);
    }
    var ae;
    ae = !1;
    function ie(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function Se() {
      {
        if (ne.current) {
          var e = A(ne.current.type);
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
          var t = e.fileName.replace(/^.*[\\\/]/, ""), a = e.lineNumber;
          return `

Check your code at ` + t + ":" + a + ".";
        }
        return "";
      }
    }
    var je = {};
    function fr(e) {
      {
        var t = Se();
        if (!t) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (t = `

Check the top-level render call using <` + a + ">.");
        }
        return t;
      }
    }
    function we(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = fr(t);
        if (je[a])
          return;
        je[a] = !0;
        var s = "";
        e && e._owner && e._owner !== ne.current && (s = " It was passed a child from " + A(e._owner.type) + "."), L(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, s), L(null);
      }
    }
    function Ie(e, t) {
      {
        if (typeof e != "object")
          return;
        if (re(e))
          for (var a = 0; a < e.length; a++) {
            var s = e[a];
            ie(s) && we(s, t);
          }
        else if (ie(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var v = X(e);
          if (typeof v == "function" && v !== e.entries)
            for (var E = v.call(e), f; !(f = E.next()).done; )
              ie(f.value) && we(f.value, t);
        }
      }
    }
    function dr(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var a;
        if (typeof t == "function")
          a = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === j))
          a = t.propTypes;
        else
          return;
        if (a) {
          var s = A(t);
          Ze(a, e.props, "prop", s, e);
        } else if (t.PropTypes !== void 0 && !ae) {
          ae = !0;
          var v = A(t);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", v || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pr(e) {
      {
        for (var t = Object.keys(e.props), a = 0; a < t.length; a++) {
          var s = t[a];
          if (s !== "children" && s !== "key") {
            L(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), L(null);
            break;
          }
        }
        e.ref !== null && (L(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), L(null));
      }
    }
    var Pe = {};
    function Ae(e, t, a, s, v, E) {
      {
        var f = Je(e);
        if (!f) {
          var u = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = ur(v);
          O ? u += O : u += Se();
          var m;
          e === null ? m = "null" : re(e) ? m = "array" : e !== void 0 && e.$$typeof === n ? (m = "<" + (A(e.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : m = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", m, u);
        }
        var h = cr(e, t, a, v, E);
        if (h == null)
          return h;
        if (f) {
          var P = t.children;
          if (P !== void 0)
            if (s)
              if (re(P)) {
                for (var U = 0; U < P.length; U++)
                  Ie(P[U], e);
                Object.freeze && Object.freeze(P);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ie(P, e);
        }
        if (W.call(t, "key")) {
          var V = A(e), S = Object.keys(t).filter(function(hr) {
            return hr !== "key";
          }), se = S.length > 0 ? "{key: someKey, " + S.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Pe[V + se]) {
            var gr = S.length > 0 ? "{" + S.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, se, V, gr, V), Pe[V + se] = !0;
          }
        }
        return e === c ? pr(h) : dr(h), h;
      }
    }
    function vr(e, t, a) {
      return Ae(e, t, a, !0);
    }
    function yr(e, t, a) {
      return Ae(e, t, a, !1);
    }
    var Er = yr, mr = vr;
    J.Fragment = c, J.jsx = Er, J.jsxs = mr;
  }()), J;
}
process.env.NODE_ENV === "production" ? le.exports = Or() : le.exports = Sr();
var l = le.exports;
let H;
const jr = new Uint8Array(16);
function wr() {
  if (!H && (H = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !H))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return H(jr);
}
const T = [];
for (let r = 0; r < 256; ++r)
  T.push((r + 256).toString(16).slice(1));
function Ir(r, n = 0) {
  return T[r[n + 0]] + T[r[n + 1]] + T[r[n + 2]] + T[r[n + 3]] + "-" + T[r[n + 4]] + T[r[n + 5]] + "-" + T[r[n + 6]] + T[r[n + 7]] + "-" + T[r[n + 8]] + T[r[n + 9]] + "-" + T[r[n + 10]] + T[r[n + 11]] + T[r[n + 12]] + T[r[n + 13]] + T[r[n + 14]] + T[r[n + 15]];
}
const Pr = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ke = {
  randomUUID: Pr
};
function Ar(r, n, i) {
  if (ke.randomUUID && !n && !r)
    return ke.randomUUID();
  r = r || {};
  const c = r.random || (r.rng || wr)();
  if (c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, n) {
    i = i || 0;
    for (let d = 0; d < 16; ++d)
      n[i + d] = c[d];
    return n;
  }
  return Ir(c);
}
var F = /* @__PURE__ */ ((r) => (r.VIDEO = "video", r.AUDIO = "audio", r.TRANSITION = "transition", r.TEXT = "text", r.COLOR = "color", r))(F || {}), B = /* @__PURE__ */ ((r) => (r.FILTER = "filter", r.DISTORTION = "distortion", r.ANIMATION = "animation", r.BLUR = "blur", r.SHARPEN = "sharpen", r.LIGHTING = "lighting", r.AUDIO_FILTER = "audioFilter", r.TRANSITION = "transition", r.COLOR_CORRECTION = "colorCorrection", r))(B || {});
class Dr {
  /**
   * 내장된 기본 효과들을 초기화합니다.
   */
  constructor() {
    oe(this, "effects", []);
    oe(this, "appliedEffects", []);
    this.initializeDefaultEffects();
  }
  /**
   * 모든 사용 가능한 효과 목록을 반환합니다.
   */
  getAvailableEffects() {
    return [...this.effects];
  }
  /**
   * 특정 타입의 효과 목록을 반환합니다.
   * @param type 효과 타입
   */
  getEffectsByType(n) {
    return this.effects.filter((i) => i.type === n);
  }
  /**
   * 특정 카테고리의 효과 목록을 반환합니다.
   * @param category 효과 카테고리
   */
  getEffectsByCategory(n) {
    return this.effects.filter((i) => i.category === n);
  }
  /**
   * 클립에 적용된 모든 효과 목록을 반환합니다.
   * @param clipId 클립 ID
   */
  getEffectsByClipId(n) {
    return this.appliedEffects.filter((i) => i.clipId === n);
  }
  /**
   * ID로 효과를 조회합니다.
   * @param id 효과 ID
   */
  getEffectById(n) {
    return this.effects.find((i) => i.id === n);
  }
  /**
   * ID로 적용된 효과를 조회합니다.
   * @param id 적용된 효과 ID
   */
  getAppliedEffectById(n) {
    return this.appliedEffects.find((i) => i.id === n);
  }
  /**
   * 효과를 클립에 적용합니다.
   * @param effectId 효과 ID
   * @param clipId 클립 ID
   * @param trackId 트랙 ID
   * @param startTime 효과 시작 시간 (선택)
   * @param duration 효과 지속 시간 (선택)
   */
  applyEffectToClip(n, i, c, d, x) {
    const g = this.getEffectById(n);
    if (!g)
      return console.error(`효과 ID ${n}를 찾을 수 없습니다.`), null;
    const b = {
      ...JSON.parse(JSON.stringify(g)),
      // 깊은 복사
      id: Ar(),
      clipId: i,
      trackId: c,
      startTime: d,
      duration: x,
      isEnabled: !0
    };
    return this.appliedEffects.push(b), b;
  }
  /**
   * 적용된 효과를 업데이트합니다.
   * @param id 적용된 효과 ID
   * @param updates 업데이트할 속성들
   */
  updateAppliedEffect(n, i) {
    const c = this.appliedEffects.findIndex((d) => d.id === n);
    return c === -1 ? (console.error(`적용된 효과 ID ${n}를 찾을 수 없습니다.`), null) : (this.appliedEffects[c] = {
      ...this.appliedEffects[c],
      ...i
    }, this.appliedEffects[c]);
  }
  /**
   * 효과 파라미터 값을 업데이트합니다.
   * @param effectId 적용된 효과 ID
   * @param parameterId 파라미터 ID
   * @param value 새로운 값
   */
  updateEffectParameter(n, i, c) {
    const d = this.getAppliedEffectById(n);
    if (!d)
      return console.error(`적용된 효과 ID ${n}를 찾을 수 없습니다.`), null;
    const x = d.parameters.findIndex((b) => b.id === i);
    if (x === -1)
      return console.error(`파라미터 ID ${i}를 찾을 수 없습니다.`), null;
    const g = { ...d };
    return g.parameters[x] = {
      ...g.parameters[x],
      currentValue: c
    }, this.updateAppliedEffect(n, g);
  }
  /**
   * 적용된 효과를 제거합니다.
   * @param id 적용된 효과 ID
   */
  removeAppliedEffect(n) {
    const i = this.appliedEffects.findIndex((c) => c.id === n);
    return i === -1 ? (console.error(`적용된 효과 ID ${n}를 찾을 수 없습니다.`), !1) : (this.appliedEffects.splice(i, 1), !0);
  }
  /**
   * 기본 효과들을 초기화합니다.
   * 실제 앱에서는 이 부분이 외부 JSON 파일이나 DB에서 로딩될 수 있습니다.
   */
  initializeDefaultEffects() {
    this.effects.push({
      id: "effect-bw-filter",
      name: "흑백 필터",
      type: F.VIDEO,
      category: B.FILTER,
      description: "영상을 흑백으로 변환합니다.",
      thumbnail: "assets/effects/bw-filter.png",
      parameters: [
        {
          id: "intensity",
          name: "강도",
          type: "number",
          defaultValue: 1,
          currentValue: 1,
          min: 0,
          max: 1,
          step: 0.01
        }
      ],
      isEnabled: !0
    }), this.effects.push({
      id: "effect-gaussian-blur",
      name: "가우시안 블러",
      type: F.VIDEO,
      category: B.BLUR,
      description: "가우시안 블러 효과를 적용합니다.",
      thumbnail: "assets/effects/blur.png",
      parameters: [
        {
          id: "radius",
          name: "반경",
          type: "number",
          defaultValue: 5,
          currentValue: 5,
          min: 0,
          max: 50,
          step: 1
        }
      ],
      isEnabled: !0
    }), this.effects.push({
      id: "effect-color-correction",
      name: "색상 보정",
      type: F.VIDEO,
      category: B.COLOR_CORRECTION,
      description: "색상, 명도, 대비 등을 조정합니다.",
      thumbnail: "assets/effects/color-correction.png",
      parameters: [
        {
          id: "brightness",
          name: "밝기",
          type: "number",
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        },
        {
          id: "contrast",
          name: "대비",
          type: "number",
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        },
        {
          id: "saturation",
          name: "채도",
          type: "number",
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        },
        {
          id: "temperature",
          name: "색온도",
          type: "number",
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        }
      ],
      isEnabled: !0
    }), this.effects.push({
      id: "effect-audio-fade",
      name: "페이드",
      type: F.AUDIO,
      category: B.AUDIO_FILTER,
      description: "오디오 페이드 인/아웃 효과를 적용합니다.",
      thumbnail: "assets/effects/audio-fade.png",
      parameters: [
        {
          id: "fadeInDuration",
          name: "페이드 인 (초)",
          type: "number",
          defaultValue: 1,
          currentValue: 1,
          min: 0,
          max: 10,
          step: 0.1
        },
        {
          id: "fadeOutDuration",
          name: "페이드 아웃 (초)",
          type: "number",
          defaultValue: 1,
          currentValue: 1,
          min: 0,
          max: 10,
          step: 0.1
        }
      ],
      isEnabled: !0
    }), this.effects.push({
      id: "effect-transition-fade",
      name: "페이드 트랜지션",
      type: F.TRANSITION,
      category: B.TRANSITION,
      description: "두 클립 사이에 페이드 트랜지션을 적용합니다.",
      thumbnail: "assets/effects/transition-fade.png",
      parameters: [
        {
          id: "duration",
          name: "지속시간 (초)",
          type: "number",
          defaultValue: 1,
          currentValue: 1,
          min: 0.1,
          max: 5,
          step: 0.1
        }
      ],
      isEnabled: !0
    });
  }
}
const k = new Dr(), Fr = {
  availableEffects: [],
  appliedEffects: [],
  selectedEffectId: null,
  isLoading: !1,
  error: null
};
function kr(r, n) {
  switch (n.type) {
    case "LOAD_EFFECTS":
      return {
        ...r,
        availableEffects: n.payload,
        isLoading: !1
      };
    case "APPLY_EFFECT":
      return {
        ...r,
        appliedEffects: [...r.appliedEffects, n.payload]
      };
    case "UPDATE_EFFECT":
      return {
        ...r,
        appliedEffects: r.appliedEffects.map(
          (i) => i.id === n.payload.id ? { ...i, ...n.payload.updates } : i
        )
      };
    case "REMOVE_EFFECT":
      return {
        ...r,
        appliedEffects: r.appliedEffects.filter((i) => i.id !== n.payload),
        selectedEffectId: r.selectedEffectId === n.payload ? null : r.selectedEffectId
      };
    case "SELECT_EFFECT":
      return {
        ...r,
        selectedEffectId: n.payload
      };
    case "SET_LOADING":
      return {
        ...r,
        isLoading: n.payload
      };
    case "SET_ERROR":
      return {
        ...r,
        error: n.payload,
        isLoading: !1
      };
    default:
      return r;
  }
}
const Ve = Rr(void 0), Ur = ({ children: r }) => {
  const [n, i] = Tr(kr, Fr), c = async () => {
    try {
      i({ type: "SET_LOADING", payload: !0 });
      const y = k.getAvailableEffects();
      i({ type: "LOAD_EFFECTS", payload: y });
    } catch (y) {
      console.error("효과 불러오기 실패:", y), i({ type: "SET_ERROR", payload: "효과를 불러오는 중 오류가 발생했습니다." });
    }
  }, d = async (y, C, w, D, X) => {
    try {
      const I = k.applyEffectToClip(y, C, w, D, X);
      return I && i({ type: "APPLY_EFFECT", payload: I }), I;
    } catch (I) {
      return console.error("효과 적용 실패:", I), i({ type: "SET_ERROR", payload: "효과를 적용하는 중 오류가 발생했습니다." }), null;
    }
  }, x = async (y, C) => {
    try {
      const w = k.updateAppliedEffect(y, C);
      return w && i({
        type: "UPDATE_EFFECT",
        payload: { id: y, updates: w }
      }), w;
    } catch (w) {
      return console.error("효과 업데이트 실패:", w), i({ type: "SET_ERROR", payload: "효과를 업데이트하는 중 오류가 발생했습니다." }), null;
    }
  }, g = async (y, C, w) => {
    try {
      const D = k.updateEffectParameter(y, C, w);
      return D && i({
        type: "UPDATE_EFFECT",
        payload: { id: y, updates: D }
      }), D;
    } catch (D) {
      return console.error("효과 파라미터 업데이트 실패:", D), i({ type: "SET_ERROR", payload: "효과 파라미터를 업데이트하는 중 오류가 발생했습니다." }), null;
    }
  }, b = async (y) => {
    try {
      const C = k.removeAppliedEffect(y);
      return C && i({ type: "REMOVE_EFFECT", payload: y }), C;
    } catch (C) {
      return console.error("효과 제거 실패:", C), i({ type: "SET_ERROR", payload: "효과를 제거하는 중 오류가 발생했습니다." }), !1;
    }
  }, o = (y) => {
    i({ type: "SELECT_EFFECT", payload: y });
  }, p = (y) => k.getEffectsByType(y), R = (y) => k.getEffectsByCategory(y), j = (y) => k.getEffectsByClipId(y);
  return /* @__PURE__ */ l.jsx(Ve.Provider, { value: {
    state: n,
    loadEffects: c,
    applyEffect: d,
    updateEffect: x,
    updateEffectParameter: g,
    removeEffect: b,
    selectEffect: o,
    getEffectsByType: p,
    getEffectsByCategory: R,
    getEffectsByClip: j
  }, children: r });
}, Le = () => {
  const r = _r(Ve);
  if (r === void 0)
    throw new Error("useEffects는 EffectsProvider 내부에서만 사용할 수 있습니다.");
  return r;
}, Br = ({ type: r, category: n, onSelectEffect: i }) => {
  const { state: c, loadEffects: d, getEffectsByType: x, getEffectsByCategory: g } = Le();
  Cr(() => {
    d();
  }, [d]);
  const o = (() => r && n ? c.availableEffects.filter(
    (p) => p.type === r && p.category === n
  ) : r ? x(r) : n ? g(n) : c.availableEffects)();
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "effects-list",
      style: {
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px"
      },
      children: [
        /* @__PURE__ */ l.jsx(
          "h3",
          {
            style: {
              marginTop: 0,
              marginBottom: "16px"
            },
            children: "사용 가능한 효과"
          }
        ),
        c.isLoading ? /* @__PURE__ */ l.jsx(
          "p",
          {
            style: {
              textAlign: "center",
              padding: "20px"
            },
            children: "로딩 중..."
          }
        ) : /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "effects-grid",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "12px"
            },
            children: o.length === 0 ? /* @__PURE__ */ l.jsx(
              "p",
              {
                style: {
                  textAlign: "center",
                  padding: "20px"
                },
                children: "사용 가능한 효과가 없습니다."
              }
            ) : o.map((p) => /* @__PURE__ */ l.jsxs(
              "div",
              {
                className: "effect-item",
                onClick: () => i(p.id),
                style: {
                  backgroundColor: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                },
                children: [
                  p.thumbnail && /* @__PURE__ */ l.jsx(
                    "div",
                    {
                      className: "effect-thumbnail",
                      style: {
                        width: "100%",
                        height: "70px",
                        marginBottom: "8px",
                        overflow: "hidden",
                        borderRadius: "3px",
                        backgroundColor: "#f0f0f0"
                      },
                      children: /* @__PURE__ */ l.jsx(
                        "div",
                        {
                          className: "effect-thumbnail-placeholder",
                          style: {
                            width: "100%",
                            height: "100%",
                            backgroundColor: p.type === F.VIDEO ? "#1890ff" : p.type === F.AUDIO ? "#52c41a" : p.type === F.TRANSITION ? "#faad14" : "#d9d9d9"
                          }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ l.jsxs(
                    "div",
                    {
                      className: "effect-info",
                      style: {
                        textAlign: "center"
                      },
                      children: [
                        /* @__PURE__ */ l.jsx(
                          "div",
                          {
                            className: "effect-name",
                            style: {
                              fontWeight: "500",
                              fontSize: "0.9em",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            },
                            children: p.name
                          }
                        ),
                        /* @__PURE__ */ l.jsx(
                          "div",
                          {
                            className: "effect-type",
                            style: {
                              fontSize: "0.8em",
                              color: "#888",
                              marginTop: "2px"
                            },
                            children: p.category
                          }
                        )
                      ]
                    }
                  )
                ]
              },
              p.id
            ))
          }
        ),
        c.error && /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "error-message",
            style: {
              color: "#ff4d4f",
              padding: "12px",
              backgroundColor: "#fff1f0",
              border: "1px solid #ffccc7",
              borderRadius: "4px",
              marginTop: "16px"
            },
            children: c.error
          }
        )
      ]
    }
  );
}, Nr = ({
  parameter: r,
  onChange: n
}) => {
  const i = (o) => {
    n(r.id, o);
  }, c = () => /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "parameter-control",
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center"
      },
      children: [
        /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "range",
            min: r.min || 0,
            max: r.max || 100,
            step: r.step || 1,
            value: r.currentValue,
            onChange: (o) => i(parseFloat(o.target.value)),
            style: {
              flex: 1,
              marginRight: "8px"
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "parameter-value",
            style: {
              width: "60px"
            },
            children: /* @__PURE__ */ l.jsx(
              "input",
              {
                type: "number",
                min: r.min || 0,
                max: r.max || 100,
                step: r.step || 1,
                value: r.currentValue,
                onChange: (o) => i(parseFloat(o.target.value)),
                style: {
                  width: "100%",
                  textAlign: "right",
                  padding: "4px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "2px"
                }
              }
            )
          }
        )
      ]
    }
  ), d = () => /* @__PURE__ */ l.jsx(
    "div",
    {
      className: "parameter-control",
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center"
      },
      children: /* @__PURE__ */ l.jsx(
        "input",
        {
          type: "checkbox",
          checked: r.currentValue,
          onChange: (o) => i(o.target.checked)
        }
      )
    }
  ), x = () => {
    const o = Array.isArray(r.options) ? r.options : [];
    return /* @__PURE__ */ l.jsx(
      "div",
      {
        className: "parameter-control",
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center"
        },
        children: /* @__PURE__ */ l.jsx(
          "select",
          {
            value: r.currentValue,
            onChange: (p) => i(p.target.value),
            style: {
              width: "100%",
              padding: "4px",
              border: "1px solid #d9d9d9",
              borderRadius: "2px"
            },
            children: o.map((p) => {
              const R = typeof p == "object" ? p.value : p, j = typeof p == "object" ? p.label : p;
              return /* @__PURE__ */ l.jsx("option", { value: R, children: j }, R);
            })
          }
        )
      }
    );
  }, g = () => /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "parameter-control",
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center"
      },
      children: [
        /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "color",
            value: r.currentValue,
            onChange: (o) => i(o.target.value),
            style: {
              width: "32px",
              height: "24px",
              border: "none",
              marginRight: "8px"
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "parameter-value",
            style: {
              width: "60px"
            },
            children: /* @__PURE__ */ l.jsx(
              "input",
              {
                type: "text",
                value: r.currentValue,
                onChange: (o) => i(o.target.value),
                style: {
                  width: "100%",
                  textAlign: "right",
                  padding: "4px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "2px"
                }
              }
            )
          }
        )
      ]
    }
  ), b = () => {
    switch (r.type) {
      case "number":
        return c();
      case "boolean":
        return d();
      case "select":
        return x();
      case "color":
        return g();
      default:
        return /* @__PURE__ */ l.jsxs("div", { children: [
          "지원되지 않는 파라미터 타입: ",
          r.type
        ] });
    }
  };
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "parameter-editor",
      style: {
        marginBottom: "12px",
        display: "flex",
        alignItems: "center"
      },
      children: [
        /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "parameter-name",
            style: {
              width: "100px",
              fontSize: "14px",
              marginRight: "12px"
            },
            children: r.name
          }
        ),
        b()
      ]
    }
  );
}, $r = ({ effectId: r }) => {
  const { state: n, updateEffectParameter: i, removeEffect: c } = Le(), d = n.appliedEffects.find((o) => o.id === r);
  if (!d)
    return /* @__PURE__ */ l.jsx(
      "div",
      {
        className: "effect-editor-error",
        style: {
          padding: "16px",
          color: "#ff4d4f",
          backgroundColor: "#fff1f0",
          border: "1px solid #ffccc7",
          borderRadius: "4px"
        },
        children: "선택된 효과를 찾을 수 없습니다."
      }
    );
  const x = async (o, p) => {
    await i(r, o, p);
  }, g = async () => {
    await c(r);
  }, b = async () => {
    const o = !d.isEnabled;
    await i(r, "isEnabled", o);
  };
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "effect-editor",
      style: {
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        marginBottom: "16px"
      },
      children: [
        /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "effect-header",
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            },
            children: [
              /* @__PURE__ */ l.jsx("h3", { style: { margin: 0 }, children: d.name }),
              /* @__PURE__ */ l.jsxs("div", { className: "effect-actions", children: [
                /* @__PURE__ */ l.jsx(
                  "button",
                  {
                    className: `toggle-button ${d.isEnabled ? "enabled" : "disabled"}`,
                    onClick: b,
                    style: {
                      padding: "4px 8px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    },
                    children: d.isEnabled ? "활성화됨" : "비활성화됨"
                  }
                ),
                /* @__PURE__ */ l.jsx(
                  "button",
                  {
                    className: "remove-button",
                    onClick: g,
                    style: {
                      backgroundColor: "#ff4d4f",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer"
                    },
                    children: "제거"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "effect-parameters",
            style: {
              backgroundColor: "white",
              padding: "12px",
              borderRadius: "4px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
            },
            children: d.parameters.map((o) => /* @__PURE__ */ l.jsx(
              Nr,
              {
                parameter: o,
                onChange: x
              },
              o.id
            ))
          }
        )
      ]
    }
  );
};
export {
  B as EffectCategory,
  $r as EffectEditor,
  Nr as EffectParameterEditor,
  F as EffectType,
  Br as EffectsList,
  Ur as EffectsProvider,
  k as EffectsService,
  Le as useEffects
};
