/*
 * jQuery EasyTabs plugin 3.2.0
 *
 * Copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Thu May 09 17:30:00 2013 -0500
 */

define("sort", [], function () {
    return {
        sortWay: function (e, t) {
            return e - t
        }, exportUrl: function () {
            return require.toUrl("../css/base.css")
        }
    }
}), define("hello", [], function () {
    return function () {
        console.log("hello world")
    }
}), define("addBg", ["jquery"], function (e) {
    e(".box").css({background: "red"})
}), function (e) {
    e.easytabs = function (t, n) {
        var r = this, i = e(t), s = {
            animate: !0,
            panelActiveClass: "active",
            tabActiveClass: "active",
            defaultTab: "li:first-child",
            animationSpeed: "normal",
            tabs: "> ul > li",
            updateHash: !0,
            cycle: !1,
            collapsible: !1,
            collapsedClass: "collapsed",
            collapsedByDefault: !0,
            uiTabs: !1,
            transitionIn: "fadeIn",
            transitionOut: "fadeOut",
            transitionInEasing: "swing",
            transitionOutEasing: "swing",
            transitionCollapse: "slideUp",
            transitionUncollapse: "slideDown",
            transitionCollapseEasing: "swing",
            transitionUncollapseEasing: "swing",
            containerClass: "",
            tabsClass: "",
            tabClass: "",
            panelClass: "",
            cache: !0,
            event: "click",
            panelContext: i
        }, o, u, a, f, l, c = {fast: 200, normal: 400, slow: 600}, h;
        r.init = function () {
            r.settings = h = e.extend({}, s, n), h.bind_str = h.event + ".easytabs", h.uiTabs && (h.tabActiveClass = "ui-tabs-selected", h.containerClass = "ui-tabs ui-widget ui-widget-content ui-corner-all", h.tabsClass = "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all", h.tabClass = "ui-state-default ui-corner-top", h.panelClass = "ui-tabs-panel ui-widget-content ui-corner-bottom"), h.collapsible && n.defaultTab !== undefined && n.collpasedByDefault === undefined && (h.collapsedByDefault = !1), typeof h.animationSpeed == "string" && (h.animationSpeed = c[h.animationSpeed]), e("a.anchor").remove().prependTo("body"), i.data("easytabs", {}), r.setTransitions(), r.getTabs(), d(), v(), g(), E(), S(), i.attr("data-easytabs", !0)
        }, r.setTransitions = function () {
            a = h.animate ? {
                show: h.transitionIn,
                hide: h.transitionOut,
                speed: h.animationSpeed,
                collapse: h.transitionCollapse,
                uncollapse: h.transitionUncollapse,
                halfSpeed: h.animationSpeed / 2
            } : {show: "show", hide: "hide", speed: 0, collapse: "hide", uncollapse: "show", halfSpeed: 0}
        }, r.getTabs = function () {
            var t;
            r.tabs = i.find(h.tabs), r.panels = e(), r.tabs.each(function () {
                var n = e(this), i = n.children("a"), s = n.children("a").data("target");
                n.data("easytabs", {}), s !== undefined && s !== null ? n.data("easytabs").ajax = i.attr("href") : s = i.attr("href"), s = s.match(/#([^\?]+)/)[1], t = h.panelContext.find("#" + s), t.length ? (t.data("easytabs", {
                    position: t.css("position"),
                    visibility: t.css("visibility")
                }), t.not(h.panelActiveClass).hide(), r.panels = r.panels.add(t), n.data("easytabs").panel = t) : (r.tabs = r.tabs.not(n), "console"in window && console.warn("Warning: tab without matching panel for selector '#" + s + "' removed from set"))
            })
        }, r.selectTab = function (e, t) {
            var n = window.location, i = n.hash.match(/^[^\?]*/)[0], s = e.parent().data("easytabs").panel, o = e.parent().data("easytabs").ajax;
            h.collapsible && !l && (e.hasClass(h.tabActiveClass) || e.hasClass(h.collapsedClass)) ? r.toggleTabCollapse(e, s, o, t) : !e.hasClass(h.tabActiveClass) || !s.hasClass(h.panelActiveClass) ? y(e, s, o, t) : h.cache || y(e, s, o, t)
        }, r.toggleTabCollapse = function (e, t, n, s) {
            r.panels.stop(!0, !0), p(i, "easytabs:before", [e, t, h]) && (r.tabs.filter("." + h.tabActiveClass).removeClass(h.tabActiveClass).children().removeClass(h.tabActiveClass), e.hasClass(h.collapsedClass) ? (n && (!h.cache || !e.parent().data("easytabs").cached) && (i.trigger("easytabs:ajax:beforeSend", [e, t]), t.load(n, function (n, r, s) {
                e.parent().data("easytabs").cached = !0, i.trigger("easytabs:ajax:complete", [e, t, n, r, s])
            })), e.parent().removeClass(h.collapsedClass).addClass(h.tabActiveClass).children().removeClass(h.collapsedClass).addClass(h.tabActiveClass), t.addClass(h.panelActiveClass)[a.uncollapse](a.speed, h.transitionUncollapseEasing, function () {
                i.trigger("easytabs:midTransition", [e, t, h]), typeof s == "function" && s()
            })) : (e.addClass(h.collapsedClass).parent().addClass(h.collapsedClass), t.removeClass(h.panelActiveClass)[a.collapse](a.speed, h.transitionCollapseEasing, function () {
                i.trigger("easytabs:midTransition", [e, t, h]), typeof s == "function" && s()
            })))
        }, r.matchTab = function (e) {
            return r.tabs.find("[href='" + e + "'],[data-target='" + e + "']").first()
        }, r.matchInPanel = function (e) {
            return e && r.validId(e) ? r.panels.filter(":has(" + e + ")").first() : []
        }, r.validId = function (e) {
            return e.substr(1).match(/^[A-Za-z][A-Za-z0-9\-_:\.]*$/)
        }, r.selectTabFromHashChange = function () {
            var e = window.location.hash.match(/^[^\?]*/)[0], t = r.matchTab(e), n;
            h.updateHash && (t.length ? (l = !0, r.selectTab(t)) : (n = r.matchInPanel(e), n.length ? (e = "#" + n.attr("id"), t = r.matchTab(e), l = !0, r.selectTab(t)) : !o.hasClass(h.tabActiveClass) && !h.cycle && (e === "" || r.matchTab(f).length || i.closest(e).length) && (l = !0, r.selectTab(u))))
        }, r.cycleTabs = function (t) {
            h.cycle && (t %= r.tabs.length, $tab = e(r.tabs[t]).children("a").first(), l = !0, r.selectTab($tab, function () {
                setTimeout(function () {
                    r.cycleTabs(t + 1)
                }, h.cycle)
            }))
        }, r.publicMethods = {
            select: function (t) {
                var n;
                (n = r.tabs.filter(t)).length === 0 ? (n = r.tabs.find("a[href='" + t + "']")).length === 0 && (n = r.tabs.find("a" + t)).length === 0 && (n = r.tabs.find("[data-target='" + t + "']")).length === 0 && (n = r.tabs.find("a[href$='" + t + "']")).length === 0 && e.error("Tab '" + t + "' does not exist in tab set") : n = n.children("a").first(), r.selectTab(n)
            }
        };
        var p = function (t, n, r) {
            var i = e.Event(n);
            return t.trigger(i, r), i.result !== !1
        }, d = function () {
            i.addClass(h.containerClass), r.tabs.parent().addClass(h.tabsClass), r.tabs.addClass(h.tabClass), r.panels.addClass(h.panelClass)
        }, v = function () {
            var t = window.location.hash.match(/^[^\?]*/)[0], n = r.matchTab(t).parent(), i;
            n.length === 1 ? (o = n, h.cycle = !1) : (i = r.matchInPanel(t), i.length ? (t = "#" + i.attr("id"), o = r.matchTab(t).parent()) : (o = r.tabs.parent().find(h.defaultTab), o.length === 0 && e.error("The specified default tab ('" + h.defaultTab + "') could not be found in the tab set ('" + h.tabs + "') out of " + r.tabs.length + " tabs."))), u = o.children("a").first(), m(n)
        }, m = function (t) {
            var n, r;
            h.collapsible && t.length === 0 && h.collapsedByDefault ? o.addClass(h.collapsedClass).children().addClass(h.collapsedClass) : (n = e(o.data("easytabs").panel), r = o.data("easytabs").ajax, r && (!h.cache || !o.data("easytabs").cached) && (i.trigger("easytabs:ajax:beforeSend", [u, n]), n.load(r, function (e, t, r) {
                o.data("easytabs").cached = !0, i.trigger("easytabs:ajax:complete", [u, n, e, t, r])
            })), o.data("easytabs").panel.show().addClass(h.panelActiveClass), o.addClass(h.tabActiveClass).children().addClass(h.tabActiveClass)), i.trigger("easytabs:initialised", [u, n])
        }, g = function () {
            r.tabs.children("a").bind(h.bind_str, function (t) {
                h.cycle = !1, l = !1, r.selectTab(e(this)), t.preventDefault ? t.preventDefault() : t.returnValue = !1
            })
        }, y = function (e, t, n, s) {
            r.panels.stop(!0, !0);
            if (p(i, "easytabs:before", [e, t, h])) {
                var o = r.panels.filter(":visible"), u = t.parent(), c, d, v, m, g = window.location.hash.match(/^[^\?]*/)[0];
                h.animate && (c = b(t), d = o.length ? w(o) : 0, v = c - d), f = g, m = function () {
                    i.trigger("easytabs:midTransition", [e, t, h]), h.animate && h.transitionIn == "fadeIn" && v < 0 && u.animate({height: u.height() + v}, a.halfSpeed).css({"min-height": ""}), h.updateHash && !l ? window.history.pushState ? window.history.pushState(null, null, "#" + t.attr("id")) : window.location.hash = "#" + t.attr("id") : l = !1, t[a.show](a.speed, h.transitionInEasing, function () {
                        u.css({
                            height: "",
                            "min-height": ""
                        }), i.trigger("easytabs:after", [e, t, h]), typeof s == "function" && s()
                    })
                }, n && (!h.cache || !e.parent().data("easytabs").cached) && (i.trigger("easytabs:ajax:beforeSend", [e, t]), t.load(n, function (n, r, s) {
                    e.parent().data("easytabs").cached = !0, i.trigger("easytabs:ajax:complete", [e, t, n, r, s])
                })), h.animate && h.transitionOut == "fadeOut" && (v > 0 ? u.animate({height: u.height() + v}, a.halfSpeed) : u.css({"min-height": u.height()})), r.tabs.filter("." + h.tabActiveClass).removeClass(h.tabActiveClass).children().removeClass(h.tabActiveClass), r.tabs.filter("." + h.collapsedClass).removeClass(h.collapsedClass).children().removeClass(h.collapsedClass), e.parent().addClass(h.tabActiveClass).children().addClass(h.tabActiveClass), r.panels.filter("." + h.panelActiveClass).removeClass(h.panelActiveClass), t.addClass(h.panelActiveClass), o.length ? o[a.hide](a.speed, h.transitionOutEasing, m) : t[a.uncollapse](a.speed, h.transitionUncollapseEasing, m)
            }
        }, b = function (t) {
            if (t.data("easytabs") && t.data("easytabs").lastHeight)return t.data("easytabs").lastHeight;
            var n = t.css("display"), r, i;
            try {
                r = e("<div></div>", {position: "absolute", visibility: "hidden", overflow: "hidden"})
            } catch (s) {
                r = e("<div></div>", {visibility: "hidden", overflow: "hidden"})
            }
            return i = t.wrap(r).css({
                position: "relative",
                visibility: "hidden",
                display: "block"
            }).outerHeight(), t.unwrap(), t.css({
                position: t.data("easytabs").position,
                visibility: t.data("easytabs").visibility,
                display: n
            }), t.data("easytabs").lastHeight = i, i
        }, w = function (e) {
            var t = e.outerHeight();
            return e.data("easytabs") ? e.data("easytabs").lastHeight = t : e.data("easytabs", {lastHeight: t}), t
        }, E = function () {
            typeof e(window).hashchange == "function" ? e(window).hashchange(function () {
                r.selectTabFromHashChange()
            }) : e.address && typeof e.address.change == "function" && e.address.change(function () {
                r.selectTabFromHashChange()
            })
        }, S = function () {
            var e;
            h.cycle && (e = r.tabs.index(o), setTimeout(function () {
                r.cycleTabs(e + 1)
            }, h.cycle))
        };
        r.init()
    }, e.fn.easytabs = function (t) {
        var n = arguments;
        return this.each(function () {
            var r = e(this), i = r.data("easytabs");
            undefined === i && (i = new e.easytabs(this, t), r.data("easytabs", i));
            if (i.publicMethods[t])return i.publicMethods[t](Array.prototype.slice.call(n, 1))
        })
    }
}(jQuery), define("easyTabs", ["jquery"], function (e) {
    return function () {
        var t, n;
        return t || e.easyTabs
    }
}(this)), define("tab", ["jquery", "easyTabs"], function (e) {
    e(document).ready(function () {
        e("#tab-container").easytabs()
    })
}), requirejs.config({
    urlArgs: "v=" + Date.now(),
    shim: {easyTabs: {deps: ["jquery"], exports: "easyTabs"}},
    paths: {jquery: ["../lib/jquery"], easyTabs: "../lib/jquery.easytabs"}
}), require(["sort", "hello", "addBg", "tab"], function (e, t, n) {
    var r = [7, 3, 1, 24, 65, 5];
    console.log(r.sort(e.sortWay)), console.log(e.exportUrl()), t()
}), define("main", function () {
});