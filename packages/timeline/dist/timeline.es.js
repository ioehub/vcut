import De, { useState as oe, useRef as dr } from "react";
var ae = { exports: {} }, N = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function vr() {
  if (Pe)
    return N;
  Pe = 1;
  var c = De, f = Symbol.for("react.element"), S = Symbol.for("react.fragment"), E = Object.prototype.hasOwnProperty, y = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(_, d, i) {
    var v, w = {}, j = null, D = null;
    i !== void 0 && (j = "" + i), d.key !== void 0 && (j = "" + d.key), d.ref !== void 0 && (D = d.ref);
    for (v in d)
      E.call(d, v) && !m.hasOwnProperty(v) && (w[v] = d[v]);
    if (_ && _.defaultProps)
      for (v in d = _.defaultProps, d)
        w[v] === void 0 && (w[v] = d[v]);
    return { $$typeof: f, type: _, key: j, ref: D, props: w, _owner: y.current };
  }
  return N.Fragment = S, N.jsx = b, N.jsxs = b, N;
}
var X = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function pr() {
  return ke || (ke = 1, process.env.NODE_ENV !== "production" && function() {
    var c = De, f = Symbol.for("react.element"), S = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), _ = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), D = Symbol.for("react.offscreen"), M = Symbol.iterator, q = "@@iterator";
    function z(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = M && e[M] || e[q];
      return typeof r == "function" ? r : null;
    }
    var O = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function u(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        P("error", e, t);
      }
    }
    function P(e, r, t) {
      {
        var n = O.ReactDebugCurrentFrame, s = n.getStackAddendum();
        s !== "" && (r += "%s", t = t.concat([s]));
        var l = t.map(function(a) {
          return String(a);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var k = !1, $e = !1, Fe = !1, Ae = !1, Ie = !1, ie;
    ie = Symbol.for("react.module.reference");
    function Me(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === E || e === m || Ie || e === y || e === i || e === v || Ae || e === D || k || $e || Fe || typeof e == "object" && e !== null && (e.$$typeof === j || e.$$typeof === w || e.$$typeof === b || e.$$typeof === _ || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ie || e.getModuleId !== void 0));
    }
    function Le(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var s = r.displayName || r.name || "";
      return s !== "" ? t + "(" + s + ")" : t;
    }
    function se(e) {
      return e.displayName || "Context";
    }
    function C(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && u("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case E:
          return "Fragment";
        case S:
          return "Portal";
        case m:
          return "Profiler";
        case y:
          return "StrictMode";
        case i:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            var r = e;
            return se(r) + ".Consumer";
          case b:
            var t = e;
            return se(t._context) + ".Provider";
          case d:
            return Le(e, e.render, "ForwardRef");
          case w:
            var n = e.displayName || null;
            return n !== null ? n : C(e.type) || "Memo";
          case j: {
            var s = e, l = s._payload, a = s._init;
            try {
              return C(a(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var $ = Object.assign, L = 0, ue, le, fe, ce, de, ve, pe;
    function he() {
    }
    he.__reactDisabledLog = !0;
    function We() {
      {
        if (L === 0) {
          ue = console.log, le = console.info, fe = console.warn, ce = console.error, de = console.group, ve = console.groupCollapsed, pe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: he,
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
        L++;
      }
    }
    function Ye() {
      {
        if (L--, L === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: $({}, e, {
              value: ue
            }),
            info: $({}, e, {
              value: le
            }),
            warn: $({}, e, {
              value: fe
            }),
            error: $({}, e, {
              value: ce
            }),
            group: $({}, e, {
              value: de
            }),
            groupCollapsed: $({}, e, {
              value: ve
            }),
            groupEnd: $({}, e, {
              value: pe
            })
          });
        }
        L < 0 && u("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var K = O.ReactCurrentDispatcher, G;
    function U(e, r, t) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (s) {
            var n = s.stack.trim().match(/\n( *(at )?)/);
            G = n && n[1] || "";
          }
        return `
` + G + e;
      }
    }
    var H = !1, V;
    {
      var Ne = typeof WeakMap == "function" ? WeakMap : Map;
      V = new Ne();
    }
    function ge(e, r) {
      if (!e || H)
        return "";
      {
        var t = V.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      H = !0;
      var s = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = K.current, K.current = null, We();
      try {
        if (r) {
          var a = function() {
            throw Error();
          };
          if (Object.defineProperty(a.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(a, []);
            } catch (R) {
              n = R;
            }
            Reflect.construct(e, [], a);
          } else {
            try {
              a.call();
            } catch (R) {
              n = R;
            }
            e.call(a.prototype);
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
`), x = n.stack.split(`
`), p = o.length - 1, h = x.length - 1; p >= 1 && h >= 0 && o[p] !== x[h]; )
            h--;
          for (; p >= 1 && h >= 0; p--, h--)
            if (o[p] !== x[h]) {
              if (p !== 1 || h !== 1)
                do
                  if (p--, h--, h < 0 || o[p] !== x[h]) {
                    var T = `
` + o[p].replace(" at new ", " at ");
                    return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, T), T;
                  }
                while (p >= 1 && h >= 0);
              break;
            }
        }
      } finally {
        H = !1, K.current = l, Ye(), Error.prepareStackTrace = s;
      }
      var I = e ? e.displayName || e.name : "", F = I ? U(I) : "";
      return typeof e == "function" && V.set(e, F), F;
    }
    function Xe(e, r, t) {
      return ge(e, !1);
    }
    function ze(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function B(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, ze(e));
      if (typeof e == "string")
        return U(e);
      switch (e) {
        case i:
          return U("Suspense");
        case v:
          return U("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Xe(e.render);
          case w:
            return B(e.type, r, t);
          case j: {
            var n = e, s = n._payload, l = n._init;
            try {
              return B(l(s), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var W = Object.prototype.hasOwnProperty, me = {}, ye = O.ReactDebugCurrentFrame;
    function J(e) {
      if (e) {
        var r = e._owner, t = B(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(t);
      } else
        ye.setExtraStackFrame(null);
    }
    function Ue(e, r, t, n, s) {
      {
        var l = Function.call.bind(W);
        for (var a in e)
          if (l(e, a)) {
            var o = void 0;
            try {
              if (typeof e[a] != "function") {
                var x = Error((n || "React class") + ": " + t + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw x.name = "Invariant Violation", x;
              }
              o = e[a](r, a, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (p) {
              o = p;
            }
            o && !(o instanceof Error) && (J(s), u("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, a, typeof o), J(null)), o instanceof Error && !(o.message in me) && (me[o.message] = !0, J(s), u("Failed %s type: %s", t, o.message), J(null));
          }
      }
    }
    var Ve = Array.isArray;
    function Z(e) {
      return Ve(e);
    }
    function Be(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Je(e) {
      try {
        return be(e), !1;
      } catch {
        return !0;
      }
    }
    function be(e) {
      return "" + e;
    }
    function xe(e) {
      if (Je(e))
        return u("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), be(e);
    }
    var Y = O.ReactCurrentOwner, qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ee, Re, Q;
    Q = {};
    function Ke(e) {
      if (W.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ge(e) {
      if (W.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function He(e, r) {
      if (typeof e.ref == "string" && Y.current && r && Y.current.stateNode !== r) {
        var t = C(Y.current.type);
        Q[t] || (u('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C(Y.current.type), e.ref), Q[t] = !0);
      }
    }
    function Ze(e, r) {
      {
        var t = function() {
          Ee || (Ee = !0, u("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          Re || (Re = !0, u("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var er = function(e, r, t, n, s, l, a) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: a,
        // Record the component responsible for creating this element.
        _owner: l
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
    function rr(e, r, t, n, s) {
      {
        var l, a = {}, o = null, x = null;
        t !== void 0 && (xe(t), o = "" + t), Ge(r) && (xe(r.key), o = "" + r.key), Ke(r) && (x = r.ref, He(r, s));
        for (l in r)
          W.call(r, l) && !qe.hasOwnProperty(l) && (a[l] = r[l]);
        if (e && e.defaultProps) {
          var p = e.defaultProps;
          for (l in p)
            a[l] === void 0 && (a[l] = p[l]);
        }
        if (o || x) {
          var h = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && Ze(a, h), x && Qe(a, h);
        }
        return er(e, o, x, s, n, Y.current, a);
      }
    }
    var ee = O.ReactCurrentOwner, _e = O.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = B(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(t);
      } else
        _e.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function te(e) {
      return typeof e == "object" && e !== null && e.$$typeof === f;
    }
    function Te() {
      {
        if (ee.current) {
          var e = C(ee.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var we = {};
    function nr(e) {
      {
        var r = Te();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Se(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (we[t])
          return;
        we[t] = !0;
        var n = "";
        e && e._owner && e._owner !== ee.current && (n = " It was passed a child from " + C(e._owner.type) + "."), A(e), u('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function Ce(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Z(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            te(n) && Se(n, r);
          }
        else if (te(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var s = z(e);
          if (typeof s == "function" && s !== e.entries)
            for (var l = s.call(e), a; !(a = l.next()).done; )
              te(a.value) && Se(a.value, r);
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
        else if (typeof r == "object" && (r.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === w))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = C(r);
          Ue(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !re) {
          re = !0;
          var s = C(r);
          u("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", s || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && u("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ar(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), u("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), u("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var je = {};
    function Oe(e, r, t, n, s, l) {
      {
        var a = Me(e);
        if (!a) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var x = tr(s);
          x ? o += x : o += Te();
          var p;
          e === null ? p = "null" : Z(e) ? p = "array" : e !== void 0 && e.$$typeof === f ? (p = "<" + (C(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : p = typeof e, u("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, o);
        }
        var h = rr(e, r, t, s, l);
        if (h == null)
          return h;
        if (a) {
          var T = r.children;
          if (T !== void 0)
            if (n)
              if (Z(T)) {
                for (var I = 0; I < T.length; I++)
                  Ce(T[I], e);
                Object.freeze && Object.freeze(T);
              } else
                u("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ce(T, e);
        }
        if (W.call(r, "key")) {
          var F = C(e), R = Object.keys(r).filter(function(cr) {
            return cr !== "key";
          }), ne = R.length > 0 ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!je[F + ne]) {
            var fr = R.length > 0 ? "{" + R.join(": ..., ") + ": ...}" : "{}";
            u(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ne, F, fr, F), je[F + ne] = !0;
          }
        }
        return e === E ? ar(h) : or(h), h;
      }
    }
    function ir(e, r, t) {
      return Oe(e, r, t, !0);
    }
    function sr(e, r, t) {
      return Oe(e, r, t, !1);
    }
    var ur = sr, lr = ir;
    X.Fragment = E, X.jsx = ur, X.jsxs = lr;
  }()), X;
}
process.env.NODE_ENV === "production" ? ae.exports = vr() : ae.exports = pr();
var g = ae.exports;
const hr = ({ clip: c, scale: f, trackId: S, onMove: E }) => {
  const [y, m] = oe(!1), [b, _] = oe(0), [d, i] = oe(0), v = dr(null), w = () => {
    switch (c.type) {
      case "video":
        return "#1890ff";
      case "audio":
        return "#52c41a";
      case "subtitle":
        return "#faad14";
      default:
        return "#6c757d";
    }
  }, j = (u) => {
    u.preventDefault(), m(!0), _(u.clientX), i(c.startTime), document.addEventListener("mousemove", D), document.addEventListener("mouseup", M);
  }, D = (u) => {
    if (!y)
      return;
    const P = u.clientX - b, k = Math.max(0, d + P / f);
    v.current && (v.current.style.left = `${k * f}px`);
  }, M = (u) => {
    if (!y)
      return;
    const P = u.clientX - b, k = Math.max(0, d + P / f);
    E(c.id, S, k), m(!1), document.removeEventListener("mousemove", D), document.removeEventListener("mouseup", M);
  }, q = (u) => {
    u.preventDefault(), m(!0), _(u.touches[0].clientX), i(c.startTime), document.addEventListener("touchmove", z), document.addEventListener("touchend", O);
  }, z = (u) => {
    if (!y)
      return;
    const P = u.touches[0].clientX - b, k = Math.max(0, d + P / f);
    v.current && (v.current.style.left = `${k * f}px`);
  }, O = (u) => {
    if (!y)
      return;
    const P = u.changedTouches[0].clientX - b, k = Math.max(0, d + P / f);
    E(c.id, S, k), m(!1), document.removeEventListener("touchmove", z), document.removeEventListener("touchend", O);
  };
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      ref: v,
      className: "timeline-clip",
      style: {
        left: `${c.startTime * f}px`,
        width: `${c.duration * f}px`,
        backgroundColor: w(),
        cursor: y ? "grabbing" : "grab",
        zIndex: y ? 100 : 10,
        opacity: y ? 0.8 : 1,
        transition: y ? "none" : "opacity 0.2s",
        fontSize: `${Math.min(14, Math.max(10, c.duration * f / 10))}px`
      },
      onMouseDown: j,
      onTouchStart: q,
      children: [
        /* @__PURE__ */ g.jsx("div", { style: { padding: "0 8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: c.name }),
        /* @__PURE__ */ g.jsxs("div", { style: { fontSize: "10px", position: "absolute", bottom: "2px", right: "4px" }, children: [
          c.duration.toFixed(1),
          "s"
        ] })
      ]
    }
  );
}, gr = ({ track: c, scale: f, onClipMove: S, onRemove: E }) => {
  const y = () => {
    switch (c.type) {
      case "video":
        return "#e6f7ff";
      case "audio":
        return "#f6ffed";
      case "subtitle":
        return "#fff7e6";
      default:
        return "#f0f0f0";
    }
  };
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: "timeline-track",
      style: {
        height: "60px",
        position: "relative",
        backgroundColor: y(),
        borderBottom: "1px solid #ddd"
      },
      children: [
        E && /* @__PURE__ */ g.jsx(
          "div",
          {
            style: {
              position: "absolute",
              right: "6px",
              top: "6px",
              width: "16px",
              height: "16px",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "#f00",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              cursor: "pointer",
              zIndex: 10,
              opacity: 0.5
            },
            onClick: () => E(c.id),
            onMouseOver: (m) => m.currentTarget.style.opacity = "1",
            onMouseOut: (m) => m.currentTarget.style.opacity = "0.5"
          }
        ),
        c.clips.map((m) => /* @__PURE__ */ g.jsx(
          hr,
          {
            clip: m,
            scale: f,
            trackId: c.id,
            onMove: S
          },
          m.id
        ))
      ]
    }
  );
}, yr = ({
  tracks: c,
  scale: f,
  currentTime: S,
  onClipMove: E,
  onTrackAdd: y,
  onTrackRemove: m
}) => {
  const b = Math.max(
    30,
    ...c.flatMap(
      (i) => i.clips.map((v) => v.startTime + v.duration)
    )
  ), _ = [];
  for (let i = 0; i <= b; i++)
    i % 1 === 0 && _.push(
      /* @__PURE__ */ g.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: `${i * f}px`,
            top: 0,
            height: "100%",
            borderLeft: i % 5 === 0 ? "1px solid #aaa" : "1px solid #ddd",
            zIndex: 1,
            pointerEvents: "none"
          }
        },
        `marker-${i}`
      )
    );
  const d = [];
  for (let i = 0; i <= b; i++)
    i % 1 === 0 && d.push(
      /* @__PURE__ */ g.jsxs(
        "div",
        {
          style: {
            position: "absolute",
            left: `${i * f}px`,
            top: 0,
            fontSize: "12px",
            color: "#666",
            transform: "translateX(-50%)",
            userSelect: "none"
          },
          children: [
            i,
            "s"
          ]
        },
        `label-${i}`
      )
    );
  return /* @__PURE__ */ g.jsxs("div", { className: "timeline", style: { position: "relative", width: "100%" }, children: [
    /* @__PURE__ */ g.jsx(
      "div",
      {
        style: {
          height: "20px",
          position: "relative",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ddd",
          marginLeft: "80px",
          // Space for track labels
          width: `${b * f}px`,
          overflow: "hidden"
        },
        children: d
      }
    ),
    /* @__PURE__ */ g.jsx("div", { style: {
      width: "80px",
      position: "absolute",
      top: 0,
      left: 0,
      height: "20px",
      backgroundColor: "#e0e0e0",
      borderBottom: "1px solid #ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "bold",
      borderRight: "1px solid #ccc"
    }, children: "Track" }),
    /* @__PURE__ */ g.jsxs("div", { style: {
      position: "relative",
      marginLeft: "80px",
      width: `${b * f}px`
    }, children: [
      _,
      c.map((i) => /* @__PURE__ */ g.jsx(
        gr,
        {
          track: i,
          scale: f,
          onClipMove: E,
          onRemove: m
        },
        i.id
      ))
    ] }),
    /* @__PURE__ */ g.jsx("div", { style: { position: "absolute", top: "20px", left: 0, width: "80px" }, children: c.map((i) => /* @__PURE__ */ g.jsxs(
      "div",
      {
        style: {
          height: "60px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ddd",
          padding: "0 8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "12px",
          borderRight: "1px solid #ccc",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        },
        children: [
          /* @__PURE__ */ g.jsx("div", { style: { fontWeight: "bold" }, children: i.name }),
          /* @__PURE__ */ g.jsx("div", { style: { fontSize: "10px", color: "#666" }, children: i.type })
        ]
      },
      `label-${i.id}`
    )) }),
    /* @__PURE__ */ g.jsx("div", { style: {
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      border: "1px dashed #ccc",
      borderRadius: "4px",
      margin: "4px 0",
      marginLeft: "80px",
      color: "#666",
      fontSize: "14px",
      userSelect: "none",
      width: `${b * f}px`
    }, onClick: y, children: "Add Track" }),
    /* @__PURE__ */ g.jsx("div", { style: {
      position: "absolute",
      left: `${S * f + 80}px`,
      // 80px offset for track labels
      top: 0,
      width: "2px",
      height: `${c.length * 60 + 60}px`,
      // +60 for header and add track button
      backgroundColor: "red",
      zIndex: 100,
      pointerEvents: "none"
    } })
  ] });
};
export {
  hr as Clip,
  yr as Timeline,
  gr as Track
};
