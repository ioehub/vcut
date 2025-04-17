import Me, { useState as F, useEffect as Z } from "react";
var de = { exports: {} }, Y = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function mt() {
  if (Be)
    return Y;
  Be = 1;
  var p = Me, c = Symbol.for("react.element"), C = Symbol.for("react.fragment"), S = Object.prototype.hasOwnProperty, o = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(b, f, E) {
    var d, R = {}, T = null, _ = null;
    E !== void 0 && (T = "" + E), f.key !== void 0 && (T = "" + f.key), f.ref !== void 0 && (_ = f.ref);
    for (d in f)
      S.call(f, d) && !y.hasOwnProperty(d) && (R[d] = f[d]);
    if (b && b.defaultProps)
      for (d in f = b.defaultProps, f)
        R[d] === void 0 && (R[d] = f[d]);
    return { $$typeof: c, type: b, key: T, ref: _, props: R, _owner: o.current };
  }
  return Y.Fragment = C, Y.jsx = x, Y.jsxs = x, Y;
}
var L = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var De;
function vt() {
  return De || (De = 1, process.env.NODE_ENV !== "production" && function() {
    var p = Me, c = Symbol.for("react.element"), C = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), b = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), _ = Symbol.for("react.offscreen"), a = Symbol.iterator, j = "@@iterator";
    function i(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = a && e[a] || e[j];
      return typeof r == "function" ? r : null;
    }
    var m = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function s(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
          n[l - 1] = arguments[l];
        w("error", e, n);
      }
    }
    function w(e, r, n) {
      {
        var l = m.ReactDebugCurrentFrame, h = l.getStackAddendum();
        h !== "" && (r += "%s", n = n.concat([h]));
        var v = n.map(function(g) {
          return String(g);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var P = !1, B = !1, $ = !1, Ie = !1, We = !1, ue;
    ue = Symbol.for("react.module.reference");
    function He(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === S || e === y || We || e === o || e === E || e === d || Ie || e === _ || P || B || $ || typeof e == "object" && e !== null && (e.$$typeof === T || e.$$typeof === R || e.$$typeof === x || e.$$typeof === b || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ue || e.getModuleId !== void 0));
    }
    function Ue(e, r, n) {
      var l = e.displayName;
      if (l)
        return l;
      var h = r.displayName || r.name || "";
      return h !== "" ? n + "(" + h + ")" : n;
    }
    function pe(e) {
      return e.displayName || "Context";
    }
    function M(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && s("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case S:
          return "Fragment";
        case C:
          return "Portal";
        case y:
          return "Profiler";
        case o:
          return "StrictMode";
        case E:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case b:
            var r = e;
            return pe(r) + ".Consumer";
          case x:
            var n = e;
            return pe(n._context) + ".Provider";
          case f:
            return Ue(e, e.render, "ForwardRef");
          case R:
            var l = e.displayName || null;
            return l !== null ? l : M(e.type) || "Memo";
          case T: {
            var h = e, v = h._payload, g = h._init;
            try {
              return M(g(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, U = 0, fe, ge, he, xe, me, ve, be;
    function je() {
    }
    je.__reactDisabledLog = !0;
    function Je() {
      {
        if (U === 0) {
          fe = console.log, ge = console.info, he = console.warn, xe = console.error, me = console.group, ve = console.groupCollapsed, be = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: je,
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
        U++;
      }
    }
    function Ve() {
      {
        if (U--, U === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, e, {
              value: fe
            }),
            info: z({}, e, {
              value: ge
            }),
            warn: z({}, e, {
              value: he
            }),
            error: z({}, e, {
              value: xe
            }),
            group: z({}, e, {
              value: me
            }),
            groupCollapsed: z({}, e, {
              value: ve
            }),
            groupEnd: z({}, e, {
              value: be
            })
          });
        }
        U < 0 && s("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ee = m.ReactCurrentDispatcher, te;
    function K(e, r, n) {
      {
        if (te === void 0)
          try {
            throw Error();
          } catch (h) {
            var l = h.stack.trim().match(/\n( *(at )?)/);
            te = l && l[1] || "";
          }
        return `
` + te + e;
      }
    }
    var re = !1, X;
    {
      var Ye = typeof WeakMap == "function" ? WeakMap : Map;
      X = new Ye();
    }
    function ye(e, r) {
      if (!e || re)
        return "";
      {
        var n = X.get(e);
        if (n !== void 0)
          return n;
      }
      var l;
      re = !0;
      var h = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = ee.current, ee.current = null, Je();
      try {
        if (r) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (O) {
              l = O;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (O) {
              l = O;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            l = O;
          }
          e();
        }
      } catch (O) {
        if (O && l && typeof O.stack == "string") {
          for (var u = O.stack.split(`
`), A = l.stack.split(`
`), k = u.length - 1, N = A.length - 1; k >= 1 && N >= 0 && u[k] !== A[N]; )
            N--;
          for (; k >= 1 && N >= 0; k--, N--)
            if (u[k] !== A[N]) {
              if (k !== 1 || N !== 1)
                do
                  if (k--, N--, N < 0 || u[k] !== A[N]) {
                    var D = `
` + u[k].replace(" at new ", " at ");
                    return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), typeof e == "function" && X.set(e, D), D;
                  }
                while (k >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        re = !1, ee.current = v, Ve(), Error.prepareStackTrace = h;
      }
      var H = e ? e.displayName || e.name : "", I = H ? K(H) : "";
      return typeof e == "function" && X.set(e, I), I;
    }
    function Le(e, r, n) {
      return ye(e, !1);
    }
    function qe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function G(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ye(e, qe(e));
      if (typeof e == "string")
        return K(e);
      switch (e) {
        case E:
          return K("Suspense");
        case d:
          return K("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return Le(e.render);
          case R:
            return G(e.type, r, n);
          case T: {
            var l = e, h = l._payload, v = l._init;
            try {
              return G(v(h), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var J = Object.prototype.hasOwnProperty, Re = {}, we = m.ReactDebugCurrentFrame;
    function Q(e) {
      if (e) {
        var r = e._owner, n = G(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(n);
      } else
        we.setExtraStackFrame(null);
    }
    function Ke(e, r, n, l, h) {
      {
        var v = Function.call.bind(J);
        for (var g in e)
          if (v(e, g)) {
            var u = void 0;
            try {
              if (typeof e[g] != "function") {
                var A = Error((l || "React class") + ": " + n + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw A.name = "Invariant Violation", A;
              }
              u = e[g](r, g, l, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              u = k;
            }
            u && !(u instanceof Error) && (Q(h), s("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", l || "React class", n, g, typeof u), Q(null)), u instanceof Error && !(u.message in Re) && (Re[u.message] = !0, Q(h), s("Failed %s type: %s", n, u.message), Q(null));
          }
      }
    }
    var Xe = Array.isArray;
    function ne(e) {
      return Xe(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Qe(e) {
      try {
        return Ce(e), !1;
      } catch {
        return !0;
      }
    }
    function Ce(e) {
      return "" + e;
    }
    function Se(e) {
      if (Qe(e))
        return s("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), Ce(e);
    }
    var V = m.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ke, Te, se;
    se = {};
    function et(e) {
      if (J.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function tt(e) {
      if (J.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function rt(e, r) {
      if (typeof e.ref == "string" && V.current && r && V.current.stateNode !== r) {
        var n = M(V.current.type);
        se[n] || (s('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', M(V.current.type), e.ref), se[n] = !0);
      }
    }
    function nt(e, r) {
      {
        var n = function() {
          ke || (ke = !0, s("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function st(e, r) {
      {
        var n = function() {
          Te || (Te = !0, s("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var at = function(e, r, n, l, h, v, g) {
      var u = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: c,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: g,
        // Record the component responsible for creating this element.
        _owner: v
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
        value: l
      }), Object.defineProperty(u, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: h
      }), Object.freeze && (Object.freeze(u.props), Object.freeze(u)), u;
    };
    function it(e, r, n, l, h) {
      {
        var v, g = {}, u = null, A = null;
        n !== void 0 && (Se(n), u = "" + n), tt(r) && (Se(r.key), u = "" + r.key), et(r) && (A = r.ref, rt(r, h));
        for (v in r)
          J.call(r, v) && !Ze.hasOwnProperty(v) && (g[v] = r[v]);
        if (e && e.defaultProps) {
          var k = e.defaultProps;
          for (v in k)
            g[v] === void 0 && (g[v] = k[v]);
        }
        if (u || A) {
          var N = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          u && nt(g, N), A && st(g, N);
        }
        return at(e, u, A, h, l, V.current, g);
      }
    }
    var ae = m.ReactCurrentOwner, Ne = m.ReactDebugCurrentFrame;
    function W(e) {
      if (e) {
        var r = e._owner, n = G(e.type, e._source, r ? r.type : null);
        Ne.setExtraStackFrame(n);
      } else
        Ne.setExtraStackFrame(null);
    }
    var ie;
    ie = !1;
    function oe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === c;
    }
    function Ee() {
      {
        if (ae.current) {
          var e = M(ae.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ot(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + r + ":" + n + ".";
        }
        return "";
      }
    }
    var _e = {};
    function lt(e) {
      {
        var r = Ee();
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
        var n = lt(r);
        if (_e[n])
          return;
        _e[n] = !0;
        var l = "";
        e && e._owner && e._owner !== ae.current && (l = " It was passed a child from " + M(e._owner.type) + "."), W(e), s('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, l), W(null);
      }
    }
    function Ae(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ne(e))
          for (var n = 0; n < e.length; n++) {
            var l = e[n];
            oe(l) && Pe(l, r);
          }
        else if (oe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var h = i(e);
          if (typeof h == "function" && h !== e.entries)
            for (var v = h.call(e), g; !(g = v.next()).done; )
              oe(g.value) && Pe(g.value, r);
        }
      }
    }
    function ct(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          n = r.propTypes;
        else
          return;
        if (n) {
          var l = M(r);
          Ke(n, e.props, "prop", l, e);
        } else if (r.PropTypes !== void 0 && !ie) {
          ie = !0;
          var h = M(r);
          s("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", h || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && s("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function dt(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var l = r[n];
          if (l !== "children" && l !== "key") {
            W(e), s("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", l), W(null);
            break;
          }
        }
        e.ref !== null && (W(e), s("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    var Oe = {};
    function Fe(e, r, n, l, h, v) {
      {
        var g = He(e);
        if (!g) {
          var u = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var A = ot(h);
          A ? u += A : u += Ee();
          var k;
          e === null ? k = "null" : ne(e) ? k = "array" : e !== void 0 && e.$$typeof === c ? (k = "<" + (M(e.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : k = typeof e, s("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, u);
        }
        var N = it(e, r, n, h, v);
        if (N == null)
          return N;
        if (g) {
          var D = r.children;
          if (D !== void 0)
            if (l)
              if (ne(D)) {
                for (var H = 0; H < D.length; H++)
                  Ae(D[H], e);
                Object.freeze && Object.freeze(D);
              } else
                s("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ae(D, e);
        }
        if (J.call(r, "key")) {
          var I = M(e), O = Object.keys(r).filter(function(xt) {
            return xt !== "key";
          }), le = O.length > 0 ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Oe[I + le]) {
            var ht = O.length > 0 ? "{" + O.join(": ..., ") + ": ...}" : "{}";
            s(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, le, I, ht, I), Oe[I + le] = !0;
          }
        }
        return e === S ? dt(N) : ct(N), N;
      }
    }
    function ut(e, r, n) {
      return Fe(e, r, n, !0);
    }
    function pt(e, r, n) {
      return Fe(e, r, n, !1);
    }
    var ft = pt, gt = ut;
    L.Fragment = S, L.jsx = ft, L.jsxs = gt;
  }()), L;
}
process.env.NODE_ENV === "production" ? de.exports = mt() : de.exports = vt();
var t = de.exports;
const $e = () => {
  const c = ["nvidia", "amd", "intel", "none"][Math.floor(Math.random() * 3)], C = {
    nvidia: ["RTX 3090", "RTX 3080", "RTX 3070", "GTX 1660"],
    amd: ["RX 6900 XT", "RX 6800", "RX 6700 XT", "RX 5700"],
    intel: ["Arc A770", "Arc A750", "UHD Graphics 770", "Iris Xe"],
    none: ["기본 그래픽"]
  }, S = C[c][Math.floor(Math.random() * C[c].length)], o = c !== "none" ? Math.floor(Math.random() * 12) + 4 : 0;
  return {
    vendor: c,
    model: S,
    vram: c !== "none" ? o * 1024 : void 0,
    supported: c !== "none"
  };
}, Rt = (p) => {
  const c = [];
  if (!p.supported)
    return c;
  switch (p.vendor) {
    case "nvidia":
      c.push("-hwaccel", "cuda"), c.push("-c:v", "h264_nvenc");
      break;
    case "amd":
      c.push("-hwaccel", "amf"), c.push("-c:v", "h264_amf");
      break;
    case "intel":
      c.push("-hwaccel", "qsv"), c.push("-c:v", "h264_qsv");
      break;
  }
  return c;
}, ce = ({
  job: p,
  onProgress: c,
  onComplete: C,
  onError: S
}) => {
  const [o, y] = F(!1), [x, b] = F(null);
  Z(() => {
    const d = $e();
    b(d);
  }, []);
  const f = async (d) => {
    if (!d)
      return;
    y(!0);
    const R = { ...d, status: "processing", startTime: /* @__PURE__ */ new Date(), progress: 0 };
    try {
      await E(R);
      const T = {
        ...R,
        status: "completed",
        endTime: /* @__PURE__ */ new Date(),
        progress: 100
      };
      C && C(T);
    } catch (T) {
      ({
        ...R,
        errorMessage: T.message
      }, S && S(T.message));
    } finally {
      y(!1);
    }
  }, E = (d) => new Promise((R, T) => {
    let _ = 0;
    const a = d.settings.useHardwareAcceleration ? 5e3 : 15e3, j = 100, i = 100 / (a / j), m = setInterval(() => {
      _ += i;
      const s = Math.min(Math.round(_), 100), w = Math.max(0, Math.round(a * (100 - s) / 100 / 1e3));
      c && c(s, w), s >= 100 && (clearInterval(m), R());
    }, j);
  });
  return Z(() => {
    p && p.status === "waiting" && !o && f(p);
  }, [p]), /* @__PURE__ */ t.jsxs("div", { className: "rendering-engine", children: [
    x && /* @__PURE__ */ t.jsxs("div", { className: "hardware-info", children: [
      /* @__PURE__ */ t.jsx("h3", { children: "하드웨어 정보" }),
      /* @__PURE__ */ t.jsxs("p", { children: [
        "GPU: ",
        x.vendor !== "none" ? `${x.model} (${x.vendor})` : "감지되지 않음"
      ] }),
      x.vram && /* @__PURE__ */ t.jsxs("p", { children: [
        "VRAM: ",
        (x.vram / 1024).toFixed(1),
        " GB"
      ] }),
      /* @__PURE__ */ t.jsxs("p", { children: [
        "하드웨어 가속: ",
        x.supported ? "지원됨" : "지원되지 않음"
      ] })
    ] }),
    o ? /* @__PURE__ */ t.jsx("div", { className: "rendering-status", children: /* @__PURE__ */ t.jsxs("p", { children: [
      "렌더링 중... ",
      p == null ? void 0 : p.name
    ] }) }) : /* @__PURE__ */ t.jsx("div", { className: "rendering-status", children: /* @__PURE__ */ t.jsx("p", { children: "대기 중..." }) })
  ] });
}, ze = ({
  progress: p,
  timeRemaining: c,
  status: C = "진행 중"
}) => {
  const S = (y) => {
    if (!y)
      return "계산 중...";
    if (y < 60)
      return `약 ${y}초 남음`;
    const x = Math.floor(y / 60), b = y % 60;
    if (x < 60)
      return `약 ${x}분 ${b}초 남음`;
    const f = Math.floor(x / 60), E = x % 60;
    return `약 ${f}시간 ${E}분 남음`;
  }, o = {
    progressMonitor: {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      padding: "16px",
      margin: "16px 0",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Noto Sans KR', sans-serif"
    },
    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px"
    },
    headerTitle: {
      margin: 0,
      fontSize: "18px"
    },
    statusBadge: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "14px"
    },
    progressBarContainer: {
      height: "24px",
      backgroundColor: "#e0e0e0",
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "8px",
      position: "relative"
    },
    progressBar: (y) => ({
      height: "100%",
      background: "linear-gradient(90deg, #4CAF50, #8BC34A)",
      borderRadius: "12px",
      transition: "width 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: y
    }),
    progressPercentage: {
      color: "white",
      fontWeight: "bold",
      textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
    },
    progressInfo: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#666"
    },
    timeRemaining: {
      fontWeight: 500
    }
  };
  return /* @__PURE__ */ t.jsxs("div", { style: o.progressMonitor, children: [
    /* @__PURE__ */ t.jsxs("div", { style: o.progressHeader, children: [
      /* @__PURE__ */ t.jsx("h3", { style: o.headerTitle, children: "렌더링 진행 상황" }),
      /* @__PURE__ */ t.jsx("span", { style: o.statusBadge, children: C })
    ] }),
    /* @__PURE__ */ t.jsx("div", { style: o.progressBarContainer, children: /* @__PURE__ */ t.jsx("div", { style: o.progressBar(`${p}%`), children: /* @__PURE__ */ t.jsxs("span", { style: o.progressPercentage, children: [
      p,
      "%"
    ] }) }) }),
    /* @__PURE__ */ t.jsx("div", { style: o.progressInfo, children: /* @__PURE__ */ t.jsx("div", { style: o.timeRemaining, children: S(c) }) })
  ] });
}, bt = ({
  jobs: p,
  onJobStatusChange: c,
  onJobProgressUpdate: C,
  onJobRemove: S
}) => {
  const [o, y] = F([]), [x, b] = F([]), [f, E] = F([]), [d, R] = F(null);
  Z(() => {
    const i = p.filter((w) => w.status === "processing"), m = p.filter((w) => w.status === "waiting"), s = p.filter((w) => ["completed", "failed"].includes(w.status));
    y(i), b(m), E(s), R(i.length > 0 ? i[0] : null);
  }, [p]);
  const T = (i, m) => {
    c && c(i, m);
  }, _ = (i) => {
    S && S(i);
  }, a = (i) => {
    switch (i) {
      case "processing":
        return "#4CAF50";
      case "waiting":
        return "#2196F3";
      case "completed":
        return "#9C27B0";
      case "failed":
        return "#F44336";
      case "paused":
        return "#FF9800";
      default:
        return "#757575";
    }
  }, j = (i) => {
    switch (i) {
      case "processing":
        return "처리 중";
      case "waiting":
        return "대기 중";
      case "completed":
        return "완료됨";
      case "failed":
        return "실패";
      case "paused":
        return "일시 중지";
      default:
        return "알 수 없음";
    }
  };
  return /* @__PURE__ */ t.jsxs("div", { className: "rendering-queue", style: {
    fontFamily: "Noto Sans KR, sans-serif",
    padding: "16px"
  }, children: [
    /* @__PURE__ */ t.jsx("h2", { style: {
      marginTop: "0",
      marginBottom: "16px",
      fontSize: "24px"
    }, children: "렌더링 대기열" }),
    d && /* @__PURE__ */ t.jsxs("div", { className: "current-job", children: [
      /* @__PURE__ */ t.jsx("h3", { style: {
        marginTop: "24px",
        marginBottom: "12px",
        fontSize: "18px",
        color: "#333"
      }, children: "현재 처리 중인 작업" }),
      /* @__PURE__ */ t.jsxs("div", { className: "job-item active", style: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative"
      }, children: [
        /* @__PURE__ */ t.jsxs("div", { className: "job-info", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "job-header", style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }, children: [
            /* @__PURE__ */ t.jsx("span", { className: "job-name", style: {
              fontWeight: "500",
              fontSize: "16px",
              margin: "0"
            }, children: d.name }),
            /* @__PURE__ */ t.jsx(
              "span",
              {
                className: "status-badge",
                style: {
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: a(d.status)
                },
                children: j(d.status)
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "job-details", style: {
            marginBottom: "12px",
            fontSize: "14px",
            color: "#666"
          }, children: [
            /* @__PURE__ */ t.jsxs("p", { style: { margin: "4px 0" }, children: [
              "해상도: ",
              d.settings.resolution.width,
              "x",
              d.settings.resolution.height
            ] }),
            /* @__PURE__ */ t.jsxs("p", { style: { margin: "4px 0" }, children: [
              "형식: ",
              d.settings.format,
              ", 코덱: ",
              d.settings.codec
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t.jsx(
          ze,
          {
            progress: d.progress,
            timeRemaining: d.estimatedTimeRemaining,
            status: j(d.status)
          }
        ),
        /* @__PURE__ */ t.jsxs("div", { className: "job-actions", style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px"
        }, children: [
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "action-button pause",
              style: {
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#FF9800",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background-color 0.2s"
              },
              onClick: () => T(d.id, "paused"),
              disabled: d.status !== "processing",
              children: "일시 중지"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "action-button cancel",
              style: {
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#F44336",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background-color 0.2s"
              },
              onClick: () => T(d.id, "failed"),
              disabled: ["completed", "failed"].includes(d.status),
              children: "취소"
            }
          )
        ] })
      ] })
    ] }),
    x.length > 0 && /* @__PURE__ */ t.jsxs("div", { className: "queued-jobs", children: [
      /* @__PURE__ */ t.jsxs("h3", { style: {
        marginTop: "24px",
        marginBottom: "12px",
        fontSize: "18px",
        color: "#333"
      }, children: [
        "대기 중인 작업 (",
        x.length,
        ")"
      ] }),
      x.map((i) => /* @__PURE__ */ t.jsxs("div", { className: "job-item queued", style: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative"
      }, children: [
        /* @__PURE__ */ t.jsxs("div", { className: "job-info", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "job-header", style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }, children: [
            /* @__PURE__ */ t.jsx("span", { className: "job-name", style: {
              fontWeight: "500",
              fontSize: "16px",
              margin: "0"
            }, children: i.name }),
            /* @__PURE__ */ t.jsx(
              "span",
              {
                className: "status-badge",
                style: {
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: a(i.status)
                },
                children: j(i.status)
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "job-details", style: {
            marginBottom: "12px",
            fontSize: "14px",
            color: "#666"
          }, children: [
            /* @__PURE__ */ t.jsxs("p", { style: { margin: "4px 0" }, children: [
              "해상도: ",
              i.settings.resolution.width,
              "x",
              i.settings.resolution.height
            ] }),
            /* @__PURE__ */ t.jsxs("p", { style: { margin: "4px 0" }, children: [
              "형식: ",
              i.settings.format,
              ", 코덱: ",
              i.settings.codec
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "job-actions", style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px"
        }, children: /* @__PURE__ */ t.jsx(
          "button",
          {
            className: "action-button remove",
            style: {
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#F44336",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              transition: "background-color 0.2s"
            },
            onClick: () => _(i.id),
            children: "제거"
          }
        ) })
      ] }, i.id))
    ] }),
    f.length > 0 && /* @__PURE__ */ t.jsxs("div", { className: "completed-jobs", children: [
      /* @__PURE__ */ t.jsxs("h3", { style: {
        marginTop: "24px",
        marginBottom: "12px",
        fontSize: "18px",
        color: "#333"
      }, children: [
        "완료된 작업 (",
        f.length,
        ")"
      ] }),
      f.map((i) => /* @__PURE__ */ t.jsxs("div", { className: "job-item completed", style: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative"
      }, children: [
        /* @__PURE__ */ t.jsxs("div", { className: "job-info", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "job-header", style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }, children: [
            /* @__PURE__ */ t.jsx("span", { className: "job-name", style: {
              fontWeight: "500",
              fontSize: "16px",
              margin: "0"
            }, children: i.name }),
            /* @__PURE__ */ t.jsx(
              "span",
              {
                className: "status-badge",
                style: {
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: a(i.status)
                },
                children: j(i.status)
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "job-details", style: {
            marginBottom: "12px",
            fontSize: "14px",
            color: "#666"
          }, children: [
            /* @__PURE__ */ t.jsxs("p", { style: { margin: "4px 0" }, children: [
              "해상도: ",
              i.settings.resolution.width,
              "x",
              i.settings.resolution.height
            ] }),
            /* @__PURE__ */ t.jsxs("p", { style: { margin: "4px 0" }, children: [
              "형식: ",
              i.settings.format,
              ", 코덱: ",
              i.settings.codec
            ] }),
            i.endTime && i.startTime && /* @__PURE__ */ t.jsxs("p", { style: { margin: "4px 0" }, children: [
              "소요 시간: ",
              Math.round((i.endTime.getTime() - i.startTime.getTime()) / 1e3),
              "초"
            ] }),
            i.errorMessage && /* @__PURE__ */ t.jsxs("p", { className: "error-message", style: {
              color: "#F44336"
            }, children: [
              "오류: ",
              i.errorMessage
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "job-actions", style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px"
        }, children: /* @__PURE__ */ t.jsx(
          "button",
          {
            className: "action-button remove",
            style: {
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#F44336",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              transition: "background-color 0.2s"
            },
            onClick: () => _(i.id),
            children: "제거"
          }
        ) })
      ] }, i.id))
    ] })
  ] });
}, q = {
  "480p": {
    id: "preset-480p",
    name: "480p 표준",
    description: "작은 파일 크기, 웹 공유에 적합",
    settings: {
      resolution: {
        width: 854,
        height: 480,
        aspectRatio: "16:9"
      },
      format: "mp4",
      codec: "h264",
      bitrate: 2e6,
      // 2 Mbps
      frameRate: 30,
      useHardwareAcceleration: !0,
      audioSettings: {
        codec: "aac",
        bitrate: 128e3,
        // 128 kbps
        sampleRate: 44100,
        channels: 2
      }
    }
  },
  "720p": {
    id: "preset-720p",
    name: "HD 720p",
    description: "중간 품질, 대부분 디바이스에서 호환",
    settings: {
      resolution: {
        width: 1280,
        height: 720,
        aspectRatio: "16:9"
      },
      format: "mp4",
      codec: "h264",
      bitrate: 5e6,
      // 5 Mbps
      frameRate: 30,
      useHardwareAcceleration: !0,
      audioSettings: {
        codec: "aac",
        bitrate: 192e3,
        // 192 kbps
        sampleRate: 48e3,
        channels: 2
      }
    }
  },
  "1080p": {
    id: "preset-1080p",
    name: "Full HD 1080p",
    description: "고품질, TV 및 온라인 비디오에 적합",
    settings: {
      resolution: {
        width: 1920,
        height: 1080,
        aspectRatio: "16:9"
      },
      format: "mp4",
      codec: "h264",
      bitrate: 8e6,
      // 8 Mbps
      frameRate: 30,
      useHardwareAcceleration: !0,
      audioSettings: {
        codec: "aac",
        bitrate: 192e3,
        // 192 kbps
        sampleRate: 48e3,
        channels: 2
      }
    }
  },
  "4K": {
    id: "preset-4k",
    name: "Ultra HD 4K",
    description: "최고 품질, 전문 제작 및 출판용",
    settings: {
      resolution: {
        width: 3840,
        height: 2160,
        aspectRatio: "16:9"
      },
      format: "mp4",
      codec: "h265",
      // HEVC 코덱 사용
      bitrate: 2e7,
      // 20 Mbps
      frameRate: 30,
      useHardwareAcceleration: !0,
      audioSettings: {
        codec: "aac",
        bitrate: 32e4,
        // 320 kbps
        sampleRate: 48e3,
        channels: 2
      }
    }
  },
  Youtube: {
    id: "preset-youtube",
    name: "유튜브 최적화",
    description: "유튜브 업로드에 최적화된 설정",
    settings: {
      resolution: {
        width: 1920,
        height: 1080,
        aspectRatio: "16:9"
      },
      format: "mp4",
      codec: "h264",
      bitrate: 1e7,
      // 10 Mbps
      frameRate: 30,
      useHardwareAcceleration: !0,
      audioSettings: {
        codec: "aac",
        bitrate: 384e3,
        // 384 kbps
        sampleRate: 48e3,
        channels: 2
      }
    }
  },
  Mobile: {
    id: "preset-mobile",
    name: "모바일 최적화",
    description: "모바일 기기에 최적화된 작은 파일",
    settings: {
      resolution: {
        width: 1280,
        height: 720,
        aspectRatio: "16:9"
      },
      format: "mp4",
      codec: "h264",
      bitrate: 3e6,
      // 3 Mbps
      frameRate: 30,
      useHardwareAcceleration: !0,
      audioSettings: {
        codec: "aac",
        bitrate: 128e3,
        // 128 kbps
        sampleRate: 44100,
        channels: 2
      }
    }
  }
}, jt = ({
  initialSettings: p,
  onSettingsChange: c
}) => {
  const [C, S] = F("1080p"), [o, y] = F(() => p || {
    id: "custom-" + Date.now(),
    name: "사용자 정의 설정",
    ...q["1080p"].settings
  }), x = (a) => {
    const j = a.target.value;
    S(j);
    const i = {
      ...o,
      ...q[j].settings
    };
    y(i), c && c(i);
  }, b = (a, j) => {
    if (a.includes(".")) {
      const [i, m] = a.split("."), s = {
        ...o,
        [i]: {
          ...o[i],
          [m]: j
        }
      };
      y(s), c && c(s);
    } else {
      const i = {
        ...o,
        [a]: j
      };
      y(i), c && c(i);
    }
  }, f = [
    { label: "480p (854x480)", width: 854, height: 480 },
    { label: "720p HD (1280x720)", width: 1280, height: 720 },
    { label: "1080p Full HD (1920x1080)", width: 1920, height: 1080 },
    { label: "1440p QHD (2560x1440)", width: 2560, height: 1440 },
    { label: "2160p 4K UHD (3840x2160)", width: 3840, height: 2160 }
  ], E = [
    { label: "MP4 (H.264)", value: "mp4", codec: "h264" },
    { label: "MP4 (H.265/HEVC)", value: "mp4", codec: "h265" },
    { label: "WebM (VP9)", value: "webm", codec: "vp9" },
    { label: "MOV (ProRes)", value: "mov", codec: "prores" },
    { label: "MKV (H.264)", value: "mkv", codec: "h264" }
  ], d = [
    { label: "낮음 (2 Mbps)", value: 2e6 },
    { label: "중간 (5 Mbps)", value: 5e6 },
    { label: "높음 (8 Mbps)", value: 8e6 },
    { label: "매우 높음 (15 Mbps)", value: 15e6 },
    { label: "극높음 (20 Mbps)", value: 2e7 }
  ], R = [
    { label: "24 fps (영화)", value: 24 },
    { label: "25 fps (PAL)", value: 25 },
    { label: "30 fps (일반)", value: 30 },
    { label: "50 fps (PAL 고속)", value: 50 },
    { label: "60 fps (고속)", value: 60 }
  ], T = [
    { label: "AAC (일반)", value: "aac" },
    { label: "MP3", value: "mp3" },
    { label: "FLAC (무손실)", value: "flac" },
    { label: "AC3 (돌비)", value: "ac3" }
  ], _ = [
    { label: "낮음 (96 kbps)", value: 96e3 },
    { label: "중간 (128 kbps)", value: 128e3 },
    { label: "높음 (192 kbps)", value: 192e3 },
    { label: "매우 높음 (256 kbps)", value: 256e3 },
    { label: "극높음 (320 kbps)", value: 32e4 }
  ];
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "render-settings",
      style: {
        fontFamily: "Noto Sans KR, sans-serif",
        padding: "16px",
        maxWidth: "800px",
        margin: "0 auto"
      },
      children: [
        /* @__PURE__ */ t.jsx("h2", { children: "렌더링 설정" }),
        /* @__PURE__ */ t.jsxs("div", { className: "settings-group", children: [
          /* @__PURE__ */ t.jsx("label", { children: "프리셋:" }),
          /* @__PURE__ */ t.jsx("select", { value: C, onChange: x, children: Object.entries(q).map(([a, j]) => /* @__PURE__ */ t.jsxs("option", { value: a, children: [
            j.name,
            " - ",
            j.description
          ] }, a)) })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "settings-group", children: [
          /* @__PURE__ */ t.jsx("h3", { children: "비디오 설정" }),
          /* @__PURE__ */ t.jsxs("div", { className: "settings-row", children: [
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "해상도:" }),
              /* @__PURE__ */ t.jsx(
                "select",
                {
                  value: `${o.resolution.width}x${o.resolution.height}`,
                  onChange: (a) => {
                    const [j, i] = a.target.value.split("x").map(Number);
                    b("resolution", {
                      ...o.resolution,
                      width: j,
                      height: i
                    });
                  },
                  children: f.map((a) => /* @__PURE__ */ t.jsx("option", { value: `${a.width}x${a.height}`, children: a.label }, a.label))
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "포맷 및 코덱:" }),
              /* @__PURE__ */ t.jsx(
                "select",
                {
                  value: `${o.format}-${o.codec}`,
                  onChange: (a) => {
                    const [j, i] = a.target.value.split("-");
                    b("format", j), b("codec", i);
                  },
                  children: E.map((a) => /* @__PURE__ */ t.jsx("option", { value: `${a.value}-${a.codec}`, children: a.label }, `${a.value}-${a.codec}`))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "settings-row", children: [
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "비트레이트:" }),
              /* @__PURE__ */ t.jsx(
                "select",
                {
                  value: o.bitrate,
                  onChange: (a) => b("bitrate", Number(a.target.value)),
                  children: d.map((a) => /* @__PURE__ */ t.jsx("option", { value: a.value, children: a.label }, a.label))
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "프레임레이트:" }),
              /* @__PURE__ */ t.jsx(
                "select",
                {
                  value: o.frameRate,
                  onChange: (a) => b("frameRate", Number(a.target.value)),
                  children: R.map((a) => /* @__PURE__ */ t.jsx("option", { value: a.value, children: a.label }, a.label))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "settings-field checkbox", children: [
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "checkbox",
                id: "hardware-acceleration",
                checked: o.useHardwareAcceleration,
                onChange: (a) => b("useHardwareAcceleration", a.target.checked)
              }
            ),
            /* @__PURE__ */ t.jsx("label", { htmlFor: "hardware-acceleration", children: "하드웨어 가속 사용 (가능한 경우)" })
          ] })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "settings-group", children: [
          /* @__PURE__ */ t.jsx("h3", { children: "오디오 설정" }),
          /* @__PURE__ */ t.jsxs("div", { className: "settings-row", children: [
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "오디오 코덱:" }),
              /* @__PURE__ */ t.jsx(
                "select",
                {
                  value: o.audioSettings.codec,
                  onChange: (a) => b("audioSettings.codec", a.target.value),
                  children: T.map((a) => /* @__PURE__ */ t.jsx("option", { value: a.value, children: a.label }, a.label))
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "오디오 비트레이트:" }),
              /* @__PURE__ */ t.jsx(
                "select",
                {
                  value: o.audioSettings.bitrate,
                  onChange: (a) => b("audioSettings.bitrate", Number(a.target.value)),
                  children: _.map((a) => /* @__PURE__ */ t.jsx("option", { value: a.value, children: a.label }, a.label))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "settings-row", children: [
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "샘플링 레이트:" }),
              /* @__PURE__ */ t.jsxs(
                "select",
                {
                  value: o.audioSettings.sampleRate,
                  onChange: (a) => b("audioSettings.sampleRate", Number(a.target.value)),
                  children: [
                    /* @__PURE__ */ t.jsx("option", { value: 44100, children: "44.1 kHz (표준)" }),
                    /* @__PURE__ */ t.jsx("option", { value: 48e3, children: "48 kHz (전문가용)" }),
                    /* @__PURE__ */ t.jsx("option", { value: 96e3, children: "96 kHz (고품질)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "settings-field", children: [
              /* @__PURE__ */ t.jsx("label", { children: "오디오 채널:" }),
              /* @__PURE__ */ t.jsxs(
                "select",
                {
                  value: o.audioSettings.channels,
                  onChange: (a) => b("audioSettings.channels", Number(a.target.value)),
                  children: [
                    /* @__PURE__ */ t.jsx("option", { value: 1, children: "모노 (1채널)" }),
                    /* @__PURE__ */ t.jsx("option", { value: 2, children: "스테레오 (2채널)" }),
                    /* @__PURE__ */ t.jsx("option", { value: 6, children: "5.1 채널" })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "settings-summary", children: [
          /* @__PURE__ */ t.jsx("h3", { children: "설정 요약" }),
          /* @__PURE__ */ t.jsxs("div", { className: "summary-box", children: [
            /* @__PURE__ */ t.jsxs("p", { children: [
              /* @__PURE__ */ t.jsx("strong", { children: "해상도:" }),
              " ",
              o.resolution.width,
              "x",
              o.resolution.height
            ] }),
            /* @__PURE__ */ t.jsxs("p", { children: [
              /* @__PURE__ */ t.jsx("strong", { children: "포맷:" }),
              " ",
              o.format.toUpperCase(),
              ", ",
              /* @__PURE__ */ t.jsx("strong", { children: "코덱:" }),
              " ",
              o.codec
            ] }),
            /* @__PURE__ */ t.jsxs("p", { children: [
              /* @__PURE__ */ t.jsx("strong", { children: "비트레이트:" }),
              " ",
              (o.bitrate / 1e6).toFixed(1),
              " Mbps"
            ] }),
            /* @__PURE__ */ t.jsxs("p", { children: [
              /* @__PURE__ */ t.jsx("strong", { children: "프레임레이트:" }),
              " ",
              o.frameRate,
              " fps"
            ] }),
            /* @__PURE__ */ t.jsxs("p", { children: [
              /* @__PURE__ */ t.jsx("strong", { children: "하드웨어 가속:" }),
              " ",
              o.useHardwareAcceleration ? "사용" : "사용 안 함"
            ] }),
            /* @__PURE__ */ t.jsxs("p", { children: [
              /* @__PURE__ */ t.jsx("strong", { children: "오디오:" }),
              " ",
              o.audioSettings.codec,
              ", ",
              (o.audioSettings.bitrate / 1e3).toFixed(0),
              " kbps, ",
              (o.audioSettings.sampleRate / 1e3).toFixed(1),
              " kHz, ",
              o.audioSettings.channels,
              "채널"
            ] })
          ] })
        ] })
      ]
    }
  );
}, wt = () => {
  const [p, c] = F([]), [C, S] = F(q["1080p"].settings), [o, y] = F("C:/Users/사용자/Videos/출력파일.mp4"), [x, b] = F("테스트 프로젝트"), [f, E] = F("settings");
  Z(() => {
    const s = $e();
    console.log("감지된 GPU 정보:", s);
  }, []);
  const d = (s) => ({
    id: "job-" + Date.now(),
    projectId: "project-1",
    name: `${x} - ${s.resolution.width}x${s.resolution.height} (${s.format})`,
    settings: s,
    status: "waiting",
    progress: 0,
    outputPath: o,
    estimatedTimeRemaining: 0
  }), R = () => {
    const s = d(C);
    c([...p, s]);
  }, T = () => {
    const w = ["480p", "720p", "1080p", "4K"].map((P, B) => {
      const $ = {
        ...q[P].settings,
        id: "batch-" + Date.now() + B,
        name: `${P} 렌더링`
      };
      return {
        id: "job-" + Date.now() + B,
        projectId: "project-1",
        name: `${x} - ${P}`,
        settings: $,
        status: "waiting",
        progress: 0,
        outputPath: o.replace(".mp4", `-${P}.mp4`),
        estimatedTimeRemaining: 0
      };
    });
    c([...p, ...w]);
  }, _ = (s, w) => {
    c((P) => P.map(
      (B) => B.id === s ? { ...B, status: w } : B
    ));
  }, a = (s, w, P) => {
    c((B) => B.map(
      ($) => $.id === s ? { ...$, progress: w, estimatedTimeRemaining: P } : $
    ));
  }, j = (s) => {
    c((w) => w.filter((P) => P.id !== s));
  }, i = (s) => {
    S(s);
  }, m = p.find((s) => s.status === "processing");
  return /* @__PURE__ */ t.jsxs("div", { className: "test-rendering", style: {
    fontFamily: "Noto Sans KR, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px"
  }, children: [
    /* @__PURE__ */ t.jsxs("header", { style: {
      marginBottom: "24px",
      borderBottom: "1px solid #e0e0e0",
      paddingBottom: "16px"
    }, children: [
      /* @__PURE__ */ t.jsx("h1", { style: {
        marginTop: "0",
        marginBottom: "16px",
        fontSize: "28px",
        color: "#333"
      }, children: "vCut 렌더링 모듈 테스트" }),
      /* @__PURE__ */ t.jsxs("div", { className: "tabs", style: {
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "8px"
      }, children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            className: f === "settings" ? "active" : "",
            onClick: () => E("settings"),
            style: {
              padding: "8px 16px",
              border: "none",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            },
            children: "인코딩 옵션 테스트"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            className: f === "progress" ? "active" : "",
            onClick: () => E("progress"),
            style: {
              padding: "8px 16px",
              border: "none",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            },
            children: "진행 상황 모니터링 테스트"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            className: f === "queue" ? "active" : "",
            onClick: () => E("queue"),
            style: {
              padding: "8px 16px",
              border: "none",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            },
            children: "대기열 관리 테스트"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            className: f === "hardware" ? "active" : "",
            onClick: () => E("hardware"),
            style: {
              padding: "8px 16px",
              border: "none",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            },
            children: "하드웨어 가속 테스트"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("main", { children: [
      f === "settings" && /* @__PURE__ */ t.jsxs("div", { className: "section", style: {
        marginBottom: "32px"
      }, children: [
        /* @__PURE__ */ t.jsx("h2", { style: {
          marginTop: "0",
          marginBottom: "16px",
          fontSize: "22px",
          color: "#333"
        }, children: "인코딩 옵션 및 품질 설정 테스트" }),
        /* @__PURE__ */ t.jsxs("div", { className: "project-info", style: {
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
          backgroundColor: "#f9f9f9",
          padding: "16px",
          borderRadius: "8px"
        }, children: [
          /* @__PURE__ */ t.jsxs("div", { className: "settings-field", style: {
            flex: "1",
            minWidth: "200px"
          }, children: [
            /* @__PURE__ */ t.jsx("label", { style: {
              display: "block",
              marginBottom: "6px",
              fontWeight: "500",
              fontSize: "14px"
            }, children: "프로젝트 이름:" }),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "text",
                value: x,
                onChange: (s) => b(s.target.value),
                style: {
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "inherit"
                }
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "settings-field", style: {
            flex: "1",
            minWidth: "200px"
          }, children: [
            /* @__PURE__ */ t.jsx("label", { style: {
              display: "block",
              marginBottom: "6px",
              fontWeight: "500",
              fontSize: "14px"
            }, children: "출력 경로:" }),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "text",
                value: o,
                onChange: (s) => y(s.target.value),
                style: {
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "inherit"
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ t.jsx(
          jt,
          {
            initialSettings: C,
            onSettingsChange: i
          }
        ),
        /* @__PURE__ */ t.jsx("div", { className: "actions", style: {
          marginTop: "24px",
          textAlign: "center"
        }, children: /* @__PURE__ */ t.jsx(
          "button",
          {
            className: "start-button",
            onClick: R,
            style: {
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s"
            },
            children: "이 설정으로 렌더링 시작"
          }
        ) })
      ] }),
      f === "progress" && /* @__PURE__ */ t.jsxs("div", { className: "section", style: {
        marginBottom: "32px"
      }, children: [
        /* @__PURE__ */ t.jsx("h2", { style: {
          marginTop: "0",
          marginBottom: "16px",
          fontSize: "22px",
          color: "#333"
        }, children: "렌더링 진행 상황 모니터링 테스트" }),
        /* @__PURE__ */ t.jsx("p", { style: {
          marginBottom: "16px"
        }, children: "이 테스트에서는 렌더링 진행 상황을 실시간으로 모니터링할 수 있습니다." }),
        m ? /* @__PURE__ */ t.jsxs("div", { className: "progress-test", style: {
          marginBottom: "24px"
        }, children: [
          /* @__PURE__ */ t.jsxs("h3", { style: {
            marginTop: "0",
            marginBottom: "12px",
            fontSize: "18px",
            color: "#333"
          }, children: [
            "현재 렌더링 중: ",
            m.name
          ] }),
          /* @__PURE__ */ t.jsx(
            ze,
            {
              progress: m.progress,
              timeRemaining: m.estimatedTimeRemaining,
              status: "처리 중"
            }
          ),
          /* @__PURE__ */ t.jsxs("div", { className: "job-info", style: {
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            marginTop: "16px"
          }, children: [
            /* @__PURE__ */ t.jsxs("p", { style: {
              margin: "6px 0"
            }, children: [
              /* @__PURE__ */ t.jsx("strong", { children: "해상도:" }),
              " ",
              m.settings.resolution.width,
              "x",
              m.settings.resolution.height
            ] }),
            /* @__PURE__ */ t.jsxs("p", { style: {
              margin: "6px 0"
            }, children: [
              /* @__PURE__ */ t.jsx("strong", { children: "포맷:" }),
              " ",
              m.settings.format.toUpperCase()
            ] }),
            /* @__PURE__ */ t.jsxs("p", { style: {
              margin: "6px 0"
            }, children: [
              /* @__PURE__ */ t.jsx("strong", { children: "코덱:" }),
              " ",
              m.settings.codec
            ] }),
            /* @__PURE__ */ t.jsxs("p", { style: {
              margin: "6px 0"
            }, children: [
              /* @__PURE__ */ t.jsx("strong", { children: "하드웨어 가속:" }),
              " ",
              m.settings.useHardwareAcceleration ? "사용" : "사용 안 함"
            ] })
          ] })
        ] }) : /* @__PURE__ */ t.jsxs("div", { className: "no-active-job", style: {
          textAlign: "center",
          padding: "32px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px"
        }, children: [
          /* @__PURE__ */ t.jsx("p", { style: {
            marginBottom: "16px"
          }, children: "현재 진행 중인 렌더링 작업이 없습니다." }),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "start-button",
              onClick: R,
              style: {
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s"
              },
              children: "테스트 렌더링 시작"
            }
          )
        ] }),
        m && /* @__PURE__ */ t.jsx(
          ce,
          {
            job: m,
            onProgress: (s, w) => a(m.id, s, w),
            onComplete: (s) => _(s.id, "completed"),
            onError: (s) => console.error("렌더링 오류:", s)
          }
        )
      ] }),
      f === "queue" && /* @__PURE__ */ t.jsxs("div", { className: "section", style: {
        marginBottom: "32px"
      }, children: [
        /* @__PURE__ */ t.jsx("h2", { style: {
          marginTop: "0",
          marginBottom: "16px",
          fontSize: "22px",
          color: "#333"
        }, children: "일괄 렌더링 및 대기열 관리 테스트" }),
        /* @__PURE__ */ t.jsx("p", { style: {
          marginBottom: "16px"
        }, children: "이 테스트에서는 여러 렌더링 작업을 대기열에 추가하고 관리할 수 있습니다." }),
        /* @__PURE__ */ t.jsxs("div", { className: "batch-controls", style: {
          display: "flex",
          gap: "16px",
          marginBottom: "24px"
        }, children: [
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "start-button",
              onClick: T,
              style: {
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s"
              },
              children: "다양한 해상도로 일괄 렌더링 시작"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "start-button",
              onClick: R,
              style: {
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s"
              },
              children: "현재 설정으로 대기열에 추가"
            }
          )
        ] }),
        /* @__PURE__ */ t.jsx(
          bt,
          {
            jobs: p,
            onJobStatusChange: _,
            onJobProgressUpdate: a,
            onJobRemove: j
          }
        ),
        p.filter((s) => s.status === "waiting").length > 0 && !m && /* @__PURE__ */ t.jsx(
          ce,
          {
            job: p.find((s) => s.status === "waiting"),
            onProgress: (s, w) => {
              const P = p.find((B) => B.status === "waiting");
              P && a(P.id, s, w);
            },
            onComplete: (s) => _(s.id, "completed"),
            onError: (s) => console.error("렌더링 오류:", s)
          }
        )
      ] }),
      f === "hardware" && /* @__PURE__ */ t.jsxs("div", { className: "section", style: {
        marginBottom: "32px"
      }, children: [
        /* @__PURE__ */ t.jsx("h2", { style: {
          marginTop: "0",
          marginBottom: "16px",
          fontSize: "22px",
          color: "#333"
        }, children: "하드웨어 가속 렌더링 테스트" }),
        /* @__PURE__ */ t.jsx("p", { style: {
          marginBottom: "16px"
        }, children: "이 테스트에서는 하드웨어 가속의 성능 향상을 테스트할 수 있습니다." }),
        /* @__PURE__ */ t.jsxs("div", { className: "hardware-test", style: {
          marginBottom: "24px"
        }, children: [
          /* @__PURE__ */ t.jsxs("div", { className: "settings-field checkbox", style: {
            display: "flex",
            alignItems: "center"
          }, children: [
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "checkbox",
                id: "use-hardware",
                checked: C.useHardwareAcceleration,
                onChange: (s) => S({
                  ...C,
                  useHardwareAcceleration: s.target.checked
                }),
                style: {
                  width: "auto",
                  marginRight: "8px"
                }
              }
            ),
            /* @__PURE__ */ t.jsx(
              "label",
              {
                htmlFor: "use-hardware",
                style: {
                  marginBottom: "0"
                },
                children: "하드웨어 가속 사용"
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "hardware-comparison", style: {
            display: "flex",
            gap: "16px",
            margin: "24px 0"
          }, children: [
            /* @__PURE__ */ t.jsxs("div", { className: "comparison-card", style: {
              flex: "1",
              backgroundColor: "#f5f5f5",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }, children: [
              /* @__PURE__ */ t.jsx("h3", { style: {
                marginTop: "0",
                marginBottom: "12px",
                fontSize: "18px",
                color: "#333"
              }, children: "CPU 인코딩" }),
              /* @__PURE__ */ t.jsx("p", { style: {
                margin: "8px 0"
              }, children: "장점: 모든 시스템에서 호환" }),
              /* @__PURE__ */ t.jsx("p", { style: {
                margin: "8px 0"
              }, children: "단점: 더 긴 렌더링 시간, 높은 CPU 사용량" }),
              /* @__PURE__ */ t.jsx(
                "p",
                {
                  className: "performance",
                  style: {
                    fontWeight: "bold",
                    color: "#2196F3"
                  },
                  children: "예상 렌더링 시간: 15초"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                className: "comparison-card highlight",
                style: {
                  flex: "1",
                  backgroundColor: "#e8f5e9",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #4CAF50"
                },
                children: [
                  /* @__PURE__ */ t.jsx("h3", { style: {
                    marginTop: "0",
                    marginBottom: "12px",
                    fontSize: "18px",
                    color: "#333"
                  }, children: "GPU 가속 인코딩" }),
                  /* @__PURE__ */ t.jsx("p", { style: {
                    margin: "8px 0"
                  }, children: "장점: 빠른 렌더링 시간, 낮은 CPU 사용량" }),
                  /* @__PURE__ */ t.jsx("p", { style: {
                    margin: "8px 0"
                  }, children: "단점: 지원되는 하드웨어 필요" }),
                  /* @__PURE__ */ t.jsx(
                    "p",
                    {
                      className: "performance",
                      style: {
                        fontWeight: "bold",
                        color: "#2196F3"
                      },
                      children: "예상 렌더링 시간: 5초"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "hardware-detection", style: {
            margin: "24px 0",
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px"
          }, children: [
            /* @__PURE__ */ t.jsx("h3", { style: {
              marginTop: "0",
              marginBottom: "16px"
            }, children: "감지된 하드웨어" }),
            /* @__PURE__ */ t.jsx(ce, {})
          ] }),
          /* @__PURE__ */ t.jsx("div", { className: "actions", style: {
            marginTop: "24px",
            textAlign: "center"
          }, children: /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "start-button",
              onClick: () => {
                const s = d({
                  ...C,
                  useHardwareAcceleration: !1,
                  name: x + " (CPU 인코딩)"
                }), w = d({
                  ...C,
                  useHardwareAcceleration: !0,
                  name: x + " (GPU 인코딩)"
                });
                c([...p, s, w]);
              },
              style: {
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s"
              },
              children: "CPU 및 GPU 렌더링 비교 테스트 시작"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
};
export {
  ze as ProgressMonitor,
  q as RenderPresets,
  jt as RenderSettings,
  ce as RenderingEngine,
  bt as RenderingQueue,
  wt as TestRendering,
  $e as detectGPU,
  Rt as getHardwareAccelerationArgs
};
