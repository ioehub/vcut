import Ue, { createContext as mr, useReducer as gr, useRef as Me, useContext as hr, useState as De, useEffect as Ye } from "react";
var de = { exports: {} }, q = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e;
function br() {
  if ($e)
    return q;
  $e = 1;
  var i = Ue, p = Symbol.for("react.element"), P = Symbol.for("react.fragment"), _ = Object.prototype.hasOwnProperty, x = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(h, m, C) {
    var y, S = {}, j = null, F = null;
    C !== void 0 && (j = "" + C), m.key !== void 0 && (j = "" + m.key), m.ref !== void 0 && (F = m.ref);
    for (y in m)
      _.call(m, y) && !f.hasOwnProperty(y) && (S[y] = m[y]);
    if (h && h.defaultProps)
      for (y in m = h.defaultProps, m)
        S[y] === void 0 && (S[y] = m[y]);
    return { $$typeof: p, type: h, key: j, ref: F, props: S, _owner: x.current };
  }
  return q.Fragment = P, q.jsx = v, q.jsxs = v, q;
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
var Ie;
function _r() {
  return Ie || (Ie = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Ue, p = Symbol.for("react.element"), P = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), F = Symbol.for("react.offscreen"), A = Symbol.iterator, M = "@@iterator";
    function Y(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = A && e[A] || e[M];
      return typeof r == "function" ? r : null;
    }
    var k = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function l(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        d("error", e, t);
      }
    }
    function d(e, r, t) {
      {
        var n = k.ReactDebugCurrentFrame, u = n.getStackAddendum();
        u !== "" && (r += "%s", t = t.concat([u]));
        var c = t.map(function(s) {
          return String(s);
        });
        c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
      }
    }
    var T = !1, a = !1, z = !1, I = !1, X = !1, W;
    W = Symbol.for("react.module.reference");
    function H(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === _ || e === f || X || e === x || e === C || e === y || I || e === F || T || a || z || typeof e == "object" && e !== null && (e.$$typeof === j || e.$$typeof === S || e.$$typeof === v || e.$$typeof === h || e.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === W || e.getModuleId !== void 0));
    }
    function Z(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var u = r.displayName || r.name || "";
      return u !== "" ? t + "(" + u + ")" : t;
    }
    function V(e) {
      return e.displayName || "Context";
    }
    function R(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && l("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case _:
          return "Fragment";
        case P:
          return "Portal";
        case f:
          return "Profiler";
        case x:
          return "StrictMode";
        case C:
          return "Suspense";
        case y:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            var r = e;
            return V(r) + ".Consumer";
          case v:
            var t = e;
            return V(t._context) + ".Provider";
          case m:
            return Z(e, e.render, "ForwardRef");
          case S:
            var n = e.displayName || null;
            return n !== null ? n : R(e.type) || "Memo";
          case j: {
            var u = e, c = u._payload, s = u._init;
            try {
              return R(s(c));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, G = 0, ve, pe, ye, Ee, me, ge, he;
    function be() {
    }
    be.__reactDisabledLog = !0;
    function Ge() {
      {
        if (G === 0) {
          ve = console.log, pe = console.info, ye = console.warn, Ee = console.error, me = console.group, ge = console.groupCollapsed, he = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: be,
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
        G++;
      }
    }
    function Be() {
      {
        if (G--, G === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, e, {
              value: ve
            }),
            info: D({}, e, {
              value: pe
            }),
            warn: D({}, e, {
              value: ye
            }),
            error: D({}, e, {
              value: Ee
            }),
            group: D({}, e, {
              value: me
            }),
            groupCollapsed: D({}, e, {
              value: ge
            }),
            groupEnd: D({}, e, {
              value: he
            })
          });
        }
        G < 0 && l("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ne = k.ReactCurrentDispatcher, ae;
    function Q(e, r, t) {
      {
        if (ae === void 0)
          try {
            throw Error();
          } catch (u) {
            var n = u.stack.trim().match(/\n( *(at )?)/);
            ae = n && n[1] || "";
          }
        return `
` + ae + e;
      }
    }
    var ie = !1, ee;
    {
      var Ke = typeof WeakMap == "function" ? WeakMap : Map;
      ee = new Ke();
    }
    function _e(e, r) {
      if (!e || ie)
        return "";
      {
        var t = ee.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      ie = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var c;
      c = ne.current, ne.current = null, Ge();
      try {
        if (r) {
          var s = function() {
            throw Error();
          };
          if (Object.defineProperty(s.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(s, []);
            } catch (w) {
              n = w;
            }
            Reflect.construct(e, [], s);
          } else {
            try {
              s.call();
            } catch (w) {
              n = w;
            }
            e.call(s.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (w) {
            n = w;
          }
          e();
        }
      } catch (w) {
        if (w && n && typeof w.stack == "string") {
          for (var o = w.stack.split(`
`), O = n.stack.split(`
`), E = o.length - 1, g = O.length - 1; E >= 1 && g >= 0 && o[E] !== O[g]; )
            g--;
          for (; E >= 1 && g >= 0; E--, g--)
            if (o[E] !== O[g]) {
              if (E !== 1 || g !== 1)
                do
                  if (E--, g--, g < 0 || o[E] !== O[g]) {
                    var L = `
` + o[E].replace(" at new ", " at ");
                    return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), typeof e == "function" && ee.set(e, L), L;
                  }
                while (E >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        ie = !1, ne.current = c, Be(), Error.prepareStackTrace = u;
      }
      var U = e ? e.displayName || e.name : "", $ = U ? Q(U) : "";
      return typeof e == "function" && ee.set(e, $), $;
    }
    function qe(e, r, t) {
      return _e(e, !1);
    }
    function Je(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function re(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return _e(e, Je(e));
      if (typeof e == "string")
        return Q(e);
      switch (e) {
        case C:
          return Q("Suspense");
        case y:
          return Q("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            return qe(e.render);
          case S:
            return re(e.type, r, t);
          case j: {
            var n = e, u = n._payload, c = n._init;
            try {
              return re(c(u), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var B = Object.prototype.hasOwnProperty, Re = {}, Te = k.ReactDebugCurrentFrame;
    function te(e) {
      if (e) {
        var r = e._owner, t = re(e.type, e._source, r ? r.type : null);
        Te.setExtraStackFrame(t);
      } else
        Te.setExtraStackFrame(null);
    }
    function ze(e, r, t, n, u) {
      {
        var c = Function.call.bind(B);
        for (var s in e)
          if (c(e, s)) {
            var o = void 0;
            try {
              if (typeof e[s] != "function") {
                var O = Error((n || "React class") + ": " + t + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              o = e[s](r, s, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (E) {
              o = E;
            }
            o && !(o instanceof Error) && (te(u), l("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, s, typeof o), te(null)), o instanceof Error && !(o.message in Re) && (Re[o.message] = !0, te(u), l("Failed %s type: %s", t, o.message), te(null));
          }
      }
    }
    var Xe = Array.isArray;
    function oe(e) {
      return Xe(e);
    }
    function He(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ze(e) {
      try {
        return Pe(e), !1;
      } catch {
        return !0;
      }
    }
    function Pe(e) {
      return "" + e;
    }
    function Se(e) {
      if (Ze(e))
        return l("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(e)), Pe(e);
    }
    var K = k.ReactCurrentOwner, Qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, xe, Oe, se;
    se = {};
    function er(e) {
      if (B.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function rr(e) {
      if (B.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function tr(e, r) {
      if (typeof e.ref == "string" && K.current && r && K.current.stateNode !== r) {
        var t = R(K.current.type);
        se[t] || (l('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', R(K.current.type), e.ref), se[t] = !0);
      }
    }
    function nr(e, r) {
      {
        var t = function() {
          xe || (xe = !0, l("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
          Oe || (Oe = !0, l("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ir = function(e, r, t, n, u, c, s) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: p,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: s,
        // Record the component responsible for creating this element.
        _owner: c
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
        value: u
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function or(e, r, t, n, u) {
      {
        var c, s = {}, o = null, O = null;
        t !== void 0 && (Se(t), o = "" + t), rr(r) && (Se(r.key), o = "" + r.key), er(r) && (O = r.ref, tr(r, u));
        for (c in r)
          B.call(r, c) && !Qe.hasOwnProperty(c) && (s[c] = r[c]);
        if (e && e.defaultProps) {
          var E = e.defaultProps;
          for (c in E)
            s[c] === void 0 && (s[c] = E[c]);
        }
        if (o || O) {
          var g = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && nr(s, g), O && ar(s, g);
        }
        return ir(e, o, O, u, n, K.current, s);
      }
    }
    var ue = k.ReactCurrentOwner, we = k.ReactDebugCurrentFrame;
    function N(e) {
      if (e) {
        var r = e._owner, t = re(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    var le;
    le = !1;
    function ce(e) {
      return typeof e == "object" && e !== null && e.$$typeof === p;
    }
    function Ce() {
      {
        if (ue.current) {
          var e = R(ue.current.type);
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
    var je = {};
    function ur(e) {
      {
        var r = Ce();
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
        var t = ur(r);
        if (je[t])
          return;
        je[t] = !0;
        var n = "";
        e && e._owner && e._owner !== ue.current && (n = " It was passed a child from " + R(e._owner.type) + "."), N(e), l('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), N(null);
      }
    }
    function ke(e, r) {
      {
        if (typeof e != "object")
          return;
        if (oe(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            ce(n) && Le(n, r);
          }
        else if (ce(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var u = Y(e);
          if (typeof u == "function" && u !== e.entries)
            for (var c = u.call(e), s; !(s = c.next()).done; )
              ce(s.value) && Le(s.value, r);
        }
      }
    }
    function lr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === S))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = R(r);
          ze(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !le) {
          le = !0;
          var u = R(r);
          l("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", u || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && l("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function cr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            N(e), l("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), N(null);
            break;
          }
        }
        e.ref !== null && (N(e), l("Invalid attribute `ref` supplied to `React.Fragment`."), N(null));
      }
    }
    var Fe = {};
    function Ae(e, r, t, n, u, c) {
      {
        var s = H(e);
        if (!s) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = sr(u);
          O ? o += O : o += Ce();
          var E;
          e === null ? E = "null" : oe(e) ? E = "array" : e !== void 0 && e.$$typeof === p ? (E = "<" + (R(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : E = typeof e, l("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", E, o);
        }
        var g = or(e, r, t, u, c);
        if (g == null)
          return g;
        if (s) {
          var L = r.children;
          if (L !== void 0)
            if (n)
              if (oe(L)) {
                for (var U = 0; U < L.length; U++)
                  ke(L[U], e);
                Object.freeze && Object.freeze(L);
              } else
                l("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ke(L, e);
        }
        if (B.call(r, "key")) {
          var $ = R(e), w = Object.keys(r).filter(function(Er) {
            return Er !== "key";
          }), fe = w.length > 0 ? "{key: someKey, " + w.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Fe[$ + fe]) {
            var yr = w.length > 0 ? "{" + w.join(": ..., ") + ": ...}" : "{}";
            l(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, fe, $, yr, $), Fe[$ + fe] = !0;
          }
        }
        return e === _ ? cr(g) : lr(g), g;
      }
    }
    function fr(e, r, t) {
      return Ae(e, r, t, !0);
    }
    function dr(e, r, t) {
      return Ae(e, r, t, !1);
    }
    var vr = dr, pr = fr;
    J.Fragment = _, J.jsx = vr, J.jsxs = pr;
  }()), J;
}
process.env.NODE_ENV === "production" ? de.exports = br() : de.exports = _r();
var b = de.exports;
const Rr = {
  isPlaying: !1,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: !1,
  isBuffering: !1,
  isLoaded: !1,
  isFullscreen: !1
};
function Tr(i, p) {
  switch (p.type) {
    case "PLAY":
      return { ...i, isPlaying: !0 };
    case "PAUSE":
      return { ...i, isPlaying: !1 };
    case "TOGGLE_PLAY":
      return { ...i, isPlaying: !i.isPlaying };
    case "SEEK":
      return { ...i, currentTime: p.payload };
    case "SET_VOLUME":
      return { ...i, volume: p.payload };
    case "TOGGLE_MUTE":
      return { ...i, isMuted: !i.isMuted };
    case "TOGGLE_FULLSCREEN":
      return { ...i, isFullscreen: !i.isFullscreen };
    case "SET_DURATION":
      return { ...i, duration: p.payload };
    case "SET_BUFFERING":
      return { ...i, isBuffering: p.payload };
    case "SET_LOADED":
      return { ...i, isLoaded: p.payload };
    default:
      return i;
  }
}
const We = mr(void 0), Pr = ({ children: i }) => {
  const [p, P] = gr(Tr, Rr), _ = Me(null), x = { state: p, dispatch: P, videoRef: _ };
  return /* @__PURE__ */ b.jsx(We.Provider, { value: x, children: i });
}, Ve = () => {
  const i = hr(We);
  if (i === void 0)
    throw new Error("usePlayer must be used within a PreviewPlayerProvider");
  return i;
};
const Ne = (i, p = "mm:ss") => {
  if (p === "seconds")
    return i.toFixed(1);
  const P = (v) => v < 10 ? `0${v}` : `${v}`, _ = Math.floor(i / 3600), x = Math.floor(i % 3600 / 60), f = Math.floor(i % 60);
  return p === "hh:mm:ss" || _ > 0 ? `${P(_)}:${P(x)}:${P(f)}` : `${P(x)}:${P(f)}`;
}, Sr = ({
  showControls: i,
  timeFormat: p = "mm:ss",
  showVolumeControl: P = !0,
  showFullscreenButton: _ = !0,
  showProgressBar: x = !0
}) => {
  const { state: f, dispatch: v, videoRef: h } = Ve(), [m, C] = De(!1), [y, S] = De(!1);
  Ye(() => {
    if (!i) {
      C(!1);
      return;
    }
    let d;
    const T = () => {
      C(!0), clearTimeout(d), f.isPlaying && (d = setTimeout(() => {
        y || C(!1);
      }, 3e3));
    }, a = h.current;
    return a && (a.addEventListener("mousemove", T), a.addEventListener("mouseenter", T), a.addEventListener("mouseleave", () => {
      !y && f.isPlaying && C(!1);
    })), () => {
      clearTimeout(d), a && (a.removeEventListener("mousemove", T), a.removeEventListener("mouseenter", T));
    };
  }, [i, f.isPlaying, y, h]);
  const j = () => {
    const d = h.current;
    d && (f.isPlaying ? (d.pause(), v({ type: "PAUSE" })) : (d.play(), v({ type: "PLAY" })));
  }, F = () => {
    const d = h.current;
    d && (d.muted = !d.muted, v({ type: "TOGGLE_MUTE" }));
  }, A = (d) => {
    const T = h.current;
    if (!T)
      return;
    const a = parseFloat(d.target.value);
    T.volume = a, v({ type: "SET_VOLUME", payload: a });
  }, M = (d) => {
    const T = h.current;
    if (!T)
      return;
    const a = parseFloat(d.target.value);
    T.currentTime = a, v({ type: "SEEK", payload: a });
  }, Y = () => {
    const d = h.current;
    d && (document.fullscreenElement ? document.exitFullscreen() : d.requestFullscreen().catch((T) => {
      console.error(`전체 화면 모드 전환 오류: ${T.message}`);
    }), v({ type: "TOGGLE_FULLSCREEN" }));
  }, k = () => {
    S(!0);
  }, l = () => {
    S(!1);
  };
  return !i && !m ? null : /* @__PURE__ */ b.jsxs("div", { className: `player-controls ${m ? "visible" : ""}`, children: [
    x && /* @__PURE__ */ b.jsxs("div", { className: "progress-container", children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "range",
          className: "progress-bar",
          min: 0,
          max: f.duration || 100,
          value: f.currentTime,
          onChange: M,
          onMouseDown: k,
          onMouseUp: l,
          onTouchStart: k,
          onTouchEnd: l
        }
      ),
      /* @__PURE__ */ b.jsx(
        "div",
        {
          className: "progress-indicator",
          style: { width: `${f.currentTime / (f.duration || 1) * 100}%` }
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "controls-row", children: [
      /* @__PURE__ */ b.jsx("button", { className: "control-button", onClick: j, children: f.isPlaying ? "⏸️" : "▶️" }),
      /* @__PURE__ */ b.jsxs("div", { className: "time-display", children: [
        Ne(f.currentTime, p),
        " / ",
        Ne(f.duration, p)
      ] }),
      P && /* @__PURE__ */ b.jsxs("div", { className: "volume-control", children: [
        /* @__PURE__ */ b.jsx("button", { className: "control-button", onClick: F, children: f.isMuted ? "🔇" : "🔊" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            className: "volume-slider",
            min: 0,
            max: 1,
            step: 0.1,
            value: f.volume,
            onChange: A
          }
        )
      ] }),
      _ && /* @__PURE__ */ b.jsx("button", { className: "control-button", onClick: Y, children: f.isFullscreen ? "⏹️" : "⛶" })
    ] })
  ] });
};
const xr = ({
  src: i,
  autoPlay: p = !1,
  controls: P = !0,
  loop: _ = !1,
  muted: x = !1,
  poster: f,
  startTime: v,
  endTime: h,
  width: m = "100%",
  height: C = "auto",
  onPlayStateChange: y,
  onTimeUpdate: S,
  onLoadedData: j,
  onEnded: F,
  onError: A,
  className: M,
  style: Y
}) => {
  const { state: k, dispatch: l, videoRef: d } = Ve(), T = Me(null);
  return Ye(() => {
    const a = d.current;
    if (!a)
      return;
    const z = () => {
      l({ type: "SET_LOADED", payload: !0 }), l({ type: "SET_DURATION", payload: a.duration }), v !== void 0 && v >= 0 && (a.currentTime = v), j && j();
    }, I = () => {
      const R = !a.paused;
      l({ type: R ? "PLAY" : "PAUSE" }), y && y(R);
    }, X = () => {
      const R = a.currentTime;
      h !== void 0 && R >= h && (a.pause(), _ && (a.currentTime = v || 0, a.play())), l({ type: "SEEK", payload: R }), S && S(R);
    }, W = () => {
      l({ type: "PAUSE" }), _ && (a.currentTime = v || 0, a.play()), F && F();
    }, H = (R) => {
      A && A(new Error("비디오 로드 중 오류가 발생했습니다."));
    }, Z = () => {
      l({ type: "SET_BUFFERING", payload: !0 });
    }, V = () => {
      l({ type: "SET_BUFFERING", payload: !1 });
    };
    return a.addEventListener("loadeddata", z), a.addEventListener("play", I), a.addEventListener("pause", I), a.addEventListener("timeupdate", X), a.addEventListener("ended", W), a.addEventListener("error", H), a.addEventListener("waiting", Z), a.addEventListener("playing", V), a.muted = x, l({ type: "TOGGLE_MUTE" }), () => {
      a.removeEventListener("loadeddata", z), a.removeEventListener("play", I), a.removeEventListener("pause", I), a.removeEventListener("timeupdate", X), a.removeEventListener("ended", W), a.removeEventListener("error", H), a.removeEventListener("waiting", Z), a.removeEventListener("playing", V), T.current && clearInterval(T.current);
    };
  }, [
    d,
    l,
    v,
    h,
    _,
    x,
    j,
    y,
    S,
    F,
    A
  ]), /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `preview-player-container ${M || ""}`,
      style: {
        ...Y,
        width: m,
        height: C,
        position: "relative"
      },
      children: [
        /* @__PURE__ */ b.jsx(
          "video",
          {
            ref: d,
            className: "preview-player-video",
            src: i,
            poster: f,
            autoPlay: p,
            loop: _,
            muted: x,
            playsInline: !0
          }
        ),
        k.isBuffering && /* @__PURE__ */ b.jsx("div", { className: "buffering-indicator", children: /* @__PURE__ */ b.jsx("div", { className: "spinner" }) }),
        P && /* @__PURE__ */ b.jsx(Sr, { showControls: P })
      ]
    }
  );
}, wr = (i) => /* @__PURE__ */ b.jsx(Pr, { children: /* @__PURE__ */ b.jsx(xr, { ...i }) });
export {
  wr as PreviewPlayer,
  Pr as PreviewPlayerProvider,
  Ve as usePlayer
};
