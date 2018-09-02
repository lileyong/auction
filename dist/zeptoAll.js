var Zepto = function() {
    function d(a) {
        return null == a ? "" + a: I[Q.call(a)] || "object"
    }
    function h(a) {
        return "function" == d(a)
    }
    function u(a) {
        return null != a && a == a.window
    }
    function i(a) {
        return null != a && a.nodeType == a.DOCUMENT_NODE
    }
    function o(a) {
        return "object" == d(a)
    }
    function q(a) {
        return o(a) && !u(a) && Object.getPrototypeOf(a) == Object.prototype
    }
    function A(a) {
        return c.call(a,
            function(a) {
                return null != a
            })
    }
    function v(a) {
        return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function y(a) {
        return a in J ? J[a] : J[a] = RegExp("(^|\\s)" + a + "(\\s|$)")
    }
    function B(a) {
        return "children" in a ? b.call(a.children) : e.map(a.childNodes,
            function(a) {
                return 1 == a.nodeType ? a: void 0
            })
    }
    function D(a, p, b) {
        for (k in p) b && (q(p[k]) || G(p[k])) ? (q(p[k]) && !q(a[k]) && (a[k] = {}), G(p[k]) && !G(a[k]) && (a[k] = []), D(a[k], p[k], b)) : p[k] !== m && (a[k] = p[k])
    }
    function w(a, p) {
        return null == p ? e(a) : e(a).filter(p)
    }
    function r(a, p, b, c) {
        return h(p) ? p.call(a, b, c) : p
    }
    function x(a, p, b) {
        null == b ? a.removeAttribute(p) : a.setAttribute(p, b)
    }
    function n(a, p) {
        var b = a.className,
            c = b && b.baseVal !== m;
        return p === m ? c ? b.baseVal: b: void(c ? b.baseVal = p: a.className = p)
    }
    function E(a) {
        var p;
        try {
            return a ? "true" == a || ("false" == a ? !1: "null" == a ? null: /^0/.test(a) || isNaN(p = Number(a)) ? /^[\[\{]/.test(a) ? e.parseJSON(a) : a: p) : a
        } catch(b) {
            return a
        }
    }
    function z(a, p) {
        p(a);
        for (var b in a.childNodes) z(a.childNodes[b], p)
    }
    var m,
        k,
        e,
        t,
        F,
        g,
        f = [],
        b = f.slice,
        c = f.filter,
        l = window.document,
        C = {},
        J = {},
        H = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        K = /^\s*<(\w+|!)[^>]*>/,
        R = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        j = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        M = /^(?:body|html)$/i,
        S = /([A-Z])/g,
        T = "val css html text data width height offset".split(" "),
        L = l.createElement("table"),
        N = l.createElement("tr"),
        O = {
            tr: l.createElement("tbody"),
            tbody: L,
            thead: L,
            tfoot: L,
            td: N,
            th: N,
            "*": l.createElement("div")
        },
        U = /complete|loaded|interactive/,
        V = /^[\w-]*$/,
        I = {},
        Q = I.toString,
        s = {},
        P = l.createElement("div"),
        W = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        G = Array.isArray ||
            function(a) {
                return a instanceof Array
            };
    return s.matches = function(a, b) {
        if (!b || !a || 1 !== a.nodeType) return ! 1;
        var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
        if (c) return c.call(a, b);
        var d,
            c = a.parentNode,
            g = !c;
        return g && (c = P).appendChild(a),
            d = ~s.qsa(c, b).indexOf(a),
        g && P.removeChild(a),
            d
    },
        F = function(a) {
            return a.replace(/-+(.)?/g,
                function(a, b) {
                    return b ? b.toUpperCase() : ""
                })
        },
        g = function(a) {
            return c.call(a,
                function(b, c) {
                    return a.indexOf(b) == c
                })
        },
        s.fragment = function(a, p, c) {
            var d,
                g,
                f;
            return R.test(a) && (d = e(l.createElement(RegExp.$1))),
            d || (a.replace && (a = a.replace(j, "<$1></$2>")), p === m && (p = K.test(a) && RegExp.$1), p in O || (p = "*"), f = O[p], f.innerHTML = "" + a, d = e.each(b.call(f.childNodes),
                function() {
                    f.removeChild(this)
                })),
            q(c) && (g = e(d), e.each(c,
                function(a, b) { - 1 < T.indexOf(a) ? g[a](b) : g.attr(a, b)
                })),
                d
        },
        s.Z = function(a, b) {
            return a = a || [],
                a.__proto__ = e.fn,
                a.selector = b || "",
                a
        },
        s.isZ = function(a) {
            return a instanceof s.Z
        },
        s.init = function(a, b) {
            var c;
            if (!a) return s.Z();
            if ("string" == typeof a) if (a = a.trim(), "<" == a[0] && K.test(a)) c = s.fragment(a, RegExp.$1, b),
                a = null;
            else {
                if (b !== m) return e(b).find(a);
                c = s.qsa(l, a)
            } else {
                if (h(a)) return e(l).ready(a);
                if (s.isZ(a)) return a;
                if (G(a)) c = A(a);
                else if (o(a)) c = [a],
                    a = null;
                else if (K.test(a)) c = s.fragment(a.trim(), RegExp.$1, b),
                    a = null;
                else {
                    if (b !== m) return e(b).find(a);
                    c = s.qsa(l, a)
                }
            }
            return s.Z(c, a)
        },
        e = function(a, b) {
            return s.init(a, b)
        },
        e.extend = function(a) {
            var c,
                d = b.call(arguments, 1);
            return "boolean" == typeof a && (c = a, a = d.shift()),
                d.forEach(function(b) {
                    D(a, b, c)
                }),
                a
        },
        s.qsa = function(a, c) {
            var d,
                g = "#" == c[0],
                e = !g && "." == c[0],
                f = g || e ? c.slice(1) : c,
                l = V.test(f);
            return i(a) && l && g ? (d = a.getElementById(f)) ? [d] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : b.call(l && !g ? e ? a.getElementsByClassName(f) : a.getElementsByTagName(c) : a.querySelectorAll(c))
        },
        e.contains = function(a, b) {
            return a !== b && a.contains(b)
        },
        e.type = d,
        e.isFunction = h,
        e.isWindow = u,
        e.isArray = G,
        e.isPlainObject = q,
        e.isEmptyObject = function(a) {
            for (var b in a) return ! 1;
            return ! 0
        },
        e.inArray = function(a, b, c) {
            return f.indexOf.call(b, a, c)
        },
        e.camelCase = F,
        e.trim = function(a) {
            return null == a ? "": String.prototype.trim.call(a)
        },
        e.uuid = 0,
        e.support = {},
        e.expr = {},
        e.map = function(a, b) {
            var c,
                d,
                g = [];
            if ("number" == typeof a.length) for (d = 0; d < a.length; d++) c = b(a[d], d),
            null != c && g.push(c);
            else for (d in a) c = b(a[d], d),
            null != c && g.push(c);
            return 0 < g.length ? e.fn.concat.apply([], g) : g
        },
        e.each = function(a, b) {
            var c;
            if ("number" == typeof a.length) for (c = 0; c < a.length && !1 !== b.call(a[c], c, a[c]); c++);
            else for (c in a) if (!1 === b.call(a[c], c, a[c])) break;
            return a
        },
        e.grep = function(a, b) {
            return c.call(a, b)
        },
    window.JSON && (e.parseJSON = JSON.parse),
        e.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
            function(a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }),
        e.fn = {
            forEach: f.forEach,
            reduce: f.reduce,
            push: f.push,
            sort: f.sort,
            indexOf: f.indexOf,
            concat: f.concat,
            map: function(a) {
                return e(e.map(this,
                    function(b, c) {
                        return a.call(b, c, b)
                    }))
            },
            slice: function() {
                return e(b.apply(this, arguments))
            },
            ready: function(a) {
                return U.test(l.readyState) && l.body ? a(e) : l.addEventListener("DOMContentLoaded",
                    function() {
                        a(e)
                    },
                    !1),
                    this
            },
            get: function(a) {
                return a === m ? b.call(this) : this[0 <= a ? a: a + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function(a) {
                return f.every.call(this,
                    function(b, c) {
                        return ! 1 !== a.call(b, c, b)
                    }),
                    this
            },
            filter: function(a) {
                return h(a) ? this.not(this.not(a)) : e(c.call(this,
                    function(b) {
                        return s.matches(b, a)
                    }))
            },
            add: function(a, b) {
                return e(g(this.concat(e(a, b))))
            },
            is: function(a) {
                return 0 < this.length && s.matches(this[0], a)
            },
            not: function(a) {
                var c = [];
                if (h(a) && a.call !== m) this.each(function(b) {
                    a.call(this, b) || c.push(this)
                });
                else {
                    var d = "string" == typeof a ? this.filter(a) : "number" == typeof a.length && h(a.item) ? b.call(a) : e(a);
                    this.forEach(function(a) {
                        0 > d.indexOf(a) && c.push(a)
                    })
                }
                return e(c)
            },
            has: function(a) {
                return this.filter(function() {
                    return o(a) ? e.contains(this, a) : e(this).find(a).size()
                })
            },
            eq: function(a) {
                return - 1 === a ? this.slice(a) : this.slice(a, +a + 1)
            },
            first: function() {
                var a = this[0];
                return a && !o(a) ? a: e(a)
            },
            last: function() {
                var a = this[this.length - 1];
                return a && !o(a) ? a: e(a)
            },
            find: function(a) {
                var b = this;
                return "object" == typeof a ? e(a).filter(function() {
                    var a = this;
                    return f.some.call(b,
                        function(b) {
                            return e.contains(b, a)
                        })
                }) : 1 == this.length ? e(s.qsa(this[0], a)) : this.map(function() {
                    return s.qsa(this, a)
                })
            },
            closest: function(a, b) {
                var c = this[0],
                    d = !1;
                for ("object" == typeof a && (d = e(a)); c && !(d ? 0 <= d.indexOf(c) : s.matches(c, a));) c = c !== b && !i(c) && c.parentNode;
                return e(c)
            },
            parents: function(a) {
                for (var b = [], c = this; 0 < c.length;) c = e.map(c,
                    function(a) {
                        return (a = a.parentNode) && !i(a) && 0 > b.indexOf(a) ? (b.push(a), a) : void 0
                    });
                return w(b, a)
            },
            parent: function(a) {
                return w(g(this.pluck("parentNode")), a)
            },
            children: function(a) {
                return w(this.map(function() {
                    return B(this)
                }), a)
            },
            contents: function() {
                return this.map(function() {
                    return b.call(this.childNodes)
                })
            },
            siblings: function(a) {
                return w(this.map(function(a, b) {
                    return c.call(B(b.parentNode),
                        function(a) {
                            return a !== b
                        })
                }), a)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(a) {
                return e.map(this,
                    function(b) {
                        return b[a]
                    })
            },
            show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = "");
                    if ("none" == getComputedStyle(this, "").getPropertyValue("display")) {
                        var a = this.style,
                            b;
                        b = this.nodeName;
                        var c,
                            d;
                        b = (C[b] || (c = l.createElement(b), l.body.appendChild(c), d = getComputedStyle(c, "").getPropertyValue("display"), c.parentNode.removeChild(c), "none" == d && (d = "block"), C[b] = d), C[b]);
                        a.display = b
                    }
                })
            },
            /*replaceWith: function(a) {
             return this.before(a).remove()
             },
             wrap: function(a) {
             var b = h(a);
             if (this[0] && !b) var c = e(a).get(0),
             d = c.parentNode || 1 < this.length;
             return this.each(function(g) {
             e(this).wrapAll(b ? a.call(this, g) : d ? c.cloneNode(!0) : c)
             })
             },
             wrapAll: function(a) {
             if (this[0]) {
             e(this[0]).before(a = e(a));
             for (var b; (b = a.children()).length;) a = b.first();
             e(a).append(this)
             }
             return this
             },
             wrapInner: function(a) {
             var b = h(a);
             return this.each(function(c) {
             var d = e(this),
             g = d.contents(),
             c = b ? a.call(this, c) : a;
             g.length ? g.wrapAll(c) : d.append(c)
             })
             },
             unwrap: function() {
             return this.parent().each(function() {
             e(this).replaceWith(e(this).children())
             }),
             this
             },*/
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(a) {
                return this.each(function() {
                    var b = e(this); (a === m ? "none" == b.css("display") : a) ? b.show() : b.hide()
                })
            },
            prev: function(a) {
                return e(this.pluck("previousElementSibling")).filter(a || "*")
            },
            next: function(a) {
                return e(this.pluck("nextElementSibling")).filter(a || "*")
            },
            html: function(a) {
                return 0 === arguments.length ? 0 < this.length ? this[0].innerHTML: null: this.each(function(b) {
                    var c = this.innerHTML;
                    e(this).empty().append(r(this, a, b, c))
                })
            },
            text: function(a) {
                return 0 === arguments.length ? 0 < this.length ? this[0].textContent: null: this.each(function() {
                    this.textContent = a === m ? "": "" + a
                })
            },
            attr: function(a, b) {
                var c;
                return "string" == typeof a && b === m ? 0 == this.length || 1 !== this[0].nodeType ? m: "value" == a && "INPUT" == this[0].nodeName ? this.val() : !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c: this.each(function(c) {
                    if (1 === this.nodeType) if (o(a)) for (k in a) x(this, k, a[k]);
                    else x(this, a, r(this, b, c, this.getAttribute(a)))
                })
            },
            removeAttr: function(a) {
                return this.each(function() {
                    1 === this.nodeType && x(this, a)
                })
            },
            prop: function(a, b) {
                return a = W[a] || a,
                    b === m ? this[0] && this[0][a] : this.each(function(c) {
                        this[a] = r(this, b, c, this[a])
                    })
            },
            data: function(a, b) {
                var c = this.attr("data-" + a.replace(S, "-$1").toLowerCase(), b);
                return null !== c ? E(c) : m
            },
            val: function(a) {
                return 0 === arguments.length ? this[0] && (this[0].multiple ? e(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value) : this.each(function(b) {
                    this.value = r(this, a, b, this.value)
                })
            },
            offset: function(a) {
                if (a) return this.each(function(b) {
                    var c = e(this),
                        b = r(this, a, b, c.offset()),
                        d = c.offsetParent().offset(),
                        b = {
                            top: b.top - d.top,
                            left: b.left - d.left
                        };
                    "static" == c.css("position") && (b.position = "relative");
                    c.css(b)
                });
                if (0 == this.length) return null;
                var b = this[0].getBoundingClientRect();
                return {
                    left: b.left + window.pageXOffset,
                    top: b.top + window.pageYOffset,
                    width: Math.round(b.width),
                    height: Math.round(b.height)
                }
            },
            css: function(a, b) {
                if (2 > arguments.length) {
                    var c = this[0],
                        g = getComputedStyle(c, "");
                    if (!c) return;
                    if ("string" == typeof a) return c.style[F(a)] || g.getPropertyValue(a);
                    if (G(a)) {
                        var f = {};
                        return e.each(G(a) ? a: [a],
                            function(a, b) {
                                f[b] = c.style[F(b)] || g.getPropertyValue(b)
                            }),
                            f
                    }
                }
                var l = "";
                if ("string" == d(a)) b || 0 === b ? l = v(a) + ":" + ("number" != typeof b || H[v(a)] ? b: b + "px") : this.each(function() {
                    this.style.removeProperty(v(a))
                });
                else for (k in a) a[k] || 0 === a[k] ? l += v(k) + ":" + ("number" != typeof a[k] || H[v(k)] ? a[k] : a[k] + "px") + ";": this.each(function() {
                    this.style.removeProperty(v(k))
                });
                return this.each(function() {
                    this.style.cssText += ";" + l
                })
            },
            index: function(a) {
                return a ? this.indexOf(e(a)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(a) {
                return a ? f.some.call(this,
                    function(a) {
                        return this.test(n(a))
                    },
                    y(a)) : !1
            },
            addClass: function(a) {
                return a ? this.each(function(b) {
                    t = [];
                    var c = n(this);
                    r(this, a, b, c).split(/\s+/g).forEach(function(a) {
                            e(this).hasClass(a) || t.push(a)
                        },
                        this);
                    t.length && n(this, c + (c ? " ": "") + t.join(" "))
                }) : this
            },
            removeClass: function(a) {
                return this.each(function(b) {
                    return a === m ? n(this, "") : (t = n(this), r(this, a, b, t).split(/\s+/g).forEach(function(a) {
                        t = t.replace(y(a), " ")
                    }), void n(this, t.trim()))
                })
            },
            toggleClass: function(a, b) {
                return a ? this.each(function(c) {
                    var d = e(this);
                    r(this, a, c, n(this)).split(/\s+/g).forEach(function(a) { (b === m ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
                    })
                }) : this
            },
            scrollTop: function(a) {
                if (this.length) {
                    var b = "scrollTop" in
                        this[0];
                    return a === m ? b ? this[0].scrollTop: this[0].pageYOffset: this.each(b ?
                        function() {
                            this.scrollTop = a
                        }: function() {
                        this.scrollTo(this.scrollX, a)
                    })
                }
            },
            scrollLeft: function(a) {
                if (this.length) {
                    var b = "scrollLeft" in this[0];
                    return a === m ? b ? this[0].scrollLeft: this[0].pageXOffset: this.each(b ?
                        function() {
                            this.scrollLeft = a
                        }: function() {
                        this.scrollTo(a, this.scrollY)
                    })
                }
            },
            position: function() {
                if (this.length) {
                    var a = this[0],
                        b = this.offsetParent(),
                        c = this.offset(),
                        d = M.test(b[0].nodeName) ? {
                            top: 0,
                            left: 0
                        }: b.offset();
                    return c.top -= parseFloat(e(a).css("margin-top")) || 0,
                        c.left -= parseFloat(e(a).css("margin-left")) || 0,
                        d.top += parseFloat(e(b[0]).css("border-top-width")) || 0,
                        d.left += parseFloat(e(b[0]).css("border-left-width")) || 0,
                    {
                        top: c.top - d.top,
                        left: c.left - d.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var a = this.offsetParent || l.body; a && !M.test(a.nodeName) && "static" == e(a).css("position");) a = a.offsetParent;
                    return a
                })
            }
        },
        e.fn.detach = e.fn.remove,
        ["width", "height"].forEach(function(a) {
            var b = a.replace(/./,
                function(a) {
                    return a[0].toUpperCase()
                });
            e.fn[a] = function(c) {
                var d,
                    g = this[0];
                return c === m ? u(g) ? g["inner" + b] : i(g) ? g.documentElement["scroll" + b] : (d = this.offset()) && d[a] : this.each(function(b) {
                    g = e(this);
                    g.css(a, r(this, c, b, g[a]()))
                })
            }
        }),
        ["after", "prepend", "before", "append"].forEach(function(a, b) {
            var c = b % 2;
            e.fn[a] = function() {
                var a,
                    g,
                    f = e.map(arguments,
                        function(b) {
                            return a = d(b),
                                "object" == a || "array" == a || null == b ? b: s.fragment(b)
                        }),
                    l = 1 < this.length;
                return 1 > f.length ? this: this.each(function(a, d) {
                    g = c ? d: d.parentNode;
                    d = 0 == b ? d.nextSibling: 1 == b ? d.firstChild: 2 == b ? d: null;
                    f.forEach(function(a) {
                        if (l) a = a.cloneNode(!0);
                        else if (!g) return e(a).remove();
                        z(g.insertBefore(a, d),
                            function(a) {
                                null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
                            })
                    })
                })
            };
            e.fn[c ? a + "To": "insert" + (b ? "Before": "After")] = function(b) {
                return e(b)[a](this),
                    this
            }
        }),
        s.Z.prototype = e.fn,
        s.uniq = g,
        s.deserializeValue = E,
        e.zepto = s,
        e
} ();
window.Zepto = Zepto;
Window.prototype.setInterval = function(code,delay,arguments) {
    function _setTimeout(){
        if(typeof code == "function"){
            code();
        }else if(typeof code == "string"){
            eval(code);
        }
        setTimeout(_setTimeout,delay,arguments);
    }
    _setTimeout();
};
void 0 === window.$ && (window.$ = Zepto); (function(d) {
    function h(d) {
        return d._zid || (d._zid = B++)
    }
    function u(d, f, b, c) {
        if (f = i(f), f.ns) var l = RegExp("(?:^| )" + f.ns.replace(" ", " .* ?") + "(?: |$)");
        return (x[h(d)] || []).filter(function(d) {
            return ! (!d || f.e && d.e != f.e || f.ns && !l.test(d.ns) || b && h(d.fn) !== h(b) || c && d.sel != c)
        })
    }
    function i(d) {
        d = ("" + d).split(".");
        return {
            e: d[0],
            ns: d.slice(1).sort().join(" ")
        }
    }
    function o(g, f, b, c, l, e, k) {
        var H = h(g),
            n = x[H] || (x[H] = []);
        f.split(/\s/).forEach(function(f) {
            if ("ready" == f) return d(document).ready(b);
            var j = i(f);
            j.fn = b;
            j.sel = l;
            j.e in m && (b = function(b) {
                var c = b.relatedTarget;
                return ! c || c !== this && !d.contains(this, c) ? j.fn.apply(this, arguments) : void 0
            });
            var h = (j.del = e) || b;
            j.proxy = function(b) {
                if (b = A(b), !b.isImmediatePropagationStopped()) {
                    b.data = c;
                    var d = h.apply(g, b._args == y ? [b] : [b].concat(b._args));
                    return ! 1 === d && (b.preventDefault(), b.stopPropagation()),
                        d
                }
            };
            j.i = n.length;
            n.push(j);
            "addEventListener" in g && g.addEventListener(m[j.e] || E && z[j.e] || j.e, j.proxy, j.del && !E && j.e in z || !!k)
        })
    }
    function q(d, f, b, c, l) {
        var e = h(d); (f || "").split(/\s/).forEach(function(f) {
            u(d, f, b, c).forEach(function(b) {
                delete x[e][b.i];
                "removeEventListener" in d && d.removeEventListener(m[b.e] || E && z[b.e] || b.e, b.proxy, b.del && !E && b.e in z || !!l)
            })
        })
    }
    function A(g, f) {
        return (f || !g.isDefaultPrevented) && (f || (f = g), d.each(F,
            function(b, c) {
                var d = f[b];
                g[b] = function() {
                    return this[c] = k,
                    d && d.apply(f, arguments)
                };
                g[c] = e
            }), (f.defaultPrevented !== y ? f.defaultPrevented: "returnValue" in f ? !1 === f.returnValue: f.getPreventDefault && f.getPreventDefault()) && (g.isDefaultPrevented = k)),
            g
    }
    function v(d) {
        var f,
            b = {
                originalEvent: d
            };
        for (f in d) t.test(f) || d[f] === y || (b[f] = d[f]);
        return A(b, d)
    }
    var y,
        B = 1,
        D = Array.prototype.slice,
        w = d.isFunction,
        r = function(d) {
            return "string" == typeof d
        },
        x = {},
        n = {},
        E = "onfocusin" in window,
        z = {
            focus: "focusin",
            blur: "focusout"
        },
        m = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    n.click = n.mousedown = n.mouseup = n.mousemove = "MouseEvents";
    d.event = {
        add: o,
        remove: q
    };
    d.proxy = function(g, f) {
        if (w(g)) {
            var b = function() {
                return g.apply(f, arguments)
            };
            return b._zid = h(g),
                b
        }
        if (r(f)) return d.proxy(g[f], g);
        throw new TypeError("expected function");
    };
    d.fn.bind = function(d, f, b) {
        return this.on(d, f, b)
    };
    d.fn.unbind = function(d, f) {
        return this.off(d, f)
    };
    d.fn.one = function(d, f, b, c) {
        return this.on(d, f, b, c, 1)
    };
    var k = function() {
            return ! 0
        },
        e = function() {
            return ! 1
        },
        t = /^([A-Z]|returnValue$|layer[XY]$)/,
        F = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    d.fn.delegate = function(d, f, b) {
        return this.on(f, d, b)
    };
    d.fn.undelegate = function(d, f, b) {
        return this.off(f, d, b)
    };
    d.fn.live = function(e, f) {
        return d(document.body).delegate(this.selector, e, f),
            this
    };
    d.fn.die = function(e, f) {
        return d(document.body).undelegate(this.selector, e, f),
            this
    };
    d.fn.on = function(g, f, b, c, l) {
        var C,
            h,
            i = this;
        return g && !r(g) ? (d.each(g,
            function(c, d) {
                i.on(c, f, b, d, l)
            }), i) : (r(f) || w(c) || !1 === c || (c = b, b = f, f = y), (w(b) || !1 === b) && (c = b, b = y), !1 === c && (c = e), i.each(function(e, i) {
            l && (C = function(b) {
                return q(i, b.type, c),
                    c.apply(this, arguments)
            });
            f && (h = function(b) {
                var e,
                    l = d(b.target).closest(f, i).get(0);
                return l && l !== i ? (e = d.extend(v(b), {
                    currentTarget: l,
                    liveFired: i
                }), (C || c).apply(l, [e].concat(D.call(arguments, 1)))) : void 0
            });
            o(i, g, c, b, f, h || C)
        }))
    };
    d.fn.off = function(g, f, b) {
        var c = this;
        return g && !r(g) ? (d.each(g,
            function(b, d) {
                c.off(b, f, d)
            }), c) : (r(f) || w(b) || !1 === b || (b = f, f = y), !1 === b && (b = e), c.each(function() {
            q(this, g, b, f)
        }))
    };
    d.fn.trigger = function(e, f) {
        return e = r(e) || d.isPlainObject(e) ? d.Event(e) : A(e),
            e._args = f,
            this.each(function() {
                "dispatchEvent" in this ? this.dispatchEvent(e) : d(this).triggerHandler(e, f)
            })
    };
    d.fn.triggerHandler = function(e, f) {
        var b,
            c;
        return this.each(function(l, C) {
            b = v(r(e) ? d.Event(e) : e);
            b._args = f;
            b.target = C;
            d.each(u(C, e.type || e),
                function(d, e) {
                    return c = e.proxy(b),
                        b.isImmediatePropagationStopped() ? !1: void 0
                })
        }),
            c
    };
    "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
        d.fn[e] = function(d) {
            return d ? this.bind(e, d) : this.trigger(e)
        }
    }); ["focus", "blur"].forEach(function(e) {
        d.fn[e] = function(d) {
            return d ? this.bind(e, d) : this.each(function() {
                try {
                    this[e]()
                } catch(b) {}
            }),
                this
        }
    });
    d.Event = function(d, e) {
        r(d) || (e = d, d = e.type);
        var b = document.createEvent(n[d] || "Events"),
            c = !0;
        if (e) for (var l in e)"bubbles" == l ? c = !!e[l] : b[l] = e[l];
        return b.initEvent(d, c, !0),
            A(b)
    }
})(Zepto); (function(d) {
    function h(b, c, e, f) {
        b.global ? (b = c || z, e = d.Event(e), f = (d(b).trigger(e, f), !e.isDefaultPrevented())) : f = void 0;
        return f
    }
    function u(b) {
        b.global && 0 === d.active++&&h(b, null, "ajaxStart")
    }
    function i(b, c) {
        var d = c.context;
        return ! 1 === c.beforeSend.call(d, b, c) || !1 === h(c, d, "ajaxBeforeSend", [b, c]) ? !1: void h(c, d, "ajaxSend", [b, c])
    }
    function o(b, c, d, e) {
        var f = d.context;
        d.success.call(f, b, "success", c);
        e && e.resolveWith(f, [b, "success", c]);
        h(d, f, "ajaxSuccess", [c, d, b]);
        A("success", c, d)
    }
    function q(b, c, d, e, f) {
        var g = e.context;
        e.error.call(g, d, c, b);
        f && f.rejectWith(g, [d, c, b]);
        h(e, g, "ajaxError", [d, e, b || c]);
        A(c, d, e)
    }
    function A(b, c, e) {
        var f = e.context;
        e.complete.call(f, c, b);
        h(e, f, "ajaxComplete", [c, e]);
        e.global && !--d.active && h(e, null, "ajaxStop")
    }
    function v() {}
    function y(b) {
        return b && (b = b.split(";", 2)[0]),
        b && (b == F ? "html": b == t ? "json": k.test(b) ? "script": e.test(b) && "xml") || "text"
    }
    function B(b, c) {
        return "" == c ? b: (b + "&" + c).replace(/[&?]{1,2}/, "?")
    }
    function D(b) {
        b.processData && b.data && "string" != d.type(b.data) && (b.data = d.param(b.data, b.traditional)); ! b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = B(b.url, b.data), b.data = void 0)
    }
    function w(b, c, e, f) {
        return d.isFunction(c) && (f = e, e = c, c = void 0),
        d.isFunction(e) || (f = e, e = void 0),
        {
            url: b,
            data: c,
            success: e,
            dataType: f
        }
    }
    function r(b, c, e, f) {
        var g,
            h = d.isArray(c),
            i = d.isPlainObject(c);
        d.each(c,
            function(c, j) {
                g = d.type(j);
                f && (c = e ? f: f + "[" + (i || "object" == g || "array" == g ? c: "") + "]"); ! f && h ? b.add(j.name, j.value) : "array" == g || !e && "object" == g ? r(b, j, e, c) : b.add(c, j)
            })
    }
    var x,
        n,
        E = 0,
        z = window.document,
        m = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        k = /^(?:text|application)\/javascript/i,
        e = /^(?:text|application)\/xml/i,
        t = "application/json",
        F = "text/html",
        g = /^\s*$/;
    d.active = 0;
    d.ajaxJSONP = function(b, c) {
        if (! ("type" in b)) return d.ajax(b);
        var e,
            f,
            g = b.jsonpCallback,
            h = (d.isFunction(g) ? g() : g) || "jsonp"+(++E),
            k = z.createElement("script"),
            n = window[h],
            j = function(b) {
                d(k).triggerHandler("error", b || "abort")
            },
            m = {
                abort: j
            };
        return c && c.promise(m),
            d(k).on("load error",
                function(g, j) {
                    clearTimeout(f);
                    d(k).off().remove();
                    "error" != g.type && e ? o(e[0], m, b, c) : q(null, j || "error", m, b, c);
                    window[h] = n;
                    e && d.isFunction(n) && n(e[0]);
                    n = e = void 0
                }),
            !1 === i(m, b) ? (j("abort"), m) : (window[h] = function() {
                e = arguments
            },
                k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + h), z.head.appendChild(k), 0 < b.timeout && (f = setTimeout(function() {
                    j("timeout")
                },
                b.timeout)), m)
    };
    d.ajaxSettings = {
        type: "GET",
        beforeSend: v,
        success: v,
        error: v,
        complete: v,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: t,
            xml: "application/xml, text/xml",
            html: F,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    };
    d.ajax = function(b) {
        var c = d.extend({},
                b || {}),
            e = d.Deferred && d.Deferred();
        for (x in d.ajaxSettings) void 0 === c[x] && (c[x] = d.ajaxSettings[x]);
        u(c);
        c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host);
        c.url || (c.url = window.location.toString());
        D(c); ! 1 === c.cache && (c.url = B(c.url, "_=" + Date.now()));
        var f = c.dataType,
            b = /\?.+=\?/.test(c.url);
        if ("jsonp" == f || b) return b || (c.url = B(c.url, c.jsonp ? c.jsonp + "=?": !1 === c.jsonp ? "": "callback=?")),
            d.ajaxJSONP(c, e);
        var h,
            b = c.accepts[f],
            k = {},
            m = function(b, c) {
                k[b.toLowerCase()] = [b, c]
            },
            z = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1: window.location.protocol,
            j = c.xhr(),
            r = j.setRequestHeader;
        if (e && e.promise(j), c.crossDomain || m("X-Requested-With", "XMLHttpRequest"), m("Accept", b || "*/*"), (b = c.mimeType || b) && ( - 1 < b.indexOf(",") && (b = b.split(",", 2)[0]), j.overrideMimeType && j.overrideMimeType(b)), (c.contentType || !1 !== c.contentType && c.data && "GET" != c.type.toUpperCase()) && m("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers) for (n in c.headers) m(n, c.headers[n]);
        if (j.setRequestHeader = m, j.onreadystatechange = function() {
                if (4 == j.readyState) {
                    j.onreadystatechange = v;
                    clearTimeout(h);
                    var b,
                        i = !1;
                    if (200 <= j.status && 300 > j.status || 304 == j.status || 0 == j.status && "file:" == z) {
                        f = f || y(c.mimeType || j.getResponseHeader("content-type"));
                        b = j.responseText;
                        try {
                            "script" == f ? (0, eval)(b) : "xml" == f ? b = j.responseXML: "json" == f && (b = g.test(b) ? null: d.parseJSON(b))
                        } catch(k) {
                            i = k
                        }
                        i ? q(i, "parsererror", j, c, e) : o(b, j, c, e)
                    } else q(j.statusText || null, j.status ? "error": "abort", j, c, e)
                }
            },
            !1 === i(j, c)) return j.abort(),
            q(null, "abort", j, c, e),
            j;
        if (c.xhrFields) for (n in c.xhrFields) j[n] = c.xhrFields[n];
        j.open(c.type, c.url, "async" in c ? c.async: !0, c.username, c.password);
        for (n in k) r.apply(j, k[n]);
        return 0 < c.timeout && (h = setTimeout(function() {
                j.onreadystatechange = v;
                j.abort();
                q(null, "timeout", j, c, e)
            },
            c.timeout)),
            j.send(c.data ? c.data: null),
            j
    };
    d.get = function() {
        return d.ajax(w.apply(null, arguments))
    };
    d.post = function() {
        var b = w.apply(null, arguments);
        return b.type = "POST",
            d.ajax(b)
    };
    d.getJSON = function() {
        var b = w.apply(null, arguments);
        return b.dataType = "json",
            d.ajax(b)
    };
    d.fn.load = function(b, c, e) {
        if (!this.length) return this;
        var f,
            g = this,
            h = b.split(/\s/),
            b = w(b, c, e),
            i = b.success;
        return 1 < h.length && (b.url = h[0], f = h[1]),
            b.success = function(b) {
                g.html(f ? d("<div>").html(b.replace(m, "")).find(f) : b);
                i && i.apply(g, arguments)
            },
            d.ajax(b),
            this
    };
    var f = encodeURIComponent;
    d.param = function(b, c) {
        var d = [];
        return d.add = function(b, c) {
            this.push(f(b) + "=" + f(c))
        },
            r(d, b, c),
            d.join("&").replace(/%20/g, "+")
    }
})(Zepto); (function(d) {
    d.fn.serializeArray = function() {
        var h,
            u = [];
        return d([].slice.call(this.get(0).elements)).each(function() {
            h = d(this);
            var i = h.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && u.push({
                name: h.attr("name"),
                value: h.val()
            })
        }),
            u
    };
    d.fn.serialize = function() {
        var d = [];
        return this.serializeArray().forEach(function(u) {
            d.push(encodeURIComponent(u.name) + "=" + encodeURIComponent(u.value))
        }),
            d.join("&")
    };
    d.fn.submit = function(h) {
        h ? this.bind("submit", h) : this.length && (h = d.Event("submit"), this.eq(0).trigger(h), h.isDefaultPrevented() || this.get(0).submit());
        return this
    }
})(Zepto); (function(d) {
    "__proto__" in {} || d.extend(d.zepto, {
        Z: function(h, o) {
            return h = h || [],
                d.extend(h, d.fn),
                h.selector = o || "",
                h.__Z = !0,
                h
        },
        isZ: function(h) {
            return "array" === d.type(h) && "__Z" in h
        }
    });
    try {
        getComputedStyle(void 0)
    } catch(h) {
        var u = getComputedStyle;
        window.getComputedStyle = function(d) {
            try {
                return u(d)
            } catch(h) {
                return null
            }
        }
    }
})(Zepto); (function(d) {
    d.getScript = function(h, u, i) {
        var o = document.createElement("script"),
            q = d(o);
        o.src = h;
        d("head").append(o);
        q.bind("load", u);
        q.bind("error", i)
    }
})(Zepto); (function(d, h) {
    function u(d) {
        return d.toLowerCase()
    }
    var i = "",
        o,
        q = window.document.createElement("div"),
        A = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        v,
        y,
        B,
        D,
        w,
        r,
        x,
        n = {};
    d.each({
            Webkit: "webkit",
            Moz: "",
            O: "o",
            ms: "MS"
        },
        function(d, n) {
            if (q.style[d + "TransitionProperty"] !== h) return i = "-" + u(d) + "-",
                o = n,
                !1
        });
    v = i + "transform";
    n[y = i + "transition-property"] = n[B = i + "transition-duration"] = n[D = i + "transition-timing-function"] = n[w = i + "animation-name"] = n[r = i + "animation-duration"] = n[x = i + "animation-timing-function"] = "";
    d.fx = {
        off: o === h && q.style.transitionProperty === h,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: i,
        transitionEnd: o ? o + "TransitionEnd": u("TransitionEnd"),
        animationEnd: o ? o + "AnimationEnd": u("AnimationEnd")
    };
    d.fn.animate = function(h, i, m, k) {
        return d.isPlainObject(i) && (m = i.easing, k = i.complete, i = i.duration),
        i && (i = ("number" == typeof i ? i: d.fx.speeds[i] || d.fx.speeds._default) / 1E3),
            this.anim(h, i, m, k)
    };
    d.fn.anim = function(i, o, m, k) {
        var e,
            t = {},
            q,
            g = "",
            f = this,
            b,
            c = d.fx.transitionEnd;
        o === h && (o = 0.4);
        d.fx.off && (o = 0);
        if ("string" == typeof i) t[w] = i,
            t[r] = o + "s",
            t[x] = m || "linear",
            c = d.fx.animationEnd;
        else {
            q = [];
            for (e in i) A.test(e) ? g += e + "(" + i[e] + ") ": (t[e] = i[e], q.push(u(e.replace(/([a-z])([A-Z])/, "$1-$2"))));
            g && (t[v] = g, q.push(v));
            0 < o && "object" == typeof i && (t[y] = q.join(", "), t[B] = o + "s", t[D] = m || "linear")
        }
        return b = function(e) {
            if ("undefined" != typeof e) {
                if (e.target !== e.currentTarget) return;
                d(e.target).unbind(c, b)
            }
            d(this).css(n);
            k && k.call(this)
        },
        0 < o && this.bind(c, b),
        this.size() && this.get(0),
            this.css(t),
        0 >= o && setTimeout(function() {
                f.each(function() {
                    b.call(this)
                })
            },
            0),
            this
    };
    q = null
})(Zepto);
var start_ev, end_ev, move_ev;
if ('ontouchstart' in window) {
    start_ev = 'touchstart';
    end_ev = 'touchend';
    move_ev = 'touchmove';
} else {
    start_ev = 'mousedown';
    end_ev = 'mouseup';
    move_ev = 'mousemove';
}
function getType (o) {
    var _t;
    return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
}
$.fn.Touch = function (obj, opt) {
    var moveEvent = move_ev;
    var isTouchEnd = false;//是否松手
    var g = {};
    if (getType(obj) == 'function') {
        obj.fun = obj;
    }

    this.each(function () {
        var $dom = $($(this).eq(0));
        //if($dom.attr('id')!=undefined){confirm($dom.attr('id'))}
        var ifMove = false;
        var t = 0;
        $dom.on(moveEvent, function (e) {
            ifMove = true;
            clearTimeout(t);
            t = setTimeout(function () {
                    ifMove=false;
                    $('.tapped').removeClass('tapped');
                }
                , 250);
        })
        if (obj.children) {
            $dom.on(start_ev, obj.children, function (e) {
                if(isTouchEnd){
                    clearTimeout(T.isTouchEndTimer);
                    T.isTouchEndTimer = setTimeout(function(){
                        isTouchEnd = false;
                    },799);
                }
                if(opt && opt.prevent){
                    e.preventDefault();
                }
                if(opt && opt.stop){
                    e.stopPropagation();
                }
                $(this).addClass('tapped');
                //800毫秒后如果未松手则触发长按事件
                var k = this,$k = $(this);
                if(opt && opt.isLongPress){
                    clearTimeout(T.longPressTimer);
                    T.longPressTimer = setTimeout(function(){
                        if(!isTouchEnd){
                            $k.removeClass('tapped');
                            setTimeout(function () {
                                obj.fun.call(k, k);
                            }, 0);
                            if (!(opt && opt.nopreventDefault)) {
                                e.preventDefault();	//阻止浏览器默认事件，防止'点透'现象
                            }
                            return 0;
                        }
                    },800);
                }
                g.beginTime = new Date().getTime();
                try {
                    g.x = e.changedTouches[0].clientX;
                    g.y = e.changedTouches[0].clientY;
                } catch (e) {
                }
            })
            $dom[(opt && opt.eventType ? opt.eventType:"on")](end_ev, obj.children, function (e) {
                isTouchEnd = true;
                if(opt && opt.isLongPress){
                    return false;//长按事件不触发end_ev
                }
                g.endTime = new Date().getTime();
                try {
                    var diffX = Math.abs(g.x - e.changedTouches[0].clientX);
                    var diffY = Math.abs(g.y - e.changedTouches[0].clientY);
                    if (diffY < 16 && diffX < 16) {
                        ifMove = false;
                    } else {
                        ifMove = true;
                    }
                } catch (e) {
                }
                var isLongPress = false ;
                if(g.beginTime && g.endTime){
                    isLongPress = g.endTime - g.beginTime > 800 ;
                }
                if ((ifMove && end_ev == 'touchend') || isLongPress) {
                    ifMove = false;
                    $(this).removeClass('tapped');
                    if (!(opt && opt.nopreventDefault)) {
                        e.preventDefault();	//阻止浏览器默认事件，防止'点透'现象
                    }
                    return 0;
                }

                $(this).removeClass('tapped');
                var k = this;
                setTimeout(function () {
                    obj.fun.call(k, k);
                }, 0);
                if (!(opt && opt.noStopPropagation)) {
                    e.stopPropagation();
                }
            })
        }
        else {
            $dom.on(start_ev, function (e) {
                if(isTouchEnd){
                    clearTimeout(T.isTouchEndTimer);
                    T.isTouchEndTimer = setTimeout(function(){
                        isTouchEnd = false;
                    },799);
                }
                if(opt && opt.prevent){
                    e.preventDefault();
                }
                if(opt && opt.stop){
                    e.stopPropagation();
                }
                $(this).addClass('tapped');
                //800毫秒后如果未松手则触发长按事件
                var k = this,$k = $(this);
                if(opt && opt.isLongPress){
                    clearTimeout(T.longPressTimer);
                    T.longPressTimer = setTimeout(function(){
                        if(!isTouchEnd){
                            $k.removeClass('tapped');
                            setTimeout(function () {
                                obj.fun.call(k, k);
                            }, 0);
                            if (!(opt && opt.nopreventDefault)) {
                                e.preventDefault();	//阻止浏览器默认事件，防止'点透'现象
                            }
                            return 0;
                        }
                    },800);
                }
                g.beginTime = new Date().getTime();
                try {
                    g.x = e.changedTouches[0].clientX;
                    g.y = e.changedTouches[0].clientY;
                } catch (e) {
                }
            })
            $dom[(opt && opt.eventType ? opt.eventType:"on")](end_ev, function (e) {
                isTouchEnd = true;
                if(opt && opt.isLongPress){
                    return false;//长按事件不触发end_ev
                }
                g.endTime = new Date().getTime();
                try {
                    var diffX = Math.abs(g.x - e.changedTouches[0].clientX);
                    var diffY = Math.abs(g.y - e.changedTouches[0].clientY);
                    if (diffY < 16 && diffX < 16) {
                        ifMove = false;
                    } else {
                        ifMove = true;
                    }
                } catch (e) {
                }
                var isLongPress = false ;
                if(g.beginTime && g.endTime){
                    isLongPress = g.endTime - g.beginTime > 800 ;
                }

                if ((ifMove && end_ev == 'touchend') || isLongPress) {
                    ifMove = false;
                    $(this).removeClass('tapped');
                    if (!(opt && opt.nopreventDefault)) {
                        e.preventDefault();	//阻止浏览器默认事件，防止'点透'现象
                    }
                    return 0;
                }

                if (opt && opt.noRepeat) {
                    if ($dom.is('bt_disable') || ($dom.t && ((new Date()).getTime() - $dom.t) < 1000)) {
                        return;
                    }
                    $dom.t = (new Date()).getTime();
                }

                $(this).removeClass('tapped');
                var k = this;
                setTimeout(function () {
                    obj.fun.apply(k, [k, e]);
                }, 0);//ios在end_ev中如果有confirm或alert等，会产生下次点击其它元素触发上一个元素事件的BUG

                if (!(opt && opt.nopreventDefault)) {
                    e.preventDefault();	//阻止浏览器默认事件，防止'点透'现象
                }
            })
        }
    });
};

//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
    var prefix = '', eventPrefix,
        vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
        testEl = document.createElement('div'),
        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        transform,
        transitionProperty, transitionDuration, transitionTiming, transitionDelay,
        animationName, animationDuration, animationTiming, animationDelay,
        cssReset = {}

    function dasherize(str) { return str.replace(/([A-Z])/g, '-$1').toLowerCase() }
    function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

    if (testEl.style.transform === undefined) $.each(vendors, function(vendor, event){
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
            prefix = '-' + vendor.toLowerCase() + '-'
            eventPrefix = event
            return false
        }
    })

    transform = prefix + 'transform'
    cssReset[transitionProperty = prefix + 'transition-property'] =
        cssReset[transitionDuration = prefix + 'transition-duration'] =
            cssReset[transitionDelay    = prefix + 'transition-delay'] =
                cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
                    cssReset[animationName      = prefix + 'animation-name'] =
                        cssReset[animationDuration  = prefix + 'animation-duration'] =
                            cssReset[animationDelay     = prefix + 'animation-delay'] =
                                cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

    $.fx = {
        off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
        speeds: { _default: 400, fast: 200, slow: 600 },
        cssPrefix: prefix,
        transitionEnd: normalizeEvent('TransitionEnd'),
        animationEnd: normalizeEvent('AnimationEnd')
    }

    $.fn.animate = function(properties, duration, ease, callback, delay){
        if ($.isFunction(duration))
            callback = duration, ease = undefined, duration = undefined
        if ($.isFunction(ease))
            callback = ease, ease = undefined
        if ($.isPlainObject(duration))
            ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
        if (duration) duration = (typeof duration == 'number' ? duration :
                ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
        if (delay) delay = parseFloat(delay) / 1000
        return this.anim(properties, duration, ease, callback, delay)
    }

    $.fn.anim = function(properties, duration, ease, callback, delay){
        var key, cssValues = {}, cssProperties, transforms = '',
            that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
            fired = false

        if (duration === undefined) duration = $.fx.speeds._default / 1000
        if (delay === undefined) delay = 0
        if ($.fx.off) duration = 0

        if (typeof properties == 'string') {
            // keyframe animation
            cssValues[animationName] = properties
            cssValues[animationDuration] = duration + 's'
            cssValues[animationDelay] = delay + 's'
            cssValues[animationTiming] = (ease || 'linear')
            endEvent = $.fx.animationEnd
        } else {
            cssProperties = []
            // CSS transitions
            for (key in properties)
                if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
                else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

            if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
            if (duration > 0 && typeof properties === 'object') {
                cssValues[transitionProperty] = cssProperties.join(', ')
                cssValues[transitionDuration] = duration + 's'
                cssValues[transitionDelay] = delay + 's'
                cssValues[transitionTiming] = (ease || 'linear')
            }
        }

        wrappedCallback = function(event){
            if (typeof event !== 'undefined') {
                if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
                $(event.target).unbind(endEvent, wrappedCallback)
            } else
                $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

            fired = true
            $(this).css(cssReset)
            callback && callback.call(this)
        }
        if (duration > 0){
            this.bind(endEvent, wrappedCallback)
            // transitionEnd is not always firing on older Android phones
            // so make sure it gets fired
            setTimeout(function(){
                if (fired) return
                wrappedCallback.call(that)
            }, ((duration + delay) * 1000) + 25)
        }

        // trigger page reflow so new elements can animate
        this.size() && this.get(0).clientLeft

        this.css(cssValues)

        if (duration <= 0) setTimeout(function() {
            that.each(function(){ wrappedCallback.call(this) })
        }, 0)

        return this
    }

    testEl = null
})(Zepto)/**
 * Created by ys on 2017/12/27.
 */

