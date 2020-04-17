// Copyright 2012 Google Inc. All rights reserved.
window.onload = function () {

  var data = {
    "resource": {
      "version": "1",
      "macros": [],
      "tags": [],
      "predicates": [],
      "rules": []
    },
    "runtime": [
      [],
      []
    ]
  };

  var aa = this,
    fa = function () {
      if (null === ca) {
        var a;
        a: {
          var b = aa.document,
            c = b.querySelector && b.querySelector("script[nonce]");
          if (c) {
            var d = c.nonce || c.getAttribute("nonce");
            if (d && da.test(d)) {
              a = d;
              break a
            }
          }
          a = null
        }
        ca = a || ""
      }
      return ca
    },
    da = /^[\w+/_-]+[=]{0,2}$/,
    ca = null,
    ha = function (a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.cf = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a;
      a.Ne = function (a, c, f) {
        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
          d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d)
      }
    };
  var g = function (a, b) {
    this.A = a;
    this.sd = b
  };
  g.prototype.Fd = function () {
    return this.A
  };
  g.prototype.getType = g.prototype.Fd;
  g.prototype.getData = function () {
    return this.sd
  };
  g.prototype.getData = g.prototype.getData;
  var ja = function (a) {
      return "number" === typeof a && 0 <= a && isFinite(a) && 0 === a % 1 || "string" === typeof a && "-" !== a[0] && a === "" + parseInt(a, 10)
    },
    ka = function () {
      this.ja = {};
      this.Ba = !1
    };
  ka.prototype.get = function (a) {
    return this.ja["dust." + a]
  };
  ka.prototype.set = function (a, b) {
    !this.Ba && (this.ja["dust." + a] = b)
  };
  ka.prototype.has = function (a) {
    return this.ja.hasOwnProperty("dust." + a)
  };
  var la = function (a) {
    var b = [],
      c;
    for (c in a.ja)
      a.ja.hasOwnProperty(c) && b.push(c.substr(5));
    return b
  };
  ka.prototype.remove = function (a) {
    !this.Ba && delete this.ja["dust." + a]
  };
  ka.prototype.L = function () {
    this.Ba = !0
  };
  var v = function (a) {
    this.ma = new ka;
    this.h = [];
    a = a || [];
    for (var b in a)
      a.hasOwnProperty(b) && (ja(b) ? this.h[Number(b)] = a[Number(b)] : this.ma.set(b, a[b]))
  };
  v.prototype.toString = function () {
    for (var a = [], b = 0; b < this.h.length; b++) {
      var c = this.h[b];
      null === c || void 0 === c ? a.push("") : a.push(c.toString())
    }
    return a.join(",")
  };
  v.prototype.set = function (a, b) {
    if ("length" == a) {
      if (!ja(b))
        throw "RangeError: Length property must be a valid integer.";
      this.h.length = Number(b)
    } else
      ja(a) ? this.h[Number(a)] = b : this.ma.set(a, b)
  };
  v.prototype.set = v.prototype.set;
  v.prototype.get = function (a) {
    return "length" == a ? this.length() : ja(a) ? this.h[Number(a)] : this.ma.get(a)
  };
  v.prototype.get = v.prototype.get;
  v.prototype.length = function () {
    return this.h.length
  };
  v.prototype.T = function () {
    for (var a = la(this.ma), b = 0; b < this.h.length; b++)
      a.push(b + "");
    return new v(a)
  };
  v.prototype.getKeys = v.prototype.T;
  v.prototype.remove = function (a) {
    ja(a) ? delete this.h[Number(a)] : this.ma.remove(a)
  };
  v.prototype.remove = v.prototype.remove;
  v.prototype.pop = function () {
    return this.h.pop()
  };
  v.prototype.pop = v.prototype.pop;
  v.prototype.push = function (a) {
    return this.h.push.apply(this.h, Array.prototype.slice.call(arguments))
  };
  v.prototype.push = v.prototype.push;
  v.prototype.shift = function () {
    return this.h.shift()
  };
  v.prototype.shift = v.prototype.shift;
  v.prototype.splice = function (a, b, c) {
    return new v(this.h.splice.apply(this.h, arguments))
  };
  v.prototype.splice = v.prototype.splice;
  v.prototype.unshift = function (a) {
    return this.h.unshift.apply(this.h, Array.prototype.slice.call(arguments))
  };
  v.prototype.unshift = v.prototype.unshift;
  v.prototype.has = function (a) {
    return ja(a) && this.h.hasOwnProperty(a) || this.ma.has(a)
  };
  var ma = function () {
    function a(a, b) {
      c[a] = b
    }

    function b() {
      c = {};
      e = !1
    }
    var c = {},
      d = {},
      e = !1,
      f = {
        add: a,
        Vb: function (a, b, c) {
          d[a] || (d[a] = {});
          d[a][b] = c
        },
        create: function (d) {
          var f = {
            add: a,
            request: function (a, b) {
              return e ? !0 : c[a] ? c[a].apply(d, Array.prototype.slice.call(arguments, 1)) : !1
            },
            reset: b
          };
          f.add = f.add;
          f.request = f.request;
          f.reset = f.reset;
          return f
        },
        sc: function (a) {
          return d[a] ? (b(),
            c = d[a],
            !0) : !1
        },
        reset: b,
        Dc: function (a) {
          e = a
        }
      };
    f.add = f.add;
    f.addToCache = f.Vb;
    f.loadFromCache = f.sc;
    f.reset = f.reset;
    f.setPermitAllRequests = f.Dc;
    return f
  };
  var na = function () {
    function a(a, c) {
      if (b[a]) {
        if (b[a].Oa + c > b[a].max)
          throw Error("Quota exceeded");
        b[a].Oa += c
      }
    }
    var b = {},
      c = void 0,
      d = void 0,
      e = {
        be: function (a) {
          c = a
        },
        Wb: function () {
          c && a(c, 1)
        },
        ce: function (a) {
          d = a
        },
        X: function (b) {
          d && a(d, b)
        },
        xe: function (a, c) {
          b[a] = b[a] || {
            Oa: 0
          };
          b[a].max = c
        },
        Ed: function (a) {
          return b[a] && b[a].Oa || 0
        },
        reset: function () {
          b = {}
        },
        md: a
      };
    e.onFnConsume = e.be;
    e.consumeFn = e.Wb;
    e.onStorageConsume = e.ce;
    e.consumeStorage = e.X;
    e.setMax = e.xe;
    e.getConsumed = e.Ed;
    e.reset = e.reset;
    e.consume = e.md;
    return e
  };
  var oa = function (a, b, c) {
    this.M = a;
    this.K = b;
    this.aa = c;
    this.h = new ka
  };
  oa.prototype.add = function (a, b) {
    this.h.Ba || (this.M.X(("string" === typeof a ? a.length : 1) + ("string" === typeof b ? b.length : 1)),
      this.h.set(a, b))
  };
  oa.prototype.add = oa.prototype.add;
  oa.prototype.set = function (a, b) {
    this.h.Ba || (this.aa && this.aa.has(a) ? this.aa.set(a, b) : (this.M.X(("string" === typeof a ? a.length : 1) + ("string" === typeof b ? b.length : 1)),
      this.h.set(a, b)))
  };
  oa.prototype.set = oa.prototype.set;
  oa.prototype.get = function (a) {
    return this.h.has(a) ? this.h.get(a) : this.aa ? this.aa.get(a) : void 0
  };
  oa.prototype.get = oa.prototype.get;
  oa.prototype.has = function (a) {
    return !!this.h.has(a) || !(!this.aa || !this.aa.has(a))
  };
  oa.prototype.has = oa.prototype.has;
  oa.prototype.J = function () {
    return this.M
  };
  oa.prototype.L = function () {
    this.h.L()
  };
  var pa = function (a) {
      return "[object Array]" == Object.prototype.toString.call(Object(a))
    },
    qa = function (a, b) {
      if (Array.prototype.indexOf) {
        var c = a.indexOf(b);
        return "number" == typeof c ? c : -1
      }
      for (var d = 0; d < a.length; d++)
        if (a[d] === b)
          return d;
      return -1
    };
  var w = function (a, b) {
    ka.call(this);
    this.uc = a;
    this.Cd = b
  };
  ha(w, ka);
  var sa = function (a, b) {
      for (var c, d = 0; d < b.length && !(c = ra(a, b[d]),
          c instanceof g); d++)
      ;
      return c
    },
    ra = function (a, b) {
      var c = a.get(String(b[0]));
      if (!(c && c instanceof w))
        throw "Attempting to execute non-function " + b[0] + ".";
      return c.m.apply(c, [a].concat(b.slice(1)))
    };
  w.prototype.toString = function () {
    return this.uc
  };
  w.prototype.getName = function () {
    return this.uc
  };
  w.prototype.getName = w.prototype.getName;
  w.prototype.T = function () {
    return new v(la(this))
  };
  w.prototype.getKeys = w.prototype.T;
  w.prototype.m = function (a, b) {
    var c, d = {
      C: function () {
        return a
      },
      evaluate: function (b) {
        var c = a;
        return pa(b) ? ra(c, b) : b
      },
      xa: function (b) {
        return sa(a, b)
      },
      J: function () {
        return a.J()
      },
      gc: function () {
        c || (c = a.K.create(d));
        return c
      }
    };
    a.J().Wb();
    return this.Cd.apply(d, Array.prototype.slice.call(arguments, 1))
  };
  w.prototype.invoke = w.prototype.m;
  var ta = function () {
    ka.call(this)
  };
  ha(ta, ka);
  ta.prototype.T = function () {
    return new v(la(this))
  };
  ta.prototype.getKeys = ta.prototype.T;
  /*
jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
  var va = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,
    wa = function (a) {
      if (null == a)
        return String(a);
      var b = va.exec(Object.prototype.toString.call(Object(a)));
      return b ? b[1].toLowerCase() : "object"
    },
    xa = function (a, b) {
      return Object.prototype.hasOwnProperty.call(Object(a), b)
    },
    ya = function (a) {
      if (!a || "object" != wa(a) || a.nodeType || a == a.window)
        return !1;
      try {
        if (a.constructor && !xa(a, "constructor") && !xa(a.constructor.prototype, "isPrototypeOf"))
          return !1
      } catch (c) {
        return !1
      }
      for (var b in a)
      ;
      return void 0 === b || xa(a, b)
    },
    za = function (a, b) {
      var c = b || ("array" == wa(a) ? [] : {}),
        d;
      for (d in a)
        if (xa(a, d)) {
          var e = a[d];
          "array" == wa(e) ? ("array" != wa(c[d]) && (c[d] = []),
            c[d] = za(e, c[d])) : ya(e) ? (ya(c[d]) || (c[d] = {}),
            c[d] = za(e, c[d])) : c[d] = e
        }
      return c
    };
  var Aa = function (a) {
      if (a instanceof v) {
        for (var b = [], c = a.length(), d = 0; d < c; d++)
          a.has(d) && (b[d] = Aa(a.get(d)));
        return b
      }
      if (a instanceof ta) {
        for (var e = {}, f = a.T(), h = f.length(), k = 0; k < h; k++)
          e[f.get(k)] = Aa(a.get(f.get(k)));
        return e
      }
      return a instanceof w ? function () {
          for (var b = Array.prototype.slice.call(arguments, 0), c = 0; c < b.length; c++)
            b[c] = Ba(b[c]);
          var d = new oa(na(), ma());
          return Aa(a.m.apply(a, [d].concat(b)))
        } :
        a
    },
    Ba = function (a) {
      if (pa(a)) {
        for (var b = [], c = 0; c < a.length; c++)
          a.hasOwnProperty(c) && (b[c] = Ba(a[c]));
        return new v(b)
      }
      if (ya(a)) {
        var d = new ta,
          e;
        for (e in a)
          a.hasOwnProperty(e) && d.set(e, Ba(a[e]));
        return d
      }
      if ("function" === typeof a)
        return new w("", function (b) {
          for (var c = Array.prototype.slice.call(arguments, 0), d = 0; d < c.length; d++)
            c[d] = Aa(this.evaluate(c[d]));
          return Ba(a.apply(a, c))
        });
      var f = typeof a;
      if (null === a || "string" === f || "number" === f || "boolean" === f)
        return a
    };
  var Ca = {
    control: function (a, b) {
      return new g(a, this.evaluate(b))
    },
    fn: function (a, b, c) {
      var d = this.C(),
        e = this.evaluate(b);
      if (!(e instanceof v))
        throw "Error: non-List value given for Fn argument names.";
      var f = Array.prototype.slice.call(arguments, 2);
      this.J().X(a.length + f.length);
      return new w(a, function () {
        return function (a) {
          for (var b = new oa(d.M, d.K, d), c = Array.prototype.slice.call(arguments, 0), h = 0; h < c.length; h++)
            if (c[h] = this.evaluate(c[h]),
              c[h] instanceof g)
              return c[h];
          for (var n = e.get("length"), p = 0; p < n; p++)
            p < c.length ? b.set(e.get(p), c[p]) : b.set(e.get(p), void 0);
          b.set("arguments", new v(c));
          var q = sa(b, f);
          if (q instanceof g)
            return "return" === q.A ? q.getData() : q
        }
      }())
    },
    list: function (a) {
      var b = this.J();
      b.X(arguments.length);
      for (var c = new v, d = 0; d < arguments.length; d++) {
        var e = this.evaluate(arguments[d]);
        "string" === typeof e && b.X(e.length ? e.length - 1 : 0);
        c.push(e)
      }
      return c
    },
    map: function (a) {
      for (var b = this.J(), c = new ta, d = 0; d < arguments.length - 1; d += 2) {
        var e = this.evaluate(arguments[d]) + "",
          f = this.evaluate(arguments[d + 1]),
          h = e.length;
        h += "string" === typeof f ? f.length : 1;
        b.X(h);
        c.set(e, f)
      }
      return c
    },
    undefined: function () {}
  };
  var x = function () {
    this.M = na();
    this.K = ma();
    this.za = new oa(this.M, this.K)
  };
  x.prototype.V = function (a, b) {
    var c = new w(a, b);
    c.L();
    this.za.set(a, c)
  };
  x.prototype.addInstruction = x.prototype.V;
  x.prototype.Ub = function (a, b) {
    Ca.hasOwnProperty(a) && this.V(b || a, Ca[a])
  };
  x.prototype.addNativeInstruction = x.prototype.Ub;
  x.prototype.J = function () {
    return this.M
  };
  x.prototype.getQuota = x.prototype.J;
  x.prototype.Ua = function () {
    this.M = na();
    this.za.M = this.M
  };
  x.prototype.resetQuota = x.prototype.Ua;
  x.prototype.ue = function () {
    this.K = ma();
    this.za.K = this.K
  };
  x.prototype.resetPermissions = x.prototype.ue;
  x.prototype.R = function (a, b) {
    var c = Array.prototype.slice.call(arguments, 0);
    return this.xb(c)
  };
  x.prototype.execute = x.prototype.R;
  x.prototype.xb = function (a) {
    for (var b, c = 0; c < arguments.length; c++) {
      var d = ra(this.za, arguments[c]);
      b = d instanceof g || d instanceof w || d instanceof v || d instanceof ta || null === d || void 0 === d || "string" === typeof d || "number" === typeof d || "boolean" === typeof d ? d : void 0
    }
    return b
  };
  x.prototype.run = x.prototype.xb;
  x.prototype.L = function () {
    this.za.L()
  };
  x.prototype.makeImmutable = x.prototype.L;
  var Da = function (a) {
    for (var b = [], c = 0; c < a.length(); c++)
      a.has(c) && (b[c] = a.get(c));
    return b
  };
  var Ea = {
    Be: "concat every filter forEach hasOwnProperty indexOf join lastIndexOf map pop push reduce reduceRight reverse shift slice some sort splice unshift toString".split(" "),
    concat: function (a, b) {
      for (var c = [], d = 0; d < this.length(); d++)
        c.push(this.get(d));
      for (d = 1; d < arguments.length; d++)
        if (arguments[d] instanceof v)
          for (var e = arguments[d], f = 0; f < e.length(); f++)
            c.push(e.get(f));
        else
          c.push(arguments[d]);
      return new v(c)
    },
    every: function (a, b) {
      for (var c = this.length(), d = 0; d < this.length() && d < c; d++)
        if (this.has(d) && !b.m(a, this.get(d), d, this))
          return !1;
      return !0
    },
    filter: function (a, b) {
      for (var c = this.length(), d = [], e = 0; e < this.length() && e < c; e++)
        this.has(e) && b.m(a, this.get(e), e, this) && d.push(this.get(e));
      return new v(d)
    },
    forEach: function (a, b) {
      for (var c = this.length(), d = 0; d < this.length() && d < c; d++)
        this.has(d) && b.m(a, this.get(d), d, this)
    },
    hasOwnProperty: function (a, b) {
      return this.has(b)
    },
    indexOf: function (a, b, c) {
      var d = this.length(),
        e = void 0 === c ? 0 : Number(c);
      0 > e && (e = Math.max(d + e, 0));
      for (var f = e; f < d; f++)
        if (this.has(f) && this.get(f) === b)
          return f;
      return -1
    },
    join: function (a, b) {
      for (var c = [], d = 0; d < this.length(); d++)
        c.push(this.get(d));
      return c.join(b)
    },
    lastIndexOf: function (a, b, c) {
      var d = this.length(),
        e = d - 1;
      void 0 !== c && (e = 0 > c ? d + c : Math.min(c, e));
      for (var f = e; 0 <= f; f--)
        if (this.has(f) && this.get(f) === b)
          return f;
      return -1
    },
    map: function (a, b) {
      for (var c = this.length(), d = [], e = 0; e < this.length() && e < c; e++)
        this.has(e) && (d[e] = b.m(a, this.get(e), e, this));
      return new v(d)
    },
    pop: function () {
      return this.pop()
    },
    push: function (a, b) {
      return this.push.apply(this, Array.prototype.slice.call(arguments, 1))
    },
    reduce: function (a, b, c) {
      var d = this.length(),
        e, f;
      if (void 0 !== c)
        e = c,
        f = 0;
      else {
        if (0 == d)
          throw "TypeError: Reduce on List with no elements.";
        for (var h = 0; h < d; h++)
          if (this.has(h)) {
            e = this.get(h);
            f = h + 1;
            break
          }
        if (h == d)
          throw "TypeError: Reduce on List with no elements.";
      }
      for (h = f; h < d; h++)
        this.has(h) && (e = b.m(a, e, this.get(h), h, this));
      return e
    },
    reduceRight: function (a, b, c) {
      var d = this.length(),
        e, f;
      if (void 0 !== c)
        e = c,
        f = d - 1;
      else {
        if (0 == d)
          throw "TypeError: ReduceRight on List with no elements.";
        for (var h = 1; h <= d; h++)
          if (this.has(d - h)) {
            e = this.get(d - h);
            f = d - (h + 1);
            break
          }
        if (h > d)
          throw "TypeError: ReduceRight on List with no elements.";
      }
      for (h = f; 0 <= h; h--)
        this.has(h) && (e = b.m(a, e, this.get(h), h, this));
      return e
    },
    reverse: function () {
      for (var a = Da(this), b = a.length - 1, c = 0; 0 <= b; b--,
        c++)
        a.hasOwnProperty(b) ? this.set(c, a[b]) : this.remove(c);
      return this
    },
    shift: function () {
      return this.shift()
    },
    slice: function (a, b, c) {
      var d = this.length();
      void 0 === b && (b = 0);
      b = 0 > b ? Math.max(d + b, 0) : Math.min(b, d);
      c = void 0 === c ? d : 0 > c ? Math.max(d + c, 0) : Math.min(c, d);
      c = Math.max(b, c);
      for (var e = [], f = b; f < c; f++)
        e.push(this.get(f));
      return new v(e)
    },
    some: function (a, b) {
      for (var c = this.length(), d = 0; d < this.length() && d < c; d++)
        if (this.has(d) && b.m(a, this.get(d), d, this))
          return !0;
      return !1
    },
    sort: function (a, b) {
      var c = Da(this);
      void 0 === b ? c.sort() : c.sort(function (c, d) {
        return Number(b.m(a, c, d))
      });
      for (var d = 0; d < c.length; d++)
        c.hasOwnProperty(d) ? this.set(d, c[d]) : this.remove(d)
    },
    splice: function (a, b, c, d) {
      return this.splice.apply(this, Array.prototype.splice.call(arguments, 1, arguments.length - 1))
    },
    toString: function () {
      return this.toString()
    },
    unshift: function (a, b) {
      return this.unshift.apply(this, Array.prototype.slice.call(arguments, 1))
    }
  };
  var y = {
      jc: {
        ADD: 0,
        AND: 1,
        APPLY: 2,
        ASSIGN: 3,
        BREAK: 4,
        CASE: 5,
        CONTINUE: 6,
        CONTROL: 49,
        CREATE_ARRAY: 7,
        CREATE_OBJECT: 8,
        DEFAULT: 9,
        DEFN: 50,
        DIVIDE: 10,
        DO: 11,
        EQUALS: 12,
        EXPRESSION_LIST: 13,
        FN: 51,
        FOR: 14,
        FOR_IN: 47,
        GET: 15,
        GET_CONTAINER_VARIABLE: 48,
        GET_INDEX: 16,
        GET_PROPERTY: 17,
        GREATER_THAN: 18,
        GREATER_THAN_EQUALS: 19,
        IDENTITY_EQUALS: 20,
        IDENTITY_NOT_EQUALS: 21,
        IF: 22,
        LESS_THAN: 23,
        LESS_THAN_EQUALS: 24,
        MODULUS: 25,
        MULTIPLY: 26,
        NEGATE: 27,
        NOT: 28,
        NOT_EQUALS: 29,
        NULL: 45,
        OR: 30,
        PLUS_EQUALS: 31,
        POST_DECREMENT: 32,
        POST_INCREMENT: 33,
        PRE_DECREMENT: 34,
        PRE_INCREMENT: 35,
        QUOTE: 46,
        RETURN: 36,
        SET_PROPERTY: 43,
        SUBTRACT: 37,
        SWITCH: 38,
        TERNARY: 39,
        TYPEOF: 40,
        UNDEFINED: 44,
        VAR: 41,
        WHILE: 42
      }
    },
    Fa = "charAt concat indexOf lastIndexOf match replace search slice split substring toLowerCase toLocaleLowerCase toString toUpperCase toLocaleUpperCase trim".split(" "),
    Ga = new g("break"),
    Ha = new g("continue");
  y.add = function (a, b) {
    return this.evaluate(a) + this.evaluate(b)
  };
  y.and = function (a, b) {
    return this.evaluate(a) && this.evaluate(b)
  };
  y.apply = function (a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    if (!(c instanceof v))
      throw "Error: Non-List argument given to Apply instruction.";
    if (null === a || void 0 === a)
      throw "TypeError: Can't read property " + b + " of " + a + ".";
    if ("boolean" == typeof a || "number" == typeof a) {
      if ("toString" == b)
        return a.toString();
      throw "TypeError: " + a + "." + b + " is not a function.";
    }
    if ("string" == typeof a) {
      if (0 <= qa(Fa, b))
        return Ba(a[b].apply(a, Da(c)));
      throw "TypeError: " + b + " is not a function";
    }
    if (a instanceof v) {
      if (a.has(b)) {
        var d = a.get(b);
        if (d instanceof w) {
          var e = Da(c);
          e.unshift(this.C());
          return d.m.apply(d, e)
        }
        throw "TypeError: " + b + " is not a function";
      }
      if (0 <= qa(Ea.Be, b))
        return e = Da(c),
          e.unshift(this.C()),
          Ea[b].apply(a, e)
    }
    if (a instanceof w || a instanceof ta) {
      if (a.has(b)) {
        d = a.get(b);
        if (d instanceof w)
          return e = Da(c),
            e.unshift(this.C()),
            d.m.apply(d, e);
        throw "TypeError: " + b + " is not a function";
      }
      if ("toString" == b)
        return a instanceof w ? a.getName() : a.toString();
      if ("hasOwnProperty" == b)
        return a.has.apply(a, Da(c))
    }
    throw "TypeError: Object has no '" + b + "' property.";
  };
  y.assign = function (a, b) {
    a = this.evaluate(a);
    if ("string" != typeof a)
      throw "Invalid key name given for assignment.";
    var c = this.C();
    if (!c.has(a))
      throw "Attempting to assign to undefined value " + b;
    var d = this.evaluate(b);
    c.set(a, d);
    return d
  };
  y["break"] = function () {
    return Ga
  };
  y["case"] = function (a) {
    for (var b = this.evaluate(a), c = 0; c < b.length; c++) {
      var d = this.evaluate(b[c]);
      if (d instanceof g)
        return d
    }
  };
  y["continue"] = function () {
    return Ha
  };
  y.td = function (a, b, c) {
    var d = new v;
    b = this.evaluate(b);
    for (var e = 0; e < b.length; e++)
      d.push(b[e]);
    var f = [y.jc.FN, a, d].concat(Array.prototype.splice.call(arguments, 2, arguments.length - 2));
    this.C().set(a, this.evaluate(f))
  };
  y.wd = function (a, b) {
    return this.evaluate(a) / this.evaluate(b)
  };
  y.zd = function (a, b) {
    return this.evaluate(a) == this.evaluate(b)
  };
  y.Ad = function (a) {
    for (var b, c = 0; c < arguments.length; c++)
      b = this.evaluate(arguments[c]);
    return b
  };
  y.Dd = function (a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    var d = this.C();
    if ("string" == typeof b)
      for (var e = 0; e < b.length; e++) {
        d.set(a, e);
        var f = this.xa(c);
        if (f instanceof g) {
          if ("break" == f.A)
            break;
          if ("return" == f.A)
            return f
        }
      }
    else if (b instanceof ta || b instanceof v || b instanceof w) {
      var h = b.T(),
        k = h.length();
      for (e = 0; e < k; e++)
        if (d.set(a, h.get(e)),
          f = this.xa(c),
          f instanceof g) {
          if ("break" == f.A)
            break;
          if ("return" == f.A)
            return f
        }
    }
  };
  y.get = function (a) {
    return this.C().get(this.evaluate(a))
  };
  y.hc = function (a, b) {
    var c;
    a = this.evaluate(a);
    b = this.evaluate(b);
    if (void 0 === a || null === a)
      throw "TypeError: cannot access property of " + a + ".";
    a instanceof ta || a instanceof v || a instanceof w ? c = a.get(b) : "string" == typeof a && ("length" == b ? c = a.length : ja(b) && (c = a[b]));
    return c
  };
  y.Gd = function (a, b) {
    return this.evaluate(a) > this.evaluate(b)
  };
  y.Hd = function (a, b) {
    return this.evaluate(a) >= this.evaluate(b)
  };
  y.Ld = function (a, b) {
    return this.evaluate(a) === this.evaluate(b)
  };
  y.Md = function (a, b) {
    return this.evaluate(a) !== this.evaluate(b)
  };
  y["if"] = function (a, b, c) {
    var d = [];
    this.evaluate(a) ? d = this.evaluate(b) : c && (d = this.evaluate(c));
    var e = this.xa(d);
    if (e instanceof g)
      return e
  };
  y.Ud = function (a, b) {
    return this.evaluate(a) < this.evaluate(b)
  };
  y.Vd = function (a, b) {
    return this.evaluate(a) <= this.evaluate(b)
  };
  y.Xd = function (a, b) {
    return this.evaluate(a) % this.evaluate(b)
  };
  y.multiply = function (a, b) {
    return this.evaluate(a) * this.evaluate(b)
  };
  y.Yd = function (a) {
    return -this.evaluate(a)
  };
  y.Zd = function (a) {
    return !this.evaluate(a)
  };
  y.$d = function (a, b) {
    return this.evaluate(a) != this.evaluate(b)
  };
  y["null"] = function () {
    return null
  };
  y.or = function (a, b) {
    return this.evaluate(a) || this.evaluate(b)
  };
  y.zc = function (a, b) {
    var c = this.evaluate(a);
    this.evaluate(b);
    return c
  };
  y.Ac = function (a) {
    return this.evaluate(a)
  };
  y.quote = function (a) {
    return Array.prototype.slice.apply(arguments)
  };
  y["return"] = function (a) {
    return new g("return", this.evaluate(a))
  };
  y.setProperty = function (a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    if (null === a || void 0 === a)
      throw "TypeError: Can't set property " + b + " of " + a + ".";
    (a instanceof w || a instanceof v || a instanceof ta) && a.set(b, c);
    return c
  };
  y.Ae = function (a, b) {
    return this.evaluate(a) - this.evaluate(b)
  };
  y["switch"] = function (a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    if (!pa(b) || !pa(c))
      throw "Error: Malformed switch instruction.";
    for (var d, e = !1, f = 0; f < b.length; f++)
      if (e || a === this.evaluate(b[f]))
        if (d = this.evaluate(c[f]),
          d instanceof g) {
          var h = d.A;
          if ("break" == h)
            return;
          if ("return" == h || "continue" == h)
            return d
        } else
          e = !0;
    if (c.length == b.length + 1 && (d = this.evaluate(c[c.length - 1]),
        d instanceof g && ("return" == d.A || "continue" == d.A)))
      return d
  };
  y.Ce = function (a, b, c) {
    return this.evaluate(a) ? this.evaluate(b) : this.evaluate(c)
  };
  y["typeof"] = function (a) {
    a = this.evaluate(a);
    return a instanceof w ? "function" : typeof a
  };
  y.undefined = function () {};
  y["var"] = function (a) {
    for (var b = this.C(), c = 0; c < arguments.length; c++) {
      var d = arguments[c];
      "string" != typeof d || b.add(d, void 0)
    }
  };
  y["while"] = function (a, b, c, d) {
    var e, f = this.evaluate(d);
    if (this.evaluate(c) && (e = this.xa(f),
        e instanceof g)) {
      if ("break" == e.A)
        return;
      if ("return" == e.A)
        return e
    }
    for (; this.evaluate(a);) {
      e = this.xa(f);
      if (e instanceof g) {
        if ("break" == e.A)
          break;
        if ("return" == e.A)
          return e
      }
      this.evaluate(b)
    }
  };
  var Ka = function () {
    this.ic = !1;
    this.H = new x;
    Ia(this);
    this.ic = !0
  };
  Ka.prototype.Rd = function () {
    return this.ic
  };
  Ka.prototype.isInitialized = Ka.prototype.Rd;
  Ka.prototype.R = function (a) {
    this.H.K.sc(String(a[0])) || (this.H.K.reset(),
      this.H.K.Dc(!0));
    return this.H.xb(a)
  };
  Ka.prototype.execute = Ka.prototype.R;
  Ka.prototype.L = function () {
    this.H.L()
  };
  Ka.prototype.makeImmutable = Ka.prototype.L;
  var Ia = function (a) {
    function b(a, b) {
      e.H.Ub(a, String(b))
    }

    function c(a, b) {
      e.H.V(String(d[a]), b)
    }
    var d = y.jc,
      e = a;
    b("control", d.CONTROL);
    b("fn", d.FN);
    b("list", d.CREATE_ARRAY);
    b("map", d.CREATE_OBJECT);
    b("undefined", d.UNDEFINED);
    c("ADD", y.add);
    c("AND", y.and);
    c("APPLY", y.apply);
    c("ASSIGN", y.assign);
    c("BREAK", y["break"]);
    c("CASE", y["case"]);
    c("CONTINUE", y["continue"]);
    c("DEFAULT", y["case"]);
    c("DEFN", y.td);
    c("DIVIDE", y.wd);
    c("EQUALS", y.zd);
    c("EXPRESSION_LIST", y.Ad);
    c("FOR_IN", y.Dd);
    c("GET", y.get);
    c("GET_INDEX", y.hc);
    c("GET_PROPERTY", y.hc);
    c("GREATER_THAN", y.Gd);
    c("GREATER_THAN_EQUALS", y.Hd);
    c("IDENTITY_EQUALS", y.Ld);
    c("IDENTITY_NOT_EQUALS", y.Md);
    c("IF", y["if"]);
    c("LESS_THAN", y.Ud);
    c("LESS_THAN_EQUALS", y.Vd);
    c("MODULUS", y.Xd);
    c("MULTIPLY", y.multiply);
    c("NEGATE", y.Yd);
    c("NOT", y.Zd);
    c("NOT_EQUALS", y.$d);
    c("NULL", y["null"]);
    c("OR", y.or);
    c("POST_DECREMENT", y.zc);
    c("POST_INCREMENT", y.zc);
    c("PRE_DECREMENT", y.Ac);
    c("PRE_INCREMENT", y.Ac);
    c("QUOTE", y.quote);
    c("RETURN", y["return"]);
    c("SET_PROPERTY", y.setProperty);
    c("SUBTRACT", y.Ae);
    c("SWITCH", y["switch"]);
    c("TERNARY", y.Ce);
    c("TYPEOF", y["typeof"]);
    c("VAR", y["var"]);
    c("WHILE", y["while"])
  };
  Ka.prototype.V = function (a, b) {
    this.H.V(a, b)
  };
  Ka.prototype.addInstruction = Ka.prototype.V;
  Ka.prototype.J = function () {
    return this.H.J()
  };
  Ka.prototype.getQuota = Ka.prototype.J;
  Ka.prototype.Ua = function () {
    this.H.Ua()
  };
  Ka.prototype.resetQuota = Ka.prototype.Ua;
  Ka.prototype.eb = function (a, b, c) {
    this.H.K.Vb(a, b, c)
  };
  var La = function () {
    this.Ra = {}
  };
  La.prototype.get = function (a) {
    return this.Ra.hasOwnProperty(a) ? this.Ra[a] : void 0
  };
  La.prototype.add = function (a, b) {
    if (this.Ra.hasOwnProperty(a))
      throw "Attempting to add a function which already exists: " + a + ".";
    var c = new w(a, function () {
      for (var a = Array.prototype.slice.call(arguments, 0), c = 0; c < a.length; c++)
        a[c] = this.evaluate(a[c]);
      return b.apply(this, a)
    });
    c.L();
    this.Ra[a] = c
  };
  La.prototype.addAll = function (a) {
    for (var b in a)
      a.hasOwnProperty(b) && this.add(b, a[b])
  };
  var A = window,
    B = document,
    Ma = navigator,
    Na = function (a, b) {
      var c = A[a];
      A[a] = void 0 === c ? b : c;
      return A[a]
    },
    Oa = function (a, b) {
      b && (a.addEventListener ? a.onload = b : a.onreadystatechange = function () {
        a.readyState in {
          loaded: 1,
          complete: 1
        } && (a.onreadystatechange = null,
          b())
      })
    },
    D = function (a, b, c) {
      var d = B.createElement("script");
      d.type = "text/javascript";
      d.async = !0;
      d.src = a;
      Oa(d, b);
      c && (d.onerror = c);
      fa() && d.setAttribute("nonce", fa());
      var e = B.getElementsByTagName("script")[0] || B.body || B.head;
      e.parentNode.insertBefore(d, e);
      return d
    },
    Pa = function (a, b) {
      var c = B.createElement("iframe");
      c.height = "0";
      c.width = "0";
      c.style.display = "none";
      c.style.visibility = "hidden";
      var d = B.body && B.body.lastChild || B.body || B.head;
      d.parentNode.insertBefore(c, d);
      Oa(c, b);
      void 0 !== a && (c.src = a);
      return c
    },
    Qa = function (a, b, c) {
      var d = new Image(1, 1);
      d.onload = function () {
        d.onload = null;
        b && b()
      };
      d.onerror = function () {
        d.onerror = null;
        c && c()
      };
      d.src = a
    },
    Ra = function (a, b, c, d) {
      a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c)
    },
    Sa = function (a, b, c, d) {
      a.removeEventListener ? a.removeEventListener(b, c, !!d) : a.detachEvent && a.detachEvent("on" + b, c)
    },
    G = function (a) {
      A.setTimeout(a, 0)
    },
    Ua = function (a) {
      var b = B.getElementById(a);
      if (b && Ta(b, "id") != a)
        for (var c = 1; c < document.all[a].length; c++)
          if (Ta(document.all[a][c], "id") == a)
            return document.all[a][c];
      return b
    },
    Ta = function (a, b) {
      return a && b && a.attributes && a.attributes[b] ? a.attributes[b].value : null
    },
    Va = function (a) {
      var b = a.innerText || a.textContent || "";
      b && " " != b && (b = b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ""));
      b && (b = b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g, " "));
      return b
    },
    Wa = function (a) {
      var b = B.createElement("div");
      b.innerHTML = "A<div>" + a + "</div>";
      b = b.lastChild;
      for (var c = []; b.firstChild;)
        c.push(b.removeChild(b.firstChild));
      return c
    },
    Xa = function (a) {
      Ma.sendBeacon && Ma.sendBeacon(a) || Qa(a)
    };
  var Ya = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
  var Za = /:[0-9]+$/,
    $a = function (a, b) {
      for (var c = a.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (decodeURIComponent(e[0]).replace(/\+/g, " ") == b)
          return decodeURIComponent(e.slice(1).join("=")).replace(/\+/g, " ")
      }
    },
    ab = function (a, b, c, d, e) {
      var f, h = function (a) {
          return a ? a.replace(":", "").toLowerCase() : ""
        },
        k = h(a.protocol) || h(A.location.protocol);
      b && (b = String(b).toLowerCase());
      switch (b) {
        case "protocol":
          f = k;
          break;
        case "host":
          f = (a.hostname || A.location.hostname).replace(Za, "").toLowerCase();
          if (c) {
            var l = /^www\d*\./.exec(f);
            l && l[0] && (f = f.substr(l[0].length))
          }
          break;
        case "port":
          f = String(Number(a.hostname ? a.port : A.location.port) || ("http" == k ? 80 : "https" == k ? 443 : ""));
          break;
        case "path":
          f = "/" == a.pathname.substr(0, 1) ? a.pathname : "/" + a.pathname;
          var m = f.split("/");
          0 <= qa(d || [], m[m.length - 1]) && (m[m.length - 1] = "");
          f = m.join("/");
          break;
        case "query":
          f = a.search.replace("?", "");
          e && (f = $a(f, e));
          break;
        case "extension":
          var n = a.pathname.split(".");
          f = 1 < n.length ? n[n.length - 1] : "";
          f = f.split("/")[0];
          break;
        case "fragment":
          f = a.hash.replace("#", "");
          break;
        default:
          f = a && a.href
      }
      return f
    },
    bb = function (a) {
      var b = "";
      a && a.href && (b = a.hash ? a.href.replace(a.hash, "") : a.href);
      return b
    },
    M = function (a) {
      var b = document.createElement("a");
      a && (Ya.test(a),
        b.href = a);
      var c = b.pathname;
      "/" !== c[0] && (c = "/" + c);
      var d = b.hostname.replace(Za, "");
      return {
        href: b.href,
        protocol: b.protocol,
        host: b.host,
        hostname: d,
        pathname: c,
        search: b.search,
        hash: b.hash,
        port: b.port
      }
    };
  var eb = function () {
      this.sb = new Ka;
      var a = new La;
      a.addAll(cb());
      db(this, function (b) {
        return a.get(b)
      })
    },
    cb = function () {
      return {
        callInWindow: fb,
        encodeURI: encodeURI,
        encodeURIComponent: encodeURIComponent,
        getCurrentUrl: gb,
        getInWindow: jb,
        getReferrer: kb,
        getUrlComponent: lb,
        getUrlFragment: mb,
        isPlainObject: nb,
        loadIframe: ob,
        loadJavaScript: pb,
        removeUrlFragment: qb,
        replaceAll: sb,
        sendTrackingBeacon: tb,
        setInWindow: ub,
        queryPermission: vb
      }
    };
  eb.prototype.R = function (a) {
    return this.sb.R(a)
  };
  eb.prototype.execute = eb.prototype.R;
  var db = function (a, b) {
    a.sb.V("require", b)
  };
  eb.prototype.eb = function (a, b, c) {
    this.sb.eb(a, b, c)
  };

  function fb(a, b) {
    for (var c = a.split("."), d = A, e = d[c[0]], f = 1; e && f < c.length; f++)
      d = e,
      e = e[c[f]];
    if ("function" == wa(e)) {
      var h = [];
      for (f = 1; f < arguments.length; f++)
        h.push(Aa(arguments[f]));
      e.apply(d, h)
    }
  }

  function gb() {
    return A.location.href
  }

  function jb(a, b, c) {
    for (var d = a.split("."), e = A, f = 0; f < d.length - 1; f++)
      if (e = e[d[f]],
        void 0 === e || null === e)
        return;
    b && (void 0 === e[d[f]] || c && !e[d[f]]) && (e[d[f]] = Aa(b));
    return Ba(e[d[f]])
  }

  function kb() {
    return B.referrer
  }

  function lb(a, b, c, d, e) {
    var f;
    if (d && d instanceof v) {
      f = [];
      for (var h = 0; h < d.length(); h++) {
        var k = d.get(h);
        "string" == typeof k && f.push(k)
      }
    }
    return ab(M(a), b, c, f, e)
  }

  function mb(a) {
    return ab(M(a), "fragment")
  }

  function nb(a) {
    return a instanceof ta
  }

  function ob(a, b) {
    var c = this.C();
    Pa(a, function () {
      b instanceof w && b.m(c)
    })
  }
  var wb = {};

  function pb(a, b, c, d) {
    if (this.gc().request("loadJavaScript", a)) {
      var e = this.C(),
        f = function () {
          b instanceof w && b.m(e)
        },
        h = function () {
          c instanceof w && c.m(e)
        };
      d ? wb[d] ? (wb[d].onSuccess.push(f),
        wb[d].onFailure.push(h)) : (wb[d] = {
          onSuccess: [f],
          onFailure: [h]
        },
        f = function () {
          for (var a = wb[d].onSuccess, b = 0; b < a.length; b++)
            G(a[b]);
          a.push = function (a) {
            G(a);
            return 0
          }
        },
        h = function () {
          for (var a = wb[d].onFailure, b = 0; b < a.length; b++)
            G(a[b]);
          wb[d] = null
        },
        D(a, f, h)) : D(a, f, h)
    }
  }

  function qb(a) {
    return bb(M(a))
  }

  function sb(a, b, c) {
    return a.replace(new RegExp(b, "g"), c)
  }

  function tb(a, b, c) {
    var d = this.C();
    Qa(a, function () {
      b instanceof w && b.m(d)
    }, function () {
      c instanceof w && c.m(d)
    })
  }

  function ub(a, b, c) {
    for (var d = a.split("."), e = A, f = 0; f < d.length - 1; f++)
      if (e = e[d[f]],
        void 0 === e)
        return !1;
    return void 0 === e[d[f]] || c ? (e[d[f]] = Aa(b),
      !0) : !1
  }

  function xb() {
    return function () {
      return !0
    }
  }

  function yb(a) {
    var b = a.url;
    return function (a) {
      return b === a
    }
  }

  function vb(a, b) {
    return this.gc().request.apply(null, Array.prototype.slice.call(arguments, 0))
  };
  var Xb, Yb = [],
    Zb = [],
    $b = [],
    ac = [],
    bc = [],
    cc = {},
    dc, ec, fc, hc = function (a) {
      var b = a["function"];
      if (!b)
        throw "Error: No function name given for function call.";
      var c = !!cc[b],
        d = {},
        e;
      for (e in a)
        a.hasOwnProperty(e) && 0 === e.indexOf("vtp_") && (d[c ? e : e.substr(4)] = a[e]);
      return c ? cc[b](d) : Xb(b, d)
    },
    jc = function (a, b, c) {
      c = c || [];
      var d = {},
        e;
      for (e in a)
        a.hasOwnProperty(e) && (d[e] = ic(a[e], b, c));
      return d
    },
    ic = function (a, b, c) {
      if (pa(a)) {
        var d;
        switch (a[0]) {
          case "function_id":
            return a[1];
          case "list":
            d = [];
            for (var e = 1; e < a.length; e++)
              d.push(ic(a[e], b, c));
            return d;
          case "macro":
            var f = a[1];
            if (c[f])
              return;
            var h = Yb[f];
            if (!h || b(h))
              return;
            c[f] = !0;
            try {
              var k = jc(h, b, c);
              d = hc(k);
              fc && (d = fc.od(d, k))
            } catch (t) {
              d = !1
            }
            c[f] = !1;
            return d;
          case "map":
            d = {};
            for (var l = 1; l < a.length; l += 2)
              d[ic(a[l], b, c)] = ic(a[l + 1], b, c);
            return d;
          case "template":
            d = [];
            for (var m = !1, n = 1; n < a.length; n++) {
              var p = ic(a[n], b, c);
              ec && (m = m || p === ec.Ia);
              d.push(p)
            }
            return ec && m ? ec.pd(d) : d.join("");
          case "escape":
            d = ic(a[1], b, c);
            if (ec && pa(a[1]) && "macro" === a[1][0] && ec.Sd(a))
              return ec.he(d);
            d = String(d);
            for (var q = 2; q < a.length; q++)
              zb[a[q]] && (d = zb[a[q]](d));
            return d;
          case "tag":
            var r = a[1];
            if (!ac[r])
              throw Error("Unable to resolve tag reference " + r + ".");
            return d = {
              ac: a[2],
              index: r
            };
          case "zb":
            var u = kc({
              "function": a[1],
              arg0: a[2],
              arg1: a[3],
              ignore_case: a[5]
            }, b, c);
            a[4] && (u = !u);
            return u;
          default:
            throw Error("Attempting to expand unknown Value type: " + a[0] + ".");
        }
      }
      return a
    },
    kc = function (a, b, c) {
      try {
        return dc(jc(a, b, c))
      } catch (d) {
        JSON.stringify(a)
      }
      return null
    };
  var lc = null,
    oc = function (a) {
      function b(a) {
        for (var b = 0; b < a.length; b++)
          d[a[b]] = !0
      }
      var c = [],
        d = [];
      lc = mc(a);
      for (var e = 0; e < Zb.length; e++) {
        var f = Zb[e],
          h = nc(f);
        if (h) {
          for (var k = f.add || [], l = 0; l < k.length; l++)
            c[k[l]] = !0;
          b(f.block || [])
        } else
          null === h && b(f.block || [])
      }
      var m = [];
      for (e = 0; e < ac.length; e++)
        c[e] && !d[e] && (m[e] = !0);
      return m
    },
    nc = function (a) {
      for (var b = a["if"] || [], c = 0; c < b.length; c++) {
        var d = lc(b[c]);
        if (!d)
          return null === d ? null : !1
      }
      var e = a.unless || [];
      for (c = 0; c < e.length; c++) {
        d = lc(e[c]);
        if (null === d)
          return null;
        if (d)
          return !1
      }
      return !0
    };
  var mc = function (a) {
    var b = [];
    return function (c) {
      void 0 === b[c] && (b[c] = kc($b[c], a));
      return b[c]
    }
  };
  /*
Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */
  var rc = {},
    sc = null;
  rc.o = "UA-123581848-1";
  var tc = null,
    uc = "//www.googletagmanager.com/a?id=" + rc.o + "&cv=1",
    vc = {},
    wc = {},
    xc = B.currentScript ? B.currentScript.src : void 0;
  var yc = function () {},
    zc = function (a) {
      return "function" == typeof a
    },
    Ac = function (a) {
      return "string" == wa(a)
    },
    Bc = function (a) {
      return "number" == wa(a) && !isNaN(a)
    },
    Cc = function (a) {
      return Math.round(Number(a)) || 0
    },
    Dc = function (a) {
      return "false" == String(a).toLowerCase() ? !1 : !!a
    },
    Ec = function (a) {
      var b = [];
      if (pa(a))
        for (var c = 0; c < a.length; c++)
          b.push(String(a[c]));
      return b
    },
    Fc = function (a) {
      return a ? a.replace(/^\s+|\s+$/g, "") : ""
    },
    Gc = function (a, b) {
      if (!Bc(a) || !Bc(b) || a > b)
        a = 0,
        b = 2147483647;
      return Math.floor(Math.random() * (b - a + 1) + a)
    },
    Hc = function () {
      this.prefix = "gtm.";
      this.values = {}
    };
  Hc.prototype.set = function (a, b) {
    this.values[this.prefix + a] = b
  };
  Hc.prototype.get = function (a) {
    return this.values[this.prefix + a]
  };
  Hc.prototype.contains = function (a) {
    return void 0 !== this.get(a)
  };
  var Ic = function () {
      var a = sc.sequence || 0;
      sc.sequence = a + 1;
      return a
    },
    Jc = function (a, b, c) {
      return a && a.hasOwnProperty(b) ? a[b] : c
    },
    Kc = function (a) {
      var b = !1;
      return function () {
        if (!b)
          try {
            a()
          } catch (c) {}
        b = !0
      }
    };
  var O = function () {
    var a = function (a) {
      return {
        toString: function () {
          return a
        }
      }
    };
    return {
      Jb: a("convert_case_to"),
      Kb: a("convert_false_to"),
      Lb: a("convert_null_to"),
      Mb: a("convert_true_to"),
      Nb: a("convert_undefined_to"),
      N: a("function"),
      Gc: a("instance_name"),
      Hc: a("live_only"),
      Ic: a("malware_disabled"),
      Jc: a("once_per_event"),
      Pb: a("once_per_load"),
      Qb: a("setup_tags"),
      Kc: a("tag_id"),
      Rb: a("teardown_tags")
    }
  }();
  var Lc = new Hc,
    Mc = {},
    Pc = {
      set: function (a, b) {
        za(Nc(a, b), Mc)
      },
      get: function (a) {
        return Oc(a, 2)
      },
      reset: function () {
        Lc = new Hc;
        Mc = {}
      }
    },
    Oc = function (a, b) {
      return 2 != b ? Lc.get(a) : Qc(a)
    },
    Qc = function (a, b, c) {
      var d = a.split(".");
      var e = function (a, b) {
        for (var c = 0; void 0 !== a && c < d.length; c++) {
          if (null === a)
            return !1;
          a = a[d[c]]
        }
        return void 0 !== a || 1 < c ? a : b.length ? e(Rc(b.pop()), b) : Sc(d)
      };
      return e(Mc.eventModel, [b, c]);
      return Sc(d)
    },
    Sc = function (a) {
      for (var b = Mc, c = 0; c < a.length; c++) {
        if (null === b)
          return !1;
        if (void 0 === b)
          break;
        b = b[a[c]]
      }
      return b
    };
  var Rc = function (a) {
      if (a) {
        var b = Sc(["gtag", "targets", a]);
        return ya(b) ? b : void 0
      }
    },
    Tc = function (a, b) {
      function c(a) {
        if (a)
          for (var b in a)
            a.hasOwnProperty(b) && (d[b] = null)
      }
      var d = {};
      c(Mc);
      delete d.eventModel;
      c(Rc(a));
      c(Rc(b));
      c(Mc.eventModel);
      var e = [],
        f;
      for (f in d)
        d.hasOwnProperty(f) && e.push(f);
      return e
    };
  var Uc = function (a, b) {
      Lc.set(a, b);
      za(Nc(a, b), Mc)
    },
    Nc = function (a, b) {
      for (var c = {}, d = c, e = a.split("."), f = 0; f < e.length - 1; f++)
        d = d[e[f]] = {};
      d[e[e.length - 1]] = b;
      return c
    };
  var Vc = new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),
    Wc = {
      customPixels: ["nonGooglePixels"],
      html: ["customScripts", "customPixels", "nonGooglePixels", "nonGoogleScripts", "nonGoogleIframes"],
      customScripts: ["html", "customPixels", "nonGooglePixels", "nonGoogleScripts", "nonGoogleIframes"],
      nonGooglePixels: [],
      nonGoogleScripts: ["nonGooglePixels"],
      nonGoogleIframes: ["nonGooglePixels"]
    },
    Xc = {
      customPixels: ["customScripts", "html"],
      html: ["customScripts"],
      customScripts: ["html"],
      nonGooglePixels: ["customPixels", "customScripts", "html", "nonGoogleScripts", "nonGoogleIframes"],
      nonGoogleScripts: ["customScripts", "html"],
      nonGoogleIframes: ["customScripts", "html", "nonGoogleScripts"]
    },
    Yc = function (a, b) {
      for (var c = [], d = 0; d < a.length; d++)
        c.push(a[d]),
        c.push.apply(c, b[a[d]] || []);
      return c
    };
  var Zc = function (a) {
    var b = Oc("gtm.whitelist");
    b = ["google", "gtagfl", "oid", "op"];
    var c = b && Yc(Ec(b), Wc),
      d = Oc("gtm.blacklist") || Oc("tagTypeBlacklist") || [];
    Vc.test(A.location && A.location.hostname) && (d = Ec(d),
      d.push("nonGooglePixels", "nonGoogleScripts"));
    var e = d && Yc(Ec(d), Xc),
      f = {};
    return function (h) {
      var k = h && h[O.N];
      if (!k || "string" != typeof k)
        return !0;
      k = k.replace(/^_*/, "");
      if (void 0 !== f[k])
        return f[k];
      var l = wc[k] || [],
        m = a(k);
      if (b) {
        var n;
        if (n = m)
          a: {
            if (0 > qa(c, k))
              if (l && 0 < l.length)
                for (var p = 0; p < l.length; p++) {
                  if (0 > qa(c, l[p])) {
                    n = !1;
                    break a
                  }
                }
            else {
              n = !1;
              break a
            }
            n = !0
          }
        m = n
      }
      var q = !1;
      if (d) {
        var r;
        if (!(r = 0 <= qa(e, k)))
          a: {
            for (var u = l || [], t = new Hc, z = 0; z < e.length; z++)
              t.set(e[z], !0);
            for (z = 0; z < u.length; z++)
              if (t.get(u[z])) {
                r = !0;
                break a
              }
            r = !1
          }
        q = r
      }
      return f[k] = !m || q
    }
  };
  var bd = {
    od: function (a, b) {
      b[O.Jb] && "string" === typeof a && (a = 1 == b[O.Jb] ? a.toLowerCase() : a.toUpperCase());
      b.hasOwnProperty(O.Lb) && null === a && (a = b[O.Lb]);
      b.hasOwnProperty(O.Nb) && void 0 === a && (a = b[O.Nb]);
      b.hasOwnProperty(O.Mb) && !0 === a && (a = b[O.Mb]);
      b.hasOwnProperty(O.Kb) && !1 === a && (a = b[O.Kb]);
      return a
    }
  };
  var cd = function (a) {
      var b = sc.zones;
      !b && a && (b = sc.zones = a());
      return b
    },
    dd = {
      active: !0,
      isWhitelisted: function () {
        return !0
      }
    };
  var ed = !1,
    fd = 0,
    gd = [];

  function hd(a) {
    if (!ed) {
      var b = B.createEventObject,
        c = "complete" == B.readyState,
        d = "interactive" == B.readyState;
      if (!a || "readystatechange" != a.type || c || !b && d) {
        ed = !0;
        for (var e = 0; e < gd.length; e++)
          G(gd[e])
      }
      gd.push = function () {
        for (var a = 0; a < arguments.length; a++)
          G(arguments[a]);
        return 0
      }
    }
  }

  function id() {
    if (!ed && 140 > fd) {
      fd++;
      try {
        B.documentElement.doScroll("left"),
          hd()
      } catch (a) {
        A.setTimeout(id, 50)
      }
    }
  }
  var jd = function (a) {
    ed ? a() : gd.push(a)
  };
  var kd = !1,
    ld = function () {
      return A.GoogleAnalyticsObject && A[A.GoogleAnalyticsObject]
    };
  var md = function (a) {
      A.GoogleAnalyticsObject || (A.GoogleAnalyticsObject = a || "ga");
      var b = A.GoogleAnalyticsObject;
      if (!A[b]) {
        var c = function () {
          c.q = c.q || [];
          c.q.push(arguments)
        };
        c.l = Number(new Date);
        A[b] = c
      }
      return A[b]
    },
    nd = function (a, b, c, d) {
      b = String(b).replace(/\s+/g, "").split(",");
      var e = ld();
      e(a + "require", "linker");
      e(a + "linker:autoLink", b, c, d)
    };
  var rd = function () {
      return "&tc=" + ac.filter(function (a) {
        return a
      }).length
    },
    sd = "0.005000" > Math.random(),
    td = function () {
      var a = 0,
        b = 0;
      return {
        Td: function () {
          if (2 > a)
            return !1;
          1E3 <= (new Date).getTime() - b && (a = 0);
          return 2 <= a
        },
        pe: function () {
          1E3 <= (new Date).getTime() - b && (a = 0);
          a++;
          b = (new Date).getTime()
        }
      }
    },
    ud = "",
    vd = function () {
      ud = [uc, "&v=3&t=t", "&pid=" + Gc(), "&rv=8o"].join("")
    },
    wd = {},
    xd = "",
    yd = void 0,
    zd = {},
    Ad = {},
    Bd = void 0,
    Cd = null,
    Dd = 1E3,
    Ed = function () {
      var a = yd;
      return void 0 === a ? "" : [ud, wd[a] ? "" : "&es=1", zd[a], rd(), xd, "&z=0"].join("")
    },
    Fd = function () {
      Bd && (A.clearTimeout(Bd),
        Bd = void 0);
      void 0 === yd || wd[yd] && !xd || (Ad[yd] || Cd.Td() || 0 >= Dd-- ? Ad[yd] = !0 : (Cd.pe(),
        Qa(Ed()),
        wd[yd] = !0,
        xd = ""))
    },
    Gd = function (a, b, c) {
      if (sd && !Ad[a] && b) {
        a !== yd && (Fd(),
          yd = a);
        var d = c + String(b[O.N] || "").replace(/_/g, "");
        xd = xd ? xd + "." + d : "&tr=" + d;
        Bd || (Bd = A.setTimeout(Fd, 500));
        2022 <= Ed().length && Fd()
      }
    };

  function Hd(a, b, c, d, e, f) {
    var h = ac[a],
      k = Id(a, b, c, d, e, f);
    if (!k)
      return null;
    var l = ic(h[O.Qb], f.Z, []);
    if (l && l.length) {
      var m = l[0];
      k = Hd(m.index, b, k, 1 === m.ac ? e : k, e, f)
    }
    return k
  }

  function Id(a, b, c, d, e, f) {
    function h() {
      var b = jc(k, f.Z);
      b.vtp_gtmOnSuccess = function () {
        Gd(f.id, ac[a], "5");
        c()
      };
      b.vtp_gtmOnFailure = function () {
        Gd(f.id, ac[a], "6");
        d()
      };
      b.vtp_gtmTagId = k.tag_id;
      if (k[O.Ic])
        d();
      else {
        Gd(f.id, k, "1");
        try {
          hc(b)
        } catch (z) {
          Gd(f.id, k, "7");
          e()
        }
      }
    }
    var k = ac[a];
    if (f.Z(k))
      return null;
    var l = ic(k[O.Rb], f.Z, []);
    if (l && l.length) {
      var m = l[0],
        n = Hd(m.index, b, c, d, e, f);
      if (!n)
        return null;
      c = n;
      d = 2 === m.ac ? e : n
    }
    if (k[O.Pb] || k[O.Jc]) {
      var p = k[O.Pb] ? bc : b,
        q = c,
        r = d;
      if (!p[a]) {
        h = Kc(h);
        var u = Jd(a, p, h);
        c = u.U;
        d = u.ka
      }
      return function () {
        p[a](q, r)
      }
    }
    return h
  }

  function Jd(a, b, c) {
    var d = [],
      e = [];
    b[a] = Kd(d, e, c);
    return {
      U: function () {
        b[a] = Ld;
        for (var c = 0; c < d.length; c++)
          d[c]()
      },
      ka: function () {
        b[a] = Md;
        for (var c = 0; c < e.length; c++)
          e[c]()
      }
    }
  }

  function Kd(a, b, c) {
    return function (d, e) {
      a.push(d);
      b.push(e);
      c()
    }
  }

  function Ld(a) {
    a()
  }

  function Md(a, b) {
    b()
  };

  function Nd(a) {
    var b = 0,
      c = 0,
      d = !1;
    return {
      add: function () {
        c++;
        return Kc(function () {
          b++;
          d && b >= c && a()
        })
      },
      Vc: function () {
        d = !0;
        b >= c && a()
      }
    }
  }

  function Od(a, b) {
    if (!sd)
      return;
    var c = function (a) {
      var d = b.Z(ac[a]) ? "3" : "4",
        f = ic(ac[a][O.Qb], b.Z, []);
      f && f.length && c(f[0].index);
      Gd(b.id, ac[a], d);
      var h = ic(ac[a][O.Rb], b.Z, []);
      h && h.length && c(h[0].index)
    };
    c(a);
  }
  var Pd = !1;
  var Qd = function (a, b) {
    var c = {};
    c[O.N] = "__" + a;
    for (var d in b)
      b.hasOwnProperty(d) && (c["vtp_" + d] = b[d]);
    for (d in void 0)
      (void 0).hasOwnProperty(d) && (c[d] = (void 0)[d]);
    ac.push(c);
    return ac.length - 1
  };
  var Rd = "allow_ad_personalization_signals cookie_domain cookie_expires cookie_name cookie_path custom_params event_callback event_timeout groups send_to send_page_view session_duration user_properties".split(" ");
  var Sd = /[A-Z]+/,
    Td = /\s/,
    Ud = function (a) {
      if (Ac(a) && (a = a.trim(),
          !Td.test(a))) {
        var b = a.indexOf("-");
        if (!(0 > b)) {
          var c = a.substring(0, b);
          if (Sd.test(c)) {
            for (var d = a.substring(b + 1).split("/"), e = 0; e < d.length; e++)
              if (!d[e])
                return;
            return {
              id: a,
              prefix: c,
              containerId: c + "-" + d[0],
              ia: d
            }
          }
        }
      }
    };
  var Vd = null,
    Wd = {},
    Xd = {},
    Yd;

  function Zd() {
    Vd = Vd || !sc.gtagRegistered;
    sc.gtagRegistered = !0;
    return Vd
  }
  var $d = function (a, b) {
    var c = {
      event: a
    };
    b && (c.eventModel = za(b, void 0),
      b.event_callback && (c.eventCallback = b.event_callback),
      b.event_timeout && (c.eventTimeout = b.event_timeout));
    return c
  };

  function ae(a) {
    if (void 0 === Xd[a.id]) {
      var b;
      if ("UA" == a.prefix)
        b = Qd("gtagua", {
          trackingId: a.id
        });
      else if ("AW" == a.prefix)
        b = Qd("gtagaw", {
          conversionId: a
        });
      else if ("DC" == a.prefix)
        b = Qd("gtagfl", {
          targetId: a.id
        });
      else if ("GF" == a.prefix)
        b = Qd("gtaggf", {
          conversionId: a
        });
      else if ("G" == a.prefix)
        b = Qd("get", {
          trackingId: a.id,
          isAutoTag: !0
        });
      else
        return;
      if (!Yd) {
        var c = {
            name: "send_to",
            dataLayerVersion: 2
          },
          d = {};
        d[O.N] = "__v";
        for (var e in c)
          c.hasOwnProperty(e) && (d["vtp_" + e] = c[e]);
        Yb.push(d);
        Yd = ["macro", Yb.length - 1]
      }
      var f = {
        arg0: Yd,
        arg1: a.id,
        ignore_case: !1
      };
      f[O.N] = "_lc";
      $b.push(f);
      var h = {
        "if": [$b.length - 1],
        add: [b]
      };
      h["if"] && (h.add || h.block) && Zb.push(h);
      Xd[a.id] = b
    }
  }
  var ce = {
      event: function (a) {
        var b = a[1];
        if (Ac(b) && !(3 < a.length)) {
          var c;
          if (2 < a.length) {
            if (!ya(a[2]))
              return;
            c = a[2]
          }
          var d = $d(b, c);
          var e;
          var f = c,
            h = Oc("gtag.fields.send_to", 2);
          Ac(h) || (h = "send_to");
          var k = f && f[h];
          void 0 === k && (k = Oc(h, 2),
            void 0 === k && (k = "default"));
          if (Ac(k) || pa(k)) {
            for (var l, m = k.toString().replace(/\s+/g, "").split(","), n = [], p = 0; p < m.length; p++)
              0 <= m[p].indexOf("-") ? n.push(m[p]) : n = n.concat(Wd[m[p]] || []);
            l = n;
            for (var q = {}, r = 0; r < l.length; ++r) {
              var u = Ud(l[r]);
              u && (q[u.id] = u)
            }
            var t = [],
              z;
            for (z in q)
              if (q.hasOwnProperty(z)) {
                var H = q[z];
                "AW" === H.prefix && H.ia[1] && t.push(H.containerId)
              }
            for (var E = 0; E < t.length; ++E)
              delete q[t[E]];
            var C = [],
              P;
            for (P in q)
              q.hasOwnProperty(P) && C.push(q[P]);
            e = C
          } else
            e = void 0;
          if (!e)
            return;
          var F = Zd();
          F || be();
          for (var K = [], I = 0; F && I < e.length; I++) {
            var L = e[I];
            K.push(L.id);
            ae(L)
          }
          d.eventModel = d.eventModel || {};
          0 < e.length ? d.eventModel.send_to = K.join() : delete d.eventModel.send_to;
          return d
        }
      },
      set: function (a) {
        var b;
        2 == a.length && ya(a[1]) ? b = za(a[1], void 0) : 3 == a.length && Ac(a[1]) && (b = {},
          b[a[1]] = a[2]);
        if (b)
          return b.eventModel = za(b, void 0),
            b.event = "gtag.set",
            b._clear = !0,
            b
      },
      js: function (a) {
        if (2 == a.length && a[1].getTime)
          return {
            event: "gtm.js",
            "gtm.start": a[1].getTime()
          }
      },
      config: function (a) {
        var b = a[2] || {};
        if (2 > a.length || !Ac(a[1]) || !ya(b))
          return;
        var c = Ud(a[1]);
        if (!c)
          return;
        Zd() ? ae(c) : be();
        var d = c.id,
          e;
        for (e in Wd)
          if (Wd.hasOwnProperty(e)) {
            var f = qa(Wd[e], d);
            0 <= f && Wd[e].splice(f, 1)
          }
        var h = c.id,
          k = b.groups || "default";
        k = k.toString().split(",");
        for (var l = 0; l < k.length; l++)
          Wd[k[l]] = Wd[k[l]] || [],
          Wd[k[l]].push(h);
        delete b.groups;
        Uc("gtag.targets." + c.id, void 0);
        Uc("gtag.targets." + c.id, za(b, void 0));
        var m = {};
        m.send_to = c.id;
        return $d("gtag.config", m);
      }
    },
    be = Kc(function () {});
  var de = !1,
    ee = [];

  function fe() {
    if (!de) {
      de = !0;
      for (var a = 0; a < ee.length; a++)
        G(ee[a])
    }
  };
  var ge = [],
    he = !1,
    me = function (a) {
      var b = a.eventCallback,
        c = Kc(function () {
          zc(b) && G(function () {
            b(rc.o)
          })
        }),
        d = a.eventTimeout;
      d && A.setTimeout(c, Number(d));
      return c
    },
    ne = function () {
      for (var a = !1; !he && 0 < ge.length;) {
        he = !0;
        delete Mc.eventModel;
        var b = ge.shift();
        if (zc(b))
          try {
            b.call(Pc)
          } catch (ie) {}
        else if (pa(b)) {
          var c = b;
          if (Ac(c[0])) {
            var d = c[0].split("."),
              e = d.pop(),
              f = c.slice(1),
              h = Oc(d.join("."), 2);
            if (void 0 !== h && null !== h)
              try {
                h[e].apply(h, f)
              } catch (ie) {}
          }
        } else {
          var k = b;
          if (k && ("[object Arguments]" == Object.prototype.toString.call(k) || Object.prototype.hasOwnProperty.call(k, "callee"))) {
            a: {
              var l = b;
              if (l.length && Ac(l[0])) {
                var m = ce[l[0]];
                if (m) {
                  b = m(l);
                  break a
                }
              }
              b = void 0
            }
            if (!b) {
              he = !1;
              continue
            }
          }
          var n;
          var p = void 0,
            q = b,
            r = q._clear;
          for (p in q)
            q.hasOwnProperty(p) && "_clear" !== p && (r && Uc(p, void 0),
              Uc(p, q[p]));
          var u = q.event;
          if (u) {
            var t = q["gtm.uniqueEventId"];
            t || (t = Ic(),
              q["gtm.uniqueEventId"] = t,
              Uc("gtm.uniqueEventId", t));
            tc = u;
            var z;
            var H, E, C = q,
              P = C.event,
              F = C["gtm.uniqueEventId"],
              K = sc.zones;
            E = K ? K.checkState(rc.o, F) : dd;
            if (E.active) {
              var I = me(C);
              c: {
                var L = E.isWhitelisted;
                if ("gtm.js" == P) {
                  if (Pd) {
                    H = !1;
                    break c
                  }
                  Pd = !0
                }
                var N = F,
                  ia = P;
                if (sd && !Ad[N] && yd !== N) {
                  Fd();
                  yd = N;
                  xd = "";
                  var J = zd,
                    ba = N,
                    X, Y = ia;
                  X = 0 === Y.indexOf("gtm.") ? encodeURIComponent(Y) : "*";
                  J[ba] = "&e=" + X + "&eid=" + N;
                  Bd || (Bd = A.setTimeout(Fd, 500))
                }
                var Q = Zc(L),
                  R = {
                    id: F,
                    name: P,
                    gd: I || yc,
                    Z: Q,
                    Va: oc(Q)
                  };
                for (var hb, ib = R, Ib = Nd(ib.gd), $c = [], Jb = [], rb = 0; rb < ac.length; rb++)
                  if (ib.Va[rb]) {
                    var ag = ac[rb];
                    var Kb = Ib.add();
                    try {
                      var je = Hd(rb, $c, Kb, Kb, Kb, ib);
                      je ? Jb.push(je) : (Od(rb, ib),
                        Kb())
                    } catch (ie) {
                      Kb()
                    }
                  }
                Ib.Vc();
                for (var ad = 0; ad < Jb.length; ad++)
                  Jb[ad]();
                hb = 0 < Jb.length;
                if ("gtm.js" === P || "gtm.sync" === P)
                  d: {}
                if (hb) {
                  for (var bg = {
                      __cl: !0,
                      __evl: !0,
                      __fsl: !0,
                      __hl: !0,
                      __jel: !0,
                      __lcl: !0,
                      __sdl: !0,
                      __tl: !0,
                      __ytl: !0
                    }, gc = 0; gc < R.Va.length; gc++)
                    if (R.Va[gc]) {
                      var le = ac[gc];
                      if (le && !bg[le[O.N]]) {
                        H = !0;
                        break c
                      }
                    }
                  H = !1
                } else
                  H = hb
              }
              z = H ? !0 : !1
            } else
              z = !1;
            tc = null;
            n = z
          } else
            n = !1;
          a = n || a
        }
        he = !1
      }
      return !a
    },
    oe = function () {
      var a = ne();
      try {
        var b = A["dataLayer"].hide;
        if (b && void 0 !== b[rc.o] && b.end) {
          b[rc.o] = !1;
          var c = !0,
            d;
          for (d in b)
            if (b.hasOwnProperty(d) && !0 === b[d]) {
              c = !1;
              break
            }
          c && (b.end(),
            b.end = null)
        }
      } catch (e) {}
      return a
    },
    pe = function () {
      var a = Na("dataLayer", []),
        b = Na("google_tag_manager", {});
      b = b["dataLayer"] = b["dataLayer"] || {};
      gd.push(function () {
        b.gtmDom || (b.gtmDom = !0,
          a.push({
            event: "gtm.dom"
          }))
      });
      ee.push(function () {
        b.gtmLoad || (b.gtmLoad = !0,
          a.push({
            event: "gtm.load"
          }))
      });
      var c = a.push;
      a.push = function () {
        var b = [].slice.call(arguments, 0);
        c.apply(a, b);
        for (ge.push.apply(ge, b); 300 < this.length;)
          this.shift();
        return ne()
      };
      ge.push.apply(ge, a.slice(0));
      G(oe)
    };
  var qe = {};
  qe.Ia = new String("undefined");
  qe.$a = {};
  var re = function (a) {
    this.resolve = function (b) {
      for (var c = [], d = 0; d < a.length; d++)
        c.push(a[d] === qe.Ia ? b : a[d]);
      return c.join("")
    }
  };
  re.prototype.toString = function () {
    return this.resolve("undefined")
  };
  re.prototype.valueOf = re.prototype.toString;
  qe.pd = function (a) {
    return new re(a)
  };
  var se = {};
  qe.qe = function (a, b) {
    var c = Ic();
    se[c] = [a, b];
    return c
  };
  qe.Xb = function (a) {
    var b = a ? 0 : 1;
    return function (a) {
      var c = se[a];
      if (c && "function" === typeof c[b])
        c[b]();
      se[a] = void 0
    }
  };
  qe.Sd = function (a) {
    for (var b = !1, c = !1, d = 2; d < a.length; d++)
      b = b || 8 === a[d],
      c = c || 16 === a[d];
    return b && c
  };
  qe.he = function (a) {
    if (a === qe.Ia)
      return a;
    var b = Ic();
    qe.$a[b] = a;
    return 'google_tag_manager["' + rc.o + '"].macro(' + b + ")"
  };
  qe.Lc = re;
  var te = new Hc,
    ue = function (a, b) {
      function c(a) {
        var b = M(a),
          c = ab(b, "protocol"),
          d = ab(b, "host", !0),
          e = ab(b, "port"),
          f = ab(b, "path").toLowerCase().replace(/\/$/, "");
        if (void 0 === c || "http" == c && "80" == e || "https" == c && "443" == e)
          c = "web",
          e = "default";
        return [c, d, e, f]
      }
      for (var d = c(String(a)), e = c(String(b)), f = 0; f < d.length; f++)
        if (d[f] !== e[f])
          return !1;
      return !0
    };

  function ve(a) {
    var b = a.arg0,
      c = a.arg1;
    switch (a["function"]) {
      case "_cn":
        return 0 <= String(b).indexOf(String(c));
      case "_css":
        var d;
        a: {
          if (b) {
            var e = ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"];
            try {
              for (var f = 0; f < e.length; f++)
                if (b[e[f]]) {
                  d = b[e[f]](c);
                  break a
                }
            } catch (u) {}
          }
          d = !1
        }
        return d;
      case "_ew":
        var h, k;
        h = String(b);
        k = String(c);
        var l = h.length - k.length;
        return 0 <= l && h.indexOf(k, l) == l;
      case "_eq":
        return String(b) == String(c);
      case "_ge":
        return Number(b) >= Number(c);
      case "_gt":
        return Number(b) > Number(c);
      case "_lc":
        var m;
        m = String(b).split(",");
        return 0 <= qa(m, String(c));
      case "_le":
        return Number(b) <= Number(c);
      case "_lt":
        return Number(b) < Number(c);
      case "_re":
        var n;
        var p = a.ignore_case ? "i" : void 0;
        try {
          var q = String(c) + p,
            r = te.get(q);
          r || (r = new RegExp(c, p),
            te.set(q, r));
          n = r.test(b)
        } catch (u) {
          n = !1
        }
        return n;
      case "_sw":
        return 0 == String(b).indexOf(String(c));
      case "_um":
        return ue(b, c)
    }
    return !1
  };

  function we(a, b, c, d) {
    return (d || "https:" == A.location.protocol ? a : b) + c
  }

  function xe(a, b) {
    for (var c = b || (a instanceof v ? new v : new ta), d = a.T(), e = 0; e < d.length(); e++) {
      var f = d.get(e);
      if (a.has(f)) {
        var h = a.get(f);
        h instanceof v ? (c.get(f) instanceof v || c.set(f, new v),
          xe(h, c.get(f))) : h instanceof ta ? (c.get(f) instanceof ta || c.set(f, new ta),
          xe(h, c.get(f))) : c.set(f, h)
      }
    }
    return c
  }

  function ye() {
    return rc.o
  }

  function ze() {
    return (new Date).getTime()
  }

  function Ae(a, b) {
    return Ba(Oc(a, b || 2))
  }

  function Be() {
    return tc
  }

  function Ce(a) {
    return Wa('<a href="' + a + '"></a>')[0].href
  }

  function De(a) {
    return Cc(Aa(a))
  }

  function Ee(a) {
    return null === a ? "null" : void 0 === a ? "undefined" : a.toString()
  }

  function Fe(a, b) {
    return Gc(a, b)
  }

  function Ge(a, b, c) {
    if (!(a instanceof v))
      return null;
    for (var d = new ta, e = !1, f = 0; f < a.length(); f++) {
      var h = a.get(f);
      h instanceof ta && h.has(b) && h.has(c) && (d.set(h.get(b), h.get(c)),
        e = !0)
    }
    return e ? d : null
  }
  var He = function () {
      var a = new La;
      a.addAll(cb());
      a.addAll({
        buildSafeUrl: we,
        decodeHtmlUrl: Ce,
        copy: xe,
        generateUniqueNumber: Ic,
        getContainerId: ye,
        getCurrentTime: ze,
        getDataLayerValue: Ae,
        getEventName: Be,
        makeInteger: De,
        makeString: Ee,
        randomInteger: Fe,
        tableToMap: Ge
      });
      return function (b) {
        return a.get(b)
      }
    },
    Je = function () {
      var a = {
          callInWindow: xb,
          encodeURI: xb,
          encodeURIComponent: xb,
          getCurrentUrl: xb,
          getInWindow: xb,
          getReferrer: xb,
          getUrlComponent: xb,
          getUrlFragment: xb,
          isPlainObject: xb,
          loadIframe: xb,
          loadJavaScript: yb,
          removeUrlFragment: xb,
          replaceAll: xb,
          sendTrackingBeacon: xb,
          setInWindow: xb
        },
        b = {
          buildSafeUrl: Ie,
          decodeHtmlUrl: Ie,
          copy: Ie,
          generateUniqueNumber: Ie,
          getContainerId: Ie,
          getCurrentTime: Ie,
          getDataLayerValue: Ie,
          getEventName: Ie,
          makeInteger: Ie,
          makeString: Ie,
          randomInteger: Ie,
          tableToMap: Ie
        },
        c = {},
        d;
      for (d in a)
        a.hasOwnProperty(d) && (c[d] = a[d]);
      for (var e in b)
        if (b.hasOwnProperty(e)) {
          if (c[e])
            throw Error("Overriding an existing permission generator is forbidden: " + e);
          c[e] = b[e]
        }
      return function (a, b) {
        return c[a] ? c[a](b) : function () {
          return !0
        }
      }
    };

  function Ie() {
    return function () {
      return !0
    }
  };
  var Ke, Le = function () {
    var a = data.runtime || [],
      b = data.permissions || {};
    Ke = new eb;
    Xb = function (a, b) {
      var c = new ta,
        d;
      for (d in b)
        b.hasOwnProperty(d) && c.set(d, Ba(b[d]));
      var e = Ke.R([a, c]);
      e instanceof g && "return" === e.A && (e = e.getData());
      return Aa(e)
    };
    dc = ve;
    db(Ke, He());
    for (var c = 0; c < a.length; c++) {
      var d = a[c];
      if (!pa(d) || 3 > d.length) {
        if (0 == d.length)
          continue;
        return
      }
      Ke.R(d)
    }
    var e = Je(),
      f;
    for (f in b)
      if (b.hasOwnProperty(f)) {
        var h = b[f],
          k;
        for (k in h)
          if (h.hasOwnProperty(k)) {
            var l = e(k, h[k]);
            Ke.eb(f, k, l)
          }
      }
  };
  var Me = function (a, b) {
    var c = function () {};
    c.prototype = a.prototype;
    var d = new c;
    a.apply(d, Array.prototype.slice.call(arguments, 1));
    return d
  };
  var Ne = function (a) {
      return encodeURIComponent(a)
    },
    Oe = function (a, b) {
      if (!a)
        return !1;
      var c = ab(M(a), "host");
      if (!c)
        return !1;
      for (var d = 0; b && d < b.length; d++) {
        var e = b[d] && b[d].toLowerCase();
        if (e) {
          var f = c.length - e.length;
          0 < f && "." != e.charAt(0) && (f--,
            e = "." + e);
          if (0 <= f && c.indexOf(e, f) == f)
            return !0
        }
      }
      return !1
    };
  var S = function (a, b, c) {
      for (var d = {}, e = !1, f = 0; a && f < a.length; f++)
        a[f] && a[f].hasOwnProperty(b) && a[f].hasOwnProperty(c) && (d[a[f][b]] = a[f][c],
          e = !0);
      return e ? d : null
    },
    Pe = function (a, b) {
      za(a, b)
    },
    Qe = function (a) {
      return Cc(a)
    },
    Re = function (a, b) {
      return qa(a, b)
    };
  var Se = function (a) {
      var b = {
        "gtm.element": a,
        "gtm.elementClasses": a.className,
        "gtm.elementId": a["for"] || Ta(a, "id") || "",
        "gtm.elementTarget": a.formTarget || a.target || ""
      };
      b["gtm.elementUrl"] = (a.attributes && a.attributes.formaction ? a.formAction : "") || a.action || a.href || a.src || a.code || a.codebase || "";
      return b
    },
    Te = function (a) {
      sc.hasOwnProperty("autoEventsSettings") || (sc.autoEventsSettings = {});
      var b = sc.autoEventsSettings;
      b.hasOwnProperty(a) || (b[a] = {});
      return b[a]
    },
    Ue = function (a, b, c, d) {
      var e = Te(a),
        f = Jc(e, b, d);
      e[b] = c(f)
    },
    Ve = function (a, b, c) {
      var d = Te(a);
      return Jc(d, b, c)
    };
  var We = /(^|\.)doubleclick\.net$/i,
    Xe = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    Ye = function (a, b, c) {
      for (var d = String(b || B.cookie).split(";"), e = [], f = 0; f < d.length; f++) {
        var h = d[f].split("="),
          k = Fc(h[0]);
        if (k && k == a) {
          var l = Fc(h.slice(1).join("="));
          l && !1 !== c && (l = decodeURIComponent(l));
          e.push(l)
        }
      }
      return e
    },
    Ze = function (a, b, c, d, e, f) {
      f && (b = encodeURIComponent(b));
      var h = a + "=" + b + "; ";
      c && (h += "path=" + c + "; ");
      e && (h += "expires=" + e.toGMTString() + "; ");
      var k, l;
      if ("auto" == d) {
        var m = ab(A.location, "host", !0).split(".");
        if (4 == m.length && /^[0-9]*$/.exec(m[3]))
          l = ["none"];
        else {
          for (var n = [], p = m.length - 2; 0 <= p; p--)
            n.push(m.slice(p).join("."));
          n.push("none");
          l = n
        }
      } else
        l = [d || "none"];
      k = l;
      for (var q = B.cookie, r = 0; r < k.length; r++) {
        var u = h,
          t = k[r],
          z = c;
        if (We.test(A.location.hostname) || "/" == z && Xe.test(t))
          break;
        "none" != k[r] && (u += "domain=" + k[r] + ";");
        B.cookie = u;
        if (q != B.cookie || 0 <= qa(Ye(a), b))
          break
      }
    };
  var $e = !1;
  if (B.querySelectorAll)
    try {
      var af = B.querySelectorAll(":root");
      af && 1 == af.length && af[0] == B.documentElement && ($e = !0)
    } catch (a) {}
  var bf = $e;
  var cf = function (a) {
      for (var b = [], c = document.cookie.split(";"), d = new RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$"), e = 0; e < c.length; e++) {
        var f = c[e].match(d);
        f && b.push(f[1])
      }
      return b
    },
    ff = function (a, b, c, d) {
      var e = df(a, d);
      if (1 === e.length)
        return e[0].id;
      if (0 !== e.length) {
        e = ef(e, function (a) {
          return a.xd
        }, b);
        if (1 === e.length)
          return e[0].id;
        e = ef(e, function (a) {
          return a.ee
        }, c);
        return e[0] ? e[0].id : void 0
      }
    },
    jf = function (a, b, c, d, e) {
      c = void 0 === c ? "/" : c;
      var f = d = void 0 === d ? "auto" : d,
        h = c;
      if (gf.test(document.location.hostname) || "/" === h && hf.test(f))
        return !1;
      var k = b;
      k && 1200 < k.length && (k = k.substring(0, 1200));
      b = k;
      var l = a + "=" + b + "; path=" + c + "; ";
      void 0 !== e && (l += "expires=" + (new Date((new Date).getTime() + e)).toGMTString() + "; ");
      if ("auto" === d) {
        var m = !1,
          n;
        a: {
          var p = [],
            q = document.location.hostname.split(".");
          if (4 === q.length) {
            var r = q[q.length - 1];
            if (parseInt(r, 10).toString() === r) {
              n = ["none"];
              break a
            }
          }
          for (var u = q.length - 2; 0 <= u; u--)
            p.push(q.slice(u).join("."));
          p.push("none");
          n = p
        }
        for (var t = n, z = 0; z < t.length && !m; z++)
          m = jf(a, b, c, t[z], e);
        return m
      }
      d && "none" !== d && (l += "domain=" + d + ";");
      var H = document.cookie;
      document.cookie = l;
      return H != document.cookie || 0 <= cf(a).indexOf(b)
    };

  function ef(a, b, c) {
    for (var d = [], e = [], f, h = 0; h < a.length; h++) {
      var k = a[h],
        l = b(k);
      l === c ? d.push(k) : void 0 === f || l < f ? (e = [k],
        f = l) : l === f && e.push(k)
    }
    return 0 < d.length ? d : e
  }

  function df(a, b) {
    for (var c = [], d = cf(a), e = 0; e < d.length; e++) {
      var f = d[e].split("."),
        h = f.shift();
      if (!b || -1 !== b.indexOf(h)) {
        var k = f.shift();
        k && (k = k.split("-"),
          c.push({
            id: f.join("."),
            xd: 1 * k[0] || 1,
            ee: 1 * k[1] || 1
          }))
      }
    }
    return c
  }
  var hf = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    gf = /(^|\.)doubleclick\.net$/i;
  var kf = window,
    lf = document;
  var mf = function () {
      for (var a = kf.navigator.userAgent + (lf.cookie || "") + (lf.referrer || ""), b = a.length, c = kf.history.length; 0 < c;)
        a += c-- ^ b++;
      var d = 1,
        e, f, h;
      if (a)
        for (d = 0,
          f = a.length - 1; 0 <= f; f--)
          h = a.charCodeAt(f),
          d = (d << 6 & 268435455) + h + (h << 14),
          e = d & 266338304,
          d = 0 != e ? d ^ e >> 21 : d;
      return [Math.round(2147483647 * Math.random()) ^ d & 2147483647, Math.round(Date.now() / 1E3)].join(".")
    },
    pf = function (a, b, c, d) {
      var e = nf(b);
      return ff(a, e, of (c), d)
    };

  function nf(a) {
    if (!a)
      return 1;
    a = 0 === a.indexOf(".") ? a.substr(1) : a;
    return a.split(".").length
  }

  function of (a) {
    if (!a || "/" === a)
      return 1;
    "/" !== a[0] && (a = "/" + a);
    "/" !== a[a.length - 1] && (a += "/");
    return a.split("/").length - 1
  }

  function qf(a, b) {
    var c = "" + nf(a),
      d = of (b);
    1 < d && (c += "-" + d);
    return c
  };
  var rf = ["1"],
    sf = {},
    vf = function (a, b, c) {
      b = void 0 === b ? "auto" : b;
      c = void 0 === c ? "/" : c;
      var d = tf(void 0 === a ? "_gcl" : a);
      if (!sf[d] && !uf(d, b, c)) {
        var e, f = mf();
        e = ["1", qf(void 0, void 0), f].join(".");
        jf(d, e, c, b, 7776E6);
        uf(d, b, c)
      }
    };

  function uf(a, b, c) {
    var d = pf(a, b, c, rf);
    d && (sf[a] = d);
    return d
  }

  function tf(a) {
    return (void 0 === a ? "_gcl" : a) + "_au"
  };
  var wf = function (a) {
    for (var b = [], c = B.cookie.split(";"), d = new RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$"), e = 0; e < c.length; e++) {
      var f = c[e].match(d);
      f && b.push(f[1])
    }
    var h = [];
    if (!b || 0 == b.length)
      return h;
    for (var k = 0; k < b.length; k++) {
      var l = b[k].split(".");
      3 == l.length && "GCL" == l[0] && l[1] && h.push(l[2])
    }
    return h
  };
  var xf = /^\w+$/,
    yf = /^[\w-]+$/,
    zf = /^\d+\.fls\.doubleclick\.net$/;

  function Af(a) {
    return a && "string" == typeof a && a.match(xf) ? a : "_gcl"
  }

  function Bf(a) {
    if (a) {
      if ("string" == typeof a) {
        var b = Af(a);
        return {
          va: b,
          sa: b,
          ya: b
        }
      }
      if (a && "object" == typeof a)
        return {
          va: Af(a.dc),
          sa: Af(a.aw),
          ya: Af(a.gf)
        }
    }
    return {
      va: "_gcl",
      sa: "_gcl",
      ya: "_gcl"
    }
  }

  function Cf(a) {
    var b = M(A.location.href),
      c = ab(b, "host", !1);
    if (c && c.match(zf)) {
      var d = ab(b, "path").split(a + "=");
      if (1 < d.length)
        return d[1].split(";")[0].split("?")[0]
    }
  }

  function Df(a) {
    return a.filter(function (a) {
      return yf.test(a)
    })
  }
  var Ff = function (a) {
      var b = Cf("gclaw");
      if (b)
        return b.split(".");
      var c = Bf(a);
      if ("_gcl" == c.sa) {
        var d = Ef();
        if (d && (null == d.I || "aw.ds" == d.I))
          return [d.Y]
      }
      return Df(wf(c.sa + "_aw"))
    },
    Gf = function (a) {
      var b = Cf("gcldc");
      if (b)
        return b.split(".");
      var c = Bf(a);
      if ("_gcl" == c.va) {
        var d = Ef();
        if (d && ("ds" == d.I || "aw.ds" == d.I))
          return [d.Y]
      }
      return Df(wf(c.va + "_dc"))
    };

  function Ef() {
    var a = M(A.location.href),
      b = ab(a, "query", !1, void 0, "gclid"),
      c = ab(a, "query", !1, void 0, "gclsrc");
    if (!b || !c) {
      var d = ab(a, "fragment");
      b = b || $a(d, "gclid");
      c = c || $a(d, "gclsrc")
    }
    return void 0 !== b && b.match(yf) ? {
      Y: b,
      I: c
    } : null
  }
  var Hf = function () {
      var a = Cf("gac");
      if (a)
        return decodeURIComponent(a);
      for (var b = [], c = B.cookie.split(";"), d = /^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/, e = 0; e < c.length; e++) {
        var f = c[e].match(d);
        f && b.push({
          Bb: f[1],
          value: f[2]
        })
      }
      var h = {};
      if (b && b.length)
        for (var k = 0; k < b.length; k++) {
          var l = b[k].value.split(".");
          "1" == l[0] && 3 == l.length && l[1] && (h[b[k].Bb] || (h[b[k].Bb] = []),
            h[b[k].Bb].push({
              timestamp: l[1],
              Y: l[2]
            }))
        }
      var m = [],
        n;
      for (n in h)
        if (h.hasOwnProperty(n)) {
          for (var p = [], q = h[n], r = 0; r < q.length; r++)
            p.push(q[r].Y);
          p = Df(p);
          p.length && m.push(n + ":" + p.join(","))
        }
      return m.join(";")
    },
    If = function (a, b, c) {};
  var Jf;
  a: {
    Jf = "g";
    break a;
    Jf = "G"
  }
  var Kf = {
      "": "n",
      UA: "u",
      AW: "a",
      DC: "d",
      G: "e",
      GTM: Jf
    },
    Lf = function (a) {
      var b = rc.o.split("-"),
        c = b[0].toUpperCase();
      return (Kf[c] || "i") + "8o" + (a && "GTM" === c ? b[1] : "")
    };
  var Mf = function (a) {
      return !(void 0 === a || null === a || 0 === (a + "").length)
    },
    Nf = function (a, b) {
      var c;
      if (2 === b.F)
        return a("ord", Gc(1E11, 1E13)),
          !0;
      if (3 === b.F)
        return a("ord", "1"),
          a("num", Gc(1E11, 1E13)),
          !0;
      if (4 === b.F)
        return Mf(b.sessionId) && a("ord", b.sessionId),
          !0;
      if (5 === b.F)
        c = "1";
      else if (6 === b.F)
        c = b.Bc;
      else
        return !1;
      Mf(c) && a("qty", c);
      Mf(b.gb) && a("cost", b.gb);
      Mf(b.Cb) && a("ord", b.Cb);
      return !0
    },
    Of = encodeURIComponent,
    Pf = function (a, b) {
      function c(a, b, c) {
        f.hasOwnProperty(a) || (b += "",
          e += ";" + a + "=" + (c ? b : Of(b)))
      }
      var d = a.ib,
        e = a.protocol;
      e += a.Wa ? "//" + d + ".fls.doubleclick.net/activityi" : "//ad.doubleclick.net/activity";
      e += ";src=" + Of(d) + (";type=" + Of(a.jb)) + (";cat=" + Of(a.ra));
      var f = a.rd || {},
        h;
      for (h in f)
        f.hasOwnProperty(h) && (e += ";" + Of(h) + "=" + Of(f[h] + ""));
      if (Nf(c, a)) {
        Mf(a.Eb) && c("u", a.Eb);
        Mf(a.tran) && c("tran", a.tran);
        c("gtm", Lf());
        !1 === a.Tc && c("npa", "1");
        if (a.fb) {
          var k = Gf(a.fa);
          k && k.length && c("gcldc", k.join("."));
          var l = Ff(a.fa);
          l && l.length && c("gclaw", l.join("."));
          var m = Hf();
          m && c("gac", m);
        }
        Mf(a.tb) && c("prd", a.tb, !0);
        for (var p in a.Fa)
          a.Fa.hasOwnProperty(p) && c(p, a.Fa[p]);
        e += b || "";
        Mf(a.Sa) && c("~oref", a.Sa);
        a.Wa ? Pa(e + "?", a.U) : Qa(e + "?", a.U, a.ka)
      } else
        G(a.ka)
    };
  var Sf = !!A.MutationObserver,
    Tf = void 0,
    Uf = function (a) {
      if (!Tf) {
        var b = function () {
          var a = B.body;
          if (a)
            if (Sf)
              (new MutationObserver(function () {
                for (var a = 0; a < Tf.length; a++)
                  G(Tf[a])
              })).observe(a, {
                childList: !0,
                subtree: !0
              });
            else {
              var b = !1;
              Ra(a, "DOMNodeInserted", function () {
                b || (b = !0,
                  G(function () {
                    b = !1;
                    for (var a = 0; a < Tf.length; a++)
                      G(Tf[a])
                  }))
              })
            }
        };
        Tf = [];
        B.body ? b() : G(b)
      }
      Tf.push(a)
    };
  var fg = "www.googletagmanager.com/gtm.js";
  fg = "www.googletagmanager.com/gtag/js";
  var gg = fg,
    hg = function (a, b, c, d) {
      Ra(a, b, c, d)
    },
    ig = function (a, b) {
      return A.setTimeout(a, b)
    },
    jg = function (a, b, c) {
      D(a, b, c)
    },
    kg = function () {
      return A.location.href
    },
    lg = function (a) {
      return ab(M(a), "fragment")
    },
    mg = function (a, b, c, d, e) {
      return ab(a, b, c, d, e)
    },
    T = function (a, b) {
      return Oc(a, b || 2)
    },
    ng = function (a, b, c) {
      b && (a.eventCallback = b,
        c && (a.eventTimeout = c));
      return A["dataLayer"].push(a)
    },
    og = function (a, b) {
      A[a] = b
    },
    U = function (a, b, c) {
      b && (void 0 === A[a] || c && !A[a]) && (A[a] = b);
      return A[a]
    },
    pg = function (a, b, c) {
      var d = b,
        e = c,
        f = Bf(a);
      e = e || "auto";
      d = d || "/";
      var h = Ef();
      if (null != h) {
        var k = (new Date).getTime(),
          l = new Date(k + 7776E6),
          m = ["GCL", Math.round(k / 1E3), h.Y].join(".");
        h.I && "aw.ds" != h.I || Ze(f.sa + "_aw", m, d, e, l, !0);
        "aw.ds" != h.I && "ds" != h.I || Ze(f.va + "_dc", m, d, e, l, !0);
        "gf" == h.I && Ze(f.ya + "_gf", m, d, e, l, !0)
      }
    },
    qg = function (a, b) {
      var c;
      a: {
        var d;
        d = 100;
        for (var e = {}, f = 0; f < b.length; f++)
          e[b[f]] = !0;
        for (var h = a, k = 0; h && k <= d; k++) {
          if (e[String(h.tagName).toLowerCase()]) {
            c = h;
            break a
          }
          h = h.parentElement
        }
        c = null
      }
      return c
    },
    V = function (a, b, c, d) {
      var e = !d && "http:" == A.location.protocol;
      e && (e = 2 !== rg());
      return (e ? b : a) + c
    };
  var sg = function (a) {
      var b = 0;
      return b
    },
    tg = function (a) {},
    ug = function (a) {
      var b = !1;
      return b
    },
    vg = function (a, b) {
      var c;
      a: {
        if (a && pa(a))
          for (var d = 0; d < a.length; d++)
            if (a[d] && b(a[d])) {
              c = a[d];
              break a
            }
        c = void 0
      }
      return c
    },
    wg = function (a, b, c, d) {
      Ue(a, b, c, d)
    },
    xg = function (a, b, c) {
      return Ve(a, b, c)
    },
    yg = function (a) {
      return !!Ve(a, "init", !1)
    },
    zg = function (a) {
      Te(a).init = !0
    };
  var rg = function () {
    var a = gg;
    if (xc) {
      if (0 === xc.toLowerCase().indexOf("https://"))
        return 2;
      if (0 === xc.toLowerCase().indexOf("http://"))
        return 3
    }
    a = a.toLowerCase();
    for (var b = "https://" + a, c = "http://" + a, d = 1, e = B.getElementsByTagName("script"), f = 0; f < e.length && 100 > f; f++) {
      var h = e[f].src;
      if (h) {
        h = h.toLowerCase();
        if (0 === h.indexOf(c))
          return 3;
        1 === d && 0 === h.indexOf(b) && (d = 2)
      }
    }
    return d
  };
  var Bg = function (a, b) {
    return Qc(a, b, void 0)
  };
  var Cg = function (a, b, c) {
    var d = (void 0 === c ? 0 : c) ? "www.googletagmanager.com/gtag/js" : gg;
    d += "?id=" + encodeURIComponent(a) + "&l=dataLayer";
    if (b)
      for (var e in b)
        b[e] && b.hasOwnProperty(e) && (d += "&" + e + "=" + encodeURIComponent(b[e]));
    var f = V("https://", "http://", d);
    D(f, void 0, void 0)
  };
  var Eg = function (a, b, c) {
    a instanceof qe.Lc && (a = a.resolve(qe.qe(b, c)),
      b = yc);
    return {
      kb: a,
      U: b
    }
  };
  var Fg = function (a, b, c) {
      this.n = a;
      this.t = b;
      this.p = c
    },
    Gg = function () {
      this.c = 1;
      this.e = [];
      this.p = null
    };

  function Hg(a) {
    var b = sc,
      c = b.gss = b.gss || {};
    return c[a] = c[a] || new Gg
  }
  var Ig = function (a, b) {
      Hg(a).p = b
    },
    Jg = function (a, b, c) {
      var d = Math.floor((new Date).getTime() / 1E3);
      Hg(a).e.push(new Fg(b, d, c))
    },
    Kg = function (a) {};
  var Vg = window,
    Wg = document,
    Xg = function (a) {
      var b = Vg._gaUserPrefs;
      if (b && b.ioo && b.ioo() || a && !0 === Vg["ga-disable-" + a])
        return !0;
      try {
        var c = Vg.external;
        if (c && c._gaUserPrefs && "oo" == c._gaUserPrefs)
          return !0
      } catch (m) {}
      for (var d = [], e = Wg.cookie.split(";"), f = /^\s*AMP_TOKEN=\s*(.*?)\s*$/, h = 0; h < e.length; h++) {
        var k = e[h].match(f);
        k && d.push(k[1])
      }
      for (var l = 0; l < d.length; l++)
        if ("$OPT_OUT" == decodeURIComponent(d[l]))
          return !0;
      return !1
    };
  var bh = function (a) {
      if (1 === Hg(a).c) {
        Hg(a).c = 2;
        var b = encodeURIComponent(a);
        D(("http:" != A.location.protocol ? "https:" : "http:") + ("//www.googletagmanager.com/gtag/js?id=" + b + "&l=dataLayer&cx=c"))
      }
    },
    ch = function (a, b) {};
  var Z = {
    a: {}
  };
  Z.a.e = ["google"],
    function () {
      (function (a) {
        Z.__e = a;
        Z.__e.b = "e";
        Z.__e.g = !0
      })(function () {
        return tc
      })
    }();
  Z.a.v = ["google"],
    function () {
      (function (a) {
        Z.__v = a;
        Z.__v.b = "v";
        Z.__v.g = !0
      })(function (a) {
        var b = a.vtp_name;
        if (!b || !b.replace)
          return !1;
        var c = T(b.replace(/\\\./g, "."), a.vtp_dataLayerVersion || 1);
        return void 0 !== c ? c : a.vtp_defaultValue
      })
    }();

  Z.a.gtagaw = ["google"],
    function () {
      var a = !1,
        b = !1,
        c = [],
        d = "send_to aw_remarketing aw_remarketing_only custom_params send_page_view language value currency transaction_id user_id conversion_linker conversion_cookie_prefix page_location page_referrer phone_conversion_number phone_conversion_callback phone_conversion_css_class items aw_merchant_id aw_feed_country aw_feed_language discount disable_merchant_reported_purchases allow_ad_personalization_signals".split(" "),
        e = function (a) {
          var b = U("google_trackConversion"),
            c = a.gtm_onFailure;
          "function" == typeof b ? b(a) || c() : c()
        },
        f = function () {
          for (; 0 < c.length;)
            e(c.shift())
        },
        h = function () {
          a || (a = !0,
            jg(V("https://", "http://", "www.googleadservices.com/pagead/conversion_async.js"), function () {
              f();
              c = {
                push: e
              }
            }, function () {
              f();
              a = !1
            }))
        },
        k = function (a, c, d, e) {
          if (c) {
            var f = a.ia[0],
              h = a.ia[1],
              k = U("_googWcmImpl", function () {
                k.q = k.q || [];
                k.q.push(arguments)
              });
            U("_googWcmAk", f);
            b || (b = !0,
              jg(V("https://", "http://", "www.gstatic.com/wcm/loader.js")));
            var l = {
              ak: f,
              cl: h
            };
            void 0 === d && (l.autoreplace = c);
            k(2, d, l, c, e, new Date, e)
          }
        },
        l = function (a) {
          if (a) {
            for (var b = [], c = 0; c < a.length; ++c) {
              var d = a[c];
              d && b.push({
                item_id: d.id,
                quantity: d.quantity,
                value: d.price,
                start_date: d.start_date,
                end_date: d.end_date
              })
            }
            return b
          }
        },
        m = function (a) {
          var b = a.vtp_conversionId,
            e = tc,
            f = "gtag.config" == e,
            m = b.ia[0],
            n = b.ia[1],
            z = void 0 !== n,
            H = b.containerId,
            E = z ? b.id : void 0,
            C = function (a) {
              return Qc(a, H, E)
            },
            P = !1 !== C("conversion_linker"),
            F = C("conversion_cookie_prefix");
          f && P && pg(F);
          if (f && z) {
            var K = C("phone_conversion_number"),
              I = C("phone_conversion_callback"),
              L = C("phone_conversion_css_class"),
              N = C("phone_conversion_options");
            k(b, K, I || L, N)
          }
          var ia = !1 === C("aw_remarketing") || !1 === C("send_page_view");
          if (!f || !z && !ia)
            if (!0 === C("aw_remarketing_only") && (z = !1),
              !1 !== C("allow_ad_personalization_signals") || z) {
              var J = {
                google_conversion_id: m,
                google_remarketing_only: !z,
                onload_callback: a.vtp_gtmOnSuccess,
                gtm_onFailure: a.vtp_gtmOnFailure,
                google_conversion_format: "3",
                google_conversion_color: "ffffff",
                google_conversion_domain: "",
                google_conversion_label: n,
                google_conversion_language: C("language"),
                google_conversion_value: C("value"),
                google_conversion_currency: C("currency"),
                google_conversion_order_id: C("transaction_id"),
                google_user_id: C("user_id"),
                google_conversion_page_url: C("page_location"),
                google_conversion_referrer_url: C("page_referrer"),
                google_gtm: Lf(void 0)
              };
              !1 === C("allow_ad_personalization_signals") && (J.google_allow_ad_personalization_signals = !1);
              J.google_read_gcl_cookie_opt_out = !P;
              P && F && (ya(F) ? J.google_gcl_cookie_prefix = F.aw : J.google_gcl_cookie_prefix = F);
              var ba = function () {
                var a = C("custom_params"),
                  b = {
                    event: e
                  };
                if (pa(a)) {
                  for (var c = 0; c < a.length; ++c) {
                    var f = a[c],
                      h = C(f);
                    void 0 !== h && (b[f] = h)
                  }
                  return b
                }
                var k = C("eventModel");
                if (!k)
                  return null;
                za(k, b);
                for (var l = 0; l < d.length; ++l)
                  delete b[d[l]];
                return b
              }();
              ba && (J.google_custom_params = ba);
              !z && C("items") && (J.google_gtag_event_data = {
                items: C("items"),
                value: C("value")
              });
              if (z && "purchase" == e) {
                C("aw_merchant_id") && (J.google_conversion_merchant_id = C("aw_merchant_id"),
                  J.google_basket_feed_country = C("aw_feed_country"),
                  J.google_basket_feed_language = C("aw_feed_language"),
                  J.google_basket_discount = C("discount"),
                  J.google_basket_transaction_type = e,
                  J.google_disable_merchant_reported_conversions = !0 === C("disable_merchant_reported_purchases"));
                var X = l(C("items"));
                X && (J.google_conversion_items = X)
              }
              c.push(J)
            }
          h()
        };
      Z.__gtagaw = m;
      Z.__gtagaw.b = "gtagaw";
      Z.__gtagaw.g = !0
    }();

  Z.a.get = ["google"],
    function () {
      (function (a) {
        Z.__get = a;
        Z.__get.b = "get";
        Z.__get.g = !0
      })(function (a) {
        if (a.vtp_isAutoTag) {
          for (var b = String(a.vtp_trackingId), c = tc || "", d = {}, e = 0; e < Rd.length; e++) {
            var f = Bg(Rd[e], b);
            void 0 !== f && (d[Rd[e]] = f)
          }
          var h = Bg("custom_params", b);
          if (pa(h))
            for (var k = 0; k < h.length; k++) {
              var l = h[k],
                m = Bg(l, b);
              void 0 !== m && (d[l] = m)
            }
          else {
            var n = T("eventModel");
            za(n, d)
          }
          var p = za(d, void 0);
          bh(b);
          Jg(b, c, p);
          Kg(b)
        } else {
          var q = a.vtp_settings,
            r = q.eventParameters,
            u = q.userProperties,
            t = S(a.vtp_eventParameters, "name", "value");
          za(t, r);
          var z = S(a.vtp_userProperties, "name", "value");
          za(z, u);
          r.user_properties = u;
          var H = String(q.streamId),
            E = String(a.vtp_eventName);
          bh(H);
          Jg(H, E, r);
          Kg(H)
        }
        a.vtp_gtmOnSuccess()
      })
    }();

  Z.a.gtagfl = [],
    function () {
      function a(a) {
        var b = /^DC-(\d+)(\/([\w-]+)\/([\w-]+)\+(\w+))?$/.exec(a);
        if (b) {
          var c = {
            standard: 2,
            unique: 3,
            per_session: 4,
            transactions: 5,
            items_sold: 6,
            "": 1
          } [(b[5] || "").toLowerCase()];
          if (c)
            return {
              containerId: "DC-" + b[1],
              Fc: b[3] ? a : "",
              Oc: b[1],
              Nc: b[3] || "",
              ra: b[4] || "",
              F: c
            }
        }
      }

      function b(a, b) {
        function c(b, c, e) {
          void 0 !== e && 0 !== (e + "").length && d.push(b + c + ":" + a(e + ""))
        }
        var d = [],
          e = b("items") || [];
        if (pa(e))
          for (var l = 0; l < e.length; l++) {
            var m = e[l],
              n = l + 1;
            c("i", n, m.id);
            c("p", n, m.price);
            c("q", n, m.quantity);
            c("c", n, b("country"));
            c("l", n, b("language"))
          }
        return d.join("|")
      }

      function c(a, b, c) {
        var d = /^u([1-9]\d?|100)$/,
          e = a("custom_map") || {},
          f = Tc(b, c),
          m = {},
          n = {};
        if (ya(e))
          for (var p in e)
            if (e.hasOwnProperty(p) && d.test(p)) {
              var q = e[p];
              Ac(q) && (m[p] = q)
            }
        for (var r = 0; r < f.length; r++) {
          var u = f[r];
          d.test(u) && (m[u] = u)
        }
        for (var t in m)
          m.hasOwnProperty(t) && (n[t] = a(m[t]));
        return n
      }
      (function (a) {
        Z.__gtagfl = a;
        Z.__gtagfl.b = "gtagfl";
        Z.__gtagfl.g = !0
      })(function (d) {
        var e = d.vtp_gtmOnSuccess,
          f = d.vtp_gtmOnFailure,
          h = a(d.vtp_targetId);
        if (h) {
          var k = function (a) {
              return Qc(a, h.containerId, h.Fc || void 0)
            },
            l = !1 !== k("conversion_linker"),
            m = k("conversion_cookie_prefix");
          if ("gtag.config" === tc)
            l && (pg(m),
              If(m, void 0, void 0)),
            G(e);
          else {
            var n = {},
              p = k("dc_custom_params");
            if (ya(p))
              for (var q in p)
                if (p.hasOwnProperty(q)) {
                  var r = p[q];
                  void 0 !== r && null !== r && (n[q] = r)
                }
            var u = "";
            if (5 === h.F || 6 === h.F)
              u = b(Ne, k);
            var t = c(k, h.containerId, h.Fc),
              z = 3 === rg(),
              H = !0 === k("allow_custom_scripts"),
              E = {
                ra: h.ra,
                fb: l,
                fa: m,
                gb: k("value"),
                F: h.F,
                rd: n,
                ib: h.Oc,
                jb: h.Nc,
                ka: f,
                U: e,
                Sa: bb(M(kg())),
                tb: u,
                protocol: z ? "http:" : "https:",
                Bc: k("quantity"),
                Wa: H,
                sessionId: k("session_id"),
                Cb: k("transaction_id"),
                Fa: t,
                Tc: !1 !== k("allow_ad_personalization_signals")
              };
            Pf(E, void 0)
          }
        } else
          G(f)
      })
    }();

  Z.a.gtagua = ["google"],
    function () {
      var a, b = {
          client_id: 1,
          client_storage: "storage",
          cookie_name: 1,
          cookie_domain: 1,
          cookie_expires: 1,
          cookie_path: 1,
          cookie_update: 1,
          sample_rate: 1,
          site_speed_sample_rate: 1,
          use_amp_client_id: 1,
          store_gac: 1,
          conversion_linker: "storeGac"
        },
        c = {
          anonymize_ip: 1,
          app_id: 1,
          app_installer_id: 1,
          app_name: 1,
          app_version: 1,
          campaign: {
            name: "campaignName",
            source: "campaignSource",
            medium: "campaignMedium",
            term: "campaignTerm",
            content: "campaignContent",
            id: "campaignId"
          },
          currency: "currencyCode",
          description: "exDescription",
          fatal: "exFatal",
          language: 1,
          non_interaction: 1,
          page_hostname: "hostname",
          page_referrer: "referrer",
          page_path: "page",
          page_location: "location",
          page_title: "title",
          screen_name: 1,
          transport_type: "transport",
          user_id: 1
        },
        d = {
          content_id: 1,
          event_category: 1,
          event_action: 1,
          event_label: 1,
          link_attribution: 1,
          linker: 1,
          method: 1,
          name: 1,
          send_page_view: 1,
          value: 1
        },
        e = {
          cookie_name: 1,
          cookie_expires: "duration",
          levels: 1
        },
        f = {
          anonymize_ip: 1,
          fatal: 1,
          non_interaction: 1,
          use_amp_client_id: 1,
          send_page_view: 1,
          store_gac: 1,
          conversion_linker: 1
        },
        h = function (a, b, c, d) {
          if (void 0 !== c)
            if (f[b] && (c = Dc(c)),
              "anonymize_ip" != b || c || (c = void 0),
              1 === a)
              d[k(b)] = c;
            else if (Ac(a))
            d[a] = c;
          else
            for (var e in a)
              a.hasOwnProperty(e) && void 0 !== c[e] && (d[a[e]] = c[e])
        },
        k = function (a) {
          return a && Ac(a) ? a.replace(/(_[a-z])/g, function (a) {
            return a[1].toUpperCase()
          }) : a
        },
        l = function (a, b, c) {
          a.hasOwnProperty(b) || (a[b] = c)
        },
        m = function (a, e, f) {
          var k = {},
            m = {},
            n = {},
            p;
          var q = Bg("experiments", a);
          if (pa(q)) {
            for (var t = [], r = 0; r < q.length; r++) {
              var u = q[r];
              if (void 0 != u) {
                var z = u.id,
                  ia = u.variant;
                void 0 != z && void 0 != ia && t.push(String(z) + "." + String(ia))
              }
            }
            p = 0 < t.length ? t.join("!") : void 0
          } else
            p = void 0;
          p && l(m, "exp", p);
          var J = Bg("custom_map", a);
          if (ya(J))
            for (var ba in J)
              if (J.hasOwnProperty(ba) && /^(dimension|metric)\d+$/.test(ba)) {
                var X = Bg(J[ba], a);
                void 0 !== X && l(m, ba, X)
              }
          for (var Y = Tc(a, void 0), Q = 0; Q < Y.length; ++Q) {
            var R = Y[Q],
              ea = Bg(R, a);
            d.hasOwnProperty(R) ? h(d[R], R, ea, k) : c.hasOwnProperty(R) ? h(c[R], R, ea, m) : b.hasOwnProperty(R) ? h(b[R], R, ea, n) : /^(dimension|metric|content_group)\d+$/.test(R) && h(1, R, ea, m)
          }
          var W = String(tc);
          l(n, "cookieDomain", "auto");
          l(m, "forceSSL", !0);
          var ua = "general";
          0 <= Re("add_payment_info add_to_cart add_to_wishlist begin_checkout checkout_progress purchase refund remove_from_cart set_checkout_option".split(" "), W) ? ua = "ecommerce" : 0 <= Re("generate_lead login search select_content share sign_up view_item view_item_list view_promotion view_search_results".split(" "), W) ? ua = "engagement" : "exception" == W && (ua = "error");
          l(k, "eventCategory", ua);
          0 <= Re(["view_item", "view_item_list", "view_promotion", "view_search_results"], W) && l(m, "nonInteraction", !0);
          "login" == W || "sign_up" == W || "share" == W ? l(k, "eventLabel", Bg("method", a)) : "search" == W || "view_search_results" == W ? l(k, "eventLabel", Bg("search_term", a)) : "select_content" == W && l(k, "eventLabel", Bg("content_type", a));
          var Ja = k.linker || {};
          if (Ja.accept_incoming || 0 != Ja.accept_incoming && Ja.domains)
            n.allowLinker = !0;
          if (!1 === Bg("allow_display_features", a) || !1 === Bg("allow_ad_personalization_signals", a))
            m.allowAdFeatures = !1;
          n.name = e;
          m["&gtm"] = Lf(!0);
          m.hitCallback = f;
          k.S = m;
          k.Zb = n;
          return k
        },
        n = function (a) {
          function b(a) {
            var b = za(a, void 0);
            b.list = a.list_name;
            b.listPosition = a.list_position;
            b.position = a.list_position || a.creative_slot;
            b.creative = a.creative_name;
            return b
          }

          function c(a) {
            for (var c = [], d = 0; a && d < a.length; d++)
              a[d] && c.push(b(a[d]));
            return c.length ? c : void 0
          }

          function d(a) {
            return {
              id: e("transaction_id"),
              affiliation: e("affiliation"),
              revenue: e("value"),
              tax: e("tax"),
              shipping: e("shipping"),
              coupon: e("coupon"),
              list: e("list_name") || a
            }
          }
          for (var e = function (b) {
              return Qc(b, a, void 0)
            }, f = e("items"), h, k = 0; f && k < f.length && !(h = f[k].list_name); k++)
          ;
          var m = e("custom_map");
          if (ya(m))
            for (k = 0; f && k < f.length; ++k) {
              var n = f[k],
                p;
              for (p in m)
                m.hasOwnProperty(p) && /^(dimension|metric)\d+$/.test(p) && l(n, p, n[m[p]])
            }
          var q = null,
            r = tc,
            u = e("promotions");
          "purchase" == r || "refund" == r ? q = {
            action: r,
            qa: d(),
            la: c(f)
          } : "add_to_cart" == r ? q = {
            action: "add",
            la: c(f)
          } : "remove_from_cart" == r ? q = {
            action: "remove",
            la: c(f)
          } : "view_item" == r ? q = {
            action: "detail",
            qa: d(h),
            la: c(f)
          } : "view_item_list" == r ? q = {
            action: "impressions",
            Nd: c(f)
          } : "view_promotion" == r ? q = {
            action: "promo_view",
            ub: c(u)
          } : "select_content" == r && u && 0 < u.length ? q = {
            action: "promo_click",
            ub: c(u)
          } : "select_content" == r ? q = {
            action: "click",
            qa: {
              list: e("list_name") || h
            },
            la: c(f)
          } : "begin_checkout" == r || "checkout_progress" == r ? q = {
            action: "checkout",
            la: c(f),
            qa: {
              step: "begin_checkout" == r ? 1 : e("checkout_step"),
              option: e("checkout_option")
            }
          } : "set_checkout_option" == r && (q = {
            action: "checkout_option",
            qa: {
              step: e("checkout_step"),
              option: e("checkout_option")
            }
          });
          q && (q.Qe = e("currency"));
          return q
        },
        p = {},
        q = function (a, b) {
          var c = p[a];
          p[a] = za(b, void 0);
          if (!c)
            return !1;
          for (var d in b)
            if (b.hasOwnProperty(d) && b[d] !== c[d])
              return !0;
          for (d in c)
            if (c.hasOwnProperty(d) && c[d] !== b[d])
              return !0;
          return !1
        },
        r = function (b) {
          var c = b.vtp_trackingId,
            d = md(void 0),
            f = "gtag_" + c.split("-").join("_"),
            p = function (a) {
              var b = [].slice.call(arguments, 0);
              b[0] = f + "." + b[0];
              d.apply(window, b)
            },
            r = function () {
              var a = function (a, b) {
                  for (var c = 0; b && c < b.length; c++)
                    p(a, b[c])
                },
                b = n(c);
              if (b) {
                var d = b.action;
                if ("impressions" == d)
                  a("ec:addImpression", b.Nd);
                else if ("promo_click" == d || "promo_view" == d) {
                  var e = b.ub;
                  a("ec:addPromo", b.ub);
                  e && 0 < e.length && "promo_click" == d && p("ec:setAction", d)
                } else
                  a("ec:addProduct", b.la),
                  p("ec:setAction", d, b.qa)
              }
            },
            u = function () {
              var a = Bg("optimize_id", c);
              a && (p("require", a, {
                  dataLayer: "dataLayer"
                }),
                p("require", "render"))
            },
            F = m(c, f, b.vtp_gtmOnSuccess);
          q(f, F.Zb) && d(function () {
            ld() && ld().remove(f)
          });
          d("create", c, F.Zb);
          (function () {
            var a = Bg("custom_map", c);
            d(function () {
              if (ya(a)) {
                var b = F.S,
                  c = ld().getByName(f),
                  d;
                for (d in a)
                  if (a.hasOwnProperty(d) && /^(dimension|metric)\d+$/.test(d)) {
                    var e = c.get(k(a[d]));
                    l(b, d, e)
                  }
              }
            })
          })();
          (function (a) {
            if (a) {
              var b = {};
              if (ya(a))
                for (var c in e)
                  e.hasOwnProperty(c) && h(e[c], c, a[c], b);
              p("require", "linkid", b)
            }
          })(F.linkAttribution);
          var K = F.linker;
          K && K.domains && nd(f + ".", K.domains, !!K.use_anchor, !!K.decorate_forms);
          var I = function (a, b, c) {
              c && (b = "" + b);
              F.S[a] = b
            },
            L = tc;
          "page_view" == L ? (u(),
            p("send", "pageview", F.S)) : "gtag.config" == L ? (u(),
            0 != F.sendPageView && p("send", "pageview", F.S)) : "screen_view" == L ? p("send", "screenview", F.S) : "timing_complete" == L ? (I("timingCategory", F.eventCategory, !0),
            I("timingVar", F.name, !0),
            I("timingValue", Cc(F.value)),
            void 0 !== F.eventLabel && I("timingLabel", F.eventLabel, !0),
            p("send", "timing", F.S)) : "exception" == L ? p("send", "exception", F.S) : (0 <= Re("view_item_list select_content view_item add_to_cart remove_from_cart begin_checkout set_checkout_option purchase refund view_promotion checkout_progress".split(" "), L) && (p("require", "ec", "ec.js"),
              r()),
            I("eventCategory", F.eventCategory, !0),
            I("eventAction", F.eventAction || L, !0),
            void 0 !== F.eventLabel && I("eventLabel", F.eventLabel, !0),
            void 0 !== F.value && I("eventValue", Cc(F.value)),
            p("send", "event", F.S));
          a || (a = !0,
            jg("https://www.google-analytics.com/analytics.js", function () {
              ld().loaded || b.vtp_gtmOnFailure()
            }, b.vtp_gtmOnFailure))
        };
      Z.__gtagua = r;
      Z.__gtagua.b = "gtagua";
      Z.__gtagua.g = !0
    }();

  var dh = {
    macro: function (a) {
      if (qe.$a.hasOwnProperty(a))
        return qe.$a[a]
    }
  };
  dh.dataLayer = Pc;
  dh.onHtmlSuccess = qe.Xb(!0);
  dh.onHtmlFailure = qe.Xb(!1);
  dh.callback = function (a) {
    vc.hasOwnProperty(a) && zc(vc[a]) && vc[a]();
    delete vc[a]
  };
  dh.$c = function () {
    sc[rc.o] = dh;
    wc = Z.a;
    ec = ec || qe;
    fc = bd
  };
  dh.Od = function () {
    sc = A.google_tag_manager = A.google_tag_manager || {};
    if (sc[rc.o]) {
      var a = sc.zones;
      a && a.unregisterChild(rc.o)
    } else {
      for (var b = data.resource || {}, c = b.macros || [], d = 0; d < c.length; d++)
        Yb.push(c[d]);
      for (var e = b.tags || [], f = 0; f < e.length; f++)
        ac.push(e[f]);
      for (var h = b.predicates || [], k = 0; k < h.length; k++)
        $b.push(h[k]);
      for (var l = b.rules || [], m = 0; m < l.length; m++) {
        for (var n = l[m], p = {}, q = 0; q < n.length; q++)
          p[n[q][0]] = Array.prototype.slice.call(n[q], 1);
        Zb.push(p)
      }
      cc = Z;
      Le();
      dh.$c();
      pe();
      ed = !1;
      fd = 0;
      if ("interactive" == B.readyState && !B.createEventObject || "complete" == B.readyState)
        hd();
      else {
        Ra(B, "DOMContentLoaded", hd);
        Ra(B, "readystatechange", hd);
        if (B.createEventObject && B.documentElement.doScroll) {
          var r = !0;
          try {
            r = !A.frameElement
          } catch (t) {}
          r && id()
        }
        Ra(A, "load", hd)
      }
      de = !1;
      "complete" === B.readyState ? fe() : Ra(A, "load", fe);
      a: {
        if (!sd)
          break a;
        vd();
        yd = void 0;
        zd = {};
        wd = {};
        Bd = void 0;
        Ad = {};
        xd = "";
        Cd = td();
        A.setInterval(vd, 864E5);
      }
    }
  };
  dh.Od();

};
