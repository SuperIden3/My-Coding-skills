/*I found this in d3js.org*/
// https://d3js.org v7.3.0 Copyright 2010-2021 Mike Bostock
!function(t, n) {
	"object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 = t.d3 || {})
}(this, (function(t) {
	"use strict";
	function n(t, n) {
		return null == t || null == n ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
	}
	function e(t) {
		let e = t
		  , r = t
		  , i = t;
		function o(t, n, e=0, o=t.length) {
			if (e < o) {
				if (0 !== r(n, n))
					return o;
				do {
					const r = e + o >>> 1;
					i(t[r], n) < 0 ? e = r + 1 : o = r
				} while (e < o)
			}
			return e
		}
		return 2 !== t.length && (e = (n,e)=>t(n) - e,
		r = n,
		i = (e,r)=>n(t(e), r)),
		{
			left: o,
			center: function(t, n, r=0, i=t.length) {
				const a = o(t, n, r, i - 1);
				return a > r && e(t[a - 1], n) > -e(t[a], n) ? a - 1 : a
			},
			right: function(t, n, e=0, o=t.length) {
				if (e < o) {
					if (0 !== r(n, n))
						return o;
					do {
						const r = e + o >>> 1;
						i(t[r], n) <= 0 ? e = r + 1 : o = r
					} while (e < o)
				}
				return e
			}
		}
	}
	function r(t) {
		return null === t ? NaN : +t
	}
	const i = e(n)
	  , o = i.right
	  , a = i.left
	  , u = e(r).center;
	var c = o;
	function f(t, n) {
		let e = 0;
		if (void 0 === n)
			for (let n of t)
				null != n && (n = +n) >= n && ++e;
		else {
			let r = -1;
			for (let i of t)
				null != (i = n(i, ++r, t)) && (i = +i) >= i && ++e
		}
		return e
	}
	function s(t) {
		return 0 | t.length
	}
	function l(t) {
		return !(t > 0)
	}
	function h(t) {
		return "object" != typeof t || "length"in t ? t : Array.from(t)
	}
	function d(t, n) {
		let e, r = 0, i = 0, o = 0;
		if (void 0 === n)
			for (let n of t)
				null != n && (n = +n) >= n && (e = n - i,
				i += e / ++r,
				o += e * (n - i));
		else {
			let a = -1;
			for (let u of t)
				null != (u = n(u, ++a, t)) && (u = +u) >= u && (e = u - i,
				i += e / ++r,
				o += e * (u - i))
		}
		if (r > 1)
			return o / (r - 1)
	}
	function p(t, n) {
		const e = d(t, n);
		return e ? Math.sqrt(e) : e
	}
	function g(t, n) {
		let e, r;
		if (void 0 === n)
			for (const n of t)
				null != n && (void 0 === e ? n >= n && (e = r = n) : (e > n && (e = n),
				r < n && (r = n)));
		else {
			let i = -1;
			for (let o of t)
				null != (o = n(o, ++i, t)) && (void 0 === e ? o >= o && (e = r = o) : (e > o && (e = o),
				r < o && (r = o)))
		}
		return [e, r]
	}
	class y {
		constructor() {
			this._partials = new Float64Array(32),
			this._n = 0
		}
		add(t) {
			const n = this._partials;
			let e = 0;
			for (let r = 0; r < this._n && r < 32; r++) {
				const i = n[r]
				  , o = t + i
				  , a = Math.abs(t) < Math.abs(i) ? t - (o - i) : i - (o - t);
				a && (n[e++] = a),
				t = o
			}
			return n[e] = t,
			this._n = e + 1,
			this
		}
		valueOf() {
			const t = this._partials;
			let n, e, r, i = this._n, o = 0;
			if (i > 0) {
				for (o = t[--i]; i > 0 && (n = o,
				e = t[--i],
				o = n + e,
				r = e - (o - n),
				!r); )
					;
				i > 0 && (r < 0 && t[i - 1] < 0 || r > 0 && t[i - 1] > 0) && (e = 2 * r,
				n = o + e,
				e == n - o && (o = n))
			}
			return o
		}
	}
	class InternMap extends Map {
		constructor(t, n=m) {
			if (super(),
			Object.defineProperties(this, {
				_intern: {
					value: new Map
				},
				_key: {
					value: n
				}
			}),
			null != t)
				for (const [n,e] of t)
					this.set(n, e)
		}
		get(t) {
			return super.get(v(this, t))
		}
		has(t) {
			return super.has(v(this, t))
		}
		set(t, n) {
			return super.set(_(this, t), n)
		}
		delete(t) {
			return super.delete(b(this, t))
		}
	}
	class InternSet extends Set {
		constructor(t, n=m) {
			if (super(),
			Object.defineProperties(this, {
				_intern: {
					value: new Map
				},
				_key: {
					value: n
				}
			}),
			null != t)
				for (const n of t)
					this.add(n)
		}
		has(t) {
			return super.has(v(this, t))
		}
		add(t) {
			return super.add(_(this, t))
		}
		delete(t) {
			return super.delete(b(this, t))
		}
	}
	function v({_intern: t, _key: n}, e) {
		const r = n(e);
		return t.has(r) ? t.get(r) : e
	}
	function _({_intern: t, _key: n}, e) {
		const r = n(e);
		return t.has(r) ? t.get(r) : (t.set(r, e),
		e)
	}
	function b({_intern: t, _key: n}, e) {
		const r = n(e);
		return t.has(r) && (e = t.get(r),
		t.delete(r)),
		e
	}
	function m(t) {
		return null !== t && "object" == typeof t ? t.valueOf() : t
	}
	function x(t) {
		return t
	}
	function w(t, ...n) {
		return k(t, x, x, n)
	}
	function M(t, ...n) {
		return k(t, Array.from, x, n)
	}
	function A(t, n) {
		for (let e = 1, r = n.length; e < r; ++e)
			t = t.flatMap((t=>t.pop().map((([n,e])=>[...t, n, e]))));
		return t
	}
	function T(t, n, ...e) {
		return k(t, x, n, e)
	}
	function S(t, n, ...e) {
		return k(t, Array.from, n, e)
	}
	function E(t) {
		if (1 !== t.length)
			throw new Error("duplicate key");
		return t[0]
	}
	function k(t, n, e, r) {
		return function t(i, o) {
			if (o >= r.length)
				return e(i);
			const a = new InternMap
			  , u = r[o++];
			let c = -1;
			for (const t of i) {
				const n = u(t, ++c, i)
				  , e = a.get(n);
				e ? e.push(t) : a.set(n, [t])
			}
			for (const [n,e] of a)
				a.set(n, t(e, o));
			return n(a)
		}(t, 0)
	}
	function N(t, n) {
		return Array.from(n, (n=>t[n]))
	}
	function C(t, ...n) {
		if ("function" != typeof t[Symbol.iterator])
			throw new TypeError("values is not iterable");
		t = Array.from(t);
		let[e] = n;
		if (e && 2 !== e.length || n.length > 1) {
			const r = Uint32Array.from(t, ((t,n)=>n));
			return n.length > 1 ? (n = n.map((n=>t.map(n))),
			r.sort(((t,e)=>{
				for (const r of n) {
					const n = z(r[t], r[e]);
					if (n)
						return n
				}
			}
			))) : (e = t.map(e),
			r.sort(((t,n)=>z(e[t], e[n])))),
			N(t, r)
		}
		return t.sort(P(e))
	}
	function P(t=n) {
		if (t === n)
			return z;
		if ("function" != typeof t)
			throw new TypeError("compare is not a function");
		return (n,e)=>{
			const r = t(n, e);
			return r || 0 === r ? r : (0 === t(e, e)) - (0 === t(n, n))
		}
	}
	function z(t, n) {
		return (null == t || !(t >= t)) - (null == n || !(n >= n)) || (t < n ? -1 : t > n ? 1 : 0)
	}
	var D = Array.prototype.slice;
	function R(t) {
		return ()=>t
	}
	var F = Math.sqrt(50)
	  , q = Math.sqrt(10)
	  , O = Math.sqrt(2);
	function U(t, n, e) {
		var r, i, o, a, u = -1;
		if (e = +e,
		(t = +t) === (n = +n) && e > 0)
			return [t];
		if ((r = n < t) && (i = t,
		t = n,
		n = i),
		0 === (a = I(t, n, e)) || !isFinite(a))
			return [];
		if (a > 0) {
			let e = Math.round(t / a)
			  , r = Math.round(n / a);
			for (e * a < t && ++e,
			r * a > n && --r,
			o = new Array(i = r - e + 1); ++u < i; )
				o[u] = (e + u) * a
		} else {
			a = -a;
			let e = Math.round(t * a)
			  , r = Math.round(n * a);
			for (e / a < t && ++e,
			r / a > n && --r,
			o = new Array(i = r - e + 1); ++u < i; )
				o[u] = (e + u) / a
		}
		return r && o.reverse(),
		o
	}
	function I(t, n, e) {
		var r = (n - t) / Math.max(0, e)
		  , i = Math.floor(Math.log(r) / Math.LN10)
		  , o = r / Math.pow(10, i);
		return i >= 0 ? (o >= F ? 10 : o >= q ? 5 : o >= O ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= F ? 10 : o >= q ? 5 : o >= O ? 2 : 1)
	}
	function B(t, n, e) {
		var r = Math.abs(n - t) / Math.max(0, e)
		  , i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10))
		  , o = r / i;
		return o >= F ? i *= 10 : o >= q ? i *= 5 : o >= O && (i *= 2),
		n < t ? -i : i
	}
	function Y(t, n, e) {
		let r;
		for (; ; ) {
			const i = I(t, n, e);
			if (i === r || 0 === i || !isFinite(i))
				return [t, n];
			i > 0 ? (t = Math.floor(t / i) * i,
			n = Math.ceil(n / i) * i) : i < 0 && (t = Math.ceil(t * i) / i,
			n = Math.floor(n * i) / i),
			r = i
		}
	}
	function L(t) {
		return Math.ceil(Math.log(f(t)) / Math.LN2) + 1
	}
	function j() {
		var t = x
		  , n = g
		  , e = L;
		function r(r) {
			Array.isArray(r) || (r = Array.from(r));
			var i, o, a = r.length, u = new Array(a);
			for (i = 0; i < a; ++i)
				u[i] = t(r[i], i, r);
			var f = n(u)
			  , s = f[0]
			  , l = f[1]
			  , h = e(u, s, l);
			if (!Array.isArray(h)) {
				const t = l
				  , e = +h;
				if (n === g && ([s,l] = Y(s, l, e)),
				(h = U(s, l, e))[h.length - 1] >= l)
					if (t >= l && n === g) {
						const t = I(s, l, e);
						isFinite(t) && (t > 0 ? l = (Math.floor(l / t) + 1) * t : t < 0 && (l = (Math.ceil(l * -t) + 1) / -t))
					} else
						h.pop()
			}
			for (var d = h.length; h[0] <= s; )
				h.shift(),
				--d;
			for (; h[d - 1] > l; )
				h.pop(),
				--d;
			var p, y = new Array(d + 1);
			for (i = 0; i <= d; ++i)
				(p = y[i] = []).x0 = i > 0 ? h[i - 1] : s,
				p.x1 = i < d ? h[i] : l;
			for (i = 0; i < a; ++i)
				null != (o = u[i]) && s <= o && o <= l && y[c(h, o, 0, d)].push(r[i]);
			return y
		}
		return r.value = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : R(n),
			r) : t
		}
		,
		r.domain = function(t) {
			return arguments.length ? (n = "function" == typeof t ? t : R([t[0], t[1]]),
			r) : n
		}
		,
		r.thresholds = function(t) {
			return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? R(D.call(t)) : R(t),
			r) : e
		}
		,
		r
	}
	function H(t, n) {
		let e;
		if (void 0 === n)
			for (const n of t)
				null != n && (e < n || void 0 === e && n >= n) && (e = n);
		else {
			let r = -1;
			for (let i of t)
				null != (i = n(i, ++r, t)) && (e < i || void 0 === e && i >= i) && (e = i)
		}
		return e
	}
	function X(t, n) {
		let e;
		if (void 0 === n)
			for (const n of t)
				null != n && (e > n || void 0 === e && n >= n) && (e = n);
		else {
			let r = -1;
			for (let i of t)
				null != (i = n(i, ++r, t)) && (e > i || void 0 === e && i >= i) && (e = i)
		}
		return e
	}
	function G(t, n, e=0, r=t.length - 1, i) {
		for (i = void 0 === i ? z : P(i); r > e; ) {
			if (r - e > 600) {
				const o = r - e + 1
				  , a = n - e + 1
				  , u = Math.log(o)
				  , c = .5 * Math.exp(2 * u / 3)
				  , f = .5 * Math.sqrt(u * c * (o - c) / o) * (a - o / 2 < 0 ? -1 : 1);
				G(t, n, Math.max(e, Math.floor(n - a * c / o + f)), Math.min(r, Math.floor(n + (o - a) * c / o + f)), i)
			}
			const o = t[n];
			let a = e
			  , u = r;
			for (V(t, e, n),
			i(t[r], o) > 0 && V(t, e, r); a < u; ) {
				for (V(t, a, u),
				++a,
				--u; i(t[a], o) < 0; )
					++a;
				for (; i(t[u], o) > 0; )
					--u
			}
			0 === i(t[e], o) ? V(t, e, u) : (++u,
			V(t, u, r)),
			u <= n && (e = u + 1),
			n <= u && (r = u - 1)
		}
		return t
	}
	function V(t, n, e) {
		const r = t[n];
		t[n] = t[e],
		t[e] = r
	}
	function $(t, n, e) {
		if (t = Float64Array.from(function*(t, n) {
			if (void 0 === n)
				for (let n of t)
					null != n && (n = +n) >= n && (yield n);
			else {
				let e = -1;
				for (let r of t)
					null != (r = n(r, ++e, t)) && (r = +r) >= r && (yield r)
			}
		}(t, e)),
		r = t.length) {
			if ((n = +n) <= 0 || r < 2)
				return X(t);
			if (n >= 1)
				return H(t);
			var r, i = (r - 1) * n, o = Math.floor(i), a = H(G(t, o).subarray(0, o + 1));
			return a + (X(t.subarray(o + 1)) - a) * (i - o)
		}
	}
	function W(t, n, e=r) {
		if (i = t.length) {
			if ((n = +n) <= 0 || i < 2)
				return +e(t[0], 0, t);
			if (n >= 1)
				return +e(t[i - 1], i - 1, t);
			var i, o = (i - 1) * n, a = Math.floor(o), u = +e(t[a], a, t);
			return u + (+e(t[a + 1], a + 1, t) - u) * (o - a)
		}
	}
	function Z(t, n) {
		let e, r = -1, i = -1;
		if (void 0 === n)
			for (const n of t)
				++i,
				null != n && (e < n || void 0 === e && n >= n) && (e = n,
				r = i);
		else
			for (let o of t)
				null != (o = n(o, ++i, t)) && (e < o || void 0 === e && o >= o) && (e = o,
				r = i);
		return r
	}
	function K(t) {
		return Array.from(function*(t) {
			for (const n of t)
				yield*n
		}(t))
	}
	function Q(t, n) {
		let e, r = -1, i = -1;
		if (void 0 === n)
			for (const n of t)
				++i,
				null != n && (e > n || void 0 === e && n >= n) && (e = n,
				r = i);
		else
			for (let o of t)
				null != (o = n(o, ++i, t)) && (e > o || void 0 === e && o >= o) && (e = o,
				r = i);
		return r
	}
	function J(t, n) {
		return [t, n]
	}
	function tt(t, n, e) {
		t = +t,
		n = +n,
		e = (i = arguments.length) < 2 ? (n = t,
		t = 0,
		1) : i < 3 ? 1 : +e;
		for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i; )
			o[r] = t + r * e;
		return o
	}
	function nt(t, e=n) {
		if (1 === e.length)
			return Q(t, e);
		let r, i = -1, o = -1;
		for (const n of t)
			++o,
			(i < 0 ? 0 === e(n, n) : e(n, r) < 0) && (r = n,
			i = o);
		return i
	}
	var et = rt(Math.random);
	function rt(t) {
		return function(n, e=0, r=n.length) {
			let i = r - (e = +e);
			for (; i; ) {
				const r = t() * i-- | 0
				  , o = n[i + e];
				n[i + e] = n[r + e],
				n[r + e] = o
			}
			return n
		}
	}
	function it(t) {
		if (!(i = t.length))
			return [];
		for (var n = -1, e = X(t, ot), r = new Array(e); ++n < e; )
			for (var i, o = -1, a = r[n] = new Array(i); ++o < i; )
				a[o] = t[o][n];
		return r
	}
	function ot(t) {
		return t.length
	}
	function at(t) {
		return t instanceof InternSet ? t : new InternSet(t)
	}
	function ut(t, n) {
		const e = t[Symbol.iterator]()
		  , r = new Set;
		for (const t of n) {
			const n = ct(t);
			if (r.has(n))
				continue;
			let i, o;
			for (; ({value: i, done: o} = e.next()); ) {
				if (o)
					return !1;
				const t = ct(i);
				if (r.add(t),
				Object.is(n, t))
					break
			}
		}
		return !0
	}
	function ct(t) {
		return null !== t && "object" == typeof t ? t.valueOf() : t
	}
	function ft(t) {
		return t
	}
	var st = 1e-6;
	function lt(t) {
		return "translate(" + t + ",0)"
	}
	function ht(t) {
		return "translate(0," + t + ")"
	}
	function dt(t) {
		return n=>+t(n)
	}
	function pt(t, n) {
		return n = Math.max(0, t.bandwidth() - 2 * n) / 2,
		t.round() && (n = Math.round(n)),
		e=>+t(e) + n
	}
	function gt() {
		return !this.__axis
	}
	function yt(t, n) {
		var e = []
		  , r = null
		  , i = null
		  , o = 6
		  , a = 6
		  , u = 3
		  , c = "undefined" != typeof window && window.devicePixelRatio > 1 ? 0 : .5
		  , f = 1 === t || 4 === t ? -1 : 1
		  , s = 4 === t || 2 === t ? "x" : "y"
		  , l = 1 === t || 3 === t ? lt : ht;
		function h(h) {
			var d = null == r ? n.ticks ? n.ticks.apply(n, e) : n.domain() : r
			  , p = null == i ? n.tickFormat ? n.tickFormat.apply(n, e) : ft : i
			  , g = Math.max(o, 0) + u
			  , y = n.range()
			  , v = +y[0] + c
			  , _ = +y[y.length - 1] + c
			  , b = (n.bandwidth ? pt : dt)(n.copy(), c)
			  , m = h.selection ? h.selection() : h
			  , x = m.selectAll(".domain").data([null])
			  , w = m.selectAll(".tick").data(d, n).order()
			  , M = w.exit()
			  , A = w.enter().append("g").attr("class", "tick")
			  , T = w.select("line")
			  , S = w.select("text");
			x = x.merge(x.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")),
			w = w.merge(A),
			T = T.merge(A.append("line").attr("stroke", "currentColor").attr(s + "2", f * o)),
			S = S.merge(A.append("text").attr("fill", "currentColor").attr(s, f * g).attr("dy", 1 === t ? "0em" : 3 === t ? "0.71em" : "0.32em")),
			h !== m && (x = x.transition(h),
			w = w.transition(h),
			T = T.transition(h),
			S = S.transition(h),
			M = M.transition(h).attr("opacity", st).attr("transform", (function(t) {
				return isFinite(t = b(t)) ? l(t + c) : this.getAttribute("transform")
			}
			)),
			A.attr("opacity", st).attr("transform", (function(t) {
				var n = this.parentNode.__axis;
				return l((n && isFinite(n = n(t)) ? n : b(t)) + c)
			}
			))),
			M.remove(),
			x.attr("d", 4 === t || 2 === t ? a ? "M" + f * a + "," + v + "H" + c + "V" + _ + "H" + f * a : "M" + c + "," + v + "V" + _ : a ? "M" + v + "," + f * a + "V" + c + "H" + _ + "V" + f * a : "M" + v + "," + c + "H" + _),
			w.attr("opacity", 1).attr("transform", (function(t) {
				return l(b(t) + c)
			}
			)),
			T.attr(s + "2", f * o),
			S.attr(s, f * g).text(p),
			m.filter(gt).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", 2 === t ? "start" : 4 === t ? "end" : "middle"),
			m.each((function() {
				this.__axis = b
			}
			))
		}
		return h.scale = function(t) {
			return arguments.length ? (n = t,
			h) : n
		}
		,
		h.ticks = function() {
			return e = Array.from(arguments),
			h
		}
		,
		h.tickArguments = function(t) {
			return arguments.length ? (e = null == t ? [] : Array.from(t),
			h) : e.slice()
		}
		,
		h.tickValues = function(t) {
			return arguments.length ? (r = null == t ? null : Array.from(t),
			h) : r && r.slice()
		}
		,
		h.tickFormat = function(t) {
			return arguments.length ? (i = t,
			h) : i
		}
		,
		h.tickSize = function(t) {
			return arguments.length ? (o = a = +t,
			h) : o
		}
		,
		h.tickSizeInner = function(t) {
			return arguments.length ? (o = +t,
			h) : o
		}
		,
		h.tickSizeOuter = function(t) {
			return arguments.length ? (a = +t,
			h) : a
		}
		,
		h.tickPadding = function(t) {
			return arguments.length ? (u = +t,
			h) : u
		}
		,
		h.offset = function(t) {
			return arguments.length ? (c = +t,
			h) : c
		}
		,
		h
	}
	var vt = {
		value: ()=>{}
	};
	function _t() {
		for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
			if (!(t = arguments[n] + "") || t in r || /[\s.]/.test(t))
				throw new Error("illegal type: " + t);
			r[t] = []
		}
		return new bt(r)
	}
	function bt(t) {
		this._ = t
	}
	function mt(t, n) {
		return t.trim().split(/^|\s+/).map((function(t) {
			var e = ""
			  , r = t.indexOf(".");
			if (r >= 0 && (e = t.slice(r + 1),
			t = t.slice(0, r)),
			t && !n.hasOwnProperty(t))
				throw new Error("unknown type: " + t);
			return {
				type: t,
				name: e
			}
		}
		))
	}
	function xt(t, n) {
		for (var e, r = 0, i = t.length; r < i; ++r)
			if ((e = t[r]).name === n)
				return e.value
	}
	function wt(t, n, e) {
		for (var r = 0, i = t.length; r < i; ++r)
			if (t[r].name === n) {
				t[r] = vt,
				t = t.slice(0, r).concat(t.slice(r + 1));
				break
			}
		return null != e && t.push({
			name: n,
			value: e
		}),
		t
	}
	bt.prototype = _t.prototype = {
		constructor: bt,
		on: function(t, n) {
			var e, r = this._, i = mt(t + "", r), o = -1, a = i.length;
			if (!(arguments.length < 2)) {
				if (null != n && "function" != typeof n)
					throw new Error("invalid callback: " + n);
				for (; ++o < a; )
					if (e = (t = i[o]).type)
						r[e] = wt(r[e], t.name, n);
					else if (null == n)
						for (e in r)
							r[e] = wt(r[e], t.name, null);
				return this
			}
			for (; ++o < a; )
				if ((e = (t = i[o]).type) && (e = xt(r[e], t.name)))
					return e
		},
		copy: function() {
			var t = {}
			  , n = this._;
			for (var e in n)
				t[e] = n[e].slice();
			return new bt(t)
		},
		call: function(t, n) {
			if ((e = arguments.length - 2) > 0)
				for (var e, r, i = new Array(e), o = 0; o < e; ++o)
					i[o] = arguments[o + 2];
			if (!this._.hasOwnProperty(t))
				throw new Error("unknown type: " + t);
			for (o = 0,
			e = (r = this._[t]).length; o < e; ++o)
				r[o].value.apply(n, i)
		},
		apply: function(t, n, e) {
			if (!this._.hasOwnProperty(t))
				throw new Error("unknown type: " + t);
			for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
				r[i].value.apply(n, e)
		}
	};
	var Mt = "http://www.w3.org/1999/xhtml"
	  , At = {
		svg: "http://www.w3.org/2000/svg",
		xhtml: Mt,
		xlink: "http://www.w3.org/1999/xlink",
		xml: "http://www.w3.org/XML/1998/namespace",
		xmlns: "http://www.w3.org/2000/xmlns/"
	};
	function Tt(t) {
		var n = t += ""
		  , e = n.indexOf(":");
		return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
		At.hasOwnProperty(n) ? {
			space: At[n],
			local: t
		} : t
	}
	function St(t) {
		return function() {
			var n = this.ownerDocument
			  , e = this.namespaceURI;
			return e === Mt && n.documentElement.namespaceURI === Mt ? n.createElement(t) : n.createElementNS(e, t)
		}
	}
	function Et(t) {
		return function() {
			return this.ownerDocument.createElementNS(t.space, t.local)
		}
	}
	function kt(t) {
		var n = Tt(t);
		return (n.local ? Et : St)(n)
	}
	function Nt() {}
	function Ct(t) {
		return null == t ? Nt : function() {
			return this.querySelector(t)
		}
	}
	function Pt(t) {
		return null == t ? [] : Array.isArray(t) ? t : Array.from(t)
	}
	function zt() {
		return []
	}
	function Dt(t) {
		return null == t ? zt : function() {
			return this.querySelectorAll(t)
		}
	}
	function Rt(t) {
		return function() {
			return this.matches(t)
		}
	}
	function Ft(t) {
		return function(n) {
			return n.matches(t)
		}
	}
	var qt = Array.prototype.find;
	function Ot() {
		return this.firstElementChild
	}
	var Ut = Array.prototype.filter;
	function It() {
		return Array.from(this.children)
	}
	function Bt(t) {
		return new Array(t.length)
	}
	function Yt(t, n) {
		this.ownerDocument = t.ownerDocument,
		this.namespaceURI = t.namespaceURI,
		this._next = null,
		this._parent = t,
		this.__data__ = n
	}
	function Lt(t) {
		return function() {
			return t
		}
	}
	function jt(t, n, e, r, i, o) {
		for (var a, u = 0, c = n.length, f = o.length; u < f; ++u)
			(a = n[u]) ? (a.__data__ = o[u],
			r[u] = a) : e[u] = new Yt(t,o[u]);
		for (; u < c; ++u)
			(a = n[u]) && (i[u] = a)
	}
	function Ht(t, n, e, r, i, o, a) {
		var u, c, f, s = new Map, l = n.length, h = o.length, d = new Array(l);
		for (u = 0; u < l; ++u)
			(c = n[u]) && (d[u] = f = a.call(c, c.__data__, u, n) + "",
			s.has(f) ? i[u] = c : s.set(f, c));
		for (u = 0; u < h; ++u)
			f = a.call(t, o[u], u, o) + "",
			(c = s.get(f)) ? (r[u] = c,
			c.__data__ = o[u],
			s.delete(f)) : e[u] = new Yt(t,o[u]);
		for (u = 0; u < l; ++u)
			(c = n[u]) && s.get(d[u]) === c && (i[u] = c)
	}
	function Xt(t) {
		return t.__data__
	}
	function Gt(t) {
		return "object" == typeof t && "length"in t ? t : Array.from(t)
	}
	function Vt(t, n) {
		return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
	}
	function $t(t) {
		return function() {
			this.removeAttribute(t)
		}
	}
	function Wt(t) {
		return function() {
			this.removeAttributeNS(t.space, t.local)
		}
	}
	function Zt(t, n) {
		return function() {
			this.setAttribute(t, n)
		}
	}
	function Kt(t, n) {
		return function() {
			this.setAttributeNS(t.space, t.local, n)
		}
	}
	function Qt(t, n) {
		return function() {
			var e = n.apply(this, arguments);
			null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
		}
	}
	function Jt(t, n) {
		return function() {
			var e = n.apply(this, arguments);
			null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
		}
	}
	function tn(t) {
		return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
	}
	function nn(t) {
		return function() {
			this.style.removeProperty(t)
		}
	}
	function en(t, n, e) {
		return function() {
			this.style.setProperty(t, n, e)
		}
	}
	function rn(t, n, e) {
		return function() {
			var r = n.apply(this, arguments);
			null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
		}
	}
	function on(t, n) {
		return t.style.getPropertyValue(n) || tn(t).getComputedStyle(t, null).getPropertyValue(n)
	}
	function an(t) {
		return function() {
			delete this[t]
		}
	}
	function un(t, n) {
		return function() {
			this[t] = n
		}
	}
	function cn(t, n) {
		return function() {
			var e = n.apply(this, arguments);
			null == e ? delete this[t] : this[t] = e
		}
	}
	function fn(t) {
		return t.trim().split(/^|\s+/)
	}
	function sn(t) {
		return t.classList || new ln(t)
	}
	function ln(t) {
		this._node = t,
		this._names = fn(t.getAttribute("class") || "")
	}
	function hn(t, n) {
		for (var e = sn(t), r = -1, i = n.length; ++r < i; )
			e.add(n[r])
	}
	function dn(t, n) {
		for (var e = sn(t), r = -1, i = n.length; ++r < i; )
			e.remove(n[r])
	}
	function pn(t) {
		return function() {
			hn(this, t)
		}
	}
	function gn(t) {
		return function() {
			dn(this, t)
		}
	}
	function yn(t, n) {
		return function() {
			(n.apply(this, arguments) ? hn : dn)(this, t)
		}
	}
	function vn() {
		this.textContent = ""
	}
	function _n(t) {
		return function() {
			this.textContent = t
		}
	}
	function bn(t) {
		return function() {
			var n = t.apply(this, arguments);
			this.textContent = null == n ? "" : n
		}
	}
	function mn() {
		this.innerHTML = ""
	}
	function xn(t) {
		return function() {
			this.innerHTML = t
		}
	}
	function wn(t) {
		return function() {
			var n = t.apply(this, arguments);
			this.innerHTML = null == n ? "" : n
		}
	}
	function Mn() {
		this.nextSibling && this.parentNode.appendChild(this)
	}
	function An() {
		this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
	}
	function Tn() {
		return null
	}
	function Sn() {
		var t = this.parentNode;
		t && t.removeChild(this)
	}
	function En() {
		var t = this.cloneNode(!1)
		  , n = this.parentNode;
		return n ? n.insertBefore(t, this.nextSibling) : t
	}
	function kn() {
		var t = this.cloneNode(!0)
		  , n = this.parentNode;
		return n ? n.insertBefore(t, this.nextSibling) : t
	}
	function Nn(t) {
		return t.trim().split(/^|\s+/).map((function(t) {
			var n = ""
			  , e = t.indexOf(".");
			return e >= 0 && (n = t.slice(e + 1),
			t = t.slice(0, e)),
			{
				type: t,
				name: n
			}
		}
		))
	}
	function Cn(t) {
		return function() {
			var n = this.__on;
			if (n) {
				for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
					e = n[r],
					t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.options);
				++i ? n.length = i : delete this.__on
			}
		}
	}
	function Pn(t, n, e) {
		return function() {
			var r, i = this.__on, o = function(t) {
				return function(n) {
					t.call(this, n, this.__data__)
				}
			}(n);
			if (i)
				for (var a = 0, u = i.length; a < u; ++a)
					if ((r = i[a]).type === t.type && r.name === t.name)
						return this.removeEventListener(r.type, r.listener, r.options),
						this.addEventListener(r.type, r.listener = o, r.options = e),
						void (r.value = n);
			this.addEventListener(t.type, o, e),
			r = {
				type: t.type,
				name: t.name,
				value: n,
				listener: o,
				options: e
			},
			i ? i.push(r) : this.__on = [r]
		}
	}
	function zn(t, n, e) {
		var r = tn(t)
		  , i = r.CustomEvent;
		"function" == typeof i ? i = new i(n,e) : (i = r.document.createEvent("Event"),
		e ? (i.initEvent(n, e.bubbles, e.cancelable),
		i.detail = e.detail) : i.initEvent(n, !1, !1)),
		t.dispatchEvent(i)
	}
	function Dn(t, n) {
		return function() {
			return zn(this, t, n)
		}
	}
	function Rn(t, n) {
		return function() {
			return zn(this, t, n.apply(this, arguments))
		}
	}
	Yt.prototype = {
		constructor: Yt,
		appendChild: function(t) {
			return this._parent.insertBefore(t, this._next)
		},
		insertBefore: function(t, n) {
			return this._parent.insertBefore(t, n)
		},
		querySelector: function(t) {
			return this._parent.querySelector(t)
		},
		querySelectorAll: function(t) {
			return this._parent.querySelectorAll(t)
		}
	},
	ln.prototype = {
		add: function(t) {
			this._names.indexOf(t) < 0 && (this._names.push(t),
			this._node.setAttribute("class", this._names.join(" ")))
		},
		remove: function(t) {
			var n = this._names.indexOf(t);
			n >= 0 && (this._names.splice(n, 1),
			this._node.setAttribute("class", this._names.join(" ")))
		},
		contains: function(t) {
			return this._names.indexOf(t) >= 0
		}
	};
	var Fn = [null];
	function qn(t, n) {
		this._groups = t,
		this._parents = n
	}
	function On() {
		return new qn([[document.documentElement]],Fn)
	}
	function Un(t) {
		return "string" == typeof t ? new qn([[document.querySelector(t)]],[document.documentElement]) : new qn([[t]],Fn)
	}
	qn.prototype = On.prototype = {
		constructor: qn,
		select: function(t) {
			"function" != typeof t && (t = Ct(t));
			for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
				for (var o, a, u = n[i], c = u.length, f = r[i] = new Array(c), s = 0; s < c; ++s)
					(o = u[s]) && (a = t.call(o, o.__data__, s, u)) && ("__data__"in o && (a.__data__ = o.__data__),
					f[s] = a);
			return new qn(r,this._parents)
		},
		selectAll: function(t) {
			t = "function" == typeof t ? function(t) {
				return function() {
					return Pt(t.apply(this, arguments))
				}
			}(t) : Dt(t);
			for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
				for (var a, u = n[o], c = u.length, f = 0; f < c; ++f)
					(a = u[f]) && (r.push(t.call(a, a.__data__, f, u)),
					i.push(a));
			return new qn(r,i)
		},
		selectChild: function(t) {
			return this.select(null == t ? Ot : function(t) {
				return function() {
					return qt.call(this.children, t)
				}
			}("function" == typeof t ? t : Ft(t)))
		},
		selectChildren: function(t) {
			return this.selectAll(null == t ? It : function(t) {
				return function() {
					return Ut.call(this.children, t)
				}
			}("function" == typeof t ? t : Ft(t)))
		},
		filter: function(t) {
			"function" != typeof t && (t = Rt(t));
			for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
				for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f)
					(o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o);
			return new qn(r,this._parents)
		},
		data: function(t, n) {
			if (!arguments.length)
				return Array.from(this, Xt);
			var e = n ? Ht : jt
			  , r = this._parents
			  , i = this._groups;
			"function" != typeof t && (t = Lt(t));
			for (var o = i.length, a = new Array(o), u = new Array(o), c = new Array(o), f = 0; f < o; ++f) {
				var s = r[f]
				  , l = i[f]
				  , h = l.length
				  , d = Gt(t.call(s, s && s.__data__, f, r))
				  , p = d.length
				  , g = u[f] = new Array(p)
				  , y = a[f] = new Array(p)
				  , v = c[f] = new Array(h);
				e(s, l, g, y, v, d, n);
				for (var _, b, m = 0, x = 0; m < p; ++m)
					if (_ = g[m]) {
						for (m >= x && (x = m + 1); !(b = y[x]) && ++x < p; )
							;
						_._next = b || null
					}
			}
			return (a = new qn(a,r))._enter = u,
			a._exit = c,
			a
		},
		enter: function() {
			return new qn(this._enter || this._groups.map(Bt),this._parents)
		},
		exit: function() {
			return new qn(this._exit || this._groups.map(Bt),this._parents)
		},
		join: function(t, n, e) {
			var r = this.enter()
			  , i = this
			  , o = this.exit();
			return "function" == typeof t ? (r = t(r)) && (r = r.selection()) : r = r.append(t + ""),
			null != n && (i = n(i)) && (i = i.selection()),
			null == e ? o.remove() : e(o),
			r && i ? r.merge(i).order() : i
		},
		merge: function(t) {
			for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, a = Math.min(i, o), u = new Array(i), c = 0; c < a; ++c)
				for (var f, s = e[c], l = r[c], h = s.length, d = u[c] = new Array(h), p = 0; p < h; ++p)
					(f = s[p] || l[p]) && (d[p] = f);
			for (; c < i; ++c)
				u[c] = e[c];
			return new qn(u,this._parents)
		},
		selection: function() {
			return this
		},
		order: function() {
			for (var t = this._groups, n = -1, e = t.length; ++n < e; )
				for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0; )
					(r = i[o]) && (a && 4 ^ r.compareDocumentPosition(a) && a.parentNode.insertBefore(r, a),
					a = r);
			return this
		},
		sort: function(t) {
			function n(n, e) {
				return n && e ? t(n.__data__, e.__data__) : !n - !e
			}
			t || (t = Vt);
			for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
				for (var a, u = e[o], c = u.length, f = i[o] = new Array(c), s = 0; s < c; ++s)
					(a = u[s]) && (f[s] = a);
				f.sort(n)
			}
			return new qn(i,this._parents).order()
		},
		call: function() {
			var t = arguments[0];
			return arguments[0] = this,
			t.apply(null, arguments),
			this
		},
		nodes: function() {
			return Array.from(this)
		},
		node: function() {
			for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
				for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
					var a = r[i];
					if (a)
						return a
				}
			return null
		},
		size: function() {
			let t = 0;
			for (const n of this)
				++t;
			return t
		},
		empty: function() {
			return !this.node()
		},
		each: function(t) {
			for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
				for (var i, o = n[e], a = 0, u = o.length; a < u; ++a)
					(i = o[a]) && t.call(i, i.__data__, a, o);
			return this
		},
		attr: function(t, n) {
			var e = Tt(t);
			if (arguments.length < 2) {
				var r = this.node();
				return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e)
			}
			return this.each((null == n ? e.local ? Wt : $t : "function" == typeof n ? e.local ? Jt : Qt : e.local ? Kt : Zt)(e, n))
		},
		style: function(t, n, e) {
			return arguments.length > 1 ? this.each((null == n ? nn : "function" == typeof n ? rn : en)(t, n, null == e ? "" : e)) : on(this.node(), t)
		},
		property: function(t, n) {
			return arguments.length > 1 ? this.each((null == n ? an : "function" == typeof n ? cn : un)(t, n)) : this.node()[t]
		},
		classed: function(t, n) {
			var e = fn(t + "");
			if (arguments.length < 2) {
				for (var r = sn(this.node()), i = -1, o = e.length; ++i < o; )
					if (!r.contains(e[i]))
						return !1;
				return !0
			}
			return this.each(("function" == typeof n ? yn : n ? pn : gn)(e, n))
		},
		text: function(t) {
			return arguments.length ? this.each(null == t ? vn : ("function" == typeof t ? bn : _n)(t)) : this.node().textContent
		},
		html: function(t) {
			return arguments.length ? this.each(null == t ? mn : ("function" == typeof t ? wn : xn)(t)) : this.node().innerHTML
		},
		raise: function() {
			return this.each(Mn)
		},
		lower: function() {
			return this.each(An)
		},
		append: function(t) {
			var n = "function" == typeof t ? t : kt(t);
			return this.select((function() {
				return this.appendChild(n.apply(this, arguments))
			}
			))
		},
		insert: function(t, n) {
			var e = "function" == typeof t ? t : kt(t)
			  , r = null == n ? Tn : "function" == typeof n ? n : Ct(n);
			return this.select((function() {
				return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
			}
			))
		},
		remove: function() {
			return this.each(Sn)
		},
		clone: function(t) {
			return this.select(t ? kn : En)
		},
		datum: function(t) {
			return arguments.length ? this.property("__data__", t) : this.node().__data__
		},
		on: function(t, n, e) {
			var r, i, o = Nn(t + ""), a = o.length;
			if (!(arguments.length < 2)) {
				for (u = n ? Pn : Cn,
				r = 0; r < a; ++r)
					this.each(u(o[r], n, e));
				return this
			}
			var u = this.node().__on;
			if (u)
				for (var c, f = 0, s = u.length; f < s; ++f)
					for (r = 0,
					c = u[f]; r < a; ++r)
						if ((i = o[r]).type === c.type && i.name === c.name)
							return c.value
		},
		dispatch: function(t, n) {
			return this.each(("function" == typeof n ? Rn : Dn)(t, n))
		},
		[Symbol.iterator]: function*() {
			for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
				for (var r, i = t[n], o = 0, a = i.length; o < a; ++o)
					(r = i[o]) && (yield r)
		}
	};
	var In = 0;
	function Bn() {
		return new Yn
	}
	function Yn() {
		this._ = "@" + (++In).toString(36)
	}
	function Ln(t) {
		let n;
		for (; n = t.sourceEvent; )
			t = n;
		return t
	}
	function jn(t, n) {
		if (t = Ln(t),
		void 0 === n && (n = t.currentTarget),
		n) {
			var e = n.ownerSVGElement || n;
			if (e.createSVGPoint) {
				var r = e.createSVGPoint();
				return r.x = t.clientX,
				r.y = t.clientY,
				[(r = r.matrixTransform(n.getScreenCTM().inverse())).x, r.y]
			}
			if (n.getBoundingClientRect) {
				var i = n.getBoundingClientRect();
				return [t.clientX - i.left - n.clientLeft, t.clientY - i.top - n.clientTop]
			}
		}
		return [t.pageX, t.pageY]
	}
	Yn.prototype = Bn.prototype = {
		constructor: Yn,
		get: function(t) {
			for (var n = this._; !(n in t); )
				if (!(t = t.parentNode))
					return;
			return t[n]
		},
		set: function(t, n) {
			return t[this._] = n
		},
		remove: function(t) {
			return this._ in t && delete t[this._]
		},
		toString: function() {
			return this._
		}
	};
	const Hn = {
		passive: !1
	}
	  , Xn = {
		capture: !0,
		passive: !1
	};
	function Gn(t) {
		t.stopImmediatePropagation()
	}
	function Vn(t) {
		t.preventDefault(),
		t.stopImmediatePropagation()
	}
	function $n(t) {
		var n = t.document.documentElement
		  , e = Un(t).on("dragstart.drag", Vn, Xn);
		"onselectstart"in n ? e.on("selectstart.drag", Vn, Xn) : (n.__noselect = n.style.MozUserSelect,
		n.style.MozUserSelect = "none")
	}
	function Wn(t, n) {
		var e = t.document.documentElement
		  , r = Un(t).on("dragstart.drag", null);
		n && (r.on("click.drag", Vn, Xn),
		setTimeout((function() {
			r.on("click.drag", null)
		}
		), 0)),
		"onselectstart"in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect,
		delete e.__noselect)
	}
	var Zn = t=>()=>t;
	function Kn(t, {sourceEvent: n, subject: e, target: r, identifier: i, active: o, x: a, y: u, dx: c, dy: f, dispatch: s}) {
		Object.defineProperties(this, {
			type: {
				value: t,
				enumerable: !0,
				configurable: !0
			},
			sourceEvent: {
				value: n,
				enumerable: !0,
				configurable: !0
			},
			subject: {
				value: e,
				enumerable: !0,
				configurable: !0
			},
			target: {
				value: r,
				enumerable: !0,
				configurable: !0
			},
			identifier: {
				value: i,
				enumerable: !0,
				configurable: !0
			},
			active: {
				value: o,
				enumerable: !0,
				configurable: !0
			},
			x: {
				value: a,
				enumerable: !0,
				configurable: !0
			},
			y: {
				value: u,
				enumerable: !0,
				configurable: !0
			},
			dx: {
				value: c,
				enumerable: !0,
				configurable: !0
			},
			dy: {
				value: f,
				enumerable: !0,
				configurable: !0
			},
			_: {
				value: s
			}
		})
	}
	function Qn(t) {
		return !t.ctrlKey && !t.button
	}
	function Jn() {
		return this.parentNode
	}
	function te(t, n) {
		return null == n ? {
			x: t.x,
			y: t.y
		} : n
	}
	function ne() {
		return navigator.maxTouchPoints || "ontouchstart"in this
	}
	function ee(t, n, e) {
		t.prototype = n.prototype = e,
		e.constructor = t
	}
	function re(t, n) {
		var e = Object.create(t.prototype);
		for (var r in n)
			e[r] = n[r];
		return e
	}
	function ie() {}
	Kn.prototype.on = function() {
		var t = this._.on.apply(this._, arguments);
		return t === this._ ? this : t
	}
	;
	var oe = .7
	  , ae = 1 / oe
	  , ue = "\\s*([+-]?\\d+)\\s*"
	  , ce = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*"
	  , fe = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*"
	  , se = /^#([0-9a-f]{3,8})$/
	  , le = new RegExp("^rgb\\(" + [ue, ue, ue] + "\\)$")
	  , he = new RegExp("^rgb\\(" + [fe, fe, fe] + "\\)$")
	  , de = new RegExp("^rgba\\(" + [ue, ue, ue, ce] + "\\)$")
	  , pe = new RegExp("^rgba\\(" + [fe, fe, fe, ce] + "\\)$")
	  , ge = new RegExp("^hsl\\(" + [ce, fe, fe] + "\\)$")
	  , ye = new RegExp("^hsla\\(" + [ce, fe, fe, ce] + "\\)$")
	  , ve = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	};
	function _e() {
		return this.rgb().formatHex()
	}
	function be() {
		return this.rgb().formatRgb()
	}
	function me(t) {
		var n, e;
		return t = (t + "").trim().toLowerCase(),
		(n = se.exec(t)) ? (e = n[1].length,
		n = parseInt(n[1], 16),
		6 === e ? xe(n) : 3 === e ? new Te(n >> 8 & 15 | n >> 4 & 240,n >> 4 & 15 | 240 & n,(15 & n) << 4 | 15 & n,1) : 8 === e ? we(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (255 & n) / 255) : 4 === e ? we(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, ((15 & n) << 4 | 15 & n) / 255) : null) : (n = le.exec(t)) ? new Te(n[1],n[2],n[3],1) : (n = he.exec(t)) ? new Te(255 * n[1] / 100,255 * n[2] / 100,255 * n[3] / 100,1) : (n = de.exec(t)) ? we(n[1], n[2], n[3], n[4]) : (n = pe.exec(t)) ? we(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = ge.exec(t)) ? Ne(n[1], n[2] / 100, n[3] / 100, 1) : (n = ye.exec(t)) ? Ne(n[1], n[2] / 100, n[3] / 100, n[4]) : ve.hasOwnProperty(t) ? xe(ve[t]) : "transparent" === t ? new Te(NaN,NaN,NaN,0) : null
	}
	function xe(t) {
		return new Te(t >> 16 & 255,t >> 8 & 255,255 & t,1)
	}
	function we(t, n, e, r) {
		return r <= 0 && (t = n = e = NaN),
		new Te(t,n,e,r)
	}
	function Me(t) {
		return t instanceof ie || (t = me(t)),
		t ? new Te((t = t.rgb()).r,t.g,t.b,t.opacity) : new Te
	}
	function Ae(t, n, e, r) {
		return 1 === arguments.length ? Me(t) : new Te(t,n,e,null == r ? 1 : r)
	}
	function Te(t, n, e, r) {
		this.r = +t,
		this.g = +n,
		this.b = +e,
		this.opacity = +r
	}
	function Se() {
		return "#" + ke(this.r) + ke(this.g) + ke(this.b)
	}
	function Ee() {
		var t = this.opacity;
		return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
	}
	function ke(t) {
		return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
	}
	function Ne(t, n, e, r) {
		return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN),
		new ze(t,n,e,r)
	}
	function Ce(t) {
		if (t instanceof ze)
			return new ze(t.h,t.s,t.l,t.opacity);
		if (t instanceof ie || (t = me(t)),
		!t)
			return new ze;
		if (t instanceof ze)
			return t;
		var n = (t = t.rgb()).r / 255
		  , e = t.g / 255
		  , r = t.b / 255
		  , i = Math.min(n, e, r)
		  , o = Math.max(n, e, r)
		  , a = NaN
		  , u = o - i
		  , c = (o + i) / 2;
		return u ? (a = n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4,
		u /= c < .5 ? o + i : 2 - o - i,
		a *= 60) : u = c > 0 && c < 1 ? 0 : a,
		new ze(a,u,c,t.opacity)
	}
	function Pe(t, n, e, r) {
		return 1 === arguments.length ? Ce(t) : new ze(t,n,e,null == r ? 1 : r)
	}
	function ze(t, n, e, r) {
		this.h = +t,
		this.s = +n,
		this.l = +e,
		this.opacity = +r
	}
	function De(t, n, e) {
		return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
	}
	ee(ie, me, {
		copy: function(t) {
			return Object.assign(new this.constructor, this, t)
		},
		displayable: function() {
			return this.rgb().displayable()
		},
		hex: _e,
		formatHex: _e,
		formatHsl: function() {
			return Ce(this).formatHsl()
		},
		formatRgb: be,
		toString: be
	}),
	ee(Te, Ae, re(ie, {
		brighter: function(t) {
			return t = null == t ? ae : Math.pow(ae, t),
			new Te(this.r * t,this.g * t,this.b * t,this.opacity)
		},
		darker: function(t) {
			return t = null == t ? oe : Math.pow(oe, t),
			new Te(this.r * t,this.g * t,this.b * t,this.opacity)
		},
		rgb: function() {
			return this
		},
		displayable: function() {
			return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
		},
		hex: Se,
		formatHex: Se,
		formatRgb: Ee,
		toString: Ee
	})),
	ee(ze, Pe, re(ie, {
		brighter: function(t) {
			return t = null == t ? ae : Math.pow(ae, t),
			new ze(this.h,this.s,this.l * t,this.opacity)
		},
		darker: function(t) {
			return t = null == t ? oe : Math.pow(oe, t),
			new ze(this.h,this.s,this.l * t,this.opacity)
		},
		rgb: function() {
			var t = this.h % 360 + 360 * (this.h < 0)
			  , n = isNaN(t) || isNaN(this.s) ? 0 : this.s
			  , e = this.l
			  , r = e + (e < .5 ? e : 1 - e) * n
			  , i = 2 * e - r;
			return new Te(De(t >= 240 ? t - 240 : t + 120, i, r),De(t, i, r),De(t < 120 ? t + 240 : t - 120, i, r),this.opacity)
		},
		displayable: function() {
			return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
		},
		formatHsl: function() {
			var t = this.opacity;
			return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")")
		}
	}));
	const Re = Math.PI / 180
	  , Fe = 180 / Math.PI
	  , qe = .96422
	  , Oe = .82521
	  , Ue = 4 / 29
	  , Ie = 6 / 29
	  , Be = 3 * Ie * Ie;
	function Ye(t) {
		if (t instanceof je)
			return new je(t.l,t.a,t.b,t.opacity);
		if (t instanceof Ze)
			return Ke(t);
		t instanceof Te || (t = Me(t));
		var n, e, r = Ve(t.r), i = Ve(t.g), o = Ve(t.b), a = He((.2225045 * r + .7168786 * i + .0606169 * o) / 1);
		return r === i && i === o ? n = e = a : (n = He((.4360747 * r + .3850649 * i + .1430804 * o) / qe),
		e = He((.0139322 * r + .0971045 * i + .7141733 * o) / Oe)),
		new je(116 * a - 16,500 * (n - a),200 * (a - e),t.opacity)
	}
	function Le(t, n, e, r) {
		return 1 === arguments.length ? Ye(t) : new je(t,n,e,null == r ? 1 : r)
	}
	function je(t, n, e, r) {
		this.l = +t,
		this.a = +n,
		this.b = +e,
		this.opacity = +r
	}
	function He(t) {
		return t > .008856451679035631 ? Math.pow(t, 1 / 3) : t / Be + Ue
	}
	function Xe(t) {
		return t > Ie ? t * t * t : Be * (t - Ue)
	}
	function Ge(t) {
		return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
	}
	function Ve(t) {
		return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
	}
	function $e(t) {
		if (t instanceof Ze)
			return new Ze(t.h,t.c,t.l,t.opacity);
		if (t instanceof je || (t = Ye(t)),
		0 === t.a && 0 === t.b)
			return new Ze(NaN,0 < t.l && t.l < 100 ? 0 : NaN,t.l,t.opacity);
		var n = Math.atan2(t.b, t.a) * Fe;
		return new Ze(n < 0 ? n + 360 : n,Math.sqrt(t.a * t.a + t.b * t.b),t.l,t.opacity)
	}
	function We(t, n, e, r) {
		return 1 === arguments.length ? $e(t) : new Ze(t,n,e,null == r ? 1 : r)
	}
	function Ze(t, n, e, r) {
		this.h = +t,
		this.c = +n,
		this.l = +e,
		this.opacity = +r
	}
	function Ke(t) {
		if (isNaN(t.h))
			return new je(t.l,0,0,t.opacity);
		var n = t.h * Re;
		return new je(t.l,Math.cos(n) * t.c,Math.sin(n) * t.c,t.opacity)
	}
	ee(je, Le, re(ie, {
		brighter: function(t) {
			return new je(this.l + 18 * (null == t ? 1 : t),this.a,this.b,this.opacity)
		},
		darker: function(t) {
			return new je(this.l - 18 * (null == t ? 1 : t),this.a,this.b,this.opacity)
		},
		rgb: function() {
			var t = (this.l + 16) / 116
			  , n = isNaN(this.a) ? t : t + this.a / 500
			  , e = isNaN(this.b) ? t : t - this.b / 200;
			return new Te(Ge(3.1338561 * (n = qe * Xe(n)) - 1.6168667 * (t = 1 * Xe(t)) - .4906146 * (e = Oe * Xe(e))),Ge(-.9787684 * n + 1.9161415 * t + .033454 * e),Ge(.0719453 * n - .2289914 * t + 1.4052427 * e),this.opacity)
		}
	})),
	ee(Ze, We, re(ie, {
		brighter: function(t) {
			return new Ze(this.h,this.c,this.l + 18 * (null == t ? 1 : t),this.opacity)
		},
		darker: function(t) {
			return new Ze(this.h,this.c,this.l - 18 * (null == t ? 1 : t),this.opacity)
		},
		rgb: function() {
			return Ke(this).rgb()
		}
	}));
	var Qe = -.14861
	  , Je = 1.78277
	  , tr = -.29227
	  , nr = -.90649
	  , er = 1.97294
	  , rr = er * nr
	  , ir = er * Je
	  , or = Je * tr - nr * Qe;
	function ar(t) {
		if (t instanceof cr)
			return new cr(t.h,t.s,t.l,t.opacity);
		t instanceof Te || (t = Me(t));
		var n = t.r / 255
		  , e = t.g / 255
		  , r = t.b / 255
		  , i = (or * r + rr * n - ir * e) / (or + rr - ir)
		  , o = r - i
		  , a = (er * (e - i) - tr * o) / nr
		  , u = Math.sqrt(a * a + o * o) / (er * i * (1 - i))
		  , c = u ? Math.atan2(a, o) * Fe - 120 : NaN;
		return new cr(c < 0 ? c + 360 : c,u,i,t.opacity)
	}
	function ur(t, n, e, r) {
		return 1 === arguments.length ? ar(t) : new cr(t,n,e,null == r ? 1 : r)
	}
	function cr(t, n, e, r) {
		this.h = +t,
		this.s = +n,
		this.l = +e,
		this.opacity = +r
	}
	function fr(t, n, e, r, i) {
		var o = t * t
		  , a = o * t;
		return ((1 - 3 * t + 3 * o - a) * n + (4 - 6 * o + 3 * a) * e + (1 + 3 * t + 3 * o - 3 * a) * r + a * i) / 6
	}
	function sr(t) {
		var n = t.length - 1;
		return function(e) {
			var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1,
			n - 1) : Math.floor(e * n)
			  , i = t[r]
			  , o = t[r + 1]
			  , a = r > 0 ? t[r - 1] : 2 * i - o
			  , u = r < n - 1 ? t[r + 2] : 2 * o - i;
			return fr((e - r / n) * n, a, i, o, u)
		}
	}
	function lr(t) {
		var n = t.length;
		return function(e) {
			var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n)
			  , i = t[(r + n - 1) % n]
			  , o = t[r % n]
			  , a = t[(r + 1) % n]
			  , u = t[(r + 2) % n];
			return fr((e - r / n) * n, i, o, a, u)
		}
	}
	ee(cr, ur, re(ie, {
		brighter: function(t) {
			return t = null == t ? ae : Math.pow(ae, t),
			new cr(this.h,this.s,this.l * t,this.opacity)
		},
		darker: function(t) {
			return t = null == t ? oe : Math.pow(oe, t),
			new cr(this.h,this.s,this.l * t,this.opacity)
		},
		rgb: function() {
			var t = isNaN(this.h) ? 0 : (this.h + 120) * Re
			  , n = +this.l
			  , e = isNaN(this.s) ? 0 : this.s * n * (1 - n)
			  , r = Math.cos(t)
			  , i = Math.sin(t);
			return new Te(255 * (n + e * (Qe * r + Je * i)),255 * (n + e * (tr * r + nr * i)),255 * (n + e * (er * r)),this.opacity)
		}
	}));
	var hr = t=>()=>t;
	function dr(t, n) {
		return function(e) {
			return t + e * n
		}
	}
	function pr(t, n) {
		var e = n - t;
		return e ? dr(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) : hr(isNaN(t) ? n : t)
	}
	function gr(t) {
		return 1 == (t = +t) ? yr : function(n, e) {
			return e - n ? function(t, n, e) {
				return t = Math.pow(t, e),
				n = Math.pow(n, e) - t,
				e = 1 / e,
				function(r) {
					return Math.pow(t + r * n, e)
				}
			}(n, e, t) : hr(isNaN(n) ? e : n)
		}
	}
	function yr(t, n) {
		var e = n - t;
		return e ? dr(t, e) : hr(isNaN(t) ? n : t)
	}
	var vr = function t(n) {
		var e = gr(n);
		function r(t, n) {
			var r = e((t = Ae(t)).r, (n = Ae(n)).r)
			  , i = e(t.g, n.g)
			  , o = e(t.b, n.b)
			  , a = yr(t.opacity, n.opacity);
			return function(n) {
				return t.r = r(n),
				t.g = i(n),
				t.b = o(n),
				t.opacity = a(n),
				t + ""
			}
		}
		return r.gamma = t,
		r
	}(1);
	function _r(t) {
		return function(n) {
			var e, r, i = n.length, o = new Array(i), a = new Array(i), u = new Array(i);
			for (e = 0; e < i; ++e)
				r = Ae(n[e]),
				o[e] = r.r || 0,
				a[e] = r.g || 0,
				u[e] = r.b || 0;
			return o = t(o),
			a = t(a),
			u = t(u),
			r.opacity = 1,
			function(t) {
				return r.r = o(t),
				r.g = a(t),
				r.b = u(t),
				r + ""
			}
		}
	}
	var br = _r(sr)
	  , mr = _r(lr);
	function xr(t, n) {
		n || (n = []);
		var e, r = t ? Math.min(n.length, t.length) : 0, i = n.slice();
		return function(o) {
			for (e = 0; e < r; ++e)
				i[e] = t[e] * (1 - o) + n[e] * o;
			return i
		}
	}
	function wr(t) {
		return ArrayBuffer.isView(t) && !(t instanceof DataView)
	}
	function Mr(t, n) {
		var e, r = n ? n.length : 0, i = t ? Math.min(r, t.length) : 0, o = new Array(i), a = new Array(r);
		for (e = 0; e < i; ++e)
			o[e] = Cr(t[e], n[e]);
		for (; e < r; ++e)
			a[e] = n[e];
		return function(t) {
			for (e = 0; e < i; ++e)
				a[e] = o[e](t);
			return a
		}
	}
	function Ar(t, n) {
		var e = new Date;
		return t = +t,
		n = +n,
		function(r) {
			return e.setTime(t * (1 - r) + n * r),
			e
		}
	}
	function Tr(t, n) {
		return t = +t,
		n = +n,
		function(e) {
			return t * (1 - e) + n * e
		}
	}
	function Sr(t, n) {
		var e, r = {}, i = {};
		for (e in null !== t && "object" == typeof t || (t = {}),
		null !== n && "object" == typeof n || (n = {}),
		n)
			e in t ? r[e] = Cr(t[e], n[e]) : i[e] = n[e];
		return function(t) {
			for (e in r)
				i[e] = r[e](t);
			return i
		}
	}
	var Er = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g
	  , kr = new RegExp(Er.source,"g");
	function Nr(t, n) {
		var e, r, i, o = Er.lastIndex = kr.lastIndex = 0, a = -1, u = [], c = [];
		for (t += "",
		n += ""; (e = Er.exec(t)) && (r = kr.exec(n)); )
			(i = r.index) > o && (i = n.slice(o, i),
			u[a] ? u[a] += i : u[++a] = i),
			(e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null,
			c.push({
				i: a,
				x: Tr(e, r)
			})),
			o = kr.lastIndex;
		return o < n.length && (i = n.slice(o),
		u[a] ? u[a] += i : u[++a] = i),
		u.length < 2 ? c[0] ? function(t) {
			return function(n) {
				return t(n) + ""
			}
		}(c[0].x) : function(t) {
			return function() {
				return t
			}
		}(n) : (n = c.length,
		function(t) {
			for (var e, r = 0; r < n; ++r)
				u[(e = c[r]).i] = e.x(t);
			return u.join("")
		}
		)
	}
	function Cr(t, n) {
		var e, r = typeof n;
		return null == n || "boolean" === r ? hr(n) : ("number" === r ? Tr : "string" === r ? (e = me(n)) ? (n = e,
		vr) : Nr : n instanceof me ? vr : n instanceof Date ? Ar : wr(n) ? xr : Array.isArray(n) ? Mr : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? Sr : Tr)(t, n)
	}
	function Pr(t, n) {
		return t = +t,
		n = +n,
		function(e) {
			return Math.round(t * (1 - e) + n * e)
		}
	}
	var zr, Dr = 180 / Math.PI, Rr = {
		translateX: 0,
		translateY: 0,
		rotate: 0,
		skewX: 0,
		scaleX: 1,
		scaleY: 1
	};
	function Fr(t, n, e, r, i, o) {
		var a, u, c;
		return (a = Math.sqrt(t * t + n * n)) && (t /= a,
		n /= a),
		(c = t * e + n * r) && (e -= t * c,
		r -= n * c),
		(u = Math.sqrt(e * e + r * r)) && (e /= u,
		r /= u,
		c /= u),
		t * r < n * e && (t = -t,
		n = -n,
		c = -c,
		a = -a),
		{
			translateX: i,
			translateY: o,
			rotate: Math.atan2(n, t) * Dr,
			skewX: Math.atan(c) * Dr,
			scaleX: a,
			scaleY: u
		}
	}
	function qr(t, n, e, r) {
		function i(t) {
			return t.length ? t.pop() + " " : ""
		}
		return function(o, a) {
			var u = []
			  , c = [];
			return o = t(o),
			a = t(a),
			function(t, r, i, o, a, u) {
				if (t !== i || r !== o) {
					var c = a.push("translate(", null, n, null, e);
					u.push({
						i: c - 4,
						x: Tr(t, i)
					}, {
						i: c - 2,
						x: Tr(r, o)
					})
				} else
					(i || o) && a.push("translate(" + i + n + o + e)
			}(o.translateX, o.translateY, a.translateX, a.translateY, u, c),
			function(t, n, e, o) {
				t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360),
				o.push({
					i: e.push(i(e) + "rotate(", null, r) - 2,
					x: Tr(t, n)
				})) : n && e.push(i(e) + "rotate(" + n + r)
			}(o.rotate, a.rotate, u, c),
			function(t, n, e, o) {
				t !== n ? o.push({
					i: e.push(i(e) + "skewX(", null, r) - 2,
					x: Tr(t, n)
				}) : n && e.push(i(e) + "skewX(" + n + r)
			}(o.skewX, a.skewX, u, c),
			function(t, n, e, r, o, a) {
				if (t !== e || n !== r) {
					var u = o.push(i(o) + "scale(", null, ",", null, ")");
					a.push({
						i: u - 4,
						x: Tr(t, e)
					}, {
						i: u - 2,
						x: Tr(n, r)
					})
				} else
					1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")")
			}(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, c),
			o = a = null,
			function(t) {
				for (var n, e = -1, r = c.length; ++e < r; )
					u[(n = c[e]).i] = n.x(t);
				return u.join("")
			}
		}
	}
	var Or = qr((function(t) {
		const n = new ("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(t + "");
		return n.isIdentity ? Rr : Fr(n.a, n.b, n.c, n.d, n.e, n.f)
	}
	), "px, ", "px)", "deg)")
	  , Ur = qr((function(t) {
		return null == t ? Rr : (zr || (zr = document.createElementNS("http://www.w3.org/2000/svg", "g")),
		zr.setAttribute("transform", t),
		(t = zr.transform.baseVal.consolidate()) ? Fr((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : Rr)
	}
	), ", ", ")", ")");
	function Ir(t) {
		return ((t = Math.exp(t)) + 1 / t) / 2
	}
	var Br = function t(n, e, r) {
		function i(t, i) {
			var o, a, u = t[0], c = t[1], f = t[2], s = i[0], l = i[1], h = i[2], d = s - u, p = l - c, g = d * d + p * p;
			if (g < 1e-12)
				a = Math.log(h / f) / n,
				o = function(t) {
					return [u + t * d, c + t * p, f * Math.exp(n * t * a)]
				}
				;
			else {
				var y = Math.sqrt(g)
				  , v = (h * h - f * f + r * g) / (2 * f * e * y)
				  , _ = (h * h - f * f - r * g) / (2 * h * e * y)
				  , b = Math.log(Math.sqrt(v * v + 1) - v)
				  , m = Math.log(Math.sqrt(_ * _ + 1) - _);
				a = (m - b) / n,
				o = function(t) {
					var r = t * a
					  , i = Ir(b)
					  , o = f / (e * y) * (i * function(t) {
						return ((t = Math.exp(2 * t)) - 1) / (t + 1)
					}(n * r + b) - function(t) {
						return ((t = Math.exp(t)) - 1 / t) / 2
					}(b));
					return [u + o * d, c + o * p, f * i / Ir(n * r + b)]
				}
			}
			return o.duration = 1e3 * a * n / Math.SQRT2,
			o
		}
		return i.rho = function(n) {
			var e = Math.max(.001, +n)
			  , r = e * e;
			return t(e, r, r * r)
		}
		,
		i
	}(Math.SQRT2, 2, 4);
	function Yr(t) {
		return function(n, e) {
			var r = t((n = Pe(n)).h, (e = Pe(e)).h)
			  , i = yr(n.s, e.s)
			  , o = yr(n.l, e.l)
			  , a = yr(n.opacity, e.opacity);
			return function(t) {
				return n.h = r(t),
				n.s = i(t),
				n.l = o(t),
				n.opacity = a(t),
				n + ""
			}
		}
	}
	var Lr = Yr(pr)
	  , jr = Yr(yr);
	function Hr(t) {
		return function(n, e) {
			var r = t((n = We(n)).h, (e = We(e)).h)
			  , i = yr(n.c, e.c)
			  , o = yr(n.l, e.l)
			  , a = yr(n.opacity, e.opacity);
			return function(t) {
				return n.h = r(t),
				n.c = i(t),
				n.l = o(t),
				n.opacity = a(t),
				n + ""
			}
		}
	}
	var Xr = Hr(pr)
	  , Gr = Hr(yr);
	function Vr(t) {
		return function n(e) {
			function r(n, r) {
				var i = t((n = ur(n)).h, (r = ur(r)).h)
				  , o = yr(n.s, r.s)
				  , a = yr(n.l, r.l)
				  , u = yr(n.opacity, r.opacity);
				return function(t) {
					return n.h = i(t),
					n.s = o(t),
					n.l = a(Math.pow(t, e)),
					n.opacity = u(t),
					n + ""
				}
			}
			return e = +e,
			r.gamma = n,
			r
		}(1)
	}
	var $r = Vr(pr)
	  , Wr = Vr(yr);
	function Zr(t, n) {
		void 0 === n && (n = t,
		t = Cr);
		for (var e = 0, r = n.length - 1, i = n[0], o = new Array(r < 0 ? 0 : r); e < r; )
			o[e] = t(i, i = n[++e]);
		return function(t) {
			var n = Math.max(0, Math.min(r - 1, Math.floor(t *= r)));
			return o[n](t - n)
		}
	}
	var Kr, Qr, Jr = 0, ti = 0, ni = 0, ei = 0, ri = 0, ii = 0, oi = "object" == typeof performance && performance.now ? performance : Date, ai = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
		setTimeout(t, 17)
	}
	;
	function ui() {
		return ri || (ai(ci),
		ri = oi.now() + ii)
	}
	function ci() {
		ri = 0
	}
	function fi() {
		this._call = this._time = this._next = null
	}
	function si(t, n, e) {
		var r = new fi;
		return r.restart(t, n, e),
		r
	}
	function li() {
		ui(),
		++Jr;
		for (var t, n = Kr; n; )
			(t = ri - n._time) >= 0 && n._call.call(void 0, t),
			n = n._next;
		--Jr
	}
	function hi() {
		ri = (ei = oi.now()) + ii,
		Jr = ti = 0;
		try {
			li()
		} finally {
			Jr = 0,
			function() {
				var t, n, e = Kr, r = 1 / 0;
				for (; e; )
					e._call ? (r > e._time && (r = e._time),
					t = e,
					e = e._next) : (n = e._next,
					e._next = null,
					e = t ? t._next = n : Kr = n);
				Qr = t,
				pi(r)
			}(),
			ri = 0
		}
	}
	function di() {
		var t = oi.now()
		  , n = t - ei;
		n > 1e3 && (ii -= n,
		ei = t)
	}
	function pi(t) {
		Jr || (ti && (ti = clearTimeout(ti)),
		t - ri > 24 ? (t < 1 / 0 && (ti = setTimeout(hi, t - oi.now() - ii)),
		ni && (ni = clearInterval(ni))) : (ni || (ei = oi.now(),
		ni = setInterval(di, 1e3)),
		Jr = 1,
		ai(hi)))
	}
	function gi(t, n, e) {
		var r = new fi;
		return n = null == n ? 0 : +n,
		r.restart((e=>{
			r.stop(),
			t(e + n)
		}
		), n, e),
		r
	}
	fi.prototype = si.prototype = {
		constructor: fi,
		restart: function(t, n, e) {
			if ("function" != typeof t)
				throw new TypeError("callback is not a function");
			e = (null == e ? ui() : +e) + (null == n ? 0 : +n),
			this._next || Qr === this || (Qr ? Qr._next = this : Kr = this,
			Qr = this),
			this._call = t,
			this._time = e,
			pi()
		},
		stop: function() {
			this._call && (this._call = null,
			this._time = 1 / 0,
			pi())
		}
	};
	var yi = _t("start", "end", "cancel", "interrupt")
	  , vi = [];
	function _i(t, n, e, r, i, o) {
		var a = t.__transition;
		if (a) {
			if (e in a)
				return
		} else
			t.__transition = {};
		!function(t, n, e) {
			var r, i = t.__transition;
			function o(t) {
				e.state = 1,
				e.timer.restart(a, e.delay, e.time),
				e.delay <= t && a(t - e.delay)
			}
			function a(o) {
				var f, s, l, h;
				if (1 !== e.state)
					return c();
				for (f in i)
					if ((h = i[f]).name === e.name) {
						if (3 === h.state)
							return gi(a);
						4 === h.state ? (h.state = 6,
						h.timer.stop(),
						h.on.call("interrupt", t, t.__data__, h.index, h.group),
						delete i[f]) : +f < n && (h.state = 6,
						h.timer.stop(),
						h.on.call("cancel", t, t.__data__, h.index, h.group),
						delete i[f])
					}
				if (gi((function() {
					3 === e.state && (e.state = 4,
					e.timer.restart(u, e.delay, e.time),
					u(o))
				}
				)),
				e.state = 2,
				e.on.call("start", t, t.__data__, e.index, e.group),
				2 === e.state) {
					for (e.state = 3,
					r = new Array(l = e.tween.length),
					f = 0,
					s = -1; f < l; ++f)
						(h = e.tween[f].value.call(t, t.__data__, e.index, e.group)) && (r[++s] = h);
					r.length = s + 1
				}
			}
			function u(n) {
				for (var i = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(c),
				e.state = 5,
				1), o = -1, a = r.length; ++o < a; )
					r[o].call(t, i);
				5 === e.state && (e.on.call("end", t, t.__data__, e.index, e.group),
				c())
			}
			function c() {
				for (var r in e.state = 6,
				e.timer.stop(),
				delete i[n],
				i)
					return;
				delete t.__transition
			}
			i[n] = e,
			e.timer = si(o, 0, e.time)
		}(t, e, {
			name: n,
			index: r,
			group: i,
			on: yi,
			tween: vi,
			time: o.time,
			delay: o.delay,
			duration: o.duration,
			ease: o.ease,
			timer: null,
			state: 0
		})
	}
	function bi(t, n) {
		var e = xi(t, n);
		if (e.state > 0)
			throw new Error("too late; already scheduled");
		return e
	}
	function mi(t, n) {
		var e = xi(t, n);
		if (e.state > 3)
			throw new Error("too late; already running");
		return e
	}
	function xi(t, n) {
		var e = t.__transition;
		if (!e || !(e = e[n]))
			throw new Error("transition not found");
		return e
	}
	function wi(t, n) {
		var e, r, i, o = t.__transition, a = !0;
		if (o) {
			for (i in n = null == n ? null : n + "",
			o)
				(e = o[i]).name === n ? (r = e.state > 2 && e.state < 5,
				e.state = 6,
				e.timer.stop(),
				e.on.call(r ? "interrupt" : "cancel", t, t.__data__, e.index, e.group),
				delete o[i]) : a = !1;
			a && delete t.__transition
		}
	}
	function Mi(t, n) {
		var e, r;
		return function() {
			var i = mi(this, t)
			  , o = i.tween;
			if (o !== e)
				for (var a = 0, u = (r = e = o).length; a < u; ++a)
					if (r[a].name === n) {
						(r = r.slice()).splice(a, 1);
						break
					}
			i.tween = r
		}
	}
	function Ai(t, n, e) {
		var r, i;
		if ("function" != typeof e)
			throw new Error;
		return function() {
			var o = mi(this, t)
			  , a = o.tween;
			if (a !== r) {
				i = (r = a).slice();
				for (var u = {
					name: n,
					value: e
				}, c = 0, f = i.length; c < f; ++c)
					if (i[c].name === n) {
						i[c] = u;
						break
					}
				c === f && i.push(u)
			}
			o.tween = i
		}
	}
	function Ti(t, n, e) {
		var r = t._id;
		return t.each((function() {
			var t = mi(this, r);
			(t.value || (t.value = {}))[n] = e.apply(this, arguments)
		}
		)),
		function(t) {
			return xi(t, r).value[n]
		}
	}
	function Si(t, n) {
		var e;
		return ("number" == typeof n ? Tr : n instanceof me ? vr : (e = me(n)) ? (n = e,
		vr) : Nr)(t, n)
	}
	function Ei(t) {
		return function() {
			this.removeAttribute(t)
		}
	}
	function ki(t) {
		return function() {
			this.removeAttributeNS(t.space, t.local)
		}
	}
	function Ni(t, n, e) {
		var r, i, o = e + "";
		return function() {
			var a = this.getAttribute(t);
			return a === o ? null : a === r ? i : i = n(r = a, e)
		}
	}
	function Ci(t, n, e) {
		var r, i, o = e + "";
		return function() {
			var a = this.getAttributeNS(t.space, t.local);
			return a === o ? null : a === r ? i : i = n(r = a, e)
		}
	}
	function Pi(t, n, e) {
		var r, i, o;
		return function() {
			var a, u, c = e(this);
			if (null != c)
				return (a = this.getAttribute(t)) === (u = c + "") ? null : a === r && u === i ? o : (i = u,
				o = n(r = a, c));
			this.removeAttribute(t)
		}
	}
	function zi(t, n, e) {
		var r, i, o;
		return function() {
			var a, u, c = e(this);
			if (null != c)
				return (a = this.getAttributeNS(t.space, t.local)) === (u = c + "") ? null : a === r && u === i ? o : (i = u,
				o = n(r = a, c));
			this.removeAttributeNS(t.space, t.local)
		}
	}
	function Di(t, n) {
		return function(e) {
			this.setAttribute(t, n.call(this, e))
		}
	}
	function Ri(t, n) {
		return function(e) {
			this.setAttributeNS(t.space, t.local, n.call(this, e))
		}
	}
	function Fi(t, n) {
		var e, r;
		function i() {
			var i = n.apply(this, arguments);
			return i !== r && (e = (r = i) && Ri(t, i)),
			e
		}
		return i._value = n,
		i
	}
	function qi(t, n) {
		var e, r;
		function i() {
			var i = n.apply(this, arguments);
			return i !== r && (e = (r = i) && Di(t, i)),
			e
		}
		return i._value = n,
		i
	}
	function Oi(t, n) {
		return function() {
			bi(this, t).delay = +n.apply(this, arguments)
		}
	}
	function Ui(t, n) {
		return n = +n,
		function() {
			bi(this, t).delay = n
		}
	}
	function Ii(t, n) {
		return function() {
			mi(this, t).duration = +n.apply(this, arguments)
		}
	}
	function Bi(t, n) {
		return n = +n,
		function() {
			mi(this, t).duration = n
		}
	}
	function Yi(t, n) {
		if ("function" != typeof n)
			throw new Error;
		return function() {
			mi(this, t).ease = n
		}
	}
	function Li(t, n, e) {
		var r, i, o = function(t) {
			return (t + "").trim().split(/^|\s+/).every((function(t) {
				var n = t.indexOf(".");
				return n >= 0 && (t = t.slice(0, n)),
				!t || "start" === t
			}
			))
		}(n) ? bi : mi;
		return function() {
			var a = o(this, t)
			  , u = a.on;
			u !== r && (i = (r = u).copy()).on(n, e),
			a.on = i
		}
	}
	var ji = On.prototype.constructor;
	function Hi(t) {
		return function() {
			this.style.removeProperty(t)
		}
	}
	function Xi(t, n, e) {
		return function(r) {
			this.style.setProperty(t, n.call(this, r), e)
		}
	}
	function Gi(t, n, e) {
		var r, i;
		function o() {
			var o = n.apply(this, arguments);
			return o !== i && (r = (i = o) && Xi(t, o, e)),
			r
		}
		return o._value = n,
		o
	}
	function Vi(t) {
		return function(n) {
			this.textContent = t.call(this, n)
		}
	}
	function $i(t) {
		var n, e;
		function r() {
			var r = t.apply(this, arguments);
			return r !== e && (n = (e = r) && Vi(r)),
			n
		}
		return r._value = t,
		r
	}
	var Wi = 0;
	function Zi(t, n, e, r) {
		this._groups = t,
		this._parents = n,
		this._name = e,
		this._id = r
	}
	function Ki(t) {
		return On().transition(t)
	}
	function Qi() {
		return ++Wi
	}
	var Ji = On.prototype;
	Zi.prototype = Ki.prototype = {
		constructor: Zi,
		select: function(t) {
			var n = this._name
			  , e = this._id;
			"function" != typeof t && (t = Ct(t));
			for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
				for (var u, c, f = r[a], s = f.length, l = o[a] = new Array(s), h = 0; h < s; ++h)
					(u = f[h]) && (c = t.call(u, u.__data__, h, f)) && ("__data__"in u && (c.__data__ = u.__data__),
					l[h] = c,
					_i(l[h], n, e, h, l, xi(u, e)));
			return new Zi(o,this._parents,n,e)
		},
		selectAll: function(t) {
			var n = this._name
			  , e = this._id;
			"function" != typeof t && (t = Dt(t));
			for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
				for (var c, f = r[u], s = f.length, l = 0; l < s; ++l)
					if (c = f[l]) {
						for (var h, d = t.call(c, c.__data__, l, f), p = xi(c, e), g = 0, y = d.length; g < y; ++g)
							(h = d[g]) && _i(h, n, e, g, d, p);
						o.push(d),
						a.push(c)
					}
			return new Zi(o,a,n,e)
		},
		selectChild: Ji.selectChild,
		selectChildren: Ji.selectChildren,
		filter: function(t) {
			"function" != typeof t && (t = Rt(t));
			for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
				for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f)
					(o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o);
			return new Zi(r,this._parents,this._name,this._id)
		},
		merge: function(t) {
			if (t._id !== this._id)
				throw new Error;
			for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
				for (var c, f = n[u], s = e[u], l = f.length, h = a[u] = new Array(l), d = 0; d < l; ++d)
					(c = f[d] || s[d]) && (h[d] = c);
			for (; u < r; ++u)
				a[u] = n[u];
			return new Zi(a,this._parents,this._name,this._id)
		},
		selection: function() {
			return new ji(this._groups,this._parents)
		},
		transition: function() {
			for (var t = this._name, n = this._id, e = Qi(), r = this._groups, i = r.length, o = 0; o < i; ++o)
				for (var a, u = r[o], c = u.length, f = 0; f < c; ++f)
					if (a = u[f]) {
						var s = xi(a, n);
						_i(a, t, e, f, u, {
							time: s.time + s.delay + s.duration,
							delay: 0,
							duration: s.duration,
							ease: s.ease
						})
					}
			return new Zi(r,this._parents,t,e)
		},
		call: Ji.call,
		nodes: Ji.nodes,
		node: Ji.node,
		size: Ji.size,
		empty: Ji.empty,
		each: Ji.each,
		on: function(t, n) {
			var e = this._id;
			return arguments.length < 2 ? xi(this.node(), e).on.on(t) : this.each(Li(e, t, n))
		},
		attr: function(t, n) {
			var e = Tt(t)
			  , r = "transform" === e ? Ur : Si;
			return this.attrTween(t, "function" == typeof n ? (e.local ? zi : Pi)(e, r, Ti(this, "attr." + t, n)) : null == n ? (e.local ? ki : Ei)(e) : (e.local ? Ci : Ni)(e, r, n))
		},
		attrTween: function(t, n) {
			var e = "attr." + t;
			if (arguments.length < 2)
				return (e = this.tween(e)) && e._value;
			if (null == n)
				return this.tween(e, null);
			if ("function" != typeof n)
				throw new Error;
			var r = Tt(t);
			return this.tween(e, (r.local ? Fi : qi)(r, n))
		},
		style: function(t, n, e) {
			var r = "transform" == (t += "") ? Or : Si;
			return null == n ? this.styleTween(t, function(t, n) {
				var e, r, i;
				return function() {
					var o = on(this, t)
					  , a = (this.style.removeProperty(t),
					on(this, t));
					return o === a ? null : o === e && a === r ? i : i = n(e = o, r = a)
				}
			}(t, r)).on("end.style." + t, Hi(t)) : "function" == typeof n ? this.styleTween(t, function(t, n, e) {
				var r, i, o;
				return function() {
					var a = on(this, t)
					  , u = e(this)
					  , c = u + "";
					return null == u && (this.style.removeProperty(t),
					c = u = on(this, t)),
					a === c ? null : a === r && c === i ? o : (i = c,
					o = n(r = a, u))
				}
			}(t, r, Ti(this, "style." + t, n))).each(function(t, n) {
				var e, r, i, o, a = "style." + n, u = "end." + a;
				return function() {
					var c = mi(this, t)
					  , f = c.on
					  , s = null == c.value[a] ? o || (o = Hi(n)) : void 0;
					f === e && i === s || (r = (e = f).copy()).on(u, i = s),
					c.on = r
				}
			}(this._id, t)) : this.styleTween(t, function(t, n, e) {
				var r, i, o = e + "";
				return function() {
					var a = on(this, t);
					return a === o ? null : a === r ? i : i = n(r = a, e)
				}
			}(t, r, n), e).on("end.style." + t, null)
		},
		styleTween: function(t, n, e) {
			var r = "style." + (t += "");
			if (arguments.length < 2)
				return (r = this.tween(r)) && r._value;
			if (null == n)
				return this.tween(r, null);
			if ("function" != typeof n)
				throw new Error;
			return this.tween(r, Gi(t, n, null == e ? "" : e))
		},
		text: function(t) {
			return this.tween("text", "function" == typeof t ? function(t) {
				return function() {
					var n = t(this);
					this.textContent = null == n ? "" : n
				}
			}(Ti(this, "text", t)) : function(t) {
				return function() {
					this.textContent = t
				}
			}(null == t ? "" : t + ""))
		},
		textTween: function(t) {
			var n = "text";
			if (arguments.length < 1)
				return (n = this.tween(n)) && n._value;
			if (null == t)
				return this.tween(n, null);
			if ("function" != typeof t)
				throw new Error;
			return this.tween(n, $i(t))
		},
		remove: function() {
			return this.on("end.remove", function(t) {
				return function() {
					var n = this.parentNode;
					for (var e in this.__transition)
						if (+e !== t)
							return;
					n && n.removeChild(this)
				}
			}(this._id))
		},
		tween: function(t, n) {
			var e = this._id;
			if (t += "",
			arguments.length < 2) {
				for (var r, i = xi(this.node(), e).tween, o = 0, a = i.length; o < a; ++o)
					if ((r = i[o]).name === t)
						return r.value;
				return null
			}
			return this.each((null == n ? Mi : Ai)(e, t, n))
		},
		delay: function(t) {
			var n = this._id;
			return arguments.length ? this.each(("function" == typeof t ? Oi : Ui)(n, t)) : xi(this.node(), n).delay
		},
		duration: function(t) {
			var n = this._id;
			return arguments.length ? this.each(("function" == typeof t ? Ii : Bi)(n, t)) : xi(this.node(), n).duration
		},
		ease: function(t) {
			var n = this._id;
			return arguments.length ? this.each(Yi(n, t)) : xi(this.node(), n).ease
		},
		easeVarying: function(t) {
			if ("function" != typeof t)
				throw new Error;
			return this.each(function(t, n) {
				return function() {
					var e = n.apply(this, arguments);
					if ("function" != typeof e)
						throw new Error;
					mi(this, t).ease = e
				}
			}(this._id, t))
		},
		end: function() {
			var t, n, e = this, r = e._id, i = e.size();
			return new Promise((function(o, a) {
				var u = {
					value: a
				}
				  , c = {
					value: function() {
						0 == --i && o()
					}
				};
				e.each((function() {
					var e = mi(this, r)
					  , i = e.on;
					i !== t && ((n = (t = i).copy())._.cancel.push(u),
					n._.interrupt.push(u),
					n._.end.push(c)),
					e.on = n
				}
				)),
				0 === i && o()
			}
			))
		},
		[Symbol.iterator]: Ji[Symbol.iterator]
	};
	function to(t) {
		return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
	}
	function no(t) {
		return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
	}
	var eo = function t(n) {
		function e(t) {
			return Math.pow(t, n)
		}
		return n = +n,
		e.exponent = t,
		e
	}(3)
	  , ro = function t(n) {
		function e(t) {
			return 1 - Math.pow(1 - t, n)
		}
		return n = +n,
		e.exponent = t,
		e
	}(3)
	  , io = function t(n) {
		function e(t) {
			return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2
		}
		return n = +n,
		e.exponent = t,
		e
	}(3)
	  , oo = Math.PI
	  , ao = oo / 2;
	function uo(t) {
		return (1 - Math.cos(oo * t)) / 2
	}
	function co(t) {
		return 1.0009775171065494 * (Math.pow(2, -10 * t) - .0009765625)
	}
	function fo(t) {
		return ((t *= 2) <= 1 ? co(1 - t) : 2 - co(t - 1)) / 2
	}
	function so(t) {
		return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
	}
	var lo = 4 / 11
	  , ho = 7.5625;
	function po(t) {
		return (t = +t) < lo ? ho * t * t : t < .7272727272727273 ? ho * (t -= .5454545454545454) * t + .75 : t < .9090909090909091 ? ho * (t -= .8181818181818182) * t + .9375 : ho * (t -= .9545454545454546) * t + .984375
	}
	var go = 1.70158
	  , yo = function t(n) {
		function e(t) {
			return (t = +t) * t * (n * (t - 1) + t)
		}
		return n = +n,
		e.overshoot = t,
		e
	}(go)
	  , vo = function t(n) {
		function e(t) {
			return --t * t * ((t + 1) * n + t) + 1
		}
		return n = +n,
		e.overshoot = t,
		e
	}(go)
	  , _o = function t(n) {
		function e(t) {
			return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2
		}
		return n = +n,
		e.overshoot = t,
		e
	}(go)
	  , bo = 2 * Math.PI
	  , mo = function t(n, e) {
		var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= bo);
		function i(t) {
			return n * co(---t) * Math.sin((r - t) / e)
		}
		return i.amplitude = function(n) {
			return t(n, e * bo)
		}
		,
		i.period = function(e) {
			return t(n, e)
		}
		,
		i
	}(1, .3)
	  , xo = function t(n, e) {
		var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= bo);
		function i(t) {
			return 1 - n * co(t = +t) * Math.sin((t + r) / e)
		}
		return i.amplitude = function(n) {
			return t(n, e * bo)
		}
		,
		i.period = function(e) {
			return t(n, e)
		}
		,
		i
	}(1, .3)
	  , wo = function t(n, e) {
		var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= bo);
		function i(t) {
			return ((t = 2 * t - 1) < 0 ? n * co(-t) * Math.sin((r - t) / e) : 2 - n * co(t) * Math.sin((r + t) / e)) / 2
		}
		return i.amplitude = function(n) {
			return t(n, e * bo)
		}
		,
		i.period = function(e) {
			return t(n, e)
		}
		,
		i
	}(1, .3)
	  , Mo = {
		time: null,
		delay: 0,
		duration: 250,
		ease: no
	};
	function Ao(t, n) {
		for (var e; !(e = t.__transition) || !(e = e[n]); )
			if (!(t = t.parentNode))
				throw new Error(`transition ${n} not found`);
		return e
	}
	On.prototype.interrupt = function(t) {
		return this.each((function() {
			wi(this, t)
		}
		))
	}
	,
	On.prototype.transition = function(t) {
		var n, e;
		t instanceof Zi ? (n = t._id,
		t = t._name) : (n = Qi(),
		(e = Mo).time = ui(),
		t = null == t ? null : t + "");
		for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
			for (var a, u = r[o], c = u.length, f = 0; f < c; ++f)
				(a = u[f]) && _i(a, t, n, f, u, e || Ao(a, n));
		return new Zi(r,this._parents,t,n)
	}
	;
	var To = [null];
	var So = t=>()=>t;
	function Eo(t, {sourceEvent: n, target: e, selection: r, mode: i, dispatch: o}) {
		Object.defineProperties(this, {
			type: {
				value: t,
				enumerable: !0,
				configurable: !0
			},
			sourceEvent: {
				value: n,
				enumerable: !0,
				configurable: !0
			},
			target: {
				value: e,
				enumerable: !0,
				configurable: !0
			},
			selection: {
				value: r,
				enumerable: !0,
				configurable: !0
			},
			mode: {
				value: i,
				enumerable: !0,
				configurable: !0
			},
			_: {
				value: o
			}
		})
	}
	function ko(t) {
		t.stopImmediatePropagation()
	}
	function No(t) {
		t.preventDefault(),
		t.stopImmediatePropagation()
	}
	var Co = {
		name: "drag"
	}
	  , Po = {
		name: "space"
	}
	  , zo = {
		name: "handle"
	}
	  , Do = {
		name: "center"
	};
	const {abs: Ro, max: Fo, min: qo} = Math;
	function Oo(t) {
		return [+t[0], +t[1]]
	}
	function Uo(t) {
		return [Oo(t[0]), Oo(t[1])]
	}
	var Io = {
		name: "x",
		handles: ["w", "e"].map(Vo),
		input: function(t, n) {
			return null == t ? null : [[+t[0], n[0][1]], [+t[1], n[1][1]]]
		},
		output: function(t) {
			return t && [t[0][0], t[1][0]]
		}
	}
	  , Bo = {
		name: "y",
		handles: ["n", "s"].map(Vo),
		input: function(t, n) {
			return null == t ? null : [[n[0][0], +t[0]], [n[1][0], +t[1]]]
		},
		output: function(t) {
			return t && [t[0][1], t[1][1]]
		}
	}
	  , Yo = {
		name: "xy",
		handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Vo),
		input: function(t) {
			return null == t ? null : Uo(t)
		},
		output: function(t) {
			return t
		}
	}
	  , Lo = {
		overlay: "crosshair",
		selection: "move",
		n: "ns-resize",
		e: "ew-resize",
		s: "ns-resize",
		w: "ew-resize",
		nw: "nwse-resize",
		ne: "nesw-resize",
		se: "nwse-resize",
		sw: "nesw-resize"
	}
	  , jo = {
		e: "w",
		w: "e",
		nw: "ne",
		ne: "nw",
		se: "sw",
		sw: "se"
	}
	  , Ho = {
		n: "s",
		s: "n",
		nw: "sw",
		ne: "se",
		se: "ne",
		sw: "nw"
	}
	  , Xo = {
		overlay: 1,
		selection: 1,
		n: null,
		e: 1,
		s: null,
		w: -1,
		nw: -1,
		ne: 1,
		se: 1,
		sw: -1
	}
	  , Go = {
		overlay: 1,
		selection: 1,
		n: -1,
		e: null,
		s: 1,
		w: null,
		nw: -1,
		ne: -1,
		se: 1,
		sw: 1
	};
	function Vo(t) {
		return {
			type: t
		}
	}
	function $o(t) {
		return !t.ctrlKey && !t.button
	}
	function Wo() {
		var t = this.ownerSVGElement || this;
		return t.hasAttribute("viewBox") ? [[(t = t.viewBox.baseVal).x, t.y], [t.x + t.width, t.y + t.height]] : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]
	}
	function Zo() {
		return navigator.maxTouchPoints || "ontouchstart"in this
	}
	function Ko(t) {
		for (; !t.__brush; )
			if (!(t = t.parentNode))
				return;
		return t.__brush
	}
	function Qo(t) {
		return t[0][0] === t[1][0] || t[0][1] === t[1][1]
	}
	function Jo(t) {
		var n, e = Wo, r = $o, i = Zo, o = !0, a = _t("start", "brush", "end"), u = 6;
		function c(n) {
			var e = n.property("__brush", g).selectAll(".overlay").data([Vo("overlay")]);
			e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", Lo.overlay).merge(e).each((function() {
				var t = Ko(this).extent;
				Un(this).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1])
			}
			)),
			n.selectAll(".selection").data([Vo("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", Lo.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
			var r = n.selectAll(".handle").data(t.handles, (function(t) {
				return t.type
			}
			));
			r.exit().remove(),
			r.enter().append("rect").attr("class", (function(t) {
				return "handle handle--" + t.type
			}
			)).attr("cursor", (function(t) {
				return Lo[t.type]
			}
			)),
			n.each(f).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", h).filter(i).on("touchstart.brush", h).on("touchmove.brush", d).on("touchend.brush touchcancel.brush", p).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
		}
		function f() {
			var t = Un(this)
			  , n = Ko(this).selection;
			n ? (t.selectAll(".selection").style("display", null).attr("x", n[0][0]).attr("y", n[0][1]).attr("width", n[1][0] - n[0][0]).attr("height", n[1][1] - n[0][1]),
			t.selectAll(".handle").style("display", null).attr("x", (function(t) {
				return "e" === t.type[t.type.length - 1] ? n[1][0] - u / 2 : n[0][0] - u / 2
			}
			)).attr("y", (function(t) {
				return "s" === t.type[0] ? n[1][1] - u / 2 : n[0][1] - u / 2
			}
			)).attr("width", (function(t) {
				return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + u : u
			}
			)).attr("height", (function(t) {
				return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + u : u
			}
			))) : t.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null)
		}
		function s(t, n, e) {
			var r = t.__brush.emitter;
			return !r || e && r.clean ? new l(t,n,e) : r
		}
		function l(t, n, e) {
			this.that = t,
			this.args = n,
			this.state = t.__brush,
			this.active = 0,
			this.clean = e
		}
		function h(e) {
			if ((!n || e.touches) && r.apply(this, arguments)) {
				var i, a, u, c, l, h, d, p, g, y, v, _ = this, b = e.target.__data__.type, m = "selection" === (o && e.metaKey ? b = "overlay" : b) ? Co : o && e.altKey ? Do : zo, x = t === Bo ? null : Xo[b], w = t === Io ? null : Go[b], M = Ko(_), A = M.extent, T = M.selection, S = A[0][0], E = A[0][1], k = A[1][0], N = A[1][1], C = 0, P = 0, z = x && w && o && e.shiftKey, D = Array.from(e.touches || [e], (t=>{
					const n = t.identifier;
					return (t = jn(t, _)).point0 = t.slice(),
					t.identifier = n,
					t
				}
				));
				wi(_);
				var R = s(_, arguments, !0).beforestart();
				if ("overlay" === b) {
					T && (g = !0);
					const n = [D[0], D[1] || D[0]];
					M.selection = T = [[i = t === Bo ? S : qo(n[0][0], n[1][0]), u = t === Io ? E : qo(n[0][1], n[1][1])], [l = t === Bo ? k : Fo(n[0][0], n[1][0]), d = t === Io ? N : Fo(n[0][1], n[1][1])]],
					D.length > 1 && I(e)
				} else
					i = T[0][0],
					u = T[0][1],
					l = T[1][0],
					d = T[1][1];
				a = i,
				c = u,
				h = l,
				p = d;
				var F = Un(_).attr("pointer-events", "none")
				  , q = F.selectAll(".overlay").attr("cursor", Lo[b]);
				if (e.touches)
					R.moved = U,
					R.ended = B;
				else {
					var O = Un(e.view).on("mousemove.brush", U, !0).on("mouseup.brush", B, !0);
					o && O.on("keydown.brush", Y, !0).on("keyup.brush", L, !0),
					$n(e.view)
				}
				f.call(_),
				R.start(e, m.name)
			}
			function U(t) {
				for (const n of t.changedTouches || [t])
					for (const t of D)
						t.identifier === n.identifier && (t.cur = jn(n, _));
				if (z && !y && !v && 1 === D.length) {
					const t = D[0];
					Ro(t.cur[0] - t[0]) > Ro(t.cur[1] - t[1]) ? v = !0 : y = !0
				}
				for (const t of D)
					t.cur && (t[0] = t.cur[0],
					t[1] = t.cur[1]);
				g = !0,
				No(t),
				I(t)
			}
			function I(t) {
				const n = D[0]
				  , e = n.point0;
				var r;
				switch (C = n[0] - e[0],
				P = n[1] - e[1],
				m) {
				case Po:
				case Co:
					x && (C = Fo(S - i, qo(k - l, C)),
					a = i + C,
					h = l + C),
					w && (P = Fo(E - u, qo(N - d, P)),
					c = u + P,
					p = d + P);
					break;
				case zo:
					D[1] ? (x && (a = Fo(S, qo(k, D[0][0])),
					h = Fo(S, qo(k, D[1][0])),
					x = 1),
					w && (c = Fo(E, qo(N, D[0][1])),
					p = Fo(E, qo(N, D[1][1])),
					w = 1)) : (x < 0 ? (C = Fo(S - i, qo(k - i, C)),
					a = i + C,
					h = l) : x > 0 && (C = Fo(S - l, qo(k - l, C)),
					a = i,
					h = l + C),
					w < 0 ? (P = Fo(E - u, qo(N - u, P)),
					c = u + P,
					p = d) : w > 0 && (P = Fo(E - d, qo(N - d, P)),
					c = u,
					p = d + P));
					break;
				case Do:
					x && (a = Fo(S, qo(k, i - C * x)),
					h = Fo(S, qo(k, l + C * x))),
					w && (c = Fo(E, qo(N, u - P * w)),
					p = Fo(E, qo(N, d + P * w)))
				}
				h < a && (x *= -1,
				r = i,
				i = l,
				l = r,
				r = a,
				a = h,
				h = r,
				b in jo && q.attr("cursor", Lo[b = jo[b]])),
				p < c && (w *= -1,
				r = u,
				u = d,
				d = r,
				r = c,
				c = p,
				p = r,
				b in Ho && q.attr("cursor", Lo[b = Ho[b]])),
				M.selection && (T = M.selection),
				y && (a = T[0][0],
				h = T[1][0]),
				v && (c = T[0][1],
				p = T[1][1]),
				T[0][0] === a && T[0][1] === c && T[1][0] === h && T[1][1] === p || (M.selection = [[a, c], [h, p]],
				f.call(_),
				R.brush(t, m.name))
			}
			function B(t) {
				if (ko(t),
				t.touches) {
					if (t.touches.length)
						return;
					n && clearTimeout(n),
					n = setTimeout((function() {
						n = null
					}
					), 500)
				} else
					Wn(t.view, g),
					O.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
				F.attr("pointer-events", "all"),
				q.attr("cursor", Lo.overlay),
				M.selection && (T = M.selection),
				Qo(T) && (M.selection = null,
				f.call(_)),
				R.end(t, m.name)
			}
			function Y(t) {
				switch (t.keyCode) {
				case 16:
					z = x && w;
					break;
				case 18:
					m === zo && (x && (l = h - C * x,
					i = a + C * x),
					w && (d = p - P * w,
					u = c + P * w),
					m = Do,
					I(t));
					break;
				case 32:
					m !== zo && m !== Do || (x < 0 ? l = h - C : x > 0 && (i = a - C),
					w < 0 ? d = p - P : w > 0 && (u = c - P),
					m = Po,
					q.attr("cursor", Lo.selection),
					I(t));
					break;
				default:
					return
				}
				No(t)
			}
			function L(t) {
				switch (t.keyCode) {
				case 16:
					z && (y = v = z = !1,
					I(t));
					break;
				case 18:
					m === Do && (x < 0 ? l = h : x > 0 && (i = a),
					w < 0 ? d = p : w > 0 && (u = c),
					m = zo,
					I(t));
					break;
				case 32:
					m === Po && (t.altKey ? (x && (l = h - C * x,
					i = a + C * x),
					w && (d = p - P * w,
					u = c + P * w),
					m = Do) : (x < 0 ? l = h : x > 0 && (i = a),
					w < 0 ? d = p : w > 0 && (u = c),
					m = zo),
					q.attr("cursor", Lo[b]),
					I(t));
					break;
				default:
					return
				}
				No(t)
			}
		}
		function d(t) {
			s(this, arguments).moved(t)
		}
		function p(t) {
			s(this, arguments).ended(t)
		}
		function g() {
			var n = this.__brush || {
				selection: null
			};
			return n.extent = Uo(e.apply(this, arguments)),
			n.dim = t,
			n
		}
		return c.move = function(n, e, r) {
			n.tween ? n.on("start.brush", (function(t) {
				s(this, arguments).beforestart().start(t)
			}
			)).on("interrupt.brush end.brush", (function(t) {
				s(this, arguments).end(t)
			}
			)).tween("brush", (function() {
				var n = this
				  , r = n.__brush
				  , i = s(n, arguments)
				  , o = r.selection
				  , a = t.input("function" == typeof e ? e.apply(this, arguments) : e, r.extent)
				  , u = Cr(o, a);
				function c(t) {
					r.selection = 1 === t && null === a ? null : u(t),
					f.call(n),
					i.brush()
				}
				return null !== o && null !== a ? c : c(1)
			}
			)) : n.each((function() {
				var n = this
				  , i = arguments
				  , o = n.__brush
				  , a = t.input("function" == typeof e ? e.apply(n, i) : e, o.extent)
				  , u = s(n, i).beforestart();
				wi(n),
				o.selection = null === a ? null : a,
				f.call(n),
				u.start(r).brush(r).end(r)
			}
			))
		}
		,
		c.clear = function(t, n) {
			c.move(t, null, n)
		}
		,
		l.prototype = {
			beforestart: function() {
				return 1 == ++this.active && (this.state.emitter = this,
				this.starting = !0),
				this
			},
			start: function(t, n) {
				return this.starting ? (this.starting = !1,
				this.emit("start", t, n)) : this.emit("brush", t),
				this
			},
			brush: function(t, n) {
				return this.emit("brush", t, n),
				this
			},
			end: function(t, n) {
				return 0 == --this.active && (delete this.state.emitter,
				this.emit("end", t, n)),
				this
			},
			emit: function(n, e, r) {
				var i = Un(this.that).datum();
				a.call(n, this.that, new Eo(n,{
					sourceEvent: e,
					target: c,
					selection: t.output(this.state.selection),
					mode: r,
					dispatch: a
				}), i)
			}
		},
		c.extent = function(t) {
			return arguments.length ? (e = "function" == typeof t ? t : So(Uo(t)),
			c) : e
		}
		,
		c.filter = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : So(!!t),
			c) : r
		}
		,
		c.touchable = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : So(!!t),
			c) : i
		}
		,
		c.handleSize = function(t) {
			return arguments.length ? (u = +t,
			c) : u
		}
		,
		c.keyModifiers = function(t) {
			return arguments.length ? (o = !!t,
			c) : o
		}
		,
		c.on = function() {
			var t = a.on.apply(a, arguments);
			return t === a ? c : t
		}
		,
		c
	}
	var ta = Math.abs
	  , na = Math.cos
	  , ea = Math.sin
	  , ra = Math.PI
	  , ia = ra / 2
	  , oa = 2 * ra
	  , aa = Math.max
	  , ua = 1e-12;
	function ca(t, n) {
		return Array.from({
			length: n - t
		}, ((n,e)=>t + e))
	}
	function fa(t) {
		return function(n, e) {
			return t(n.source.value + n.target.value, e.source.value + e.target.value)
		}
	}
	function sa(t, n) {
		var e = 0
		  , r = null
		  , i = null
		  , o = null;
		function a(a) {
			var u, c = a.length, f = new Array(c), s = ca(0, c), l = new Array(c * c), h = new Array(c), d = 0;
			a = Float64Array.from({
				length: c * c
			}, n ? (t,n)=>a[n % c][n / c | 0] : (t,n)=>a[n / c | 0][n % c]);
			for (let n = 0; n < c; ++n) {
				let e = 0;
				for (let r = 0; r < c; ++r)
					e += a[n * c + r] + t * a[r * c + n];
				d += f[n] = e
			}
			u = (d = aa(0, oa - e * c) / d) ? e : oa / c;
			{
				let n = 0;
				r && s.sort(((t,n)=>r(f[t], f[n])));
				for (const e of s) {
					const r = n;
					if (t) {
						const t = ca(1 + ~c, c).filter((t=>t < 0 ? a[~t * c + e] : a[e * c + t]));
						i && t.sort(((t,n)=>i(t < 0 ? -a[~t * c + e] : a[e * c + t], n < 0 ? -a[~n * c + e] : a[e * c + n])));
						for (const r of t)
							if (r < 0) {
								(l[~r * c + e] || (l[~r * c + e] = {
									source: null,
									target: null
								})).target = {
									index: e,
									startAngle: n,
									endAngle: n += a[~r * c + e] * d,
									value: a[~r * c + e]
								}
							} else {
								(l[e * c + r] || (l[e * c + r] = {
									source: null,
									target: null
								})).source = {
									index: e,
									startAngle: n,
									endAngle: n += a[e * c + r] * d,
									value: a[e * c + r]
								}
							}
						h[e] = {
							index: e,
							startAngle: r,
							endAngle: n,
							value: f[e]
						}
					} else {
						const t = ca(0, c).filter((t=>a[e * c + t] || a[t * c + e]));
						i && t.sort(((t,n)=>i(a[e * c + t], a[e * c + n])));
						for (const r of t) {
							let t;
							if (e < r ? (t = l[e * c + r] || (l[e * c + r] = {
								source: null,
								target: null
							}),
							t.source = {
								index: e,
								startAngle: n,
								endAngle: n += a[e * c + r] * d,
								value: a[e * c + r]
							}) : (t = l[r * c + e] || (l[r * c + e] = {
								source: null,
								target: null
							}),
							t.target = {
								index: e,
								startAngle: n,
								endAngle: n += a[e * c + r] * d,
								value: a[e * c + r]
							},
							e === r && (t.source = t.target)),
							t.source && t.target && t.source.value < t.target.value) {
								const n = t.source;
								t.source = t.target,
								t.target = n
							}
						}
						h[e] = {
							index: e,
							startAngle: r,
							endAngle: n,
							value: f[e]
						}
					}
					n += u
				}
			}
			return (l = Object.values(l)).groups = h,
			o ? l.sort(o) : l
		}
		return a.padAngle = function(t) {
			return arguments.length ? (e = aa(0, t),
			a) : e
		}
		,
		a.sortGroups = function(t) {
			return arguments.length ? (r = t,
			a) : r
		}
		,
		a.sortSubgroups = function(t) {
			return arguments.length ? (i = t,
			a) : i
		}
		,
		a.sortChords = function(t) {
			return arguments.length ? (null == t ? o = null : (o = fa(t))._ = t,
			a) : o && o._
		}
		,
		a
	}
	const la = Math.PI
	  , ha = 2 * la
	  , da = 1e-6
	  , pa = ha - da;
	function ga() {
		this._x0 = this._y0 = this._x1 = this._y1 = null,
		this._ = ""
	}
	function ya() {
		return new ga
	}
	ga.prototype = ya.prototype = {
		constructor: ga,
		moveTo: function(t, n) {
			this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n)
		},
		closePath: function() {
			null !== this._x1 && (this._x1 = this._x0,
			this._y1 = this._y0,
			this._ += "Z")
		},
		lineTo: function(t, n) {
			this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n)
		},
		quadraticCurveTo: function(t, n, e, r) {
			this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r)
		},
		bezierCurveTo: function(t, n, e, r, i, o) {
			this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
		},
		arcTo: function(t, n, e, r, i) {
			t = +t,
			n = +n,
			e = +e,
			r = +r,
			i = +i;
			var o = this._x1
			  , a = this._y1
			  , u = e - t
			  , c = r - n
			  , f = o - t
			  , s = a - n
			  , l = f * f + s * s;
			if (i < 0)
				throw new Error("negative radius: " + i);
			if (null === this._x1)
				this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
			else if (l > da)
				if (Math.abs(s * u - c * f) > da && i) {
					var h = e - o
					  , d = r - a
					  , p = u * u + c * c
					  , g = h * h + d * d
					  , y = Math.sqrt(p)
					  , v = Math.sqrt(l)
					  , _ = i * Math.tan((la - Math.acos((p + l - g) / (2 * y * v))) / 2)
					  , b = _ / v
					  , m = _ / y;
					Math.abs(b - 1) > da && (this._ += "L" + (t + b * f) + "," + (n + b * s)),
					this._ += "A" + i + "," + i + ",0,0," + +(s * h > f * d) + "," + (this._x1 = t + m * u) + "," + (this._y1 = n + m * c)
				} else
					this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
			else
				;
		},
		arc: function(t, n, e, r, i, o) {
			t = +t,
			n = +n,
			o = !!o;
			var a = (e = +e) * Math.cos(r)
			  , u = e * Math.sin(r)
			  , c = t + a
			  , f = n + u
			  , s = 1 ^ o
			  , l = o ? r - i : i - r;
			if (e < 0)
				throw new Error("negative radius: " + e);
			null === this._x1 ? this._ += "M" + c + "," + f : (Math.abs(this._x1 - c) > da || Math.abs(this._y1 - f) > da) && (this._ += "L" + c + "," + f),
			e && (l < 0 && (l = l % ha + ha),
			l > pa ? this._ += "A" + e + "," + e + ",0,1," + s + "," + (t - a) + "," + (n - u) + "A" + e + "," + e + ",0,1," + s + "," + (this._x1 = c) + "," + (this._y1 = f) : l > da && (this._ += "A" + e + "," + e + ",0," + +(l >= la) + "," + s + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i))))
		},
		rect: function(t, n, e, r) {
			this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z"
		},
		toString: function() {
			return this._
		}
	};
	var va = Array.prototype.slice;
	function _a(t) {
		return function() {
			return t
		}
	}
	function ba(t) {
		return t.source
	}
	function ma(t) {
		return t.target
	}
	function xa(t) {
		return t.radius
	}
	function wa(t) {
		return t.startAngle
	}
	function Ma(t) {
		return t.endAngle
	}
	function Aa() {
		return 0
	}
	function Ta() {
		return 10
	}
	function Sa(t) {
		var n = ba
		  , e = ma
		  , r = xa
		  , i = xa
		  , o = wa
		  , a = Ma
		  , u = Aa
		  , c = null;
		function f() {
			var f, s = n.apply(this, arguments), l = e.apply(this, arguments), h = u.apply(this, arguments) / 2, d = va.call(arguments), p = +r.apply(this, (d[0] = s,
			d)), g = o.apply(this, d) - ia, y = a.apply(this, d) - ia, v = +i.apply(this, (d[0] = l,
			d)), _ = o.apply(this, d) - ia, b = a.apply(this, d) - ia;
			if (c || (c = f = ya()),
			h > ua && (ta(y - g) > 2 * h + ua ? y > g ? (g += h,
			y -= h) : (g -= h,
			y += h) : g = y = (g + y) / 2,
			ta(b - _) > 2 * h + ua ? b > _ ? (_ += h,
			b -= h) : (_ -= h,
			b += h) : _ = b = (_ + b) / 2),
			c.moveTo(p * na(g), p * ea(g)),
			c.arc(0, 0, p, g, y),
			g !== _ || y !== b)
				if (t) {
					var m = +t.apply(this, arguments)
					  , x = v - m
					  , w = (_ + b) / 2;
					c.quadraticCurveTo(0, 0, x * na(_), x * ea(_)),
					c.lineTo(v * na(w), v * ea(w)),
					c.lineTo(x * na(b), x * ea(b))
				} else
					c.quadraticCurveTo(0, 0, v * na(_), v * ea(_)),
					c.arc(0, 0, v, _, b);
			if (c.quadraticCurveTo(0, 0, p * na(g), p * ea(g)),
			c.closePath(),
			f)
				return c = null,
				f + "" || null
		}
		return t && (f.headRadius = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : _a(+n),
			f) : t
		}
		),
		f.radius = function(t) {
			return arguments.length ? (r = i = "function" == typeof t ? t : _a(+t),
			f) : r
		}
		,
		f.sourceRadius = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : _a(+t),
			f) : r
		}
		,
		f.targetRadius = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : _a(+t),
			f) : i
		}
		,
		f.startAngle = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : _a(+t),
			f) : o
		}
		,
		f.endAngle = function(t) {
			return arguments.length ? (a = "function" == typeof t ? t : _a(+t),
			f) : a
		}
		,
		f.padAngle = function(t) {
			return arguments.length ? (u = "function" == typeof t ? t : _a(+t),
			f) : u
		}
		,
		f.source = function(t) {
			return arguments.length ? (n = t,
			f) : n
		}
		,
		f.target = function(t) {
			return arguments.length ? (e = t,
			f) : e
		}
		,
		f.context = function(t) {
			return arguments.length ? (c = null == t ? null : t,
			f) : c
		}
		,
		f
	}
	var Ea = Array.prototype.slice;
	function ka(t, n) {
		return t - n
	}
	var Na = t=>()=>t;
	function Ca(t, n) {
		for (var e, r = -1, i = n.length; ++r < i; )
			if (e = Pa(t, n[r]))
				return e;
		return 0
	}
	function Pa(t, n) {
		for (var e = n[0], r = n[1], i = -1, o = 0, a = t.length, u = a - 1; o < a; u = o++) {
			var c = t[o]
			  , f = c[0]
			  , s = c[1]
			  , l = t[u]
			  , h = l[0]
			  , d = l[1];
			if (za(c, l, n))
				return 0;
			s > r != d > r && e < (h - f) * (r - s) / (d - s) + f && (i = -i)
		}
		return i
	}
	function za(t, n, e) {
		var r, i, o, a;
		return function(t, n, e) {
			return (n[0] - t[0]) * (e[1] - t[1]) == (e[0] - t[0]) * (n[1] - t[1])
		}(t, n, e) && (i = t[r = +(t[0] === n[0])],
		o = e[r],
		a = n[r],
		i <= o && o <= a || a <= o && o <= i)
	}
	function Da() {}
	var Ra = [[], [[[1, 1.5], [.5, 1]]], [[[1.5, 1], [1, 1.5]]], [[[1.5, 1], [.5, 1]]], [[[1, .5], [1.5, 1]]], [[[1, 1.5], [.5, 1]], [[1, .5], [1.5, 1]]], [[[1, .5], [1, 1.5]]], [[[1, .5], [.5, 1]]], [[[.5, 1], [1, .5]]], [[[1, 1.5], [1, .5]]], [[[.5, 1], [1, .5]], [[1.5, 1], [1, 1.5]]], [[[1.5, 1], [1, .5]]], [[[.5, 1], [1.5, 1]]], [[[1, 1.5], [1.5, 1]]], [[[.5, 1], [1, 1.5]]], []];
	function Fa() {
		var t = 1
		  , n = 1
		  , e = L
		  , r = u;
		function i(t) {
			var n = e(t);
			if (Array.isArray(n))
				n = n.slice().sort(ka);
			else {
				const e = g(t)
				  , r = B(e[0], e[1], n);
				n = U(Math.floor(e[0] / r) * r, Math.floor(e[1] / r - 1) * r, n)
			}
			return n.map((n=>o(t, n)))
		}
		function o(e, i) {
			var o = []
			  , u = [];
			return function(e, r, i) {
				var o, u, c, f, s, l, h = new Array, d = new Array;
				o = u = -1,
				f = e[0] >= r,
				Ra[f << 1].forEach(p);
				for (; ++o < t - 1; )
					c = f,
					f = e[o + 1] >= r,
					Ra[c | f << 1].forEach(p);
				Ra[f << 0].forEach(p);
				for (; ++u < n - 1; ) {
					for (o = -1,
					f = e[u * t + t] >= r,
					s = e[u * t] >= r,
					Ra[f << 1 | s << 2].forEach(p); ++o < t - 1; )
						c = f,
						f = e[u * t + t + o + 1] >= r,
						l = s,
						s = e[u * t + o + 1] >= r,
						Ra[c | f << 1 | s << 2 | l << 3].forEach(p);
					Ra[f | s << 3].forEach(p)
				}
				o = -1,
				s = e[u * t] >= r,
				Ra[s << 2].forEach(p);
				for (; ++o < t - 1; )
					l = s,
					s = e[u * t + o + 1] >= r,
					Ra[s << 2 | l << 3].forEach(p);
				function p(t) {
					var n, e, r = [t[0][0] + o, t[0][1] + u], c = [t[1][0] + o, t[1][1] + u], f = a(r), s = a(c);
					(n = d[f]) ? (e = h[s]) ? (delete d[n.end],
					delete h[e.start],
					n === e ? (n.ring.push(c),
					i(n.ring)) : h[n.start] = d[e.end] = {
						start: n.start,
						end: e.end,
						ring: n.ring.concat(e.ring)
					}) : (delete d[n.end],
					n.ring.push(c),
					d[n.end = s] = n) : (n = h[s]) ? (e = d[f]) ? (delete h[n.start],
					delete d[e.end],
					n === e ? (n.ring.push(c),
					i(n.ring)) : h[e.start] = d[n.end] = {
						start: e.start,
						end: n.end,
						ring: e.ring.concat(n.ring)
					}) : (delete h[n.start],
					n.ring.unshift(r),
					h[n.start = f] = n) : h[f] = d[s] = {
						start: f,
						end: s,
						ring: [r, c]
					}
				}
				Ra[s << 3].forEach(p)
			}(e, i, (function(t) {
				r(t, e, i),
				function(t) {
					for (var n = 0, e = t.length, r = t[e - 1][1] * t[0][0] - t[e - 1][0] * t[0][1]; ++n < e; )
						r += t[n - 1][1] * t[n][0] - t[n - 1][0] * t[n][1];
					return r
				}(t) > 0 ? o.push([t]) : u.push(t)
			}
			)),
			u.forEach((function(t) {
				for (var n, e = 0, r = o.length; e < r; ++e)
					if (-1 !== Ca((n = o[e])[0], t))
						return void n.push(t)
			}
			)),
			{
				type: "MultiPolygon",
				value: i,
				coordinates: o
			}
		}
		function a(n) {
			return 2 * n[0] + n[1] * (t + 1) * 4
		}
		function u(e, r, i) {
			e.forEach((function(e) {
				var o, a = e[0], u = e[1], c = 0 | a, f = 0 | u, s = r[f * t + c];
				a > 0 && a < t && c === a && (o = r[f * t + c - 1],
				e[0] = a + (i - o) / (s - o) - .5),
				u > 0 && u < n && f === u && (o = r[(f - 1) * t + c],
				e[1] = u + (i - o) / (s - o) - .5)
			}
			))
		}
		return i.contour = o,
		i.size = function(e) {
			if (!arguments.length)
				return [t, n];
			var r = Math.floor(e[0])
			  , o = Math.floor(e[1]);
			if (!(r >= 0 && o >= 0))
				throw new Error("invalid size");
			return t = r,
			n = o,
			i
		}
		,
		i.thresholds = function(t) {
			return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? Na(Ea.call(t)) : Na(t),
			i) : e
		}
		,
		i.smooth = function(t) {
			return arguments.length ? (r = t ? u : Da,
			i) : r === u
		}
		,
		i
	}
	function qa(t, n, e) {
		for (var r = t.width, i = t.height, o = 1 + (e << 1), a = 0; a < i; ++a)
			for (var u = 0, c = 0; u < r + e; ++u)
				u < r && (c += t.data[u + a * r]),
				u >= e && (u >= o && (c -= t.data[u - o + a * r]),
				n.data[u - e + a * r] = c / Math.min(u + 1, r - 1 + o - u, o))
	}
	function Oa(t, n, e) {
		for (var r = t.width, i = t.height, o = 1 + (e << 1), a = 0; a < r; ++a)
			for (var u = 0, c = 0; u < i + e; ++u)
				u < i && (c += t.data[a + u * r]),
				u >= e && (u >= o && (c -= t.data[a + (u - o) * r]),
				n.data[a + (u - e) * r] = c / Math.min(u + 1, i - 1 + o - u, o))
	}
	function Ua(t) {
		return t[0]
	}
	function Ia(t) {
		return t[1]
	}
	function Ba() {
		return 1
	}
	const Ya = 134217729;
	function La(t, n, e, r, i) {
		let o, a, u, c, f = n[0], s = r[0], l = 0, h = 0;
		s > f == s > -f ? (o = f,
		f = n[++l]) : (o = s,
		s = r[++h]);
		let d = 0;
		if (l < t && h < e)
			for (s > f == s > -f ? (a = f + o,
			u = o - (a - f),
			f = n[++l]) : (a = s + o,
			u = o - (a - s),
			s = r[++h]),
			o = a,
			0 !== u && (i[d++] = u); l < t && h < e; )
				s > f == s > -f ? (a = o + f,
				c = a - o,
				u = o - (a - c) + (f - c),
				f = n[++l]) : (a = o + s,
				c = a - o,
				u = o - (a - c) + (s - c),
				s = r[++h]),
				o = a,
				0 !== u && (i[d++] = u);
		for (; l < t; )
			a = o + f,
			c = a - o,
			u = o - (a - c) + (f - c),
			f = n[++l],
			o = a,
			0 !== u && (i[d++] = u);
		for (; h < e; )
			a = o + s,
			c = a - o,
			u = o - (a - c) + (s - c),
			s = r[++h],
			o = a,
			0 !== u && (i[d++] = u);
		return 0 === o && 0 !== d || (i[d++] = o),
		d
	}
	function ja(t) {
		return new Float64Array(t)
	}
	const Ha = ja(4)
	  , Xa = ja(8)
	  , Ga = ja(12)
	  , Va = ja(16)
	  , $a = ja(4);
	function Wa(t, n, e, r, i, o) {
		const a = (n - o) * (e - i)
		  , u = (t - i) * (r - o)
		  , c = a - u;
		if (0 === a || 0 === u || a > 0 != u > 0)
			return c;
		const f = Math.abs(a + u);
		return Math.abs(c) >= 33306690738754716e-32 * f ? c : -function(t, n, e, r, i, o, a) {
			let u, c, f, s, l, h, d, p, g, y, v, _, b, m, x, w, M, A;
			const T = t - i
			  , S = e - i
			  , E = n - o
			  , k = r - o;
			m = T * k,
			h = Ya * T,
			d = h - (h - T),
			p = T - d,
			h = Ya * k,
			g = h - (h - k),
			y = k - g,
			x = p * y - (m - d * g - p * g - d * y),
			w = E * S,
			h = Ya * E,
			d = h - (h - E),
			p = E - d,
			h = Ya * S,
			g = h - (h - S),
			y = S - g,
			M = p * y - (w - d * g - p * g - d * y),
			v = x - M,
			l = x - v,
			Ha[0] = x - (v + l) + (l - M),
			_ = m + v,
			l = _ - m,
			b = m - (_ - l) + (v - l),
			v = b - w,
			l = b - v,
			Ha[1] = b - (v + l) + (l - w),
			A = _ + v,
			l = A - _,
			Ha[2] = _ - (A - l) + (v - l),
			Ha[3] = A;
			let N = function(t, n) {
				let e = n[0];
				for (let r = 1; r < t; r++)
					e += n[r];
				return e
			}(4, Ha)
			  , C = 22204460492503146e-32 * a;
			if (N >= C || -N >= C)
				return N;
			if (l = t - T,
			u = t - (T + l) + (l - i),
			l = e - S,
			f = e - (S + l) + (l - i),
			l = n - E,
			c = n - (E + l) + (l - o),
			l = r - k,
			s = r - (k + l) + (l - o),
			0 === u && 0 === c && 0 === f && 0 === s)
				return N;
			if (C = 11093356479670487e-47 * a + 33306690738754706e-32 * Math.abs(N),
			N += T * s + k * u - (E * f + S * c),
			N >= C || -N >= C)
				return N;
			m = u * k,
			h = Ya * u,
			d = h - (h - u),
			p = u - d,
			h = Ya * k,
			g = h - (h - k),
			y = k - g,
			x = p * y - (m - d * g - p * g - d * y),
			w = c * S,
			h = Ya * c,
			d = h - (h - c),
			p = c - d,
			h = Ya * S,
			g = h - (h - S),
			y = S - g,
			M = p * y - (w - d * g - p * g - d * y),
			v = x - M,
			l = x - v,
			$a[0] = x - (v + l) + (l - M),
			_ = m + v,
			l = _ - m,
			b = m - (_ - l) + (v - l),
			v = b - w,
			l = b - v,
			$a[1] = b - (v + l) + (l - w),
			A = _ + v,
			l = A - _,
			$a[2] = _ - (A - l) + (v - l),
			$a[3] = A;
			const P = La(4, Ha, 4, $a, Xa);
			m = T * s,
			h = Ya * T,
			d = h - (h - T),
			p = T - d,
			h = Ya * s,
			g = h - (h - s),
			y = s - g,
			x = p * y - (m - d * g - p * g - d * y),
			w = E * f,
			h = Ya * E,
			d = h - (h - E),
			p = E - d,
			h = Ya * f,
			g = h - (h - f),
			y = f - g,
			M = p * y - (w - d * g - p * g - d * y),
			v = x - M,
			l = x - v,
			$a[0] = x - (v + l) + (l - M),
			_ = m + v,
			l = _ - m,
			b = m - (_ - l) + (v - l),
			v = b - w,
			l = b - v,
			$a[1] = b - (v + l) + (l - w),
			A = _ + v,
			l = A - _,
			$a[2] = _ - (A - l) + (v - l),
			$a[3] = A;
			const z = La(P, Xa, 4, $a, Ga);
			m = u * s,
			h = Ya * u,
			d = h - (h - u),
			p = u - d,
			h = Ya * s,
			g = h - (h - s),
			y = s - g,
			x = p * y - (m - d * g - p * g - d * y),
			w = c * f,
			h = Ya * c,
			d = h - (h - c),
			p = c - d,
			h = Ya * f,
			g = h - (h - f),
			y = f - g,
			M = p * y - (w - d * g - p * g - d * y),
			v = x - M,
			l = x - v,
			$a[0] = x - (v + l) + (l - M),
			_ = m + v,
			l = _ - m,
			b = m - (_ - l) + (v - l),
			v = b - w,
			l = b - v,
			$a[1] = b - (v + l) + (l - w),
			A = _ + v,
			l = A - _,
			$a[2] = _ - (A - l) + (v - l),
			$a[3] = A;
			const D = La(z, Ga, 4, $a, Va);
			return Va[D - 1]
		}(t, n, e, r, i, o, f)
	}
	const Za = Math.pow(2, -52)
	  , Ka = new Uint32Array(512);
	class Qa {
		static from(t, n=iu, e=ou) {
			const r = t.length
			  , i = new Float64Array(2 * r);
			for (let o = 0; o < r; o++) {
				const r = t[o];
				i[2 * o] = n(r),
				i[2 * o + 1] = e(r)
			}
			return new Qa(i)
		}
		constructor(t) {
			const n = t.length >> 1;
			if (n > 0 && "number" != typeof t[0])
				throw new Error("Expected coords to contain numbers.");
			this.coords = t;
			const e = Math.max(2 * n - 5, 0);
			this._triangles = new Uint32Array(3 * e),
			this._halfedges = new Int32Array(3 * e),
			this._hashSize = Math.ceil(Math.sqrt(n)),
			this._hullPrev = new Uint32Array(n),
			this._hullNext = new Uint32Array(n),
			this._hullTri = new Uint32Array(n),
			this._hullHash = new Int32Array(this._hashSize).fill(-1),
			this._ids = new Uint32Array(n),
			this._dists = new Float64Array(n),
			this.update()
		}
		update() {
			const {coords: t, _hullPrev: n, _hullNext: e, _hullTri: r, _hullHash: i} = this
			  , o = t.length >> 1;
			let a = 1 / 0
			  , u = 1 / 0
			  , c = -1 / 0
			  , f = -1 / 0;
			for (let n = 0; n < o; n++) {
				const e = t[2 * n]
				  , r = t[2 * n + 1];
				e < a && (a = e),
				r < u && (u = r),
				e > c && (c = e),
				r > f && (f = r),
				this._ids[n] = n
			}
			const s = (a + c) / 2
			  , l = (u + f) / 2;
			let h, d, p, g = 1 / 0;
			for (let n = 0; n < o; n++) {
				const e = Ja(s, l, t[2 * n], t[2 * n + 1]);
				e < g && (h = n,
				g = e)
			}
			const y = t[2 * h]
			  , v = t[2 * h + 1];
			g = 1 / 0;
			for (let n = 0; n < o; n++) {
				if (n === h)
					continue;
				const e = Ja(y, v, t[2 * n], t[2 * n + 1]);
				e < g && e > 0 && (d = n,
				g = e)
			}
			let _ = t[2 * d]
			  , b = t[2 * d + 1]
			  , m = 1 / 0;
			for (let n = 0; n < o; n++) {
				if (n === h || n === d)
					continue;
				const e = nu(y, v, _, b, t[2 * n], t[2 * n + 1]);
				e < m && (p = n,
				m = e)
			}
			let x = t[2 * p]
			  , w = t[2 * p + 1];
			if (m === 1 / 0) {
				for (let n = 0; n < o; n++)
					this._dists[n] = t[2 * n] - t[0] || t[2 * n + 1] - t[1];
				eu(this._ids, this._dists, 0, o - 1);
				const n = new Uint32Array(o);
				let e = 0;
				for (let t = 0, r = -1 / 0; t < o; t++) {
					const i = this._ids[t];
					this._dists[i] > r && (n[e++] = i,
					r = this._dists[i])
				}
				return this.hull = n.subarray(0, e),
				this.triangles = new Uint32Array(0),
				void (this.halfedges = new Uint32Array(0))
			}
			if (Wa(y, v, _, b, x, w) < 0) {
				const t = d
				  , n = _
				  , e = b;
				d = p,
				_ = x,
				b = w,
				p = t,
				x = n,
				w = e
			}
			const M = function(t, n, e, r, i, o) {
				const a = e - t
				  , u = r - n
				  , c = i - t
				  , f = o - n
				  , s = a * a + u * u
				  , l = c * c + f * f
				  , h = .5 / (a * f - u * c);
				return {
					x: t + (f * s - u * l) * h,
					y: n + (a * l - c * s) * h
				}
			}(y, v, _, b, x, w);
			this._cx = M.x,
			this._cy = M.y;
			for (let n = 0; n < o; n++)
				this._dists[n] = Ja(t[2 * n], t[2 * n + 1], M.x, M.y);
			eu(this._ids, this._dists, 0, o - 1),
			this._hullStart = h;
			let A = 3;
			e[h] = n[p] = d,
			e[d] = n[h] = p,
			e[p] = n[d] = h,
			r[h] = 0,
			r[d] = 1,
			r[p] = 2,
			i.fill(-1),
			i[this._hashKey(y, v)] = h,
			i[this._hashKey(_, b)] = d,
			i[this._hashKey(x, w)] = p,
			this.trianglesLen = 0,
			this._addTriangle(h, d, p, -1, -1, -1);
			for (let o, a, u = 0; u < this._ids.length; u++) {
				const c = this._ids[u]
				  , f = t[2 * c]
				  , s = t[2 * c + 1];
				if (u > 0 && Math.abs(f - o) <= Za && Math.abs(s - a) <= Za)
					continue;
				if (o = f,
				a = s,
				c === h || c === d || c === p)
					continue;
				let l = 0;
				for (let t = 0, n = this._hashKey(f, s); t < this._hashSize && (l = i[(n + t) % this._hashSize],
				-1 === l || l === e[l]); t++)
					;
				l = n[l];
				let g, y = l;
				for (; g = e[y],
				Wa(f, s, t[2 * y], t[2 * y + 1], t[2 * g], t[2 * g + 1]) >= 0; )
					if (y = g,
					y === l) {
						y = -1;
						break
					}
				if (-1 === y)
					continue;
				let v = this._addTriangle(y, c, e[y], -1, -1, r[y]);
				r[c] = this._legalize(v + 2),
				r[y] = v,
				A++;
				let _ = e[y];
				for (; g = e[_],
				Wa(f, s, t[2 * _], t[2 * _ + 1], t[2 * g], t[2 * g + 1]) < 0; )
					v = this._addTriangle(_, c, g, r[c], -1, r[_]),
					r[c] = this._legalize(v + 2),
					e[_] = _,
					A--,
					_ = g;
				if (y === l)
					for (; g = n[y],
					Wa(f, s, t[2 * g], t[2 * g + 1], t[2 * y], t[2 * y + 1]) < 0; )
						v = this._addTriangle(g, c, y, -1, r[y], r[g]),
						this._legalize(v + 2),
						r[g] = v,
						e[y] = y,
						A--,
						y = g;
				this._hullStart = n[c] = y,
				e[y] = n[_] = c,
				e[c] = _,
				i[this._hashKey(f, s)] = c,
				i[this._hashKey(t[2 * y], t[2 * y + 1])] = y
			}
			this.hull = new Uint32Array(A);
			for (let t = 0, n = this._hullStart; t < A; t++)
				this.hull[t] = n,
				n = e[n];
			this.triangles = this._triangles.subarray(0, this.trianglesLen),
			this.halfedges = this._halfedges.subarray(0, this.trianglesLen)
		}
		_hashKey(t, n) {
			return Math.floor(function(t, n) {
				const e = t / (Math.abs(t) + Math.abs(n));
				return (n > 0 ? 3 - e : 1 + e) / 4
			}(t - this._cx, n - this._cy) * this._hashSize) % this._hashSize
		}
		_legalize(t) {
			const {_triangles: n, _halfedges: e, coords: r} = this;
			let i = 0
			  , o = 0;
			for (; ; ) {
				const a = e[t]
				  , u = t - t % 3;
				if (o = u + (t + 2) % 3,
				-1 === a) {
					if (0 === i)
						break;
					t = Ka[--i];
					continue
				}
				const c = a - a % 3
				  , f = u + (t + 1) % 3
				  , s = c + (a + 2) % 3
				  , l = n[o]
				  , h = n[t]
				  , d = n[f]
				  , p = n[s];
				if (tu(r[2 * l], r[2 * l + 1], r[2 * h], r[2 * h + 1], r[2 * d], r[2 * d + 1], r[2 * p], r[2 * p + 1])) {
					n[t] = p,
					n[a] = l;
					const r = e[s];
					if (-1 === r) {
						let n = this._hullStart;
						do {
							if (this._hullTri[n] === s) {
								this._hullTri[n] = t;
								break
							}
							n = this._hullPrev[n]
						} while (n !== this._hullStart)
					}
					this._link(t, r),
					this._link(a, e[o]),
					this._link(o, s);
					const u = c + (a + 1) % 3;
					i < Ka.length && (Ka[i++] = u)
				} else {
					if (0 === i)
						break;
					t = Ka[--i]
				}
			}
			return o
		}
		_link(t, n) {
			this._halfedges[t] = n,
			-1 !== n && (this._halfedges[n] = t)
		}
		_addTriangle(t, n, e, r, i, o) {
			const a = this.trianglesLen;
			return this._triangles[a] = t,
			this._triangles[a + 1] = n,
			this._triangles[a + 2] = e,
			this._link(a, r),
			this._link(a + 1, i),
			this._link(a + 2, o),
			this.trianglesLen += 3,
			a
		}
	}
	function Ja(t, n, e, r) {
		const i = t - e
		  , o = n - r;
		return i * i + o * o
	}
	function tu(t, n, e, r, i, o, a, u) {
		const c = t - a
		  , f = n - u
		  , s = e - a
		  , l = r - u
		  , h = i - a
		  , d = o - u
		  , p = s * s + l * l
		  , g = h * h + d * d;
		return c * (l * g - p * d) - f * (s * g - p * h) + (c * c + f * f) * (s * d - l * h) < 0
	}
	function nu(t, n, e, r, i, o) {
		const a = e - t
		  , u = r - n
		  , c = i - t
		  , f = o - n
		  , s = a * a + u * u
		  , l = c * c + f * f
		  , h = .5 / (a * f - u * c)
		  , d = (f * s - u * l) * h
		  , p = (a * l - c * s) * h;
		return d * d + p * p
	}
	function eu(t, n, e, r) {
		if (r - e <= 20)
			for (let i = e + 1; i <= r; i++) {
				const r = t[i]
				  , o = n[r];
				let a = i - 1;
				for (; a >= e && n[t[a]] > o; )
					t[a + 1] = t[a--];
				t[a + 1] = r
			}
		else {
			let i = e + 1
			  , o = r;
			ru(t, e + r >> 1, i),
			n[t[e]] > n[t[r]] && ru(t, e, r),
			n[t[i]] > n[t[r]] && ru(t, i, r),
			n[t[e]] > n[t[i]] && ru(t, e, i);
			const a = t[i]
			  , u = n[a];
			for (; ; ) {
				do {
					i++
				} while (n[t[i]] < u);
				do {
					o--
				} while (n[t[o]] > u);
				if (o < i)
					break;
				ru(t, i, o)
			}
			t[e + 1] = t[o],
			t[o] = a,
			r - i + 1 >= o - e ? (eu(t, n, i, r),
			eu(t, n, e, o - 1)) : (eu(t, n, e, o - 1),
			eu(t, n, i, r))
		}
	}
	function ru(t, n, e) {
		const r = t[n];
		t[n] = t[e],
		t[e] = r
	}
	function iu(t) {
		return t[0]
	}
	function ou(t) {
		return t[1]
	}
	const au = 1e-6;
	class uu {
		constructor() {
			this._x0 = this._y0 = this._x1 = this._y1 = null,
			this._ = ""
		}
		moveTo(t, n) {
			this._ += `M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}`
		}
		closePath() {
			null !== this._x1 && (this._x1 = this._x0,
			this._y1 = this._y0,
			this._ += "Z")
		}
		lineTo(t, n) {
			this._ += `L${this._x1 = +t},${this._y1 = +n}`
		}
		arc(t, n, e) {
			const r = (t = +t) + (e = +e)
			  , i = n = +n;
			if (e < 0)
				throw new Error("negative radius");
			null === this._x1 ? this._ += `M${r},${i}` : (Math.abs(this._x1 - r) > au || Math.abs(this._y1 - i) > au) && (this._ += "L" + r + "," + i),
			e && (this._ += `A${e},${e},0,1,1,${t - e},${n}A${e},${e},0,1,1,${this._x1 = r},${this._y1 = i}`)
		}
		rect(t, n, e, r) {
			this._ += `M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${+e}v${+r}h${-e}Z`
		}
		value() {
			return this._ || null
		}
	}
	class cu {
		constructor() {
			this._ = []
		}
		moveTo(t, n) {
			this._.push([t, n])
		}
		closePath() {
			this._.push(this._[0].slice())
		}
		lineTo(t, n) {
			this._.push([t, n])
		}
		value() {
			return this._.length ? this._ : null
		}
	}
	class fu {
		constructor(t, [n,e,r,i]=[0, 0, 960, 500]) {
			if (!((r = +r) >= (n = +n) && (i = +i) >= (e = +e)))
				throw new Error("invalid bounds");
			this.delaunay = t,
			this._circumcenters = new Float64Array(2 * t.points.length),
			this.vectors = new Float64Array(2 * t.points.length),
			this.xmax = r,
			this.xmin = n,
			this.ymax = i,
			this.ymin = e,
			this._init()
		}
		update() {
			return this.delaunay.update(),
			this._init(),
			this
		}
		_init() {
			const {delaunay: {points: t, hull: n, triangles: e}, vectors: r} = this
			  , i = this.circumcenters = this._circumcenters.subarray(0, e.length / 3 * 2);
			for (let n, r, o = 0, a = 0, u = e.length; o < u; o += 3,
			a += 2) {
				const u = 2 * e[o]
				  , c = 2 * e[o + 1]
				  , f = 2 * e[o + 2]
				  , s = t[u]
				  , l = t[u + 1]
				  , h = t[c]
				  , d = t[c + 1]
				  , p = t[f]
				  , g = t[f + 1]
				  , y = h - s
				  , v = d - l
				  , _ = p - s
				  , b = g - l
				  , m = 2 * (y * b - v * _);
				if (Math.abs(m) < 1e-9) {
					let i = 1e9;
					const o = 2 * e[0];
					i *= Math.sign((t[o] - s) * b - (t[o + 1] - l) * _),
					n = (s + p) / 2 - i * b,
					r = (l + g) / 2 + i * _
				} else {
					const t = 1 / m
					  , e = y * y + v * v
					  , i = _ * _ + b * b;
					n = s + (b * e - v * i) * t,
					r = l + (y * i - _ * e) * t
				}
				i[a] = n,
				i[a + 1] = r
			}
			let o, a, u, c = n[n.length - 1], f = 4 * c, s = t[2 * c], l = t[2 * c + 1];
			r.fill(0);
			for (let e = 0; e < n.length; ++e)
				c = n[e],
				o = f,
				a = s,
				u = l,
				f = 4 * c,
				s = t[2 * c],
				l = t[2 * c + 1],
				r[o + 2] = r[f] = u - l,
				r[o + 3] = r[f + 1] = s - a
		}
		render(t) {
			const n = null == t ? t = new uu : void 0
			  , {delaunay: {halfedges: e, inedges: r, hull: i}, circumcenters: o, vectors: a} = this;
			if (i.length <= 1)
				return null;
			for (let n = 0, r = e.length; n < r; ++n) {
				const r = e[n];
				if (r < n)
					continue;
				const i = 2 * Math.floor(n / 3)
				  , a = 2 * Math.floor(r / 3)
				  , u = o[i]
				  , c = o[i + 1]
				  , f = o[a]
				  , s = o[a + 1];
				this._renderSegment(u, c, f, s, t)
			}
			let u, c = i[i.length - 1];
			for (let n = 0; n < i.length; ++n) {
				u = c,
				c = i[n];
				const e = 2 * Math.floor(r[c] / 3)
				  , f = o[e]
				  , s = o[e + 1]
				  , l = 4 * u
				  , h = this._project(f, s, a[l + 2], a[l + 3]);
				h && this._renderSegment(f, s, h[0], h[1], t)
			}
			return n && n.value()
		}
		renderBounds(t) {
			const n = null == t ? t = new uu : void 0;
			return t.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin),
			n && n.value()
		}
		renderCell(t, n) {
			const e = null == n ? n = new uu : void 0
			  , r = this._clip(t);
			if (null === r || !r.length)
				return;
			n.moveTo(r[0], r[1]);
			let i = r.length;
			for (; r[0] === r[i - 2] && r[1] === r[i - 1] && i > 1; )
				i -= 2;
			for (let t = 2; t < i; t += 2)
				r[t] === r[t - 2] && r[t + 1] === r[t - 1] || n.lineTo(r[t], r[t + 1]);
			return n.closePath(),
			e && e.value()
		}
		*cellPolygons() {
			const {delaunay: {points: t}} = this;
			for (let n = 0, e = t.length / 2; n < e; ++n) {
				const t = this.cellPolygon(n);
				t && (t.index = n,
				yield t)
			}
		}
		cellPolygon(t) {
			const n = new cu;
			return this.renderCell(t, n),
			n.value()
		}
		_renderSegment(t, n, e, r, i) {
			let o;
			const a = this._regioncode(t, n)
			  , u = this._regioncode(e, r);
			0 === a && 0 === u ? (i.moveTo(t, n),
			i.lineTo(e, r)) : (o = this._clipSegment(t, n, e, r, a, u)) && (i.moveTo(o[0], o[1]),
			i.lineTo(o[2], o[3]))
		}
		contains(t, n, e) {
			return (n = +n) == n && (e = +e) == e && this.delaunay._step(t, n, e) === t
		}
		*neighbors(t) {
			const n = this._clip(t);
			if (n)
				for (const e of this.delaunay.neighbors(t)) {
					const t = this._clip(e);
					if (t)
						t: for (let r = 0, i = n.length; r < i; r += 2)
							for (let o = 0, a = t.length; o < a; o += 2)
								if (n[r] == t[o] && n[r + 1] == t[o + 1] && n[(r + 2) % i] == t[(o + a - 2) % a] && n[(r + 3) % i] == t[(o + a - 1) % a]) {
									yield e;
									break t
								}
				}
		}
		_cell(t) {
			const {circumcenters: n, delaunay: {inedges: e, halfedges: r, triangles: i}} = this
			  , o = e[t];
			if (-1 === o)
				return null;
			const a = [];
			let u = o;
			do {
				const e = Math.floor(u / 3);
				if (a.push(n[2 * e], n[2 * e + 1]),
				u = u % 3 == 2 ? u - 2 : u + 1,
				i[u] !== t)
					break;
				u = r[u]
			} while (u !== o && -1 !== u);
			return a
		}
		_clip(t) {
			if (0 === t && 1 === this.delaunay.hull.length)
				return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
			const n = this._cell(t);
			if (null === n)
				return null;
			const {vectors: e} = this
			  , r = 4 * t;
			return e[r] || e[r + 1] ? this._clipInfinite(t, n, e[r], e[r + 1], e[r + 2], e[r + 3]) : this._clipFinite(t, n)
		}
		_clipFinite(t, n) {
			const e = n.length;
			let r, i, o, a, u = null, c = n[e - 2], f = n[e - 1], s = this._regioncode(c, f), l = 0;
			for (let h = 0; h < e; h += 2)
				if (r = c,
				i = f,
				c = n[h],
				f = n[h + 1],
				o = s,
				s = this._regioncode(c, f),
				0 === o && 0 === s)
					a = l,
					l = 0,
					u ? u.push(c, f) : u = [c, f];
				else {
					let n, e, h, d, p;
					if (0 === o) {
						if (null === (n = this._clipSegment(r, i, c, f, o, s)))
							continue;
						[e,h,d,p] = n
					} else {
						if (null === (n = this._clipSegment(c, f, r, i, s, o)))
							continue;
						[d,p,e,h] = n,
						a = l,
						l = this._edgecode(e, h),
						a && l && this._edge(t, a, l, u, u.length),
						u ? u.push(e, h) : u = [e, h]
					}
					a = l,
					l = this._edgecode(d, p),
					a && l && this._edge(t, a, l, u, u.length),
					u ? u.push(d, p) : u = [d, p]
				}
			if (u)
				a = l,
				l = this._edgecode(u[0], u[1]),
				a && l && this._edge(t, a, l, u, u.length);
			else if (this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2))
				return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
			return u
		}
		_clipSegment(t, n, e, r, i, o) {
			for (; ; ) {
				if (0 === i && 0 === o)
					return [t, n, e, r];
				if (i & o)
					return null;
				let a, u, c = i || o;
				8 & c ? (a = t + (e - t) * (this.ymax - n) / (r - n),
				u = this.ymax) : 4 & c ? (a = t + (e - t) * (this.ymin - n) / (r - n),
				u = this.ymin) : 2 & c ? (u = n + (r - n) * (this.xmax - t) / (e - t),
				a = this.xmax) : (u = n + (r - n) * (this.xmin - t) / (e - t),
				a = this.xmin),
				i ? (t = a,
				n = u,
				i = this._regioncode(t, n)) : (e = a,
				r = u,
				o = this._regioncode(e, r))
			}
		}
		_clipInfinite(t, n, e, r, i, o) {
			let a, u = Array.from(n);
			if ((a = this._project(u[0], u[1], e, r)) && u.unshift(a[0], a[1]),
			(a = this._project(u[u.length - 2], u[u.length - 1], i, o)) && u.push(a[0], a[1]),
			u = this._clipFinite(t, u))
				for (let n, e = 0, r = u.length, i = this._edgecode(u[r - 2], u[r - 1]); e < r; e += 2)
					n = i,
					i = this._edgecode(u[e], u[e + 1]),
					n && i && (e = this._edge(t, n, i, u, e),
					r = u.length);
			else
				this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (u = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]);
			return u
		}
		_edge(t, n, e, r, i) {
			for (; n !== e; ) {
				let e, o;
				switch (n) {
				case 5:
					n = 4;
					continue;
				case 4:
					n = 6,
					e = this.xmax,
					o = this.ymin;
					break;
				case 6:
					n = 2;
					continue;
				case 2:
					n = 10,
					e = this.xmax,
					o = this.ymax;
					break;
				case 10:
					n = 8;
					continue;
				case 8:
					n = 9,
					e = this.xmin,
					o = this.ymax;
					break;
				case 9:
					n = 1;
					continue;
				case 1:
					n = 5,
					e = this.xmin,
					o = this.ymin
				}
				r[i] === e && r[i + 1] === o || !this.contains(t, e, o) || (r.splice(i, 0, e, o),
				i += 2)
			}
			if (r.length > 4)
				for (let t = 0; t < r.length; t += 2) {
					const n = (t + 2) % r.length
					  , e = (t + 4) % r.length;
					(r[t] === r[n] && r[n] === r[e] || r[t + 1] === r[n + 1] && r[n + 1] === r[e + 1]) && (r.splice(n, 2),
					t -= 2)
				}
			return i
		}
		_project(t, n, e, r) {
			let i, o, a, u = 1 / 0;
			if (r < 0) {
				if (n <= this.ymin)
					return null;
				(i = (this.ymin - n) / r) < u && (a = this.ymin,
				o = t + (u = i) * e)
			} else if (r > 0) {
				if (n >= this.ymax)
					return null;
				(i = (this.ymax - n) / r) < u && (a = this.ymax,
				o = t + (u = i) * e)
			}
			if (e > 0) {
				if (t >= this.xmax)
					return null;
				(i = (this.xmax - t) / e) < u && (o = this.xmax,
				a = n + (u = i) * r)
			} else if (e < 0) {
				if (t <= this.xmin)
					return null;
				(i = (this.xmin - t) / e) < u && (o = this.xmin,
				a = n + (u = i) * r)
			}
			return [o, a]
		}
		_edgecode(t, n) {
			return (t === this.xmin ? 1 : t === this.xmax ? 2 : 0) | (n === this.ymin ? 4 : n === this.ymax ? 8 : 0)
		}
		_regioncode(t, n) {
			return (t < this.xmin ? 1 : t > this.xmax ? 2 : 0) | (n < this.ymin ? 4 : n > this.ymax ? 8 : 0)
		}
	}
	const su = 2 * Math.PI
	  , lu = Math.pow;
	function hu(t) {
		return t[0]
	}
	function du(t) {
		return t[1]
	}
	function pu(t, n, e) {
		return [t + Math.sin(t + n) * e, n + Math.cos(t - n) * e]
	}
	class gu {
		static from(t, n=hu, e=du, r) {
			return new gu("length"in t ? function(t, n, e, r) {
				const i = t.length
				  , o = new Float64Array(2 * i);
				for (let a = 0; a < i; ++a) {
					const i = t[a];
					o[2 * a] = n.call(r, i, a, t),
					o[2 * a + 1] = e.call(r, i, a, t)
				}
				return o
			}(t, n, e, r) : Float64Array.from(function*(t, n, e, r) {
				let i = 0;
				for (const o of t)
					yield n.call(r, o, i, t),
					yield e.call(r, o, i, t),
					++i
			}(t, n, e, r)))
		}
		constructor(t) {
			this._delaunator = new Qa(t),
			this.inedges = new Int32Array(t.length / 2),
			this._hullIndex = new Int32Array(t.length / 2),
			this.points = this._delaunator.coords,
			this._init()
		}
		update() {
			return this._delaunator.update(),
			this._init(),
			this
		}
		_init() {
			const t = this._delaunator
			  , n = this.points;
			if (t.hull && t.hull.length > 2 && function(t) {
				const {triangles: n, coords: e} = t;
				for (let t = 0; t < n.length; t += 3) {
					const r = 2 * n[t]
					  , i = 2 * n[t + 1]
					  , o = 2 * n[t + 2];
					if ((e[o] - e[r]) * (e[i + 1] - e[r + 1]) - (e[i] - e[r]) * (e[o + 1] - e[r + 1]) > 1e-10)
						return !1
				}
				return !0
			}(t)) {
				this.collinear = Int32Array.from({
					length: n.length / 2
				}, ((t,n)=>n)).sort(((t,e)=>n[2 * t] - n[2 * e] || n[2 * t + 1] - n[2 * e + 1]));
				const t = this.collinear[0]
				  , e = this.collinear[this.collinear.length - 1]
				  , r = [n[2 * t], n[2 * t + 1], n[2 * e], n[2 * e + 1]]
				  , i = 1e-8 * Math.hypot(r[3] - r[1], r[2] - r[0]);
				for (let t = 0, e = n.length / 2; t < e; ++t) {
					const e = pu(n[2 * t], n[2 * t + 1], i);
					n[2 * t] = e[0],
					n[2 * t + 1] = e[1]
				}
				this._delaunator = new Qa(n)
			} else
				delete this.collinear;
			const e = this.halfedges = this._delaunator.halfedges
			  , r = this.hull = this._delaunator.hull
			  , i = this.triangles = this._delaunator.triangles
			  , o = this.inedges.fill(-1)
			  , a = this._hullIndex.fill(-1);
			for (let t = 0, n = e.length; t < n; ++t) {
				const n = i[t % 3 == 2 ? t - 2 : t + 1];
				-1 !== e[t] && -1 !== o[n] || (o[n] = t)
			}
			for (let t = 0, n = r.length; t < n; ++t)
				a[r[t]] = t;
			r.length <= 2 && r.length > 0 && (this.triangles = new Int32Array(3).fill(-1),
			this.halfedges = new Int32Array(3).fill(-1),
			this.triangles[0] = r[0],
			o[r[0]] = 1,
			2 === r.length && (o[r[1]] = 0,
			this.triangles[1] = r[1],
			this.triangles[2] = r[1]))
		}
		voronoi(t) {
			return new fu(this,t)
		}
		*neighbors(t) {
			const {inedges: n, hull: e, _hullIndex: r, halfedges: i, triangles: o, collinear: a} = this;
			if (a) {
				const n = a.indexOf(t);
				return n > 0 && (yield a[n - 1]),
				void (n < a.length - 1 && (yield a[n + 1]))
			}
			const u = n[t];
			if (-1 === u)
				return;
			let c = u
			  , f = -1;
			do {
				if (yield f = o[c],
				c = c % 3 == 2 ? c - 2 : c + 1,
				o[c] !== t)
					return;
				if (c = i[c],
				-1 === c) {
					const n = e[(r[t] + 1) % e.length];
					return void (n !== f && (yield n))
				}
			} while (c !== u)
		}
		find(t, n, e=0) {
			if ((t = +t) != t || (n = +n) != n)
				return -1;
			const r = e;
			let i;
			for (; (i = this._step(e, t, n)) >= 0 && i !== e && i !== r; )
				e = i;
			return i
		}
		_step(t, n, e) {
			const {inedges: r, hull: i, _hullIndex: o, halfedges: a, triangles: u, points: c} = this;
			if (-1 === r[t] || !c.length)
				return (t + 1) % (c.length >> 1);
			let f = t
			  , s = lu(n - c[2 * t], 2) + lu(e - c[2 * t + 1], 2);
			const l = r[t];
			let h = l;
			do {
				let r = u[h];
				const l = lu(n - c[2 * r], 2) + lu(e - c[2 * r + 1], 2);
				if (l < s && (s = l,
				f = r),
				h = h % 3 == 2 ? h - 2 : h + 1,
				u[h] !== t)
					break;
				if (h = a[h],
				-1 === h) {
					if (h = i[(o[t] + 1) % i.length],
					h !== r && lu(n - c[2 * h], 2) + lu(e - c[2 * h + 1], 2) < s)
						return h;
					break
				}
			} while (h !== l);
			return f
		}
		render(t) {
			const n = null == t ? t = new uu : void 0
			  , {points: e, halfedges: r, triangles: i} = this;
			for (let n = 0, o = r.length; n < o; ++n) {
				const o = r[n];
				if (o < n)
					continue;
				const a = 2 * i[n]
				  , u = 2 * i[o];
				t.moveTo(e[a], e[a + 1]),
				t.lineTo(e[u], e[u + 1])
			}
			return this.renderHull(t),
			n && n.value()
		}
		renderPoints(t, n) {
			void 0 !== n || t && "function" == typeof t.moveTo || (n = t,
			t = null),
			n = null == n ? 2 : +n;
			const e = null == t ? t = new uu : void 0
			  , {points: r} = this;
			for (let e = 0, i = r.length; e < i; e += 2) {
				const i = r[e]
				  , o = r[e + 1];
				t.moveTo(i + n, o),
				t.arc(i, o, n, 0, su)
			}
			return e && e.value()
		}
		renderHull(t) {
			const n = null == t ? t = new uu : void 0
			  , {hull: e, points: r} = this
			  , i = 2 * e[0]
			  , o = e.length;
			t.moveTo(r[i], r[i + 1]);
			for (let n = 1; n < o; ++n) {
				const i = 2 * e[n];
				t.lineTo(r[i], r[i + 1])
			}
			return t.closePath(),
			n && n.value()
		}
		hullPolygon() {
			const t = new cu;
			return this.renderHull(t),
			t.value()
		}
		renderTriangle(t, n) {
			const e = null == n ? n = new uu : void 0
			  , {points: r, triangles: i} = this
			  , o = 2 * i[t *= 3]
			  , a = 2 * i[t + 1]
			  , u = 2 * i[t + 2];
			return n.moveTo(r[o], r[o + 1]),
			n.lineTo(r[a], r[a + 1]),
			n.lineTo(r[u], r[u + 1]),
			n.closePath(),
			e && e.value()
		}
		*trianglePolygons() {
			const {triangles: t} = this;
			for (let n = 0, e = t.length / 3; n < e; ++n)
				yield this.trianglePolygon(n)
		}
		trianglePolygon(t) {
			const n = new cu;
			return this.renderTriangle(t, n),
			n.value()
		}
	}
	var yu = {}
	  , vu = {};
	function _u(t) {
		return new Function("d","return {" + t.map((function(t, n) {
			return JSON.stringify(t) + ": d[" + n + '] || ""'
		}
		)).join(",") + "}")
	}
	function bu(t) {
		var n = Object.create(null)
		  , e = [];
		return t.forEach((function(t) {
			for (var r in t)
				r in n || e.push(n[r] = r)
		}
		)),
		e
	}
	function mu(t, n) {
		var e = t + ""
		  , r = e.length;
		return r < n ? new Array(n - r + 1).join(0) + e : e
	}
	function xu(t) {
		var n = t.getUTCHours()
		  , e = t.getUTCMinutes()
		  , r = t.getUTCSeconds()
		  , i = t.getUTCMilliseconds();
		return isNaN(t) ? "Invalid Date" : function(t) {
			return t < 0 ? "-" + mu(-t, 6) : t > 9999 ? "+" + mu(t, 6) : mu(t, 4)
		}(t.getUTCFullYear()) + "-" + mu(t.getUTCMonth() + 1, 2) + "-" + mu(t.getUTCDate(), 2) + (i ? "T" + mu(n, 2) + ":" + mu(e, 2) + ":" + mu(r, 2) + "." + mu(i, 3) + "Z" : r ? "T" + mu(n, 2) + ":" + mu(e, 2) + ":" + mu(r, 2) + "Z" : e || n ? "T" + mu(n, 2) + ":" + mu(e, 2) + "Z" : "")
	}
	function wu(t) {
		var n = new RegExp('["' + t + "\n\r]")
		  , e = t.charCodeAt(0);
		function r(t, n) {
			var r, i = [], o = t.length, a = 0, u = 0, c = o <= 0, f = !1;
			function s() {
				if (c)
					return vu;
				if (f)
					return f = !1,
					yu;
				var n, r, i = a;
				if (34 === t.charCodeAt(i)) {
					for (; a++ < o && 34 !== t.charCodeAt(a) || 34 === t.charCodeAt(++a); )
						;
					return (n = a) >= o ? c = !0 : 10 === (r = t.charCodeAt(a++)) ? f = !0 : 13 === r && (f = !0,
					10 === t.charCodeAt(a) && ++a),
					t.slice(i + 1, n - 1).replace(/""/g, '"')
				}
				for (; a < o; ) {
					if (10 === (r = t.charCodeAt(n = a++)))
						f = !0;
					else if (13 === r)
						f = !0,
						10 === t.charCodeAt(a) && ++a;
					else if (r !== e)
						continue;
					return t.slice(i, n)
				}
				return c = !0,
				t.slice(i, o)
			}
			for (10 === t.charCodeAt(o - 1) && --o,
			13 === t.charCodeAt(o - 1) && --o; (r = s()) !== vu; ) {
				for (var l = []; r !== yu && r !== vu; )
					l.push(r),
					r = s();
				n && null == (l = n(l, u++)) || i.push(l)
			}
			return i
		}
		function i(n, e) {
			return n.map((function(n) {
				return e.map((function(t) {
					return a(n[t])
				}
				)).join(t)
			}
			))
		}
		function o(n) {
			return n.map(a).join(t)
		}
		function a(t) {
			return null == t ? "" : t instanceof Date ? xu(t) : n.test(t += "") ? '"' + t.replace(/"/g, '""') + '"' : t
		}
		return {
			parse: function(t, n) {
				var e, i, o = r(t, (function(t, r) {
					if (e)
						return e(t, r - 1);
					i = t,
					e = n ? function(t, n) {
						var e = _u(t);
						return function(r, i) {
							return n(e(r), i, t)
						}
					}(t, n) : _u(t)
				}
				));
				return o.columns = i || [],
				o
			},
			parseRows: r,
			format: function(n, e) {
				return null == e && (e = bu(n)),
				[e.map(a).join(t)].concat(i(n, e)).join("\n")
			},
			formatBody: function(t, n) {
				return null == n && (n = bu(t)),
				i(t, n).join("\n")
			},
			formatRows: function(t) {
				return t.map(o).join("\n")
			},
			formatRow: o,
			formatValue: a
		}
	}
	var Mu = wu(",")
	  , Au = Mu.parse
	  , Tu = Mu.parseRows
	  , Su = Mu.format
	  , Eu = Mu.formatBody
	  , ku = Mu.formatRows
	  , Nu = Mu.formatRow
	  , Cu = Mu.formatValue
	  , Pu = wu("\t")
	  , zu = Pu.parse
	  , Du = Pu.parseRows
	  , Ru = Pu.format
	  , Fu = Pu.formatBody
	  , qu = Pu.formatRows
	  , Ou = Pu.formatRow
	  , Uu = Pu.formatValue;
	const Iu = new Date("2019-01-01T00:00").getHours() || new Date("2019-07-01T00:00").getHours();
	function Bu(t) {
		if (!t.ok)
			throw new Error(t.status + " " + t.statusText);
		return t.blob()
	}
	function Yu(t) {
		if (!t.ok)
			throw new Error(t.status + " " + t.statusText);
		return t.arrayBuffer()
	}
	function Lu(t) {
		if (!t.ok)
			throw new Error(t.status + " " + t.statusText);
		return t.text()
	}
	function ju(t, n) {
		return fetch(t, n).then(Lu)
	}
	function Hu(t) {
		return function(n, e, r) {
			return 2 === arguments.length && "function" == typeof e && (r = e,
			e = void 0),
			ju(n, e).then((function(n) {
				return t(n, r)
			}
			))
		}
	}
	var Xu = Hu(Au)
	  , Gu = Hu(zu);
	function Vu(t) {
		if (!t.ok)
			throw new Error(t.status + " " + t.statusText);
		if (204 !== t.status && 205 !== t.status)
			return t.json()
	}
	function $u(t) {
		return (n,e)=>ju(n, e).then((n=>(new DOMParser).parseFromString(n, t)))
	}
	var Wu = $u("application/xml")
	  , Zu = $u("text/html")
	  , Ku = $u("image/svg+xml");
	function Qu(t, n, e, r) {
		if (isNaN(n) || isNaN(e))
			return t;
		var i, o, a, u, c, f, s, l, h, d = t._root, p = {
			data: r
		}, g = t._x0, y = t._y0, v = t._x1, _ = t._y1;
		if (!d)
			return t._root = p,
			t;
		for (; d.length; )
			if ((f = n >= (o = (g + v) / 2)) ? g = o : v = o,
			(s = e >= (a = (y + _) / 2)) ? y = a : _ = a,
			i = d,
			!(d = d[l = s << 1 | f]))
				return i[l] = p,
				t;
		if (u = +t._x.call(null, d.data),
		c = +t._y.call(null, d.data),
		n === u && e === c)
			return p.next = d,
			i ? i[l] = p : t._root = p,
			t;
		do {
			i = i ? i[l] = new Array(4) : t._root = new Array(4),
			(f = n >= (o = (g + v) / 2)) ? g = o : v = o,
			(s = e >= (a = (y + _) / 2)) ? y = a : _ = a
		} while ((l = s << 1 | f) == (h = (c >= a) << 1 | u >= o));
		return i[h] = d,
		i[l] = p,
		t
	}
	function Ju(t, n, e, r, i) {
		this.node = t,
		this.x0 = n,
		this.y0 = e,
		this.x1 = r,
		this.y1 = i
	}
	function tc(t) {
		return t[0]
	}
	function nc(t) {
		return t[1]
	}
	function ec(t, n, e) {
		var r = new rc(null == n ? tc : n,null == e ? nc : e,NaN,NaN,NaN,NaN);
		return null == t ? r : r.addAll(t)
	}
	function rc(t, n, e, r, i, o) {
		this._x = t,
		this._y = n,
		this._x0 = e,
		this._y0 = r,
		this._x1 = i,
		this._y1 = o,
		this._root = void 0
	}
	function ic(t) {
		for (var n = {
			data: t.data
		}, e = n; t = t.next; )
			e = e.next = {
				data: t.data
			};
		return n
	}
	var oc = ec.prototype = rc.prototype;
	function ac(t) {
		return function() {
			return t
		}
	}
	function uc(t) {
		return 1e-6 * (t() - .5)
	}
	function cc(t) {
		return t.x + t.vx
	}
	function fc(t) {
		return t.y + t.vy
	}
	function sc(t) {
		return t.index
	}
	function lc(t, n) {
		var e = t.get(n);
		if (!e)
			throw new Error("node not found: " + n);
		return e
	}
	oc.copy = function() {
		var t, n, e = new rc(this._x,this._y,this._x0,this._y0,this._x1,this._y1), r = this._root;
		if (!r)
			return e;
		if (!r.length)
			return e._root = ic(r),
			e;
		for (t = [{
			source: r,
			target: e._root = new Array(4)
		}]; r = t.pop(); )
			for (var i = 0; i < 4; ++i)
				(n = r.source[i]) && (n.length ? t.push({
					source: n,
					target: r.target[i] = new Array(4)
				}) : r.target[i] = ic(n));
		return e
	}
	,
	oc.add = function(t) {
		const n = +this._x.call(null, t)
		  , e = +this._y.call(null, t);
		return Qu(this.cover(n, e), n, e, t)
	}
	,
	oc.addAll = function(t) {
		var n, e, r, i, o = t.length, a = new Array(o), u = new Array(o), c = 1 / 0, f = 1 / 0, s = -1 / 0, l = -1 / 0;
		for (e = 0; e < o; ++e)
			isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (a[e] = r,
			u[e] = i,
			r < c && (c = r),
			r > s && (s = r),
			i < f && (f = i),
			i > l && (l = i));
		if (c > s || f > l)
			return this;
		for (this.cover(c, f).cover(s, l),
		e = 0; e < o; ++e)
			Qu(this, a[e], u[e], t[e]);
		return this
	}
	,
	oc.cover = function(t, n) {
		if (isNaN(t = +t) || isNaN(n = +n))
			return this;
		var e = this._x0
		  , r = this._y0
		  , i = this._x1
		  , o = this._y1;
		if (isNaN(e))
			i = (e = Math.floor(t)) + 1,
			o = (r = Math.floor(n)) + 1;
		else {
			for (var a, u, c = i - e || 1, f = this._root; e > t || t >= i || r > n || n >= o; )
				switch (u = (n < r) << 1 | t < e,
				(a = new Array(4))[u] = f,
				f = a,
				c *= 2,
				u) {
				case 0:
					i = e + c,
					o = r + c;
					break;
				case 1:
					e = i - c,
					o = r + c;
					break;
				case 2:
					i = e + c,
					r = o - c;
					break;
				case 3:
					e = i - c,
					r = o - c
				}
			this._root && this._root.length && (this._root = f)
		}
		return this._x0 = e,
		this._y0 = r,
		this._x1 = i,
		this._y1 = o,
		this
	}
	,
	oc.data = function() {
		var t = [];
		return this.visit((function(n) {
			if (!n.length)
				do {
					t.push(n.data)
				} while (n = n.next)
		}
		)),
		t
	}
	,
	oc.extent = function(t) {
		return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]
	}
	,
	oc.find = function(t, n, e) {
		var r, i, o, a, u, c, f, s = this._x0, l = this._y0, h = this._x1, d = this._y1, p = [], g = this._root;
		for (g && p.push(new Ju(g,s,l,h,d)),
		null == e ? e = 1 / 0 : (s = t - e,
		l = n - e,
		h = t + e,
		d = n + e,
		e *= e); c = p.pop(); )
			if (!(!(g = c.node) || (i = c.x0) > h || (o = c.y0) > d || (a = c.x1) < s || (u = c.y1) < l))
				if (g.length) {
					var y = (i + a) / 2
					  , v = (o + u) / 2;
					p.push(new Ju(g[3],y,v,a,u), new Ju(g[2],i,v,y,u), new Ju(g[1],y,o,a,v), new Ju(g[0],i,o,y,v)),
					(f = (n >= v) << 1 | t >= y) && (c = p[p.length - 1],
					p[p.length - 1] = p[p.length - 1 - f],
					p[p.length - 1 - f] = c)
				} else {
					var _ = t - +this._x.call(null, g.data)
					  , b = n - +this._y.call(null, g.data)
					  , m = _ * _ + b * b;
					if (m < e) {
						var x = Math.sqrt(e = m);
						s = t - x,
						l = n - x,
						h = t + x,
						d = n + x,
						r = g.data
					}
				}
		return r
	}
	,
	oc.remove = function(t) {
		if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t)))
			return this;
		var n, e, r, i, o, a, u, c, f, s, l, h, d = this._root, p = this._x0, g = this._y0, y = this._x1, v = this._y1;
		if (!d)
			return this;
		if (d.length)
			for (; ; ) {
				if ((f = o >= (u = (p + y) / 2)) ? p = u : y = u,
				(s = a >= (c = (g + v) / 2)) ? g = c : v = c,
				n = d,
				!(d = d[l = s << 1 | f]))
					return this;
				if (!d.length)
					break;
				(n[l + 1 & 3] || n[l + 2 & 3] || n[l + 3 & 3]) && (e = n,
				h = l)
			}
		for (; d.data !== t; )
			if (r = d,
			!(d = d.next))
				return this;
		return (i = d.next) && delete d.next,
		r ? (i ? r.next = i : delete r.next,
		this) : n ? (i ? n[l] = i : delete n[l],
		(d = n[0] || n[1] || n[2] || n[3]) && d === (n[3] || n[2] || n[1] || n[0]) && !d.length && (e ? e[h] = d : this._root = d),
		this) : (this._root = i,
		this)
	}
	,
	oc.removeAll = function(t) {
		for (var n = 0, e = t.length; n < e; ++n)
			this.remove(t[n]);
		return this
	}
	,
	oc.root = function() {
		return this._root
	}
	,
	oc.size = function() {
		var t = 0;
		return this.visit((function(n) {
			if (!n.length)
				do {
					++t
				} while (n = n.next)
		}
		)),
		t
	}
	,
	oc.visit = function(t) {
		var n, e, r, i, o, a, u = [], c = this._root;
		for (c && u.push(new Ju(c,this._x0,this._y0,this._x1,this._y1)); n = u.pop(); )
			if (!t(c = n.node, r = n.x0, i = n.y0, o = n.x1, a = n.y1) && c.length) {
				var f = (r + o) / 2
				  , s = (i + a) / 2;
				(e = c[3]) && u.push(new Ju(e,f,s,o,a)),
				(e = c[2]) && u.push(new Ju(e,r,s,f,a)),
				(e = c[1]) && u.push(new Ju(e,f,i,o,s)),
				(e = c[0]) && u.push(new Ju(e,r,i,f,s))
			}
		return this
	}
	,
	oc.visitAfter = function(t) {
		var n, e = [], r = [];
		for (this._root && e.push(new Ju(this._root,this._x0,this._y0,this._x1,this._y1)); n = e.pop(); ) {
			var i = n.node;
			if (i.length) {
				var o, a = n.x0, u = n.y0, c = n.x1, f = n.y1, s = (a + c) / 2, l = (u + f) / 2;
				(o = i[0]) && e.push(new Ju(o,a,u,s,l)),
				(o = i[1]) && e.push(new Ju(o,s,u,c,l)),
				(o = i[2]) && e.push(new Ju(o,a,l,s,f)),
				(o = i[3]) && e.push(new Ju(o,s,l,c,f))
			}
			r.push(n)
		}
		for (; n = r.pop(); )
			t(n.node, n.x0, n.y0, n.x1, n.y1);
		return this
	}
	,
	oc.x = function(t) {
		return arguments.length ? (this._x = t,
		this) : this._x
	}
	,
	oc.y = function(t) {
		return arguments.length ? (this._y = t,
		this) : this._y
	}
	;
	const hc = 4294967296;
	function dc(t) {
		return t.x
	}
	function pc(t) {
		return t.y
	}
	var gc = Math.PI * (3 - Math.sqrt(5));
	function yc(t, n) {
		if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0)
			return null;
		var e, r = t.slice(0, e);
		return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
	}
	function vc(t) {
		return (t = yc(Math.abs(t))) ? t[1] : NaN
	}
	var _c, bc = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
	function mc(t) {
		if (!(n = bc.exec(t)))
			throw new Error("invalid format: " + t);
		var n;
		return new xc({
			fill: n[1],
			align: n[2],
			sign: n[3],
			symbol: n[4],
			zero: n[5],
			width: n[6],
			comma: n[7],
			precision: n[8] && n[8].slice(1),
			trim: n[9],
			type: n[10]
		})
	}
	function xc(t) {
		this.fill = void 0 === t.fill ? " " : t.fill + "",
		this.align = void 0 === t.align ? ">" : t.align + "",
		this.sign = void 0 === t.sign ? "-" : t.sign + "",
		this.symbol = void 0 === t.symbol ? "" : t.symbol + "",
		this.zero = !!t.zero,
		this.width = void 0 === t.width ? void 0 : +t.width,
		this.comma = !!t.comma,
		this.precision = void 0 === t.precision ? void 0 : +t.precision,
		this.trim = !!t.trim,
		this.type = void 0 === t.type ? "" : t.type + ""
	}
	function wc(t, n) {
		var e = yc(t, n);
		if (!e)
			return t + "";
		var r = e[0]
		  , i = e[1];
		return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
	}
	mc.prototype = xc.prototype,
	xc.prototype.toString = function() {
		return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
	}
	;
	var Mc = {
		"%": (t,n)=>(100 * t).toFixed(n),
		b: t=>Math.round(t).toString(2),
		c: t=>t + "",
		d: function(t) {
			return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
		},
		e: (t,n)=>t.toExponential(n),
		f: (t,n)=>t.toFixed(n),
		g: (t,n)=>t.toPrecision(n),
		o: t=>Math.round(t).toString(8),
		p: (t,n)=>wc(100 * t, n),
		r: wc,
		s: function(t, n) {
			var e = yc(t, n);
			if (!e)
				return t + "";
			var r = e[0]
			  , i = e[1]
			  , o = i - (_c = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1
			  , a = r.length;
			return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + yc(t, Math.max(0, n + o - 1))[0]
		},
		X: t=>Math.round(t).toString(16).toUpperCase(),
		x: t=>Math.round(t).toString(16)
	};
	function Ac(t) {
		return t
	}
	var Tc, Sc = Array.prototype.map, Ec = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
	function kc(t) {
		var n, e, r = void 0 === t.grouping || void 0 === t.thousands ? Ac : (n = Sc.call(t.grouping, Number),
		e = t.thousands + "",
		function(t, r) {
			for (var i = t.length, o = [], a = 0, u = n[0], c = 0; i > 0 && u > 0 && (c + u + 1 > r && (u = Math.max(1, r - c)),
			o.push(t.substring(i -= u, i + u)),
			!((c += u + 1) > r)); )
				u = n[a = (a + 1) % n.length];
			return o.reverse().join(e)
		}
		), i = void 0 === t.currency ? "" : t.currency[0] + "", o = void 0 === t.currency ? "" : t.currency[1] + "", a = void 0 === t.decimal ? "." : t.decimal + "", u = void 0 === t.numerals ? Ac : function(t) {
			return function(n) {
				return n.replace(/[0-9]/g, (function(n) {
					return t[+n]
				}
				))
			}
		}(Sc.call(t.numerals, String)), c = void 0 === t.percent ? "%" : t.percent + "", f = void 0 === t.minus ? "−" : t.minus + "", s = void 0 === t.nan ? "NaN" : t.nan + "";
		function l(t) {
			var n = (t = mc(t)).fill
			  , e = t.align
			  , l = t.sign
			  , h = t.symbol
			  , d = t.zero
			  , p = t.width
			  , g = t.comma
			  , y = t.precision
			  , v = t.trim
			  , _ = t.type;
			"n" === _ ? (g = !0,
			_ = "g") : Mc[_] || (void 0 === y && (y = 12),
			v = !0,
			_ = "g"),
			(d || "0" === n && "=" === e) && (d = !0,
			n = "0",
			e = "=");
			var b = "$" === h ? i : "#" === h && /[boxX]/.test(_) ? "0" + _.toLowerCase() : ""
			  , m = "$" === h ? o : /[%p]/.test(_) ? c : ""
			  , x = Mc[_]
			  , w = /[defgprs%]/.test(_);
			function M(t) {
				var i, o, c, h = b, M = m;
				if ("c" === _)
					M = x(t) + M,
					t = "";
				else {
					var A = (t = +t) < 0 || 1 / t < 0;
					if (t = isNaN(t) ? s : x(Math.abs(t), y),
					v && (t = function(t) {
						t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r)
							switch (t[r]) {
							case ".":
								i = n = r;
								break;
							case "0":
								0 === i && (i = r),
								n = r;
								break;
							default:
								if (!+t[r])
									break t;
								i > 0 && (i = 0)
							}
						return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t
					}(t)),
					A && 0 == +t && "+" !== l && (A = !1),
					h = (A ? "(" === l ? l : f : "-" === l || "(" === l ? "" : l) + h,
					M = ("s" === _ ? Ec[8 + _c / 3] : "") + M + (A && "(" === l ? ")" : ""),
					w)
						for (i = -1,
						o = t.length; ++i < o; )
							if (48 > (c = t.charCodeAt(i)) || c > 57) {
								M = (46 === c ? a + t.slice(i + 1) : t.slice(i)) + M,
								t = t.slice(0, i);
								break
							}
				}
				g && !d && (t = r(t, 1 / 0));
				var T = h.length + t.length + M.length
				  , S = T < p ? new Array(p - T + 1).join(n) : "";
				switch (g && d && (t = r(S + t, S.length ? p - M.length : 1 / 0),
				S = ""),
				e) {
				case "<":
					t = h + t + M + S;
					break;
				case "=":
					t = h + S + t + M;
					break;
				case "^":
					t = S.slice(0, T = S.length >> 1) + h + t + M + S.slice(T);
					break;
				default:
					t = S + h + t + M
				}
				return u(t)
			}
			return y = void 0 === y ? 6 : /[gprs]/.test(_) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y)),
			M.toString = function() {
				return t + ""
			}
			,
			M
		}
		return {
			format: l,
			formatPrefix: function(t, n) {
				var e = l(((t = mc(t)).type = "f",
				t))
				  , r = 3 * Math.max(-8, Math.min(8, Math.floor(vc(n) / 3)))
				  , i = Math.pow(10, -r)
				  , o = Ec[8 + r / 3];
				return function(t) {
					return e(i * t) + o
				}
			}
		}
	}
	function Nc(n) {
		return Tc = kc(n),
		t.format = Tc.format,
		t.formatPrefix = Tc.formatPrefix,
		Tc
	}
	function Cc(t) {
		return Math.max(0, -vc(Math.abs(t)))
	}
	function Pc(t, n) {
		return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(vc(n) / 3))) - vc(Math.abs(t)))
	}
	function zc(t, n) {
		return t = Math.abs(t),
		n = Math.abs(n) - t,
		Math.max(0, vc(n) - vc(t)) + 1
	}
	t.format = void 0,
	t.formatPrefix = void 0,
	Nc({
		thousands: ",",
		grouping: [3],
		currency: ["$", ""]
	});
	var Dc = 1e-6
	  , Rc = 1e-12
	  , Fc = Math.PI
	  , qc = Fc / 2
	  , Oc = Fc / 4
	  , Uc = 2 * Fc
	  , Ic = 180 / Fc
	  , Bc = Fc / 180
	  , Yc = Math.abs
	  , Lc = Math.atan
	  , jc = Math.atan2
	  , Hc = Math.cos
	  , Xc = Math.ceil
	  , Gc = Math.exp
	  , Vc = Math.hypot
	  , $c = Math.log
	  , Wc = Math.pow
	  , Zc = Math.sin
	  , Kc = Math.sign || function(t) {
		return t > 0 ? 1 : t < 0 ? -1 : 0
	}
	  , Qc = Math.sqrt
	  , Jc = Math.tan;
	function tf(t) {
		return t > 1 ? 0 : t < -1 ? Fc : Math.acos(t)
	}
	function nf(t) {
		return t > 1 ? qc : t < -1 ? -qc : Math.asin(t)
	}
	function ef(t) {
		return (t = Zc(t / 2)) * t
	}
	function rf() {}
	function of(t, n) {
		t && uf.hasOwnProperty(t.type) && uf[t.type](t, n)
	}
	var af = {
		Feature: function(t, n) {
			of(t.geometry, n)
		},
		FeatureCollection: function(t, n) {
			for (var e = t.features, r = -1, i = e.length; ++r < i; )
				of(e[r].geometry, n)
		}
	}
	  , uf = {
		Sphere: function(t, n) {
			n.sphere()
		},
		Point: function(t, n) {
			t = t.coordinates,
			n.point(t[0], t[1], t[2])
		},
		MultiPoint: function(t, n) {
			for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
				t = e[r],
				n.point(t[0], t[1], t[2])
		},
		LineString: function(t, n) {
			cf(t.coordinates, n, 0)
		},
		MultiLineString: function(t, n) {
			for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
				cf(e[r], n, 0)
		},
		Polygon: function(t, n) {
			ff(t.coordinates, n)
		},
		MultiPolygon: function(t, n) {
			for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
				ff(e[r], n)
		},
		GeometryCollection: function(t, n) {
			for (var e = t.geometries, r = -1, i = e.length; ++r < i; )
				of(e[r], n)
		}
	};
	function cf(t, n, e) {
		var r, i = -1, o = t.length - e;
		for (n.lineStart(); ++i < o; )
			r = t[i],
			n.point(r[0], r[1], r[2]);
		n.lineEnd()
	}
	function ff(t, n) {
		var e = -1
		  , r = t.length;
		for (n.polygonStart(); ++e < r; )
			cf(t[e], n, 1);
		n.polygonEnd()
	}
	function sf(t, n) {
		t && af.hasOwnProperty(t.type) ? af[t.type](t, n) : of(t, n)
	}
	var lf, hf, df, pf, gf, yf, vf, _f, bf, mf, xf, wf, Mf, Af, Tf, Sf, Ef = new y, kf = new y, Nf = {
		point: rf,
		lineStart: rf,
		lineEnd: rf,
		polygonStart: function() {
			Ef = new y,
			Nf.lineStart = Cf,
			Nf.lineEnd = Pf
		},
		polygonEnd: function() {
			var t = +Ef;
			kf.add(t < 0 ? Uc + t : t),
			this.lineStart = this.lineEnd = this.point = rf
		},
		sphere: function() {
			kf.add(Uc)
		}
	};
	function Cf() {
		Nf.point = zf
	}
	function Pf() {
		Df(lf, hf)
	}
	function zf(t, n) {
		Nf.point = Df,
		lf = t,
		hf = n,
		df = t *= Bc,
		pf = Hc(n = (n *= Bc) / 2 + Oc),
		gf = Zc(n)
	}
	function Df(t, n) {
		var e = (t *= Bc) - df
		  , r = e >= 0 ? 1 : -1
		  , i = r * e
		  , o = Hc(n = (n *= Bc) / 2 + Oc)
		  , a = Zc(n)
		  , u = gf * a
		  , c = pf * o + u * Hc(i)
		  , f = u * r * Zc(i);
		Ef.add(jc(f, c)),
		df = t,
		pf = o,
		gf = a
	}
	function Rf(t) {
		return [jc(t[1], t[0]), nf(t[2])]
	}
	function Ff(t) {
		var n = t[0]
		  , e = t[1]
		  , r = Hc(e);
		return [r * Hc(n), r * Zc(n), Zc(e)]
	}
	function qf(t, n) {
		return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
	}
	function Of(t, n) {
		return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
	}
	function Uf(t, n) {
		t[0] += n[0],
		t[1] += n[1],
		t[2] += n[2]
	}
	function If(t, n) {
		return [t[0] * n, t[1] * n, t[2] * n]
	}
	function Bf(t) {
		var n = Qc(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
		t[0] /= n,
		t[1] /= n,
		t[2] /= n
	}
	var Yf, Lf, jf, Hf, Xf, Gf, Vf, $f, Wf, Zf, Kf, Qf, Jf, ts, ns, es, rs = {
		point: is,
		lineStart: as,
		lineEnd: us,
		polygonStart: function() {
			rs.point = cs,
			rs.lineStart = fs,
			rs.lineEnd = ss,
			Af = new y,
			Nf.polygonStart()
		},
		polygonEnd: function() {
			Nf.polygonEnd(),
			rs.point = is,
			rs.lineStart = as,
			rs.lineEnd = us,
			Ef < 0 ? (yf = -(_f = 180),
			vf = -(bf = 90)) : Af > Dc ? bf = 90 : Af < -1e-6 && (vf = -90),
			Sf[0] = yf,
			Sf[1] = _f
		},
		sphere: function() {
			yf = -(_f = 180),
			vf = -(bf = 90)
		}
	};
	function is(t, n) {
		Tf.push(Sf = [yf = t, _f = t]),
		n < vf && (vf = n),
		n > bf && (bf = n)
	}
	function os(t, n) {
		var e = Ff([t * Bc, n * Bc]);
		if (Mf) {
			var r = Of(Mf, e)
			  , i = Of([r[1], -r[0], 0], r);
			Bf(i),
			i = Rf(i);
			var o, a = t - mf, u = a > 0 ? 1 : -1, c = i[0] * Ic * u, f = Yc(a) > 180;
			f ^ (u * mf < c && c < u * t) ? (o = i[1] * Ic) > bf && (bf = o) : f ^ (u * mf < (c = (c + 360) % 360 - 180) && c < u * t) ? (o = -i[1] * Ic) < vf && (vf = o) : (n < vf && (vf = n),
			n > bf && (bf = n)),
			f ? t < mf ? ls(yf, t) > ls(yf, _f) && (_f = t) : ls(t, _f) > ls(yf, _f) && (yf = t) : _f >= yf ? (t < yf && (yf = t),
			t > _f && (_f = t)) : t > mf ? ls(yf, t) > ls(yf, _f) && (_f = t) : ls(t, _f) > ls(yf, _f) && (yf = t)
		} else
			Tf.push(Sf = [yf = t, _f = t]);
		n < vf && (vf = n),
		n > bf && (bf = n),
		Mf = e,
		mf = t
	}
	function as() {
		rs.point = os
	}
	function us() {
		Sf[0] = yf,
		Sf[1] = _f,
		rs.point = is,
		Mf = null
	}
	function cs(t, n) {
		if (Mf) {
			var e = t - mf;
			Af.add(Yc(e) > 180 ? e + (e > 0 ? 360 : -360) : e)
		} else
			xf = t,
			wf = n;
		Nf.point(t, n),
		os(t, n)
	}
	function fs() {
		Nf.lineStart()
	}
	function ss() {
		cs(xf, wf),
		Nf.lineEnd(),
		Yc(Af) > Dc && (yf = -(_f = 180)),
		Sf[0] = yf,
		Sf[1] = _f,
		Mf = null
	}
	function ls(t, n) {
		return (n -= t) < 0 ? n + 360 : n
	}
	function hs(t, n) {
		return t[0] - n[0]
	}
	function ds(t, n) {
		return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
	}
	var ps = {
		sphere: rf,
		point: gs,
		lineStart: vs,
		lineEnd: ms,
		polygonStart: function() {
			ps.lineStart = xs,
			ps.lineEnd = ws
		},
		polygonEnd: function() {
			ps.lineStart = vs,
			ps.lineEnd = ms
		}
	};
	function gs(t, n) {
		t *= Bc;
		var e = Hc(n *= Bc);
		ys(e * Hc(t), e * Zc(t), Zc(n))
	}
	function ys(t, n, e) {
		++Yf,
		jf += (t - jf) / Yf,
		Hf += (n - Hf) / Yf,
		Xf += (e - Xf) / Yf
	}
	function vs() {
		ps.point = _s
	}
	function _s(t, n) {
		t *= Bc;
		var e = Hc(n *= Bc);
		ts = e * Hc(t),
		ns = e * Zc(t),
		es = Zc(n),
		ps.point = bs,
		ys(ts, ns, es)
	}
	function bs(t, n) {
		t *= Bc;
		var e = Hc(n *= Bc)
		  , r = e * Hc(t)
		  , i = e * Zc(t)
		  , o = Zc(n)
		  , a = jc(Qc((a = ns * o - es * i) * a + (a = es * r - ts * o) * a + (a = ts * i - ns * r) * a), ts * r + ns * i + es * o);
		Lf += a,
		Gf += a * (ts + (ts = r)),
		Vf += a * (ns + (ns = i)),
		$f += a * (es + (es = o)),
		ys(ts, ns, es)
	}
	function ms() {
		ps.point = gs
	}
	function xs() {
		ps.point = Ms
	}
	function ws() {
		As(Qf, Jf),
		ps.point = gs
	}
	function Ms(t, n) {
		Qf = t,
		Jf = n,
		t *= Bc,
		n *= Bc,
		ps.point = As;
		var e = Hc(n);
		ts = e * Hc(t),
		ns = e * Zc(t),
		es = Zc(n),
		ys(ts, ns, es)
	}
	function As(t, n) {
		t *= Bc;
		var e = Hc(n *= Bc)
		  , r = e * Hc(t)
		  , i = e * Zc(t)
		  , o = Zc(n)
		  , a = ns * o - es * i
		  , u = es * r - ts * o
		  , c = ts * i - ns * r
		  , f = Vc(a, u, c)
		  , s = nf(f)
		  , l = f && -s / f;
		Wf.add(l * a),
		Zf.add(l * u),
		Kf.add(l * c),
		Lf += s,
		Gf += s * (ts + (ts = r)),
		Vf += s * (ns + (ns = i)),
		$f += s * (es + (es = o)),
		ys(ts, ns, es)
	}
	function Ts(t) {
		return function() {
			return t
		}
	}
	function Ss(t, n) {
		function e(e, r) {
			return e = t(e, r),
			n(e[0], e[1])
		}
		return t.invert && n.invert && (e.invert = function(e, r) {
			return (e = n.invert(e, r)) && t.invert(e[0], e[1])
		}
		),
		e
	}
	function Es(t, n) {
		return [Yc(t) > Fc ? t + Math.round(-t / Uc) * Uc : t, n]
	}
	function ks(t, n, e) {
		return (t %= Uc) ? n || e ? Ss(Cs(t), Ps(n, e)) : Cs(t) : n || e ? Ps(n, e) : Es
	}
	function Ns(t) {
		return function(n, e) {
			return [(n += t) > Fc ? n - Uc : n < -Fc ? n + Uc : n, e]
		}
	}
	function Cs(t) {
		var n = Ns(t);
		return n.invert = Ns(-t),
		n
	}
	function Ps(t, n) {
		var e = Hc(t)
		  , r = Zc(t)
		  , i = Hc(n)
		  , o = Zc(n);
		function a(t, n) {
			var a = Hc(n)
			  , u = Hc(t) * a
			  , c = Zc(t) * a
			  , f = Zc(n)
			  , s = f * e + u * r;
			return [jc(c * i - s * o, u * e - f * r), nf(s * i + c * o)]
		}
		return a.invert = function(t, n) {
			var a = Hc(n)
			  , u = Hc(t) * a
			  , c = Zc(t) * a
			  , f = Zc(n)
			  , s = f * i - c * o;
			return [jc(c * i + f * o, u * e + s * r), nf(s * e - u * r)]
		}
		,
		a
	}
	function zs(t) {
		function n(n) {
			return (n = t(n[0] * Bc, n[1] * Bc))[0] *= Ic,
			n[1] *= Ic,
			n
		}
		return t = ks(t[0] * Bc, t[1] * Bc, t.length > 2 ? t[2] * Bc : 0),
		n.invert = function(n) {
			return (n = t.invert(n[0] * Bc, n[1] * Bc))[0] *= Ic,
			n[1] *= Ic,
			n
		}
		,
		n
	}
	function Ds(t, n, e, r, i, o) {
		if (e) {
			var a = Hc(n)
			  , u = Zc(n)
			  , c = r * e;
			null == i ? (i = n + r * Uc,
			o = n - c / 2) : (i = Rs(a, i),
			o = Rs(a, o),
			(r > 0 ? i < o : i > o) && (i += r * Uc));
			for (var f, s = i; r > 0 ? s > o : s < o; s -= c)
				f = Rf([a, -u * Hc(s), -u * Zc(s)]),
				t.point(f[0], f[1])
		}
	}
	function Rs(t, n) {
		(n = Ff(n))[0] -= t,
		Bf(n);
		var e = tf(-n[1]);
		return ((-n[2] < 0 ? -e : e) + Uc - Dc) % Uc
	}
	function Fs() {
		var t, n = [];
		return {
			point: function(n, e, r) {
				t.push([n, e, r])
			},
			lineStart: function() {
				n.push(t = [])
			},
			lineEnd: rf,
			rejoin: function() {
				n.length > 1 && n.push(n.pop().concat(n.shift()))
			},
			result: function() {
				var e = n;
				return n = [],
				t = null,
				e
			}
		}
	}
	function qs(t, n) {
		return Yc(t[0] - n[0]) < Dc && Yc(t[1] - n[1]) < Dc
	}
	function Os(t, n, e, r) {
		this.x = t,
		this.z = n,
		this.o = e,
		this.e = r,
		this.v = !1,
		this.n = this.p = null
	}
	function Us(t, n, e, r, i) {
		var o, a, u = [], c = [];
		if (t.forEach((function(t) {
			if (!((n = t.length - 1) <= 0)) {
				var n, e, r = t[0], a = t[n];
				if (qs(r, a)) {
					if (!r[2] && !a[2]) {
						for (i.lineStart(),
						o = 0; o < n; ++o)
							i.point((r = t[o])[0], r[1]);
						return void i.lineEnd()
					}
					a[0] += 2e-6
				}
				u.push(e = new Os(r,t,null,!0)),
				c.push(e.o = new Os(r,null,e,!1)),
				u.push(e = new Os(a,t,null,!1)),
				c.push(e.o = new Os(a,null,e,!0))
			}
		}
		)),
		u.length) {
			for (c.sort(n),
			Is(u),
			Is(c),
			o = 0,
			a = c.length; o < a; ++o)
				c[o].e = e = !e;
			for (var f, s, l = u[0]; ; ) {
				for (var h = l, d = !0; h.v; )
					if ((h = h.n) === l)
						return;
				f = h.z,
				i.lineStart();
				do {
					if (h.v = h.o.v = !0,
					h.e) {
						if (d)
							for (o = 0,
							a = f.length; o < a; ++o)
								i.point((s = f[o])[0], s[1]);
						else
							r(h.x, h.n.x, 1, i);
						h = h.n
					} else {
						if (d)
							for (f = h.p.z,
							o = f.length - 1; o >= 0; --o)
								i.point((s = f[o])[0], s[1]);
						else
							r(h.x, h.p.x, -1, i);
						h = h.p
					}
					f = (h = h.o).z,
					d = !d
				} while (!h.v);
				i.lineEnd()
			}
		}
	}
	function Is(t) {
		if (n = t.length) {
			for (var n, e, r = 0, i = t[0]; ++r < n; )
				i.n = e = t[r],
				e.p = i,
				i = e;
			i.n = e = t[0],
			e.p = i
		}
	}
	function Bs(t) {
		return Yc(t[0]) <= Fc ? t[0] : Kc(t[0]) * ((Yc(t[0]) + Fc) % Uc - Fc)
	}
	function Ys(t, n) {
		var e = Bs(n)
		  , r = n[1]
		  , i = Zc(r)
		  , o = [Zc(e), -Hc(e), 0]
		  , a = 0
		  , u = 0
		  , c = new y;
		1 === i ? r = qc + Dc : -1 === i && (r = -qc - Dc);
		for (var f = 0, s = t.length; f < s; ++f)
			if (h = (l = t[f]).length)
				for (var l, h, d = l[h - 1], p = Bs(d), g = d[1] / 2 + Oc, v = Zc(g), _ = Hc(g), b = 0; b < h; ++b,
				p = x,
				v = M,
				_ = A,
				d = m) {
					var m = l[b]
					  , x = Bs(m)
					  , w = m[1] / 2 + Oc
					  , M = Zc(w)
					  , A = Hc(w)
					  , T = x - p
					  , S = T >= 0 ? 1 : -1
					  , E = S * T
					  , k = E > Fc
					  , N = v * M;
					if (c.add(jc(N * S * Zc(E), _ * A + N * Hc(E))),
					a += k ? T + S * Uc : T,
					k ^ p >= e ^ x >= e) {
						var C = Of(Ff(d), Ff(m));
						Bf(C);
						var P = Of(o, C);
						Bf(P);
						var z = (k ^ T >= 0 ? -1 : 1) * nf(P[2]);
						(r > z || r === z && (C[0] || C[1])) && (u += k ^ T >= 0 ? 1 : -1)
					}
				}
		return (a < -1e-6 || a < Dc && c < -1e-12) ^ 1 & u
	}
	function Ls(t, n, e, r) {
		return function(i) {
			var o, a, u, c = n(i), f = Fs(), s = n(f), l = !1, h = {
				point: d,
				lineStart: g,
				lineEnd: y,
				polygonStart: function() {
					h.point = v,
					h.lineStart = _,
					h.lineEnd = b,
					a = [],
					o = []
				},
				polygonEnd: function() {
					h.point = d,
					h.lineStart = g,
					h.lineEnd = y,
					a = K(a);
					var t = Ys(o, r);
					a.length ? (l || (i.polygonStart(),
					l = !0),
					Us(a, Hs, t, e, i)) : t && (l || (i.polygonStart(),
					l = !0),
					i.lineStart(),
					e(null, null, 1, i),
					i.lineEnd()),
					l && (i.polygonEnd(),
					l = !1),
					a = o = null
				},
				sphere: function() {
					i.polygonStart(),
					i.lineStart(),
					e(null, null, 1, i),
					i.lineEnd(),
					i.polygonEnd()
				}
			};
			function d(n, e) {
				t(n, e) && i.point(n, e)
			}
			function p(t, n) {
				c.point(t, n)
			}
			function g() {
				h.point = p,
				c.lineStart()
			}
			function y() {
				h.point = d,
				c.lineEnd()
			}
			function v(t, n) {
				u.push([t, n]),
				s.point(t, n)
			}
			function _() {
				s.lineStart(),
				u = []
			}
			function b() {
				v(u[0][0], u[0][1]),
				s.lineEnd();
				var t, n, e, r, c = s.clean(), h = f.result(), d = h.length;
				if (u.pop(),
				o.push(u),
				u = null,
				d)
					if (1 & c) {
						if ((n = (e = h[0]).length - 1) > 0) {
							for (l || (i.polygonStart(),
							l = !0),
							i.lineStart(),
							t = 0; t < n; ++t)
								i.point((r = e[t])[0], r[1]);
							i.lineEnd()
						}
					} else
						d > 1 && 2 & c && h.push(h.pop().concat(h.shift())),
						a.push(h.filter(js))
			}
			return h
		}
	}
	function js(t) {
		return t.length > 1
	}
	function Hs(t, n) {
		return ((t = t.x)[0] < 0 ? t[1] - qc - Dc : qc - t[1]) - ((n = n.x)[0] < 0 ? n[1] - qc - Dc : qc - n[1])
	}
	Es.invert = Es;
	var Xs = Ls((function() {
		return !0
	}
	), (function(t) {
		var n, e = NaN, r = NaN, i = NaN;
		return {
			lineStart: function() {
				t.lineStart(),
				n = 1
			},
			point: function(o, a) {
				var u = o > 0 ? Fc : -Fc
				  , c = Yc(o - e);
				Yc(c - Fc) < Dc ? (t.point(e, r = (r + a) / 2 > 0 ? qc : -qc),
				t.point(i, r),
				t.lineEnd(),
				t.lineStart(),
				t.point(u, r),
				t.point(o, r),
				n = 0) : i !== u && c >= Fc && (Yc(e - i) < Dc && (e -= i * Dc),
				Yc(o - u) < Dc && (o -= u * Dc),
				r = function(t, n, e, r) {
					var i, o, a = Zc(t - e);
					return Yc(a) > Dc ? Lc((Zc(n) * (o = Hc(r)) * Zc(e) - Zc(r) * (i = Hc(n)) * Zc(t)) / (i * o * a)) : (n + r) / 2
				}(e, r, o, a),
				t.point(i, r),
				t.lineEnd(),
				t.lineStart(),
				t.point(u, r),
				n = 0),
				t.point(e = o, r = a),
				i = u
			},
			lineEnd: function() {
				t.lineEnd(),
				e = r = NaN
			},
			clean: function() {
				return 2 - n
			}
		}
	}
	), (function(t, n, e, r) {
		var i;
		if (null == t)
			i = e * qc,
			r.point(-Fc, i),
			r.point(0, i),
			r.point(Fc, i),
			r.point(Fc, 0),
			r.point(Fc, -i),
			r.point(0, -i),
			r.point(-Fc, -i),
			r.point(-Fc, 0),
			r.point(-Fc, i);
		else if (Yc(t[0] - n[0]) > Dc) {
			var o = t[0] < n[0] ? Fc : -Fc;
			i = e * o / 2,
			r.point(-o, i),
			r.point(0, i),
			r.point(o, i)
		} else
			r.point(n[0], n[1])
	}
	), [-Fc, -qc]);
	function Gs(t) {
		var n = Hc(t)
		  , e = 6 * Bc
		  , r = n > 0
		  , i = Yc(n) > Dc;
		function o(t, e) {
			return Hc(t) * Hc(e) > n
		}
		function a(t, e, r) {
			var i = [1, 0, 0]
			  , o = Of(Ff(t), Ff(e))
			  , a = qf(o, o)
			  , u = o[0]
			  , c = a - u * u;
			if (!c)
				return !r && t;
			var f = n * a / c
			  , s = -n * u / c
			  , l = Of(i, o)
			  , h = If(i, f);
			Uf(h, If(o, s));
			var d = l
			  , p = qf(h, d)
			  , g = qf(d, d)
			  , y = p * p - g * (qf(h, h) - 1);
			if (!(y < 0)) {
				var v = Qc(y)
				  , _ = If(d, (-p - v) / g);
				if (Uf(_, h),
				_ = Rf(_),
				!r)
					return _;
				var b, m = t[0], x = e[0], w = t[1], M = e[1];
				x < m && (b = m,
				m = x,
				x = b);
				var A = x - m
				  , T = Yc(A - Fc) < Dc;
				if (!T && M < w && (b = w,
				w = M,
				M = b),
				T || A < Dc ? T ? w + M > 0 ^ _[1] < (Yc(_[0] - m) < Dc ? w : M) : w <= _[1] && _[1] <= M : A > Fc ^ (m <= _[0] && _[0] <= x)) {
					var S = If(d, (-p + v) / g);
					return Uf(S, h),
					[_, Rf(S)]
				}
			}
		}
		function u(n, e) {
			var i = r ? t : Fc - t
			  , o = 0;
			return n < -i ? o |= 1 : n > i && (o |= 2),
			e < -i ? o |= 4 : e > i && (o |= 8),
			o
		}
		return Ls(o, (function(t) {
			var n, e, c, f, s;
			return {
				lineStart: function() {
					f = c = !1,
					s = 1
				},
				point: function(l, h) {
					var d, p = [l, h], g = o(l, h), y = r ? g ? 0 : u(l, h) : g ? u(l + (l < 0 ? Fc : -Fc), h) : 0;
					if (!n && (f = c = g) && t.lineStart(),
					g !== c && (!(d = a(n, p)) || qs(n, d) || qs(p, d)) && (p[2] = 1),
					g !== c)
						s = 0,
						g ? (t.lineStart(),
						d = a(p, n),
						t.point(d[0], d[1])) : (d = a(n, p),
						t.point(d[0], d[1], 2),
						t.lineEnd()),
						n = d;
					else if (i && n && r ^ g) {
						var v;
						y & e || !(v = a(p, n, !0)) || (s = 0,
						r ? (t.lineStart(),
						t.point(v[0][0], v[0][1]),
						t.point(v[1][0], v[1][1]),
						t.lineEnd()) : (t.point(v[1][0], v[1][1]),
						t.lineEnd(),
						t.lineStart(),
						t.point(v[0][0], v[0][1], 3)))
					}
					!g || n && qs(n, p) || t.point(p[0], p[1]),
					n = p,
					c = g,
					e = y
				},
				lineEnd: function() {
					c && t.lineEnd(),
					n = null
				},
				clean: function() {
					return s | (f && c) << 1
				}
			}
		}
		), (function(n, r, i, o) {
			Ds(o, t, e, i, n, r)
		}
		), r ? [0, -t] : [-Fc, t - Fc])
	}
	var Vs, $s, Ws, Zs, Ks = 1e9, Qs = -Ks;
	function Js(t, n, e, r) {
		function i(i, o) {
			return t <= i && i <= e && n <= o && o <= r
		}
		function o(i, o, u, f) {
			var s = 0
			  , l = 0;
			if (null == i || (s = a(i, u)) !== (l = a(o, u)) || c(i, o) < 0 ^ u > 0)
				do {
					f.point(0 === s || 3 === s ? t : e, s > 1 ? r : n)
				} while ((s = (s + u + 4) % 4) !== l);
			else
				f.point(o[0], o[1])
		}
		function a(r, i) {
			return Yc(r[0] - t) < Dc ? i > 0 ? 0 : 3 : Yc(r[0] - e) < Dc ? i > 0 ? 2 : 1 : Yc(r[1] - n) < Dc ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
		}
		function u(t, n) {
			return c(t.x, n.x)
		}
		function c(t, n) {
			var e = a(t, 1)
			  , r = a(n, 1);
			return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
		}
		return function(a) {
			var c, f, s, l, h, d, p, g, y, v, _, b = a, m = Fs(), x = {
				point: w,
				lineStart: function() {
					x.point = M,
					f && f.push(s = []);
					v = !0,
					y = !1,
					p = g = NaN
				},
				lineEnd: function() {
					c && (M(l, h),
					d && y && m.rejoin(),
					c.push(m.result()));
					x.point = w,
					y && b.lineEnd()
				},
				polygonStart: function() {
					b = m,
					c = [],
					f = [],
					_ = !0
				},
				polygonEnd: function() {
					var n = function() {
						for (var n = 0, e = 0, i = f.length; e < i; ++e)
							for (var o, a, u = f[e], c = 1, s = u.length, l = u[0], h = l[0], d = l[1]; c < s; ++c)
								o = h,
								a = d,
								h = (l = u[c])[0],
								d = l[1],
								a <= r ? d > r && (h - o) * (r - a) > (d - a) * (t - o) && ++n : d <= r && (h - o) * (r - a) < (d - a) * (t - o) && --n;
						return n
					}()
					  , e = _ && n
					  , i = (c = K(c)).length;
					(e || i) && (a.polygonStart(),
					e && (a.lineStart(),
					o(null, null, 1, a),
					a.lineEnd()),
					i && Us(c, u, n, o, a),
					a.polygonEnd());
					b = a,
					c = f = s = null
				}
			};
			function w(t, n) {
				i(t, n) && b.point(t, n)
			}
			function M(o, a) {
				var u = i(o, a);
				if (f && s.push([o, a]),
				v)
					l = o,
					h = a,
					d = u,
					v = !1,
					u && (b.lineStart(),
					b.point(o, a));
				else if (u && y)
					b.point(o, a);
				else {
					var c = [p = Math.max(Qs, Math.min(Ks, p)), g = Math.max(Qs, Math.min(Ks, g))]
					  , m = [o = Math.max(Qs, Math.min(Ks, o)), a = Math.max(Qs, Math.min(Ks, a))];
					!function(t, n, e, r, i, o) {
						var a, u = t[0], c = t[1], f = 0, s = 1, l = n[0] - u, h = n[1] - c;
						if (a = e - u,
						l || !(a > 0)) {
							if (a /= l,
							l < 0) {
								if (a < f)
									return;
								a < s && (s = a)
							} else if (l > 0) {
								if (a > s)
									return;
								a > f && (f = a)
							}
							if (a = i - u,
							l || !(a < 0)) {
								if (a /= l,
								l < 0) {
									if (a > s)
										return;
									a > f && (f = a)
								} else if (l > 0) {
									if (a < f)
										return;
									a < s && (s = a)
								}
								if (a = r - c,
								h || !(a > 0)) {
									if (a /= h,
									h < 0) {
										if (a < f)
											return;
										a < s && (s = a)
									} else if (h > 0) {
										if (a > s)
											return;
										a > f && (f = a)
									}
									if (a = o - c,
									h || !(a < 0)) {
										if (a /= h,
										h < 0) {
											if (a > s)
												return;
											a > f && (f = a)
										} else if (h > 0) {
											if (a < f)
												return;
											a < s && (s = a)
										}
										return f > 0 && (t[0] = u + f * l,
										t[1] = c + f * h),
										s < 1 && (n[0] = u + s * l,
										n[1] = c + s * h),
										!0
									}
								}
							}
						}
					}(c, m, t, n, e, r) ? u && (b.lineStart(),
					b.point(o, a),
					_ = !1) : (y || (b.lineStart(),
					b.point(c[0], c[1])),
					b.point(m[0], m[1]),
					u || b.lineEnd(),
					_ = !1)
				}
				p = o,
				g = a,
				y = u
			}
			return x
		}
	}
	var tl = {
		sphere: rf,
		point: rf,
		lineStart: function() {
			tl.point = el,
			tl.lineEnd = nl
		},
		lineEnd: rf,
		polygonStart: rf,
		polygonEnd: rf
	};
	function nl() {
		tl.point = tl.lineEnd = rf
	}
	function el(t, n) {
		$s = t *= Bc,
		Ws = Zc(n *= Bc),
		Zs = Hc(n),
		tl.point = rl
	}
	function rl(t, n) {
		t *= Bc;
		var e = Zc(n *= Bc)
		  , r = Hc(n)
		  , i = Yc(t - $s)
		  , o = Hc(i)
		  , a = r * Zc(i)
		  , u = Zs * e - Ws * r * o
		  , c = Ws * e + Zs * r * o;
		Vs.add(jc(Qc(a * a + u * u), c)),
		$s = t,
		Ws = e,
		Zs = r
	}
	function il(t) {
		return Vs = new y,
		sf(t, tl),
		+Vs
	}
	var ol = [null, null]
	  , al = {
		type: "LineString",
		coordinates: ol
	};
	function ul(t, n) {
		return ol[0] = t,
		ol[1] = n,
		il(al)
	}
	var cl = {
		Feature: function(t, n) {
			return sl(t.geometry, n)
		},
		FeatureCollection: function(t, n) {
			for (var e = t.features, r = -1, i = e.length; ++r < i; )
				if (sl(e[r].geometry, n))
					return !0;
			return !1
		}
	}
	  , fl = {
		Sphere: function() {
			return !0
		},
		Point: function(t, n) {
			return ll(t.coordinates, n)
		},
		MultiPoint: function(t, n) {
			for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
				if (ll(e[r], n))
					return !0;
			return !1
		},
		LineString: function(t, n) {
			return hl(t.coordinates, n)
		},
		MultiLineString: function(t, n) {
			for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
				if (hl(e[r], n))
					return !0;
			return !1
		},
		Polygon: function(t, n) {
			return dl(t.coordinates, n)
		},
		MultiPolygon: function(t, n) {
			for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
				if (dl(e[r], n))
					return !0;
			return !1
		},
		GeometryCollection: function(t, n) {
			for (var e = t.geometries, r = -1, i = e.length; ++r < i; )
				if (sl(e[r], n))
					return !0;
			return !1
		}
	};
	function sl(t, n) {
		return !(!t || !fl.hasOwnProperty(t.type)) && fl[t.type](t, n)
	}
	function ll(t, n) {
		return 0 === ul(t, n)
	}
	function hl(t, n) {
		for (var e, r, i, o = 0, a = t.length; o < a; o++) {
			if (0 === (r = ul(t[o], n)))
				return !0;
			if (o > 0 && (i = ul(t[o], t[o - 1])) > 0 && e <= i && r <= i && (e + r - i) * (1 - Math.pow((e - r) / i, 2)) < Rc * i)
				return !0;
			e = r
		}
		return !1
	}
	function dl(t, n) {
		return !!Ys(t.map(pl), gl(n))
	}
	function pl(t) {
		return (t = t.map(gl)).pop(),
		t
	}
	function gl(t) {
		return [t[0] * Bc, t[1] * Bc]
	}
	function yl(t, n, e) {
		var r = tt(t, n - Dc, e).concat(n);
		return function(t) {
			return r.map((function(n) {
				return [t, n]
			}
			))
		}
	}
	function vl(t, n, e) {
		var r = tt(t, n - Dc, e).concat(n);
		return function(t) {
			return r.map((function(n) {
				return [n, t]
			}
			))
		}
	}
	function _l() {
		var t, n, e, r, i, o, a, u, c, f, s, l, h = 10, d = h, p = 90, g = 360, y = 2.5;
		function v() {
			return {
				type: "MultiLineString",
				coordinates: _()
			}
		}
		function _() {
			return tt(Xc(r / p) * p, e, p).map(s).concat(tt(Xc(u / g) * g, a, g).map(l)).concat(tt(Xc(n / h) * h, t, h).filter((function(t) {
				return Yc(t % p) > Dc
			}
			)).map(c)).concat(tt(Xc(o / d) * d, i, d).filter((function(t) {
				return Yc(t % g) > Dc
			}
			)).map(f))
		}
		return v.lines = function() {
			return _().map((function(t) {
				return {
					type: "LineString",
					coordinates: t
				}
			}
			))
		}
		,
		v.outline = function() {
			return {
				type: "Polygon",
				coordinates: [s(r).concat(l(a).slice(1), s(e).reverse().slice(1), l(u).reverse().slice(1))]
			}
		}
		,
		v.extent = function(t) {
			return arguments.length ? v.extentMajor(t).extentMinor(t) : v.extentMinor()
		}
		,
		v.extentMajor = function(t) {
			return arguments.length ? (r = +t[0][0],
			e = +t[1][0],
			u = +t[0][1],
			a = +t[1][1],
			r > e && (t = r,
			r = e,
			e = t),
			u > a && (t = u,
			u = a,
			a = t),
			v.precision(y)) : [[r, u], [e, a]]
		}
		,
		v.extentMinor = function(e) {
			return arguments.length ? (n = +e[0][0],
			t = +e[1][0],
			o = +e[0][1],
			i = +e[1][1],
			n > t && (e = n,
			n = t,
			t = e),
			o > i && (e = o,
			o = i,
			i = e),
			v.precision(y)) : [[n, o], [t, i]]
		}
		,
		v.step = function(t) {
			return arguments.length ? v.stepMajor(t).stepMinor(t) : v.stepMinor()
		}
		,
		v.stepMajor = function(t) {
			return arguments.length ? (p = +t[0],
			g = +t[1],
			v) : [p, g]
		}
		,
		v.stepMinor = function(t) {
			return arguments.length ? (h = +t[0],
			d = +t[1],
			v) : [h, d]
		}
		,
		v.precision = function(h) {
			return arguments.length ? (y = +h,
			c = yl(o, i, 90),
			f = vl(n, t, y),
			s = yl(u, a, 90),
			l = vl(r, e, y),
			v) : y
		}
		,
		v.extentMajor([[-180, -89.999999], [180, 89.999999]]).extentMinor([[-180, -80.000001], [180, 80.000001]])
	}
	var bl, ml, xl, wl, Ml = t=>t, Al = new y, Tl = new y, Sl = {
		point: rf,
		lineStart: rf,
		lineEnd: rf,
		polygonStart: function() {
			Sl.lineStart = El,
			Sl.lineEnd = Cl
		},
		polygonEnd: function() {
			Sl.lineStart = Sl.lineEnd = Sl.point = rf,
			Al.add(Yc(Tl)),
			Tl = new y
		},
		result: function() {
			var t = Al / 2;
			return Al = new y,
			t
		}
	};
	function El() {
		Sl.point = kl
	}
	function kl(t, n) {
		Sl.point = Nl,
		bl = xl = t,
		ml = wl = n
	}
	function Nl(t, n) {
		Tl.add(wl * t - xl * n),
		xl = t,
		wl = n
	}
	function Cl() {
		Nl(bl, ml)
	}
	var Pl = Sl
	  , zl = 1 / 0
	  , Dl = zl
	  , Rl = -zl
	  , Fl = Rl
	  , ql = {
		point: function(t, n) {
			t < zl && (zl = t);
			t > Rl && (Rl = t);
			n < Dl && (Dl = n);
			n > Fl && (Fl = n)
		},
		lineStart: rf,
		lineEnd: rf,
		polygonStart: rf,
		polygonEnd: rf,
		result: function() {
			var t = [[zl, Dl], [Rl, Fl]];
			return Rl = Fl = -(Dl = zl = 1 / 0),
			t
		}
	};
	var Ol, Ul, Il, Bl, Yl = ql, Ll = 0, jl = 0, Hl = 0, Xl = 0, Gl = 0, Vl = 0, $l = 0, Wl = 0, Zl = 0, Kl = {
		point: Ql,
		lineStart: Jl,
		lineEnd: eh,
		polygonStart: function() {
			Kl.lineStart = rh,
			Kl.lineEnd = ih
		},
		polygonEnd: function() {
			Kl.point = Ql,
			Kl.lineStart = Jl,
			Kl.lineEnd = eh
		},
		result: function() {
			var t = Zl ? [$l / Zl, Wl / Zl] : Vl ? [Xl / Vl, Gl / Vl] : Hl ? [Ll / Hl, jl / Hl] : [NaN, NaN];
			return Ll = jl = Hl = Xl = Gl = Vl = $l = Wl = Zl = 0,
			t
		}
	};
	function Ql(t, n) {
		Ll += t,
		jl += n,
		++Hl
	}
	function Jl() {
		Kl.point = th
	}
	function th(t, n) {
		Kl.point = nh,
		Ql(Il = t, Bl = n)
	}
	function nh(t, n) {
		var e = t - Il
		  , r = n - Bl
		  , i = Qc(e * e + r * r);
		Xl += i * (Il + t) / 2,
		Gl += i * (Bl + n) / 2,
		Vl += i,
		Ql(Il = t, Bl = n)
	}
	function eh() {
		Kl.point = Ql
	}
	function rh() {
		Kl.point = oh
	}
	function ih() {
		ah(Ol, Ul)
	}
	function oh(t, n) {
		Kl.point = ah,
		Ql(Ol = Il = t, Ul = Bl = n)
	}
	function ah(t, n) {
		var e = t - Il
		  , r = n - Bl
		  , i = Qc(e * e + r * r);
		Xl += i * (Il + t) / 2,
		Gl += i * (Bl + n) / 2,
		Vl += i,
		$l += (i = Bl * t - Il * n) * (Il + t),
		Wl += i * (Bl + n),
		Zl += 3 * i,
		Ql(Il = t, Bl = n)
	}
	var uh = Kl;
	function ch(t) {
		this._context = t
	}
	ch.prototype = {
		_radius: 4.5,
		pointRadius: function(t) {
			return this._radius = t,
			this
		},
		polygonStart: function() {
			this._line = 0
		},
		polygonEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			0 === this._line && this._context.closePath(),
			this._point = NaN
		},
		point: function(t, n) {
			switch (this._point) {
			case 0:
				this._context.moveTo(t, n),
				this._point = 1;
				break;
			case 1:
				this._context.lineTo(t, n);
				break;
			default:
				this._context.moveTo(t + this._radius, n),
				this._context.arc(t, n, this._radius, 0, Uc)
			}
		},
		result: rf
	};
	var fh, sh, lh, hh, dh, ph = new y, gh = {
		point: rf,
		lineStart: function() {
			gh.point = yh
		},
		lineEnd: function() {
			fh && vh(sh, lh),
			gh.point = rf
		},
		polygonStart: function() {
			fh = !0
		},
		polygonEnd: function() {
			fh = null
		},
		result: function() {
			var t = +ph;
			return ph = new y,
			t
		}
	};
	function yh(t, n) {
		gh.point = vh,
		sh = hh = t,
		lh = dh = n
	}
	function vh(t, n) {
		hh -= t,
		dh -= n,
		ph.add(Qc(hh * hh + dh * dh)),
		hh = t,
		dh = n
	}
	var _h = gh;
	function bh() {
		this._string = []
	}
	function mh(t) {
		return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
	}
	function xh(t) {
		return function(n) {
			var e = new wh;
			for (var r in t)
				e[r] = t[r];
			return e.stream = n,
			e
		}
	}
	function wh() {}
	function Mh(t, n, e) {
		var r = t.clipExtent && t.clipExtent();
		return t.scale(150).translate([0, 0]),
		null != r && t.clipExtent(null),
		sf(e, t.stream(Yl)),
		n(Yl.result()),
		null != r && t.clipExtent(r),
		t
	}
	function Ah(t, n, e) {
		return Mh(t, (function(e) {
			var r = n[1][0] - n[0][0]
			  , i = n[1][1] - n[0][1]
			  , o = Math.min(r / (e[1][0] - e[0][0]), i / (e[1][1] - e[0][1]))
			  , a = +n[0][0] + (r - o * (e[1][0] + e[0][0])) / 2
			  , u = +n[0][1] + (i - o * (e[1][1] + e[0][1])) / 2;
			t.scale(150 * o).translate([a, u])
		}
		), e)
	}
	function Th(t, n, e) {
		return Ah(t, [[0, 0], n], e)
	}
	function Sh(t, n, e) {
		return Mh(t, (function(e) {
			var r = +n
			  , i = r / (e[1][0] - e[0][0])
			  , o = (r - i * (e[1][0] + e[0][0])) / 2
			  , a = -i * e[0][1];
			t.scale(150 * i).translate([o, a])
		}
		), e)
	}
	function Eh(t, n, e) {
		return Mh(t, (function(e) {
			var r = +n
			  , i = r / (e[1][1] - e[0][1])
			  , o = -i * e[0][0]
			  , a = (r - i * (e[1][1] + e[0][1])) / 2;
			t.scale(150 * i).translate([o, a])
		}
		), e)
	}
	bh.prototype = {
		_radius: 4.5,
		_circle: mh(4.5),
		pointRadius: function(t) {
			return (t = +t) !== this._radius && (this._radius = t,
			this._circle = null),
			this
		},
		polygonStart: function() {
			this._line = 0
		},
		polygonEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			0 === this._line && this._string.push("Z"),
			this._point = NaN
		},
		point: function(t, n) {
			switch (this._point) {
			case 0:
				this._string.push("M", t, ",", n),
				this._point = 1;
				break;
			case 1:
				this._string.push("L", t, ",", n);
				break;
			default:
				null == this._circle && (this._circle = mh(this._radius)),
				this._string.push("M", t, ",", n, this._circle)
			}
		},
		result: function() {
			if (this._string.length) {
				var t = this._string.join("");
				return this._string = [],
				t
			}
			return null
		}
	},
	wh.prototype = {
		constructor: wh,
		point: function(t, n) {
			this.stream.point(t, n)
		},
		sphere: function() {
			this.stream.sphere()
		},
		lineStart: function() {
			this.stream.lineStart()
		},
		lineEnd: function() {
			this.stream.lineEnd()
		},
		polygonStart: function() {
			this.stream.polygonStart()
		},
		polygonEnd: function() {
			this.stream.polygonEnd()
		}
	};
	var kh = Hc(30 * Bc);
	function Nh(t, n) {
		return +n ? function(t, n) {
			function e(r, i, o, a, u, c, f, s, l, h, d, p, g, y) {
				var v = f - r
				  , _ = s - i
				  , b = v * v + _ * _;
				if (b > 4 * n && g--) {
					var m = a + h
					  , x = u + d
					  , w = c + p
					  , M = Qc(m * m + x * x + w * w)
					  , A = nf(w /= M)
					  , T = Yc(Yc(w) - 1) < Dc || Yc(o - l) < Dc ? (o + l) / 2 : jc(x, m)
					  , S = t(T, A)
					  , E = S[0]
					  , k = S[1]
					  , N = E - r
					  , C = k - i
					  , P = _ * N - v * C;
					(P * P / b > n || Yc((v * N + _ * C) / b - .5) > .3 || a * h + u * d + c * p < kh) && (e(r, i, o, a, u, c, E, k, T, m /= M, x /= M, w, g, y),
					y.point(E, k),
					e(E, k, T, m, x, w, f, s, l, h, d, p, g, y))
				}
			}
			return function(n) {
				var r, i, o, a, u, c, f, s, l, h, d, p, g = {
					point: y,
					lineStart: v,
					lineEnd: b,
					polygonStart: function() {
						n.polygonStart(),
						g.lineStart = m
					},
					polygonEnd: function() {
						n.polygonEnd(),
						g.lineStart = v
					}
				};
				function y(e, r) {
					e = t(e, r),
					n.point(e[0], e[1])
				}
				function v() {
					s = NaN,
					g.point = _,
					n.lineStart()
				}
				function _(r, i) {
					var o = Ff([r, i])
					  , a = t(r, i);
					e(s, l, f, h, d, p, s = a[0], l = a[1], f = r, h = o[0], d = o[1], p = o[2], 16, n),
					n.point(s, l)
				}
				function b() {
					g.point = y,
					n.lineEnd()
				}
				function m() {
					v(),
					g.point = x,
					g.lineEnd = w
				}
				function x(t, n) {
					_(r = t, n),
					i = s,
					o = l,
					a = h,
					u = d,
					c = p,
					g.point = _
				}
				function w() {
					e(s, l, f, h, d, p, i, o, r, a, u, c, 16, n),
					g.lineEnd = b,
					b()
				}
				return g
			}
		}(t, n) : function(t) {
			return xh({
				point: function(n, e) {
					n = t(n, e),
					this.stream.point(n[0], n[1])
				}
			})
		}(t)
	}
	var Ch = xh({
		point: function(t, n) {
			this.stream.point(t * Bc, n * Bc)
		}
	});
	function Ph(t, n, e, r, i, o) {
		if (!o)
			return function(t, n, e, r, i) {
				function o(o, a) {
					return [n + t * (o *= r), e - t * (a *= i)]
				}
				return o.invert = function(o, a) {
					return [(o - n) / t * r, (e - a) / t * i]
				}
				,
				o
			}(t, n, e, r, i);
		var a = Hc(o)
		  , u = Zc(o)
		  , c = a * t
		  , f = u * t
		  , s = a / t
		  , l = u / t
		  , h = (u * e - a * n) / t
		  , d = (u * n + a * e) / t;
		function p(t, o) {
			return [c * (t *= r) - f * (o *= i) + n, e - f * t - c * o]
		}
		return p.invert = function(t, n) {
			return [r * (s * t - l * n + h), i * (d - l * t - s * n)]
		}
		,
		p
	}
	function zh(t) {
		return Dh((function() {
			return t
		}
		))()
	}
	function Dh(t) {
		var n, e, r, i, o, a, u, c, f, s, l = 150, h = 480, d = 250, p = 0, g = 0, y = 0, v = 0, _ = 0, b = 0, m = 1, x = 1, w = null, M = Xs, A = null, T = Ml, S = .5;
		function E(t) {
			return c(t[0] * Bc, t[1] * Bc)
		}
		function k(t) {
			return (t = c.invert(t[0], t[1])) && [t[0] * Ic, t[1] * Ic]
		}
		function N() {
			var t = Ph(l, 0, 0, m, x, b).apply(null, n(p, g))
			  , r = Ph(l, h - t[0], d - t[1], m, x, b);
			return e = ks(y, v, _),
			u = Ss(n, r),
			c = Ss(e, u),
			a = Nh(u, S),
			C()
		}
		function C() {
			return f = s = null,
			E
		}
		return E.stream = function(t) {
			return f && s === t ? f : f = Ch(function(t) {
				return xh({
					point: function(n, e) {
						var r = t(n, e);
						return this.stream.point(r[0], r[1])
					}
				})
			}(e)(M(a(T(s = t)))))
		}
		,
		E.preclip = function(t) {
			return arguments.length ? (M = t,
			w = void 0,
			C()) : M
		}
		,
		E.postclip = function(t) {
			return arguments.length ? (T = t,
			A = r = i = o = null,
			C()) : T
		}
		,
		E.clipAngle = function(t) {
			return arguments.length ? (M = +t ? Gs(w = t * Bc) : (w = null,
			Xs),
			C()) : w * Ic
		}
		,
		E.clipExtent = function(t) {
			return arguments.length ? (T = null == t ? (A = r = i = o = null,
			Ml) : Js(A = +t[0][0], r = +t[0][1], i = +t[1][0], o = +t[1][1]),
			C()) : null == A ? null : [[A, r], [i, o]]
		}
		,
		E.scale = function(t) {
			return arguments.length ? (l = +t,
			N()) : l
		}
		,
		E.translate = function(t) {
			return arguments.length ? (h = +t[0],
			d = +t[1],
			N()) : [h, d]
		}
		,
		E.center = function(t) {
			return arguments.length ? (p = t[0] % 360 * Bc,
			g = t[1] % 360 * Bc,
			N()) : [p * Ic, g * Ic]
		}
		,
		E.rotate = function(t) {
			return arguments.length ? (y = t[0] % 360 * Bc,
			v = t[1] % 360 * Bc,
			_ = t.length > 2 ? t[2] % 360 * Bc : 0,
			N()) : [y * Ic, v * Ic, _ * Ic]
		}
		,
		E.angle = function(t) {
			return arguments.length ? (b = t % 360 * Bc,
			N()) : b * Ic
		}
		,
		E.reflectX = function(t) {
			return arguments.length ? (m = t ? -1 : 1,
			N()) : m < 0
		}
		,
		E.reflectY = function(t) {
			return arguments.length ? (x = t ? -1 : 1,
			N()) : x < 0
		}
		,
		E.precision = function(t) {
			return arguments.length ? (a = Nh(u, S = t * t),
			C()) : Qc(S)
		}
		,
		E.fitExtent = function(t, n) {
			return Ah(E, t, n)
		}
		,
		E.fitSize = function(t, n) {
			return Th(E, t, n)
		}
		,
		E.fitWidth = function(t, n) {
			return Sh(E, t, n)
		}
		,
		E.fitHeight = function(t, n) {
			return Eh(E, t, n)
		}
		,
		function() {
			return n = t.apply(this, arguments),
			E.invert = n.invert && k,
			N()
		}
	}
	function Rh(t) {
		var n = 0
		  , e = Fc / 3
		  , r = Dh(t)
		  , i = r(n, e);
		return i.parallels = function(t) {
			return arguments.length ? r(n = t[0] * Bc, e = t[1] * Bc) : [n * Ic, e * Ic]
		}
		,
		i
	}
	function Fh(t, n) {
		var e = Zc(t)
		  , r = (e + Zc(n)) / 2;
		if (Yc(r) < Dc)
			return function(t) {
				var n = Hc(t);
				function e(t, e) {
					return [t * n, Zc(e) / n]
				}
				return e.invert = function(t, e) {
					return [t / n, nf(e * n)]
				}
				,
				e
			}(t);
		var i = 1 + e * (2 * r - e)
		  , o = Qc(i) / r;
		function a(t, n) {
			var e = Qc(i - 2 * r * Zc(n)) / r;
			return [e * Zc(t *= r), o - e * Hc(t)]
		}
		return a.invert = function(t, n) {
			var e = o - n
			  , a = jc(t, Yc(e)) * Kc(e);
			return e * r < 0 && (a -= Fc * Kc(t) * Kc(e)),
			[a / r, nf((i - (t * t + e * e) * r * r) / (2 * r))]
		}
		,
		a
	}
	function qh() {
		return Rh(Fh).scale(155.424).center([0, 33.6442])
	}
	function Oh() {
		return qh().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7])
	}
	function Uh(t) {
		return function(n, e) {
			var r = Hc(n)
			  , i = Hc(e)
			  , o = t(r * i);
			return o === 1 / 0 ? [2, 0] : [o * i * Zc(n), o * Zc(e)]
		}
	}
	function Ih(t) {
		return function(n, e) {
			var r = Qc(n * n + e * e)
			  , i = t(r)
			  , o = Zc(i)
			  , a = Hc(i);
			return [jc(n * o, r * a), nf(r && e * o / r)]
		}
	}
	var Bh = Uh((function(t) {
		return Qc(2 / (1 + t))
	}
	));
	Bh.invert = Ih((function(t) {
		return 2 * nf(t / 2)
	}
	));
	var Yh = Uh((function(t) {
		return (t = tf(t)) && t / Zc(t)
	}
	));
	function Lh(t, n) {
		return [t, $c(Jc((qc + n) / 2))]
	}
	function jh(t) {
		var n, e, r, i = zh(t), o = i.center, a = i.scale, u = i.translate, c = i.clipExtent, f = null;
		function s() {
			var o = Fc * a()
			  , u = i(zs(i.rotate()).invert([0, 0]));
			return c(null == f ? [[u[0] - o, u[1] - o], [u[0] + o, u[1] + o]] : t === Lh ? [[Math.max(u[0] - o, f), n], [Math.min(u[0] + o, e), r]] : [[f, Math.max(u[1] - o, n)], [e, Math.min(u[1] + o, r)]])
		}
		return i.scale = function(t) {
			return arguments.length ? (a(t),
			s()) : a()
		}
		,
		i.translate = function(t) {
			return arguments.length ? (u(t),
			s()) : u()
		}
		,
		i.center = function(t) {
			return arguments.length ? (o(t),
			s()) : o()
		}
		,
		i.clipExtent = function(t) {
			return arguments.length ? (null == t ? f = n = e = r = null : (f = +t[0][0],
			n = +t[0][1],
			e = +t[1][0],
			r = +t[1][1]),
			s()) : null == f ? null : [[f, n], [e, r]]
		}
		,
		s()
	}
	function Hh(t) {
		return Jc((qc + t) / 2)
	}
	function Xh(t, n) {
		var e = Hc(t)
		  , r = t === n ? Zc(t) : $c(e / Hc(n)) / $c(Hh(n) / Hh(t))
		  , i = e * Wc(Hh(t), r) / r;
		if (!r)
			return Lh;
		function o(t, n) {
			i > 0 ? n < -qc + Dc && (n = -qc + Dc) : n > qc - Dc && (n = qc - Dc);
			var e = i / Wc(Hh(n), r);
			return [e * Zc(r * t), i - e * Hc(r * t)]
		}
		return o.invert = function(t, n) {
			var e = i - n
			  , o = Kc(r) * Qc(t * t + e * e)
			  , a = jc(t, Yc(e)) * Kc(e);
			return e * r < 0 && (a -= Fc * Kc(t) * Kc(e)),
			[a / r, 2 * Lc(Wc(i / o, 1 / r)) - qc]
		}
		,
		o
	}
	function Gh(t, n) {
		return [t, n]
	}
	function Vh(t, n) {
		var e = Hc(t)
		  , r = t === n ? Zc(t) : (e - Hc(n)) / (n - t)
		  , i = e / r + t;
		if (Yc(r) < Dc)
			return Gh;
		function o(t, n) {
			var e = i - n
			  , o = r * t;
			return [e * Zc(o), i - e * Hc(o)]
		}
		return o.invert = function(t, n) {
			var e = i - n
			  , o = jc(t, Yc(e)) * Kc(e);
			return e * r < 0 && (o -= Fc * Kc(t) * Kc(e)),
			[o / r, i - Kc(r) * Qc(t * t + e * e)]
		}
		,
		o
	}
	Yh.invert = Ih((function(t) {
		return t
	}
	)),
	Lh.invert = function(t, n) {
		return [t, 2 * Lc(Gc(n)) - qc]
	}
	,
	Gh.invert = Gh;
	var $h = 1.340264
	  , Wh = -.081106
	  , Zh = 893e-6
	  , Kh = .003796
	  , Qh = Qc(3) / 2;
	function Jh(t, n) {
		var e = nf(Qh * Zc(n))
		  , r = e * e
		  , i = r * r * r;
		return [t * Hc(e) / (Qh * ($h + 3 * Wh * r + i * (7 * Zh + 9 * Kh * r))), e * ($h + Wh * r + i * (Zh + Kh * r))]
	}
	function td(t, n) {
		var e = Hc(n)
		  , r = Hc(t) * e;
		return [e * Zc(t) / r, Zc(n) / r]
	}
	function nd(t, n) {
		var e = n * n
		  , r = e * e;
		return [t * (.8707 - .131979 * e + r * (r * (.003971 * e - .001529 * r) - .013791)), n * (1.007226 + e * (.015085 + r * (.028874 * e - .044475 - .005916 * r)))]
	}
	function ed(t, n) {
		return [Hc(n) * Zc(t), Zc(n)]
	}
	function rd(t, n) {
		var e = Hc(n)
		  , r = 1 + Hc(t) * e;
		return [e * Zc(t) / r, Zc(n) / r]
	}
	function id(t, n) {
		return [$c(Jc((qc + n) / 2)), -t]
	}
	function od(t, n) {
		return t.parent === n.parent ? 1 : 2
	}
	function ad(t, n) {
		return t + n.x
	}
	function ud(t, n) {
		return Math.max(t, n.y)
	}
	function cd(t) {
		var n = 0
		  , e = t.children
		  , r = e && e.length;
		if (r)
			for (; --r >= 0; )
				n += e[r].value;
		else
			n = 1;
		t.value = n
	}
	function fd(t, n) {
		t instanceof Map ? (t = [void 0, t],
		void 0 === n && (n = ld)) : void 0 === n && (n = sd);
		for (var e, r, i, o, a, u = new pd(t), c = [u]; e = c.pop(); )
			if ((i = n(e.data)) && (a = (i = Array.from(i)).length))
				for (e.children = i,
				o = a - 1; o >= 0; --o)
					c.push(r = i[o] = new pd(i[o])),
					r.parent = e,
					r.depth = e.depth + 1;
		return u.eachBefore(dd)
	}
	function sd(t) {
		return t.children
	}
	function ld(t) {
		return Array.isArray(t) ? t[1] : null
	}
	function hd(t) {
		void 0 !== t.data.value && (t.value = t.data.value),
		t.data = t.data.data
	}
	function dd(t) {
		var n = 0;
		do {
			t.height = n
		} while ((t = t.parent) && t.height < ++n)
	}
	function pd(t) {
		this.data = t,
		this.depth = this.height = 0,
		this.parent = null
	}
	function gd(t) {
		for (var n, e, r = 0, i = (t = function(t) {
			for (var n, e, r = t.length; r; )
				e = Math.random() * r-- | 0,
				n = t[r],
				t[r] = t[e],
				t[e] = n;
			return t
		}(Array.from(t))).length, o = []; r < i; )
			n = t[r],
			e && _d(e, n) ? ++r : (e = md(o = yd(o, n)),
			r = 0);
		return e
	}
	function yd(t, n) {
		var e, r;
		if (bd(n, t))
			return [n];
		for (e = 0; e < t.length; ++e)
			if (vd(n, t[e]) && bd(xd(t[e], n), t))
				return [t[e], n];
		for (e = 0; e < t.length - 1; ++e)
			for (r = e + 1; r < t.length; ++r)
				if (vd(xd(t[e], t[r]), n) && vd(xd(t[e], n), t[r]) && vd(xd(t[r], n), t[e]) && bd(wd(t[e], t[r], n), t))
					return [t[e], t[r], n];
		throw new Error
	}
	function vd(t, n) {
		var e = t.r - n.r
		  , r = n.x - t.x
		  , i = n.y - t.y;
		return e < 0 || e * e < r * r + i * i
	}
	function _d(t, n) {
		var e = t.r - n.r + 1e-9 * Math.max(t.r, n.r, 1)
		  , r = n.x - t.x
		  , i = n.y - t.y;
		return e > 0 && e * e > r * r + i * i
	}
	function bd(t, n) {
		for (var e = 0; e < n.length; ++e)
			if (!_d(t, n[e]))
				return !1;
		return !0
	}
	function md(t) {
		switch (t.length) {
		case 1:
			return function(t) {
				return {
					x: t.x,
					y: t.y,
					r: t.r
				}
			}(t[0]);
		case 2:
			return xd(t[0], t[1]);
		case 3:
			return wd(t[0], t[1], t[2])
		}
	}
	function xd(t, n) {
		var e = t.x
		  , r = t.y
		  , i = t.r
		  , o = n.x
		  , a = n.y
		  , u = n.r
		  , c = o - e
		  , f = a - r
		  , s = u - i
		  , l = Math.sqrt(c * c + f * f);
		return {
			x: (e + o + c / l * s) / 2,
			y: (r + a + f / l * s) / 2,
			r: (l + i + u) / 2
		}
	}
	function wd(t, n, e) {
		var r = t.x
		  , i = t.y
		  , o = t.r
		  , a = n.x
		  , u = n.y
		  , c = n.r
		  , f = e.x
		  , s = e.y
		  , l = e.r
		  , h = r - a
		  , d = r - f
		  , p = i - u
		  , g = i - s
		  , y = c - o
		  , v = l - o
		  , _ = r * r + i * i - o * o
		  , b = _ - a * a - u * u + c * c
		  , m = _ - f * f - s * s + l * l
		  , x = d * p - h * g
		  , w = (p * m - g * b) / (2 * x) - r
		  , M = (g * y - p * v) / x
		  , A = (d * b - h * m) / (2 * x) - i
		  , T = (h * v - d * y) / x
		  , S = M * M + T * T - 1
		  , E = 2 * (o + w * M + A * T)
		  , k = w * w + A * A - o * o
		  , N = -(S ? (E + Math.sqrt(E * E - 4 * S * k)) / (2 * S) : k / E);
		return {
			x: r + w + M * N,
			y: i + A + T * N,
			r: N
		}
	}
	function Md(t, n, e) {
		var r, i, o, a, u = t.x - n.x, c = t.y - n.y, f = u * u + c * c;
		f ? (i = n.r + e.r,
		i *= i,
		a = t.r + e.r,
		i > (a *= a) ? (r = (f + a - i) / (2 * f),
		o = Math.sqrt(Math.max(0, a / f - r * r)),
		e.x = t.x - r * u - o * c,
		e.y = t.y - r * c + o * u) : (r = (f + i - a) / (2 * f),
		o = Math.sqrt(Math.max(0, i / f - r * r)),
		e.x = n.x + r * u - o * c,
		e.y = n.y + r * c + o * u)) : (e.x = n.x + e.r,
		e.y = n.y)
	}
	function Ad(t, n) {
		var e = t.r + n.r - 1e-6
		  , r = n.x - t.x
		  , i = n.y - t.y;
		return e > 0 && e * e > r * r + i * i
	}
	function Td(t) {
		var n = t._
		  , e = t.next._
		  , r = n.r + e.r
		  , i = (n.x * e.r + e.x * n.r) / r
		  , o = (n.y * e.r + e.y * n.r) / r;
		return i * i + o * o
	}
	function Sd(t) {
		this._ = t,
		this.next = null,
		this.previous = null
	}
	function Ed(t) {
		if (!(i = (t = function(t) {
			return "object" == typeof t && "length"in t ? t : Array.from(t)
		}(t)).length))
			return 0;
		var n, e, r, i, o, a, u, c, f, s, l;
		if ((n = t[0]).x = 0,
		n.y = 0,
		!(i > 1))
			return n.r;
		if (e = t[1],
		n.x = -e.r,
		e.x = n.r,
		e.y = 0,
		!(i > 2))
			return n.r + e.r;
		Md(e, n, r = t[2]),
		n = new Sd(n),
		e = new Sd(e),
		r = new Sd(r),
		n.next = r.previous = e,
		e.next = n.previous = r,
		r.next = e.previous = n;
		t: for (u = 3; u < i; ++u) {
			Md(n._, e._, r = t[u]),
			r = new Sd(r),
			c = e.next,
			f = n.previous,
			s = e._.r,
			l = n._.r;
			do {
				if (s <= l) {
					if (Ad(c._, r._)) {
						e = c,
						n.next = e,
						e.previous = n,
						--u;
						continue t
					}
					s += c._.r,
					c = c.next
				} else {
					if (Ad(f._, r._)) {
						(n = f).next = e,
						e.previous = n,
						--u;
						continue t
					}
					l += f._.r,
					f = f.previous
				}
			} while (c !== f.next);
			for (r.previous = n,
			r.next = e,
			n.next = e.previous = e = r,
			o = Td(n); (r = r.next) !== e; )
				(a = Td(r)) < o && (n = r,
				o = a);
			e = n.next
		}
		for (n = [e._],
		r = e; (r = r.next) !== e; )
			n.push(r._);
		for (r = gd(n),
		u = 0; u < i; ++u)
			(n = t[u]).x -= r.x,
			n.y -= r.y;
		return r.r
	}
	function kd(t) {
		return null == t ? null : Nd(t)
	}
	function Nd(t) {
		if ("function" != typeof t)
			throw new Error;
		return t
	}
	function Cd() {
		return 0
	}
	function Pd(t) {
		return function() {
			return t
		}
	}
	function zd(t) {
		return Math.sqrt(t.value)
	}
	function Dd(t) {
		return function(n) {
			n.children || (n.r = Math.max(0, +t(n) || 0))
		}
	}
	function Rd(t, n) {
		return function(e) {
			if (r = e.children) {
				var r, i, o, a = r.length, u = t(e) * n || 0;
				if (u)
					for (i = 0; i < a; ++i)
						r[i].r += u;
				if (o = Ed(r),
				u)
					for (i = 0; i < a; ++i)
						r[i].r -= u;
				e.r = o + u
			}
		}
	}
	function Fd(t) {
		return function(n) {
			var e = n.parent;
			n.r *= t,
			e && (n.x = e.x + t * n.x,
			n.y = e.y + t * n.y)
		}
	}
	function qd(t) {
		t.x0 = Math.round(t.x0),
		t.y0 = Math.round(t.y0),
		t.x1 = Math.round(t.x1),
		t.y1 = Math.round(t.y1)
	}
	function Od(t, n, e, r, i) {
		for (var o, a = t.children, u = -1, c = a.length, f = t.value && (r - n) / t.value; ++u < c; )
			(o = a[u]).y0 = e,
			o.y1 = i,
			o.x0 = n,
			o.x1 = n += o.value * f
	}
	Jh.invert = function(t, n) {
		for (var e, r = n, i = r * r, o = i * i * i, a = 0; a < 12 && (o = (i = (r -= e = (r * ($h + Wh * i + o * (Zh + Kh * i)) - n) / ($h + 3 * Wh * i + o * (7 * Zh + 9 * Kh * i))) * r) * i * i,
		!(Yc(e) < Rc)); ++a)
			;
		return [Qh * t * ($h + 3 * Wh * i + o * (7 * Zh + 9 * Kh * i)) / Hc(r), nf(Zc(r) / Qh)]
	}
	,
	td.invert = Ih(Lc),
	nd.invert = function(t, n) {
		var e, r = n, i = 25;
		do {
			var o = r * r
			  , a = o * o;
			r -= e = (r * (1.007226 + o * (.015085 + a * (.028874 * o - .044475 - .005916 * a))) - n) / (1.007226 + o * (.045255 + a * (.259866 * o - .311325 - .005916 * 11 * a)))
		} while (Yc(e) > Dc && --i > 0);
		return [t / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 * o) - .013791) - .131979)), r]
	}
	,
	ed.invert = Ih(nf),
	rd.invert = Ih((function(t) {
		return 2 * Lc(t)
	}
	)),
	id.invert = function(t, n) {
		return [-n, 2 * Lc(Gc(t)) - qc]
	}
	,
	pd.prototype = fd.prototype = {
		constructor: pd,
		count: function() {
			return this.eachAfter(cd)
		},
		each: function(t, n) {
			let e = -1;
			for (const r of this)
				t.call(n, r, ++e, this);
			return this
		},
		eachAfter: function(t, n) {
			for (var e, r, i, o = this, a = [o], u = [], c = -1; o = a.pop(); )
				if (u.push(o),
				e = o.children)
					for (r = 0,
					i = e.length; r < i; ++r)
						a.push(e[r]);
			for (; o = u.pop(); )
				t.call(n, o, ++c, this);
			return this
		},
		eachBefore: function(t, n) {
			for (var e, r, i = this, o = [i], a = -1; i = o.pop(); )
				if (t.call(n, i, ++a, this),
				e = i.children)
					for (r = e.length - 1; r >= 0; --r)
						o.push(e[r]);
			return this
		},
		find: function(t, n) {
			let e = -1;
			for (const r of this)
				if (t.call(n, r, ++e, this))
					return r
		},
		sum: function(t) {
			return this.eachAfter((function(n) {
				for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0; )
					e += r[i].value;
				n.value = e
			}
			))
		},
		sort: function(t) {
			return this.eachBefore((function(n) {
				n.children && n.children.sort(t)
			}
			))
		},
		path: function(t) {
			for (var n = this, e = function(t, n) {
				if (t === n)
					return t;
				var e = t.ancestors()
				  , r = n.ancestors()
				  , i = null;
				t = e.pop(),
				n = r.pop();
				for (; t === n; )
					i = t,
					t = e.pop(),
					n = r.pop();
				return i
			}(n, t), r = [n]; n !== e; )
				n = n.parent,
				r.push(n);
			for (var i = r.length; t !== e; )
				r.splice(i, 0, t),
				t = t.parent;
			return r
		},
		ancestors: function() {
			for (var t = this, n = [t]; t = t.parent; )
				n.push(t);
			return n
		},
		descendants: function() {
			return Array.from(this)
		},
		leaves: function() {
			var t = [];
			return this.eachBefore((function(n) {
				n.children || t.push(n)
			}
			)),
			t
		},
		links: function() {
			var t = this
			  , n = [];
			return t.each((function(e) {
				e !== t && n.push({
					source: e.parent,
					target: e
				})
			}
			)),
			n
		},
		copy: function() {
			return fd(this).eachBefore(hd)
		},
		[Symbol.iterator]: function*() {
			var t, n, e, r, i = this, o = [i];
			do {
				for (t = o.reverse(),
				o = []; i = t.pop(); )
					if (yield i,
					n = i.children)
						for (e = 0,
						r = n.length; e < r; ++e)
							o.push(n[e])
			} while (o.length)
		}
	};
	var Ud = {
		depth: -1
	}
	  , Id = {}
	  , Bd = {};
	function Yd(t) {
		return t.id
	}
	function Ld(t) {
		return t.parentId
	}
	function jd(t) {
		let n = t.length;
		if (n < 2)
			return "";
		for (; --n > 1 && !Hd(t, n); )
			;
		return t.slice(0, n)
	}
	function Hd(t, n) {
		if ("/" === t[n]) {
			let e = 0;
			for (; n > 0 && "\\" === t[--n]; )
				++e;
			if (0 == (1 & e))
				return !0
		}
		return !1
	}
	function Xd(t, n) {
		return t.parent === n.parent ? 1 : 2
	}
	function Gd(t) {
		var n = t.children;
		return n ? n[0] : t.t
	}
	function Vd(t) {
		var n = t.children;
		return n ? n[n.length - 1] : t.t
	}
	function $d(t, n, e) {
		var r = e / (n.i - t.i);
		n.c -= r,
		n.s += e,
		t.c += r,
		n.z += e,
		n.m += e
	}
	function Wd(t, n, e) {
		return t.a.parent === n.parent ? t.a : e
	}
	function Zd(t, n) {
		this._ = t,
		this.parent = null,
		this.children = null,
		this.A = null,
		this.a = this,
		this.z = 0,
		this.m = 0,
		this.c = 0,
		this.s = 0,
		this.t = null,
		this.i = n
	}
	function Kd(t, n, e, r, i) {
		for (var o, a = t.children, u = -1, c = a.length, f = t.value && (i - e) / t.value; ++u < c; )
			(o = a[u]).x0 = n,
			o.x1 = r,
			o.y0 = e,
			o.y1 = e += o.value * f
	}
	Zd.prototype = Object.create(pd.prototype);
	var Qd = (1 + Math.sqrt(5)) / 2;
	function Jd(t, n, e, r, i, o) {
		for (var a, u, c, f, s, l, h, d, p, g, y, v = [], _ = n.children, b = 0, m = 0, x = _.length, w = n.value; b < x; ) {
			c = i - e,
			f = o - r;
			do {
				s = _[m++].value
			} while (!s && m < x);
			for (l = h = s,
			y = s * s * (g = Math.max(f / c, c / f) / (w * t)),
			p = Math.max(h / y, y / l); m < x; ++m) {
				if (s += u = _[m].value,
				u < l && (l = u),
				u > h && (h = u),
				y = s * s * g,
				(d = Math.max(h / y, y / l)) > p) {
					s -= u;
					break
				}
				p = d
			}
			v.push(a = {
				value: s,
				dice: c < f,
				children: _.slice(b, m)
			}),
			a.dice ? Od(a, e, r, i, w ? r += f * s / w : o) : Kd(a, e, r, w ? e += c * s / w : i, o),
			w -= s,
			b = m
		}
		return v
	}
	var tp = function t(n) {
		function e(t, e, r, i, o) {
			Jd(n, t, e, r, i, o)
		}
		return e.ratio = function(n) {
			return t((n = +n) > 1 ? n : 1)
		}
		,
		e
	}(Qd);
	var np = function t(n) {
		function e(t, e, r, i, o) {
			if ((a = t._squarify) && a.ratio === n)
				for (var a, u, c, f, s, l = -1, h = a.length, d = t.value; ++l < h; ) {
					for (c = (u = a[l]).children,
					f = u.value = 0,
					s = c.length; f < s; ++f)
						u.value += c[f].value;
					u.dice ? Od(u, e, r, i, d ? r += (o - r) * u.value / d : o) : Kd(u, e, r, d ? e += (i - e) * u.value / d : i, o),
					d -= u.value
				}
			else
				t._squarify = a = Jd(n, t, e, r, i, o),
				a.ratio = n
		}
		return e.ratio = function(n) {
			return t((n = +n) > 1 ? n : 1)
		}
		,
		e
	}(Qd);
	function ep(t, n, e) {
		return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0])
	}
	function rp(t, n) {
		return t[0] - n[0] || t[1] - n[1]
	}
	function ip(t) {
		const n = t.length
		  , e = [0, 1];
		let r, i = 2;
		for (r = 2; r < n; ++r) {
			for (; i > 1 && ep(t[e[i - 2]], t[e[i - 1]], t[r]) <= 0; )
				--i;
			e[i++] = r
		}
		return e.slice(0, i)
	}
	var op = Math.random
	  , ap = function t(n) {
		function e(t, e) {
			return t = null == t ? 0 : +t,
			e = null == e ? 1 : +e,
			1 === arguments.length ? (e = t,
			t = 0) : e -= t,
			function() {
				return n() * e + t
			}
		}
		return e.source = t,
		e
	}(op)
	  , up = function t(n) {
		function e(t, e) {
			return arguments.length < 2 && (e = t,
			t = 0),
			t = Math.floor(t),
			e = Math.floor(e) - t,
			function() {
				return Math.floor(n() * e + t)
			}
		}
		return e.source = t,
		e
	}(op)
	  , cp = function t(n) {
		function e(t, e) {
			var r, i;
			return t = null == t ? 0 : +t,
			e = null == e ? 1 : +e,
			function() {
				var o;
				if (null != r)
					o = r,
					r = null;
				else
					do {
						r = 2 * n() - 1,
						o = 2 * n() - 1,
						i = r * r + o * o
					} while (!i || i > 1);
				return t + e * o * Math.sqrt(-2 * Math.log(i) / i)
			}
		}
		return e.source = t,
		e
	}(op)
	  , fp = function t(n) {
		var e = cp.source(n);
		function r() {
			var t = e.apply(this, arguments);
			return function() {
				return Math.exp(t())
			}
		}
		return r.source = t,
		r
	}(op)
	  , sp = function t(n) {
		function e(t) {
			return (t = +t) <= 0 ? ()=>0 : function() {
				for (var e = 0, r = t; r > 1; --r)
					e += n();
				return e + r * n()
			}
		}
		return e.source = t,
		e
	}(op)
	  , lp = function t(n) {
		var e = sp.source(n);
		function r(t) {
			if (0 == (t = +t))
				return n;
			var r = e(t);
			return function() {
				return r() / t
			}
		}
		return r.source = t,
		r
	}(op)
	  , hp = function t(n) {
		function e(t) {
			return function() {
				return -Math.log1p(-n()) / t
			}
		}
		return e.source = t,
		e
	}(op)
	  , dp = function t(n) {
		function e(t) {
			if ((t = +t) < 0)
				throw new RangeError("invalid alpha");
			return t = 1 / -t,
			function() {
				return Math.pow(1 - n(), t)
			}
		}
		return e.source = t,
		e
	}(op)
	  , pp = function t(n) {
		function e(t) {
			if ((t = +t) < 0 || t > 1)
				throw new RangeError("invalid p");
			return function() {
				return Math.floor(n() + t)
			}
		}
		return e.source = t,
		e
	}(op)
	  , gp = function t(n) {
		function e(t) {
			if ((t = +t) < 0 || t > 1)
				throw new RangeError("invalid p");
			return 0 === t ? ()=>1 / 0 : 1 === t ? ()=>1 : (t = Math.log1p(-t),
			function() {
				return 1 + Math.floor(Math.log1p(-n()) / t)
			}
			)
		}
		return e.source = t,
		e
	}(op)
	  , yp = function t(n) {
		var e = cp.source(n)();
		function r(t, r) {
			if ((t = +t) < 0)
				throw new RangeError("invalid k");
			if (0 === t)
				return ()=>0;
			if (r = null == r ? 1 : +r,
			1 === t)
				return ()=>-Math.log1p(-n()) * r;
			var i = (t < 1 ? t + 1 : t) - 1 / 3
			  , o = 1 / (3 * Math.sqrt(i))
			  , a = t < 1 ? ()=>Math.pow(n(), 1 / t) : ()=>1;
			return function() {
				do {
					do {
						var t = e()
						  , u = 1 + o * t
					} while (u <= 0);
					u *= u * u;
					var c = 1 - n()
				} while (c >= 1 - .0331 * t * t * t * t && Math.log(c) >= .5 * t * t + i * (1 - u + Math.log(u)));
				return i * u * a() * r
			}
		}
		return r.source = t,
		r
	}(op)
	  , vp = function t(n) {
		var e = yp.source(n);
		function r(t, n) {
			var r = e(t)
			  , i = e(n);
			return function() {
				var t = r();
				return 0 === t ? 0 : t / (t + i())
			}
		}
		return r.source = t,
		r
	}(op)
	  , _p = function t(n) {
		var e = gp.source(n)
		  , r = vp.source(n);
		function i(t, n) {
			return t = +t,
			(n = +n) >= 1 ? ()=>t : n <= 0 ? ()=>0 : function() {
				for (var i = 0, o = t, a = n; o * a > 16 && o * (1 - a) > 16; ) {
					var u = Math.floor((o + 1) * a)
					  , c = r(u, o - u + 1)();
					c <= a ? (i += u,
					o -= u,
					a = (a - c) / (1 - c)) : (o = u - 1,
					a /= c)
				}
				for (var f = a < .5, s = e(f ? a : 1 - a), l = s(), h = 0; l <= o; ++h)
					l += s();
				return i + (f ? h : o - h)
			}
		}
		return i.source = t,
		i
	}(op)
	  , bp = function t(n) {
		function e(t, e, r) {
			var i;
			return 0 == (t = +t) ? i = t=>-Math.log(t) : (t = 1 / t,
			i = n=>Math.pow(n, t)),
			e = null == e ? 0 : +e,
			r = null == r ? 1 : +r,
			function() {
				return e + r * i(-Math.log1p(-n()))
			}
		}
		return e.source = t,
		e
	}(op)
	  , mp = function t(n) {
		function e(t, e) {
			return t = null == t ? 0 : +t,
			e = null == e ? 1 : +e,
			function() {
				return t + e * Math.tan(Math.PI * n())
			}
		}
		return e.source = t,
		e
	}(op)
	  , xp = function t(n) {
		function e(t, e) {
			return t = null == t ? 0 : +t,
			e = null == e ? 1 : +e,
			function() {
				var r = n();
				return t + e * Math.log(r / (1 - r))
			}
		}
		return e.source = t,
		e
	}(op)
	  , wp = function t(n) {
		var e = yp.source(n)
		  , r = _p.source(n);
		function i(t) {
			return function() {
				for (var i = 0, o = t; o > 16; ) {
					var a = Math.floor(.875 * o)
					  , u = e(a)();
					if (u > o)
						return i + r(a - 1, o / u)();
					i += a,
					o -= u
				}
				for (var c = -Math.log1p(-n()), f = 0; c <= o; ++f)
					c -= Math.log1p(-n());
				return i + f
			}
		}
		return i.source = t,
		i
	}(op);
	const Mp = 1 / 4294967296;
	function Ap(t, n) {
		switch (arguments.length) {
		case 0:
			break;
		case 1:
			this.range(t);
			break;
		default:
			this.range(n).domain(t)
		}
		return this
	}
	function Tp(t, n) {
		switch (arguments.length) {
		case 0:
			break;
		case 1:
			"function" == typeof t ? this.interpolator(t) : this.range(t);
			break;
		default:
			this.domain(t),
			"function" == typeof n ? this.interpolator(n) : this.range(n)
		}
		return this
	}
	const Sp = Symbol("implicit");
	function Ep() {
		var t = new InternMap
		  , n = []
		  , e = []
		  , r = Sp;
		function i(i) {
			let o = t.get(i);
			if (void 0 === o) {
				if (r !== Sp)
					return r;
				t.set(i, o = n.push(i) - 1)
			}
			return e[o % e.length]
		}
		return i.domain = function(e) {
			if (!arguments.length)
				return n.slice();
			n = [],
			t = new InternMap;
			for (const r of e)
				t.has(r) || t.set(r, n.push(r) - 1);
			return i
		}
		,
		i.range = function(t) {
			return arguments.length ? (e = Array.from(t),
			i) : e.slice()
		}
		,
		i.unknown = function(t) {
			return arguments.length ? (r = t,
			i) : r
		}
		,
		i.copy = function() {
			return Ep(n, e).unknown(r)
		}
		,
		Ap.apply(i, arguments),
		i
	}
	function kp() {
		var t, n, e = Ep().unknown(void 0), r = e.domain, i = e.range, o = 0, a = 1, u = !1, c = 0, f = 0, s = .5;
		function l() {
			var e = r().length
			  , l = a < o
			  , h = l ? a : o
			  , d = l ? o : a;
			t = (d - h) / Math.max(1, e - c + 2 * f),
			u && (t = Math.floor(t)),
			h += (d - h - t * (e - c)) * s,
			n = t * (1 - c),
			u && (h = Math.round(h),
			n = Math.round(n));
			var p = tt(e).map((function(n) {
				return h + t * n
			}
			));
			return i(l ? p.reverse() : p)
		}
		return delete e.unknown,
		e.domain = function(t) {
			return arguments.length ? (r(t),
			l()) : r()
		}
		,
		e.range = function(t) {
			return arguments.length ? ([o,a] = t,
			o = +o,
			a = +a,
			l()) : [o, a]
		}
		,
		e.rangeRound = function(t) {
			return [o,a] = t,
			o = +o,
			a = +a,
			u = !0,
			l()
		}
		,
		e.bandwidth = function() {
			return n
		}
		,
		e.step = function() {
			return t
		}
		,
		e.round = function(t) {
			return arguments.length ? (u = !!t,
			l()) : u
		}
		,
		e.padding = function(t) {
			return arguments.length ? (c = Math.min(1, f = +t),
			l()) : c
		}
		,
		e.paddingInner = function(t) {
			return arguments.length ? (c = Math.min(1, t),
			l()) : c
		}
		,
		e.paddingOuter = function(t) {
			return arguments.length ? (f = +t,
			l()) : f
		}
		,
		e.align = function(t) {
			return arguments.length ? (s = Math.max(0, Math.min(1, t)),
			l()) : s
		}
		,
		e.copy = function() {
			return kp(r(), [o, a]).round(u).paddingInner(c).paddingOuter(f).align(s)
		}
		,
		Ap.apply(l(), arguments)
	}
	function Np(t) {
		var n = t.copy;
		return t.padding = t.paddingOuter,
		delete t.paddingInner,
		delete t.paddingOuter,
		t.copy = function() {
			return Np(n())
		}
		,
		t
	}
	function Cp(t) {
		return +t
	}
	var Pp = [0, 1];
	function zp(t) {
		return t
	}
	function Dp(t, n) {
		return (n -= t = +t) ? function(e) {
			return (e - t) / n
		}
		: function(t) {
			return function() {
				return t
			}
		}(isNaN(n) ? NaN : .5)
	}
	function Rp(t, n, e) {
		var r = t[0]
		  , i = t[1]
		  , o = n[0]
		  , a = n[1];
		return i < r ? (r = Dp(i, r),
		o = e(a, o)) : (r = Dp(r, i),
		o = e(o, a)),
		function(t) {
			return o(r(t))
		}
	}
	function Fp(t, n, e) {
		var r = Math.min(t.length, n.length) - 1
		  , i = new Array(r)
		  , o = new Array(r)
		  , a = -1;
		for (t[r] < t[0] && (t = t.slice().reverse(),
		n = n.slice().reverse()); ++a < r; )
			i[a] = Dp(t[a], t[a + 1]),
			o[a] = e(n[a], n[a + 1]);
		return function(n) {
			var e = c(t, n, 1, r) - 1;
			return o[e](i[e](n))
		}
	}
	function qp(t, n) {
		return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
	}
	function Op() {
		var t, n, e, r, i, o, a = Pp, u = Pp, c = Cr, f = zp;
		function s() {
			var t = Math.min(a.length, u.length);
			return f !== zp && (f = function(t, n) {
				var e;
				return t > n && (e = t,
				t = n,
				n = e),
				function(e) {
					return Math.max(t, Math.min(n, e))
				}
			}(a[0], a[t - 1])),
			r = t > 2 ? Fp : Rp,
			i = o = null,
			l
		}
		function l(n) {
			return null == n || isNaN(n = +n) ? e : (i || (i = r(a.map(t), u, c)))(t(f(n)))
		}
		return l.invert = function(e) {
			return f(n((o || (o = r(u, a.map(t), Tr)))(e)))
		}
		,
		l.domain = function(t) {
			return arguments.length ? (a = Array.from(t, Cp),
			s()) : a.slice()
		}
		,
		l.range = function(t) {
			return arguments.length ? (u = Array.from(t),
			s()) : u.slice()
		}
		,
		l.rangeRound = function(t) {
			return u = Array.from(t),
			c = Pr,
			s()
		}
		,
		l.clamp = function(t) {
			return arguments.length ? (f = !!t || zp,
			s()) : f !== zp
		}
		,
		l.interpolate = function(t) {
			return arguments.length ? (c = t,
			s()) : c
		}
		,
		l.unknown = function(t) {
			return arguments.length ? (e = t,
			l) : e
		}
		,
		function(e, r) {
			return t = e,
			n = r,
			s()
		}
	}
	function Up() {
		return Op()(zp, zp)
	}
	function Ip(n, e, r, i) {
		var o, a = B(n, e, r);
		switch ((i = mc(null == i ? ",f" : i)).type) {
		case "s":
			var u = Math.max(Math.abs(n), Math.abs(e));
			return null != i.precision || isNaN(o = Pc(a, u)) || (i.precision = o),
			t.formatPrefix(i, u);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			null != i.precision || isNaN(o = zc(a, Math.max(Math.abs(n), Math.abs(e)))) || (i.precision = o - ("e" === i.type));
			break;
		case "f":
		case "%":
			null != i.precision || isNaN(o = Cc(a)) || (i.precision = o - 2 * ("%" === i.type))
		}
		return t.format(i)
	}
	function Bp(t) {
		var n = t.domain;
		return t.ticks = function(t) {
			var e = n();
			return U(e[0], e[e.length - 1], null == t ? 10 : t)
		}
		,
		t.tickFormat = function(t, e) {
			var r = n();
			return Ip(r[0], r[r.length - 1], null == t ? 10 : t, e)
		}
		,
		t.nice = function(e) {
			null == e && (e = 10);
			var r, i, o = n(), a = 0, u = o.length - 1, c = o[a], f = o[u], s = 10;
			for (f < c && (i = c,
			c = f,
			f = i,
			i = a,
			a = u,
			u = i); s-- > 0; ) {
				if ((i = I(c, f, e)) === r)
					return o[a] = c,
					o[u] = f,
					n(o);
				if (i > 0)
					c = Math.floor(c / i) * i,
					f = Math.ceil(f / i) * i;
				else {
					if (!(i < 0))
						break;
					c = Math.ceil(c * i) / i,
					f = Math.floor(f * i) / i
				}
				r = i
			}
			return t
		}
		,
		t
	}
	function Yp(t, n) {
		var e, r = 0, i = (t = t.slice()).length - 1, o = t[r], a = t[i];
		return a < o && (e = r,
		r = i,
		i = e,
		e = o,
		o = a,
		a = e),
		t[r] = n.floor(o),
		t[i] = n.ceil(a),
		t
	}
	function Lp(t) {
		return Math.log(t)
	}
	function jp(t) {
		return Math.exp(t)
	}
	function Hp(t) {
		return -Math.log(-t)
	}
	function Xp(t) {
		return -Math.exp(-t)
	}
	function Gp(t) {
		return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
	}
	function Vp(t) {
		return (n,e)=>-t(-n, e)
	}
	function $p(n) {
		const e = n(Lp, jp)
		  , r = e.domain;
		let i, o, a = 10;
		function u() {
			return i = function(t) {
				return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t),
				n=>Math.log(n) / t)
			}(a),
			o = function(t) {
				return 10 === t ? Gp : t === Math.E ? Math.exp : n=>Math.pow(t, n)
			}(a),
			r()[0] < 0 ? (i = Vp(i),
			o = Vp(o),
			n(Hp, Xp)) : n(Lp, jp),
			e
		}
		return e.base = function(t) {
			return arguments.length ? (a = +t,
			u()) : a
		}
		,
		e.domain = function(t) {
			return arguments.length ? (r(t),
			u()) : r()
		}
		,
		e.ticks = t=>{
			const n = r();
			let e = n[0]
			  , u = n[n.length - 1];
			const c = u < e;
			c && ([e,u] = [u, e]);
			let f, s, l = i(e), h = i(u);
			const d = null == t ? 10 : +t;
			let p = [];
			if (!(a % 1) && h - l < d) {
				if (l = Math.floor(l),
				h = Math.ceil(h),
				e > 0) {
					for (; l <= h; ++l)
						for (f = 1; f < a; ++f)
							if (s = l < 0 ? f / o(-l) : f * o(l),
							!(s < e)) {
								if (s > u)
									break;
								p.push(s)
							}
				} else
					for (; l <= h; ++l)
						for (f = a - 1; f >= 1; --f)
							if (s = l > 0 ? f / o(-l) : f * o(l),
							!(s < e)) {
								if (s > u)
									break;
								p.push(s)
							}
				2 * p.length < d && (p = U(e, u, d))
			} else
				p = U(l, h, Math.min(h - l, d)).map(o);
			return c ? p.reverse() : p
		}
		,
		e.tickFormat = (n,r)=>{
			if (null == n && (n = 10),
			null == r && (r = 10 === a ? "s" : ","),
			"function" != typeof r && (a % 1 || null != (r = mc(r)).precision || (r.trim = !0),
			r = t.format(r)),
			n === 1 / 0)
				return r;
			const u = Math.max(1, a * n / e.ticks().length);
			return t=>{
				let n = t / o(Math.round(i(t)));
				return n * a < a - .5 && (n *= a),
				n <= u ? r(t) : ""
			}
		}
		,
		e.nice = ()=>r(Yp(r(), {
			floor: t=>o(Math.floor(i(t))),
			ceil: t=>o(Math.ceil(i(t)))
		})),
		e
	}
	function Wp(t) {
		return function(n) {
			return Math.sign(n) * Math.log1p(Math.abs(n / t))
		}
	}
	function Zp(t) {
		return function(n) {
			return Math.sign(n) * Math.expm1(Math.abs(n)) * t
		}
	}
	function Kp(t) {
		var n = 1
		  , e = t(Wp(n), Zp(n));
		return e.constant = function(e) {
			return arguments.length ? t(Wp(n = +e), Zp(n)) : n
		}
		,
		Bp(e)
	}
	function Qp(t) {
		return function(n) {
			return n < 0 ? -Math.pow(-n, t) : Math.pow(n, t)
		}
	}
	function Jp(t) {
		return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t)
	}
	function tg(t) {
		return t < 0 ? -t * t : t * t
	}
	function ng(t) {
		var n = t(zp, zp)
		  , e = 1;
		function r() {
			return 1 === e ? t(zp, zp) : .5 === e ? t(Jp, tg) : t(Qp(e), Qp(1 / e))
		}
		return n.exponent = function(t) {
			return arguments.length ? (e = +t,
			r()) : e
		}
		,
		Bp(n)
	}
	function eg() {
		var t = ng(Op());
		return t.copy = function() {
			return qp(t, eg()).exponent(t.exponent())
		}
		,
		Ap.apply(t, arguments),
		t
	}
	function rg(t) {
		return Math.sign(t) * t * t
	}
	function ig(t) {
		return Math.sign(t) * Math.sqrt(Math.abs(t))
	}
	var og = new Date
	  , ag = new Date;
	function ug(t, n, e, r) {
		function i(n) {
			return t(n = 0 === arguments.length ? new Date : new Date(+n)),
			n
		}
		return i.floor = function(n) {
			return t(n = new Date(+n)),
			n
		}
		,
		i.ceil = function(e) {
			return t(e = new Date(e - 1)),
			n(e, 1),
			t(e),
			e
		}
		,
		i.round = function(t) {
			var n = i(t)
			  , e = i.ceil(t);
			return t - n < e - t ? n : e
		}
		,
		i.offset = function(t, e) {
			return n(t = new Date(+t), null == e ? 1 : Math.floor(e)),
			t
		}
		,
		i.range = function(e, r, o) {
			var a, u = [];
			if (e = i.ceil(e),
			o = null == o ? 1 : Math.floor(o),
			!(e < r && o > 0))
				return u;
			do {
				u.push(a = new Date(+e)),
				n(e, o),
				t(e)
			} while (a < e && e < r);
			return u
		}
		,
		i.filter = function(e) {
			return ug((function(n) {
				if (n >= n)
					for (; t(n),
					!e(n); )
						n.setTime(n - 1)
			}
			), (function(t, r) {
				if (t >= t)
					if (r < 0)
						for (; ++r <= 0; )
							for (; n(t, -1),
							!e(t); )
								;
					else
						for (; --r >= 0; )
							for (; n(t, 1),
							!e(t); )
								;
			}
			))
		}
		,
		e && (i.count = function(n, r) {
			return og.setTime(+n),
			ag.setTime(+r),
			t(og),
			t(ag),
			Math.floor(e(og, ag))
		}
		,
		i.every = function(t) {
			return t = Math.floor(t),
			isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function(n) {
				return r(n) % t == 0
			}
			: function(n) {
				return i.count(0, n) % t == 0
			}
			) : i : null
		}
		),
		i
	}
	var cg = ug((function() {}
	), (function(t, n) {
		t.setTime(+t + n)
	}
	), (function(t, n) {
		return n - t
	}
	));
	cg.every = function(t) {
		return t = Math.floor(t),
		isFinite(t) && t > 0 ? t > 1 ? ug((function(n) {
			n.setTime(Math.floor(n / t) * t)
		}
		), (function(n, e) {
			n.setTime(+n + e * t)
		}
		), (function(n, e) {
			return (e - n) / t
		}
		)) : cg : null
	}
	;
	var fg = cg
	  , sg = cg.range;
	const lg = 1e3
	  , hg = 6e4
	  , dg = 36e5
	  , pg = 864e5
	  , gg = 6048e5
	  , yg = 2592e6
	  , vg = 31536e6;
	var _g = ug((function(t) {
		t.setTime(t - t.getMilliseconds())
	}
	), (function(t, n) {
		t.setTime(+t + n * lg)
	}
	), (function(t, n) {
		return (n - t) / lg
	}
	), (function(t) {
		return t.getUTCSeconds()
	}
	))
	  , bg = _g
	  , mg = _g.range
	  , xg = ug((function(t) {
		t.setTime(t - t.getMilliseconds() - t.getSeconds() * lg)
	}
	), (function(t, n) {
		t.setTime(+t + n * hg)
	}
	), (function(t, n) {
		return (n - t) / hg
	}
	), (function(t) {
		return t.getMinutes()
	}
	))
	  , wg = xg
	  , Mg = xg.range
	  , Ag = ug((function(t) {
		t.setTime(t - t.getMilliseconds() - t.getSeconds() * lg - t.getMinutes() * hg)
	}
	), (function(t, n) {
		t.setTime(+t + n * dg)
	}
	), (function(t, n) {
		return (n - t) / dg
	}
	), (function(t) {
		return t.getHours()
	}
	))
	  , Tg = Ag
	  , Sg = Ag.range
	  , Eg = ug((t=>t.setHours(0, 0, 0, 0)), ((t,n)=>t.setDate(t.getDate() + n)), ((t,n)=>(n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * hg) / pg), (t=>t.getDate() - 1))
	  , kg = Eg
	  , Ng = Eg.range;
	function Cg(t) {
		return ug((function(n) {
			n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7),
			n.setHours(0, 0, 0, 0)
		}
		), (function(t, n) {
			t.setDate(t.getDate() + 7 * n)
		}
		), (function(t, n) {
			return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * hg) / gg
		}
		))
	}
	var Pg = Cg(0)
	  , zg = Cg(1)
	  , Dg = Cg(2)
	  , Rg = Cg(3)
	  , Fg = Cg(4)
	  , qg = Cg(5)
	  , Og = Cg(6)
	  , Ug = Pg.range
	  , Ig = zg.range
	  , Bg = Dg.range
	  , Yg = Rg.range
	  , Lg = Fg.range
	  , jg = qg.range
	  , Hg = Og.range
	  , Xg = ug((function(t) {
		t.setDate(1),
		t.setHours(0, 0, 0, 0)
	}
	), (function(t, n) {
		t.setMonth(t.getMonth() + n)
	}
	), (function(t, n) {
		return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
	}
	), (function(t) {
		return t.getMonth()
	}
	))
	  , Gg = Xg
	  , Vg = Xg.range
	  , $g = ug((function(t) {
		t.setMonth(0, 1),
		t.setHours(0, 0, 0, 0)
	}
	), (function(t, n) {
		t.setFullYear(t.getFullYear() + n)
	}
	), (function(t, n) {
		return n.getFullYear() - t.getFullYear()
	}
	), (function(t) {
		return t.getFullYear()
	}
	));
	$g.every = function(t) {
		return isFinite(t = Math.floor(t)) && t > 0 ? ug((function(n) {
			n.setFullYear(Math.floor(n.getFullYear() / t) * t),
			n.setMonth(0, 1),
			n.setHours(0, 0, 0, 0)
		}
		), (function(n, e) {
			n.setFullYear(n.getFullYear() + e * t)
		}
		)) : null
	}
	;
	var Wg = $g
	  , Zg = $g.range
	  , Kg = ug((function(t) {
		t.setUTCSeconds(0, 0)
	}
	), (function(t, n) {
		t.setTime(+t + n * hg)
	}
	), (function(t, n) {
		return (n - t) / hg
	}
	), (function(t) {
		return t.getUTCMinutes()
	}
	))
	  , Qg = Kg
	  , Jg = Kg.range
	  , ty = ug((function(t) {
		t.setUTCMinutes(0, 0, 0)
	}
	), (function(t, n) {
		t.setTime(+t + n * dg)
	}
	), (function(t, n) {
		return (n - t) / dg
	}
	), (function(t) {
		return t.getUTCHours()
	}
	))
	  , ny = ty
	  , ey = ty.range
	  , ry = ug((function(t) {
		t.setUTCHours(0, 0, 0, 0)
	}
	), (function(t, n) {
		t.setUTCDate(t.getUTCDate() + n)
	}
	), (function(t, n) {
		return (n - t) / pg
	}
	), (function(t) {
		return t.getUTCDate() - 1
	}
	))
	  , iy = ry
	  , oy = ry.range;
	function ay(t) {
		return ug((function(n) {
			n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7),
			n.setUTCHours(0, 0, 0, 0)
		}
		), (function(t, n) {
			t.setUTCDate(t.getUTCDate() + 7 * n)
		}
		), (function(t, n) {
			return (n - t) / gg
		}
		))
	}
	var uy = ay(0)
	  , cy = ay(1)
	  , fy = ay(2)
	  , sy = ay(3)
	  , ly = ay(4)
	  , hy = ay(5)
	  , dy = ay(6)
	  , py = uy.range
	  , gy = cy.range
	  , yy = fy.range
	  , vy = sy.range
	  , _y = ly.range
	  , by = hy.range
	  , my = dy.range
	  , xy = ug((function(t) {
		t.setUTCDate(1),
		t.setUTCHours(0, 0, 0, 0)
	}
	), (function(t, n) {
		t.setUTCMonth(t.getUTCMonth() + n)
	}
	), (function(t, n) {
		return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear())
	}
	), (function(t) {
		return t.getUTCMonth()
	}
	))
	  , wy = xy
	  , My = xy.range
	  , Ay = ug((function(t) {
		t.setUTCMonth(0, 1),
		t.setUTCHours(0, 0, 0, 0)
	}
	), (function(t, n) {
		t.setUTCFullYear(t.getUTCFullYear() + n)
	}
	), (function(t, n) {
		return n.getUTCFullYear() - t.getUTCFullYear()
	}
	), (function(t) {
		return t.getUTCFullYear()
	}
	));
	Ay.every = function(t) {
		return isFinite(t = Math.floor(t)) && t > 0 ? ug((function(n) {
			n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t),
			n.setUTCMonth(0, 1),
			n.setUTCHours(0, 0, 0, 0)
		}
		), (function(n, e) {
			n.setUTCFullYear(n.getUTCFullYear() + e * t)
		}
		)) : null
	}
	;
	var Ty = Ay
	  , Sy = Ay.range;
	function Ey(t, n, r, i, o, a) {
		const u = [[bg, 1, lg], [bg, 5, 5e3], [bg, 15, 15e3], [bg, 30, 3e4], [a, 1, hg], [a, 5, 3e5], [a, 15, 9e5], [a, 30, 18e5], [o, 1, dg], [o, 3, 108e5], [o, 6, 216e5], [o, 12, 432e5], [i, 1, pg], [i, 2, 1728e5], [r, 1, gg], [n, 1, yg], [n, 3, 7776e6], [t, 1, vg]];
		function c(n, r, i) {
			const o = Math.abs(r - n) / i
			  , a = e((([,,t])=>t)).right(u, o);
			if (a === u.length)
				return t.every(B(n / vg, r / vg, i));
			if (0 === a)
				return fg.every(Math.max(B(n, r, i), 1));
			const [c,f] = u[o / u[a - 1][2] < u[a][2] / o ? a - 1 : a];
			return c.every(f)
		}
		return [function(t, n, e) {
			const r = n < t;
			r && ([t,n] = [n, t]);
			const i = e && "function" == typeof e.range ? e : c(t, n, e)
			  , o = i ? i.range(t, +n + 1) : [];
			return r ? o.reverse() : o
		}
		, c]
	}
	const [ky,Ny] = Ey(Ty, wy, uy, iy, ny, Qg)
	  , [Cy,Py] = Ey(Wg, Gg, Pg, kg, Tg, wg);
	function zy(t) {
		if (0 <= t.y && t.y < 100) {
			var n = new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);
			return n.setFullYear(t.y),
			n
		}
		return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)
	}
	function Dy(t) {
		if (0 <= t.y && t.y < 100) {
			var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
			return n.setUTCFullYear(t.y),
			n
		}
		return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
	}
	function Ry(t, n, e) {
		return {
			y: t,
			m: n,
			d: e,
			H: 0,
			M: 0,
			S: 0,
			L: 0
		}
	}
	function Fy(t) {
		var n = t.dateTime
		  , e = t.date
		  , r = t.time
		  , i = t.periods
		  , o = t.days
		  , a = t.shortDays
		  , u = t.months
		  , c = t.shortMonths
		  , f = jy(i)
		  , s = Hy(i)
		  , l = jy(o)
		  , h = Hy(o)
		  , d = jy(a)
		  , p = Hy(a)
		  , g = jy(u)
		  , y = Hy(u)
		  , v = jy(c)
		  , _ = Hy(c)
		  , b = {
			a: function(t) {
				return a[t.getDay()]
			},
			A: function(t) {
				return o[t.getDay()]
			},
			b: function(t) {
				return c[t.getMonth()]
			},
			B: function(t) {
				return u[t.getMonth()]
			},
			c: null,
			d: lv,
			e: lv,
			f: yv,
			g: Ev,
			G: Nv,
			H: hv,
			I: dv,
			j: pv,
			L: gv,
			m: vv,
			M: _v,
			p: function(t) {
				return i[+(t.getHours() >= 12)]
			},
			q: function(t) {
				return 1 + ~~(t.getMonth() / 3)
			},
			Q: Qv,
			s: Jv,
			S: bv,
			u: mv,
			U: xv,
			V: Mv,
			w: Av,
			W: Tv,
			x: null,
			X: null,
			y: Sv,
			Y: kv,
			Z: Cv,
			"%": Kv
		}
		  , m = {
			a: function(t) {
				return a[t.getUTCDay()]
			},
			A: function(t) {
				return o[t.getUTCDay()]
			},
			b: function(t) {
				return c[t.getUTCMonth()]
			},
			B: function(t) {
				return u[t.getUTCMonth()]
			},
			c: null,
			d: Pv,
			e: Pv,
			f: qv,
			g: Vv,
			G: Wv,
			H: zv,
			I: Dv,
			j: Rv,
			L: Fv,
			m: Ov,
			M: Uv,
			p: function(t) {
				return i[+(t.getUTCHours() >= 12)]
			},
			q: function(t) {
				return 1 + ~~(t.getUTCMonth() / 3)
			},
			Q: Qv,
			s: Jv,
			S: Iv,
			u: Bv,
			U: Yv,
			V: jv,
			w: Hv,
			W: Xv,
			x: null,
			X: null,
			y: Gv,
			Y: $v,
			Z: Zv,
			"%": Kv
		}
		  , x = {
			a: function(t, n, e) {
				var r = d.exec(n.slice(e));
				return r ? (t.w = p.get(r[0].toLowerCase()),
				e + r[0].length) : -1
			},
			A: function(t, n, e) {
				var r = l.exec(n.slice(e));
				return r ? (t.w = h.get(r[0].toLowerCase()),
				e + r[0].length) : -1
			},
			b: function(t, n, e) {
				var r = v.exec(n.slice(e));
				return r ? (t.m = _.get(r[0].toLowerCase()),
				e + r[0].length) : -1
			},
			B: function(t, n, e) {
				var r = g.exec(n.slice(e));
				return r ? (t.m = y.get(r[0].toLowerCase()),
				e + r[0].length) : -1
			},
			c: function(t, e, r) {
				return A(t, n, e, r)
			},
			d: nv,
			e: nv,
			f: uv,
			g: Ky,
			G: Zy,
			H: rv,
			I: rv,
			j: ev,
			L: av,
			m: tv,
			M: iv,
			p: function(t, n, e) {
				var r = f.exec(n.slice(e));
				return r ? (t.p = s.get(r[0].toLowerCase()),
				e + r[0].length) : -1
			},
			q: Jy,
			Q: fv,
			s: sv,
			S: ov,
			u: Gy,
			U: Vy,
			V: $y,
			w: Xy,
			W: Wy,
			x: function(t, n, r) {
				return A(t, e, n, r)
			},
			X: function(t, n, e) {
				return A(t, r, n, e)
			},
			y: Ky,
			Y: Zy,
			Z: Qy,
			"%": cv
		};
		function w(t, n) {
			return function(e) {
				var r, i, o, a = [], u = -1, c = 0, f = t.length;
				for (e instanceof Date || (e = new Date(+e)); ++u < f; )
					37 === t.charCodeAt(u) && (a.push(t.slice(c, u)),
					null != (i = Oy[r = t.charAt(++u)]) ? r = t.charAt(++u) : i = "e" === r ? " " : "0",
					(o = n[r]) && (r = o(e, i)),
					a.push(r),
					c = u + 1);
				return a.push(t.slice(c, u)),
				a.join("")
			}
		}
		function M(t, n) {
			return function(e) {
				var r, i, o = Ry(1900, void 0, 1);
				if (A(o, t, e += "", 0) != e.length)
					return null;
				if ("Q"in o)
					return new Date(o.Q);
				if ("s"in o)
					return new Date(1e3 * o.s + ("L"in o ? o.L : 0));
				if (n && !("Z"in o) && (o.Z = 0),
				"p"in o && (o.H = o.H % 12 + 12 * o.p),
				void 0 === o.m && (o.m = "q"in o ? o.q : 0),
				"V"in o) {
					if (o.V < 1 || o.V > 53)
						return null;
					"w"in o || (o.w = 1),
					"Z"in o ? (i = (r = Dy(Ry(o.y, 0, 1))).getUTCDay(),
					r = i > 4 || 0 === i ? cy.ceil(r) : cy(r),
					r = iy.offset(r, 7 * (o.V - 1)),
					o.y = r.getUTCFullYear(),
					o.m = r.getUTCMonth(),
					o.d = r.getUTCDate() + (o.w + 6) % 7) : (i = (r = zy(Ry(o.y, 0, 1))).getDay(),
					r = i > 4 || 0 === i ? zg.ceil(r) : zg(r),
					r = kg.offset(r, 7 * (o.V - 1)),
					o.y = r.getFullYear(),
					o.m = r.getMonth(),
					o.d = r.getDate() + (o.w + 6) % 7)
				} else
					("W"in o || "U"in o) && ("w"in o || (o.w = "u"in o ? o.u % 7 : "W"in o ? 1 : 0),
					i = "Z"in o ? Dy(Ry(o.y, 0, 1)).getUTCDay() : zy(Ry(o.y, 0, 1)).getDay(),
					o.m = 0,
					o.d = "W"in o ? (o.w + 6) % 7 + 7 * o.W - (i + 5) % 7 : o.w + 7 * o.U - (i + 6) % 7);
				return "Z"in o ? (o.H += o.Z / 100 | 0,
				o.M += o.Z % 100,
				Dy(o)) : zy(o)
			}
		}
		function A(t, n, e, r) {
			for (var i, o, a = 0, u = n.length, c = e.length; a < u; ) {
				if (r >= c)
					return -1;
				if (37 === (i = n.charCodeAt(a++))) {
					if (i = n.charAt(a++),
					!(o = x[i in Oy ? n.charAt(a++) : i]) || (r = o(t, e, r)) < 0)
						return -1
				} else if (i != e.charCodeAt(r++))
					return -1
			}
			return r
		}
		return b.x = w(e, b),
		b.X = w(r, b),
		b.c = w(n, b),
		m.x = w(e, m),
		m.X = w(r, m),
		m.c = w(n, m),
		{
			format: function(t) {
				var n = w(t += "", b);
				return n.toString = function() {
					return t
				}
				,
				n
			},
			parse: function(t) {
				var n = M(t += "", !1);
				return n.toString = function() {
					return t
				}
				,
				n
			},
			utcFormat: function(t) {
				var n = w(t += "", m);
				return n.toString = function() {
					return t
				}
				,
				n
			},
			utcParse: function(t) {
				var n = M(t += "", !0);
				return n.toString = function() {
					return t
				}
				,
				n
			}
		}
	}
	var qy, Oy = {
		"-": "",
		_: " ",
		0: "0"
	}, Uy = /^\s*\d+/, Iy = /^%/, By = /[\\^$*+?|[\]().{}]/g;
	function Yy(t, n, e) {
		var r = t < 0 ? "-" : ""
		  , i = (r ? -t : t) + ""
		  , o = i.length;
		return r + (o < e ? new Array(e - o + 1).join(n) + i : i)
	}
	function Ly(t) {
		return t.replace(By, "\\$&")
	}
	function jy(t) {
		return new RegExp("^(?:" + t.map(Ly).join("|") + ")","i")
	}
	function Hy(t) {
		return new Map(t.map(((t,n)=>[t.toLowerCase(), n])))
	}
	function Xy(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 1));
		return r ? (t.w = +r[0],
		e + r[0].length) : -1
	}
	function Gy(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 1));
		return r ? (t.u = +r[0],
		e + r[0].length) : -1
	}
	function Vy(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.U = +r[0],
		e + r[0].length) : -1
	}
	function $y(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.V = +r[0],
		e + r[0].length) : -1
	}
	function Wy(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.W = +r[0],
		e + r[0].length) : -1
	}
	function Zy(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 4));
		return r ? (t.y = +r[0],
		e + r[0].length) : -1
	}
	function Ky(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3),
		e + r[0].length) : -1
	}
	function Qy(t, n, e) {
		var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
		return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")),
		e + r[0].length) : -1
	}
	function Jy(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 1));
		return r ? (t.q = 3 * r[0] - 3,
		e + r[0].length) : -1
	}
	function tv(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.m = r[0] - 1,
		e + r[0].length) : -1
	}
	function nv(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.d = +r[0],
		e + r[0].length) : -1
	}
	function ev(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 3));
		return r ? (t.m = 0,
		t.d = +r[0],
		e + r[0].length) : -1
	}
	function rv(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.H = +r[0],
		e + r[0].length) : -1
	}
	function iv(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.M = +r[0],
		e + r[0].length) : -1
	}
	function ov(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 2));
		return r ? (t.S = +r[0],
		e + r[0].length) : -1
	}
	function av(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 3));
		return r ? (t.L = +r[0],
		e + r[0].length) : -1
	}
	function uv(t, n, e) {
		var r = Uy.exec(n.slice(e, e + 6));
		return r ? (t.L = Math.floor(r[0] / 1e3),
		e + r[0].length) : -1
	}
	function cv(t, n, e) {
		var r = Iy.exec(n.slice(e, e + 1));
		return r ? e + r[0].length : -1
	}
	function fv(t, n, e) {
		var r = Uy.exec(n.slice(e));
		return r ? (t.Q = +r[0],
		e + r[0].length) : -1
	}
	function sv(t, n, e) {
		var r = Uy.exec(n.slice(e));
		return r ? (t.s = +r[0],
		e + r[0].length) : -1
	}
	function lv(t, n) {
		return Yy(t.getDate(), n, 2)
	}
	function hv(t, n) {
		return Yy(t.getHours(), n, 2)
	}
	function dv(t, n) {
		return Yy(t.getHours() % 12 || 12, n, 2)
	}
	function pv(t, n) {
		return Yy(1 + kg.count(Wg(t), t), n, 3)
	}
	function gv(t, n) {
		return Yy(t.getMilliseconds(), n, 3)
	}
	function yv(t, n) {
		return gv(t, n) + "000"
	}
	function vv(t, n) {
		return Yy(t.getMonth() + 1, n, 2)
	}
	function _v(t, n) {
		return Yy(t.getMinutes(), n, 2)
	}
	function bv(t, n) {
		return Yy(t.getSeconds(), n, 2)
	}
	function mv(t) {
		var n = t.getDay();
		return 0 === n ? 7 : n
	}
	function xv(t, n) {
		return Yy(Pg.count(Wg(t) - 1, t), n, 2)
	}
	function wv(t) {
		var n = t.getDay();
		return n >= 4 || 0 === n ? Fg(t) : Fg.ceil(t)
	}
	function Mv(t, n) {
		return t = wv(t),
		Yy(Fg.count(Wg(t), t) + (4 === Wg(t).getDay()), n, 2)
	}
	function Av(t) {
		return t.getDay()
	}
	function Tv(t, n) {
		return Yy(zg.count(Wg(t) - 1, t), n, 2)
	}
	function Sv(t, n) {
		return Yy(t.getFullYear() % 100, n, 2)
	}
	function Ev(t, n) {
		return Yy((t = wv(t)).getFullYear() % 100, n, 2)
	}
	function kv(t, n) {
		return Yy(t.getFullYear() % 1e4, n, 4)
	}
	function Nv(t, n) {
		var e = t.getDay();
		return Yy((t = e >= 4 || 0 === e ? Fg(t) : Fg.ceil(t)).getFullYear() % 1e4, n, 4)
	}
	function Cv(t) {
		var n = t.getTimezoneOffset();
		return (n > 0 ? "-" : (n *= -1,
		"+")) + Yy(n / 60 | 0, "0", 2) + Yy(n % 60, "0", 2)
	}
	function Pv(t, n) {
		return Yy(t.getUTCDate(), n, 2)
	}
	function zv(t, n) {
		return Yy(t.getUTCHours(), n, 2)
	}
	function Dv(t, n) {
		return Yy(t.getUTCHours() % 12 || 12, n, 2)
	}
	function Rv(t, n) {
		return Yy(1 + iy.count(Ty(t), t), n, 3)
	}
	function Fv(t, n) {
		return Yy(t.getUTCMilliseconds(), n, 3)
	}
	function qv(t, n) {
		return Fv(t, n) + "000"
	}
	function Ov(t, n) {
		return Yy(t.getUTCMonth() + 1, n, 2)
	}
	function Uv(t, n) {
		return Yy(t.getUTCMinutes(), n, 2)
	}
	function Iv(t, n) {
		return Yy(t.getUTCSeconds(), n, 2)
	}
	function Bv(t) {
		var n = t.getUTCDay();
		return 0 === n ? 7 : n
	}
	function Yv(t, n) {
		return Yy(uy.count(Ty(t) - 1, t), n, 2)
	}
	function Lv(t) {
		var n = t.getUTCDay();
		return n >= 4 || 0 === n ? ly(t) : ly.ceil(t)
	}
	function jv(t, n) {
		return t = Lv(t),
		Yy(ly.count(Ty(t), t) + (4 === Ty(t).getUTCDay()), n, 2)
	}
	function Hv(t) {
		return t.getUTCDay()
	}
	function Xv(t, n) {
		return Yy(cy.count(Ty(t) - 1, t), n, 2)
	}
	function Gv(t, n) {
		return Yy(t.getUTCFullYear() % 100, n, 2)
	}
	function Vv(t, n) {
		return Yy((t = Lv(t)).getUTCFullYear() % 100, n, 2)
	}
	function $v(t, n) {
		return Yy(t.getUTCFullYear() % 1e4, n, 4)
	}
	function Wv(t, n) {
		var e = t.getUTCDay();
		return Yy((t = e >= 4 || 0 === e ? ly(t) : ly.ceil(t)).getUTCFullYear() % 1e4, n, 4)
	}
	function Zv() {
		return "+0000"
	}
	function Kv() {
		return "%"
	}
	function Qv(t) {
		return +t
	}
	function Jv(t) {
		return Math.floor(+t / 1e3)
	}
	function t_(n) {
		return qy = Fy(n),
		t.timeFormat = qy.format,
		t.timeParse = qy.parse,
		t.utcFormat = qy.utcFormat,
		t.utcParse = qy.utcParse,
		qy
	}
	t.timeFormat = void 0,
	t.timeParse = void 0,
	t.utcFormat = void 0,
	t.utcParse = void 0,
	t_({
		dateTime: "%x, %X",
		date: "%-m/%-d/%Y",
		time: "%-I:%M:%S %p",
		periods: ["AM", "PM"],
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});
	var n_ = "%Y-%m-%dT%H:%M:%S.%LZ";
	var e_ = Date.prototype.toISOString ? function(t) {
		return t.toISOString()
	}
	: t.utcFormat(n_)
	  , r_ = e_;
	var i_ = +new Date("2000-01-01T00:00:00.000Z") ? function(t) {
		var n = new Date(t);
		return isNaN(n) ? null : n
	}
	: t.utcParse(n_)
	  , o_ = i_;
	function a_(t) {
		return new Date(t)
	}
	function u_(t) {
		return t instanceof Date ? +t : +new Date(+t)
	}
	function c_(t, n, e, r, i, o, a, u, c, f) {
		var s = Up()
		  , l = s.invert
		  , h = s.domain
		  , d = f(".%L")
		  , p = f(":%S")
		  , g = f("%I:%M")
		  , y = f("%I %p")
		  , v = f("%a %d")
		  , _ = f("%b %d")
		  , b = f("%B")
		  , m = f("%Y");
		function x(t) {
			return (c(t) < t ? d : u(t) < t ? p : a(t) < t ? g : o(t) < t ? y : r(t) < t ? i(t) < t ? v : _ : e(t) < t ? b : m)(t)
		}
		return s.invert = function(t) {
			return new Date(l(t))
		}
		,
		s.domain = function(t) {
			return arguments.length ? h(Array.from(t, u_)) : h().map(a_)
		}
		,
		s.ticks = function(n) {
			var e = h();
			return t(e[0], e[e.length - 1], null == n ? 10 : n)
		}
		,
		s.tickFormat = function(t, n) {
			return null == n ? x : f(n)
		}
		,
		s.nice = function(t) {
			var e = h();
			return t && "function" == typeof t.range || (t = n(e[0], e[e.length - 1], null == t ? 10 : t)),
			t ? h(Yp(e, t)) : s
		}
		,
		s.copy = function() {
			return qp(s, c_(t, n, e, r, i, o, a, u, c, f))
		}
		,
		s
	}
	function f_() {
		var t, n, e, r, i, o = 0, a = 1, u = zp, c = !1;
		function f(n) {
			return null == n || isNaN(n = +n) ? i : u(0 === e ? .5 : (n = (r(n) - t) * e,
			c ? Math.max(0, Math.min(1, n)) : n))
		}
		function s(t) {
			return function(n) {
				var e, r;
				return arguments.length ? ([e,r] = n,
				u = t(e, r),
				f) : [u(0), u(1)]
			}
		}
		return f.domain = function(i) {
			return arguments.length ? ([o,a] = i,
			t = r(o = +o),
			n = r(a = +a),
			e = t === n ? 0 : 1 / (n - t),
			f) : [o, a]
		}
		,
		f.clamp = function(t) {
			return arguments.length ? (c = !!t,
			f) : c
		}
		,
		f.interpolator = function(t) {
			return arguments.length ? (u = t,
			f) : u
		}
		,
		f.range = s(Cr),
		f.rangeRound = s(Pr),
		f.unknown = function(t) {
			return arguments.length ? (i = t,
			f) : i
		}
		,
		function(i) {
			return r = i,
			t = i(o),
			n = i(a),
			e = t === n ? 0 : 1 / (n - t),
			f
		}
	}
	function s_(t, n) {
		return n.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())
	}
	function l_() {
		var t = ng(f_());
		return t.copy = function() {
			return s_(t, l_()).exponent(t.exponent())
		}
		,
		Tp.apply(t, arguments)
	}
	function h_() {
		var t, n, e, r, i, o, a, u = 0, c = .5, f = 1, s = 1, l = zp, h = !1;
		function d(t) {
			return isNaN(t = +t) ? a : (t = .5 + ((t = +o(t)) - n) * (s * t < s * n ? r : i),
			l(h ? Math.max(0, Math.min(1, t)) : t))
		}
		function p(t) {
			return function(n) {
				var e, r, i;
				return arguments.length ? ([e,r,i] = n,
				l = Zr(t, [e, r, i]),
				d) : [l(0), l(.5), l(1)]
			}
		}
		return d.domain = function(a) {
			return arguments.length ? ([u,c,f] = a,
			t = o(u = +u),
			n = o(c = +c),
			e = o(f = +f),
			r = t === n ? 0 : .5 / (n - t),
			i = n === e ? 0 : .5 / (e - n),
			s = n < t ? -1 : 1,
			d) : [u, c, f]
		}
		,
		d.clamp = function(t) {
			return arguments.length ? (h = !!t,
			d) : h
		}
		,
		d.interpolator = function(t) {
			return arguments.length ? (l = t,
			d) : l
		}
		,
		d.range = p(Cr),
		d.rangeRound = p(Pr),
		d.unknown = function(t) {
			return arguments.length ? (a = t,
			d) : a
		}
		,
		function(a) {
			return o = a,
			t = a(u),
			n = a(c),
			e = a(f),
			r = t === n ? 0 : .5 / (n - t),
			i = n === e ? 0 : .5 / (e - n),
			s = n < t ? -1 : 1,
			d
		}
	}
	function d_() {
		var t = ng(h_());
		return t.copy = function() {
			return s_(t, d_()).exponent(t.exponent())
		}
		,
		Tp.apply(t, arguments)
	}
	function p_(t) {
		for (var n = t.length / 6 | 0, e = new Array(n), r = 0; r < n; )
			e[r] = "#" + t.slice(6 * r, 6 * ++r);
		return e
	}
	var g_ = p_("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf")
	  , y_ = p_("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666")
	  , v_ = p_("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666")
	  , __ = p_("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928")
	  , b_ = p_("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2")
	  , m_ = p_("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc")
	  , x_ = p_("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999")
	  , w_ = p_("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3")
	  , M_ = p_("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f")
	  , A_ = p_("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab")
	  , T_ = t=>br(t[t.length - 1])
	  , S_ = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(p_)
	  , E_ = T_(S_)
	  , k_ = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(p_)
	  , N_ = T_(k_)
	  , C_ = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(p_)
	  , P_ = T_(C_)
	  , z_ = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(p_)
	  , D_ = T_(z_)
	  , R_ = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(p_)
	  , F_ = T_(R_)
	  , q_ = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(p_)
	  , O_ = T_(q_)
	  , U_ = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(p_)
	  , I_ = T_(U_)
	  , B_ = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(p_)
	  , Y_ = T_(B_)
	  , L_ = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(p_)
	  , j_ = T_(L_)
	  , H_ = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(p_)
	  , X_ = T_(H_)
	  , G_ = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(p_)
	  , V_ = T_(G_)
	  , $_ = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(p_)
	  , W_ = T_($_)
	  , Z_ = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(p_)
	  , K_ = T_(Z_)
	  , Q_ = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(p_)
	  , J_ = T_(Q_)
	  , tb = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(p_)
	  , nb = T_(tb)
	  , eb = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(p_)
	  , rb = T_(eb)
	  , ib = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(p_)
	  , ob = T_(ib)
	  , ab = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(p_)
	  , ub = T_(ab)
	  , cb = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(p_)
	  , fb = T_(cb)
	  , sb = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(p_)
	  , lb = T_(sb)
	  , hb = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(p_)
	  , db = T_(hb)
	  , pb = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(p_)
	  , gb = T_(pb)
	  , yb = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(p_)
	  , vb = T_(yb)
	  , _b = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(p_)
	  , bb = T_(_b)
	  , mb = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(p_)
	  , xb = T_(mb)
	  , wb = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(p_)
	  , Mb = T_(wb)
	  , Ab = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(p_)
	  , Tb = T_(Ab);
	var Sb = Wr(ur(300, .5, 0), ur(-240, .5, 1))
	  , Eb = Wr(ur(-100, .75, .35), ur(80, 1.5, .8))
	  , kb = Wr(ur(260, .75, .35), ur(80, 1.5, .8))
	  , Nb = ur();
	var Cb = Ae()
	  , Pb = Math.PI / 3
	  , zb = 2 * Math.PI / 3;
	function Db(t) {
		var n = t.length;
		return function(e) {
			return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]
		}
	}
	var Rb = Db(p_("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"))
	  , Fb = Db(p_("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"))
	  , qb = Db(p_("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"))
	  , Ob = Db(p_("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
	function Ub(t) {
		return function() {
			return t
		}
	}
	const Ib = Math.abs
	  , Bb = Math.atan2
	  , Yb = Math.cos
	  , Lb = Math.max
	  , jb = Math.min
	  , Hb = Math.sin
	  , Xb = Math.sqrt
	  , Gb = 1e-12
	  , Vb = Math.PI
	  , $b = Vb / 2
	  , Wb = 2 * Vb;
	function Zb(t) {
		return t > 1 ? 0 : t < -1 ? Vb : Math.acos(t)
	}
	function Kb(t) {
		return t >= 1 ? $b : t <= -1 ? -$b : Math.asin(t)
	}
	function Qb(t) {
		return t.innerRadius
	}
	function Jb(t) {
		return t.outerRadius
	}
	function tm(t) {
		return t.startAngle
	}
	function nm(t) {
		return t.endAngle
	}
	function em(t) {
		return t && t.padAngle
	}
	function rm(t, n, e, r, i, o, a, u) {
		var c = e - t
		  , f = r - n
		  , s = a - i
		  , l = u - o
		  , h = l * c - s * f;
		if (!(h * h < Gb))
			return [t + (h = (s * (n - o) - l * (t - i)) / h) * c, n + h * f]
	}
	function im(t, n, e, r, i, o, a) {
		var u = t - e
		  , c = n - r
		  , f = (a ? o : -o) / Xb(u * u + c * c)
		  , s = f * c
		  , l = -f * u
		  , h = t + s
		  , d = n + l
		  , p = e + s
		  , g = r + l
		  , y = (h + p) / 2
		  , v = (d + g) / 2
		  , _ = p - h
		  , b = g - d
		  , m = _ * _ + b * b
		  , x = i - o
		  , w = h * g - p * d
		  , M = (b < 0 ? -1 : 1) * Xb(Lb(0, x * x * m - w * w))
		  , A = (w * b - _ * M) / m
		  , T = (-w * _ - b * M) / m
		  , S = (w * b + _ * M) / m
		  , E = (-w * _ + b * M) / m
		  , k = A - y
		  , N = T - v
		  , C = S - y
		  , P = E - v;
		return k * k + N * N > C * C + P * P && (A = S,
		T = E),
		{
			cx: A,
			cy: T,
			x01: -s,
			y01: -l,
			x11: A * (i / x - 1),
			y11: T * (i / x - 1)
		}
	}
	var om = Array.prototype.slice;
	function am(t) {
		return "object" == typeof t && "length"in t ? t : Array.from(t)
	}
	function um(t) {
		this._context = t
	}
	function cm(t) {
		return new um(t)
	}
	function fm(t) {
		return t[0]
	}
	function sm(t) {
		return t[1]
	}
	function lm(t, n) {
		var e = Ub(!0)
		  , r = null
		  , i = cm
		  , o = null;
		function a(a) {
			var u, c, f, s = (a = am(a)).length, l = !1;
			for (null == r && (o = i(f = ya())),
			u = 0; u <= s; ++u)
				!(u < s && e(c = a[u], u, a)) === l && ((l = !l) ? o.lineStart() : o.lineEnd()),
				l && o.point(+t(c, u, a), +n(c, u, a));
			if (f)
				return o = null,
				f + "" || null
		}
		return t = "function" == typeof t ? t : void 0 === t ? fm : Ub(t),
		n = "function" == typeof n ? n : void 0 === n ? sm : Ub(n),
		a.x = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Ub(+n),
			a) : t
		}
		,
		a.y = function(t) {
			return arguments.length ? (n = "function" == typeof t ? t : Ub(+t),
			a) : n
		}
		,
		a.defined = function(t) {
			return arguments.length ? (e = "function" == typeof t ? t : Ub(!!t),
			a) : e
		}
		,
		a.curve = function(t) {
			return arguments.length ? (i = t,
			null != r && (o = i(r)),
			a) : i
		}
		,
		a.context = function(t) {
			return arguments.length ? (null == t ? r = o = null : o = i(r = t),
			a) : r
		}
		,
		a
	}
	function hm(t, n, e) {
		var r = null
		  , i = Ub(!0)
		  , o = null
		  , a = cm
		  , u = null;
		function c(c) {
			var f, s, l, h, d, p = (c = am(c)).length, g = !1, y = new Array(p), v = new Array(p);
			for (null == o && (u = a(d = ya())),
			f = 0; f <= p; ++f) {
				if (!(f < p && i(h = c[f], f, c)) === g)
					if (g = !g)
						s = f,
						u.areaStart(),
						u.lineStart();
					else {
						for (u.lineEnd(),
						u.lineStart(),
						l = f - 1; l >= s; --l)
							u.point(y[l], v[l]);
						u.lineEnd(),
						u.areaEnd()
					}
				g && (y[f] = +t(h, f, c),
				v[f] = +n(h, f, c),
				u.point(r ? +r(h, f, c) : y[f], e ? +e(h, f, c) : v[f]))
			}
			if (d)
				return u = null,
				d + "" || null
		}
		function f() {
			return lm().defined(i).curve(a).context(o)
		}
		return t = "function" == typeof t ? t : void 0 === t ? fm : Ub(+t),
		n = "function" == typeof n ? n : Ub(void 0 === n ? 0 : +n),
		e = "function" == typeof e ? e : void 0 === e ? sm : Ub(+e),
		c.x = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Ub(+n),
			r = null,
			c) : t
		}
		,
		c.x0 = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Ub(+n),
			c) : t
		}
		,
		c.x1 = function(t) {
			return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : Ub(+t),
			c) : r
		}
		,
		c.y = function(t) {
			return arguments.length ? (n = "function" == typeof t ? t : Ub(+t),
			e = null,
			c) : n
		}
		,
		c.y0 = function(t) {
			return arguments.length ? (n = "function" == typeof t ? t : Ub(+t),
			c) : n
		}
		,
		c.y1 = function(t) {
			return arguments.length ? (e = null == t ? null : "function" == typeof t ? t : Ub(+t),
			c) : e
		}
		,
		c.lineX0 = c.lineY0 = function() {
			return f().x(t).y(n)
		}
		,
		c.lineY1 = function() {
			return f().x(t).y(e)
		}
		,
		c.lineX1 = function() {
			return f().x(r).y(n)
		}
		,
		c.defined = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : Ub(!!t),
			c) : i
		}
		,
		c.curve = function(t) {
			return arguments.length ? (a = t,
			null != o && (u = a(o)),
			c) : a
		}
		,
		c.context = function(t) {
			return arguments.length ? (null == t ? o = u = null : u = a(o = t),
			c) : o
		}
		,
		c
	}
	function dm(t, n) {
		return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
	}
	function pm(t) {
		return t
	}
	um.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1,
				this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
				break;
			case 1:
				this._point = 2;
			default:
				this._context.lineTo(t, n)
			}
		}
	};
	var gm = vm(cm);
	function ym(t) {
		this._curve = t
	}
	function vm(t) {
		function n(n) {
			return new ym(t(n))
		}
		return n._curve = t,
		n
	}
	function _m(t) {
		var n = t.curve;
		return t.angle = t.x,
		delete t.x,
		t.radius = t.y,
		delete t.y,
		t.curve = function(t) {
			return arguments.length ? n(vm(t)) : n()._curve
		}
		,
		t
	}
	function bm() {
		return _m(lm().curve(gm))
	}
	function mm() {
		var t = hm().curve(gm)
		  , n = t.curve
		  , e = t.lineX0
		  , r = t.lineX1
		  , i = t.lineY0
		  , o = t.lineY1;
		return t.angle = t.x,
		delete t.x,
		t.startAngle = t.x0,
		delete t.x0,
		t.endAngle = t.x1,
		delete t.x1,
		t.radius = t.y,
		delete t.y,
		t.innerRadius = t.y0,
		delete t.y0,
		t.outerRadius = t.y1,
		delete t.y1,
		t.lineStartAngle = function() {
			return _m(e())
		}
		,
		delete t.lineX0,
		t.lineEndAngle = function() {
			return _m(r())
		}
		,
		delete t.lineX1,
		t.lineInnerRadius = function() {
			return _m(i())
		}
		,
		delete t.lineY0,
		t.lineOuterRadius = function() {
			return _m(o())
		}
		,
		delete t.lineY1,
		t.curve = function(t) {
			return arguments.length ? n(vm(t)) : n()._curve
		}
		,
		t
	}
	function xm(t, n) {
		return [(n = +n) * Math.cos(t -= Math.PI / 2), n * Math.sin(t)]
	}
	ym.prototype = {
		areaStart: function() {
			this._curve.areaStart()
		},
		areaEnd: function() {
			this._curve.areaEnd()
		},
		lineStart: function() {
			this._curve.lineStart()
		},
		lineEnd: function() {
			this._curve.lineEnd()
		},
		point: function(t, n) {
			this._curve.point(n * Math.sin(t), n * -Math.cos(t))
		}
	};
	class wm {
		constructor(t, n) {
			this._context = t,
			this._x = n
		}
		areaStart() {
			this._line = 0
		}
		areaEnd() {
			this._line = NaN
		}
		lineStart() {
			this._point = 0
		}
		lineEnd() {
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		}
		point(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1,
				this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
				break;
			case 1:
				this._point = 2;
			default:
				this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, n, t, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, t, this._y0, t, n)
			}
			this._x0 = t,
			this._y0 = n
		}
	}
	class Mm {
		constructor(t) {
			this._context = t
		}
		lineStart() {
			this._point = 0
		}
		lineEnd() {}
		point(t, n) {
			if (t = +t,
			n = +n,
			0 == this._point++)
				this._x0 = t,
				this._y0 = n;
			else {
				const e = xm(this._x0, this._y0)
				  , r = xm(this._x0, this._y0 = (this._y0 + n) / 2)
				  , i = xm(t, this._y0)
				  , o = xm(t, n);
				this._context.moveTo(...e),
				this._context.bezierCurveTo(...r, ...i, ...o)
			}
		}
	}
	function Am(t) {
		return new wm(t,!0)
	}
	function Tm(t) {
		return new wm(t,!1)
	}
	function Sm(t) {
		return new Mm(t)
	}
	function Em(t) {
		return t.source
	}
	function km(t) {
		return t.target
	}
	function Nm(t) {
		let n = Em
		  , e = km
		  , r = fm
		  , i = sm
		  , o = null
		  , a = null;
		function u() {
			let u;
			const c = om.call(arguments)
			  , f = n.apply(this, c)
			  , s = e.apply(this, c);
			if (null == o && (a = t(u = ya())),
			a.lineStart(),
			c[0] = f,
			a.point(+r.apply(this, c), +i.apply(this, c)),
			c[0] = s,
			a.point(+r.apply(this, c), +i.apply(this, c)),
			a.lineEnd(),
			u)
				return a = null,
				u + "" || null
		}
		return u.source = function(t) {
			return arguments.length ? (n = t,
			u) : n
		}
		,
		u.target = function(t) {
			return arguments.length ? (e = t,
			u) : e
		}
		,
		u.x = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : Ub(+t),
			u) : r
		}
		,
		u.y = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : Ub(+t),
			u) : i
		}
		,
		u.context = function(n) {
			return arguments.length ? (null == n ? o = a = null : a = t(o = n),
			u) : o
		}
		,
		u
	}
	const Cm = Xb(3);
	var Pm = {
		draw(t, n) {
			const e = .59436 * Xb(n + jb(n / 28, .75))
			  , r = e / 2
			  , i = r * Cm;
			t.moveTo(0, e),
			t.lineTo(0, -e),
			t.moveTo(-i, -r),
			t.lineTo(i, r),
			t.moveTo(-i, r),
			t.lineTo(i, -r)
		}
	}
	  , zm = {
		draw(t, n) {
			const e = Xb(n / Vb);
			t.moveTo(e, 0),
			t.arc(0, 0, e, 0, Wb)
		}
	}
	  , Dm = {
		draw(t, n) {
			const e = Xb(n / 5) / 2;
			t.moveTo(-3 * e, -e),
			t.lineTo(-e, -e),
			t.lineTo(-e, -3 * e),
			t.lineTo(e, -3 * e),
			t.lineTo(e, -e),
			t.lineTo(3 * e, -e),
			t.lineTo(3 * e, e),
			t.lineTo(e, e),
			t.lineTo(e, 3 * e),
			t.lineTo(-e, 3 * e),
			t.lineTo(-e, e),
			t.lineTo(-3 * e, e),
			t.closePath()
		}
	};
	const Rm = Xb(1 / 3)
	  , Fm = 2 * Rm;
	var qm = {
		draw(t, n) {
			const e = Xb(n / Fm)
			  , r = e * Rm;
			t.moveTo(0, -e),
			t.lineTo(r, 0),
			t.lineTo(0, e),
			t.lineTo(-r, 0),
			t.closePath()
		}
	}
	  , Om = {
		draw(t, n) {
			const e = .62625 * Xb(n);
			t.moveTo(0, -e),
			t.lineTo(e, 0),
			t.lineTo(0, e),
			t.lineTo(-e, 0),
			t.closePath()
		}
	}
	  , Um = {
		draw(t, n) {
			const e = .87559 * Xb(n - jb(n / 7, 2));
			t.moveTo(-e, 0),
			t.lineTo(e, 0),
			t.moveTo(0, e),
			t.lineTo(0, -e)
		}
	}
	  , Im = {
		draw(t, n) {
			const e = Xb(n)
			  , r = -e / 2;
			t.rect(r, r, e, e)
		}
	}
	  , Bm = {
		draw(t, n) {
			const e = .4431 * Xb(n);
			t.moveTo(e, e),
			t.lineTo(e, -e),
			t.lineTo(-e, -e),
			t.lineTo(-e, e),
			t.closePath()
		}
	};
	const Ym = Hb(Vb / 10) / Hb(7 * Vb / 10)
	  , Lm = Hb(Wb / 10) * Ym
	  , jm = -Yb(Wb / 10) * Ym;
	var Hm = {
		draw(t, n) {
			const e = Xb(.8908130915292852 * n)
			  , r = Lm * e
			  , i = jm * e;
			t.moveTo(0, -e),
			t.lineTo(r, i);
			for (let n = 1; n < 5; ++n) {
				const o = Wb * n / 5
				  , a = Yb(o)
				  , u = Hb(o);
				t.lineTo(u * e, -a * e),
				t.lineTo(a * r - u * i, u * r + a * i)
			}
			t.closePath()
		}
	};
	const Xm = Xb(3);
	var Gm = {
		draw(t, n) {
			const e = -Xb(n / (3 * Xm));
			t.moveTo(0, 2 * e),
			t.lineTo(-Xm * e, -e),
			t.lineTo(Xm * e, -e),
			t.closePath()
		}
	};
	const Vm = Xb(3);
	var $m = {
		draw(t, n) {
			const e = .6824 * Xb(n)
			  , r = e / 2
			  , i = e * Vm / 2;
			t.moveTo(0, -e),
			t.lineTo(i, r),
			t.lineTo(-i, r),
			t.closePath()
		}
	};
	const Wm = -.5
	  , Zm = Xb(3) / 2
	  , Km = 1 / Xb(12)
	  , Qm = 3 * (Km / 2 + 1);
	var Jm = {
		draw(t, n) {
			const e = Xb(n / Qm)
			  , r = e / 2
			  , i = e * Km
			  , o = r
			  , a = e * Km + e
			  , u = -o
			  , c = a;
			t.moveTo(r, i),
			t.lineTo(o, a),
			t.lineTo(u, c),
			t.lineTo(Wm * r - Zm * i, Zm * r + Wm * i),
			t.lineTo(Wm * o - Zm * a, Zm * o + Wm * a),
			t.lineTo(Wm * u - Zm * c, Zm * u + Wm * c),
			t.lineTo(Wm * r + Zm * i, Wm * i - Zm * r),
			t.lineTo(Wm * o + Zm * a, Wm * a - Zm * o),
			t.lineTo(Wm * u + Zm * c, Wm * c - Zm * u),
			t.closePath()
		}
	}
	  , tx = {
		draw(t, n) {
			const e = .6189 * Xb(n - jb(n / 6, 1.7));
			t.moveTo(-e, -e),
			t.lineTo(e, e),
			t.moveTo(-e, e),
			t.lineTo(e, -e)
		}
	};
	const nx = [zm, Dm, qm, Im, Hm, Gm, Jm]
	  , ex = [zm, Um, tx, $m, Pm, Bm, Om];
	function rx() {}
	function ix(t, n, e) {
		t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + e) / 6)
	}
	function ox(t) {
		this._context = t
	}
	function ax(t) {
		this._context = t
	}
	function ux(t) {
		this._context = t
	}
	function cx(t, n) {
		this._basis = new ox(t),
		this._beta = n
	}
	ox.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._y0 = this._y1 = NaN,
			this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
			case 3:
				ix(this, this._x1, this._y1);
			case 2:
				this._context.lineTo(this._x1, this._y1)
			}
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1,
				this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3,
				this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default:
				ix(this, t, n)
			}
			this._x0 = this._x1,
			this._x1 = t,
			this._y0 = this._y1,
			this._y1 = n
		}
	},
	ax.prototype = {
		areaStart: rx,
		areaEnd: rx,
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN,
			this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2),
				this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3),
				this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3),
				this._context.closePath();
				break;
			case 3:
				this.point(this._x2, this._y2),
				this.point(this._x3, this._y3),
				this.point(this._x4, this._y4)
			}
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1,
				this._x2 = t,
				this._y2 = n;
				break;
			case 1:
				this._point = 2,
				this._x3 = t,
				this._y3 = n;
				break;
			case 2:
				this._point = 3,
				this._x4 = t,
				this._y4 = n,
				this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
				break;
			default:
				ix(this, t, n)
			}
			this._x0 = this._x1,
			this._x1 = t,
			this._y0 = this._y1,
			this._y1 = n
		}
	},
	ux.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._y0 = this._y1 = NaN,
			this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var e = (this._x0 + 4 * this._x1 + t) / 6
				  , r = (this._y0 + 4 * this._y1 + n) / 6;
				this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
				break;
			case 3:
				this._point = 4;
			default:
				ix(this, t, n)
			}
			this._x0 = this._x1,
			this._x1 = t,
			this._y0 = this._y1,
			this._y1 = n
		}
	},
	cx.prototype = {
		lineStart: function() {
			this._x = [],
			this._y = [],
			this._basis.lineStart()
		},
		lineEnd: function() {
			var t = this._x
			  , n = this._y
			  , e = t.length - 1;
			if (e > 0)
				for (var r, i = t[0], o = n[0], a = t[e] - i, u = n[e] - o, c = -1; ++c <= e; )
					r = c / e,
					this._basis.point(this._beta * t[c] + (1 - this._beta) * (i + r * a), this._beta * n[c] + (1 - this._beta) * (o + r * u));
			this._x = this._y = null,
			this._basis.lineEnd()
		},
		point: function(t, n) {
			this._x.push(+t),
			this._y.push(+n)
		}
	};
	var fx = function t(n) {
		function e(t) {
			return 1 === n ? new ox(t) : new cx(t,n)
		}
		return e.beta = function(n) {
			return t(+n)
		}
		,
		e
	}(.85);
	function sx(t, n, e) {
		t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e), t._x2, t._y2)
	}
	function lx(t, n) {
		this._context = t,
		this._k = (1 - n) / 6
	}
	lx.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
			this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				sx(this, this._x1, this._y1)
			}
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1,
				this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
				break;
			case 1:
				this._point = 2,
				this._x1 = t,
				this._y1 = n;
				break;
			case 2:
				this._point = 3;
			default:
				sx(this, t, n)
			}
			this._x0 = this._x1,
			this._x1 = this._x2,
			this._x2 = t,
			this._y0 = this._y1,
			this._y1 = this._y2,
			this._y2 = n
		}
	};
	var hx = function t(n) {
		function e(t) {
			return new lx(t,n)
		}
		return e.tension = function(n) {
			return t(+n)
		}
		,
		e
	}(0);
	function dx(t, n) {
		this._context = t,
		this._k = (1 - n) / 6
	}
	dx.prototype = {
		areaStart: rx,
		areaEnd: rx,
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN,
			this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3),
				this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3),
				this._context.closePath();
				break;
			case 3:
				this.point(this._x3, this._y3),
				this.point(this._x4, this._y4),
				this.point(this._x5, this._y5)
			}
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1,
				this._x3 = t,
				this._y3 = n;
				break;
			case 1:
				this._point = 2,
				this._context.moveTo(this._x4 = t, this._y4 = n);
				break;
			case 2:
				this._point = 3,
				this._x5 = t,
				this._y5 = n;
				break;
			default:
				sx(this, t, n)
			}
			this._x0 = this._x1,
			this._x1 = this._x2,
			this._x2 = t,
			this._y0 = this._y1,
			this._y1 = this._y2,
			this._y2 = n
		}
	};
	var px = function t(n) {
		function e(t) {
			return new dx(t,n)
		}
		return e.tension = function(n) {
			return t(+n)
		}
		,
		e
	}(0);
	function gx(t, n) {
		this._context = t,
		this._k = (1 - n) / 6
	}
	gx.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
			this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3,
				this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3:
				this._point = 4;
			default:
				sx(this, t, n)
			}
			this._x0 = this._x1,
			this._x1 = this._x2,
			this._x2 = t,
			this._y0 = this._y1,
			this._y1 = this._y2,
			this._y2 = n
		}
	};
	var yx = function t(n) {
		function e(t) {
			return new gx(t,n)
		}
		return e.tension = function(n) {
			return t(+n)
		}
		,
		e
	}(0);
	function vx(t, n, e) {
		var r = t._x1
		  , i = t._y1
		  , o = t._x2
		  , a = t._y2;
		if (t._l01_a > Gb) {
			var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a
			  , c = 3 * t._l01_a * (t._l01_a + t._l12_a);
			r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c,
			i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c
		}
		if (t._l23_a > Gb) {
			var f = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a
			  , s = 3 * t._l23_a * (t._l23_a + t._l12_a);
			o = (o * f + t._x1 * t._l23_2a - n * t._l12_2a) / s,
			a = (a * f + t._y1 * t._l23_2a - e * t._l12_2a) / s
		}
		t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2)
	}
	function _x(t, n) {
		this._context = t,
		this._alpha = n
	}
	_x.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
			this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				this.point(this._x2, this._y2)
			}
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			if (t = +t,
			n = +n,
			this._point) {
				var e = this._x2 - t
				  , r = this._y2 - n;
				this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
			}
			switch (this._point) {
			case 0:
				this._point = 1,
				this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
			default:
				vx(this, t, n)
			}
			this._l01_a = this._l12_a,
			this._l12_a = this._l23_a,
			this._l01_2a = this._l12_2a,
			this._l12_2a = this._l23_2a,
			this._x0 = this._x1,
			this._x1 = this._x2,
			this._x2 = t,
			this._y0 = this._y1,
			this._y1 = this._y2,
			this._y2 = n
		}
	};
	var bx = function t(n) {
		function e(t) {
			return n ? new _x(t,n) : new lx(t,0)
		}
		return e.alpha = function(n) {
			return t(+n)
		}
		,
		e
	}(.5);
	function mx(t, n) {
		this._context = t,
		this._alpha = n
	}
	mx.prototype = {
		areaStart: rx,
		areaEnd: rx,
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN,
			this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3),
				this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3),
				this._context.closePath();
				break;
			case 3:
				this.point(this._x3, this._y3),
				this.point(this._x4, this._y4),
				this.point(this._x5, this._y5)
			}
		},
		point: function(t, n) {
			if (t = +t,
			n = +n,
			this._point) {
				var e = this._x2 - t
				  , r = this._y2 - n;
				this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
			}
			switch (this._point) {
			case 0:
				this._point = 1,
				this._x3 = t,
				this._y3 = n;
				break;
			case 1:
				this._point = 2,
				this._context.moveTo(this._x4 = t, this._y4 = n);
				break;
			case 2:
				this._point = 3,
				this._x5 = t,
				this._y5 = n;
				break;
			default:
				vx(this, t, n)
			}
			this._l01_a = this._l12_a,
			this._l12_a = this._l23_a,
			this._l01_2a = this._l12_2a,
			this._l12_2a = this._l23_2a,
			this._x0 = this._x1,
			this._x1 = this._x2,
			this._x2 = t,
			this._y0 = this._y1,
			this._y1 = this._y2,
			this._y2 = n
		}
	};
	var xx = function t(n) {
		function e(t) {
			return n ? new mx(t,n) : new dx(t,0)
		}
		return e.alpha = function(n) {
			return t(+n)
		}
		,
		e
	}(.5);
	function wx(t, n) {
		this._context = t,
		this._alpha = n
	}
	wx.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
			this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			if (t = +t,
			n = +n,
			this._point) {
				var e = this._x2 - t
				  , r = this._y2 - n;
				this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
			}
			switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3,
				this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3:
				this._point = 4;
			default:
				vx(this, t, n)
			}
			this._l01_a = this._l12_a,
			this._l12_a = this._l23_a,
			this._l01_2a = this._l12_2a,
			this._l12_2a = this._l23_2a,
			this._x0 = this._x1,
			this._x1 = this._x2,
			this._x2 = t,
			this._y0 = this._y1,
			this._y1 = this._y2,
			this._y2 = n
		}
	};
	var Mx = function t(n) {
		function e(t) {
			return n ? new wx(t,n) : new gx(t,0)
		}
		return e.alpha = function(n) {
			return t(+n)
		}
		,
		e
	}(.5);
	function Ax(t) {
		this._context = t
	}
	function Tx(t) {
		return t < 0 ? -1 : 1
	}
	function Sx(t, n, e) {
		var r = t._x1 - t._x0
		  , i = n - t._x1
		  , o = (t._y1 - t._y0) / (r || i < 0 && -0)
		  , a = (e - t._y1) / (i || r < 0 && -0)
		  , u = (o * i + a * r) / (r + i);
		return (Tx(o) + Tx(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
	}
	function Ex(t, n) {
		var e = t._x1 - t._x0;
		return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n
	}
	function kx(t, n, e) {
		var r = t._x0
		  , i = t._y0
		  , o = t._x1
		  , a = t._y1
		  , u = (o - r) / 3;
		t._context.bezierCurveTo(r + u, i + u * n, o - u, a - u * e, o, a)
	}
	function Nx(t) {
		this._context = t
	}
	function Cx(t) {
		this._context = new Px(t)
	}
	function Px(t) {
		this._context = t
	}
	function zx(t) {
		this._context = t
	}
	function Dx(t) {
		var n, e, r = t.length - 1, i = new Array(r), o = new Array(r), a = new Array(r);
		for (i[0] = 0,
		o[0] = 2,
		a[0] = t[0] + 2 * t[1],
		n = 1; n < r - 1; ++n)
			i[n] = 1,
			o[n] = 4,
			a[n] = 4 * t[n] + 2 * t[n + 1];
		for (i[r - 1] = 2,
		o[r - 1] = 7,
		a[r - 1] = 8 * t[r - 1] + t[r],
		n = 1; n < r; ++n)
			e = i[n] / o[n - 1],
			o[n] -= e,
			a[n] -= e * a[n - 1];
		for (i[r - 1] = a[r - 1] / o[r - 1],
		n = r - 2; n >= 0; --n)
			i[n] = (a[n] - i[n + 1]) / o[n];
		for (o[r - 1] = (t[r] + i[r - 1]) / 2,
		n = 0; n < r - 1; ++n)
			o[n] = 2 * t[n + 1] - i[n + 1];
		return [i, o]
	}
	function Rx(t, n) {
		this._context = t,
		this._t = n
	}
	function Fx(t, n) {
		if ((i = t.length) > 1)
			for (var e, r, i, o = 1, a = t[n[0]], u = a.length; o < i; ++o)
				for (r = a,
				a = t[n[o]],
				e = 0; e < u; ++e)
					a[e][1] += a[e][0] = isNaN(r[e][1]) ? r[e][0] : r[e][1]
	}
	function qx(t) {
		for (var n = t.length, e = new Array(n); --n >= 0; )
			e[n] = n;
		return e
	}
	function Ox(t, n) {
		return t[n]
	}
	function Ux(t) {
		const n = [];
		return n.key = t,
		n
	}
	function Ix(t) {
		var n = t.map(Bx);
		return qx(t).sort((function(t, e) {
			return n[t] - n[e]
		}
		))
	}
	function Bx(t) {
		for (var n, e = -1, r = 0, i = t.length, o = -1 / 0; ++e < i; )
			(n = +t[e][1]) > o && (o = n,
			r = e);
		return r
	}
	function Yx(t) {
		var n = t.map(Lx);
		return qx(t).sort((function(t, e) {
			return n[t] - n[e]
		}
		))
	}
	function Lx(t) {
		for (var n, e = 0, r = -1, i = t.length; ++r < i; )
			(n = +t[r][1]) && (e += n);
		return e
	}
	Ax.prototype = {
		areaStart: rx,
		areaEnd: rx,
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			this._point && this._context.closePath()
		},
		point: function(t, n) {
			t = +t,
			n = +n,
			this._point ? this._context.lineTo(t, n) : (this._point = 1,
			this._context.moveTo(t, n))
		}
	},
	Nx.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN,
			this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3:
				kx(this, this._t0, Ex(this, this._t0))
			}
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
			this._line = 1 - this._line
		},
		point: function(t, n) {
			var e = NaN;
			if (n = +n,
			(t = +t) !== this._x1 || n !== this._y1) {
				switch (this._point) {
				case 0:
					this._point = 1,
					this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3,
					kx(this, Ex(this, e = Sx(this, t, n)), e);
					break;
				default:
					kx(this, this._t0, e = Sx(this, t, n))
				}
				this._x0 = this._x1,
				this._x1 = t,
				this._y0 = this._y1,
				this._y1 = n,
				this._t0 = e
			}
		}
	},
	(Cx.prototype = Object.create(Nx.prototype)).point = function(t, n) {
		Nx.prototype.point.call(this, n, t)
	}
	,
	Px.prototype = {
		moveTo: function(t, n) {
			this._context.moveTo(n, t)
		},
		closePath: function() {
			this._context.closePath()
		},
		lineTo: function(t, n) {
			this._context.lineTo(n, t)
		},
		bezierCurveTo: function(t, n, e, r, i, o) {
			this._context.bezierCurveTo(n, t, r, e, o, i)
		}
	},
	zx.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x = [],
			this._y = []
		},
		lineEnd: function() {
			var t = this._x
			  , n = this._y
			  , e = t.length;
			if (e)
				if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]),
				2 === e)
					this._context.lineTo(t[1], n[1]);
				else
					for (var r = Dx(t), i = Dx(n), o = 0, a = 1; a < e; ++o,
					++a)
						this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[a], n[a]);
			(this._line || 0 !== this._line && 1 === e) && this._context.closePath(),
			this._line = 1 - this._line,
			this._x = this._y = null
		},
		point: function(t, n) {
			this._x.push(+t),
			this._y.push(+n)
		}
	},
	Rx.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x = this._y = NaN,
			this._point = 0
		},
		lineEnd: function() {
			0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y),
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
			this._line >= 0 && (this._t = 1 - this._t,
			this._line = 1 - this._line)
		},
		point: function(t, n) {
			switch (t = +t,
			n = +n,
			this._point) {
			case 0:
				this._point = 1,
				this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
				break;
			case 1:
				this._point = 2;
			default:
				if (this._t <= 0)
					this._context.lineTo(this._x, n),
					this._context.lineTo(t, n);
				else {
					var e = this._x * (1 - this._t) + t * this._t;
					this._context.lineTo(e, this._y),
					this._context.lineTo(e, n)
				}
			}
			this._x = t,
			this._y = n
		}
	};
	var jx = t=>()=>t;
	function Hx(t, {sourceEvent: n, target: e, transform: r, dispatch: i}) {
		Object.defineProperties(this, {
			type: {
				value: t,
				enumerable: !0,
				configurable: !0
			},
			sourceEvent: {
				value: n,
				enumerable: !0,
				configurable: !0
			},
			target: {
				value: e,
				enumerable: !0,
				configurable: !0
			},
			transform: {
				value: r,
				enumerable: !0,
				configurable: !0
			},
			_: {
				value: i
			}
		})
	}
	function Xx(t, n, e) {
		this.k = t,
		this.x = n,
		this.y = e
	}
	Xx.prototype = {
		constructor: Xx,
		scale: function(t) {
			return 1 === t ? this : new Xx(this.k * t,this.x,this.y)
		},
		translate: function(t, n) {
			return 0 === t & 0 === n ? this : new Xx(this.k,this.x + this.k * t,this.y + this.k * n)
		},
		apply: function(t) {
			return [t[0] * this.k + this.x, t[1] * this.k + this.y]
		},
		applyX: function(t) {
			return t * this.k + this.x
		},
		applyY: function(t) {
			return t * this.k + this.y
		},
		invert: function(t) {
			return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
		},
		invertX: function(t) {
			return (t - this.x) / this.k
		},
		invertY: function(t) {
			return (t - this.y) / this.k
		},
		rescaleX: function(t) {
			return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
		},
		rescaleY: function(t) {
			return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
		},
		toString: function() {
			return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
		}
	};
	var Gx = new Xx(1,0,0);
	function Vx(t) {
		for (; !t.__zoom; )
			if (!(t = t.parentNode))
				return Gx;
		return t.__zoom
	}
	function $x(t) {
		t.stopImmediatePropagation()
	}
	function Wx(t) {
		t.preventDefault(),
		t.stopImmediatePropagation()
	}
	function Zx(t) {
		return !(t.ctrlKey && "wheel" !== t.type || t.button)
	}
	function Kx() {
		var t = this;
		return t instanceof SVGElement ? (t = t.ownerSVGElement || t).hasAttribute("viewBox") ? [[(t = t.viewBox.baseVal).x, t.y], [t.x + t.width, t.y + t.height]] : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]] : [[0, 0], [t.clientWidth, t.clientHeight]]
	}
	function Qx() {
		return this.__zoom || Gx
	}
	function Jx(t) {
		return -t.deltaY * (1 === t.deltaMode ? .05 : t.deltaMode ? 1 : .002) * (t.ctrlKey ? 10 : 1)
	}
	function tw() {
		return navigator.maxTouchPoints || "ontouchstart"in this
	}
	function nw(t, n, e) {
		var r = t.invertX(n[0][0]) - e[0][0]
		  , i = t.invertX(n[1][0]) - e[1][0]
		  , o = t.invertY(n[0][1]) - e[0][1]
		  , a = t.invertY(n[1][1]) - e[1][1];
		return t.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a))
	}
	Vx.prototype = Xx.prototype,
	t.Adder = y,
	t.Delaunay = gu,
	t.FormatSpecifier = xc,
	t.InternMap = InternMap,
	t.InternSet = InternSet,
	t.Node = pd,
	t.Voronoi = fu,
	t.ZoomTransform = Xx,
	t.active = function(t, n) {
		var e, r, i = t.__transition;
		if (i)
			for (r in n = null == n ? null : n + "",
			i)
				if ((e = i[r]).state > 1 && e.name === n)
					return new Zi([[t]],To,n,+r);
		return null
	}
	,
	t.arc = function() {
		var t = Qb
		  , n = Jb
		  , e = Ub(0)
		  , r = null
		  , i = tm
		  , o = nm
		  , a = em
		  , u = null;
		function c() {
			var c, f, s = +t.apply(this, arguments), l = +n.apply(this, arguments), h = i.apply(this, arguments) - $b, d = o.apply(this, arguments) - $b, p = Ib(d - h), g = d > h;
			if (u || (u = c = ya()),
			l < s && (f = l,
			l = s,
			s = f),
			l > Gb)
				if (p > Wb - Gb)
					u.moveTo(l * Yb(h), l * Hb(h)),
					u.arc(0, 0, l, h, d, !g),
					s > Gb && (u.moveTo(s * Yb(d), s * Hb(d)),
					u.arc(0, 0, s, d, h, g));
				else {
					var y, v, _ = h, b = d, m = h, x = d, w = p, M = p, A = a.apply(this, arguments) / 2, T = A > Gb && (r ? +r.apply(this, arguments) : Xb(s * s + l * l)), S = jb(Ib(l - s) / 2, +e.apply(this, arguments)), E = S, k = S;
					if (T > Gb) {
						var N = Kb(T / s * Hb(A))
						  , C = Kb(T / l * Hb(A));
						(w -= 2 * N) > Gb ? (m += N *= g ? 1 : -1,
						x -= N) : (w = 0,
						m = x = (h + d) / 2),
						(M -= 2 * C) > Gb ? (_ += C *= g ? 1 : -1,
						b -= C) : (M = 0,
						_ = b = (h + d) / 2)
					}
					var P = l * Yb(_)
					  , z = l * Hb(_)
					  , D = s * Yb(x)
					  , R = s * Hb(x);
					if (S > Gb) {
						var F, q = l * Yb(b), O = l * Hb(b), U = s * Yb(m), I = s * Hb(m);
						if (p < Vb && (F = rm(P, z, U, I, q, O, D, R))) {
							var B = P - F[0]
							  , Y = z - F[1]
							  , L = q - F[0]
							  , j = O - F[1]
							  , H = 1 / Hb(Zb((B * L + Y * j) / (Xb(B * B + Y * Y) * Xb(L * L + j * j))) / 2)
							  , X = Xb(F[0] * F[0] + F[1] * F[1]);
							E = jb(S, (s - X) / (H - 1)),
							k = jb(S, (l - X) / (H + 1))
						}
					}
					M > Gb ? k > Gb ? (y = im(U, I, P, z, l, k, g),
					v = im(q, O, D, R, l, k, g),
					u.moveTo(y.cx + y.x01, y.cy + y.y01),
					k < S ? u.arc(y.cx, y.cy, k, Bb(y.y01, y.x01), Bb(v.y01, v.x01), !g) : (u.arc(y.cx, y.cy, k, Bb(y.y01, y.x01), Bb(y.y11, y.x11), !g),
					u.arc(0, 0, l, Bb(y.cy + y.y11, y.cx + y.x11), Bb(v.cy + v.y11, v.cx + v.x11), !g),
					u.arc(v.cx, v.cy, k, Bb(v.y11, v.x11), Bb(v.y01, v.x01), !g))) : (u.moveTo(P, z),
					u.arc(0, 0, l, _, b, !g)) : u.moveTo(P, z),
					s > Gb && w > Gb ? E > Gb ? (y = im(D, R, q, O, s, -E, g),
					v = im(P, z, U, I, s, -E, g),
					u.lineTo(y.cx + y.x01, y.cy + y.y01),
					E < S ? u.arc(y.cx, y.cy, E, Bb(y.y01, y.x01), Bb(v.y01, v.x01), !g) : (u.arc(y.cx, y.cy, E, Bb(y.y01, y.x01), Bb(y.y11, y.x11), !g),
					u.arc(0, 0, s, Bb(y.cy + y.y11, y.cx + y.x11), Bb(v.cy + v.y11, v.cx + v.x11), g),
					u.arc(v.cx, v.cy, E, Bb(v.y11, v.x11), Bb(v.y01, v.x01), !g))) : u.arc(0, 0, s, x, m, g) : u.lineTo(D, R)
				}
			else
				u.moveTo(0, 0);
			if (u.closePath(),
			c)
				return u = null,
				c + "" || null
		}
		return c.centroid = function() {
			var e = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2
			  , r = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Vb / 2;
			return [Yb(r) * e, Hb(r) * e]
		}
		,
		c.innerRadius = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Ub(+n),
			c) : t
		}
		,
		c.outerRadius = function(t) {
			return arguments.length ? (n = "function" == typeof t ? t : Ub(+t),
			c) : n
		}
		,
		c.cornerRadius = function(t) {
			return arguments.length ? (e = "function" == typeof t ? t : Ub(+t),
			c) : e
		}
		,
		c.padRadius = function(t) {
			return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : Ub(+t),
			c) : r
		}
		,
		c.startAngle = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : Ub(+t),
			c) : i
		}
		,
		c.endAngle = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : Ub(+t),
			c) : o
		}
		,
		c.padAngle = function(t) {
			return arguments.length ? (a = "function" == typeof t ? t : Ub(+t),
			c) : a
		}
		,
		c.context = function(t) {
			return arguments.length ? (u = null == t ? null : t,
			c) : u
		}
		,
		c
	}
	,
	t.area = hm,
	t.areaRadial = mm,
	t.ascending = n,
	t.autoType = function(t) {
		for (var n in t) {
			var e, r, i = t[n].trim();
			if (i)
				if ("true" === i)
					i = !0;
				else if ("false" === i)
					i = !1;
				else if ("NaN" === i)
					i = NaN;
				else if (isNaN(e = +i)) {
					if (!(r = i.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)))
						continue;
					Iu && r[4] && !r[7] && (i = i.replace(/-/g, "/").replace(/T/, " ")),
					i = new Date(i)
				} else
					i = e;
			else
				i = null;
			t[n] = i
		}
		return t
	}
	,
	t.axisBottom = function(t) {
		return yt(3, t)
	}
	,
	t.axisLeft = function(t) {
		return yt(4, t)
	}
	,
	t.axisRight = function(t) {
		return yt(2, t)
	}
	,
	t.axisTop = function(t) {
		return yt(1, t)
	}
	,
	t.bin = j,
	t.bisect = c,
	t.bisectCenter = u,
	t.bisectLeft = a,
	t.bisectRight = o,
	t.bisector = e,
	t.blob = function(t, n) {
		return fetch(t, n).then(Bu)
	}
	,
	t.brush = function() {
		return Jo(Yo)
	}
	,
	t.brushSelection = function(t) {
		var n = t.__brush;
		return n ? n.dim.output(n.selection) : null
	}
	,
	t.brushX = function() {
		return Jo(Io)
	}
	,
	t.brushY = function() {
		return Jo(Bo)
	}
	,
	t.buffer = function(t, n) {
		return fetch(t, n).then(Yu)
	}
	,
	t.chord = function() {
		return sa(!1, !1)
	}
	,
	t.chordDirected = function() {
		return sa(!0, !1)
	}
	,
	t.chordTranspose = function() {
		return sa(!1, !0)
	}
	,
	t.cluster = function() {
		var t = od
		  , n = 1
		  , e = 1
		  , r = !1;
		function i(i) {
			var o, a = 0;
			i.eachAfter((function(n) {
				var e = n.children;
				e ? (n.x = function(t) {
					return t.reduce(ad, 0) / t.length
				}(e),
				n.y = function(t) {
					return 1 + t.reduce(ud, 0)
				}(e)) : (n.x = o ? a += t(n, o) : 0,
				n.y = 0,
				o = n)
			}
			));
			var u = function(t) {
				for (var n; n = t.children; )
					t = n[0];
				return t
			}(i)
			  , c = function(t) {
				for (var n; n = t.children; )
					t = n[n.length - 1];
				return t
			}(i)
			  , f = u.x - t(u, c) / 2
			  , s = c.x + t(c, u) / 2;
			return i.eachAfter(r ? function(t) {
				t.x = (t.x - i.x) * n,
				t.y = (i.y - t.y) * e
			}
			: function(t) {
				t.x = (t.x - f) / (s - f) * n,
				t.y = (1 - (i.y ? t.y / i.y : 1)) * e
			}
			)
		}
		return i.separation = function(n) {
			return arguments.length ? (t = n,
			i) : t
		}
		,
		i.size = function(t) {
			return arguments.length ? (r = !1,
			n = +t[0],
			e = +t[1],
			i) : r ? null : [n, e]
		}
		,
		i.nodeSize = function(t) {
			return arguments.length ? (r = !0,
			n = +t[0],
			e = +t[1],
			i) : r ? [n, e] : null
		}
		,
		i
	}
	,
	t.color = me,
	t.contourDensity = function() {
		var t = Ua
		  , n = Ia
		  , e = Ba
		  , r = 960
		  , i = 500
		  , o = 20
		  , a = 2
		  , u = 3 * o
		  , c = r + 2 * u >> a
		  , f = i + 2 * u >> a
		  , s = Na(20);
		function l(r) {
			var i = new Float32Array(c * f)
			  , l = new Float32Array(c * f)
			  , d = Math.pow(2, -a);
			r.forEach((function(r, o, a) {
				var s = (t(r, o, a) + u) * d
				  , l = (n(r, o, a) + u) * d
				  , h = +e(r, o, a);
				if (s >= 0 && s < c && l >= 0 && l < f) {
					var p = Math.floor(s)
					  , g = Math.floor(l)
					  , y = s - p - .5
					  , v = l - g - .5;
					i[p + g * c] += (1 - y) * (1 - v) * h,
					i[p + 1 + g * c] += y * (1 - v) * h,
					i[p + 1 + (g + 1) * c] += y * v * h,
					i[p + (g + 1) * c] += (1 - y) * v * h
				}
			}
			)),
			qa({
				width: c,
				height: f,
				data: i
			}, {
				width: c,
				height: f,
				data: l
			}, o >> a),
			Oa({
				width: c,
				height: f,
				data: l
			}, {
				width: c,
				height: f,
				data: i
			}, o >> a),
			qa({
				width: c,
				height: f,
				data: i
			}, {
				width: c,
				height: f,
				data: l
			}, o >> a),
			Oa({
				width: c,
				height: f,
				data: l
			}, {
				width: c,
				height: f,
				data: i
			}, o >> a),
			qa({
				width: c,
				height: f,
				data: i
			}, {
				width: c,
				height: f,
				data: l
			}, o >> a),
			Oa({
				width: c,
				height: f,
				data: l
			}, {
				width: c,
				height: f,
				data: i
			}, o >> a);
			var p = s(i);
			if (!Array.isArray(p)) {
				var g = H(i);
				p = B(0, g, p),
				(p = tt(0, Math.floor(g / p) * p, p)).shift()
			}
			return Fa().thresholds(p).size([c, f])(i).map(h)
		}
		function h(t) {
			return t.value *= Math.pow(2, -2 * a),
			t.coordinates.forEach(d),
			t
		}
		function d(t) {
			t.forEach(p)
		}
		function p(t) {
			t.forEach(g)
		}
		function g(t) {
			t[0] = t[0] * Math.pow(2, a) - u,
			t[1] = t[1] * Math.pow(2, a) - u
		}
		function y() {
			return c = r + 2 * (u = 3 * o) >> a,
			f = i + 2 * u >> a,
			l
		}
		return l.x = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Na(+n),
			l) : t
		}
		,
		l.y = function(t) {
			return arguments.length ? (n = "function" == typeof t ? t : Na(+t),
			l) : n
		}
		,
		l.weight = function(t) {
			return arguments.length ? (e = "function" == typeof t ? t : Na(+t),
			l) : e
		}
		,
		l.size = function(t) {
			if (!arguments.length)
				return [r, i];
			var n = +t[0]
			  , e = +t[1];
			if (!(n >= 0 && e >= 0))
				throw new Error("invalid size");
			return r = n,
			i = e,
			y()
		}
		,
		l.cellSize = function(t) {
			if (!arguments.length)
				return 1 << a;
			if (!((t = +t) >= 1))
				throw new Error("invalid cell size");
			return a = Math.floor(Math.log(t) / Math.LN2),
			y()
		}
		,
		l.thresholds = function(t) {
			return arguments.length ? (s = "function" == typeof t ? t : Array.isArray(t) ? Na(Ea.call(t)) : Na(t),
			l) : s
		}
		,
		l.bandwidth = function(t) {
			if (!arguments.length)
				return Math.sqrt(o * (o + 1));
			if (!((t = +t) >= 0))
				throw new Error("invalid bandwidth");
			return o = Math.round((Math.sqrt(4 * t * t + 1) - 1) / 2),
			y()
		}
		,
		l
	}
	,
	t.contours = Fa,
	t.count = f,
	t.create = function(t) {
		return Un(kt(t).call(document.documentElement))
	}
	,
	t.creator = kt,
	t.cross = function(...t) {
		const n = "function" == typeof t[t.length - 1] && function(t) {
			return n=>t(...n)
		}(t.pop())
		  , e = (t = t.map(h)).map(s)
		  , r = t.length - 1
		  , i = new Array(r + 1).fill(0)
		  , o = [];
		if (r < 0 || e.some(l))
			return o;
		for (; ; ) {
			o.push(i.map(((n,e)=>t[e][n])));
			let a = r;
			for (; ++i[a] === e[a]; ) {
				if (0 === a)
					return n ? o.map(n) : o;
				i[a--] = 0
			}
		}
	}
	,
	t.csv = Xu,
	t.csvFormat = Su,
	t.csvFormatBody = Eu,
	t.csvFormatRow = Nu,
	t.csvFormatRows = ku,
	t.csvFormatValue = Cu,
	t.csvParse = Au,
	t.csvParseRows = Tu,
	t.cubehelix = ur,
	t.cumsum = function(t, n) {
		var e = 0
		  , r = 0;
		return Float64Array.from(t, void 0 === n ? t=>e += +t || 0 : i=>e += +n(i, r++, t) || 0)
	}
	,
	t.curveBasis = function(t) {
		return new ox(t)
	}
	,
	t.curveBasisClosed = function(t) {
		return new ax(t)
	}
	,
	t.curveBasisOpen = function(t) {
		return new ux(t)
	}
	,
	t.curveBumpX = Am,
	t.curveBumpY = Tm,
	t.curveBundle = fx,
	t.curveCardinal = hx,
	t.curveCardinalClosed = px,
	t.curveCardinalOpen = yx,
	t.curveCatmullRom = bx,
	t.curveCatmullRomClosed = xx,
	t.curveCatmullRomOpen = Mx,
	t.curveLinear = cm,
	t.curveLinearClosed = function(t) {
		return new Ax(t)
	}
	,
	t.curveMonotoneX = function(t) {
		return new Nx(t)
	}
	,
	t.curveMonotoneY = function(t) {
		return new Cx(t)
	}
	,
	t.curveNatural = function(t) {
		return new zx(t)
	}
	,
	t.curveStep = function(t) {
		return new Rx(t,.5)
	}
	,
	t.curveStepAfter = function(t) {
		return new Rx(t,1)
	}
	,
	t.curveStepBefore = function(t) {
		return new Rx(t,0)
	}
	,
	t.descending = function(t, n) {
		return null == t || null == n ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
	}
	,
	t.deviation = p,
	t.difference = function(t, ...n) {
		t = new InternSet(t);
		for (const e of n)
			for (const n of e)
				t.delete(n);
		return t
	}
	,
	t.disjoint = function(t, n) {
		const e = n[Symbol.iterator]()
		  , r = new InternSet;
		for (const n of t) {
			if (r.has(n))
				return !1;
			let t, i;
			for (; ({value: t, done: i} = e.next()) && !i; ) {
				if (Object.is(n, t))
					return !1;
				r.add(t)
			}
		}
		return !0
	}
	,
	t.dispatch = _t,
	t.drag = function() {
		var t, n, e, r, i = Qn, o = Jn, a = te, u = ne, c = {}, f = _t("start", "drag", "end"), s = 0, l = 0;
		function h(t) {
			t.on("mousedown.drag", d).filter(u).on("touchstart.drag", y).on("touchmove.drag", v, Hn).on("touchend.drag touchcancel.drag", _).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
		}
		function d(a, u) {
			if (!r && i.call(this, a, u)) {
				var c = b(this, o.call(this, a, u), a, u, "mouse");
				c && (Un(a.view).on("mousemove.drag", p, Xn).on("mouseup.drag", g, Xn),
				$n(a.view),
				Gn(a),
				e = !1,
				t = a.clientX,
				n = a.clientY,
				c("start", a))
			}
		}
		function p(r) {
			if (Vn(r),
			!e) {
				var i = r.clientX - t
				  , o = r.clientY - n;
				e = i * i + o * o > l
			}
			c.mouse("drag", r)
		}
		function g(t) {
			Un(t.view).on("mousemove.drag mouseup.drag", null),
			Wn(t.view, e),
			Vn(t),
			c.mouse("end", t)
		}
		function y(t, n) {
			if (i.call(this, t, n)) {
				var e, r, a = t.changedTouches, u = o.call(this, t, n), c = a.length;
				for (e = 0; e < c; ++e)
					(r = b(this, u, t, n, a[e].identifier, a[e])) && (Gn(t),
					r("start", t, a[e]))
			}
		}
		function v(t) {
			var n, e, r = t.changedTouches, i = r.length;
			for (n = 0; n < i; ++n)
				(e = c[r[n].identifier]) && (Vn(t),
				e("drag", t, r[n]))
		}
		function _(t) {
			var n, e, i = t.changedTouches, o = i.length;
			for (r && clearTimeout(r),
			r = setTimeout((function() {
				r = null
			}
			), 500),
			n = 0; n < o; ++n)
				(e = c[i[n].identifier]) && (Gn(t),
				e("end", t, i[n]))
		}
		function b(t, n, e, r, i, o) {
			var u, l, d, p = f.copy(), g = jn(o || e, n);
			if (null != (d = a.call(t, new Kn("beforestart",{
				sourceEvent: e,
				target: h,
				identifier: i,
				active: s,
				x: g[0],
				y: g[1],
				dx: 0,
				dy: 0,
				dispatch: p
			}), r)))
				return u = d.x - g[0] || 0,
				l = d.y - g[1] || 0,
				function e(o, a, f) {
					var y, v = g;
					switch (o) {
					case "start":
						c[i] = e,
						y = s++;
						break;
					case "end":
						delete c[i],
						--s;
					case "drag":
						g = jn(f || a, n),
						y = s
					}
					p.call(o, t, new Kn(o,{
						sourceEvent: a,
						subject: d,
						target: h,
						identifier: i,
						active: y,
						x: g[0] + u,
						y: g[1] + l,
						dx: g[0] - v[0],
						dy: g[1] - v[1],
						dispatch: p
					}), r)
				}
		}
		return h.filter = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : Zn(!!t),
			h) : i
		}
		,
		h.container = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : Zn(t),
			h) : o
		}
		,
		h.subject = function(t) {
			return arguments.length ? (a = "function" == typeof t ? t : Zn(t),
			h) : a
		}
		,
		h.touchable = function(t) {
			return arguments.length ? (u = "function" == typeof t ? t : Zn(!!t),
			h) : u
		}
		,
		h.on = function() {
			var t = f.on.apply(f, arguments);
			return t === f ? h : t
		}
		,
		h.clickDistance = function(t) {
			return arguments.length ? (l = (t = +t) * t,
			h) : Math.sqrt(l)
		}
		,
		h
	}
	,
	t.dragDisable = $n,
	t.dragEnable = Wn,
	t.dsv = function(t, n, e, r) {
		3 === arguments.length && "function" == typeof e && (r = e,
		e = void 0);
		var i = wu(t);
		return ju(n, e).then((function(t) {
			return i.parse(t, r)
		}
		))
	}
	,
	t.dsvFormat = wu,
	t.easeBack = _o,
	t.easeBackIn = yo,
	t.easeBackInOut = _o,
	t.easeBackOut = vo,
	t.easeBounce = po,
	t.easeBounceIn = function(t) {
		return 1 - po(1 - t)
	}
	,
	t.easeBounceInOut = function(t) {
		return ((t *= 2) <= 1 ? 1 - po(1 - t) : po(t - 1) + 1) / 2
	}
	,
	t.easeBounceOut = po,
	t.easeCircle = so,
	t.easeCircleIn = function(t) {
		return 1 - Math.sqrt(1 - t * t)
	}
	,
	t.easeCircleInOut = so,
	t.easeCircleOut = function(t) {
		return Math.sqrt(1 - --t * t)
	}
	,
	t.easeCubic = no,
	t.easeCubicIn = function(t) {
		return t * t * t
	}
	,
	t.easeCubicInOut = no,
	t.easeCubicOut = function(t) {
		return --t * t * t + 1
	}
	,
	t.easeElastic = xo,
	t.easeElasticIn = mo,
	t.easeElasticInOut = wo,
	t.easeElasticOut = xo,
	t.easeExp = fo,
	t.easeExpIn = function(t) {
		return co(1 - +t)
	}
	,
	t.easeExpInOut = fo,
	t.easeExpOut = function(t) {
		return 1 - co(t)
	}
	,
	t.easeLinear = t=>+t,
	t.easePoly = io,
	t.easePolyIn = eo,
	t.easePolyInOut = io,
	t.easePolyOut = ro,
	t.easeQuad = to,
	t.easeQuadIn = function(t) {
		return t * t
	}
	,
	t.easeQuadInOut = to,
	t.easeQuadOut = function(t) {
		return t * (2 - t)
	}
	,
	t.easeSin = uo,
	t.easeSinIn = function(t) {
		return 1 == +t ? 1 : 1 - Math.cos(t * ao)
	}
	,
	t.easeSinInOut = uo,
	t.easeSinOut = function(t) {
		return Math.sin(t * ao)
	}
	,
	t.every = function(t, n) {
		if ("function" != typeof n)
			throw new TypeError("test is not a function");
		let e = -1;
		for (const r of t)
			if (!n(r, ++e, t))
				return !1;
		return !0
	}
	,
	t.extent = g,
	t.fcumsum = function(t, n) {
		const e = new y;
		let r = -1;
		return Float64Array.from(t, void 0 === n ? t=>e.add(+t || 0) : i=>e.add(+n(i, ++r, t) || 0))
	}
	,
	t.filter = function(t, n) {
		if ("function" != typeof n)
			throw new TypeError("test is not a function");
		const e = [];
		let r = -1;
		for (const i of t)
			n(i, ++r, t) && e.push(i);
		return e
	}
	,
	t.flatGroup = function(t, ...n) {
		return A(M(t, ...n), n)
	}
	,
	t.flatRollup = function(t, n, ...e) {
		return A(S(t, n, ...e), e)
	}
	,
	t.forceCenter = function(t, n) {
		var e, r = 1;
		function i() {
			var i, o, a = e.length, u = 0, c = 0;
			for (i = 0; i < a; ++i)
				u += (o = e[i]).x,
				c += o.y;
			for (u = (u / a - t) * r,
			c = (c / a - n) * r,
			i = 0; i < a; ++i)
				(o = e[i]).x -= u,
				o.y -= c
		}
		return null == t && (t = 0),
		null == n && (n = 0),
		i.initialize = function(t) {
			e = t
		}
		,
		i.x = function(n) {
			return arguments.length ? (t = +n,
			i) : t
		}
		,
		i.y = function(t) {
			return arguments.length ? (n = +t,
			i) : n
		}
		,
		i.strength = function(t) {
			return arguments.length ? (r = +t,
			i) : r
		}
		,
		i
	}
	,
	t.forceCollide = function(t) {
		var n, e, r, i = 1, o = 1;
		function a() {
			for (var t, a, c, f, s, l, h, d = n.length, p = 0; p < o; ++p)
				for (a = ec(n, cc, fc).visitAfter(u),
				t = 0; t < d; ++t)
					c = n[t],
					l = e[c.index],
					h = l * l,
					f = c.x + c.vx,
					s = c.y + c.vy,
					a.visit(g);
			function g(t, n, e, o, a) {
				var u = t.data
				  , d = t.r
				  , p = l + d;
				if (!u)
					return n > f + p || o < f - p || e > s + p || a < s - p;
				if (u.index > c.index) {
					var g = f - u.x - u.vx
					  , y = s - u.y - u.vy
					  , v = g * g + y * y;
					v < p * p && (0 === g && (v += (g = uc(r)) * g),
					0 === y && (v += (y = uc(r)) * y),
					v = (p - (v = Math.sqrt(v))) / v * i,
					c.vx += (g *= v) * (p = (d *= d) / (h + d)),
					c.vy += (y *= v) * p,
					u.vx -= g * (p = 1 - p),
					u.vy -= y * p)
				}
			}
		}
		function u(t) {
			if (t.data)
				return t.r = e[t.data.index];
			for (var n = t.r = 0; n < 4; ++n)
				t[n] && t[n].r > t.r && (t.r = t[n].r)
		}
		function c() {
			if (n) {
				var r, i, o = n.length;
				for (e = new Array(o),
				r = 0; r < o; ++r)
					i = n[r],
					e[i.index] = +t(i, r, n)
			}
		}
		return "function" != typeof t && (t = ac(null == t ? 1 : +t)),
		a.initialize = function(t, e) {
			n = t,
			r = e,
			c()
		}
		,
		a.iterations = function(t) {
			return arguments.length ? (o = +t,
			a) : o
		}
		,
		a.strength = function(t) {
			return arguments.length ? (i = +t,
			a) : i
		}
		,
		a.radius = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : ac(+n),
			c(),
			a) : t
		}
		,
		a
	}
	,
	t.forceLink = function(t) {
		var n, e, r, i, o, a, u = sc, c = function(t) {
			return 1 / Math.min(i[t.source.index], i[t.target.index])
		}, f = ac(30), s = 1;
		function l(r) {
			for (var i = 0, u = t.length; i < s; ++i)
				for (var c, f, l, h, d, p, g, y = 0; y < u; ++y)
					f = (c = t[y]).source,
					h = (l = c.target).x + l.vx - f.x - f.vx || uc(a),
					d = l.y + l.vy - f.y - f.vy || uc(a),
					h *= p = ((p = Math.sqrt(h * h + d * d)) - e[y]) / p * r * n[y],
					d *= p,
					l.vx -= h * (g = o[y]),
					l.vy -= d * g,
					f.vx += h * (g = 1 - g),
					f.vy += d * g
		}
		function h() {
			if (r) {
				var a, c, f = r.length, s = t.length, l = new Map(r.map(((t,n)=>[u(t, n, r), t])));
				for (a = 0,
				i = new Array(f); a < s; ++a)
					(c = t[a]).index = a,
					"object" != typeof c.source && (c.source = lc(l, c.source)),
					"object" != typeof c.target && (c.target = lc(l, c.target)),
					i[c.source.index] = (i[c.source.index] || 0) + 1,
					i[c.target.index] = (i[c.target.index] || 0) + 1;
				for (a = 0,
				o = new Array(s); a < s; ++a)
					c = t[a],
					o[a] = i[c.source.index] / (i[c.source.index] + i[c.target.index]);
				n = new Array(s),
				d(),
				e = new Array(s),
				p()
			}
		}
		function d() {
			if (r)
				for (var e = 0, i = t.length; e < i; ++e)
					n[e] = +c(t[e], e, t)
		}
		function p() {
			if (r)
				for (var n = 0, i = t.length; n < i; ++n)
					e[n] = +f(t[n], n, t)
		}
		return null == t && (t = []),
		l.initialize = function(t, n) {
			r = t,
			a = n,
			h()
		}
		,
		l.links = function(n) {
			return arguments.length ? (t = n,
			h(),
			l) : t
		}
		,
		l.id = function(t) {
			return arguments.length ? (u = t,
			l) : u
		}
		,
		l.iterations = function(t) {
			return arguments.length ? (s = +t,
			l) : s
		}
		,
		l.strength = function(t) {
			return arguments.length ? (c = "function" == typeof t ? t : ac(+t),
			d(),
			l) : c
		}
		,
		l.distance = function(t) {
			return arguments.length ? (f = "function" == typeof t ? t : ac(+t),
			p(),
			l) : f
		}
		,
		l
	}
	,
	t.forceManyBody = function() {
		var t, n, e, r, i, o = ac(-30), a = 1, u = 1 / 0, c = .81;
		function f(e) {
			var i, o = t.length, a = ec(t, dc, pc).visitAfter(l);
			for (r = e,
			i = 0; i < o; ++i)
				n = t[i],
				a.visit(h)
		}
		function s() {
			if (t) {
				var n, e, r = t.length;
				for (i = new Array(r),
				n = 0; n < r; ++n)
					e = t[n],
					i[e.index] = +o(e, n, t)
			}
		}
		function l(t) {
			var n, e, r, o, a, u = 0, c = 0;
			if (t.length) {
				for (r = o = a = 0; a < 4; ++a)
					(n = t[a]) && (e = Math.abs(n.value)) && (u += n.value,
					c += e,
					r += e * n.x,
					o += e * n.y);
				t.x = r / c,
				t.y = o / c
			} else {
				(n = t).x = n.data.x,
				n.y = n.data.y;
				do {
					u += i[n.data.index]
				} while (n = n.next)
			}
			t.value = u
		}
		function h(t, o, f, s) {
			if (!t.value)
				return !0;
			var l = t.x - n.x
			  , h = t.y - n.y
			  , d = s - o
			  , p = l * l + h * h;
			if (d * d / c < p)
				return p < u && (0 === l && (p += (l = uc(e)) * l),
				0 === h && (p += (h = uc(e)) * h),
				p < a && (p = Math.sqrt(a * p)),
				n.vx += l * t.value * r / p,
				n.vy += h * t.value * r / p),
				!0;
			if (!(t.length || p >= u)) {
				(t.data !== n || t.next) && (0 === l && (p += (l = uc(e)) * l),
				0 === h && (p += (h = uc(e)) * h),
				p < a && (p = Math.sqrt(a * p)));
				do {
					t.data !== n && (d = i[t.data.index] * r / p,
					n.vx += l * d,
					n.vy += h * d)
				} while (t = t.next)
			}
		}
		return f.initialize = function(n, r) {
			t = n,
			e = r,
			s()
		}
		,
		f.strength = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : ac(+t),
			s(),
			f) : o
		}
		,
		f.distanceMin = function(t) {
			return arguments.length ? (a = t * t,
			f) : Math.sqrt(a)
		}
		,
		f.distanceMax = function(t) {
			return arguments.length ? (u = t * t,
			f) : Math.sqrt(u)
		}
		,
		f.theta = function(t) {
			return arguments.length ? (c = t * t,
			f) : Math.sqrt(c)
		}
		,
		f
	}
	,
	t.forceRadial = function(t, n, e) {
		var r, i, o, a = ac(.1);
		function u(t) {
			for (var a = 0, u = r.length; a < u; ++a) {
				var c = r[a]
				  , f = c.x - n || 1e-6
				  , s = c.y - e || 1e-6
				  , l = Math.sqrt(f * f + s * s)
				  , h = (o[a] - l) * i[a] * t / l;
				c.vx += f * h,
				c.vy += s * h
			}
		}
		function c() {
			if (r) {
				var n, e = r.length;
				for (i = new Array(e),
				o = new Array(e),
				n = 0; n < e; ++n)
					o[n] = +t(r[n], n, r),
					i[n] = isNaN(o[n]) ? 0 : +a(r[n], n, r)
			}
		}
		return "function" != typeof t && (t = ac(+t)),
		null == n && (n = 0),
		null == e && (e = 0),
		u.initialize = function(t) {
			r = t,
			c()
		}
		,
		u.strength = function(t) {
			return arguments.length ? (a = "function" == typeof t ? t : ac(+t),
			c(),
			u) : a
		}
		,
		u.radius = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : ac(+n),
			c(),
			u) : t
		}
		,
		u.x = function(t) {
			return arguments.length ? (n = +t,
			u) : n
		}
		,
		u.y = function(t) {
			return arguments.length ? (e = +t,
			u) : e
		}
		,
		u
	}
	,
	t.forceSimulation = function(t) {
		var n, e = 1, r = .001, i = 1 - Math.pow(r, 1 / 300), o = 0, a = .6, u = new Map, c = si(l), f = _t("tick", "end"), s = function() {
			let t = 1;
			return ()=>(t = (1664525 * t + 1013904223) % hc) / hc
		}();
		function l() {
			h(),
			f.call("tick", n),
			e < r && (c.stop(),
			f.call("end", n))
		}
		function h(r) {
			var c, f, s = t.length;
			void 0 === r && (r = 1);
			for (var l = 0; l < r; ++l)
				for (e += (o - e) * i,
				u.forEach((function(t) {
					t(e)
				}
				)),
				c = 0; c < s; ++c)
					null == (f = t[c]).fx ? f.x += f.vx *= a : (f.x = f.fx,
					f.vx = 0),
					null == f.fy ? f.y += f.vy *= a : (f.y = f.fy,
					f.vy = 0);
			return n
		}
		function d() {
			for (var n, e = 0, r = t.length; e < r; ++e) {
				if ((n = t[e]).index = e,
				null != n.fx && (n.x = n.fx),
				null != n.fy && (n.y = n.fy),
				isNaN(n.x) || isNaN(n.y)) {
					var i = 10 * Math.sqrt(.5 + e)
					  , o = e * gc;
					n.x = i * Math.cos(o),
					n.y = i * Math.sin(o)
				}
				(isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0)
			}
		}
		function p(n) {
			return n.initialize && n.initialize(t, s),
			n
		}
		return null == t && (t = []),
		d(),
		n = {
			tick: h,
			restart: function() {
				return c.restart(l),
				n
			},
			stop: function() {
				return c.stop(),
				n
			},
			nodes: function(e) {
				return arguments.length ? (t = e,
				d(),
				u.forEach(p),
				n) : t
			},
			alpha: function(t) {
				return arguments.length ? (e = +t,
				n) : e
			},
			alphaMin: function(t) {
				return arguments.length ? (r = +t,
				n) : r
			},
			alphaDecay: function(t) {
				return arguments.length ? (i = +t,
				n) : +i
			},
			alphaTarget: function(t) {
				return arguments.length ? (o = +t,
				n) : o
			},
			velocityDecay: function(t) {
				return arguments.length ? (a = 1 - t,
				n) : 1 - a
			},
			randomSource: function(t) {
				return arguments.length ? (s = t,
				u.forEach(p),
				n) : s
			},
			force: function(t, e) {
				return arguments.length > 1 ? (null == e ? u.delete(t) : u.set(t, p(e)),
				n) : u.get(t)
			},
			find: function(n, e, r) {
				var i, o, a, u, c, f = 0, s = t.length;
				for (null == r ? r = 1 / 0 : r *= r,
				f = 0; f < s; ++f)
					(a = (i = n - (u = t[f]).x) * i + (o = e - u.y) * o) < r && (c = u,
					r = a);
				return c
			},
			on: function(t, e) {
				return arguments.length > 1 ? (f.on(t, e),
				n) : f.on(t)
			}
		}
	}
	,
	t.forceX = function(t) {
		var n, e, r, i = ac(.1);
		function o(t) {
			for (var i, o = 0, a = n.length; o < a; ++o)
				(i = n[o]).vx += (r[o] - i.x) * e[o] * t
		}
		function a() {
			if (n) {
				var o, a = n.length;
				for (e = new Array(a),
				r = new Array(a),
				o = 0; o < a; ++o)
					e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n)
			}
		}
		return "function" != typeof t && (t = ac(null == t ? 0 : +t)),
		o.initialize = function(t) {
			n = t,
			a()
		}
		,
		o.strength = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : ac(+t),
			a(),
			o) : i
		}
		,
		o.x = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : ac(+n),
			a(),
			o) : t
		}
		,
		o
	}
	,
	t.forceY = function(t) {
		var n, e, r, i = ac(.1);
		function o(t) {
			for (var i, o = 0, a = n.length; o < a; ++o)
				(i = n[o]).vy += (r[o] - i.y) * e[o] * t
		}
		function a() {
			if (n) {
				var o, a = n.length;
				for (e = new Array(a),
				r = new Array(a),
				o = 0; o < a; ++o)
					e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n)
			}
		}
		return "function" != typeof t && (t = ac(null == t ? 0 : +t)),
		o.initialize = function(t) {
			n = t,
			a()
		}
		,
		o.strength = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : ac(+t),
			a(),
			o) : i
		}
		,
		o.y = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : ac(+n),
			a(),
			o) : t
		}
		,
		o
	}
	,
	t.formatDefaultLocale = Nc,
	t.formatLocale = kc,
	t.formatSpecifier = mc,
	t.fsum = function(t, n) {
		const e = new y;
		if (void 0 === n)
			for (let n of t)
				(n = +n) && e.add(n);
		else {
			let r = -1;
			for (let i of t)
				(i = +n(i, ++r, t)) && e.add(i)
		}
		return +e
	}
	,
	t.geoAlbers = Oh,
	t.geoAlbersUsa = function() {
		var t, n, e, r, i, o, a = Oh(), u = qh().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), c = qh().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), f = {
			point: function(t, n) {
				o = [t, n]
			}
		};
		function s(t) {
			var n = t[0]
			  , a = t[1];
			return o = null,
			e.point(n, a),
			o || (r.point(n, a),
			o) || (i.point(n, a),
			o)
		}
		function l() {
			return t = n = null,
			s
		}
		return s.invert = function(t) {
			var n = a.scale()
			  , e = a.translate()
			  , r = (t[0] - e[0]) / n
			  , i = (t[1] - e[1]) / n;
			return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? u : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? c : a).invert(t)
		}
		,
		s.stream = function(e) {
			return t && n === e ? t : (r = [a.stream(n = e), u.stream(e), c.stream(e)],
			i = r.length,
			t = {
				point: function(t, n) {
					for (var e = -1; ++e < i; )
						r[e].point(t, n)
				},
				sphere: function() {
					for (var t = -1; ++t < i; )
						r[t].sphere()
				},
				lineStart: function() {
					for (var t = -1; ++t < i; )
						r[t].lineStart()
				},
				lineEnd: function() {
					for (var t = -1; ++t < i; )
						r[t].lineEnd()
				},
				polygonStart: function() {
					for (var t = -1; ++t < i; )
						r[t].polygonStart()
				},
				polygonEnd: function() {
					for (var t = -1; ++t < i; )
						r[t].polygonEnd()
				}
			});
			var r, i
		}
		,
		s.precision = function(t) {
			return arguments.length ? (a.precision(t),
			u.precision(t),
			c.precision(t),
			l()) : a.precision()
		}
		,
		s.scale = function(t) {
			return arguments.length ? (a.scale(t),
			u.scale(.35 * t),
			c.scale(t),
			s.translate(a.translate())) : a.scale()
		}
		,
		s.translate = function(t) {
			if (!arguments.length)
				return a.translate();
			var n = a.scale()
			  , o = +t[0]
			  , s = +t[1];
			return e = a.translate(t).clipExtent([[o - .455 * n, s - .238 * n], [o + .455 * n, s + .238 * n]]).stream(f),
			r = u.translate([o - .307 * n, s + .201 * n]).clipExtent([[o - .425 * n + Dc, s + .12 * n + Dc], [o - .214 * n - Dc, s + .234 * n - Dc]]).stream(f),
			i = c.translate([o - .205 * n, s + .212 * n]).clipExtent([[o - .214 * n + Dc, s + .166 * n + Dc], [o - .115 * n - Dc, s + .234 * n - Dc]]).stream(f),
			l()
		}
		,
		s.fitExtent = function(t, n) {
			return Ah(s, t, n)
		}
		,
		s.fitSize = function(t, n) {
			return Th(s, t, n)
		}
		,
		s.fitWidth = function(t, n) {
			return Sh(s, t, n)
		}
		,
		s.fitHeight = function(t, n) {
			return Eh(s, t, n)
		}
		,
		s.scale(1070)
	}
	,
	t.geoArea = function(t) {
		return kf = new y,
		sf(t, Nf),
		2 * kf
	}
	,
	t.geoAzimuthalEqualArea = function() {
		return zh(Bh).scale(124.75).clipAngle(179.999)
	}
	,
	t.geoAzimuthalEqualAreaRaw = Bh,
	t.geoAzimuthalEquidistant = function() {
		return zh(Yh).scale(79.4188).clipAngle(179.999)
	}
	,
	t.geoAzimuthalEquidistantRaw = Yh,
	t.geoBounds = function(t) {
		var n, e, r, i, o, a, u;
		if (bf = _f = -(yf = vf = 1 / 0),
		Tf = [],
		sf(t, rs),
		e = Tf.length) {
			for (Tf.sort(hs),
			n = 1,
			o = [r = Tf[0]]; n < e; ++n)
				ds(r, (i = Tf[n])[0]) || ds(r, i[1]) ? (ls(r[0], i[1]) > ls(r[0], r[1]) && (r[1] = i[1]),
				ls(i[0], r[1]) > ls(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
			for (a = -1 / 0,
			n = 0,
			r = o[e = o.length - 1]; n <= e; r = i,
			++n)
				i = o[n],
				(u = ls(r[1], i[0])) > a && (a = u,
				yf = i[0],
				_f = r[1])
		}
		return Tf = Sf = null,
		yf === 1 / 0 || vf === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[yf, vf], [_f, bf]]
	}
	,
	t.geoCentroid = function(t) {
		Yf = Lf = jf = Hf = Xf = Gf = Vf = $f = 0,
		Wf = new y,
		Zf = new y,
		Kf = new y,
		sf(t, ps);
		var n = +Wf
		  , e = +Zf
		  , r = +Kf
		  , i = Vc(n, e, r);
		return i < Rc && (n = Gf,
		e = Vf,
		r = $f,
		Lf < Dc && (n = jf,
		e = Hf,
		r = Xf),
		(i = Vc(n, e, r)) < Rc) ? [NaN, NaN] : [jc(e, n) * Ic, nf(r / i) * Ic]
	}
	,
	t.geoCircle = function() {
		var t, n, e = Ts([0, 0]), r = Ts(90), i = Ts(6), o = {
			point: function(e, r) {
				t.push(e = n(e, r)),
				e[0] *= Ic,
				e[1] *= Ic
			}
		};
		function a() {
			var a = e.apply(this, arguments)
			  , u = r.apply(this, arguments) * Bc
			  , c = i.apply(this, arguments) * Bc;
			return t = [],
			n = ks(-a[0] * Bc, -a[1] * Bc, 0).invert,
			Ds(o, u, c, 1),
			a = {
				type: "Polygon",
				coordinates: [t]
			},
			t = n = null,
			a
		}
		return a.center = function(t) {
			return arguments.length ? (e = "function" == typeof t ? t : Ts([+t[0], +t[1]]),
			a) : e
		}
		,
		a.radius = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : Ts(+t),
			a) : r
		}
		,
		a.precision = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : Ts(+t),
			a) : i
		}
		,
		a
	}
	,
	t.geoClipAntimeridian = Xs,
	t.geoClipCircle = Gs,
	t.geoClipExtent = function() {
		var t, n, e, r = 0, i = 0, o = 960, a = 500;
		return e = {
			stream: function(e) {
				return t && n === e ? t : t = Js(r, i, o, a)(n = e)
			},
			extent: function(u) {
				return arguments.length ? (r = +u[0][0],
				i = +u[0][1],
				o = +u[1][0],
				a = +u[1][1],
				t = n = null,
				e) : [[r, i], [o, a]]
			}
		}
	}
	,
	t.geoClipRectangle = Js,
	t.geoConicConformal = function() {
		return Rh(Xh).scale(109.5).parallels([30, 30])
	}
	,
	t.geoConicConformalRaw = Xh,
	t.geoConicEqualArea = qh,
	t.geoConicEqualAreaRaw = Fh,
	t.geoConicEquidistant = function() {
		return Rh(Vh).scale(131.154).center([0, 13.9389])
	}
	,
	t.geoConicEquidistantRaw = Vh,
	t.geoContains = function(t, n) {
		return (t && cl.hasOwnProperty(t.type) ? cl[t.type] : sl)(t, n)
	}
	,
	t.geoDistance = ul,
	t.geoEqualEarth = function() {
		return zh(Jh).scale(177.158)
	}
	,
	t.geoEqualEarthRaw = Jh,
	t.geoEquirectangular = function() {
		return zh(Gh).scale(152.63)
	}
	,
	t.geoEquirectangularRaw = Gh,
	t.geoGnomonic = function() {
		return zh(td).scale(144.049).clipAngle(60)
	}
	,
	t.geoGnomonicRaw = td,
	t.geoGraticule = _l,
	t.geoGraticule10 = function() {
		return _l()()
	}
	,
	t.geoIdentity = function() {
		var t, n, e, r, i, o, a, u = 1, c = 0, f = 0, s = 1, l = 1, h = 0, d = null, p = 1, g = 1, y = xh({
			point: function(t, n) {
				var e = b([t, n]);
				this.stream.point(e[0], e[1])
			}
		}), v = Ml;
		function _() {
			return p = u * s,
			g = u * l,
			o = a = null,
			b
		}
		function b(e) {
			var r = e[0] * p
			  , i = e[1] * g;
			if (h) {
				var o = i * t - r * n;
				r = r * t + i * n,
				i = o
			}
			return [r + c, i + f]
		}
		return b.invert = function(e) {
			var r = e[0] - c
			  , i = e[1] - f;
			if (h) {
				var o = i * t + r * n;
				r = r * t - i * n,
				i = o
			}
			return [r / p, i / g]
		}
		,
		b.stream = function(t) {
			return o && a === t ? o : o = y(v(a = t))
		}
		,
		b.postclip = function(t) {
			return arguments.length ? (v = t,
			d = e = r = i = null,
			_()) : v
		}
		,
		b.clipExtent = function(t) {
			return arguments.length ? (v = null == t ? (d = e = r = i = null,
			Ml) : Js(d = +t[0][0], e = +t[0][1], r = +t[1][0], i = +t[1][1]),
			_()) : null == d ? null : [[d, e], [r, i]]
		}
		,
		b.scale = function(t) {
			return arguments.length ? (u = +t,
			_()) : u
		}
		,
		b.translate = function(t) {
			return arguments.length ? (c = +t[0],
			f = +t[1],
			_()) : [c, f]
		}
		,
		b.angle = function(e) {
			return arguments.length ? (n = Zc(h = e % 360 * Bc),
			t = Hc(h),
			_()) : h * Ic
		}
		,
		b.reflectX = function(t) {
			return arguments.length ? (s = t ? -1 : 1,
			_()) : s < 0
		}
		,
		b.reflectY = function(t) {
			return arguments.length ? (l = t ? -1 : 1,
			_()) : l < 0
		}
		,
		b.fitExtent = function(t, n) {
			return Ah(b, t, n)
		}
		,
		b.fitSize = function(t, n) {
			return Th(b, t, n)
		}
		,
		b.fitWidth = function(t, n) {
			return Sh(b, t, n)
		}
		,
		b.fitHeight = function(t, n) {
			return Eh(b, t, n)
		}
		,
		b
	}
	,
	t.geoInterpolate = function(t, n) {
		var e = t[0] * Bc
		  , r = t[1] * Bc
		  , i = n[0] * Bc
		  , o = n[1] * Bc
		  , a = Hc(r)
		  , u = Zc(r)
		  , c = Hc(o)
		  , f = Zc(o)
		  , s = a * Hc(e)
		  , l = a * Zc(e)
		  , h = c * Hc(i)
		  , d = c * Zc(i)
		  , p = 2 * nf(Qc(ef(o - r) + a * c * ef(i - e)))
		  , g = Zc(p)
		  , y = p ? function(t) {
			var n = Zc(t *= p) / g
			  , e = Zc(p - t) / g
			  , r = e * s + n * h
			  , i = e * l + n * d
			  , o = e * u + n * f;
			return [jc(i, r) * Ic, jc(o, Qc(r * r + i * i)) * Ic]
		}
		: function() {
			return [e * Ic, r * Ic]
		}
		;
		return y.distance = p,
		y
	}
	,
	t.geoLength = il,
	t.geoMercator = function() {
		return jh(Lh).scale(961 / Uc)
	}
	,
	t.geoMercatorRaw = Lh,
	t.geoNaturalEarth1 = function() {
		return zh(nd).scale(175.295)
	}
	,
	t.geoNaturalEarth1Raw = nd,
	t.geoOrthographic = function() {
		return zh(ed).scale(249.5).clipAngle(90.000001)
	}
	,
	t.geoOrthographicRaw = ed,
	t.geoPath = function(t, n) {
		var e, r, i = 4.5;
		function o(t) {
			return t && ("function" == typeof i && r.pointRadius(+i.apply(this, arguments)),
			sf(t, e(r))),
			r.result()
		}
		return o.area = function(t) {
			return sf(t, e(Pl)),
			Pl.result()
		}
		,
		o.measure = function(t) {
			return sf(t, e(_h)),
			_h.result()
		}
		,
		o.bounds = function(t) {
			return sf(t, e(Yl)),
			Yl.result()
		}
		,
		o.centroid = function(t) {
			return sf(t, e(uh)),
			uh.result()
		}
		,
		o.projection = function(n) {
			return arguments.length ? (e = null == n ? (t = null,
			Ml) : (t = n).stream,
			o) : t
		}
		,
		o.context = function(t) {
			return arguments.length ? (r = null == t ? (n = null,
			new bh) : new ch(n = t),
			"function" != typeof i && r.pointRadius(i),
			o) : n
		}
		,
		o.pointRadius = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : (r.pointRadius(+t),
			+t),
			o) : i
		}
		,
		o.projection(t).context(n)
	}
	,
	t.geoProjection = zh,
	t.geoProjectionMutator = Dh,
	t.geoRotation = zs,
	t.geoStereographic = function() {
		return zh(rd).scale(250).clipAngle(142)
	}
	,
	t.geoStereographicRaw = rd,
	t.geoStream = sf,
	t.geoTransform = function(t) {
		return {
			stream: xh(t)
		}
	}
	,
	t.geoTransverseMercator = function() {
		var t = jh(id)
		  , n = t.center
		  , e = t.rotate;
		return t.center = function(t) {
			return arguments.length ? n([-t[1], t[0]]) : [(t = n())[1], -t[0]]
		}
		,
		t.rotate = function(t) {
			return arguments.length ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : [(t = e())[0], t[1], t[2] - 90]
		}
		,
		e([0, 0, 90]).scale(159.155)
	}
	,
	t.geoTransverseMercatorRaw = id,
	t.gray = function(t, n) {
		return new je(t,0,0,null == n ? 1 : n)
	}
	,
	t.greatest = function(t, e=n) {
		let r, i = !1;
		if (1 === e.length) {
			let o;
			for (const a of t) {
				const t = e(a);
				(i ? n(t, o) > 0 : 0 === n(t, t)) && (r = a,
				o = t,
				i = !0)
			}
		} else
			for (const n of t)
				(i ? e(n, r) > 0 : 0 === e(n, n)) && (r = n,
				i = !0);
		return r
	}
	,
	t.greatestIndex = function(t, e=n) {
		if (1 === e.length)
			return Z(t, e);
		let r, i = -1, o = -1;
		for (const n of t)
			++o,
			(i < 0 ? 0 === e(n, n) : e(n, r) > 0) && (r = n,
			i = o);
		return i
	}
	,
	t.group = w,
	t.groupSort = function(t, e, r) {
		return (2 !== e.length ? C(T(t, e, r), (([t,e],[r,i])=>n(e, i) || n(t, r))) : C(w(t, r), (([t,r],[i,o])=>e(r, o) || n(t, i)))).map((([t])=>t))
	}
	,
	t.groups = M,
	t.hcl = We,
	t.hierarchy = fd,
	t.histogram = j,
	t.hsl = Pe,
	t.html = Zu,
	t.image = function(t, n) {
		return new Promise((function(e, r) {
			var i = new Image;
			for (var o in n)
				i[o] = n[o];
			i.onerror = r,
			i.onload = function() {
				e(i)
			}
			,
			i.src = t
		}
		))
	}
	,
	t.index = function(t, ...n) {
		return k(t, x, E, n)
	}
	,
	t.indexes = function(t, ...n) {
		return k(t, Array.from, E, n)
	}
	,
	t.interpolate = Cr,
	t.interpolateArray = function(t, n) {
		return (wr(n) ? xr : Mr)(t, n)
	}
	,
	t.interpolateBasis = sr,
	t.interpolateBasisClosed = lr,
	t.interpolateBlues = gb,
	t.interpolateBrBG = E_,
	t.interpolateBuGn = X_,
	t.interpolateBuPu = V_,
	t.interpolateCividis = function(t) {
		return t = Math.max(0, Math.min(1, t)),
		"rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - 2710.57 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - 67.37 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - 2475.67 * t))))))) + ")"
	}
	,
	t.interpolateCool = kb,
	t.interpolateCubehelix = $r,
	t.interpolateCubehelixDefault = Sb,
	t.interpolateCubehelixLong = Wr,
	t.interpolateDate = Ar,
	t.interpolateDiscrete = function(t) {
		var n = t.length;
		return function(e) {
			return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]
		}
	}
	,
	t.interpolateGnBu = W_,
	t.interpolateGreens = vb,
	t.interpolateGreys = bb,
	t.interpolateHcl = Xr,
	t.interpolateHclLong = Gr,
	t.interpolateHsl = Lr,
	t.interpolateHslLong = jr,
	t.interpolateHue = function(t, n) {
		var e = pr(+t, +n);
		return function(t) {
			var n = e(t);
			return n - 360 * Math.floor(n / 360)
		}
	}
	,
	t.interpolateInferno = qb,
	t.interpolateLab = function(t, n) {
		var e = yr((t = Le(t)).l, (n = Le(n)).l)
		  , r = yr(t.a, n.a)
		  , i = yr(t.b, n.b)
		  , o = yr(t.opacity, n.opacity);
		return function(n) {
			return t.l = e(n),
			t.a = r(n),
			t.b = i(n),
			t.opacity = o(n),
			t + ""
		}
	}
	,
	t.interpolateMagma = Fb,
	t.interpolateNumber = Tr,
	t.interpolateNumberArray = xr,
	t.interpolateObject = Sr,
	t.interpolateOrRd = K_,
	t.interpolateOranges = Tb,
	t.interpolatePRGn = N_,
	t.interpolatePiYG = P_,
	t.interpolatePlasma = Ob,
	t.interpolatePuBu = nb,
	t.interpolatePuBuGn = J_,
	t.interpolatePuOr = D_,
	t.interpolatePuRd = rb,
	t.interpolatePurples = xb,
	t.interpolateRainbow = function(t) {
		(t < 0 || t > 1) && (t -= Math.floor(t));
		var n = Math.abs(t - .5);
		return Nb.h = 360 * t - 100,
		Nb.s = 1.5 - 1.5 * n,
		Nb.l = .8 - .9 * n,
		Nb + ""
	}
	,
	t.interpolateRdBu = F_,
	t.interpolateRdGy = O_,
	t.interpolateRdPu = ob,
	t.interpolateRdYlBu = I_,
	t.interpolateRdYlGn = Y_,
	t.interpolateReds = Mb,
	t.interpolateRgb = vr,
	t.interpolateRgbBasis = br,
	t.interpolateRgbBasisClosed = mr,
	t.interpolateRound = Pr,
	t.interpolateSinebow = function(t) {
		var n;
		return t = (.5 - t) * Math.PI,
		Cb.r = 255 * (n = Math.sin(t)) * n,
		Cb.g = 255 * (n = Math.sin(t + Pb)) * n,
		Cb.b = 255 * (n = Math.sin(t + zb)) * n,
		Cb + ""
	}
	,
	t.interpolateSpectral = j_,
	t.interpolateString = Nr,
	t.interpolateTransformCss = Or,
	t.interpolateTransformSvg = Ur,
	t.interpolateTurbo = function(t) {
		return t = Math.max(0, Math.min(1, t)),
		"rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - 14825.05 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + 707.56 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - 6838.66 * t))))))) + ")"
	}
	,
	t.interpolateViridis = Rb,
	t.interpolateWarm = Eb,
	t.interpolateYlGn = fb,
	t.interpolateYlGnBu = ub,
	t.interpolateYlOrBr = lb,
	t.interpolateYlOrRd = db,
	t.interpolateZoom = Br,
	t.interrupt = wi,
	t.intersection = function(t, ...n) {
		t = new InternSet(t),
		n = n.map(at);
		t: for (const e of t)
			for (const r of n)
				if (!r.has(e)) {
					t.delete(e);
					continue t
				}
		return t
	}
	,
	t.interval = function(t, n, e) {
		var r = new fi
		  , i = n;
		return null == n ? (r.restart(t, n, e),
		r) : (r._restart = r.restart,
		r.restart = function(t, n, e) {
			n = +n,
			e = null == e ? ui() : +e,
			r._restart((function o(a) {
				a += i,
				r._restart(o, i += n, e),
				t(a)
			}
			), n, e)
		}
		,
		r.restart(t, n, e),
		r)
	}
	,
	t.isoFormat = r_,
	t.isoParse = o_,
	t.json = function(t, n) {
		return fetch(t, n).then(Vu)
	}
	,
	t.lab = Le,
	t.lch = function(t, n, e, r) {
		return 1 === arguments.length ? $e(t) : new Ze(e,n,t,null == r ? 1 : r)
	}
	,
	t.least = function(t, e=n) {
		let r, i = !1;
		if (1 === e.length) {
			let o;
			for (const a of t) {
				const t = e(a);
				(i ? n(t, o) < 0 : 0 === n(t, t)) && (r = a,
				o = t,
				i = !0)
			}
		} else
			for (const n of t)
				(i ? e(n, r) < 0 : 0 === e(n, n)) && (r = n,
				i = !0);
		return r
	}
	,
	t.leastIndex = nt,
	t.line = lm,
	t.lineRadial = bm,
	t.link = Nm,
	t.linkHorizontal = function() {
		return Nm(Am)
	}
	,
	t.linkRadial = function() {
		const t = Nm(Sm);
		return t.angle = t.x,
		delete t.x,
		t.radius = t.y,
		delete t.y,
		t
	}
	,
	t.linkVertical = function() {
		return Nm(Tm)
	}
	,
	t.local = Bn,
	t.map = function(t, n) {
		if ("function" != typeof t[Symbol.iterator])
			throw new TypeError("values is not iterable");
		if ("function" != typeof n)
			throw new TypeError("mapper is not a function");
		return Array.from(t, ((e,r)=>n(e, r, t)))
	}
	,
	t.matcher = Rt,
	t.max = H,
	t.maxIndex = Z,
	t.mean = function(t, n) {
		let e = 0
		  , r = 0;
		if (void 0 === n)
			for (let n of t)
				null != n && (n = +n) >= n && (++e,
				r += n);
		else {
			let i = -1;
			for (let o of t)
				null != (o = n(o, ++i, t)) && (o = +o) >= o && (++e,
				r += o)
		}
		if (e)
			return r / e
	}
	,
	t.median = function(t, n) {
		return $(t, .5, n)
	}
	,
	t.merge = K,
	t.min = X,
	t.minIndex = Q,
	t.mode = function(t, n) {
		const e = new InternMap;
		if (void 0 === n)
			for (let n of t)
				null != n && n >= n && e.set(n, (e.get(n) || 0) + 1);
		else {
			let r = -1;
			for (let i of t)
				null != (i = n(i, ++r, t)) && i >= i && e.set(i, (e.get(i) || 0) + 1)
		}
		let r, i = 0;
		for (const [t,n] of e)
			n > i && (i = n,
			r = t);
		return r
	}
	,
	t.namespace = Tt,
	t.namespaces = At,
	t.nice = Y,
	t.now = ui,
	t.pack = function() {
		var t = null
		  , n = 1
		  , e = 1
		  , r = Cd;
		function i(i) {
			return i.x = n / 2,
			i.y = e / 2,
			t ? i.eachBefore(Dd(t)).eachAfter(Rd(r, .5)).eachBefore(Fd(1)) : i.eachBefore(Dd(zd)).eachAfter(Rd(Cd, 1)).eachAfter(Rd(r, i.r / Math.min(n, e))).eachBefore(Fd(Math.min(n, e) / (2 * i.r))),
			i
		}
		return i.radius = function(n) {
			return arguments.length ? (t = kd(n),
			i) : t
		}
		,
		i.size = function(t) {
			return arguments.length ? (n = +t[0],
			e = +t[1],
			i) : [n, e]
		}
		,
		i.padding = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : Pd(+t),
			i) : r
		}
		,
		i
	}
	,
	t.packEnclose = gd,
	t.packSiblings = function(t) {
		return Ed(t),
		t
	}
	,
	t.pairs = function(t, n=J) {
		const e = [];
		let r, i = !1;
		for (const o of t)
			i && e.push(n(r, o)),
			r = o,
			i = !0;
		return e
	}
	,
	t.partition = function() {
		var t = 1
		  , n = 1
		  , e = 0
		  , r = !1;
		function i(i) {
			var o = i.height + 1;
			return i.x0 = i.y0 = e,
			i.x1 = t,
			i.y1 = n / o,
			i.eachBefore(function(t, n) {
				return function(r) {
					r.children && Od(r, r.x0, t * (r.depth + 1) / n, r.x1, t * (r.depth + 2) / n);
					var i = r.x0
					  , o = r.y0
					  , a = r.x1 - e
					  , u = r.y1 - e;
					a < i && (i = a = (i + a) / 2),
					u < o && (o = u = (o + u) / 2),
					r.x0 = i,
					r.y0 = o,
					r.x1 = a,
					r.y1 = u
				}
			}(n, o)),
			r && i.eachBefore(qd),
			i
		}
		return i.round = function(t) {
			return arguments.length ? (r = !!t,
			i) : r
		}
		,
		i.size = function(e) {
			return arguments.length ? (t = +e[0],
			n = +e[1],
			i) : [t, n]
		}
		,
		i.padding = function(t) {
			return arguments.length ? (e = +t,
			i) : e
		}
		,
		i
	}
	,
	t.path = ya,
	t.permute = N,
	t.pie = function() {
		var t = pm
		  , n = dm
		  , e = null
		  , r = Ub(0)
		  , i = Ub(Wb)
		  , o = Ub(0);
		function a(a) {
			var u, c, f, s, l, h = (a = am(a)).length, d = 0, p = new Array(h), g = new Array(h), y = +r.apply(this, arguments), v = Math.min(Wb, Math.max(-Wb, i.apply(this, arguments) - y)), _ = Math.min(Math.abs(v) / h, o.apply(this, arguments)), b = _ * (v < 0 ? -1 : 1);
			for (u = 0; u < h; ++u)
				(l = g[p[u] = u] = +t(a[u], u, a)) > 0 && (d += l);
			for (null != n ? p.sort((function(t, e) {
				return n(g[t], g[e])
			}
			)) : null != e && p.sort((function(t, n) {
				return e(a[t], a[n])
			}
			)),
			u = 0,
			f = d ? (v - h * b) / d : 0; u < h; ++u,
			y = s)
				c = p[u],
				s = y + ((l = g[c]) > 0 ? l * f : 0) + b,
				g[c] = {
					data: a[c],
					index: u,
					value: l,
					startAngle: y,
					endAngle: s,
					padAngle: _
				};
			return g
		}
		return a.value = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Ub(+n),
			a) : t
		}
		,
		a.sortValues = function(t) {
			return arguments.length ? (n = t,
			e = null,
			a) : n
		}
		,
		a.sort = function(t) {
			return arguments.length ? (e = t,
			n = null,
			a) : e
		}
		,
		a.startAngle = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : Ub(+t),
			a) : r
		}
		,
		a.endAngle = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : Ub(+t),
			a) : i
		}
		,
		a.padAngle = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : Ub(+t),
			a) : o
		}
		,
		a
	}
	,
	t.piecewise = Zr,
	t.pointRadial = xm,
	t.pointer = jn,
	t.pointers = function(t, n) {
		return t.target && (t = Ln(t),
		void 0 === n && (n = t.currentTarget),
		t = t.touches || [t]),
		Array.from(t, (t=>jn(t, n)))
	}
	,
	t.polygonArea = function(t) {
		for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r; )
			n = i,
			i = t[e],
			o += n[1] * i[0] - n[0] * i[1];
		return o / 2
	}
	,
	t.polygonCentroid = function(t) {
		for (var n, e, r = -1, i = t.length, o = 0, a = 0, u = t[i - 1], c = 0; ++r < i; )
			n = u,
			u = t[r],
			c += e = n[0] * u[1] - u[0] * n[1],
			o += (n[0] + u[0]) * e,
			a += (n[1] + u[1]) * e;
		return [o / (c *= 3), a / c]
	}
	,
	t.polygonContains = function(t, n) {
		for (var e, r, i = t.length, o = t[i - 1], a = n[0], u = n[1], c = o[0], f = o[1], s = !1, l = 0; l < i; ++l)
			e = (o = t[l])[0],
			(r = o[1]) > u != f > u && a < (c - e) * (u - r) / (f - r) + e && (s = !s),
			c = e,
			f = r;
		return s
	}
	,
	t.polygonHull = function(t) {
		if ((e = t.length) < 3)
			return null;
		var n, e, r = new Array(e), i = new Array(e);
		for (n = 0; n < e; ++n)
			r[n] = [+t[n][0], +t[n][1], n];
		for (r.sort(rp),
		n = 0; n < e; ++n)
			i[n] = [r[n][0], -r[n][1]];
		var o = ip(r)
		  , a = ip(i)
		  , u = a[0] === o[0]
		  , c = a[a.length - 1] === o[o.length - 1]
		  , f = [];
		for (n = o.length - 1; n >= 0; --n)
			f.push(t[r[o[n]][2]]);
		for (n = +u; n < a.length - c; ++n)
			f.push(t[r[a[n]][2]]);
		return f
	}
	,
	t.polygonLength = function(t) {
		for (var n, e, r = -1, i = t.length, o = t[i - 1], a = o[0], u = o[1], c = 0; ++r < i; )
			n = a,
			e = u,
			n -= a = (o = t[r])[0],
			e -= u = o[1],
			c += Math.hypot(n, e);
		return c
	}
	,
	t.precisionFixed = Cc,
	t.precisionPrefix = Pc,
	t.precisionRound = zc,
	t.quadtree = ec,
	t.quantile = $,
	t.quantileSorted = W,
	t.quantize = function(t, n) {
		for (var e = new Array(n), r = 0; r < n; ++r)
			e[r] = t(r / (n - 1));
		return e
	}
	,
	t.quickselect = G,
	t.radialArea = mm,
	t.radialLine = bm,
	t.randomBates = lp,
	t.randomBernoulli = pp,
	t.randomBeta = vp,
	t.randomBinomial = _p,
	t.randomCauchy = mp,
	t.randomExponential = hp,
	t.randomGamma = yp,
	t.randomGeometric = gp,
	t.randomInt = up,
	t.randomIrwinHall = sp,
	t.randomLcg = function(t=Math.random()) {
		let n = 0 | (0 <= t && t < 1 ? t / Mp : Math.abs(t));
		return ()=>(n = 1664525 * n + 1013904223 | 0,
		Mp * (n >>> 0))
	}
	,
	t.randomLogNormal = fp,
	t.randomLogistic = xp,
	t.randomNormal = cp,
	t.randomPareto = dp,
	t.randomPoisson = wp,
	t.randomUniform = ap,
	t.randomWeibull = bp,
	t.range = tt,
	t.rank = function(t, e=n) {
		if ("function" != typeof t[Symbol.iterator])
			throw new TypeError("values is not iterable");
		let r = Array.from(t);
		const i = new Float64Array(r.length);
		2 !== e.length && (r = r.map(e),
		e = n);
		const o = (t,n)=>e(r[t], r[n]);
		let a, u;
		return Uint32Array.from(r, ((t,n)=>n)).sort(e === n ? (t,n)=>z(r[t], r[n]) : P(o)).forEach(((t,n)=>{
			const e = o(t, void 0 === a ? t : a);
			e >= 0 ? ((void 0 === a || e > 0) && (a = t,
			u = n),
			i[t] = u) : i[t] = NaN
		}
		)),
		i
	}
	,
	t.reduce = function(t, n, e) {
		if ("function" != typeof n)
			throw new TypeError("reducer is not a function");
		const r = t[Symbol.iterator]();
		let i, o, a = -1;
		if (arguments.length < 3) {
			if (({done: i, value: e} = r.next()),
			i)
				return;
			++a
		}
		for (; ({done: i, value: o} = r.next()),
		!i; )
			e = n(e, o, ++a, t);
		return e
	}
	,
	t.reverse = function(t) {
		if ("function" != typeof t[Symbol.iterator])
			throw new TypeError("values is not iterable");
		return Array.from(t).reverse()
	}
	,
	t.rgb = Ae,
	t.ribbon = function() {
		return Sa()
	}
	,
	t.ribbonArrow = function() {
		return Sa(Ta)
	}
	,
	t.rollup = T,
	t.rollups = S,
	t.scaleBand = kp,
	t.scaleDiverging = function t() {
		var n = Bp(h_()(zp));
		return n.copy = function() {
			return s_(n, t())
		}
		,
		Tp.apply(n, arguments)
	}
	,
	t.scaleDivergingLog = function t() {
		var n = $p(h_()).domain([.1, 1, 10]);
		return n.copy = function() {
			return s_(n, t()).base(n.base())
		}
		,
		Tp.apply(n, arguments)
	}
	,
	t.scaleDivergingPow = d_,
	t.scaleDivergingSqrt = function() {
		return d_.apply(null, arguments).exponent(.5)
	}
	,
	t.scaleDivergingSymlog = function t() {
		var n = Kp(h_());
		return n.copy = function() {
			return s_(n, t()).constant(n.constant())
		}
		,
		Tp.apply(n, arguments)
	}
	,
	t.scaleIdentity = function t(n) {
		var e;
		function r(t) {
			return null == t || isNaN(t = +t) ? e : t
		}
		return r.invert = r,
		r.domain = r.range = function(t) {
			return arguments.length ? (n = Array.from(t, Cp),
			r) : n.slice()
		}
		,
		r.unknown = function(t) {
			return arguments.length ? (e = t,
			r) : e
		}
		,
		r.copy = function() {
			return t(n).unknown(e)
		}
		,
		n = arguments.length ? Array.from(n, Cp) : [0, 1],
		Bp(r)
	}
	,
	t.scaleImplicit = Sp,
	t.scaleLinear = function t() {
		var n = Up();
		return n.copy = function() {
			return qp(n, t())
		}
		,
		Ap.apply(n, arguments),
		Bp(n)
	}
	,
	t.scaleLog = function t() {
		const n = $p(Op()).domain([1, 10]);
		return n.copy = ()=>qp(n, t()).base(n.base()),
		Ap.apply(n, arguments),
		n
	}
	,
	t.scaleOrdinal = Ep,
	t.scalePoint = function() {
		return Np(kp.apply(null, arguments).paddingInner(1))
	}
	,
	t.scalePow = eg,
	t.scaleQuantile = function t() {
		var e, r = [], i = [], o = [];
		function a() {
			var t = 0
			  , n = Math.max(1, i.length);
			for (o = new Array(n - 1); ++t < n; )
				o[t - 1] = W(r, t / n);
			return u
		}
		function u(t) {
			return null == t || isNaN(t = +t) ? e : i[c(o, t)]
		}
		return u.invertExtent = function(t) {
			var n = i.indexOf(t);
			return n < 0 ? [NaN, NaN] : [n > 0 ? o[n - 1] : r[0], n < o.length ? o[n] : r[r.length - 1]]
		}
		,
		u.domain = function(t) {
			if (!arguments.length)
				return r.slice();
			r = [];
			for (let n of t)
				null == n || isNaN(n = +n) || r.push(n);
			return r.sort(n),
			a()
		}
		,
		u.range = function(t) {
			return arguments.length ? (i = Array.from(t),
			a()) : i.slice()
		}
		,
		u.unknown = function(t) {
			return arguments.length ? (e = t,
			u) : e
		}
		,
		u.quantiles = function() {
			return o.slice()
		}
		,
		u.copy = function() {
			return t().domain(r).range(i).unknown(e)
		}
		,
		Ap.apply(u, arguments)
	}
	,
	t.scaleQuantize = function t() {
		var n, e = 0, r = 1, i = 1, o = [.5], a = [0, 1];
		function u(t) {
			return null != t && t <= t ? a[c(o, t, 0, i)] : n
		}
		function f() {
			var t = -1;
			for (o = new Array(i); ++t < i; )
				o[t] = ((t + 1) * r - (t - i) * e) / (i + 1);
			return u
		}
		return u.domain = function(t) {
			return arguments.length ? ([e,r] = t,
			e = +e,
			r = +r,
			f()) : [e, r]
		}
		,
		u.range = function(t) {
			return arguments.length ? (i = (a = Array.from(t)).length - 1,
			f()) : a.slice()
		}
		,
		u.invertExtent = function(t) {
			var n = a.indexOf(t);
			return n < 0 ? [NaN, NaN] : n < 1 ? [e, o[0]] : n >= i ? [o[i - 1], r] : [o[n - 1], o[n]]
		}
		,
		u.unknown = function(t) {
			return arguments.length ? (n = t,
			u) : u
		}
		,
		u.thresholds = function() {
			return o.slice()
		}
		,
		u.copy = function() {
			return t().domain([e, r]).range(a).unknown(n)
		}
		,
		Ap.apply(Bp(u), arguments)
	}
	,
	t.scaleRadial = function t() {
		var n, e = Up(), r = [0, 1], i = !1;
		function o(t) {
			var r = ig(e(t));
			return isNaN(r) ? n : i ? Math.round(r) : r
		}
		return o.invert = function(t) {
			return e.invert(rg(t))
		}
		,
		o.domain = function(t) {
			return arguments.length ? (e.domain(t),
			o) : e.domain()
		}
		,
		o.range = function(t) {
			return arguments.length ? (e.range((r = Array.from(t, Cp)).map(rg)),
			o) : r.slice()
		}
		,
		o.rangeRound = function(t) {
			return o.range(t).round(!0)
		}
		,
		o.round = function(t) {
			return arguments.length ? (i = !!t,
			o) : i
		}
		,
		o.clamp = function(t) {
			return arguments.length ? (e.clamp(t),
			o) : e.clamp()
		}
		,
		o.unknown = function(t) {
			return arguments.length ? (n = t,
			o) : n
		}
		,
		o.copy = function() {
			return t(e.domain(), r).round(i).clamp(e.clamp()).unknown(n)
		}
		,
		Ap.apply(o, arguments),
		Bp(o)
	}
	,
	t.scaleSequential = function t() {
		var n = Bp(f_()(zp));
		return n.copy = function() {
			return s_(n, t())
		}
		,
		Tp.apply(n, arguments)
	}
	,
	t.scaleSequentialLog = function t() {
		var n = $p(f_()).domain([1, 10]);
		return n.copy = function() {
			return s_(n, t()).base(n.base())
		}
		,
		Tp.apply(n, arguments)
	}
	,
	t.scaleSequentialPow = l_,
	t.scaleSequentialQuantile = function t() {
		var e = []
		  , r = zp;
		function i(t) {
			if (null != t && !isNaN(t = +t))
				return r((c(e, t, 1) - 1) / (e.length - 1))
		}
		return i.domain = function(t) {
			if (!arguments.length)
				return e.slice();
			e = [];
			for (let n of t)
				null == n || isNaN(n = +n) || e.push(n);
			return e.sort(n),
			i
		}
		,
		i.interpolator = function(t) {
			return arguments.length ? (r = t,
			i) : r
		}
		,
		i.range = function() {
			return e.map(((t,n)=>r(n / (e.length - 1))))
		}
		,
		i.quantiles = function(t) {
			return Array.from({
				length: t + 1
			}, ((n,r)=>$(e, r / t)))
		}
		,
		i.copy = function() {
			return t(r).domain(e)
		}
		,
		Tp.apply(i, arguments)
	}
	,
	t.scaleSequentialSqrt = function() {
		return l_.apply(null, arguments).exponent(.5)
	}
	,
	t.scaleSequentialSymlog = function t() {
		var n = Kp(f_());
		return n.copy = function() {
			return s_(n, t()).constant(n.constant())
		}
		,
		Tp.apply(n, arguments)
	}
	,
	t.scaleSqrt = function() {
		return eg.apply(null, arguments).exponent(.5)
	}
	,
	t.scaleSymlog = function t() {
		var n = Kp(Op());
		return n.copy = function() {
			return qp(n, t()).constant(n.constant())
		}
		,
		Ap.apply(n, arguments)
	}
	,
	t.scaleThreshold = function t() {
		var n, e = [.5], r = [0, 1], i = 1;
		function o(t) {
			return null != t && t <= t ? r[c(e, t, 0, i)] : n
		}
		return o.domain = function(t) {
			return arguments.length ? (e = Array.from(t),
			i = Math.min(e.length, r.length - 1),
			o) : e.slice()
		}
		,
		o.range = function(t) {
			return arguments.length ? (r = Array.from(t),
			i = Math.min(e.length, r.length - 1),
			o) : r.slice()
		}
		,
		o.invertExtent = function(t) {
			var n = r.indexOf(t);
			return [e[n - 1], e[n]]
		}
		,
		o.unknown = function(t) {
			return arguments.length ? (n = t,
			o) : n
		}
		,
		o.copy = function() {
			return t().domain(e).range(r).unknown(n)
		}
		,
		Ap.apply(o, arguments)
	}
	,
	t.scaleTime = function() {
		return Ap.apply(c_(Cy, Py, Wg, Gg, Pg, kg, Tg, wg, bg, t.timeFormat).domain([new Date(2e3,0,1), new Date(2e3,0,2)]), arguments)
	}
	,
	t.scaleUtc = function() {
		return Ap.apply(c_(ky, Ny, Ty, wy, uy, iy, ny, Qg, bg, t.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
	}
	,
	t.scan = function(t, n) {
		const e = nt(t, n);
		return e < 0 ? void 0 : e
	}
	,
	t.schemeAccent = y_,
	t.schemeBlues = pb,
	t.schemeBrBG = S_,
	t.schemeBuGn = H_,
	t.schemeBuPu = G_,
	t.schemeCategory10 = g_,
	t.schemeDark2 = v_,
	t.schemeGnBu = $_,
	t.schemeGreens = yb,
	t.schemeGreys = _b,
	t.schemeOrRd = Z_,
	t.schemeOranges = Ab,
	t.schemePRGn = k_,
	t.schemePaired = __,
	t.schemePastel1 = b_,
	t.schemePastel2 = m_,
	t.schemePiYG = C_,
	t.schemePuBu = tb,
	t.schemePuBuGn = Q_,
	t.schemePuOr = z_,
	t.schemePuRd = eb,
	t.schemePurples = mb,
	t.schemeRdBu = R_,
	t.schemeRdGy = q_,
	t.schemeRdPu = ib,
	t.schemeRdYlBu = U_,
	t.schemeRdYlGn = B_,
	t.schemeReds = wb,
	t.schemeSet1 = x_,
	t.schemeSet2 = w_,
	t.schemeSet3 = M_,
	t.schemeSpectral = L_,
	t.schemeTableau10 = A_,
	t.schemeYlGn = cb,
	t.schemeYlGnBu = ab,
	t.schemeYlOrBr = sb,
	t.schemeYlOrRd = hb,
	t.select = Un,
	t.selectAll = function(t) {
		return "string" == typeof t ? new qn([document.querySelectorAll(t)],[document.documentElement]) : new qn([Pt(t)],Fn)
	}
	,
	t.selection = On,
	t.selector = Ct,
	t.selectorAll = Dt,
	t.shuffle = et,
	t.shuffler = rt,
	t.some = function(t, n) {
		if ("function" != typeof n)
			throw new TypeError("test is not a function");
		let e = -1;
		for (const r of t)
			if (n(r, ++e, t))
				return !0;
		return !1
	}
	,
	t.sort = C,
	t.stack = function() {
		var t = Ub([])
		  , n = qx
		  , e = Fx
		  , r = Ox;
		function i(i) {
			var o, a, u = Array.from(t.apply(this, arguments), Ux), c = u.length, f = -1;
			for (const t of i)
				for (o = 0,
				++f; o < c; ++o)
					(u[o][f] = [0, +r(t, u[o].key, f, i)]).data = t;
			for (o = 0,
			a = am(n(u)); o < c; ++o)
				u[a[o]].index = o;
			return e(u, a),
			u
		}
		return i.keys = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Ub(Array.from(n)),
			i) : t
		}
		,
		i.value = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : Ub(+t),
			i) : r
		}
		,
		i.order = function(t) {
			return arguments.length ? (n = null == t ? qx : "function" == typeof t ? t : Ub(Array.from(t)),
			i) : n
		}
		,
		i.offset = function(t) {
			return arguments.length ? (e = null == t ? Fx : t,
			i) : e
		}
		,
		i
	}
	,
	t.stackOffsetDiverging = function(t, n) {
		if ((u = t.length) > 0)
			for (var e, r, i, o, a, u, c = 0, f = t[n[0]].length; c < f; ++c)
				for (o = a = 0,
				e = 0; e < u; ++e)
					(i = (r = t[n[e]][c])[1] - r[0]) > 0 ? (r[0] = o,
					r[1] = o += i) : i < 0 ? (r[1] = a,
					r[0] = a += i) : (r[0] = 0,
					r[1] = i)
	}
	,
	t.stackOffsetExpand = function(t, n) {
		if ((r = t.length) > 0) {
			for (var e, r, i, o = 0, a = t[0].length; o < a; ++o) {
				for (i = e = 0; e < r; ++e)
					i += t[e][o][1] || 0;
				if (i)
					for (e = 0; e < r; ++e)
						t[e][o][1] /= i
			}
			Fx(t, n)
		}
	}
	,
	t.stackOffsetNone = Fx,
	t.stackOffsetSilhouette = function(t, n) {
		if ((e = t.length) > 0) {
			for (var e, r = 0, i = t[n[0]], o = i.length; r < o; ++r) {
				for (var a = 0, u = 0; a < e; ++a)
					u += t[a][r][1] || 0;
				i[r][1] += i[r][0] = -u / 2
			}
			Fx(t, n)
		}
	}
	,
	t.stackOffsetWiggle = function(t, n) {
		if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
			for (var e, r, i, o = 0, a = 1; a < r; ++a) {
				for (var u = 0, c = 0, f = 0; u < i; ++u) {
					for (var s = t[n[u]], l = s[a][1] || 0, h = (l - (s[a - 1][1] || 0)) / 2, d = 0; d < u; ++d) {
						var p = t[n[d]];
						h += (p[a][1] || 0) - (p[a - 1][1] || 0)
					}
					c += l,
					f += h * l
				}
				e[a - 1][1] += e[a - 1][0] = o,
				c && (o -= f / c)
			}
			e[a - 1][1] += e[a - 1][0] = o,
			Fx(t, n)
		}
	}
	,
	t.stackOrderAppearance = Ix,
	t.stackOrderAscending = Yx,
	t.stackOrderDescending = function(t) {
		return Yx(t).reverse()
	}
	,
	t.stackOrderInsideOut = function(t) {
		var n, e, r = t.length, i = t.map(Lx), o = Ix(t), a = 0, u = 0, c = [], f = [];
		for (n = 0; n < r; ++n)
			e = o[n],
			a < u ? (a += i[e],
			c.push(e)) : (u += i[e],
			f.push(e));
		return f.reverse().concat(c)
	}
	,
	t.stackOrderNone = qx,
	t.stackOrderReverse = function(t) {
		return qx(t).reverse()
	}
	,
	t.stratify = function() {
		var t, n = Yd, e = Ld;
		function r(r) {
			var i, o, a, u, c, f, s, l, h = Array.from(r), d = n, p = e, g = new Map;
			if (null != t) {
				const n = h.map(((n,e)=>function(t) {
					let n = (t = `${t}`).length;
					Hd(t, n - 1) && !Hd(t, n - 2) && (t = t.slice(0, -1));
					return "/" === t[0] ? t : `/${t}`
				}(t(n, e, r))))
				  , e = n.map(jd)
				  , i = new Set(n).add("");
				for (const t of e)
					i.has(t) || (i.add(t),
					n.push(t),
					e.push(jd(t)),
					h.push(Bd));
				d = (t,e)=>n[e],
				p = (t,n)=>e[n]
			}
			for (a = 0,
			i = h.length; a < i; ++a)
				o = h[a],
				f = h[a] = new pd(o),
				null != (s = d(o, a, r)) && (s += "") && (l = f.id = s,
				g.set(l, g.has(l) ? Id : f)),
				null != (s = p(o, a, r)) && (s += "") && (f.parent = s);
			for (a = 0; a < i; ++a)
				if (s = (f = h[a]).parent) {
					if (!(c = g.get(s)))
						throw new Error("missing: " + s);
					if (c === Id)
						throw new Error("ambiguous: " + s);
					c.children ? c.children.push(f) : c.children = [f],
					f.parent = c
				} else {
					if (u)
						throw new Error("multiple roots");
					u = f
				}
			if (!u)
				throw new Error("no root");
			if (null != t) {
				for (; u.data === Bd && 1 === u.children.length; )
					u = u.children[0],
					--i;
				for (let t = h.length - 1; t >= 0 && (f = h[t],
				f.data === Bd); --t)
					f.data = null
			}
			if (u.parent = Ud,
			u.eachBefore((function(t) {
				t.depth = t.parent.depth + 1,
				--i
			}
			)).eachBefore(dd),
			u.parent = null,
			i > 0)
				throw new Error("cycle");
			return u
		}
		return r.id = function(t) {
			return arguments.length ? (n = kd(t),
			r) : n
		}
		,
		r.parentId = function(t) {
			return arguments.length ? (e = kd(t),
			r) : e
		}
		,
		r.path = function(n) {
			return arguments.length ? (t = kd(n),
			r) : t
		}
		,
		r
	}
	,
	t.style = on,
	t.subset = function(t, n) {
		return ut(n, t)
	}
	,
	t.sum = function(t, n) {
		let e = 0;
		if (void 0 === n)
			for (let n of t)
				(n = +n) && (e += n);
		else {
			let r = -1;
			for (let i of t)
				(i = +n(i, ++r, t)) && (e += i)
		}
		return e
	}
	,
	t.superset = ut,
	t.svg = Ku,
	t.symbol = function(t, n) {
		let e = null;
		function r() {
			let r;
			if (e || (e = r = ya()),
			t.apply(this, arguments).draw(e, +n.apply(this, arguments)),
			r)
				return e = null,
				r + "" || null
		}
		return t = "function" == typeof t ? t : Ub(t || zm),
		n = "function" == typeof n ? n : Ub(void 0 === n ? 64 : +n),
		r.type = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : Ub(n),
			r) : t
		}
		,
		r.size = function(t) {
			return arguments.length ? (n = "function" == typeof t ? t : Ub(+t),
			r) : n
		}
		,
		r.context = function(t) {
			return arguments.length ? (e = null == t ? null : t,
			r) : e
		}
		,
		r
	}
	,
	t.symbolAsterisk = Pm,
	t.symbolCircle = zm,
	t.symbolCross = Dm,
	t.symbolDiamond = qm,
	t.symbolDiamond2 = Om,
	t.symbolPlus = Um,
	t.symbolSquare = Im,
	t.symbolSquare2 = Bm,
	t.symbolStar = Hm,
	t.symbolTriangle = Gm,
	t.symbolTriangle2 = $m,
	t.symbolWye = Jm,
	t.symbolX = tx,
	t.symbols = nx,
	t.symbolsFill = nx,
	t.symbolsStroke = ex,
	t.text = ju,
	t.thresholdFreedmanDiaconis = function(t, n, e) {
		return Math.ceil((e - n) / (2 * ($(t, .75) - $(t, .25)) * Math.pow(f(t), -1 / 3)))
	}
	,
	t.thresholdScott = function(t, n, e) {
		return Math.ceil((e - n) / (3.5 * p(t) * Math.pow(f(t), -1 / 3)))
	}
	,
	t.thresholdSturges = L,
	t.tickFormat = Ip,
	t.tickIncrement = I,
	t.tickStep = B,
	t.ticks = U,
	t.timeDay = kg,
	t.timeDays = Ng,
	t.timeFormatDefaultLocale = t_,
	t.timeFormatLocale = Fy,
	t.timeFriday = qg,
	t.timeFridays = jg,
	t.timeHour = Tg,
	t.timeHours = Sg,
	t.timeInterval = ug,
	t.timeMillisecond = fg,
	t.timeMilliseconds = sg,
	t.timeMinute = wg,
	t.timeMinutes = Mg,
	t.timeMonday = zg,
	t.timeMondays = Ig,
	t.timeMonth = Gg,
	t.timeMonths = Vg,
	t.timeSaturday = Og,
	t.timeSaturdays = Hg,
	t.timeSecond = bg,
	t.timeSeconds = mg,
	t.timeSunday = Pg,
	t.timeSundays = Ug,
	t.timeThursday = Fg,
	t.timeThursdays = Lg,
	t.timeTickInterval = Py,
	t.timeTicks = Cy,
	t.timeTuesday = Dg,
	t.timeTuesdays = Bg,
	t.timeWednesday = Rg,
	t.timeWednesdays = Yg,
	t.timeWeek = Pg,
	t.timeWeeks = Ug,
	t.timeYear = Wg,
	t.timeYears = Zg,
	t.timeout = gi,
	t.timer = si,
	t.timerFlush = li,
	t.transition = Ki,
	t.transpose = it,
	t.tree = function() {
		var t = Xd
		  , n = 1
		  , e = 1
		  , r = null;
		function i(i) {
			var c = function(t) {
				for (var n, e, r, i, o, a = new Zd(t,0), u = [a]; n = u.pop(); )
					if (r = n._.children)
						for (n.children = new Array(o = r.length),
						i = o - 1; i >= 0; --i)
							u.push(e = n.children[i] = new Zd(r[i],i)),
							e.parent = n;
				return (a.parent = new Zd(null,0)).children = [a],
				a
			}(i);
			if (c.eachAfter(o),
			c.parent.m = -c.z,
			c.eachBefore(a),
			r)
				i.eachBefore(u);
			else {
				var f = i
				  , s = i
				  , l = i;
				i.eachBefore((function(t) {
					t.x < f.x && (f = t),
					t.x > s.x && (s = t),
					t.depth > l.depth && (l = t)
				}
				));
				var h = f === s ? 1 : t(f, s) / 2
				  , d = h - f.x
				  , p = n / (s.x + h + d)
				  , g = e / (l.depth || 1);
				i.eachBefore((function(t) {
					t.x = (t.x + d) * p,
					t.y = t.depth * g
				}
				))
			}
			return i
		}
		function o(n) {
			var e = n.children
			  , r = n.parent.children
			  , i = n.i ? r[n.i - 1] : null;
			if (e) {
				!function(t) {
					for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0; )
						(n = i[o]).z += e,
						n.m += e,
						e += n.s + (r += n.c)
				}(n);
				var o = (e[0].z + e[e.length - 1].z) / 2;
				i ? (n.z = i.z + t(n._, i._),
				n.m = n.z - o) : n.z = o
			} else
				i && (n.z = i.z + t(n._, i._));
			n.parent.A = function(n, e, r) {
				if (e) {
					for (var i, o = n, a = n, u = e, c = o.parent.children[0], f = o.m, s = a.m, l = u.m, h = c.m; u = Vd(u),
					o = Gd(o),
					u && o; )
						c = Gd(c),
						(a = Vd(a)).a = n,
						(i = u.z + l - o.z - f + t(u._, o._)) > 0 && ($d(Wd(u, n, r), n, i),
						f += i,
						s += i),
						l += u.m,
						f += o.m,
						h += c.m,
						s += a.m;
					u && !Vd(a) && (a.t = u,
					a.m += l - s),
					o && !Gd(c) && (c.t = o,
					c.m += f - h,
					r = n)
				}
				return r
			}(n, i, n.parent.A || r[0])
		}
		function a(t) {
			t._.x = t.z + t.parent.m,
			t.m += t.parent.m
		}
		function u(t) {
			t.x *= n,
			t.y = t.depth * e
		}
		return i.separation = function(n) {
			return arguments.length ? (t = n,
			i) : t
		}
		,
		i.size = function(t) {
			return arguments.length ? (r = !1,
			n = +t[0],
			e = +t[1],
			i) : r ? null : [n, e]
		}
		,
		i.nodeSize = function(t) {
			return arguments.length ? (r = !0,
			n = +t[0],
			e = +t[1],
			i) : r ? [n, e] : null
		}
		,
		i
	}
	,
	t.treemap = function() {
		var t = tp
		  , n = !1
		  , e = 1
		  , r = 1
		  , i = [0]
		  , o = Cd
		  , a = Cd
		  , u = Cd
		  , c = Cd
		  , f = Cd;
		function s(t) {
			return t.x0 = t.y0 = 0,
			t.x1 = e,
			t.y1 = r,
			t.eachBefore(l),
			i = [0],
			n && t.eachBefore(qd),
			t
		}
		function l(n) {
			var e = i[n.depth]
			  , r = n.x0 + e
			  , s = n.y0 + e
			  , l = n.x1 - e
			  , h = n.y1 - e;
			l < r && (r = l = (r + l) / 2),
			h < s && (s = h = (s + h) / 2),
			n.x0 = r,
			n.y0 = s,
			n.x1 = l,
			n.y1 = h,
			n.children && (e = i[n.depth + 1] = o(n) / 2,
			r += f(n) - e,
			s += a(n) - e,
			(l -= u(n) - e) < r && (r = l = (r + l) / 2),
			(h -= c(n) - e) < s && (s = h = (s + h) / 2),
			t(n, r, s, l, h))
		}
		return s.round = function(t) {
			return arguments.length ? (n = !!t,
			s) : n
		}
		,
		s.size = function(t) {
			return arguments.length ? (e = +t[0],
			r = +t[1],
			s) : [e, r]
		}
		,
		s.tile = function(n) {
			return arguments.length ? (t = Nd(n),
			s) : t
		}
		,
		s.padding = function(t) {
			return arguments.length ? s.paddingInner(t).paddingOuter(t) : s.paddingInner()
		}
		,
		s.paddingInner = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : Pd(+t),
			s) : o
		}
		,
		s.paddingOuter = function(t) {
			return arguments.length ? s.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t) : s.paddingTop()
		}
		,
		s.paddingTop = function(t) {
			return arguments.length ? (a = "function" == typeof t ? t : Pd(+t),
			s) : a
		}
		,
		s.paddingRight = function(t) {
			return arguments.length ? (u = "function" == typeof t ? t : Pd(+t),
			s) : u
		}
		,
		s.paddingBottom = function(t) {
			return arguments.length ? (c = "function" == typeof t ? t : Pd(+t),
			s) : c
		}
		,
		s.paddingLeft = function(t) {
			return arguments.length ? (f = "function" == typeof t ? t : Pd(+t),
			s) : f
		}
		,
		s
	}
	,
	t.treemapBinary = function(t, n, e, r, i) {
		var o, a, u = t.children, c = u.length, f = new Array(c + 1);
		for (f[0] = a = o = 0; o < c; ++o)
			f[o + 1] = a += u[o].value;
		!function t(n, e, r, i, o, a, c) {
			if (n >= e - 1) {
				var s = u[n];
				return s.x0 = i,
				s.y0 = o,
				s.x1 = a,
				void (s.y1 = c)
			}
			var l = f[n]
			  , h = r / 2 + l
			  , d = n + 1
			  , p = e - 1;
			for (; d < p; ) {
				var g = d + p >>> 1;
				f[g] < h ? d = g + 1 : p = g
			}
			h - f[d - 1] < f[d] - h && n + 1 < d && --d;
			var y = f[d] - l
			  , v = r - y;
			if (a - i > c - o) {
				var _ = r ? (i * v + a * y) / r : a;
				t(n, d, y, i, o, _, c),
				t(d, e, v, _, o, a, c)
			} else {
				var b = r ? (o * v + c * y) / r : c;
				t(n, d, y, i, o, a, b),
				t(d, e, v, i, b, a, c)
			}
		}(0, c, t.value, n, e, r, i)
	}
	,
	t.treemapDice = Od,
	t.treemapResquarify = np,
	t.treemapSlice = Kd,
	t.treemapSliceDice = function(t, n, e, r, i) {
		(1 & t.depth ? Kd : Od)(t, n, e, r, i)
	}
	,
	t.treemapSquarify = tp,
	t.tsv = Gu,
	t.tsvFormat = Ru,
	t.tsvFormatBody = Fu,
	t.tsvFormatRow = Ou,
	t.tsvFormatRows = qu,
	t.tsvFormatValue = Uu,
	t.tsvParse = zu,
	t.tsvParseRows = Du,
	t.union = function(...t) {
		const n = new InternSet;
		for (const e of t)
			for (const t of e)
				n.add(t);
		return n
	}
	,
	t.utcDay = iy,
	t.utcDays = oy,
	t.utcFriday = hy,
	t.utcFridays = by,
	t.utcHour = ny,
	t.utcHours = ey,
	t.utcMillisecond = fg,
	t.utcMilliseconds = sg,
	t.utcMinute = Qg,
	t.utcMinutes = Jg,
	t.utcMonday = cy,
	t.utcMondays = gy,
	t.utcMonth = wy,
	t.utcMonths = My,
	t.utcSaturday = dy,
	t.utcSaturdays = my,
	t.utcSecond = bg,
	t.utcSeconds = mg,
	t.utcSunday = uy,
	t.utcSundays = py,
	t.utcThursday = ly,
	t.utcThursdays = _y,
	t.utcTickInterval = Ny,
	t.utcTicks = ky,
	t.utcTuesday = fy,
	t.utcTuesdays = yy,
	t.utcWednesday = sy,
	t.utcWednesdays = vy,
	t.utcWeek = uy,
	t.utcWeeks = py,
	t.utcYear = Ty,
	t.utcYears = Sy,
	t.variance = d,
	t.version = "7.3.0",
	t.window = tn,
	t.xml = Wu,
	t.zip = function() {
		return it(arguments)
	}
	,
	t.zoom = function() {
		var t, n, e, r = Zx, i = Kx, o = nw, a = Jx, u = tw, c = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, l = Br, h = _t("start", "zoom", "end"), d = 500, p = 0, g = 10;
		function y(t) {
			t.property("__zoom", Qx).on("wheel.zoom", M, {
				passive: !1
			}).on("mousedown.zoom", A).on("dblclick.zoom", T).filter(u).on("touchstart.zoom", S).on("touchmove.zoom", E).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
		}
		function v(t, n) {
			return (n = Math.max(c[0], Math.min(c[1], n))) === t.k ? t : new Xx(n,t.x,t.y)
		}
		function _(t, n, e) {
			var r = n[0] - e[0] * t.k
			  , i = n[1] - e[1] * t.k;
			return r === t.x && i === t.y ? t : new Xx(t.k,r,i)
		}
		function b(t) {
			return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
		}
		function m(t, n, e, r) {
			t.on("start.zoom", (function() {
				x(this, arguments).event(r).start()
			}
			)).on("interrupt.zoom end.zoom", (function() {
				x(this, arguments).event(r).end()
			}
			)).tween("zoom", (function() {
				var t = this
				  , o = arguments
				  , a = x(t, o).event(r)
				  , u = i.apply(t, o)
				  , c = null == e ? b(u) : "function" == typeof e ? e.apply(t, o) : e
				  , f = Math.max(u[1][0] - u[0][0], u[1][1] - u[0][1])
				  , s = t.__zoom
				  , h = "function" == typeof n ? n.apply(t, o) : n
				  , d = l(s.invert(c).concat(f / s.k), h.invert(c).concat(f / h.k));
				return function(t) {
					if (1 === t)
						t = h;
					else {
						var n = d(t)
						  , e = f / n[2];
						t = new Xx(e,c[0] - n[0] * e,c[1] - n[1] * e)
					}
					a.zoom(null, t)
				}
			}
			))
		}
		function x(t, n, e) {
			return !e && t.__zooming || new w(t,n)
		}
		function w(t, n) {
			this.that = t,
			this.args = n,
			this.active = 0,
			this.sourceEvent = null,
			this.extent = i.apply(t, n),
			this.taps = 0
		}
		function M(t, ...n) {
			if (r.apply(this, arguments)) {
				var e = x(this, n).event(t)
				  , i = this.__zoom
				  , u = Math.max(c[0], Math.min(c[1], i.k * Math.pow(2, a.apply(this, arguments))))
				  , s = jn(t);
				if (e.wheel)
					e.mouse[0][0] === s[0] && e.mouse[0][1] === s[1] || (e.mouse[1] = i.invert(e.mouse[0] = s)),
					clearTimeout(e.wheel);
				else {
					if (i.k === u)
						return;
					e.mouse = [s, i.invert(s)],
					wi(this),
					e.start()
				}
				Wx(t),
				e.wheel = setTimeout(l, 150),
				e.zoom("mouse", o(_(v(i, u), e.mouse[0], e.mouse[1]), e.extent, f))
			}
			function l() {
				e.wheel = null,
				e.end()
			}
		}
		function A(t, ...n) {
			if (!e && r.apply(this, arguments)) {
				var i = t.currentTarget
				  , a = x(this, n, !0).event(t)
				  , u = Un(t.view).on("mousemove.zoom", h, !0).on("mouseup.zoom", d, !0)
				  , c = jn(t, i)
				  , s = t.clientX
				  , l = t.clientY;
				$n(t.view),
				$x(t),
				a.mouse = [c, this.__zoom.invert(c)],
				wi(this),
				a.start()
			}
			function h(t) {
				if (Wx(t),
				!a.moved) {
					var n = t.clientX - s
					  , e = t.clientY - l;
					a.moved = n * n + e * e > p
				}
				a.event(t).zoom("mouse", o(_(a.that.__zoom, a.mouse[0] = jn(t, i), a.mouse[1]), a.extent, f))
			}
			function d(t) {
				u.on("mousemove.zoom mouseup.zoom", null),
				Wn(t.view, a.moved),
				Wx(t),
				a.event(t).end()
			}
		}
		function T(t, ...n) {
			if (r.apply(this, arguments)) {
				var e = this.__zoom
				  , a = jn(t.changedTouches ? t.changedTouches[0] : t, this)
				  , u = e.invert(a)
				  , c = e.k * (t.shiftKey ? .5 : 2)
				  , l = o(_(v(e, c), a, u), i.apply(this, n), f);
				Wx(t),
				s > 0 ? Un(this).transition().duration(s).call(m, l, a, t) : Un(this).call(y.transform, l, a, t)
			}
		}
		function S(e, ...i) {
			if (r.apply(this, arguments)) {
				var o, a, u, c, f = e.touches, s = f.length, l = x(this, i, e.changedTouches.length === s).event(e);
				for ($x(e),
				a = 0; a < s; ++a)
					c = [c = jn(u = f[a], this), this.__zoom.invert(c), u.identifier],
					l.touch0 ? l.touch1 || l.touch0[2] === c[2] || (l.touch1 = c,
					l.taps = 0) : (l.touch0 = c,
					o = !0,
					l.taps = 1 + !!t);
				t && (t = clearTimeout(t)),
				o && (l.taps < 2 && (n = c[0],
				t = setTimeout((function() {
					t = null
				}
				), d)),
				wi(this),
				l.start())
			}
		}
		function E(t, ...n) {
			if (this.__zooming) {
				var e, r, i, a, u = x(this, n).event(t), c = t.changedTouches, s = c.length;
				for (Wx(t),
				e = 0; e < s; ++e)
					i = jn(r = c[e], this),
					u.touch0 && u.touch0[2] === r.identifier ? u.touch0[0] = i : u.touch1 && u.touch1[2] === r.identifier && (u.touch1[0] = i);
				if (r = u.that.__zoom,
				u.touch1) {
					var l = u.touch0[0]
					  , h = u.touch0[1]
					  , d = u.touch1[0]
					  , p = u.touch1[1]
					  , g = (g = d[0] - l[0]) * g + (g = d[1] - l[1]) * g
					  , y = (y = p[0] - h[0]) * y + (y = p[1] - h[1]) * y;
					r = v(r, Math.sqrt(g / y)),
					i = [(l[0] + d[0]) / 2, (l[1] + d[1]) / 2],
					a = [(h[0] + p[0]) / 2, (h[1] + p[1]) / 2]
				} else {
					if (!u.touch0)
						return;
					i = u.touch0[0],
					a = u.touch0[1]
				}
				u.zoom("touch", o(_(r, i, a), u.extent, f))
			}
		}
		function k(t, ...r) {
			if (this.__zooming) {
				var i, o, a = x(this, r).event(t), u = t.changedTouches, c = u.length;
				for ($x(t),
				e && clearTimeout(e),
				e = setTimeout((function() {
					e = null
				}
				), d),
				i = 0; i < c; ++i)
					o = u[i],
					a.touch0 && a.touch0[2] === o.identifier ? delete a.touch0 : a.touch1 && a.touch1[2] === o.identifier && delete a.touch1;
				if (a.touch1 && !a.touch0 && (a.touch0 = a.touch1,
				delete a.touch1),
				a.touch0)
					a.touch0[1] = this.__zoom.invert(a.touch0[0]);
				else if (a.end(),
				2 === a.taps && (o = jn(o, this),
				Math.hypot(n[0] - o[0], n[1] - o[1]) < g)) {
					var f = Un(this).on("dblclick.zoom");
					f && f.apply(this, arguments)
				}
			}
		}
		return y.transform = function(t, n, e, r) {
			var i = t.selection ? t.selection() : t;
			i.property("__zoom", Qx),
			t !== i ? m(t, n, e, r) : i.interrupt().each((function() {
				x(this, arguments).event(r).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end()
			}
			))
		}
		,
		y.scaleBy = function(t, n, e, r) {
			y.scaleTo(t, (function() {
				var t = this.__zoom.k
				  , e = "function" == typeof n ? n.apply(this, arguments) : n;
				return t * e
			}
			), e, r)
		}
		,
		y.scaleTo = function(t, n, e, r) {
			y.transform(t, (function() {
				var t = i.apply(this, arguments)
				  , r = this.__zoom
				  , a = null == e ? b(t) : "function" == typeof e ? e.apply(this, arguments) : e
				  , u = r.invert(a)
				  , c = "function" == typeof n ? n.apply(this, arguments) : n;
				return o(_(v(r, c), a, u), t, f)
			}
			), e, r)
		}
		,
		y.translateBy = function(t, n, e, r) {
			y.transform(t, (function() {
				return o(this.__zoom.translate("function" == typeof n ? n.apply(this, arguments) : n, "function" == typeof e ? e.apply(this, arguments) : e), i.apply(this, arguments), f)
			}
			), null, r)
		}
		,
		y.translateTo = function(t, n, e, r, a) {
			y.transform(t, (function() {
				var t = i.apply(this, arguments)
				  , a = this.__zoom
				  , u = null == r ? b(t) : "function" == typeof r ? r.apply(this, arguments) : r;
				return o(Gx.translate(u[0], u[1]).scale(a.k).translate("function" == typeof n ? -n.apply(this, arguments) : -n, "function" == typeof e ? -e.apply(this, arguments) : -e), t, f)
			}
			), r, a)
		}
		,
		w.prototype = {
			event: function(t) {
				return t && (this.sourceEvent = t),
				this
			},
			start: function() {
				return 1 == ++this.active && (this.that.__zooming = this,
				this.emit("start")),
				this
			},
			zoom: function(t, n) {
				return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])),
				this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])),
				this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])),
				this.that.__zoom = n,
				this.emit("zoom"),
				this
			},
			end: function() {
				return 0 == --this.active && (delete this.that.__zooming,
				this.emit("end")),
				this
			},
			emit: function(t) {
				var n = Un(this.that).datum();
				h.call(t, this.that, new Hx(t,{
					sourceEvent: this.sourceEvent,
					target: y,
					type: t,
					transform: this.that.__zoom,
					dispatch: h
				}), n)
			}
		},
		y.wheelDelta = function(t) {
			return arguments.length ? (a = "function" == typeof t ? t : jx(+t),
			y) : a
		}
		,
		y.filter = function(t) {
			return arguments.length ? (r = "function" == typeof t ? t : jx(!!t),
			y) : r
		}
		,
		y.touchable = function(t) {
			return arguments.length ? (u = "function" == typeof t ? t : jx(!!t),
			y) : u
		}
		,
		y.extent = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : jx([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]),
			y) : i
		}
		,
		y.scaleExtent = function(t) {
			return arguments.length ? (c[0] = +t[0],
			c[1] = +t[1],
			y) : [c[0], c[1]]
		}
		,
		y.translateExtent = function(t) {
			return arguments.length ? (f[0][0] = +t[0][0],
			f[1][0] = +t[1][0],
			f[0][1] = +t[0][1],
			f[1][1] = +t[1][1],
			y) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]]
		}
		,
		y.constrain = function(t) {
			return arguments.length ? (o = t,
			y) : o
		}
		,
		y.duration = function(t) {
			return arguments.length ? (s = +t,
			y) : s
		}
		,
		y.interpolate = function(t) {
			return arguments.length ? (l = t,
			y) : l
		}
		,
		y.on = function() {
			var t = h.on.apply(h, arguments);
			return t === h ? y : t
		}
		,
		y.clickDistance = function(t) {
			return arguments.length ? (p = (t = +t) * t,
			y) : Math.sqrt(p)
		}
		,
		y.tapDistance = function(t) {
			return arguments.length ? (g = +t,
			y) : g
		}
		,
		y
	}
	,
	t.zoomIdentity = Gx,
	t.zoomTransform = Vx,
	Object.defineProperty(t, "__esModule", {
		value: !0
	})
}
));