;(function($){
    'use strict';
    var win = window;
    var doc = document;
    var isAll = false;
    var $win = $(win);
    var $doc = $(doc);
    var fontSize = parseFloat($('html').css('font-size'));
    $.fn.dropload = function(options){
        return new MyDropLoad(this, options);
    };
    var MyDropLoad = function(element, options){
        var me = this;
        me.$element = element;
        // 上方是否插入DOM
        me.upInsertDOM = false;
        // loading状态
        me.loading = false;
        // 是否锁定
        me.isLockUp = false;
        me.isLockDown = false;
        // 是否有数据
        me.isData = true;
        me._scrollTop = 0;
        me._threshold = 0;
        me.init(options);
    };

    // 初始化
    MyDropLoad.prototype.init = function(options){
        var me = this;
        me.opts = $.extend(true, {}, {
            scrollArea : me.$element,                                            // 滑动区域
            domUp : {                                                            // 上方DOM
                domClass   : 'dropload-up',
                domRefresh : '<div class="dropload-load"><span class="loading"></span></div>',
                domUpdate  : '<div class="dropload-load"><span class="loading"></span></div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span></div>'
            },
            domDown : {                                                          // 下方DOM
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>Refreshing</div>',
                domNoData  : '<div class="dropload-noData">暂无数据</div>'
            },
            autoLoad : true,                                                     // 自动加载
            distance : 50,                                                       // 拉动距离
            threshold : '',                                                      // 提前加载距离
            loadUpFn : '',                                                       // 上方function
            loadDownFn : ''                                                      // 下方function
        }, options);

        // 如果加载下方，事先在下方插入DOM
        if(me.opts.loadDownFn != ''){
            me.$element.append('<div class="'+me.opts.domDown.domClass+'">'+me.opts.domDown.domRefresh+'</div>');
            me.$domDown = $('.'+me.opts.domDown.domClass);
        }

        // 计算提前加载距离
        if(!!me.$domDown && me.opts.threshold === ''){
            // 默认滑到加载区2/3处时加载
            me._threshold = Math.floor(me.$domDown.height()*1/3);
        }else{
            me._threshold = me.opts.threshold;
        }

        // 判断滚动区域
        if(me.opts.scrollArea == win){
            me.$scrollArea = $win;
            // 获取文档高度
            me._scrollContentHeight = $doc.height();
            // 获取win显示区高度  —— 这里有坑
            me._scrollWindowHeight = doc.documentElement.clientHeight;
        }else{
            me.$scrollArea = me.opts.scrollArea;
            me._scrollContentHeight = me.$element[0].scrollHeight;
            me._scrollWindowHeight = me.$element.height();
        }
        if(me.opts.loadDownFn != ''){
            fnAutoLoad(me);
        }
        // 窗口调整
        $win.on('resize',function(){
            if(me.opts.scrollArea == win){
                // 重新获取win显示区高度
                me._scrollWindowHeight = win.innerHeight;
            }else{
                me._scrollWindowHeight = me.$element.height();
            }
        });

        // 绑定触摸
        me.$element.on('touchstart',function(e){
            if($(window).scrollTop()>0){isAll = true;return}else{isAll = false;}
            if(!me.loading){
                fnTouches(e);
                fnTouchstart(e, me);
            }
        });
        me.$element.on('touchmove',function(e){
            if(isAll){return}
            if(!me.loading){
                fnTouches(e, me);
                fnTouchmove(e, me);
            }
        });
        me.$element.on('touchend',function(){
            if(isAll){return}
            if(!me.loading){
                fnTouchend(me);
            }
        });

        // 加载下方
        if(me.opts.loadDownFn != ''){
            me.$scrollArea.on('scroll',function(){
                me._scrollTop = me.$scrollArea.scrollTop();
                // 滚动页面触发加载数据
                if(me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)){
                    loadDown(me);
                }
            });
        }
    };

    // touches
    function fnTouches(e){
        if(!e.touches){
            e.touches = e.originalEvent.touches;
        }
    }

    // touchstart
    function fnTouchstart(e, me){
        me._startY = e.touches[0].pageY;
        // 记住触摸时的scrolltop值
        me.touchScrollTop = me.$scrollArea.scrollTop();
    }
    var hasLoadFlag = false;
    // touchmove
    function fnTouchmove(e, me){
        me._curY = e.touches[0].pageY;
        me._moveY = me._curY - me._startY;

        if(me._moveY > 0){
            me.direction = 'down';
        }else if(me._moveY < 0){
            me.direction = 'up';
        }
        var _absMoveY = Math.abs(me._moveY);
        // 加载上方
        if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
            e.preventDefault();
            if(me.$element.attr('id')=='match-list' ||　me.$element.attr('id')=='myFollowContent'){//新版赛前列表和我的关注特殊处理
                // 如果加载区没有DOM
                if(!me.upInsertDOM){
                    $('#main').prepend('<div class="'+me.opts.domUp.domClass+'"></div>');
                    me.upInsertDOM = true;
                }
            }else{
                // 如果加载区没有DOM
                if(!me.upInsertDOM){
                    me.upInsertDOM = true;
                    me.$element.prepend('<div class="'+me.opts.domUp.domClass+'"></div>');
                }
            }
            me.$domUp = $('.'+me.opts.domUp.domClass);
            fnTransition(me.$domUp,0);

            // 下拉
            if(_absMoveY <= me.opts.distance){
                me._offsetY = _absMoveY;
                // move时会不断清空、增加dom，有可能影响性能，下同
                me.$domUp.html(me.opts.domUp.domRefresh);
                // 指定距离 < 下拉距离 < 指定距离*2
            }else if(_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance*2){
                me._offsetY = me.opts.distance+(_absMoveY-me.opts.distance)*0.5;
                me.$domUp.html(me.opts.domUp.domUpdate);
                // 下拉距离 > 指定距离*2
            }else{
                me._offsetY = me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2;
            }
            if(me._offsetY >= (98/75*fontSize)){
                me.$domUp.css({'opacity': (me._offsetY/1.5)/(98/75*fontSize)});
            }
            me.$domUp.css({'height': me._offsetY});
            console.log('---------me._curY'+me._curY+'头加内容:'+($('#goodscontent').height()*1+$('.navbar').height()*1));
            if(!hasLoadFlag && $('#goodscontent').length>0 && $('.navbar').length>0 && me._curY>($('#goodscontent').height()*1+$('.navbar').height()*1)){//竞拍大厅兼容
                hasLoadFlag = true;
                setTimeout(function () {
                    fnTransition(me.$domUp,300);
                    if(_absMoveY > me.opts.distance){
                        me.$domUp.css({'height':me.$domUp.children().height()});
                        me.$domUp.html(me.opts.domUp.domLoad);
                        me.loading = true;
                        me.opts.loadUpFn(me);
                    }else{
                        me.$domUp.length >0 && me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                            me.upInsertDOM = false;
                            $(this).remove();
                        });
                    }
                    me._moveY = 0;
                    me.$domUp.css({'height':'1.17rem'}); // 回复原有高度
                    hasLoadFlag = false;
                },800);
            }
        }
    }

    // touchend
    function fnTouchend(me){
        var _absMoveY = Math.abs(me._moveY);
        if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
            fnTransition(me.$domUp,300);

            if(_absMoveY > me.opts.distance){
                me.$domUp.css({'height':me.$domUp.children().height()});
                me.$domUp.html(me.opts.domUp.domLoad);
                me.loading = true;
                me.opts.loadUpFn(me);
            }else{
                me.$domUp.length >0 && me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                    me.upInsertDOM = false;
                    $(this).remove();
                });
            }
            me._moveY = 0;
            me.$domUp.css({'height':'1.17rem'}); // 回复原有高度
        }

    }

    // 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
    function fnAutoLoad(me){
        if(me.opts.autoLoad){
            if((me._scrollContentHeight - me._threshold) <= me._scrollWindowHeight){
                loadDown(me);
            }
        }
    }

    // 重新获取文档高度
    function fnRecoverContentHeight(me){
        if(me.opts.scrollArea == win){
            me._scrollContentHeight = $doc.height();
        }else{
            me._scrollContentHeight = me.$element[0].scrollHeight;
        }
    }

    // 加载下方
    function loadDown(me){
        me.direction = 'up';
        me.$domDown.html(me.opts.domDown.domLoad);
        me.loading = true;
        me.opts.loadDownFn(me);
    }

    // 锁定
    MyDropLoad.prototype.lock = function(direction){
        var me = this;
        // 如果不指定方向
        if(direction === undefined){
            // 如果操作方向向上
            if(me.direction == 'up'){
                me.isLockDown = true;
                // 如果操作方向向下
            }else if(me.direction == 'down'){
                me.isLockUp = true;
            }else{
                me.isLockUp = true;
                me.isLockDown = true;
            }
            // 如果指定锁上方
        }else if(direction == 'up'){
            me.isLockUp = true;
            // 如果指定锁下方
        }else if(direction == 'down'){
            me.isLockDown = true;
            // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
            me.direction = 'up';
        }
    };

    // 解锁
    MyDropLoad.prototype.unlock = function(){
        var me = this;
        // 简单粗暴解锁
        me.isLockUp = false;
        me.isLockDown = false;
        // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
        me.direction = 'up';
    };

    // 无数据
    MyDropLoad.prototype.noData = function(flag){
        var me = this;
        if(flag === undefined || flag == true){
            me.isData = false;
        }else if(flag == false){
            me.isData = true;
        }
    };

    // 重置
    MyDropLoad.prototype.resetload = function(){
        var me = this;
        if(me.direction == 'down' && me.upInsertDOM && me.$domUp.length>0){
           // var aFlag = true;
            me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
              //  aFlag = false;
                me.loading = false;
                me.upInsertDOM = false;
                $(this).remove();
                fnRecoverContentHeight(me);
            });
               /* setTimeout(function () {
                    if(aFlag){
                    console.log('88798989989')
                    me.loading = false;
                    me.upInsertDOM = false;
                    $(me.$domUp).remove();
                    fnRecoverContentHeight(me);}
                },1000)*/

        }else if(me.direction == 'up'){
            me.$domDown && me.$domDown.length >0 && me.$domDown.css({'height':'0'}).remove();
            /*me.loading = false;
             // 如果有数据
             if(me.isData){
             // 加载区修改样式
             me.$domDown.html(me.opts.domDown.domRefresh);
             fnRecoverContentHeight(me);
             fnAutoLoad(me);
             }else{
             // 如果没数据
             me.$domDown.html(me.opts.domDown.domNoData);
             }*/
        }
    };

    // css过渡
    function fnTransition(dom,num){
        dom.css({
            '-webkit-transition':'all '+num+'ms',
            'transition':'all '+num+'ms'
        });
    }
})(window.Zepto || window.jQuery);

