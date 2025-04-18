var Wt = Object.defineProperty;
var Vt = (r, e, t) => e in r ? Wt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var P = (r, e, t) => (Vt(r, typeof e != "symbol" ? e + "" : e, t), t), rt = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var v = (r, e, t) => (rt(r, e, "read from private field"), t ? t.call(r) : e.get(r)), ne = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, ye = (r, e, t, n) => (rt(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t);
import dt, { createContext as Gt, useReducer as Yt, useCallback as I, useContext as Kt, useState as Z, useRef as Ee, useEffect as De } from "react";
var Ue = { exports: {} }, ve = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function Jt() {
  if (at)
    return ve;
  at = 1;
  var r = dt, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, s = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(l, f, g) {
    var y, S = {}, b = null, w = null;
    g !== void 0 && (b = "" + g), f.key !== void 0 && (b = "" + f.key), f.ref !== void 0 && (w = f.ref);
    for (y in f)
      n.call(f, y) && !u.hasOwnProperty(y) && (S[y] = f[y]);
    if (l && l.defaultProps)
      for (y in f = l.defaultProps, f)
        S[y] === void 0 && (S[y] = f[y]);
    return { $$typeof: e, type: l, key: b, ref: w, props: S, _owner: s.current };
  }
  return ve.Fragment = t, ve.jsx = p, ve.jsxs = p, ve;
}
var be = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nt;
function Xt() {
  return nt || (nt = 1, process.env.NODE_ENV !== "production" && function() {
    var r = dt, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), l = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), T = Symbol.iterator, F = "@@iterator";
    function H(a) {
      if (a === null || typeof a != "object")
        return null;
      var i = T && a[T] || a[F];
      return typeof i == "function" ? i : null;
    }
    var C = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function A(a) {
      {
        for (var i = arguments.length, c = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          c[m - 1] = arguments[m];
        se("error", a, c);
      }
    }
    function se(a, i, c) {
      {
        var m = C.ReactDebugCurrentFrame, _ = m.getStackAddendum();
        _ !== "" && (i += "%s", c = c.concat([_]));
        var L = c.map(function(O) {
          return String(O);
        });
        L.unshift("Warning: " + i), Function.prototype.apply.call(console[a], console, L);
      }
    }
    var ie = !1, le = !1, R = !1, E = !1, d = !1, x;
    x = Symbol.for("react.module.reference");
    function M(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === n || a === u || d || a === s || a === g || a === y || E || a === w || ie || le || R || typeof a == "object" && a !== null && (a.$$typeof === b || a.$$typeof === S || a.$$typeof === p || a.$$typeof === l || a.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === x || a.getModuleId !== void 0));
    }
    function W(a, i, c) {
      var m = a.displayName;
      if (m)
        return m;
      var _ = i.displayName || i.name || "";
      return _ !== "" ? c + "(" + _ + ")" : c;
    }
    function ae(a) {
      return a.displayName || "Context";
    }
    function V(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && A("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case n:
          return "Fragment";
        case t:
          return "Portal";
        case u:
          return "Profiler";
        case s:
          return "StrictMode";
        case g:
          return "Suspense";
        case y:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case l:
            var i = a;
            return ae(i) + ".Consumer";
          case p:
            var c = a;
            return ae(c._context) + ".Provider";
          case f:
            return W(a, a.render, "ForwardRef");
          case S:
            var m = a.displayName || null;
            return m !== null ? m : V(a.type) || "Memo";
          case b: {
            var _ = a, L = _._payload, O = _._init;
            try {
              return V(O(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Q = Object.assign, D = 0, z, G, $, te, fe, Ne, ze;
    function $e() {
    }
    $e.__reactDisabledLog = !0;
    function mt() {
      {
        if (D === 0) {
          z = console.log, G = console.info, $ = console.warn, te = console.error, fe = console.group, Ne = console.groupCollapsed, ze = console.groupEnd;
          var a = {
            configurable: !0,
            enumerable: !0,
            value: $e,
            writable: !0
          };
          Object.defineProperties(console, {
            info: a,
            log: a,
            warn: a,
            error: a,
            group: a,
            groupCollapsed: a,
            groupEnd: a
          });
        }
        D++;
      }
    }
    function xt() {
      {
        if (D--, D === 0) {
          var a = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Q({}, a, {
              value: z
            }),
            info: Q({}, a, {
              value: G
            }),
            warn: Q({}, a, {
              value: $
            }),
            error: Q({}, a, {
              value: te
            }),
            group: Q({}, a, {
              value: fe
            }),
            groupCollapsed: Q({}, a, {
              value: Ne
            }),
            groupEnd: Q({}, a, {
              value: ze
            })
          });
        }
        D < 0 && A("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ae = C.ReactCurrentDispatcher, Oe;
    function we(a, i, c) {
      {
        if (Oe === void 0)
          try {
            throw Error();
          } catch (_) {
            var m = _.stack.trim().match(/\n( *(at )?)/);
            Oe = m && m[1] || "";
          }
        return `
` + Oe + a;
      }
    }
    var _e = !1, Re;
    {
      var yt = typeof WeakMap == "function" ? WeakMap : Map;
      Re = new yt();
    }
    function Be(a, i) {
      if (!a || _e)
        return "";
      {
        var c = Re.get(a);
        if (c !== void 0)
          return c;
      }
      var m;
      _e = !0;
      var _ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = Ae.current, Ae.current = null, mt();
      try {
        if (i) {
          var O = function() {
            throw Error();
          };
          if (Object.defineProperty(O.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(O, []);
            } catch (J) {
              m = J;
            }
            Reflect.construct(a, [], O);
          } else {
            try {
              O.call();
            } catch (J) {
              m = J;
            }
            a.call(O.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (J) {
            m = J;
          }
          a();
        }
      } catch (J) {
        if (J && m && typeof J.stack == "string") {
          for (var j = J.stack.split(`
`), Y = m.stack.split(`
`), U = j.length - 1, N = Y.length - 1; U >= 1 && N >= 0 && j[U] !== Y[N]; )
            N--;
          for (; U >= 1 && N >= 0; U--, N--)
            if (j[U] !== Y[N]) {
              if (U !== 1 || N !== 1)
                do
                  if (U--, N--, N < 0 || j[U] !== Y[N]) {
                    var q = `
` + j[U].replace(" at new ", " at ");
                    return a.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", a.displayName)), typeof a == "function" && Re.set(a, q), q;
                  }
                while (U >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        _e = !1, Ae.current = L, xt(), Error.prepareStackTrace = _;
      }
      var ge = a ? a.displayName || a.name : "", ce = ge ? we(ge) : "";
      return typeof a == "function" && Re.set(a, ce), ce;
    }
    function vt(a, i, c) {
      return Be(a, !1);
    }
    function bt(a) {
      var i = a.prototype;
      return !!(i && i.isReactComponent);
    }
    function je(a, i, c) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return Be(a, bt(a));
      if (typeof a == "string")
        return we(a);
      switch (a) {
        case g:
          return we("Suspense");
        case y:
          return we("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case f:
            return vt(a.render);
          case S:
            return je(a.type, i, c);
          case b: {
            var m = a, _ = m._payload, L = m._init;
            try {
              return je(L(_), i, c);
            } catch {
            }
          }
        }
      return "";
    }
    var me = Object.prototype.hasOwnProperty, We = {}, Ve = C.ReactDebugCurrentFrame;
    function Ie(a) {
      if (a) {
        var i = a._owner, c = je(a.type, a._source, i ? i.type : null);
        Ve.setExtraStackFrame(c);
      } else
        Ve.setExtraStackFrame(null);
    }
    function Et(a, i, c, m, _) {
      {
        var L = Function.call.bind(me);
        for (var O in a)
          if (L(a, O)) {
            var j = void 0;
            try {
              if (typeof a[O] != "function") {
                var Y = Error((m || "React class") + ": " + c + " type `" + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[O] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Y.name = "Invariant Violation", Y;
              }
              j = a[O](i, O, m, c, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (U) {
              j = U;
            }
            j && !(j instanceof Error) && (Ie(_), A("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", c, O, typeof j), Ie(null)), j instanceof Error && !(j.message in We) && (We[j.message] = !0, Ie(_), A("Failed %s type: %s", c, j.message), Ie(null));
          }
      }
    }
    var wt = Array.isArray;
    function Ce(a) {
      return wt(a);
    }
    function Rt(a) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, c = i && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return c;
      }
    }
    function jt(a) {
      try {
        return Ge(a), !1;
      } catch {
        return !0;
      }
    }
    function Ge(a) {
      return "" + a;
    }
    function Ye(a) {
      if (jt(a))
        return A("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rt(a)), Ge(a);
    }
    var xe = C.ReactCurrentOwner, It = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ke, Je, ke;
    ke = {};
    function St(a) {
      if (me.call(a, "ref")) {
        var i = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function Tt(a) {
      if (me.call(a, "key")) {
        var i = Object.getOwnPropertyDescriptor(a, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function Dt(a, i) {
      if (typeof a.ref == "string" && xe.current && i && xe.current.stateNode !== i) {
        var c = V(xe.current.type);
        ke[c] || (A('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', V(xe.current.type), a.ref), ke[c] = !0);
      }
    }
    function At(a, i) {
      {
        var c = function() {
          Ke || (Ke = !0, A("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        c.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: c,
          configurable: !0
        });
      }
    }
    function Ot(a, i) {
      {
        var c = function() {
          Je || (Je = !0, A("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        c.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: c,
          configurable: !0
        });
      }
    }
    var _t = function(a, i, c, m, _, L, O) {
      var j = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: a,
        key: i,
        ref: c,
        props: O,
        // Record the component responsible for creating this element.
        _owner: L
      };
      return j._store = {}, Object.defineProperty(j._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(j, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(j, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: _
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    };
    function Ct(a, i, c, m, _) {
      {
        var L, O = {}, j = null, Y = null;
        c !== void 0 && (Ye(c), j = "" + c), Tt(i) && (Ye(i.key), j = "" + i.key), St(i) && (Y = i.ref, Dt(i, _));
        for (L in i)
          me.call(i, L) && !It.hasOwnProperty(L) && (O[L] = i[L]);
        if (a && a.defaultProps) {
          var U = a.defaultProps;
          for (L in U)
            O[L] === void 0 && (O[L] = U[L]);
        }
        if (j || Y) {
          var N = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          j && At(O, N), Y && Ot(O, N);
        }
        return _t(a, j, Y, _, m, xe.current, O);
      }
    }
    var Me = C.ReactCurrentOwner, Xe = C.ReactDebugCurrentFrame;
    function he(a) {
      if (a) {
        var i = a._owner, c = je(a.type, a._source, i ? i.type : null);
        Xe.setExtraStackFrame(c);
      } else
        Xe.setExtraStackFrame(null);
    }
    var Le;
    Le = !1;
    function Fe(a) {
      return typeof a == "object" && a !== null && a.$$typeof === e;
    }
    function He() {
      {
        if (Me.current) {
          var a = V(Me.current.type);
          if (a)
            return `

Check the render method of \`` + a + "`.";
        }
        return "";
      }
    }
    function kt(a) {
      {
        if (a !== void 0) {
          var i = a.fileName.replace(/^.*[\\\/]/, ""), c = a.lineNumber;
          return `

Check your code at ` + i + ":" + c + ".";
        }
        return "";
      }
    }
    var qe = {};
    function Mt(a) {
      {
        var i = He();
        if (!i) {
          var c = typeof a == "string" ? a : a.displayName || a.name;
          c && (i = `

Check the top-level render call using <` + c + ">.");
        }
        return i;
      }
    }
    function Ze(a, i) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var c = Mt(i);
        if (qe[c])
          return;
        qe[c] = !0;
        var m = "";
        a && a._owner && a._owner !== Me.current && (m = " It was passed a child from " + V(a._owner.type) + "."), he(a), A('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', c, m), he(null);
      }
    }
    function Qe(a, i) {
      {
        if (typeof a != "object")
          return;
        if (Ce(a))
          for (var c = 0; c < a.length; c++) {
            var m = a[c];
            Fe(m) && Ze(m, i);
          }
        else if (Fe(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var _ = H(a);
          if (typeof _ == "function" && _ !== a.entries)
            for (var L = _.call(a), O; !(O = L.next()).done; )
              Fe(O.value) && Ze(O.value, i);
        }
      }
    }
    function Lt(a) {
      {
        var i = a.type;
        if (i == null || typeof i == "string")
          return;
        var c;
        if (typeof i == "function")
          c = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === S))
          c = i.propTypes;
        else
          return;
        if (c) {
          var m = V(i);
          Et(c, a.props, "prop", m, a);
        } else if (i.PropTypes !== void 0 && !Le) {
          Le = !0;
          var _ = V(i);
          A("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _ || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && A("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ft(a) {
      {
        for (var i = Object.keys(a.props), c = 0; c < i.length; c++) {
          var m = i[c];
          if (m !== "children" && m !== "key") {
            he(a), A("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), he(null);
            break;
          }
        }
        a.ref !== null && (he(a), A("Invalid attribute `ref` supplied to `React.Fragment`."), he(null));
      }
    }
    var et = {};
    function tt(a, i, c, m, _, L) {
      {
        var O = M(a);
        if (!O) {
          var j = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (j += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Y = kt(_);
          Y ? j += Y : j += He();
          var U;
          a === null ? U = "null" : Ce(a) ? U = "array" : a !== void 0 && a.$$typeof === e ? (U = "<" + (V(a.type) || "Unknown") + " />", j = " Did you accidentally export a JSX literal instead of a component?") : U = typeof a, A("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", U, j);
        }
        var N = Ct(a, i, c, _, L);
        if (N == null)
          return N;
        if (O) {
          var q = i.children;
          if (q !== void 0)
            if (m)
              if (Ce(q)) {
                for (var ge = 0; ge < q.length; ge++)
                  Qe(q[ge], a);
                Object.freeze && Object.freeze(q);
              } else
                A("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Qe(q, a);
        }
        if (me.call(i, "key")) {
          var ce = V(a), J = Object.keys(i).filter(function(Bt) {
            return Bt !== "key";
          }), Pe = J.length > 0 ? "{key: someKey, " + J.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!et[ce + Pe]) {
            var $t = J.length > 0 ? "{" + J.join(": ..., ") + ": ...}" : "{}";
            A(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Pe, ce, $t, ce), et[ce + Pe] = !0;
          }
        }
        return a === n ? Ft(N) : Lt(N), N;
      }
    }
    function Pt(a, i, c) {
      return tt(a, i, c, !0);
    }
    function Ut(a, i, c) {
      return tt(a, i, c, !1);
    }
    var Nt = Ut, zt = Pt;
    be.Fragment = n, be.jsx = Nt, be.jsxs = zt;
  }()), be;
}
process.env.NODE_ENV === "production" ? Ue.exports = Jt() : Ue.exports = Xt();
var o = Ue.exports;
let Se;
const Ht = new Uint8Array(16);
function qt() {
  if (!Se && (Se = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Se))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Se(Ht);
}
const B = [];
for (let r = 0; r < 256; ++r)
  B.push((r + 256).toString(16).slice(1));
function Zt(r, e = 0) {
  return B[r[e + 0]] + B[r[e + 1]] + B[r[e + 2]] + B[r[e + 3]] + "-" + B[r[e + 4]] + B[r[e + 5]] + "-" + B[r[e + 6]] + B[r[e + 7]] + "-" + B[r[e + 8]] + B[r[e + 9]] + "-" + B[r[e + 10]] + B[r[e + 11]] + B[r[e + 12]] + B[r[e + 13]] + B[r[e + 14]] + B[r[e + 15]];
}
const Qt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ot = {
  randomUUID: Qt
};
function ut(r, e, t) {
  if (ot.randomUUID && !e && !r)
    return ot.randomUUID();
  r = r || {};
  const n = r.random || (r.rng || qt)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    t = t || 0;
    for (let s = 0; s < 16; ++s)
      e[t + s] = n[s];
    return e;
  }
  return Zt(n);
}
var k;
(function(r) {
  r.LOAD = "LOAD", r.EXEC = "EXEC", r.FFPROBE = "FFPROBE", r.WRITE_FILE = "WRITE_FILE", r.READ_FILE = "READ_FILE", r.DELETE_FILE = "DELETE_FILE", r.RENAME = "RENAME", r.CREATE_DIR = "CREATE_DIR", r.LIST_DIR = "LIST_DIR", r.DELETE_DIR = "DELETE_DIR", r.ERROR = "ERROR", r.DOWNLOAD = "DOWNLOAD", r.PROGRESS = "PROGRESS", r.LOG = "LOG", r.MOUNT = "MOUNT", r.UNMOUNT = "UNMOUNT";
})(k || (k = {}));
const er = (() => {
  let r = 0;
  return () => r++;
})(), tr = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"), rr = new Error("called FFmpeg.terminate()");
var X, oe, re, ue, pe, Te, K;
class ar {
  constructor() {
    ne(this, X, null);
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    ne(this, oe, {});
    ne(this, re, {});
    ne(this, ue, []);
    ne(this, pe, []);
    P(this, "loaded", !1);
    /**
     * register worker message event handlers.
     */
    ne(this, Te, () => {
      v(this, X) && (v(this, X).onmessage = ({ data: { id: e, type: t, data: n } }) => {
        switch (t) {
          case k.LOAD:
            this.loaded = !0, v(this, oe)[e](n);
            break;
          case k.MOUNT:
          case k.UNMOUNT:
          case k.EXEC:
          case k.FFPROBE:
          case k.WRITE_FILE:
          case k.READ_FILE:
          case k.DELETE_FILE:
          case k.RENAME:
          case k.CREATE_DIR:
          case k.LIST_DIR:
          case k.DELETE_DIR:
            v(this, oe)[e](n);
            break;
          case k.LOG:
            v(this, ue).forEach((s) => s(n));
            break;
          case k.PROGRESS:
            v(this, pe).forEach((s) => s(n));
            break;
          case k.ERROR:
            v(this, re)[e](n);
            break;
        }
        delete v(this, oe)[e], delete v(this, re)[e];
      });
    });
    /**
     * Generic function to send messages to web worker.
     */
    ne(this, K, ({ type: e, data: t }, n = [], s) => v(this, X) ? new Promise((u, p) => {
      const l = er();
      v(this, X) && v(this, X).postMessage({ id: l, type: e, data: t }, n), v(this, oe)[l] = u, v(this, re)[l] = p, s == null || s.addEventListener("abort", () => {
        p(new DOMException(`Message # ${l} was aborted`, "AbortError"));
      }, { once: !0 });
    }) : Promise.reject(tr));
    /**
     * Loads ffmpeg-core inside web worker. It is required to call this method first
     * as it initializes WebAssembly and other essential variables.
     *
     * @category FFmpeg
     * @returns `true` if ffmpeg core is loaded for the first time.
     */
    P(this, "load", ({ classWorkerURL: e, ...t } = {}, { signal: n } = {}) => (v(this, X) || (ye(this, X, e ? new Worker(new URL(e, import.meta.url), {
      type: "module"
    }) : (
      // We need to duplicated the code here to enable webpack
      // to bundle worekr.js here.
      new Worker(new URL("/assets/worker-1c8189a2.js", self.location), {
        type: "module"
      })
    )), v(this, Te).call(this)), v(this, K).call(this, {
      type: k.LOAD,
      data: t
    }, void 0, n)));
    /**
     * Execute ffmpeg command.
     *
     * @remarks
     * To avoid common I/O issues, ["-nostdin", "-y"] are prepended to the args
     * by default.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", ...);
     * // ffmpeg -i video.avi video.mp4
     * await ffmpeg.exec(["-i", "video.avi", "video.mp4"]);
     * const data = ffmpeg.readFile("video.mp4");
     * ```
     *
     * @returns `0` if no error, `!= 0` if timeout (1) or error.
     * @category FFmpeg
     */
    P(this, "exec", (e, t = -1, { signal: n } = {}) => v(this, K).call(this, {
      type: k.EXEC,
      data: { args: e, timeout: t }
    }, void 0, n));
    /**
     * Execute ffprobe command.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", ...);
     * // Getting duration of a video in seconds: ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 video.avi -o output.txt
     * await ffmpeg.ffprobe(["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", "video.avi", "-o", "output.txt"]);
     * const data = ffmpeg.readFile("output.txt");
     * ```
     *
     * @returns `0` if no error, `!= 0` if timeout (1) or error.
     * @category FFmpeg
     */
    P(this, "ffprobe", (e, t = -1, { signal: n } = {}) => v(this, K).call(this, {
      type: k.FFPROBE,
      data: { args: e, timeout: t }
    }, void 0, n));
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    P(this, "terminate", () => {
      const e = Object.keys(v(this, re));
      for (const t of e)
        v(this, re)[t](rr), delete v(this, re)[t], delete v(this, oe)[t];
      v(this, X) && (v(this, X).terminate(), ye(this, X, null), this.loaded = !1);
    });
    /**
     * Write data to ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", await fetchFile("../video.avi"));
     * await ffmpeg.writeFile("text.txt", "hello world");
     * ```
     *
     * @category File System
     */
    P(this, "writeFile", (e, t, { signal: n } = {}) => {
      const s = [];
      return t instanceof Uint8Array && s.push(t.buffer), v(this, K).call(this, {
        type: k.WRITE_FILE,
        data: { path: e, data: t }
      }, s, n);
    });
    P(this, "mount", (e, t, n) => {
      const s = [];
      return v(this, K).call(this, {
        type: k.MOUNT,
        data: { fsType: e, options: t, mountPoint: n }
      }, s);
    });
    P(this, "unmount", (e) => {
      const t = [];
      return v(this, K).call(this, {
        type: k.UNMOUNT,
        data: { mountPoint: e }
      }, t);
    });
    /**
     * Read data from ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * const data = await ffmpeg.readFile("video.mp4");
     * ```
     *
     * @category File System
     */
    P(this, "readFile", (e, t = "binary", { signal: n } = {}) => v(this, K).call(this, {
      type: k.READ_FILE,
      data: { path: e, encoding: t }
    }, void 0, n));
    /**
     * Delete a file.
     *
     * @category File System
     */
    P(this, "deleteFile", (e, { signal: t } = {}) => v(this, K).call(this, {
      type: k.DELETE_FILE,
      data: { path: e }
    }, void 0, t));
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    P(this, "rename", (e, t, { signal: n } = {}) => v(this, K).call(this, {
      type: k.RENAME,
      data: { oldPath: e, newPath: t }
    }, void 0, n));
    /**
     * Create a directory.
     *
     * @category File System
     */
    P(this, "createDir", (e, { signal: t } = {}) => v(this, K).call(this, {
      type: k.CREATE_DIR,
      data: { path: e }
    }, void 0, t));
    /**
     * List directory contents.
     *
     * @category File System
     */
    P(this, "listDir", (e, { signal: t } = {}) => v(this, K).call(this, {
      type: k.LIST_DIR,
      data: { path: e }
    }, void 0, t));
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    P(this, "deleteDir", (e, { signal: t } = {}) => v(this, K).call(this, {
      type: k.DELETE_DIR,
      data: { path: e }
    }, void 0, t));
  }
  on(e, t) {
    e === "log" ? v(this, ue).push(t) : e === "progress" && v(this, pe).push(t);
  }
  off(e, t) {
    e === "log" ? ye(this, ue, v(this, ue).filter((n) => n !== t)) : e === "progress" && ye(this, pe, v(this, pe).filter((n) => n !== t));
  }
}
X = new WeakMap(), oe = new WeakMap(), re = new WeakMap(), ue = new WeakMap(), pe = new WeakMap(), Te = new WeakMap(), K = new WeakMap();
var st;
(function(r) {
  r.MEMFS = "MEMFS", r.NODEFS = "NODEFS", r.NODERAWFS = "NODERAWFS", r.IDBFS = "IDBFS", r.WORKERFS = "WORKERFS", r.PROXYFS = "PROXYFS";
})(st || (st = {}));
const nr = (r) => new Promise((e, t) => {
  const n = new FileReader();
  n.onload = () => {
    const { result: s } = n;
    s instanceof ArrayBuffer ? e(new Uint8Array(s)) : e(new Uint8Array());
  }, n.onerror = (s) => {
    var u, p;
    t(Error(`File could not be read! Code=${((p = (u = s == null ? void 0 : s.target) == null ? void 0 : u.error) == null ? void 0 : p.code) || -1}`));
  }, n.readAsArrayBuffer(r);
}), it = async (r) => {
  let e;
  if (typeof r == "string")
    /data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(r) ? e = atob(r.split(",")[1]).split("").map((t) => t.charCodeAt(0)) : e = await (await fetch(r)).arrayBuffer();
  else if (r instanceof URL)
    e = await (await fetch(r)).arrayBuffer();
  else if (r instanceof File || r instanceof Blob)
    e = await nr(r);
  else
    return new Uint8Array();
  return new Uint8Array(e);
};
var h = /* @__PURE__ */ ((r) => (r.VIDEO = "video", r.AUDIO = "audio", r.IMAGE = "image", r))(h || {});
class or {
  constructor() {
    P(this, "ffmpeg", null);
    P(this, "loaded", !1);
    P(this, "loading", !1);
    P(this, "logs", "");
    P(this, "loadAttempts", 0);
    P(this, "maxLoadAttempts", 3);
    P(this, "loadPromise", null);
  }
  /**
   * FFmpeg 인스턴스를 로드합니다
   */
  async load() {
    if (!this.loaded) {
      if (this.loading && this.loadPromise)
        return this.loadPromise;
      if (this.loadAttempts >= this.maxLoadAttempts) {
        console.warn(`FFmpeg 로드 최대 시도 횟수(${this.maxLoadAttempts}회) 초과, 대체 방법으로 전환`), this.loaded = !0;
        return;
      }
      return this.loading = !0, this.loadAttempts++, console.log(`FFmpeg 로드 시도 ${this.loadAttempts}/${this.maxLoadAttempts}`), this.ffmpeg = new ar(), this.ffmpeg.on("log", ({ message: e }) => {
        this.logs += e + `
`, console.log("FFmpeg 로그:", e);
      }), this.loadPromise = (async () => {
        try {
          console.log("FFmpeg 로드 시작 v1.5"), typeof SharedArrayBuffer > "u" ? console.warn("SharedArrayBuffer가 지원되지 않습니다. COOP/COEP 설정을 확인하세요.") : console.log("SharedArrayBuffer 지원됨");
          const e = window.location.origin;
          if (this.ffmpeg)
            await this.ffmpeg.load({
              coreURL: `${e}/ffmpeg/ffmpeg-core.js`,
              wasmURL: `${e}/ffmpeg/ffmpeg-core.wasm`,
              workerURL: `${e}/ffmpeg/ffmpeg-core.worker.js`
            });
          else
            throw new Error("FFmpeg 인스턴스가 null입니다.");
          this.loaded = !0, this.loadAttempts = 0, console.log("FFmpeg 로드 완료 (로컬 파일)");
        } catch (e) {
          console.error("FFmpeg 로드 실패 (로컬 파일):", e), this.loadAttempts >= this.maxLoadAttempts ? (console.warn("FFmpeg 로드 실패, 대체 방법으로 전환"), this.loaded = !0, this.loadAttempts = 0) : (console.log("FFmpeg 로드 재시도..."), await new Promise((t) => setTimeout(t, 1e3)), this.loading = !1, await this.load());
        } finally {
          this.loading = !1;
        }
      })(), this.loadPromise;
    }
  }
  /**
   * 미디어 파일의 메타데이터를 추출합니다
   * @param file 미디어 파일
   * @returns 미디어 메타데이터
   */
  async extractMetadata(e) {
    await this.ensureLoaded();
    try {
      if (this.logs = "", console.log(`파일 메타데이터 추출 시작: ${e.name}, 크기: ${e.size}바이트`), !this.ffmpeg)
        return console.warn("FFmpeg를 사용할 수 없어 기본 메타데이터 반환"), this.createBasicMetadata(e);
      await this.ffmpeg.writeFile("input", await it(e)), console.log("파일 업로드 완료");
      const t = this.detectMediaType(e.name);
      console.log(`감지된 미디어 타입: ${t}`), console.log("메타데이터 추출 명령 실행"), await this.ffmpeg.exec(["-i", "input", "-f", "null", "-"]);
      const n = {
        width: 0,
        height: 0,
        duration: this.extractDuration(this.logs),
        bitRate: this.extractBitrate(this.logs),
        codec: this.extractCodec(this.logs, t)
      };
      if (t === h.VIDEO || t === h.IMAGE) {
        const s = this.extractResolution(this.logs);
        n.width = s.width, n.height = s.height;
      }
      return t === h.AUDIO && (n.channels = this.extractAudioChannels(this.logs), n.sampleRate = this.extractSampleRate(this.logs)), console.log("메타데이터 추출 완료:", n), n;
    } catch (t) {
      return console.error("메타데이터 추출 실패:", t), this.createBasicMetadata(e);
    } finally {
      this.ffmpeg && await this.ffmpeg.deleteFile("input").catch((t) => {
        console.error("임시 파일 삭제 실패:", t);
      });
    }
  }
  /**
   * 기본 메타데이터를 생성합니다 (FFmpeg 없이)
   * @param file 미디어 파일
   * @returns 기본 메타데이터
   */
  createBasicMetadata(e) {
    const t = this.detectMediaType(e.name);
    return console.log(`기본 메타데이터 생성 (타입: ${t})`), t === h.AUDIO && typeof window < "u" && window.AudioContext ? new Promise((n) => {
      try {
        const s = new AudioContext(), u = new FileReader();
        u.onload = (p) => {
          var f;
          const l = (f = p.target) == null ? void 0 : f.result;
          s.decodeAudioData(l, (g) => {
            n({
              width: 0,
              height: 0,
              duration: g.duration,
              bitRate: Math.round(e.size * 8 / g.duration / 1e3),
              codec: "mp3",
              channels: g.numberOfChannels,
              sampleRate: g.sampleRate
            });
          }, (g) => {
            console.error("오디오 디코딩 실패:", g), n(this.createFallbackMetadata(e, t));
          });
        }, u.onerror = () => {
          n(this.createFallbackMetadata(e, t));
        }, u.readAsArrayBuffer(e);
      } catch (s) {
        console.error("Web Audio API 사용 실패:", s), n(this.createFallbackMetadata(e, t));
      }
    }) : this.createFallbackMetadata(e, t);
  }
  /**
   * 최후의 대체 메타데이터를 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @returns 대체 메타데이터
   */
  createFallbackMetadata(e, t) {
    let n = 0;
    return t === h.AUDIO ? n = e.size * 8 / (128 * 1024) : t === h.VIDEO && (n = e.size * 8 / (1024 * 1024)), {
      width: t === h.IMAGE || t === h.VIDEO ? 640 : 0,
      height: t === h.IMAGE || t === h.VIDEO ? 480 : 0,
      duration: n,
      bitRate: t === h.AUDIO ? 128 : 0,
      codec: t === h.AUDIO ? "mp3" : "unknown",
      channels: t === h.AUDIO ? 2 : void 0,
      sampleRate: t === h.AUDIO ? 44100 : void 0
    };
  }
  /**
   * 미디어 파일에서 썸네일을 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @param options 썸네일 옵션
   * @returns 썸네일 URL (base64)
   */
  async generateThumbnail(e, t, n = {}) {
    await this.ensureLoaded();
    const { width: s = 320, height: u = 180, quality: p = 90, time: l = 0 } = n;
    if (console.log(`썸네일 생성 시작: ${e.name}, 타입: ${t}`), !this.ffmpeg)
      return console.warn("FFmpeg를 사용할 수 없어 Canvas 기반 썸네일 생성"), this.createCanvasThumbnail(e, t, s, u, p);
    try {
      if (await this.ffmpeg.writeFile("input", await it(e)), console.log("썸네일용 파일 업로드 완료"), t === h.VIDEO)
        console.log(`비디오 썸네일 추출 (시간: ${l}초)`), await this.ffmpeg.exec([
          "-ss",
          l.toString(),
          "-i",
          "input",
          "-vframes",
          "1",
          "-q:v",
          Math.floor(p / 10).toString(),
          "-vf",
          `scale=${s}:${u}:force_original_aspect_ratio=decrease`,
          "thumbnail.jpg"
        ]);
      else if (t === h.IMAGE)
        console.log("이미지 썸네일 생성"), await this.ffmpeg.exec([
          "-i",
          "input",
          "-q:v",
          Math.floor(p / 10).toString(),
          "-vf",
          `scale=${s}:${u}:force_original_aspect_ratio=decrease`,
          "thumbnail.jpg"
        ]);
      else if (t === h.AUDIO) {
        console.log("오디오 썸네일 생성");
        try {
          console.log("오디오 파형 이미지 생성 시도"), await this.ffmpeg.exec([
            "-i",
            "input",
            "-filter_complex",
            "showwavespic=s=320x180:colors=#3498db",
            "-frames:v",
            "1",
            "thumbnail.jpg"
          ]), console.log("오디오 파형 이미지 생성 성공");
        } catch (S) {
          console.warn("오디오 파형 썸네일 생성 실패, 기본 이미지 사용:", S);
          try {
            await this.ffmpeg.exec([
              "-f",
              "lavfi",
              "-i",
              "color=c=blue:s=320x180",
              "-vf",
              "drawtext=text='🎵':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2",
              "-frames:v",
              "1",
              "thumbnail.jpg"
            ]);
          } catch (b) {
            console.error("기본 오디오 썸네일 생성 실패:", b), await this.ffmpeg.exec([
              "-f",
              "lavfi",
              "-i",
              "color=c=blue:s=320x180",
              "-frames:v",
              "1",
              "thumbnail.jpg"
            ]);
          }
        }
      }
      console.log("썸네일 파일 읽기");
      const f = await this.ffmpeg.readFile("thumbnail.jpg"), g = new Blob([f], { type: "image/jpeg" }), y = URL.createObjectURL(g);
      return console.log("썸네일 생성 완료"), y;
    } catch (f) {
      return console.error("썸네일 생성 실패:", f), this.createCanvasThumbnail(e, t, s, u, p);
    } finally {
      this.ffmpeg && (await this.ffmpeg.deleteFile("input").catch(() => {
      }), await this.ffmpeg.deleteFile("thumbnail.jpg").catch(() => {
      }));
    }
  }
  /**
   * Canvas API를 사용하여 썸네일을 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @param width 썸네일 너비
   * @param height 썸네일 높이
   * @param quality 썸네일 품질
   * @returns 썸네일 URL (base64)
   */
  createCanvasThumbnail(e, t, n, s, u) {
    return new Promise((p) => {
      if (t === h.IMAGE && typeof window < "u") {
        const l = new Image(), f = URL.createObjectURL(e);
        l.onload = () => {
          const g = document.createElement("canvas");
          g.width = n, g.height = s;
          const y = g.getContext("2d");
          y ? (y.drawImage(l, 0, 0, n, s), URL.revokeObjectURL(f), p(g.toDataURL("image/jpeg", u / 100))) : (URL.revokeObjectURL(f), p(this.createDefaultThumbnail(e, t, n, s, u)));
        }, l.onerror = () => {
          URL.revokeObjectURL(f), p(this.createDefaultThumbnail(e, t, n, s, u));
        }, l.src = f;
      } else
        p(this.createDefaultThumbnail(e, t, n, s, u));
    });
  }
  /**
   * 기본 썸네일을 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @param width 썸네일 너비
   * @param height 썸네일 높이
   * @param quality 썸네일 품질
   * @returns 썸네일 URL (base64)
   */
  createDefaultThumbnail(e, t, n, s, u) {
    if (typeof document > "u")
      return "";
    const p = document.createElement("canvas");
    p.width = n, p.height = s;
    const l = p.getContext("2d");
    if (!l)
      return "";
    if (t === h.AUDIO) {
      const f = l.createLinearGradient(0, 0, 0, s);
      f.addColorStop(0, "#3498db"), f.addColorStop(1, "#2980b9"), l.fillStyle = f, l.fillRect(0, 0, n, s), l.strokeStyle = "rgba(255, 255, 255, 0.5)", l.lineWidth = 2, l.beginPath();
      const g = 20, y = n / g;
      for (let S = 0; S <= g; S++) {
        const b = S * y, w = Math.random() * 0.5 + 0.2, T = s / 2 + Math.sin(S * 0.5) * s * w * 0.5;
        S === 0 ? l.moveTo(b, T) : l.lineTo(b, T);
      }
      l.stroke(), l.fillStyle = "#ffffff", l.font = "bold 48px Arial", l.textAlign = "center", l.textBaseline = "middle", l.fillText("🎵", n / 2, s / 2), l.font = "12px Arial", l.fillText(e.name.substring(0, 20), n / 2, s - 20);
    } else if (t === h.VIDEO) {
      const f = l.createLinearGradient(0, 0, 0, s);
      f.addColorStop(0, "#3949ab"), f.addColorStop(1, "#303f9f"), l.fillStyle = f, l.fillRect(0, 0, n, s), l.fillStyle = "#ffffff", l.font = "bold 48px Arial", l.textAlign = "center", l.textBaseline = "middle", l.fillText("🎬", n / 2, s / 2), l.font = "12px Arial", l.fillText(e.name.substring(0, 20), n / 2, s - 20);
    } else
      l.fillStyle = "#43a047", l.fillRect(0, 0, n, s), l.fillStyle = "#ffffff", l.font = "bold 48px Arial", l.textAlign = "center", l.textBaseline = "middle", l.fillText("📁", n / 2, s / 2), l.font = "12px Arial", l.fillText(e.name.substring(0, 20), n / 2, s - 20);
    return p.toDataURL("image/jpeg", u / 100);
  }
  /**
   * FFmpeg가 로드되었는지 확인하고, 로드되지 않았다면 로드합니다
   */
  async ensureLoaded() {
    if (!this.loaded) {
      if (this.loading && this.loadPromise)
        return this.loadPromise;
      try {
        await this.load();
      } catch (e) {
        console.error("FFmpeg 로드 확인 중 오류:", e), this.loaded = !0;
      }
    }
  }
  /**
   * FFmpeg 인스턴스를 종료합니다
   */
  async terminate() {
    this.ffmpeg && (await this.ffmpeg.terminate(), this.ffmpeg = null, this.loaded = !1);
  }
  /**
   * 파일 이름에서 미디어 타입을 감지합니다
   * @param filename 파일 이름
   * @returns 미디어 타입
   */
  detectMediaType(e) {
    var p;
    const t = ((p = e.split(".").pop()) == null ? void 0 : p.toLowerCase()) || "", n = ["mp4", "webm", "ogg", "mov", "avi", "wmv", "flv", "mkv"], s = ["mp3", "wav", "ogg", "aac", "m4a", "flac"], u = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff"];
    return n.includes(t) ? h.VIDEO : s.includes(t) ? h.AUDIO : u.includes(t) ? h.IMAGE : h.VIDEO;
  }
  /**
   * FFmpeg 로그에서 미디어 지속 시간을 추출합니다
   * @param log FFmpeg 로그
   * @returns 지속 시간 (초)
   */
  extractDuration(e) {
    const t = e.match(/Duration: (\d{2}):(\d{2}):(\d{2})\.(\d{2})/);
    if (t) {
      const n = parseInt(t[1]), s = parseInt(t[2]), u = parseInt(t[3]), p = parseInt(t[4]);
      return n * 3600 + s * 60 + u + p / 100;
    }
    return 0;
  }
  /**
   * FFmpeg 로그에서 비트레이트를 추출합니다
   * @param log FFmpeg 로그
   * @returns 비트레이트 (kbps)
   */
  extractBitrate(e) {
    const t = e.match(/bitrate: (\d+) kb\/s/);
    return t ? parseInt(t[1]) : 0;
  }
  /**
   * FFmpeg 로그에서 해상도를 추출합니다
   * @param log FFmpeg 로그
   * @returns 해상도 (width, height)
   */
  extractResolution(e) {
    const t = e.match(/(\d{2,5})x(\d{2,5})/);
    return t ? {
      width: parseInt(t[1]),
      height: parseInt(t[2])
    } : { width: 0, height: 0 };
  }
  /**
   * FFmpeg 로그에서 코덱 정보를 추출합니다
   * @param log FFmpeg 로그
   * @param type 미디어 타입
   * @returns 코덱 이름
   */
  extractCodec(e, t) {
    if (t === h.VIDEO) {
      const n = e.match(/Video: ([^,]+)/);
      return n ? n[1].trim() : "unknown";
    } else if (t === h.AUDIO) {
      const n = e.match(/Audio: ([^,]+)/);
      return n ? n[1].trim() : "unknown";
    }
    return "unknown";
  }
  /**
   * FFmpeg 로그에서 오디오 채널 수를 추출합니다
   * @param log FFmpeg 로그
   * @returns 오디오 채널 수
   */
  extractAudioChannels(e) {
    const t = e.match(/Audio: ([^,]+), (\d+) channels/);
    return t ? parseInt(t[2]) : 0;
  }
  /**
   * FFmpeg 로그에서 오디오 샘플레이트를 추출합니다
   * @param log FFmpeg 로그
   * @returns 오디오 샘플레이트 (Hz)
   */
  extractSampleRate(e) {
    const t = e.match(/Audio: ([^,]+), (\d+) Hz/);
    return t ? parseInt(t[2]) : 0;
  }
}
const de = new or(), lt = "vcut_media_items";
class sr {
  constructor() {
    P(this, "items", /* @__PURE__ */ new Map());
    this.loadFromStorage();
  }
  /**
   * 로컬 스토리지에서 미디어 항목을 로드합니다
   */
  loadFromStorage() {
    try {
      const e = localStorage.getItem(lt);
      e && (JSON.parse(e).forEach((n) => {
        n.createdAt = new Date(n.createdAt), n.importedAt = new Date(n.importedAt), this.items.set(n.id, n);
      }), console.log(`${this.items.size}개의 미디어 항목을 로컬 스토리지에서 로드했습니다.`));
    } catch (e) {
      console.error("로컬 스토리지에서 미디어 항목을 로드하는 중 오류 발생:", e);
    }
  }
  /**
   * 미디어 항목을 로컬 스토리지에 저장합니다
   */
  saveToStorage() {
    try {
      const e = Array.from(this.items.values());
      localStorage.setItem(lt, JSON.stringify(e));
    } catch (e) {
      console.error("미디어 항목을 로컬 스토리지에 저장하는 중 오류 발생:", e);
    }
  }
  /**
   * 미디어 파일을 임포트합니다
   * @param files 파일 목록
   * @returns 임포트된 미디어 항목 배열
   */
  async importMedia(e) {
    const t = [];
    console.log(`파일 임포트 시작: ${e.length}개`);
    for (const n of e)
      try {
        console.log(`파일 임포트: ${n.name}`);
        const s = this.detectMediaType(n);
        console.log(`감지된 미디어 타입: ${s}`);
        const u = await de.extractMetadata(n);
        console.log("미디어 항목 생성 시작");
        const p = await this.createMediaItem({
          name: n.name,
          type: s,
          path: URL.createObjectURL(n),
          size: n.size,
          metadata: u
        });
        console.log("미디어 항목 생성 완료");
        const l = await de.generateThumbnail(n, s);
        p.thumbnail = l, console.log("썸네일 생성 완료"), this.items.set(p.id, p), t.push(p);
      } catch (s) {
        console.error(`파일 임포트 실패: ${n.name}`, s);
      }
    return console.log("파일 임포트 완료"), this.saveToStorage(), t;
  }
  /**
   * 필터 옵션을 기준으로 미디어 항목을 검색합니다
   * @param filter 필터 옵션
   * @returns 필터링된 미디어 항목 배열
   */
  async getMediaItems(e = {}) {
    let t = Array.from(this.items.values());
    if (e.type && e.type.length > 0 && (t = t.filter((n) => e.type.includes(n.type))), e.tags && e.tags.length > 0 && (t = t.filter(
      (n) => e.tags.some((s) => n.tags.includes(s))
    )), e.favorite !== void 0 && (t = t.filter((n) => n.favorite === e.favorite)), e.search) {
      const n = e.search.toLowerCase();
      t = t.filter(
        (s) => s.name.toLowerCase().includes(n) || s.tags.some((u) => u.toLowerCase().includes(n))
      );
    }
    if (e.sortBy) {
      const n = e.sortDirection === "desc" ? -1 : 1;
      t.sort((s, u) => {
        switch (e.sortBy) {
          case "name":
            return n * s.name.localeCompare(u.name);
          case "size":
            return n * (s.size - u.size);
          case "createdAt":
            return n * (s.createdAt.getTime() - u.createdAt.getTime());
          case "importedAt":
            return n * (s.importedAt.getTime() - u.importedAt.getTime());
          case "duration":
            const p = s.metadata.duration || 0, l = u.metadata.duration || 0;
            return n * (p - l);
          default:
            return 0;
        }
      });
    }
    return t;
  }
  /**
   * ID로 미디어 항목을 조회합니다
   * @param id 미디어 항목 ID
   * @returns 미디어 항목 또는 null
   */
  async getMediaById(e) {
    return this.items.get(e) || null;
  }
  /**
   * 미디어 항목을 업데이트합니다
   * @param id 미디어 항목 ID
   * @param updates 업데이트할 필드
   * @returns 업데이트된 미디어 항목
   */
  async updateMedia(e, t) {
    const n = this.items.get(e);
    if (!n)
      throw new Error(`미디어 항목을 찾을 수 없음: ${e}`);
    const s = { ...n, ...t };
    return this.items.set(e, s), this.saveToStorage(), s;
  }
  /**
   * 미디어 항목을 삭제합니다
   * @param id 미디어 항목 ID
   * @returns 삭제 성공 여부
   */
  async deleteMedia(e) {
    const t = this.items.get(e);
    t && (URL.revokeObjectURL(t.url), t.thumbnail && t.thumbnail.startsWith("blob:") && URL.revokeObjectURL(t.thumbnail));
    const n = this.items.delete(e);
    return this.saveToStorage(), n;
  }
  /**
   * 기존 미디어 항목의 썸네일을 생성합니다
   * @param mediaItem 미디어 항목
   * @param options 썸네일 옵션
   * @returns 썸네일 URL
   */
  async generateThumbnail(e, t) {
    try {
      const s = await (await fetch(e.url)).blob(), u = new File([s], e.name, { type: this.getMimeType(e.type) }), p = await de.generateThumbnail(u, e.type, t);
      return e.thumbnail && e.thumbnail.startsWith("blob:") && URL.revokeObjectURL(e.thumbnail), e.thumbnail = p, this.items.set(e.id, e), this.saveToStorage(), p;
    } catch (n) {
      throw console.error("썸네일 생성 실패:", n), new Error("썸네일을 생성할 수 없습니다");
    }
  }
  /**
   * 파일에서 메타데이터를 추출합니다
   * @param file 파일
   * @returns 메타데이터
   */
  async extractMetadata(e) {
    return await de.extractMetadata(e);
  }
  /**
   * 새 미디어 항목을 생성합니다
   * @param options 미디어 항목 생성 옵션
   * @returns 생성된 미디어 항목
   */
  async createMediaItem(e) {
    const t = /* @__PURE__ */ new Date();
    return {
      id: ut(),
      name: e.name,
      type: e.type,
      path: e.path,
      url: e.path,
      size: e.size,
      createdAt: t,
      importedAt: t,
      metadata: e.metadata || {},
      tags: e.tags || [],
      favorite: e.favorite || !1,
      thumbnail: ""
    };
  }
  /**
   * 파일 MIME 타입에 따라 미디어 타입을 감지합니다
   * @param file 파일
   * @returns 미디어 타입
   */
  detectMediaType(e) {
    var l;
    const t = e.type.toLowerCase();
    if (t.startsWith("video/"))
      return h.VIDEO;
    if (t.startsWith("audio/"))
      return h.AUDIO;
    if (t.startsWith("image/"))
      return h.IMAGE;
    const n = (l = e.name.split(".").pop()) == null ? void 0 : l.toLowerCase(), s = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"], u = ["mp3", "wav", "ogg", "aac", "m4a", "flac"], p = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    return n && s.includes(n) ? h.VIDEO : n && u.includes(n) ? h.AUDIO : n && p.includes(n) ? h.IMAGE : h.VIDEO;
  }
  /**
   * 미디어 타입에 해당하는 MIME 타입을 반환합니다
   * @param type 미디어 타입
   * @returns MIME 타입
   */
  getMimeType(e) {
    switch (e) {
      case h.VIDEO:
        return "video/mp4";
      case h.AUDIO:
        return "audio/mp3";
      case h.IMAGE:
        return "image/jpeg";
      default:
        return "application/octet-stream";
    }
  }
}
const ee = new sr(), ir = {
  items: [],
  selectedItems: [],
  isLoading: !1,
  error: null,
  filter: {}
};
function lr(r, e) {
  switch (e.type) {
    case "SET_ITEMS":
      return { ...r, items: e.payload };
    case "ADD_ITEMS":
      return { ...r, items: [...r.items, ...e.payload] };
    case "UPDATE_ITEM":
      return {
        ...r,
        items: r.items.map(
          (t) => t.id === e.payload.id ? e.payload : t
        )
      };
    case "REMOVE_ITEM":
      return {
        ...r,
        items: r.items.filter((t) => t.id !== e.payload),
        selectedItems: r.selectedItems.filter((t) => t !== e.payload)
      };
    case "SELECT_ITEM":
      return {
        ...r,
        selectedItems: [...r.selectedItems, e.payload]
      };
    case "DESELECT_ITEM":
      return {
        ...r,
        selectedItems: r.selectedItems.filter((t) => t !== e.payload)
      };
    case "SELECT_ALL":
      return {
        ...r,
        selectedItems: r.items.map((t) => t.id)
      };
    case "DESELECT_ALL":
      return {
        ...r,
        selectedItems: []
      };
    case "SET_FILTER":
      return { ...r, filter: e.payload };
    case "SET_LOADING":
      return { ...r, isLoading: e.payload };
    case "SET_ERROR":
      return { ...r, error: e.payload };
    default:
      return r;
  }
}
const pt = Gt(void 0), gr = ({ children: r }) => {
  const [e, t] = Yt(lr, ir), n = I(async (w) => {
    try {
      t({ type: "SET_LOADING", payload: !0 }), t({ type: "SET_ERROR", payload: null });
      const T = await ee.importMedia(w);
      return t({ type: "ADD_ITEMS", payload: T }), T;
    } catch (T) {
      return t({ type: "SET_ERROR", payload: T }), [];
    } finally {
      t({ type: "SET_LOADING", payload: !1 });
    }
  }, []), s = I(async (w) => {
    try {
      t({ type: "SET_LOADING", payload: !0 }), t({ type: "SET_ERROR", payload: null });
      const T = w || e.filter;
      w && t({ type: "SET_FILTER", payload: w });
      const F = await ee.getMediaItems(T);
      t({ type: "SET_ITEMS", payload: F });
    } catch (T) {
      t({ type: "SET_ERROR", payload: T });
    } finally {
      t({ type: "SET_LOADING", payload: !1 });
    }
  }, [e.filter]), u = I(async (w, T) => {
    try {
      t({ type: "SET_ERROR", payload: null });
      const F = await ee.updateMedia(w, T);
      return t({ type: "UPDATE_ITEM", payload: F }), F;
    } catch (F) {
      throw t({ type: "SET_ERROR", payload: F }), F;
    }
  }, []), p = I(async (w) => {
    try {
      t({ type: "SET_ERROR", payload: null });
      const T = await ee.deleteMedia(w);
      return T && t({ type: "REMOVE_ITEM", payload: w }), T;
    } catch (T) {
      return t({ type: "SET_ERROR", payload: T }), !1;
    }
  }, []), l = I((w) => {
    e.selectedItems.includes(w) || t({ type: "SELECT_ITEM", payload: w });
  }, [e.selectedItems]), f = I((w) => {
    t({ type: "DESELECT_ITEM", payload: w });
  }, []), g = I(() => {
    t({ type: "SELECT_ALL" });
  }, []), y = I(() => {
    t({ type: "DESELECT_ALL" });
  }, []), S = I((w) => {
    t({ type: "SET_FILTER", payload: w });
  }, []), b = {
    state: e,
    importMedia: n,
    refreshMedia: s,
    updateMedia: u,
    deleteMedia: p,
    selectItem: l,
    deselectItem: f,
    selectAll: g,
    deselectAll: y,
    setFilter: S
  };
  return /* @__PURE__ */ o.jsx(pt.Provider, { value: b, children: r });
}, ft = () => {
  const r = Kt(pt);
  if (r === void 0)
    throw new Error("useMedia must be used within a MediaProvider");
  return r;
}, cr = ({
  selectedCount: r,
  totalCount: e,
  filter: t,
  onImport: n,
  onFilterChange: s,
  onDeleteSelected: u,
  onRefresh: p
}) => {
  var R, E, d, x, M, W, ae, V, Q;
  const { state: l } = ft(), [f, g] = Z(t.search || ""), [y, S] = Z(!1), [b, w] = Z([]), T = Ee(null);
  De(() => {
    const D = /* @__PURE__ */ new Set();
    l.items.forEach((z) => {
      z.tags.forEach((G) => D.add(G));
    }), w(Array.from(D).sort());
  }, [l.items]);
  const F = I((D) => {
    const z = D.target.value;
    g(z), T.current && clearTimeout(T.current), T.current = setTimeout(() => {
      s({ ...t, search: z });
    }, 300);
  }, [t, s]), H = I((D, z) => {
    const G = t.type || [];
    let $;
    z ? $ = [...G, D] : $ = G.filter((te) => te !== D), s({ ...t, type: $.length > 0 ? $ : void 0 });
  }, [t, s]), C = I((D) => {
    const z = D.target.checked;
    s({ ...t, favorite: z ? !0 : void 0 });
  }, [t, s]), A = I((D, z) => {
    const G = t.tags || [];
    let $;
    z ? $ = [...G, D] : $ = G.filter((te) => te !== D), s({ ...t, tags: $.length > 0 ? $ : void 0 });
  }, [t, s]), se = I((D) => {
    const z = D.target.value, [G, $] = z.split("-");
    s({
      ...t,
      sortBy: G,
      sortDirection: $
    });
  }, [t, s]), ie = `${t.sortBy || "name"}-${t.sortDirection || "asc"}`, le = I(() => {
    g(""), s({});
  }, [s]);
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "media-toolbar",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px",
        backgroundColor: "#212121",
        borderBottom: "1px solid #333"
      },
      children: [
        /* @__PURE__ */ o.jsxs(
          "div",
          {
            className: "media-toolbar-main",
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: "media-toolbar-left",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1"
                  },
                  children: [
                    /* @__PURE__ */ o.jsxs(
                      "div",
                      {
                        className: "search-container",
                        style: {
                          flex: "1",
                          position: "relative",
                          maxWidth: "300px"
                        },
                        children: [
                          /* @__PURE__ */ o.jsx(
                            "input",
                            {
                              type: "text",
                              placeholder: "미디어 검색...",
                              value: f,
                              onChange: F,
                              style: {
                                width: "100%",
                                padding: "8px 12px",
                                paddingLeft: "32px",
                                backgroundColor: "#333",
                                border: "none",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "14px"
                              }
                            }
                          ),
                          /* @__PURE__ */ o.jsx(
                            "span",
                            {
                              style: {
                                position: "absolute",
                                left: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#aaa"
                              },
                              children: "🔍"
                            }
                          ),
                          f && /* @__PURE__ */ o.jsx(
                            "button",
                            {
                              onClick: () => {
                                g(""), s({ ...t, search: void 0 });
                              },
                              style: {
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                color: "#aaa",
                                cursor: "pointer",
                                fontSize: "14px"
                              },
                              children: "✕"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ o.jsxs(
                      "select",
                      {
                        value: ie,
                        onChange: se,
                        style: {
                          padding: "7px 8px",
                          backgroundColor: "#333",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "14px"
                        },
                        children: [
                          /* @__PURE__ */ o.jsx("option", { value: "name-asc", children: "이름 (A-Z)" }),
                          /* @__PURE__ */ o.jsx("option", { value: "name-desc", children: "이름 (Z-A)" }),
                          /* @__PURE__ */ o.jsx("option", { value: "importedAt-desc", children: "최근 추가" }),
                          /* @__PURE__ */ o.jsx("option", { value: "createdAt-desc", children: "생성일 (최신)" }),
                          /* @__PURE__ */ o.jsx("option", { value: "createdAt-asc", children: "생성일 (오래된)" }),
                          /* @__PURE__ */ o.jsx("option", { value: "size-desc", children: "크기 (큰 순)" }),
                          /* @__PURE__ */ o.jsx("option", { value: "size-asc", children: "크기 (작은 순)" }),
                          /* @__PURE__ */ o.jsx("option", { value: "duration-desc", children: "길이 (긴 순)" }),
                          /* @__PURE__ */ o.jsx("option", { value: "duration-asc", children: "길이 (짧은 순)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ o.jsxs(
                      "button",
                      {
                        onClick: () => S(!y),
                        title: y ? "필터 숨기기" : "필터 표시",
                        style: {
                          padding: "7px 10px",
                          backgroundColor: (R = t.type) != null && R.length || (E = t.tags) != null && E.length || t.favorite ? "#2196f3" : "#333",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "14px",
                          cursor: "pointer"
                        },
                        children: [
                          y ? "▲" : "▼",
                          " 필터",
                          (((d = t.type) == null ? void 0 : d.length) || ((x = t.tags) == null ? void 0 : x.length) || t.favorite) && /* @__PURE__ */ o.jsx("span", { style: { marginLeft: "5px", fontSize: "12px", backgroundColor: "#fff", color: "#333", borderRadius: "50%", padding: "0 5px" }, children: (((M = t.type) == null ? void 0 : M.length) || 0) + (((W = t.tags) == null ? void 0 : W.length) || 0) + (t.favorite ? 1 : 0) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "button",
                      {
                        onClick: le,
                        title: "필터 초기화",
                        style: {
                          padding: "7px 10px",
                          backgroundColor: "#333",
                          border: "none",
                          borderRadius: "4px",
                          color: "#aaa",
                          fontSize: "14px",
                          cursor: "pointer"
                        },
                        children: "↺"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: "media-toolbar-right",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [
                    /* @__PURE__ */ o.jsx(
                      "div",
                      {
                        className: "selection-counter",
                        style: {
                          color: "#aaa",
                          fontSize: "14px"
                        },
                        children: r > 0 ? `${r}개 선택됨` : `${e}개 항목`
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "button",
                      {
                        onClick: p,
                        title: "새로고침",
                        style: {
                          padding: "8px 12px",
                          backgroundColor: "#333",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "14px",
                          cursor: "pointer"
                        },
                        children: "↻"
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "button",
                      {
                        onClick: u,
                        disabled: r === 0,
                        style: {
                          padding: "8px 12px",
                          backgroundColor: r === 0 ? "#333" : "#e53935",
                          border: "none",
                          borderRadius: "4px",
                          color: r === 0 ? "#777" : "#fff",
                          fontSize: "14px",
                          cursor: r === 0 ? "default" : "pointer",
                          opacity: r === 0 ? 0.7 : 1
                        },
                        children: "삭제"
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "button",
                      {
                        onClick: n,
                        style: {
                          padding: "8px 16px",
                          backgroundColor: "#2196f3",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "14px",
                          cursor: "pointer"
                        },
                        children: "미디어 추가"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        y && /* @__PURE__ */ o.jsxs(
          "div",
          {
            className: "media-toolbar-filters",
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "14px",
              color: "#ccc",
              backgroundColor: "#2a2a2a",
              padding: "12px",
              borderRadius: "4px"
            },
            children: [
              /* @__PURE__ */ o.jsxs("div", { className: "filter-group", children: [
                /* @__PURE__ */ o.jsx("div", { style: { marginBottom: "8px", fontWeight: "bold" }, children: "미디어 타입" }),
                /* @__PURE__ */ o.jsxs("div", { style: { display: "flex", gap: "12px" }, children: [
                  /* @__PURE__ */ o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: ((ae = t.type) == null ? void 0 : ae.includes(h.VIDEO)) || !1,
                        onChange: (D) => H(h.VIDEO, D.target.checked)
                      }
                    ),
                    "비디오"
                  ] }),
                  /* @__PURE__ */ o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: ((V = t.type) == null ? void 0 : V.includes(h.AUDIO)) || !1,
                        onChange: (D) => H(h.AUDIO, D.target.checked)
                      }
                    ),
                    "오디오"
                  ] }),
                  /* @__PURE__ */ o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: ((Q = t.type) == null ? void 0 : Q.includes(h.IMAGE)) || !1,
                        onChange: (D) => H(h.IMAGE, D.target.checked)
                      }
                    ),
                    "이미지"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ o.jsx("div", { className: "filter-group", children: /* @__PURE__ */ o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.favorite || !1,
                    onChange: C
                  }
                ),
                "즐겨찾기만 표시"
              ] }) }),
              b.length > 0 && /* @__PURE__ */ o.jsxs("div", { className: "filter-group", children: [
                /* @__PURE__ */ o.jsx("div", { style: { marginBottom: "8px", fontWeight: "bold" }, children: "태그" }),
                /* @__PURE__ */ o.jsx("div", { style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  maxHeight: "100px",
                  overflowY: "auto",
                  padding: "4px"
                }, children: b.map((D) => {
                  var z, G, $, te;
                  return /* @__PURE__ */ o.jsxs(
                    "label",
                    {
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        backgroundColor: (z = t.tags) != null && z.includes(D) ? "#2196f3" : "#454545",
                        color: (G = t.tags) != null && G.includes(D) ? "#fff" : "#ddd",
                        padding: "4px 8px",
                        borderRadius: "16px",
                        fontSize: "12px",
                        cursor: "pointer"
                      },
                      children: [
                        /* @__PURE__ */ o.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: (($ = t.tags) == null ? void 0 : $.includes(D)) || !1,
                            onChange: (fe) => A(D, fe.target.checked),
                            style: { display: "none" }
                          }
                        ),
                        D,
                        ((te = t.tags) == null ? void 0 : te.includes(D)) && /* @__PURE__ */ o.jsx(
                          "span",
                          {
                            onClick: (fe) => {
                              fe.preventDefault(), A(D, !1);
                            },
                            style: { marginLeft: "2px", fontSize: "10px" },
                            children: "✕"
                          }
                        )
                      ]
                    },
                    D
                  );
                }) })
              ] })
            ]
          }
        )
      ]
    }
  );
};
function ht(r) {
  if (r === 0)
    return "0 Bytes";
  const e = 1024, t = ["Bytes", "KB", "MB", "GB", "TB"], n = Math.floor(Math.log(r) / Math.log(e));
  return parseFloat((r / Math.pow(e, n)).toFixed(2)) + " " + t[n];
}
function gt(r) {
  if (isNaN(r))
    return "00:00";
  const e = Math.floor(r / 3600), t = Math.floor(r % 3600 / 60), n = Math.floor(r % 60), s = (u) => u.toString().padStart(2, "0");
  return e > 0 ? `${s(e)}:${s(t)}:${s(n)}` : `${s(t)}:${s(n)}`;
}
function ct(r) {
  return typeof r == "string" && (r = new Date(r)), r.toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function mr(r) {
  var t;
  const e = r.split(".");
  return e.length > 1 && ((t = e.pop()) == null ? void 0 : t.toLowerCase()) || "";
}
function xr(r) {
  return r.split(/[\\/]/).pop() || "";
}
const dr = ({
  item: r,
  isSelected: e,
  onSelect: t,
  onDoubleClick: n,
  onContextMenu: s,
  onDragStart: u
}) => {
  const [p, l] = Z(!1), f = (b) => {
    switch (b) {
      case h.VIDEO:
        return "🎬";
      case h.AUDIO:
        return "🎵";
      case h.IMAGE:
        return "🖼️";
      default:
        return "📁";
    }
  }, g = (b) => {
    switch (b) {
      case h.VIDEO:
        return "#3949ab";
      case h.AUDIO:
        return "#3498db";
      case h.IMAGE:
        return "#43a047";
      default:
        return "#333";
    }
  }, y = (b) => {
    l(!0);
    const w = {
      id: r.id,
      type: r.type,
      name: r.name,
      duration: r.metadata.duration
    };
    if (b.dataTransfer.setData("application/json", JSON.stringify(w)), b.dataTransfer.effectAllowed = "copy", u && u(b, r), r.thumbnail) {
      const T = new Image();
      T.src = r.thumbnail, b.dataTransfer.setDragImage(T, 0, 0);
    }
  }, S = () => {
    l(!1);
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: `media-item ${e ? "selected" : ""} ${p ? "dragging" : ""}`,
      onClick: () => t(r.id),
      onDoubleClick: () => n && n(r),
      onContextMenu: (b) => s && s(b, r),
      draggable: !0,
      onDragStart: y,
      onDragEnd: S,
      "data-media-id": r.id,
      "data-media-type": r.type,
      style: {
        position: "relative",
        width: "180px",
        margin: "8px",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "#232323",
        border: e ? "2px solid #2196f3" : "2px solid transparent",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        opacity: p ? 0.6 : 1
      },
      children: [
        /* @__PURE__ */ o.jsxs(
          "div",
          {
            className: "media-thumbnail",
            style: {
              position: "relative",
              width: "100%",
              height: "120px",
              backgroundColor: r.thumbnail ? "#333" : g(r.type),
              backgroundImage: r.thumbnail ? `url(${r.thumbnail})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: [
              !r.thumbnail && /* @__PURE__ */ o.jsx("span", { style: { fontSize: "2rem" }, children: f(r.type) }),
              /* @__PURE__ */ o.jsx(
                "div",
                {
                  className: "media-type-badge",
                  style: {
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px"
                  },
                  children: r.type === h.AUDIO ? "MP3" : r.type
                }
              ),
              r.favorite && /* @__PURE__ */ o.jsx(
                "div",
                {
                  className: "favorite-badge",
                  style: {
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    color: "#ffcf00",
                    fontSize: "16px"
                  },
                  children: "★"
                }
              ),
              r.metadata.duration && (r.type === h.VIDEO || r.type === h.AUDIO) && /* @__PURE__ */ o.jsx(
                "div",
                {
                  className: "duration-badge",
                  style: {
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px"
                  },
                  children: gt(r.metadata.duration)
                }
              ),
              /* @__PURE__ */ o.jsx(
                "div",
                {
                  className: "drag-hint",
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    display: e ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    opacity: 0,
                    transition: "opacity 0.2s ease"
                  },
                  children: "타임라인에 드래그"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o.jsxs(
          "div",
          {
            className: "media-info",
            style: {
              padding: "8px",
              color: "white"
            },
            children: [
              /* @__PURE__ */ o.jsx(
                "div",
                {
                  className: "media-name",
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  title: r.name,
                  children: r.name
                }
              ),
              /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: "media-details",
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#aaa"
                  },
                  children: [
                    /* @__PURE__ */ o.jsx("span", { children: ht(r.size) }),
                    r.metadata.width && r.metadata.height && /* @__PURE__ */ o.jsxs("span", { children: [
                      r.metadata.width,
                      " × ",
                      r.metadata.height
                    ] })
                  ]
                }
              ),
              r.tags.length > 0 && /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: "media-tags",
                  style: {
                    marginTop: "4px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px"
                  },
                  children: [
                    r.tags.slice(0, 2).map((b, w) => /* @__PURE__ */ o.jsx(
                      "span",
                      {
                        style: {
                          backgroundColor: "#454545",
                          color: "#ddd",
                          padding: "2px 4px",
                          borderRadius: "4px",
                          fontSize: "10px"
                        },
                        children: b
                      },
                      w
                    )),
                    r.tags.length > 2 && /* @__PURE__ */ o.jsxs(
                      "span",
                      {
                        style: {
                          color: "#aaa",
                          fontSize: "10px"
                        },
                        children: [
                          "+",
                          r.tags.length - 2
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o.jsx("style", { children: `
        .media-item:hover .drag-hint {
          opacity: 1;
        }
        
        .media-item.dragging {
          transform: scale(0.95);
        }
        ` })
      ]
    }
  );
}, ur = ({
  items: r,
  selectedItems: e,
  onSelectItem: t,
  onItemDoubleClick: n,
  onItemContextMenu: s,
  onItemDragStart: u
}) => {
  const p = I((f, g) => {
    const y = (g == null ? void 0 : g.ctrlKey) || (g == null ? void 0 : g.metaKey) || (g == null ? void 0 : g.shiftKey);
    t(f, y);
  }, [t]), l = I((f) => {
    f.target === f.currentTarget && t("", !1);
  }, [t]);
  return /* @__PURE__ */ o.jsx(
    "div",
    {
      className: "media-grid",
      onClick: l,
      style: {
        display: "flex",
        flexWrap: "wrap",
        padding: "16px",
        overflow: "auto",
        height: "100%",
        backgroundColor: "#1a1a1a"
      },
      children: r.length === 0 ? /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: "media-grid-empty",
          style: {
            width: "100%",
            textAlign: "center",
            color: "#777",
            padding: "32px",
            fontSize: "16px"
          },
          children: [
            /* @__PURE__ */ o.jsx("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "📁" }),
            /* @__PURE__ */ o.jsx("p", { children: "미디어 파일이 없습니다" }),
            /* @__PURE__ */ o.jsx("p", { style: { fontSize: "14px" }, children: "파일을 드래그하거나 추가 버튼을 클릭하여 미디어를 가져오세요" })
          ]
        }
      ) : r.map((f) => /* @__PURE__ */ o.jsx(
        dr,
        {
          item: f,
          isSelected: e.includes(f.id),
          onSelect: (g) => p(g),
          onDoubleClick: n,
          onContextMenu: s,
          onDragStart: u
        },
        f.id
      ))
    }
  );
}, pr = ({
  item: r,
  onClose: e,
  onFavoriteToggle: t,
  onTagAdd: n,
  onTagRemove: s
}) => {
  const [u, p] = Z(""), [l, f] = Z(!1), g = Ee(null), y = Ee(null), S = Ee(null);
  De(() => {
    const C = g.current, A = y.current;
    return () => {
      C && C.pause(), A && A.pause();
    };
  }, [r.id]);
  const b = async () => {
    await t(r.id, !r.favorite);
  }, w = async (C) => {
    var A;
    C.preventDefault(), u.trim() !== "" && (await n(r.id, u.trim()), p(""), (A = S.current) == null || A.focus());
  }, T = async (C) => {
    await s(r.id, C);
  }, F = (C) => {
    if (C.dataTransfer.setData("application/json", JSON.stringify({
      id: r.id,
      type: r.type,
      name: r.name,
      duration: r.metadata.duration
    })), r.thumbnail) {
      const A = new Image();
      A.src = r.thumbnail, C.dataTransfer.setDragImage(A, 0, 0);
    }
    C.dataTransfer.effectAllowed = "copy";
  }, H = () => {
    switch (r.type) {
      case h.VIDEO:
        return /* @__PURE__ */ o.jsxs("div", { className: "video-container", style: { position: "relative" }, children: [
          /* @__PURE__ */ o.jsx(
            "video",
            {
              ref: g,
              src: r.url,
              controls: !0,
              style: {
                width: "100%",
                height: "auto",
                maxHeight: "250px",
                backgroundColor: "#000",
                objectFit: "contain"
              }
            }
          ),
          /* @__PURE__ */ o.jsx(
            "div",
            {
              className: "drag-overlay",
              draggable: !0,
              onDragStart: F,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                color: "transparent",
                cursor: "grab",
                zIndex: 1,
                opacity: 0,
                transition: "all 0.2s ease"
              },
              children: "타임라인에 드래그"
            }
          )
        ] });
      case h.AUDIO:
        return /* @__PURE__ */ o.jsxs("div", { style: { padding: "20px", textAlign: "center", position: "relative" }, children: [
          /* @__PURE__ */ o.jsx(
            "audio",
            {
              ref: y,
              src: r.url,
              controls: !0,
              style: { width: "100%" }
            }
          ),
          /* @__PURE__ */ o.jsx(
            "div",
            {
              style: {
                marginTop: "16px",
                fontSize: "48px",
                color: "#aaa"
              },
              draggable: !0,
              onDragStart: F,
              children: "🎵"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "div",
            {
              className: "drag-hint",
              style: {
                marginTop: "8px",
                fontSize: "12px",
                color: "#888"
              },
              children: "타임라인에 드래그하여 추가"
            }
          )
        ] });
      case h.IMAGE:
        return /* @__PURE__ */ o.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ o.jsx(
            "img",
            {
              src: r.url,
              alt: r.name,
              style: {
                width: "100%",
                height: "auto",
                maxHeight: "250px",
                objectFit: "contain"
              },
              draggable: !0,
              onDragStart: F
            }
          ),
          /* @__PURE__ */ o.jsx(
            "div",
            {
              className: "drag-hint",
              style: {
                position: "absolute",
                bottom: "8px",
                right: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                opacity: 0,
                transition: "opacity 0.2s ease"
              },
              children: "드래그하여 타임라인에 추가"
            }
          )
        ] });
      default:
        return /* @__PURE__ */ o.jsx("div", { style: { padding: "20px", textAlign: "center", color: "#aaa" }, children: "미리보기를 사용할 수 없음" });
    }
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "media-preview",
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#232323"
      },
      children: [
        /* @__PURE__ */ o.jsxs(
          "div",
          {
            className: "preview-header",
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid #333"
            },
            children: [
              /* @__PURE__ */ o.jsx(
                "h3",
                {
                  style: {
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: r.name,
                  children: r.name
                }
              ),
              /* @__PURE__ */ o.jsxs("div", { className: "preview-actions", children: [
                /* @__PURE__ */ o.jsx(
                  "button",
                  {
                    onClick: b,
                    title: r.favorite ? "즐겨찾기 해제" : "즐겨찾기 추가",
                    style: {
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      color: r.favorite ? "#ffcf00" : "#777",
                      cursor: "pointer",
                      marginRight: "8px"
                    },
                    children: r.favorite ? "★" : "☆"
                  }
                ),
                /* @__PURE__ */ o.jsx(
                  "button",
                  {
                    onClick: e,
                    title: "미리보기 닫기",
                    style: {
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      color: "#777",
                      cursor: "pointer"
                    },
                    children: "✕"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ o.jsx(
          "div",
          {
            className: "preview-content",
            style: {
              borderBottom: "1px solid #333"
            },
            children: H()
          }
        ),
        /* @__PURE__ */ o.jsxs(
          "div",
          {
            className: "preview-details",
            style: {
              flex: 1,
              overflow: "auto",
              padding: "16px"
            },
            children: [
              /* @__PURE__ */ o.jsx(
                "table",
                {
                  style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px"
                  },
                  children: /* @__PURE__ */ o.jsxs("tbody", { children: [
                    /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa",
                            width: "40%"
                          },
                          children: "타입"
                        }
                      ),
                      /* @__PURE__ */ o.jsx("td", { style: { padding: "4px 0" }, children: r.type.charAt(0).toUpperCase() + r.type.slice(1) })
                    ] }),
                    /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "크기"
                        }
                      ),
                      /* @__PURE__ */ o.jsx("td", { style: { padding: "4px 0" }, children: ht(r.size) })
                    ] }),
                    r.metadata.duration !== void 0 && /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "길이"
                        }
                      ),
                      /* @__PURE__ */ o.jsx("td", { style: { padding: "4px 0" }, children: gt(r.metadata.duration) })
                    ] }),
                    r.metadata.width && r.metadata.height && /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "해상도"
                        }
                      ),
                      /* @__PURE__ */ o.jsxs("td", { style: { padding: "4px 0" }, children: [
                        r.metadata.width,
                        " × ",
                        r.metadata.height
                      ] })
                    ] }),
                    r.metadata.frameRate !== void 0 && /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "프레임 레이트"
                        }
                      ),
                      /* @__PURE__ */ o.jsxs("td", { style: { padding: "4px 0" }, children: [
                        r.metadata.frameRate,
                        " fps"
                      ] })
                    ] }),
                    r.metadata.codec && /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "코덱"
                        }
                      ),
                      /* @__PURE__ */ o.jsx("td", { style: { padding: "4px 0" }, children: r.metadata.codec })
                    ] }),
                    r.metadata.channels !== void 0 && /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "오디오 채널"
                        }
                      ),
                      /* @__PURE__ */ o.jsxs("td", { style: { padding: "4px 0" }, children: [
                        r.metadata.channels,
                        "채널"
                      ] })
                    ] }),
                    r.metadata.sampleRate !== void 0 && /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "샘플 레이트"
                        }
                      ),
                      /* @__PURE__ */ o.jsxs("td", { style: { padding: "4px 0" }, children: [
                        r.metadata.sampleRate,
                        " Hz"
                      ] })
                    ] }),
                    /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "생성일"
                        }
                      ),
                      /* @__PURE__ */ o.jsx("td", { style: { padding: "4px 0" }, children: ct(r.createdAt) })
                    ] }),
                    /* @__PURE__ */ o.jsxs("tr", { children: [
                      /* @__PURE__ */ o.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "가져온 날짜"
                        }
                      ),
                      /* @__PURE__ */ o.jsx("td", { style: { padding: "4px 0" }, children: ct(r.importedAt) })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: "tags-section",
                  style: {
                    marginTop: "16px"
                  },
                  children: [
                    /* @__PURE__ */ o.jsx(
                      "h4",
                      {
                        style: {
                          margin: "0 0 8px 0",
                          fontSize: "14px",
                          color: "#ccc"
                        },
                        children: "태그"
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "div",
                      {
                        className: "tags-list",
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginBottom: "12px"
                        },
                        children: r.tags.length === 0 ? /* @__PURE__ */ o.jsx(
                          "div",
                          {
                            style: {
                              color: "#777",
                              fontSize: "13px",
                              fontStyle: "italic"
                            },
                            children: "태그 없음"
                          }
                        ) : r.tags.map((C, A) => /* @__PURE__ */ o.jsxs(
                          "div",
                          {
                            className: "tag",
                            style: {
                              backgroundColor: "#454545",
                              color: "#fff",
                              padding: "4px 8px",
                              borderRadius: "16px",
                              fontSize: "13px",
                              display: "flex",
                              alignItems: "center"
                            },
                            children: [
                              /* @__PURE__ */ o.jsx("span", { children: C }),
                              /* @__PURE__ */ o.jsx(
                                "button",
                                {
                                  onClick: () => T(C),
                                  title: `태그 삭제: ${C}`,
                                  style: {
                                    background: "none",
                                    border: "none",
                                    color: "#aaa",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    marginLeft: "4px",
                                    padding: "0 2px"
                                  },
                                  children: "✕"
                                }
                              )
                            ]
                          },
                          A
                        ))
                      }
                    ),
                    /* @__PURE__ */ o.jsx("form", { onSubmit: w, children: /* @__PURE__ */ o.jsxs(
                      "div",
                      {
                        className: `tag-input-container ${l ? "focused" : ""}`,
                        style: {
                          display: "flex",
                          position: "relative"
                        },
                        children: [
                          /* @__PURE__ */ o.jsx(
                            "input",
                            {
                              ref: S,
                              type: "text",
                              value: u,
                              onChange: (C) => p(C.target.value),
                              onFocus: () => f(!0),
                              onBlur: () => f(!1),
                              placeholder: "새 태그 추가...",
                              style: {
                                flex: 1,
                                padding: "6px 10px",
                                backgroundColor: "#333",
                                border: l ? "1px solid #2196f3" : "1px solid #444",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "13px",
                                outline: "none",
                                transition: "border-color 0.2s ease"
                              }
                            }
                          ),
                          /* @__PURE__ */ o.jsx(
                            "button",
                            {
                              type: "submit",
                              disabled: !u.trim(),
                              style: {
                                padding: "6px 12px",
                                backgroundColor: u.trim() ? "#2196f3" : "#444",
                                border: "none",
                                borderRadius: "0 4px 4px 0",
                                color: "#fff",
                                fontSize: "13px",
                                cursor: u.trim() ? "pointer" : "default",
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0
                              },
                              children: "추가"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ o.jsxs(
                      "div",
                      {
                        className: "timeline-hint",
                        style: {
                          marginTop: "16px",
                          padding: "8px 12px",
                          backgroundColor: "rgba(33, 150, 243, 0.1)",
                          borderRadius: "4px",
                          fontSize: "13px",
                          color: "#2196f3",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "grab"
                        },
                        draggable: !0,
                        onDragStart: F,
                        children: [
                          /* @__PURE__ */ o.jsx("span", { style: { fontSize: "16px" }, children: "↗️" }),
                          /* @__PURE__ */ o.jsx("span", { children: "이 미디어를 타임라인으로 드래그하여 추가하세요" })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o.jsx("style", { children: `
        .video-container:hover .drag-overlay {
          opacity: 1;
        }
        
        .preview-content:hover .drag-hint {
          opacity: 1;
        }
        ` })
      ]
    }
  );
}, yr = ({
  onSelect: r,
  onDragStart: e
}) => {
  const {
    state: { items: t, selectedItems: n, filter: s, isLoading: u },
    importMedia: p,
    refreshMedia: l,
    updateMedia: f,
    deleteMedia: g,
    selectItem: y,
    deselectItem: S,
    deselectAll: b,
    setFilter: w
  } = ft(), [T, F] = Z(null), H = Ee(null), C = I(() => {
    var d;
    (d = H.current) == null || d.click();
  }, []), A = I(async (d) => {
    const x = d.target.files;
    !x || x.length === 0 || (await p(Array.from(x)), d.target.value = "");
  }, [p]), se = I(async (d) => {
    d.preventDefault(), d.stopPropagation();
    const x = d.dataTransfer.files;
    x.length !== 0 && await p(Array.from(x));
  }, [p]), ie = I((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), le = I((d, x = !1) => {
    if (d === "") {
      b(), F(null);
      return;
    }
    x ? n.includes(d) ? S(d) : y(d) : (b(), y(d));
    const M = t.find((W) => W.id === d);
    M && F(M);
  }, [n, t, y, S, b]), R = I((d) => {
    r && r([d]);
  }, [r]), E = I(async () => {
    if (!(n.length === 0 || !window.confirm(`선택한 ${n.length}개 항목을 삭제하시겠습니까?`))) {
      for (const x of n)
        await g(x);
      F(null);
    }
  }, [n, g]);
  return De(() => {
    (async () => {
      try {
        await l();
      } catch (x) {
        console.error("미디어 로드 실패:", x);
      }
    })();
  }, []), /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "media-manager",
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#1a1a1a",
        color: "#fff"
      },
      onDrop: se,
      onDragOver: ie,
      children: [
        /* @__PURE__ */ o.jsx(
          cr,
          {
            selectedCount: n.length,
            totalCount: t.length,
            filter: s,
            onImport: C,
            onFilterChange: w,
            onDeleteSelected: E,
            onRefresh: () => l()
          }
        ),
        /* @__PURE__ */ o.jsxs(
          "div",
          {
            className: "media-content",
            style: {
              display: "flex",
              flex: 1,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: "media-grid-container",
                  style: {
                    flex: 3,
                    overflow: "hidden",
                    position: "relative",
                    borderRight: "1px solid #333"
                  },
                  children: [
                    u && /* @__PURE__ */ o.jsx(
                      "div",
                      {
                        className: "loading-overlay",
                        style: {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          zIndex: 10
                        },
                        children: /* @__PURE__ */ o.jsx("div", { className: "spinner", style: { color: "#fff", fontSize: "16px" }, children: "로딩 중..." })
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      ur,
                      {
                        items: t,
                        selectedItems: n,
                        onSelectItem: le,
                        onItemDoubleClick: R,
                        onItemDragStart: e
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ o.jsx(
                "div",
                {
                  className: "media-preview-container",
                  style: {
                    flex: 1,
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                  },
                  children: T ? /* @__PURE__ */ o.jsx(
                    pr,
                    {
                      item: T,
                      onClose: () => F(null),
                      onFavoriteToggle: async (d, x) => {
                        await f(d, { favorite: x });
                      },
                      onTagAdd: async (d, x) => {
                        const M = t.find((W) => W.id === d);
                        M && !M.tags.includes(x) && await f(d, { tags: [...M.tags, x] });
                      },
                      onTagRemove: async (d, x) => {
                        const M = t.find((W) => W.id === d);
                        M && await f(d, { tags: M.tags.filter((W) => W !== x) });
                      }
                    }
                  ) : /* @__PURE__ */ o.jsxs(
                    "div",
                    {
                      className: "no-preview",
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#777",
                        padding: "20px",
                        textAlign: "center"
                      },
                      children: [
                        /* @__PURE__ */ o.jsx("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "👆" }),
                        /* @__PURE__ */ o.jsx("p", { children: "항목을 선택하여 미리보기" }),
                        /* @__PURE__ */ o.jsx("p", { style: { fontSize: "14px", marginTop: "8px" }, children: "미디어 파일을 선택하면 미리보기와 상세 정보가 표시됩니다" })
                      ]
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "file",
            ref: H,
            onChange: A,
            multiple: !0,
            accept: "audio/mp3,.mp3",
            style: { display: "none" }
          }
        )
      ]
    }
  );
}, vr = () => {
  const [r, e] = Z([]), [t, n] = Z([]), [s, u] = Z(!1), [p, l] = Z(null), [f, g] = Z({}), y = I(async (R) => {
    try {
      u(!0), l(null), await de.load();
      const E = await ee.importMedia(R);
      return e((d) => [...d, ...E]), E;
    } catch (E) {
      const d = E instanceof Error ? E : new Error("미디어 임포트 중 오류 발생");
      return l(d), [];
    } finally {
      u(!1);
    }
  }, []), S = I(async (R) => {
    try {
      u(!0), l(null);
      const E = R || f;
      R && g(R);
      const d = await ee.getMediaItems(E);
      e(d);
    } catch (E) {
      const d = E instanceof Error ? E : new Error("미디어 새로고침 중 오류 발생");
      l(d);
    } finally {
      u(!1);
    }
  }, [f]), b = I(async (R, E) => {
    try {
      l(null);
      const d = await ee.updateMedia(R, E);
      return e((x) => x.map(
        (M) => M.id === R ? d : M
      )), d;
    } catch (d) {
      const x = d instanceof Error ? d : new Error("미디어 업데이트 중 오류 발생");
      throw l(x), x;
    }
  }, []), w = I(async (R) => {
    try {
      l(null);
      const E = await ee.deleteMedia(R);
      return E && (e((d) => d.filter((x) => x.id !== R)), n((d) => d.filter((x) => x !== R))), E;
    } catch (E) {
      const d = E instanceof Error ? E : new Error("미디어 삭제 중 오류 발생");
      return l(d), !1;
    }
  }, []), T = I(async (R) => {
    try {
      return l(null), await de.load(), await ee.extractMetadata(R);
    } catch (E) {
      const d = E instanceof Error ? E : new Error("메타데이터 추출 중 오류 발생");
      throw l(d), d;
    }
  }, []), F = I(async (R, E) => {
    try {
      l(null);
      const d = await ee.generateThumbnail(R, E);
      return e((x) => x.map(
        (M) => M.id === R.id ? { ...M, thumbnail: d } : M
      )), d;
    } catch (d) {
      const x = d instanceof Error ? d : new Error("썸네일 생성 중 오류 발생");
      throw l(x), x;
    }
  }, []), H = I(async (R, E, d, x = {}) => {
    try {
      const M = /* @__PURE__ */ new Date(), ae = {
        id: ut(),
        name: R,
        type: E,
        path: d,
        url: d,
        size: 0,
        // 외부 URL은 파일 크기를 알 수 없음
        createdAt: M,
        importedAt: M,
        metadata: x,
        tags: [],
        favorite: !1,
        thumbnail: ""
      };
      return e((V) => [...V, ae]), ae;
    } catch (M) {
      const W = M instanceof Error ? M : new Error("미디어 항목 생성 중 오류 발생");
      throw l(W), W;
    }
  }, []), C = I((R) => {
    n((E) => E.includes(R) ? E : [...E, R]);
  }, []), A = I((R) => {
    n((E) => E.filter((d) => d !== R));
  }, []), se = I(() => {
    n(r.map((R) => R.id));
  }, [r]), ie = I(() => {
    n([]);
  }, []), le = I((R) => {
    g(R), S(R);
  }, [S]);
  return De(() => (S(), () => {
    de.terminate().catch(console.error);
  }), [S]), {
    items: r,
    selectedItems: t,
    isLoading: s,
    error: p,
    filter: f,
    importMedia: y,
    refreshMedia: S,
    updateMedia: b,
    deleteMedia: w,
    extractMetadata: T,
    generateThumbnail: F,
    createMediaItem: H,
    selectItem: C,
    deselectItem: A,
    selectAll: se,
    deselectAll: ie,
    applyFilter: le
  };
};
export {
  de as FFmpegService,
  ur as MediaGrid,
  dr as MediaItem,
  yr as MediaManager,
  pr as MediaPreview,
  gr as MediaProvider,
  ee as MediaService,
  cr as MediaToolbar,
  h as MediaType,
  ct as formatDate,
  gt as formatDuration,
  ht as formatFileSize,
  xr as getBasename,
  mr as getFileExtension,
  vr as useMedia,
  ft as useMediaContext
};
