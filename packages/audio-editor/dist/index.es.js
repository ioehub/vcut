var wt = Object.defineProperty;
var kt = (n, e, t) => e in n ? wt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var G = (n, e, t) => (kt(n, typeof e != "symbol" ? e + "" : e, t), t);
import He, { createContext as Rt, useReducer as St, useRef as ge, useEffect as Qe, useCallback as P, useContext as At, useState as Ne } from "react";
var _e = { exports: {} }, ne = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ge;
function Nt() {
  if (Ge)
    return ne;
  Ge = 1;
  var n = He, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, a = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(m, y, p) {
    var x, R = {}, N = null, $ = null;
    p !== void 0 && (N = "" + p), y.key !== void 0 && (N = "" + y.key), y.ref !== void 0 && ($ = y.ref);
    for (x in y)
      o.call(y, x) && !i.hasOwnProperty(x) && (R[x] = y[x]);
    if (m && m.defaultProps)
      for (x in y = m.defaultProps, y)
        R[x] === void 0 && (R[x] = y[x]);
    return { $$typeof: e, type: m, key: N, ref: $, props: R, _owner: a.current };
  }
  return ne.Fragment = t, ne.jsx = d, ne.jsxs = d, ne;
}
var ae = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function _t() {
  return qe || (qe = 1, process.env.NODE_ENV !== "production" && function() {
    var n = He, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), m = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), $ = Symbol.for("react.offscreen"), F = Symbol.iterator, w = "@@iterator";
    function g(r) {
      if (r === null || typeof r != "object")
        return null;
      var l = F && r[F] || r[w];
      return typeof l == "function" ? l : null;
    }
    var v = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(r) {
      {
        for (var l = arguments.length, c = new Array(l > 1 ? l - 1 : 0), b = 1; b < l; b++)
          c[b - 1] = arguments[b];
        B("error", r, c);
      }
    }
    function B(r, l, c) {
      {
        var b = v.ReactDebugCurrentFrame, k = b.getStackAddendum();
        k !== "" && (l += "%s", c = c.concat([k]));
        var A = c.map(function(T) {
          return String(T);
        });
        A.unshift("Warning: " + l), Function.prototype.apply.call(console[r], console, A);
      }
    }
    var H = !1, Q = !1, z = !1, me = !1, xe = !1, ie;
    ie = Symbol.for("react.module.reference");
    function ye(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === o || r === i || xe || r === a || r === p || r === x || me || r === $ || H || Q || z || typeof r == "object" && r !== null && (r.$$typeof === N || r.$$typeof === R || r.$$typeof === d || r.$$typeof === m || r.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === ie || r.getModuleId !== void 0));
    }
    function ve(r, l, c) {
      var b = r.displayName;
      if (b)
        return b;
      var k = l.displayName || l.name || "";
      return k !== "" ? c + "(" + k + ")" : c;
    }
    function u(r) {
      return r.displayName || "Context";
    }
    function f(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case o:
          return "Fragment";
        case t:
          return "Portal";
        case i:
          return "Profiler";
        case a:
          return "StrictMode";
        case p:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case m:
            var l = r;
            return u(l) + ".Consumer";
          case d:
            var c = r;
            return u(c._context) + ".Provider";
          case y:
            return ve(r, r.render, "ForwardRef");
          case R:
            var b = r.displayName || null;
            return b !== null ? b : f(r.type) || "Memo";
          case N: {
            var k = r, A = k._payload, T = k._init;
            try {
              return f(T(A));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var h = Object.assign, _ = 0, L, q, Z, D, ee, W, te;
    function le() {
    }
    le.__reactDisabledLog = !0;
    function ce() {
      {
        if (_ === 0) {
          L = console.log, q = console.info, Z = console.warn, D = console.error, ee = console.group, W = console.groupCollapsed, te = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: le,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        _++;
      }
    }
    function be() {
      {
        if (_--, _ === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: h({}, r, {
              value: L
            }),
            info: h({}, r, {
              value: q
            }),
            warn: h({}, r, {
              value: Z
            }),
            error: h({}, r, {
              value: D
            }),
            group: h({}, r, {
              value: ee
            }),
            groupCollapsed: h({}, r, {
              value: W
            }),
            groupEnd: h({}, r, {
              value: te
            })
          });
        }
        _ < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Y = v.ReactCurrentDispatcher, Ee;
    function de(r, l, c) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (k) {
            var b = k.stack.trim().match(/\n( *(at )?)/);
            Ee = b && b[1] || "";
          }
        return `
` + Ee + r;
      }
    }
    var Ce = !1, ue;
    {
      var Ze = typeof WeakMap == "function" ? WeakMap : Map;
      ue = new Ze();
    }
    function Pe(r, l) {
      if (!r || Ce)
        return "";
      {
        var c = ue.get(r);
        if (c !== void 0)
          return c;
      }
      var b;
      Ce = !0;
      var k = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var A;
      A = Y.current, Y.current = null, ce();
      try {
        if (l) {
          var T = function() {
            throw Error();
          };
          if (Object.defineProperty(T.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(T, []);
            } catch (M) {
              b = M;
            }
            Reflect.construct(r, [], T);
          } else {
            try {
              T.call();
            } catch (M) {
              b = M;
            }
            r.call(T.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (M) {
            b = M;
          }
          r();
        }
      } catch (M) {
        if (M && b && typeof M.stack == "string") {
          for (var E = M.stack.split(`
`), I = b.stack.split(`
`), j = E.length - 1, O = I.length - 1; j >= 1 && O >= 0 && E[j] !== I[O]; )
            O--;
          for (; j >= 1 && O >= 0; j--, O--)
            if (E[j] !== I[O]) {
              if (j !== 1 || O !== 1)
                do
                  if (j--, O--, O < 0 || E[j] !== I[O]) {
                    var U = `
` + E[j].replace(" at new ", " at ");
                    return r.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", r.displayName)), typeof r == "function" && ue.set(r, U), U;
                  }
                while (j >= 1 && O >= 0);
              break;
            }
        }
      } finally {
        Ce = !1, Y.current = A, be(), Error.prepareStackTrace = k;
      }
      var X = r ? r.displayName || r.name : "", K = X ? de(X) : "";
      return typeof r == "function" && ue.set(r, K), K;
    }
    function et(r, l, c) {
      return Pe(r, !1);
    }
    function tt(r) {
      var l = r.prototype;
      return !!(l && l.isReactComponent);
    }
    function fe(r, l, c) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return Pe(r, tt(r));
      if (typeof r == "string")
        return de(r);
      switch (r) {
        case p:
          return de("Suspense");
        case x:
          return de("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case y:
            return et(r.render);
          case R:
            return fe(r.type, l, c);
          case N: {
            var b = r, k = b._payload, A = b._init;
            try {
              return fe(A(k), l, c);
            } catch {
            }
          }
        }
      return "";
    }
    var re = Object.prototype.hasOwnProperty, je = {}, $e = v.ReactDebugCurrentFrame;
    function pe(r) {
      if (r) {
        var l = r._owner, c = fe(r.type, r._source, l ? l.type : null);
        $e.setExtraStackFrame(c);
      } else
        $e.setExtraStackFrame(null);
    }
    function rt(r, l, c, b, k) {
      {
        var A = Function.call.bind(re);
        for (var T in r)
          if (A(r, T)) {
            var E = void 0;
            try {
              if (typeof r[T] != "function") {
                var I = Error((b || "React class") + ": " + c + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw I.name = "Invariant Violation", I;
              }
              E = r[T](l, T, b, c, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (j) {
              E = j;
            }
            E && !(E instanceof Error) && (pe(k), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", b || "React class", c, T, typeof E), pe(null)), E instanceof Error && !(E.message in je) && (je[E.message] = !0, pe(k), C("Failed %s type: %s", c, E.message), pe(null));
          }
      }
    }
    var ot = Array.isArray;
    function Te(r) {
      return ot(r);
    }
    function nt(r) {
      {
        var l = typeof Symbol == "function" && Symbol.toStringTag, c = l && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return c;
      }
    }
    function at(r) {
      try {
        return Oe(r), !1;
      } catch {
        return !0;
      }
    }
    function Oe(r) {
      return "" + r;
    }
    function Ve(r) {
      if (at(r))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nt(r)), Oe(r);
    }
    var oe = v.ReactCurrentOwner, st = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fe, De, we;
    we = {};
    function it(r) {
      if (re.call(r, "ref")) {
        var l = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (l && l.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function lt(r) {
      if (re.call(r, "key")) {
        var l = Object.getOwnPropertyDescriptor(r, "key").get;
        if (l && l.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function ct(r, l) {
      if (typeof r.ref == "string" && oe.current && l && oe.current.stateNode !== l) {
        var c = f(oe.current.type);
        we[c] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', f(oe.current.type), r.ref), we[c] = !0);
      }
    }
    function dt(r, l) {
      {
        var c = function() {
          Fe || (Fe = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
        };
        c.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: c,
          configurable: !0
        });
      }
    }
    function ut(r, l) {
      {
        var c = function() {
          De || (De = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
        };
        c.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: c,
          configurable: !0
        });
      }
    }
    var ft = function(r, l, c, b, k, A, T) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: r,
        key: l,
        ref: c,
        props: T,
        // Record the component responsible for creating this element.
        _owner: A
      };
      return E._store = {}, Object.defineProperty(E._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(E, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.defineProperty(E, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(E.props), Object.freeze(E)), E;
    };
    function pt(r, l, c, b, k) {
      {
        var A, T = {}, E = null, I = null;
        c !== void 0 && (Ve(c), E = "" + c), lt(l) && (Ve(l.key), E = "" + l.key), it(l) && (I = l.ref, ct(l, k));
        for (A in l)
          re.call(l, A) && !st.hasOwnProperty(A) && (T[A] = l[A]);
        if (r && r.defaultProps) {
          var j = r.defaultProps;
          for (A in j)
            T[A] === void 0 && (T[A] = j[A]);
        }
        if (E || I) {
          var O = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          E && dt(T, O), I && ut(T, O);
        }
        return ft(r, E, I, k, b, oe.current, T);
      }
    }
    var ke = v.ReactCurrentOwner, Ie = v.ReactDebugCurrentFrame;
    function J(r) {
      if (r) {
        var l = r._owner, c = fe(r.type, r._source, l ? l.type : null);
        Ie.setExtraStackFrame(c);
      } else
        Ie.setExtraStackFrame(null);
    }
    var Re;
    Re = !1;
    function Se(r) {
      return typeof r == "object" && r !== null && r.$$typeof === e;
    }
    function Me() {
      {
        if (ke.current) {
          var r = f(ke.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function ht(r) {
      {
        if (r !== void 0) {
          var l = r.fileName.replace(/^.*[\\\/]/, ""), c = r.lineNumber;
          return `

Check your code at ` + l + ":" + c + ".";
        }
        return "";
      }
    }
    var Be = {};
    function gt(r) {
      {
        var l = Me();
        if (!l) {
          var c = typeof r == "string" ? r : r.displayName || r.name;
          c && (l = `

Check the top-level render call using <` + c + ">.");
        }
        return l;
      }
    }
    function Le(r, l) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var c = gt(l);
        if (Be[c])
          return;
        Be[c] = !0;
        var b = "";
        r && r._owner && r._owner !== ke.current && (b = " It was passed a child from " + f(r._owner.type) + "."), J(r), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', c, b), J(null);
      }
    }
    function Ue(r, l) {
      {
        if (typeof r != "object")
          return;
        if (Te(r))
          for (var c = 0; c < r.length; c++) {
            var b = r[c];
            Se(b) && Le(b, l);
          }
        else if (Se(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var k = g(r);
          if (typeof k == "function" && k !== r.entries)
            for (var A = k.call(r), T; !(T = A.next()).done; )
              Se(T.value) && Le(T.value, l);
        }
      }
    }
    function mt(r) {
      {
        var l = r.type;
        if (l == null || typeof l == "string")
          return;
        var c;
        if (typeof l == "function")
          c = l.propTypes;
        else if (typeof l == "object" && (l.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        l.$$typeof === R))
          c = l.propTypes;
        else
          return;
        if (c) {
          var b = f(l);
          rt(c, r.props, "prop", b, r);
        } else if (l.PropTypes !== void 0 && !Re) {
          Re = !0;
          var k = f(l);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof l.getDefaultProps == "function" && !l.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xt(r) {
      {
        for (var l = Object.keys(r.props), c = 0; c < l.length; c++) {
          var b = l[c];
          if (b !== "children" && b !== "key") {
            J(r), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", b), J(null);
            break;
          }
        }
        r.ref !== null && (J(r), C("Invalid attribute `ref` supplied to `React.Fragment`."), J(null));
      }
    }
    var ze = {};
    function We(r, l, c, b, k, A) {
      {
        var T = ye(r);
        if (!T) {
          var E = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var I = ht(k);
          I ? E += I : E += Me();
          var j;
          r === null ? j = "null" : Te(r) ? j = "array" : r !== void 0 && r.$$typeof === e ? (j = "<" + (f(r.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : j = typeof r, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", j, E);
        }
        var O = pt(r, l, c, k, A);
        if (O == null)
          return O;
        if (T) {
          var U = l.children;
          if (U !== void 0)
            if (b)
              if (Te(U)) {
                for (var X = 0; X < U.length; X++)
                  Ue(U[X], r);
                Object.freeze && Object.freeze(U);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ue(U, r);
        }
        if (re.call(l, "key")) {
          var K = f(r), M = Object.keys(l).filter(function(Tt) {
            return Tt !== "key";
          }), Ae = M.length > 0 ? "{key: someKey, " + M.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ze[K + Ae]) {
            var Ct = M.length > 0 ? "{" + M.join(": ..., ") + ": ...}" : "{}";
            C(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ae, K, Ct, K), ze[K + Ae] = !0;
          }
        }
        return r === o ? xt(O) : mt(O), O;
      }
    }
    function yt(r, l, c) {
      return We(r, l, c, !0);
    }
    function vt(r, l, c) {
      return We(r, l, c, !1);
    }
    var bt = vt, Et = yt;
    ae.Fragment = o, ae.jsx = bt, ae.jsxs = Et;
  }()), ae;
}
process.env.NODE_ENV === "production" ? _e.exports = Nt() : _e.exports = _t();
var s = _e.exports;
let he;
const Pt = new Uint8Array(16);
function jt() {
  if (!he && (he = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !he))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return he(Pt);
}
const V = [];
for (let n = 0; n < 256; ++n)
  V.push((n + 256).toString(16).slice(1));
function $t(n, e = 0) {
  return V[n[e + 0]] + V[n[e + 1]] + V[n[e + 2]] + V[n[e + 3]] + "-" + V[n[e + 4]] + V[n[e + 5]] + "-" + V[n[e + 6]] + V[n[e + 7]] + "-" + V[n[e + 8]] + V[n[e + 9]] + "-" + V[n[e + 10]] + V[n[e + 11]] + V[n[e + 12]] + V[n[e + 13]] + V[n[e + 14]] + V[n[e + 15]];
}
const Ot = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ye = {
  randomUUID: Ot
};
function Ke(n, e, t) {
  if (Ye.randomUUID && !e && !n)
    return Ye.randomUUID();
  n = n || {};
  const o = n.random || (n.rng || jt)();
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, e) {
    t = t || 0;
    for (let a = 0; a < 16; ++a)
      e[t + a] = o[a];
    return e;
  }
  return $t(o);
}
var S = /* @__PURE__ */ ((n) => (n.GAIN = "gain", n.EQ = "eq", n.COMPRESSOR = "compressor", n.REVERB = "reverb", n.DELAY = "delay", n.NOISE_REDUCTION = "noiseReduction", n.FADE = "fade", n.LIMITER = "limiter", n.PITCH_SHIFT = "pitchShift", n.TIME_STRETCH = "timeStretch", n))(S || {});
class Vt {
  /**
   * AudioService 생성자
   */
  constructor() {
    // AudioContext 및 마스터 게인 노드
    G(this, "audioContext");
    G(this, "masterGainNode");
    // 오디오 트랙 관리를 위한 변수들
    G(this, "trackNodes", /* @__PURE__ */ new Map());
    G(this, "effectNodes", /* @__PURE__ */ new Map());
    // 이펙트 노드 맵 추가
    G(this, "isPlaying", !1);
    G(this, "isPaused", !1);
    G(this, "startTime", 0);
    G(this, "pauseTime", 0);
    // 미사용 변수 제거
    // private pausedPosition: number = 0;
    G(this, "isInitialized", !1);
    try {
      const e = window.AudioContext || window.webkitAudioContext;
      if (!e)
        throw new Error("AudioContext is not supported in this environment");
      this.audioContext = new e(), console.log("AudioContext 생성 성공:", this.audioContext.state), this.masterGainNode = this.audioContext.createGain(), this.masterGainNode.gain.value = 1, this.masterGainNode.connect(this.audioContext.destination), this.isInitialized = !1, this.isPlaying = !1, this.isPaused = !1, this.trackNodes = /* @__PURE__ */ new Map(), this.startTime = 0, this.pauseTime = 0, this.setupAutoResume(), process.env.NODE_ENV !== "production" && (window.__audioService = this, console.log("AudioService 인스턴스가 전역 객체에 추가되었습니다. window.__audioService로 접근 가능합니다."));
    } catch (e) {
      console.error("AudioService 초기화 중 오류 발생:", e);
    }
  }
  /**
   * 사용자 상호작용 시 AudioContext 자동 재개 설정
   */
  setupAutoResume() {
    const e = () => {
      this.audioContext.state === "suspended" && this.audioContext.resume().then(() => {
        console.log("사용자 상호작용으로 AudioContext가 재개되었습니다.");
      }).catch((t) => {
        console.error("AudioContext 재개 실패:", t);
      });
    };
    ["click", "touchstart", "keydown"].forEach((t) => {
      document.addEventListener(t, e, { once: !0 });
    });
  }
  /**
   * 오디오 서비스 초기화
   */
  initialize() {
    if (this.isInitialized) {
      console.log("AudioService가 이미 초기화되어 있습니다.");
      return;
    }
    try {
      console.log("AudioService 초기화 시작..."), this.audioContext ? console.log(`기존 AudioContext 사용, 상태: ${this.audioContext.state}`) : (this.audioContext = new (window.AudioContext || window.webkitAudioContext)(), console.log(`AudioContext 생성됨, 상태: ${this.audioContext.state}, 샘플레이트: ${this.audioContext.sampleRate}Hz`)), this.masterGainNode || (this.masterGainNode = this.audioContext.createGain(), this.masterGainNode.gain.value = 1, this.masterGainNode.connect(this.audioContext.destination), console.log("마스터 게인 노드가 오디오 출력에 연결됨")), this.trackNodes = /* @__PURE__ */ new Map(), this.effectNodes = /* @__PURE__ */ new Map(), this.isPlaying = !1, this.startTime = 0, this.pauseTime = 0, this.isInitialized = !0, console.log("AudioService 초기화 완료"), process.env.NODE_ENV !== "production" && (window.__audioService = this, console.log("AudioService 인스턴스가 전역 객체에 추가되었습니다. window.__audioService로 접근 가능합니다."));
    } catch (e) {
      throw console.error("AudioService 초기화 실패:", e), this.isInitialized = !1, e;
    }
  }
  /**
   * URL에서 오디오 파일 로드
   * @param url 오디오 파일 URL
   */
  async loadAudioFile(e) {
    console.log(`오디오 파일 로드 시작: ${e}`);
    try {
      if (this.audioContext.state === "suspended" || this.audioContext.state === "closed") {
        console.log(`AudioContext가 ${this.audioContext.state} 상태입니다. 재개 시도...`);
        try {
          await this.audioContext.resume(), console.log("AudioContext 재개 성공, 상태:", this.audioContext.state);
        } catch (i) {
          console.error("AudioContext 재개 실패:", i), console.log("AudioContext 재생성 시도 중...");
          try {
            const d = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new d(), this.masterGainNode = this.audioContext.createGain(), this.masterGainNode.gain.value = 1, this.masterGainNode.connect(this.audioContext.destination), console.log("AudioContext 재생성 성공, 상태:", this.audioContext.state);
          } catch (d) {
            throw console.error("AudioContext 재생성 실패:", d), new Error("오디오 컨텍스트 초기화에 실패했습니다");
          }
        }
      }
      console.log("URL로 파일 다운로드 시작...");
      let t;
      try {
        if (t = await fetch(e), !t.ok)
          throw new Error(`파일 다운로드 실패: ${t.status} ${t.statusText}`);
      } catch (i) {
        throw console.error("파일 다운로드 중 오류:", i), new Error(`오디오 파일을 다운로드할 수 없습니다: ${i instanceof Error ? i.message : String(i)}`);
      }
      console.log("파일 다운로드 완료, ArrayBuffer로 변환...");
      const o = await t.arrayBuffer();
      console.log(`ArrayBuffer 크기: ${o.byteLength} 바이트, 디코딩 시작...`);
      let a;
      try {
        a = await this.audioContext.decodeAudioData(o);
      } catch (i) {
        throw console.error("오디오 디코딩 오류:", i), new Error(`오디오 파일을 디코딩할 수 없습니다: ${i instanceof Error ? i.message : String(i)}`);
      }
      return console.log(`오디오 디코딩 완료 - 길이: ${a.duration.toFixed(2)}초, 채널: ${a.numberOfChannels}, 샘플레이트: ${a.sampleRate}Hz`), console.log("디코딩된 오디오 샘플:", {
        channelCount: a.numberOfChannels,
        length: a.length,
        duration: a.duration,
        sampleRate: a.sampleRate,
        channelDataInfo: Array.from({ length: a.numberOfChannels }, (i, d) => {
          const m = a.getChannelData(d), y = m.reduce((p, x) => p + (x !== 0 ? 1 : 0), 0);
          return {
            channel: d,
            nonZeroSamples: y,
            totalSamples: m.length,
            nonZeroPercentage: (y / m.length * 100).toFixed(2)
          };
        })
      }), a;
    } catch (t) {
      throw console.error("오디오 파일 로드 중 오류 발생:", t), t;
    }
  }
  /**
   * 로컬 파일을 로드하고 AudioBuffer로 변환 (ArrayBuffer에서 직접 디코딩)
   * @param arrayBuffer 오디오 파일 데이터
   */
  async decodeAudioData(e) {
    console.log(`오디오 데이터 디코딩 시작, 크기: ${e.byteLength} 바이트`);
    try {
      this.audioContext.state === "suspended" && (console.log("AudioContext가 일시 중단 상태입니다. resume 시도..."), await this.audioContext.resume());
      const t = await this.audioContext.decodeAudioData(e);
      console.log(`오디오 디코딩 완료 - 길이: ${t.duration.toFixed(2)}초, 채널: ${t.numberOfChannels}`);
      const o = new CustomEvent("audio-duration-updated", {
        detail: { duration: t.duration }
      });
      return window.dispatchEvent(o), t;
    } catch (t) {
      throw console.error("오디오 데이터 디코딩 중 오류 발생:", t), t;
    }
  }
  /**
   * 파형 데이터 생성 (시각화용)
   * @param audioBuffer 오디오 버퍼
   * @param samples 샘플링할 데이터 포인트 수
   */
  generateWaveformData(e, t = 1e3) {
    const o = e.getChannelData(0), a = Math.floor(o.length / t), i = [];
    for (let d = 0; d < t; d++) {
      const m = d * a;
      let y = 0;
      for (let p = 0; p < a; p++)
        y += Math.abs(o[m + p] || 0);
      i.push(y / a);
    }
    return i;
  }
  /**
   * 트랙 초기 설정
   * @param track 오디오 트랙 객체
   * @returns 트랙 ID
   */
  setupTrack(e) {
    if (console.log(`트랙 설정 시작: ${e.id}, 이름: ${e.name}`), this.trackNodes.has(e.id))
      return console.log(`기존 트랙 업데이트: ${e.id}`), e.audioBuffer && this.setTrackAudioBuffer(e.id, e.audioBuffer), e.id;
    const t = this.audioContext.createGain();
    t.gain.value = e.volume || 1;
    const o = this.audioContext.createStereoPanner();
    o.pan.value = e.pan || 0;
    const a = this.audioContext.createAnalyser();
    if (a.fftSize = 2048, t.connect(o), o.connect(a), a.connect(this.masterGainNode), this.trackNodes.set(e.id, {
      sourceNode: void 0,
      gainNode: t,
      panNode: o,
      analyzerNode: a,
      effectNodes: [],
      buffer: e.audioBuffer
    }), console.log(`트랙 노드 생성 완료: ${e.id}`), e.audioBuffer) {
      console.log(`트랙에 오디오 버퍼 설정 진행: ${e.id}, 길이: ${e.audioBuffer.duration.toFixed(2)}초`);
      const i = this.audioContext.createBufferSource();
      i.buffer = e.audioBuffer;
      const d = this.trackNodes.get(e.id);
      d && (d.sourceNode = i, i.connect(d.gainNode));
    } else
      console.warn(`트랙에 오디오 버퍼가 없습니다: ${e.id}`);
    return e.id;
  }
  /**
   * 트랙에 오디오 버퍼 설정
   * @param trackId 트랙 ID
   * @param audioBuffer 오디오 버퍼
   */
  setTrackAudioBuffer(e, t) {
    const o = this.trackNodes.get(e);
    if (!o) {
      const i = {
        id: e,
        name: `Track ${e.substring(0, 4)}`,
        volume: 1,
        pan: 0,
        muted: !1,
        solo: !1,
        gain: 1,
        effects: [],
        startTime: 0,
        duration: t ? t.duration : 0,
        markers: [],
        // 마커 배열 추가
        isSelected: !1
        // 선택 상태 추가
      };
      this.setupTrack(i), this.setTrackAudioBuffer(e, t);
      return;
    }
    if (o.sourceNode) {
      try {
        o.sourceNode.stop();
      } catch {
      }
      o.sourceNode.disconnect();
    }
    const a = this.audioContext.createBufferSource();
    a.buffer = t, a.connect(o.gainNode), o.sourceNode = a, o.buffer = t, console.log(`오디오 버퍼 설정 완료 - 트랙: ${e}, 길이: ${t.duration.toFixed(2)}초`);
  }
  /**
   * 트랙 볼륨 설정
   * @param trackId 트랙 ID
   * @param volume 볼륨 (0~1)
   */
  setTrackVolume(e, t) {
    const o = this.trackNodes.get(e);
    o && (o.gainNode.gain.value = Math.max(0, Math.min(1, t)));
  }
  /**
   * 트랙 패닝 설정
   * @param trackId 트랙 ID
   * @param pan 패닝 값 (-1: 왼쪽, 0: 중앙, 1: 오른쪽)
   */
  setTrackPan(e, t) {
    const o = this.trackNodes.get(e);
    o && (o.panNode.pan.value = Math.max(-1, Math.min(1, t)));
  }
  /**
   * 마스터 볼륨 설정
   * @param volume 볼륨 (0~1)
   */
  setMasterVolume(e) {
    this.masterGainNode.gain.value = Math.max(0, Math.min(1, e));
  }
  /**
   * 트랙에 효과 적용
   * @param trackId 트랙 ID
   * @param effect 오디오 효과
   */
  applyEffect(e, t) {
    const o = this.trackNodes.get(e);
    if (!o)
      return;
    let a = null;
    switch (t.type) {
      case S.GAIN:
        a = this.createGainEffect(t);
        break;
      case S.EQ:
        a = this.createEqEffect(t);
        break;
      case S.COMPRESSOR:
        a = this.createCompressorEffect(t);
        break;
      case S.REVERB:
        a = this.createReverbEffect(t);
        break;
      case S.DELAY:
        a = this.createDelayEffect(t);
        break;
    }
    if (a) {
      if (o.effectNodes.length === 0)
        o.gainNode.disconnect(), o.gainNode.connect(a), a.connect(o.panNode);
      else {
        const i = o.effectNodes[o.effectNodes.length - 1];
        i.disconnect(), i.connect(a), a.connect(o.panNode);
      }
      o.effectNodes.push(a);
    }
  }
  /**
   * 게인 효과 생성
   * @param effect 효과 데이터
   */
  createGainEffect(e) {
    const t = this.audioContext.createGain(), o = e.parameters.find((a) => a.id === "gain");
    return o && (t.gain.value = o.value), t;
  }
  /**
   * EQ 효과 생성
   * @param effect 효과 데이터
   */
  createEqEffect(e) {
    const t = this.audioContext.createBiquadFilter(), o = e.parameters.find((m) => m.id === "type"), a = e.parameters.find((m) => m.id === "frequency"), i = e.parameters.find((m) => m.id === "gain"), d = e.parameters.find((m) => m.id === "q");
    if (o) {
      const m = o.value.toString();
      switch (m) {
        case "lowpass":
        case "highpass":
        case "bandpass":
        case "lowshelf":
        case "highshelf":
        case "peaking":
        case "notch":
        case "allpass":
          t.type = m;
          break;
        default:
          console.warn(`지원되지 않는 필터 타입: ${m}, 기본값 'lowpass'로 설정`), t.type = "lowpass";
      }
    }
    return a && (t.frequency.value = a.value), i && (t.gain.value = i.value), d && (t.Q.value = d.value), t;
  }
  /**
   * 컴프레서 효과 생성
   * @param effect 효과 데이터
   */
  createCompressorEffect(e) {
    const t = this.audioContext.createDynamicsCompressor(), o = e.parameters.find((y) => y.id === "threshold"), a = e.parameters.find((y) => y.id === "ratio"), i = e.parameters.find((y) => y.id === "attack"), d = e.parameters.find((y) => y.id === "release"), m = e.parameters.find((y) => y.id === "knee");
    return o && (t.threshold.value = o.value), a && (t.ratio.value = a.value), i && (t.attack.value = i.value), d && (t.release.value = d.value), m && (t.knee.value = m.value), t;
  }
  /**
   * 리버브 효과 생성 (간단 구현)
   * @param _effect 효과 데이터
   */
  createReverbEffect(e) {
    return this.audioContext.createConvolver();
  }
  /**
   * 딜레이 효과 생성
   * @param effect 효과 데이터
   */
  createDelayEffect(e) {
    const t = this.audioContext.createDelay(), o = e.parameters.find((a) => a.id === "time");
    return e.parameters.find((a) => a.id === "feedback"), o && (t.delayTime.value = o.value), t;
  }
  /**
   * 이펙트 노드 생성 및 연결
   */
  setupEffects() {
    console.log("이펙트 설정 시작");
    try {
      const e = this.audioContext.createBiquadFilter();
      e.type = "peaking", e.frequency.value = 1e3, e.gain.value = 0, e.Q.value = 1, this.effectNodes.set("equalizer", e), console.log("이퀄라이저 생성 완료");
      const t = this.audioContext.createDynamicsCompressor();
      t.threshold.value = -24, t.knee.value = 30, t.ratio.value = 12, t.attack.value = 3e-3, t.release.value = 0.25, this.effectNodes.set("compressor", t), console.log("컴프레서 생성 완료"), console.log(`이펙트 설정 완료: ${this.effectNodes.size}개 노드 생성됨`);
    } catch (e) {
      console.error("이펙트 설정 중 오류:", e);
    }
  }
  /**
   * 특정 이펙트 노드 가져오기
   * @param effectName 이펙트 이름
   * @returns 이펙트 노드 또는 undefined
   */
  getEffectNode(e) {
    return this.effectNodes.get(e);
  }
  /**
   * 이펙트 파라미터 조정하기
   * @param effectName 이펙트 이름
   * @param paramName 파라미터 이름
   * @param value 값
   */
  setEffectParameter(e, t, o) {
    try {
      const a = this.effectNodes.get(e);
      if (!a) {
        console.error(`이펙트를 찾을 수 없음: ${e}`);
        return;
      }
      e === "equalizer" && a instanceof BiquadFilterNode ? t === "gain" ? (a.gain.value = o, console.log(`이퀄라이저 게인 설정: ${o}dB`)) : t === "frequency" ? (a.frequency.value = o, console.log(`이퀄라이저 주파수 설정: ${o}Hz`)) : t === "Q" && (a.Q.value = o, console.log(`이퀄라이저 Q 값 설정: ${o}`)) : e === "compressor" && a instanceof DynamicsCompressorNode && (t === "threshold" ? (a.threshold.value = o, console.log(`컴프레서 쓰레숄드 설정: ${o}dB`)) : t === "ratio" && (a.ratio.value = o, console.log(`컴프레서 비율 설정: ${o}:1`)));
    } catch (a) {
      console.error(`이펙트 파라미터 설정 중 오류: ${e}.${t} = ${o}`, a);
    }
  }
  /**
   * 트랙 재생
   * @param trackId 트랙 ID
   * @param startTime 시작 시간(초)
   * @param duration 재생 길이(초)
   */
  playTrack(e, t = 0, o) {
    console.log(`트랙 재생 요청: ${e}, 시작 시간: ${t}초${o ? `, 길이: ${o}초` : ""}`);
    const a = this.trackNodes.get(e);
    if (!a) {
      console.error(`트랙 노드를 찾을 수 없음: ${e}`);
      return;
    }
    const i = a.buffer;
    if (!i) {
      console.error(`트랙의 오디오 버퍼가 없음: ${e}`);
      return;
    }
    console.log(`버퍼 확인 - 길이: ${i.duration.toFixed(2)}초, 채널: ${i.numberOfChannels}, 샘플레이트: ${i.sampleRate}Hz`), t >= i.duration && (console.warn(`시작 시간(${t}초)이 버퍼 길이(${i.duration.toFixed(2)}초)보다 큽니다. 시작 지점을 0으로 재설정합니다.`), t = 0), o === void 0 && (o = i.duration - t, console.log(`명시적 길이가 지정되지 않음, 버퍼 전체 사용: ${o.toFixed(2)}초`));
    const d = i.duration - t;
    if (o > d && (console.warn(`요청된 길이(${o.toFixed(2)}초)가 남은 버퍼 길이(${d.toFixed(2)}초)보다 큽니다. 길이를 조정합니다.`), o = d), a.sourceNode) {
      try {
        a.sourceNode.stop();
      } catch {
      }
      a.sourceNode.disconnect();
    }
    try {
      const m = this.audioContext.createBufferSource();
      m.buffer = i, m.connect(a.gainNode), a.sourceNode = m, m.onended = (y) => {
        console.log(`소스 노드 재생 완료: ${y.type}`), console.log("onended 이벤트 발생:", y), this.isPlaying = !1, this.isPaused = !1, this.pauseTime = 0;
      }, this.audioContext.state === "suspended" ? (console.log("AudioContext suspended 상태, 재개 시도..."), this.audioContext.resume().then(() => {
        console.log("AudioContext 재개 성공, 재생 시작"), this.startSourceNode(m, t, o);
      }).catch((y) => {
        console.error("AudioContext 재개 실패:", y);
      })) : this.startSourceNode(m, t, o);
    } catch (m) {
      console.error("소스 노드 생성 또는 연결 중 오류:", m);
    }
  }
  /**
   * 소스 노드 재생 시작 (내부 메소드)
   */
  startSourceNode(e, t = 0, o) {
    try {
      if (this.audioContext.state === "suspended") {
        console.log("startSourceNode: AudioContext가 suspended 상태입니다. 재개 시도..."), this.audioContext.resume().then(() => {
          this.startSourceNodeInternal(e, t, o);
        }).catch((a) => {
          console.error("AudioContext 재개 실패:", a);
        });
        return;
      }
      this.startSourceNodeInternal(e, t, o);
    } catch (a) {
      console.error("소스 노드 시작 오류:", a);
    }
  }
  /**
   * 실제 소스 노드 재생 시작 (내부 메소드)
   */
  startSourceNodeInternal(e, t = 0, o) {
    try {
      if (!e.buffer) {
        console.error("소스 노드에 AudioBuffer가 없습니다.");
        return;
      }
      t >= e.buffer.duration && (console.warn(`시작 시간(${t}초)이 버퍼 길이(${e.buffer.duration.toFixed(2)}초)보다 큽니다.`), t = 0), o === void 0 && (o = e.buffer.duration - t, console.log(`명시적 길이가 지정되지 않음, 버퍼 전체 사용: ${o.toFixed(2)}초`));
      const a = e.buffer.duration - t;
      o > a && (console.warn(`요청된 길이(${o.toFixed(2)}초)가 남은 버퍼 길이(${a.toFixed(2)}초)보다 큽니다. 길이를 조정합니다.`), o = a), console.log(`소스 노드 시작: 오프셋=${t}초, 길이=${o}초`), e.start(0, t, o), console.log(`트랙 재생 시작: 시작 시간: ${t}초, 길이: ${o}초`);
      const i = new CustomEvent("audio-duration-updated", {
        detail: { duration: e.buffer.duration, currentTime: t }
      });
      window.dispatchEvent(i), this.isPlaying = !0, this.isPaused = !1, this.startTime = this.audioContext.currentTime, this.pauseTime = t;
    } catch (a) {
      console.error("소스 노드 내부 시작 오류:", a);
    }
  }
  /**
   * 모든 트랙 재생
   * @param startTime 시작 시간(초)
   */
  playAllTracks(e = 0) {
    if (console.log(`모든 트랙 재생 요청, 시작 시간: ${e}초, 트랙 수: ${this.trackNodes.size}`), this.trackNodes.size === 0) {
      console.warn("재생할 트랙이 없습니다. 먼저 오디오 파일을 로드하세요.");
      return;
    }
    let t = !1;
    if (this.trackNodes.forEach((o) => {
      o.buffer && (t = !0, console.log(`유효한 버퍼를 가진 트랙 확인: 채널 수: ${o.buffer.numberOfChannels}, 길이: ${o.buffer.duration.toFixed(2)}초`));
    }), !t) {
      console.error("재생할 유효한 오디오 버퍼가 없습니다.");
      return;
    }
    this.audioContext.state === "suspended" ? (console.log("AudioContext suspended 상태, 재개 시도..."), console.warn("오디오 재생을 위해 사용자 상호작용이 필요할 수 있습니다. 화면을 클릭하세요."), this.audioContext.resume().then(() => {
      console.log("AudioContext 재개 성공, 재생 시작"), this.playAllTracksInternal(e);
    }).catch((o) => {
      console.error("AudioContext 재개 실패:", o);
    })) : this.playAllTracksInternal(e);
  }
  /**
   * 내부적으로 모든 트랙 재생 처리
   * @param startTime 시작 시간(초)
   */
  playAllTracksInternal(e = 0) {
    if (console.log(`모든 트랙 재생 시작, 트랙 수: ${this.trackNodes.size}, 시작 시간: ${e}초`), this.isPlaying && (console.log("이미 재생 중이므로 모든 트랙 정지"), this.stopAllTracks()), this.trackNodes.size === 0) {
      console.warn("재생할 트랙이 없습니다.");
      return;
    }
    this.startTime = this.audioContext.currentTime, this.pauseTime = e, this.isPlaying = !0, this.isPaused = !1, console.log(`재생 시작 시간 설정: ${this.startTime}, 시작 오프셋: ${e}초`);
    let t = 0;
    this.trackNodes.forEach((o, a) => {
      try {
        this.playTrack(a, e), t++;
      } catch (i) {
        console.error(`트랙 재생 중 오류 (${a}):`, i);
      }
    }), console.log(`${t}개 트랙 재생 시작됨`);
  }
  /**
   * 트랙 일시 정지
   * @param trackId 트랙 ID
   */
  pauseTrack(e) {
    const t = this.trackNodes.get(e);
    if (!(!t || !t.sourceNode))
      try {
        t.sourceNode.stop(), t.sourceNode.disconnect(), t.sourceNode = void 0, console.log(`트랙 일시 정지: ${e}`);
      } catch (o) {
        console.warn(`트랙 일시 정지 중 오류 (${e}):`, o);
      }
  }
  /**
   * 모든 트랙 재생 일시 정지
   */
  pauseAllTracks() {
    this.pauseTime = this.getCurrentTime(), console.log(`일시 정지 시점: ${this.pauseTime.toFixed(2)}초`), this.trackNodes.forEach((e, t) => {
      this.pauseTrack(t);
    }), this.isPlaying = !1, this.isPaused = !0, console.log("재생 일시 정지 완료");
  }
  /**
   * 트랙 정지
   * @param trackId 트랙 ID
   */
  stopTrack(e) {
    const t = this.trackNodes.get(e);
    if (!(!t || !t.sourceNode)) {
      try {
        t.sourceNode.stop();
      } catch {
        console.warn("소스 노드가 이미 정지되었습니다.");
      }
      this.pauseTime = 0, this.isPlaying = !1;
    }
  }
  /**
   * 모든 트랙 정지
   */
  stopAllTracks() {
    if (!this.isPlaying && !this.isPaused) {
      console.log("이미 정지된 상태입니다.");
      return;
    }
    console.log("모든 트랙 재생 중지");
    let e = 0;
    this.trackNodes.forEach((t, o) => {
      if (t.sourceNode)
        try {
          t.sourceNode.stop(), t.sourceNode.disconnect(), t.sourceNode = void 0, e++;
        } catch (a) {
          console.warn(`트랙 정지 중 오류 (${o}):`, a);
        }
    }), console.log(`${e}개 트랙 정지 완료`), this.isPlaying = !1, this.isPaused = !1, this.pauseTime = 0;
  }
  /**
   * 현재 재생 위치 가져오기
   * @returns 현재 재생 위치(초)
   */
  getCurrentTime() {
    if (this.isPlaying) {
      const e = this.audioContext.currentTime - this.startTime, t = this.pauseTime + e;
      return Math.floor(e * 10) % 30 === 0 && console.log(`현재 시간 계산: ${t.toFixed(2)}초 (경과: ${e.toFixed(2)}초, 오프셋: ${this.pauseTime.toFixed(2)}초)`), t;
    } else
      return this.pauseTime;
  }
  /**
   * 트랙 재생 중인지 확인
   * @returns 재생 중이면 true
   */
  isPlayingTracks() {
    return this.isPlaying;
  }
  /**
   * 재생 중인지 여부 확인
   * @returns 재생 중이면 true, 아니면 false
   */
  getIsPlaying() {
    return this.isPlaying;
  }
  /**
   * 재생 일시 정지
   */
  pausePlayback() {
    if (!this.isPlaying) {
      console.log("재생 중이 아니므로 일시 정지할 수 없습니다.");
      return;
    }
    this.pauseTime = this.getCurrentTime(), console.log(`일시 정지 시점: ${this.pauseTime.toFixed(2)}초`), this.trackNodes.forEach((e, t) => {
      e.sourceNode && this.pauseTrack(t);
    }), this.isPlaying = !1, this.isPaused = !0, console.log("재생 일시 정지 완료");
  }
  /**
   * 일시 정지된 재생 재개
   */
  resumePlayback() {
    if (!this.isPaused) {
      console.log("일시 정지 상태가 아니므로 재개할 수 없습니다.");
      return;
    }
    console.log(`일시 정지된 지점(${this.pauseTime.toFixed(2)}초)부터 재생 재개`), this.playAllTracks(this.pauseTime), this.isPaused = !1;
  }
  /**
   * 트랙 리소스 해제
   * @param trackId 트랙 ID
   */
  releaseTrack(e) {
    const t = this.trackNodes.get(e);
    if (t) {
      if (t.sourceNode) {
        try {
          t.sourceNode.stop();
        } catch {
        }
        t.sourceNode.disconnect();
      }
      t.effectNodes.forEach((o) => {
        o.disconnect();
      }), t.gainNode.disconnect(), t.panNode.disconnect(), t.analyzerNode.disconnect(), this.trackNodes.delete(e);
    }
  }
  /**
   * 모든 트랙 리소스 해제
   */
  releaseAllTracks() {
    this.trackNodes.forEach((e, t) => {
      this.releaseTrack(t);
    });
  }
  /**
   * 오디오 서비스 정리
   */
  dispose() {
    this.releaseAllTracks(), this.masterGainNode.disconnect(), this.audioContext.state !== "closed" && this.audioContext.close(), this.isInitialized = !1;
  }
  /**
   * 트랙의 피크 레벨 데이터 가져오기
   * @param trackId 트랙 ID
   * @returns 피크 레벨 데이터 배열
   */
  getTrackPeakData(e) {
    const t = this.trackNodes.get(e);
    if (!t)
      return null;
    const o = t.analyzerNode, a = new Uint8Array(o.frequencyBinCount);
    return o.getByteFrequencyData(a), a;
  }
  /**
   * 오디오 샘플 내보내기
   * @param trackId 트랙 ID
   * @param startTime 시작 시간(초)
   * @param duration 내보낼 길이(초)
   * @param _format 내보내기 형식 ('wav', 'mp3')
   */
  async exportAudio(e, t = 0, o, a = "wav") {
    const i = this.trackNodes.get(e);
    if (!i || !i.sourceNode || !i.sourceNode.buffer)
      throw new Error("유효한 오디오 트랙이 없습니다.");
    const d = i.sourceNode.buffer, m = d.numberOfChannels, y = d.sampleRate, p = Math.floor(t * y), R = Math.min(Math.floor((t + o) * y), d.length) - p, N = new OfflineAudioContext(
      m,
      R,
      y
    ), $ = N.createBufferSource();
    $.buffer = d, $.connect(N.destination), $.start(0, t);
    const F = await N.startRendering();
    return this.encodeWAV(F);
  }
  /**
   * AudioBuffer를 WAV Blob으로 인코딩
   * @param buffer AudioBuffer
   * @returns WAV Blob
   */
  encodeWAV(e) {
    const t = e.numberOfChannels, o = e.length * t * 2, a = e.sampleRate, i = new ArrayBuffer(44 + o), d = new DataView(i);
    this.writeString(d, 0, "RIFF"), d.setUint32(4, 36 + o, !0), this.writeString(d, 8, "WAVE"), this.writeString(d, 12, "fmt "), d.setUint32(16, 16, !0), d.setUint16(20, 1, !0), d.setUint16(22, t, !0), d.setUint32(24, a, !0), d.setUint32(28, a * t * 2, !0), d.setUint16(32, t * 2, !0), d.setUint16(34, 16, !0), this.writeString(d, 36, "data"), d.setUint32(40, o, !0);
    const m = [];
    let y = 44;
    for (let p = 0; p < t; p++)
      m.push(e.getChannelData(p));
    for (let p = 0; p < e.length; p++)
      for (let x = 0; x < t; x++) {
        const R = Math.max(-1, Math.min(1, m[x][p]));
        d.setInt16(y, R < 0 ? R * 32768 : R * 32767, !0), y += 2;
      }
    return new Blob([d], { type: "audio/wav" });
  }
  /**
   * DataView에 문자열 쓰기
   * @param view DataView
   * @param offset 시작 위치
   * @param string 쓸 문자열
   */
  writeString(e, t, o) {
    for (let a = 0; a < o.length; a++)
      e.setUint8(t + a, o.charCodeAt(a));
  }
}
const Je = {
  tracks: [],
  masterVolume: 1,
  currentTime: 0,
  isPlaying: !1,
  isPaused: !1,
  selectedTrackId: null,
  selectedMarker: null,
  zoom: 1,
  loop: {
    enabled: !1,
    start: 0,
    end: 0
  },
  isRecording: !1,
  sampleRate: 44100,
  duration: 0
}, Ft = (n, e) => {
  switch (e.type) {
    case "ADD_TRACK":
      return {
        ...n,
        tracks: [...n.tracks, e.payload],
        selectedTrackId: e.payload.id,
        // 새 트랙 추가 시 선택
        // 트랙이 추가될 때 전체 재생 시간도 업데이트 해야 함
        duration: Math.max(n.duration, e.payload.duration || 0)
      };
    case "REMOVE_TRACK":
      return {
        ...n,
        tracks: n.tracks.filter((t) => t.id !== e.payload),
        selectedTrackId: n.selectedTrackId === e.payload ? null : n.selectedTrackId
      };
    case "UPDATE_TRACK":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.id ? { ...t, ...e.payload.updates } : t
        ),
        // 트랙 업데이트 시 duration도 업데이트 (오디오 버퍼가 업데이트된 경우)
        duration: e.payload.updates.duration !== void 0 ? Math.max(
          ...n.tracks.filter((t) => t.id !== e.payload.id).map((t) => t.duration || 0),
          e.payload.updates.duration
        ) : n.duration
      };
    case "SET_TRACK_VOLUME":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.id ? { ...t, volume: e.payload.volume } : t
        )
      };
    case "TOGGLE_TRACK_MUTE":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload ? { ...t, muted: !t.muted } : t
        )
      };
    case "TOGGLE_TRACK_SOLO":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload ? { ...t, solo: !t.solo } : t
        )
      };
    case "SELECT_TRACK":
      return {
        ...n,
        selectedTrackId: e.payload,
        tracks: n.tracks.map((t) => ({
          ...t,
          isSelected: t.id === e.payload
        }))
      };
    case "SET_MASTER_VOLUME":
      return {
        ...n,
        masterVolume: e.payload
      };
    case "SET_CURRENT_TIME":
      return {
        ...n,
        currentTime: e.payload
      };
    case "PLAY":
      return {
        ...n,
        isPlaying: !0,
        isPaused: !1
      };
    case "STOP":
      return {
        ...n,
        isPlaying: !1,
        isPaused: !1
      };
    case "PAUSE":
      return {
        ...n,
        isPlaying: !1,
        isPaused: !0
      };
    case "SET_LOOP":
      return {
        ...n,
        loop: {
          enabled: e.payload.enabled,
          start: e.payload.start ?? n.loop.start,
          end: e.payload.end ?? n.loop.end
        },
        // 루프 끝 시간이 총 오디오 길이보다 길면 duration도 업데이트
        duration: (e.payload.end ?? 0) > n.duration ? e.payload.end ?? n.duration : n.duration
      };
    case "SET_DURATION":
      return {
        ...n,
        duration: e.payload
      };
    case "ADD_EFFECT":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.trackId ? {
            ...t,
            effects: [...t.effects, e.payload.effect]
          } : t
        )
      };
    case "REMOVE_EFFECT":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.trackId ? {
            ...t,
            effects: t.effects.filter((o) => o.id !== e.payload.effectId)
          } : t
        )
      };
    case "UPDATE_EFFECT":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.trackId ? {
            ...t,
            effects: t.effects.map(
              (o) => o.id === e.payload.effectId ? { ...o, ...e.payload.updates } : o
            )
          } : t
        )
      };
    case "ADD_MARKER":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.trackId ? {
            ...t,
            markers: [...t.markers, e.payload.marker]
          } : t
        )
      };
    case "REMOVE_MARKER":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.trackId ? {
            ...t,
            markers: t.markers.filter((o) => o.id !== e.payload.markerId)
          } : t
        )
      };
    case "UPDATE_MARKER":
      return {
        ...n,
        tracks: n.tracks.map(
          (t) => t.id === e.payload.trackId ? {
            ...t,
            markers: t.markers.map(
              (o) => o.id === e.payload.markerId ? { ...o, ...e.payload.updates } : o
            )
          } : t
        )
      };
    default:
      return n;
  }
}, Xe = Rt({
  state: Je,
  dispatch: () => null,
  addTrack: async () => "",
  removeTrack: () => {
  },
  updateTrack: () => {
  },
  setTrackVolume: () => {
  },
  toggleTrackMute: () => {
  },
  toggleTrackSolo: () => {
  },
  setMasterVolume: () => {
  },
  addEffect: () => {
  },
  removeEffect: () => {
  },
  updateEffect: () => {
  },
  addMarker: () => {
  },
  removeMarker: () => {
  },
  updateMarker: () => {
  },
  setLoop: () => {
  },
  setCurrentTime: () => {
  },
  play: () => {
  },
  pause: () => {
  },
  stop: () => {
  },
  setSelectedTrack: () => {
  },
  loadAudioFile: async () => "",
  exportAudio: async () => new Blob()
}), Dt = ({ children: n }) => {
  const [e, t] = St(Ft, Je), o = ge(null), a = ge(null);
  Qe(() => {
    console.log("AudioEditorContext: AudioService 초기화 시작...");
    try {
      o.current && (console.log("기존 AudioService 인스턴스 정리..."), a.current && (clearInterval(a.current), a.current = null)), o.current = new Vt(), o.current.initialize();
      const u = () => {
        o.current && o.current.audioContext.state === "suspended" && (console.log("사용자 상호작용 감지, AudioContext 재개 시도..."), o.current.audioContext.resume().then(() => {
          console.log("AudioContext 재개 성공");
        }).catch((h) => {
          console.error("AudioContext 재개 실패:", h);
        }));
      }, f = ["click", "touchstart", "keydown"];
      return f.forEach((h) => {
        document.addEventListener(h, u, { once: !0 });
      }), console.log("AudioService 초기화 완료"), () => {
        if (console.log("AudioEditorContext 언마운트: 리소스 정리..."), f.forEach((h) => {
          document.removeEventListener(h, u);
        }), a.current && (clearInterval(a.current), a.current = null), o.current) {
          try {
            o.current.getIsPlaying() && o.current.stopAllTracks(), o.current.audioContext.close().then(() => {
              console.log("AudioContext 닫기 성공");
            }).catch((h) => {
              console.error("AudioContext 닫기 실패:", h);
            });
          } catch (h) {
            console.error("AudioService 정리 중 오류:", h);
          }
          o.current = null;
        }
      };
    } catch (u) {
      console.error("AudioService 초기화 중 오류 발생:", u);
    }
  }, []);
  const i = P(() => o.current, []), d = P(async (u) => {
    const f = i();
    if (!f)
      return "";
    try {
      const h = u.id || Ke();
      return console.log(`트랙 추가: ${h}, 이름: ${u.name}`), f.setupTrack(u), t({ type: "ADD_TRACK", payload: u }), h;
    } catch (h) {
      return console.error("트랙 추가 중 오류:", h), "";
    }
  }, [i]), m = P((u) => {
    const f = i();
    f && (f.releaseTrack(u), t({ type: "REMOVE_TRACK", payload: u }));
  }, [i]), y = P((u, f) => {
    const h = i();
    h && (f.volume !== void 0 && h.setTrackVolume(u, f.volume), f.pan !== void 0 && h.setTrackPan(u, f.pan), f.audioBuffer && h.setTrackAudioBuffer(u, f.audioBuffer), t({
      type: "UPDATE_TRACK",
      payload: { id: u, updates: f }
    }));
  }, [i]), p = P((u, f) => {
    const h = i();
    h && (h.setTrackVolume(u, f), t({
      type: "SET_TRACK_VOLUME",
      payload: { id: u, volume: f }
    }));
  }, [i]), x = P((u) => {
    const f = e.tracks.find((_) => _.id === u);
    if (!f)
      return;
    const h = i();
    h && (h.setTrackVolume(u, f.muted ? f.volume : 0), t({ type: "TOGGLE_TRACK_MUTE", payload: u }));
  }, [e.tracks, i]), R = P((u) => {
    const f = i();
    f && (t({ type: "TOGGLE_TRACK_SOLO", payload: u }), setTimeout(() => {
      e.tracks.forEach((h) => {
        const L = e.tracks.filter((q) => q.solo).length === 0 ? !h.muted : h.solo;
        f.setTrackVolume(
          h.id,
          L ? h.volume : 0
        );
      });
    }, 0));
  }, [e.tracks, i]), N = P((u) => {
    const f = i();
    f && (f.setMasterVolume(u), t({ type: "SET_MASTER_VOLUME", payload: u }));
  }, [i]), $ = P((u, f) => {
    const h = i();
    h && (h.applyEffect(u, f), t({
      type: "ADD_EFFECT",
      payload: { trackId: u, effect: f }
    }));
  }, [i]), F = P((u, f) => {
    t({
      type: "REMOVE_EFFECT",
      payload: { trackId: u, effectId: f }
    });
  }, []), w = P((u, f, h) => {
    t({
      type: "UPDATE_EFFECT",
      payload: { trackId: u, effectId: f, updates: h }
    });
  }, []), g = P((u, f) => {
    t({
      type: "ADD_MARKER",
      payload: { trackId: u, marker: f }
    });
  }, []), v = P((u, f) => {
    t({
      type: "REMOVE_MARKER",
      payload: { trackId: u, markerId: f }
    });
  }, []), C = P((u, f, h) => {
    t({
      type: "UPDATE_MARKER",
      payload: { trackId: u, markerId: f, updates: h }
    });
  }, []), B = P(async (u, f) => {
    const h = i();
    if (!h)
      return "";
    try {
      console.log(`파일 로드 시작: ${u}, 이름: ${f}`);
      let _;
      if (u.match(/^([A-Za-z]:\\|\/)/))
        if (console.log("로컬 파일 경로가 감지되었습니다."), typeof window < "u" && window.electron) {
          console.log("Electron 환경 감지됨, 로컬 파일 로드 중...");
          try {
            const W = (await window.electron.fs.readFile(u)).buffer;
            console.log(`파일 읽기 완료, 크기: ${W.byteLength} 바이트, 디코딩 시작...`), _ = await h.decodeAudioData(W);
          } catch (D) {
            throw console.error("Electron 파일 로드 오류:", D), new Error(`로컬 파일 접근 오류: ${D instanceof Error ? D.message : String(D)}`);
          }
        } else {
          console.log("브라우저 환경에서 로컬 파일 접근 시도. 파일 선택기 표시...");
          const D = document.createElement("input");
          D.type = "file", D.accept = "audio/*";
          const ee = new Promise((le, ce) => {
            D.onchange = (be) => {
              const Y = be.target.files;
              Y && Y.length > 0 ? le(Y[0]) : ce(new Error("파일을 선택하지 않았습니다."));
            }, setTimeout(() => {
              (!D.files || D.files.length === 0) && ce(new Error("파일 선택 시간이 초과되었습니다."));
            }, 3e4);
          });
          D.click(), console.log("파일 선택 대기 중...");
          const W = await ee;
          console.log(`파일 선택됨: ${W.name}, 크기: ${W.size} 바이트`), f || (f = W.name);
          const te = await W.arrayBuffer();
          console.log(`파일 읽기 완료, 크기: ${te.byteLength} 바이트, 디코딩 시작...`), _ = await h.decodeAudioData(te);
        }
      else
        console.log("URL에서 오디오 파일 로드 중..."), _ = await h.loadAudioFile(u);
      console.log(`오디오 버퍼 생성 완료 - 길이: ${_.duration.toFixed(2)}초, 채널: ${_.numberOfChannels}`);
      const L = Ke();
      console.log(`새 트랙 생성: ${L}`), console.log("파형 데이터 생성 중...");
      const q = h.generateWaveformData(_, 2e3), Z = {
        id: L,
        name: f || "New Track",
        audioBuffer: _,
        waveformData: q,
        volume: 1,
        pan: 0,
        muted: !1,
        solo: !1,
        gain: 1,
        startTime: 0,
        duration: _.duration,
        effects: [],
        markers: [],
        isSelected: !1
      };
      return console.log("트랙 설정 중..."), h.setupTrack(Z), console.log("상태 업데이트 중..."), t({ type: "ADD_TRACK", payload: Z }), (e.loop.end === 0 || e.loop.end < _.duration) && t({
        type: "SET_LOOP",
        payload: {
          enabled: e.loop.enabled,
          start: e.loop.start,
          end: _.duration
        }
      }), console.log(`트랙 로드 완료: ${L}, 이름: ${f}, 길이: ${_.duration.toFixed(2)}초`), L;
    } catch (_) {
      return console.error("오디오 파일 로드 중 오류 발생:", _), "";
    }
  }, [i, t, e.loop]), H = P(() => {
    const u = i();
    if (!u || e.isPlaying) {
      console.error("AudioService가 초기화되지 않았습니다.");
      return;
    }
    if (console.log("재생 시작 시도...", e.tracks.length, "개의 트랙 존재"), e.isPaused) {
      console.log("일시정지 상태에서 재개합니다."), u.resumePlayback(), t({ type: "PLAY" });
      return;
    }
    console.log(`${e.currentTime}초 지점부터 재생합니다.`), u.audioContext.state === "suspended" ? (console.log("AudioContext가 suspended 상태입니다. resume 시도..."), u.audioContext.resume().then(() => {
      console.log("AudioContext resumed"), Q();
    }).catch((f) => {
      console.error("AudioContext resume 실패:", f);
    })) : Q();
  }, [e.isPaused, e.currentTime, e.tracks.length, i, t]), Q = P(() => {
    const u = i();
    if (!u) {
      console.error("startPlayback: AudioService가 초기화되지 않았습니다.");
      return;
    }
    console.log("재생 시작 전 상태:", {
      트랙수: e.tracks.length,
      현재시간: e.currentTime,
      재생중: e.isPlaying,
      일시정지: e.isPaused
    }), t({ type: "PLAY" }), u.playAllTracks(e.currentTime), a.current && clearInterval(a.current), a.current = window.setInterval(() => {
      const f = i();
      if (f && f.getIsPlaying())
        try {
          const h = f.getCurrentTime();
          Math.abs(h - e.currentTime) > 0.1 && console.log(`시간 업데이트: ${e.currentTime.toFixed(2)}초 -> ${h.toFixed(2)}초`), h % 1 < 0.05 && console.log(`재생 중: ${h.toFixed(2)}초, 전체 길이: ${e.duration.toFixed(2)}초`), t({ type: "SET_CURRENT_TIME", payload: h }), e.loop.enabled && h >= e.loop.end && (f.playAllTracks(e.loop.start), t({ type: "SET_CURRENT_TIME", payload: e.loop.start })), h >= e.duration - 0.1 && e.duration > 0 && (console.log(`재생 종료 지점 도달: ${h.toFixed(2)}초 >= ${(e.duration - 0.1).toFixed(2)}초`), a.current && (clearInterval(a.current), a.current = null), f.stopAllTracks(), t({ type: "STOP" }));
        } catch (h) {
          console.error("시간 업데이트 중 오류:", h);
        }
    }, 30);
  }, [e.currentTime, e.loop, e.duration, e.tracks.length, e.isPlaying, e.isPaused, i, t]), z = P(() => {
    const u = i();
    !u || !e.isPlaying || (u.pausePlayback(), a.current && (clearInterval(a.current), a.current = null), t({ type: "PAUSE" }));
  }, [e.isPlaying, i]), me = P(() => {
    const u = i();
    u && (u.stopAllTracks(), a.current && (clearInterval(a.current), a.current = null), t({ type: "SET_CURRENT_TIME", payload: 0 }), t({ type: "STOP" }));
  }, [i]), xe = P((u) => {
    t({ type: "SELECT_TRACK", payload: u });
  }, []), ie = P((u, f, h) => {
    t({
      type: "SET_LOOP",
      payload: { enabled: u, start: f, end: h }
    });
  }, []), ye = P((u) => {
    t({ type: "SET_CURRENT_TIME", payload: u });
  }, []), ve = P(async (u, f, h, _) => {
    const L = i();
    if (!L)
      throw new Error("오디오 서비스가 초기화되지 않았습니다.");
    try {
      return await L.exportAudio(u, f, h, _);
    } catch (q) {
      throw console.error("오디오 내보내기 중 오류:", q), q;
    }
  }, [i]);
  return /* @__PURE__ */ s.jsx(
    Xe.Provider,
    {
      value: {
        state: e,
        dispatch: t,
        addTrack: d,
        removeTrack: m,
        updateTrack: y,
        setTrackVolume: p,
        toggleTrackMute: x,
        toggleTrackSolo: R,
        setMasterVolume: N,
        addEffect: $,
        removeEffect: F,
        updateEffect: w,
        addMarker: g,
        removeMarker: v,
        updateMarker: C,
        setLoop: ie,
        setCurrentTime: ye,
        play: H,
        pause: z,
        stop: me,
        setSelectedTrack: xe,
        loadAudioFile: B,
        exportAudio: ve
      },
      children: n
    }
  );
}, se = () => {
  const n = At(Xe);
  if (n === void 0)
    throw new Error("useAudioEditor must be used within an AudioEditorProvider");
  return n;
}, It = ({ track: n }) => {
  const e = ge(null), {
    setSelectedTrack: t,
    setTrackVolume: o,
    toggleTrackMute: a,
    toggleTrackSolo: i,
    removeTrack: d
  } = se();
  Qe(() => {
    if (!e.current || !n.waveformData)
      return;
    const p = e.current, x = p.getContext("2d");
    if (!x)
      return;
    x.clearRect(0, 0, p.width, p.height);
    const R = n.waveformData, N = R.length, $ = p.width / N, F = p.height;
    x.fillStyle = n.isSelected ? "#4f9df3" : "#3a7abd", x.strokeStyle = n.isSelected ? "#7fb5f5" : "#5a8fd3", x.lineWidth = 1;
    for (let w = 0; w < N; w++) {
      const g = w * $, v = R[w] * F, C = (F - v) / 2;
      x.fillRect(g, C, $, v), x.strokeRect(g, C, $, v);
    }
    n.markers && n.markers.length > 0 && n.markers.forEach((w) => {
      const g = w.time / n.duration * p.width;
      x.beginPath(), x.moveTo(g, 0), x.lineTo(g, p.height), x.strokeStyle = w.color, x.lineWidth = 2, x.stroke(), x.fillStyle = w.color, x.font = "10px Arial", x.fillText(w.name, g + 2, 10);
    });
  }, [n]);
  const m = (p) => {
    const x = parseFloat(p.target.value);
    o(n.id, x);
  }, y = () => {
    t(n.id);
  };
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-track ${n.isSelected ? "selected" : ""}`,
      onClick: y,
      style: {
        padding: "10px",
        marginBottom: "10px",
        border: `1px solid ${n.isSelected ? "#4f9df3" : "#ccc"}`,
        borderRadius: "4px",
        backgroundColor: n.isSelected ? "#f0f7ff" : "#f9f9f9",
        position: "relative"
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "track-header", style: { display: "flex", justifyContent: "space-between", marginBottom: "10px" }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-name", style: { fontWeight: "bold" }, children: n.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "track-controls", style: { display: "flex", gap: "10px" }, children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                onClick: (p) => {
                  p.stopPropagation(), a(n.id);
                },
                style: {
                  backgroundColor: n.muted ? "#ff6b6b" : "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer"
                },
                children: n.muted ? "음소거 해제" : "음소거"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                onClick: (p) => {
                  p.stopPropagation(), i(n.id);
                },
                style: {
                  backgroundColor: n.solo ? "#ffd43b" : "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer"
                },
                children: n.solo ? "솔로 해제" : "솔로"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                onClick: (p) => {
                  p.stopPropagation(), d(n.id);
                },
                style: {
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer"
                },
                children: "제거"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "track-waveform", style: { position: "relative", marginBottom: "10px" }, children: /* @__PURE__ */ s.jsx(
          "canvas",
          {
            ref: e,
            width: 800,
            height: 100,
            style: { width: "100%", height: "100px" }
          }
        ) }),
        /* @__PURE__ */ s.jsxs("div", { className: "track-volume", style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
          /* @__PURE__ */ s.jsx("span", { children: "볼륨:" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.01",
              value: n.volume,
              onChange: m,
              onClick: (p) => p.stopPropagation(),
              style: { flex: 1 }
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { children: [
            Math.round(n.volume * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "track-info", style: { marginTop: "10px", fontSize: "0.9em", color: "#666" }, children: [
          /* @__PURE__ */ s.jsxs("span", { children: [
            "시작: ",
            n.startTime.toFixed(2),
            "초"
          ] }),
          /* @__PURE__ */ s.jsxs("span", { style: { marginLeft: "10px" }, children: [
            "길이: ",
            n.duration.toFixed(2),
            "초"
          ] }),
          n.effects.length > 0 && /* @__PURE__ */ s.jsxs("span", { style: { marginLeft: "10px" }, children: [
            "효과: ",
            n.effects.length,
            "개"
          ] })
        ] })
      ]
    }
  );
}, Mt = () => {
  const { state: n } = se();
  return /* @__PURE__ */ s.jsxs("div", { className: "track-list", style: { padding: "10px" }, children: [
    /* @__PURE__ */ s.jsxs("h3", { style: { marginBottom: "15px" }, children: [
      "오디오 트랙 (",
      n.tracks.length,
      ")"
    ] }),
    n.tracks.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-state", style: {
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "4px",
      color: "#6c757d"
    }, children: "오디오 파일을 불러와 트랙을 추가해주세요." }) : /* @__PURE__ */ s.jsx("div", { className: "tracks", children: n.tracks.map((e) => /* @__PURE__ */ s.jsx(It, { track: e }, e.id)) })
  ] });
}, Bt = () => {
  const {
    state: n,
    addEffect: e,
    removeEffect: t,
    updateEffect: o
  } = se(), [a, i] = Ne(S.GAIN), { selectedTrackId: d } = n, m = d ? n.tracks.find((g) => g.id === d) : null, y = () => {
    if (!d)
      return;
    const g = [];
    switch (a) {
      case S.GAIN:
        g.push({
          id: "gain",
          name: "게인",
          value: 1,
          minValue: 0,
          maxValue: 2,
          defaultValue: 1,
          step: 0.01,
          unit: "x"
        });
        break;
      case S.EQ:
        g.push(
          {
            id: "type",
            name: "필터 유형",
            value: 0,
            // peaking을 의미
            minValue: 0,
            maxValue: 7,
            // 8가지 필터 유형
            defaultValue: 0,
            step: 1
          },
          {
            id: "frequency",
            name: "주파수",
            value: 1e3,
            minValue: 20,
            maxValue: 2e4,
            defaultValue: 1e3,
            step: 1,
            unit: "Hz"
          },
          {
            id: "gain",
            name: "게인",
            value: 0,
            minValue: -15,
            maxValue: 15,
            defaultValue: 0,
            step: 0.1,
            unit: "dB"
          },
          {
            id: "q",
            name: "Q 값",
            value: 1,
            minValue: 0.1,
            maxValue: 10,
            defaultValue: 1,
            step: 0.1
          }
        );
        break;
      case S.COMPRESSOR:
        g.push(
          {
            id: "threshold",
            name: "기준치",
            value: -24,
            minValue: -60,
            maxValue: 0,
            defaultValue: -24,
            step: 1,
            unit: "dB"
          },
          {
            id: "ratio",
            name: "비율",
            value: 4,
            minValue: 1,
            maxValue: 20,
            defaultValue: 4,
            step: 0.5
          },
          {
            id: "attack",
            name: "어택",
            value: 3e-3,
            minValue: 0,
            maxValue: 1,
            defaultValue: 3e-3,
            step: 1e-3,
            unit: "s"
          },
          {
            id: "release",
            name: "릴리즈",
            value: 0.25,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.25,
            step: 0.01,
            unit: "s"
          },
          {
            id: "knee",
            name: "니",
            value: 30,
            minValue: 0,
            maxValue: 40,
            defaultValue: 30,
            step: 1,
            unit: "dB"
          }
        );
        break;
      case S.REVERB:
        g.push(
          {
            id: "decay",
            name: "감쇠",
            value: 2,
            minValue: 0.1,
            maxValue: 10,
            defaultValue: 2,
            step: 0.1,
            unit: "s"
          },
          {
            id: "wet",
            name: "웻",
            value: 0.3,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.3,
            step: 0.01
          },
          {
            id: "dry",
            name: "드라이",
            value: 0.7,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.7,
            step: 0.01
          }
        );
        break;
      case S.DELAY:
        g.push(
          {
            id: "time",
            name: "시간",
            value: 0.3,
            minValue: 0,
            maxValue: 5,
            defaultValue: 0.3,
            step: 0.01,
            unit: "s"
          },
          {
            id: "feedback",
            name: "피드백",
            value: 0.5,
            minValue: 0,
            maxValue: 0.95,
            defaultValue: 0.5,
            step: 0.01
          },
          {
            id: "mix",
            name: "믹스",
            value: 0.5,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.5,
            step: 0.01
          }
        );
        break;
      case S.PITCH_SHIFT:
        g.push(
          {
            id: "pitch",
            name: "피치",
            value: 0,
            minValue: -12,
            maxValue: 12,
            defaultValue: 0,
            step: 1,
            unit: "반음"
          },
          {
            id: "mix",
            name: "믹스",
            value: 1,
            minValue: 0,
            maxValue: 1,
            defaultValue: 1,
            step: 0.01
          }
        );
        break;
    }
    const v = {
      id: `effect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: p(a),
      type: a,
      enabled: !0,
      parameters: g
    };
    e(d, v);
  }, p = (g) => {
    switch (g) {
      case S.GAIN:
        return "게인";
      case S.EQ:
        return "이퀄라이저";
      case S.COMPRESSOR:
        return "컴프레서";
      case S.REVERB:
        return "리버브";
      case S.DELAY:
        return "딜레이";
      case S.NOISE_REDUCTION:
        return "노이즈 제거";
      case S.FADE:
        return "페이드";
      case S.LIMITER:
        return "리미터";
      case S.PITCH_SHIFT:
        return "피치 시프트";
      case S.TIME_STRETCH:
        return "타임 스트레치";
      default:
        return "알 수 없음";
    }
  }, x = (g, v, C) => {
    if (!d)
      return;
    const B = n.tracks.find((z) => z.id === d);
    if (!B)
      return;
    const H = B.effects.find((z) => z.id === g);
    if (!H)
      return;
    const Q = H.parameters.map(
      (z) => z.id === v ? { ...z, value: C } : z
    );
    o(d, g, { parameters: Q });
  }, R = (g) => {
    if (!d)
      return;
    const v = n.tracks.find((B) => B.id === d);
    if (!v)
      return;
    const C = v.effects.find((B) => B.id === g);
    C && o(d, g, { enabled: !C.enabled });
  }, N = (g) => {
    d && t(d, g);
  }, $ = (g) => [
    "peaking",
    "lowpass",
    "highpass",
    "bandpass",
    "lowshelf",
    "highshelf",
    "notch",
    "allpass"
  ][g] || "peaking", F = (g, v) => {
    if (v.id === "type") {
      const C = $(v.value);
      return /* @__PURE__ */ s.jsxs("div", { style: { marginBottom: "10px" }, children: [
        /* @__PURE__ */ s.jsx("label", { style: { display: "block", marginBottom: "5px" }, children: v.name }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            value: v.value,
            onChange: (B) => x(
              g.id,
              v.id,
              parseInt(B.target.value)
            ),
            style: {
              width: "100%",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ced4da"
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: 0, children: "피킹 (Peaking)" }),
              /* @__PURE__ */ s.jsx("option", { value: 1, children: "로우패스 (Lowpass)" }),
              /* @__PURE__ */ s.jsx("option", { value: 2, children: "하이패스 (Highpass)" }),
              /* @__PURE__ */ s.jsx("option", { value: 3, children: "밴드패스 (Bandpass)" }),
              /* @__PURE__ */ s.jsx("option", { value: 4, children: "로우쉘프 (Lowshelf)" }),
              /* @__PURE__ */ s.jsx("option", { value: 5, children: "하이쉘프 (Highshelf)" }),
              /* @__PURE__ */ s.jsx("option", { value: 6, children: "노치 (Notch)" }),
              /* @__PURE__ */ s.jsx("option", { value: 7, children: "올패스 (Allpass)" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs("div", { style: { fontSize: "0.8em", color: "#6c757d", marginTop: "3px" }, children: [
          "현재: ",
          C
        ] })
      ] }, v.id);
    }
    return w(g, v);
  }, w = (g, v) => /* @__PURE__ */ s.jsxs("div", { style: { marginBottom: "10px" }, children: [
    /* @__PURE__ */ s.jsxs("label", { style: { display: "block", marginBottom: "5px" }, children: [
      v.name,
      " ",
      v.unit ? `(${v.unit})` : ""
    ] }),
    /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
      /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "range",
          min: v.minValue,
          max: v.maxValue,
          step: v.step,
          value: v.value,
          onChange: (C) => x(
            g.id,
            v.id,
            parseFloat(C.target.value)
          ),
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "number",
          min: v.minValue,
          max: v.maxValue,
          step: v.step,
          value: v.value,
          onChange: (C) => x(
            g.id,
            v.id,
            parseFloat(C.target.value)
          ),
          style: {
            width: "70px",
            padding: "3px",
            textAlign: "right",
            borderRadius: "4px",
            border: "1px solid #ced4da"
          }
        }
      )
    ] })
  ] }, v.id);
  return /* @__PURE__ */ s.jsxs("div", { className: "effects-panel", style: { padding: "10px" }, children: [
    /* @__PURE__ */ s.jsx("h3", { style: { marginBottom: "15px" }, children: "효과 패널" }),
    m ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("div", { className: "add-effect-section", style: { marginBottom: "20px" }, children: /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", gap: "10px", marginBottom: "10px" }, children: [
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            value: a,
            onChange: (g) => i(g.target.value),
            style: {
              flex: 1,
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ced4da"
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: S.GAIN, children: "게인" }),
              /* @__PURE__ */ s.jsx("option", { value: S.EQ, children: "이퀄라이저" }),
              /* @__PURE__ */ s.jsx("option", { value: S.COMPRESSOR, children: "컴프레서" }),
              /* @__PURE__ */ s.jsx("option", { value: S.REVERB, children: "리버브" }),
              /* @__PURE__ */ s.jsx("option", { value: S.DELAY, children: "딜레이" }),
              /* @__PURE__ */ s.jsx("option", { value: S.PITCH_SHIFT, children: "피치 시프트" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            onClick: y,
            style: {
              padding: "8px 15px",
              backgroundColor: "#4f9df3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            },
            children: "효과 추가"
          }
        )
      ] }) }),
      /* @__PURE__ */ s.jsx("div", { className: "effects-list", children: m.effects.length === 0 ? /* @__PURE__ */ s.jsx("div", { style: {
        padding: "15px",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        borderRadius: "4px",
        color: "#6c757d"
      }, children: "효과가 없습니다. 위 드롭다운에서 효과를 선택하고 추가해 보세요." }) : m.effects.map((g) => /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "effect-item",
          style: {
            marginBottom: "20px",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            backgroundColor: g.enabled ? "#ffffff" : "#f8f9fa"
          },
          children: [
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: "effect-header",
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #dee2e6",
                  backgroundColor: g.enabled ? "#e9f5ff" : "#f1f3f5"
                },
                children: [
                  /* @__PURE__ */ s.jsx("div", { style: { fontWeight: "bold" }, children: g.name }),
                  /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        onClick: () => R(g.id),
                        style: {
                          padding: "4px 8px",
                          backgroundColor: g.enabled ? "#4f9df3" : "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.9em"
                        },
                        children: g.enabled ? "활성화됨" : "비활성화됨"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        onClick: () => N(g.id),
                        style: {
                          padding: "4px 8px",
                          backgroundColor: "#ff6b6b",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.9em"
                        },
                        children: "제거"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ s.jsx(
              "div",
              {
                className: "effect-body",
                style: {
                  padding: "15px",
                  opacity: g.enabled ? 1 : 0.7
                },
                children: g.parameters.map((v) => g.type === S.EQ ? F(g, v) : w(g, v))
              }
            )
          ]
        },
        g.id
      )) })
    ] }) : /* @__PURE__ */ s.jsx("div", { style: {
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "4px",
      color: "#6c757d"
    }, children: "효과를 적용할 트랙을 먼저 선택해주세요." })
  ] });
}, Lt = () => {
  const {
    state: n,
    play: e,
    pause: t,
    stop: o,
    setCurrentTime: a,
    setLoop: i
  } = se(), { isPlaying: d, currentTime: m, duration: y, loop: p } = n, x = (w) => {
    if (isNaN(w) || w < 0)
      return console.warn("유효하지 않은 시간 값:", w), "00:00.00";
    const g = Math.floor(w / 60), v = Math.floor(w % 60), C = Math.floor(w % 1 * 100);
    return w > 0 && w % 5 < 0.03 && console.log(`시간 포맷: ${w} -> ${g}:${v}.${C}`), `${g.toString().padStart(2, "0")}:${v.toString().padStart(2, "0")}.${C.toString().padStart(2, "0")}`;
  }, R = (w) => {
    const g = parseFloat(w.target.value);
    a(g);
  }, N = () => {
    i(!p.enabled, p.start, p.end);
  }, $ = () => {
    i(!0, m, p.end);
  }, F = () => {
    i(!0, p.start, m);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "transport-controls", style: {
    padding: "15px",
    backgroundColor: "#f1f3f5",
    borderRadius: "6px",
    margin: "10px 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  }, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "playback-controls", style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "15px",
      gap: "15px"
    }, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          onClick: o,
          style: {
            backgroundColor: "#343a40",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          },
          title: "정지",
          children: /* @__PURE__ */ s.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ s.jsx("rect", { width: "12", height: "12", x: "2", y: "2" }) })
        }
      ),
      d ? /* @__PURE__ */ s.jsx(
        "button",
        {
          onClick: t,
          style: {
            backgroundColor: "#495057",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          },
          title: "일시정지",
          children: /* @__PURE__ */ s.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 16 16", fill: "currentColor", children: [
            /* @__PURE__ */ s.jsx("rect", { width: "4", height: "14", x: "3", y: "1" }),
            /* @__PURE__ */ s.jsx("rect", { width: "4", height: "14", x: "9", y: "1" })
          ] })
        }
      ) : /* @__PURE__ */ s.jsx(
        "button",
        {
          onClick: e,
          style: {
            backgroundColor: "#4f9df3",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          },
          title: "재생",
          children: /* @__PURE__ */ s.jsx("svg", { width: "20", height: "20", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "2,1 14,8 2,15" }) })
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "time-controls", style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
      /* @__PURE__ */ s.jsx("span", { style: { minWidth: "70px", fontFamily: "monospace" }, children: x(m) }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: y || 100,
          step: "0.01",
          value: m,
          onChange: R,
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ s.jsx("span", { style: { minWidth: "70px", fontFamily: "monospace", textAlign: "right" }, children: x(y) })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "loop-controls", style: {
      display: "flex",
      justifyContent: "center",
      marginTop: "15px",
      gap: "10px"
    }, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          onClick: N,
          style: {
            backgroundColor: p.enabled ? "#4f9df3" : "#f8f9fa",
            color: p.enabled ? "white" : "#495057",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "0.9em"
          },
          children: p.enabled ? "루프 켜짐" : "루프 꺼짐"
        }
      ),
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          onClick: $,
          disabled: !p.enabled,
          style: {
            backgroundColor: p.enabled ? "#e9ecef" : "#f8f9fa",
            color: p.enabled ? "#495057" : "#adb5bd",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: p.enabled ? "pointer" : "not-allowed",
            fontSize: "0.9em"
          },
          children: [
            "시작: ",
            x(p.start)
          ]
        }
      ),
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          onClick: F,
          disabled: !p.enabled,
          style: {
            backgroundColor: p.enabled ? "#e9ecef" : "#f8f9fa",
            color: p.enabled ? "#495057" : "#adb5bd",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: p.enabled ? "pointer" : "not-allowed",
            fontSize: "0.9em"
          },
          children: [
            "끝: ",
            x(p.end)
          ]
        }
      )
    ] })
  ] });
}, Ut = () => {
  const { loadAudioFile: n } = se(), e = ge(null), [t, o] = Ne(!1), [a, i] = Ne(null), d = async (y) => {
    const p = y.target.files;
    if (!p || p.length === 0)
      return;
    const x = p[0];
    if (!x.type.startsWith("audio/")) {
      i("오디오 파일만 업로드할 수 있습니다.");
      return;
    }
    o(!0), i(null);
    try {
      const R = new FileReader();
      R.onload = async (N) => {
        if (N.target && N.target.result) {
          const $ = N.target.result, F = new Blob([$], { type: x.type }), w = URL.createObjectURL(F);
          try {
            await n(w, x.name), o(!1), e.current && (e.current.value = "");
          } catch (g) {
            console.error("오디오 파일 로드 실패:", g), i("오디오 파일을 로드하는 중 오류가 발생했습니다."), o(!1);
          }
        }
      }, R.onerror = () => {
        i("파일을 읽는 중 오류가 발생했습니다."), o(!1);
      }, R.readAsArrayBuffer(x);
    } catch (R) {
      console.error("파일 처리 중 오류:", R), i("파일 처리 중 오류가 발생했습니다."), o(!1);
    }
  }, m = () => {
    e.current && e.current.click();
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "audio-file-uploader", style: {
    padding: "15px",
    border: "2px dashed #dee2e6",
    borderRadius: "6px",
    textAlign: "center",
    backgroundColor: "#f8f9fa"
  }, children: [
    /* @__PURE__ */ s.jsx(
      "input",
      {
        type: "file",
        ref: e,
        onChange: d,
        accept: "audio/*",
        style: { display: "none" }
      }
    ),
    /* @__PURE__ */ s.jsx(
      "button",
      {
        onClick: m,
        disabled: t,
        style: {
          padding: "10px 20px",
          backgroundColor: t ? "#adb5bd" : "#4f9df3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: t ? "not-allowed" : "pointer",
          fontSize: "1em",
          display: "block",
          margin: "0 auto 15px"
        },
        children: t ? "로딩 중..." : "오디오 파일 선택"
      }
    ),
    /* @__PURE__ */ s.jsx("div", { style: { fontSize: "0.9em", color: "#6c757d" }, children: "WAV, MP3, FLAC, AAC 등의 오디오 파일을 업로드할 수 있습니다." }),
    a && /* @__PURE__ */ s.jsx("div", { style: {
      marginTop: "10px",
      color: "#e03131",
      padding: "8px",
      backgroundColor: "#fff5f5",
      borderRadius: "4px"
    }, children: a })
  ] });
}, Gt = () => /* @__PURE__ */ s.jsx(Dt, { children: /* @__PURE__ */ s.jsxs("div", { className: "audio-editor-container", style: {
  fontFamily: "Arial, sans-serif",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px"
}, children: [
  /* @__PURE__ */ s.jsxs("div", { className: "header", style: {
    marginBottom: "20px",
    borderBottom: "1px solid #dee2e6",
    paddingBottom: "20px"
  }, children: [
    /* @__PURE__ */ s.jsx("h1", { style: { margin: "0 0 10px 0", color: "#343a40" }, children: "vCut 오디오 편집기" }),
    /* @__PURE__ */ s.jsx("p", { style: { margin: "0", color: "#6c757d" }, children: "오디오 트랙을 업로드하고 효과를 적용하여 편집해보세요." })
  ] }),
  /* @__PURE__ */ s.jsxs("div", { className: "main-content", style: { display: "flex", gap: "20px" }, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "left-panel", style: { flex: "2", minWidth: "0" }, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "upload-section", style: { marginBottom: "20px" }, children: [
        /* @__PURE__ */ s.jsx("h2", { style: { margin: "0 0 10px 0", fontSize: "1.3em", color: "#343a40" }, children: "오디오 파일 업로드" }),
        /* @__PURE__ */ s.jsx(Ut, {})
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "transport-section", style: { marginBottom: "20px" }, children: [
        /* @__PURE__ */ s.jsx("h2", { style: { margin: "0 0 10px 0", fontSize: "1.3em", color: "#343a40" }, children: "재생 컨트롤" }),
        /* @__PURE__ */ s.jsx(Lt, {})
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tracks-section", children: [
        /* @__PURE__ */ s.jsx("h2", { style: { margin: "0 0 10px 0", fontSize: "1.3em", color: "#343a40" }, children: "오디오 트랙" }),
        /* @__PURE__ */ s.jsx(Mt, {})
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "right-panel", style: { flex: "1", minWidth: "300px" }, children: [
      /* @__PURE__ */ s.jsx("h2", { style: { margin: "0 0 10px 0", fontSize: "1.3em", color: "#343a40" }, children: "오디오 효과" }),
      /* @__PURE__ */ s.jsx(Bt, {})
    ] })
  ] }),
  /* @__PURE__ */ s.jsx("div", { className: "footer", style: {
    marginTop: "30px",
    borderTop: "1px solid #dee2e6",
    paddingTop: "20px",
    textAlign: "center",
    color: "#6c757d",
    fontSize: "0.9em"
  }, children: "vCut 오디오 편집 모듈 - 버전 0.1.0" })
] }) });
export {
  Dt as AudioEditorProvider,
  S as AudioEffectType,
  Ut as AudioFileUploader,
  Vt as AudioService,
  It as AudioTrack,
  Bt as EffectsPanel,
  Gt as TestAudioEditor,
  Mt as TrackList,
  Lt as TransportControls,
  se as useAudioEditor
};