;
(function(win, lib) {
    var doc = win.document;
    var ua = win.navigator.userAgent;
    var isIOS = (/iPhone|iPad|iPod/i).test(ua);
    var isAndroid = (/Android/i).test(ua);
    var osVersion = ua.match(/(?:IOS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i);
    var apiVersion = ua.match(/QAPP[\/\s](\d+[._]\d+[._]\d+)/);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var NativeApi = lib.nativeApi = win.NativeApi || (win.NativeApi = {});
    var inc = 1, iframePool = [], iframeLimit = 3;

    var LOCAL_PROTOCOL = 'hybrid';
    var WV_PROTOCOL = 'wv_hybrid';
    var IFRAME_PREFIX = 'iframe_';
    var SUCCESS_PREFIX = 'suc_';
    var FAILURE_PREFIX = 'err_';
    var DEFERRED_PREFIX = 'defer_';
    var PARAM_PREFIX = 'param_';
    var CHUNK_PREFIX = 'chunk_';
    var CALL_GC_TIME = 60 * 1000 * 10;
    var CHUNK_GC_TIME = 60 * 1000 * 10;
    var PARAM_GC_TIME = 60 * 1000;

    function compareVersion(v1, v2) {
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');

        for (var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i], 10), n2 = parseInt(v2[i], 10);

            if (window.isNaN(n1)) {
                n1 = 0;
            }
            if (window.isNaN(n2)) {
                n2 = 0;
            }
            if (n1 < n2) {
                return -1;
            } else if (n1 > n2) {
                return 1;
            }
        }
        return 0;
    }

    if (osVersion) {
        osVersion = (osVersion[1] || '0.0.0').replace(/\_/g, '.');
    } else {
        osVersion = '0.0.0';
    }

    if (apiVersion) {
        apiVersion = (apiVersion[1] || '0.0.0').replace(/\_/g, '.');
    } else {
        apiVersion = '0.0.0';
    }

    var API_Core = {
        isAvailable : compareVersion(apiVersion, '0') === 1,

        compareVersion : function(targetVersion) {
            return compareVersion(apiVersion, targetVersion) === 1;
        },
        call : function(obj, method, params, success, failure, timeout) {

            var sid;
            var defer;

            if (typeof arguments[arguments.length - 1] === 'number') {
                timeout = arguments[arguments.length - 1];
            }

            if (typeof success !== 'function') {
                success = null;
            }

            if (typeof failure !== 'function') {
                failure = null;
            }

            if (lib.promise) {
                defer = lib.promise.defer();
            }

            if (timeout > 0) {
                sid = setTimeout(function() {
                    API_Core.onFailure(sid, {
                        ret : 'TIMEOUT'
                    });
                }, timeout);
            } else {
                sid = API_Private.getSid();
            }

            API_Private.registerCall(sid, success, failure, defer);
            API_Private.registerGC(sid, timeout);
            API_Private.callMethod(obj, method, params, sid);

            if (defer) {
                return defer.promise;
            }
        },

        fireEvent : function(eventname, eventdata, sid) {
            var ev = doc.createEvent('HTMLEvents');
            ev.initEvent(eventname, false, true);
            ev.result = API_Private.parseData(eventdata
                || API_Private.getData(sid));

            doc.dispatchEvent(ev);
        },

        getParam : function(sid) {
            return API_Private.getParam(sid);
        },

        setData : function(sid, chunk) {
            API_Private.setData(sid, chunk);
        },

        onSuccess : function(sid, data) {
            console.log('onSuccess---' + "sid:" + sid + " data:" + data);
            API_Private.onComplete(sid, data, 'success');
        },

        onFailure : function(sid, data) {
            console.log('onFailure---' + "sid:" + sid + " data:" + data);
            API_Private.onComplete(sid, data, 'failure');
        }
    };

    var API_Private = {
        params : {},
        chunks : {},
        calls : {},

        getSid : function() {//65535
            //return Math.floor(Math.random() * (1 << 10)) + '' + inc++;
            return parseInt(Math.random()*65535,10)+1;
        },

        buildParam : function(obj) {
            if (obj && typeof obj === 'object') {
                return JSON.stringify(obj);
            } else {
                return obj || '';
            }
        },

        getParam : function(sid) {
            return this.params[PARAM_PREFIX + sid] || '';
        },

        setParam : function(sid, params) {
            this.params[PARAM_PREFIX + sid] = params;
        },

        parseData : function(str) {
            console.log('parseData---' + str);
            var rst;
            if (str && typeof str === 'string') {
                try {
                    rst = JSON.parse(str);
                } catch (e) {
                    console.log('parseData error---' + e);
                    rst = {
                        ret : [ 'WV_ERR::PARAM_PARSE_ERROR' ]
                    };
                }
            } else {
                rst = str || {};
            }

            return rst;
        },

        setData : function() {
            this.chunks[CHUNK_PREFIX + sid] = this.chunks[CHUNK_PREFIX + sid]
                || [];
            this.chunks[CHUNK_PREFIX + sid].push(chunk);
        },

        getData : function(sid) {
            if (this.chunks[CHUNK_PREFIX + sid]) {
                return this.chunks[CHUNK_PREFIX + sid].join('');
            } else {
                return '';
            }
        },

        registerCall : function(sid, success, failure, defer) {
            if (success) {
                this.calls[SUCCESS_PREFIX + sid] = success;
            }

            if (failure) {
                this.calls[FAILURE_PREFIX + sid] = failure;
            }

            if (defer) {
                this.calls[DEFERRED_PREFIX + sid] = defer;
            }
        },

        unregisterCall : function(sid) {
            var sucId = SUCCESS_PREFIX + sid;
            var failId = FAILURE_PREFIX + sid;
            var defId = DEFERRED_PREFIX + sid;
            var call = {};

            if (this.calls[sucId]) {
                call.success = this.calls[sucId];
                delete this.calls[sucId];
            }
            if (this.calls[failId]) {
                call.failure = this.calls[failId];
                delete this.calls[failId];
            }
            if (this.calls[defId]) {
                call.defer = this.calls[defId];
                delete this.calls[defId];
            }

            return call;
        },

        useIframe : function(sid, url) {
            var iframeid = IFRAME_PREFIX + sid;
            var iframe = iframePool.pop();

            if (!iframe) {
                iframe = doc.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.style.cssText = 'width:0;height:0;border:0;display:none;';
            }

            iframe.setAttribute('id', iframeid);
            iframe.setAttribute('src', url);

            if (!iframe.parentNode) {
                setTimeout(function() {
                    doc.body.appendChild(iframe);
                }, 5);
            }
        },

        retrieveIframe : function(sid) {
            var iframeid = IFRAME_PREFIX + sid;
            var iframe = doc.querySelector('#' + iframeid);

            if (iframePool.length >= iframeLimit) {
                doc.body.removeChild(iframe);
            } else {
                iframePool.push(iframe);
            }
        },

        callMethod : function(obj, method, params, sid) {
            params = API_Private.buildParam(params);
            console.log('call---' + "obj:" + obj + " method:" + method
                + " sid:" + sid + " params:" + params);
            var uri = LOCAL_PROTOCOL + '://' + obj + ':' + sid + '/' + method
                + '?' + params;

            if (isIOS) {
                this.setParam(sid, params);
                this.useIframe(sid, uri);
            } else if (isAndroid) {
                var value = WV_PROTOCOL + ':';
                window.prompt(uri, value);
            }
        },

        registerGC : function(sid, timeout) {
            var that = this;
            var callGCTime = Math.max(timeout || 0, CALL_GC_TIME);
            var paramGCTime = Math.max(timeout || 0, PARAM_GC_TIME);
            var chunkGCTime = Math.max(timeout || 0, CHUNK_GC_TIME);

            setTimeout(function() {
                that.unregisterCall(sid);
            }, callGCTime);

            if (isIOS) {
                setTimeout(function() {
                    if (that.params[PARAM_PREFIX + sid]) {
                        delete that.params[PARAM_PREFIX + sid];
                    }
                }, paramGCTime);
            } else if (isAndroid) {
                setTimeout(function() {
                    if (that.chunks[CHUNK_PREFIX + sid]) {
                        delete that.chunks[CHUNK_PREFIX + sid];
                    }
                }, chunkGCTime);
            }
        },

        onComplete : function(sid, data, type) {
            console.log('onComplete---' + "sid:" + sid + " data:" + data
                + " type:" + type);

            clearTimeout(sid);

            var call = this.unregisterCall(sid);
            var success = call.success;
            var failure = call.failure;
            var defer = call.defer;

            data = data ? data : this.getData(sid);
            data = this.parseData(data);

            var ret = data.ret;
            if (typeof ret === 'string') {
                data = data.value || data;
                if (!data.ret) {
                    data.ret = [ ret ];
                }
            }

            if (type === 'success') {
                success && success(data);
                defer && defer.resolve(data);
            } else if (type === 'failure') {
                failure && failure(data);
                defer && defer.reject(data);
            }

            if (isIOS) {
                this.retrieveIframe(sid);
                if (this.params[PARAM_PREFIX + sid]) {
                    delete this.params[PARAM_PREFIX + sid];
                }
            } else if (isAndroid) {
                if (this.chunks[CHUNK_PREFIX + sid]) {
                    delete this.chunks[CHUNK_PREFIX + sid];
                }
            }
        }
    };

    for ( var key in API_Core) {
        if (!hasOwnProperty.call(NativeApi, key)) {
            NativeApi[key] = API_Core[key];
        }
    }
})(window, window['lib'] || (window['lib'] = {}))

