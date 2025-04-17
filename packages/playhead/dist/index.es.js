import be, { useState as hr, useRef as ve, useEffect as he, useReducer as yr, useCallback as W } from "react";
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
function br() {
  if (We)
    return J;
  We = 1;
  var a = be, f = Symbol.for("react.element"), g = Symbol.for("react.fragment"), b = Object.prototype.hasOwnProperty, j = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, S = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(l, i, o) {
    var u, h = {}, m = null, D = null;
    o !== void 0 && (m = "" + o), i.key !== void 0 && (m = "" + i.key), i.ref !== void 0 && (D = i.ref);
    for (u in i)
      b.call(i, u) && !S.hasOwnProperty(u) && (h[u] = i[u]);
    if (l && l.defaultProps)
      for (u in i = l.defaultProps, i)
        h[u] === void 0 && (h[u] = i[u]);
    return { $$typeof: f, type: l, key: m, ref: D, props: h, _owner: j.current };
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
function mr() {
  return Ue || (Ue = 1, process.env.NODE_ENV !== "production" && function() {
    var a = be, f = Symbol.for("react.element"), g = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), l = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), o = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), D = Symbol.for("react.offscreen"), A = Symbol.iterator, F = "@@iterator";
    function U(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = A && e[A] || e[F];
      return typeof r == "function" ? r : null;
    }
    var P = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        E("error", e, t);
      }
    }
    function E(e, r, t) {
      {
        var n = P.ReactDebugCurrentFrame, p = n.getStackAddendum();
        p !== "" && (r += "%s", t = t.concat([p]));
        var y = t.map(function(c) {
          return String(c);
        });
        y.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var R = !1, ae = !1, G = !1, Z = !1, M = !1, L;
    L = Symbol.for("react.module.reference");
    function $(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === b || e === S || M || e === j || e === o || e === u || Z || e === D || R || ae || G || typeof e == "object" && e !== null && (e.$$typeof === m || e.$$typeof === h || e.$$typeof === v || e.$$typeof === l || e.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === L || e.getModuleId !== void 0));
    }
    function K(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var p = r.displayName || r.name || "";
      return p !== "" ? t + "(" + p + ")" : t;
    }
    function k(e) {
      return e.displayName || "Context";
    }
    function d(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case b:
          return "Fragment";
        case g:
          return "Portal";
        case S:
          return "Profiler";
        case j:
          return "StrictMode";
        case o:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            var r = e;
            return k(r) + ".Consumer";
          case v:
            var t = e;
            return k(t._context) + ".Provider";
          case i:
            return K(e, e.render, "ForwardRef");
          case h:
            var n = e.displayName || null;
            return n !== null ? n : d(e.type) || "Memo";
          case m: {
            var p = e, y = p._payload, c = p._init;
            try {
              return d(c(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var N = Object.assign, V = 0, me, ge, Ee, _e, Te, Re, xe;
    function we() {
    }
    we.__reactDisabledLog = !0;
    function Ye() {
      {
        if (V === 0) {
          me = console.log, ge = console.info, Ee = console.warn, _e = console.error, Te = console.group, Re = console.groupCollapsed, xe = console.groupEnd;
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
        V++;
      }
    }
    function Ke() {
      {
        if (V--, V === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: N({}, e, {
              value: me
            }),
            info: N({}, e, {
              value: ge
            }),
            warn: N({}, e, {
              value: Ee
            }),
            error: N({}, e, {
              value: _e
            }),
            group: N({}, e, {
              value: Te
            }),
            groupCollapsed: N({}, e, {
              value: Re
            }),
            groupEnd: N({}, e, {
              value: xe
            })
          });
        }
        V < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var oe = P.ReactCurrentDispatcher, ie;
    function Q(e, r, t) {
      {
        if (ie === void 0)
          try {
            throw Error();
          } catch (p) {
            var n = p.stack.trim().match(/\n( *(at )?)/);
            ie = n && n[1] || "";
          }
        return `
` + ie + e;
      }
    }
    var se = !1, ee;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      ee = new Be();
    }
    function Se(e, r) {
      if (!e || se)
        return "";
      {
        var t = ee.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      se = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = oe.current, oe.current = null, Ye();
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
            } catch (O) {
              n = O;
            }
            Reflect.construct(e, [], c);
          } else {
            try {
              c.call();
            } catch (O) {
              n = O;
            }
            e.call(c.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            n = O;
          }
          e();
        }
      } catch (O) {
        if (O && n && typeof O.stack == "string") {
          for (var s = O.stack.split(`
`), C = n.stack.split(`
`), _ = s.length - 1, x = C.length - 1; _ >= 1 && x >= 0 && s[_] !== C[x]; )
            x--;
          for (; _ >= 1 && x >= 0; _--, x--)
            if (s[_] !== C[x]) {
              if (_ !== 1 || x !== 1)
                do
                  if (_--, x--, x < 0 || s[_] !== C[x]) {
                    var I = `
` + s[_].replace(" at new ", " at ");
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && ee.set(e, I), I;
                  }
                while (_ >= 1 && x >= 0);
              break;
            }
        }
      } finally {
        se = !1, oe.current = y, Ke(), Error.prepareStackTrace = p;
      }
      var z = e ? e.displayName || e.name : "", Y = z ? Q(z) : "";
      return typeof e == "function" && ee.set(e, Y), Y;
    }
    function ze(e, r, t) {
      return Se(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function re(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Se(e, Ve(e));
      if (typeof e == "string")
        return Q(e);
      switch (e) {
        case o:
          return Q("Suspense");
        case u:
          return Q("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case i:
            return ze(e.render);
          case h:
            return re(e.type, r, t);
          case m: {
            var n = e, p = n._payload, y = n._init;
            try {
              return re(y(p), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var X = Object.prototype.hasOwnProperty, Ce = {}, ke = P.ReactDebugCurrentFrame;
    function te(e) {
      if (e) {
        var r = e._owner, t = re(e.type, e._source, r ? r.type : null);
        ke.setExtraStackFrame(t);
      } else
        ke.setExtraStackFrame(null);
    }
    function Xe(e, r, t, n, p) {
      {
        var y = Function.call.bind(X);
        for (var c in e)
          if (y(e, c)) {
            var s = void 0;
            try {
              if (typeof e[c] != "function") {
                var C = Error((n || "React class") + ": " + t + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              s = e[c](r, c, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              s = _;
            }
            s && !(s instanceof Error) && (te(p), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, c, typeof s), te(null)), s instanceof Error && !(s.message in Ce) && (Ce[s.message] = !0, te(p), T("Failed %s type: %s", t, s.message), te(null));
          }
      }
    }
    var He = Array.isArray;
    function le(e) {
      return He(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function qe(e) {
      try {
        return Oe(e), !1;
      } catch {
        return !0;
      }
    }
    function Oe(e) {
      return "" + e;
    }
    function je(e) {
      if (qe(e))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), Oe(e);
    }
    var H = P.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ae, Pe, ue;
    ue = {};
    function Ze(e) {
      if (X.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Qe(e) {
      if (X.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function er(e, r) {
      if (typeof e.ref == "string" && H.current && r && H.current.stateNode !== r) {
        var t = d(H.current.type);
        ue[t] || (T('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', d(H.current.type), e.ref), ue[t] = !0);
      }
    }
    function rr(e, r) {
      {
        var t = function() {
          Ae || (Ae = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var t = function() {
          Pe || (Pe = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var nr = function(e, r, t, n, p, y, c) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: c,
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
        value: n
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function ar(e, r, t, n, p) {
      {
        var y, c = {}, s = null, C = null;
        t !== void 0 && (je(t), s = "" + t), Qe(r) && (je(r.key), s = "" + r.key), Ze(r) && (C = r.ref, er(r, p));
        for (y in r)
          X.call(r, y) && !Ge.hasOwnProperty(y) && (c[y] = r[y]);
        if (e && e.defaultProps) {
          var _ = e.defaultProps;
          for (y in _)
            c[y] === void 0 && (c[y] = _[y]);
        }
        if (s || C) {
          var x = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && rr(c, x), C && tr(c, x);
        }
        return nr(e, s, C, p, n, H.current, c);
      }
    }
    var ce = P.ReactCurrentOwner, De = P.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = re(e.type, e._source, r ? r.type : null);
        De.setExtraStackFrame(t);
      } else
        De.setExtraStackFrame(null);
    }
    var fe;
    fe = !1;
    function de(e) {
      return typeof e == "object" && e !== null && e.$$typeof === f;
    }
    function Ie() {
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
    function or(e) {
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
    function ir(e) {
      {
        var r = Ie();
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
        var t = ir(r);
        if (Me[t])
          return;
        Me[t] = !0;
        var n = "";
        e && e._owner && e._owner !== ce.current && (n = " It was passed a child from " + d(e._owner.type) + "."), B(e), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), B(null);
      }
    }
    function Ne(e, r) {
      {
        if (typeof e != "object")
          return;
        if (le(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            de(n) && Le(n, r);
          }
        else if (de(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = U(e);
          if (typeof p == "function" && p !== e.entries)
            for (var y = p.call(e), c; !(c = y.next()).done; )
              de(c.value) && Le(c.value, r);
        }
      }
    }
    function sr(e) {
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
          var n = d(r);
          Xe(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !fe) {
          fe = !0;
          var p = d(r);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            B(e), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), B(null);
            break;
          }
        }
        e.ref !== null && (B(e), T("Invalid attribute `ref` supplied to `React.Fragment`."), B(null));
      }
    }
    var Fe = {};
    function $e(e, r, t, n, p, y) {
      {
        var c = $(e);
        if (!c) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var C = or(p);
          C ? s += C : s += Ie();
          var _;
          e === null ? _ = "null" : le(e) ? _ = "array" : e !== void 0 && e.$$typeof === f ? (_ = "<" + (d(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof e, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _, s);
        }
        var x = ar(e, r, t, p, y);
        if (x == null)
          return x;
        if (c) {
          var I = r.children;
          if (I !== void 0)
            if (n)
              if (le(I)) {
                for (var z = 0; z < I.length; z++)
                  Ne(I[z], e);
                Object.freeze && Object.freeze(I);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ne(I, e);
        }
        if (X.call(r, "key")) {
          var Y = d(e), O = Object.keys(r).filter(function(vr) {
            return vr !== "key";
          }), pe = O.length > 0 ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Fe[Y + pe]) {
            var pr = O.length > 0 ? "{" + O.join(": ..., ") + ": ...}" : "{}";
            T(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, pe, Y, pr, Y), Fe[Y + pe] = !0;
          }
        }
        return e === b ? lr(x) : sr(x), x;
      }
    }
    function ur(e, r, t) {
      return $e(e, r, t, !0);
    }
    function cr(e, r, t) {
      return $e(e, r, t, !1);
    }
    var fr = cr, dr = ur;
    q.Fragment = b, q.jsx = fr, q.jsxs = dr;
  }()), q;
}
process.env.NODE_ENV === "production" ? ye.exports = br() : ye.exports = mr();
var w = ye.exports;
const _r = ({
  currentTime: a,
  duration: f,
  scale: g,
  isPlaying: b,
  isLooping: j = !1,
  playbackRate: S = 1,
  inPoint: v,
  outPoint: l,
  timelineOffset: i = 80,
  // 기본값: 트랙 레이블 너비
  onTimeChange: o,
  onPlayPause: u,
  _onInOutPointChange: h,
  // 현재 사용되지 않음
  onDragStart: m,
  onDragEnd: D
}) => {
  const [A, F] = hr(!1), U = ve(null), P = ve();
  he(() => {
    if (b) {
      const M = performance.now(), L = a, $ = (K) => {
        const k = (K - M) * 1e-3 * S;
        let d = L + k;
        j && l !== void 0 && v !== void 0 ? d >= l && (d = v + (d - l) % (l - v)) : d >= f && (d = f, u && u(!1)), !j && v !== void 0 && l !== void 0 && (d < v && (d = v), d > l && (d = l, u && u(!1))), o(d), b && (P.current = requestAnimationFrame($));
      };
      return P.current = requestAnimationFrame($), () => {
        P.current && cancelAnimationFrame(P.current);
      };
    }
  }, [b, a, S, f, j, v, l, o, u]);
  const T = (M) => {
    M.preventDefault(), F(!0), m && m(), document.addEventListener("mousemove", E), document.addEventListener("mouseup", R);
  }, E = (M) => {
    var d;
    if (!A)
      return;
    const L = (d = U.current) == null ? void 0 : d.parentElement;
    if (!L)
      return;
    const $ = L.getBoundingClientRect(), K = M.clientX - $.left - i;
    let k = Math.max(0, K / g);
    k = Math.min(k, f), v !== void 0 && k < v && (k = v), l !== void 0 && k > l && (k = l), o(k);
  }, R = () => {
    F(!1), D && D(), document.removeEventListener("mousemove", E), document.removeEventListener("mouseup", R);
  }, ae = (M) => {
    M.preventDefault(), F(!0), m && m(), document.addEventListener("touchmove", G), document.addEventListener("touchend", Z);
  }, G = (M) => {
    var N;
    if (!A)
      return;
    const L = (N = U.current) == null ? void 0 : N.parentElement;
    if (!L)
      return;
    const $ = L.getBoundingClientRect(), k = M.touches[0].clientX - $.left - i;
    let d = Math.max(0, k / g);
    d = Math.min(d, f), v !== void 0 && d < v && (d = v), l !== void 0 && d > l && (d = l), o(d);
  }, Z = () => {
    F(!1), D && D(), document.removeEventListener("touchmove", G), document.removeEventListener("touchend", Z);
  };
  return /* @__PURE__ */ w.jsxs(
    "div",
    {
      ref: U,
      className: "playhead",
      style: {
        position: "absolute",
        top: 0,
        left: `${a * g + i}px`,
        width: "2px",
        height: "100%",
        backgroundColor: "red",
        cursor: A ? "grabbing" : "grab",
        zIndex: 1e3
      },
      onMouseDown: T,
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
              cursor: A ? "grabbing" : "grab",
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
            children: ne(a)
          }
        )
      ]
    }
  );
}, ne = (a) => {
  const f = Math.floor(a / 60), g = Math.floor(a % 60), b = Math.floor(a % 1 * 100);
  return `${f.toString().padStart(2, "0")}:${g.toString().padStart(2, "0")}.${b.toString().padStart(2, "0")}`;
}, Tr = ({
  currentTime: a,
  duration: f,
  isPlaying: g,
  playbackRate: b,
  _onTimeChange: j,
  // 현재 사용되지 않음
  onPlayPause: S,
  onPlaybackRateChange: v,
  onFrameStep: l,
  onJumpToStart: i,
  onJumpToEnd: o
}) => {
  const u = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  return be.useEffect(() => {
    const h = (m) => {
      if (!(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement))
        switch (m.key) {
          case " ":
            m.preventDefault(), S(!g);
            break;
          case "ArrowLeft":
            m.preventDefault(), l("backward");
            break;
          case "ArrowRight":
            m.preventDefault(), l("forward");
            break;
          case "Home":
            m.preventDefault(), i();
            break;
          case "End":
            m.preventDefault(), o();
            break;
        }
    };
    return window.addEventListener("keydown", h), () => {
      window.removeEventListener("keydown", h);
    };
  }, [g, S, l, i, o]), /* @__PURE__ */ w.jsxs("div", { className: "playhead-controls", style: {
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
      ne(a),
      " / ",
      ne(f)
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
        onClick: () => l("backward"),
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
        onClick: () => S(!g),
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
        onClick: () => l("forward"),
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
        value: b,
        onChange: (h) => v(parseFloat(h.target.value)),
        title: "재생 속도",
        style: {
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginLeft: "8px"
        },
        children: u.map((h) => /* @__PURE__ */ w.jsxs("option", { value: h, children: [
          h,
          "x"
        ] }, h))
      }
    )
  ] });
}, Rr = ({
  duration: a,
  scale: f,
  currentTime: g,
  timelineOffset: b = 80,
  onTimeChange: j,
  timeInterval: S = 1
  // 기본 간격: 1초
}) => {
  const v = ve(null), l = [], i = Math.max(1, a);
  for (let u = 0; u <= i; u += S) {
    const h = u % 5 === 0, m = h ? 16 : 8;
    l.push(
      /* @__PURE__ */ w.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: `${u * f}px`,
            top: 0,
            width: "1px",
            height: `${m}px`,
            backgroundColor: h ? "#666" : "#999",
            pointerEvents: "none"
          }
        },
        `marker-${u}`
      )
    ), (h || i <= 10) && l.push(
      /* @__PURE__ */ w.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: `${u * f}px`,
            top: "16px",
            transform: "translateX(-50%)",
            fontSize: "10px",
            color: "#666",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap"
          },
          children: ne(u)
        },
        `label-${u}`
      )
    );
  }
  const o = (u) => {
    if (!v.current)
      return;
    const h = v.current.getBoundingClientRect();
    let A = (u.clientX - h.left - b) / f;
    A = Math.max(0, Math.min(A, a)), j(A);
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
        width: `${i * f + b}px`,
        cursor: "pointer"
      },
      onClick: o,
      children: [
        /* @__PURE__ */ w.jsx("div", { style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: `${b}px`,
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
          left: `${b}px`,
          right: 0,
          top: 0,
          height: "100%",
          overflow: "hidden"
        }, children: l }),
        /* @__PURE__ */ w.jsx("div", { style: {
          position: "absolute",
          left: `${g * f + b}px`,
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
function gr(a, f) {
  switch (f.type) {
    case "SET_CURRENT_TIME":
      return { ...a, currentTime: f.payload };
    case "SET_PLAYING":
      return { ...a, isPlaying: f.payload };
    case "SET_PLAYBACK_RATE":
      return { ...a, playbackRate: f.payload };
    case "SET_IN_POINT":
      return { ...a, inPoint: f.payload };
    case "SET_OUT_POINT":
      return { ...a, outPoint: f.payload };
    case "CLEAR_IN_POINT":
      return { ...a, inPoint: void 0 };
    case "CLEAR_OUT_POINT":
      return { ...a, outPoint: void 0 };
    case "STEP_FORWARD": {
      const g = 0.03333333333333333, b = Math.min(a.currentTime + g, f.payload);
      return { ...a, currentTime: b };
    }
    case "STEP_BACKWARD": {
      const g = 0.03333333333333333, b = Math.max(a.currentTime - g, 0);
      return { ...a, currentTime: b };
    }
    case "JUMP_TO_START":
      return { ...a, currentTime: a.inPoint !== void 0 ? a.inPoint : 0 };
    case "JUMP_TO_END":
      return { ...a, currentTime: a.outPoint !== void 0 ? a.outPoint : f.payload };
    default:
      return a;
  }
}
function xr({
  duration: a,
  initialTime: f = 0,
  initialPlaybackRate: g = 1,
  initialInPoint: b,
  initialOutPoint: j,
  onTimeUpdate: S,
  fps: v = 30
}) {
  const l = {
    currentTime: f,
    isPlaying: !1,
    playbackRate: g,
    inPoint: b,
    outPoint: j
  }, [i, o] = yr(gr, l);
  he(() => {
    S && S(i.currentTime);
  }, [i.currentTime, S]), he(() => {
    const E = (R) => {
      if (!(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement))
        switch (R.key) {
          case " ":
            R.preventDefault(), o({ type: "SET_PLAYING", payload: !i.isPlaying });
            break;
          case "ArrowLeft":
            R.preventDefault(), o({ type: "STEP_BACKWARD", payload: null });
            break;
          case "ArrowRight":
            R.preventDefault(), o({ type: "STEP_FORWARD", payload: a });
            break;
          case "Home":
            R.preventDefault(), o({ type: "JUMP_TO_START", payload: null });
            break;
          case "End":
            R.preventDefault(), o({ type: "JUMP_TO_END", payload: a });
            break;
          case "i":
            (R.ctrlKey || R.metaKey) && (R.preventDefault(), o({ type: "SET_IN_POINT", payload: i.currentTime }));
            break;
          case "o":
            (R.ctrlKey || R.metaKey) && (R.preventDefault(), o({ type: "SET_OUT_POINT", payload: i.currentTime }));
            break;
          case "x":
            (R.ctrlKey || R.metaKey) && (R.preventDefault(), o({ type: "CLEAR_IN_POINT", payload: null }), o({ type: "CLEAR_OUT_POINT", payload: null }));
            break;
        }
    };
    return window.addEventListener("keydown", E), () => {
      window.removeEventListener("keydown", E);
    };
  }, [i.isPlaying, i.currentTime, a]);
  const u = W((E) => {
    o({ type: "SET_CURRENT_TIME", payload: E });
  }, []), h = W((E) => {
    o({ type: "SET_PLAYING", payload: E });
  }, []), m = W((E) => {
    o({ type: "SET_PLAYBACK_RATE", payload: E });
  }, []), D = W((E) => {
    o(E === "forward" ? { type: "STEP_FORWARD", payload: a } : { type: "STEP_BACKWARD", payload: null });
  }, [a]), A = W(() => {
    o({ type: "JUMP_TO_START", payload: null });
  }, []), F = W(() => {
    o({ type: "JUMP_TO_END", payload: a });
  }, [a]), U = W((E) => {
    o(E !== void 0 ? { type: "SET_IN_POINT", payload: E } : { type: "CLEAR_IN_POINT", payload: null });
  }, []), P = W((E) => {
    o(E !== void 0 ? { type: "SET_OUT_POINT", payload: E } : { type: "CLEAR_OUT_POINT", payload: null });
  }, []), T = 1 / v;
  return {
    // 상태
    ...i,
    // 프레임 정보
    fps: v,
    frameTime: T,
    // 액션
    setCurrentTime: u,
    setPlaying: h,
    setPlaybackRate: m,
    stepFrame: D,
    jumpToStart: A,
    jumpToEnd: F,
    setInPoint: U,
    setOutPoint: P
  };
}
export {
  _r as Playhead,
  Tr as PlayheadControls,
  Rr as TimeRuler,
  ne as formatTime,
  xr as usePlayhead
};
