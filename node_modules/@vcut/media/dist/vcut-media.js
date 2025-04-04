var Bt = Object.defineProperty;
var Wt = (e, r, a) => r in e ? Bt(e, r, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[r] = a;
var F = (e, r, a) => (Wt(e, typeof r != "symbol" ? r + "" : r, a), a), tt = (e, r, a) => {
  if (!r.has(e))
    throw TypeError("Cannot " + a);
};
var y = (e, r, a) => (tt(e, r, "read from private field"), a ? a.call(e) : r.get(e)), ee = (e, r, a) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, a);
}, pe = (e, r, a, n) => (tt(e, r, "write to private field"), n ? n.call(e, a) : r.set(e, a), a);
import lt, { createContext as $t, useReducer as Vt, useContext as Gt, useState as Q, useRef as Ae, useCallback as O, useEffect as ct } from "react";
var Ce = { exports: {} }, he = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rt;
function Yt() {
  if (rt)
    return he;
  rt = 1;
  var e = lt, r = Symbol.for("react.element"), a = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(f, c, g) {
    var w, x = {}, C = null, R = null;
    g !== void 0 && (C = "" + g), c.key !== void 0 && (C = "" + c.key), c.ref !== void 0 && (R = c.ref);
    for (w in c)
      n.call(c, w) && !u.hasOwnProperty(w) && (x[w] = c[w]);
    if (f && f.defaultProps)
      for (w in c = f.defaultProps, c)
        x[w] === void 0 && (x[w] = c[w]);
    return { $$typeof: r, type: f, key: C, ref: R, props: x, _owner: s.current };
  }
  return he.Fragment = a, he.jsx = p, he.jsxs = p, he;
}
var ge = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function Zt() {
  return at || (at = 1, process.env.NODE_ENV !== "production" && function() {
    var e = lt, r = Symbol.for("react.element"), a = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), f = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), w = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), R = Symbol.for("react.offscreen"), I = Symbol.iterator, L = "@@iterator";
    function X(t) {
      if (t === null || typeof t != "object")
        return null;
      var o = I && t[I] || t[L];
      return typeof o == "function" ? o : null;
    }
    var V = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function M(t) {
      {
        for (var o = arguments.length, l = new Array(o > 1 ? o - 1 : 0), h = 1; h < o; h++)
          l[h - 1] = arguments[h];
        N("error", t, l);
      }
    }
    function N(t, o, l) {
      {
        var h = V.ReactDebugCurrentFrame, S = h.getStackAddendum();
        S !== "" && (o += "%s", l = l.concat([S]));
        var D = l.map(function(j) {
          return String(j);
        });
        D.unshift("Warning: " + o), Function.prototype.apply.call(console[t], console, D);
      }
    }
    var W = !1, J = !1, m = !1, v = !1, d = !1, E;
    E = Symbol.for("react.module.reference");
    function A(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === n || t === u || d || t === s || t === g || t === w || v || t === R || W || J || m || typeof t == "object" && t !== null && (t.$$typeof === C || t.$$typeof === x || t.$$typeof === p || t.$$typeof === f || t.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === E || t.getModuleId !== void 0));
    }
    function G(t, o, l) {
      var h = t.displayName;
      if (h)
        return h;
      var S = o.displayName || o.name || "";
      return S !== "" ? l + "(" + S + ")" : l;
    }
    function ce(t) {
      return t.displayName || "Context";
    }
    function Z(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && M("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case n:
          return "Fragment";
        case a:
          return "Portal";
        case u:
          return "Profiler";
        case s:
          return "StrictMode";
        case g:
          return "Suspense";
        case w:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case f:
            var o = t;
            return ce(o) + ".Consumer";
          case p:
            var l = t;
            return ce(l._context) + ".Provider";
          case c:
            return G(t, t.render, "ForwardRef");
          case x:
            var h = t.displayName || null;
            return h !== null ? h : Z(t.type) || "Memo";
          case C: {
            var S = t, D = S._payload, j = S._init;
            try {
              return Z(j(D));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var re = Object.assign, de = 0, Me, ke, Le, Ne, Pe, Fe, Ue;
    function ze() {
    }
    ze.__reactDisabledLog = !0;
    function ht() {
      {
        if (de === 0) {
          Me = console.log, ke = console.info, Le = console.warn, Ne = console.error, Pe = console.group, Fe = console.groupCollapsed, Ue = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: ze,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        de++;
      }
    }
    function gt() {
      {
        if (de--, de === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: re({}, t, {
              value: Me
            }),
            info: re({}, t, {
              value: ke
            }),
            warn: re({}, t, {
              value: Le
            }),
            error: re({}, t, {
              value: Ne
            }),
            group: re({}, t, {
              value: Pe
            }),
            groupCollapsed: re({}, t, {
              value: Fe
            }),
            groupEnd: re({}, t, {
              value: Ue
            })
          });
        }
        de < 0 && M("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var we = V.ReactCurrentDispatcher, Re;
    function me(t, o, l) {
      {
        if (Re === void 0)
          try {
            throw Error();
          } catch (S) {
            var h = S.stack.trim().match(/\n( *(at )?)/);
            Re = h && h[1] || "";
          }
        return `
` + Re + t;
      }
    }
    var Ie = !1, ye;
    {
      var mt = typeof WeakMap == "function" ? WeakMap : Map;
      ye = new mt();
    }
    function Be(t, o) {
      if (!t || Ie)
        return "";
      {
        var l = ye.get(t);
        if (l !== void 0)
          return l;
      }
      var h;
      Ie = !0;
      var S = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var D;
      D = we.current, we.current = null, ht();
      try {
        if (o) {
          var j = function() {
            throw Error();
          };
          if (Object.defineProperty(j.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(j, []);
            } catch ($) {
              h = $;
            }
            Reflect.construct(t, [], j);
          } else {
            try {
              j.call();
            } catch ($) {
              h = $;
            }
            t.call(j.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($) {
            h = $;
          }
          t();
        }
      } catch ($) {
        if ($ && h && typeof $.stack == "string") {
          for (var b = $.stack.split(`
`), z = h.stack.split(`
`), k = b.length - 1, P = z.length - 1; k >= 1 && P >= 0 && b[k] !== z[P]; )
            P--;
          for (; k >= 1 && P >= 0; k--, P--)
            if (b[k] !== z[P]) {
              if (k !== 1 || P !== 1)
                do
                  if (k--, P--, P < 0 || b[k] !== z[P]) {
                    var H = `
` + b[k].replace(" at new ", " at ");
                    return t.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", t.displayName)), typeof t == "function" && ye.set(t, H), H;
                  }
                while (k >= 1 && P >= 0);
              break;
            }
        }
      } finally {
        Ie = !1, we.current = D, gt(), Error.prepareStackTrace = S;
      }
      var le = t ? t.displayName || t.name : "", ae = le ? me(le) : "";
      return typeof t == "function" && ye.set(t, ae), ae;
    }
    function yt(t, o, l) {
      return Be(t, !1);
    }
    function xt(t) {
      var o = t.prototype;
      return !!(o && o.isReactComponent);
    }
    function xe(t, o, l) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Be(t, xt(t));
      if (typeof t == "string")
        return me(t);
      switch (t) {
        case g:
          return me("Suspense");
        case w:
          return me("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case c:
            return yt(t.render);
          case x:
            return xe(t.type, o, l);
          case C: {
            var h = t, S = h._payload, D = h._init;
            try {
              return xe(D(S), o, l);
            } catch {
            }
          }
        }
      return "";
    }
    var ue = Object.prototype.hasOwnProperty, We = {}, $e = V.ReactDebugCurrentFrame;
    function ve(t) {
      if (t) {
        var o = t._owner, l = xe(t.type, t._source, o ? o.type : null);
        $e.setExtraStackFrame(l);
      } else
        $e.setExtraStackFrame(null);
    }
    function vt(t, o, l, h, S) {
      {
        var D = Function.call.bind(ue);
        for (var j in t)
          if (D(t, j)) {
            var b = void 0;
            try {
              if (typeof t[j] != "function") {
                var z = Error((h || "React class") + ": " + l + " type `" + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[j] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw z.name = "Invariant Violation", z;
              }
              b = t[j](o, j, h, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              b = k;
            }
            b && !(b instanceof Error) && (ve(S), M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", h || "React class", l, j, typeof b), ve(null)), b instanceof Error && !(b.message in We) && (We[b.message] = !0, ve(S), M("Failed %s type: %s", l, b.message), ve(null));
          }
      }
    }
    var Et = Array.isArray;
    function je(t) {
      return Et(t);
    }
    function bt(t) {
      {
        var o = typeof Symbol == "function" && Symbol.toStringTag, l = o && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return l;
      }
    }
    function wt(t) {
      try {
        return Ve(t), !1;
      } catch {
        return !0;
      }
    }
    function Ve(t) {
      return "" + t;
    }
    function Ge(t) {
      if (wt(t))
        return M("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", bt(t)), Ve(t);
    }
    var fe = V.ReactCurrentOwner, Rt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ye, Ze, Se;
    Se = {};
    function It(t) {
      if (ue.call(t, "ref")) {
        var o = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (o && o.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function jt(t) {
      if (ue.call(t, "key")) {
        var o = Object.getOwnPropertyDescriptor(t, "key").get;
        if (o && o.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function St(t, o) {
      if (typeof t.ref == "string" && fe.current && o && fe.current.stateNode !== o) {
        var l = Z(fe.current.type);
        Se[l] || (M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Z(fe.current.type), t.ref), Se[l] = !0);
      }
    }
    function _t(t, o) {
      {
        var l = function() {
          Ye || (Ye = !0, M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        l.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function Tt(t, o) {
      {
        var l = function() {
          Ze || (Ze = !0, M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        l.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var Dt = function(t, o, l, h, S, D, j) {
      var b = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: o,
        ref: l,
        props: j,
        // Record the component responsible for creating this element.
        _owner: D
      };
      return b._store = {}, Object.defineProperty(b._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(b, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: h
      }), Object.defineProperty(b, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: S
      }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
    };
    function Ot(t, o, l, h, S) {
      {
        var D, j = {}, b = null, z = null;
        l !== void 0 && (Ge(l), b = "" + l), jt(o) && (Ge(o.key), b = "" + o.key), It(o) && (z = o.ref, St(o, S));
        for (D in o)
          ue.call(o, D) && !Rt.hasOwnProperty(D) && (j[D] = o[D]);
        if (t && t.defaultProps) {
          var k = t.defaultProps;
          for (D in k)
            j[D] === void 0 && (j[D] = k[D]);
        }
        if (b || z) {
          var P = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          b && _t(j, P), z && Tt(j, P);
        }
        return Dt(t, b, z, S, h, fe.current, j);
      }
    }
    var _e = V.ReactCurrentOwner, He = V.ReactDebugCurrentFrame;
    function se(t) {
      if (t) {
        var o = t._owner, l = xe(t.type, t._source, o ? o.type : null);
        He.setExtraStackFrame(l);
      } else
        He.setExtraStackFrame(null);
    }
    var Te;
    Te = !1;
    function De(t) {
      return typeof t == "object" && t !== null && t.$$typeof === r;
    }
    function Je() {
      {
        if (_e.current) {
          var t = Z(_e.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function Ct(t) {
      {
        if (t !== void 0) {
          var o = t.fileName.replace(/^.*[\\\/]/, ""), l = t.lineNumber;
          return `

Check your code at ` + o + ":" + l + ".";
        }
        return "";
      }
    }
    var Ke = {};
    function At(t) {
      {
        var o = Je();
        if (!o) {
          var l = typeof t == "string" ? t : t.displayName || t.name;
          l && (o = `

Check the top-level render call using <` + l + ">.");
        }
        return o;
      }
    }
    function Xe(t, o) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var l = At(o);
        if (Ke[l])
          return;
        Ke[l] = !0;
        var h = "";
        t && t._owner && t._owner !== _e.current && (h = " It was passed a child from " + Z(t._owner.type) + "."), se(t), M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, h), se(null);
      }
    }
    function qe(t, o) {
      {
        if (typeof t != "object")
          return;
        if (je(t))
          for (var l = 0; l < t.length; l++) {
            var h = t[l];
            De(h) && Xe(h, o);
          }
        else if (De(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var S = X(t);
          if (typeof S == "function" && S !== t.entries)
            for (var D = S.call(t), j; !(j = D.next()).done; )
              De(j.value) && Xe(j.value, o);
        }
      }
    }
    function Mt(t) {
      {
        var o = t.type;
        if (o == null || typeof o == "string")
          return;
        var l;
        if (typeof o == "function")
          l = o.propTypes;
        else if (typeof o == "object" && (o.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        o.$$typeof === x))
          l = o.propTypes;
        else
          return;
        if (l) {
          var h = Z(o);
          vt(l, t.props, "prop", h, t);
        } else if (o.PropTypes !== void 0 && !Te) {
          Te = !0;
          var S = Z(o);
          M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", S || "Unknown");
        }
        typeof o.getDefaultProps == "function" && !o.getDefaultProps.isReactClassApproved && M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function kt(t) {
      {
        for (var o = Object.keys(t.props), l = 0; l < o.length; l++) {
          var h = o[l];
          if (h !== "children" && h !== "key") {
            se(t), M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", h), se(null);
            break;
          }
        }
        t.ref !== null && (se(t), M("Invalid attribute `ref` supplied to `React.Fragment`."), se(null));
      }
    }
    var Qe = {};
    function et(t, o, l, h, S, D) {
      {
        var j = A(t);
        if (!j) {
          var b = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var z = Ct(S);
          z ? b += z : b += Je();
          var k;
          t === null ? k = "null" : je(t) ? k = "array" : t !== void 0 && t.$$typeof === r ? (k = "<" + (Z(t.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : k = typeof t, M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, b);
        }
        var P = Ot(t, o, l, S, D);
        if (P == null)
          return P;
        if (j) {
          var H = o.children;
          if (H !== void 0)
            if (h)
              if (je(H)) {
                for (var le = 0; le < H.length; le++)
                  qe(H[le], t);
                Object.freeze && Object.freeze(H);
              } else
                M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              qe(H, t);
        }
        if (ue.call(o, "key")) {
          var ae = Z(t), $ = Object.keys(o).filter(function(zt) {
            return zt !== "key";
          }), Oe = $.length > 0 ? "{key: someKey, " + $.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Qe[ae + Oe]) {
            var Ut = $.length > 0 ? "{" + $.join(": ..., ") + ": ...}" : "{}";
            M(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Oe, ae, Ut, ae), Qe[ae + Oe] = !0;
          }
        }
        return t === n ? kt(P) : Mt(P), P;
      }
    }
    function Lt(t, o, l) {
      return et(t, o, l, !0);
    }
    function Nt(t, o, l) {
      return et(t, o, l, !1);
    }
    var Pt = Nt, Ft = Lt;
    ge.Fragment = n, ge.jsx = Pt, ge.jsxs = Ft;
  }()), ge;
}
process.env.NODE_ENV === "production" ? Ce.exports = Yt() : Ce.exports = Zt();
var i = Ce.exports;
let Ee;
const Ht = new Uint8Array(16);
function Jt() {
  if (!Ee && (Ee = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Ee))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ee(Ht);
}
const U = [];
for (let e = 0; e < 256; ++e)
  U.push((e + 256).toString(16).slice(1));
function Kt(e, r = 0) {
  return U[e[r + 0]] + U[e[r + 1]] + U[e[r + 2]] + U[e[r + 3]] + "-" + U[e[r + 4]] + U[e[r + 5]] + "-" + U[e[r + 6]] + U[e[r + 7]] + "-" + U[e[r + 8]] + U[e[r + 9]] + "-" + U[e[r + 10]] + U[e[r + 11]] + U[e[r + 12]] + U[e[r + 13]] + U[e[r + 14]] + U[e[r + 15]];
}
const Xt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), nt = {
  randomUUID: Xt
};
function dt(e, r, a) {
  if (nt.randomUUID && !r && !e)
    return nt.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || Jt)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, r) {
    a = a || 0;
    for (let s = 0; s < 16; ++s)
      r[a + s] = n[s];
    return r;
  }
  return Kt(n);
}
var _;
(function(e) {
  e.LOAD = "LOAD", e.EXEC = "EXEC", e.FFPROBE = "FFPROBE", e.WRITE_FILE = "WRITE_FILE", e.READ_FILE = "READ_FILE", e.DELETE_FILE = "DELETE_FILE", e.RENAME = "RENAME", e.CREATE_DIR = "CREATE_DIR", e.LIST_DIR = "LIST_DIR", e.DELETE_DIR = "DELETE_DIR", e.ERROR = "ERROR", e.DOWNLOAD = "DOWNLOAD", e.PROGRESS = "PROGRESS", e.LOG = "LOG", e.MOUNT = "MOUNT", e.UNMOUNT = "UNMOUNT";
})(_ || (_ = {}));
const qt = (() => {
  let e = 0;
  return () => e++;
})(), Qt = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"), er = new Error("called FFmpeg.terminate()");
var Y, te, q, ie, oe, be, B;
class tr {
  constructor() {
    ee(this, Y, null);
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    ee(this, te, {});
    ee(this, q, {});
    ee(this, ie, []);
    ee(this, oe, []);
    F(this, "loaded", !1);
    /**
     * register worker message event handlers.
     */
    ee(this, be, () => {
      y(this, Y) && (y(this, Y).onmessage = ({ data: { id: r, type: a, data: n } }) => {
        switch (a) {
          case _.LOAD:
            this.loaded = !0, y(this, te)[r](n);
            break;
          case _.MOUNT:
          case _.UNMOUNT:
          case _.EXEC:
          case _.FFPROBE:
          case _.WRITE_FILE:
          case _.READ_FILE:
          case _.DELETE_FILE:
          case _.RENAME:
          case _.CREATE_DIR:
          case _.LIST_DIR:
          case _.DELETE_DIR:
            y(this, te)[r](n);
            break;
          case _.LOG:
            y(this, ie).forEach((s) => s(n));
            break;
          case _.PROGRESS:
            y(this, oe).forEach((s) => s(n));
            break;
          case _.ERROR:
            y(this, q)[r](n);
            break;
        }
        delete y(this, te)[r], delete y(this, q)[r];
      });
    });
    /**
     * Generic function to send messages to web worker.
     */
    ee(this, B, ({ type: r, data: a }, n = [], s) => y(this, Y) ? new Promise((u, p) => {
      const f = qt();
      y(this, Y) && y(this, Y).postMessage({ id: f, type: r, data: a }, n), y(this, te)[f] = u, y(this, q)[f] = p, s == null || s.addEventListener("abort", () => {
        p(new DOMException(`Message # ${f} was aborted`, "AbortError"));
      }, { once: !0 });
    }) : Promise.reject(Qt));
    /**
     * Loads ffmpeg-core inside web worker. It is required to call this method first
     * as it initializes WebAssembly and other essential variables.
     *
     * @category FFmpeg
     * @returns `true` if ffmpeg core is loaded for the first time.
     */
    F(this, "load", ({ classWorkerURL: r, ...a } = {}, { signal: n } = {}) => (y(this, Y) || (pe(this, Y, r ? new Worker(new URL(r, import.meta.url), {
      type: "module"
    }) : (
      // We need to duplicated the code here to enable webpack
      // to bundle worekr.js here.
      new Worker(new URL("/assets/worker-224792ee.js", self.location), {
        type: "module"
      })
    )), y(this, be).call(this)), y(this, B).call(this, {
      type: _.LOAD,
      data: a
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
    F(this, "exec", (r, a = -1, { signal: n } = {}) => y(this, B).call(this, {
      type: _.EXEC,
      data: { args: r, timeout: a }
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
    F(this, "ffprobe", (r, a = -1, { signal: n } = {}) => y(this, B).call(this, {
      type: _.FFPROBE,
      data: { args: r, timeout: a }
    }, void 0, n));
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    F(this, "terminate", () => {
      const r = Object.keys(y(this, q));
      for (const a of r)
        y(this, q)[a](er), delete y(this, q)[a], delete y(this, te)[a];
      y(this, Y) && (y(this, Y).terminate(), pe(this, Y, null), this.loaded = !1);
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
    F(this, "writeFile", (r, a, { signal: n } = {}) => {
      const s = [];
      return a instanceof Uint8Array && s.push(a.buffer), y(this, B).call(this, {
        type: _.WRITE_FILE,
        data: { path: r, data: a }
      }, s, n);
    });
    F(this, "mount", (r, a, n) => {
      const s = [];
      return y(this, B).call(this, {
        type: _.MOUNT,
        data: { fsType: r, options: a, mountPoint: n }
      }, s);
    });
    F(this, "unmount", (r) => {
      const a = [];
      return y(this, B).call(this, {
        type: _.UNMOUNT,
        data: { mountPoint: r }
      }, a);
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
    F(this, "readFile", (r, a = "binary", { signal: n } = {}) => y(this, B).call(this, {
      type: _.READ_FILE,
      data: { path: r, encoding: a }
    }, void 0, n));
    /**
     * Delete a file.
     *
     * @category File System
     */
    F(this, "deleteFile", (r, { signal: a } = {}) => y(this, B).call(this, {
      type: _.DELETE_FILE,
      data: { path: r }
    }, void 0, a));
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    F(this, "rename", (r, a, { signal: n } = {}) => y(this, B).call(this, {
      type: _.RENAME,
      data: { oldPath: r, newPath: a }
    }, void 0, n));
    /**
     * Create a directory.
     *
     * @category File System
     */
    F(this, "createDir", (r, { signal: a } = {}) => y(this, B).call(this, {
      type: _.CREATE_DIR,
      data: { path: r }
    }, void 0, a));
    /**
     * List directory contents.
     *
     * @category File System
     */
    F(this, "listDir", (r, { signal: a } = {}) => y(this, B).call(this, {
      type: _.LIST_DIR,
      data: { path: r }
    }, void 0, a));
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    F(this, "deleteDir", (r, { signal: a } = {}) => y(this, B).call(this, {
      type: _.DELETE_DIR,
      data: { path: r }
    }, void 0, a));
  }
  on(r, a) {
    r === "log" ? y(this, ie).push(a) : r === "progress" && y(this, oe).push(a);
  }
  off(r, a) {
    r === "log" ? pe(this, ie, y(this, ie).filter((n) => n !== a)) : r === "progress" && pe(this, oe, y(this, oe).filter((n) => n !== a));
  }
}
Y = new WeakMap(), te = new WeakMap(), q = new WeakMap(), ie = new WeakMap(), oe = new WeakMap(), be = new WeakMap(), B = new WeakMap();
var it;
(function(e) {
  e.MEMFS = "MEMFS", e.NODEFS = "NODEFS", e.NODERAWFS = "NODERAWFS", e.IDBFS = "IDBFS", e.WORKERFS = "WORKERFS", e.PROXYFS = "PROXYFS";
})(it || (it = {}));
const rr = new Error("failed to get response body reader"), ar = new Error("failed to complete download"), nr = "Content-Length", ir = (e) => new Promise((r, a) => {
  const n = new FileReader();
  n.onload = () => {
    const { result: s } = n;
    s instanceof ArrayBuffer ? r(new Uint8Array(s)) : r(new Uint8Array());
  }, n.onerror = (s) => {
    var u, p;
    a(Error(`File could not be read! Code=${((p = (u = s == null ? void 0 : s.target) == null ? void 0 : u.error) == null ? void 0 : p.code) || -1}`));
  }, n.readAsArrayBuffer(e);
}), ot = async (e) => {
  let r;
  if (typeof e == "string")
    /data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(e) ? r = atob(e.split(",")[1]).split("").map((a) => a.charCodeAt(0)) : r = await (await fetch(e)).arrayBuffer();
  else if (e instanceof URL)
    r = await (await fetch(e)).arrayBuffer();
  else if (e instanceof File || e instanceof Blob)
    r = await ir(e);
  else
    return new Uint8Array();
  return new Uint8Array(r);
}, or = async (e, r) => {
  var s;
  const a = await fetch(e);
  let n;
  try {
    const u = parseInt(a.headers.get(nr) || "-1"), p = (s = a.body) == null ? void 0 : s.getReader();
    if (!p)
      throw rr;
    const f = [];
    let c = 0;
    for (; ; ) {
      const { done: x, value: C } = await p.read(), R = C ? C.length : 0;
      if (x) {
        if (u != -1 && u !== c)
          throw ar;
        r && r({ url: e, total: u, received: c, delta: R, done: x });
        break;
      }
      f.push(C), c += R, r && r({ url: e, total: u, received: c, delta: R, done: x });
    }
    const g = new Uint8Array(c);
    let w = 0;
    for (const x of f)
      g.set(x, w), w += x.length;
    n = g.buffer;
  } catch (u) {
    console.log("failed to send download progress event: ", u), n = await a.arrayBuffer(), r && r({
      url: e,
      total: n.byteLength,
      received: n.byteLength,
      delta: 0,
      done: !0
    });
  }
  return n;
}, st = async (e, r, a = !1, n) => {
  const s = a ? await or(e, n) : await (await fetch(e)).arrayBuffer(), u = new Blob([s], { type: r });
  return URL.createObjectURL(u);
};
var T = /* @__PURE__ */ ((e) => (e.VIDEO = "video", e.AUDIO = "audio", e.IMAGE = "image", e))(T || {});
class sr {
  constructor() {
    F(this, "ffmpeg", null);
    F(this, "loaded", !1);
  }
  /**
   * FFmpeg 인스턴스를 로드합니다
   */
  async load() {
    if (!this.loaded) {
      this.ffmpeg = new tr();
      try {
        const r = "https://unpkg.com/@ffmpeg";
        await this.ffmpeg.load({
          coreURL: await st(`${r}/core/dist/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await st(`${r}/core/dist/ffmpeg-core.wasm`, "application/wasm")
        }), this.loaded = !0, console.log("FFmpeg 로드 완료");
      } catch (r) {
        throw console.error("FFmpeg 로드 실패:", r), new Error("FFmpeg를 로드할 수 없습니다");
      }
    }
  }
  /**
   * 미디어 파일의 메타데이터를 추출합니다
   * @param file 미디어 파일
   * @returns 미디어 메타데이터
   */
  async extractMetadata(r) {
    var a, n;
    if (await this.ensureLoaded(), !this.ffmpeg)
      throw new Error("FFmpeg가 초기화되지 않았습니다");
    try {
      await this.ffmpeg.writeFile("input", await ot(r)), await this.ffmpeg.exec([
        "-i",
        "input",
        "-v",
        "error",
        "-select_streams",
        "v:0,a:0",
        "-show_entries",
        "stream=width,height,duration,r_frame_rate,bit_rate,codec_name:stream_tags",
        "-of",
        "json",
        "output.json"
      ]);
      const s = await this.ffmpeg.readFile("output.json"), u = new TextDecoder().decode(s), p = JSON.parse(u), f = {}, c = (a = p.streams) == null ? void 0 : a.find((x) => x.codec_type === "video");
      if (c) {
        if (f.width = parseInt(c.width) || void 0, f.height = parseInt(c.height) || void 0, f.codec = c.codec_name, c.r_frame_rate) {
          const [x, C] = c.r_frame_rate.split("/").map(Number);
          f.frameRate = x / C;
        }
        f.bitRate = parseInt(c.bit_rate) || void 0;
      }
      const g = (n = p.streams) == null ? void 0 : n.find((x) => x.codec_type === "audio");
      g && (f.channels = parseInt(g.channels) || void 0, f.sampleRate = parseInt(g.sample_rate) || void 0);
      const w = p.format;
      return w != null && w.duration && (f.duration = parseFloat(w.duration)), f;
    } catch (s) {
      throw console.error("메타데이터 추출 실패:", s), new Error("미디어 메타데이터를 추출할 수 없습니다");
    } finally {
      await this.ffmpeg.deleteFile("input"), await this.ffmpeg.deleteFile("output.json");
    }
  }
  /**
   * 미디어 파일에서 썸네일을 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @param options 썸네일 옵션
   * @returns 썸네일 URL (base64)
   */
  async generateThumbnail(r, a, n = {}) {
    if (await this.ensureLoaded(), !this.ffmpeg)
      throw new Error("FFmpeg가 초기화되지 않았습니다");
    const { width: s = 320, height: u = 180, quality: p = 90, time: f = 0 } = n;
    try {
      if (await this.ffmpeg.writeFile("input", await ot(r)), a === T.VIDEO)
        await this.ffmpeg.exec([
          "-ss",
          f.toString(),
          "-i",
          "input",
          "-vf",
          `scale=${s}:${u}:force_original_aspect_ratio=decrease`,
          "-vframes",
          "1",
          "-q:v",
          (31 - Math.round(p / 3.3)).toString(),
          "thumbnail.jpg"
        ]);
      else if (a === T.IMAGE)
        await this.ffmpeg.exec([
          "-i",
          "input",
          "-vf",
          `scale=${s}:${u}:force_original_aspect_ratio=decrease`,
          "-q:v",
          (31 - Math.round(p / 3.3)).toString(),
          "thumbnail.jpg"
        ]);
      else if (a === T.AUDIO)
        return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMzIwIDE4MCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMzMzMzMzMiLz48cGF0aCBkPSJNMTQwIDYwdjYwbDUwLTMweiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xOTAgOTBhNDAgNDAgMCAwIDEgMCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0xOTAgNzBhNjAgNjAgMCAwIDEgMCA0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMTkwIDUwYTgwIDgwIDAgMCAxIDAgODAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+";
      const c = await this.ffmpeg.readFile("thumbnail.jpg"), g = new Blob([c], { type: "image/jpeg" });
      return URL.createObjectURL(g);
    } catch (c) {
      throw console.error("썸네일 생성 실패:", c), new Error("썸네일을 생성할 수 없습니다");
    } finally {
      await this.ffmpeg.deleteFile("input"), await this.ffmpeg.deleteFile("thumbnail.jpg").catch(() => {
      });
    }
  }
  /**
   * FFmpeg가 로드되었는지 확인하고, 로드되지 않았다면 로드합니다
   */
  async ensureLoaded() {
    this.loaded || await this.load();
  }
  /**
   * FFmpeg 인스턴스를 종료합니다
   */
  async terminate() {
    this.ffmpeg && (await this.ffmpeg.terminate(), this.ffmpeg = null, this.loaded = !1);
  }
}
const ne = new sr();
class lr {
  constructor() {
    F(this, "items", /* @__PURE__ */ new Map());
  }
  /**
   * 미디어 파일을 임포트합니다
   * @param files 파일 목록
   * @returns 임포트된 미디어 항목 배열
   */
  async importMedia(r) {
    const a = [];
    for (const n of r)
      try {
        const s = this.detectMediaType(n), u = await ne.extractMetadata(n), p = await this.createMediaItem({
          name: n.name,
          type: s,
          path: URL.createObjectURL(n),
          size: n.size,
          metadata: u
        }), f = await ne.generateThumbnail(n, s);
        p.thumbnail = f, this.items.set(p.id, p), a.push(p);
      } catch (s) {
        console.error(`파일 임포트 실패: ${n.name}`, s);
      }
    return a;
  }
  /**
   * 필터 옵션을 기준으로 미디어 항목을 검색합니다
   * @param filter 필터 옵션
   * @returns 필터링된 미디어 항목 배열
   */
  async getMediaItems(r = {}) {
    let a = Array.from(this.items.values());
    if (r.type && r.type.length > 0 && (a = a.filter((n) => r.type.includes(n.type))), r.tags && r.tags.length > 0 && (a = a.filter(
      (n) => r.tags.some((s) => n.tags.includes(s))
    )), r.favorite !== void 0 && (a = a.filter((n) => n.favorite === r.favorite)), r.search) {
      const n = r.search.toLowerCase();
      a = a.filter(
        (s) => s.name.toLowerCase().includes(n) || s.tags.some((u) => u.toLowerCase().includes(n))
      );
    }
    if (r.sortBy) {
      const n = r.sortDirection === "desc" ? -1 : 1;
      a.sort((s, u) => {
        switch (r.sortBy) {
          case "name":
            return n * s.name.localeCompare(u.name);
          case "size":
            return n * (s.size - u.size);
          case "createdAt":
            return n * (s.createdAt.getTime() - u.createdAt.getTime());
          case "importedAt":
            return n * (s.importedAt.getTime() - u.importedAt.getTime());
          case "duration":
            const p = s.metadata.duration || 0, f = u.metadata.duration || 0;
            return n * (p - f);
          default:
            return 0;
        }
      });
    }
    return a;
  }
  /**
   * ID로 미디어 항목을 조회합니다
   * @param id 미디어 항목 ID
   * @returns 미디어 항목 또는 null
   */
  async getMediaById(r) {
    return this.items.get(r) || null;
  }
  /**
   * 미디어 항목을 업데이트합니다
   * @param id 미디어 항목 ID
   * @param updates 업데이트할 필드
   * @returns 업데이트된 미디어 항목
   */
  async updateMedia(r, a) {
    const n = this.items.get(r);
    if (!n)
      throw new Error(`미디어 항목을 찾을 수 없음: ${r}`);
    const s = { ...n, ...a };
    return this.items.set(r, s), s;
  }
  /**
   * 미디어 항목을 삭제합니다
   * @param id 미디어 항목 ID
   * @returns 삭제 성공 여부
   */
  async deleteMedia(r) {
    const a = this.items.get(r);
    return a && (URL.revokeObjectURL(a.url), a.thumbnail && a.thumbnail.startsWith("blob:") && URL.revokeObjectURL(a.thumbnail)), this.items.delete(r);
  }
  /**
   * 기존 미디어 항목의 썸네일을 생성합니다
   * @param mediaItem 미디어 항목
   * @param options 썸네일 옵션
   * @returns 썸네일 URL
   */
  async generateThumbnail(r, a) {
    try {
      const s = await (await fetch(r.url)).blob(), u = new File([s], r.name, { type: this.getMimeType(r.type) }), p = await ne.generateThumbnail(u, r.type, a);
      return r.thumbnail && r.thumbnail.startsWith("blob:") && URL.revokeObjectURL(r.thumbnail), r.thumbnail = p, this.items.set(r.id, r), p;
    } catch (n) {
      throw console.error("썸네일 생성 실패:", n), new Error("썸네일을 생성할 수 없습니다");
    }
  }
  /**
   * 파일에서 메타데이터를 추출합니다
   * @param file 파일
   * @returns 메타데이터
   */
  async extractMetadata(r) {
    return await ne.extractMetadata(r);
  }
  /**
   * 새 미디어 항목을 생성합니다
   * @param options 미디어 항목 생성 옵션
   * @returns 생성된 미디어 항목
   */
  async createMediaItem(r) {
    const a = /* @__PURE__ */ new Date();
    return {
      id: dt(),
      name: r.name,
      type: r.type,
      path: r.path,
      url: r.path,
      size: r.size,
      createdAt: a,
      importedAt: a,
      metadata: r.metadata || {},
      tags: r.tags || [],
      favorite: r.favorite || !1,
      thumbnail: ""
    };
  }
  /**
   * 파일 MIME 타입에 따라 미디어 타입을 감지합니다
   * @param file 파일
   * @returns 미디어 타입
   */
  detectMediaType(r) {
    var f;
    const a = r.type.toLowerCase();
    if (a.startsWith("video/"))
      return T.VIDEO;
    if (a.startsWith("audio/"))
      return T.AUDIO;
    if (a.startsWith("image/"))
      return T.IMAGE;
    const n = (f = r.name.split(".").pop()) == null ? void 0 : f.toLowerCase(), s = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"], u = ["mp3", "wav", "ogg", "aac", "m4a", "flac"], p = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    return n && s.includes(n) ? T.VIDEO : n && u.includes(n) ? T.AUDIO : n && p.includes(n) ? T.IMAGE : T.VIDEO;
  }
  /**
   * 미디어 타입에 해당하는 MIME 타입을 반환합니다
   * @param type 미디어 타입
   * @returns MIME 타입
   */
  getMimeType(r) {
    switch (r) {
      case T.VIDEO:
        return "video/mp4";
      case T.AUDIO:
        return "audio/mp3";
      case T.IMAGE:
        return "image/jpeg";
      default:
        return "application/octet-stream";
    }
  }
}
const K = new lr(), cr = {
  items: [],
  selectedItems: [],
  isLoading: !1,
  error: null,
  filter: {}
};
function dr(e, r) {
  switch (r.type) {
    case "SET_ITEMS":
      return { ...e, items: r.payload };
    case "ADD_ITEMS":
      return { ...e, items: [...e.items, ...r.payload] };
    case "UPDATE_ITEM":
      return {
        ...e,
        items: e.items.map(
          (a) => a.id === r.payload.id ? r.payload : a
        )
      };
    case "REMOVE_ITEM":
      return {
        ...e,
        items: e.items.filter((a) => a.id !== r.payload),
        selectedItems: e.selectedItems.filter((a) => a !== r.payload)
      };
    case "SELECT_ITEM":
      return {
        ...e,
        selectedItems: [...e.selectedItems, r.payload]
      };
    case "DESELECT_ITEM":
      return {
        ...e,
        selectedItems: e.selectedItems.filter((a) => a !== r.payload)
      };
    case "SELECT_ALL":
      return {
        ...e,
        selectedItems: e.items.map((a) => a.id)
      };
    case "DESELECT_ALL":
      return {
        ...e,
        selectedItems: []
      };
    case "SET_FILTER":
      return { ...e, filter: r.payload };
    case "SET_LOADING":
      return { ...e, isLoading: r.payload };
    case "SET_ERROR":
      return { ...e, error: r.payload };
    default:
      return e;
  }
}
const ut = $t(void 0), vr = ({ children: e }) => {
  const [r, a] = Vt(dr, cr), n = async (R) => {
    try {
      a({ type: "SET_LOADING", payload: !0 }), a({ type: "SET_ERROR", payload: null });
      const I = await K.importMedia(R);
      return a({ type: "ADD_ITEMS", payload: I }), I;
    } catch (I) {
      return a({ type: "SET_ERROR", payload: I }), [];
    } finally {
      a({ type: "SET_LOADING", payload: !1 });
    }
  }, s = async (R) => {
    try {
      a({ type: "SET_LOADING", payload: !0 }), a({ type: "SET_ERROR", payload: null });
      const I = R || r.filter;
      R && a({ type: "SET_FILTER", payload: R });
      const L = await K.getMediaItems(I);
      a({ type: "SET_ITEMS", payload: L });
    } catch (I) {
      a({ type: "SET_ERROR", payload: I });
    } finally {
      a({ type: "SET_LOADING", payload: !1 });
    }
  }, C = {
    state: r,
    importMedia: n,
    refreshMedia: s,
    updateMedia: async (R, I) => {
      try {
        a({ type: "SET_ERROR", payload: null });
        const L = await K.updateMedia(R, I);
        return a({ type: "UPDATE_ITEM", payload: L }), L;
      } catch (L) {
        throw a({ type: "SET_ERROR", payload: L }), L;
      }
    },
    deleteMedia: async (R) => {
      try {
        a({ type: "SET_ERROR", payload: null });
        const I = await K.deleteMedia(R);
        return I && a({ type: "REMOVE_ITEM", payload: R }), I;
      } catch (I) {
        return a({ type: "SET_ERROR", payload: I }), !1;
      }
    },
    selectItem: (R) => {
      r.selectedItems.includes(R) || a({ type: "SELECT_ITEM", payload: R });
    },
    deselectItem: (R) => {
      a({ type: "DESELECT_ITEM", payload: R });
    },
    selectAll: () => {
      a({ type: "SELECT_ALL" });
    },
    deselectAll: () => {
      a({ type: "DESELECT_ALL" });
    },
    setFilter: (R) => {
      a({ type: "SET_FILTER", payload: R }), s(R);
    }
  };
  return /* @__PURE__ */ i.jsx(ut.Provider, { value: C, children: e });
}, ur = () => {
  const e = Gt(ut);
  if (!e)
    throw new Error("useMedia must be used within a MediaProvider");
  return e;
}, fr = ({
  selectedCount: e,
  totalCount: r,
  filter: a,
  onImport: n,
  onFilterChange: s,
  onDeleteSelected: u,
  onRefresh: p
}) => {
  var X, V, M;
  const [f, c] = Q(a.search || ""), g = Ae(null), w = O((N) => {
    const W = N.target.value;
    c(W), g.current && clearTimeout(g.current), g.current = setTimeout(() => {
      s({ ...a, search: W });
    }, 300);
  }, [a, s]), x = O((N, W) => {
    const J = a.type || [];
    let m;
    W ? m = [...J, N] : m = J.filter((v) => v !== N), s({ ...a, type: m.length > 0 ? m : void 0 });
  }, [a, s]), C = O((N) => {
    const W = N.target.checked;
    s({ ...a, favorite: W ? !0 : void 0 });
  }, [a, s]), R = O((N) => {
    const W = N.target.value, [J, m] = W.split("-");
    s({
      ...a,
      sortBy: J,
      sortDirection: m
    });
  }, [a, s]), I = `${a.sortBy || "name"}-${a.sortDirection || "asc"}`, L = O(() => {
    c(""), s({});
  }, [s]);
  return /* @__PURE__ */ i.jsxs(
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
        /* @__PURE__ */ i.jsxs(
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
              /* @__PURE__ */ i.jsxs(
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
                    /* @__PURE__ */ i.jsxs(
                      "div",
                      {
                        className: "search-container",
                        style: {
                          flex: "1",
                          position: "relative",
                          maxWidth: "300px"
                        },
                        children: [
                          /* @__PURE__ */ i.jsx(
                            "input",
                            {
                              type: "text",
                              placeholder: "미디어 검색...",
                              value: f,
                              onChange: w,
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
                          /* @__PURE__ */ i.jsx(
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
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ i.jsxs(
                      "select",
                      {
                        value: I,
                        onChange: R,
                        style: {
                          padding: "7px 8px",
                          backgroundColor: "#333",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "14px"
                        },
                        children: [
                          /* @__PURE__ */ i.jsx("option", { value: "name-asc", children: "이름 (A-Z)" }),
                          /* @__PURE__ */ i.jsx("option", { value: "name-desc", children: "이름 (Z-A)" }),
                          /* @__PURE__ */ i.jsx("option", { value: "importedAt-desc", children: "최근 추가" }),
                          /* @__PURE__ */ i.jsx("option", { value: "createdAt-desc", children: "생성일 (최신)" }),
                          /* @__PURE__ */ i.jsx("option", { value: "createdAt-asc", children: "생성일 (오래된)" }),
                          /* @__PURE__ */ i.jsx("option", { value: "size-desc", children: "크기 (큰 순)" }),
                          /* @__PURE__ */ i.jsx("option", { value: "size-asc", children: "크기 (작은 순)" }),
                          /* @__PURE__ */ i.jsx("option", { value: "duration-desc", children: "길이 (긴 순)" }),
                          /* @__PURE__ */ i.jsx("option", { value: "duration-asc", children: "길이 (짧은 순)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ i.jsx(
                      "button",
                      {
                        onClick: L,
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
              /* @__PURE__ */ i.jsxs(
                "div",
                {
                  className: "media-toolbar-right",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [
                    /* @__PURE__ */ i.jsx(
                      "div",
                      {
                        className: "selection-counter",
                        style: {
                          color: "#aaa",
                          fontSize: "14px"
                        },
                        children: e > 0 ? `${e}개 선택됨` : `${r}개 항목`
                      }
                    ),
                    /* @__PURE__ */ i.jsx(
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
                    /* @__PURE__ */ i.jsx(
                      "button",
                      {
                        onClick: u,
                        disabled: e === 0,
                        style: {
                          padding: "8px 12px",
                          backgroundColor: e === 0 ? "#333" : "#e53935",
                          border: "none",
                          borderRadius: "4px",
                          color: e === 0 ? "#777" : "#fff",
                          fontSize: "14px",
                          cursor: e === 0 ? "default" : "pointer",
                          opacity: e === 0 ? 0.7 : 1
                        },
                        children: "삭제"
                      }
                    ),
                    /* @__PURE__ */ i.jsx(
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
        /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "media-toolbar-filters",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "14px",
              color: "#ccc"
            },
            children: [
              /* @__PURE__ */ i.jsxs("div", { className: "filter-group", children: [
                /* @__PURE__ */ i.jsx("span", { style: { marginRight: "8px" }, children: "타입:" }),
                /* @__PURE__ */ i.jsxs("label", { style: { marginRight: "12px" }, children: [
                  /* @__PURE__ */ i.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: ((X = a.type) == null ? void 0 : X.includes(T.VIDEO)) || !1,
                      onChange: (N) => x(T.VIDEO, N.target.checked),
                      style: { marginRight: "4px" }
                    }
                  ),
                  "비디오"
                ] }),
                /* @__PURE__ */ i.jsxs("label", { style: { marginRight: "12px" }, children: [
                  /* @__PURE__ */ i.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: ((V = a.type) == null ? void 0 : V.includes(T.AUDIO)) || !1,
                      onChange: (N) => x(T.AUDIO, N.target.checked),
                      style: { marginRight: "4px" }
                    }
                  ),
                  "오디오"
                ] }),
                /* @__PURE__ */ i.jsxs("label", { children: [
                  /* @__PURE__ */ i.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: ((M = a.type) == null ? void 0 : M.includes(T.IMAGE)) || !1,
                      onChange: (N) => x(T.IMAGE, N.target.checked),
                      style: { marginRight: "4px" }
                    }
                  ),
                  "이미지"
                ] })
              ] }),
              /* @__PURE__ */ i.jsx("div", { className: "filter-group", children: /* @__PURE__ */ i.jsxs("label", { children: [
                /* @__PURE__ */ i.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: a.favorite || !1,
                    onChange: C,
                    style: { marginRight: "4px" }
                  }
                ),
                "즐겨찾기만 표시"
              ] }) })
            ]
          }
        )
      ]
    }
  );
};
function ft(e) {
  if (e === 0)
    return "0 Bytes";
  const r = 1024, a = ["Bytes", "KB", "MB", "GB", "TB"], n = Math.floor(Math.log(e) / Math.log(r));
  return parseFloat((e / Math.pow(r, n)).toFixed(2)) + " " + a[n];
}
function pt(e) {
  if (isNaN(e))
    return "00:00";
  const r = Math.floor(e / 3600), a = Math.floor(e % 3600 / 60), n = Math.floor(e % 60), s = (u) => u.toString().padStart(2, "0");
  return r > 0 ? `${s(r)}:${s(a)}:${s(n)}` : `${s(a)}:${s(n)}`;
}
function pr(e) {
  return typeof e == "string" && (e = new Date(e)), e.toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function Er(e) {
  var a;
  const r = e.split(".");
  return r.length > 1 && ((a = r.pop()) == null ? void 0 : a.toLowerCase()) || "";
}
function br(e) {
  return e.split(/[\\/]/).pop() || "";
}
const hr = ({
  item: e,
  isSelected: r,
  onSelect: a,
  onDoubleClick: n,
  onContextMenu: s,
  onDragStart: u
}) => {
  const p = (c) => {
    switch (c) {
      case T.VIDEO:
        return "🎬";
      case T.AUDIO:
        return "🎵";
      case T.IMAGE:
        return "🖼️";
      default:
        return "📁";
    }
  }, f = (c) => {
    if (u ? u(c, e) : c.dataTransfer.setData("application/json", JSON.stringify({
      id: e.id,
      type: e.type,
      name: e.name,
      duration: e.metadata.duration
    })), e.thumbnail) {
      const g = new Image();
      g.src = e.thumbnail, c.dataTransfer.setDragImage(g, 0, 0);
    }
  };
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `media-item ${r ? "selected" : ""}`,
      onClick: () => a(e.id),
      onDoubleClick: () => n && n(e),
      onContextMenu: (c) => s && s(c, e),
      draggable: !0,
      onDragStart: f,
      "data-media-id": e.id,
      "data-media-type": e.type,
      style: {
        position: "relative",
        width: "180px",
        margin: "8px",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "#232323",
        border: r ? "2px solid #2196f3" : "2px solid transparent",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "all 0.2s ease"
      },
      children: [
        /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "media-thumbnail",
            style: {
              position: "relative",
              width: "100%",
              height: "120px",
              backgroundColor: "#333",
              backgroundImage: e.thumbnail ? `url(${e.thumbnail})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: [
              !e.thumbnail && /* @__PURE__ */ i.jsx("span", { style: { fontSize: "2rem" }, children: p(e.type) }),
              /* @__PURE__ */ i.jsx(
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
                  children: e.type
                }
              ),
              e.favorite && /* @__PURE__ */ i.jsx(
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
              e.metadata.duration && (e.type === T.VIDEO || e.type === T.AUDIO) && /* @__PURE__ */ i.jsx(
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
                  children: pt(e.metadata.duration)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "media-info",
            style: {
              padding: "8px",
              color: "white"
            },
            children: [
              /* @__PURE__ */ i.jsx(
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
                  title: e.name,
                  children: e.name
                }
              ),
              /* @__PURE__ */ i.jsxs(
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
                    /* @__PURE__ */ i.jsx("span", { children: ft(e.size) }),
                    e.metadata.width && e.metadata.height && /* @__PURE__ */ i.jsxs("span", { children: [
                      e.metadata.width,
                      " × ",
                      e.metadata.height
                    ] })
                  ]
                }
              ),
              e.tags.length > 0 && /* @__PURE__ */ i.jsxs(
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
                    e.tags.slice(0, 2).map((c, g) => /* @__PURE__ */ i.jsx(
                      "span",
                      {
                        style: {
                          backgroundColor: "#454545",
                          color: "#ddd",
                          padding: "2px 4px",
                          borderRadius: "4px",
                          fontSize: "10px"
                        },
                        children: c
                      },
                      g
                    )),
                    e.tags.length > 2 && /* @__PURE__ */ i.jsxs(
                      "span",
                      {
                        style: {
                          color: "#aaa",
                          fontSize: "10px"
                        },
                        children: [
                          "+",
                          e.tags.length - 2
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}, gr = ({
  items: e,
  selectedItems: r,
  onSelectItem: a,
  onItemDoubleClick: n,
  onItemContextMenu: s,
  onItemDragStart: u
}) => {
  const p = O((c, g) => {
    const w = (g == null ? void 0 : g.ctrlKey) || (g == null ? void 0 : g.metaKey) || (g == null ? void 0 : g.shiftKey);
    a(c, w);
  }, [a]), f = O((c) => {
    c.target === c.currentTarget && a("", !1);
  }, [a]);
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: "media-grid",
      onClick: f,
      style: {
        display: "flex",
        flexWrap: "wrap",
        padding: "16px",
        overflow: "auto",
        height: "100%",
        backgroundColor: "#1a1a1a"
      },
      children: e.length === 0 ? /* @__PURE__ */ i.jsxs(
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
            /* @__PURE__ */ i.jsx("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "📁" }),
            /* @__PURE__ */ i.jsx("p", { children: "미디어 파일이 없습니다" }),
            /* @__PURE__ */ i.jsx("p", { style: { fontSize: "14px" }, children: "파일을 드래그하거나 추가 버튼을 클릭하여 미디어를 가져오세요" })
          ]
        }
      ) : e.map((c) => /* @__PURE__ */ i.jsx(
        hr,
        {
          item: c,
          isSelected: r.includes(c.id),
          onSelect: (g) => p(g),
          onDoubleClick: n,
          onContextMenu: s,
          onDragStart: u
        },
        c.id
      ))
    }
  );
}, mr = ({
  item: e,
  onClose: r,
  onFavoriteToggle: a,
  onTagAdd: n,
  onTagRemove: s
}) => {
  const [u, p] = Q(""), [f, c] = Q(!1), g = Ae(null), w = async () => {
    await a(e.id, !e.favorite);
  }, x = async (I) => {
    I.preventDefault(), u.trim() !== "" && (await n(e.id, u.trim()), p(""));
  }, C = async (I) => {
    await s(e.id, I);
  }, R = () => {
    switch (e.type) {
      case T.VIDEO:
        return /* @__PURE__ */ i.jsx(
          "video",
          {
            ref: g,
            src: e.url,
            controls: !0,
            style: {
              width: "100%",
              height: "auto",
              maxHeight: "250px",
              backgroundColor: "#000",
              objectFit: "contain"
            }
          }
        );
      case T.AUDIO:
        return /* @__PURE__ */ i.jsxs("div", { style: { padding: "20px", textAlign: "center" }, children: [
          /* @__PURE__ */ i.jsx(
            "audio",
            {
              src: e.url,
              controls: !0,
              style: { width: "100%" }
            }
          ),
          /* @__PURE__ */ i.jsx(
            "div",
            {
              style: {
                marginTop: "16px",
                fontSize: "48px",
                color: "#aaa"
              },
              children: "🎵"
            }
          )
        ] });
      case T.IMAGE:
        return /* @__PURE__ */ i.jsx(
          "img",
          {
            src: e.url,
            alt: e.name,
            style: {
              width: "100%",
              height: "auto",
              maxHeight: "250px",
              objectFit: "contain"
            }
          }
        );
      default:
        return /* @__PURE__ */ i.jsx("div", { style: { padding: "20px", textAlign: "center", color: "#aaa" }, children: "미리보기를 사용할 수 없음" });
    }
  };
  return /* @__PURE__ */ i.jsxs(
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
        /* @__PURE__ */ i.jsxs(
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
              /* @__PURE__ */ i.jsx(
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
                  title: e.name,
                  children: e.name
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { className: "preview-actions", children: [
                /* @__PURE__ */ i.jsx(
                  "button",
                  {
                    onClick: w,
                    title: e.favorite ? "즐겨찾기 해제" : "즐겨찾기 추가",
                    style: {
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      color: e.favorite ? "#ffcf00" : "#777",
                      cursor: "pointer",
                      marginRight: "8px"
                    },
                    children: e.favorite ? "★" : "☆"
                  }
                ),
                /* @__PURE__ */ i.jsx(
                  "button",
                  {
                    onClick: r,
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
        /* @__PURE__ */ i.jsx(
          "div",
          {
            className: "preview-content",
            style: {
              borderBottom: "1px solid #333"
            },
            children: R()
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "preview-details",
            style: {
              flex: 1,
              overflow: "auto",
              padding: "16px"
            },
            children: [
              /* @__PURE__ */ i.jsx(
                "table",
                {
                  style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px"
                  },
                  children: /* @__PURE__ */ i.jsxs("tbody", { children: [
                    /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
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
                      /* @__PURE__ */ i.jsx("td", { style: { padding: "4px 0" }, children: e.type.charAt(0).toUpperCase() + e.type.slice(1) })
                    ] }),
                    /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "크기"
                        }
                      ),
                      /* @__PURE__ */ i.jsx("td", { style: { padding: "4px 0" }, children: ft(e.size) })
                    ] }),
                    e.metadata.duration !== void 0 && /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "길이"
                        }
                      ),
                      /* @__PURE__ */ i.jsx("td", { style: { padding: "4px 0" }, children: pt(e.metadata.duration) })
                    ] }),
                    e.metadata.width && e.metadata.height && /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "해상도"
                        }
                      ),
                      /* @__PURE__ */ i.jsxs("td", { style: { padding: "4px 0" }, children: [
                        e.metadata.width,
                        " × ",
                        e.metadata.height
                      ] })
                    ] }),
                    e.metadata.frameRate !== void 0 && /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "프레임 레이트"
                        }
                      ),
                      /* @__PURE__ */ i.jsxs("td", { style: { padding: "4px 0" }, children: [
                        e.metadata.frameRate,
                        " fps"
                      ] })
                    ] }),
                    e.metadata.codec && /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "코덱"
                        }
                      ),
                      /* @__PURE__ */ i.jsx("td", { style: { padding: "4px 0" }, children: e.metadata.codec })
                    ] }),
                    e.metadata.channels !== void 0 && /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "오디오 채널"
                        }
                      ),
                      /* @__PURE__ */ i.jsxs("td", { style: { padding: "4px 0" }, children: [
                        e.metadata.channels,
                        " (",
                        e.metadata.channels === 1 ? "모노" : e.metadata.channels === 2 ? "스테레오" : e.metadata.channels === 6 ? "5.1" : e.metadata.channels === 8 ? "7.1" : `${e.metadata.channels}채널`,
                        ")"
                      ] })
                    ] }),
                    e.metadata.sampleRate !== void 0 && /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "샘플 레이트"
                        }
                      ),
                      /* @__PURE__ */ i.jsxs("td", { style: { padding: "4px 0" }, children: [
                        (e.metadata.sampleRate / 1e3).toFixed(1),
                        " kHz"
                      ] })
                    ] }),
                    /* @__PURE__ */ i.jsxs("tr", { children: [
                      /* @__PURE__ */ i.jsx(
                        "td",
                        {
                          style: {
                            padding: "4px 8px 4px 0",
                            color: "#aaa"
                          },
                          children: "임포트 날짜"
                        }
                      ),
                      /* @__PURE__ */ i.jsx("td", { style: { padding: "4px 0" }, children: pr(e.importedAt) })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ i.jsxs(
                "div",
                {
                  className: "tags-section",
                  style: {
                    marginTop: "16px",
                    borderTop: "1px solid #333",
                    paddingTop: "16px"
                  },
                  children: [
                    /* @__PURE__ */ i.jsx(
                      "h4",
                      {
                        style: {
                          margin: "0 0 12px 0",
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#aaa"
                        },
                        children: "태그"
                      }
                    ),
                    /* @__PURE__ */ i.jsx(
                      "div",
                      {
                        className: "tags-list",
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          marginBottom: "12px"
                        },
                        children: e.tags.length === 0 ? /* @__PURE__ */ i.jsx("span", { style: { color: "#777", fontSize: "14px" }, children: "태그 없음" }) : e.tags.map((I, L) => /* @__PURE__ */ i.jsxs(
                          "span",
                          {
                            style: {
                              backgroundColor: "#454545",
                              color: "#fff",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              display: "inline-flex",
                              alignItems: "center"
                            },
                            children: [
                              I,
                              /* @__PURE__ */ i.jsx(
                                "button",
                                {
                                  onClick: () => C(I),
                                  style: {
                                    background: "none",
                                    border: "none",
                                    color: "#aaa",
                                    marginLeft: "4px",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    padding: "0"
                                  },
                                  title: "태그 삭제",
                                  children: "✕"
                                }
                              )
                            ]
                          },
                          L
                        ))
                      }
                    ),
                    /* @__PURE__ */ i.jsx("form", { onSubmit: x, children: /* @__PURE__ */ i.jsxs(
                      "div",
                      {
                        className: "tag-input-container",
                        style: {
                          position: "relative",
                          display: "flex"
                        },
                        children: [
                          /* @__PURE__ */ i.jsx(
                            "input",
                            {
                              type: "text",
                              value: u,
                              onChange: (I) => p(I.target.value),
                              onFocus: () => c(!0),
                              onBlur: () => c(!1),
                              placeholder: "새 태그 추가...",
                              style: {
                                flex: 1,
                                padding: "6px 10px",
                                backgroundColor: "#333",
                                border: f ? "1px solid #2196f3" : "1px solid #444",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "14px",
                                outline: "none"
                              }
                            }
                          ),
                          /* @__PURE__ */ i.jsx(
                            "button",
                            {
                              type: "submit",
                              disabled: u.trim() === "",
                              style: {
                                padding: "6px 12px",
                                marginLeft: "8px",
                                backgroundColor: u.trim() === "" ? "#444" : "#2196f3",
                                border: "none",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "14px",
                                cursor: u.trim() === "" ? "default" : "pointer",
                                opacity: u.trim() === "" ? 0.7 : 1
                              },
                              children: "추가"
                            }
                          )
                        ]
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}, wr = ({
  onSelect: e,
  onDragStart: r
}) => {
  const {
    state: { items: a, selectedItems: n, filter: s, isLoading: u },
    importMedia: p,
    refreshMedia: f,
    updateMedia: c,
    deleteMedia: g,
    selectItem: w,
    deselectItem: x,
    deselectAll: C,
    setFilter: R
  } = ur(), [I, L] = Q(null), X = Ae(null), V = O(() => {
    var d;
    (d = X.current) == null || d.click();
  }, []), M = O(async (d) => {
    const E = d.target.files;
    !E || E.length === 0 || (await p(Array.from(E)), d.target.value = "");
  }, [p]), N = O(async (d) => {
    d.preventDefault(), d.stopPropagation();
    const E = d.dataTransfer.files;
    E.length !== 0 && await p(Array.from(E));
  }, [p]), W = O((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), J = O((d, E = !1) => {
    if (d === "") {
      C(), L(null);
      return;
    }
    E ? n.includes(d) ? x(d) : w(d) : (C(), w(d));
    const A = a.find((G) => G.id === d);
    A && L(A);
  }, [n, a, w, x, C]), m = O((d) => {
    e && e([d]);
  }, [e]), v = O(async () => {
    if (!(n.length === 0 || !window.confirm(`선택한 ${n.length}개 항목을 삭제하시겠습니까?`))) {
      for (const E of n)
        await g(E);
      L(null);
    }
  }, [n, g]);
  return ct(() => {
    f();
  }, [f]), /* @__PURE__ */ i.jsxs(
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
      onDrop: N,
      onDragOver: W,
      children: [
        /* @__PURE__ */ i.jsx(
          fr,
          {
            selectedCount: n.length,
            totalCount: a.length,
            filter: s,
            onImport: V,
            onFilterChange: R,
            onDeleteSelected: v,
            onRefresh: () => f()
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "media-content",
            style: {
              display: "flex",
              flex: 1,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ i.jsxs(
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
                    u && /* @__PURE__ */ i.jsx(
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
                        children: /* @__PURE__ */ i.jsx("div", { className: "spinner", style: { color: "#fff", fontSize: "16px" }, children: "로딩 중..." })
                      }
                    ),
                    /* @__PURE__ */ i.jsx(
                      gr,
                      {
                        items: a,
                        selectedItems: n,
                        onSelectItem: J,
                        onItemDoubleClick: m,
                        onItemDragStart: r
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ i.jsx(
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
                  children: I ? /* @__PURE__ */ i.jsx(
                    mr,
                    {
                      item: I,
                      onClose: () => L(null),
                      onFavoriteToggle: async (d, E) => {
                        await c(d, { favorite: E });
                      },
                      onTagAdd: async (d, E) => {
                        const A = a.find((G) => G.id === d);
                        A && !A.tags.includes(E) && await c(d, { tags: [...A.tags, E] });
                      },
                      onTagRemove: async (d, E) => {
                        const A = a.find((G) => G.id === d);
                        A && await c(d, { tags: A.tags.filter((G) => G !== E) });
                      }
                    }
                  ) : /* @__PURE__ */ i.jsxs(
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
                        /* @__PURE__ */ i.jsx("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "👆" }),
                        /* @__PURE__ */ i.jsx("p", { children: "항목을 선택하여 미리보기" }),
                        /* @__PURE__ */ i.jsx("p", { style: { fontSize: "14px", marginTop: "8px" }, children: "미디어 파일을 선택하면 미리보기와 상세 정보가 표시됩니다" })
                      ]
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "file",
            ref: X,
            onChange: M,
            multiple: !0,
            accept: "video/*,audio/*,image/*",
            style: { display: "none" }
          }
        )
      ]
    }
  );
}, Rr = () => {
  const [e, r] = Q([]), [a, n] = Q([]), [s, u] = Q(!1), [p, f] = Q(null), [c, g] = Q({}), w = O(async (m) => {
    try {
      u(!0), f(null), await ne.load();
      const v = await K.importMedia(m);
      return r((d) => [...d, ...v]), v;
    } catch (v) {
      const d = v instanceof Error ? v : new Error("미디어 임포트 중 오류 발생");
      return f(d), [];
    } finally {
      u(!1);
    }
  }, []), x = O(async (m) => {
    try {
      u(!0), f(null);
      const v = m || c;
      m && g(m);
      const d = await K.getMediaItems(v);
      r(d);
    } catch (v) {
      const d = v instanceof Error ? v : new Error("미디어 새로고침 중 오류 발생");
      f(d);
    } finally {
      u(!1);
    }
  }, [c]), C = O(async (m, v) => {
    try {
      f(null);
      const d = await K.updateMedia(m, v);
      return r((E) => E.map(
        (A) => A.id === m ? d : A
      )), d;
    } catch (d) {
      const E = d instanceof Error ? d : new Error("미디어 업데이트 중 오류 발생");
      throw f(E), E;
    }
  }, []), R = O(async (m) => {
    try {
      f(null);
      const v = await K.deleteMedia(m);
      return v && (r((d) => d.filter((E) => E.id !== m)), n((d) => d.filter((E) => E !== m))), v;
    } catch (v) {
      const d = v instanceof Error ? v : new Error("미디어 삭제 중 오류 발생");
      return f(d), !1;
    }
  }, []), I = O(async (m) => {
    try {
      return f(null), await ne.load(), await K.extractMetadata(m);
    } catch (v) {
      const d = v instanceof Error ? v : new Error("메타데이터 추출 중 오류 발생");
      throw f(d), d;
    }
  }, []), L = O(async (m, v) => {
    try {
      f(null);
      const d = await K.generateThumbnail(m, v);
      return r((E) => E.map(
        (A) => A.id === m.id ? { ...A, thumbnail: d } : A
      )), d;
    } catch (d) {
      const E = d instanceof Error ? d : new Error("썸네일 생성 중 오류 발생");
      throw f(E), E;
    }
  }, []), X = O(async (m, v, d, E = {}) => {
    try {
      const A = /* @__PURE__ */ new Date(), ce = {
        id: dt(),
        name: m,
        type: v,
        path: d,
        url: d,
        size: 0,
        // 외부 URL은 파일 크기를 알 수 없음
        createdAt: A,
        importedAt: A,
        metadata: E,
        tags: [],
        favorite: !1,
        thumbnail: ""
      };
      return r((Z) => [...Z, ce]), ce;
    } catch (A) {
      const G = A instanceof Error ? A : new Error("미디어 항목 생성 중 오류 발생");
      throw f(G), G;
    }
  }, []), V = O((m) => {
    n((v) => v.includes(m) ? v : [...v, m]);
  }, []), M = O((m) => {
    n((v) => v.filter((d) => d !== m));
  }, []), N = O(() => {
    n(e.map((m) => m.id));
  }, [e]), W = O(() => {
    n([]);
  }, []), J = O((m) => {
    g(m), x(m);
  }, [x]);
  return ct(() => (x(), () => {
    ne.terminate().catch(console.error);
  }), [x]), {
    items: e,
    selectedItems: a,
    isLoading: s,
    error: p,
    filter: c,
    importMedia: w,
    refreshMedia: x,
    updateMedia: C,
    deleteMedia: R,
    extractMetadata: I,
    generateThumbnail: L,
    createMediaItem: X,
    selectItem: V,
    deselectItem: M,
    selectAll: N,
    deselectAll: W,
    applyFilter: J
  };
};
export {
  ne as FFmpegService,
  gr as MediaGrid,
  hr as MediaItem,
  wr as MediaManager,
  mr as MediaPreview,
  vr as MediaProvider,
  K as MediaService,
  fr as MediaToolbar,
  T as MediaType,
  pr as formatDate,
  pt as formatDuration,
  ft as formatFileSize,
  br as getBasename,
  Er as getFileExtension,
  Rr as useMedia,
  ur as useMediaContext
};