;
(function(win, lib) {

    var ua = win.navigator.userAgent, matched, appVersion;
    if (matched = ua.match(/QAPP[\/\s]([\d\.\_]+)/)) {
        appVersion = matched[1];
    }

    var NativeApi = lib.nativeApi, doc = document, isIOS = /iPhone|iPad|iPod/i
        .test(ua), isAndroid = /Android/i.test(ua), apiVersion = appVersion ? appVersion
        .split('.')
        : [ 0, 0, 0 ], returnValues = [ 'SUCCESS', 'NO_HANDLER',
        'PARAM_ERR', 'FAILED', 'NO_PERMISSION', 'TIMEOUT', 'CANCEL' ], uid = 0, shakeMaps = {}, loadingElemId = '_Loading';

    function comparVersion(targetVersion) {
        targetVersion = targetVersion.split('.');
        for (var i = 0, n1, n2; i < apiVersion.length; i++) {
            n1 = parseInt(targetVersion[i], 10) || 0;
            n2 = parseInt(apiVersion[i], 10) || 0;
            if (n1 > n2)
                return 1;
            if (n1 < n2)
                return -1;
        }
        return 0;
    }

    function isString(obj) {
        return typeof obj === 'string';
    }

    function isNumber(obj) {
        return typeof obj === 'number';
    }

    function isFunction(obj) {
        return typeof obj === 'function';
    }

    function nativeCall(api, params, success, failure, timeout) {
        api = api.split('.');
        var serviceName = api[0], methodName = api[1];
        NativeApi
        && NativeApi.call(serviceName, methodName, params, success,
            failure, timeout);
    }

    function wrapSuccess(callback, preprocessor) {
        return (callback || preprocessor) && function(result) {
                result = preprocessor && preprocessor(result) || result;
                callback && callback(wrapResult(result));
            }
    }

    function wrapFailure(callback) {
        return callback && function(error) {
                callback(wrapError(error));
            }
    }

    function wrapResult(result) {
        result = result || {};
        result.errorCode = 0;
        result.errorMessage = '';
        return result;
    }

    function wrapError(error) {
        var code = 5, msg = isString(error) ? error : error.code;
        if (error) {
            var index = returnValues.indexOf(msg);
            code = index > 0 ? index : code;
        }
        return {
            errorCode : code,
            errorMessage : msg,
            data : error
        };
    }

    var API = win.API = lib.API = {
        aliPay:function (options, callback) {
            console.log('alipay---' + JSON.stringify(options));
            nativeCall('IntentInterface.alipay', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        weixinPay:function (options, callback) {
            console.log('weixinPay---' + JSON.stringify(options));
            nativeCall('IntentInterface.weixinPay', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        thirdShare:function (options, callback) {
            console.log('thirdShare---' + JSON.stringify(options));
            nativeCall('IntentInterface.thirdShare', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        thirdLogin:function (options, callback) {
            console.log('thirdLogin---' + JSON.stringify(options));
            nativeCall('IntentInterface.thirdLogin', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        notifyRenderFinish: function(options, callback) {
            console.log('notifyRenderingFinish---' + JSON.stringify(options));
            nativeCall('IntentInterface.notifyRenderFinish', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        clearCache: function(options, callback) {
            console.log('clearCache---' + JSON.stringify(options));
            nativeCall('IntentInterface.clearCache', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        goTabbar : function(options, callback) {
            console.log('goTabbar---' + JSON.stringify(options));
            nativeCall('IntentInterface.goTabbar', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        sendToken : function(options, callback) {
            console.log('sendToken---' + JSON.stringify(options));
            nativeCall('IntentInterface.sendToken', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        LocationInterface:function(options,successCallback,errorCallback){
            console.log('LocationInterface---' + JSON.stringify(options));
            nativeCall('IntentInterface.LocationInterface', options,
                wrapSuccess(successCallback), wrapFailure(errorCallback));
        },
        showNativeTip:function(options, callback){
            console.log('showNativeTip---' + JSON.stringify(options));
            nativeCall('IntentInterface.showNativeTip', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openLogin : function(options, callback) {
            console.log('openLogin---' + JSON.stringify(options));
            nativeCall('IntentInterface.openLogin', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBetInfoPage : function(options, callback) {
            console.log('openBetInfoPage---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBetInfoPage', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBloggerPage : function(options, callback) {
            console.log('openBloggerPage---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBloggerPage', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBuyDiamond : function(options, callback) {
            console.log('openBuyDiamond---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBuyDiamond', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openNoteDetail : function(options, callback) {
            console.log('openNoteDetail---' + JSON.stringify(options));
            nativeCall('IntentInterface.openNoteDetail', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openInformationDetail : function(options, callback) {
            console.log('openInformationDetail---' + JSON.stringify(options));
            nativeCall('IntentInterface.openInformationDetail', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openYetService : function(options, callback) {
            console.log('openYetService---' + JSON.stringify(options));
            nativeCall('IntentInterface.openYetService', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openUserCenter : function(options, callback) {
            console.log('openUserCenter---' + JSON.stringify(options));
            nativeCall('IntentInterface.openUserCenter', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openJiePan : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('openJiePan---' + JSON.stringify(options));
            nativeCall('IntentInterface.openJiePan', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBindPhone : function(options, callback) {
            console.log('openBindPhone---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBindPhone', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openAddressSelect : function(options, callback) {//地址选择
            console.log('openAddressSelect---' + JSON.stringify(options));
            nativeCall('IntentInterface.openAddressSelect', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBetDetail : function(options, callback) {//打开比分内页投注详情
            console.log('openBetDetail---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBetDetail', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openBetRule : function(options, callback) {//打开比分内页玩法介绍
            console.log('openBetRule---' + JSON.stringify(options));
            nativeCall('IntentInterface.openBetRule', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openPlayGame : function(options, callback) {//打开原生比赛内页
            console.log('openPlayGame---' + JSON.stringify(options));
            nativeCall('IntentInterface.openPlayGame', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openPayView : function(options, callback) {
            console.log('openPayView---' + JSON.stringify(options));
            nativeCall('IntentInterface.openPayView', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        sendBetMinSign : function(options, callback) {//分享单场投注记录
            console.log('sendBetMinSign---' + JSON.stringify(options));
            nativeCall('IntentInterface.sendBetMinSign', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openAnyView : function(options, callback) {//打开任意一个带H5url的view fullScreen是否满屏（1是，0不是）heigh,width单位% radius单位px
            console.log('openAnyView---' + JSON.stringify(options));
            nativeCall('IntentInterface.openAnyView', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        gotoJingCai : function(options,callback){ //再来一单
            console.log('gotoJingCai---' + JSON.stringify(options));
            nativeCall('IntentInterface.gotoJingCai', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        getVerifyCode:function (options, callback) {
            options = options || {};
            nativeCall('webService.getVerifyCode', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        callPay : function(options, callback) {
            options = options || {};
            nativeCall('webService.callPay', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        showConfirm : function(options, callback) {
            console.log('showConfirm---' + JSON.stringify(options));
            nativeCall('DialogInterface.showConfirm', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        sendHttp : function(options, callback) {
            options = options || {};
            console.log('sendHttp---' + JSON.stringify(options));
            nativeCall('HttpActionInteface.sendHttp', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        getAppInfo : function(options, callback) {
            options = options || {};
            console.log('getAppInfo---' + JSON.stringify(options));
            nativeCall('DeviceInfoInterface.getAppInfo', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        eventListener : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('regiest---' + JSON.stringify(options));
            nativeCall('webService.eventListener', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openWindow : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('openWindow---' + JSON.stringify(options));
            nativeCall('webService.openWindow', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        closeWindow : function(options, callback) {
            options = options || {};
            console.log('closeWindow---' + JSON.stringify(options));
            nativeCall('webService.closeWindow', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        setWebViewTitle : function(options, callback) {
            options = isString(options) ? {
                url : options
            } : options;
            console.log('setWebViewTitle---' + JSON.stringify(options));
            nativeCall('webService.setWebViewTitle', options, wrapSuccess(callback),
                wrapFailure(callback));
        },
        goGame : function(options, callback) {
            console.log('goGame---' + JSON.stringify(options));
            nativeCall('IntentInterface.goGame', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openClubShare : function(options, callback){//生成俱乐部名片分享
            console.log('openClubShare---' + JSON.stringify(options));
            nativeCall('IntentInterface.openClubShare', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openRecommendIndex : function(options, callback){//到推荐首页
            console.log('openRecommendIndex---' + JSON.stringify(options));
            nativeCall('IntentInterface.openRecommendIndex', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openApplySpecialist : function(options, callback){
            console.log('openApplySpecialist---' + JSON.stringify(options));
            nativeCall('IntentInterface.openApplySpecialist', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        uploadImage : function(options, callback){
            console.log('PhotoInterface---' + JSON.stringify(options));
            nativeCall('PhotoInterface.uploadImage', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        toast : function(options, callback) {
            var text = isString(options) ? options : options && options.text;
            console.log('toast---' + text);
            nativeCall('DialogInterface.showToast', {
                msg : text
            }, wrapSuccess(callback), wrapFailure(callback));
        },
        showLoadding : function(options, callback){
            console.log('showLoadding---' + JSON.stringify(options));
            nativeCall('IntentInterface.showLoadding', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        share : function(options, callback) {
            console.log('share---' + JSON.stringify(options));
            nativeCall('IntentInterface.shareInfo', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        openszrz:function(options, callback){
            console.log('openszrz---' + JSON.stringify(options));
            nativeCall('IntentInterface.openszrz', options,
                wrapSuccess(callback), wrapFailure(callback));
        },
        geolocation : {
            /**
             * 获取当前的地理位置。
             */
            getCurrentPosition : function(options, callback) {
                options = options || {};
                nativeCall('LocationInterface.getLocation', options,
                    wrapSuccess(callback), wrapFailure(callback));
            }
        },

        network : {
            /**
             * 获取网络类型。 2G - 移动和联通GPRS或EDGE，电信CDMA 3G - 联通UMTS或HSDPA，电信EVDO
             */
            getType : function(callback) {
                nativeCall('DeviceInfoInterface.getNetworkInfo', '',
                    wrapSuccess(callback, function(result) {
                        var type = (result.network || ''), data = {
                            type : type,
                            isWifi : false,
                            is2G : false,
                            is3G : false,
                            isOnline : false
                        };
                        if (/WIFI/i.test(type)) {
                            data.isWifi = data.isOnline = true;
                        } else if (/GPRS|EDGE|CDMA/i.test(type)) {
                            data.is2G = data.isOnline = true;
                        } else if (/UMTS|HSDPA|EVDO/i.test(type)) {
                            data.is3G = data.isOnline = true;
                        }
                        data.isE = data.isG = data.isH = false;
                        data.networkAvailable = type != null && type != '';
                        return data;
                    }), wrapFailure(callback));
            }
        },

        photo : function(options, callback) {
            options = options || {};
            nativeCall('PhotoInterface.photo', options, wrapSuccess(callback,
                function(result) {
                    result.photo = result.resourceUrl;
                }), wrapFailure(callback));
        },

        showImage : function(options, callback) {
            options = options || {};
            nativeCall('PhotoInterface.showImage', options, wrapSuccess(
                callback, function(result) {
                    result.photo = result.resourceUrl;
                }), wrapFailure(callback));
        },

        mutiPhoto : function(options, callback) {
            options = options || {};
            nativeCall('PhotoInterface.mutiPhoto', options, wrapSuccess(
                callback, function(result) {
                    result.photo = result.resourceUrl;
                }), wrapFailure(callback));
        },

        contacts : {

            get : function(options, callback) {
                nativeCall('WVContacts.choose', null, wrapSuccess(callback,
                    function(result) {
                        var data = [ {
                            name : result.name,
                            phoneNumber : result.phone,
                            email : result.email
                        } ];
                        result.results = data;
                        return result;
                    }), wrapFailure(callback));
            }
        },

        showLoading : function(text, callback) {
            var elem = doc.getElementById(loadingElemId);
            if (!elem) {
                var div = doc.createElement('div');
                div.id = loadingElemId;
                div.style.cssText = 'position:absolute;width:100%;height:100%;left:0;top:0;background:url(http://a.tbcdn.cn/mw/base/styles/component/more/images/loading.gif) 50% 50% no-repeat;background-size:40px 16px;pointer-events:none;';
                elem = doc.createDocumentFragment();
                elem.appendChild(div);
            } else {
                elem.style.display = 'block';
            }
            doc.body.appendChild(elem);
            callback && callback(wrapResult(null));
        },

        hideLoading : function(callback) {
            var elem = doc.getElementById(loadingElemId);
            if (elem)
                elem.style.display = 'none';
            callback && callback(wrapResult(null));
        }
    };

    var geo = navigator.geolocation || (navigator.geolocation = {});
    if (!geo.getCurrentPosition)
        geo.getCurrentPosition = API.geolocation.getCurrentPosition;

})(window, window.lib || (window.lib = {}));

/*! lozad.js - v1.2.0 - 2018-01-24
 * https://github.com/ApoorvSaxena/lozad.js
 * Copyright (c) 2018 Apoorv Saxena; Licensed MIT */


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.lozad = factory());
}(this, (function () { 'use strict';

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    /**
     * Detect IE browser
     * @const {boolean}
     * @private
     */
    var isIE = document.documentMode;

    var defaultConfig = {
        rootMargin: '0px',
        threshold: 0,
        load: function load(element) {
            if (element.nodeName.toLowerCase() === 'picture') {
                var img = document.createElement('img');
                if (isIE && element.getAttribute('data-iesrc')) {
                    img.src = element.getAttribute('data-iesrc');
                }
                element.appendChild(img);
            }
            if (element.getAttribute('data-src')) {
                //element.src = element.getAttribute('data-src');
                var _img=$(element);
                //_img.attr('src','../img/goods/lazy_load.png');
                var newSrc =  _img.attr('data-src'); // 图片的src
                var img = new Image();
                img.src =newSrc;
                img.onload = (function () {
                    _img.attr('src',newSrc);
                    //element.setAttribute('data-loaded', true);
                })();

            }
            if (element.getAttribute('data-srcset')) {
                element.srcset = element.getAttribute('data-srcset');
            }
            if (element.getAttribute('data-background-image')) {
                element.style.backgroundImage = 'url(' + element.getAttribute('data-background-image') + ')';
            }
        }
    };

    function markAsLoaded(element) {
        //element.setAttribute('data-loaded', true);
        var _img=$(element);
        var newSrc =  _img.attr('data-src'); // 图片的src
        var img = new Image();
        img.src =newSrc;
        img.onload = (function () {
            element.setAttribute('data-loaded', true);
        })();
    }

    var isLoaded = function isLoaded(element) {
        return element.getAttribute('data-loaded') === 'true';
    };

    var onIntersection = function onIntersection(load) {
        return function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    observer.unobserve(entry.target);

                    if (!isLoaded(entry.target)) {
                        load(entry.target);
                        markAsLoaded(entry.target);
                    }
                }
            });
        };
    };

    var getElements = function getElements(selector) {
        if (selector instanceof Element) {
            return [selector];
        }
        if (selector instanceof NodeList) {
            return selector;
        }
        return document.querySelectorAll(selector);
    };

    var lozad = function () {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lozad';
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _defaultConfig$option = _extends({}, defaultConfig, options),
            rootMargin = _defaultConfig$option.rootMargin,
            threshold = _defaultConfig$option.threshold,
            load = _defaultConfig$option.load;

        var observer = void 0;

        if (window.IntersectionObserver) {
            observer = new IntersectionObserver(onIntersection(load), {
                rootMargin: rootMargin,
                threshold: threshold
            });
        }

        return {
            observe: function observe() {
                var elements = getElements(selector);

                for (var i = 0; i < elements.length; i++) {
                    if (isLoaded(elements[i])) {
                        continue;
                    }
                    if (observer) {
                        observer.observe(elements[i]);
                        continue;
                    }
                    load(elements[i]);
                    markAsLoaded(elements[i]);
                }
            },
            triggerLoad: function triggerLoad(element) {
                if (isLoaded(element)) {
                    return;
                }

                load(element);
                markAsLoaded(element);
            }
        };
    };

    return lozad;

})));
function Swipe(R,Z){var Y=function(){};var H=function(a){setTimeout(a||Y,0)};var M={addEventListener:!!window.addEventListener,touch:("ontouchstart" in window)||window.DocumentTouch&&document instanceof DocumentTouch,transitions:(function(c){var a=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var b in a){if(c.style[a[b]]!==undefined){return true}}return false})(document.createElement("swipe"))};if(!R){return}var ab=R.children[0];var J,aa,K,X;Z=Z||{};var T=parseInt(Z.startSlide,10)||0;var G=Z.speed||300;Z.continuous=Z.continuous!==undefined?Z.continuous:true;function Q(){J=ab.children;X=J.length;if(J.length<2){Z.continuous=false}if(M.transitions&&Z.continuous&&J.length<3){ab.appendChild(J[0].cloneNode(true));ab.appendChild(ab.children[1].cloneNode(true));J=ab.children}aa=new Array(J.length);K=R.getBoundingClientRect().width||R.offsetWidth;ab.style.width=(J.length*K)+"px";var a=J.length;while(a--){var b=J[a];b.style.width=K+"px";b.setAttribute("data-index",a);if(M.transitions){b.style.left=(a*-K)+"px";L(a,T>a?-K:(T<a?K:0),0)}}if(Z.continuous&&M.transitions){L(V(T-1),-K,0);L(V(T+1),K,0)}if(!M.transitions){ab.style.left=(T*-K)+"px"}R.style.visibility="visible"}function P(){if(Z.continuous){ad(T-1)}else{if(T){ad(T-1)}}}function O(){if(Z.continuous){ad(T+1)}else{if(T<J.length-1){ad(T+1)}}}function V(a){return(J.length+(a%J.length))%J.length}function ad(a,d){if(T==a){return}if(M.transitions){var b=Math.abs(T-a)/(T-a);if(Z.continuous){var e=b;b=-aa[V(a)]/K;if(b!==e){a=-b*J.length+a}}var c=Math.abs(T-a)-1;while(c--){L(V((a>T?a:T)-c-1),K*b,0)}a=V(a);L(T,K*b,d||G);L(a,0,d||G);if(Z.continuous){L(V(a-b),-(K*b),0)}}else{a=V(a);U(T*-K,a*-K,d||G)}T=a;H(Z.callback&&Z.callback(T,J[T]))}function L(c,a,b){S(c,a,b);aa[c]=a}function S(d,a,b){var e=J[d];var c=e&&e.style;if(!c){return}c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms";c.webkitTransform="translate("+a+"px,0)translateZ(0)";c.msTransform=c.MozTransform=c.OTransform="translateX("+a+"px)"}function U(a,b,e){if(!e){ab.style.left=b+"px";return}var c=+new Date;var d=setInterval(function(){var f=+new Date-c;if(f>e){ab.style.left=b+"px";if(N){E()}Z.transitionEnd&&Z.transitionEnd.call(event,T,J[T]);clearInterval(d);return}ab.style.left=(((b-a)*(Math.floor((f/e)*100)/100))+a)+"px"},4)}var N=Z.auto||0;var F;function E(){F=setTimeout(O,N)}function I(){N=0;clearTimeout(F)}var W={};var D={};var C;var ac={handleEvent:function(a){switch(a.type){case"touchstart":this.start(a);break;case"touchmove":this.move(a);break;case"touchend":H(this.end(a));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":H(this.transitionEnd(a));break;case"resize":H(Q);break}if(Z.stopPropagation){a.stopPropagation()}},start:function(b){var a=b.touches[0];W={x:a.pageX,y:a.pageY,time:+new Date};C=undefined;D={};ab.addEventListener("touchmove",this,false);ab.addEventListener("touchend",this,false)},move:function(b){if(b.touches.length>1||b.scale&&b.scale!==1){return}if(Z.disableScroll){b.preventDefault()}var a=b.touches[0];D={x:a.pageX-W.x,y:a.pageY-W.y};if(typeof C=="undefined"){C=!!(C||Math.abs(D.x)<Math.abs(D.y))}if(!C){b.preventDefault();I();if(Z.continuous){S(V(T-1),D.x+aa[V(T-1)],0);S(T,D.x+aa[T],0);S(V(T+1),D.x+aa[V(T+1)],0)}else{D.x=D.x/((!T&&D.x>0||T==J.length-1&&D.x<0)?(Math.abs(D.x)/K+1):1);S(T-1,D.x+aa[T-1],0);S(T,D.x+aa[T],0);S(T+1,D.x+aa[T+1],0)}}},end:function(c){var a=+new Date-W.time;var d=Number(a)<250&&Math.abs(D.x)>20||Math.abs(D.x)>K/2;var e=!T&&D.x>0||T==J.length-1&&D.x<0;if(Z.continuous){e=false}var b=D.x<0;if(!C){if(d&&!e){if(b){if(Z.continuous){L(V(T-1),-K,0);L(V(T+2),K,0)}else{L(T-1,-K,0)}L(T,aa[T]-K,G);L(V(T+1),aa[V(T+1)]-K,G);T=V(T+1)}else{if(Z.continuous){L(V(T+1),K,0);L(V(T-2),-K,0)}else{L(T+1,K,0)}L(T,aa[T]+K,G);L(V(T-1),aa[V(T-1)]+K,G);T=V(T-1)}Z.callback&&Z.callback(T,J[T])}else{if(Z.continuous){L(V(T-1),-K,G);L(T,0,G);L(V(T+1),K,G)}else{L(T-1,-K,G);L(T,0,G);L(T+1,K,G)}}}ab.removeEventListener("touchmove",ac,false);ab.removeEventListener("touchend",ac,false)},transitionEnd:function(a){if(parseInt(a.target.getAttribute("data-index"),10)==T){if(N){E()}Z.transitionEnd&&Z.transitionEnd.call(a,T,J[T])}}};Q();if(N){E()}if(M.addEventListener){if(M.touch){ab.addEventListener("touchstart",ac,false)}if(M.transitions){ab.addEventListener("webkitTransitionEnd",ac,false);ab.addEventListener("msTransitionEnd",ac,false);ab.addEventListener("oTransitionEnd",ac,false);ab.addEventListener("otransitionend",ac,false);ab.addEventListener("transitionend",ac,false)}window.addEventListener("resize",ac,false)}else{window.onresize=function(){Q()}}return{setup:function(){Q()},slide:function(a,b){I();ad(a,b)},prev:function(){I();P()},next:function(){I();O()},stop:function(){I()},getPos:function(){return T},getNumSlides:function(){return X},kill:function(){I();ab.style.width="";ab.style.left="";var a=J.length;while(a--){var b=J[a];b.style.width="";b.style.left="";if(M.transitions){S(a,0,0)}}if(M.addEventListener){ab.removeEventListener("touchstart",ac,false);ab.removeEventListener("webkitTransitionEnd",ac,false);ab.removeEventListener("msTransitionEnd",ac,false);ab.removeEventListener("oTransitionEnd",ac,false);ab.removeEventListener("otransitionend",ac,false);ab.removeEventListener("transitionend",ac,false);window.removeEventListener("resize",ac,false)}else{window.onresize=null}}}}if(window.jQuery||window.Zepto){(function(b){b.fn.Swipe=function(a){return this.each(function(){b(this).data("Swipe",new Swipe(b(this)[0],a))})}})(window.jQuery||window.Zepto)};
/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/


// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho.MQTT module
// only has a single public function, client, which returns
// a Paho.MQTT client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.MQTT.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.MQTT.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
 client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
 client.onConnectionLost = onConnectionLost;
 client.onMessageArrived = onMessageArrived;
 client.connect({onSuccess:onConnect});

 function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
 function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
	console.log("onConnectionLost:"+responseObject.errorMessage);
};
 function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
 * </pre></code>
 * @namespace Paho.MQTT
 */

if (typeof Paho === "undefined") {
    Paho = {};
}

Paho.MQTT = (function (global) {

    // Private variables below, these are only visible inside the function closure
    // which is used to define the module.

    var version = "@VERSION@";
    var buildLevel = "@BUILDLEVEL@";

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var MESSAGE_TYPE = {
        CONNECT: 1,
        CONNACK: 2,
        PUBLISH: 3,
        PUBACK: 4,
        PUBREC: 5,
        PUBREL: 6,
        PUBCOMP: 7,
        SUBSCRIBE: 8,
        SUBACK: 9,
        UNSUBSCRIBE: 10,
        UNSUBACK: 11,
        PINGREQ: 12,
        PINGRESP: 13,
        DISCONNECT: 14
    };

    // Collection of utility methods used to simplify module code
    // and promote the DRY pattern.

    /**
     * Validate an object's parameter names to ensure they
     * match a list of expected variables name for this option
     * type. Used to ensure option object passed into the API don't
     * contain erroneous parameters.
     * @param {Object} obj - User options object
     * @param {Object} keys - valid keys and types that may exist in obj.
     * @throws {Error} Invalid option parameter found.
     * @private
     */
    var validate = function(obj, keys) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (keys.hasOwnProperty(key)) {
                    if (typeof obj[key] !== keys[key])
                        throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
                } else {
                    var errorStr = "Unknown property, " + key + ". Valid properties are:";
                    for (var key in keys)
                        if (keys.hasOwnProperty(key))
                            errorStr = errorStr+" "+key;
                    throw new Error(errorStr);
                }
            }
        }
    };

    /**
     * Return a new function which runs the user function bound
     * to a fixed scope.
     * @param {function} User function
     * @param {object} Function scope
     * @return {function} User function bound to another scope
     * @private
     */
    var scope = function (f, scope) {
        return function () {
            return f.apply(scope, arguments);
        };
    };

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var ERROR = {
        OK: {code:0, text:"AMQJSC0000I OK."},
        CONNECT_TIMEOUT: {code:1, text:"AMQJSC0001E Connect timed out."},
        SUBSCRIBE_TIMEOUT: {code:2, text:"AMQJS0002E Subscribe timed out."},
        UNSUBSCRIBE_TIMEOUT: {code:3, text:"AMQJS0003E Unsubscribe timed out."},
        PING_TIMEOUT: {code:4, text:"AMQJS0004E Ping timed out."},
        INTERNAL_ERROR: {code:5, text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},
        CONNACK_RETURNCODE: {code:6, text:"AMQJS0006E Bad Connack return code:{0} {1}."},
        SOCKET_ERROR: {code:7, text:"AMQJS0007E Socket error:{0}."},
        SOCKET_CLOSE: {code:8, text:"AMQJS0008I Socket closed."},
        MALFORMED_UTF: {code:9, text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},
        UNSUPPORTED: {code:10, text:"AMQJS0010E {0} is not supported by this browser."},
        INVALID_STATE: {code:11, text:"AMQJS0011E Invalid state {0}."},
        INVALID_TYPE: {code:12, text:"AMQJS0012E Invalid type {0} for {1}."},
        INVALID_ARGUMENT: {code:13, text:"AMQJS0013E Invalid argument {0} for {1}."},
        UNSUPPORTED_OPERATION: {code:14, text:"AMQJS0014E Unsupported operation."},
        INVALID_STORED_DATA: {code:15, text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},
        INVALID_MQTT_MESSAGE_TYPE: {code:16, text:"AMQJS0016E Invalid MQTT message type {0}."},
        MALFORMED_UNICODE: {code:17, text:"AMQJS0017E Malformed Unicode string:{0} {1}."},
    };

    /** CONNACK RC Meaning. */
    var CONNACK_RC = {
        0:"Connection Accepted",
        1:"Connection Refused: unacceptable protocol version",
        2:"Connection Refused: identifier rejected",
        3:"Connection Refused: server unavailable",
        4:"Connection Refused: bad user name or password",
        5:"Connection Refused: not authorized"
    };

    /**
     * Format an error message text.
     * @private
     * @param {error} ERROR.KEY value above.
     * @param {substitutions} [array] substituted into the text.
     * @return the text with the substitutions made.
     */
    var format = function(error, substitutions) {
        var text = error.text;
        if (substitutions) {
            var field,start;
            for (var i=0; i<substitutions.length; i++) {
                field = "{"+i+"}";
                start = text.indexOf(field);
                if(start > 0) {
                    var part1 = text.substring(0,start);
                    var part2 = text.substring(start+field.length);
                    text = part1+substitutions[i]+part2;
                }
            }
        }
        return text;
    };

    //MQTT protocol and version          6    M    Q    I    s    d    p    3
    var MqttProtoIdentifierv3 = [0x00,0x06,0x4d,0x51,0x49,0x73,0x64,0x70,0x03];
    //MQTT proto/version for 311         4    M    Q    T    T    4
    var MqttProtoIdentifierv4 = [0x00,0x04,0x4d,0x51,0x54,0x54,0x04];

    /**
     * Construct an MQTT wire protocol message.
     * @param type MQTT packet type.
     * @param options optional wire message attributes.
     *
     * Optional properties
     *
     * messageIdentifier: message ID in the range [0..65535]
     * payloadMessage:	Application Message - PUBLISH only
     * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
     * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
     * requestQoS:		array of QoS values [0..2]
     *
     * "Flag" properties
     * cleanSession:	true if present / false if absent (CONNECT)
     * willMessage:  	true if present / false if absent (CONNECT)
     * isRetained:		true if present / false if absent (CONNECT)
     * userName:		true if present / false if absent (CONNECT)
     * password:		true if present / false if absent (CONNECT)
     * keepAliveInterval:	integer [0..65535]  (CONNECT)
     *
     * @private
     * @ignore
     */
    var WireMessage = function (type, options) {
        this.type = type;
        for (var name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name];
            }
        }
    };

    WireMessage.prototype.encode = function() {
        // Compute the first byte of the fixed header
        var first = ((this.type & 0x0f) << 4);

        /*
         * Now calculate the length of the variable header + payload by adding up the lengths
         * of all the component parts
         */

        var remLength = 0;
        var topicStrLength = new Array();
        var destinationNameLength = 0;

        // if the message contains a messageIdentifier then we need two bytes for that
        if (this.messageIdentifier != undefined)
            remLength += 2;

        switch(this.type) {
            // If this a Connect then we need to include 12 bytes for its header
            case MESSAGE_TYPE.CONNECT:
                switch(this.mqttVersion) {
                    case 3:
                        remLength += MqttProtoIdentifierv3.length + 3;
                        break;
                    case 4:
                        remLength += MqttProtoIdentifierv4.length + 3;
                        break;
                }

                remLength += UTF8Length(this.clientId) + 2;
                if (this.willMessage != undefined) {
                    remLength += UTF8Length(this.willMessage.destinationName) + 2;
                    // Will message is always a string, sent as UTF-8 characters with a preceding length.
                    var willMessagePayloadBytes = this.willMessage.payloadBytes;
                    if (!(willMessagePayloadBytes instanceof Uint8Array))
                        willMessagePayloadBytes = new Uint8Array(payloadBytes);
                    remLength += willMessagePayloadBytes.byteLength +2;
                }
                if (this.userName != undefined)
                    remLength += UTF8Length(this.userName) + 2;
                if (this.password != undefined)
                    remLength += UTF8Length(this.password) + 2;
                break;

            // Subscribe, Unsubscribe can both contain topic strings
            case MESSAGE_TYPE.SUBSCRIBE:
                first |= 0x02; // Qos = 1;
                for ( var i = 0; i < this.topics.length; i++) {
                    topicStrLength[i] = UTF8Length(this.topics[i]);
                    remLength += topicStrLength[i] + 2;
                }
                remLength += this.requestedQos.length; // 1 byte for each topic's Qos
                // QoS on Subscribe only
                break;

            case MESSAGE_TYPE.UNSUBSCRIBE:
                first |= 0x02; // Qos = 1;
                for ( var i = 0; i < this.topics.length; i++) {
                    topicStrLength[i] = UTF8Length(this.topics[i]);
                    remLength += topicStrLength[i] + 2;
                }
                break;

            case MESSAGE_TYPE.PUBREL:
                first |= 0x02; // Qos = 1;
                break;

            case MESSAGE_TYPE.PUBLISH:
                if (this.payloadMessage.duplicate) first |= 0x08;
                first  = first |= (this.payloadMessage.qos << 1);
                if (this.payloadMessage.retained) first |= 0x01;
                destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
                remLength += destinationNameLength + 2;
                var payloadBytes = this.payloadMessage.payloadBytes;
                remLength += payloadBytes.byteLength;
                if (payloadBytes instanceof ArrayBuffer)
                    payloadBytes = new Uint8Array(payloadBytes);
                else if (!(payloadBytes instanceof Uint8Array))
                    payloadBytes = new Uint8Array(payloadBytes.buffer);
                break;

            case MESSAGE_TYPE.DISCONNECT:
                break;

            default:
                ;
        }

        // Now we can allocate a buffer for the message

        var mbi = encodeMBI(remLength);  // Convert the length to MQTT MBI format
        var pos = mbi.length + 1;        // Offset of start of variable header
        var buffer = new ArrayBuffer(remLength + pos);
        var byteStream = new Uint8Array(buffer);    // view it as a sequence of bytes

        //Write the fixed header into the buffer
        byteStream[0] = first;
        byteStream.set(mbi,1);

        // If this is a PUBLISH then the variable header starts with a topic
        if (this.type == MESSAGE_TYPE.PUBLISH)
            pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
        // If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

        else if (this.type == MESSAGE_TYPE.CONNECT) {
            switch (this.mqttVersion) {
                case 3:
                    byteStream.set(MqttProtoIdentifierv3, pos);
                    pos += MqttProtoIdentifierv3.length;
                    break;
                case 4:
                    byteStream.set(MqttProtoIdentifierv4, pos);
                    pos += MqttProtoIdentifierv4.length;
                    break;
            }
            var connectFlags = 0;
            if (this.cleanSession)
                connectFlags = 0x02;
            if (this.willMessage != undefined ) {
                connectFlags |= 0x04;
                connectFlags |= (this.willMessage.qos<<3);
                if (this.willMessage.retained) {
                    connectFlags |= 0x20;
                }
            }
            if (this.userName != undefined)
                connectFlags |= 0x80;
            if (this.password != undefined)
                connectFlags |= 0x40;
            byteStream[pos++] = connectFlags;
            pos = writeUint16 (this.keepAliveInterval, byteStream, pos);
        }

        // Output the messageIdentifier - if there is one
        if (this.messageIdentifier != undefined)
            pos = writeUint16 (this.messageIdentifier, byteStream, pos);

        switch(this.type) {
            case MESSAGE_TYPE.CONNECT:
                pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
                if (this.willMessage != undefined) {
                    pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
                    pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
                    byteStream.set(willMessagePayloadBytes, pos);
                    pos += willMessagePayloadBytes.byteLength;

                }
                if (this.userName != undefined)
                    pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
                if (this.password != undefined)
                    pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
                break;

            case MESSAGE_TYPE.PUBLISH:
                // PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
                byteStream.set(payloadBytes, pos);

                break;

//    	    case MESSAGE_TYPE.PUBREC:
//    	    case MESSAGE_TYPE.PUBREL:
//    	    case MESSAGE_TYPE.PUBCOMP:
//    	    	break;

            case MESSAGE_TYPE.SUBSCRIBE:
                // SUBSCRIBE has a list of topic strings and request QoS
                for (var i=0; i<this.topics.length; i++) {
                    pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                    byteStream[pos++] = this.requestedQos[i];
                }
                break;

            case MESSAGE_TYPE.UNSUBSCRIBE:
                // UNSUBSCRIBE has a list of topic strings
                for (var i=0; i<this.topics.length; i++)
                    pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                break;

            default:
            // Do nothing.
        }

        return buffer;
    }

    function decodeMessage(input,pos) {
        var startingPos = pos;
        var first = input[pos];
        var type = first >> 4;
        var messageInfo = first &= 0x0f;
        pos += 1;


        // Decode the remaining length (MBI format)

        var digit;
        var remLength = 0;
        var multiplier = 1;
        do {
            if (pos == input.length) {
                return [null,startingPos];
            }
            digit = input[pos++];
            remLength += ((digit & 0x7F) * multiplier);
            multiplier *= 128;
        } while ((digit & 0x80) != 0);

        var endPos = pos+remLength;
        if (endPos > input.length) {
            return [null,startingPos];
        }

        var wireMessage = new WireMessage(type);
        switch(type) {
            case MESSAGE_TYPE.CONNACK:
                var connectAcknowledgeFlags = input[pos++];
                if (connectAcknowledgeFlags & 0x01)
                    wireMessage.sessionPresent = true;
                wireMessage.returnCode = input[pos++];
                break;

            case MESSAGE_TYPE.PUBLISH:
                var qos = (messageInfo >> 1) & 0x03;

                var len = readUint16(input, pos);
                pos += 2;
                var topicName = parseUTF8(input, pos, len);
                pos += len;
                // If QoS 1 or 2 there will be a messageIdentifier
                if (qos > 0) {
                    wireMessage.messageIdentifier = readUint16(input, pos);
                    pos += 2;
                }

                var message = new Paho.MQTT.Message(input.subarray(pos, endPos));
                if ((messageInfo & 0x01) == 0x01)
                    message.retained = true;
                if ((messageInfo & 0x08) == 0x08)
                    message.duplicate =  true;
                message.qos = qos;
                message.destinationName = topicName;
                wireMessage.payloadMessage = message;
                break;

            case  MESSAGE_TYPE.PUBACK:
            case  MESSAGE_TYPE.PUBREC:
            case  MESSAGE_TYPE.PUBREL:
            case  MESSAGE_TYPE.PUBCOMP:
            case  MESSAGE_TYPE.UNSUBACK:
                wireMessage.messageIdentifier = readUint16(input, pos);
                break;

            case  MESSAGE_TYPE.SUBACK:
                wireMessage.messageIdentifier = readUint16(input, pos);
                pos += 2;
                wireMessage.returnCode = input.subarray(pos, endPos);
                break;

            default:
                ;
        }

        return [wireMessage,endPos];
    }

    function writeUint16(input, buffer, offset) {
        buffer[offset++] = input >> 8;      //MSB
        buffer[offset++] = input % 256;     //LSB
        return offset;
    }

    function writeString(input, utf8Length, buffer, offset) {
        offset = writeUint16(utf8Length, buffer, offset);
        stringToUTF8(input, buffer, offset);
        return offset + utf8Length;
    }

    function readUint16(buffer, offset) {
        return 256*buffer[offset] + buffer[offset+1];
    }

    /**
     * Encodes an MQTT Multi-Byte Integer
     * @private
     */
    function encodeMBI(number) {
        var output = new Array(1);
        var numBytes = 0;

        do {
            var digit = number % 128;
            number = number >> 7;
            if (number > 0) {
                digit |= 0x80;
            }
            output[numBytes++] = digit;
        } while ( (number > 0) && (numBytes<4) );

        return output;
    }

    /**
     * Takes a String and calculates its length in bytes when encoded in UTF8.
     * @private
     */
    function UTF8Length(input) {
        var output = 0;
        for (var i = 0; i<input.length; i++)
        {
            var charCode = input.charCodeAt(i);
            if (charCode > 0x7FF)
            {
                // Surrogate pair means its a 4 byte character
                if (0xD800 <= charCode && charCode <= 0xDBFF)
                {
                    i++;
                    output++;
                }
                output +=3;
            }
            else if (charCode > 0x7F)
                output +=2;
            else
                output++;
        }
        return output;
    }

    /**
     * Takes a String and writes it into an array as UTF8 encoded bytes.
     * @private
     */
    function stringToUTF8(input, output, start) {
        var pos = start;
        for (var i = 0; i<input.length; i++) {
            var charCode = input.charCodeAt(i);

            // Check for a surrogate pair.
            if (0xD800 <= charCode && charCode <= 0xDBFF) {
                var lowCharCode = input.charCodeAt(++i);
                if (isNaN(lowCharCode)) {
                    throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
                }
                charCode = ((charCode - 0xD800)<<10) + (lowCharCode - 0xDC00) + 0x10000;

            }

            if (charCode <= 0x7F) {
                output[pos++] = charCode;
            } else if (charCode <= 0x7FF) {
                output[pos++] = charCode>>6  & 0x1F | 0xC0;
                output[pos++] = charCode     & 0x3F | 0x80;
            } else if (charCode <= 0xFFFF) {
                output[pos++] = charCode>>12 & 0x0F | 0xE0;
                output[pos++] = charCode>>6  & 0x3F | 0x80;
                output[pos++] = charCode     & 0x3F | 0x80;
            } else {
                output[pos++] = charCode>>18 & 0x07 | 0xF0;
                output[pos++] = charCode>>12 & 0x3F | 0x80;
                output[pos++] = charCode>>6  & 0x3F | 0x80;
                output[pos++] = charCode     & 0x3F | 0x80;
            };
        }
        return output;
    }

    function parseUTF8(input, offset, length) {
        var output = "";
        var utf16;
        var pos = offset;

        while (pos < offset+length)
        {
            var byte1 = input[pos++];
            if (byte1 < 128)
                utf16 = byte1;
            else
            {
                var byte2 = input[pos++]-128;
                if (byte2 < 0)
                    throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16),""]));
                if (byte1 < 0xE0)             // 2 byte character
                    utf16 = 64*(byte1-0xC0) + byte2;
                else
                {
                    var byte3 = input[pos++]-128;
                    if (byte3 < 0)
                        throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
                    if (byte1 < 0xF0)        // 3 byte character
                        utf16 = 4096*(byte1-0xE0) + 64*byte2 + byte3;
                    else
                    {
                        var byte4 = input[pos++]-128;
                        if (byte4 < 0)
                            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                        if (byte1 < 0xF8)        // 4 byte character
                            utf16 = 262144*(byte1-0xF0) + 4096*byte2 + 64*byte3 + byte4;
                        else                     // longer encodings are not supported
                            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                    }
                }
            }

            if (utf16 > 0xFFFF)   // 4 byte character - express as a surrogate pair
            {
                utf16 -= 0x10000;
                output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
                utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
            }
            output += String.fromCharCode(utf16);
        }
        return output;
    }

    /**
     * Repeat keepalive requests, monitor responses.
     * @ignore
     */
    var Pinger = function(client, window, keepAliveInterval) {
        this._client = client;
        this._window = window;
        this._keepAliveInterval = keepAliveInterval*1000;
        this.isReset = false;

        var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

        var doTimeout = function (pinger) {
            return function () {
                return doPing.apply(pinger);
            };
        };

        /** @ignore */
        var doPing = function() {
            if (!this.isReset) {
                this._client._trace("Pinger.doPing", "Timed out");
                this._client._disconnected( ERROR.PING_TIMEOUT.code , format(ERROR.PING_TIMEOUT));
            } else {
                this.isReset = false;
                this._client._trace("Pinger.doPing", "send PINGREQ");
                this._client.socket.send(pingReq);
                this.timeout = this._window.setTimeout(doTimeout(this), this._keepAliveInterval);
            }
        }

        this.reset = function() {
            this.isReset = true;
            this._window.clearTimeout(this.timeout);
            if (this._keepAliveInterval > 0)
                this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
        }

        this.cancel = function() {
            this._window.clearTimeout(this.timeout);
        }
    };

    /**
     * Monitor request completion.
     * @ignore
     */
    var Timeout = function(client, window, timeoutSeconds, action, args) {
        this._window = window;
        if (!timeoutSeconds)
            timeoutSeconds = 30;

        var doTimeout = function (action, client, args) {
            return function () {
                return action.apply(client, args);
            };
        };
        this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

        this.cancel = function() {
            this._window.clearTimeout(this.timeout);
        }
    };

    /*
     * Internal implementation of the Websockets MQTT V3.1 client.
     *
     * @name Paho.MQTT.ClientImpl @constructor
     * @param {String} host the DNS nameof the webSocket host.
     * @param {Number} port the port number for that host.
     * @param {String} clientId the MQ client identifier.
     */
    var ClientImpl = function (uri, host, port, path, clientId) {
        // Check dependencies are satisfied in this browser.
        if (!("WebSocket" in global && global["WebSocket"] !== null)) {
            throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
        }
        if (!("localStorage" in global && global["localStorage"] !== null)) {
            throw new Error(format(ERROR.UNSUPPORTED, ["localStorage"]));
        }
        if (!("ArrayBuffer" in global && global["ArrayBuffer"] !== null)) {
            throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
        }
        this._trace("Paho.MQTT.Client", uri, host, port, path, clientId);

        this.host = host;
        this.port = port;
        this.path = path;
        this.uri = uri;
        this.clientId = clientId;

        // Local storagekeys are qualified with the following string.
        // The conditional inclusion of path in the key is for backward
        // compatibility to when the path was not configurable and assumed to
        // be /mqtt
        this._localKey=host+":"+port+(path!="/mqtt"?":"+path:"")+":"+clientId+":";

        // Create private instance-only message queue
        // Internal queue of messages to be sent, in sending order.
        this._msg_queue = [];

        // Messages we have sent and are expecting a response for, indexed by their respective message ids.
        this._sentMessages = {};

        // Messages we have received and acknowleged and are expecting a confirm message for
        // indexed by their respective message ids.
        this._receivedMessages = {};

        // Internal list of callbacks to be executed when messages
        // have been successfully sent over web socket, e.g. disconnect
        // when it doesn't have to wait for ACK, just message is dispatched.
        this._notify_msg_sent = {};

        // Unique identifier for SEND messages, incrementing
        // counter as messages are sent.
        this._message_identifier = 1;

        // Used to determine the transmission sequence of stored sent messages.
        this._sequence = 0;


        // Load the local state, if any, from the saved version, only restore state relevant to this client.
        for (var key in localStorage)
            if (   key.indexOf("Sent:"+this._localKey) == 0
                || key.indexOf("Received:"+this._localKey) == 0)
                this.restore(key);
    };

    // Messaging Client public instance members.
    ClientImpl.prototype.host;
    ClientImpl.prototype.port;
    ClientImpl.prototype.path;
    ClientImpl.prototype.uri;
    ClientImpl.prototype.clientId;

    // Messaging Client private instance members.
    ClientImpl.prototype.socket;
    /* true once we have received an acknowledgement to a CONNECT packet. */
    ClientImpl.prototype.connected = false;
    /* The largest message identifier allowed, may not be larger than 2**16 but
     * if set smaller reduces the maximum number of outbound messages allowed.
     */
    ClientImpl.prototype.maxMessageIdentifier = 65536;
    ClientImpl.prototype.connectOptions;
    ClientImpl.prototype.hostIndex;
    ClientImpl.prototype.onConnectionLost;
    ClientImpl.prototype.onMessageDelivered;
    ClientImpl.prototype.onMessageArrived;
    ClientImpl.prototype.traceFunction;
    ClientImpl.prototype._msg_queue = null;
    ClientImpl.prototype._connectTimeout;
    /* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
    ClientImpl.prototype.sendPinger = null;
    /* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
    ClientImpl.prototype.receivePinger = null;

    ClientImpl.prototype.receiveBuffer = null;

    ClientImpl.prototype._traceBuffer = null;
    ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

    ClientImpl.prototype.connect = function (connectOptions) {
        var connectOptionsMasked = this._traceMask(connectOptions, "password");
        this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

        if (this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
        if (this.socket)
            throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

        this.connectOptions = connectOptions;

        if (connectOptions.uris) {
            this.hostIndex = 0;
            this._doConnect(connectOptions.uris[0]);
        } else {
            this._doConnect(this.uri);
        }

    };

    ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
        this._trace("Client.subscribe", filter, subscribeOptions);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
        wireMessage.topics=[filter];
        if (subscribeOptions.qos != undefined)
            wireMessage.requestedQos = [subscribeOptions.qos];
        else
            wireMessage.requestedQos = [0];

        if (subscribeOptions.onSuccess) {
            wireMessage.onSuccess = function(grantedQos) {subscribeOptions.onSuccess({invocationContext:subscribeOptions.invocationContext,grantedQos:grantedQos});};
        }

        if (subscribeOptions.onFailure) {
            wireMessage.onFailure = function(errorCode) {subscribeOptions.onFailure({invocationContext:subscribeOptions.invocationContext,errorCode:errorCode});};
        }

        if (subscribeOptions.timeout) {
            wireMessage.timeOut = new Timeout(this, window, subscribeOptions.timeout, subscribeOptions.onFailure
                , [{invocationContext:subscribeOptions.invocationContext,
                    errorCode:ERROR.SUBSCRIBE_TIMEOUT.code,
                    errorMessage:format(ERROR.SUBSCRIBE_TIMEOUT)}]);
        }

        // All subscriptions return a SUBACK.
        this._requires_ack(wireMessage);
        this._schedule_message(wireMessage);
    };

    /** @ignore */
    ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
        this._trace("Client.unsubscribe", filter, unsubscribeOptions);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
        wireMessage.topics = [filter];

        if (unsubscribeOptions.onSuccess) {
            wireMessage.callback = function() {unsubscribeOptions.onSuccess({invocationContext:unsubscribeOptions.invocationContext});};
        }
        if (unsubscribeOptions.timeout) {
            wireMessage.timeOut = new Timeout(this, window, unsubscribeOptions.timeout, unsubscribeOptions.onFailure
                , [{invocationContext:unsubscribeOptions.invocationContext,
                    errorCode:ERROR.UNSUBSCRIBE_TIMEOUT.code,
                    errorMessage:format(ERROR.UNSUBSCRIBE_TIMEOUT)}]);
        }

        // All unsubscribes return a SUBACK.
        this._requires_ack(wireMessage);
        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.send = function (message) {
        this._trace("Client.send", message);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
        wireMessage.payloadMessage = message;

        if (message.qos > 0)
            this._requires_ack(wireMessage);
        else if (this.onMessageDelivered)
            this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.disconnect = function () {
        this._trace("Client.disconnect");

        if (!this.socket)
            throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

        wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

        // Run the disconnected call back as soon as the message has been sent,
        // in case of a failure later on in the disconnect processing.
        // as a consequence, the _disconected call back may be run several times.
        this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.getTraceLog = function () {
        if ( this._traceBuffer !== null ) {
            this._trace("Client.getTraceLog", new Date());
            this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
            for (var key in this._sentMessages)
                this._trace("_sentMessages ",key, this._sentMessages[key]);
            for (var key in this._receivedMessages)
                this._trace("_receivedMessages ",key, this._receivedMessages[key]);

            return this._traceBuffer;
        }
    };

    ClientImpl.prototype.startTrace = function () {
        if ( this._traceBuffer === null ) {
            this._traceBuffer = [];
        }
        this._trace("Client.startTrace", new Date(), version);
    };

    ClientImpl.prototype.stopTrace = function () {
        delete this._traceBuffer;
    };

    ClientImpl.prototype._doConnect = function (wsurl) {
        // When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
        if (this.connectOptions.useSSL) {
            var uriParts = wsurl.split(":");
            uriParts[0] = "wss";
            wsurl = uriParts.join(":");
        }
        this.connected = false;
        if (this.connectOptions.mqttVersion < 4) {
            this.socket = new WebSocket(wsurl, ["mqttv3.1"]);
        } else {
            this.socket = new WebSocket(wsurl, ["mqtt"]);
        }
        this.socket.binaryType = 'arraybuffer';

        this.socket.onopen = scope(this._on_socket_open, this);
        this.socket.onmessage = scope(this._on_socket_message, this);
        this.socket.onerror = scope(this._on_socket_error, this);
        this.socket.onclose = scope(this._on_socket_close, this);

        this.sendPinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);
        this.receivePinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);

        this._connectTimeout = new Timeout(this, window, this.connectOptions.timeout, this._disconnected,  [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
    };


    // Schedule a new message to be sent over the WebSockets
    // connection. CONNECT messages cause WebSocket connection
    // to be started. All other messages are queued internally
    // until this has happened. When WS connection starts, process
    // all outstanding messages.
    ClientImpl.prototype._schedule_message = function (message) {
        this._msg_queue.push(message);
        // Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
        if (this.connected) {
            this._process_queue();
        }
    };

    ClientImpl.prototype.store = function(prefix, wireMessage) {
        var storedMessage = {type:wireMessage.type, messageIdentifier:wireMessage.messageIdentifier, version:1};

        switch(wireMessage.type) {
            case MESSAGE_TYPE.PUBLISH:
                if(wireMessage.pubRecReceived)
                    storedMessage.pubRecReceived = true;

                // Convert the payload to a hex string.
                storedMessage.payloadMessage = {};
                var hex = "";
                var messageBytes = wireMessage.payloadMessage.payloadBytes;
                for (var i=0; i<messageBytes.length; i++) {
                    if (messageBytes[i] <= 0xF)
                        hex = hex+"0"+messageBytes[i].toString(16);
                    else
                        hex = hex+messageBytes[i].toString(16);
                }
                storedMessage.payloadMessage.payloadHex = hex;

                storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
                storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
                if (wireMessage.payloadMessage.duplicate)
                    storedMessage.payloadMessage.duplicate = true;
                if (wireMessage.payloadMessage.retained)
                    storedMessage.payloadMessage.retained = true;

                // Add a sequence number to sent messages.
                if ( prefix.indexOf("Sent:") == 0 ) {
                    if ( wireMessage.sequence === undefined )
                        wireMessage.sequence = ++this._sequence;
                    storedMessage.sequence = wireMessage.sequence;
                }
                break;

            default:
                throw Error(format(ERROR.INVALID_STORED_DATA, [key, storedMessage]));
        }
        localStorage.setItem(prefix+this._localKey+wireMessage.messageIdentifier, JSON.stringify(storedMessage));
    };

    ClientImpl.prototype.restore = function(key) {
        var value = localStorage.getItem(key);
        var storedMessage = JSON.parse(value);

        var wireMessage = new WireMessage(storedMessage.type, storedMessage);

        switch(storedMessage.type) {
            case MESSAGE_TYPE.PUBLISH:
                // Replace the payload message with a Message object.
                var hex = storedMessage.payloadMessage.payloadHex;
                var buffer = new ArrayBuffer((hex.length)/2);
                var byteStream = new Uint8Array(buffer);
                var i = 0;
                while (hex.length >= 2) {
                    var x = parseInt(hex.substring(0, 2), 16);
                    hex = hex.substring(2, hex.length);
                    byteStream[i++] = x;
                }
                var payloadMessage = new Paho.MQTT.Message(byteStream);

                payloadMessage.qos = storedMessage.payloadMessage.qos;
                payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
                if (storedMessage.payloadMessage.duplicate)
                    payloadMessage.duplicate = true;
                if (storedMessage.payloadMessage.retained)
                    payloadMessage.retained = true;
                wireMessage.payloadMessage = payloadMessage;

                break;

            default:
                throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
        }

        if (key.indexOf("Sent:"+this._localKey) == 0) {
            wireMessage.payloadMessage.duplicate = true;
            this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
        } else if (key.indexOf("Received:"+this._localKey) == 0) {
            this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
        }
    };

    ClientImpl.prototype._process_queue = function () {
        var message = null;
        // Process messages in order they were added
        var fifo = this._msg_queue.reverse();

        // Send all queued messages down socket connection
        while ((message = fifo.pop())) {
            this._socket_send(message);
            // Notify listeners that message was successfully sent
            if (this._notify_msg_sent[message]) {
                this._notify_msg_sent[message]();
                delete this._notify_msg_sent[message];
            }
        }
    };

    /**
     * Expect an ACK response for this message. Add message to the set of in progress
     * messages and set an unused identifier in this message.
     * @ignore
     */
    ClientImpl.prototype._requires_ack = function (wireMessage) {
        var messageCount = Object.keys(this._sentMessages).length;
        if (messageCount > this.maxMessageIdentifier)
            throw Error ("Too many messages:"+messageCount);

        while(this._sentMessages[this._message_identifier] !== undefined) {
            this._message_identifier++;
        }
        wireMessage.messageIdentifier = this._message_identifier;
        this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
        if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
            this.store("Sent:", wireMessage);
        }
        if (this._message_identifier === this.maxMessageIdentifier) {
            this._message_identifier = 1;
        }
    };

    /**
     * Called when the underlying websocket has been opened.
     * @ignore
     */
    ClientImpl.prototype._on_socket_open = function () {
        // Create the CONNECT message object.
        var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
        wireMessage.clientId = this.clientId;
        this._socket_send(wireMessage);
    };

    /**
     * Called when the underlying websocket has received a complete packet.
     * @ignore
     */
    ClientImpl.prototype._on_socket_message = function (event) {
        this._trace("Client._on_socket_message", event.data);
        // Reset the receive ping timer, we now have evidence the server is alive.
        this.receivePinger.reset();
        var messages = this._deframeMessages(event.data);
        for (var i = 0; i < messages.length; i+=1) {
            this._handleMessage(messages[i]);
        }
    }

    ClientImpl.prototype._deframeMessages = function(data) {
        var byteArray = new Uint8Array(data);
        if (this.receiveBuffer) {
            var newData = new Uint8Array(this.receiveBuffer.length+byteArray.length);
            newData.set(this.receiveBuffer);
            newData.set(byteArray,this.receiveBuffer.length);
            byteArray = newData;
            delete this.receiveBuffer;
        }
        try {
            var offset = 0;
            var messages = [];
            while(offset < byteArray.length) {
                var result = decodeMessage(byteArray,offset);
                var wireMessage = result[0];
                offset = result[1];
                if (wireMessage !== null) {
                    messages.push(wireMessage);
                } else {
                    break;
                }
            }
            if (offset < byteArray.length) {
                this.receiveBuffer = byteArray.subarray(offset);
            }
        } catch (error) {
            this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,error.stack.toString()]));
            return;
        }
        return messages;
    }

    ClientImpl.prototype._handleMessage = function(wireMessage) {

        this._trace("Client._handleMessage", wireMessage);

        try {
            switch(wireMessage.type) {
                case MESSAGE_TYPE.CONNACK:
                    this._connectTimeout.cancel();

                    // If we have started using clean session then clear up the local state.
                    if (this.connectOptions.cleanSession) {
                        for (var key in this._sentMessages) {
                            var sentMessage = this._sentMessages[key];
                            localStorage.removeItem("Sent:"+this._localKey+sentMessage.messageIdentifier);
                        }
                        this._sentMessages = {};

                        for (var key in this._receivedMessages) {
                            var receivedMessage = this._receivedMessages[key];
                            localStorage.removeItem("Received:"+this._localKey+receivedMessage.messageIdentifier);
                        }
                        this._receivedMessages = {};
                    }
                    // Client connected and ready for business.
                    if (wireMessage.returnCode === 0) {
                        this.connected = true;
                        // Jump to the end of the list of uris and stop looking for a good host.
                        if (this.connectOptions.uris)
                            this.hostIndex = this.connectOptions.uris.length;
                    } else {
                        this._disconnected(ERROR.CONNACK_RETURNCODE.code , format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
                        break;
                    }

                    // Resend messages.
                    var sequencedMessages = new Array();
                    for (var msgId in this._sentMessages) {
                        if (this._sentMessages.hasOwnProperty(msgId))
                            sequencedMessages.push(this._sentMessages[msgId]);
                    }

                    // Sort sentMessages into the original sent order.
                    var sequencedMessages = sequencedMessages.sort(function(a,b) {return a.sequence - b.sequence;} );
                    for (var i=0, len=sequencedMessages.length; i<len; i++) {
                        var sentMessage = sequencedMessages[i];
                        if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
                            var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:sentMessage.messageIdentifier});
                            this._schedule_message(pubRelMessage);
                        } else {
                            this._schedule_message(sentMessage);
                        };
                    }

                    // Execute the connectOptions.onSuccess callback if there is one.
                    if (this.connectOptions.onSuccess) {
                        this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});
                    }

                    // Process all queued messages now that the connection is established.
                    this._process_queue();
                    break;

                case MESSAGE_TYPE.PUBLISH:
                    this._receivePublish(wireMessage);
                    break;

                case MESSAGE_TYPE.PUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    // If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
                    if (sentMessage) {
                        delete this._sentMessages[wireMessage.messageIdentifier];
                        localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
                        if (this.onMessageDelivered)
                            this.onMessageDelivered(sentMessage.payloadMessage);
                    }
                    break;

                case MESSAGE_TYPE.PUBREC:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    // If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
                    if (sentMessage) {
                        sentMessage.pubRecReceived = true;
                        var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:wireMessage.messageIdentifier});
                        this.store("Sent:", sentMessage);
                        this._schedule_message(pubRelMessage);
                    }
                    break;

                case MESSAGE_TYPE.PUBREL:
                    var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
                    localStorage.removeItem("Received:"+this._localKey+wireMessage.messageIdentifier);
                    // If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
                    if (receivedMessage) {
                        this._receiveMessage(receivedMessage);
                        delete this._receivedMessages[wireMessage.messageIdentifier];
                    }
                    // Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
                    var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {messageIdentifier:wireMessage.messageIdentifier});
                    this._schedule_message(pubCompMessage);
                    break;

                case MESSAGE_TYPE.PUBCOMP:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    delete this._sentMessages[wireMessage.messageIdentifier];
                    localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
                    if (this.onMessageDelivered)
                        this.onMessageDelivered(sentMessage.payloadMessage);
                    break;

                case MESSAGE_TYPE.SUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    if (sentMessage) {
                        if(sentMessage.timeOut)
                            sentMessage.timeOut.cancel();
                        // This will need to be fixed when we add multiple topic support
                        if (wireMessage.returnCode[0] === 0x80) {
                            if (sentMessage.onFailure) {
                                sentMessage.onFailure(wireMessage.returnCode);
                            }
                        } else if (sentMessage.onSuccess) {
                            sentMessage.onSuccess(wireMessage.returnCode);
                        }
                        delete this._sentMessages[wireMessage.messageIdentifier];
                    }
                    break;

                case MESSAGE_TYPE.UNSUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    if (sentMessage) {
                        if (sentMessage.timeOut)
                            sentMessage.timeOut.cancel();
                        if (sentMessage.callback) {
                            sentMessage.callback();
                        }
                        delete this._sentMessages[wireMessage.messageIdentifier];
                    }

                    break;

                case MESSAGE_TYPE.PINGRESP:
                    /* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
                    this.sendPinger.reset();
                    break;

                case MESSAGE_TYPE.DISCONNECT:
                    // Clients do not expect to receive disconnect packets.
                    this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
                    break;

                default:
                    this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
            };
        } catch (error) {
            this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,error.stack.toString()]));
            return;
        }
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_error = function (error) {
        this._disconnected(ERROR.SOCKET_ERROR.code , format(ERROR.SOCKET_ERROR, [error.data]));
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_close = function () {
        this._disconnected(ERROR.SOCKET_CLOSE.code , format(ERROR.SOCKET_CLOSE));
    };

    /** @ignore */
    ClientImpl.prototype._socket_send = function (wireMessage) {

        if (wireMessage.type == 1) {
            var wireMessageMasked = this._traceMask(wireMessage, "password");
            this._trace("Client._socket_send", wireMessageMasked);
        }
        else this._trace("Client._socket_send", wireMessage);

        this.socket.send(wireMessage.encode());
        /* We have proved to the server we are alive. */
        this.sendPinger.reset();
    };

    /** @ignore */
    ClientImpl.prototype._receivePublish = function (wireMessage) {
        switch(wireMessage.payloadMessage.qos) {
            case "undefined":
            case 0:
                this._receiveMessage(wireMessage);
                break;

            case 1:
                var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {messageIdentifier:wireMessage.messageIdentifier});
                this._schedule_message(pubAckMessage);
                this._receiveMessage(wireMessage);
                break;

            case 2:
                this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
                this.store("Received:", wireMessage);
                var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {messageIdentifier:wireMessage.messageIdentifier});
                this._schedule_message(pubRecMessage);

                break;

            default:
                throw Error("Invaild qos="+wireMmessage.payloadMessage.qos);
        };
    };

    /** @ignore */
    ClientImpl.prototype._receiveMessage = function (wireMessage) {
        if (this.onMessageArrived) {
            this.onMessageArrived(wireMessage.payloadMessage);
        }
    };

    /**
     * Client has disconnected either at its own request or because the server
     * or network disconnected it. Remove all non-durable state.
     * @param {errorCode} [number] the error number.
     * @param {errorText} [string] the error text.
     * @ignore
     */
    ClientImpl.prototype._disconnected = function (errorCode, errorText) {
        this._trace("Client._disconnected", errorCode, errorText);

        this.sendPinger.cancel();
        this.receivePinger.cancel();
        if (this._connectTimeout)
            this._connectTimeout.cancel();
        // Clear message buffers.
        this._msg_queue = [];
        this._notify_msg_sent = {};

        if (this.socket) {
            // Cancel all socket callbacks so that they cannot be driven again by this socket.
            this.socket.onopen = null;
            this.socket.onmessage = null;
            this.socket.onerror = null;
            this.socket.onclose = null;
            if (this.socket.readyState === 1)
                this.socket.close();
            delete this.socket;
        }

        if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length-1) {
            // Try the next host.
            this.hostIndex++;
            this._doConnect(this.connectOptions.uris[this.hostIndex]);

        } else {

            if (errorCode === undefined) {
                errorCode = ERROR.OK.code;
                errorText = format(ERROR.OK);
            }

            // Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
            if (this.connected) {
                this.connected = false;
                // Execute the connectionLostCallback if there is one, and we were connected.
                if (this.onConnectionLost)
                    this.onConnectionLost({errorCode:errorCode, errorMessage:errorText});
            } else {
                // Otherwise we never had a connection, so indicate that the connect has failed.
                if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
                    this._trace("Failed to connect V4, dropping back to V3")
                    this.connectOptions.mqttVersion = 3;
                    if (this.connectOptions.uris) {
                        this.hostIndex = 0;
                        this._doConnect(this.connectOptions.uris[0]);
                    } else {
                        this._doConnect(this.uri);
                    }
                } else if(this.connectOptions.onFailure) {
                    this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext, errorCode:errorCode, errorMessage:errorText});
                }
            }
        }
    };

    /** @ignore */
    ClientImpl.prototype._trace = function () {
        // Pass trace message back to client's callback function
        if (this.traceFunction) {
            for (var i in arguments)
            {
                if (typeof arguments[i] !== "undefined")
                    arguments[i] = JSON.stringify(arguments[i]);
            }
            var record = Array.prototype.slice.call(arguments).join("");
            this.traceFunction ({severity: "Debug", message: record	});
        }

        //buffer style trace
        if ( this._traceBuffer !== null ) {
            for (var i = 0, max = arguments.length; i < max; i++) {
                if ( this._traceBuffer.length == this._MAX_TRACE_ENTRIES ) {
                    this._traceBuffer.shift();
                }
                if (i === 0) this._traceBuffer.push(arguments[i]);
                else if (typeof arguments[i] === "undefined" ) this._traceBuffer.push(arguments[i]);
                else this._traceBuffer.push("  "+JSON.stringify(arguments[i]));
            };
        };
    };

    /** @ignore */
    ClientImpl.prototype._traceMask = function (traceObject, masked) {
        var traceObjectMasked = {};
        for (var attr in traceObject) {
            if (traceObject.hasOwnProperty(attr)) {
                if (attr == masked)
                    traceObjectMasked[attr] = "******";
                else
                    traceObjectMasked[attr] = traceObject[attr];
            }
        }
        return traceObjectMasked;
    };

    // ------------------------------------------------------------------------
    // Public Programming interface.
    // ------------------------------------------------------------------------

    /**
     * The JavaScript application communicates to the server using a {@link Paho.MQTT.Client} object.
     * <p>
     * Most applications will create just one Client object and then call its connect() method,
     * however applications can create more than one Client object if they wish.
     * In this case the combination of host, port and clientId attributes must be different for each Client object.
     * <p>
     * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
     * (even though the underlying protocol exchange might be synchronous in nature).
     * This means they signal their completion by calling back to the application,
     * via Success or Failure callback functions provided by the application on the method in question.
     * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
     * of the script that made the invocation.
     * <p>
     * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
     * that are defined on the {@link Paho.MQTT.Client} object.
     * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
     *
     * @name Paho.MQTT.Client
     *
     * @constructor
     *
     * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
     * @param {number} port - the port number to connect to - only required if host is not a URI
     * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
     * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
     *
     * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
     * @property {number} port - <i>read only</i> the server's port.
     * @property {string} path - <i>read only</i> the server's path.
     * @property {string} clientId - <i>read only</i> used when connecting to the server.
     * @property {function} onConnectionLost - called when a connection has been lost.
     *                            after a connect() method has succeeded.
     *                            Establish the call back used when a connection has been lost. The connection may be
     *                            lost because the client initiates a disconnect or because the server or network
     *                            cause the client to be disconnected. The disconnect call back may be called without
     *                            the connectionComplete call back being invoked if, for example the client fails to
     *                            connect.
     *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
     *                            <ol>
     *                            <li>errorCode
     *                            <li>errorMessage
     *                            </ol>
     * @property {function} onMessageDelivered called when a message has been delivered.
     *                            All processing that this Client will ever do has been completed. So, for example,
     *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
     *                            and the message has been removed from persistent storage before this callback is invoked.
     *                            Parameters passed to the onMessageDelivered callback are:
     *                            <ol>
     *                            <li>{@link Paho.MQTT.Message} that was delivered.
     *                            </ol>
     * @property {function} onMessageArrived called when a message has arrived in this Paho.MQTT.client.
     *                            Parameters passed to the onMessageArrived callback are:
     *                            <ol>
     *                            <li>{@link Paho.MQTT.Message} that has arrived.
     *                            </ol>
     */
    var Client = function (host, port, path, clientId) {

        var uri;

        if (typeof host !== "string")
            throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

        if (arguments.length == 2) {
            // host: must be full ws:// uri
            // port: clientId
            clientId = port;
            uri = host;
            var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
            if (match) {
                host = match[4]||match[2];
                port = parseInt(match[7]);
                path = match[8];
            } else {
                throw new Error(format(ERROR.INVALID_ARGUMENT,[host,"host"]));
            }
        } else {
            if (arguments.length == 3) {
                clientId = path;
                path = "/mqtt";
            }
            if (typeof port !== "number" || port < 0)
                throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
            if (typeof path !== "string")
                throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

            var ipv6AddSBracket = (host.indexOf(":") != -1 && host.slice(0,1) != "[" && host.slice(-1) != "]");
            uri = "ws://"+(ipv6AddSBracket?"["+host+"]":host)+":"+port+path;
        }

        var clientIdLength = 0;
        for (var i = 0; i<clientId.length; i++) {
            var charCode = clientId.charCodeAt(i);
            if (0xD800 <= charCode && charCode <= 0xDBFF)  {
                i++; // Surrogate pair.
            }
            clientIdLength++;
        }
        if (typeof clientId !== "string" || clientIdLength > 65535)
            throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

        var client = new ClientImpl(uri, host, port, path, clientId);
        this._getHost =  function() { return host; };
        this._setHost = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

        this._getPort = function() { return port; };
        this._setPort = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

        this._getPath = function() { return path; };
        this._setPath = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

        this._getURI = function() { return uri; };
        this._setURI = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

        this._getClientId = function() { return client.clientId; };
        this._setClientId = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

        this._getOnConnectionLost = function() { return client.onConnectionLost; };
        this._setOnConnectionLost = function(newOnConnectionLost) {
            if (typeof newOnConnectionLost === "function")
                client.onConnectionLost = newOnConnectionLost;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
        };

        this._getOnMessageDelivered = function() { return client.onMessageDelivered; };
        this._setOnMessageDelivered = function(newOnMessageDelivered) {
            if (typeof newOnMessageDelivered === "function")
                client.onMessageDelivered = newOnMessageDelivered;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
        };

        this._getOnMessageArrived = function() { return client.onMessageArrived; };
        this._setOnMessageArrived = function(newOnMessageArrived) {
            if (typeof newOnMessageArrived === "function")
                client.onMessageArrived = newOnMessageArrived;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
        };

        this._getTrace = function() { return client.traceFunction; };
        this._setTrace = function(trace) {
            if(typeof trace === "function"){
                client.traceFunction = trace;
            }else{
                throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
            }
        };

        /**
         * Connect this Messaging client to its server.
         *
         * @name Paho.MQTT.Client#connect
         * @function
         * @param {Object} connectOptions - attributes used with the connection.
         * @param {number} connectOptions.timeout - If the connect has not succeeded within this
         *                    number of seconds, it is deemed to have failed.
         *                    The default is 30 seconds.
         * @param {string} connectOptions.userName - Authentication username for this connection.
         * @param {string} connectOptions.password - Authentication password for this connection.
         * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
         *                    disconnects abnormally.
         * @param {Number} connectOptions.keepAliveInterval - the server disconnects this client if
         *                    there is no activity for this number of seconds.
         *                    The default value of 60 seconds is assumed if not set.
         * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
         *                    persistent state is deleted on successful connect.
         * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
         * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
         * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
         *                    has been received from the server.
         * A single response object parameter is passed to the onSuccess callback containing the following fields:
         * <ol>
         * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
         * </ol>
         * @config {function} [onFailure] called when the connect request has failed or timed out.
         * A single response object parameter is passed to the onFailure callback containing the following fields:
         * <ol>
         * <li>invocationContext as passed in to the onFailure method in the connectOptions.
         * <li>errorCode a number indicating the nature of the error.
         * <li>errorMessage text describing the error.
         * </ol>
         * @config {Array} [hosts] If present this contains either a set of hostnames or fully qualified
         * WebSocket URIs (ws://example.com:1883/mqtt), that are tried in order in place
         * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
         * one of then succeeds.
         * @config {Array} [ports] If present the set of ports matching the hosts. If hosts contains URIs, this property
         * is not used.
         * @throws {InvalidState} if the client is not in disconnected state. The client must have received connectionLost
         * or disconnected before calling connect for a second or subsequent time.
         */
        this.connect = function (connectOptions) {
            connectOptions = connectOptions || {} ;
            validate(connectOptions,  {timeout:"number",
                userName:"string",
                password:"string",
                willMessage:"object",
                keepAliveInterval:"number",
                cleanSession:"boolean",
                useSSL:"boolean",
                invocationContext:"object",
                onSuccess:"function",
                onFailure:"function",
                hosts:"object",
                ports:"object",
                mqttVersion:"number"});

            // If no keep alive interval is set, assume 60 seconds.
            if (connectOptions.keepAliveInterval === undefined)
                connectOptions.keepAliveInterval = 60;

            if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
            }

            if (connectOptions.mqttVersion === undefined) {
                connectOptions.mqttVersionExplicit = false;
                connectOptions.mqttVersion = 4;
            } else {
                connectOptions.mqttVersionExplicit = true;
            }

            //Check that if password is set, so is username
            if (connectOptions.password === undefined && connectOptions.userName !== undefined)
                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]))

            if (connectOptions.willMessage) {
                if (!(connectOptions.willMessage instanceof Message))
                    throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
                // The will message must have a payload that can be represented as a string.
                // Cause the willMessage to throw an exception if this is not the case.
                connectOptions.willMessage.stringPayload;

                if (typeof connectOptions.willMessage.destinationName === "undefined")
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
            }
            if (typeof connectOptions.cleanSession === "undefined")
                connectOptions.cleanSession = true;
            if (connectOptions.hosts) {

                if (!(connectOptions.hosts instanceof Array) )
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
                if (connectOptions.hosts.length <1 )
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

                var usingURIs = false;
                for (var i = 0; i<connectOptions.hosts.length; i++) {
                    if (typeof connectOptions.hosts[i] !== "string")
                        throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
                    if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
                        if (i == 0) {
                            usingURIs = true;
                        } else if (!usingURIs) {
                            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
                        }
                    } else if (usingURIs) {
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
                    }
                }

                if (!usingURIs) {
                    if (!connectOptions.ports)
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                    if (!(connectOptions.ports instanceof Array) )
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                    if (connectOptions.hosts.length != connectOptions.ports.length)
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

                    connectOptions.uris = [];

                    for (var i = 0; i<connectOptions.hosts.length; i++) {
                        if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
                            throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
                        var host = connectOptions.hosts[i];
                        var port = connectOptions.ports[i];

                        var ipv6 = (host.indexOf(":") != -1);
                        uri = "ws://"+(ipv6?"["+host+"]":host)+":"+port+path;
                        connectOptions.uris.push(uri);
                    }
                } else {
                    connectOptions.uris = connectOptions.hosts;
                }
            }

            client.connect(connectOptions);
        };

        /**
         * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
         *
         * @name Paho.MQTT.Client#subscribe
         * @function
         * @param {string} filter describing the destinations to receive messages from.
         * <br>
         * @param {object} subscribeOptions - used to control the subscription
         *
         * @param {number} subscribeOptions.qos - the maiximum qos of any publications sent
         *                                  as a result of making this subscription.
         * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
         *                                  or onFailure callback.
         * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
         *                                  has been received from the server.
         *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
         *                                  <ol>
         *                                  <li>invocationContext if set in the subscribeOptions.
         *                                  </ol>
         * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
         *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
         *                                  <ol>
         *                                  <li>invocationContext - if set in the subscribeOptions.
         *                                  <li>errorCode - a number indicating the nature of the error.
         *                                  <li>errorMessage - text describing the error.
         *                                  </ol>
         * @param {number} subscribeOptions.timeout - which, if present, determines the number of
         *                                  seconds after which the onFailure calback is called.
         *                                  The presence of a timeout does not prevent the onSuccess
         *                                  callback from being called when the subscribe completes.
         * @throws {InvalidState} if the client is not in connected state.
         */
        this.subscribe = function (filter, subscribeOptions) {
            if(filter.length==0){ throw new Error("Invalid argument:"+filter)};
            if (typeof filter !== "string")
                throw new Error("Invalid argument:"+filter);
            console.log('订阅主题--------'+filter);
            subscribeOptions = subscribeOptions || {} ;
            validate(subscribeOptions,  {qos:"number",
                invocationContext:"object",
                onSuccess:"function",
                onFailure:"function",
                timeout:"number"
            });
            if (subscribeOptions.timeout && !subscribeOptions.onFailure)
                throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
            if (typeof subscribeOptions.qos !== "undefined"
                && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
                throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
            client.subscribe(filter, subscribeOptions);
        };

        /**
         * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
         *
         * @name Paho.MQTT.Client#unsubscribe
         * @function
         * @param {string} filter - describing the destinations to receive messages from.
         * @param {object} unsubscribeOptions - used to control the subscription
         * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
         or onFailure callback.
         * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
         *                                    A single response object parameter is passed to the
         *                                    onSuccess callback containing the following fields:
         *                                    <ol>
         *                                    <li>invocationContext - if set in the unsubscribeOptions.
         *                                    </ol>
         * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
         *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
         *                                    <ol>
         *                                    <li>invocationContext - if set in the unsubscribeOptions.
         *                                    <li>errorCode - a number indicating the nature of the error.
         *                                    <li>errorMessage - text describing the error.
         *                                    </ol>
         * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
         *                                    after which the onFailure callback is called. The presence of
         *                                    a timeout does not prevent the onSuccess callback from being
         *                                    called when the unsubscribe completes
         * @throws {InvalidState} if the client is not in connected state.
         */
        this.unsubscribe = function (filter, unsubscribeOptions) {
            if (typeof filter !== "string")
                throw new Error("Invalid argument:"+filter);
            unsubscribeOptions = unsubscribeOptions || {} ;
            validate(unsubscribeOptions,  {invocationContext:"object",
                onSuccess:"function",
                onFailure:"function",
                timeout:"number"
            });
            if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
                throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
            console.log('取消订阅主题--------'+filter);
            client.unsubscribe(filter, unsubscribeOptions);
        };

        /**
         * Send a message to the consumers of the destination in the Message.
         *
         * @name Paho.MQTT.Client#send
         * @function
         * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
         * 					   - If it is the only parameter, used as Paho.MQTT.Message object.
         * @param {String|ArrayBuffer} payload - The message data to be sent.
         * @param {number} qos The Quality of Service used to deliver the message.
         * 		<dl>
         * 			<dt>0 Best effort (default).
         *     			<dt>1 At least once.
         *     			<dt>2 Exactly once.
         * 		</dl>
         * @param {Boolean} retained If true, the message is to be retained by the server and delivered
         *                     to both current and future subscriptions.
         *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
         *                     A received message has the retained boolean set to true if the message was published
         *                     with the retained boolean set to true
         *                     and the subscrption was made after the message has been published.
         * @throws {InvalidState} if the client is not connected.
         */
        this.send = function (topic,payload,qos,retained) {
            var message ;

            if(arguments.length == 0){
                throw new Error("Invalid argument."+"length");

            }else if(arguments.length == 1) {

                if (!(topic instanceof Message) && (typeof topic !== "string"))
                    throw new Error("Invalid argument:"+ typeof topic);

                message = topic;
                if (typeof message.destinationName === "undefined")
                    throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
                client.send(message);

            }else {
                //parameter checking in Message object
                message = new Message(payload);
                message.destinationName = topic;
                if(arguments.length >= 3)
                    message.qos = qos;
                if(arguments.length >= 4)
                    message.retained = retained;
                client.send(message);
            }
        };

        /**
         * Normal disconnect of this Messaging client from its server.
         *
         * @name Paho.MQTT.Client#disconnect
         * @function
         * @throws {InvalidState} if the client is already disconnected.
         */
        this.disconnect = function () {
            client.disconnect();
        };

        /**
         * Get the contents of the trace log.
         *
         * @name Paho.MQTT.Client#getTraceLog
         * @function
         * @return {Object[]} tracebuffer containing the time ordered trace records.
         */
        this.getTraceLog = function () {
            return client.getTraceLog();
        }

        /**
         * Start tracing.
         *
         * @name Paho.MQTT.Client#startTrace
         * @function
         */
        this.startTrace = function () {
            client.startTrace();
        };

        /**
         * Stop tracing.
         *
         * @name Paho.MQTT.Client#stopTrace
         * @function
         */
        this.stopTrace = function () {
            client.stopTrace();
        };

        this.isConnected = function() {
            return client.connected;
        };
    };

    Client.prototype = {
        get host() { return this._getHost(); },
        set host(newHost) { this._setHost(newHost); },

        get port() { return this._getPort(); },
        set port(newPort) { this._setPort(newPort); },

        get path() { return this._getPath(); },
        set path(newPath) { this._setPath(newPath); },

        get clientId() { return this._getClientId(); },
        set clientId(newClientId) { this._setClientId(newClientId); },

        get onConnectionLost() { return this._getOnConnectionLost(); },
        set onConnectionLost(newOnConnectionLost) { this._setOnConnectionLost(newOnConnectionLost); },

        get onMessageDelivered() { return this._getOnMessageDelivered(); },
        set onMessageDelivered(newOnMessageDelivered) { this._setOnMessageDelivered(newOnMessageDelivered); },

        get onMessageArrived() { return this._getOnMessageArrived(); },
        set onMessageArrived(newOnMessageArrived) { this._setOnMessageArrived(newOnMessageArrived); },

        get trace() { return this._getTrace(); },
        set trace(newTraceFunction) { this._setTrace(newTraceFunction); }

    };

    /**
     * An application message, sent or received.
     * <p>
     * All attributes may be null, which implies the default values.
     *
     * @name Paho.MQTT.Message
     * @constructor
     * @param {String|ArrayBuffer} payload The message data to be sent.
     * <p>
     * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
     * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
     * <p>
     * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
     *                    (for messages about to be sent) or the name of the destination from which the message has been received.
     *                    (for messages received by the onMessage function).
     * <p>
     * @property {number} qos The Quality of Service used to deliver the message.
     * <dl>
     *     <dt>0 Best effort (default).
     *     <dt>1 At least once.
     *     <dt>2 Exactly once.
     * </dl>
     * <p>
     * @property {Boolean} retained If true, the message is to be retained by the server and delivered
     *                     to both current and future subscriptions.
     *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
     *                     A received message has the retained boolean set to true if the message was published
     *                     with the retained boolean set to true
     *                     and the subscrption was made after the message has been published.
     * <p>
     * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
     *                     This is only set on messages received from the server.
     *
     */
    var Message = function (newPayload) {
        var payload;
        if (   typeof newPayload === "string"
            || newPayload instanceof ArrayBuffer
            || newPayload instanceof Int8Array
            || newPayload instanceof Uint8Array
            || newPayload instanceof Int16Array
            || newPayload instanceof Uint16Array
            || newPayload instanceof Int32Array
            || newPayload instanceof Uint32Array
            || newPayload instanceof Float32Array
            || newPayload instanceof Float64Array
        ) {
            payload = newPayload;
        } else {
            throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
        }

        this._getPayloadString = function () {
            if (typeof payload === "string")
                return payload;
            else
                return parseUTF8(payload, 0, payload.length);
        };

        this._getPayloadBytes = function() {
            if (typeof payload === "string") {
                var buffer = new ArrayBuffer(UTF8Length(payload));
                var byteStream = new Uint8Array(buffer);
                stringToUTF8(payload, byteStream, 0);

                return byteStream;
            } else {
                return payload;
            };
        };

        var destinationName = undefined;
        this._getDestinationName = function() { return destinationName; };
        this._setDestinationName = function(newDestinationName) {
            if (typeof newDestinationName === "string")
                destinationName = newDestinationName;
            else
                throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
        };

        var qos = 0;
        this._getQos = function() { return qos; };
        this._setQos = function(newQos) {
            if (newQos === 0 || newQos === 1 || newQos === 2 )
                qos = newQos;
            else
                throw new Error("Invalid argument:"+newQos);
        };

        var retained = false;
        this._getRetained = function() { return retained; };
        this._setRetained = function(newRetained) {
            if (typeof newRetained === "boolean")
                retained = newRetained;
            else
                throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
        };

        var duplicate = false;
        this._getDuplicate = function() { return duplicate; };
        this._setDuplicate = function(newDuplicate) { duplicate = newDuplicate; };
    };

    Message.prototype = {
        get payloadString() { return this._getPayloadString(); },
        get payloadBytes() { return this._getPayloadBytes(); },

        get destinationName() { return this._getDestinationName(); },
        set destinationName(newDestinationName) { this._setDestinationName(newDestinationName); },

        get qos() { return this._getQos(); },
        set qos(newQos) { this._setQos(newQos); },

        get retained() { return this._getRetained(); },
        set retained(newRetained) { this._setRetained(newRetained); },

        get duplicate() { return this._getDuplicate(); },
        set duplicate(newDuplicate) { this._setDuplicate(newDuplicate); }
    };

    // Module contents.
    return {
        Client: Client,
        Message: Message
    };
})(window);

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.clipboard=e():t.clipboard=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";function r(t,e,n){y("listener called"),t.success=!0,e.forEach(function(e,r){n.clipboardData.setData(r,e),r===_&&n.clipboardData.getData(r)!=e&&(y("setting text/plain failed"),t.success=!1)}),n.preventDefault()}function o(t){var e=new x,n=r.bind(this,e,t);document.addEventListener("copy",n);try{document.execCommand("copy")}finally{document.removeEventListener("copy",n)}return e.success}function i(t,e){c(t);var n=o(e);return a(),n}function u(t){var e=document.createElement("div");e.setAttribute("style","-webkit-user-select: text !important"),e.textContent="temporary element",document.body.appendChild(e);var n=i(e,t);return document.body.removeChild(e),n}function s(t){y("copyTextUsingDOM");var e=document.createElement("div");e.setAttribute("style","-webkit-user-select: text !important");var n=e;e.attachShadow&&(y("Using shadow DOM."),n=e.attachShadow({mode:"open"}));var r=document.createElement("span");r.innerText=t,n.appendChild(r),document.body.appendChild(e),c(r);var o=document.execCommand("copy");return a(),document.body.removeChild(e),o}function c(t){var e=document.getSelection(),n=document.createRange();n.selectNodeContents(t),e.removeAllRanges(),e.addRange(n)}function a(){document.getSelection().removeAllRanges()}function l(t){var e=new v.DT;return e.setData(_,t),e}function f(){return"undefined"==typeof ClipboardEvent&&void 0!==window.clipboardData&&void 0!==window.clipboardData.setData}function d(t){var e=t.getData(_);if(void 0!==e)return window.clipboardData.setData("Text",e);throw"No `text/plain` value was specified."}function p(){return new m(function(t,e){var n=window.clipboardData.getData("Text");""===n?e(new Error("Empty clipboard or could not read plain text from clipboard")):t(n)})}Object.defineProperty(e,"__esModule",{value:!0});var h=n(1),v=n(5),m="undefined"==typeof Promise?h.Promise:Promise,y=function(t){},w=!0,b=function(){(console.warn||console.log).call(arguments)},g=b.bind(console,"[clipboard-polyfill]"),_="text/plain",T=function(){function t(){}return t.setDebugLog=function(t){y=t},t.suppressWarnings=function(){w=!1,v.suppressDTWarnings()},t.write=function(t){return w&&!t.getData(_)&&g("clipboard.write() was called without a `text/plain` data type. On some platforms, this may result in an empty clipboard. Call clipboard.suppressWarnings() to suppress this warning."),new m(function(e,n){if(f())return void(d(t)?e():n(new Error("Copying failed, possibly because the user rejected it.")));if(o(t))return y("regular execCopy worked"),void e();if(navigator.userAgent.indexOf("Edge")>-1)return y('UA "Edge" => assuming success'),void e();if(i(document.body,t))return y("copyUsingTempSelection worked"),void e();if(u(t))return y("copyUsingTempElem worked"),void e();var r=t.getData(_);if(void 0!==r&&s(r))return y("copyTextUsingDOM worked"),void e();n(new Error("Copy command failed."))})},t.writeText=function(t){if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(t);var e=new v.DT;return e.setData(_,t),this.write(e)},t.read=function(){return new m(function(t,e){if(f())return void p().then(function(e){return t(l(e))},e);e("Read is not supported in your browser.")})},t.readText=function(){return navigator.clipboard&&navigator.clipboard.readText?navigator.clipboard.readText():f()?p():new m(function(t,e){e("Read is not supported in your browser.")})},t.DT=v.DT,t}();e.default=T;var x=function(){function t(){this.success=!1}return t}();t.exports=T},function(t,e,n){(function(e,r){/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */
!function(e,n){t.exports=n()}(0,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function o(t){return"function"==typeof t}function i(t){G=t}function u(t){H=t}function s(){return void 0!==B?function(){B(a)}:c()}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<z;t+=2){(0,Z[t])(Z[t+1]),Z[t]=void 0,Z[t+1]=void 0}z=0}function l(t,e){var n=arguments,r=this,o=new this.constructor(d);void 0===o[tt]&&M(o);var i=r._state;return i?function(){var t=n[i-1];H(function(){return j(i,o,t,r._result)})}():D(r,o,t,e),o}function f(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(d);return g(n,t),n}function d(){}function p(){return new TypeError("You cannot resolve a promise with itself")}function h(){return new TypeError("A promises callback cannot return that same promise.")}function v(t){try{return t.then}catch(t){return ot.error=t,ot}}function m(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}function y(t,e,n){H(function(t){var r=!1,o=m(n,e,function(n){r||(r=!0,e!==n?g(t,n):T(t,n))},function(e){r||(r=!0,x(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,x(t,o))},t)}function w(t,e){e._state===nt?T(t,e._result):e._state===rt?x(t,e._result):D(e,void 0,function(e){return g(t,e)},function(e){return x(t,e)})}function b(t,e,n){e.constructor===t.constructor&&n===l&&e.constructor.resolve===f?w(t,e):n===ot?(x(t,ot.error),ot.error=null):void 0===n?T(t,e):o(n)?y(t,e,n):T(t,e)}function g(e,n){e===n?x(e,p()):t(n)?b(e,n,v(n)):T(e,n)}function _(t){t._onerror&&t._onerror(t._result),A(t)}function T(t,e){t._state===et&&(t._result=e,t._state=nt,0!==t._subscribers.length&&H(A,t))}function x(t,e){t._state===et&&(t._state=rt,t._result=e,H(_,t))}function D(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+nt]=n,o[i+rt]=r,0===i&&t._state&&H(A,t)}function A(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,u=0;u<e.length;u+=3)r=e[u],o=e[u+n],r?j(n,r,o,i):o(i);t._subscribers.length=0}}function E(){this.error=null}function C(t,e){try{return t(e)}catch(t){return it.error=t,it}}function j(t,e,n,r){var i=o(n),u=void 0,s=void 0,c=void 0,a=void 0;if(i){if(u=C(n,r),u===it?(a=!0,s=u.error,u.error=null):c=!0,e===u)return void x(e,h())}else u=r,c=!0;e._state!==et||(i&&c?g(e,u):a?x(e,s):t===nt?T(e,u):t===rt&&x(e,u))}function O(t,e){try{e(function(e){g(t,e)},function(e){x(t,e)})}catch(e){x(t,e)}}function S(){return ut++}function M(t){t[tt]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function P(t,e){this._instanceConstructor=t,this.promise=new t(d),this.promise[tt]||M(this.promise),q(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?T(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&T(this.promise,this._result))):x(this.promise,k())}function k(){return new Error("Array Methods must be provided an Array")}function L(t){return new P(this,t).promise}function U(t){var e=this;return new e(q(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function R(t){var e=this,n=new e(d);return x(n,t),n}function W(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function F(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function N(t){this[tt]=S(),this._result=this._state=void 0,this._subscribers=[],d!==t&&("function"!=typeof t&&W(),this instanceof N?O(this,t):F())}function Y(){var t=void 0;if(void 0!==r)t=r;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=N}var K=void 0;K=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var q=K,z=0,B=void 0,G=void 0,H=function(t,e){Z[z]=t,Z[z+1]=e,2===(z+=2)&&(G?G(a):$())},I="undefined"!=typeof window?window:void 0,J=I||{},Q=J.MutationObserver||J.WebKitMutationObserver,V="undefined"==typeof self&&void 0!==e&&"[object process]"==={}.toString.call(e),X="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Z=new Array(1e3),$=void 0;$=V?function(){return function(){return e.nextTick(a)}}():Q?function(){var t=0,e=new Q(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}():X?function(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}():void 0===I?function(){try{var t=n(4);return B=t.runOnLoop||t.runOnContext,s()}catch(t){return c()}}():c();var tt=Math.random().toString(36).substring(16),et=void 0,nt=1,rt=2,ot=new E,it=new E,ut=0;return P.prototype._enumerate=function(t){for(var e=0;this._state===et&&e<t.length;e++)this._eachEntry(t[e],e)},P.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===f){var o=v(t);if(o===l&&t._state!==et)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===N){var i=new n(d);b(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},P.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===et&&(this._remaining--,t===rt?x(r,n):this._result[e]=n),0===this._remaining&&T(r,this._result)},P.prototype._willSettleAt=function(t,e){var n=this;D(t,void 0,function(t){return n._settledAt(nt,e,t)},function(t){return n._settledAt(rt,e,t)})},N.all=L,N.race=U,N.resolve=f,N.reject=R,N._setScheduler=i,N._setAsap=u,N._asap=H,N.prototype={constructor:N,then:l,catch:function(t){return this.then(null,t)}},N.polyfill=Y,N.Promise=N,N})}).call(e,n(2),n(3))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(l===setTimeout)return setTimeout(t,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(t,0);try{return l(t,0)}catch(e){try{return l.call(null,t,0)}catch(e){return l.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function u(){v&&p&&(v=!1,p.length?h=p.concat(h):m=-1,h.length&&s())}function s(){if(!v){var t=o(u);v=!0;for(var e=h.length;e;){for(p=h,h=[];++m<e;)p&&p[m].run();m=-1,e=h.length}p=null,v=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function a(){}var l,f,d=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(t){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(t){f=r}}();var p,h=[],v=!1,m=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new c(t,e)),1!==h.length||v||o(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=a,d.addListener=a,d.once=a,d.off=a,d.removeListener=a,d.removeAllListeners=a,d.emit=a,d.prependListener=a,d.prependOnceListener=a,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){},function(t,e,n){"use strict";function r(){s=!1}Object.defineProperty(e,"__esModule",{value:!0});var o=["text/plain","text/html"],i=function(){(console.warn||console.log).call(arguments)},u=i.bind(console,"[clipboard-polyfill]"),s=!0;e.suppressDTWarnings=r;var c=function(){function t(){this.m={}}return t.prototype.setData=function(t,e){s&&-1===o.indexOf(t)&&u("Unknown data type: "+t,"Call clipboard.suppressWarnings() to suppress this warning."),this.m[t]=e},t.prototype.getData=function(t){return this.m[t]},t.prototype.forEach=function(t){for(var e in this.m)t(this.m[e],e)},t}();e.DT=c}])});