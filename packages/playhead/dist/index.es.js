import me, { useState as mr, useRef as ve, useEffect as he, useReducer as br, useCallback as W, createContext as gr, useContext as Er } from "react";
var ye = { exports: {} }, J = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var We;
function Tr() {
  if (We)
    return J;
  We = 1;
  var n = me, l = Symbol.for("react.element"), g = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, P = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(u, i, o) {
    var c, h = {}, b = null, I = null;
    o !== void 0 && (b = "" + o), i.key !== void 0 && (b = "" + i.key), i.ref !== void 0 && (I = i.ref);
    for (c in i)
      m.call(i, c) && !C.hasOwnProperty(c) && (h[c] = i[c]);
    if (u && u.defaultProps)
      for (c in i = u.defaultProps, i)
        h[c] === void 0 && (h[c] = i[c]);
    return { $$typeof: l, type: u, key: b, ref: I, props: h, _owner: P.current };
  }
  return J.Fragment = g, J.jsx = v, J.jsxs = v, J;
}
var q = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ue;
function _r() {
  return Ue || (Ue = 1, process.env.NODE_ENV !== "production" && function() {
    var n = me, l = Symbol.for("react.element"), g = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), P = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), u = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), o = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), I = Symbol.for("react.offscreen"), j = Symbol.iterator, F = "@@iterator";
    function U(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = j && e[j] || e[F];
      return typeof r == "function" ? r : null;
    }
    var A = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        E("error", e, t);
      }
    }
    function E(e, r, t) {
      {
        var a = A.ReactDebugCurrentFrame, p = a.getStackAddendum();
        p !== "" && (r += "%s", t = t.concat([p]));
        var y = t.map(function(f) {
          return String(f);
        });
        y.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var x = !1, ae = !1, Z = !1, Q = !1, M = !1, L;
    L = Symbol.for("react.module.reference");
    function $(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === C || M || e === P || e === o || e === c || Q || e === I || x || ae || Z || typeof e == "object" && e !== null && (e.$$typeof === b || e.$$typeof === h || e.$$typeof === v || e.$$typeof === u || e.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === L || e.getModuleId !== void 0));
    }
    function K(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var p = r.displayName || r.name || "";
      return p !== "" ? t + "(" + p + ")" : t;
    }
    function k(e) {
      return e.displayName || "Context";
    }
    function d(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case g:
          return "Portal";
        case C:
          return "Profiler";
        case P:
          return "StrictMode";
        case o:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            var r = e;
            return k(r) + ".Consumer";
          case v:
            var t = e;
            return k(t._context) + ".Provider";
          case i:
            return K(e, e.render, "ForwardRef");
          case h:
            var a = e.displayName || null;
            return a !== null ? a : d(e.type) || "Memo";
          case b: {
            var p = e, y = p._payload, f = p._init;
            try {
              return d(f(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var N = Object.assign, z = 0, be, ge, Ee, Te, _e, xe, Re;
    function we() {
    }
    we.__reactDisabledLog = !0;
    function Be() {
      {
        if (z === 0) {
          be = console.log, ge = console.info, Ee = console.warn, Te = console.error, _e = console.group, xe = console.groupCollapsed, Re = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: we,
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
        z++;
      }
    }
    function Ve() {
      {
        if (z--, z === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: N({}, e, {
              value: be
            }),
            info: N({}, e, {
              value: ge
            }),
            warn: N({}, e, {
              value: Ee
            }),
            error: N({}, e, {
              value: Te
            }),
            group: N({}, e, {
              value: _e
            }),
            groupCollapsed: N({}, e, {
              value: xe
            }),
            groupEnd: N({}, e, {
              value: Re
            })
          });
        }
        z < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var oe = A.ReactCurrentDispatcher, ie;
    function ee(e, r, t) {
      {
        if (ie === void 0)
          try {
            throw Error();
          } catch (p) {
            var a = p.stack.trim().match(/\n( *(at )?)/);
            ie = a && a[1] || "";
          }
        return `
` + ie + e;
      }
    }
    var se = !1, re;
    {
      var ze = typeof WeakMap == "function" ? WeakMap : Map;
      re = new ze();
    }
    function Ce(e, r) {
      if (!e || se)
        return "";
      {
        var t = re.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      se = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = oe.current, oe.current = null, Be();
      try {
        if (r) {
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
            } catch (O) {
              a = O;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (O) {
              a = O;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            a = O;
          }
          e();
        }
      } catch (O) {
        if (O && a && typeof O.stack == "string") {
          for (var s = O.stack.split(`
`), S = a.stack.split(`
`), T = s.length - 1, R = S.length - 1; T >= 1 && R >= 0 && s[T] !== S[R]; )
            R--;
          for (; T >= 1 && R >= 0; T--, R--)
            if (s[T] !== S[R]) {
              if (T !== 1 || R !== 1)
                do
                  if (T--, R--, R < 0 || s[T] !== S[R]) {
                    var D = `
` + s[T].replace(" at new ", " at ");
                    return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), typeof e == "function" && re.set(e, D), D;
                  }
                while (T >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        se = !1, oe.current = y, Ve(), Error.prepareStackTrace = p;
      }
      var V = e ? e.displayName || e.name : "", Y = V ? ee(V) : "";
      return typeof e == "function" && re.set(e, Y), Y;
    }
    function Xe(e, r, t) {
      return Ce(e, !1);
    }
    function He(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function te(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ce(e, He(e));
      if (typeof e == "string")
        return ee(e);
      switch (e) {
        case o:
          return ee("Suspense");
        case c:
          return ee("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case i:
            return Xe(e.render);
          case h:
            return te(e.type, r, t);
          case b: {
            var a = e, p = a._payload, y = a._init;
            try {
              return te(y(p), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var X = Object.prototype.hasOwnProperty, Se = {}, ke = A.ReactDebugCurrentFrame;
    function ne(e) {
      if (e) {
        var r = e._owner, t = te(e.type, e._source, r ? r.type : null);
        ke.setExtraStackFrame(t);
      } else
        ke.setExtraStackFrame(null);
    }
    function Je(e, r, t, a, p) {
      {
        var y = Function.call.bind(X);
        for (var f in e)
          if (y(e, f)) {
            var s = void 0;
            try {
              if (typeof e[f] != "function") {
                var S = Error((a || "React class") + ": " + t + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw S.name = "Invariant Violation", S;
              }
              s = e[f](r, f, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              s = T;
            }
            s && !(s instanceof Error) && (ne(p), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, f, typeof s), ne(null)), s instanceof Error && !(s.message in Se) && (Se[s.message] = !0, ne(p), _("Failed %s type: %s", t, s.message), ne(null));
          }
      }
    }
    var qe = Array.isArray;
    function le(e) {
      return qe(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ze(e) {
      try {
        return Oe(e), !1;
      } catch {
        return !0;
      }
    }
    function Oe(e) {
      return "" + e;
    }
    function Pe(e) {
      if (Ze(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), Oe(e);
    }
    var H = A.ReactCurrentOwner, Qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, je, Ae, ue;
    ue = {};
    function er(e) {
      if (X.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function rr(e) {
      if (X.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function tr(e, r) {
      if (typeof e.ref == "string" && H.current && r && H.current.stateNode !== r) {
        var t = d(H.current.type);
        ue[t] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', d(H.current.type), e.ref), ue[t] = !0);
      }
    }
    function nr(e, r) {
      {
        var t = function() {
          je || (je = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function ar(e, r) {
      {
        var t = function() {
          Ae || (Ae = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var or = function(e, r, t, a, p, y, f) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: f,
        // Record the component responsible for creating this element.
        _owner: y
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
        value: a
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function ir(e, r, t, a, p) {
      {
        var y, f = {}, s = null, S = null;
        t !== void 0 && (Pe(t), s = "" + t), rr(r) && (Pe(r.key), s = "" + r.key), er(r) && (S = r.ref, tr(r, p));
        for (y in r)
          X.call(r, y) && !Qe.hasOwnProperty(y) && (f[y] = r[y]);
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (y in T)
            f[y] === void 0 && (f[y] = T[y]);
        }
        if (s || S) {
          var R = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && nr(f, R), S && ar(f, R);
        }
        return or(e, s, S, p, a, H.current, f);
      }
    }
    var ce = A.ReactCurrentOwner, Ie = A.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = te(e.type, e._source, r ? r.type : null);
        Ie.setExtraStackFrame(t);
      } else
        Ie.setExtraStackFrame(null);
    }
    var fe;
    fe = !1;
    function de(e) {
      return typeof e == "object" && e !== null && e.$$typeof === l;
    }
    function De() {
      {
        if (ce.current) {
          var e = d(ce.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function sr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var Me = {};
    function lr(e) {
      {
        var r = De();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Le(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = lr(r);
        if (Me[t])
          return;
        Me[t] = !0;
        var a = "";
        e && e._owner && e._owner !== ce.current && (a = " It was passed a child from " + d(e._owner.type) + "."), B(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), B(null);
      }
    }
    function Ne(e, r) {
      {
        if (typeof e != "object")
          return;
        if (le(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            de(a) && Le(a, r);
          }
        else if (de(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = U(e);
          if (typeof p == "function" && p !== e.entries)
            for (var y = p.call(e), f; !(f = y.next()).done; )
              de(f.value) && Le(f.value, r);
        }
      }
    }
    function ur(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === i || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === h))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = d(r);
          Je(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !fe) {
          fe = !0;
          var p = d(r);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function cr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            B(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), B(null);
            break;
          }
        }
        e.ref !== null && (B(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), B(null));
      }
    }
    var Fe = {};
    function $e(e, r, t, a, p, y) {
      {
        var f = $(e);
        if (!f) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var S = sr(p);
          S ? s += S : s += De();
          var T;
          e === null ? T = "null" : le(e) ? T = "array" : e !== void 0 && e.$$typeof === l ? (T = "<" + (d(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : T = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, s);
        }
        var R = ir(e, r, t, p, y);
        if (R == null)
          return R;
        if (f) {
          var D = r.children;
          if (D !== void 0)
            if (a)
              if (le(D)) {
                for (var V = 0; V < D.length; V++)
                  Ne(D[V], e);
                Object.freeze && Object.freeze(D);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ne(D, e);
        }
        if (X.call(r, "key")) {
          var Y = d(e), O = Object.keys(r).filter(function(yr) {
            return yr !== "key";
          }), pe = O.length > 0 ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Fe[Y + pe]) {
            var hr = O.length > 0 ? "{" + O.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, pe, Y, hr, Y), Fe[Y + pe] = !0;
          }
        }
        return e === m ? cr(R) : ur(R), R;
      }
    }
    function fr(e, r, t) {
      return $e(e, r, t, !0);
    }
    function dr(e, r, t) {
      return $e(e, r, t, !1);
    }
    var pr = dr, vr = fr;
    q.Fragment = m, q.jsx = pr, q.jsxs = vr;
  }()), q;
}
process.env.NODE_ENV === "production" ? ye.exports = Tr() : ye.exports = _r();
var w = ye.exports;
const xr = ({
  currentTime: n,
  duration: l,
  scale: g,
  isPlaying: m,
  isLooping: P = !1,
  playbackRate: C = 1,
  inPoint: v,
  outPoint: u,
  timelineOffset: i = 80,
  // 기본값: 트랙 레이블 너비
  onTimeChange: o,
  onPlayPause: c,
  _onInOutPointChange: h,
  // 현재 사용되지 않음
  onDragStart: b,
  onDragEnd: I
}) => {
  const [j, F] = mr(!1), U = ve(null), A = ve();
  he(() => {
    if (m) {
      const M = performance.now(), L = n, $ = (K) => {
        const k = (K - M) * 1e-3 * C;
        let d = L + k;
        P && u !== void 0 && v !== void 0 ? d >= u && (d = v + (d - u) % (u - v)) : d >= l && (d = l, c && c(!1)), !P && v !== void 0 && u !== void 0 && (d < v && (d = v), d > u && (d = u, c && c(!1))), o(d), m && (A.current = requestAnimationFrame($));
      };
      return A.current = requestAnimationFrame($), () => {
        A.current && cancelAnimationFrame(A.current);
      };
    }
  }, [m, n, C, l, P, v, u, o, c]);
  const _ = (M) => {
    M.preventDefault(), F(!0), b && b(), document.addEventListener("mousemove", E), document.addEventListener("mouseup", x);
  }, E = (M) => {
    var d;
    if (!j)
      return;
    const L = (d = U.current) == null ? void 0 : d.parentElement;
    if (!L)
      return;
    const $ = L.getBoundingClientRect(), K = M.clientX - $.left - i;
    let k = Math.max(0, K / g);
    k = Math.min(k, l), v !== void 0 && k < v && (k = v), u !== void 0 && k > u && (k = u), o(k);
  }, x = () => {
    F(!1), I && I(), document.removeEventListener("mousemove", E), document.removeEventListener("mouseup", x);
  }, ae = (M) => {
    M.preventDefault(), F(!0), b && b(), document.addEventListener("touchmove", Z), document.addEventListener("touchend", Q);
  }, Z = (M) => {
    var N;
    if (!j)
      return;
    const L = (N = U.current) == null ? void 0 : N.parentElement;
    if (!L)
      return;
    const $ = L.getBoundingClientRect(), k = M.touches[0].clientX - $.left - i;
    let d = Math.max(0, k / g);
    d = Math.min(d, l), v !== void 0 && d < v && (d = v), u !== void 0 && d > u && (d = u), o(d);
  }, Q = () => {
    F(!1), I && I(), document.removeEventListener("touchmove", Z), document.removeEventListener("touchend", Q);
  };
  return /* @__PURE__ */ w.jsxs(
    "div",
    {
      ref: U,
      className: "playhead",
      style: {
        position: "absolute",
        top: 0,
        left: `${n * g + i}px`,
        width: "2px",
        height: "100%",
        backgroundColor: "red",
        cursor: j ? "grabbing" : "grab",
        zIndex: 1e3
      },
      onMouseDown: _,
      onTouchStart: ae,
      children: [
        /* @__PURE__ */ w.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: "-8px",
              width: "16px",
              height: "16px",
              backgroundColor: "red",
              borderRadius: "50%",
              cursor: j ? "grabbing" : "grab",
              border: "2px solid white",
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.5)"
            }
          }
        ),
        /* @__PURE__ */ w.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: "20px",
              left: "-24px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "2px 4px",
              borderRadius: "2px",
              fontSize: "10px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none"
            },
            children: G(n)
          }
        )
      ]
    }
  );
}, G = (n) => {
  const l = Math.floor(n / 60), g = Math.floor(n % 60), m = Math.floor(n % 1 * 100);
  return `${l.toString().padStart(2, "0")}:${g.toString().padStart(2, "0")}.${m.toString().padStart(2, "0")}`;
}, Rr = ({
  currentTime: n,
  duration: l,
  isPlaying: g,
  playbackRate: m,
  _onTimeChange: P,
  // 현재 사용되지 않음
  onPlayPause: C,
  onPlaybackRateChange: v,
  onFrameStep: u,
  onJumpToStart: i,
  onJumpToEnd: o
}) => {
  const c = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  return me.useEffect(() => {
    const h = (b) => {
      if (!(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement))
        switch (b.key) {
          case " ":
            b.preventDefault(), C(!g);
            break;
          case "ArrowLeft":
            b.preventDefault(), u("backward");
            break;
          case "ArrowRight":
            b.preventDefault(), u("forward");
            break;
          case "Home":
            b.preventDefault(), i();
            break;
          case "End":
            b.preventDefault(), o();
            break;
        }
    };
    return window.addEventListener("keydown", h), () => {
      window.removeEventListener("keydown", h);
    };
  }, [g, C, u, i, o]), /* @__PURE__ */ w.jsxs("div", { className: "playhead-controls", style: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    margin: "8px 0",
    gap: "8px"
  }, children: [
    /* @__PURE__ */ w.jsxs("div", { className: "time-display", style: {
      fontFamily: "monospace",
      fontSize: "14px",
      padding: "4px 8px",
      backgroundColor: "#333",
      color: "white",
      borderRadius: "4px",
      userSelect: "none"
    }, children: [
      G(n),
      " / ",
      G(l)
    ] }),
    /* @__PURE__ */ w.jsx(
      "button",
      {
        onClick: i,
        title: "처음으로 (Home)",
        style: {
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          fontSize: "16px",
          padding: "4px",
          borderRadius: "4px",
          color: "#333"
        },
        children: "⏮️"
      }
    ),
    /* @__PURE__ */ w.jsx(
      "button",
      {
        onClick: () => u("backward"),
        title: "프레임 뒤로 (← 화살표)",
        style: {
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          fontSize: "16px",
          padding: "4px",
          borderRadius: "4px",
          color: "#333"
        },
        children: "⏪"
      }
    ),
    /* @__PURE__ */ w.jsx(
      "button",
      {
        onClick: () => C(!g),
        title: g ? "일시정지 (Space)" : "재생 (Space)",
        style: {
          border: "none",
          backgroundColor: "#2196f3",
          cursor: "pointer",
          fontSize: "16px",
          padding: "8px 12px",
          borderRadius: "4px",
          color: "white"
        },
        children: g ? "⏸️" : "▶️"
      }
    ),
    /* @__PURE__ */ w.jsx(
      "button",
      {
        onClick: () => u("forward"),
        title: "프레임 앞으로 (→ 화살표)",
        style: {
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          fontSize: "16px",
          padding: "4px",
          borderRadius: "4px",
          color: "#333"
        },
        children: "⏩"
      }
    ),
    /* @__PURE__ */ w.jsx(
      "button",
      {
        onClick: o,
        title: "끝으로 (End)",
        style: {
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          fontSize: "16px",
          padding: "4px",
          borderRadius: "4px",
          color: "#333"
        },
        children: "⏭️"
      }
    ),
    /* @__PURE__ */ w.jsx(
      "select",
      {
        value: m,
        onChange: (h) => v(parseFloat(h.target.value)),
        title: "재생 속도",
        style: {
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginLeft: "8px"
        },
        children: c.map((h) => /* @__PURE__ */ w.jsxs("option", { value: h, children: [
          h,
          "x"
        ] }, h))
      }
    )
  ] });
}, wr = ({
  duration: n,
  scale: l,
  currentTime: g,
  timelineOffset: m = 80,
  onTimeChange: P,
  timeInterval: C = 1
  // 기본 간격: 1초
}) => {
  const v = ve(null), u = [], i = Math.max(1, n);
  for (let c = 0; c <= i; c += C) {
    const h = c % 5 === 0, b = h ? 16 : 8;
    u.push(
      /* @__PURE__ */ w.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: `${c * l}px`,
            top: 0,
            width: "1px",
            height: `${b}px`,
            backgroundColor: h ? "#666" : "#999",
            pointerEvents: "none"
          }
        },
        `marker-${c}`
      )
    ), (h || i <= 10) && u.push(
      /* @__PURE__ */ w.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: `${c * l}px`,
            top: "16px",
            transform: "translateX(-50%)",
            fontSize: "10px",
            color: "#666",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap"
          },
          children: G(c)
        },
        `label-${c}`
      )
    );
  }
  const o = (c) => {
    if (!v.current)
      return;
    const h = v.current.getBoundingClientRect();
    let j = (c.clientX - h.left - m) / l;
    j = Math.max(0, Math.min(j, n)), P(j);
  };
  return /* @__PURE__ */ w.jsxs(
    "div",
    {
      ref: v,
      className: "time-ruler",
      style: {
        position: "relative",
        height: "32px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        width: `${i * l + m}px`,
        cursor: "pointer"
      },
      onClick: o,
      children: [
        /* @__PURE__ */ w.jsx("div", { style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: `${m}px`,
          height: "100%",
          backgroundColor: "#e0e0e0",
          borderRight: "1px solid #ccc",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
          userSelect: "none"
        }, children: "시간" }),
        /* @__PURE__ */ w.jsx("div", { style: {
          position: "absolute",
          left: `${m}px`,
          right: 0,
          top: 0,
          height: "100%",
          overflow: "hidden"
        }, children: u }),
        /* @__PURE__ */ w.jsx("div", { style: {
          position: "absolute",
          left: `${g * l + m}px`,
          top: 0,
          width: "1px",
          height: "100%",
          backgroundColor: "red",
          zIndex: 2,
          pointerEvents: "none"
        }, children: /* @__PURE__ */ w.jsx("div", { style: {
          position: "absolute",
          top: 0,
          left: "-4px",
          width: 0,
          height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: "6px solid red",
          pointerEvents: "none"
        } }) })
      ]
    }
  );
};
function Cr(n, l) {
  switch (l.type) {
    case "SET_CURRENT_TIME":
      return { ...n, currentTime: l.payload };
    case "SET_PLAYING":
      return { ...n, isPlaying: l.payload };
    case "SET_PLAYBACK_RATE":
      return { ...n, playbackRate: l.payload };
    case "SET_IN_POINT":
      return { ...n, inPoint: l.payload };
    case "SET_OUT_POINT":
      return { ...n, outPoint: l.payload };
    case "CLEAR_IN_POINT":
      return { ...n, inPoint: void 0 };
    case "CLEAR_OUT_POINT":
      return { ...n, outPoint: void 0 };
    case "STEP_FORWARD": {
      const g = 0.03333333333333333, m = Math.min(n.currentTime + g, l.payload);
      return { ...n, currentTime: m };
    }
    case "STEP_BACKWARD": {
      const g = 0.03333333333333333, m = Math.max(n.currentTime - g, 0);
      return { ...n, currentTime: m };
    }
    case "JUMP_TO_START":
      return { ...n, currentTime: n.inPoint !== void 0 ? n.inPoint : 0 };
    case "JUMP_TO_END":
      return { ...n, currentTime: n.outPoint !== void 0 ? n.outPoint : l.payload };
    default:
      return n;
  }
}
function Ye({
  duration: n,
  initialTime: l = 0,
  initialPlaybackRate: g = 1,
  initialInPoint: m,
  initialOutPoint: P,
  onTimeUpdate: C,
  fps: v = 30
}) {
  const u = {
    currentTime: l,
    isPlaying: !1,
    playbackRate: g,
    inPoint: m,
    outPoint: P
  }, [i, o] = br(Cr, u);
  he(() => {
    C && C(i.currentTime);
  }, [i.currentTime, C]), he(() => {
    const E = (x) => {
      if (!(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement))
        switch (x.key) {
          case " ":
            x.preventDefault(), o({ type: "SET_PLAYING", payload: !i.isPlaying });
            break;
          case "ArrowLeft":
            x.preventDefault(), o({ type: "STEP_BACKWARD", payload: null });
            break;
          case "ArrowRight":
            x.preventDefault(), o({ type: "STEP_FORWARD", payload: n });
            break;
          case "Home":
            x.preventDefault(), o({ type: "JUMP_TO_START", payload: null });
            break;
          case "End":
            x.preventDefault(), o({ type: "JUMP_TO_END", payload: n });
            break;
          case "i":
            (x.ctrlKey || x.metaKey) && (x.preventDefault(), o({ type: "SET_IN_POINT", payload: i.currentTime }));
            break;
          case "o":
            (x.ctrlKey || x.metaKey) && (x.preventDefault(), o({ type: "SET_OUT_POINT", payload: i.currentTime }));
            break;
          case "x":
            (x.ctrlKey || x.metaKey) && (x.preventDefault(), o({ type: "CLEAR_IN_POINT", payload: null }), o({ type: "CLEAR_OUT_POINT", payload: null }));
            break;
        }
    };
    return window.addEventListener("keydown", E), () => {
      window.removeEventListener("keydown", E);
    };
  }, [i.isPlaying, i.currentTime, n]);
  const c = W((E) => {
    o({ type: "SET_CURRENT_TIME", payload: E });
  }, []), h = W((E) => {
    o({ type: "SET_PLAYING", payload: E });
  }, []), b = W((E) => {
    o({ type: "SET_PLAYBACK_RATE", payload: E });
  }, []), I = W((E) => {
    o(E === "forward" ? { type: "STEP_FORWARD", payload: n } : { type: "STEP_BACKWARD", payload: null });
  }, [n]), j = W(() => {
    o({ type: "JUMP_TO_START", payload: null });
  }, []), F = W(() => {
    o({ type: "JUMP_TO_END", payload: n });
  }, [n]), U = W((E) => {
    o(E !== void 0 ? { type: "SET_IN_POINT", payload: E } : { type: "CLEAR_IN_POINT", payload: null });
  }, []), A = W((E) => {
    o(E !== void 0 ? { type: "SET_OUT_POINT", payload: E } : { type: "CLEAR_OUT_POINT", payload: null });
  }, []), _ = 1 / v;
  return {
    // 상태
    ...i,
    // 프레임 정보
    fps: v,
    frameTime: _,
    // 액션
    setCurrentTime: c,
    setPlaying: h,
    setPlaybackRate: b,
    stepFrame: I,
    jumpToStart: j,
    jumpToEnd: F,
    setInPoint: U,
    setOutPoint: A
  };
}
const Sr = {
  currentTime: 0,
  isPlaying: !1,
  playbackRate: 1,
  inPoint: void 0,
  outPoint: void 0,
  fps: 30,
  frameTime: 1 / 30,
  setCurrentTime: () => {
  },
  setPlaying: () => {
  },
  setPlaybackRate: () => {
  },
  stepFrame: () => {
  },
  jumpToStart: () => {
  },
  jumpToEnd: () => {
  },
  setInPoint: () => {
  },
  setOutPoint: () => {
  }
}, Ke = gr(Sr), kr = ({ children: n }) => {
  const l = Ye({
    duration: 60,
    // 기본값
    initialTime: 0,
    onTimeUpdate: () => {
    }
  });
  return /* @__PURE__ */ w.jsx(Ke.Provider, { value: l, children: n });
}, Pr = () => Er(Ke), jr = {
  Provider: kr,
  Playhead: xr,
  PlayheadControls: Rr,
  TimeRuler: wr,
  usePlayhead: Ye,
  formatTime: G
};
export {
  xr as Playhead,
  Rr as PlayheadControls,
  kr as PlayheadPlayheadProvider,
  wr as TimeRuler,
  jr as default,
  G as formatTime,
  Ye as usePlayhead,
  Pr as usePlayheadContext
};
