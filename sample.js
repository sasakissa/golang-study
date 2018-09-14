function adjustOrientation() {
    updateLayout();
    var t = window.mainPlayerModel.isOrientationPortrait;
    window.lastIsOrientationPortrait != t || t || window.scrollTo(0, 0),
    window.lastIsOrientationPortrait = t
}
function updateLayout() {
    var t = $(document.getElementById("player"))
      , e = t.width()
      , i = t.height();
    if (!window.mainPlayerController.isPlayingBrowseLog && window.mainPlayerController.hasAccessLogId) {
        var n = t.offset();
        window.mainPlayerModel.playerOffsetLeft = n.left,
        window.mainPlayerModel.playerOffsetTop = n.top
    }
    if (window.mainPlayerModel.playerWidth != e || window.mainPlayerModel.playerHeight != i) {
        var o = {
            width: e,
            height: i
        };
        window.mainPlayerController.LogOperation(window.mainPlayerController.constValues.BROWSE_LOG_TARGET_ID_PLAYER, window.mainPlayerController.constValues.BROWSE_LOG_ACTION_ID_SIZE_CHANGE, o),
        window.mainPlayerController.SetPlayerSize(e, i),
        window.Zenkei.layoutInfo = window.parseLayoutInfo(window.layoutInfo, "player", window.mainPlayerModel.isOrientationPortrait),
        window.mainPlayerController.StopAutoPan(),
        window.mainPlayerController.StopSlideshow(),
        window.mainPlayerController.FirePlayerSizeChangedEvent(),
        window.mainPlayerModel.userAgent.isiPhone && !window.mainPlayerModel.isOrientationPortrait && setTimeout(function() {
            window.scrollTo(0, 0)
        }, 100)
    }
}
window.Zenkei = new Object,
window.Zenkei.ver = "3.1.12",
window.Zenkei.last = "2017/12/01",
window.loadCubejs = function() {
    if (1 != window.isLoaded) {
        if (window.isLoaded = !0,
        void 0 !== window.is3dEnabled && !window.is3dEnabled())
            return console.error("[Cubejs] Error occured: Not supported browser.."),
            !1;
        window.mainPlayerModel = new Zenkei.ZenkeiModel,
        window.mainPlayerModel.projectJson = window.projectJson;
        var t = null != window.projectJson && (6 == window.projectJson.am || 7 == window.projectJson.am);
        window.mainPlayerModel.actualUserAgent = window.GetZenkeiUserAgentInfo(window.navigator.userAgent.toLowerCase()),
        window.mainPlayerModel.userAgent = t ? window.GetZenkeiUserAgentInfo(window.mainPlayerModel.projectJson.an.toLowerCase()) : window.mainPlayerModel.actualUserAgent,
        window.constValues = new Zenkei.ConstValues,
        window.mainPlayerController = new Zenkei.ZenkeiController,
        window.mainPlayerController.isPlayingBrowseLog = t,
        t || window.InitializeZenkeiPlayer()
    }
}
,
window.GetZenkeiUserAgentInfo = function(t) {
    var e = {};
    e.string = t,
    e.isIE = -1 != t.indexOf("msie") || -1 != t.indexOf("trident"),
    e.isEdge = -1 != t.indexOf("edge"),
    e.isWindowsMobile = -1 != t.indexOf("windows phone"),
    e.isWindows7 = -1 != t.indexOf("nt 6.1"),
    e.isiPhone = -1 != t.indexOf("iphone"),
    e.isiPhone6Plus = e.isiPhone ? 736 == screen.height || 736 == screen.width : !1,
    e.isiPad = -1 != t.indexOf("ipad"),
    e.isiPod = -1 != t.indexOf("ipod"),
    e.isiOS = e.isiPhone || e.isiPad || e.isiPod,
    e.isAndroid = -1 != t.indexOf("android"),
    e.isTablet = e.isiPad || e.isAndroid && -1 == t.indexOf("mobile"),
    e.isWindows = -1 != t.indexOf("windows"),
    e.isChrome = -1 != t.indexOf("chrome"),
    e.isSafari = !e.isAndroid && !e.isChrome && -1 != t.indexOf("safari"),
    e.isFireFox = -1 != t.indexOf("firefox"),
    e.isOpera = -1 != t.indexOf("opera"),
    e.isTouchDevice = e.isiOS || e.isAndroid,
    e.isChromeOver60 = !1;
    var i = t.match(/chrome\/\d+/);
    if (null != i)
        for (var n = 0; n < i.length; n++) {
            var o = i[n].replace(/chrome\//, "")
              , s = parseInt(o);
            if (!isNaN(s) && s >= 60) {
                e.isChromeOver60 = !0;
                break
            }
        }
    try {
        if (e.isiOS) {
            var a = /os (\d+)_(\d+)_?(\d+)?/.exec(t);
            if (a && 0 != a.length) {
                var l = a[1] + "." + (0 | a[2]) + "." + (0 | a[3]);
                e.osVersion = l,
                e.osVersionFloat = parseFloat(l)
            }
        }
        if (e.isAndroid) {
            var a = /android ([\.\_\d]+)/.exec(t);
            if (a && 0 != a.length) {
                var l = a[1];
                e.osVersion = l,
                e.osVersionFloat = parseFloat(l)
            }
        }
    } catch (h) {}
    return e.canShowMultiView = e.isIE || e.isEdge || e.isChrome || e.isiOS && e.osVersionFloat >= 8,
    e.canFadeAnimation = e.canShowMultiView && !e.isiPhone6Plus,
    e
}
,
window.InitializeZenkeiPlayer = function(t) {
    var e = null != window.projectJson && (6 == window.projectJson.am || 7 == window.projectJson.am);
    if (window.mainPlayerController.hasAccessLogId) {
        var i = $(document.getElementById("player")).offset();
        window.mainPlayerModel.playerOffsetLeft = i.left,
        window.mainPlayerModel.playerOffsetTop = i.top
    }
    var n = $(document.getElementById("player"))
      , o = n.width()
      , s = n.height();
    if (n.css({
        position: "relative"
    }),
    window.mainPlayerController.SetPlayerSize(o, s),
    !e) {
        var a = {
            width: o,
            height: s
        };
        window.mainPlayerController.LogOperation(window.mainPlayerController.constValues.BROWSE_LOG_TARGET_ID_PLAYER, window.mainPlayerController.constValues.BROWSE_LOG_ACTION_ID_SIZE_CHANGE, a)
    }
    if (window.Zenkei.layoutInfo = window.parseLayoutInfo(window.layoutInfo, "player", window.mainPlayerModel.isOrientationPortrait),
    window.lastIsOrientationPortrait = window.mainPlayerModel.isOrientationPortrait,
    window.mainPlayerModel.userAgent.isiPhone && o > s && setTimeout(function() {
        window.scrollTo(0, 0)
    }, 100),
    !window.Zenkei.layoutInfo)
        throw new Error("[Cubejs] Error! Cannot read layoutInfo..");
    if (void 0 == window.document.getElementById("panoramaDisplay")) {
        var l = window.document.createElement("div");
        l.id = "panoramaDisplay",
        window.document.getElementById("player").appendChild(l)
    }
    $("#panoramaDisplay").css({
        position: "relative",
        width: window.Zenkei.layoutInfo.panorama.size.width + "px"
    });
    var h = 1e3;
    if (e || (h = 500,
    window.mainPlayerModel.userAgent.isiPad || window.mainPlayerModel.userAgent.isiPhone ? null != window.layoutInfo.textureSizeForIos && void 0 != window.layoutInfo.textureSizeForIos && (h = window.layoutInfo.textureSizeForIos) : window.mainPlayerModel.userAgent.isAndroid && null != window.layoutInfo.textureSizeForAndroid && void 0 != window.layoutInfo.textureSizeForAndroid && (h = window.layoutInfo.textureSizeForAndroid)),
    window.mainPlayerModel.cubicTextureSize = h,
    void new window.Zenkei.UrlHashFragmentHandler,
    void new window.Zenkei.History,
    void new window.Zenkei.PlanList,
    void new window.Zenkei.SpotList,
    void new window.Zenkei.Loading,
    void new window.Zenkei.Slideshow,
    void new window.Zenkei.AutoPan,
    void new window.Zenkei.CustomPan,
    void new window.Zenkei.Walkthrough,
    void new window.Zenkei.SpotText,
    void new window.Zenkei.Story,
    void new window.Zenkei.GyroButton,
    window.layoutInfo.useCustomDesign && (void new window.Zenkei.CustomDesign,
    void new window.Zenkei.PaneSwitch),
    void 0 != window.Zenkei.layoutInfo.closewindowbutton && void new window.Zenkei.CloseWindowButton,
    void 0 != window.Zenkei.layoutInfo.spottitle && void new window.Zenkei.SpotTitle,
    void 0 != window.Zenkei.layoutInfo.spotlistex && void new window.Zenkei.SpotListEx,
    void new window.Zenkei.Panorama(window.Zenkei.layoutInfo.panorama.size),
    void new window.Zenkei.PlanView,
    void new window.Zenkei.ProgressCircle,
    void new window.Zenkei.PopupText,
    void new window.Zenkei.HmdButton,
    void new window.Zenkei.SpotTextButton,
    void new window.Zenkei.AnnotationButton,
    void new window.Zenkei.PrevSpotButton,
    void new window.Zenkei.NextSpotButton,
    void new window.Zenkei.ControlBar,
    void new window.Zenkei.MarqueeText,
    void new window.Zenkei.SpotListView,
    void new window.Zenkei.HelpView,
    window.setTimeout(function() {
        $("#player").css({
            "background-image": "none"
        })
    }, 3e3),
    e) {
        void new window.Zenkei.TouchPretender;
        var n = document.getElementById("player");
        n.style.visibility = "visible",
        n.style.position = "relative",
        n.addEventListener("touchstart", window.FirstEventHook, !0),
        n.addEventListener("touchmove", window.FirstEventHook, !0),
        n.addEventListener("touchend", window.FirstEventHook, !0),
        n.addEventListener("mousewheel", window.FirstEventHook, !0),
        n.addEventListener("mousedown", window.FirstEventHook, !0),
        n.addEventListener("mousemove", window.FirstEventHook, !0),
        n.addEventListener("mouseup", window.FirstEventHook, !0),
        n.addEventListener("mouseout", window.FirstEventHook, !0),
        n.addEventListener("click", window.FirstEventHook, !0),
        window.mainPlayerController.SetBrowseLogArray(t)
    } else
        $(window).trigger("popstate")
}
,
window.onload = window.loadCubejs,
function(t) {
    t.flickSimple = function(e, i) {
        this.setup(t(e), i)
    }
    ,
    t.extend(t.flickSimple.prototype, {
        elm: null,
        target: null,
        disabled: !1,
        snap: "element",
        ratio: 5,
        duration: 600,
        lock: !1,
        onChange: null,
        onResize: null,
        onAnimationEnd: null,
        onClick: null,
        vertical: !1,
        horizontal: !0,
        paginate: "x",
        elmWidth: 0,
        elmHeight: 0,
        page: 1,
        pageWidth: 0,
        pageHeight: 0,
        pageLength: 0,
        android: !1,
        webkit: !0,
        use3d: !0,
        touchable: !0,
        anc: null,
        touchhold: !1,
        startX: null,
        startY: null,
        preX: 0,
        preY: 0,
        currentX: 0,
        currentY: 0,
        flickX: 0,
        flickY: 0,
        nextX: 0,
        nextY: 0,
        debug: null,
        setup: function(e, i) {
            var n = this;
            return n.debug = t("#debug"),
            n.elm = e,
            n.elm.css({
                overflow: "hidden"
            }),
            n.target = i.target || t(n.elm.children().get(0)),
            n.android = void 0 === i.android ? -1 !== navigator.userAgent.indexOf("Android") : i.android,
            n.webkit = "undefined" != typeof WebKitTransitionEvent,
            n.use3d = n.webkit && !n.android,
            n.touchable = "undefined" != typeof ontouchstart,
            void 0 !== i.disabled && (n.disabled = i.disabled),
            void 0 !== i.snap && (n.snap = i.snap),
            void 0 !== i.ratio && (n.ratio = i.ratio),
            void 0 !== i.duration && (n.duration = i.duration),
            void 0 !== i.lock && (n.lock = i.lock),
            void 0 !== i.vertical && (n.vertical = i.vertical),
            void 0 !== i.horizontal && (n.horizontal = i.horizontal),
            void 0 !== i.paginate && (n.paginate = i.paginate),
            n.onChange = i.onChange,
            n.onResize = i.onResize,
            n.onAnimationEnd = i.onAnimationEnd,
            n.onClick = i.onClick,
            "object" != typeof window.onorientationchange || n.android ? t(window).bind("resize", function() {
                n.updateSize()
            }) : t(window).bind("orientationchange", function() {
                n.updateSize()
            }),
            n.init(),
            n.webkit ? n.target.css({
                position: "relative",
                webkitTransition: "none",
                webkitTransform: n.use3d ? "translate3d(0,0,0)" : "translate(0,0)"
            }) : n.target.css({
                position: "relative"
            }),
            n.updateSize(),
            n.touchable ? n.elm.bind("touchstart", function(t) {
                n.touchstart(t)
            }).bind("touchmove", function(t) {
                n.touchmove(t)
            }).bind("touchend", function(t) {
                n.touchend(t)
            }) : (n.elm.bind("mousedown", function(t) {
                n.touchstart(t)
            }),
            t("body").bind("mouseup", function(t) {
                n.touchend(t)
            }).bind("mousemove", function(t) {
                n.touchmove(t)
            })),
            n.target.bind("webkitTransitionEnd", function(e) {
                t.isFunction(n.onAnimationEnd) && n.onAnimationEnd(e)
            }),
            n
        },
        nextPage: function(t) {
            return this.goTo(this.page + (t || 1))
        },
        prevPage: function(t) {
            return this.goTo(this.page - (t || 1))
        },
        goTo: function(t) {
            t > this.pageLength && (t = this.pageLength),
            t--;
            var e, i, n;
            "y" === this.paginate ? (n = Math.ceil(this.elmHeight / this.pageHeight) + 1,
            e = Math.floor(t / n),
            i = t % n) : (n = Math.ceil(this.elmWidth / this.pageWidth) + 1,
            i = Math.floor(t / n),
            e = t % n);
            var o = e * this.pageWidth
              , s = i * this.pageHeight;
            return this.move(-o, -s)
        },
        move: function(e, i) {
            var n = this;
            return !n.horizontal || e >= 0 ? e = 0 : e < -n.elmWidth && (e = -n.elmWidth),
            !n.vertical || i >= 0 ? i = 0 : i < -n.elmHeight && (i = -n.elmHeight),
            n.webkit ? n.target.css({
                webkitTransition: "-webkit-transform 0.3s ease-in",
                webkitTransform: n.use3d ? "translate3d(" + e + "px," + i + "px,0)" : "translate(" + e + "px," + i + "px)"
            }) : n.target.animate({
                left: e + "px",
                top: i + "px"
            }, function(e) {
                t.isFunction(n.onAnimationEnd) && n.onAnimationEnd(e)
            }),
            n.nextX = e,
            n.nextY = i,
            n.update(e, i)
        },
        updateSize: function() {
            var e = this
              , i = "undefined" != typeof window.orientation ? 0 === window.orientation ? "portrait" : "landscape" : window.innerWidth < window.innerHeight ? "portrait" : "landscape"
              , n = e.target.children();
            e.elm.removeClass("landscape portrait").addClass(i),
            e.target.removeClass("landscape portrait").addClass(i),
            n.removeClass("landscape portrait").addClass(i);
            var o = e.target.width()
              , s = e.target.height()
              , a = e.elm.width()
              , l = e.elm.height();
            if (e.elmWidth = o - a,
            e.elmHeight = s - l,
            e.pageWidth = 0,
            e.pageHeight = 0,
            e.pageLength = 0,
            e.snap) {
                if ("element" === e.snap)
                    e.pageWidth = a,
                    e.pageHeight = l;
                else if ("first" === e.snap)
                    e.pageWidth = t(n.get(0)).width(),
                    e.pageHeight = t(n.get(0)).height();
                else if ("smallest" === e.snap) {
                    var h = 0;
                    n.each(function() {
                        var e = t(this).width();
                        (h > e || 0 == h) && (h = e)
                    }),
                    e.pageWidth = h,
                    h = 0,
                    n.each(function() {
                        var e = t(this).height();
                        (h > e || 0 == h) && (h = e)
                    }),
                    e.pageHeight = h
                } else
                    "object" == typeof e.snap ? (e.pageWidth = e.snap[0],
                    e.pageHeight = e.snap[1]) : isNaN(e.snap) || (e.pageWidth = e.snap,
                    e.pageHeight = e.snap);
                e.pageLength = Math.ceil(o / e.pageWidth),
                s > e.pageHeight && (e.pageLength *= Math.ceil(s / e.pageHeight))
            }
            return t.isFunction(e.onResize) && e.onResize(),
            e.goTo(e.page),
            e
        },
        touchstart: function(e) {
            var i = this
              , n = i.touchable ? event.changedTouches[0] : e;
            if (!i.disabled) {
                i.startX = n.clientX,
                i.startY = n.clientY,
                i.touchhold = !1;
                var o = "A" === e.target.tagName ? t(e.target) : t(e.target).closest("a");
                o.length > 0 && (i.anc = o),
                setTimeout(function() {
                    if (i.anc) {
                        i.touchhold = !0;
                        var e = i.anc
                          , n = t.data(e.get(0), "flickSimple.link");
                        n && (e.attr("href", n),
                        setTimeout(function() {
                            e && e.attr("href", "javascript:;")
                        }, 200))
                    }
                }, 600)
            }
        },
        touchmove: function(t) {
            var e = this;
            if (!e.disabled) {
                if ((e.android || e.lock) && t.preventDefault(),
                null === e.startX || null === e.startY)
                    return e.anc = null,
                    void 0;
                var i = e.touchable ? t.originalEvent.touches[0] : t
                  , n = i.clientX
                  , o = i.clientY;
                (Math.abs(e.startX - n) > 16 || Math.abs(e.startY - i.clientY) > 16) && (e.anc = null),
                e.nextX = e.horizontal ? (e.currentX || 0) + (n - e.startX) : 0,
                e.nextY = e.vertical ? (e.currentY || 0) + (o - e.startY) : 0,
                e.webkit ? e.target.css({
                    webkitTransition: "none",
                    webkitTransform: e.use3d ? "translate3d(" + e.nextX + "px," + e.nextY + "px,0)" : "translate(" + e.nextX + "px," + e.nextY + "px)"
                }) : e.target.css({
                    left: e.nextX + "px",
                    top: e.nextY + "px"
                }),
                e.flickX = e.preX - n,
                e.flickY = e.preY - o,
                e.preX = n,
                e.preY = o
            }
        },
        touchend: function(e) {
            var i = this;
            if (!i.disabled && null !== i.startX && null !== i.startY) {
                if (i.startX = null,
                i.startY = null,
                i.anc && !i.touchhold) {
                    t.isFunction(i.onClick) && i.onClick(i.anc);
                    var n = i.anc.get(0)
                      , o = t.data(n, "flickSimple.link")
                      , s = t.data(n, "flickSimple.target");
                    o && (s && "_self" !== s ? ("_blank" === s && (s = ""),
                    window.open(o, s)) : location.href = o),
                    e.preventDefault()
                }
                i.touchhold = !1;
                var a = i.nextX + i.flickX * -i.ratio
                  , l = i.nextY + i.flickY * -i.ratio;
                if (i.pageWidth) {
                    var h = a % i.pageWidth;
                    a -= h < -i.pageWidth / 2 ? h + i.pageWidth : h;
                    var r = l % i.pageHeight;
                    l -= r < -i.pageHeight / 2 ? r + i.pageHeight : r
                }
                !i.horizontal || a >= 0 ? a = 0 : a < -i.elmWidth && (a = -i.elmWidth),
                !i.vertical || l >= 0 ? l = 0 : l < -i.elmHeight && (l = -i.elmHeight),
                i.webkit ? i.target.css({
                    webkitTransition: "-webkit-transform " + i.duration / 1e3 + "s ease-out",
                    webkitTransform: i.use3d ? "translate3d(" + a + "px," + l + "px,0)" : "translate(" + a + "px," + l + "px)"
                }) : i.target.animate({
                    left: a + "px",
                    top: l + "px"
                }, i.duration, function(n, o, s, a, l) {
                    return t.isFunction(i.onAnimationEnd) && i.onAnimationEnd(e),
                    -a * (o /= l) * (o - 2) + s
                }),
                i.update(a, l),
                e.stopPropagation()
            }
        },
        update: function(e, i) {
            var n = this;
            if (n.pageWidth || n.pageHeight) {
                var o;
                "y" === n.paginate ? (o = Math.ceil(this.elmHeight / this.pageHeight) + 1,
                n.page = Math.ceil(-i / n.pageHeight) + Math.ceil(-e / n.pageWidth) * o + 1) : (o = Math.ceil(this.elmWidth / this.pageWidth) + 1,
                n.page = Math.ceil(-e / n.pageWidth) + Math.ceil(-i / n.pageHeight) * o + 1)
            }
            return (n.currentX !== e || n.currentY !== i) && (n.currentX = e,
            n.currentY = i,
            t.isFunction(n.onChange) && n.onChange()),
            n
        },
        no_mousedown: function(t) {
            t.preventDefault()
        },
        init: function() {
            var e = this;
            return e.target.find("a").each(function() {
                var i = t(this)
                  , n = i.attr("href")
                  , o = i.attr("target");
                n && "javascript:;" !== n && t.data(this, "flickSimple.link", n),
                t.data(this, "flickSimple.target", o || ""),
                i.attr("href", "javascript:;").removeAttr("target"),
                e.touchable || i.unbind("mousedown", e.no_mousedown).bind("mousedown", e.no_mousedown)
            }),
            e.touchable || e.target.find("img").unbind("mousedown", e.no_mousedown).bind("mousedown", e.no_mousedown),
            e
        }
    }),
    t.fn.flickSimple = function(e) {
        var i = this;
        if ("string" == typeof e) {
            var n = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var o, s = t.data(this, "flickSimple");
                s && (t.isFunction(s[e]) ? o = s[e].apply(s, n) : (n.length > 0 && (s[e] = n[1]),
                o = s[e])),
                o !== s && (i = o)
            })
        } else
            this.each(function() {
                var n = t.data(this, "flickSimple");
                n ? i = n : t.data(this, "flickSimple", new t.flickSimple(this,e || {}))
            });
        return i
    }
}(jQuery),
function(t, e) {
    var i = {
        p: function(i, n, o) {
            if (i !== e && n !== e && o !== e) {
                var s = 0
                  , a = t.parseUrlParameter("loglevel");
                if ("" !== a && (s = a),
                i = t.parseInt(i),
                !(i > s)) {
                    var l = "[" + (new Date).toString() + "]" + " " + "[" + n + "]" + " " + o;
                    switch (i) {
                    case 4:
                    case 3:
                        console.error(l);
                        break;
                    case 2:
                        console.warn(l);
                        break;
                    case 1:
                        console.info(l);
                        break;
                    case 0:
                        console.log(l)
                    }
                }
            }
        }
    };
    t.Zenkei || (t.Zenkei = {}),
    t.Zenkei.Log = i
}(window),
"function" != typeof Function.prototype.bind && (Function.prototype.bind = function(t) {
    var e = this;
    return function() {
        var i = Array.prototype.slice.call(arguments);
        return e.apply(t || null, i)
    }
}
),
function(t, e) {
    t.parseUrlParameter = function(i) {
        var n = function() {
            for (var e, i = [], n = t.location.href.slice(t.location.href.indexOf("?") + 1).split("&"), o = 0; o < n.length; o++)
                n[o].length < 3 || (e = n[o].split("="),
                i.push(e[0]),
                i[e[0]] = e[1]);
            return i
        }();
        return n[i] != e && null != n[i] ? n[i] : ""
    }
}(window),
Function.prototype.applyTimeout = function(t, e, i) {
    var n = this;
    return setTimeout(function() {
        n.apply(e, i)
    }, t)
}
,
Function.prototype.callTimeout = function(t, e) {
    return this.applyTimeout(t, e, Array.prototype.slice.call(arguments, 2))
}
,
Function.prototype.applyInterval = function(t, e, i) {
    var n = this;
    return setInterval(function() {
        n.apply(e, i)
    }, t)
}
,
Function.prototype.callInterval = function(t, e) {
    return this.applyInterval(t, e, Array.prototype.slice.call(arguments, 2))
}
,
function(t) {
    function e(e, i) {
        for (var n = i ? i : t.projectJson, o = 0, s = n.pl.length; s > o; o++)
            for (var a = n.pl[o], l = 0, h = a.sp.length; h > l; l++) {
                var r = a.sp[l];
                if (e === r.ad || e === n.aa + r.ad)
                    return t.mainPlayerController.SelectPlanAndSpot(o, l),
                    !0
            }
        return !1
    }
    function i(e, i) {
        if (null !== i && 0 !== i.length && null !== e && 0 !== e.length)
            if ("mainPlayer" == e)
                t.ChangeSpotByFilename(i);
            else {
                var n = document.getElementById(e);
                n.contentWindow.SelectSpot("mainPlayer", i)
            }
    }
    t.ChangeSpotByFilename = e,
    t.SelectSpot = i
}(window),
function(t) {
    var e = function(t) {
        var e = $("#container1 > div > div > div > div").get(0)
          , i = e.style.webkitTransform;
        if (i.indexOf(t, 0) < 0)
            return null;
        var n = i.indexOf("(", i.indexOf(t, 0))
          , o = i.indexOf(")", n)
          , s = i.substring(n + 1, o);
        return s.replace("deg", "").replace("px", ""),
        parseFloat(s)
    }
      , i = function() {
        return "undefined" != typeof t.mainPlayerModel ? t.mainPlayerModel.yaw : e("rotateY")
    }
      , n = function() {
        return e("rotateX")
    }
      , o = function() {
        return e("translateZ")
    };
    t.GetHorizontalAngle = i,
    t.GetVerticalAngle = n,
    t.GetHorizontalFov = o
}(window),
function(t) {
    function e(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        t.stopPropagation()
    }
    function i(i) {
        if (!t.mainPlayerController.isPlayingBrowseLog) {
            if (i)
                return t.removeEventListener("touchstart", e, !0),
                t.removeEventListener("touchmove", e, !0),
                t.removeEventListener("touchend", e, !0),
                t.removeEventListener("mousewheel", e, !0),
                t.removeEventListener("mousedown", e, !0),
                t.removeEventListener("mousemove", e, !0),
                t.removeEventListener("mouseup", e, !0),
                t.removeEventListener("mouseout", e, !0),
                t.removeEventListener("click", e, !0),
                void 0;
            t.addEventListener("touchstart", e, !0),
            t.addEventListener("touchmove", e, !0),
            t.addEventListener("touchend", e, !0),
            t.addEventListener("mousewheel", e, !0),
            t.addEventListener("mousedown", e, !0),
            t.addEventListener("mousemove", e, !0),
            t.addEventListener("mouseup", e, !0),
            t.addEventListener("mouseout", e, !0),
            t.addEventListener("click", e, !0)
        }
    }
    t.enableMouseEvents = i,
    t.FirstEventHook = e
}(window),
window.parseLayoutInfo = function(t, e, i) {
    if (!t)
        return t;
    var n = window.mainPlayerModel.userAgent.isiPad && window.mainPlayerModel.userAgent.osVersionFloat >= 7;
    n && $(document.getElementsByTagName("body")).css("height", "");
    var o = e ? e : "player"
      , s = $("#" + o)
      , a = window.parseInt(s.css("width").replace("px", ""))
      , l = a > 0 ? a : $(window).width()
      , h = window.parseInt(s.css("height").replace("px", ""))
      , r = h > 0 ? h : $(window).height();
    n && !i && 692 == r && (r = 672,
    $(document.getElementsByTagName("body")).css("height", "672px"));
    var d = {}
      , c = null;
    c = window.layoutInfo.useOrientationEvent ? i ? "portrait" : "landscape" : "portrait";
    for (var u in t[c]) {
        d[u] = {};
        for (var g in t[c][u])
            if (d[u][g] = {},
            "size" === g) {
                for (var p in t[c][u][g]) {
                    var A = t[c][u][g][p];
                    if ("number" == typeof A)
                        switch (p) {
                        case "height":
                        case "top":
                        case "bottom":
                            0 > A && (A = r * (Math.abs(A) / 100)),
                            d[u][g][p] = A;
                            break;
                        case "width":
                        case "left":
                        case "right":
                            0 > A && (A = l * (Math.abs(A) / 100)),
                            d[u][g][p] = A;
                            break;
                        case "heightbywidth":
                            0 > A && (A = l * (Math.abs(A) / 100)),
                            d[u][g].height = Math.ceil(A);
                            break;
                        default:
                            d[u][g][p] = A
                        }
                    else {
                        if ("hidewithonespot" == p && "true" == A && void 0 != d[u][g].height)
                            try {
                                var m = window.mainPlayerModel.planIndex;
                                -1 == m && (m = 0),
                                window.projectJson.pl[m].sp.length <= 1 && (d[u][g].height = 0)
                            } catch (E) {}
                        d[u][g][p] = A
                    }
                }
                for (var p in t[c][u][g]) {
                    var A = t[c][u][g][p];
                    switch (p) {
                    case "heightoffset":
                        try {
                            var r = d[u][g].height;
                            if (void 0 != r) {
                                var I = d[A][g].height;
                                void 0 != I && (d[u][g].height = r - I)
                            }
                        } catch (E) {}
                    }
                }
            } else
                "heightoffset" === g && (d[u].size.height = d[u].size.height - t[c][u][g]),
                d[u][g] = t[c][u][g]
    }
    return d.useUrlHashFragment = t.useUrlHashFragment ? !0 : !1,
    d
}
,
window.is3dEnabled = function() {
    var t;
    if (void 0 == document.body.style.MozPerspective)
        t = void 0 !== document.body.style.WebkitPerspective || void 0 !== document.body.style.msPerspective;
    else {
        var e = window.navigator.userAgent.toLowerCase();
        t = !(-1 != e.indexOf("android"))
    }
    return t ? !0 : (console.error("[Cubejs] Your browser doesn't supourt CSS3 3D transforms"),
    !1)
}
,
function(t) {
    $(t).on("resize", function() {
        updateLayout()
    })
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    function n() {
        this.Initialize()
    }
    function o() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        viewerUtil: null,
        constValues: null,
        accessLogId: null,
        hasAccessLogId: !1,
        lastLogPanoramaYaw: null,
        lastLogPanoramaPitch: null,
        lastLogPanoramaFov: null,
        lastLogPanoramaCenterChangeElapsedTime: null,
        lastLogPlanImageWidth: null,
        lastLogPlanImageHeight: null,
        lastLogPlanImageLeft: null,
        lastLogPlanImageTop: null,
        lastLogTouchMoveX: null,
        lastLogTouchMoveY: null,
        lastLogTouchMoveElapsedTime: null,
        browseLogArray: null,
        browseLogPostUrl: null,
        startTime: null,
        shouldFireViewChangeEvent: !0,
        canBackSpot: !1,
        isFirstSpotLoadCompleted: !1,
        isPlayingBrowseLog: !1,
        browseLogArray: null,
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.constValues = t.constValues,
            this.browseLogArray = new Array;
            var i = this.model.projectJson;
            if (i.al != e && i.al >= 0 && i.am != e)
                switch (this.hasAccessLogId = !0,
                this.accessLogId = i.al,
                this.startTime = new Date,
                this.browseLogPostUrl = "https://zenkeisysapi.azurewebsites.net/",
                i.am) {
                case 0:
                case 6:
                    this.browseLogPostUrl = this.browseLogPostUrl + "webpage-access-logs/" + this.accessLogId + "/browse-logs";
                    break;
                case 1:
                case 7:
                    this.browseLogPostUrl = this.browseLogPostUrl + "virtualtour-access-logs/" + this.accessLogId + "/browse-logs"
                }
            var n = 0;
            if (null != i) {
                var o = i.pl;
                if (null != o && 0 != o.length) {
                    for (var s = o.length, a = 0, l = 0; s > l; l++) {
                        var h = o[l];
                        if (h.ad) {
                            a++;
                            var r = h.sp;
                            if (null != r) {
                                var d = r.length;
                                if (n += d,
                                this.model.userAgent.canShowMultiView)
                                    for (var c = 0; d > c; c++) {
                                        var u = r[c];
                                        if (null != u && 0 != u.aa) {
                                            var g = u.wt;
                                            if (null == g || 0 == g.length) {
                                                var p = u.an
                                                  , A = !1;
                                                if (null != p)
                                                    for (var m = p.length, E = 0; m > E; E++) {
                                                        var I = p[E];
                                                        if (2 == I.ab) {
                                                            A = !0;
                                                            break
                                                        }
                                                    }
                                                if (!A) {
                                                    var T = {
                                                        aa: -1,
                                                        ab: -1,
                                                        ac: 0,
                                                        ad: -.7,
                                                        ae: 350,
                                                        af: 0,
                                                        ag: 0,
                                                        ah: 0,
                                                        ai: "BACK",
                                                        aj: null,
                                                        ak: null,
                                                        al: null,
                                                        am: null,
                                                        an: null,
                                                        ao: null,
                                                        ap: !1,
                                                        aq: !1
                                                    };
                                                    p.push(T)
                                                }
                                            }
                                        }
                                    }
                            }
                        } else
                            o.splice(l, 1),
                            l--,
                            s--
                    }
                    this.model.totalPlanCount = a
                }
                i.pl = o
            }
            return this.model.totalSpotCount = n,
            this.viewerUtil = new t.Zenkei.ViewerUtil(Zenkei.Utility.EMPTY_SPOTMEDIAINFO),
            this.viewerUtil.initialize(),
            this
        },
        IsBlackAreaVisible: function() {
            var t = this.model.yaw
              , e = this.model.pitch
              , i = this.viewerUtil.SetPov(t, e)
              , n = i[0];
            return Math.abs(t - n) > .5
        },
        GetValidAngles: function(t, e) {
            return this.viewerUtil.SetPov(t, e)
        },
        GetSpotJsonByIndex: function(t) {
            if (0 > t)
                return null;
            var e = this.model.planJson;
            if (null == e)
                return null;
            var i = e.sp;
            return null == i || t >= i.length ? null : i[t]
        },
        GetSpotIndexByDirectoryName: function(t) {
            var e = this.model.projectJson;
            if (null == e)
                return null;
            var i = e.pl;
            if (null == i)
                return null;
            for (var n = i.length, o = 0; n > o; o++) {
                var s = i[o];
                if (null != s) {
                    var a = s.sp;
                    if (null != a)
                        for (var l = a.length, h = 0; l > h; h++) {
                            var r = a[h];
                            if (t === r.ad)
                                return h
                        }
                }
            }
            return null
        },
        SelectPlan: function(t) {
            this.SelectPlanAndSpot(t, 0, !1)
        },
        SelectSpot: function(t, e) {
            this.SelectPlanAndSpot(this.model.planIndex, t, e)
        },
        SelectSpotById: function(t) {
            if (null == t)
                return !1;
            var e = this.model.projectJson;
            if (null == e)
                return !1;
            var i = e.pl;
            if (null == i)
                return !1;
            for (var n = i.length, o = 0; n > o; o++) {
                var s = i[o]
                  , a = s.sp;
                if (null != a)
                    for (var l = a.length, h = 0; l > h; h++) {
                        var r = a[h];
                        if (r.ba == t)
                            return this.SelectPlanAndSpot(o, h, !1),
                            !0
                    }
            }
            return !1
        },
        SelectSpotByDirectoryName: function(t) {
            if (null == t)
                return !1;
            var e = this.model.projectJson;
            if (null == e)
                return !1;
            var i = e.pl;
            if (null == i)
                return !1;
            for (var n = i.length, o = 0; n > o; o++) {
                var s = i[o]
                  , a = s.sp;
                if (null != a)
                    for (var l = a.length, h = 0; l > h; h++) {
                        var r = a[h];
                        if (r.ad == t)
                            return this.SelectPlanAndSpot(o, h, !1),
                            !0
                    }
            }
            return !1
        },
        SelectPlanAndSpot: function(t, e, i) {
            if (!this.model.isSpotSelecting) {
                this.StopAutoPan(),
                0 > e && (e = 0);
                var n = this.model.projectJson;
                if (null != n) {
                    var o = n.pl;
                    if (!(null == o || t >= o.length)) {
                        var s = o[t];
                        if (null != s) {
                            var a = s.sp
                              , l = null;
                            if (null != a && e < a.length && (l = a[e]),
                            this.isFirstSpotLoadCompleted && (this.canBackSpot = !0),
                            this.model.planIndex != t)
                                return this.model.lastPlanIndex = this.model.planIndex,
                                this.model.planIndex = t,
                                this.model.planJson = s,
                                this.ClearLastPlanLogValue(),
                                this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PLAN_AND_SPOT, this.constValues.BROWSE_LOG_ACTION_ID_SELECT, t + "," + e),
                                this.model.planSelectEventHandler.Fire(),
                                this.model.spotIndex = e,
                                this.model.spotJson = l,
                                i || (this.model.isSpotSelecting = !0),
                                this.ClearLastPanoramaLogValue(),
                                this.model.spotSelectEventHandler.Fire(),
                                this.model.pauseAutoPanEventHandler.Fire(),
                                void 0;
                            this.model.spotIndex != e && (this.model.spotIndex = e,
                            this.model.spotJson = l,
                            i || (this.model.isSpotSelecting = !0),
                            this.ClearLastPanoramaLogValue(),
                            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PLAN_AND_SPOT, this.constValues.BROWSE_LOG_ACTION_ID_SELECT, t + "," + e),
                            this.model.spotSelectEventHandler.Fire(),
                            this.model.pauseAutoPanEventHandler.Fire()),
                            this.isPlayingBrowseLog && this.FirePretendTouchEvent(null)
                        }
                    }
                }
            }
        },
        SelectPlanSilent: function(t) {
            this.ClearLastPlanLogValue(),
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PLAN, this.constValues.BROWSE_LOG_ACTION_ID_SILENT_SELECT, t),
            this.model.planIndexSilent = t,
            this.model.planSilentSelectEventHandler.Fire()
        },
        SelectSpotForWalkThroughFadeAnimation: function(t) {
            this.model.isWalkThroughExecuting && this.model.selectSpotForWalkThroughFadeAnimationEventHandler.Fire(t)
        },
        SetSpotMediaInfo: function(t) {
            this.viewerUtil.SetSpotMediaInfo(t),
            this.model.spotMediaInfo = t,
            this.model.isWalkThroughExecuting ? (this.model.yaw = -t.spotInitYaw,
            this.model.pitch = 0,
            this.viewerUtil.SetPerspective2(this.model.yaw, this.model.pitch, this.model.initPerspectiveAfterWalkThrough)) : (this.model.yaw = this.viewerUtil.yaw,
            this.model.pitch = this.viewerUtil.pitch);
            var e = this.viewerUtil.perspective;
            e > this.model.maxPerspective && (e = this.model.maxPerspective),
            this.model.perspective = e,
            this.model.horizontalFov = 2 * (180 * Math.atan(.5 * this.model.viewWidth / e) / Math.PI),
            this.model.spotMediaInfoLoadCompletedEventHandler.Fire()
        },
        StartAutoPan: function() {
            if (!this.model.isWalkThroughExecuting && !this.model.isHmdModeEnabled) {
                var t = this.model.spotJson;
                return null == t || 0 == t.am ? (this.StopAutoPan(),
                void 0) : (this.model.isAutoPanEnabled || (this.StopGyroMode(),
                this.model.isAutoPanEnabled = !0,
                this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_AUTOPAN, this.constValues.BROWSE_LOG_ACTION_ID_START, null),
                this.model.startAutoPanEventHandler.Fire()),
                void 0)
            }
        },
        StopAutoPan: function() {
            this.model.isAutoPanEnabled && (this.model.isAutoPanEnabled = !1,
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_AUTOPAN, this.constValues.BROWSE_LOG_ACTION_ID_END, null),
            this.model.pauseAutoPanEventHandler.Fire())
        },
        StartSlideshow: function() {
            if (!this.model.isSlideshowEnabled) {
                var t = this.model.projectJson;
                null != t && 0 != t.ab && (this.model.isSlideshowEnabled = !0,
                this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_SLIDESHOW, this.constValues.BROWSE_LOG_ACTION_ID_START, null),
                this.model.startSlideshowEventHandler.Fire())
            }
        },
        StopSlideshow: function() {
            this.model.isSlideshowEnabled && (this.model.isSlideshowEnabled = !1,
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_SLIDESHOW, this.constValues.BROWSE_LOG_ACTION_ID_END, null),
            this.model.pauseSlideshowEventHandler.Fire())
        },
        SetIsGyroEventSupported: function(t) {
            this.model.isGyroEventSupported != t && (this.model.isGyroEventSupported = t,
            this.model.isGyroEventSupportedChangedEventHandler.Fire())
        },
        SwitchGyroMode: function() {
            this.model.isGyroModeEnabled ? this.StopGyroMode() : this.StartGyroMode()
        },
        StartGyroMode: function() {
            this.model.isGyroEventSupported && !this.model.isGyroModeEnabled && (this.StopAutoPan(),
            this.StopSlideshow(),
            this.model.isGyroModeEnabled = !0,
            this.model.gyroModeStartEventHandler.Fire())
        },
        StopGyroMode: function() {
            this.model.isGyroEventSupported && this.model.isGyroModeEnabled && (this.model.isGyroModeEnabled = !1,
            this.model.gyroModeStopEventHandler.Fire())
        },
        SwitchHmdMode: function() {
            this.model.isHmdModeEnabled ? this.StopHmdMode() : this.StartHmdMode()
        },
        StartHmdMode: function() {
            this.model.isGyroEventSupported && !this.model.isHmdModeEnabled && (this.StopAutoPan(),
            this.StopSlideshow(),
            this.model.isHmdModeEnabled = !0,
            this.model.hmdModeStartEventHandler.Fire())
        },
        StopHmdMode: function() {
            this.model.isHmdModeEnabled && (this.model.isHmdModeEnabled = !1,
            this.model.hmdModeStopEventHandler.Fire())
        },
        SetViewSize: function(t, e) {
            this.model.viewWidth = t,
            this.model.viewHeight = e,
            this.viewerUtil.SetSize(t, e);
            var i = .5 * t / Math.tan(Math.PI / 12);
            1 / 0 == i && (i = 2e3);
            var n = this.viewerUtil.perspectiveMin;
            n > i && (i = n),
            this.model.maxPerspective = i
        },
        SetPlayerSize: function(t, e) {
            this.model.playerWidth = t,
            this.model.playerHeight = e,
            this.model.isOrientationPortrait = e >= t
        },
        SetShouldFireViewChangeEvent: function(t) {
            this.shouldFireViewChangeEvent = t
        },
        SetYawAndPitch: function(t, e) {
            if (this.model.isWalkThroughExecuting)
                return this.model.yaw = t,
                this.model.pitch = e,
                this.model.viewChangeEventHandler.Fire(),
                void 0;
            var i = t
              , n = e
              , o = this.model.yaw
              , s = this.model.pitch;
            if (0 != this.model.spotLensType) {
                var a = this.viewerUtil.SetPov(t, e);
                i = a[0],
                n = a[1]
            }
            (i != o || n != s) && (this.model.yaw = i,
            this.model.pitch = n,
            this.shouldFireViewChangeEvent && (this.model.viewChangeEventHandler.Fire(),
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE, null)))
        },
        SetPerspective: function(t) {
            if (0 != t) {
                var e = this.model.yaw
                  , i = this.model.pitch
                  , n = this.model.perspective
                  , o = e
                  , s = i
                  , a = t;
                if (0 != this.model.spotLensType) {
                    t > this.model.maxPerspective && (t = this.model.maxPerspective),
                    t < this.viewerUtil.perspectiveMin && (t = this.viewerUtil.perspectiveMin);
                    var l = this.viewerUtil.SetPerspective2(e, i, t);
                    o = l[0],
                    s = l[1],
                    a = l[2]
                }
                (o != e || s != i || a != n) && (this.model.yaw = o,
                this.model.pitch = s,
                this.model.perspective = a,
                this.model.horizontalFov = 2 * (180 * Math.atan(.5 * this.model.viewWidth / a) / Math.PI),
                this.shouldFireViewChangeEvent && (this.model.viewChangeEventHandler.Fire(),
                this.model.isWalkThroughExecuting || this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.constValues.BROWSE_LOG_ACTION_ID_FOV_CHANGE, null)))
            }
        },
        SetHorizontalFov: function(t) {
            this.model.horizontalFov = t,
            this.model.perspective = .5 * this.model.viewWidth / Math.tan(t * Math.PI / 360),
            this.shouldFireViewChangeEvent && (this.model.viewChangeEventHandler.Fire(),
            this.model.isWalkThroughExecuting || this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.constValues.BROWSE_LOG_ACTION_ID_FOV_CHANGE, null))
        },
        SetMaxHorizontalFov: function(t) {
            this.model.maxHorizontalFov = t
        },
        SetMinYaw: function(t) {
            this.model.minYaw = t
        },
        SetMaxYaw: function(t) {
            this.model.maxYaw = t
        },
        SetMinPitch: function(t) {
            this.model.minPitch = t
        },
        SetMaxPitch: function(t) {
            this.model.maxPitch = t
        },
        SetInitYawAfterWalkThrough: function(t) {
            this.model.initYawAfterWalkThrough = t
        },
        SetInitPerspectiveAfterWalkThrough: function(t) {
            this.model.initPerspectiveAfterWalkThrough = t
        },
        ExecuteAnnotation: function(e) {
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_ANNOTATION, this.constValues.BROWSE_LOG_ACTION_ID_SELECT, e);
            var i = this.model.spotJson;
            if (null != i) {
                var n = i.an;
                if (!(null == n || e >= n.length)) {
                    var o = n[e];
                    switch (o.ab) {
                    case -1:
                        this.model.isHmdModeEnabled && this.FireBackSpotEvent();
                        break;
                    case 0:
                        if (!this.model.isHmdModeEnabled) {
                            var s = o.ai
                              , a = o.aj;
                            this.ShowPopupText(s, a)
                        }
                        break;
                    case 1:
                        this.isPlayingBrowseLog || this.model.isHmdModeEnabled || t.open(o.ak);
                        break;
                    case 2:
                        this.isPlayingBrowseLog || (this.model.isHmdModeEnabled && this.StopGyroMode(),
                        this.SelectSpotByDirectoryName(o.al));
                        break;
                    case 4:
                        var l = 0;
                        this.model.isViewFlipped && (l = 2);
                        var h = "annotation" + l + "-" + e
                          , r = $("#" + h).children()[1];
                        r.paused ? r.play() : r.pause();
                        break;
                    case 5:
                        t.top.location = "tel:" + String(o.ak);
                        break;
                    default:
                        return
                    }
                }
            }
        },
        ShowPopupText: function(t, e) {
            var i = {
                title: t,
                description: e
            };
            this.FireShowPopupTextEvent(i)
        },
        ExecuteWalkThrough: function(t) {
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_WALKTHROUGH, this.constValues.BROWSE_LOG_ACTION_ID_SELECT, t),
            this.model.isWalkThroughExecuting = !0,
            this.model.walkThroughStartedEventHandler.Fire(t)
        },
        ExecuteProgressCircleTarget: function() {
            return this.model.isHmdModeEnabled && !this.isPlayingBrowseLog ? 0 == this.model.spotLensType ? (this.canBackSpot && this.FireBackSpotEvent(),
            void 0) : null != this.model.frontAnnotationIndex ? (this.ExecuteAnnotation(this.model.frontAnnotationIndex),
            this.model.frontAnnotationIndex = null,
            void 0) : null != this.model.frontWalkThroughIndex ? (this.ExecuteWalkThrough(this.model.frontWalkThroughIndex),
            this.model.frontWalkThroughIndex = null,
            void 0) : void 0 : void 0
        },
        SetIsViewFlipped: function(t) {
            this.model.isViewFlipped = t
        },
        SetIsClickable: function(t) {
            enableMouseEvents(t)
        },
        SwitchShouldShowSpotText: function() {
            this.model.shouldShowSpotText = !this.model.shouldShowSpotText,
            this.model.shouldShowSpotTextChangedEventHandler.Fire()
        },
        SwitchShouldShowAnnotation: function() {
            this.model.shouldShowAnnotation = !this.model.shouldShowAnnotation,
            this.model.shouldShowAnnotationChangedEventHandler.Fire()
        },
        LogOperation: function(t, e, i, n) {
            if (null != this.accessLogId && !this.isPlayingBrowseLog) {
                var o = new Date
                  , s = o - this.startTime;
                switch (t) {
                case this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA:
                    switch (e) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE:
                        if (null != this.lastLogPanoramaCenterChangeElapsedTime && Math.abs(this.lastLogPanoramaCenterChangeElapsedTime - s) < 33)
                            return;
                        var a = Math.floor(this.model.yaw)
                          , l = Math.floor(this.model.pitch);
                        if (null != this.lastLogPanoramaYaw && null != this.lastLogPanoramaPitch && Math.abs(this.lastLogPanoramaYaw - a) < 1 && Math.abs(this.lastLogPanoramaPitch - l) < 1)
                            return;
                        i = a + "," + l,
                        this.lastLogPanoramaYaw = a,
                        this.lastLogPanoramaPitch = l,
                        this.lastLogPanoramaCenterChangeElapsedTime = s;
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_FOV_CHANGE:
                        var h = Math.floor(this.model.horizontalFov);
                        if (null != this.lastLogPanoramaFov && Math.abs(this.lastLogPanoramaFov - h) < 1)
                            return;
                        i = h,
                        this.lastLogPanoramaFov = h;
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE:
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW:
                    switch (e) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SCALE_CHANGE:
                        var r = i.width
                          , d = i.height;
                        if (null != this.lastLogPlanImageWidth && null != this.lastLogPlanImageHeight && Math.abs(this.lastLogPlanImageWidth - r) < 3 && Math.abs(this.lastLogPlanImageHeight - d) < 3)
                            return;
                        i = r + "," + d,
                        this.lastLogPlanImageWidth = r,
                        this.lastLogPlanImageHeight = d;
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE:
                        var c = Math.floor(i.left)
                          , u = Math.floor(i.top);
                        if (null != this.lastLogPlanImageLeft && null != this.lastLogPlanImageTop && Math.abs(this.lastLogPlanImageLeft - c) < 3 && Math.abs(this.lastLogPlanImageTop - u) < 3)
                            return;
                        i = c + "," + u,
                        this.lastLogPlanImageLeft = c,
                        this.lastLogPlanImageTop = u
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PLAYER:
                    e == this.constValues.BROWSE_LOG_ACTION_ID_SIZE_CHANGE && this.model.userAgent.isiPad && this.model.userAgent.osVersionFloat >= 7 && this.model.userAgent.osVersionFloat < 8 && !this.model.isOrientationPortrait && 692 == i.height && (i.height = 672),
                    i = i.width + "," + i.height
                }
                if (e == this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START)
                    this.lastLogTouchMoveX = null,
                    this.lastLogTouchMoveY = null,
                    this.lastLogTouchMoveElapsedTime = null;
                else if (e == this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE) {
                    if (null != this.lastLogTouchMoveElapsedTime && Math.abs(this.lastLogTouchMoveElapsedTime - s) < 100)
                        return;
                    this.lastLogTouchMoveElapsedTime = s
                }
                if (e == this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START || e == this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE || e == this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_END) {
                    var g = i
                      , p = this.model.playerOffsetLeft
                      , A = this.model.playerOffsetTop;
                    i = null;
                    for (var m = g.length, E = 0; m > E; E++) {
                        null != i && (i += ":");
                        var I = g[E]
                          , T = Math.floor(I.x - p)
                          , v = Math.floor(I.y - A);
                        if (0 == E && e == this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE) {
                            if (null != this.lastLogTouchMoveX && null != this.lastLogTouchMoveY && Math.abs(this.lastLogTouchMoveX - T) < 10 && Math.abs(this.lastLogTouchMoveY - v) < 10)
                                return;
                            this.lastLogTouchMoveX = T,
                            this.lastLogTouchMoveY = v
                        }
                        i = i + T + "," + v
                    }
                } else if (e == this.constValues.BROWSE_LOG_ACTION_ID_CLICK) {
                    var I = i
                      , T = Math.floor(I.x - this.model.playerOffsetLeft)
                      , v = Math.floor(I.y - this.model.playerOffsetTop);
                    i = T + "," + v
                }
                var S = {
                    a: s,
                    b: t,
                    c: e,
                    d: i
                };
                this.browseLogArray.push(S),
                (n || this.browseLogArray.length >= 100) && this.SendOperationLogs()
            }
        },
        ClearLastPanoramaLogValue: function() {
            this.lastLogPanoramaYaw = null,
            this.lastLogPanoramaPitch = null,
            this.lastLogPanoramaFov = null,
            this.lastLogPanoramaCenterChangeElapsedTime = null,
            this.lastLogTouchMoveElapsedTime = null
        },
        ClearLastPlanLogValue: function() {
            this.lastLogPlanImageWidth = null,
            this.lastLogPlanImageHeight = null,
            this.lastLogPlanImageLeft = null,
            this.lastLogPlanImageTop = null,
            this.lastLogTouchMoveElapsedTime = null
        },
        SendOperationLogs: function() {
            if (null != this.browseLogArray && 0 != this.browseLogArray.length) {
                var t = JSON.stringify(this.browseLogArray);
                $.ajax({
                    type: "POST",
                    url: this.browseLogPostUrl,
                    cache: !1,
                    contentType: "application/json",
                    data: t,
                    dataType: "json"
                }).done(this.PostBrowseLog_Done.bind(this)).fail(this.PostBrowseLog_Fail.bind(this)),
                this.browseLogArray = new Array
            }
        },
        PostBrowseLog_Done: function() {},
        PostBrowseLog_Fail: function() {},
        SetBrowseLogArray: function(t) {
            this.browseLogArray = t
        },
        ExecuteBrowseLog: function(t) {
            if (!(null == this.browseLogArray || 0 == this.browseLogArray.length || t >= this.browseLogArray.length)) {
                var i = this.browseLogArray[t]
                  , n = i.b
                  , o = i.c
                  , s = i.d;
                switch (n) {
                case this.constValues.BROWSE_LOG_TARGET_ID_ANNOTATION:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SELECT:
                        var t = parseInt(s);
                        this.ExecuteAnnotation(t)
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_ANNOTATION_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.SwitchShouldShowAnnotation()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_AUTOPAN:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_START:
                        this.StartAutoPan();
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_END:
                        this.StopAutoPan()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_BROWSER_GYRO_EVENT:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_START:
                        this.SetIsGyroEventSupported(!0)
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CONTROL_BAR_PLAN_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FirePlanButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CONTROL_BAR_THUMBNAIL_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireThumbnailButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CONTROL_BAR_HELP_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireHelpButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_HELPVIEW:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_START:
                        this.FireShowCustomDesignHelpViewEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_PLAN_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireCustomDesignPlanButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_CLOSE_PLAN_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireCustomDesignClosePlanButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_SPOTLIST_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireCustomDesignSpotListButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_CLOSE_SPOTLIST_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireCustomDesignCloseSpotListButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_GYRO_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.SwitchGyroMode()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_HMD_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.SwitchHmdMode()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_HELPVIEW:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_START:
                        this.FireShowHelpViewByCookieEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_HELPVIEW_CLOSE_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireHelpViewCloseButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE:
                        var t = s.indexOf(",")
                          , a = parseInt(s.slice(0, t))
                          , l = parseInt(s.slice(t + 1, s.length));
                        this.SetYawAndPitch(a, l);
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_FOV_CHANGE:
                        var h = parseInt(s);
                        this.SetHorizontalFov(h)
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PLAN:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SILENT_SELECT:
                        var t = parseInt(s);
                        this.SelectPlanSilent(t)
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PLAN_AND_SPOT:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SELECT:
                        if (!this.model.isWalkThroughExecuting) {
                            var t = s.indexOf(",")
                              , r = parseInt(s.slice(0, t))
                              , d = parseInt(s.slice(t + 1, s.length));
                            this.SelectPlanAndSpot(r, d)
                        }
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SCALE_CHANGE:
                        var t = s.indexOf(",")
                          , c = parseInt(s.slice(0, t))
                          , u = parseInt(s.slice(t + 1, s.length))
                          , g = {
                            width: c,
                            height: u
                        };
                        this.FireSetPlanScaleEvent(g);
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE:
                        var t = s.indexOf(",")
                          , p = parseInt(s.slice(0, t))
                          , A = parseInt(s.slice(t + 1, s.length))
                          , g = {
                            left: p,
                            top: A
                        };
                        this.FireSetPlanLeftTopEvent(g);
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_MAP_CENTER_CHANGE:
                        var t = s.indexOf(",")
                          , m = parseFloat(s.slice(0, t))
                          , E = parseFloat(s.slice(t + 1, s.length))
                          , g = {
                            latitude: m,
                            longitude: E
                        };
                        this.FireSetMapPlanCenterEvent(g);
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_MAP_ZOOM_CHANGE:
                        var I = parseInt(s);
                        this.FireSetMapPlanZoomEvent(I)
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_CLOSE_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FirePlanViewCloseButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_PLAYER:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SIZE_CHANGE:
                        var t = s.indexOf(",")
                          , T = parseInt(s.slice(0, t))
                          , v = parseInt(s.slice(t + 1, s.length))
                          , S = $(document.getElementById("player"));
                        S.width(T),
                        S.height(v),
                        S.css("visibility", "visible"),
                        $(document.getElementById("playArea")).css("background-image", ""),
                        updateLayout(),
                        UpdatePlayerPosition != e && UpdatePlayerPosition()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_POPUPTEXT_CLOSE_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireHidePopupTextEvent(!0)
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_SLIDESHOW:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_START:
                        break;
                    case this.constValues.BROWSE_LOG_ACTION_ID_END:
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_SPOT:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_LOAD_COMPLETE:
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTEX:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SCROLL:
                        var f = parseInt(parseInt(s));
                        this.FireScrollSpotListExEvent(f)
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTVIEW_CLOSE_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.FireSpotListViewCloseButtonClickedEvent()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_SPOTTEXT_BUTTON:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                        this.SwitchShouldShowSpotText()
                    }
                    break;
                case this.constValues.BROWSE_LOG_TARGET_ID_WALKTHROUGH:
                    switch (o) {
                    case this.constValues.BROWSE_LOG_ACTION_ID_SELECT:
                        var t = parseInt(s);
                        this.ExecuteWalkThrough(t)
                    }
                }
                switch (o) {
                case this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START:
                case this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE:
                    var y = new Array
                      , t = s.indexOf(":");
                    if (-1 == t) {
                        if (t = s.indexOf(","),
                        -1 != t) {
                            var w = parseInt(s.slice(0, t))
                              , M = parseInt(s.slice(t + 1, s.length));
                            y.push({
                                x: w,
                                y: M
                            })
                        }
                    } else {
                        var C = s.slice(0, t)
                          , O = s.slice(t + 1, s.length)
                          , D = C.indexOf(",")
                          , b = parseInt(C.slice(0, D))
                          , L = parseInt(C.slice(D + 1, C.length));
                        y.push({
                            x: b,
                            y: L
                        });
                        var N = O.indexOf(",")
                          , B = parseInt(O.slice(0, N))
                          , R = parseInt(O.slice(N + 1, O.length));
                        y.push({
                            x: B,
                            y: R
                        })
                    }
                    this.FirePretendTouchEvent(y);
                    break;
                case this.constValues.BROWSE_LOG_ACTION_ID_TOUCH_END:
                    this.FirePretendTouchEvent(null);
                    break;
                case this.constValues.BROWSE_LOG_ACTION_ID_CLICK:
                    var t = s.indexOf(",")
                      , w = parseInt(s.slice(0, t))
                      , M = parseInt(s.slice(t + 1, s.length))
                      , G = {
                        x: w,
                        y: M
                    };
                    this.FirePretendClickEvent(G)
                }
            }
        },
        FirePlayerSizeChangedEvent: function() {
            this.model.playerSizeChangedEventHandler.Fire()
        },
        FireSpotImageLoadCompletedEvent: function(t) {
            var e = 0 == t % 2
              , i = !this.model.isViewFlipped && (0 == t || 1 == t) || this.model.isViewFlipped && (2 == t || 3 == t);
            this.model.isSpotSelecting = !1,
            this.model.spotImageLoadCompletedEventHandler.Fire({
                viewIndex: t,
                isMainView: e,
                isFrontView: i
            }),
            e && i && (this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_SPOT, this.constValues.BROWSE_LOG_ACTION_ID_LOAD_COMPLETE, this.model.planIndex + "," + this.model.spotIndex),
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE, null),
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.constValues.BROWSE_LOG_ACTION_ID_FOV_CHANGE, null, !0)),
            this.isFirstSpotLoadCompleted || (this.StartSlideshow(),
            this.isFirstSpotLoadCompleted = !0)
        },
        FireAnnotationFrontOverEvent: function() {
            this.model.annotationFrontOverEventHandler.Fire()
        },
        FireAnnotationFrontOutEvent: function() {
            this.model.annotationFrontOutEventHandler.Fire()
        },
        FireCustomDesignLayoutUpdatedEvent: function() {
            this.model.customDesignLayoutUpdatedEventHandler.Fire()
        },
        FireCustomDesignPlanButtonClickedEvent: function() {
            this.model.customDesignPlanButtonClickedEventHandler.Fire()
        },
        FireCustomDesignClosePlanButtonClickedEvent: function() {
            this.model.customDesignClosePlanButtonClickedEventHandler.Fire()
        },
        FireCustomDesignSpotListButtonClickedEvent: function() {
            this.model.customDesignSpotListButtonClickedEventHandler.Fire()
        },
        FireCustomDesignCloseSpotListButtonClickedEvent: function() {
            this.model.customDesignCloseSpotListButtonClickedEventHandler.Fire()
        },
        FireHelpButtonClickedEvent: function() {
            this.model.helpButtonClickedEventHandler.Fire()
        },
        FireHelpViewCloseButtonClickedEvent: function() {
            this.model.helpViewCloseButtonClickedEventHandler.Fire()
        },
        FireHidePopupTextEvent: function(t) {
            this.model.hidePopupTextEventHandler.Fire(t)
        },
        FireLastCustomPanPointReachedEvent: function() {
            this.model.lastCustomPanPointReachedEventHandler.Fire()
        },
        FireModalVisibilityChangedEvent: function(t) {
            this.model.modalVisibilityChangedEventHandler.Fire(t)
        },
        FirePlanButtonClickedEvent: function(t) {
            this.model.planButtonClickedEventHandler.Fire(t)
        },
        FirePlanViewCloseButtonClickedEvent: function() {
            this.model.planViewCloseButtonClickedEventHandler.Fire()
        },
        FirePretendClickEvent: function(t) {
            this.model.pretendClickEventHandler.Fire(t)
        },
        FirePretendTouchEvent: function(t) {
            this.model.pretendTouchEventHandler.Fire(t)
        },
        FireScrollSpotListExEvent: function(t) {
            this.model.scrollSpotListExEventHandler.Fire(t)
        },
        FireSetMapPlanCenterEvent: function(t) {
            this.model.setMapPlanCenterEventHandler.Fire(t)
        },
        FireSetMapPlanZoomEvent: function(t) {
            this.model.setMapPlanZoomEventHandler.Fire(t)
        },
        FireSetPlanLeftTopEvent: function(t) {
            this.model.setPlanLeftTopEventHandler.Fire(t)
        },
        FireSetPlanScaleEvent: function(t) {
            this.model.setPlanScaleEventHandler.Fire(t)
        },
        FireShowCustomDesignHelpViewEvent: function() {
            this.model.showCustomDesignHelpViewEventHandler.Fire()
        },
        FireShowHelpViewByCookieEvent: function() {
            this.model.showHelpViewByCookieEventHandler.Fire()
        },
        FireShowPopupTextEvent: function(t) {
            this.model.showPopupTextEventHandler.Fire(t)
        },
        FireSpotListViewCloseButtonClickedEvent: function() {
            this.model.spotListViewCloseButtonClickedEventHandler.Fire()
        },
        FireThumbnailButtonClickedEvent: function() {
            this.model.thumbnailButtonClickedEventHandler.Fire()
        },
        FireWalkThroughFrontOverEvent: function() {
            this.model.walkThroughFrontOverEventHandler.Fire()
        },
        FireWalkThroughFrontOutEvent: function() {
            this.model.walkThroughFrontOutEventHandler.Fire()
        },
        FireWalkThroughFirstPanStartedEvent: function() {
            this.model.walkThroughFirstPanStartedEventHandler.Fire()
        },
        FireWalkThroughFirstPanEndedEvent: function() {
            this.model.walkThroughFirstPanEndedEventHandler.Fire()
        },
        FireWalkThroughZoomStartedEvent: function() {
            this.model.isWalkThroughZooming = !0,
            this.model.walkThroughZoomStartedEventHandler.Fire()
        },
        FireWalkThroughZoomEndedEvent: function() {
            this.model.isWalkThroughZooming = !1,
            this.model.walkThroughZoomEndedEventHandler.Fire()
        },
        FireWalkThroughSecondPanStartedEvent: function() {
            this.model.walkThroughSecondPanStartedEventHandler.Fire()
        },
        FireWalkThroughEndedEvent: function() {
            this.model.isWalkThroughExecuting = !1,
            this.model.walkThroughEndedEventHandler.Fire(),
            this.model.userAgent.canFadeAnimation && (this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_SPOT, this.constValues.BROWSE_LOG_ACTION_ID_LOAD_COMPLETE, this.model.planIndex + "," + this.model.spotIndex),
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE, null),
            this.LogOperation(this.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.constValues.BROWSE_LOG_ACTION_ID_FOV_CHANGE, null, !0)),
            this.model.isHmdModeEnabled && this.StartGyroMode()
        },
        FireBackSpotEvent: function() {
            this.model.backSpotEventHandler.Fire()
        }
    },
    n.prototype = {
        playerSizeChangedEventHandler: null,
        planSelectEventHandler: null,
        planSilentSelectEventHandler: null,
        spotSelectEventHandler: null,
        spotImageLoadCompletedEventHandler: null,
        spotMediaInfoLoadCompletedEventHandler: null,
        hmdModeStartEventHandler: null,
        hmdModeStopEventHandler: null,
        viewCountChangedEventHandler: null,
        isGyroEventSupportedChangedEventHandler: null,
        gyroModeStartEventHandler: null,
        gyroModeStopEventHandler: null,
        annotationFrontOverEventHandler: null,
        annotationFrontOutEventHandler: null,
        walkThroughFrontOverEventHandler: null,
        walkThroughFrontOutEventHandler: null,
        showPopupTextEventHandler: null,
        hidePopupTextEventHandler: null,
        viewChangeEventHandler: null,
        startAutoPanEventHandler: null,
        pauseAutoPanEventHandler: null,
        startSlideshowEventHandler: null,
        pauseSlideshowEventHandler: null,
        lastCustomPanPointReachedEventHandler: null,
        walkThroughStartedEventHandler: null,
        walkThroughFirstPanStartedEventHandler: null,
        walkThroughFirstPanEndedEventHandler: null,
        walkThroughZoomStartedEventHandler: null,
        walkThroughZoomEndedEventHandler: null,
        walkThroughSecondPanStartedEventHandler: null,
        walkThroughEndedEventHandler: null,
        selectSpotForWalkThroughFadeAnimationEventHandler: null,
        customDesignLayoutUpdatedEventHandler: null,
        customDesignPlanButtonClickedEventHandler: null,
        customDesignClosePlanButtonClickedEventHandler: null,
        customDesignSpotListButtonClickedEventHandler: null,
        customDesignCloseSpotListButtonClickedEventHandler: null,
        showCustomDesignHelpViewEventHandler: null,
        shouldShowSpotTextChangedEventHandler: null,
        shouldShowAnnotationChangedEventHandler: null,
        planButtonClickedEventHandler: null,
        thumbnailButtonClickedEventHandler: null,
        helpButtonClickedEventHandler: null,
        planViewCloseButtonClickedEventHandler: null,
        helpViewCloseButtonClickedEventHandler: null,
        showHelpViewByCookieEventHandler: null,
        modalVisibilityChangedEventHandler: null,
        setPlanScaleEventHandler: null,
        setPlanLeftTopEventHandler: null,
        setMapPlanCenterEventHandler: null,
        setMapPlanZoomEventHandler: null,
        scrollSpotListExEventHandler: null,
        spotListViewCloseButtonClickedEventHandler: null,
        pretendTouchEventHandler: null,
        pretendClickEventHandler: null,
        backSpotEventHandler: null,
        _cubicTextureSize: 1e3,
        _projectJson: null,
        _planJson: null,
        _spotJson: null,
        _spotLensType: null,
        _spotPanType: null,
        _lastPlanIndex: -1,
        _planIndex: -1,
        _planIndexSilent: -1,
        _spotIndex: -1,
        _yaw: 0,
        _pitch: 0,
        _perspective: 0,
        _maxPerspective: 2e3,
        _spotMediaInfo: null,
        _viewWidth: 0,
        _viewHeight: 0,
        _playerWidth: 0,
        _playerHeight: 0,
        _isViewFlipped: !1,
        _isSpotSelecting: !1,
        _isOrientationPortrait: !0,
        _userAgent: {},
        _actualUserAgent: {},
        _totalPlanCount: 0,
        _totalSpotCount: 0,
        _isWalkThroughExecuting: !1,
        _isWalkThroughZooming: !1,
        _isAutoPanEnabled: !1,
        _isSlideshowEnabled: !1,
        _isHmdModeEnabled: !1,
        _isGyroEventSupported: !1,
        _isGyroModeEnabled: !1,
        _frontAnnotationIndex: null,
        _frontWalkThroughIndex: null,
        _initYawAfterWalkThrough: null,
        _initPerspectiveAfterWalkThrough: null,
        _shouldShowSpotText: !0,
        _shouldShowAnnotation: !0,
        _playerOffsetLeft: 0,
        _playerOffsetTop: 0,
        _minYaw: 0,
        _maxYaw: 0,
        _minPitch: 0,
        _maxPitch: 0,
        _horizontalFov: 0,
        _maxHorizontalFov: 0,
        get cubicTextureSize() {
            return this._cubicTextureSize
        },
        set cubicTextureSize(t) {
            this._cubicTextureSize = t
        },
        get projectJson() {
            return this._projectJson
        },
        set projectJson(t) {
            this._projectJson = t
        },
        get planJson() {
            return this._planJson
        },
        set planJson(t) {
            this._planJson = t
        },
        get spotJson() {
            return this._spotJson
        },
        set spotJson(t) {
            this._spotJson = t,
            null != t ? (this._spotLensType = t.aa,
            this._spotPanType = t.am) : (this._spotLensType = null,
            this._spotPanType = null)
        },
        get spotLensType() {
            return this._spotLensType
        },
        get spotPanType() {
            return this._spotPanType
        },
        get lastPlanIndex() {
            return this._lastPlanIndex
        },
        set lastPlanIndex(t) {
            this._lastPlanIndex = t
        },
        get planIndex() {
            return this._planIndex
        },
        set planIndex(t) {
            this._planIndex = t
        },
        get planIndexSilent() {
            return this._planIndexSilent
        },
        set planIndexSilent(t) {
            this._planIndexSilent = t
        },
        get spotIndex() {
            return this._spotIndex
        },
        set spotIndex(t) {
            this._spotIndex = t
        },
        get yaw() {
            return this._yaw
        },
        set yaw(t) {
            this._yaw = t
        },
        get pitch() {
            return this._pitch
        },
        set pitch(t) {
            this._pitch = t
        },
        get perspective() {
            return this._perspective
        },
        set perspective(t) {
            this._perspective = t
        },
        get maxPerspective() {
            return this._maxPerspective
        },
        set maxPerspective(t) {
            this._maxPerspective = t
        },
        get horizontalFov() {
            return this._horizontalFov
        },
        set horizontalFov(t) {
            this._horizontalFov = t
        },
        get maxHorizontalFov() {
            return this._maxHorizontalFov
        },
        set maxHorizontalFov(t) {
            this._maxHorizontalFov = t
        },
        get spotMediaInfo() {
            return this._spotMediaInfo
        },
        set spotMediaInfo(t) {
            this._spotMediaInfo = t
        },
        get viewWidth() {
            return this._viewWidth
        },
        set viewWidth(t) {
            this._viewWidth = t
        },
        get viewHeight() {
            return this._viewHeight
        },
        set viewHeight(t) {
            this._viewHeight = t
        },
        get playerWidth() {
            return this._playerWidth
        },
        set playerWidth(t) {
            this._playerWidth = t
        },
        get playerHeight() {
            return this._playerHeight
        },
        set playerHeight(t) {
            this._playerHeight = t
        },
        get isViewFlipped() {
            return this._isViewFlipped
        },
        set isViewFlipped(t) {
            this._isViewFlipped = t
        },
        get isSpotSelecting() {
            return this._isSpotSelecting
        },
        set isSpotSelecting(t) {
            this._isSpotSelecting = t
        },
        get isOrientationPortrait() {
            return this._isOrientationPortrait
        },
        set isOrientationPortrait(t) {
            this._isOrientationPortrait = t
        },
        get userAgent() {
            return this._userAgent
        },
        set userAgent(t) {
            this._userAgent = t
        },
        get actualUserAgent() {
            return this._actualUserAgent
        },
        set actualUserAgent(t) {
            this._actualUserAgent = t
        },
        get isWalkThroughExecuting() {
            return this._isWalkThroughExecuting
        },
        set isWalkThroughExecuting(t) {
            this._isWalkThroughExecuting = t
        },
        get isWalkThroughZooming() {
            return this._isWalkThroughZooming
        },
        set isWalkThroughZooming(t) {
            this._isWalkThroughZooming = t
        },
        get isAutoPanEnabled() {
            return this._isAutoPanEnabled
        },
        set isAutoPanEnabled(t) {
            this._isAutoPanEnabled = t
        },
        get isSlideshowEnabled() {
            return this._isSlideshowEnabled
        },
        set isSlideshowEnabled(t) {
            this._isSlideshowEnabled = t
        },
        get isHmdModeEnabled() {
            return this._isHmdModeEnabled
        },
        set isHmdModeEnabled(t) {
            this._isHmdModeEnabled = t
        },
        get isGyroEventSupported() {
            return this._isGyroEventSupported
        },
        set isGyroEventSupported(t) {
            this._isGyroEventSupported = t
        },
        get isGyroModeEnabled() {
            return this._isGyroModeEnabled
        },
        set isGyroModeEnabled(t) {
            this._isGyroModeEnabled = t
        },
        get frontAnnotationIndex() {
            return this._frontAnnotationIndex
        },
        set frontAnnotationIndex(t) {
            this._frontAnnotationIndex = t
        },
        get frontWalkThroughIndex() {
            return this._frontWalkThroughIndex
        },
        set frontWalkThroughIndex(t) {
            this._frontWalkThroughIndex = t
        },
        get initYawAfterWalkThrough() {
            return this._initYawAfterWalkThrough
        },
        set initYawAfterWalkThrough(t) {
            this._initYawAfterWalkThrough = t
        },
        get initPerspectiveAfterWalkThrough() {
            return this._initPerspectiveAfterWalkThrough
        },
        set initPerspectiveAfterWalkThrough(t) {
            this._initPerspectiveAfterWalkThrough = t
        },
        get shouldShowSpotText() {
            return this._shouldShowSpotText
        },
        set shouldShowSpotText(t) {
            this._shouldShowSpotText = t
        },
        get shouldShowAnnotation() {
            return this._shouldShowAnnotation
        },
        set shouldShowAnnotation(t) {
            this._shouldShowAnnotation = t
        },
        get totalPlanCount() {
            return this._totalPlanCount
        },
        set totalPlanCount(t) {
            this._totalPlanCount = t
        },
        get totalSpotCount() {
            return this._totalSpotCount
        },
        set totalSpotCount(t) {
            this._totalSpotCount = t
        },
        get playerOffsetLeft() {
            return this._playerOffsetLeft
        },
        set playerOffsetLeft(t) {
            this._playerOffsetLeft = t
        },
        get playerOffsetTop() {
            return this._playerOffsetTop
        },
        set playerOffsetTop(t) {
            this._playerOffsetTop = t
        },
        Initialize: function() {
            return this.playerSizeChangedEventHandler = new Zenkei.ZenkeiEvent({
                name: "playerSizeChangedEventHandler"
            }),
            this.planSelectEventHandler = new Zenkei.ZenkeiEvent({
                name: "planSelectEventHandler"
            }),
            this.planSilentSelectEventHandler = new Zenkei.ZenkeiEvent({
                name: "planSilentSelectEventHandler"
            }),
            this.spotSelectEventHandler = new Zenkei.ZenkeiEvent({
                name: "spotSelectEventHandler"
            }),
            this.spotImageLoadCompletedEventHandler = new Zenkei.ZenkeiEvent({
                name: "spotImageLoadCompletedEventHandler"
            }),
            this.spotMediaInfoLoadCompletedEventHandler = new Zenkei.ZenkeiEvent({
                name: "spotMediaInfoLoadCompletedEventHandler"
            }),
            this.isGyroEventSupportedChangedEventHandler = new Zenkei.ZenkeiEvent({
                name: "isGyroEventSupportedChangedEventHandler"
            }),
            this.gyroModeStartEventHandler = new Zenkei.ZenkeiEvent({
                name: "gyroModeStartEventHandler"
            }),
            this.gyroModeStopEventHandler = new Zenkei.ZenkeiEvent({
                name: "gyroModeStopEventHandler"
            }),
            this.hmdModeStartEventHandler = new Zenkei.ZenkeiEvent({
                name: "hmdModeStartEventHandler"
            }),
            this.hmdModeStopEventHandler = new Zenkei.ZenkeiEvent({
                name: "hmdModeStopEventHandler"
            }),
            this.viewCountChangedEventHandler = new Zenkei.ZenkeiEvent({
                name: "viewCountChangedEventHandler"
            }),
            this.annotationFrontOverEventHandler = new Zenkei.ZenkeiEvent({
                name: "annotationFrontOverEventHandler"
            }),
            this.annotationFrontOutEventHandler = new Zenkei.ZenkeiEvent({
                name: "annotationFrontOutEventHandler"
            }),
            this.walkThroughFrontOverEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughFrontOverEventHandler"
            }),
            this.walkThroughFrontOutEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughFrontOutEventHandler"
            }),
            this.showPopupTextEventHandler = new Zenkei.ZenkeiEvent({
                name: "showPopupTextEventHandler"
            }),
            this.hidePopupTextEventHandler = new Zenkei.ZenkeiEvent({
                name: "hidePopupTextEventHandler"
            }),
            this.walkThroughStartEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughStartEventHandler"
            }),
            this.walkThroughStartedEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughStartedEventHandler"
            }),
            this.walkThroughFirstPanStartedEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughFirstPanStartedEventHandler"
            }),
            this.walkThroughFirstPanEndedEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughFirstPanEndedEventHandler"
            }),
            this.walkThroughZoomStartedEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughZoomStartedEventHandler"
            }),
            this.walkThroughZoomEndedEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughZoomEndedEventHandler"
            }),
            this.walkThroughSecondPanStartedEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughSecondPanStartedEventHandler"
            }),
            this.walkThroughEndedEventHandler = new Zenkei.ZenkeiEvent({
                name: "walkThroughEndedEventHandler"
            }),
            this.selectSpotForWalkThroughFadeAnimationEventHandler = new Zenkei.ZenkeiEvent({
                name: "selectSpotForWalkThroughFadeAnimationEventHandler"
            }),
            this.startAutoPanEventHandler = new Zenkei.ZenkeiEvent({
                name: "startAutoPanEventHandler"
            }),
            this.pauseAutoPanEventHandler = new Zenkei.ZenkeiEvent({
                name: "pauseAutoPanEventHandler"
            }),
            this.startSlideshowEventHandler = new Zenkei.ZenkeiEvent({
                name: "startSlideshowEventHandler"
            }),
            this.pauseSlideshowEventHandler = new Zenkei.ZenkeiEvent({
                name: "pauseSlideshowEventHandler"
            }),
            this.lastCustomPanPointReachedEventHandler = new Zenkei.ZenkeiEvent({
                name: "lastCustomPanPointReachedEventHandler"
            }),
            this.viewChangeEventHandler = new Zenkei.ZenkeiEvent({
                name: "viewChangeEventHandler"
            }),
            this.customDesignLayoutUpdatedEventHandler = new Zenkei.ZenkeiEvent({
                name: "customDesignLayoutUpdatedEventHandler"
            }),
            this.customDesignPlanButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "customDesignPlanButtonClickedEventHandler"
            }),
            this.customDesignClosePlanButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "customDesignClosePlanButtonClickedEventHandler"
            }),
            this.customDesignSpotListButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "customDesignSpotListButtonClickedEventHandler"
            }),
            this.customDesignCloseSpotListButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "customDesignCloseSpotListButtonClickedEventHandler"
            }),
            this.showCustomDesignHelpViewEventHandler = new Zenkei.ZenkeiEvent({
                name: "showCustomDesignHelpViewEventHandler"
            }),
            this.shouldShowSpotTextChangedEventHandler = new Zenkei.ZenkeiEvent({
                name: "shouldShowSpotTextChangedEventHandler"
            }),
            this.shouldShowAnnotationChangedEventHandler = new Zenkei.ZenkeiEvent({
                name: "shouldShowAnnotationChangedEventHandler"
            }),
            this.planButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "planButtonClickedEventHandler"
            }),
            this.thumbnailButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "thumbnailButtonClickedEventHandler"
            }),
            this.helpButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "helpButtonClickedEventHandler"
            }),
            this.planViewCloseButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "planViewCloseButtonClickedEventHandler"
            }),
            this.helpViewCloseButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "helpViewCloseButtonClickedEventHandler"
            }),
            this.showHelpViewByCookieEventHandler = new Zenkei.ZenkeiEvent({
                name: "showHelpViewByCookieEventHandler"
            }),
            this.modalVisibilityChangedEventHandler = new Zenkei.ZenkeiEvent({
                name: "modalVisibilityChangedEventHandler"
            }),
            this.setPlanScaleEventHandler = new Zenkei.ZenkeiEvent({
                name: "setPlanScaleEventHandler"
            }),
            this.setPlanLeftTopEventHandler = new Zenkei.ZenkeiEvent({
                name: "setPlanLeftTopEventHandler"
            }),
            this.setMapPlanCenterEventHandler = new Zenkei.ZenkeiEvent({
                name: "setMapPlanCenterEventHandler"
            }),
            this.setMapPlanZoomEventHandler = new Zenkei.ZenkeiEvent({
                name: "setMapPlanZoomEventHandler"
            }),
            this.scrollSpotListExEventHandler = new Zenkei.ZenkeiEvent({
                name: "scrollSpotListExEventHandler"
            }),
            this.spotListViewCloseButtonClickedEventHandler = new Zenkei.ZenkeiEvent({
                name: "spotListViewCloseButtonClickedEventHandler"
            }),
            this.pretendTouchEventHandler = new Zenkei.ZenkeiEvent({
                name: "pretendTouchEventHandler"
            }),
            this.pretendClickEventHandler = new Zenkei.ZenkeiEvent({
                name: "pretendClickEventHandler"
            }),
            this.backSpotEventHandler = new Zenkei.ZenkeiEvent({
                name: "backSpotEventHandler"
            }),
            this
        }
    },
    o.prototype = {
        callbackFucntionArray: null,
        Initialize: function() {
            return this.callbackFucntionArray = new Array,
            this
        },
        Register: function(t) {
            if (null == t)
                return !1;
            for (var e = this.callbackFucntionArray.length, i = 0; e > i; i++)
                if (this.callbackFucntionArray[i] == t)
                    return !1;
            return this.callbackFucntionArray.push(t),
            !0
        },
        Fire: function(t) {
            for (var e = this.callbackFucntionArray.length, i = 0; e > i; i++)
                this.callbackFucntionArray[i](t)
        }
    },
    t.Zenkei != e && (t.Zenkei.ZenkeiController = i,
    t.Zenkei.ZenkeiModel = n,
    t.Zenkei.ZenkeiEvent = o)
}(window),
"function" != typeof Function.prototype.bind && (Function.prototype.bind = function(t) {
    var e = this;
    return function() {
        var i = Array.prototype.slice.call(arguments);
        return e.apply(t || null, i)
    }
}
);
var CubicCSSPlayer = function(t, e, i, n, o, s, a, l, h, r, d) {
    if (null != i && (this.index = t,
    this.projectDirectoryUrl = e,
    this.imageDirectoryUrl = this.projectDirectoryUrl + i.ad,
    "/" != this.imageDirectoryUrl.substring(this.imageDirectoryUrl.length - 1) && (this.imageDirectoryUrl = this.imageDirectoryUrl + "/"),
    this.spotJson = i,
    this.containerId = n + t,
    this.userAgent = l,
    this.controller = window.mainPlayerController,
    this.annotationDivArray = null,
    this.annotationTransformArray = null,
    this.isAnnotationPlaced = !1,
    this.divParent = document.getElementById(this.containerId),
    this.divParent.style.margin = "0px",
    this.divContainer = void 0,
    this.frontPanel = void 0,
    this.rightPanel = void 0,
    this.backPanel = void 0,
    this.leftPanel = void 0,
    this.topPanel = void 0,
    this.bottomPanel = void 0,
    this.annotationImageCount = 0,
    this.annotationImageLoadedCount = 0,
    this.annotationBaseZ = .5 * a,
    this.shouldShowAnnotation = h,
    this.isHmdModeEnabled = r,
    this.canBackSpot = d,
    this.isResizing = !1,
    this.viewWidth = 0,
    this.viewHeight = 0,
    this.textureW = a,
    this.textureH = a,
    this.z_panel = this.userAgent.isChromeOver60 ? .5 * this.textureW / Math.tan(45 * Math.PI / 180) : .5 * this.textureW / Math.tan(45.5 * Math.PI / 180),
    this.flagDrag = !1,
    this.x0 = -1,
    this.y0 = -1,
    this.r0 = -1,
    this.loadedImageCount = 0,
    this.MESSAGE_DID_FAIL_LOADING_IMAGE = "パノラマ画像の読み込みができませんでした",
    this.CUBIC_IMAGE_COUNT = 6,
    this.didFailLoadingImage = !1,
    this.SetSize(o, s),
    this.panSpeedX = parseFloat(window.layoutInfo.panSpeedX),
    this.panSpeedY = parseFloat(window.layoutInfo.panSpeedY),
    isNaN(this.panSpeedX) && (this.panSpeedX = 1),
    isNaN(this.panSpeedY) && (this.panSpeedY = 1),
    0 == this.index % 2)) {
        this.userAgent.isTouchDevice ? (this.divParent.addEventListener("touchstart", this.touchStartHandler.bind(this), !1),
        this.divParent.addEventListener("touchmove", this.touchMoveHandler.bind(this), !1),
        this.divParent.addEventListener("touchend", this.touchEndHandler.bind(this), !1)) : (this.userAgent.isIE || this.userAgent.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) ? this.userAgent.isWindows7 ? (this.divParent.addEventListener("mousemove", this.mousemove.bind(this), !1),
        this.divParent.addEventListener("mousedown", this.mousedown.bind(this), !1),
        this.divParent.addEventListener("mouseup", this.mouseup.bind(this), !1)) : (this.divParent.style.touchAction = "none",
        this.msGesture = new MSGesture,
        this.msGesture.target = this.divParent,
        this.divParent.addEventListener(this.controller.constValues.POINTER_UP_EVENT, this.pointerUp.bind(this), !0),
        this.divParent.addEventListener(this.controller.constValues.POINTER_DOWN_EVENT, this.pointerDown.bind(this), !0),
        this.divParent.addEventListener(this.controller.constValues.MSGESTURE_START_EVENT, this.msGestureStart.bind(this), !1),
        this.divParent.addEventListener(this.controller.constValues.MSGESTURE_CHANGE_EVENT, this.msGestureChange.bind(this), !1),
        this.divParent.addEventListener(this.controller.constValues.MSGESTURE_END_EVENT, this.msGestureEnd.bind(this), !1),
        this.divParent.addEventListener("mousemove", this.preventDefaultEvent.bind(this), !1),
        this.divParent.addEventListener("mousedown", this.preventDefaultEvent.bind(this), !1),
        this.divParent.addEventListener("mouseup", this.preventDefaultEvent.bind(this), !1)) : (this.divParent.addEventListener("mousemove", this.mousemove.bind(this), !1),
        this.divParent.addEventListener("mousedown", this.mousedown.bind(this), !1),
        this.divParent.addEventListener("mouseup", this.mouseup.bind(this), !1));
        var c = "mousewheel";
        this.userAgent.isFireFox && (c = "DOMMouseScroll"),
        this.divParent.addEventListener(c, this.mousewheel.bind(this), !1)
    }
};
CubicCSSPlayer.prototype = {
    SetSize: function(t, e) {
        this.viewWidth = t,
        this.viewHeight = e
    },
    UpdateCssTranslateProperties: function() {
        var t = String(this.perspective) + "px"
          , e = String(this.viewWidth / 2) + "px " + String(this.viewHeight / 2) + "px";
        this.divContainer.style.width = this.viewWidth + "px",
        this.divContainer.style.height = this.viewHeight + "px",
        this.divContainer.style.webkitPerspective = t,
        this.divContainer.style.MozPerspective = t,
        this.divContainer.style.msPerspective = t,
        this.divContainer.style.webkitPerspectiveOrigin = e,
        this.divContainer.style.MozPerspectiveOrigin = e,
        this.divContainer.style.msPerspectiveOrigin = e,
        this.RedrawShape(),
        !this.userAgent.isAndroid || this.userAgent.isChrome || this.userAgent.isWindowsMobile || this.divContainer.offsetHeight
    },
    GenerateHtml: function() {
        this.divContainer = document.createElement("div"),
        this.divContainer.style.width = this.viewWidth + "px",
        this.divContainer.style.height = this.viewHeight + "px",
        !this.userAgent.isAndroid || this.userAgent.isChrome || this.userAgent.isWindowsMobile || (this.divContainer.style.webkitTransformStyle = "preserve-3d",
        this.divContainer.style.webkitTransform = "scaleZ(0)");
        var t = String(this.perspective) + "px";
        this.divContainer.style.webkitPerspective = t,
        this.divContainer.style.MozPerspective = t,
        this.divContainer.style.msPerspective = t;
        var e = String(this.viewWidth / 2) + "px " + String(this.viewHeight / 2) + "px";
        this.divContainer.style.webkitPerspectiveOrigin = e,
        this.divContainer.style.MozPerspectiveOrigin = e,
        this.divContainer.style.msPerspectiveOrigin = e,
        this.divParent.hasChildNodes() ? this.divParent.insertBefore(this.divContainer, this.divParent.firstChild) : this.divParent.appendChild(this.divContainer),
        this.loadedImageCount = 0;
        var i = "translateZ(" + String(-this.z_panel) + "px)"
          , n = "translateZ(" + String(this.perspective) + "px) rotateX(" + String(this.pitch) + "deg) rotateY(" + String(this.yaw) + "deg) ";
        this.frontPanel = this.placePanel(this.divContainer, "panel_front", this.imageDirectoryUrl + "front.jpg", this.textureW, this.textureH, n + i, this.viewWidth, this.viewHeight),
        this.rightPanel = this.placePanel(this.divContainer, "panel_right", this.imageDirectoryUrl + "right.jpg", this.textureW, this.textureH, n + "rotateY(-90deg) " + i, this.viewWidth, this.viewHeight),
        this.backPanel = this.placePanel(this.divContainer, "panel_back", this.imageDirectoryUrl + "back.jpg", this.textureW, this.textureH, n + "rotateY(180deg) " + i, this.viewWidth, this.viewHeight),
        this.leftPanel = this.placePanel(this.divContainer, "panel_left", this.imageDirectoryUrl + "left.jpg", this.textureW, this.textureH, n + "rotateY(90deg) " + i, this.viewWidth, this.viewHeight),
        this.topPanel = this.placePanel(this.divContainer, "panel_top", this.imageDirectoryUrl + "top.jpg", this.textureW, this.textureH, n + "rotateX(-90deg) " + i, this.viewWidth, this.viewHeight),
        this.bottomPanel = this.placePanel(this.divContainer, "panel_bottom", this.imageDirectoryUrl + "bottom.jpg", this.textureW, this.textureH, n + "rotateX(90deg) " + i, this.viewWidth, this.viewHeight)
    },
    placePanel: function(t, e, i, n, o, s, a, l) {
        var h = document.createElement("div");
        h.id = e,
        this.setStylePlane(h, n, o, a, l),
        h.style.webkitTransform = s,
        h.style.MozTransform = s,
        h.style.msTransform = s,
        this.userAgent.isChromeOver60 && (h.style.webkitBackfaceVisibility = "hidden"),
        t.appendChild(h, n, o);
        var r = new Image;
        return r.onload = this.imageLoaded.bind(this),
        r.onerror = this.imageOnError.bind(this),
        r.src = i,
        r.width = n,
        r.height = o,
        h.appendChild(r),
        h
    },
    imageLoaded: function() {
        this.plusLoadedImageCount()
    },
    imageOnError: function() {
        this.plusLoadedImageCount(),
        this.didFailLoadingImage || (this.didFailLoadingImage = !0,
        this.controller.StopAutoPan(),
        this.controller.StopSlideshow(),
        alert(this.MESSAGE_DID_FAIL_LOADING_IMAGE))
    },
    plusLoadedImageCount: function() {
        this.loadedImageCount++,
        this.loadedImageCount == this.CUBIC_IMAGE_COUNT && (this.userAgent.isChromeOver60 && this.imageToCanvas(),
        this.controller.FireSpotImageLoadCompletedEvent(this.index),
        this.StartLoadAnnotation())
    },
    imageToCanvas: function() {
        for (var t = [this.frontPanel, this.rightPanel, this.backPanel, this.leftPanel, this.topPanel, this.bottomPanel], e = t.length, i = 0; e > i; i++) {
            var n = t[i]
              , o = n.getElementsByTagName("img")[0]
              , s = o.naturalWidth
              , a = o.naturalHeight
              , l = document.createElement("canvas")
              , h = .0086514
              , r = s * h
              , d = a * h
              , c = s - 2 * r
              , u = a - 2 * d;
            l.width = this.textureW,
            l.height = this.textureH;
            var g = l.getContext("2d");
            g.drawImage(o, r, d, c, u, 0, 0, this.textureW, this.textureH),
            n.appendChild(l),
            $(o).remove()
        }
    },
    annotationImageCount: 0,
    annotationImageLoadedCount: 0,
    HTML_DIV: "<div></div>",
    HTML_CODE_FRAME_ANNOTATION: '<div class="iconAnnotation viewportIcon0"><div class="cubicIcon"><div></div><div></div><div></div><div></div><div></div><div></div></div></div>',
    HTML_CODE_POPUP_ICON_FOR_PANORAMA: '<div class="iconAnnotation viewportIcon4"><div></div></div>',
    HTML_CODE_EXTERNAL_LINK_ICON: '<div class="iconAnnotation viewportIcon5"><div></div></div>',
    HTML_CODE_ROUND_LENS_ICON: '<div class="iconAnnotation viewportIcon6"><div></div></div>',
    HTML_CODE_FISHEYE_LENS_ICON: '<div class="iconAnnotation viewportIcon7"><div></div></div>',
    HTML_CODE_STANDARD_LENS_ICON: '<div class="iconAnnotation viewportIcon8"><div></div></div>',
    HTML_CODE_BACK_ICON: '<div class="iconAnnotation"></div>',
    EXTERNAL_LINK_ICON: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGtJREFUeNqcVWtMW2UYfk7v966UMi4jDOjGQCLYbCbGRMim23A6Ywxh/jGSDAPxh5njj9FEg0vMEmSZiSRVFhOS4eJwvxybExXBMbZkbLCt3Cajg7b0Qi+0tD29Hd9TSqJkGdUveXK+c773fZ7vfb/vfQ/DcRw2DQGhMYNqgo4QJswQBgi9BD/+w2A2ibxF7/3z1mn4rHcQinngDQBzC0rsKNShqKgcz++rgEIh+4Bsv/o/Iif9PnfnzPWfIVm4jZRRiKVUFbzeYixaVZieW4FaGkZODotjx15ATY2xi/fJRkSQeTYGfN7O22OjkD+ehn2HH99bTfjl6jYoZAYU5OvARtTQ521HhFWj4/PLuHHD8iH5fZZtJJJkMsFeHbyAHFaI7fq/cFPOYOLKa5DGtUgijkfzEdjtIeTqWMSSQSwuLkEu9+DiD++jMF9fQTyzTxMREd4cvzMOi2MR9YYgfhwvxoK1Bo55CZzuGKLhOGQKDuGwAHZbgkJPIBoXIRYTo+/8b2g/2dhGHCe2SlfTxIQLD0ZrcS0pxd375agsKwIn9kGjEeHV12VQK0VYiwogEIjBMGL6LodSqcDAwCTP8cZW6eIjqZ6ejWB5WYDF83tQotEjnnTBZFLCZRNBKReg+lkgwcWIXAGDQQRDngJCTo4HlijPocpGRLvbqIdYHkVZrRi1lWJYJrxgrWqUlPkwOc5CpdCipJghcgkm7/pQUCBEIsFBpRbzHKlsRCLJZAyP54SUDgbjYw4wcTFeqZMhEpJCcfRXWMZSqN25DzEi5pgExm75kIy7EfQvpy9PNiIPbY7VEoeLSvqhBn53ig5aCo3ShdLngpB6GeytksAXGoKITvDQQQ59fQJIpGuQK9JBJM1mM5dKpeD2uEAT8POOjlO5tBYkxHiRnyqMhgOXr0xBImEgkamgLXTCtHcBIVceDh4+hFiERSQaSe8qEU/AuXwBo2MsKp8pwunTXxQ0Nb2NVd8qwBc2w2DJtoT3jh/3fNPTU0oudr5OcgKB8Mo7zWasrGhgX5bio/ZZiETl2L+/HpcuXYTFMkO+DPjuUFFVgVxtLjxeF9UQXe3gWnrn8/OPsNE9jLvK8NKL9TB/a0Z/f38pH4lXq1W0f/rJkc6vuwepP8kxcC0fRw7F0g737lkQCoVQV1eXjuhA/cvQ6CitXl+a1L8agNPppMtQiKGhIRiNRipaQ/o28BujsVOUOZsvTabdRW2tyRODv98kJwUCAQ8CPj+qaOc6XS6lIwC704Gus11pch58BDwR/1Sr1WS7BykuBRdFWclVbUSm2tyFP3Z5vKeGh29hZGQSQjjQ/G4zHSatcOv3aGp2CteHh/Fdb28bRehubW3tb2hooDYjh36bPk18f8qCP0f+QM+5c83ktcA84X+yi9DGsuxRm82mO3vmTA6X2S0/ePvu7m7e2c4T8N9aWlpm/sVD84wAbzP7JJH1zrmeTwmhkM/rpsoOZQTsmfen2mwlsiGkJkj/scxu1EA2Nn8LMAA6gAYYImOajAAAAABJRU5ErkJggg==",
    POPUP_ICON: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkpJREFUeNqslEtoE1EUhv+ZSaZNYppBSdGFSVx2U0Zb8LWQ0kJx1QrWpUYFkUIX0qXgQnApLgpVELW4EdpF7UoqSnHhC6odurALF00JIhjUJjGJJs2M59zEzFNXXjiZP/ec/7uPmXuBgGZZ1jjFIsWmZbfNdt94kEfyAHR6PEC1pO+sPkFj4yWahS2RU5JphPuOIzR4Eoj2GNR1XpIkwwciSJYet5rvlrXi7AWYlULQwJBjSSQm70MZGN2mv1cINtcBtWeyUl+8qRUXrnZMSjSJ2Ims0JUXc2hWbXhi4gbUU9MMG+KZ/QGtNY1l/dvMmGt07eJDhI+dEbrxah7b98668runlqDoowaBDspiY2sl/fujS7Aikivk3pS9JNLevPCQl7dFpppzjQ9PYZpfgYjiip9r8x2Q0J48e9hLbSxEP3oj/xrolnwbW1m/i9rHx0KbtUJgDXvVgdM6gzI7P/Kwui1fUaz/MiL9E0LX1hcIfMdXw15mhMRmqzSSKvtf9Z4UlPThlv70NrBGeDlPkVO0NKQwfAHFsRTSQTXsZQaDDDV1FBZ1egOyY7mkg2rYywwGLakHRiBF9lKx7ApLsmcktCfPHvYyQ+ZPXOqKG9rw7dZSHOHgtLQnzx72CobziFTfz2jl1Wv2tvT0IbQr0347OTRLG51cfPA6ooem3EfEeWjrW8+14sokzPqX4EOr9iIxNAs1Pew/tN5rxKyX9UbuGX59fgOznG8B4vvRte8IwpkRgsV91wj+crFl/3GxZQMvNkrgf7TfAgwA00AZ0s4UbBUAAAAASUVORK5CYII=",
    ROUND_LENS_ICON: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA21JREFUeNqslGtMU2cYx//nYrHeOJVrAaNioshsbIlDxcsMum+LonFqYhRM/LBkS/Sbl2/GC/vuB7NkBtFki9EIMZIsTOnc2KTcDkMholVqK1hpS7GF3mj7+rwHeuIlxmTZk5ye5rn8z3Oe9/cc4ANjjCl0HadLZR+bOhtTPqwTtN+T7TMi9Ztq0mnWMOSdUu6oPrQ+CUIdj2sxqykL21easNOah7Ki+ROSKBwRTv3drAV/3AxZ76R+Ux3dGtqp+OoDL9pfhjEUSepPvOeLwj05DedYBAc3mJXq8sVNVMPFrugdUas1dGtq7h7Dhd/d6ArFsZk62EdPty1bBJGyel1h3PrXB3sgBttCA07tWIJvKwt5+W5BEJozMwn+MRhgtvOdjF6TXWx9wdz+KItNp/ThJOi/OxBll+66tRzLOQdrexTgoSDX4K9W93h0SvnF4YUaTuBidQmObiuB1zuBa/ZBREUD9c0QDUVQWV6Iw1XFEKjD76jzxo5XMJuyFJpZHReqvd07hrYXYWzLnYtdFQWaiF19iZQpB5HJGNJgWGjOQ8/zcUiksmVFNrb3GXHfHUY51ZYVLa8V+YG0PQ3CGUuixpILs5KFlr+GEZDm4aHLh46uJ1C7n2Jo2Ac2fx7u971CZ68He9fmwpVIgddyDe3UumePeB0NVpYEqGNRGOMyenqd8Dq9FEnBPPoGyfWrYGASnvV78P2hKvJ79Fr5PahmqELLgB+i9Ab+15MQZQEpQYTLN4mBjhHkGmWYhYSemzE5AxvnRKU5VZYq+Ga1CT8H0hBLV6AoZy5kWcS4P46QLwGLEMdey1LCIaSDmhHqI2Ktw6EEmvr92FmRjxN7voDxz2E4ivOh2AogGkQEB30wOlw4s74MhUXZOHbTiRKDpNHONbhQ4y5bnvUZdXSZqG6h1ajbWowftgImhxuhx0lIlBUZCuBA1TJ8uaYAvxL5v72O4FBpNqiWCzXqQHK4rOdmgPzpnpuNBGMahBmbTqbZKPku2z1azpqzDtba79eBfG9FbnR6UX/Xo4HJmdpvzUfF8kXEDrSZXKdu+SwtC+bgdPUSHNho1ldE3/7M0toHxnHlwSj+GZnS2HrXSrMkbCxegNoNZnxtyeGumaV9d/u5g8Qmvlptaig0GT77GZkVacan7D9/2MiJ/8PeCjAAeFoHB74mSHEAAAAASUVORK5CYII=",
    FISHEYE_LENS_ICON: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAs9JREFUeNrMU11IU2EYfs4P0ynqWc6f+UNFUDIYbRUazkC061IoiaI0KAiC6CbIu4TK6KKLvPAmsIy6TIm8sdJMI+fPTplK05Vzmq79ON3m/nT7+s60YXN1EV30wnO+c877Ps95v+f9DpAQhBCB4iqFSLaHuJkTEnlM7Hp9YEOkWV8TjZI2k21VeCE60D3lhrgUiuW0ihRU71XgmDYHJQXpyxzLnGca33XGkncqwMc7adY30KVtgJLb39swMO+Fyb8e/+JrRwBW3xrMdj/OHFYJVeodHZQjiT2Md0RbraFLR+eIHbdfWjHsCaGCdlBHv67blQmWVhktXjz76ECvKwhdhgyNR4txsjRfotcyDNP50xP3m0kX0d0aInSbpKV7llidARJci8TNCdN7qytAWl9ZYzWamwbSM+6SUm5JQ9paw+eFVeGpwQbRG0ZLVREuVBbBZlvG495JBFgZ7Zsg4PGjVJ2Pc+WFYGiHl2jnjwYXoVKkCNSzBkmo/rnRjp5ZLyqVqTh+IC8m0ivOI6LIht8XRBQEGaocjH5dAkdVjuzJQvUHOfqsXqgpt6Rgdz0rDaRn2g1zcB01GiVUQgq6+mfg4tLwyeLA4PAUxJFpmGYcIOlp6PuwiCHjHE7sV8ISjkDiShqxqY1sjvgQNZbnGIj2AOQhHqNGM2xmG81EoFpYwXrZPsgIhy9jc7h8tpy+n4tz+V8O1capQteEEyy3Aud3H1ieQYRhYXH4MDH4DUo5DxUTjtfGuZLtiaf04r0+PHBFwWYBBdmp4HkWS84QPI4w9EwIdZp8XDl9cJvQ1ue7FNfMFifuv52BoTAXgi4PrIyFe9IBucGCprKd0JbkIjNTJtXfoGhKJiTFGIVmioo9MVjhKc4CRw3wm1w4pS6EXqsCx0kzwqhk69afNBnGyJ+jPZHzOyEJrRTjCQL9FLXJ6pNt7a+CxT+K/0/ohwADAO/+0rYRNHY3AAAAAElFTkSuQmCC",
    STANDARD_LENS_ICON: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVpJREFUeNpi/P//PwM1ABMDLQHQlfv/4wb7selhwWXYqh03GJZuu4kiFu2lzhDmoYFVPQsOGwyevPjCsOnMExRBeyNpsBw2PSAXOVy784bh05dfKBIPn3/CMB0kduLCMwGQHpgYHw8bg5aKCAMjyNP+eRsxbCcW+JnIMGyc5I87jEBAT4qPIcBeCczecPAew6Vnn3CqBRvEyMjIwMDMiCKhK8nHcHheKNDp7GB+caIJg03SaobLaF4G64WlI0ZWZgYGNlYUnB9lCDcEEhbsYDF0dWC9MBcxs7MxMHFxoNgkJ8WP4XwBfk4MdSC9cBexcLEz/OfjQsFrjmEG/q6LrzDUgfTCXcTCwwW0jhdF0+zbnxhY5lxkSHSUB/PXnXwGFkNXB9YLM4gJ7CJuDBdMu/sFiK8iBLCoYUJ2kbYUD0MsAyNZ6UhbCmI4OEFSI6ODXMQ4qMojqhkEEGAApyqBnHMJ5oMAAAAASUVORK5CYII=",
    BACK_ICON: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfCAYAAACOTBv1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4YTlmZmVhZC05NjdhLWVmNDMtOWFkOS01NTczMGJjY2E2MjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjExNDYxMTFFRkNGMTFFNDkwRDRGMUREQTZFQTQ3RUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjExNDYxMTBFRkNGMTFFNDkwRDRGMUREQTZFQTQ3RUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGE5ZmZlYWQtOTY3YS1lZjQzLTlhZDktNTU3MzBiY2NhNjIzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhhOWZmZWFkLTk2N2EtZWY0My05YWQ5LTU1NzMwYmNjYTYyMyIv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",
    BLINK_ANIMATION: "blinkIcon 2s infinite",
    DEFAULT_ICON_R: 290,
    StartLoadAnnotation: function() {
        if (this.isAnnotationPlaced = !1,
        this.annotationImageCount = 0,
        this.annotationImageLoadedCount = 0,
        null != this.spotJson) {
            var t = this.spotJson.an;
            if (null != t) {
                var e = t.length;
                this.annotationDivArray = new Array(e);
                for (var i = .5 * (this.viewWidth - this.textureW), n = .5 * (this.viewHeight - this.textureH), o = this.textureW, s = this.textureH, a = 0; e > a; a++) {
                    var l = t[a]
                      , h = l.aa
                      , r = l.ab
                      , d = "annotation" + this.index + "-" + a
                      , c = null;
                    if (5 == h) {
                        this.annotationImageCount++,
                        c = $(this.HTML_DIV).attr("id", d).css({
                            position: "absolute",
                            left: i + "px",
                            top: n + "px",
                            width: o + "px",
                            height: s + "px"
                        });
                        var u = new String(l.am)
                          , g = null;
                        if (g = 0 == u.indexOf("http://") || 0 == u.indexOf("https://") ? l.am : this.imageDirectoryUrl + l.am,
                        $("<img>").on("load", this.annotationImage_Load.bind(this)).appendTo(c).attr("src", g),
                        4 == r) {
                            var p = String(l.ak);
                            $("<audio>").attr("src", p).appendTo(c)
                        }
                    } else if (8 == h)
                        c = $(this.HTML_DIV).attr("id", d).css({
                            position: "absolute",
                            color: "black",
                            "text-align": "center",
                            "vertical-align": "middle",
                            fontSize: "20px"
                        }).html(String(l.aj));
                    else if (1 == h)
                        c = $(this.HTML_CODE_FRAME_ANNOTATION).attr("id", d).css({
                            position: "absolute",
                            left: "0px",
                            top: "0px"
                        });
                    else {
                        this.annotationImageCount++,
                        l.ag = -l.ac,
                        l.af = l.ad;
                        var A, m;
                        if (0 == r)
                            l.ae = this.DEFAULT_ICON_R,
                            A = this.POPUP_ICON,
                            m = this.BLINK_ANIMATION;
                        else if (1 == r)
                            l.ae = this.DEFAULT_ICON_R,
                            A = this.EXTERNAL_LINK_ICON,
                            m = this.BLINK_ANIMATION;
                        else
                            switch (h) {
                            case -1:
                                A = this.BACK_ICON;
                                break;
                            case 0:
                            case 2:
                                l.ae = this.DEFAULT_ICON_R,
                                A = this.STANDARD_LENS_ICON,
                                m = this.BLINK_ANIMATION;
                                break;
                            case 3:
                                l.ae = this.DEFAULT_ICON_R,
                                A = this.FISHEYE_LENS_ICON,
                                m = this.BLINK_ANIMATION;
                                break;
                            case 4:
                                l.ae = this.DEFAULT_ICON_R,
                                A = this.ROUND_LENS_ICON,
                                m = this.BLINK_ANIMATION;
                                break;
                            default:
                                continue
                            }
                        c = $(this.HTML_DIV).attr("id", d).css({
                            position: "absolute",
                            left: i + "px",
                            top: n + "px",
                            width: o + "px",
                            height: s + "px",
                            animation: m,
                            "-webkit-animation": m
                        }),
                        $("<img>").on("load", this.annotationImage_Load.bind(this)).appendTo(c).attr("src", A)
                    }
                    var E = null;
                    switch (r) {
                    case -1:
                        E = "backSpotAnnotation";
                        break;
                    case 0:
                        E = "popupTextAnnotation";
                        break;
                    case 1:
                        E = "directLinkAnnotation";
                        break;
                    case 2:
                        E = "switchSpotAnnotation";
                        break;
                    case 3:
                        E = "noActionAnnotation";
                        break;
                    case 4:
                        E = "audioAnnotation";
                        break;
                    case 5:
                        E = "phoneAnnotation"
                    }
                    c.addClass(E),
                    this.annotationDivArray[a] = c
                }
                0 == this.annotationImageCount && this.PlaceAnnotation()
            }
        }
    },
    annotationImage_Load: function() {
        this.annotationImageLoadedCount++,
        this.annotationImageLoadedCount == this.annotationImageCount && this.PlaceAnnotation()
    },
    PlaceAnnotation: function() {
        if (null != this.spotJson) {
            var t = this.spotJson.an;
            if (null != t) {
                var e = t.length
                  , i = $(this.divContainer);
                this.annotationTransformArray = new Array(e);
                for (var n = 0; e > n; n++) {
                    var o = t[n]
                      , s = this.annotationDivArray[n];
                    if (null != o && null != s) {
                        var a = o.aa;
                        if (1 != a) {
                            var l = o.ac
                              , h = o.ad;
                            if (8 != a) {
                                var r = o.ab;
                                s.appendTo(i);
                                var d = s.children()
                                  , c = d.width()
                                  , u = d.height();
                                (0 == c || 0 == u) && (c = d[0].width,
                                u = d[0].height),
                                d.css({
                                    width: this.textureW + "px",
                                    height: this.textureH + "px"
                                });
                                var g = o.ae
                                  , p = -g * Math.cos(h) * Math.sin(l)
                                  , A = -g * Math.sin(h)
                                  , m = -g * Math.cos(h) * Math.cos(l)
                                  , E = -parseFloat(o.ag)
                                  , I = -parseFloat(o.af)
                                  , T = {
                                    x: p,
                                    y: A,
                                    z: m
                                }
                                  , v = {
                                    x: .5 * -c,
                                    y: .5 * u,
                                    z: 0
                                }
                                  , S = {
                                    x: .5 * -c,
                                    y: .5 * -u,
                                    z: 0
                                }
                                  , f = {
                                    x: .5 * c,
                                    y: .5 * u,
                                    z: 0
                                }
                                  , y = {
                                    x: .5 * c,
                                    y: .5 * -u,
                                    z: 0
                                }
                                  , w = {
                                    x: T.x + v.x * Math.cos(E) + v.y * Math.sin(E) * Math.sin(I),
                                    y: T.y + v.y * Math.cos(I),
                                    z: T.z + v.x * Math.sin(E) - v.y * Math.cos(E) * Math.sin(I)
                                }
                                  , M = {
                                    x: T.x + S.x * Math.cos(E) + S.y * Math.sin(E) * Math.sin(I),
                                    y: T.y + S.y * Math.cos(I),
                                    z: T.z + S.x * Math.sin(E) - S.y * Math.cos(E) * Math.sin(I)
                                }
                                  , C = {
                                    x: T.x + f.x * Math.cos(E) + f.y * Math.sin(E) * Math.sin(I),
                                    y: T.y + f.y * Math.cos(I),
                                    z: T.z + f.x * Math.sin(E) - f.y * Math.cos(E) * Math.sin(I)
                                }
                                  , O = {
                                    x: T.x + y.x * Math.cos(E) + y.y * Math.sin(E) * Math.sin(I),
                                    y: T.y + y.y * Math.cos(I),
                                    z: T.z + y.x * Math.sin(E) - y.y * Math.cos(E) * Math.sin(I)
                                }
                                  , D = Math.max.apply(null, [Math.sqrt(w.x * w.x + w.y * w.y + w.z * w.z), Math.sqrt(M.x * M.x + M.y * M.y + M.z * M.z), Math.sqrt(C.x * C.x + C.y * C.y + C.z * C.z), Math.sqrt(O.x * O.x + O.y * O.y + O.z * O.z)])
                                  , b = this.annotationBaseZ / D
                                  , L = .01 * Math.round(100 * T.x * b)
                                  , N = .01 * Math.round(100 * T.y * b)
                                  , B = .01 * Math.round(100 * T.z * b);
                                this.annotationBaseZ = Math.sqrt(L * L + N * N + B * B);
                                var R = -Math.floor(Zenkei.Utility.GetDegreeFromRadian(o.ag))
                                  , G = -Math.floor(Zenkei.Utility.GetDegreeFromRadian(o.af))
                                  , k = this.GetAnnotationMatrix3d(L, N, B, G, R, b, c, u);
                                this.annotationTransformArray[n] = k
                            } else {
                                var g = Number(o.ae) - 120
                                  , P = -Math.floor(Zenkei.Utility.GetDegreeFromRadian(o.af))
                                  , _ = -Math.floor(Zenkei.Utility.GetDegreeFromRadian(o.ag))
                                  , H = -Math.floor(Zenkei.Utility.GetDegreeFromRadian(o.ah))
                                  , p = -g * Math.cos(h) * Math.sin(l)
                                  , A = -g * Math.sin(h)
                                  , m = -g * Math.cos(h) * Math.cos(l)
                                  , U = " translate3d( " + p + "px, " + A + "px, " + m + "px) rotateY(" + _ + "deg) rotateX(" + P + "deg) rotateZ(" + H + "deg)";
                                this.annotationTransformArray[n] = U,
                                s.appendTo(i);
                                var x = s.width() + 50
                                  , W = s.height()
                                  , F = .5 * this.viewWidth - .5 * x
                                  , Z = .5 * this.viewHeight - .5 * W;
                                s.css({
                                    width: x + "px",
                                    height: W + "px",
                                    top: Z + "px",
                                    left: F + "px"
                                })
                            }
                        }
                    }
                }
                for (var n = 0; e > n; n++) {
                    var o = t[n]
                      , s = this.annotationDivArray[n];
                    if (null != o && null != s) {
                        var a = o.aa;
                        -1 != a || this.isHmdModeEnabled && this.canBackSpot || s.css("display", "none");
                        var r = o.ab;
                        if (!this.isHmdModeEnabled || 0 != r && 1 != r && 5 != r || s.css("display", "none"),
                        1 == a) {
                            var b = this.annotationBaseZ / 400
                              , Y = .5 * this.viewWidth - 10
                              , V = .5 * this.viewHeight - 10;
                            s.css({
                                left: Y + "px",
                                top: V + "px"
                            }).appendTo(i);
                            var z = o.ac
                              , j = o.ad
                              , J = Math.floor(Zenkei.Utility.GetDegreeFromRadian(z))
                              , Q = Math.floor(-Zenkei.Utility.GetDegreeFromRadian(j))
                              , k = "rotateY(" + J + "deg) rotateX(" + Q + "deg)" + " translateZ(-" + this.annotationBaseZ + "px)" + " scale3d(" + b + "," + b + "," + b + ")";
                            this.annotationTransformArray[n] = k
                        }
                    }
                }
                this.annotationDivArray = null,
                this.isAnnotationPlaced = !0,
                this.UpdateAnnotationPosition(),
                this.SetAnnotationVisibility(this.shouldShowAnnotation)
            }
        }
    },
    GetAnnotationMatrix3d: function(t, e, i, n, o, s, a, l) {
        var h = s * a / this.textureW
          , r = s * l / this.textureH
          , d = n * Math.PI / 180
          , c = o * Math.PI / 180
          , u = Math.cos(d)
          , g = Math.sin(d)
          , p = Math.cos(c)
          , A = Math.sin(c)
          , m = h * p
          , E = r * A * g
          , I = A * u
          , T = 0
          , v = r * u
          , S = -g
          , f = h * -A
          , y = r * p * g
          , w = p * u
          , M = 7
          , C = "matrix3d(" + String(m.toFixed(M)) + ", " + String(T.toFixed(M)) + ", " + String(f.toFixed(M)) + ", 0," + String(E.toFixed(M)) + ", " + String(v.toFixed(M)) + ", " + String(y.toFixed(M)) + ", 0," + String(I.toFixed(M)) + ", " + String(S.toFixed(M)) + ", " + String(w.toFixed(M)) + ", 0," + String(t.toFixed(M)) + ", " + String(e.toFixed(M)) + ", " + String(i.toFixed(M)) + ", 1)";
        return C
    },
    UpdateAnnotationPosition: function() {
        if (null != this.spotJson && null != this.annotationTransformArray && this.isAnnotationPlaced) {
            var t = this.spotJson.an;
            if (null != t)
                for (var e = "translateZ(" + String(this.perspective) + "px) rotateX(" + String(this.pitch) + "deg) rotateY(" + String(this.yaw) + "deg) ", i = t.length, n = 0; i > n; n++)
                    if (!(n >= this.annotationTransformArray.length)) {
                        var o = this.annotationTransformArray[n];
                        if (null != o) {
                            var s = e + o
                              , a = t[n]
                              , l = "annotation" + this.index + "-" + n
                              , h = document.getElementById(l);
                            h.style.webkitTransform = s,
                            h.style.MozTransform = s,
                            h.style.msTransform = s;
                            var r, d, c = a.aa;
                            1 != c ? (r = .5 * (this.viewWidth - this.textureW),
                            d = .5 * (this.viewHeight - this.textureH)) : (r = .5 * this.viewWidth - 10,
                            d = .5 * this.viewHeight - 10),
                            h.style.top = d + "px",
                            h.style.left = r + "px"
                        }
                    }
        }
    },
    SetAnnotationVisibility: function(t) {
        if (null != this.spotJson) {
            var e = this.spotJson.an;
            if (null != e)
                for (var i = e.length, n = 0; i > n; n++) {
                    var o = e[n];
                    if (-1 != o.ab) {
                        var s = "visible";
                        t || 3 == o.ab || (s = "hidden");
                        var a = "annotation" + this.index + "-" + n;
                        $(document.getElementById(a)).css("visibility", s)
                    }
                }
        }
    },
    setStylePlane: function(t, e, i, n, o) {
        t.style.position = "absolute";
        var s = .5 * (n - e)
          , a = .5 * (o - i);
        t.style.left = String(s) + "px",
        t.style.top = String(a) + "px",
        t.style.width = String(e) + "px",
        t.style.height = String(i) + "px"
    },
    replacePanel: function(t, e, i, n) {
        t && (t.style.webkitTransform = e,
        t.style.MozTransform = e,
        t.style.msTransform = e,
        t.style.left = String(n) + "px",
        t.style.top = String(i) + "px")
    },
    yaw: 0,
    pitch: 0,
    perspective: 0,
    SetView: function(t, e, i) {
        this.yaw = t,
        this.pitch = e,
        this.perspective = i
    },
    RedrawShape: function() {
        var t = "translateZ(" + String(-this.z_panel) + "px)"
          , e = "translateZ(" + String(this.perspective) + "px) rotateX(" + String(this.pitch) + "deg) rotateY(" + String(this.yaw) + "deg) "
          , i = .5 * (this.viewWidth - this.textureW)
          , n = .5 * (this.viewHeight - this.textureH);
        this.replacePanel(this.frontPanel, e + t, n, i),
        this.replacePanel(this.rightPanel, e + "rotateY(-90deg) " + t, n, i),
        this.replacePanel(this.backPanel, e + "rotateY(180deg) " + t, n, i),
        this.replacePanel(this.leftPanel, e + "rotateY(90deg) " + t, n, i),
        this.replacePanel(this.topPanel, e + "rotateX(-90deg) " + t, n, i),
        this.replacePanel(this.bottomPanel, e + "rotateX(90deg) " + t, n, i)
    },
    Redraw: function() {
        var t = String(this.perspective) + "px";
        this.divContainer.style.webkitPerspective = t,
        this.divContainer.style.MozPerspective = t,
        this.divContainer.style.msPerspective = t,
        this.RedrawShape(),
        this.UpdateAnnotationPosition()
    },
    touchStartHandler: function(t) {
        if (this._isTouchPanEnabled) {
            var e = t.touches;
            if (1 === e.length) {
                var i = e[0];
                if (this.x0 = i.pageX,
                this.y0 = i.pageY,
                this.controller.hasAccessLogId) {
                    var n = [{
                        x: this.x0,
                        y: this.y0
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START, n)
                }
            } else if (2 === e.length) {
                var i = e[0]
                  , o = e[1]
                  , s = i.pageX
                  , a = i.pageY
                  , l = o.pageX
                  , h = o.pageY;
                if (this.r0 = (s - l) * (s - l) + (a - h) * (a - h),
                this.controller.hasAccessLogId) {
                    var n = [{
                        x: s,
                        y: a
                    }, {
                        x: l,
                        y: h
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START, n)
                }
            }
            this.clearInertia(),
            this.controller.StopAutoPan(),
            this.controller.StopSlideshow(),
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }
    },
    ignoreTouchMoveEvent: !1,
    touchMoveHandler: function(t) {
        if (this._isTouchPanEnabled) {
            if (this.userAgent.isAndroid && this.ignoreTouchMoveEvent)
                this.ignoreTouchMoveEvent = !1;
            else {
                this.ignoreTouchMoveEvent = !0;
                var e = t.touches;
                if (1 === e.length) {
                    var i = e[0]
                      , n = i.pageX
                      , o = i.pageY;
                    this.x0 < 0 && (this.x0 = n),
                    this.y0 < 0 && (this.y0 = o);
                    var s = -(n - this.x0)
                      , a = o - this.y0
                      , l = 50 / this.perspective
                      , h = l * this.panSpeedX
                      , r = l * this.panSpeedY;
                    if (this.dxv = s * h,
                    this.dyv = a * r,
                    Math.abs(this.dxv) >= .15 || Math.abs(this.dyv) >= .15) {
                        if (this.x0 = n,
                        this.y0 = o,
                        this.controller.hasAccessLogId) {
                            var d = [{
                                x: n,
                                y: o
                            }];
                            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE, d)
                        }
                        this.controller.SetYawAndPitch(this.yaw + this.dxv, this.pitch + this.dyv)
                    }
                } else if (2 === e.length) {
                    var i = e[0]
                      , c = e[1]
                      , u = i.pageX
                      , g = i.pageY
                      , p = c.pageX
                      , A = c.pageY
                      , m = (u - p) * (u - p) + (g - A) * (g - A);
                    this.r0 < 0 && (this.r0 = m);
                    var E = m - this.r0;
                    if (this.r0 = m,
                    this.dxv = 0,
                    this.dyv = 0,
                    this.controller.hasAccessLogId) {
                        var d = [{
                            x: u,
                            y: g
                        }, {
                            x: p,
                            y: A
                        }];
                        this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE, d)
                    }
                    this.controller.SetPerspective(this.perspective + E / this.viewWidth)
                }
            }
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }
    },
    touchEndHandler: function(t) {
        if (this._isTouchPanEnabled) {
            if (this.x0 = -1,
            this.y0 = -1,
            this.r0 = -1,
            clearInterval(this.inertiaTimer),
            this.controller.hasAccessLogId) {
                var e = t.changedTouches;
                if (1 === e.length) {
                    var i = e[0]
                      , n = [{
                        x: i.pageX,
                        y: i.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_END, n)
                } else if (2 === e.length) {
                    var i = e[0]
                      , o = e[1]
                      , n = [{
                        x: i.pageX,
                        y: i.pageY
                    }, {
                        x: o.pageX,
                        y: o.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_END, n)
                }
            }
            this.inertiaTimer = null,
            this.inertiaTimer = this.inertia.applyInterval(30, this, [this.inertia]),
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }
    },
    dxv: 0,
    dxy: 0,
    inertiaTimer: null,
    inertia: function() {
        var t = .96
          , e = this.dxv * t
          , i = this.dyv * t
          , n = 1;
        return n > e && e > -n && n > i && i > -n ? (this.clearInertia(),
        void 0) : (this.dxv = e,
        this.dyv = i,
        this.controller.SetYawAndPitch(this.yaw + e, this.pitch + i),
        void 0)
    },
    clearInertia: function() {
        this.dxv = 0,
        this.dyv = 0,
        clearInterval(this.inertiaTimer),
        this.inertiaTimer = null
    },
    mousedown: function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        this.flagDrag = !0,
        this.x0 = t.clientX,
        this.y0 = t.clientY,
        this.clearInertia(),
        this.controller.StopSlideshow(),
        this.controller.StopAutoPan()
    },
    mousemove: function(t) {
        if (t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        this.flagDrag) {
            var e = t.clientX
              , i = t.clientY;
            this.x0 < 0 && (this.x0 = e),
            this.y0 < 0 && (this.y0 = i);
            var n = -(e - this.x0)
              , o = i - this.y0;
            this.x0 = e,
            this.y0 = i;
            var s = 50 / this.perspective
              , a = s * this.panSpeedX
              , l = s * this.panSpeedY;
            this.dxv = n * a,
            this.dyv = o * l,
            (Math.abs(this.dxv) >= .15 || Math.abs(this.dyv) >= .15) && this.controller.SetYawAndPitch(this.yaw + this.dxv, this.pitch + this.dyv)
        }
    },
    mouseup: function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        this.flagDrag = !1,
        this.x0 = -1,
        this.y0 = -1,
        this.r0 = -1,
        this.inertiaTimer = this.inertia.applyInterval(30, this, [this.inertia])
    },
    mousewheel: function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        this.clearInertia();
        var e = window.event || t
          , i = e.detail ? -20 * e.detail : e.wheelDelta;
        this.controller.StopAutoPan(),
        this.controller.SetPerspective(this.perspective + i / 10)
    },
    pointerUp: function(t) {
        var e = this.pointers.indexOf(t.pointerId);
        e > 0 ? this.pointers.splice(e, 1) : this.pointers = new Array
    },
    pointerDown: function(t) {
        this.pointers || (this.pointers = new Array),
        this.msGesture.addPointer(t.pointerId),
        this.pointers.push(t.pointerId)
    },
    msGestureStart: function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        this.flagDrag = !0,
        this.x0 = t.clientX,
        this.y0 = t.clientY,
        this.clearInertia(),
        this.controller.StopSlideshow(),
        this.controller.StopAutoPan()
    },
    msGestureChange: function(t) {
        if (t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        1 == this.pointers.length) {
            if (this.flagDrag) {
                var e = t.clientX
                  , i = t.clientY;
                this.x0 < 0 && (this.x0 = e),
                this.y0 < 0 && (this.y0 = i);
                var n = -(e - this.x0)
                  , o = i - this.y0;
                this.x0 = e,
                this.y0 = i;
                var s = 50 / this.perspective
                  , a = s * this.panSpeedX
                  , l = s * this.panSpeedY;
                this.dxv = n * a,
                this.dyv = o * l,
                this.controller.SetYawAndPitch(this.yaw + this.dxv, this.pitch + this.dyv)
            }
        } else if (2 == this.pointers.length) {
            var h = 300 * (t.scale - 1);
            this.controller.StopAutoPan(),
            this.controller.SetPerspective(this.perspective + h)
        }
    },
    msGestureEnd: function() {
        event.preventDefault ? event.preventDefault() : event.returnValue = !1,
        this.flagDrag = !1,
        this.x0 = -1,
        this.y0 = -1,
        this.r0 = -1,
        this.pointers = new Array
    },
    preventDefaultEvent: function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
    },
    _isTouchPanEnabled: !0,
    set isTouchPanEnabled(t) {
        this._isTouchPanEnabled = t
    }
},
function(t, e) {
    function i(t) {
        this.panoramaDisplayWidth = t.width,
        this.panoramaDisplayHeight = t.height,
        this.viewWidth = this.panoramaDisplayWidth,
        this.viewHeight = this.panoramaDisplayHeight,
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        projectBaseUrl: null,
        spotJson: null,
        annotationJsonArray: null,
        cubic0: null,
        cubic1: null,
        cubic2: null,
        cubic3: null,
        standard0: null,
        standard1: null,
        panoramaDisplayWidth: 0,
        panoramaDisplayHeight: 0,
        viewWidth: 0,
        viewHeight: 0,
        imageDirectoryUrl: null,
        cubicTextureSize: 1e3,
        gyroYawOffset: null,
        gyroAlphaArray: null,
        gyroBetaArray: null,
        gyroGammaArray: null,
        gyroYawDiffArray: null,
        gyroYawDiffBase: null,
        gyroPitchArray: null,
        lastGyroAlpha: null,
        lastGyroBeta: null,
        lastGyroYaw: null,
        lastGyroPitch: null,
        gyroDiffToSet: .1,
        touchStartX: 0,
        touchStartY: 0,
        isViewFlipped: !1,
        spotMediaInfoSubView: null,
        ELEMENT_ID_PLAYER: "player",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        ELEMENT_ID_MODAL_BACKGROUND: "modalBackground",
        ELEMENT_ID_CONTAINER: "container",
        MAX_CONTAINER_COUNT: 4,
        MESSAGE_DID_FAIL_LOADING_SPOTMEDIAINFO: "パノラマ情報の読み込みができませんでした",
        IGNORE_SAME_GYRO_VALUE_ARRAY_LENGTH: 3,
        MEDIAN_FILTER_ARRAY_LENGTH: 17,
        MEDIAN_FILTER_ARRAY_LENGTH_HALF: 8,
        Initialize: function() {
            return this.projectBaseUrl = String(t.projectJson.aa),
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.cubicTextureSize = this.model.cubicTextureSize,
            this.gyroAlphaArray = new Array,
            this.gyroBetaArray = new Array,
            this.gyroGammaArray = new Array,
            this.gyroYawDiffArray = new Array,
            this.gyroPitchArray = new Array,
            this.model.userAgent.isAndroid && (this.gyroDiffToSet = 1),
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.viewChangeEventHandler.Register(this.model_ViewChange.bind(this)),
            this.model.startAutoPanEventHandler.Register(this.model_StartAutoPan.bind(this)),
            this.model.walkThroughStartedEventHandler.Register(this.model_WalkThroughStarted.bind(this)),
            this.model.selectSpotForWalkThroughFadeAnimationEventHandler.Register(this.model_SelectSpotForWalkThroughFadeAnimation.bind(this)),
            this.model.walkThroughZoomEndedEventHandler.Register(this.model_WalkThroughZoomEnded.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.gyroModeStartEventHandler.Register(this.model_GyroModeStart.bind(this)),
            this.model.gyroModeStopEventHandler.Register(this.model_GyroModeStop.bind(this)),
            this.model.shouldShowAnnotationChangedEventHandler.Register(this.model_shouldShowAnnotationChanged.bind(this)),
            this.model.modalVisibilityChangedEventHandler.Register(this.model_ModalVisibilityChanged.bind(this)),
            this.controller.isPlayingBrowseLog || t.addEventListener("deviceorientation", this.window_deviceorientationHandler.bind(this), !1),
            this.CalculateSize(),
            this.UpdatePanoramaDisplayCss(),
            this.UpdateViewSize(),
            this
        },
        CreateDiv: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY)).css("overflow", "hidden");
            0 == t.length && $("<div></div>").attr("id", this.ELEMENT_ID_PANORAMA_DISPLAY).appendTo(document.getElementById(this.ELEMENT_ID_PLAYER)),
            this.model.isViewFlipped ? (this.CreateContainer(2),
            this.model.isHmdModeEnabled && this.CreateContainer(3)) : (this.CreateContainer(0),
            this.model.isHmdModeEnabled && this.CreateContainer(1));
            var e = 0;
            this.model.isViewFlipped && (e = 2);
            var i = $(document.getElementById(this.ELEMENT_ID_CONTAINER + e));
            this.model.userAgent.isTouchDevice ? (i.on("touchstart", this.mainFrontContainer_TouchStart.bind(this)),
            i.on("touchend", this.mainFrontContainer_TouchEnd.bind(this))) : i.on("click", this.mainFrontContainer_Click.bind(this)),
            $(document.getElementById(this.ELEMENT_ID_MODAL_BACKGROUND)).remove(),
            $("<div></div>").attr("id", this.ELEMENT_ID_MODAL_BACKGROUND).css({
                position: "absolute",
                "background-color": "rgba(0, 0, 0, 0.5)",
                "z-index": "5500",
                display: "none",
                width: "100%",
                height: "100%"
            }).appendTo(t)
        },
        CreateContainer: function(t) {
            var e = this.ELEMENT_ID_CONTAINER + t;
            $(document.getElementById(e)).remove();
            var i = $("<div></div>").attr("id", e).css({
                position: "absolute",
                overflow: "hidden",
                width: this.viewWidth + "px",
                height: this.viewHeight + "px"
            })
              , n = 0 == t % 2
              , o = !this.model.isViewFlipped && (0 == t || 1 == t) || this.model.isViewFlipped && (2 == t || 3 == t);
            if (o)
                i.appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
            else {
                var s = 0;
                this.model.isViewFlipped && (s = 2),
                n || s++,
                $(document.getElementById(this.ELEMENT_ID_CONTAINER + s)).before(i)
            }
        },
        GetSpotMediaInfo: function(e, i) {
            if (null != e) {
                var n = null
                  , o = this.model.spotLensType;
                if (0 === o) {
                    var s = 45
                      , a = 45;
                    return n = new Zenkei.Panorama.SpotMediaInfo(Zenkei.Utility.parseSpotType(o),-a,a,s,-s,0,0,0,0,-a,a,s,-s,0,null,!1,"linear",e.ah * Zenkei.Utility.RAD_TO_DEG,-1 * e.ag * Zenkei.Utility.RAD_TO_DEG,0,e.ak * Zenkei.Utility.RAD_TO_DEG),
                    this.controller.SetSpotMediaInfo(n),
                    this.LoadStandardImage(e),
                    void 0
                }
                var l = t.serverAppBasePath + "GetSpotMediaInfo.aspx?spotPath=" + this.projectBaseUrl + e.ad;
                "/" != l.substring(l.length - 1) && (l += "/"),
                $.ajax({
                    type: "GET",
                    url: l,
                    dataType: "xml",
                    error: function() {
                        this.controller.StopAutoPan(),
                        this.controller.StopSlideshow(),
                        alert(this.MESSAGE_DID_FAIL_LOADING_SPOTMEDIAINFO)
                    }
                    .bind(this),
                    success: function(o) {
                        var s = $(o).find("SpotMediaInfo").find("IVP")
                          , a = new Array(11)
                          , l = 0;
                        s.find("CurveArray").each(function() {
                            a[l++] = t.parseFloat($(this).text())
                        });
                        var h = t.parseFloat(s.find("AngleRight").text());
                        h = -1 * (2 * Math.PI - h) * Zenkei.Utility.RAD_TO_DEG;
                        var r = t.parseFloat(s.find("AngleLeft").text()) * Zenkei.Utility.RAD_TO_DEG
                          , d = "true" == String(e.av) ? !0 : !1
                          , c = t.parseFloat(s.find("VisibleAngleRight").text());
                        c = 0 == c ? h : -1 * (2 * Math.PI - c) * Zenkei.Utility.RAD_TO_DEG;
                        var u = t.parseFloat(s.find("VisibleAngleLeft").text());
                        u = 0 == u ? r : s.find("VisibleAngleLeft").text() * Zenkei.Utility.RAD_TO_DEG;
                        var g = e.ak * Zenkei.Utility.RAD_TO_DEG;
                        0 != t.layoutInfo.reviseFov && this.viewWidth < this.viewHeight && (g = g * this.viewWidth / this.viewHeight);
                        var p = 0
                          , A = 0;
                        this.model.isWalkThroughExecuting ? p = this.model.initYawAfterWalkThrough : (p = e.ai * Zenkei.Utility.RAD_TO_DEG,
                        A = e.aj * Zenkei.Utility.RAD_TO_DEG),
                        n = new Zenkei.Panorama.SpotMediaInfo($(o).find("SpotMediaInfo").find("SpotType").text(),-1 * t.parseFloat(s.find("AngleAbove").text()) * Zenkei.Utility.RAD_TO_DEG,-1 * t.parseFloat(s.find("AngleBelow").text()) * Zenkei.Utility.RAD_TO_DEG,r,h,t.parseFloat(s.find("MaskRatioAbove").text()),t.parseFloat(s.find("MaskRatioBelow").text()),t.parseFloat(s.find("MaskRatioLeft").text()),t.parseFloat(s.find("MaskRatioRight").text()),-1 * t.parseFloat(s.find("VisibleAngleAbove").text()) * Zenkei.Utility.RAD_TO_DEG,-1 * t.parseFloat(s.find("VisibleAngleBelow").text()) * Zenkei.Utility.RAD_TO_DEG,u,c,s.find("RadiusAngle").text() * Zenkei.Utility.RAD_TO_DEG,new Array(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10]),d,$(o).find("SpotMediaInfo").find("ProjectionType").text(),p,A,0,g),
                        i ? this.spotMediaInfoSubView = n : this.controller.SetSpotMediaInfo(n),
                        this.LoadPanoramaImage(e, i)
                    }
                    .bind(this)
                })
            }
        },
        LoadStandardImage: function(e) {
            null != e && 0 == e.aa && (this.model.isViewFlipped ? (this.standard0 = new t.Zenkei.Panorama.StandardImage(2,this.model,this.controller,this.imageDirectoryUrl,this.ELEMENT_ID_CONTAINER,this.model.shouldShowAnnotation),
            this.model.isHmdModeEnabled && (this.standard1 = new t.Zenkei.Panorama.StandardImage(3,this.model,this.controller,this.imageDirectoryUrl,this.ELEMENT_ID_CONTAINER,this.model.shouldShowAnnotation))) : (this.standard0 = new t.Zenkei.Panorama.StandardImage(0,this.model,this.controller,this.imageDirectoryUrl,this.ELEMENT_ID_CONTAINER,this.model.shouldShowAnnotation),
            this.model.isHmdModeEnabled && (this.standard1 = new t.Zenkei.Panorama.StandardImage(1,this.model,this.controller,this.imageDirectoryUrl,this.ELEMENT_ID_CONTAINER,this.model.shouldShowAnnotation))))
        },
        LoadPanoramaImage: function(t, e) {
            null != t && 0 != t.aa && (e ? this.model.isViewFlipped ? (this.cubic0 = new CubicCSSPlayer(0,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic0.SetView(-this.model.initYawAfterWalkThrough, 0, this.model.initPerspectiveAfterWalkThrough),
            this.cubic0.GenerateHtml(),
            this.model.isHmdModeEnabled && (this.cubic1 = new CubicCSSPlayer(1,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic1.SetView(-this.model.initYawAfterWalkThrough, 0, this.model.initPerspectiveAfterWalkThrough),
            this.cubic1.GenerateHtml())) : (this.cubic2 = new CubicCSSPlayer(2,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic2.SetView(-this.model.initYawAfterWalkThrough, 0, this.model.initPerspectiveAfterWalkThrough),
            this.cubic2.GenerateHtml(),
            this.model.isHmdModeEnabled && (this.cubic3 = new CubicCSSPlayer(3,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic3.SetView(-this.model.initYawAfterWalkThrough, 0, this.model.initPerspectiveAfterWalkThrough),
            this.cubic3.GenerateHtml())) : this.model.isViewFlipped ? (this.cubic2 = new CubicCSSPlayer(2,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic2.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic2.GenerateHtml(),
            this.model.isHmdModeEnabled && (this.cubic3 = new CubicCSSPlayer(3,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic3.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic3.GenerateHtml())) : (this.cubic0 = new CubicCSSPlayer(0,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic0.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic0.GenerateHtml(),
            this.model.isHmdModeEnabled && (this.cubic1 = new CubicCSSPlayer(1,this.projectBaseUrl,t,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
            this.cubic1.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic1.GenerateHtml())))
        },
        CalculateSize: function() {
            this.model.isHmdModeEnabled ? (this.panoramaDisplayWidth = this.model.playerWidth,
            this.panoramaDisplayHeight = this.model.playerHeight,
            this.panoramaDisplayWidth > this.panoramaDisplayHeight ? (this.viewWidth = .5 * this.panoramaDisplayWidth,
            this.viewHeight = this.panoramaDisplayHeight) : (this.viewWidth = this.panoramaDisplayWidth,
            this.viewHeight = .5 * this.panoramaDisplayHeight)) : (this.panoramaDisplayWidth = t.Zenkei.layoutInfo.panorama.size.width,
            this.panoramaDisplayHeight = t.Zenkei.layoutInfo.panorama.size.height,
            this.viewWidth = this.panoramaDisplayWidth,
            this.viewHeight = this.panoramaDisplayHeight)
        },
        StopTimer: function() {
            null != this.standard0 && (this.standard0.StopImageDragBreak(),
            this.standard0.StopImageScale()),
            null != this.standard1 && (this.standard1.StopImageDragBreak(),
            this.standard1.StopImageScale()),
            null != this.cubic0 && this.cubic0.clearInertia(),
            null != this.cubic1 && this.cubic1.clearInertia(),
            null != this.cubic2 && this.cubic2.clearInertia(),
            null != this.cubic3 && this.cubic3.clearInertia()
        },
        UpdatePanoramaDisplayCss: function() {
            var e = $(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY)).css({
                width: this.panoramaDisplayWidth + "px",
                height: this.panoramaDisplayHeight + "px"
            })
              , i = "relative"
              , n = ""
              , o = ""
              , s = {};
            this.model.isHmdModeEnabled || (null != t.Zenkei.layoutInfo.panorama.position && (i = t.Zenkei.layoutInfo.panorama.position),
            null != t.Zenkei.layoutInfo.panorama.top && (n = t.Zenkei.layoutInfo.panorama.top),
            null != t.Zenkei.layoutInfo.panorama.float && (o = t.Zenkei.layoutInfo.panorama.float)),
            s.top = n,
            s.position = i,
            s["float"] = o,
            e.css(s)
        },
        UpdateViewSize: function() {
            this.controller.SetViewSize(this.viewWidth, this.viewHeight),
            this.controller.SetPerspective(this.model.perspective),
            null != this.standard0 && this.standard0.UpdateSize(),
            null != this.standard1 && this.standard1.UpdateSize(),
            null != this.cubic0 && (this.cubic0.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic0.SetSize(this.viewWidth, this.viewHeight),
            this.cubic0.UpdateCssTranslateProperties(),
            this.cubic0.UpdateAnnotationPosition()),
            null != this.cubic1 && (this.cubic1.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic1.SetSize(this.viewWidth, this.viewHeight),
            this.cubic1.UpdateCssTranslateProperties(),
            this.cubic1.UpdateAnnotationPosition()),
            null != this.cubic2 && (this.cubic2.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic2.SetSize(this.viewWidth, this.viewHeight),
            this.cubic2.UpdateCssTranslateProperties(),
            this.cubic2.UpdateAnnotationPosition()),
            null != this.cubic3 && (this.cubic3.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
            this.cubic3.SetSize(this.viewWidth, this.viewHeight),
            this.cubic3.UpdateCssTranslateProperties(),
            this.cubic3.UpdateAnnotationPosition())
        },
        SetIsTouchPanEnabled: function(t) {
            null != this.cubic0 && (this.cubic0.isTouchPanEnabled = t),
            null != this.cubic1 && (this.cubic0.isTouchPanEnabled = t),
            null != this.cubic2 && (this.cubic2.isTouchPanEnabled = t),
            null != this.cubic3 && (this.cubic3.isTouchPanEnabled = t)
        },
        UpdateCssProperty: function() {
            for (var t = this.model.isOrientationPortrait, e = this.MAX_CONTAINER_COUNT, i = 0; e > i; i++) {
                var n = this.ELEMENT_ID_CONTAINER + i
                  , o = 0
                  , s = 0;
                t ? s = this.viewHeight * (i % 2) : o = this.viewWidth * (i % 2),
                $(document.getElementById(n)).css({
                    left: o + "px",
                    top: s + "px",
                    width: this.viewWidth + "px",
                    height: this.viewHeight + "px"
                })
            }
        },
        RotateEuler: function(t) {
            var e, i, n, o = Math.cos(t.yaw), s = Math.sin(t.yaw), a = Math.cos(t.pitch), l = Math.sin(t.pitch), h = Math.cos(t.roll), r = Math.sin(t.roll);
            return matrix = new Array(s * r - o * l * h,-o * a,o * l * r + s * h,a * h,-l,-a * r,s * l * h + o * r,s * a,-s * l * r + o * h),
            matrix[3] > .9999 ? (e = Math.atan2(matrix[2], matrix[8]),
            n = Math.PI / 2,
            i = 0) : matrix[3] < -.9999 ? (e = Math.atan2(matrix[2], matrix[8]),
            n = -Math.PI / 2,
            i = 0) : (e = Math.atan2(-matrix[6], matrix[0]),
            i = Math.atan2(-matrix[5], matrix[4]),
            n = Math.asin(matrix[3])),
            new Object({
                yaw: e,
                pitch: n,
                roll: i
            })
        },
        ArrayIndexOf: function(t, e) {
            if (null == t || 0 == t.length)
                return -1;
            for (var i = t.length - 1, n = 0; i > n; n++)
                if (t[n] == e)
                    return n;
            return -1
        },
        CheckAnnotationClick: function(t, i, n) {
            if (null != this.spotJson && this.model.shouldShowAnnotation) {
                var o = this.model.spotLensType;
                if (0 != o && o != e && null != o && null != this.annotationJsonArray) {
                    var s = 0;
                    this.model.isViewFlipped && (s = 2);
                    var a = t
                      , l = i
                      , h = this.ELEMENT_ID_CONTAINER + s
                      , r = $(document.getElementById(h)).offset();
                    if (r != e && (t -= r.left,
                    i -= r.top),
                    !(0 > t || t > n.currentTarget.offsetWidth || 0 > i || i > n.currentTarget.offsetHeight)) {
                        var d = .01745329 * this.model.yaw
                          , c = .01745329 * -this.model.pitch;
                        2 === o && (d = 0 > d ? d + 2 * Math.PI : d);
                        for (var u = this.model.perspective, g = 2 * Math.atan(.5 * n.currentTarget.offsetWidth / u), p = Zenkei.Utility.getYP([t, i], [d, c, g, 1], [n.currentTarget.offsetWidth, n.currentTarget.offsetHeight]), A = this.annotationJsonArray.length, m = 0; A > m; m++) {
                            var E = this.annotationJsonArray[m]
                              , I = Math.floor(Zenkei.Utility.GetDegreeFromRadian(E.ac))
                              , T = Math.floor(-Zenkei.Utility.GetDegreeFromRadian(E.ad))
                              , v = 360 - I;
                            360 == v && (v = 0);
                            var S = -T;
                            d = p[0],
                            c = p[1];
                            var f = .0872664625;
                            if (5 === E.aa && (f = 2 * f),
                            g > .5 * Math.PI) {
                                var y = n.currentTarget.offsetWidth / 2 / Math.tan(.5 * g)
                                  , w = n.currentTarget.offsetWidth / 2;
                                f = Math.atan2(w * Math.tan(f), y)
                            }
                            var M = .01745329 * v
                              , C = .01745329 * d
                              , O = .01745329 * S
                              , D = .01745329 * c;
                            if (M > 2 * Math.PI ? M -= 2 * Math.PI : 0 > M && (M += 2 * Math.PI),
                            C > 2 * Math.PI ? C -= 2 * Math.PI : 0 > C && (C += 2 * Math.PI),
                            O = Math.asin(Math.sin(O)),
                            D = Math.asin(Math.sin(D)),
                            Math.abs(M - C) < f && Math.abs(O - D) < f) {
                                if (this.controller.hasAccessLogId) {
                                    var b = {
                                        x: a,
                                        y: l
                                    };
                                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_ANNOTATION, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, b)
                                }
                                return this.controller.ExecuteAnnotation(m),
                                void 0
                            }
                        }
                    }
                }
            }
        },
        FrontAnnotationCheck: function() {
            if (this.model.isHmdModeEnabled && !this.model.isWalkThroughExecuting && 0 != this.model.spotLensType) {
                for (var t = this.model.yaw, e = this.model.pitch, i = Math.PI / 180, n = -1, o = this.annotationJsonArray.length, s = 0; o > s; s++) {
                    var a = this.annotationJsonArray[s]
                      , l = a.ab;
                    if (3 != l && (-1 != l || this.controller.canBackSpot) && (!this.model.isHmdModeEnabled || 0 != l && 1 != l && 5 != l)) {
                        var h = 360 - a.ac / i;
                        h >= 180 && (h -= 360);
                        var r = a.ad / i
                          , d = Math.abs(t - h);
                        d > 180 && (d = 360 - d);
                        var c = Math.abs(e - r)
                          , u = 15 > d && 10 > c;
                        if (u) {
                            n = s;
                            break
                        }
                    }
                }
                null == this.model.frontWalkThroughIndex && (-1 != n ? this.model.frontAnnotationIndex != n && null == this.model.frontWalkThroughIndex && (this.model.frontAnnotationIndex = n,
                this.controller.FireAnnotationFrontOverEvent()) : null != this.model.frontAnnotationIndex && (this.controller.FireAnnotationFrontOutEvent(),
                this.model.frontAnnotationIndex = null))
            }
        },
        PreventDefaultEventBehavior: function(t) {
            null != t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        DisposeCubic: function() {
            this.cubic0 = null,
            this.cubic1 = null,
            this.cubic2 = null,
            this.cubic3 = null
        },
        DisposeStandard: function() {
            this.standard0 = null,
            this.standard1 = null
        },
        model_PlayerSizeChanged: function() {
            if (this.CalculateSize(),
            this.UpdatePanoramaDisplayCss(),
            this.UpdateCssProperty(),
            this.UpdateViewSize(),
            this.FrontAnnotationCheck(),
            this.model.userAgent.isAndroid && !this.model.userAgent.isChrome && !this.model.userAgent.isWindowsMobile) {
                var t = $(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
                t.css("display", "none"),
                t[0].offsetHeight,
                t.css("display", "block")
            }
        },
        model_SpotSelect: function() {
            if (this.StopTimer(),
            !this.model.isWalkThroughExecuting || !this.model.userAgent.canFadeAnimation) {
                if (this.DisposeCubic(),
                this.DisposeStandard(),
                this.spotJson = this.model.spotJson,
                this.CreateDiv(),
                this.UpdateCssProperty(),
                null == this.spotJson)
                    return this.controller.FireSpotImageLoadCompletedEvent(0),
                    this.annotationJsonArray = null,
                    void 0;
                this.annotationJsonArray = this.spotJson.an,
                this.imageDirectoryUrl = this.projectBaseUrl + this.spotJson.ad,
                "/" != this.imageDirectoryUrl.substring(this.imageDirectoryUrl.length - 1) && (this.imageDirectoryUrl = this.imageDirectoryUrl + "/");
                try {
                    var t = this.imageDirectoryUrl + "thumb.jpg";
                    $("link[rel=apple-touch-icon]").remove(),
                    $("head").append('<link rel="apple-touch-icon" href="' + t + '">')
                } catch (e) {}
                this.GetSpotMediaInfo(this.spotJson, !1)
            }
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.model.isHmdModeEnabled && !this.model.isWalkThroughExecuting && this.controller.StartGyroMode()
        },
        model_ViewChange: function() {
            var t = this.model.yaw
              , e = this.model.pitch;
            if (0 == this.model.spotLensType) {
                var i = this.model.horizontalFov;
                null != this.standard0 && this.standard0.SetView(t, e, i),
                null != this.standard1 && this.standard1.SetView(t, e, i)
            } else {
                var n = this.model.perspective;
                this.model.isViewFlipped ? (null != this.cubic2 && (this.cubic2.SetView(t, e, n),
                this.cubic2.Redraw()),
                null != this.cubic3 && (this.cubic3.SetView(t, e, n),
                this.cubic3.Redraw())) : (null != this.cubic0 && (this.cubic0.SetView(t, e, n),
                this.cubic0.Redraw()),
                null != this.cubic1 && (this.cubic1.SetView(t, e, n),
                this.cubic1.Redraw()))
            }
            this.FrontAnnotationCheck()
        },
        model_StartAutoPan: function() {
            this.StopTimer()
        },
        model_WalkThroughStarted: function() {
            this.StopTimer()
        },
        model_SelectSpotForWalkThroughFadeAnimation: function(t) {
            if (this.model.isWalkThroughExecuting) {
                var e = this.controller.GetSpotJsonByIndex(t);
                if (null != e) {
                    var i = 0;
                    this.model.isViewFlipped ? (this.CreateContainer(0),
                    this.model.isHmdModeEnabled && this.CreateContainer(1)) : (i = 2,
                    this.CreateContainer(2),
                    this.model.isHmdModeEnabled && this.CreateContainer(3));
                    var n = $(document.getElementById(this.ELEMENT_ID_CONTAINER + i));
                    this.model.userAgent.isTouchDevice ? (n.on("touchstart", this.mainFrontContainer_TouchStart.bind(this)),
                    n.on("touchend", this.mainFrontContainer_TouchEnd.bind(this))) : n.on("click", this.mainFrontContainer_Click.bind(this)),
                    this.UpdateCssProperty(),
                    this.GetSpotMediaInfo(e, !0)
                }
            }
        },
        model_WalkThroughZoomEnded: function() {
            this.model.userAgent.canFadeAnimation && (this.controller.SetIsViewFlipped(!this.model.isViewFlipped),
            this.controller.SetSpotMediaInfo(this.spotMediaInfoSubView),
            this.model.isViewFlipped ? (null != this.cubic0 && (this.cubic0.clearInertia(),
            this.cubic0 = null),
            null != this.cubic1 && (this.cubic1.clearInertia(),
            this.cubic1 = null),
            $(document.getElementById(this.ELEMENT_ID_CONTAINER + "0")).remove(),
            $(document.getElementById(this.ELEMENT_ID_CONTAINER + "1")).remove()) : (null != this.cubic2 && (this.cubic2.clearInertia(),
            this.cubic2 = null),
            null != this.cubic3 && (this.cubic3.clearInertia(),
            this.cubic3 = null),
            $(document.getElementById(this.ELEMENT_ID_CONTAINER + "2")).remove(),
            $(document.getElementById(this.ELEMENT_ID_CONTAINER + "3")).remove()))
        },
        model_WalkThroughEnded: function() {
            this.model.userAgent.canFadeAnimation && (this.model.isHmdModeEnabled && this.controller.StartGyroMode(),
            this.spotJson = this.model.spotJson,
            this.annotationJsonArray = this.spotJson.an)
        },
        model_HmdModeStart: function() {
            var e = this.model.spotJson;
            if (null != e) {
                if (this.CalculateSize(),
                this.UpdatePanoramaDisplayCss(),
                this.model.horizontalFov < 100) {
                    var i = .5 * this.model.viewWidth / Math.tan(50 / 180 * Math.PI);
                    this.controller.SetPerspective(i)
                }
                0 == this.model.spotLensType ? this.model.isViewFlipped ? (null != this.standard0 && this.standard0.SetAnnotationVisibility(!1),
                this.CreateContainer(3),
                this.standard1 = new t.Zenkei.Panorama.StandardImage(3,this.model,this.controller,this.imageDirectoryUrl,this.ELEMENT_ID_CONTAINER,this.model.shouldShowAnnotation)) : (null != this.standard0 && this.standard0.SetAnnotationVisibility(!1),
                this.CreateContainer(1),
                this.standard1 = new t.Zenkei.Panorama.StandardImage(1,this.model,this.controller,this.imageDirectoryUrl,this.ELEMENT_ID_CONTAINER,this.model.shouldShowAnnotation)) : this.model.isViewFlipped ? (this.CreateContainer(3),
                this.cubic3 = new CubicCSSPlayer(3,this.projectBaseUrl,e,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
                this.cubic3.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
                this.cubic3.GenerateHtml()) : (this.CreateContainer(1),
                this.cubic1 = new CubicCSSPlayer(1,this.projectBaseUrl,e,this.ELEMENT_ID_CONTAINER,this.viewWidth,this.viewHeight,this.cubicTextureSize,this.model.actualUserAgent,this.model.shouldShowAnnotation,this.model.isHmdModeEnabled,this.controller.canBackSpot),
                this.cubic1.SetView(this.model.yaw, this.model.pitch, this.model.perspective),
                this.cubic1.GenerateHtml()),
                this.UpdateCssProperty(),
                this.UpdateViewSize(),
                this.controller.canBackSpot && $(".backSpotAnnotation").css("display", "block"),
                $(".popupTextAnnotation").css("display", "none"),
                $(".directLinkAnnotation").css("display", "none"),
                $(".phoneAnnotation").css("display", "none"),
                this.controller.StartGyroMode()
            }
        },
        model_HmdModeStop: function() {
            this.CalculateSize(),
            this.UpdatePanoramaDisplayCss(),
            this.UpdateCssProperty(),
            this.UpdateViewSize(),
            this.StopTimer(),
            0 == this.model.spotLensType ? (null != this.standard0 && this.standard0.SetAnnotationVisibility(this.model.shouldShowAnnotation),
            null != this.standard1 && (this.standard1.StopImageDragBreak(),
            this.standard1.StopImageScale(),
            this.standard1 = null)) : (null != this.cubic1 && (this.cubic1.clearInertia(),
            this.cubic1 = null),
            null != this.cubic3 && (this.cubic3.clearInertia(),
            this.cubic3 = null)),
            $(document.getElementById(this.ELEMENT_ID_CONTAINER + "1")).remove(),
            $(document.getElementById(this.ELEMENT_ID_CONTAINER + "3")).remove(),
            $(".backSpotAnnotation").css("display", "none"),
            $(".popupTextAnnotation").css("display", "block"),
            $(".directLinkAnnotation").css("display", "block"),
            $(".phoneAnnotation").css("display", "block"),
            this.controller.StopGyroMode(),
            0 != this.model.spotLensType && this.controller.SetYawAndPitch(this.model.yaw, this.model.pitch)
        },
        model_GyroModeStart: function() {
            this.controller.isPlayingBrowseLog || (this.gyroYawOffset = null,
            this.gyroAlphaArray = new Array,
            this.gyroBetaArray = new Array,
            this.gyroGammaArray = new Array,
            this.SetIsTouchPanEnabled(!this.model.isGyroModeEnabled))
        },
        model_GyroModeStop: function() {
            this.controller.isPlayingBrowseLog || (this.gyroYawOffset = null,
            this.SetIsTouchPanEnabled(!this.model.isGyroModeEnabled))
        },
        model_shouldShowAnnotationChanged: function() {
            null != this.cubic0 && this.cubic0.SetAnnotationVisibility(this.model.shouldShowAnnotation),
            null != this.cubic1 && this.cubic1.SetAnnotationVisibility(this.model.shouldShowAnnotation),
            null != this.cubic2 && this.cubic2.SetAnnotationVisibility(this.model.shouldShowAnnotation),
            null != this.cubic3 && this.cubic3.SetAnnotationVisibility(this.model.shouldShowAnnotation),
            null != this.standard0 && this.standard0.SetAnnotationVisibility(this.model.shouldShowAnnotation),
            null != this.standard1 && this.standard1.SetAnnotationVisibility(this.model.shouldShowAnnotation)
        },
        model_ModalVisibilityChanged: function(e) {
            var i = $(document.getElementById(this.ELEMENT_ID_MODAL_BACKGROUND));
            0 != i.length && (e ? t.Zenkei.Utility.fadein(i[0], 350) : t.Zenkei.Utility.fadeout(i[0], 350))
        },
        mainFrontContainer_TouchStart: function(t) {
            var e = t.originalEvent;
            if (this.PreventDefaultEventBehavior(e),
            1 == e.changedTouches.length) {
                var i = event.changedTouches[0];
                this.touchStartX = i.pageX,
                this.touchStartY = i.pageY
            }
        },
        mainFrontContainer_TouchEnd: function(t) {
            var e = t.originalEvent;
            this.PreventDefaultEventBehavior(e);
            var i = event.changedTouches[0]
              , n = i.pageX
              , o = i.pageY;
            Math.abs(this.touchStartX - n) >= 10 || Math.abs(this.touchStartY - o) >= 10 || this.CheckAnnotationClick(this.touchStartX, this.touchStartY, t)
        },
        mainFrontContainer_Click: function(t) {
            var e = t.originalEvent;
            this.PreventDefaultEventBehavior(e),
            this.CheckAnnotationClick(e.pageX, e.pageY, t)
        },
        window_deviceorientationHandler: function(t) {
            var e = t.alpha
              , i = t.beta
              , n = t.gamma;
            if (!this.model.isGyroEventSupported && null != e && null != i && null != n)
                return this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_BROWSER_GYRO_EVENT, this.controller.constValues.BROWSE_LOG_ACTION_ID_START, null),
                this.controller.SetIsGyroEventSupported(!0),
                void 0;
            if (this.model.isGyroModeEnabled) {
                if (this.model.userAgent.isAndroid && (this.gyroAlphaArray.push(e),
                this.gyroBetaArray.push(i),
                this.gyroGammaArray.push(n),
                this.gyroAlphaArray.length > this.IGNORE_SAME_GYRO_VALUE_ARRAY_LENGTH && (this.gyroAlphaArray.shift(),
                this.gyroBetaArray.shift(),
                this.gyroGammaArray.shift())),
                null != this.lastGyroAlpha) {
                    var o = Math.abs(e - this.lastGyroAlpha);
                    if (o > 180 && (o = 360 - o),
                    o <= this.gyroDiffToSet) {
                        var s = Math.abs(i - this.lastGyroBeta);
                        if (s <= this.gyroDiffToSet)
                            return
                    }
                }
                var a = Math.PI / 180
                  , l = new Object({
                    yaw: e * a,
                    pitch: i * a,
                    roll: n * a
                })
                  , h = this.RotateEuler(l)
                  , r = -h.yaw / a
                  , d = -h.pitch / a;
                if (null == this.gyroYawOffset && (this.gyroYawOffset = this.model.yaw - r),
                this.model.userAgent.isAndroid) {
                    var c = this.ArrayIndexOf(this.gyroAlphaArray, e);
                    if (-1 != c && this.gyroBetaArray[c] == i && this.gyroGammaArray[c] == n)
                        return;
                    if (!this.model.userAgent.isChrome) {
                        this.gyroPitchArray.push(d);
                        var u = r + 180
                          , g = 0;
                        if (0 == this.gyroYawDiffArray.length)
                            return this.gyroYawDiffBase = u,
                            this.gyroYawDiffArray.push(g),
                            void 0;
                        for (var p = this.gyroYawDiffBase, A = 0; A < this.gyroYawDiffArray.length; A++)
                            p += this.gyroYawDiffArray[A];
                        if (g = u - p,
                        Math.abs(g) > 180 && (0 > g ? g += 360 : g -= 360),
                        this.gyroYawDiffArray.length == this.MEDIAN_FILTER_ARRAY_LENGTH) {
                            for (this.gyroPitchArray.shift(),
                            this.gyroYawDiffArray.shift(),
                            this.gyroYawDiffBase += this.gyroYawDiffArray[0]; this.gyroYawDiffBase > 360; )
                                this.gyroYawDiffBase -= 360;
                            this.gyroYawDiffArray[0] = 0
                        }
                        if (this.gyroYawDiffArray.push(g),
                        this.gyroYawDiffArray.length < this.MEDIAN_FILTER_ARRAY_LENGTH)
                            return;
                        for (var m = this.gyroYawDiffBase, E = new Array, I = new Array, A = 0; A < this.gyroYawDiffArray.length; A++)
                            m += this.gyroYawDiffArray[A],
                            E.push(m),
                            I.push(this.gyroPitchArray[A]);
                        for (E.sort(function(t, e) {
                            return t - e
                        }),
                        I.sort(function(t, e) {
                            return t - e
                        }),
                        r = E[this.MEDIAN_FILTER_ARRAY_LENGTH_HALF],
                        r -= 180,
                        -180 > r && (r += 360),
                        d = I[this.MEDIAN_FILTER_ARRAY_LENGTH_HALF]; r > 180; )
                            r -= 360
                    }
                }
                var T = Math.abs(r - this.lastGyroYaw);
                T > 180 && (T = 360 - T);
                var v = Math.abs(d - this.lastGyroPitch);
                (T > this.gyroDiffToSet || v > this.gyroDiffToSet) && (this.lastGyroAlpha = e,
                this.lastGyroBeta = i,
                this.lastGyroYaw = r,
                this.lastGyroPitch = d,
                this.controller.SetYawAndPitch(r + this.gyroYawOffset, d))
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.Panorama = i)
}(window),
function(t, e) {
    function i(t, e, i, n, o, s, a, l, h, r, d, c, u, g, p, A, m, E, I, T, v) {
        this.spotType = t,
        this.angleAbove = e,
        this.angleBelow = i,
        this.angleLeft = n,
        this.angleRight = o,
        this.maskRatioAbove = s,
        this.maskRatioBelow = a,
        this.maskRatioLeft = l,
        this.maskRatioRight = h,
        this.visibleAngleAbove = r,
        this.visibleAngleBelow = d,
        this.visibleAngleLeft = c,
        this.visibleAngleRight = u,
        this.radiusAngle = g,
        this.lensCurve = p,
        this.limit = A,
        this.projectionType = m,
        this.spotInitYaw = E,
        this.spotInitPitch = I,
        this.spotRoll = -T,
        this.spotInitHorizontalFov = v,
        this.stitched = !1,
        this.overPI = !1,
        this.shading = !1,
        this.ERROR_LEVEL_LENGTH = .01
    }
    i.prototype.initialize = function() {
        ("wide" == this.GetSpotTypeToLowerCase() || "fisheye" == this.GetSpotTypeToLowerCase()) && (this.shading = this.IsShading(),
        this.stitched = this.IsStitched(),
        this.overPI = this.radiusAngle > 90 ? !0 : !1)
    }
    ,
    i.prototype.GetCustomCurveInverse = function(t) {
        if (0 == this.lensCurve.length)
            return t;
        if (0 == t)
            return 0;
        for (var e = 1, i = this.lensCurve.length; i > e; e++)
            if (e / 10 >= t) {
                var n = (t - .1 * (e - 1)) / .1 * (this.lensCurve[e] - this.lensCurve[e - 1]) + this.lensCurve[e - 1];
                return n
            }
        return -1
    }
    ,
    i.prototype.IsStitched = function() {
        return "round" == this.GetSpotTypeToLowerCase() ? !1 : this.radiusAngle <= 0 ? !0 : !this.shading && (this.angleLeft - this.radiusAngle > this.ERROR_LEVEL_LENGTH || -this.angleRight - this.radiusAngle > this.ERROR_LEVEL_LENGTH || -this.angleAbove - this.radiusAngle > this.ERROR_LEVEL_LENGTH || this.angleBelow - this.radiusAngle > this.ERROR_LEVEL_LENGTH) ? !0 : !1
    }
    ,
    i.prototype.IsShading = function() {
        return "round" == this.GetSpotTypeToLowerCase() ? !1 : "round" == this.spotType.toLowerCase() || 0 == this.maskRatioAbove && 0 == this.maskRatioBelow && 0 == this.maskRatioLeft && 0 == this.maskRatioRight ? !1 : !0
    }
    ,
    i.prototype.GetSpotTypeToLowerCase = function() {
        return String(this.spotType).toLowerCase()
    }
    ,
    t.Zenkei.Panorama != e && (t.Zenkei.Panorama.SpotMediaInfo = i)
}(window),
function(t, e) {
    function i(t, e, i, n, o, s) {
        this.Initialize(t, e, i, n, o, s)
    }
    i.prototype = {
        index: null,
        model: null,
        controller: null,
        imageDirectoryUrl: null,
        containerId: null,
        containerWidth: 0,
        containerHeight: 0,
        imageScale: 0,
        imageWidth: 0,
        imageHeight: 0,
        imageOriginalWidth: 0,
        imageOriginalHeight: 0,
        imageLeft: 0,
        imageTop: 0,
        imageCenterX: .5,
        imageCenterY: .5,
        minScale: 1,
        maxScale: 4,
        isImageDragging: !1,
        isImageDragBreaking: !1,
        touchStartX: 0,
        touchStartY: 0,
        imageDragBaseX: 0,
        imageDragBaseY: 0,
        lastImageDragDeltaX: 0,
        lastImageDragDeltaY: 0,
        imageDragBreakDeltaX: 0,
        imageDragBreakDeltaY: 0,
        imageDragBreakIntervalNumber: null,
        imageScaleDelta: 0,
        imageScaleIntervalNumber: null,
        lastPinchDistance: 0,
        annotationTouchStartX: 0,
        annotationTouchStartY: 0,
        annotationMouseDownX: 0,
        annotationMouseDownY: 0,
        isImageLoaded: !1,
        ignoreViewChangeEvent: !1,
        shouldShowAnnotation: !0,
        ELEMENT_ID_STANDARD_IMAGE: "standardImage",
        CLASS_NAME_ANNOTATION: "annotation",
        HTML_CODE_POPUP_ICON: '<div class="iconAnnotation viewportIcon3"><div></div></div>',
        HTML_CODE_EXTERNAL_LINK_ICON: '<div class="iconAnnotation viewportIcon5"><div></div></div>',
        HTML_CODE_ROUND_LENS_ICON: '<div class="iconAnnotation viewportIcon6"><div></div></div>',
        HTML_CODE_FISHEYE_LENS_ICON: '<div class="iconAnnotation viewportIcon7"><div></div></div>',
        HTML_CODE_STANDARD_LENS_ICON: '<div class="iconAnnotation viewportIcon8"><div></div></div>',
        panoramaDisplayId: "panoramaDisplay",
        containerId: "container",
        Initialize: function(t, e, i, n, o, s) {
            this.index = t,
            this.model = e,
            this.controller = i,
            this.imageDirectoryUrl = n,
            this.containerId = o + t,
            this.shouldShowAnnotation = s,
            this.StartLoadImage()
        },
        StartLoadImage: function() {
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale(),
            this.isImageLoaded = !1,
            this.annotationTouchStartX = 0,
            this.annotationTouchStartY = 0,
            this.annotationMouseDownX = 0,
            this.annotationMouseDownY = 0;
            var t = this.imageDirectoryUrl + "front.jpg";
            $("<img>").on("load", this.image_Load.bind(this)).attr("src", t)
        },
        StartLoadAnnotation: function() {
            var t = this.model.projectJson;
            if (null != t) {
                var e = new String(t.aa);
                if (null != e && 0 != e.length && e.lastIndexOf("/") != e.length - 1 && (e += "/"),
                0 == this.model.spotLensType) {
                    var i = this.model.spotJson;
                    if (null != i) {
                        var n = i.an;
                        if (null != n && 0 != n.length) {
                            for (var o = $(document.getElementById(this.containerId)), s = this.model.userAgent.isTouchDevice, a = n.length, l = 0; a > l; l++) {
                                var h = n[l]
                                  , r = h.aa
                                  , d = h.ab
                                  , c = "annotation" + this.index + "-" + l
                                  , u = null;
                                if (5 == r) {
                                    u = $("<div></div>").attr("id", c).css({
                                        position: "absolute",
                                        display: "none"
                                    }).appendTo(o);
                                    var g = "annotationImage" + this.index + "-" + l
                                      , p = e + i.ad + "/" + h.am;
                                    $("<img>").attr("id", g).on("load", {
                                        annotationIndex: l
                                    }, this.annotationImage_Load.bind(this)).appendTo(u).attr("src", p)
                                } else {
                                    var A = null;
                                    switch (d) {
                                    case 0:
                                        A = this.HTML_CODE_POPUP_ICON;
                                        break;
                                    case 1:
                                        A = this.HTML_CODE_EXTERNAL_LINK_ICON;
                                        break;
                                    case 2:
                                        switch (r) {
                                        case 2:
                                            A = this.HTML_CODE_STANDARD_LENS_ICON;
                                            break;
                                        case 3:
                                            A = this.HTML_CODE_FISHEYE_LENS_ICON;
                                            break;
                                        case 4:
                                            A = this.HTML_CODE_ROUND_LENS_ICON;
                                            break;
                                        default:
                                            A = this.HTML_CODE_ROUND_LENS_ICON
                                        }
                                        break;
                                    default:
                                        A = this.HTML_CODE_ROUND_LENS_ICON
                                    }
                                    u = $(A).attr("id", c).css({
                                        position: "absolute",
                                        display: "none"
                                    }).appendTo(o)
                                }
                                s ? (u.on("touchstart", {
                                    annotationIndex: l
                                }, this.annotation_TouchStart.bind(this)),
                                u.on("touchend", {
                                    annotationIndex: l
                                }, this.annotation_TouchEnd.bind(this))) : (u.on("mousedown", {
                                    annotationIndex: l
                                }, this.annotation_MouseDown.bind(this)),
                                u.on("mouseup", {
                                    annotationIndex: l
                                }, this.annotation_MouseUp.bind(this)))
                            }
                            this.UpdateAnnotationPosition(),
                            this.SetAnnotationVisibility(this.shouldShowAnnotation && !this.model.isHmdModeEnabled)
                        }
                    }
                }
            }
        },
        UpdateAnnotationPosition: function() {
            if (this.isImageLoaded) {
                var t = this.model.spotJson;
                if (null != t) {
                    var e = t.an;
                    if (null != e && 0 != e.length)
                        for (var i = e.length, n = 0; i > n; n++) {
                            var o = e[n]
                              , s = "annotation" + this.index + "-" + n
                              , a = $(document.getElementById(s))
                              , l = a.width()
                              , h = a.height()
                              , r = o.aa;
                            if (5 == r) {
                                if (0 == l || 0 == h)
                                    continue;
                                var d = "annotationImage" + this.index + "-" + n
                                  , c = $(document.getElementById(d))
                                  , u = o.ae
                                  , g = (1 - (u - 500) / 500) * this.imageScale
                                  , p = c.width()
                                  , A = c.height();
                                (0 == p || 0 == A) && (p = c[0].width,
                                A = c[0].height);
                                var m = p * g
                                  , E = A * g;
                                c.css({
                                    "transform-origin": "left top",
                                    "-webkit-transform-origin": "left top",
                                    transform: "scale(" + g + "," + g + ")",
                                    "-webkit-transform": "scale(" + g + "," + g + ")"
                                }),
                                a.css({
                                    width: m + "px",
                                    height: E + "px"
                                })
                            }
                            var I = o.ac
                              , T = o.ad
                              , v = .5 * this.imageHeight / this.imageWidth * Math.PI
                              , S = this.imageLeft + 2 * (this.imageWidth * (.25 * Math.PI - I) / Math.PI) - .5 * l
                              , f = this.imageTop + this.imageHeight * (.5 * v - T) / v - .5 * h;
                            a.css({
                                left: S + "px",
                                top: f + "px"
                            })
                        }
                }
            }
        },
        SetAnnotationVisibility: function(t) {
            if (this.isImageLoaded) {
                var e = this.model.spotJson;
                if (null != e) {
                    var i = e.an;
                    if (null != i && 0 != i.length)
                        for (var n = i.length, o = 0; n > o; o++) {
                            var s = "block";
                            t || 3 == i[o].ab || (s = "none");
                            var a = "annotation" + this.index + "-" + o;
                            if (t) {
                                var l = i[o].aa;
                                if (5 == l) {
                                    var h = "annotationImage" + this.index + "-" + o
                                      , r = $(document.getElementById(h));
                                    if (0 == r.length)
                                        continue;
                                    if (0 == r.width() || 0 == r.height())
                                        continue
                                }
                            }
                            $(document.getElementById(a)).css("display", s)
                        }
                }
            }
        },
        StopImageDrag: function() {
            this.isImageDragging = !1,
            this.imageDragBaseX = 0,
            this.imageDragBaseY = 0,
            this.lastImageDragDeltaX = 0,
            this.lastImageDragDeltaY = 0
        },
        StartImageDrag: function(t, e) {
            this.isImageDragging || (this.isImageDragging = !0,
            this.imageDragBaseX = t,
            this.imageDragBaseY = e)
        },
        StopImageDragBreak: function() {
            null != this.imageDragBreakIntervalNumber && (clearInterval(this.imageDragBreakIntervalNumber),
            this.imageDragBreakIntervalNumber = null),
            this.isImageDragBreaking = !1,
            this.imageDragBreakDeltaX = 0,
            this.imageDragBreakDeltaY = 0
        },
        StartImageDragBreak: function(t, e) {
            this.isImageDragBreaking || (Math.abs(t) < 5 && (t = 0),
            Math.abs(e) < 5 && (e = 0),
            (0 != t || 0 != e) && (this.isImageDragBreaking = !0,
            this.imageDragBreakDeltaX = t,
            this.imageDragBreakDeltaY = e,
            this.imageDragBreakIntervalNumber = setInterval(this.ImageDragBreakInterval.bind(this), 25)))
        },
        ImageDragBreakInterval: function() {
            if (0 != this.imageDragBreakDeltaX)
                if (this.imageDragBreakDeltaX = this.imageDragBreakDeltaX / 1.4,
                Math.abs(this.imageDragBreakDeltaX) < .1)
                    this.imageDragBreakDeltaX = 0;
                else {
                    var t = this.imageLeft - this.imageDragBreakDeltaX
                      , e = (.5 * this.containerWidth - t) / this.imageWidth;
                    this.SetImageCenterX(e)
                }
            if (0 != this.imageDragBreakDeltaY)
                if (this.imageDragBreakDeltaY = this.imageDragBreakDeltaY / 1.4,
                Math.abs(this.imageDragBreakDeltaY) < .1)
                    this.imageDragBreakDeltaY = 0;
                else {
                    var i = this.imageTop - this.imageDragBreakDeltaY
                      , n = (.5 * this.containerHeight - i) / this.imageHeight;
                    this.SetImageCenterY(n)
                }
            this.FireYawAndPitchChangeEvent(),
            0 == this.imageDragBreakDeltaX && 0 == this.imageDragBreakDeltaY && this.StopImageDragBreak()
        },
        StopImageScale: function() {
            null != this.imageScaleIntervalNumber && (clearInterval(this.imageScaleIntervalNumber),
            this.imageScaleIntervalNumber = null),
            this.imageScaleDelta = 0
        },
        StartImageScale: function(t) {
            null != t && 0 != t && (this.imageScaleDelta = t,
            this.imageScaleIntervalNumber = setInterval(this.ImageScaleInterval.bind(this), 25))
        },
        ImageScaleInterval: function() {
            if (null == this.imageScaleDelta || 0 == this.imageScaleDelta)
                return this.StopImageScale(),
                void 0;
            if (this.imageScaleDelta = this.imageScaleDelta / 1.4,
            Math.abs(this.imageScaleDelta) < .001)
                return this.StopImageScale(),
                void 0;
            var t = this.imageScale + this.imageScaleDelta;
            this.SetImageScale(t),
            this.SetImageCenterX(this.imageCenterX),
            this.SetImageCenterY(this.imageCenterY),
            this.FireHorizontalFovEvent(),
            this.FireYawAndPitchChangeEvent()
        },
        UpdateMinImageScale: function() {
            var t = this.containerWidth / this.imageOriginalWidth
              , e = this.containerHeight / this.imageOriginalHeight;
            this.minScale = t > e ? e : t,
            this.minScale > 1 && (this.minScale = 1);
            var i = this.imageOriginalWidth * this.minScale
              , n = 90 * (1 + (this.containerWidth - i) / i);
            this.controller.SetMaxHorizontalFov(n)
        },
        SetImageVisibility: function(t) {
            var e = "inline";
            t || (e = "none"),
            $(document.getElementById(this.ELEMENT_ID_STANDARD_IMAGE + this.index)).css("display", e)
        },
        SetImageScale: function(t) {
            t < this.minScale && (t = this.minScale),
            t > this.maxScale && (t = this.maxScale),
            this.imageScale = t,
            this.imageWidth = this.imageOriginalWidth * t,
            this.imageHeight = this.imageOriginalHeight * t,
            $(document.getElementById(this.ELEMENT_ID_STANDARD_IMAGE + this.index)).css({
                width: this.imageWidth + "px",
                height: this.imageHeight + "px"
            });
            var e = 0
              , i = 0;
            this.imageWidth > this.containerWidth && (i = 45 - 90 * (.5 * this.containerWidth / this.imageWidth),
            e = -i);
            var n = 0
              , o = 0;
            if (this.imageHeight > this.containerHeight) {
                var s = 90 * this.imageHeight / this.imageWidth;
                o = .5 * s - .5 * this.containerHeight / this.imageHeight * s,
                n = -o
            }
            this.controller.SetMinYaw(e),
            this.controller.SetMaxYaw(i),
            this.controller.SetMinPitch(n),
            this.controller.SetMaxPitch(o),
            this.UpdateAnnotationPosition()
        },
        SetImageCenterX: function(t) {
            var e = .5 * this.containerWidth - t * this.imageWidth;
            if (this.imageWidth < this.containerWidth)
                t = .5,
                e = .5 * this.containerWidth - t * this.imageWidth;
            else if (e > 0)
                e = 0,
                t = (this.containerWidth / 2 - e) / this.imageWidth;
            else {
                var i = this.containerWidth - this.imageWidth;
                i > e && (e = i,
                t = (this.containerWidth / 2 - e) / this.imageWidth)
            }
            this.imageLeft = e,
            this.imageCenterX = t,
            $(document.getElementById(this.ELEMENT_ID_STANDARD_IMAGE + this.index)).css("left", e + "px"),
            this.UpdateAnnotationPosition()
        },
        SetImageCenterY: function(t) {
            var e = .5 * this.containerHeight - t * this.imageHeight;
            if (this.imageHeight < this.containerHeight)
                t = .5,
                e = .5 * this.containerHeight - t * this.imageHeight;
            else if (e > 0)
                e = 0,
                t = (this.containerHeight / 2 - e) / this.imageHeight;
            else {
                var i = this.containerHeight - this.imageHeight;
                i > e && (e = i,
                t = (this.containerHeight / 2 - e) / this.imageHeight)
            }
            this.imageTop = e,
            this.imageCenterY = t,
            $(document.getElementById(this.ELEMENT_ID_STANDARD_IMAGE + this.index)).css("top", e + "px"),
            this.UpdateAnnotationPosition()
        },
        PreventDefaultEventBehavior: function(t) {
            null != t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        GetPinchDistance: function(t, e) {
            if (null == t || null == e)
                return 0;
            var i = t.pageX
              , n = t.pageY
              , o = e.pageX
              , s = e.pageY
              , a = Math.sqrt(Math.pow(i - o, 2) + Math.pow(n - s, 2));
            return a
        },
        SetView: function(t, e, i) {
            if (this.UpdateAnnotationPosition(),
            !this.ignoreViewChangeEvent) {
                t > 180 && (t -= 360);
                var n = 90 * this.containerWidth / i / this.imageOriginalWidth;
                isNaN(n) && (n = this.minScale),
                this.SetImageScale(n);
                var o = (.5 * this.imageWidth + this.imageWidth / 90 * t) / this.imageWidth
                  , s = 90 * this.imageHeight / this.imageWidth
                  , a = (.5 * this.imageHeight + this.imageHeight / s * e) / this.imageHeight;
                this.SetImageCenterX(o),
                this.SetImageCenterY(a),
                this.SetImageVisibility(!0)
            }
        },
        GetYaw: function() {
            var t = 90 * -(.5 - this.imageCenterX);
            return t
        },
        GetPitch: function() {
            var t = 90 * this.imageHeight / this.imageWidth
              , e = -(.5 - this.imageCenterY) * t;
            return e
        },
        GetHorizontalFov: function() {
            var t = 90 * (this.containerWidth / this.imageWidth);
            return t
        },
        FireYawAndPitchChangeEvent: function() {
            this.ignoreViewChangeEvent = !0,
            this.controller.SetYawAndPitch(this.GetYaw(), this.GetPitch()),
            this.ignoreViewChangeEvent = !1
        },
        FireHorizontalFovEvent: function() {
            this.ignoreViewChangeEvent = !0,
            this.controller.SetHorizontalFov(this.GetHorizontalFov()),
            this.ignoreViewChangeEvent = !1
        },
        UpdateSize: function() {
            var t = $(document.getElementById(this.containerId));
            this.containerWidth = t.width(),
            this.containerHeight = t.height(),
            (0 == this.containerWidth || 0 == this.containerHeight) && (this.containerWidth = t[0].width,
            this.containerHeight = t[0].height),
            this.UpdateMinImageScale(),
            this.SetImageScale(this.imageScale),
            this.SetImageCenterX(this.imageCenterX),
            this.SetImageCenterY(this.imageCenterY)
        },
        image_Load: function(t) {
            var e = $(t.currentTarget)
              , i = $(document.getElementById(this.containerId));
            this.imageOriginalWidth = e.width(),
            this.imageOriginalHeight = e.height(),
            (0 == this.imageOriginalWidth || 0 == this.imageOriginalHeight) && (this.imageOriginalWidth = e[0].width,
            this.imageOriginalHeight = e[0].height),
            this.containerWidth = i.width(),
            this.containerHeight = i.height(),
            (0 == this.containerWidth || 0 == this.containerHeight) && (this.containerWidth = i[0].width,
            this.containerHeight = i[0].height),
            e.attr("id", this.ELEMENT_ID_STANDARD_IMAGE + this.index).css({
                position: "absolute",
                display: "none"
            }).appendTo(i),
            this.UpdateMinImageScale();
            var n = this.model.spotJson
              , o = 0
              , s = 0
              , a = this.model.maxHorizontalFov;
            this.model.isHmdModeEnabled || (o = 180 * n.ai / Math.PI,
            s = 180 * -n.aj / Math.PI,
            a = 180 * n.ak / Math.PI,
            90 == a && (a = this.model.maxHorizontalFov));
            var l = 90 * this.containerWidth / a / this.imageOriginalWidth;
            isNaN(l) && (l = this.minScale),
            this.SetImageScale(l);
            var h = (.5 * this.imageWidth - this.imageWidth / 90 * o) / this.imageWidth
              , r = (.5 * this.imageHeight - this.imageHeight / 90 * s) / this.imageHeight;
            this.SetImageCenterX(h),
            this.SetImageCenterY(r),
            this.SetImageVisibility(!0),
            this.FireHorizontalFovEvent(),
            this.FireYawAndPitchChangeEvent(),
            this.model.userAgent.isTouchDevice ? (i.on("touchstart", $.proxy(this.container_TouchStart, this)),
            i.on("touchmove", $.proxy(this.container_TouchMove, this)),
            i.on("touchend", $.proxy(this.container_TouchEnd, this))) : (i.on("mousedown", $.proxy(this.container_MouseDown, this)),
            i.on("mousemove", $.proxy(this.container_MouseMove, this)),
            i.on("mouseup", $.proxy(this.container_MouseUp, this)),
            i.on("mousewheel", $.proxy(this.container_MouseWheel, this))),
            this.isImageLoaded = !0,
            this.controller.FireSpotImageLoadCompletedEvent(this.index),
            this.StartLoadAnnotation()
        },
        container_TouchStart: function(t) {
            this.controller.StopAutoPan(),
            this.controller.StopSlideshow();
            var e = t.originalEvent
              , i = e.touches.length;
            if (1 == i) {
                this.StopImageDrag(),
                this.StopImageDragBreak(),
                this.StopImageScale();
                var n = e.touches[0]
                  , o = n.pageX
                  , s = n.pageY;
                if (this.touchStartX = o,
                this.touchStartY = s,
                this.controller.hasAccessLogId) {
                    var a = [{
                        x: o,
                        y: s
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START, a)
                }
                this.StartImageDrag(o, s)
            } else if (2 == i) {
                var l = e.touches[0]
                  , h = e.touches[1];
                if (this.controller.hasAccessLogId) {
                    var a = [{
                        x: l.pageX,
                        y: l.pageY
                    }, {
                        x: h.pageX,
                        y: h.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START, a)
                }
                var r = this.GetPinchDistance(l, h);
                this.lastPinchDistance = r
            }
            this.PreventDefaultEventBehavior(e)
        },
        container_TouchMove: function(t) {
            var e = t.originalEvent
              , i = e.touches.length;
            if (1 == i) {
                if (this.isImageDragging) {
                    var e = t.originalEvent
                      , n = e.touches[0]
                      , o = n.pageX
                      , s = n.pageY;
                    if (this.controller.hasAccessLogId) {
                        var a = [{
                            x: o,
                            y: s
                        }];
                        this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE, a)
                    }
                    var l = this.imageDragBaseX - o
                      , h = this.imageDragBaseY - s
                      , r = this.imageLeft - l
                      , d = this.imageTop - h
                      , c = (.5 * this.containerWidth - r) / this.imageWidth
                      , u = (.5 * this.containerHeight - d) / this.imageHeight;
                    this.SetImageCenterX(c),
                    this.SetImageCenterY(u),
                    this.lastImageDragDeltaX = l,
                    this.lastImageDragDeltaY = h,
                    this.imageDragBaseX = o,
                    this.imageDragBaseY = s,
                    this.FireYawAndPitchChangeEvent()
                }
            } else if (2 == i) {
                var g = e.touches[0]
                  , p = e.touches[1];
                if (this.controller.hasAccessLogId) {
                    var a = [{
                        x: g.pageX,
                        y: g.pageY
                    }, {
                        x: p.pageX,
                        y: p.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START, a)
                }
                var A = this.GetPinchDistance(g, p)
                  , m = this.lastPinchDistance - A
                  , E = this.imageWidth - 2 * m
                  , I = E / this.imageOriginalWidth;
                this.SetImageScale(I),
                this.SetImageCenterX(this.imageCenterX),
                this.SetImageCenterY(this.imageCenterY),
                this.lastPinchDistance = A,
                this.FireHorizontalFovEvent(),
                this.FireYawAndPitchChangeEvent()
            }
            this.PreventDefaultEventBehavior(e)
        },
        container_TouchEnd: function(t) {
            var e = t.originalEvent;
            if (this.controller.hasAccessLogId) {
                var i = e.changedTouches;
                if (1 === i.length) {
                    var n = i[0]
                      , o = [{
                        x: n.pageX,
                        y: n.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_END, o)
                } else if (2 === i.length) {
                    var n = i[0]
                      , s = i[1]
                      , o = [{
                        x: n.pageX,
                        y: n.pageY
                    }, {
                        x: s.pageX,
                        y: s.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PANORAMA, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_END, o)
                }
            }
            this.isImageDragging && this.StartImageDragBreak(1.4 * this.lastImageDragDeltaX, 1.4 * this.lastImageDragDeltaY),
            this.StopImageDrag(),
            this.PreventDefaultEventBehavior(e)
        },
        container_MouseDown: function(t) {
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale(),
            this.controller.StopAutoPan(),
            this.controller.StopSlideshow();
            var e = t.originalEvent;
            this.PreventDefaultEventBehavior(e),
            this.StartImageDrag(e.clientX, e.clientY)
        },
        container_MouseMove: function(t) {
            if (this.isImageDragging) {
                var e = t.originalEvent;
                this.PreventDefaultEventBehavior(e);
                var i = e.clientX
                  , n = e.clientY
                  , o = this.imageDragBaseX - i
                  , s = this.imageDragBaseY - n
                  , a = this.imageLeft - o
                  , l = this.imageTop - s
                  , h = (.5 * this.containerWidth - a) / this.imageWidth
                  , r = (.5 * this.containerHeight - l) / this.imageHeight;
                this.SetImageCenterX(h),
                this.SetImageCenterY(r),
                this.lastImageDragDeltaX = o,
                this.lastImageDragDeltaY = s,
                this.imageDragBaseX = i,
                this.imageDragBaseY = n,
                this.ignoreViewChangeEvent = !0,
                this.controller.SetYawAndPitch(this.GetYaw(), this.GetPitch()),
                this.ignoreViewChangeEvent = !1
            }
        },
        container_MouseUp: function(t) {
            var e = t.originalEvent;
            this.PreventDefaultEventBehavior(e),
            this.isImageDragging && this.StartImageDragBreak(1.4 * this.lastImageDragDeltaX, 1.4 * this.lastImageDragDeltaY),
            this.StopImageDrag()
        },
        container_MouseWheel: function(t) {
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale();
            var e = t.originalEvent
              , i = 0
              , n = e.wheelDelta;
            if (null != n && 0 != n)
                i = n;
            else {
                var o = e.detail;
                null != o && 0 != o && (i = o)
            }
            i = .001 * i * this.imageScale,
            this.StartImageScale(i)
        },
        annotationImage_Load: function(t) {
            var e = t.data.annotationIndex
              , i = this.model.spotJson;
            if (null != i) {
                var n = i.an;
                if (!(null == n || e >= n.length)) {
                    var o = "annotationImage" + this.index + "-" + e
                      , s = $(document.getElementById(o))
                      , a = s.width()
                      , l = s.height();
                    (0 == a || 0 == l) && (a = s[0].width,
                    l = s[0].height);
                    var h = n[e]
                      , r = "annotation" + this.index + "-" + e
                      , d = h.ac
                      , c = h.ad
                      , u = h.ae
                      , g = (1 - (u - 500) / 500) * this.imageScale
                      , p = a * g
                      , A = l * g
                      , m = .5 * this.imageHeight / this.imageWidth * Math.PI
                      , E = this.imageLeft + 2 * (this.imageWidth * (.25 * Math.PI - d) / Math.PI) - .5 * p
                      , I = this.imageTop + this.imageHeight * (.5 * m - c) / m - .5 * A;
                    s.css({
                        "transform-origin": "left top",
                        "-webkit-transform-origin": "left top",
                        transform: "scale(" + g + "," + g + ")",
                        "-webkit-transform": "scale(" + g + "," + g + ")",
                        width: a + "px",
                        height: l + "px"
                    });
                    var T = $(document.getElementById(r)).css({
                        left: E + "px",
                        top: I + "px",
                        width: p + "px",
                        height: A + "px",
                        display: "block"
                    });
                    3 != h.ab && T.css("cursor", "pointer")
                }
            }
        },
        annotation_TouchStart: function(t) {
            var e = t.originalEvent
              , i = e.touches[0];
            this.annotationTouchStartX = i.pageX,
            this.annotationTouchStartY = i.pageY
        },
        annotation_TouchEnd: function(t) {
            var e = t.originalEvent
              , i = e.changedTouches[0]
              , n = i.pageX
              , o = i.pageY;
            if (Math.abs(this.annotationTouchStartX - n) < 10 && Math.abs(this.annotationTouchStartY - o) < 10) {
                if (this.controller.hasAccessLogId) {
                    var s = {
                        x: n,
                        y: o
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_ANNOTATION, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, s)
                }
                this.controller.ExecuteAnnotation(t.data.annotationIndex)
            }
        },
        annotation_MouseDown: function(t) {
            var e = t.originalEvent;
            this.annotationMouseDownX = e.clientX,
            this.annotationMouseDownY = e.clientY
        },
        annotation_MouseUp: function(t) {
            var e = t.originalEvent
              , i = e.clientX
              , n = e.clientY;
            this.annotationMouseDownX == i && this.annotationMouseDownY == n && this.controller.ExecuteAnnotation(t.data.annotationIndex)
        },
        annotation_Click: function(t) {
            this.controller.ExecuteAnnotation(t.data.annotationIndex)
        }
    },
    t.Zenkei.Panorama != e && (t.Zenkei.Panorama.StandardImage = i)
}(window),
function(t, e) {
    function i(t) {
        this.RAD_TO_DEG = 57.295779,
        this.DEG_TO_RAD = .01745329,
        this.ERROR_LEVEL_LENGTH = .01,
        this.MAX_HORIZONTAL_FOV = 130,
        this.MIN_HORIZONTAL_FOV = 10,
        this.VERTICAL_SHRINK_LENGTH = .2,
        this.spotMediaInfo = t,
        this.isFullPanorama = !1,
        this.UpdateIsFullPanorama(),
        this.spotMediaInfo != e && null != this.spotMediaInfo,
        this.halfWidth = 200,
        this.halfHeight = 150,
        this.yaw = 0,
        this.pitch = 0,
        this.roll = 0,
        this._perspective = 300,
        this._perspectiveMin = 0,
        this.perspectiveMin = this.spotMediaInfo.perspective,
        this.perspectiveMax = 700,
        this.halfHFov = Math.atan(this.halfWidth / this.spotMediaInfo.perspective) * this.RAD_TO_DEG,
        this.halfVFov = Math.atan(this.halfHeight / this.spotMediaInfo.perspective) * this.RAD_TO_DEG,
        this.allowLeft = !1,
        this.allowRight = !1,
        this.allowTop = !1,
        this.allowBottom = !1,
        this.lastYaw = this.yaw,
        this.lastPitch = this.pitch,
        this.yawTemp = this.yaw,
        this.pitchTemp = this.pitch,
        this.initScreenSize = !1,
        this.horizontalFovMax = this.DEFAULT_H_FOV,
        this.horizontalFovMin = 20,
        this.DEFAULT_H_FOV = 90,
        this.imageNaturalWidth = 0,
        this.imageNaturalHeight = 0,
        this.imageAspectRatio = 0,
        this.imageWidth = 0,
        this.imageHeight = 0,
        this.left = 0,
        this.top = 0,
        this.leftMin = 0,
        this.topMin = 0,
        this.Fullscreen = !1
    }
    i.prototype = {
        get perspective() {
            return this._perspective
        },
        set perspective(t) {
            this._perspective = t
        },
        get perspectiveMin() {
            return this._perspectiveMin
        },
        set perspectiveMin(t) {
            this._perspectiveMin = t
        }
    },
    i.prototype.initialize = function() {
        null != this.spotMediaInfo && (this.spotMediaInfo.initialize(),
        this.roll = this.spotMediaInfo.spotRoll,
        "standard" == this.GetSpotTypeToLowerCase() ? this.SetHorizontalFovStd(this.spotMediaInfo.spotInitHorizontalFov) : this.SetHorizontalFov(this.spotMediaInfo.spotInitHorizontalFov),
        this.SetPov(-this.spotMediaInfo.spotInitYaw, this.spotMediaInfo.spotInitPitch),
        this.lastYaw = this.yaw,
        this.lastPitch = this.pitch)
    }
    ,
    i.prototype.SetStandardImage = function(t, e, i, n) {}
    ,
    i.prototype.SetHorizontalFovStd = function(t) {
        return t > this.horizontalFovMax && (t = this.horizontalFovMax),
        t < this.horizontalFovMin && (t = this.horizontalFovMin),
        this.halfHFov = .5 * t,
        this.halfVFov = this.halfHFov * this.halfHeight / this.halfWidth,
        this.imageWidth = Math.floor(this.DEFAULT_H_FOV * this.halfWidth / this.halfHFov + .5),
        this.imageHeight = Math.floor(this.imageWidth * this.imageAspectRatio + .5),
        this.leftMin = 2 * this.halfWidth - this.imageWidth,
        this.topMin = 2 * this.halfHeight - this.imageHeight,
        this.SetPovStd(this.yaw, this.pitch),
        [this.imageWidth, this.imageHeight]
    }
    ,
    i.prototype.updateStandardImageSizeStd = function() {
        this.imageNaturalWidth * this.halfHeight >= this.halfWidth * this.imageNaturalHeight ? (this.imageWidth = 2 * this.halfWidth,
        this.imageHeight = Math.floor(this.imageNaturalHeight * 2 * this.halfWidth / this.imageNaturalWidth)) : (this.imageWidth = Math.floor(this.imageNaturalWidth * 2 * this.halfHeight / this.imageNaturalHeight),
        this.imageHeight = 2 * this.halfHeight),
        this.horizontalFovMax = this.DEFAULT_H_FOV * 2 * this.halfWidth / this.imageWidth
    }
    ,
    i.prototype.SetSize = function(t, e) {
        var i = 2 * Math.atan(this.halfWidth / this.perspective) * this.RAD_TO_DEG;
        this.initScreenSize && "standard" == this.GetSpotTypeToLowerCase() && (this.imageNaturalWidth * e >= t * this.imageNaturalHeight ? (this.imageWidth = 2 * this.halfWidth,
        this.imageHeight = Math.floor(this.imageNaturalHeight * this.imageWidth / this.imageNaturalWidth)) : (this.imageWidth = Math.floor(this.imageNaturalWidth * e / this.imageNaturalHeight),
        this.imageHeight = e),
        this.horizontalFovMax = this.DEFAULT_H_FOV * 2 * this.halfWidth / this.imageWidth),
        this.initScreenSize = !0,
        this.halfWidth = .5 * t,
        this.halfHeight = .5 * e,
        this.UpdatePerspectiveLimit();
        var n = this.SetHorizontalFov(i)
          , o = this.SetPov(this.yaw, this.pitch);
        return [o[0], o[1], n]
    }
    ,
    i.prototype.SetSpotMediaInfo = function(t) {
        this.spotMediaInfo = null,
        this.spotMediaInfo = t,
        this.UpdateIsFullPanorama(),
        this.spotMediaInfo.initialize(),
        this.roll = this.spotMediaInfo.spotRoll,
        this.UpdatePerspectiveLimit(),
        this.SetPerspective(this.perspective),
        this.SetPov(-this.spotMediaInfo.spotInitYaw, this.spotMediaInfo.spotInitPitch),
        this.lastYaw = this.yaw,
        this.lastPitch = this.pitch,
        this.initialize()
    }
    ,
    i.prototype.UpdatePerspectiveLimit = function() {
        this.perspectiveMin = this.GetPerspectiveMin(),
        this.perspectiveMax = this.halfWidth / Math.tan(Math.PI / 12),
        1 / 0 == this.perspectiveMax && (this.perspectiveMax = 2e3),
        this.perspectiveMax > 2e3 && (this.perspectiveMax = 2e3),
        this.perspectiveMax < this.perspectiveMin && (this.perspectiveMax = this.perspectiveMin)
    }
    ,
    i.prototype.GetSpotTypeToLowerCase = function() {
        return null != this.spotMediaInfo && this.spotMediaInfo.spotType ? this.spotMediaInfo.GetSpotTypeToLowerCase() : ""
    }
    ,
    i.prototype.GetUnitSpeedRatio = function() {
        var t;
        return t = "standard" == this.GetSpotTypeToLowerCase() ? this.imageNaturalWidth * this.halfHeight >= this.halfWidth * this.imageNaturalHeight ? this.halfHFov / this.halfWidth : this.halfVFov / this.halfHeight : this.halfHFov / this.halfWidth,
        .6 * t
    }
    ,
    i.prototype.GetPerspectiveMin = function() {
        var t, e;
        return "round" == this.GetSpotTypeToLowerCase() ? (e = this.halfHeight / Math.tan(.5 * (this.spotMediaInfo.angleBelow - this.spotMediaInfo.angleAbove - 2 * this.VERTICAL_SHRINK_LENGTH) * this.DEG_TO_RAD),
        t = e,
        e = this.halfWidth / Math.tan(.5 * this.MAX_HORIZONTAL_FOV * this.DEG_TO_RAD),
        e = t > e ? t : e) : (e = this.GetPerspectiveMinFisheye(),
        t = e,
        this.spotMediaInfo.shading && (e = this.GetPerspectiveMinShading(),
        e = e > t ? t : e,
        t = e),
        e = this.halfWidth / Math.tan(.5 * this.MAX_HORIZONTAL_FOV * this.DEG_TO_RAD),
        e = t > e ? t : e)
    }
    ,
    i.prototype.GetPerspectiveMinFisheye = function() {
        var t = this.spotMediaInfo.angleBelow - this.spotMediaInfo.angleAbove;
        if (this.spotMediaInfo) {
            var e = this.spotMediaInfo.angleAbove;
            this.spotMediaInfo.visibleAngleAbove < 0 && this.spotMediaInfo.angleAbove < this.spotMediaInfo.visibleAngleAbove && (e = this.spotMediaInfo.visibleAngleAbove);
            var i = this.spotMediaInfo.angleBelow;
            this.spotMediaInfo.visibleAngleBelow > 0 && this.spotMediaInfo.angleBelow > this.spotMediaInfo.visibleAngleBelow && (i = this.spotMediaInfo.visibleAngleBelow),
            t = i - e
        }
        var n = this.spotMediaInfo.angleLeft - this.spotMediaInfo.angleRight;
        if (this.spotMediaInfo) {
            var o = this.spotMediaInfo.angleLeft;
            this.spotMediaInfo.visibleAngleLeft > 0 && this.spotMediaInfo.angleLeft > this.spotMediaInfo.visibleAngleLeft && (o = this.spotMediaInfo.visibleAngleLeft);
            var s = this.spotMediaInfo.angleRight;
            this.spotMediaInfo.visibleAngleRight < 0 && this.spotMediaInfo.angleRight < this.spotMediaInfo.visibleAngleRight && (s = this.spotMediaInfo.visibleAngleRight),
            n = o - s
        }
        n = n > this.MAX_HORIZONTAL_FOV ? this.MAX_HORIZONTAL_FOV : n,
        t = t > this.MAX_HORIZONTAL_FOV ? this.MAX_HORIZONTAL_FOV : t;
        var a = 0
          , l = 0
          , h = this.halfHeight / Math.tan(.5 * t * this.DEG_TO_RAD);
        this.halfHFov = Math.atan(this.halfWidth / h) * this.RAD_TO_DEG,
        this.halfVFov = Math.atan(this.halfHeight / h) * this.RAD_TO_DEG;
        var r = this.isFrameViewInside(a, l)
          , d = this.halfWidth / Math.tan(.5 * n * this.DEG_TO_RAD);
        this.halfHFov = Math.atan(this.halfWidth / d) * this.RAD_TO_DEG,
        this.halfVFov = Math.atan(this.halfHeight / d) * this.RAD_TO_DEG;
        var c, u, g = this.isFrameViewInside(a, l);
        r && g ? (c = Math.min(h, d),
        u = Math.min(h, d)) : r || g ? r && !g ? (c = h,
        u = d) : (c = d,
        u = h) : (c = Math.max(h, d),
        u = Math.min(h, d));
        for (var p, A, m = c - u; m > this.ERROR_LEVEL_LENGTH; )
            A = .5 * (c + u),
            this.halfHFov = Math.atan(this.halfWidth / A) * this.RAD_TO_DEG,
            this.halfVFov = Math.atan(this.halfHeight / A) * this.RAD_TO_DEG,
            p = this.isFrameViewInside(a, l),
            p ? c = A : u = A,
            m = c - u;
        return c
    }
    ,
    i.prototype.GetPerspectiveMinShading = function() {
        var t = this.spotMediaInfo.angleAbove;
        this.spotMediaInfo.maskRatioAbove > 0 && (t = -(this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioAbove)));
        var e = this.spotMediaInfo.angleBelow;
        this.spotMediaInfo.maskRatioBelow > 0 && (e = this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioBelow));
        var i = e - t
          , n = this.spotMediaInfo.angleLeft;
        this.spotMediaInfo.maskRatioLeft > 0 && (n = this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioLeft));
        var o = this.spotMediaInfo.angleRight;
        this.spotMediaInfo.maskRatioRight > 0 && (o = -(this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioRight)));
        var s = n - o;
        s = s > this.MAX_HORIZONTAL_FOV ? this.MAX_HORIZONTAL_FOV : s,
        i = i > this.MAX_HORIZONTAL_FOV ? this.MAX_HORIZONTAL_FOV : i;
        var a = 0
          , l = 0
          , h = this.halfHeight / Math.tan(.5 * i * this.DEG_TO_RAD);
        this.halfHFov = Math.atan(this.halfWidth / h) * this.RAD_TO_DEG,
        this.halfVFov = Math.atan(this.halfHeight / h) * this.RAD_TO_DEG;
        var r = this.isFrameViewInside(a, l)
          , d = this.halfWidth / Math.tan(.5 * s * this.DEG_TO_RAD);
        this.halfHFov = Math.atan(this.halfWidth / d) * this.RAD_TO_DEG,
        this.halfVFov = Math.atan(this.halfHeight / d) * this.RAD_TO_DEG;
        var c, u, g = this.isFrameViewInside(a, l);
        r && g ? (c = Math.min(h, d),
        u = .25 * Math.min(h, d)) : r || g ? r && !g ? (c = h,
        u = d) : (c = d,
        u = h) : (c = 4 * Math.max(h, d),
        u = Math.min(h, d));
        for (var p, A, m = c - u; m > this.ERROR_LEVEL_LENGTH; )
            A = .5 * (c + u),
            this.halfHFov = Math.atan(this.halfWidth / A) * this.RAD_TO_DEG,
            this.halfVFov = Math.atan(this.halfHeight / A) * this.RAD_TO_DEG,
            p = this.isFrameViewInside(a, l),
            p ? c = A : u = A,
            m = c - u;
        return c
    }
    ,
    i.prototype.GetPerspectiveFromHorizontalFov = function(t) {
        return this.halfWidth / Math.tan(.5 * t),
        this.halfWidth / Math.tan(.5 * t)
    }
    ,
    i.prototype.SetHorizontalFov = function(t) {
        if ("standard" == this.GetSpotTypeToLowerCase())
            return this.SetHorizontalFovStd(t);
        var e = this.GetPerspectiveFromHorizontalFov(t * this.DEG_TO_RAD);
        return this.SetPerspective(e)
    }
    ,
    i.prototype.SetPerspective = function(t) {
        var e = this.perspective;
        return t < this.perspectiveMin && (t = this.perspectiveMin),
        t > this.perspectiveMax && (t = this.perspectiveMax),
        this.perspective = t,
        this.halfHFov = Math.atan(this.halfWidth / this.perspective) * this.RAD_TO_DEG,
        this.halfVFov = Math.atan(this.halfHeight / this.perspective) * this.RAD_TO_DEG,
        e > this.perspective && this.SetPov(this.yaw, this.pitch),
        this.perspective
    }
    ,
    i.prototype.SetHorizontalFov2 = function(t) {
        if ("standard" == this.GetSpotTypeToLowerCase())
            return this.SetHorizontalFovStd(t);
        var e = this.GetPerspectiveFromHorizontalFov(t * this.DEG_TO_RAD);
        return this.SetPerspective2(this.yaw, this.pitch, e)
    }
    ,
    i.prototype.SetPerspective2 = function(t, e, i) {
        var n = this.perspective;
        i < this.perspectiveMin && (i = this.perspectiveMin),
        i > this.perspectiveMax && (i = this.perspectiveMax),
        this.perspective = i,
        this.halfHFov = Math.atan(this.halfWidth / this.perspective) * this.RAD_TO_DEG,
        this.halfVFov = Math.atan(this.halfHeight / this.perspective) * this.RAD_TO_DEG;
        var o = [t, e];
        return n > this.perspective && (o = this.SetPov(t, e)),
        [o[0], o[1], this.perspective]
    }
    ,
    i.prototype.SetPovStd = function(t, e) {
        return
    }
    ,
    i.prototype.SetPov = function(e, i) {
        if (isNaN(e) || isNaN(i))
            return [e, i];
        if ("standard" == this.GetSpotTypeToLowerCase())
            return this.SetPovStd(e, i),
            [e, i];
        this.lastYaw = this.yaw,
        this.lastPitch = this.pitch,
        -180 > e && (e += 360),
        e >= 180 && (e -= 360),
        -90 > i && (i = -90),
        i > 90 && (i = 90);
        var n = 1e-5;
        n > i && i > -n && (i = 0),
        n > e && e > -n && (e = 0);
        var o = t.mainPlayerModel.isGyroModeEnabled;
        if ("round" == this.GetSpotTypeToLowerCase())
            return this.isFullPanorama ? i > 90 ? i = 90 : -90 > i && (i = -90) : o || (i > -this.spotMediaInfo.angleAbove - this.halfVFov - this.VERTICAL_SHRINK_LENGTH && (i = -this.spotMediaInfo.angleAbove - this.halfVFov - this.VERTICAL_SHRINK_LENGTH),
            i < -this.spotMediaInfo.angleBelow + this.halfVFov + this.VERTICAL_SHRINK_LENGTH && (i = -this.spotMediaInfo.angleBelow + this.halfVFov + this.VERTICAL_SHRINK_LENGTH)),
            e = 1e-4 * Math.round(1e4 * e),
            i = 1e-4 * Math.round(1e4 * i),
            this.yaw = e,
            this.pitch = i,
            [this.yaw, this.pitch];
        if (!o) {
            if (this.spotMediaInfo.stitched) {
                var s = e
                  , a = i;
                s < -this.spotMediaInfo.angleLeft + this.halfHFov && (s = -this.spotMediaInfo.angleLeft + this.halfHFov),
                s > -this.spotMediaInfo.angleRight - this.halfHFov && (s = -this.spotMediaInfo.angleRight - this.halfHFov),
                a > -this.spotMediaInfo.angleAbove - this.halfVFov && (a = -this.spotMediaInfo.angleAbove - this.halfVFov),
                a < -this.spotMediaInfo.angleBelow + this.halfVFov && (a = -this.spotMediaInfo.angleBelow + this.halfVFov),
                e = s,
                i = a
            }
            this.spotMediaInfo.limit && (e < -this.spotMediaInfo.visibleAngleLeft + this.halfHFov && (e = -this.spotMediaInfo.visibleAngleLeft + this.halfHFov),
            e > -this.spotMediaInfo.visibleAngleRight - this.halfHFov && (e = -this.spotMediaInfo.visibleAngleRight - this.halfHFov),
            i > -this.spotMediaInfo.visibleAngleAbove - this.halfVFov && (i = -this.spotMediaInfo.visibleAngleAbove - this.halfVFov),
            i < -this.spotMediaInfo.visibleAngleBelow + this.halfVFov && (i = -this.spotMediaInfo.visibleAngleBelow + this.halfVFov))
        }
        return e = 1e-4 * Math.round(1e4 * e),
        i = 1e-4 * Math.round(1e4 * i),
        this.yaw = e,
        this.pitch = i,
        o || this.isFrameViewInside(this.yaw, this.pitch) || (this.spotMediaInfo.limit ? (this.yawTemp = .5 * (-this.spotMediaInfo.visibleAngleLeft - this.spotMediaInfo.visibleAngleRight),
        this.pitchTemp = .5 * (-this.spotMediaInfo.visibleAngleAbove - this.spotMediaInfo.visibleAngleBelow)) : (this.yawTemp = 0,
        this.pitchTemp = 0),
        this.moveToInside()),
        [this.yaw, this.pitch]
    }
    ,
    i.prototype.isFrameViewInside = function(t, e) {
        var i = this.yawTemp
          , n = this.pitchTemp;
        if (this.yawTemp = t,
        this.pitchTemp = e,
        this.getPanoramaViewAngleFromFrameView(+this.halfHFov, +this.halfVFov),
        !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
            return this.yawTemp = i,
            this.pitchTemp = n,
            !1;
        if (this.yawTemp = t,
        this.pitchTemp = e,
        this.getPanoramaViewAngleFromFrameView(-this.halfHFov, +this.halfVFov),
        !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
            return this.yawTemp = i,
            this.pitchTemp = n,
            !1;
        if (this.yawTemp = t,
        this.pitchTemp = e,
        this.getPanoramaViewAngleFromFrameView(+this.halfHFov, -this.halfVFov),
        !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
            return this.yawTemp = i,
            this.pitchTemp = n,
            !1;
        if (this.yawTemp = t,
        this.pitchTemp = e,
        this.getPanoramaViewAngleFromFrameView(-this.halfHFov, -this.halfVFov),
        !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
            return this.yawTemp = i,
            this.pitchTemp = n,
            !1;
        if (!this.spotMediaInfo.shading && !this.spotMediaInfo.stitched && !this.spotMediaInfo.overPI)
            return this.yawTemp = i,
            this.pitchTemp = n,
            !0;
        if (this.spotMediaInfo.maskRatioAbove > 0 || this.spotMediaInfo.stitched || this.spotMediaInfo.overPI) {
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(0, +this.halfVFov),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(-this.halfHFov / 4, +this.halfVFov),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(+this.halfHFov / 4, +this.halfVFov),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1
        }
        if (this.spotMediaInfo.maskRatioBelow > 0 || this.spotMediaInfo.stitched || this.spotMediaInfo.overPI) {
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(0, -this.halfVFov),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(-this.halfHFov / 4, -this.halfVFov),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(+this.halfHFov / 4, -this.halfVFov),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1
        }
        if (this.spotMediaInfo.maskRatioLeft > 0 || this.spotMediaInfo.stitched || this.spotMediaInfo.overPI) {
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(+this.halfHFov, 0),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(+this.halfHFov, +this.halfVFov / 4),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(+this.halfHFov, -this.halfVFov / 4),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1
        }
        if (this.spotMediaInfo.maskRatioRight > 0 || this.spotMediaInfo.stitched || this.spotMediaInfo.overPI) {
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(-this.halfHFov, 0),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(-this.halfHFov, +this.halfVFov / 4),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1;
            if (this.yawTemp = t,
            this.pitchTemp = e,
            this.getPanoramaViewAngleFromFrameView(-this.halfHFov, -this.halfVFov / 4),
            !this.isInsideFisheye(this.yawTemp, this.pitchTemp))
                return this.yawTemp = i,
                this.pitchTemp = n,
                !1
        }
        return this.yawTemp = i,
        this.pitchTemp = n,
        !0
    }
    ,
    i.prototype.isInsideFisheye = function(t, e) {
        if (this.spotMediaInfo.limit && !(t >= -this.spotMediaInfo.visibleAngleLeft && t <= -this.spotMediaInfo.visibleAngleRight && e <= -this.spotMediaInfo.visibleAngleAbove && e >= -this.spotMediaInfo.visibleAngleBelow))
            return !1;
        if (this.spotMediaInfo.stitched)
            return t >= -this.spotMediaInfo.angleLeft && t <= -this.spotMediaInfo.angleRight && e <= -this.spotMediaInfo.angleAbove && e >= -this.spotMediaInfo.angleBelow ? !0 : !1;
        var i = -t * this.DEG_TO_RAD
          , n = e * this.DEG_TO_RAD
          , o = Math.acos(Math.cos(i) * Math.cos(n)) * this.RAD_TO_DEG;
        if ("linear" != this.spotMediaInfo.projectionType.toLowerCase() && o < this.spotMediaInfo.radiusAngle) {
            var s = this.spotMediaInfo.GetCustomCurveInverse(o / this.spotMediaInfo.radiusAngle);
            -1 != s && (o = this.spotMediaInfo.radiusAngle * s)
        }
        if (o > this.spotMediaInfo.radiusAngle)
            return !1;
        if (!this.spotMediaInfo.shading)
            return !0;
        var a = Math.atan2(Math.sin(n), Math.sin(i) * Math.cos(n))
          , l = o * Math.cos(a)
          , h = o * Math.sin(a);
        return this.spotMediaInfo.maskRatioAbove > 0 && h > this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioAbove) ? !1 : this.spotMediaInfo.maskRatioBelow > 0 && h < -this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioBelow) ? !1 : this.spotMediaInfo.maskRatioLeft > 0 && l > this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioLeft) ? !1 : this.spotMediaInfo.maskRatioRight > 0 && l < -this.spotMediaInfo.radiusAngle * (1 - this.spotMediaInfo.maskRatioRight) ? !1 : !0
    }
    ,
    i.prototype.getPanoramaViewAngleFromFrameView = function(t, e) {
        if (0 == t)
            return this.pitchTemp = this.pitchTemp + e,
            void 0;
        var i = Math.tan(-t * this.DEG_TO_RAD)
          , n = Math.tan(e * this.DEG_TO_RAD)
          , o = Math.cos(this.pitchTemp * this.DEG_TO_RAD)
          , s = Math.sin(this.pitchTemp * this.DEG_TO_RAD)
          , a = o - n * s;
        this.yawTemp = this.yawTemp - Math.atan2(i, a) * this.RAD_TO_DEG,
        this.pitchTemp = Math.atan2(s + n * o, Math.sqrt(a * a + i * i)) * this.RAD_TO_DEG
    }
    ,
    i.prototype.updateAllowStatus = function() {
        var t = 2;
        return "standard" == this.GetSpotTypeToLowerCase() ? (this.imageWidth < 2 * this.halfWidth ? (this.allowLeft = !1,
        this.allowRight = !1) : (this.allowLeft = Math.abs(-this.spotMediaInfo.angleLeft + this.halfHFov + this.yaw) < t ? !1 : !0,
        this.allowRight = Math.abs(-this.spotMediaInfo.angleRight - this.halfHFov + this.yaw) < t ? !1 : !0),
        this.imageHeight < 2 * this.halfHeight ? (this.allowTop = !1,
        this.allowBottom = !1) : (this.allowTop = Math.abs(this.spotMediaInfo.angleAbove + this.halfVFov - this.pitch) < t ? !1 : !0,
        this.allowBottom = Math.abs(this.spotMediaInfo.angleBelow - this.halfVFov - this.pitch) < t ? !1 : !0),
        void 0) : this.spotMediaInfo.limit && "round" != this.GetSpotTypeToLowerCase() ? (this.allowLeft = Math.abs(-this.spotMediaInfo.visibleAngleLeft + this.halfHFov - this.yaw) < t ? !1 : !0,
        this.allowRight = Math.abs(-this.spotMediaInfo.visibleAngleRight - this.halfHFov - this.yaw) < t ? !1 : !0,
        this.allowTop = Math.abs(this.spotMediaInfo.visibleAngleAbove + this.halfVFov + this.pitch) < t ? !1 : !0,
        this.allowBottom = Math.abs(this.spotMediaInfo.visibleAngleBelow - this.halfVFov + this.pitch) < t ? !1 : !0,
        void 0) : ("round" == this.GetSpotTypeToLowerCase() ? (this.allowLeft = !0,
        this.allowRight = !0) : (this.allowLeft = Math.abs(-this.spotMediaInfo.angleLeft + this.halfHFov - this.yaw) < t ? !1 : !0,
        this.allowRight = Math.abs(-this.spotMediaInfo.angleRight - this.halfHFov - this.yaw) < t ? !1 : !0),
        this.allowTop = Math.abs(this.spotMediaInfo.angleAbove + this.halfVFov + this.pitch) < t ? !1 : !0,
        this.allowBottom = Math.abs(this.spotMediaInfo.angleBelow - this.halfVFov + this.pitch) < t ? !1 : !0,
        void 0)
    }
    ,
    i.prototype.moveToInside = function() {
        for (var t, e, i, n = this.yaw, o = this.pitch, s = this.yawTemp, a = this.pitchTemp, l = Math.sqrt((n - s) * (n - s) + (o - a) * (o - a)); l > this.ERROR_LEVEL_LENGTH; )
            e = .5 * (n + s),
            i = .5 * (o + a),
            t = this.isFrameViewInside(e, i),
            t ? (s = e,
            a = i) : (n = e,
            o = i),
            l = Math.sqrt((n - s) * (n - s) + (o - a) * (o - a));
        this.yaw = s,
        this.pitch = a
    }
    ,
    i.prototype.GetBasePovsFisheye = function() {
        if ("round" == this.GetSpotTypeToLowerCase())
            return null;
        var t = new Array(4)
          , e = this.yaw
          , i = this.pitch
          , n = this.lastYaw
          , o = this.lastPitch;
        return this.SetPov(0, this.spotMediaInfo.angleAbove),
        t[0] = new Position(-this.yaw,-this.pitch),
        this.SetPov(0, this.spotMediaInfo.angleBelow),
        t[1] = new Position(-this.yaw,-this.pitch),
        this.SetPov(this.spotMediaInfo.angleLeft, -i),
        t[2] = new Position(this.yaw,-this.pitch),
        this.SetPov(this.spotMediaInfo.angleRight, -i),
        t[3] = new Position(this.yaw,-this.pitch),
        this.yaw = e,
        this.pitch = i,
        this.lastYaw = n,
        this.lastPitch = o,
        t
    }
    ,
    i.prototype.GetBasePovsRound = function() {
        if ("round" != this.GetSpotTypeToLowerCase())
            return null;
        var t = new Array(2)
          , e = this.yaw
          , i = this.pitch
          , n = this.lastYaw
          , o = this.lastPitch;
        return this.SetPov(0, this.spotMediaInfo.angleTop),
        t[0] = new Position(this.yaw,this.pitch),
        this.SetPov(0, this.spotMediaInfo.angleBottom),
        t[1] = new Position(this.yaw,this.pitch),
        this.yaw = e,
        this.pitch = i,
        this.lastYaw = n,
        this.lastPitch = o,
        t
    }
    ,
    i.prototype.set = function() {
        var e = t.mainPlayerModel;
        this.yaw = e.yaw,
        this.pitch = e.pitch,
        this.perspective = e.perspective
    }
    ,
    i.prototype.UpdateIsFullPanorama = function() {
        if (this.spotMediaInfo == e || null == this.spotMediaInfo || "round" != this.GetSpotTypeToLowerCase())
            return this.isFullPanorama = !1,
            void 0;
        var t = this.spotMediaInfo.limit;
        if (t == e || null == t || 1 == t)
            return this.isFullPanorama = !1,
            void 0;
        var i = this.spotMediaInfo.angleAbove;
        if (i == e || null == i)
            return this.isFullPanorama = !1,
            void 0;
        var n = this.spotMediaInfo.angleBelow;
        return n == e || null == n ? (this.isFullPanorama = !1,
        void 0) : Math.abs(Math.abs(i) - 90) > .01 || Math.abs(Math.abs(n) - 90) > .01 ? (this.isFullPanorama = !1,
        void 0) : (this.isFullPanorama = !0,
        void 0)
    }
    ,
    t.Zenkei != e && (t.Zenkei.ViewerUtil = i)
}(window),
function(t, e) {
    var i = {
        downArrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTkxQ0NGREEwMUQxMUUyOTgxN0VDOTc1MjEzMTE4MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTkxQ0NGRUEwMUQxMUUyOTgxN0VDOTc1MjEzMTE4MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFOTFDQ0ZCQTAxRDExRTI5ODE3RUM5NzUyMTMxMTgwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFOTFDQ0ZDQTAxRDExRTI5ODE3RUM5NzUyMTMxMTgwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Go28VAAAAJdJREFUeNpi/P//PwM1ABMDlcAwNogFmRMWFjYBSOUTqXfiqlWrCnC5qAGIPxJhyEeoWuxeA9rwAV0BDlAAVQsHjNjSEdCLF4CUPg5DLgINMSA2sAvwuYboWAPaeABIbcQitREqR1L0F5DiUpwGAW1+AKQakYQaoWJkJUhQunoIxRPwKWQklPuBMZgAdeECigwaupkWIMAAqxk2A8EF92oAAAAASUVORK5CYII=",
        RAD_TO_DEG: 57.295779,
        DEG_TO_RAD: .01745329,
        KEYFRAMES_FADEIN: "fadeIn",
        KEYFRAMES_FADEOUT: "fadeOut",
        O_ANIMATION_EVENT_END_TYPE: "oanimationend",
        WEBKIT_ANIMATION_END_EVENT_TYPE: "webkitAnimationEnd",
        ANIMATION_END_EVENT_TYPE: "animationend",
        GetRadianFromDegree: function(t) {
            return Math.PI * t / 180
        },
        GetDegreeFromRadian: function(t) {
            return 180 * t / Math.PI
        },
        GetSosAngleFromWos: function(t, i) {
            var n = i !== e && i ? 2 * Math.PI : 360
              , o = i !== e && i ? Math.PI : 180;
            return t >= 0 && o >= t ? -1 * t : t > o && n > t ? n - t : 0 > t ? arguments.callee(t + n, i) : t > n ? arguments.callee(t - n, i) : 0 / 0
        },
        GetWosAngleFromSos: function(t, i) {
            var n = i !== e && i ? 2 * Math.PI : 360
              , o = i !== e && i ? Math.PI : 180;
            return t >= -o && 0 >= t ? t + n : t >= 0 && o >= t ? t : -o > t ? arguments.callee(t + n, i) : t > o ? arguments.callee(t - n, i) : 0 / 0
        },
        GetNormalizedDegree: function(t) {
            return -180 > t ? t + 360 : t > 180 ? t - 360 : t
        },
        GetNormalizedRadian: function(t) {
            return t < -Math.PI ? t + 2 * Math.PI : t > Math.PI ? t - 2 * Math.PI : t
        },
        GetNormalized: function(t, i) {
            var n = i !== e && i ? 2 * Math.PI : 360;
            return 0 > t ? arguments.callee(t + n) : t > n ? arguments.callee(t - n) : t
        },
        getYP: function(t, e, i) {
            var n = i[0] / 2 / Math.tan(.5 * e[2])
              , o = t[0] - .5 * i[0]
              , s = -1 * (t[1] - .5 * i[1])
              , a = -n
              , l = o
              , h = s * Math.cos(-e[1]) - a * Math.sin(-e[1])
              , r = s * Math.sin(-e[1]) + a * Math.cos(-e[1])
              , d = r * Math.sin(-e[0]) + l * Math.cos(-e[0])
              , c = h
              , u = r * Math.cos(-e[0]) - l * Math.sin(-e[0])
              , g = Math.sqrt(d * d + c * c + u * u);
            d /= g,
            c /= g,
            u /= g;
            var p = Math.atan2(d, -u)
              , A = Math.asin(c);
            return p = Zenkei.Utility.getNormalizedYaw(p * Zenkei.Utility.RAD_TO_DEG),
            A = Zenkei.Utility.getNormalizedPitch(A * Zenkei.Utility.RAD_TO_DEG),
            [p, A]
        },
        getNormalizedYaw: function(t) {
            var e = t;
            return 0 > e && (e += 360),
            e >= 360 && (e -= 360),
            e
        },
        getNormalizedPitch: function(t) {
            var e = t;
            return -90 > e && (e = -90),
            e > 90 && (e = 90),
            e
        },
        getFovFromPerspective: function(t, e) {
            return Math.atan(e / t)
        },
        parseSpotType: function(t) {
            var e;
            switch (t) {
            case 0:
                e = "Standard";
                break;
            case 1:
                e = "Wide";
                break;
            case 2:
                e = "Fisheye";
                break;
            case 3:
                e = "Round";
                break;
            default:
                e = "Standard"
            }
            return e
        },
        parsePanStyle: function(t) {
            var e = "";
            switch (t) {
            case 4:
                e = "Custom";
                break;
            case 1:
                e = "Horizontal";
                break;
            case 2:
                e = "Vertical";
                break;
            case 3:
                e = "Z";
                break;
            default:
            case 0:
                e = "None"
            }
            return e
        },
        GetPixelSize: function(t, e) {
            var i = new String(t)
              , n = i.indexOf("px");
            if (-1 != n)
                return parseFloat(i.substring(0, n));
            var o = i.indexOf("%");
            if (-1 != o) {
                var s = parseFloat(i.substring(0, o));
                return .01 * e * s
            }
            return 0
        },
        fadein: function(t, e) {
            t.style.display = "block";
            var i = this.KEYFRAMES_FADEIN + " ease-in " + e + "ms";
            t.style.webkitAnimation = i,
            t.style.mozAnimation = i,
            t.style.oAnimation = i,
            t.style.animation = i,
            t.style.opacity = 1
        },
        fadeout: function(t, e) {
            var i = this.KEYFRAMES_FADEOUT + " ease-in " + e + "ms";
            t.style.webkitAnimation = i,
            t.style.mozAnimation = i,
            t.style.oAnimation = i,
            t.style.animation = i,
            t.style.opacity = 0,
            setTimeout(function() {
                t.style.display = "none"
            }, e)
        },
        GetLayoutInfoFromElement: function(e) {
            var i = $(e);
            if (!i)
                return null;
            var n = i.position()
              , o = i.width()
              , s = i.height()
              , a = {
                top: Math.floor(n.top),
                left: Math.floor(n.left),
                bottom: Math.floor(t.innerHeight - n.top - s),
                right: Math.floor(t.innerWidth - n.left - o),
                width: Math.floor(o),
                height: Math.floor(s)
            };
            return a
        },
        EMPTY_SPOTMEDIAINFO: function() {
            return new Zenkei.Panorama.SpotMediaInfo(0,0,0,0,0,0,0,0,0,0,0,0,0,0,null,!1,"linear",0,0,0,0,0)
        }()
    };
    if (t.Zenkei == e)
        throw new Error("window.Zenkei is NOT FOUND, so Utility class cannot be defined..");
    t.Zenkei.Utility = i
}(window),
window.layoutInfo = {
    portrait: {
        panorama: {
            size: {
                width: 490,
                height: 430
            }
        },
        planview: {
            size: {
                width: 210,
                height: 430
            }
        },
        spottext: {
            size: {
                width: 200,
                height: 100,
                bottom: 0,
                right: 0
            }
        },
        planlist: {
            size: {
                width: -100
            }
        },
        spotlist: {
            size: {
                width: -100,
                height: 110,
                "min-height": "100%",
                isSelect: 0
            }
        }
    },
    landscape: {
        panorama: {
            size: {
                width: -70,
                height: -85
            }
        },
        planview: {
            size: {
                width: -30,
                height: -85
            }
        },
        spottext: {
            size: {
                width: -30,
                height: -30,
                bottom: 0,
                right: 0
            }
        },
        planlist: {
            size: {
                width: -100
            }
        },
        spotlist: {
            size: {
                width: -100,
                height: -15,
                "min-height": "100%",
                isSelect: 0
            }
        }
    },
    useOrientationEvent: !1,
    useUrlHashFragment: !1
},
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        ELEMENT_ID_LOADING: "loading",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        ICON_IMAGE_DATA: "data:image/gif;base64,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",
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this))
        },
        model_SpotSelect: function() {
            if (!this.model.isWalkThroughExecuting || !this.model.userAgent.canFadeAnimation) {
                $("." + this.ELEMENT_ID_LOADING).remove();
                var t = 1;
                this.model.isHmdModeEnabled && (t = 2);
                for (var e = this.model.isOrientationPortrait, i = 0; t > i; i++) {
                    var n = 0
                      , o = 0;
                    e ? o = this.model.viewHeight * i : n = this.model.viewWidth * i;
                    var s = this.ELEMENT_ID_LOADING + i;
                    $("<div></div>").attr("id", s).addClass(this.ELEMENT_ID_LOADING).css({
                        width: this.model.viewWidth,
                        height: this.model.viewHeight,
                        position: "absolute",
                        left: n + "px",
                        top: o + "px",
                        "background-color": "#FFFFFF",
                        "z-index": "9998",
                        "background-image": "url(" + this.ICON_IMAGE_DATA + ")",
                        "background-position": "center center",
                        "background-repeat": "no-repeat",
                        "background-size": "30px 30px"
                    }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
                }
            }
        },
        model_SpotImageLoadCompleted: function() {
            $("." + this.ELEMENT_ID_LOADING).remove()
        }
    },
    t.Zenkei != e && (t.Zenkei.Loading = i)
}(window),
function(t, e) {
    function i() {
        this.DISABLE_PAN_RATIO = .1,
        this.autoPanTimer = null,
        this.perspective = 0,
        this.velocityX = 0,
        this.velocityY = 0,
        this.posTop = null,
        this.posBottom = null,
        this.posLeft = null,
        this.posRight = null,
        this.posTarget = null,
        this.posLast = null,
        this.targetPoint = null,
        this.targetIndex = 0,
        this.timeKeeper = new n,
        this.panRate = this.timeKeeper.DEFAULT_PAN_SPAN,
        this.canMoveHorizontal = !0,
        this.canMoveVertical = !0,
        this.Initialize()
    }
    function n() {
        this.DEFAULT_PAN_SPAN = 30,
        this.AVOID_LIMIT_SPAN = 200,
        this.lastMillisec = 0,
        this.timeArray = new Array(10),
        this.timeArrayPointer = 0,
        this.sum = 0
    }
    function o(t, e) {
        this.ERROR_LEVEL_LENGTH = .01,
        this.x = t,
        this.y = e
    }
    i.prototype = {
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        model: null,
        controller: null,
        panStyle: "horizontal",
        allowLeft: !1,
        allowRight: !1,
        allowTop: !1,
        allowBottom: !1,
        Initialize: function() {
            return this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.startAutoPanEventHandler.Register(this.model_StartAutoPan.bind(this)),
            this.model.pauseAutoPanEventHandler.Register(this.model_PauseAutoPan.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this
        },
        GetBasePovsRound: function() {
            if ("round" != this.GetSpotTypeToLower())
                return null;
            var t = new Array(2)
              , e = [];
            return e = this.controller.GetValidAngles(0, this.model.spotMediaInfo.angleTop),
            t[0] = new o(e[0],e[1]),
            e = [],
            e = this.controller.GetValidAngles(0, this.model.spotMediaInfo.angleBottom),
            t[1] = new o(e[0],e[1]),
            t
        },
        GetBasePovsFisheye: function() {
            var t = this.model.yaw
              , e = this.model.pitch
              , i = new Array(4)
              , n = this.controller.GetValidAngles(t, this.model.spotMediaInfo.angleAbove);
            return i[0] = new o(n[0],-n[1]),
            n = [],
            n = this.controller.GetValidAngles(t, this.model.spotMediaInfo.angleBelow),
            i[1] = new o(n[0],-n[1]),
            n = [],
            n = this.controller.GetValidAngles(this.model.spotMediaInfo.angleLeft, -e),
            i[2] = new o(n[0],-n[1]),
            n = [],
            n = this.controller.GetValidAngles(this.model.spotMediaInfo.angleRight, -e),
            i[3] = new o(n[0],-n[1]),
            i
        },
        UpdateAllowStatus: function() {
            var t = this.model.spotMediaInfo;
            if (null != t) {
                var e = this.model.yaw
                  , i = this.model.pitch
                  , n = Zenkei.Utility.parseSpotType(this.model.spotLensType)
                  , o = 2;
                "standard" == n && (this.imageWidth < 2 * this.halfWidth ? (this.allowLeft = !1,
                this.allowRight = !1) : (this.allowLeft = Math.abs(-t.angleLeft + halfHFov + e) < o ? !1 : !0,
                this.allowRight = Math.abs(-t.angleRight - halfHFov + e) < o ? !1 : !0),
                this.imageHeight < 2 * this.halfHeight ? (this.allowTop = !1,
                this.allowBottom = !1) : (this.allowTop = Math.abs(t.angleAbove + halfVFov - i) < o ? !1 : !0,
                this.allowBottom = Math.abs(t.angleBelow - halfVFov - i) < o ? !1 : !0))
            }
        },
        UpdatePosition: function(t, e, i) {
            var n = this.model.yaw
              , o = this.model.pitch
              , s = this.GetUnitSpeedRatio()
              , a = .1;
            n += t * a * s,
            o += e * a * s;
            var l = [n, o];
            "boolean" == typeof i && i && (-180 > n && (n += 360),
            n >= 180 && (n -= 360),
            (-90 > o || o > 90) && (o = 0),
            l[0] = this.model.yaw + .01 * t,
            l[1] = this.model.pitch + .01 * e,
            this.model.yaw = l[0],
            this.model.pitch = l[1]),
            this.controller.SetYawAndPitch(l[0], l[1])
        },
        GetSpotTypeToLower: function() {
            var t = Zenkei.Utility.parseSpotType(this.model.spotLensType);
            return String(t).toLowerCase()
        },
        Start: function() {
            if (this.Pause(),
            !this.model.isHmdModeEnabled && !this.controller.isPlayingBrowseLog) {
                var t = this.model.spotPanType
                  , e = this.model.spotLensType;
                if (0 === e || 4 === t)
                    return this.Pause(),
                    void 0;
                if (this.panStyle = String(Zenkei.Utility.parsePanStyle(t)).toLowerCase(),
                "none" != this.getPanStyleToLowerCase()) {
                    var i = this.GetFirstDirection();
                    this.velocityX = i[0],
                    this.velocityY = i[1],
                    this.Resume()
                }
            }
        },
        Pause: function() {
            null != this.autoPanTimer && (clearInterval(this.autoPanTimer),
            this.autoPanTimer = null)
        },
        GetFirstDirection: function() {
            var t = 0
              , e = 0;
            this.CalcBasePos();
            var i = Zenkei.Utility.parseSpotType(this.model.spotLensType);
            if ("round" == i.toLowerCase())
                switch (this.getPanStyleToLowerCase()) {
                case "vertical":
                    e = 10;
                    break;
                case "z":
                    t = -10,
                    e = 10;
                    break;
                default:
                case "horizontal":
                    t = -10
                }
            else {
                this.targetIndex = 0;
                var n = Zenkei.Utility.parsePanStyle(this.model.spotPanType);
                this.calcDefaultRoute(n.toLowerCase()),
                t = this.posTarget.x - this.model.yaw,
                e = this.posTarget.y - this.model.pitch
            }
            var o = this.getUnitSpeed(t, e);
            return o
        },
        CalcBasePos: function() {
            var t, e, i = $(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY)), n = Math.atan(.5 * i.width() / this.model.perspective), o = Math.atan(.5 * i.height() / this.model.perspective), s = Zenkei.Utility.parseSpotType(this.model.spotLensType);
            if ("round" == s.toLowerCase()) {
                e = Math.abs(this.model.spotMediaInfo.angleBelow - this.model.spotMediaInfo.angleAbove),
                this.canMoveHorizontal = !0,
                this.canMoveVertical = e / (2 * o) <= this.DISABLE_PAN_RATIO ? !1 : !0;
                var a = this.GetBasePovsRound();
                return this.posTop = a[0],
                this.posBottom = a[1],
                void 0
            }
            var a = this.GetBasePovsFisheye();
            this.posTop = a[0],
            this.posBottom = a[1],
            this.posLeft = a[2],
            this.posRight = a[3],
            t = Math.abs(this.posRight.x - this.posLeft.x),
            e = Math.abs(this.posTop.y - this.posBottom.y),
            this.canMoveHorizontal = t / (2 * n) <= this.DISABLE_PAN_RATIO ? !1 : !0,
            this.canMoveVertical = e / (2 * o) <= this.DISABLE_PAN_RATIO ? !1 : !0
        },
        Resume: function() {
            if ("none" != this.getPanStyleToLowerCase()) {
                this.timeKeeper.Init(),
                this.panRate = this.timeKeeper.DEFAULT_PAN_SPAN,
                this.CalcBasePos();
                var t = Zenkei.Utility.parseSpotType(this.model.spotLensType);
                "round" != t.toLowerCase() && this.calcDefaultRoute(this.getPanStyleToLowerCase()),
                this.perspective = this.model.perspective,
                this.Pause(),
                this.autoPanTimer = this.PanMoveHandler.applyInterval(this.timeKeeper.DEFAULT_PAN_SPAN, this, [this.PanMoveHandler])
            }
        },
        PanMoveHandler: function() {
            if ("none" != this.getPanStyleToLowerCase()) {
                this.UpdateAllowStatus(),
                this.perspective != this.model.perspective && ("round" != this.GetSpotTypeToLower() && this.CalcBasePos(),
                this.perspective = this.model.perspective);
                var t = this.panRate
                  , e = this.timeKeeper.Push();
                e > 0 && (e > this.panRate ? e += 5 : e < this.panRate && this.panRate > this.timeKeeper.DEFAULT_PAN_SPAN || (e = t),
                Math.abs(t - e) > 5 && (this.Pause(),
                this.panRate = e,
                this.autoPanTimer = this.PanMoveHandler.applyInterval(this.panRate, this, [this.PanMoveHandler])));
                var i = this.getNextStep();
                this.velocityX = i[0],
                this.velocityY = i[1],
                this.UpdatePosition(this.velocityX, this.velocityY)
            }
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.controller.StartAutoPan()
        },
        model_StartAutoPan: function() {
            this.Start()
        },
        model_PauseAutoPan: function() {
            this.Pause()
        }
    },
    i.prototype.Reset = function() {
        this.Pause(),
        this.panStyle = Zenkei.Utility.parsePanStyle(this.model.spotPanType),
        this.canMoveHorizontal = !0,
        this.canMoveVertical = !0
    }
    ,
    i.prototype.getPanStyleToLowerCase = function() {
        return this.panStyle
    }
    ,
    i.prototype.calcDefaultRoute = function(t) {
        switch (this.targetPoint = null,
        t) {
        case "z":
            this.canMoveHorizontal && this.canMoveVertical ? (this.targetPoint = new Array(10),
            this.targetPoint[0] = this.posLeft.Clone(),
            this.targetPoint[1] = this.posRight.Clone(),
            this.targetPoint[2] = this.posTop.Clone(),
            this.targetPoint[3] = this.posLeft.Clone(),
            this.targetPoint[4] = this.posBottom.Clone(),
            this.targetPoint[5] = this.posRight.Clone(),
            this.targetPoint[6] = this.posLeft.Clone(),
            this.targetPoint[7] = this.posTop.Clone(),
            this.targetPoint[8] = this.posRight.Clone(),
            this.targetPoint[9] = this.posBottom.Clone()) : this.canMoveHorizontal && !this.canMoveVertical ? (this.targetPoint = new Array(2),
            this.targetPoint[0] = this.posLeft.Clone(),
            this.targetPoint[1] = this.posRight.Clone()) : !this.canMoveHorizontal && this.canMoveVertical && (this.targetPoint = new Array(2),
            this.targetPoint[0] = this.posTop.Clone(),
            this.targetPoint[1] = this.posBottom.Clone());
            break;
        case "vertical":
            this.canMoveVertical ? (this.targetPoint = new Array(2),
            this.targetPoint[0] = this.posTop.Clone(),
            this.targetPoint[1] = this.posBottom.Clone()) : this.canMoveHorizontal && (this.targetPoint = new Array(2),
            this.targetPoint[0] = this.posLeft.Clone(),
            this.targetPoint[1] = this.posRight.Clone());
            break;
        default:
        case "horizontal":
            if (this.canMoveHorizontal) {
                var e = Zenkei.Utility.parseSpotType(this.model.spotLensType);
                "round" != e.toLowerCase() && (this.targetPoint = new Array(2),
                this.targetPoint[0] = this.posRight.Clone(),
                this.targetPoint[1] = this.posLeft.Clone())
            } else
                this.canMoveVertical && (this.targetPoint = new Array(2),
                this.targetPoint[0] = this.posTop.Clone(),
                this.targetPoint[1] = this.posBottom.Clone())
        }
        this.posTarget = null != this.targetPoint && this.targetPoint.length > this.targetIndex ? this.targetPoint[this.targetIndex].Clone() : new o(this.model.yaw,this.model.pitch)
    }
    ,
    i.prototype.getPanSpeed = function() {
        var t = this.panRate
          , e = Zenkei.Utility.parseSpotType(this.model.spotLensType);
        return t /= "standard" == e.toLowerCase() ? 200 : 200
    }
    ,
    i.prototype.getUnitSpeed = function(t, e) {
        var i = [0, 0]
          , n = .001;
        if (t = n > t && t > -n ? 0 : t,
        e = n > e && e > -n ? 0 : e,
        0 == t && 0 == e)
            return i;
        var o = Math.sqrt(t * t + e * e)
          , s = this.getPanSpeed()
          , a = .1 * this.GetUnitSpeedRatio();
        return i[0] = t / o * s / a,
        i[1] = e / o * s / a,
        i
    }
    ,
    i.prototype.GetUnitSpeedRatio = function() {
        var t, e = Zenkei.Utility.parseSpotType(this.model.spotLensType), i = $(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY)), n = .5 * i.width(), o = .5 * i.height(), s = Math.atan(n / this.model.perspective) * Zenkei.Utility.RAD_TO_DEG, a = Math.atan(o / this.model.perspective) * Zenkei.Utility.RAD_TO_DEG;
        return t = "standard" == e.toLowerCase() ? this.imageNaturalWidth * o >= n * this.imageNaturalHeight ? s / n : a / o : s / n,
        .6 * t
    }
    ,
    i.prototype.getNextStep = function() {
        if ("none" != this.getPanStyleToLowerCase()) {
            var t, e = this.velocityX, i = this.velocityY, n = 3, o = this.controller.GetValidAngles(this.model.yaw + e, this.model.pitch + i);
            if ("round" == this.GetSpotTypeToLower()) {
                var s = Math.abs(this.model.pitch - o[1]) < n ? !0 : !1;
                return s && (i *= -1),
                t = this.getUnitSpeed(e, i)
            }
            var a = this.getPanSpeed()
              , s = !1;
            if (s = "standard" === this.GetSpotTypeToLower() ? Math.abs(this.model.yaw - this.lastYaw) < n && Math.abs(this.model.pitch - this.lastPitch) < n ? !0 : !1 : Math.abs(this.model.yaw - o[0]) < n && Math.abs(this.model.pitch - o[1]) < n ? !0 : !1,
            this.lastYaw = this.model.yaw,
            this.lastPitch = this.model.pitch,
            this.posTarget.IsNearlyEqualParam(this.model.yaw, this.model.pitch, a) || s) {
                if (this.targetIndex++,
                null == this.targetPoint)
                    return [0, 0];
                this.targetIndex >= this.targetPoint.length && (this.targetIndex = 0),
                this.posTarget = this.targetPoint[this.targetIndex].Clone()
            }
            return e = this.posTarget.x - this.model.yaw,
            i = this.posTarget.y - this.model.pitch,
            t = this.getUnitSpeed(e, i)
        }
    }
    ,
    i.prototype.lastYaw = 0,
    i.prototype.lastpitch = 0,
    n.prototype.Init = function() {
        this.lastMillisec = 0,
        this.timeArrayPointer = 0,
        this.sum = 0
    }
    ,
    n.prototype.Push = function() {
        var t = new Date
          , e = t.getMilliseconds()
          , i = e > this.lastMillisec ? e - this.lastMillisec : 1e3 + e - this.lastMillisec;
        if (i > this.AVOID_LIMIT_SPAN)
            return 0;
        if (this.lastMillisec = e,
        this.timeArrayPointer < this.timeArray.length)
            this.timeArray[this.timeArrayPointer] = i,
            this.sum += i,
            this.timeArrayPointer++;
        else {
            this.sum = 0;
            var n;
            for (n = 0,
            len = this.timeArray.length - 1; len > n; n++)
                this.timeArray[n] = this.timeArray[n + 1],
                this.sum += i;
            this.timeArray[this.timeArray.length - 1] = i
        }
        var o;
        return o = this.timeArrayPointer < this.timeArray.length ? 0 : Math.floor(this.sum / this.timeArrayPointer)
    }
    ,
    o.prototype.IsEqualParam = function(t, e) {
        return Math.abs(this.x - t) < this.ERROR_LEVEL_LENGTH && Math.abs(this.y - e) < this.ERROR_LEVEL_LENGTH ? !0 : !1
    }
    ,
    o.prototype.IsEqual = function(t) {
        return this.IsEqualParam(t.x, t.y)
    }
    ,
    o.prototype.IsNearlyEqualParam = function(t, e, i) {
        return Math.abs(this.x - t) < i && Math.abs(this.y - e) < i ? !0 : !1
    }
    ,
    o.prototype.IsNearlyEqual = function(t, e) {
        return this.IsNearlyEqualParam(t.x, t.y, e)
    }
    ,
    o.prototype.Clone = function() {
        return new o(this.x,this.y)
    }
    ,
    t.Zenkei != e && (t.Zenkei.AutoPan = i)
}(window),
function(t, e) {
    function i(t, e, i, n, o, s) {
        this._yaw = isFinite(t) ? this.limit(t, 0, 360, 360) : this._yaw,
        this._pitch = isFinite(e) ? this.limit(e, -90, 90, 0) : this._pitch,
        this._fov = isFinite(i) ? this.limit(i, 0, 180, 0) : this._fov,
        this._wtime = isFinite(n) ? 1e3 * this.limit(n, 0, 30, 0) : this._wtime,
        this._speed = isFinite(o) ? this.limit(o, .1, 10, 0) : this._speed,
        this._expect = isFinite(s) ? this.limit(s, 0, 18e4, 0) : this._expect
    }
    function n(t) {
        var e = .7 * (t ? t.speed : 1);
        this._moveYaw = this._moveYaw * e,
        this._movePitch = this._movePitch * e,
        this._moveFov = this._moveFov * e,
        this._waitTime = t ? t.wtime : 0
    }
    function o() {
        this.Initialize()
    }
    i.prototype = {
        limit: function(t, i, n, o) {
            if (t === e || null === t)
                return 0;
            for (; i > t; ) {
                if (0 === o)
                    return i;
                t += o
            }
            for (; t >= n; ) {
                if (0 === o)
                    return n;
                t -= o
            }
            return t
        },
        _yaw: 0,
        set yaw(t) {},
        get yaw() {
            return this._yaw
        },
        getDistanceYaw: function(t) {
            var e = Math.abs(t.yaw - this.yaw)
              , i = (t.yaw - this.yaw > 0 ? 1 : -1) * (180 >= e ? 1 : -1);
            return e = 180 >= e ? e : 360 - e,
            i = i > 0 ? !0 : !1,
            {
                distance: e,
                direction: i
            }
        },
        _pitch: 0,
        set pitch(t) {},
        get pitch() {
            return this._pitch
        },
        getDistancePitch: function(t) {
            var e = Math.abs(t.pitch - this.pitch)
              , i = t.pitch > this.pitch ? !0 : !1;
            return {
                distance: e,
                direction: i
            }
        },
        _fov: 0,
        set fov(t) {},
        get fov() {
            return this._fov
        },
        getDistanceFov: function(t) {
            var e = Math.abs(t.fov - this.fov)
              , i = t.fov > this.fov ? !0 : !1;
            return {
                distance: e,
                direction: i
            }
        },
        _wtime: 0,
        set wtime(t) {},
        get wtime() {
            return this._wtime
        },
        _speed: 1,
        set speed(t) {},
        get speed() {
            return this._speed
        },
        _expect: 0,
        set expect(t) {
            this._expect = this.limit(t, 0, 18e4, 0)
        },
        get expect() {
            return this._expect
        },
        toString: function() {
            return "yaw:" + this.yaw + "/pitch:" + this.pitch + "/fov:" + this.fov + "/wtime:" + this.wtime + "/speed:" + this.speed + "/expect:" + this.expect
        }
    },
    t.Zenkei != e && (t.Zenkei.Point = i),
    n.prototype = {
        set moveSpan(t) {},
        get moveSpan() {
            return this.MOVE_SPAN
        },
        _moveYaw: .07,
        set moveYaw(t) {},
        get moveYaw() {
            return this._moveYaw
        },
        _movePitch: .07,
        set movePitch(t) {},
        get movePitch() {
            return this._movePitch
        },
        _moveFov: .5,
        set moveFov(t) {},
        get moveFov() {
            return this._moveFov
        },
        _waitTime: 0,
        set waitTime(t) {},
        get waitTime() {
            return this._waitTime
        },
        _isWaited: !1,
        set isWaited(t) {},
        get isWaited() {
            return this._isWaited
        },
        wait: function() {
            this._isWaited = !0
        },
        empty: null
    },
    t.Zenkei != e && (t.Zenkei.CustomPanFrameCycle = n),
    o.prototype = {
        model: null,
        controller: null,
        panStyle: "horizontal",
        _targetPoints: [],
        _frameTimer: null,
        _startDate: null,
        _roundTime: 0,
        _slideshowTime: 0,
        _isSingularity: !0,
        _singularityTime: 0,
        _singularityPoint: null,
        MOVE_SPAN: 40,
        Initialize: function() {
            return this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.startAutoPanEventHandler.Register(this.model_StartAutoPan.bind(this)),
            this.model.pauseAutoPanEventHandler.Register(this.model_PauseAutoPan.bind(this)),
            this
        },
        GetHorizontalFovRatio: function() {
            var i = 1
              , n = this.model.spotJson;
            return 0 != n.aa && t.Zenkei.layoutInfo != e && 0 != t.layoutInfo.reviseFov && t.Zenkei.layoutInfo.panorama != e && t.Zenkei.layoutInfo.panorama.size != e && t.Zenkei.layoutInfo.panorama.size.width != e && t.Zenkei.layoutInfo.panorama.size.height != e && t.Zenkei.layoutInfo.panorama.size.width < t.Zenkei.layoutInfo.panorama.size.height && (i = t.Zenkei.layoutInfo.panorama.size.width / t.Zenkei.layoutInfo.panorama.size.height),
            i
        },
        GetPointsForStandard: function(t) {
            var e = this.model.horizontalFov * Math.PI / 180
              , i = null;
            if (1 === t) {
                var n = this.model.minYaw * Math.PI / 180
                  , o = this.model.maxYaw * Math.PI / 180
                  , s = this.model.pitch * Math.PI / 180;
                i = [{
                    aa: n,
                    ab: s,
                    ac: e,
                    ad: 0,
                    ae: 1
                }, {
                    aa: o,
                    ab: s,
                    ac: e,
                    ad: 0,
                    ae: 1
                }],
                this.GetPoints(i)
            } else if (2 === t) {
                var a = this.model.minPitch * Math.PI / 180
                  , l = this.model.maxPitch * Math.PI / 180
                  , h = this.model.yaw * Math.PI / 180;
                i = [{
                    aa: h,
                    ab: a,
                    ac: e,
                    ad: 0,
                    ae: 1
                }, {
                    aa: h,
                    ab: l,
                    ac: e,
                    ad: 0,
                    ae: 1
                }],
                this.GetPoints(i)
            } else
                this.GetPoints()
        },
        GetPoints: function(t) {
            var i = this.GetHorizontalFovRatio()
              , n = 57.295779
              , o = this.model.spotJson;
            if (null != o) {
                var s = this.model.spotLensType
                  , a = o.cp;
                t !== e && null !== t && (a = t),
                this._targetPoints = [];
                for (var l = 0, h = 0, r = a.length; r > l; l++) {
                    var d = a[l].ac * n * i;
                    0 == s && Math.abs(90 - d) < .1 && (d = this.model.maxHorizontalFov),
                    this._targetPoints[h] = new Zenkei.Point(-a[l].aa * n,a[l].ab * n,d,a[l].ad,a[l].ae,0),
                    h++,
                    this._targetPoints[h] = new Zenkei.Point(-a[l].aa * n,a[l].ab * n,d,0,a[l].ae,0),
                    h++
                }
                for (var c, u, g, p, A, m, E = 0, l = 0, r = this._targetPoints.length; r > l; l++) {
                    var I = this._targetPoints[l]
                      , T = this._targetPoints[(l + 1) % r];
                    A = this._targetPoints[(l + 2) % r].speed,
                    0 === (l + 1) % 2 ? (c = new Zenkei.CustomPanFrameCycle,
                    u = I.getDistanceYaw(T).distance / c.moveYaw,
                    g = I.getDistancePitch(T).distance / c.movePitch,
                    p = I.getDistanceFov(T).distance / c.moveFov,
                    m = 30 * Math.max.apply(null, [u, g, p]),
                    m /= A) : m = I.wtime,
                    this._targetPoints[l].expect = m,
                    E += m
                }
                return this._roundTime = E,
                !0
            }
        },
        Stop: function() {
            null != this._frameTimer && (t.clearInterval(this._frameTimer),
            this._frameTimer = null),
            this._isSingularity = !0,
            this._singularityTime = 0,
            this._singularityPoint = null
        },
        Start: function() {
            if (0 !== this._targetPoints.length && !this.model.isHmdModeEnabled && !this.controller.isPlayingBrowseLog) {
                this._startDate = (new Date).getTime(),
                this._isSingularity = !0;
                var e = 30
                  , i = 57.295779
                  , n = 2 * Math.atan(.5 * this.model.viewWidth / this.model.perspective) * i
                  , o = new Zenkei.Point(this.model.yaw,this.model.pitch,n)
                  , s = new Zenkei.CustomPanFrameCycle;
                yawFrames = o.getDistanceYaw(this._targetPoints[0]).distance / s.moveYaw,
                pitchFrames = o.getDistancePitch(this._targetPoints[0]).distance / s.movePitch,
                fovFrames = o.getDistanceFov(this._targetPoints[0]).distance / s.moveFov,
                this._singularityTime = Math.max.apply(null, [yawFrames, pitchFrames, fovFrames]) * e,
                this._singularityPoint = new Zenkei.Point(this.model.yaw,this.model.pitch,n,0,0);
                var a = this._targetPoints[0].speed;
                this._singularityTime = this._singularityTime / a,
                t.clearInterval(this._frameTimer),
                this._frameTimer = this.PanMove.applyInterval(this.MOVE_SPAN, this, [this.PanMove])
            }
        },
        PanMove: function() {
            var t = .008726645
              , e = (new Date).getTime();
            this._roundTime;
            var i = .5 * this.model.viewWidth;
            if (this._isSingularity) {
                var n = this._startDate;
                if (e - n > this._singularityTime) {
                    this._startDate = e,
                    this._isSingularity = !1;
                    var o = this._targetPoints[0].yaw
                      , s = this._targetPoints[0].pitch
                      , a = i / Math.tan(this._targetPoints[0].fov * t);
                    this.controller.SetYawAndPitch(o, s),
                    this.controller.SetPerspective(a)
                } else {
                    var l = 0 === this._singularityPoint ? 0 : (e - n) / this._singularityTime
                      , h = this._singularityPoint
                      , r = this._targetPoints[0]
                      , d = h.getDistanceYaw(r)
                      , c = h.getDistancePitch(r)
                      , u = h.getDistanceFov(r)
                      , g = h.fov + (u.direction ? 1 : -1) * u.distance * l
                      , p = i / Math.tan(g * t)
                      , o = h.limit(h.yaw + (d.direction ? 1 : -1) * d.distance * l, 0, 360, 360)
                      , s = h.pitch + (c.direction ? 1 : -1) * c.distance * l
                      , a = p;
                    this.controller.SetYawAndPitch(o, s),
                    this.controller.SetPerspective(a)
                }
            } else {
                var A = this._startDate;
                this._slideshowTime,
                e - A >= this._roundTime && (A = this._startDate = e);
                var m = this.GetSupposedPlace(e - A);
                if (0 == m.nextIndex)
                    return this.controller.StopAutoPan(),
                    this.controller.StartAutoPan(),
                    this.controller.FireLastCustomPanPointReachedEvent(),
                    void 0;
                this.controller.SetYawAndPitch(m.yaw, m.pitch),
                this.controller.SetPerspective(i / Math.tan(m.fov * t))
            }
        },
        GetSupposedPlace: function(t) {
            for (var e = {}, i = t, n = 0, o = 0, s = this._targetPoints.length; s > o; o++) {
                if (i < this._targetPoints[o].expect) {
                    n = o;
                    break
                }
                i -= this._targetPoints[o].expect
            }
            var a = 0 === this._targetPoints[n].expect ? 0 : i / this._targetPoints[n].expect
              , l = this._targetPoints[n]
              , h = this._targetPoints[s > n + 1 ? n + 1 : 0]
              , r = l.getDistanceYaw(h)
              , d = l.getDistancePitch(h)
              , c = l.getDistanceFov(h);
            return e = {
                yaw: l.limit(l.yaw + (r.direction ? 1 : -1) * r.distance * a, 0, 360, 360),
                pitch: l.pitch + (d.direction ? 1 : -1) * d.distance * a,
                fov: l.fov + (c.direction ? 1 : -1) * c.distance * a,
                nextIndex: s > n + 1 ? n + 1 : 0
            }
        },
        model_StartAutoPan: function() {
            var t = this.model.spotJson;
            if (null != t) {
                var e = this.model.spotLensType
                  , i = this.model.spotPanType;
                (0 == e || 4 == i) && (this.Stop(),
                0 == e ? this.GetPointsForStandard(i) : this.GetPoints(),
                this.Start())
            }
        },
        model_PauseAutoPan: function() {
            this.Stop()
        }
    },
    t.Zenkei != e && (t.Zenkei.CustomPan = o)
}(window),
function(t, e) {
    function i() {
        this.currentSpotSlideshowTime = -1,
        this.timer = null,
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        Initialize: function() {
            return this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            0 != this.model.projectJson.ab ? (this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.startSlideshowEventHandler.Register(this.model_StartSlideshow.bind(this)),
            this.model.pauseSlideshowEventHandler.Register(this.model_PauseSlideshow.bind(this)),
            this) : void 0
        },
        Stop: function() {
            null != this.timer && (clearInterval(this.timer),
            this.timer = null)
        },
        Start: function() {
            this.Stop(),
            Zenkei.Utility.parseSpotType(this.model.spotLensType),
            this.currentSpotSlideshowTime = 1e3 * this.GetSlideshowTime(),
            this.currentSpotSlideshowTime > 0 && (this.timer = this.timer_Hangler.applyTimeout(this.currentSpotSlideshowTime, this, [this.timer_Hangler]))
        },
        GetSlideshowTime: function() {
            var t = this.model.spotJson;
            return null == t ? null : t.at
        },
        timer_Hangler: function() {
            var t = this.model.projectJson;
            if (null == t)
                return this.Stop(),
                void 0;
            var e = t.pl;
            if (null == e)
                return this.Stop(),
                void 0;
            var i = this.model.planJson;
            if (null == i)
                return this.Stop(),
                void 0;
            var n = i.sp;
            if (null == n)
                return this.Stop(),
                void 0;
            if (1 == e.length && 1 == n.length)
                return this.Stop(),
                void 0;
            var o = this.model.spotIndex
              , s = this.model.planIndex;
            o + 1 < n.length ? this.controller.SelectPlanAndSpot(s, o + 1) : s + 1 < e.length ? this.controller.SelectPlanAndSpot(s + 1, 0) : this.controller.SelectPlanAndSpot(0, 0)
        },
        model_SpotSelect: function() {
            this.Stop()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.model.isSlideshowEnabled && this.Start()
        },
        model_StartSlideshow: function() {
            this.Start()
        },
        model_PauseSlideshow: function() {
            this.Stop()
        }
    },
    t.Zenkei != e && (t.Zenkei.Slideshow = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        ELEMENT_ID_STORY: "story",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        ELEMENT_ID_PLAY_BUTTON: "playbutton",
        ELEMENT_ID_PAUSE_BUTTON: "pausebutton",
        PLAY_BUTTON_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjNJREFUeNq8lq9vwkAUx1/LAQMSaDDMQCZIqEAsBIMAJBDEAgnJFHNMLmjE5vkH+BNmEHObInUbCjlZx0JCQCL4sXvNbrndruXIBpd8eVzLvU/f914vaKVSCSzLMgGgSmXAccaS6pnq3WfbNsKuqc7geANzZ6k+9K/KTjWq+hFtlA1DhxMPcirQbreDzWYD+ilhqKNXuN1uHRCLyhXmcrm7fr9/eQiMVYVar9eOlIGLxcIYDAZXxWLxdjgcXuyzEJPzIBRWqQzUNM3RbDY77/V6N/V6/WY0Gp27WSiDYdTo0zyoANPp9L3P5wNd1x0hHGM+n590u10rm80uxf2SRWWgaZr3DIZCOEIxhsPhVblcfut0Oq/xeHyFiXnxe6lsKSYmhIDf74dAIAChUAii0SjEYjE4o2M8HpdppbfMSt5SHkgOBdLc38I5XqfwFe3it1ar9epmJfuuDMTkkUgE7XNgWCVWm8lkJs1m00omk0vWnTxAhCoDEYI2ooLBIKRSKbvdbj/R6ID4vRL3j58T1WMJgQhKJBIfjUbjpVAo2PyR5QXBOXsosg/EFtHuW9ZqNYvu08Qtqdid4j3M+eu1YE/ilYi30C2x2zriBeIT8/f3VeO27ttSFe9lydygssrYWsK3sWjLoXslJpdaKuuy/wKJ135U+F9Q2VwE4ilviAftX6pzi/iHWJvP5yb98bXs3FNtDNFGMXLARw0/p9MpQqtUhtc56AXzilR4/D1XKpX3TwEGABN9e+z5VHfAAAAAAElFTkSuQmCC",
        PLAY_BUTTON_IMAGE_DATA2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABGCAYAAAA+c+FUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYzhjNDZiZi1kM2YzLTYzNDAtYTUxYi04M2VkZDRhZjJkNWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjZENTQ3QTNGODcxMTFFNEFBRTY5NTMzN0VGRTg0NDQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjZENTQ3QTJGODcxMTFFNEFBRTY5NTMzN0VGRTg0NDQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGU4YTUzMTAtZjdiOC0xYzRiLTgxOTYtMGMzOTYwOTFmZDlhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmRjOGM0NmJmLWQzZjMtNjM0MC1hNTFiLTgzZWRkNGFmMmQ1ZiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiXus2QAAASiSURBVHja7J1RSFtnFMdvEuk0sSg0JRoUanQTnSVFVKLJ0CgBA4YYGSiiiD60z20RHMIQEUVwEwQRkQi+bAiKRcQH6WC4KeJ8mC41qUlaY62xta3EasWSmp1vvS1Zl9Sl1Nzv3pwf/NFc83Bz/pzzneO9+a4oEAgwCH2I0Bj+G3MJpAalguIwdBHhB3lBq6Dnn8MYEUgHMoO+Yl8jnw4JthN0B/Q7+zpiY0iG3AZdxXieC3+BfgiXQeGMIeWqhzUHOT+IKd+xZe5MY2SgH0FKjFtU2AHdAh2dZQwpX2UYr6jyK1vWwhqTCerHRZ6TpuAmyP3ugPiDN1jQFG7GFjb2ITOGmPQzSIpx4oRXoHrQmw8zJg1N4RQp68F/StlljA3nyEMZI8a4cI6YajOGh4fzPB6PDB2ijOXl5SudnZ362dnZdDSGIpKSkkiHwkxOTqrb29t1NpstGY2hgNPT0/ez1O7ubnJ/f79uZGQkN/i40OHNdZWlpSWV3W5PMRgMTqPR+AgzhiJ8Pp90YmJC3dPTUyj05oCXLbLL5VKQ5sBqteYI9dI4r2eXxcXFzNbWVj10cXI0hjL29/dlMPdo+vr68r1ebwIaQxnQGCg7OjrKpqamMrArowy/3y+ZmZn5em1tLcVkMm3k5+c/x4yhiK2trUuDg4PFQ0NDecfHxxLMGMpYWVm54nA4UsvLy51ms3kTM4YiDg8Pv5iens6D9lrjdrsvojGUAQOpvLu7u3RsbCz75OREjMZQxvz8/JdtbW1lCwsLCjSGMg4ODqSjo6OFvb29BdAoyNAYytjY2EiBtadsfHw8E7syyggEAqK5ubkcm82WWllZ6dRqtU8wYyhiZ2cnmZS3gYEBNfwuRWMoY3V1Nb2rq+sbLGWUkZaW9gJKmguNoYSEhISTiooKl8VieYiLPyWo1epHLS0t9xITE/3YlVGAQqHwmUym+8XFxU+xXaYAkUjEGAwGe21trZvWc4w5Y3Jzcx/X1NQ4MzIyDmk+z5gxhtxEaDab10tLS3f5cL4xYYxGo3nQ3Nxsj4uL480tNYI2BsrVXn19/bpKpXrJt3MXpDHx8fGvYUi8Dx2Xh6+fQXDGFBQUbDY2Njpomkli2hilUrlP7owpKiraE8Ln4b0xEonk1Gg0rlsslk0hZT6vjcnOzvY2NDSsQ7YcC60k89IYuVz+srq62k7jv1Ji0hhStrRa7YOmpiaH0Gcv3hiTlZX1BAyxCbFs8cYYsVj8fkIn10mqqqrsMJdsMzEElcaQb46RnzqdzlVXV+cEc94wMQaVxqhUqj29Xv+wpKTkKROjBG/yUwj6nkG4pBP0xz/lHGNBJ8HGHGE4OOdVKGMeMx/ZbhY5d0jst0MZ4wNtYnw4w8N6wIRaY37B+HDG3XBdGeECaJgJ2tAMiQrPQDdAr8NlDPmDFeMUdazBpoTKmHc0gb7FeEWFCdDYxwbMfx1n3u5oWsvgdr/n2YWNg34K1Q2f9TSMa6DroHSM42dlm13L/wz3hv/z/BiSMUUg8p2RHObtbrOYRZFnB7kXwQ76DbR81sz4KU9cIqbIMNYRcRTp8I6PwqIUNIZS/hZgABhMhb9NMsVtAAAAAElFTkSuQmCC",
        PAUSE_BUTTON_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfBJREFUeNq8ljtywjAQhmVj3jDjhjtwCpIOaioOwR2SHII7pKVzGd/CN6Cl5xV9niyzETIWE2LN/KwsDfv5Xy0aotlsZvI8nxpjFlap+Z+xt8qsiuhyuQBbmWbGZ/zjrKmxiP+xjL6RxqbhkTQFsr1iTqeTiZuEoVqHk8nkLY5jE0VRqeVymW82my/21uv163a7fUmSxLRaLUMsiuJDf/98PpcgibVAEgESKFEG83a7XUaB6qFBwQ41iKQaqJ2xLkApoQtjPQhIIokk9zmUPSAuSGDBJRWg61CD0GAwMMfj8ebcdAxyqM/IBbLe6/VMv98vowC1HjpDcaCd6r3RaFTCUKfTuSmhCw0uKeK8ut1umYwkzMfjcekMCdBXyod+FuKS5EDkbQEMh8OrO15Il9QHDS4ppUMkPhwOpUvmrPESwHh2z1DDgoDAcEFiulC7YC7NIp0q7l2oHENSd//x9oCAIn1OANljTRqrqkuJ3h++vImIc0PSjeJCgLgjss6NBNDtUBHr/MV494F0GfTcdy6h37uWtCqRD6STVUF9zq53aVVXVSWuA+nkvr3E11XPArlrvxw+C+p7doF7+5C6d95f3FVF/hBT0sxq5bv3QhvDLaMbFTCL+NztdlObfGGV3rsH78HuRau9VTafz4tvAQYA/50RMYhoP+EAAAAASUVORK5CYII=",
        PAUSE_BUTTON_IMAGE_DATA2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABGCAYAAAA+c+FUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYzhjNDZiZi1kM2YzLTYzNDAtYTUxYi04M2VkZDRhZjJkNWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA1Mzg0ODZGODcxMTFFNEE4RjhDNDQ4MUY0NzE1QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA1Mzg0ODVGODcxMTFFNEE4RjhDNDQ4MUY0NzE1QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGU4YTUzMTAtZjdiOC0xYzRiLTgxOTYtMGMzOTYwOTFmZDlhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmRjOGM0NmJmLWQzZjMtNjM0MC1hNTFiLTgzZWRkNGFmMmQ1ZiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmXlbFgAAAJ3SURBVHja7J2xaxNRHMfv2tJAL5s6WFrUCIKDmEUnpVOyipPQP8A416mLg4uT7g5dC4UObkLQSae4pCh0cIiBtg62g5grpFTS38M3qH13lyu99zvI5wNf0pTXN3w/3OW9FN6Fo9EogPIxRQXlZCbH2AuS25LLOf8OguBY8l2yJTk4DzGh5J7kgeSGfQ9nx3xufJW8kXy0793Fp3zGmCvkqeQWfRbCZ8nLpCsoSYy5Xb2wcqA4jJRVe5vLFBNJXknm6c0Le5IVSZy1KnuCFK/M285Tl8vXJUt05Z0l232imIesvFQIbfdOMebnO3Skhul+2iVmQTJHP2rMWQenxFyiG3Uuunb+6t+b9Xq9arvdvtLtdhfTxtXr9Z1Go9Gv1Wq/NOYskCmXGHVMgZ1O51rWOBlz1by2Wq0vGnN6NVQG4jieHXfsYDCY1Zpz4sRUKpXfOcYea805cWIAMYgBxCAGEIMYQAwgBjGAGMQAYgAxiAHEIAYQgxhADCAGMYAYxABiADGIAcQgBhADiEEMIAYxgBjEAGJOMxwOp3OMndGac+LERFF0NO7YarV6pDWnD0p1AEOz2eyb13FPsdCa0wd/n/BnTv95xt1dleeST//fymJ6UefQ9RmzG6QcNwuFY7rfcYn5KflGP2r0rQPnquw9/ajxLm25/FayT0fe2bfdJ4ox6/g1evLOmu0+dYNpzpzfpCtvbNrOE/cx//xesix5FHDcb5GrsA3Jums1HGY82KcueSxZpMdzxSyLX5svJMbZ+SeOkdyV3JfcDP6cNstVlP/q+CHZlnyQdLL2jOEZHoVlpER0nYs47+Y95Bll5YR/lJWUEwEGANm3slOKH02hAAAAAElFTkSuQmCC",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.playbutton,
            null != this.layoutInfo && this.layoutInfo != e && "false" == this.layoutInfo.visible ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.startAutoPanEventHandler.Register(this.model_StartAutoPan.bind(this)),
            this.model.pauseAutoPanEventHandler.Register(this.model_PauseAutoPan.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateLayout(),
            this)
        },
        CreateElements: function() {
            if (null == this.layoutInfo || "none" != this.layoutInfo.display) {
                var t = $("<div></div>").attr("id", this.ELEMENT_ID_STORY).css({
                    display: "none",
                    "tap-highlight-color": "rgba(0,0,0,0)"
                }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
                  , e = {
                    "background-image": "url(" + this.PLAY_BUTTON_IMAGE_DATA + ")",
                    "background-repeat": "no-repeat",
                    "background-position": "center",
                    position: "absolute",
                    margin: "0px",
                    "z-index": "5000",
                    display: "none",
                    "tap-highlight-color": "rgba(0,0,0,0)"
                }
                  , i = {
                    "background-repeat": "no-repeat",
                    "background-position": "center",
                    position: "absolute",
                    margin: "0px",
                    "z-index": "5000",
                    display: "block",
                    "tap-highlight-color": "rgba(0,0,0,0)"
                };
                null != this.layoutInfo && 2 == this.layoutInfo.type ? (e["background-image"] = "url(" + this.PLAY_BUTTON_IMAGE_DATA2 + ")",
                e["background-size"] = "51px 35px",
                i["background-image"] = "url(" + this.PAUSE_BUTTON_IMAGE_DATA2 + ")",
                i["background-size"] = "51px 35px") : (e["background-image"] = "url(" + this.PLAY_BUTTON_IMAGE_DATA + ")",
                e["background-size"] = "28px 28px",
                e.padding = "10px",
                i["background-image"] = "url(" + this.PAUSE_BUTTON_IMAGE_DATA + ")",
                i["background-size"] = "28px 28px",
                i.padding = "10px"),
                $("<div></div>").attr("id", this.ELEMENT_ID_PLAY_BUTTON).css(e).addClass("playbutton").appendTo(t),
                $("<div></div>").attr("id", this.ELEMENT_ID_PAUSE_BUTTON).css(i).addClass("pausebutton").appendTo(t),
                t.on("click", this.storyDiv_Click.bind(this))
            }
        },
        UpdateLayout: function() {
            0 == $(document.getElementById(this.ELEMENT_ID_STORY)).length && this.CreateElements(),
            this.layoutInfo = t.Zenkei.layoutInfo.playbutton;
            var e = "28px"
              , i = "28px"
              , n = !1
              , o = !1
              , s = {};
            null != this.layoutInfo && (null != this.layoutInfo.width && (e = this.layoutInfo.width),
            null != this.layoutInfo.height && (i = this.layoutInfo.height),
            null != this.layoutInfo.top ? (s.top = this.layoutInfo.top,
            s.bottom = "",
            o = !0) : null != this.layoutInfo.bottom && (s.bottom = this.layoutInfo.bottom,
            s.top = "",
            o = !0),
            null != this.layoutInfo.left ? (s.left = this.layoutInfo.left,
            s.right = "",
            n = !0) : null != this.layoutInfo.right && (s.right = this.layoutInfo.right,
            s.left = "",
            n = !0)),
            n || (s.right = "10px",
            s.left = ""),
            o || (s.top = "10px",
            s.bottom = ""),
            s.width = e,
            s.height = i,
            $(document.getElementById(this.ELEMENT_ID_PLAY_BUTTON)).css(s),
            $(document.getElementById(this.ELEMENT_ID_PAUSE_BUTTON)).css(s)
        },
        UpdateVisibility: function() {
            return this.model.isHmdModeEnabled || null == this.model.spotJson || null != this.layoutInfo && "none" == this.layoutInfo.display ? ($(document.getElementById(this.ELEMENT_ID_STORY)).css("display", "none"),
            void 0) : ($(document.getElementById(this.ELEMENT_ID_STORY)).css("display", "block"),
            void 0)
        },
        model_PlayerSizeChanged: function() {
            this.UpdateLayout(),
            this.UpdateVisibility()
        },
        model_SpotSelect: function() {
            this.UpdateVisibility()
        },
        model_StartAutoPan: function() {
            $(document.getElementById(this.ELEMENT_ID_PLAY_BUTTON)).hide(),
            $(document.getElementById(this.ELEMENT_ID_PAUSE_BUTTON)).show()
        },
        model_PauseAutoPan: function() {
            $(document.getElementById(this.ELEMENT_ID_PLAY_BUTTON)).show(),
            $(document.getElementById(this.ELEMENT_ID_PAUSE_BUTTON)).hide()
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility()
        },
        storyDiv_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLAY_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.model.isAutoPanEnabled ? (this.controller.StopGyroMode(!1),
            this.controller.StopAutoPan(),
            this.controller.StopSlideshow()) : (this.controller.StartAutoPan(),
            this.controller.StartSlideshow())
        }
    },
    t.Zenkei != e && (t.Zenkei.Story = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        ELEMENT_ID_SPOT_TEXT: "spotText",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        Initialize: function() {
            return this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.layoutInfo = t.Zenkei.layoutInfo,
            null == this.layoutInfo.spottext ? null : (this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.walkThroughStartedEventHandler.Register(this.model_WalkThroughStarted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.shouldShowSpotTextChangedEventHandler.Register(this.model_shouldShowSpotTextChanged.bind(this)),
            this)
        },
        SetSpotText: function() {
            if ($(document.getElementById(this.ELEMENT_ID_SPOT_TEXT)).remove(),
            null != this.layoutInfo && null != this.layoutInfo.spottext && null != this.layoutInfo.spottext.size && "none" != this.layoutInfo.spottext.display && 0 !== this.layoutInfo.spottext.size.width && 0 !== this.layoutInfo.spottext.size.height && this.model.shouldShowSpotText) {
                var e = this.model.spotJson;
                if (null != e) {
                    var i = e.ac;
                    if (i) {
                        var n = 2;
                        null != this.layoutInfo.spottext.padding && (n = this.layoutInfo.spottext.padding);
                        var o = {
                            "z-index": 10,
                            "text-align": "-webkit-left",
                            width: this.layoutInfo.spottext.size.width - 2 * n + "px",
                            height: this.layoutInfo.spottext.size.height - 2 * n + "px",
                            "background-color": "rgba(255, 255, 255, 0.6)",
                            overflow: "auto",
                            "tap-highlight-color": "rgba(0,0,0,0)",
                            position: "absolute",
                            padding: n + "px",
                            "background-repeat": "no-repeat",
                            "background-position": "bottom right"
                        };
                        null != this.layoutInfo.spottext.size.top ? o.top = this.layoutInfo.spottext.size.top + "px" : null != this.layoutInfo.spottext.size.bottom && (o.bottom = this.layoutInfo.spottext.size.bottom + "px"),
                        null != this.layoutInfo.spottext.size.left ? o.left = this.layoutInfo.spottext.size.left + "px" : null != this.layoutInfo.spottext.size.right && (o.right = this.layoutInfo.spottext.size.right + "px"),
                        null != this.layoutInfo.spottext.fontsize && (o["font-size"] = this.layoutInfo.spottext.fontsize);
                        var i = $("<div></div>").attr("id", this.ELEMENT_ID_SPOT_TEXT).css(o).html(i).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
                        i.innerHeight() < i.get(0).scrollHeight && i.css("background-image", "url(" + t.Zenkei.Utility.downArrow + ")").on("scroll", function() {
                            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT)).css("background-image", "")
                        }
                        .bind(this)),
                        this.model.isHmdModeEnabled && i.css("display", "none")
                    }
                }
            }
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo,
            this.SetSpotText()
        },
        model_SpotSelect: function() {
            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT)).remove()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.SetSpotText()
        },
        model_WalkThroughStarted: function() {
            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT)).remove()
        },
        model_WalkThroughEnded: function() {
            this.SetSpotText()
        },
        model_HmdModeStart: function() {
            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT)).css("display", "none")
        },
        model_HmdModeStop: function() {
            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT)).css("display", "block")
        },
        model_shouldShowSpotTextChanged: function() {
            this.SetSpotText()
        }
    },
    t.Zenkei != e && (t.Zenkei.SpotText = i)
}(window),
function(t, e) {
    function i() {
        this.imageDataPlanIcon = new Array,
        this.imageDataRound = new Image,
        this.imageDataRoundPrev = new Image,
        this.imageDataFisheye = new Image,
        this.imageDataFisheyePrev = new Image,
        this.imageDataStandard = new Image,
        this.imageDataStandardPrev = new Image,
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        scopeColor: "rgba(217, 123, 163, 0.6)",
        walkThroughLineColor: "#0186cf",
        spotIconType: 0,
        spotIconPositionArray: null,
        maxSpotIconSize: 24,
        planIndex: -1,
        drawWidth: 0,
        drawHeight: 0,
        imageScale: 0,
        minScale: 1,
        maxScale: 2,
        imageWidth: 0,
        imageHeight: 0,
        imageOriginalWidth: 0,
        imageOriginalHeight: 0,
        imageLeft: 0,
        imageTop: 0,
        imageCenterX: .5,
        imageCenterY: .5,
        isImageDragging: !1,
        isImageDragBreaking: !1,
        touchStartX: 0,
        touchStartY: 0,
        imageDragBaseX: 0,
        imageDragBaseY: 0,
        lastImageDragDeltaX: 0,
        lastImageDragDeltaY: 0,
        imageDragBreakDeltaX: 0,
        imageDragBreakDeltaY: 0,
        imageDragBreakIntervalNumber: null,
        imageScaleDelta: 0,
        imageScaleIntervalNumber: null,
        lastPinchDistance: 0,
        isJustPlanChanged: !1,
        yawDiffToDrawScope: 1,
        fovDiffToDrawScope: 2,
        lastScopeDrawYaw: null,
        lastScopeDrawFov: null,
        shouldReduceViewChangeEvent: !1,
        shouldIgnoreViewChangeEvent: !1,
        isPinchScaling: !1,
        isModalHidden: !1,
        shouldAutoShow: !1,
        ELEMENT_ID_PLAYER: "player",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        ELEMENT_ID_PLAN_DISPLAY: "planDisplay",
        ELEMENT_ID_HEADER: "planViewHeader",
        ELEMENT_ID_FOTTER: "planViewFotter",
        ELEMENT_ID_CAROUSEL_BUTTON: "planViewCarouselButton",
        ELEMENT_ID_COUNT_LABEL: "planViewCountLabel",
        ELEMENT_ID_TITLE: "planViewTitle",
        ELEMENT_ID_CLOSE_BUTTON: "planViewCloseButton",
        ELEMENT_ID_PREV_BUTTON: "planViewPrevButton",
        ELEMENT_ID_NEXT_BUTTON: "planViewNextButton",
        ELEMENT_ID_PLAN_DRAW_AREA: "planDrawArea",
        ELEMENT_ID_PLAN_IMAGE: "planViewImage",
        ELEMENT_ID_SPOT_OVERLAY: "planViewSpotOverlay",
        ELEMENT_ID_SCOPE_OVERLAY: "planViewScopeOverlay",
        ELEMENT_ID_GOOGLE_MAP: "GoogleMaps",
        SCOPE_RADIUS: 60,
        CLOSE_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98FDQovOsyxN/4AAALBSURBVHja7ZpdTiJBEMfZvYB4AbNoQCP4eUt9l7NwiCXimyYgkohHoLtq/tW9D8zs9nZGRQR3erZ+Cck8DJXUf+pjumoaDUVRFEVRFEVRFEVRFEVRFCUky7ImM18T0eGmbBLRETNfZVnWTFKUxWKxA6AvIh7AiJlPPmuTmU8A3OU2bxaLxU5Sohhj9gAMnHPeOedyR6bW2u66Nq21PQBTEfFuiQcwMMbspRQpAxGBC8jFeTbG7K8h9AGAeSBKYRMABpWPnCzLdgH0i0iJycWZMHPvA+nTAzCJRQnwAPqVrjnMfP2GA6E4D0TUW1GUh1VsMvNVZYUhokMAozJHvPc+espja23nDVsdAJMw+iIbodAjIupUOp3yzhEWSedz8uvQobm19rxElEsAL4WN4j+hncDG4yY63pdgre0CeI4jJ3eq+IlzzovIjIjOAlHORWQW3lNoUlbMrbXHqbXsfQDj6Kn7+KnnaXVLRC0i2gcwitOnEDSKtrExppXkSx4zdwHcB46GKRWnxBDAME7BKNIKIe+ZudtImVycInIkdDSIgN8pk1//FWF/9FtGSvKiBHWjDWAepUhpx4qu4/eVORG1a3WgjIqqK0uXsjQrbhORJyK6qOVpm4jOANyKiBcRiUWJxZElRXE+rfUogohaAIZF5PhXCNJnSERf3n2+J6Lnt7pHy7qpNCKi87qK8tniOyOiy7qJsql2/VL5w+I/fMH70DynLkeCnyseCR6SFWfNQ+QPALcrHiInxpiDpET55NjhVESeVhw7zK21vVTSZxODqotw+P3OoGpa+UHVhkebbQDjFUebd0R09D8Nw7sA7pMfhmdZ1tzC+iRs96+tT24qv7Ld0sKtVVbMk1m4BY5sY0V7DOAx2RVtFDnbWOqPcpv95Jb6Qc3Z3cJnIJ2kPwNRFEVRFEVRFEVRFEVRFEXZHr8AxOMGzIz2vewAAAAASUVORK5CYII=",
        PREV_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABkCAYAAADE6GNbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0OTNlYzZiZS1lOGY0LTAzNDAtOTI4MS0xN2Q5OWVhYmZlYmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEJDNDI2QTFFRkQ3MTFFNDgyMTFCODg3NDYyNjhEOEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEJDNDI2QTBFRkQ3MTFFNDgyMTFCODg3NDYyNjhEOEQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDkzZWM2YmUtZThmNC0wMzQwLTkyODEtMTdkOTllYWJmZWJhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ5M2VjNmJlLWU4ZjQtMDM0MC05MjgxLTE3ZDk5ZWFiZmViYSIv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",
        NEXT_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABkCAYAAADE6GNbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0OTNlYzZiZS1lOGY0LTAzNDAtOTI4MS0xN2Q5OWVhYmZlYmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODJFODc0MDFFRkQ3MTFFNDgzRjBEOTdCNzM1NzkyMTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODJFODc0MDBFRkQ3MTFFNDgzRjBEOTdCNzM1NzkyMTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDkzZWM2YmUtZThmNC0wMzQwLTkyODEtMTdkOTllYWJmZWJhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ5M2VjNmJlLWU4ZjQtMDM0MC05MjgxLTE3ZDk5ZWFiZmViYSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn1N5M0AAATCSURBVHja7NxrTxRXGAfws8slwKfgSzQQ3hGrbaJVF9ZlL4CRWptUq63aeo2vtFXTem1rrIoCe8WFxXqJEgVeEMLGjwABPgUQbtvnv5lJJhNwL+fZcwacJ9nsHMJefjxnzpznzAyeXC4ndkJ4xQ4JF+JCXIgLcSEuxIV8rpBf6JFxrASTxiIe4enp6dzY2Bht5lJFvkbpo7oIaySbzUbHx8fFzMwM2oHW1tYNeg45KSGFIBHKRB4xOzub/0E0GsVTkDCY/4e3wz7SbUeYAQz9HBmJOz0jh6empp4BMTc3t+kvGJkJGZmJODEjBRG2zKB7xZwGOVIsYhPMgFO6Vs/k5OSTiYkJMT8/X9KbGN2s0xjNDuvMyBUgkIlSEbbMdNNmn07IF6urq2JhYUHqzSyYXl2Qb6hbRDs7O6Xf0MAcoc0nunb2LsIMMGJ6VGbGPmp1VyAzj1RAPFusNMYwpBqjkVTgj0J/nMe0+Z2OKUqEPjzOmJmjtPmvrrkWMElGDDLyUHXXskaKvkSAsZshM9/rqBA76MNTjJk5Rpv/6MiIGc/pS/gZMwPMcR01+yH68DRHZmKxGDLzA23+pWsVBZghWQx6gYFBRu7pWg7yE2aEAxOPx4H5kZp3da1r+QiTkcVsbGyIRCIBzElZjMwCXRthXshi1tfXrZg7OiCIg4T5jwOTTCaBOVUuhmPJ9ABHZtbW1qyYWzogZmZecWBSqRQwP1PzTx0Qszh7LYtBpTo4OAjMaWr+oQOC2EeYN7KYlZUVE3OGmjd0QBB7CfOOA5NOp4H5lZrXdUAQX3NglpeXxdDQEDDnCmEqeaKHBbO0tGTF/KYDYmJGOTDDw8PAXKDm77LTeJkYpS+xW7YEqK+vF+3t7SgBgLmoMiNm7KEP/8CcmWs6IIgvOTCLi4smBhm5qgNiYuJNTU3SmEwmA8wlaj7WAdGyHFSJeI+Fv2w2K/UmDQ0NwufzYafHfnJUNQSIXbIjFxBtbW1A4JhyWXVGRjkQGH4NBIbfS6q71jvmY8h1+zFEBeQtIfYwIy6o3tmB+IoRcWMrRCUhLIi6ujor4rzq4fc1B6K2tlb4/X4gbhZCVGLS+IoQezkQgUAACNTtZ1UfEF9yIGpqakzErWIRnJARQuyTRVRXV4uOjg4gblPzTCmv5ehaLwixnwMRDAaBwNLpT6rnWiMciKqqKimELGSYEAc4EKFQCIh75SLyGS3zdRlCHJRFeL1eK+KU6ml8mgPh8XhEOBwG4r4sohwIziO2cyAikQgQf1PzpOrCiu1kqIHAydATqivEJPMZ3QeC8YxusceRHXHBQGI7IApBcIVQkBHxqFKIT0EqcZnTMdXLQQPb7VqtzXb2fkJ0MSKe0maPimUary0TnIheVQjrXOslRz1hy8S3QmGYGfmIyqyxsZED0a8yE5vtI2VfUm5DaLmk3L6z4yL/3lIu8rcg0C+7hKaw1yNPW1pacKH+MzSKwRiIuE7EVoVVH2FEMRgLQvuNMFtViMDkqILrQxVnvzXJgkg4AVGo1O1vbm5ep+f8mGzFWBCOuVmsUM0eIwwquiiqOty+ZyCSTkLkY6fcUFnKAh1uccUo4BMODI/7f1FciAtxIS7EhbgQF+JCKhb/CzAAfMnqVf4MASsAAAAASUVORK5CYII=",
        CAROUSEL_BUTTON_NORMAL_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFFQkVEM0I5RjQ5NDExRTQ4MUYyQ0U2NkRBREJDQkNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFFQkVEM0JBRjQ5NDExRTQ4MUYyQ0U2NkRBREJDQkNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUVCRUQzQjdGNDk0MTFFNDgxRjJDRTY2REFEQkNCQ0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUVCRUQzQjhGNDk0MTFFNDgxRjJDRTY2REFEQkNCQ0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5zmbU4AAAA1klEQVR42mL8//8/AzUBCy6JhQsXigCpIiD2AWI1qPANIN4ExJPi4+PfYNPHiM2FQMOCgdRcIObHYd8nIE4CGrqWoIFQw1aD5Aj4DqQxFN1QFAOBhokCqTtAzEdkkIFcqgo09BVMgAlNQS4JhjFA1RYgC6Ab6EdGxPrgM1CDDAPV8RlIDviFz8AbZBh4D5+Bm8gwcCs+A6dAkwIDCclmAk4DoekpCZpoGYhI2EnIaRBrpEBTfhgQf8Zj2GdsuQRnXkYrHHyhSQMUm7egYTaRpMKBEgAQYABwm0kBu8GziQAAAABJRU5ErkJggg==",
        CAROUSEL_BUTTON_SELECTED_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNGNERFREE1RjQ5NDExRTQ5QzNEOEM0NzBFRjZDOUU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNGNERFREE2RjQ5NDExRTQ5QzNEOEM0NzBFRjZDOUU5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0Y0REVEQTNGNDk0MTFFNDlDM0Q4QzQ3MEVGNkM5RTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0Y0REVEQTRGNDk0MTFFNDlDM0Q4QzQ3MEVGNkM5RTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz44r/+NAAAA1klEQVR42mL8//8/AzUBCy6J90JCIkCqCIh9gFgNKnwDiDcB8STBd+/eYNPHiM2FQMOCgdRcIObHYd8nIE4CGrqWoIFQw1aD5Aj4DqQxFN1QFAOBhokCqTtAzEdkkIFcqgo09BVMgAlNQS4JhjFA1RYgC6Ab6EdGxPrgM1CDDAPV8RlIDviFz8AbZBh4D5+Bm8gwcCs+A6dAkwIDCclmAk4DoekpCZpoGYhI2EnIaRBrpEBTfhgQf8Zj2GdsuQRnXkYrHHyhSQMUm7egYTaRpMKBEgAQYADbpUxBBqegZQAAAABJRU5ErkJggg==",
        CAROUSEL_BUTTON_WIDTH: 28,
        Initialize: function() {
            if (this.layoutInfo = t.Zenkei.layoutInfo.planview,
            null == this.layoutInfo)
                return null;
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController;
            var i = $(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY));
            if (i.size() < 1)
                return i.remove(),
                null;
            this.shouldAutoShow = 1 == this.layoutInfo.autoshow,
            (this.model.userAgent.isiOS || this.model.userAgent.isAndroid) && (this.shouldReduceViewChangeEvent = !0,
            this.model.isTablet || (this.yawDiffToDrawScope = 3 * this.yawDiffToDrawScope,
            this.fovDiffToDrawScope = 3 * this.fovDiffToDrawScope)),
            this.layoutInfo.ismodal ? (this.isModalHidden = !0,
            this.CreateHeaderElement(!0),
            this.model.totalPlanCount > 1 && (this.CreatePrevButtonElement(),
            this.CreateNextButtonElement(),
            this.CreateFooterElement(!0))) : (this.layoutInfo.header != e && this.CreateHeaderElement(!1),
            this.model.totalPlanCount > 1 && (this.layoutInfo.prevbutton != e && this.CreatePrevButtonElement(),
            this.layoutInfo.nextbutton != e && this.CreateNextButtonElement(),
            this.layoutInfo.footer != e && this.CreateFooterElement(!1)));
            var n = $("<div></div>").attr("id", this.ELEMENT_ID_PLAN_DRAW_AREA).css({
                position: "absolute",
                width: "100%",
                overflow: "hidden"
            }).appendTo(i)
              , o = $("<img>").attr("id", this.ELEMENT_ID_PLAN_IMAGE).css({
                position: "absolute",
                "z-index": "0",
                margin: "0px",
                display: "none"
            }).appendTo(n)
              , s = o[0];
            s.addEventListener("load", function() {
                (0 == this.drawWidth || 0 == this.drawHeight) && this.UpdateLayout();
                var t = $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE));
                this.imageOriginalWidth = t.width(),
                this.imageOriginalHeight = t.height(),
                (0 == this.imageOriginalWidth || 0 == this.imageOriginalHeight) && (this.imageOriginalWidth = t[0].width,
                this.imageOriginalHeight = t[0].height),
                this.UpdateMinImageScale(),
                this.SetImageScale(this.minScale),
                this.SetImageCenter(.5, .5, !0),
                this.SetImageVisibility(!0),
                this.DrawSpotOverlay(),
                this.DrawScopeOverlay(!0),
                this.UpdateScopePosition()
            }
            .bind(this));
            var a = 2 * this.SCOPE_RADIUS;
            $("<canvas></canvas>").attr({
                id: this.ELEMENT_ID_SCOPE_OVERLAY,
                width: a,
                height: a
            }).css({
                position: "absolute",
                width: a + "px",
                height: a + "px"
            }).appendTo(n);
            var l = $("<canvas></canvas>").attr("id", this.ELEMENT_ID_SPOT_OVERLAY).css({
                position: "absolute",
                left: "0px",
                top: "0px",
                "z-index": "0",
                margin: "0px"
            }).appendTo(n);
            return this.model.userAgent.isTouchDevice ? (l.on("touchstart", $.proxy(this.overlay_TouchStart, this)),
            l.on("touchmove", $.proxy(this.overlay_TouchMove, this)),
            l.on("touchend", $.proxy(this.overlay_TouchEnd, this))) : (l.on("mousedown", $.proxy(this.overlay_MouseDown, this)),
            l.on("mousemove", $.proxy(this.overlay_MouseMove, this)),
            l.on("mouseup", $.proxy(this.overlay_MouseUp, this)),
            l.on("mousewheel", $.proxy(this.overlay_MouseWheel, this)),
            l.on("click", $.proxy(this.overlay_Click, this))),
            this.LoadColorInfo(),
            this.UpdateVisibility(),
            this.UpdateLayout(),
            this.imageDataRound.onload = function() {}
            ,
            this.imageDataRoundPrev.onload = function() {}
            ,
            this.imageDataFisheye.onload = function() {}
            ,
            this.imageDataFisheyePrev.onload = function() {}
            ,
            this.imageDataStandard.onload = function() {}
            ,
            this.imageDataStandardPrev.onload = function() {}
            ,
            1 == this.spotIconType ? (this.imageDataRound.src = "data:image/png;base64,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",
            this.imageDataRoundPrev.src = "data:image/png;base64,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",
            this.imageDataFisheye.src = "data:image/png;base64,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",
            this.imageDataFisheyePrev.src = "data:image/png;base64,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",
            this.imageDataStandard.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAuCAYAAACBHPFSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RDBBOEUyNDAxOEIxMUU0QkVBMEMwQjI5RUQzODk5RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RDBBOEUyNTAxOEIxMUU0QkVBMEMwQjI5RUQzODk5RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdEMEE4RTIyMDE4QjExRTRCRUEwQzBCMjlFRDM4OTlGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdEMEE4RTIzMDE4QjExRTRCRUEwQzBCMjlFRDM4OTlGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UfwiTQAABR9JREFUeNrsWntMW2UUP31AKS3QQVlZoQMcNAwYMuKEMSAxZDM6sxAd0ZFNRZcBmhDHsmiMZv9ojEGdCRphYYTs4ZJtxsXHTCALTscmGBkMDIzBBqVsY9gCo7Tl1XrO5d6K4gK9ZRdYesivPfc237nf7373O6+LyOl0godSjMjkOdaK+BVR6ckEpA/64a3aDfMO/nxr62n8yvXwJrzMXq/yP7Y9J7EAAqFEYGxyCM60f8DLhq9EDnkJzNgcT1ZD6sEdlNPHxLQdmgdqeBnwkyo5EpmeLKUYHgHxklguwu0JCSKKr3dYDMHrrXNzyCTCwJEoRxQs8c0MRHTxGPcjIo9IFDidDjDbb/O6+sj4Pd4zd+KfyWbktw9EEljlt2Y7ql+JMGI77VMWeKdu84raB0gADmUyrt3g9U5eEl4Sj3CwWzSRiKSgD06D9eoMUPvrIEimQXcohiH7XTCjO203XYbriCnHxPIjIcKJpofvhK3R+0Dlp5nz+xplLPOdodsFoxMmuNBTBb8YToLDOb08SCh8VPBq0qcQG/wkd6oOcQHRjIhhH9tORAJiW4BvSHaO/iBs1DwNVS37PQqYi7Ingv20sD/1a45AB2I3woKgQuEHSosQn7H6x1SCIF5ANEUGJUFJ6inQKB5bupWQSfyhIKUc1HIdHVL47EGcoINpxyR0D/8BdyxdTIKxWhENMas2gY9Y9gyeIBxFGINkq3cUoo3S33LBOjkiPIkd+hK8i9Hc49OP2OfAPKyutxqf+aM4qfv/Ji1VQHZkPmRHvQYSsc/reOoYJXGUA+2MexeOtb4t7OMU6h+JG9nVIziOyJ90jMORq0Xw/Y3DcwiQjE+NwfnuL+DLpr1Y1tq4JkEtYjgl7FnQBSYISyI9IpfxSChViDdIOdvxIXSg+5xPbg41wck/3+MOCxHVpGyJyBWWxIbQpzj1IuIJw/02aOw/t+DxLQM1cMPcSGocopuURLTJ3piHT0LlF4aBbC2pRq5TccX4DVMfuCOX+89wKtloVfoGQ5hinTAkQuThnHoLwRQiPSPNbtvpHb7GqWmsLfR0EcKQkEkUnDqKCCDFjpvWXbFOuTa/CsEYoIaaICTs05bZtfEwKf4+gbwiPSsm182YtgpDwmR11cUUautJiVZtdNtOtCrZtT1YW7xqbl4kKNcx25jGghZmutqzXe6CJUP3EqeSjXiyO2DpFs7Fttyr5VRKIeq1Sj1k6fIWPD5VmwNRQY8DmyQyS9I2WOe2h/OIxKW+U1wavYdN8jANOQDJmm3zjo1XZ0Hu+ve5wzIKeDT5+r7TwgY7k60fLhpOcIcliEoqiF5J+gRejD/ExJI5HTJfNVCOtDe5DKRiXy7aM8vX0P8t3LZ0Cp8Anu8qwyouFcID4ihWUFuxXASiws1YHKVpnwfjaDvcHesGehtFieLawMTZ++YIzLROswetvXCus3RpUvGZhO9NKEqpgDBlTBaeonB7EJGCk91FCd3/JHVnET8hKGXV/2Xrg4qmIqAG3pJVduRRDv++G/YkfkS5D4XyUtZlUgHUwMYSEcKM2ITIYmsJ6DQ3QPW1A7zriEUtTynFrmwuZpLC7THFtCrp5HUfvJ+MUHOzAhrvfAfUB15W3Y5WdJFtgz9DFAaxuJAtoFXGQoAsBJdBxDQHqMq7brrCVHyLMfmH1rIhV3lr+CoDb/PMS2KltjElYh+mA7GSRP5P6n+J3hRR6M9fwQuRKWL/QeU58PCt/hLIEK0C4W8BBgAbEaRhFuqnYgAAAABJRU5ErkJggg==",
            this.imageDataStandardPrev.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAuCAYAAACBHPFSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAABGVJREFUaEPtmXuIFWUYxrcbEZRREUShUUIQ3f7pvyz6K4JuFEV0oYsYRUQiRAXdNctNTU3JctdwSy2VLG3XkETzirWWrVS2pZa5piamW8aZ6/f2PO+ZjdPZ98zOnjNbu3Ee+A3vMO/7zTxnZr7LnAYRqZVHwZIqaQFjgNVuZhoKT1cPGlgM8tAYq/0soNY+kAUUn8mzuz8PSvDebdXx/r1sgmq1zpEF1NoHsoDiETy7O7JbsF8dL57KJqhu7Jvn6QvU2geygOK6CaVuoghq/w6OAyOrIDcTwGo/jRFoo2gCmzdA1crJRLVqBcNoAlcSi/ttZ1XEP623LzALE04x28wEfrxEC4omCkfskwxivMn6SlK76yb+S+omBgt1E33y3Anit1wr0aYZEn/XKm7fV+L2b5O4s02izbPEn3+DFJ4/0a7tBwNj4pljJVj2kLjuPdpkmtwf+yVcMU4Kzx5vt5WB3E14L50h8a7V2lQi7jwFrgNjwbgkfhysAqp4z2bxGs822+yLXE14U84Vd2iHNgNtB3eB5bpnawW4BXzBHdfdJd6MC82208jPxPiTxf3K61atBG8WQyjyJd7xCd6N6RJunCbx9x+LhIXkoKoZLGPAKYQ38XT7HBXIzUT02etaDvHxeUujOJJwXSMu6rTeNZgrhWsmqMFE/FDASZxEHQt756eQiwlv+gU6cUx0v27xS/vzrjHzS/GbrhTxj2oJxHfmMAN/9uVmvkUuJsINU7QUmgvaGQRLR5u5FsG7t7KE4vM4jUG0pcnMtcjFhDv0g5ZC93ATd32ObvYYM7cSJT3aI9y4owe0q7Zyy6nZhDd5uJZBHBSaGAQfPmDmphEsup2l1CKwjYE38xIzt5yaTfjNV2kZtA58zcCbebGZmwa750Rc4WhP5S+4ycwtp3YT73DcUrUBXWKxUSs3lX+usRcyCBbfaeeWUbsJ9i5FrQcdDLxZl5m5aXhTz2cptQt8xEDnVkZuObW/E6+co2XQXqCDRbD8YTM3jWDJ3Syl5oNvGHivXWTmllOzCeIO/6il0B3cuH0dmXuWHuKfN2kD0IPcuN/3Zu7hcjFRMk68DTYwCNrGmrkWwdLi+AhtBbMZcAZg5VrkYsKbeh4Gh1DLoeLIFQX6tdvKL0U7htDTEmi0bp3De3WpmW+RiwlScjf4XOh4wYuJ2ufgJMN75XuTztKFEedXiTja69Q82tLcKz+N3EwUXjhJ4l/4NKjWAn0sVJhXxV3tEm1tkejLebp2KJlrUZzxcuYr7mAnJofD7HNUID8TgIsad0DHO6oLPAa0z68g/s3FR6iTO1yLeK+ONNtOI1cTCqbY8XYdcHu0EUwCNwP+HXQfuBFgHq53TBXvXNXvdUQP+ZtI4JSh5K5UFL+lsnfqb5dcyoCZUNDP+3OuwOJnvETffqBjAd8H3qnw04niz726povvYWBN/EvUTQwW/qcmsMAPVz4xtFj7sl46pP8UFT+1DF2NoglyPWgcYjwJRolIw19GHJpZQ3m0JwAAAABJRU5ErkJggg==") : (this.imageDataRound.src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA21JREFUeNqslGtMU2cYx//nYrHeOJVrAaNioshsbIlDxcsMum+LonFqYhRM/LBkS/Sbl2/GC/vuB7NkBtFki9EIMZIsTOnc2KTcDkMholVqK1hpS7GF3mj7+rwHeuIlxmTZk5ye5rn8z3Oe9/cc4ANjjCl0HadLZR+bOhtTPqwTtN+T7TMi9Ztq0mnWMOSdUu6oPrQ+CUIdj2sxqykL21easNOah7Ki+ROSKBwRTv3drAV/3AxZ76R+Ux3dGtqp+OoDL9pfhjEUSepPvOeLwj05DedYBAc3mJXq8sVNVMPFrugdUas1dGtq7h7Dhd/d6ArFsZk62EdPty1bBJGyel1h3PrXB3sgBttCA07tWIJvKwt5+W5BEJozMwn+MRhgtvOdjF6TXWx9wdz+KItNp/ThJOi/OxBll+66tRzLOQdrexTgoSDX4K9W93h0SvnF4YUaTuBidQmObiuB1zuBa/ZBREUD9c0QDUVQWV6Iw1XFEKjD76jzxo5XMJuyFJpZHReqvd07hrYXYWzLnYtdFQWaiF19iZQpB5HJGNJgWGjOQ8/zcUiksmVFNrb3GXHfHUY51ZYVLa8V+YG0PQ3CGUuixpILs5KFlr+GEZDm4aHLh46uJ1C7n2Jo2Ac2fx7u971CZ68He9fmwpVIgddyDe3UumePeB0NVpYEqGNRGOMyenqd8Dq9FEnBPPoGyfWrYGASnvV78P2hKvJ79Fr5PahmqELLgB+i9Ab+15MQZQEpQYTLN4mBjhHkGmWYhYSemzE5AxvnRKU5VZYq+Ga1CT8H0hBLV6AoZy5kWcS4P46QLwGLEMdey1LCIaSDmhHqI2Ktw6EEmvr92FmRjxN7voDxz2E4ivOh2AogGkQEB30wOlw4s74MhUXZOHbTiRKDpNHONbhQ4y5bnvUZdXSZqG6h1ajbWowftgImhxuhx0lIlBUZCuBA1TJ8uaYAvxL5v72O4FBpNqiWCzXqQHK4rOdmgPzpnpuNBGMahBmbTqbZKPku2z1azpqzDtba79eBfG9FbnR6UX/Xo4HJmdpvzUfF8kXEDrSZXKdu+SwtC+bgdPUSHNho1ldE3/7M0toHxnHlwSj+GZnS2HrXSrMkbCxegNoNZnxtyeGumaV9d/u5g8Qmvlptaig0GT77GZkVacan7D9/2MiJ/8PeCjAAeFoHB74mSHEAAAAASUVORK5CYII=",
            this.imageDataRoundPrev.src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2NJREFUeNqsVG1PE1kUfmY6fYFBZrCARUGCMbjElzSIumCyRismxs369snESHdN/GB2E+Of8Ju/wFiIZuOXFTQkS3xZ1lURC1oUNEELiBShXUpfaKmdyfR6z0BFJMbEeJJ7J3PPfZ57zrnPucBnxhhT+TjHR4CttMCiT/0cJ9A0urfF/Kn5p/UIy+V8xsiEmrn7CCn/ILTJiOmzrS2D3LAZ8v4mWDZWx2ERfx3b5+0g34buNoh5Rk7i5Z923T+oJi7/hVjXA7x/M4mcrpvj/fg7xG/1IOa7Dq33GUXUvohZioiHeoQc2a77mKGN/8fMCBRPI+yba0HHaUOvkeh+jOzENKxOBc6WYyj4eQ/BjwqC0CEs5jumPxpQwxd90KMJlJ86jIIDTRBLV/OcrAu141ExfgClHPG1QyopxprzXth218cpIYlPXiM4riY7u02SUk4inziEZHgK4T+vwaFzEh74/PwcVtdvQ+nxZpQLIiI8/eSNuyhZ41R5zbxUo5b07R6kB1/BXuWCzCMhktn/euGSFDg0AY4s4FJcSD8fRjQwAGlHHRzVa5F+GQRhiYOI3On+IRipDIr37IRY7kS46w6UNBAdHkGwrxcjAT+iwSBWWQoQ6+nDdJ8fq/b9iNx8FoQlDkoNWmjhiu1beWElCcZwCBlZMQneTbyGwX3xiirU5ZpgswDhN/1Yd+YMPsVKK1UFxB4/RUoUkZqNQDRo0YL0+BSmYt2QZBnZIiuYICyDSnmxkU6yL4Kwun9A8S43LIEQNtVshF0pg2iRoCUi0KLTmC+xocKzw5RDHpsnGuCKdWszs5j714/C5iZUnj2F6JW/sT5VBml9Pd/lAJscwsiUHxW/eVBUUYnZC5cgFthNtRMHFbtNbt6Noi21ZlSkE6WyCs6TBxFyzSGZG0XCeIUxyyicpw9A3d4Avf8FMqMhFNZtAGGJI9+kseyDJ2zi+B+M9x1LXb3JjOkZltO0pXbVdWaEZ1jqWqe55+3R31n2Xh95YsSxrEUynfcQbbtuCpM0pexvNG+S8cJTTZJcMxQ1qbq0hav/F89Si+S7f7EBfdrDp0h03EFmeMzU1qcmyg7ItTUoPuyB7acGWqIXoJW6/+P10wIni1sb3b6Scqfq+NozskDSgS/ZNz9sfBHfwz4IMAAYOuhwTFbeggAAAABJRU5ErkJggg==",
            this.imageDataFisheye.src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAs9JREFUeNrMU11IU2EYfs4P0ynqWc6f+UNFUDIYbRUazkC061IoiaI0KAiC6CbIu4TK6KKLvPAmsIy6TIm8sdJMI+fPTplK05Vzmq79ON3m/nT7+s60YXN1EV30wnO+c877Ps95v+f9DpAQhBCB4iqFSLaHuJkTEnlM7Hp9YEOkWV8TjZI2k21VeCE60D3lhrgUiuW0ihRU71XgmDYHJQXpyxzLnGca33XGkncqwMc7adY30KVtgJLb39swMO+Fyb8e/+JrRwBW3xrMdj/OHFYJVeodHZQjiT2Md0RbraFLR+eIHbdfWjHsCaGCdlBHv67blQmWVhktXjz76ECvKwhdhgyNR4txsjRfotcyDNP50xP3m0kX0d0aInSbpKV7llidARJci8TNCdN7qytAWl9ZYzWamwbSM+6SUm5JQ9paw+eFVeGpwQbRG0ZLVREuVBbBZlvG495JBFgZ7Zsg4PGjVJ2Pc+WFYGiHl2jnjwYXoVKkCNSzBkmo/rnRjp5ZLyqVqTh+IC8m0ivOI6LIht8XRBQEGaocjH5dAkdVjuzJQvUHOfqsXqgpt6Rgdz0rDaRn2g1zcB01GiVUQgq6+mfg4tLwyeLA4PAUxJFpmGYcIOlp6PuwiCHjHE7sV8ISjkDiShqxqY1sjvgQNZbnGIj2AOQhHqNGM2xmG81EoFpYwXrZPsgIhy9jc7h8tpy+n4tz+V8O1capQteEEyy3Aud3H1ieQYRhYXH4MDH4DUo5DxUTjtfGuZLtiaf04r0+PHBFwWYBBdmp4HkWS84QPI4w9EwIdZp8XDl9cJvQ1ue7FNfMFifuv52BoTAXgi4PrIyFe9IBucGCprKd0JbkIjNTJtXfoGhKJiTFGIVmioo9MVjhKc4CRw3wm1w4pS6EXqsCx0kzwqhk69afNBnGyJ+jPZHzOyEJrRTjCQL9FLXJ6pNt7a+CxT+K/0/ohwADAO/+0rYRNHY3AAAAAElFTkSuQmCC",
            this.imageDataFisheyePrev.src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAr1JREFUeNrMU0tME1EUPfPph4xlhhZKxQDRqAkhoGlQERdEEF1oIurKjVRNiEujca1uXbh1Z/0kxo2CiYlExSZi+BS0CNWIdATCp7RYpsVOodO043sFI5bqwrjwJudN3tx7zjv3zhsgJ3RdlwguEvj0jeFby0m5PIYuXw62ZTdbX91p1TMZd1qelpa7+xD3jkKbDWdzxrISCHXVEA41gNteGQXHnp1ocnXS3DbPXbA/FImIizw6Ut5RKXb7EZSuN1iZnEUmlcpiZWoO0ee9UNyPofW/p4461jg/HRGrrTSR7OrBV1q4oGQdiM37YareCXqc5h9HzDOA5PQ8DDYRtraTKDjWSOknGIbpZNb6nUj1DUuhm26kIjHYzxxHweEGsMVW0pNhdXbElU4OoC2H3R3giwpReskF4wFnlDbEk8WVDkxJS089WZFiIiKcPoqlUBChBw9hThERYjyR+AarsxbFp1pgZ1iESftLT7pRVGqTyMxcdEZt6oteqKOfYSp3QCBOqMji6344eBFmjYE5CThEB9SRMUR8w+D3VMFcWQb1YwCUSzWo0G51yI90fBmFjXvB2m0Idb2EqAKRMRmBwX7IPi8igQAsXAGU3kHMD3phaapHJpEE5VIN2hq0mdVPbKohg+V5pMdmsCyIWYG56XGkSS66uRxVmQYYOSA0OYQt7e1Yz+U33ipAGXiHOMsivhgGm6YvOahTQQQVD3hBQHKTATrD/Eql1zX3ln64fBWcbwYQrDCJJWA5HlosDC0yj4TdCKllH3ZcOL9BaP3+BsGVmCwjcv8ZKuIl4CucxLcZ+qwfctAL67lmWHbVwmAppPXXCK7nE6IxQlATC8hQOj2w8uXQiaPIwicUHXFCrCcfhONo3VuCuvU/aT6M6H+Oe7mc3wlR3CLw5wj0EJzIV5+vtb8KFv8o/j+h7wIMADXVscS6iLSwAAAAAElFTkSuQmCC",
            this.imageDataStandard.src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVpJREFUeNpi/P//PwM1ABMDLQHQlfv/4wb7selhwWXYqh03GJZuu4kiFu2lzhDmoYFVPQsOGwyevPjCsOnMExRBeyNpsBw2PSAXOVy784bh05dfKBIPn3/CMB0kduLCMwGQHpgYHw8bg5aKCAMjyNP+eRsxbCcW+JnIMGyc5I87jEBAT4qPIcBeCczecPAew6Vnn3CqBRvEyMjIwMDMiCKhK8nHcHheKNDp7GB+caIJg03SaobLaF4G64WlI0ZWZgYGNlYUnB9lCDcEEhbsYDF0dWC9MBcxs7MxMHFxoNgkJ8WP4XwBfk4MdSC9cBexcLEz/OfjQsFrjmEG/q6LrzDUgfTCXcTCwwW0jhdF0+zbnxhY5lxkSHSUB/PXnXwGFkNXB9YLM4gJ7CJuDBdMu/sFiK8iBLCoYUJ2kbYUD0MsAyNZ6UhbCmI4OEFSI6ODXMQ4qMojqhkEEGAApyqBnHMJ5oMAAAAASUVORK5CYII=",
            this.imageDataStandardPrev.src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWRJREFUeNpi/P//PwM1ABMDLQHQlfv/4wb7selhwWXY0/UbGe6vXoMiphgawiAd6I9VPQsOGwy+PXnC8PTwURRBcUsLsBw2PSAXOXy+cYPh96fPKBJfgQahA5DYu1OnBUB6YGKsfLwMvBoaDIwgTx+JisWwnVggbWvNYLNsMe4wAgE+BTkGeQ93MPvhjp0Mnx48wqkWbBATIyMDIxNqSuCXk2Nw3rqRgQXodBBQy81h2Ovtz/DxEaphIL3wdMTMxMLAxsyGgrVSU+CGgG0EskFi6OpAeuEuYmPhYOBk50KxiUdWDsP5HAKCGOpAeuEGcbJxMnBz8KMoeLdtD4Ogow2K2KfDJzHUgfTCDeJm52X4zSmAouDb0csMz2p6GERCvcH8D9sPgMX40dSB9MINYgeaysPBi+GVn8euMDwFYrh3sahhR3YRp7I8AyOZ+ZIDqBcEwAmSGhkd5CLGQVUeUc0ggAADAHfMetxbXxX+AAAAAElFTkSuQmCC"),
            this.model.planSelectEventHandler.Register(this.model_PlanSelect.bind(this)),
            this.model.planSilentSelectEventHandler.Register(this.model_PlanSilentSelect.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.viewChangeEventHandler.Register(this.model_ViewChange.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.customDesignLayoutUpdatedEventHandler.Register(this.model_CustomDesignLayoutUpdated.bind(this)),
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.walkThroughStartedEventHandler.Register(this.model_WalkThroughStarted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.planButtonClickedEventHandler.Register(this.model_PlanButtonClicked.bind(this)),
            this.model.thumbnailButtonClickedEventHandler.Register(this.model_thumbnailButtonClicked.bind(this)),
            this.model.helpButtonClickedEventHandler.Register(this.model_helpButtonClicked.bind(this)),
            this.model.setPlanScaleEventHandler.Register(this.model_setPlanScale.bind(this)),
            this.model.setPlanLeftTopEventHandler.Register(this.model_setPlanLeftTop.bind(this)),
            this.model.planViewCloseButtonClickedEventHandler.Register(this.model_PlanViewCloseButtonClicked.bind(this)),
            this.model.setMapPlanCenterEventHandler.Register(this.model_SetMapPlanCenter.bind(this)),
            this.model.setMapPlanZoomEventHandler.Register(this.model_SetMapPlanZoom.bind(this)),
            this
        },
        CreateHeaderElement: function(t) {
            var e = $("<div></div>").attr("id", this.ELEMENT_ID_HEADER).css({
                position: "absolute",
                width: "100%",
                "background-color": "#333333"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY));
            $("<div></div>").attr("id", this.ELEMENT_ID_TITLE).css({
                position: "absolute",
                color: "#ffffff",
                "font-weight": "bold",
                "text-overflow": "ellipsis",
                overflow: "hidden",
                "white-space": "nowrap"
            }).html("&nbsp;").appendTo(e),
            t && $("<button></button>").attr("id", this.ELEMENT_ID_CLOSE_BUTTON).css({
                width: "35px",
                height: "35px",
                "background-image": "url(" + this.CLOSE_BUTTON_IMAGE + ")",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-size": "35px 35px",
                "background-color": "rgba(0,0,0,0)",
                border: "none",
                outline: "none",
                padding: "0px",
                position: "absolute",
                "tap-highlight-color": "rgba(0,0,0,0)",
                cursor: "pointer"
            }).appendTo(e).on("click", this.closeButton_Click.bind(this))
        },
        CreatePrevButtonElement: function() {
            $("<button></button>").attr("id", this.ELEMENT_ID_PREV_BUTTON).css({
                width: "25px",
                height: "50px",
                "z-index": "10",
                "background-image": "url(" + this.PREV_BUTTON_IMAGE + ")",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-size": "25px 50px",
                "background-color": "rgba(0,0,0,0)",
                border: "none",
                outline: "none",
                padding: "0px",
                position: "absolute",
                left: "0px",
                "margin-top": "-25px",
                "tap-highlight-color": "rgba(0,0,0,0)",
                cursor: "pointer"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY)).on("click", this.prevButton_Click.bind(this))
        },
        CreateNextButtonElement: function() {
            $("<button></button>").attr("id", this.ELEMENT_ID_NEXT_BUTTON).css({
                width: "25px",
                height: "50px",
                "z-index": "10",
                "background-image": "url(" + this.NEXT_BUTTON_IMAGE + ")",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-size": "25px 50px",
                "background-color": "rgba(0,0,0,0)",
                border: "none",
                outline: "none",
                padding: "0px",
                position: "absolute",
                right: "0px",
                "margin-top": "-25px",
                "tap-highlight-color": "rgba(0,0,0,0)",
                cursor: "pointer"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY)).on("click", this.nextButton_Click.bind(this))
        },
        CreateFooterElement: function(t) {
            var e = $("<div></div>").attr("id", this.ELEMENT_ID_FOTTER).css({
                position: "absolute",
                width: "100%"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY));
            t || e.css("border-top", "1px #a9a9a9 solid"),
            $("<div></div>").attr("id", this.ELEMENT_ID_COUNT_LABEL).css({
                position: "absolute",
                width: "80%",
                right: "4px",
                bottom: "2px",
                "text-align": "right"
            }).appendTo(e);
            var i = this.model.projectJson;
            if (null != i) {
                var n = i.pl;
                if (null == n || 0 != n.length)
                    for (var o = n.length, s = 0; o > s; s++) {
                        n[s];
                        var a = this.ELEMENT_ID_CAROUSEL_BUTTON + s;
                        $("<button></button>").attr("id", a).css({
                            width: this.CAROUSEL_BUTTON_WIDTH + "px",
                            "z-index": "10",
                            "background-image": "url(" + this.CAROUSEL_BUTTON_NORMAL_IMAGE + ")",
                            "background-repeat": "no-repeat",
                            "background-position": "center",
                            "background-color": "rgba(0,0,0,0)",
                            border: "none",
                            outline: "none",
                            padding: "0px",
                            position: "absolute",
                            "tap-highlight-color": "rgba(0,0,0,0)",
                            cursor: "pointer"
                        }).appendTo(e).on("click", this.carouselButton_Click.bind(this))
                    }
            }
        },
        PreventDefaultEventBehavior: function(t) {
            null != t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        GetPinchDistance: function(t, e, i, n) {
            return Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - n, 2))
        },
        CheckClick: function(t, e, i, n) {
            for (var o = this.spotIconPositionArray.length, s = 0; o > s; s++) {
                var a = this.spotIconPositionArray[s];
                if (Math.abs(t - a.x) <= 12 && Math.abs(e - a.y) <= 12) {
                    if (this.planIndex == this.model.planIndex) {
                        if (s != this.model.spotIndex) {
                            if (this.controller.hasAccessLogId) {
                                var l = {
                                    x: i,
                                    y: n
                                };
                                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_SPOTICON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, l)
                            }
                            this.controller.SelectSpot(s)
                        }
                    } else {
                        if (this.controller.hasAccessLogId) {
                            var l = {
                                x: i,
                                y: n
                            };
                            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_SPOTICON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, l)
                        }
                        this.controller.SelectPlanAndSpot(this.planIndex, s)
                    }
                    return
                }
            }
        },
        StopImageDrag: function() {
            this.isImageDragging = !1,
            this.imageDragBaseX = 0,
            this.imageDragBaseY = 0,
            this.lastImageDragDeltaX = 0,
            this.lastImageDragDeltaY = 0
        },
        StartImageDrag: function(t, e) {
            this.isImageDragging || (this.isImageDragging = !0,
            this.imageDragBaseX = t,
            this.imageDragBaseY = e)
        },
        StopImageDragBreak: function() {
            null != this.imageDragBreakIntervalNumber && (clearInterval(this.imageDragBreakIntervalNumber),
            this.imageDragBreakIntervalNumber = null),
            this.isImageDragBreaking = !1,
            this.imageDragBreakDeltaX = 0,
            this.imageDragBreakDeltaY = 0
        },
        StartImageDragBreak: function(t, e) {
            this.isImageDragBreaking || (Math.abs(t) < 5 && (t = 0),
            Math.abs(e) < 5 && (e = 0),
            (0 != t || 0 != e) && (this.isImageDragBreaking = !0,
            this.imageDragBreakDeltaX = t,
            this.imageDragBreakDeltaY = e,
            this.imageDragBreakIntervalNumber = setInterval(this.ImageDragBreakInterval.bind(this), 25)))
        },
        ImageDragBreakInterval: function() {
            var t = this.imageCenterX
              , e = this.imageCenterY
              , i = !1;
            if (0 != this.imageDragBreakDeltaX)
                if (this.imageDragBreakDeltaX = this.imageDragBreakDeltaX / 1.4,
                Math.abs(this.imageDragBreakDeltaX) < .1)
                    this.imageDragBreakDeltaX = 0;
                else {
                    var n = this.imageLeft - this.imageDragBreakDeltaX;
                    t = (.5 * this.drawWidth - n) / this.imageWidth,
                    i = !0
                }
            if (0 != this.imageDragBreakDeltaY)
                if (this.imageDragBreakDeltaY = this.imageDragBreakDeltaY / 1.4,
                Math.abs(this.imageDragBreakDeltaY) < .1)
                    this.imageDragBreakDeltaY = 0;
                else {
                    var o = this.imageTop - this.imageDragBreakDeltaY;
                    e = (.5 * this.drawHeight - o) / this.imageHeight,
                    i = !0
                }
            i && this.SetImageCenter(t, e, !0),
            this.DrawSpotOverlay(),
            this.UpdateScopePosition(),
            0 == this.imageDragBreakDeltaX && 0 == this.imageDragBreakDeltaY && this.StopImageDragBreak()
        },
        StopImageScale: function() {
            null != this.imageScaleIntervalNumber && (clearInterval(this.imageScaleIntervalNumber),
            this.imageScaleIntervalNumber = null),
            this.imageScaleDelta = 0
        },
        StartImageScale: function(t) {
            null != t && 0 != t && (this.imageScaleDelta = t,
            this.imageScaleIntervalNumber = setInterval(this.ImageScaleInterval.bind(this), 25))
        },
        ImageScaleInterval: function() {
            if (null == this.imageScaleDelta || 0 == this.imageScaleDelta)
                return this.StopImageScale(),
                void 0;
            if (this.imageScaleDelta = this.imageScaleDelta / 1.4,
            Math.abs(this.imageScaleDelta) < .005)
                return this.StopImageScale(),
                void 0;
            var t = this.imageScale + this.imageScaleDelta;
            this.SetImageScale(t),
            this.SetImageCenter(this.imageCenterX, this.imageCenterY, !0),
            this.DrawSpotOverlay(),
            this.UpdateScopePosition()
        },
        LoadColorInfo: function() {
            null != t.layoutInfo.scopecolor && t.layoutInfo.scopecolor != e && (this.scopeColor = t.layoutInfo.scopecolor),
            null != t.layoutInfo.spoticontype && t.layoutInfo.spoticontype != e && (this.spotIconType = t.layoutInfo.spoticontype),
            null != t.layoutInfo.walkthroughlinecolor && t.layoutInfo.walkthroughlinecolor != e && (this.walkThroughLineColor = t.layoutInfo.walkthroughlinecolor)
        },
        UpdateVisibility: function() {
            var t = "none"
              , i = null != this.layoutInfo && this.layoutInfo.ismodal;
            this.model.isHmdModeEnabled || null == !this.layoutInfo || "none" == this.layoutInfo.display || this.isModalHidden ? i && (this.isModalHidden || this.controller.FireModalVisibilityChangedEvent(!1),
            this.isModalHidden = !0) : t = "block",
            $(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY)).css("display", t),
            i || null == this.layoutInfo || (this.layoutInfo.header != e && (this.layoutInfo.header ? $(document.getElementById(this.ELEMENT_ID_HEADER)).css("display", "block") : $(document.getElementById(this.ELEMENT_ID_HEADER)).css("display", "none")),
            this.layoutInfo.prevbutton != e && (0 != this.planIndex && this.layoutInfo.prevbutton ? $(document.getElementById(this.ELEMENT_ID_PREV_BUTTON)).css("display", "block") : $(document.getElementById(this.ELEMENT_ID_PREV_BUTTON)).css("display", "none")),
            this.layoutInfo.nextbutton != e && (this.planIndex < this.model.totalPlanCount - 1 && this.layoutInfo.nextbutton ? $(document.getElementById(this.ELEMENT_ID_NEXT_BUTTON)).css("display", "block") : $(document.getElementById(this.ELEMENT_ID_NEXT_BUTTON)).css("display", "none")),
            this.layoutInfo.footer != e && (this.layoutInfo.footer ? $(document.getElementById(this.ELEMENT_ID_FOTTER)).css("display", "block") : $(document.getElementById(this.ELEMENT_ID_FOTTER)).css("display", "none")))
        },
        UpadteNavigationButtonVisibility: function() {
            this.model.totalPlanCount <= 1 || (0 == this.planIndex || null != this.layoutInfo && this.layoutInfo.prevbutton != e && !this.layoutInfo.prevbutton ? $(document.getElementById(this.ELEMENT_ID_PREV_BUTTON)).css("display", "none") : $(document.getElementById(this.ELEMENT_ID_PREV_BUTTON)).css("display", "block"),
            this.planIndex >= this.model.totalPlanCount - 1 || null != this.layoutInfo && this.layoutInfo.nextbutton != e && !this.layoutInfo.nextbutton ? $(document.getElementById(this.ELEMENT_ID_NEXT_BUTTON)).css("display", "none") : $(document.getElementById(this.ELEMENT_ID_NEXT_BUTTON)).css("display", "block"))
        },
        UpdateCarouselButtonImage: function() {
            if (!(this.model.totalPlanCount <= 1)) {
                var t = $(document.getElementById(this.ELEMENT_ID_FOTTER));
                if (0 != t.length)
                    for (var e = this.model.totalPlanCount, i = 0; e > i; i++) {
                        var n = this.ELEMENT_ID_CAROUSEL_BUTTON + i;
                        i == this.planIndex ? $(document.getElementById(n)).css("background-image", "url(" + this.CAROUSEL_BUTTON_SELECTED_IMAGE + ")") : $(document.getElementById(n)).css("background-image", "url(" + this.CAROUSEL_BUTTON_NORMAL_IMAGE + ")")
                    }
            }
        },
        UpdateCountLabel: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_COUNT_LABEL));
            0 != t.length && t.html(this.planIndex + 1 + " / " + this.model.totalPlanCount)
        },
        UpdateLayout: function() {
            if (null != this.layoutInfo) {
                var e = $(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY))
                  , i = $(document.getElementById(this.ELEMENT_ID_PLAN_DRAW_AREA))
                  , n = "relative"
                  , o = "#ffffff"
                  , s = ""
                  , a = {}
                  , l = {};
                if (this.layoutInfo.ismodal) {
                    var h = $(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
                      , r = h.width()
                      , d = h.height()
                      , c = h.position()
                      , u = t.Zenkei.Utility.GetPixelSize(this.layoutInfo.left, r)
                      , g = t.Zenkei.Utility.GetPixelSize(this.layoutInfo.top, d)
                      , p = r - 2 * u
                      , A = d - 2 * g;
                    a.left = u + c.left + "px",
                    a.top = g + c.top + "px",
                    a.width = p + "px",
                    a.height = A + "px"
                } else
                    null != this.layoutInfo.width && (a.width = this.layoutInfo.width),
                    null != this.layoutInfo.height && (a.height = this.layoutInfo.height),
                    null != this.layoutInfo.top ? (a.top = this.layoutInfo.top,
                    a.bottom = "") : null != this.layoutInfo.bottom && (a.bottom = this.layoutInfo.bottom,
                    a.top = ""),
                    null != this.layoutInfo.left ? (a.left = this.layoutInfo.left,
                    a.right = "") : null != this.layoutInfo.right && (a.right = this.layoutInfo.right,
                    a.left = "");
                null != this.layoutInfo.zindex && (a["z-index"] = this.layoutInfo.zindex),
                null != this.layoutInfo.position && (n = this.layoutInfo.position),
                null != this.layoutInfo.backgroundcolor && (o = this.layoutInfo.backgroundcolor),
                null != this.layoutInfo.float && (s = this.layoutInfo.float),
                a.position = n,
                a["background-color"] = o,
                a.overflow = "hidden",
                a["float"] = s,
                e.css(a);
                var m = e.width()
                  , E = e.height();
                (0 == m || 0 == E) && (m = e[0].clientWidth,
                E = e[0].clientHeight);
                var I = E
                  , T = $(document.getElementById(this.ELEMENT_ID_HEADER))
                  , v = 0;
                if (0 != T.length && "none" != T.css("display")) {
                    v = 44,
                    this.layoutInfo.headerheight && (v = t.Zenkei.Utility.GetPixelSize(this.layoutInfo.headerheight, E)),
                    T.css("height", v + "px");
                    var S = .4 * v
                      , f = $(document.getElementById(this.ELEMENT_ID_TITLE)).css("font-size", S + "px")
                      , y = f.height()
                      , w = .5 * (v - y)
                      , M = p - 2 * w;
                    if (f.css({
                        top: w + "px",
                        left: w + "px",
                        width: M + "px"
                    }),
                    this.layoutInfo.ismodal) {
                        var C = .5 * (v - 35);
                        $(document.getElementById(this.ELEMENT_ID_CLOSE_BUTTON)).css({
                            top: C + "px",
                            right: C + "px"
                        })
                    }
                    I = E - v
                }
                var O = $(document.getElementById(this.ELEMENT_ID_FOTTER));
                if (0 != O.length && (this.layoutInfo.ismodal || this.layoutInfo.footer)) {
                    var D = .5 * (m - this.CAROUSEL_BUTTON_WIDTH * this.model.totalPlanCount);
                    if (D > 0) {
                        var b = 44;
                        this.layoutInfo.fotterheight && (b = t.Zenkei.Utility.GetPixelSize(this.layoutInfo.fotterheight, E));
                        var L = E - b;
                        O.css({
                            display: "block",
                            height: b + "px",
                            top: L + "px"
                        }),
                        I -= b;
                        for (var N = this.model.totalPlanCount, B = 0; N > B; B++) {
                            var R = this.ELEMENT_ID_CAROUSEL_BUTTON + B;
                            $(document.getElementById(R)).css({
                                left: D + "px",
                                height: b + "px"
                            }),
                            D += this.CAROUSEL_BUTTON_WIDTH
                        }
                    } else
                        O.css("display", "none")
                }
                var G = v + .5 * I;
                $(document.getElementById(this.ELEMENT_ID_PREV_BUTTON)).css("top", G + "px"),
                $(document.getElementById(this.ELEMENT_ID_NEXT_BUTTON)).css("top", G + "px"),
                l.top = v + "px",
                l.width = "100%",
                l.height = I + "px",
                l.position = n,
                l["background-color"] = o,
                i.css(l),
                this.drawWidth = i.width(),
                this.drawHeight = i.height(),
                (0 == this.drawWidth || 0 == this.drawHeight) && (this.drawWidth = i[0].clientWidth,
                this.drawHeight = i[0].clientHeight),
                $(document.getElementById(this.ELEMENT_ID_GOOGLE_MAP)).css({
                    width: this.drawWidth + "px",
                    height: this.drawHeight + "px"
                }),
                $(document.getElementById(this.ELEMENT_ID_SPOT_OVERLAY)).attr({
                    width: this.drawWidth,
                    height: this.drawHeight
                }).css({
                    width: this.drawWidth + "px",
                    height: this.drawHeight + "px"
                })
            }
        },
        UpdateTitleLayout: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_HEADER));
            if (0 != t.length) {
                var e = t.height()
                  , i = .4 * e
                  , n = $(document.getElementById(this.ELEMENT_ID_TITLE)).css("font-size", i + "px")
                  , o = .5 * (e - n.height())
                  , s = this.drawWidth - 2 * o;
                n.css({
                    top: o + "px",
                    left: o + "px",
                    width: s + "px"
                })
            }
        },
        UpdateMinImageScale: function() {
            if (0 != this.drawWidth && 0 != this.drawHeight && 0 != this.imageOriginalWidth && 0 != this.imageOriginalHeight) {
                var t = this.drawWidth / this.imageOriginalWidth
                  , e = this.drawHeight / this.imageOriginalHeight;
                this.minScale = t > e ? e : t,
                this.minScale > 1 && (this.minScale = 1)
            }
        },
        GetImageVisibility: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE)).css("display");
            return "none" != t
        },
        SetImageVisibility: function(t) {
            t ? $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE)).css("display", "inline") : $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE)).css("display", "none")
        },
        SetImageScale: function(t) {
            if (t < this.minScale && (t = this.minScale),
            t > this.maxScale && (t = this.maxScale),
            this.imageScale = t,
            this.imageWidth = this.imageOriginalWidth * t,
            this.imageHeight = this.imageOriginalHeight * t,
            this.controller.hasAccessLogId) {
                var e = {
                    width: Math.floor(this.imageWidth),
                    height: Math.floor(this.imageHeight)
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_SCALE_CHANGE, e)
            }
            $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE)).css({
                width: this.imageWidth + "px",
                height: this.imageHeight + "px"
            })
        },
        SetImageCenter: function(t, e, i) {
            var n = .5 * this.drawWidth - t * this.imageWidth;
            if (this.imageWidth < this.drawWidth)
                t = .5,
                n = .5 * this.drawWidth - t * this.imageWidth;
            else if (n > 0)
                n = 0,
                t = (this.drawWidth / 2 - n) / this.imageWidth;
            else {
                var o = this.drawWidth - this.imageWidth;
                o > n && (n = o,
                t = (this.drawWidth / 2 - n) / this.imageWidth)
            }
            var s = .5 * this.drawHeight - e * this.imageHeight;
            if (this.imageHeight < this.drawHeight)
                e = .5,
                s = .5 * this.drawHeight - e * this.imageHeight;
            else if (s > 0)
                s = 0,
                e = (this.drawHeight / 2 - s) / this.imageHeight;
            else {
                var a = this.drawHeight - this.imageHeight;
                a > s && (s = a,
                e = (this.drawHeight / 2 - s) / this.imageHeight)
            }
            if (this.imageTop = s,
            this.imageLeft = n,
            this.imageCenterX = t,
            this.imageCenterY = e,
            i && this.controller.hasAccessLogId) {
                var l = {
                    top: s,
                    left: n
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_CENTER_CHANGE, l)
            }
            var h = $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE));
            h.css("left", n + "px"),
            h.css("top", s + "px")
        },
        SetImageLeftTop: function(t, e) {
            var i = .5
              , n = .5;
            this.imageWidth > this.drawWidth && (i = (.5 * this.drawWidth - t) / this.imageWidth),
            this.imageHeight > this.drawHeight && (n = (.5 * this.drawHeight - e) / this.imageHeight),
            this.imageTop = e,
            this.imageLeft = t,
            this.imageCenterX = i,
            this.imageCenterY = n;
            var o = $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE));
            o.css("left", t + "px"),
            o.css("top", e + "px")
        },
        ChangePlan: function() {
            if (this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale(),
            this.ClearSpotOverlay(),
            this.ClearScopeOverlay(),
            $(document.getElementById(this.ELEMENT_ID_GOOGLE_MAP)).remove(),
            !(this.planIndex < 0)) {
                var i = this.model.projectJson;
                if (null != i) {
                    var n = i.pl[this.planIndex];
                    if (null != n) {
                        if ($(document.getElementById(this.ELEMENT_ID_TITLE)).html(n.ab),
                        google !== e) {
                            if (1 === n.aa)
                                return $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE)).attr("src", ""),
                                $("#" + this.ELEMENT_ID_PLAN_DISPLAY + " > canvas").css("display", "none"),
                                $("<div></div>").attr("id", this.ELEMENT_ID_GOOGLE_MAP).css({
                                    width: this.drawWidth + "px",
                                    height: this.drawHeight + "px"
                                }).appendTo(document.getElementById(this.ELEMENT_ID_PLAN_DRAW_AREA)),
                                this.googleMap = new t.Zenkei.PlanView.GoogleMaps(n,this.planIndex,i.lo.aa,i.lo.ab,this.mapSpotMarker_Click,this.map_ZoomChanged.bind(this),this.map_CenterChanged.bind(this)),
                                void 0;
                            this.googleMap = null,
                            $("#" + this.ELEMENT_ID_PLAN_DISPLAY + " > canvas").css("display", "block")
                        }
                        var o = $(document.getElementById(this.ELEMENT_ID_PLAN_IMAGE));
                        if (0 == n.aa) {
                            if ("" == n.ac)
                                return;
                            var s = i.aa + n.ac
                              , a = o.attr("src");
                            a != s && o.css({
                                display: "none",
                                width: "",
                                height: "",
                                left: "",
                                top: ""
                            }).attr("src", s)
                        } else if (1 == n.aa) {
                            var l = {
                                getLang: function() {
                                    return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2)
                                }
                            }.getLang()
                              , h = "https://maps.google.com/maps/api/staticmap?center=" + n.lo.aa + "," + n.lo.ab
                              , r = i.lo.aa
                              , d = i.lo.ab;
                            (0 !== r || 0 !== d) && (h = h + "&markers=" + r + "," + d),
                            h = h + "&zoom=" + n.lo.ad + "&size=" + this.drawWidth + "x" + this.drawHeight + "&sensor=true&format=png&language=" + l,
                            o.attr("src", h)
                        }
                    }
                }
            }
        },
        GetScopeDirectionForGoogle: function() {
            if (this.planIndex != this.model.planIndex)
                return 0;
            var e = this.model.spotJson;
            if (null == e)
                return 0;
            var i = this.model.yaw;
            this.model.pitch;
            var n = this.model.spotLensType
              , o = e.al
              , s = e.ai;
            switch (e.aj,
            i *= t.Zenkei.Utility.DEG_TO_RAD,
            n) {
            case 0:
            case 1:
            case 2:
                i = 2 * Math.PI - i;
                break;
            case 3:
                i > 0 ? i = 2 * Math.PI - i : 0 > i && (i = -i)
            }
            return i = this.TranslateRange(i - s + o),
            i * t.Zenkei.Utility.RAD_TO_DEG
        },
        ClearSpotOverlay: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_SPOT_OVERLAY))
              , e = t[0]
              , i = t.width()
              , n = t.height();
            (0 == i || 0 == n) && (i = e.width,
            n = e.height);
            var o = e.getContext("2d");
            o.clearRect(0, 0, i, n),
            !this.model.userAgent.isAndroid || this.model.userAgent.isChrome || this.model.userAgent.isWindowsMobile || (t.css("display", "none"),
            e.offsetHeight,
            t.css("display", "inherit"))
        },
        DrawSpotOverlay: function() {
            if (!this.model.isWalkThroughZooming) {
                var t = this.model.projectJson;
                if (null != t) {
                    var e = t.pl[this.planIndex];
                    if (null != e && 1 != e.aa) {
                        var i = e.sp;
                        if (0 == this.imageOriginalWidth || 0 == this.imageOriginalHeight)
                            return !1;
                        var n = this.imageWidth
                          , o = this.imageHeight
                          , s = this.imageLeft
                          , a = this.imageTop;
                        this.ClearSpotOverlay();
                        var l = $(document.getElementById(this.ELEMENT_ID_SPOT_OVERLAY))[0].getContext("2d");
                        l.strokeStyle = this.walkThroughLineColor,
                        l.lineWidth = 2,
                        l.setLineDash && l.setLineDash([3]);
                        var h = i.length;
                        l.beginPath();
                        for (var r = 0; h > r; r++) {
                            var d = i[r];
                            if (d.ao)
                                for (var c = 0, u = d.wt.length; u > c; c++) {
                                    var g = this.controller.GetSpotIndexByDirectoryName(d.wt[c].aa);
                                    if (g > r) {
                                        var p = i[g];
                                        if (!p.ao)
                                            continue;
                                        l.moveTo(d.ae * n + s, d.af * o + a),
                                        l.lineTo(p.ae * n + s, p.af * o + a),
                                        l.stroke()
                                    }
                                }
                        }
                        l.closePath();
                        var A = this.planIndex != this.model.planIndex
                          , m = this.model.spotIndex;
                        this.spotIconPositionArray = new Array;
                        for (var r = 0; h > r; r++) {
                            var d = i[r]
                              , E = Math.floor(d.ae * n) + s
                              , I = Math.floor(d.af * o) + a;
                            if (this.spotIconPositionArray.push({
                                x: E,
                                y: I
                            }),
                            d.ao) {
                                var T = null;
                                if (A || r != m)
                                    switch (d.aa) {
                                    case 1:
                                    case 2:
                                        T = this.imageDataFisheye;
                                        break;
                                    case 3:
                                        T = this.imageDataRound;
                                        break;
                                    case 0:
                                    default:
                                        T = this.imageDataStandard
                                    }
                                else
                                    switch (d.aa) {
                                    case 1:
                                    case 2:
                                        T = this.imageDataFisheyePrev;
                                        break;
                                    case 3:
                                        T = this.imageDataRoundPrev;
                                        break;
                                    case 0:
                                    default:
                                        T = this.imageDataStandardPrev
                                    }
                                var v = Math.min(T.width, this.maxSpotIconSize);
                                l.drawImage(T, E - .5 * v, I - .5 * v, v, v)
                            }
                        }
                    }
                }
            }
        },
        ClearScopeOverlay: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_SCOPE_OVERLAY))
              , e = t.width()
              , i = t.height();
            if (0 == e || 0 == i) {
                var n = t[0];
                e = n.width,
                i = n.height
            }
            t.attr({
                width: e,
                height: i
            })
        },
        DrawScopeOverlay: function(t) {
            if (!this.model.isWalkThroughZooming && this.planIndex == this.model.planIndex) {
                var e = this.model.yaw
                  , i = this.model.horizontalFov;
                if (!(t && null != this.lastScopeDrawYaw && Math.abs(this.lastScopeDrawYaw - e) <= this.yawDiffToDrawScope && null != this.lastScopeDrawFov && Math.abs(this.lastScopeDrawFov - i) <= this.fovDiffToDrawScope)) {
                    this.lastScopeDrawYaw = e,
                    this.lastScopeDrawFov = i;
                    var n = this.model.spotJson;
                    if (null != n && n.ao && n.ap) {
                        var o = projectJson.pl[this.planIndex];
                        if (null != o) {
                            if (1 == o.aa) {
                                var s = this.GetScopeDirectionForGoogle();
                                return this.googleMap.SetScopeDirection(s),
                                void 0
                            }
                            this.ClearScopeOverlay();
                            var a = $(document.getElementById(this.ELEMENT_ID_SCOPE_OVERLAY))[0].getContext("2d")
                              , l = n.al
                              , h = n.ai;
                            if (e += 360,
                            h = -1 * h,
                            e = this.GetRadian(e),
                            l = 2 * Math.PI - l,
                            e = this.TranslateRange(e),
                            h = this.TranslateRange(h),
                            l = this.TranslateRange(l),
                            e = this.TranslateRange(e - h + l),
                            e = this.TranslateRange(e - .5 * Math.PI),
                            halfHorizontalFov = this.model.horizontalFov * Math.PI / 360,
                            0 == this.model.spotLensType) {
                                var r = .25 * Math.PI;
                                halfHorizontalFov > r && (halfHorizontalFov = r)
                            }
                            a.beginPath(),
                            a.moveTo(this.SCOPE_RADIUS, this.SCOPE_RADIUS),
                            a.arc(this.SCOPE_RADIUS, this.SCOPE_RADIUS, this.SCOPE_RADIUS, e + halfHorizontalFov, e - halfHorizontalFov, !0),
                            a.strokeStyle = "rgba(0, 0, 0, 0)",
                            a.fillStyle = this.scopeColor,
                            a.fill(),
                            a.stroke(),
                            a.closePath()
                        }
                    }
                }
            }
        },
        SetScopeOverlayVisibility: function(t) {
            t ? $(document.getElementById(this.ELEMENT_ID_SCOPE_OVERLAY)).show() : $(document.getElementById(this.ELEMENT_ID_SCOPE_OVERLAY)).hide()
        },
        UpdateScopePosition: function() {
            var t = this.model.spotJson;
            if (null != t && t.ao && t.ap) {
                var e = projectJson.pl[this.planIndex];
                if (null != e && 1 != e.aa) {
                    var i = Math.floor(t.ae * this.imageWidth) + this.imageLeft - this.SCOPE_RADIUS
                      , n = Math.floor(t.af * this.imageHeight) + this.imageTop - this.SCOPE_RADIUS;
                    $(document.getElementById(this.ELEMENT_ID_SCOPE_OVERLAY)).css({
                        left: i + "px",
                        top: n + "px"
                    })
                }
            }
        },
        GetRadian: function(t) {
            return t * Math.PI / 180
        },
        OpenModal: function(e) {
            if (null != this.layoutInfo && this.layoutInfo.ismodal) {
                e ? t.Zenkei.Utility.fadein($(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY))[0], 350) : $(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY)).css({
                    display: "block",
                    opacity: "1"
                });
                var i = !1;
                this.planIndex != this.model.planIndex && (i = !0,
                this.planIndex = this.model.planIndex),
                this.UpdateLayout(),
                this.UpdateTitleLayout();
                var n = this.model.planJson;
                null != n && 1 == n.aa && null != this.googleMap ? (this.ChangePlan(),
                this.googleMap.SelectSpot(this.model.spotJson, !1),
                this.googleMap.SetScopeDirection(this.GetScopeDirectionForGoogle())) : (i && (this.ChangePlan(),
                this.UpadteNavigationButtonVisibility(),
                this.UpdateCarouselButtonImage(),
                this.UpdateCountLabel()),
                this.UpdateLayout(),
                this.UpdateMinImageScale(),
                this.SetImageScale(this.minScale),
                this.SetImageCenter(.5, .5, !0),
                this.DrawSpotOverlay(),
                this.DrawScopeOverlay(!1),
                this.UpdateScopePosition()),
                this.isModalHidden = !1,
                this.controller.FireModalVisibilityChangedEvent(!0)
            }
        },
        CloseModal: function(e) {
            null != this.layoutInfo && this.layoutInfo.ismodal && (e ? t.Zenkei.Utility.fadeout($(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY))[0], 350) : $(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY)).css({
                display: "none",
                opacity: "1"
            }),
            this.isModalHidden = !0,
            this.controller.FireModalVisibilityChangedEvent(!1))
        },
        TranslateRange: function(t) {
            return t >= 2 * Math.PI ? arguments.callee(t - 2 * Math.PI) : 0 > t ? arguments.callee(t + 2 * Math.PI) : t
        },
        model_PlanSelect: function() {
            null != this.layoutInfo && this.layoutInfo.ismodal && (this.isModalHidden = !0,
            this.UpdateVisibility()),
            this.isJustPlanChanged = !0,
            this.planIndex = this.model.planIndex,
            this.ChangePlan(),
            this.UpadteNavigationButtonVisibility(),
            this.UpdateCarouselButtonImage(),
            this.UpdateCountLabel()
        },
        model_PlanSilentSelect: function() {
            this.planIndex = this.model.planIndexSilent,
            this.ChangePlan(),
            this.UpadteNavigationButtonVisibility(),
            this.UpdateCarouselButtonImage(),
            this.UpdateCountLabel()
        },
        model_SpotSelect: function() {
            null != this.layoutInfo && this.layoutInfo.ismodal && (this.isModalHidden = !0,
            this.UpdateVisibility()),
            this.shouldIgnoreViewChangeEvent = !1,
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale(),
            this.ClearScopeOverlay(),
            this.SetScopeOverlayVisibility(!1),
            this.lastScopeDrawYaw = null,
            this.lastScopeDrawFov = null,
            this.model.isWalkThroughExecuting && this.model.userAgent.canFadeAnimation && this.planIndex == this.model.planIndex && null != this.googleMap && this.googleMap.SelectSpot(this.model.spotJson, !this.isJustPlanChanged)
        },
        model_SpotImageLoadCompleted: function(t) {
            !t.isMainView || !t.isFrontView || this.planIndex < 0 || this.model.spotIndex < 0 || (this.planIndex == this.model.planIndex && null != this.googleMap && this.googleMap.SelectSpot(this.model.spotJson, !this.isJustPlanChanged),
            this.isJustPlanChanged = !1,
            this.DrawSpotOverlay(),
            this.DrawScopeOverlay(!1),
            this.UpdateScopePosition(),
            this.SetScopeOverlayVisibility(!0),
            this.shouldAutoShow && (this.shouldAutoShow = !1,
            this.OpenModal(!0),
            setTimeout(this.stopAutoPanAndSlideshow, 350)))
        },
        stopAutoPanAndSlideshow: function() {
            t.mainPlayerController.StopAutoPan(),
            t.mainPlayerController.StopSlideshow()
        },
        model_ViewChange: function() {
            return this.shouldReduceViewChangeEvent ? (this.shouldIgnoreViewChangeEvent || this.DrawScopeOverlay(!0),
            this.shouldIgnoreViewChangeEvent = !this.shouldIgnoreViewChangeEvent,
            void 0) : (this.DrawScopeOverlay(!0),
            void 0)
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility(),
            this.UpdateLayout(),
            this.UpdateMinImageScale(),
            this.SetImageScale(this.imageScale),
            this.SetImageCenter(this.imageCenterX, this.imageCenterY, !0),
            this.DrawSpotOverlay(),
            this.UpdateScopePosition(),
            this.planIndex == this.model.planIndex && null != this.googleMap && (this.googleMap.SelectSpot(this.model.spotJson, !1),
            this.googleMap.SetScopeDirection(this.GetScopeDirectionForGoogle()))
        },
        model_CustomDesignLayoutUpdated: function() {
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale(),
            this.layoutInfo = t.Zenkei.layoutInfo.planview,
            this.UpdateVisibility(),
            this.UpdateLayout(),
            this.DrawSpotOverlay(),
            this.UpdateScopePosition()
        },
        model_PlayerSizeChanged: function() {
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale(),
            this.ClearSpotOverlay(),
            this.layoutInfo = t.Zenkei.layoutInfo.planview,
            this.UpdateVisibility(),
            this.UpdateLayout(),
            this.UpdateMinImageScale(),
            this.SetImageScale(this.imageScale),
            this.SetImageCenter(this.imageCenterX, this.imageCenterY, !0),
            this.DrawSpotOverlay(),
            this.UpdateScopePosition(),
            this.planIndex == this.model.planIndex && null != this.googleMap && (this.googleMap.SelectSpot(this.model.spotJson, !1),
            this.googleMap.SetScopeDirection(this.GetScopeDirectionForGoogle()))
        },
        model_WalkThroughStarted: function() {
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale()
        },
        model_WalkThroughEnded: function() {
            this.DrawSpotOverlay(),
            this.DrawScopeOverlay(!0),
            this.UpdateScopePosition(),
            this.SetScopeOverlayVisibility(!0)
        },
        model_PlanButtonClicked: function(t) {
            return t ? (this.UpdateLayout(),
            this.UpdateMinImageScale(),
            this.SetImageScale(this.imageScale),
            this.SetImageCenter(this.imageCenterX, this.imageCenterY, !0),
            this.DrawSpotOverlay(),
            this.UpdateScopePosition(),
            void 0) : ("none" == $(document.getElementById(this.ELEMENT_ID_PLAN_DISPLAY)).css("display") ? this.OpenModal(!0) : this.CloseModal(!0),
            void 0)
        },
        model_thumbnailButtonClicked: function() {
            this.CloseModal(!0)
        },
        model_helpButtonClicked: function() {
            this.CloseModal(!0)
        },
        model_setPlanScale: function(t) {
            if (0 != this.imageOriginalWidth) {
                var e = t.width / this.imageOriginalWidth;
                this.SetImageScale(e),
                this.SetImageCenter(this.imageCenterX, this.imageCenterY, !1),
                this.DrawSpotOverlay(),
                this.UpdateScopePosition()
            }
        },
        model_setPlanLeftTop: function(t) {
            0 != this.imageOriginalWidth && (this.SetImageLeftTop(t.left, t.top),
            this.DrawSpotOverlay(),
            this.UpdateScopePosition())
        },
        model_PlanViewCloseButtonClicked: function() {
            this.CloseModal(!0)
        },
        model_SetMapPlanCenter: function(t) {
            null != this.googleMap && this.googleMap.SetCenter(t.latitude, t.longitude)
        },
        model_SetMapPlanZoom: function(t) {
            null != this.googleMap && this.googleMap.SetZoom(t)
        },
        overlay_TouchStart: function(t) {
            var e = t.originalEvent
              , i = e.touches;
            if (1 == i.length) {
                this.StopImageDrag(),
                this.StopImageDragBreak(),
                this.StopImageScale();
                var n = i[0]
                  , o = n.pageX
                  , s = n.pageY;
                if (this.touchStartX = o,
                this.touchStartY = s,
                this.controller.hasAccessLogId) {
                    var a = [{
                        x: o,
                        y: s
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START, a)
                }
                this.StartImageDrag(o, s)
            } else if (2 == i.length) {
                var l = i[0]
                  , h = i[1];
                if (this.controller.hasAccessLogId) {
                    var a = [{
                        x: l.pageX,
                        y: l.pageY
                    }, {
                        x: h.pageX,
                        y: h.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_START, a)
                }
                var r = this.GetPinchDistance(l.pageX, l.pageY, h.pageX, h.pageY);
                this.lastPinchDistance = r
            }
            this.PreventDefaultEventBehavior(e)
        },
        overlay_TouchMove: function(t) {
            var e = t.originalEvent
              , i = e.touches;
            if (1 == i.length) {
                if (this.isImageDragging) {
                    var e = t.originalEvent
                      , n = i[0]
                      , o = n.pageX
                      , s = n.pageY;
                    if (this.controller.hasAccessLogId) {
                        var a = [{
                            x: o,
                            y: s
                        }];
                        this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE, a)
                    }
                    var l = this.imageDragBaseX - o
                      , h = this.imageDragBaseY - s
                      , r = this.imageLeft - l
                      , d = this.imageTop - h
                      , c = (.5 * this.drawWidth - r) / this.imageWidth
                      , u = (.5 * this.drawHeight - d) / this.imageHeight;
                    this.SetImageCenter(c, u, !0),
                    this.DrawSpotOverlay(),
                    this.UpdateScopePosition(),
                    this.lastImageDragDeltaX = l,
                    this.lastImageDragDeltaY = h,
                    this.imageDragBaseX = o,
                    this.imageDragBaseY = s
                }
            } else if (2 == i.length) {
                var g = i[0]
                  , p = i[1];
                if (this.controller.hasAccessLogId) {
                    var a = [{
                        x: g.pageX,
                        y: g.pageY
                    }, {
                        x: p.pageX,
                        y: p.pageY
                    }];
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_MOVE, a)
                }
                var A = this.GetPinchDistance(g.pageX, g.pageY, p.pageX, p.pageY)
                  , m = this.lastPinchDistance - A
                  , E = this.imageScale - m / (.5 * (this.drawWidth + this.drawHeight)) * this.imageScale;
                this.SetImageScale(E),
                this.SetImageCenter(this.imageCenterX, this.imageCenterY, !1),
                this.DrawSpotOverlay(),
                this.UpdateScopePosition(),
                this.lastPinchDistance = A
            }
            this.PreventDefaultEventBehavior(e)
        },
        overlay_TouchEnd: function(t) {
            var e = t.originalEvent
              , i = e.changedTouches;
            if (this.controller.hasAccessLogId) {
                for (var n = i.length, o = new Array, s = 0; n > s; s++) {
                    var a = {
                        x: i[s].pageX,
                        y: i[s].pageY
                    };
                    o.push(a)
                }
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_TOUCH_END, o)
            }
            if (this.isImageDragging) {
                this.StartImageDragBreak(1.4 * this.lastImageDragDeltaX, 1.4 * this.lastImageDragDeltaY);
                var l = i[0]
                  , h = l.pageX
                  , r = l.pageY;
                if (Math.abs(this.touchStartX - h) < 10 && Math.abs(this.touchStartY - r) < 10) {
                    var d = $(document.getElementById(this.ELEMENT_ID_SPOT_OVERLAY)).offset();
                    null != d && (h -= d.left,
                    r -= d.top),
                    this.CheckClick(h, r, l.pageX, l.pageY)
                }
            }
            this.StopImageDrag(),
            this.PreventDefaultEventBehavior(e)
        },
        overlay_MouseDown: function(t) {
            this.StopImageDrag(),
            this.StopImageDragBreak(),
            this.StopImageScale();
            var e = t.originalEvent;
            this.StartImageDrag(e.clientX, e.clientY)
        },
        overlay_MouseMove: function(t) {
            if (this.isImageDragging) {
                var e = t.originalEvent
                  , i = e.clientX
                  , n = e.clientY
                  , o = this.imageDragBaseX - i
                  , s = this.imageDragBaseY - n
                  , a = this.imageLeft - o
                  , l = this.imageTop - s
                  , h = (.5 * this.drawWidth - a) / this.imageWidth
                  , r = (.5 * this.drawHeight - l) / this.imageHeight;
                this.SetImageCenter(h, r, !0),
                this.DrawSpotOverlay(),
                this.UpdateScopePosition(),
                this.lastImageDragDeltaX = o,
                this.lastImageDragDeltaY = s,
                this.imageDragBaseX = i,
                this.imageDragBaseY = n
            }
        },
        overlay_MouseUp: function() {
            this.isImageDragging && this.StartImageDragBreak(1.4 * this.lastImageDragDeltaX, 1.4 * this.lastImageDragDeltaY),
            this.StopImageDrag()
        },
        overlay_Click: function(t) {
            if (!(null == this.spotIconPositionArray || this.spotIconPositionArray.length <= 0)) {
                var e = t.offsetX
                  , i = t.offsetY
                  , n = t.originalEvent;
                this.CheckClick(e, i, n.clientX, n.clientY)
            }
        },
        overlay_MouseWheel: function(t) {
            this.StopImageDrag(),
            this.StopImageScale();
            var e = t.originalEvent
              , i = 0
              , n = e.wheelDelta;
            if (null != n && 0 != n)
                i = n;
            else {
                var o = e.detail;
                null != o && 0 != o && (i = o)
            }
            i = .001 * i * this.imageScale,
            this.StartImageScale(i)
        },
        closeButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_CLOSE_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.FirePlanViewCloseButtonClickedEvent()
        },
        prevButton_Click: function(t) {
            if (!(null == this.planIndex || this.planIndex <= 0)) {
                var e = this.planIndex - 1;
                if (this.controller.hasAccessLogId) {
                    var i = t.originalEvent
                      , n = {
                        x: i.clientX,
                        y: i.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_PREV_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, n)
                }
                null != this.layoutInfo && this.layoutInfo.ismodal ? this.controller.SelectPlanSilent(e) : this.controller.SelectPlan(e)
            }
        },
        nextButton_Click: function(t) {
            var e = this.model.totalPlanCount;
            if (!(null == this.planIndex || this.planIndex < 0 || this.planIndex >= e - 1)) {
                var i = this.planIndex + 1;
                if (this.controller.hasAccessLogId) {
                    var n = t.originalEvent
                      , o = {
                        x: n.clientX,
                        y: n.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_NEXT_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, o)
                }
                null != this.layoutInfo && this.layoutInfo.ismodal ? this.controller.SelectPlanSilent(i) : this.controller.SelectPlan(i)
            }
        },
        carouselButton_Click: function(t) {
            var e = new String(t.currentTarget.id)
              , i = parseInt(e.replace(this.ELEMENT_ID_CAROUSEL_BUTTON, ""));
            if (i != this.planIndex) {
                if (this.controller.hasAccessLogId) {
                    var n = t.originalEvent
                      , o = {
                        x: n.clientX,
                        y: n.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_CIRCLE_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, o)
                }
                null != this.layoutInfo && this.layoutInfo.ismodal ? this.controller.SelectPlanSilent(i) : this.controller.SelectPlan(i)
            }
        },
        mapSpotMarker_Click: function() {
            if (t.mainPlayerController.hasAccessLogId) {
                var i = null
                  , n = null;
                if (event.changedTouches != e && 1 == event.changedTouches.length) {
                    var o = event.changedTouches[0];
                    i = o.pageX,
                    n = o.pageY
                } else
                    event.clientX != e && (i = event.clientX,
                    n = event.clientY);
                if (null != i) {
                    var s = {
                        x: i,
                        y: n
                    };
                    t.mainPlayerController.LogOperation(t.mainPlayerController.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW_SPOTMARKER, t.mainPlayerController.constValues.BROWSE_LOG_ACTION_ID_CLICK, s)
                }
            }
            t.mainPlayerController.SelectPlanAndSpot(this.planIndex, this.spotIndex)
        },
        map_ZoomChanged: function(t) {
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_MAP_ZOOM_CHANGE, t)
        },
        map_CenterChanged: function(t, e) {
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLANVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_MAP_CENTER_CHANGE, t + "," + e)
        }
    },
    t.Zenkei != e && (t.Zenkei.PlanView = i)
}(window);
var scope = null;
!function(t, e) {
    function i(t, e, i, n, o, s, a) {
        this.Initialize(t, e, i, n, o, s, a)
    }
    i.prototype = {
        map: null,
        spotMarkerClickEventCallBack: null,
        zoomChangedEventCallBack: null,
        centerChangedEventCallBack: null,
        ELEMENT_ID_GOOGLE_MAP: "GoogleMaps",
        SPOT_MARKER_ICON_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHASURBVHjajJIxSAJhFMefnt+BnVzWckLFNeQQCFEQREFBNERLSIMNjRVkezlUQ9DWUmA0BA3S0Nba0hJEEUVJmGKUREuUnsiJlpxf79kValY++B3fe9/7f/fe+z4LVFo/Mol0mP49so8cV+WBBdlEOGMyV5Rh7nKNcFF0cooh24jwlUgWRPxutx88nhVwOJRSUNdfIBJZg1hsg9wdZIZUg8iW2z0PAwNBEAQHGAZAsQggihKo6ijkchlIJk97MO/Eih+fzSbhyQEoFD4Tv4zWFPN4FoGxRgpNkKC9qakLy2itSC4XNTQo0NzcTW4bCQzDyAPn8KdRDulJcJNKXYGmXYPN9jNRwC7T6Vvs4YLcKAlCKMxfXgbw9xwslrJZm2va45y6gRBN6RVJ6/rdWDb7iFMZ/+6F/nh2NgeJxB65C8iBYB52jlg17WqIMSe4XH2lUuLxXQiHl2l/HVmt1dsR3bTX+8R9Pp3b7S00CiqeffdUJYgWi2/TjDmAyjNLmaX4XxM8lCSVy3InnR4uez6/2pT54IglqMNU5N0U9NYjoLt5QDKIXL1Z426BbuEZyZuifwVkmimEegUJRKq18SHAAJM0l0WNxRYoAAAAAElFTkSuQmCC",
        Initialize: function(t, e, i, n, o, s, a) {
            return google && google.maps && null != t ? (this.spotMarkerClickEventCallBack = o,
            this.zoomChangedEventCallBack = s,
            this.centerChangedEventCallBack = a,
            this.SetPlan(t, e),
            this.AddProjectMarker(i, n),
            this) : null
        },
        SetPlan: function(t, e) {
            if (null != t) {
                var i = t.lo.ac
                  , n = google.maps.MapTypeId.ROADMAP;
                1 == i ? n = google.maps.MapTypeId.SATELLITE : 2 == i && (n = google.maps.MapTypeId.HYBRID);
                var o = new google.maps.LatLng(t.lo.aa,t.lo.ab)
                  , s = {
                    zoom: t.lo.ad,
                    center: o,
                    mapTypeId: n,
                    mapTypeControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_TOP
                    },
                    panControl: !1,
                    streetViewControl: !1,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_TOP,
                        style: google.maps.ZoomControlStyle.SMALL
                    }
                };
                this.map = new google.maps.Map(document.getElementById(this.ELEMENT_ID_GOOGLE_MAP),s),
                google.maps.event.addListener(this.map, "zoom_changed", this.map_ZoomChanged.bind(this)),
                google.maps.event.addListener(this.map, "center_changed", this.map_CenterChanged.bind(this));
                for (var a = t.sp, l = new Array, h = a.length, r = 0; h > r; r++) {
                    var d = a[r]
                      , c = d.ad;
                    if (l.push(c),
                    d.ao) {
                        var u = new google.maps.LatLng(d.ag,d.ah)
                          , g = new google.maps.Marker({
                            icon: this.SPOT_MARKER_ICON_DATA,
                            map: this.map,
                            position: u,
                            zindex: google.maps.Marker.MAX_ZINDEX + 1,
                            planIndex: e,
                            spotIndex: r
                        });
                        google.maps.event.addListener(g, "click", this.spotMarkerClickEventCallBack);
                        for (var p = d.wt, A = p.length, m = 0; A > m; m++) {
                            var E = p[m]
                              , I = E.aa;
                            if (-1 == l.indexOf(I))
                                for (var T = r + 1; h > T; T++) {
                                    var v = a[T];
                                    if (v.ad == I) {
                                        if (v.ao) {
                                            var S = new google.maps.LatLng(v.ag,v.ah);
                                            new google.maps.Polyline({
                                                clickable: !1,
                                                map: this.map,
                                                path: [u, S],
                                                strokeColor: "#0000FF",
                                                strokeOpacity: 1,
                                                strokeWeight: 1
                                            })
                                        }
                                        break
                                    }
                                }
                        }
                    }
                }
            }
        },
        AddProjectMarker: function(t, e) {
            if (null != this.map && null != t && null != e && (0 != t || 0 != e)) {
                var i = new google.maps.LatLng(t,e);
                new google.maps.Marker({
                    map: this.map,
                    position: i,
                    zindex: google.maps.Marker.MAX_ZINDEX + 1
                })
            }
        },
        SelectSpot: function(t, e) {
            if (null != scope && (scope.setMap(null),
            scope = null),
            null != t && t.ao) {
                var i = new google.maps.LatLng(t.ag,t.ah);
                e && this.map.panTo(i),
                t.ap && (scope = new Scope(i,this.map),
                scope.SetShouldIgnoreEvents(!0),
                scope.registerTurnListener(this.scope_Turned))
            }
        },
        SetScopeDirection: function(t) {
            null != scope && scope.setDirection(t)
        },
        SetCenter: function(t, e) {
            if (null != this.map) {
                var i = new google.maps.LatLng(t,e);
                this.map.setCenter(i)
            }
        },
        SetZoom: function(t) {
            null != this.map && this.map.setZoom(t)
        },
        map_ZoomChanged: function() {
            null != scope && scope.RecalculateCenter(),
            this.zoomChangedEventCallBack(this.map.getZoom())
        },
        map_CenterChanged: function() {
            var t = this.map.getCenter();
            this.centerChangedEventCallBack(t.lat(), t.lng())
        },
        scope_Turned: function() {}
    },
    t.Zenkei != e && t.Zenkei.PlanView != e && (t.Zenkei.PlanView.GoogleMaps = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        width: 0,
        height: 0,
        minWidth: 0,
        ELEMENT_ID_PLAN_LIST: "planList",
        Initialize: function() {
            var e = $(document.getElementById(this.ELEMENT_ID_PLAN_LIST));
            if (0 == e.length)
                return null;
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController;
            var i = this.model.projectJson;
            return null == i || null == i.pl || i.pl.length < 2 ? (e.remove(),
            null) : (e.css("visibility", "visible").on("change", this.select_Change.bind(this)),
            this.model.planSelectEventHandler.Register(this.model_PlanSelect.bind(this)),
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.UpdateLayoutInfo(),
            this.CreateElements(),
            this)
        },
        UpdateLayoutInfo: function() {
            this.layoutInfo = t.Zenkei.layoutInfo,
            this.layoutInfo.planlist.size !== e && (this.width = this.layoutInfo.planlist.size.width,
            this.height = this.layoutInfo.planlist.size.height,
            this.minWidth = this.layoutInfo.planlist.size["min-width"],
            this.minWidth || (this.minWidth = "0%"))
        },
        CreateElements: function() {
            var t = this.model.projectJson;
            if (null == t || null == t.pl || t.pl.length < 2)
                return $(document.getElementById(this.ELEMENT_ID_PLAN_LIST)).remove(),
                void 0;
            var e = $(document.getElementById(this.ELEMENT_ID_PLAN_LIST));
            if (0 != e.length) {
                e.css({
                    width: this.width + "px",
                    "font-size": "large",
                    "text-align": "-webkit-left",
                    visibility: "visible",
                    "min-width": this.minWidth
                });
                for (var i = t.pl.length, n = 0; i > n; n++) {
                    var o = t.pl[n];
                    o.ad && $("<option></option").val(n).text(o.ab).appendTo(document.getElementById(this.ELEMENT_ID_PLAN_LIST))
                }
            }
        },
        model_PlayerSizeChanged: function() {
            this.UpdateLayoutInfo(),
            $(document.getElementById(this.ELEMENT_ID_PLAN_LIST)).css({
                width: this.width,
                height: this.height
            })
        },
        model_PlanSelect: function() {
            $(document.getElementById(this.ELEMENT_ID_PLAN_LIST)).val(this.model.planIndex)
        },
        model_HmdModeStart: function() {
            $(document.getElementById(this.ELEMENT_ID_PLAN_LIST)).css("display", "none")
        },
        model_HmdModeStop: function() {
            $(document.getElementById(this.ELEMENT_ID_PLAN_LIST)).css("display", "block")
        },
        select_Change: function() {
            var t = parseInt($("#" + this.ELEMENT_ID_PLAN_LIST + " option:selected").val());
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PLAN_COMBOBOX, this.controller.constValues.BROWSE_LOG_ACTION_ID_CHANGE, t),
            this.controller.SelectPlanAndSpot(t, 0)
        }
    },
    t.Zenkei != e && (t.Zenkei.PlanList = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        width: 0,
        height: 0,
        minWidth: 0,
        isSelect: 0,
        thumbnailImageWidth: 100,
        thumbnailImageHeight: 75,
        ELEMENT_ID_SPOT_LIST: "spotList",
        ELEMENT_ID_PLAYER: "player",
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController;
            var e = $(document.getElementById(this.ELEMENT_ID_SPOT_LIST));
            return e.size() < 1 ? (e.remove(),
            null) : (this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.planSelectEventHandler.Register(this.model_PlanSelect.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.UpdateLayout(),
            0 == this.isSelect ? this.CreateElementsForThumbnailList() : this.CreateElementsForComboBox(),
            this)
        },
        CreateElementsForThumbnailList: function() {
            var t = {
                "text-align": "-webkit-left",
                width: this.width + "px",
                height: this.height + "px",
                "font-size": "large",
                "min-width": this.minWidth,
                overflow: "auto",
                "overflow-y": "hidden"
            }
              , e = $(document.getElementById(this.ELEMENT_ID_SPOT_LIST));
            e.length < 1 ? $("<div></div>").attr("id", this.ELEMENT_ID_SPOT_LIST).css(t).appendTo(document.getElementById(this.ELEMENT_ID_PLAYER)) : e.css(t)
        },
        CreateElementsForComboBox: function() {
            var t = {
                width: this.width + "px",
                "font-size": "large",
                "text-align": "-webkit-left",
                "min-width": this.minWidth
            }
              , e = $(document.getElementById(this.ELEMENT_ID_SPOT_LIST));
            e.length < 1 ? $("<select></select>").attr({
                id: this.ELEMENT_ID_SPOT_LIST
            }).css(t).appendTo(document.getElementById(this.ELEMENT_ID_PLAYER)) : e.css(t),
            e.on("change", this.select_Change.bind(this))
        },
        UpdateLayout: function() {
            if (this.layoutInfo = t.Zenkei.layoutInfo,
            this.layoutInfo.spotlist.size === e)
                throw new Error("[Error] SpotList Class: size of layoutinfo is NEED");
            this.width = this.layoutInfo.spotlist.size.width,
            this.height = this.layoutInfo.spotlist.size.height,
            this.minWidth = this.layoutInfo.spotlist.size["min-width"],
            this.minWidth || (this.minWidth = "0%"),
            this.isSelect = this.layoutInfo.spotlist.size.isSelect,
            this.isSelect || (this.isSelect = 0),
            this.layoutInfo.spotlist.thumb !== e && (this.thumbnailImageWidth = this.layoutInfo.spotlist.thumb.width,
            this.thumbnailImageWidth || (this.thumbnailImageWidth = 100),
            this.thumbnailImageHeight = this.layoutInfo.spotlist.thumb.height,
            this.thumbnailImageHeight || (this.thumbnailImageHeight = 75)),
            $(document.getElementById(this.ELEMENT_ID_SPOT_LIST)).css({
                width: this.width,
                height: this.height
            })
        },
        ChangePlanForThumbnailList: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_SPOT_LIST));
            t.children(".selected").removeClass("selected");
            var e = "plan" + this.model.planIndex
              , i = t.children("." + e);
            if (i.length > 0)
                return i.addClass("selected"),
                void 0;
            $("<div></div>").addClass("selected " + e).appendTo(t);
            var n = this.model.projectJson;
            if (null != n) {
                var o = this.model.planJson;
                if (null != o) {
                    var s = o.sp;
                    if (null != s) {
                        var a = s.length
                          , l = $(document.getElementById(this.ELEMENT_ID_PLAYER)).width()
                          , h = a * (this.thumbnailImageWidth + 15);
                        $("#" + this.ELEMENT_ID_SPOT_LIST + " > div." + e).append("<ul></ul>").css("width", (l > h ? l : h) + "px");
                        for (var r = 0; a > r; r++) {
                            var d = s[r];
                            if (d.aq) {
                                var c = n.aa + d.ad;
                                "/" != c.substring(c.length - 1) && (c += "/");
                                var u = '<img src="' + c + 'thumb.jpg" width="' + this.thumbnailImageWidth + '" height="' + this.thumbnailImageHeight + '" />'
                                  , g = '<div style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">' + d.ab + "</div>"
                                  , p = "p" + this.model.planIndex + "s" + r;
                                $("<li></li>").append(u + g).attr({
                                    id: p
                                }).css({
                                    width: this.thumbnailImageWidth + "px",
                                    height: this.thumbnailImageWidth + "px",
                                    "font-size": "small"
                                }).appendTo("#" + this.ELEMENT_ID_SPOT_LIST + " > div." + e + " > ul"),
                                $(document.getElementById(p)).on("click", {
                                    spotIndex: r
                                }, this.li_Click.bind(this))
                            }
                        }
                    }
                }
            }
        },
        ChangePlanForComboBox: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_SPOT_LIST));
            t.children().remove();
            var e = this.model.planJson;
            if (null != e) {
                var i = e.sp;
                if (null != i)
                    for (var n = i.length, o = 0; n > o; o++) {
                        var s = i[o];
                        s.aq && $("<option></option>").val(o).text(s.ab).appendTo(t)
                    }
            }
        },
        model_PlayerSizeChanged: function() {
            this.UpdateLayout()
        },
        model_PlanSelect: function() {
            0 == this.isSelect ? this.ChangePlanForThumbnailList() : this.ChangePlanForComboBox()
        },
        model_SpotSelect: function() {
            var t = this.model.planJson;
            if (null == t)
                return null;
            var e = t.sp;
            if (null != e)
                if (0 == this.isSelect) {
                    if (-1 == this.model.spotIndex || null == this.model.spotJson)
                        return;
                    if ($("#" + this.ELEMENT_ID_SPOT_LIST + " > div.selected > ul .selected").removeClass("selected"),
                    this.model.spotJson.aq) {
                        for (var i = this.model.spotIndex + 1, n = 0; i > n; n++)
                            e[n].aq || (i -= 1);
                        $("#" + this.ELEMENT_ID_SPOT_LIST + " > div.selected > ul li:nth-child(" + i + ")").addClass("selected")
                    }
                } else {
                    this.model.spotJson;
                    var o = $(document.getElementById(this.ELEMENT_ID_SPOT_LIST));
                    o.children().remove();
                    for (var n = 0, s = t.sp.length; s > n; n++) {
                        var a = t.sp[n];
                        a.aq && (n === this.model.spotIndex ? $("<option></option>").attr({
                            selected: "selected"
                        }).val(n).text(a.ab).appendTo(o) : $("<option></option>").val(n).text(a.ab).appendTo(o))
                    }
                }
        },
        model_HmdModeStart: function() {
            $(document.getElementById(this.ELEMENT_ID_SPOT_LIST)).css("display", "none")
        },
        model_HmdModeStop: function() {
            $(document.getElementById(this.ELEMENT_ID_SPOT_LIST)).css("display", "block")
        },
        li_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOTLIST, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.SelectSpot(t.data.spotIndex)
        },
        select_Change: function() {
            var e = t.parseInt($("#" + this.ELEMENT_ID_SPOT_LIST + " option:selected").val());
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOT_COMBOBOX, this.controller.constValues.BROWSE_LOG_ACTION_ID_CHANGE, e),
            this.controller.SelectPlanAndSpot(this.model.planIndex, e)
        }
    },
    t.Zenkei != e && (t.Zenkei.SpotList = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        width: 0,
        height: 0,
        lastDrawYaw: null,
        lastDrawPitch: null,
        lastDrawPerspective: null,
        executeWalkThroughInfo: null,
        intervalNumber: null,
        firstPanMoveCount: 0,
        zoomCount: 0,
        secondPanMoveCount: 0,
        isVisible: !1,
        ELEMENT_ID_WALK_THROUGH_CONTAINER: "walkThroughContainer",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        ELEMENT_ID_CONTAINER: "container",
        ELEMENT_ID_WALK_THROUGH: "walkThrough",
        ELEMENT_ID_WALK_THROUGH_CANVAS: "walkThroughCanvas",
        MIN_CIRCLE_WIDTH: 70,
        MIN_TOUCH_AREA_WIDTH: 36,
        MAX_LINE_SIZE: 80,
        INERTIAL_PAN_RATIO: 1.403,
        MIN_DEGREE_TO_PAN: 5,
        MIN_FOV_TO_DRAW: 45,
        PI2: 2 * Math.PI,
        Initialize: function() {
            return this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.viewChangeEventHandler.Register(this.model_ViewChange.bind(this)),
            this.model.walkThroughStartedEventHandler.Register(this.model_WalkThroughStarted.bind(this)),
            this.model.walkThroughZoomStartedEventHandler.Register(this.model_WalkThroughZoomStarted.bind(this)),
            $(document.getElementById(this.ELEMENT_ID_WALK_THROUGH_CONTAINER)).size() < 1 && $("<div></div>").attr("id", this.ELEMENT_ID_WALK_THROUGH_CONTAINER).css("position", "relative").appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY)),
            this.UpdateSize(),
            this
        },
        DrawArrows: function() {
            if (!this.model.isWalkThroughZooming) {
                var t = this.model.horizontalFov;
                if (!(t <= this.MIN_FOV_TO_DRAW)) {
                    var e = this.model.projectJson;
                    if (null != e) {
                        e.aa;
                        var i = this.model.spotJson;
                        if (null != i) {
                            var n = this.model.spotLensType;
                            if (0 !== n) {
                                var o = i.wt
                                  , s = o.length;
                                if (0 != s) {
                                    var a = this.model.yaw
                                      , l = this.model.pitch
                                      , h = this.model.perspective
                                      , r = 1;
                                    this.model.isHmdModeEnabled && (r = 2);
                                    var d = s * r
                                      , c = .5 * d
                                      , u = d;
                                    if (!(null != this.lastDrawYaw && null != this.lastDrawPitch && Math.abs(this.lastDrawYaw - a) <= d && Math.abs(this.lastDrawPitch - l) <= c && Math.abs(this.lastDrawPerspective - h) <= u)) {
                                        this.lastDrawYaw = a,
                                        this.lastDrawPitch = l,
                                        this.lastDrawPerspective = h;
                                        var g = a * Zenkei.Utility.DEG_TO_RAD
                                          , p = l * Zenkei.Utility.DEG_TO_RAD
                                          , A = Zenkei.Utility.getFovFromPerspective(h, this.width)
                                          , m = this.width
                                          , E = this.height
                                          , I = !0;
                                        this.model.isHmdModeEnabled && (this.model.playerWidth > this.model.playerHeight ? (m = .5 * this.model.playerWidth,
                                        E = this.model.playerHeight) : (I = !1,
                                        m = this.model.playerWidth,
                                        E = .5 * this.model.playerHeight));
                                        for (var T = this.model.isHmdModeEnabled, v = this.model.frontWalkThroughIndex, S = 0; s > S; S++)
                                            for (var f = o[S], y = 0; r > y; y++) {
                                                var w = y + "-" + S
                                                  , M = f.ac
                                                  , C = 2 * Math.PI - this.GetNormalizedRadian(M + g, !0)
                                                  , O = this.GetNormalizedRadian(2 * Math.PI - M, !0) * Zenkei.Utility.RAD_TO_DEG
                                                  , D = Math.abs(this.GetOffsetScopeDirection(a, O));
                                                D > 180 && (D = 360 - D);
                                                var b = 3 != i.aa && D >= 120
                                                  , L = 1 + .2 * ((D - 90) / 90)
                                                  , N = D * Zenkei.Utility.DEG_TO_RAD
                                                  , B = Math.sin(N)
                                                  , R = Math.cos(N)
                                                  , G = Math.sin(p)
                                                  , k = Math.max(m / A * Math.PI / 15, this.MIN_CIRCLE_WIDTH)
                                                  , P = 3 + 4 * (p / Math.PI)
                                                  , _ = k / P
                                                  , H = Math.min(Math.floor(.8 * _) * L, this.MAX_LINE_SIZE)
                                                  , U = Math.max(Math.floor(H * (2 + .5 * Math.abs(R))), this.MIN_TOUCH_AREA_WIDTH)
                                                  , x = Math.max(Math.floor(H * (2 - .5 * G)), this.MIN_TOUCH_AREA_WIDTH)
                                                  , W = .5 * (m - U)
                                                  , F = .85 * (E - x) + 1.5 * p / Math.PI * this.height - _ * R;
                                                C >= Math.PI ? (W -= B * k,
                                                B = -B) : W += B * k,
                                                this.model.isHmdModeEnabled && 1 == y && (I ? W += m : F += E),
                                                $(document.getElementById(this.ELEMENT_ID_WALK_THROUGH + w)).css({
                                                    left: W + "px",
                                                    top: F + "px"
                                                });
                                                var Z = $(document.getElementById(this.ELEMENT_ID_WALK_THROUGH_CANVAS + w)).attr({
                                                    width: U,
                                                    height: x
                                                })
                                                  , Y = U * (.5 + .375 * B)
                                                  , V = .25 * x * (2 - R)
                                                  , z = Y + (R - B) * H
                                                  , j = V + (B + R) * H / P
                                                  , J = z - .5 * B * H
                                                  , Q = j + .5 * R * H / P
                                                  , X = Y - .5 * B * H
                                                  , K = V + .5 * R * H / P
                                                  , q = Y + (-R - B) * H
                                                  , te = V + (-B + R) * H / P
                                                  , ee = q - .5 * B * H
                                                  , ie = te + .5 * R * H / P
                                                  , ne = Z[0].getContext("2d");
                                                ne.beginPath(),
                                                ne.moveTo(Y, V),
                                                ne.lineTo(z, j),
                                                ne.lineTo(J, Q),
                                                ne.lineTo(X, K),
                                                ne.lineTo(ee, ie),
                                                ne.lineTo(q, te),
                                                ne.closePath(),
                                                ne.stroke(),
                                                ne.fillStyle = b ? "rgb(170, 170, 170)" : T && S == v || null != this.executeWalkThroughInfo && S == this.executeWalkThroughInfo.walkThroughIndex ? "#7fffd4" : "rgb(255, 255, 255)",
                                                ne.fill()
                                            }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        GetNormalizedRadian: function(t) {
            return 0 > t ? t + this.PI2 : t > this.PI2 ? t - this.PI2 : t
        },
        CreateDiv: function() {
            this.lastDrawYaw = null,
            this.lastDrawPitch = null,
            this.lastDrawPerspective = null,
            $("#" + this.ELEMENT_ID_WALK_THROUGH_CONTAINER + " div").remove();
            var t = this.model.spotJson;
            if (null != t) {
                var e = t.wt;
                if (null != e) {
                    var i = 1;
                    this.model.isHmdModeEnabled && (i = 2);
                    for (var n = document.getElementById(this.ELEMENT_ID_WALK_THROUGH_CONTAINER), o = e.length, s = 0; o > s; s++)
                        for (var a = 0; i > a; a++) {
                            var l = a + "-" + s
                              , h = $("<div></div>").attr("id", this.ELEMENT_ID_WALK_THROUGH + l).css({
                                position: "absolute",
                                "z-index": s + 1e3,
                                "tap-highlight-color": "rgba(0, 0, 0, 0)"
                            }).appendTo(n).on("click", {
                                walkThroughIndex: s
                            }, this.walkThrough_Click.bind(this));
                            $("<canvas></canvas>").attr("id", this.ELEMENT_ID_WALK_THROUGH_CANVAS + l).appendTo(h)
                        }
                }
            }
        },
        UpdateSize: function() {
            this.width = t.Zenkei.layoutInfo.panorama.size.width,
            this.height = t.Zenkei.layoutInfo.panorama.size.height
        },
        FrontCheck: function() {
            if (this.model.isHmdModeEnabled && !this.model.isWalkThroughExecuting && 0 != this.model.spotLensTyp) {
                var t = this.model.spotJson;
                if (null != t) {
                    var e = this.model.yaw;
                    this.model.pitch;
                    var i = t.wt
                      , n = Math.PI / 180
                      , o = 1;
                    this.model.isHmdModeEnabled && (o = 2);
                    for (var s = -1, a = i.length, l = 0; a > l; l++) {
                        var h = i[l]
                          , r = 360 - h.ac / n;
                        r >= 180 && (r -= 360);
                        var d = Math.abs(e - r);
                        if (d > 180 && (d = 360 - d),
                        15 > d) {
                            var c = $(document.getElementById("walkThroughCanvas0-" + l))
                              , u = c.height()
                              , g = $(document.getElementById("walkThrough0-" + l))
                              , p = parseFloat(new String(g.css("top")).replace("px", ""))
                              , A = Math.abs(.5 * this.model.viewHeight - p - .5 * u);
                            if (.65 * u >= A) {
                                s = l;
                                break
                            }
                        }
                    }
                    null == this.model.frontAnnotationIndex && (-1 != s ? this.model.frontWalkThroughIndex != s && null == this.model.frontAnnotationIndex && (this.model.frontWalkThroughIndex = s,
                    this.controller.FireWalkThroughFrontOverEvent(),
                    this.lastDrawYaw = null,
                    this.lastDrawPitch = null,
                    this.lastDrawPerspective = null) : null != this.model.frontWalkThroughIndex && (this.controller.FireWalkThroughFrontOutEvent(),
                    this.model.frontWalkThroughIndex = null,
                    this.lastDrawYaw = null,
                    this.lastDrawPitch = null,
                    this.lastDrawPerspective = null))
                }
            }
        },
        Execute: function(t) {
            if (null != t) {
                var e = this.model.projectJson;
                if (null != e) {
                    var i = this.model.planJson;
                    if (null != i) {
                        var n = i.sp;
                        if (null != n) {
                            var o = this.model.spotJson;
                            if (null != o) {
                                var s = o.wt;
                                if (!(null == s || t >= s.length)) {
                                    var a = s[t];
                                    e.aa + a.aa;
                                    var l = this.controller.GetSpotIndexByDirectoryName(a.aa);
                                    if (!(l >= n.length)) {
                                        var h = this.model.yaw
                                          , r = a.ac
                                          , d = a.ad
                                          , c = this.GetNormalizedRadian(2 * Math.PI - r, !0) * Zenkei.Utility.RAD_TO_DEG
                                          , u = this.GetOffsetScopeDirection(h, c)
                                          , g = Math.abs(u);
                                        g > 180 && (g = 360 - g,
                                        u = u > 0 ? -(360 - g) : 360 - g);
                                        var p = 3 != o.aa && g >= 120;
                                        p && (0 > u ? u += 180 : u -= 180,
                                        r += Math.PI,
                                        d = -d);
                                        var A = o.ai
                                          , m = o.al
                                          , E = this.GetNormalizedRadian(r - A + m, !0)
                                          , I = n[l]
                                          , T = I.ai
                                          , v = I.al
                                          , S = E + T;
                                        S -= v,
                                        Math.abs(S) < 1e-4 && (S = 0),
                                        S = Zenkei.Utility.GetSosAngleFromWos(S),
                                        S = Zenkei.Utility.GetNormalizedRadian(S),
                                        S = Zenkei.Utility.GetDegreeFromRadian(S),
                                        S = -S,
                                        this.executeWalkThroughInfo = {
                                            targetSpotIndex: l,
                                            panTargetYaw: r,
                                            panTargetPitch: d,
                                            yawDiff: u,
                                            initYawAfterWalkThrough: S,
                                            shouldDoBackMove: p,
                                            walkThroughIndex: t
                                        },
                                        this.Start()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        ClearInterval: function() {
            null != this.intervalNumber && (clearInterval(this.intervalNumber),
            this.intervalNumber = null)
        },
        Start: function() {
            this.ClearInterval(),
            this.firstPanMoveCount = 0,
            this.zoomCount = 0,
            null != this.executeWalkThroughInfo && (this.controller.StopAutoPan(),
            this.controller.StopSlideshow(),
            this.controller.StopGyroMode(),
            this.controller.FireWalkThroughFirstPanStartedEvent(),
            this.controller.SetInitPerspectiveAfterWalkThrough(this.model.perspective),
            this.controller.SetInitYawAfterWalkThrough(this.executeWalkThroughInfo.initYawAfterWalkThrough),
            this.intervalNumber = setInterval(this.FirstPanMove.bind(this), 40),
            this.controller.SetIsClickable(!1))
        },
        FirstPanMove: function() {
            if (null == this.executeWalkThroughInfo)
                return this.ClearInterval(),
                void 0;
            this.firstPanMoveCount++;
            var t = this.model.yaw
              , e = this.executeWalkThroughInfo.yawDiff
              , i = Math.abs(e)
              , n = this.model.pitch
              , o = this.executeWalkThroughInfo.panTargetPitch
              , s = n - o
              , a = Math.abs(s);
            if (i < this.MIN_DEGREE_TO_PAN && a < this.MIN_DEGREE_TO_PAN)
                return this.ClearInterval(),
                this.controller.FireWalkThroughFirstPanEndedEvent(),
                this.model.userAgent.canFadeAnimation ? (this.SetVisibility(!1),
                this.controller.SelectSpotForWalkThroughFadeAnimation(this.executeWalkThroughInfo.targetSpotIndex)) : this.StartZoom(),
                void 0;
            var l = t
              , h = n;
            if (i >= this.MIN_DEGREE_TO_PAN)
                if (i > 90) {
                    var r = 0;
                    r = this.firstPanMoveCount <= 9 ? Math.pow(this.INERTIAL_PAN_RATIO, this.firstPanMoveCount - 1) / 100 : Math.pow(this.INERTIAL_PAN_RATIO, 18 - this.firstPanMoveCount) / 100,
                    l = t + e * r
                } else {
                    var d = .25 * e;
                    l = t + d,
                    this.executeWalkThroughInfo.yawDiff = e - d
                }
            a >= this.MIN_DEGREE_TO_PAN && (h = n - .25 * s),
            this.controller.SetYawAndPitch(l, h),
            18 == this.firstPanMoveCount && (this.ClearInterval(),
            this.controller.FireWalkThroughFirstPanEndedEvent(),
            this.model.userAgent.canFadeAnimation ? (this.SetVisibility(!1),
            this.controller.SelectSpotForWalkThroughFadeAnimation(this.executeWalkThroughInfo.targetSpotIndex)) : this.StartZoom())
        },
        StartZoom: function() {
            null != this.executeWalkThroughInfo && (this.intervalNumber = this.executeWalkThroughInfo.shouldDoBackMove ? setInterval(this.BackMove.bind(this), 40) : setInterval(this.ForwardMove.bind(this), 40),
            this.controller.FireWalkThroughZoomStartedEvent())
        },
        ForwardMove: function() {
            this.zoomCount++;
            var t = 1.02 * this.model.perspective;
            if (this.controller.SetPerspective(t),
            15 == this.zoomCount && this.model.userAgent.canFadeAnimation) {
                var e = 0;
                this.model.isViewFlipped && (e = 2);
                var i = e + 1;
                $(document.getElementById(this.ELEMENT_ID_CONTAINER + e)).fadeTo(1e3, 0),
                $(document.getElementById(this.ELEMENT_ID_CONTAINER + i)).fadeTo(1e3, 0)
            }
            35 == this.zoomCount && (this.ClearInterval(),
            this.controller.FireWalkThroughZoomEndedEvent(),
            this.controller.SelectSpot(this.executeWalkThroughInfo.targetSpotIndex, this.model.userAgent.canFadeAnimation),
            this.model.userAgent.canFadeAnimation && (this.controller.IsBlackAreaVisible() ? (this.ClearInterval(),
            this.CreateDiv(),
            this.FrontCheck(),
            this.DrawArrows(),
            this.secondPanMoveCount = 0,
            this.intervalNumber = setInterval(this.SecondPanMove.bind(this), 40)) : this.Finish()))
        },
        BackMove: function() {
            this.zoomCount++;
            var t = .98 * this.model.perspective;
            if (this.controller.SetPerspective(t),
            15 == this.zoomCount && this.model.userAgent.canFadeAnimation) {
                var e = 0;
                this.model.isViewFlipped && (e = 2);
                var i = e + 1;
                $(document.getElementById(this.ELEMENT_ID_CONTAINER + e)).fadeTo(1e3, 0),
                $(document.getElementById(this.ELEMENT_ID_CONTAINER + i)).fadeTo(1e3, 0)
            }
            35 == this.zoomCount && (this.ClearInterval(),
            this.controller.FireWalkThroughZoomEndedEvent(),
            this.controller.SelectSpot(this.executeWalkThroughInfo.targetSpotIndex, this.model.userAgent.canFadeAnimation),
            this.model.userAgent.canFadeAnimation && (this.controller.IsBlackAreaVisible() ? (this.ClearInterval(),
            this.CreateDiv(),
            this.FrontCheck(),
            this.DrawArrows(),
            this.secondPanMoveCount = 0,
            this.intervalNumber = setInterval(this.SecondPanMove.bind(this), 40)) : this.Finish()))
        },
        SecondPanMove: function() {
            this.secondPanMoveCount++;
            var t = this.model.yaw
              , e = .8 * t;
            this.controller.SetYawAndPitch(e, this.model.pitch),
            18 == this.secondPanMoveCount && (this.ClearInterval(),
            this.Finish())
        },
        Finish: function() {
            this.executeWalkThroughInfo = null,
            this.ClearInterval(),
            this.CreateDiv(),
            this.FrontCheck(),
            this.DrawArrows(),
            this.SetVisibility(!0),
            this.controller.FireWalkThroughEndedEvent(),
            this.controller.SetIsClickable(!0)
        },
        SetVisibility: function(t) {
            this.isVisible != t && (t ? $(document.getElementById(this.ELEMENT_ID_WALK_THROUGH_CONTAINER)).show() : $(document.getElementById(this.ELEMENT_ID_WALK_THROUGH_CONTAINER)).hide(),
            this.isVisible = t)
        },
        GetOffsetScopeDirection: function(t, e) {
            var i = e - t;
            return Math.abs(i) < 180 ? i : i > 0 ? i - 360 : i + 360
        },
        walkThrough_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_WALKTHROUGH, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.ExecuteWalkThrough(t.data.walkThroughIndex)
        },
        model_PlayerSizeChanged: function() {
            this.lastDrawYaw = null,
            this.lastDrawPitch = null,
            this.lastDrawPerspective = null,
            this.UpdateSize(),
            this.FrontCheck(),
            this.DrawArrows()
        },
        model_HmdModeStart: function() {
            this.model.frontWalkThroughIndex = null,
            this.CreateDiv(),
            this.DrawArrows()
        },
        model_HmdModeStop: function() {
            this.model.frontWalkThroughIndex = null,
            this.CreateDiv(),
            this.DrawArrows()
        },
        model_SpotImageLoadCompleted: function(t) {
            var e = t.isMainView
              , i = t.isFrontView
              , n = this.model.isWalkThroughExecuting;
            if (n)
                if (this.model.userAgent.canFadeAnimation) {
                    if (!e || i)
                        return;
                    this.StartZoom()
                } else
                    this.controller.IsBlackAreaVisible() ? null == this.intervalNumber && (this.secondPanMoveCount = 0,
                    this.intervalNumber = setInterval(this.SecondPanMove.bind(this), 40)) : this.Finish();
            else {
                if (!e || !i)
                    return;
                this.ClearInterval(),
                this.FrontCheck(),
                this.DrawArrows(),
                this.SetVisibility(!0)
            }
        },
        model_SpotSelect: function() {
            this.model.frontWalkThroughIndex = null,
            this.CreateDiv(),
            this.SetVisibility(!1)
        },
        model_ViewChange: function() {
            if (!this.model.isWalkThroughZooming) {
                var t = this.model.horizontalFov;
                if (t <= this.MIN_FOV_TO_DRAW)
                    return this.SetVisibility(!1),
                    void 0;
                this.FrontCheck(),
                this.DrawArrows(),
                this.SetVisibility(!0)
            }
        },
        model_WalkThroughStarted: function(t) {
            this.Execute(t)
        },
        model_WalkThroughZoomStarted: function() {
            this.SetVisibility(!1)
        }
    },
    t.Zenkei != e && (t.Zenkei.Walkthrough = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        isPoped: !1,
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.layoutInfo = t.Zenkei.layoutInfo,
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            t.onpopstate = this.pop.bind(this)
        },
        _setUrlSearches: function(t, e) {
            var i = ""
              , n = t;
            n.spotId = e;
            for (var o in n)
                i = i + (i.length > 0 ? "&" : "?") + o + "=" + n[o];
            return i
        },
        _getUrlSearches: function() {
            var e, i = {}, n = t.location.href.slice(t.location.href.indexOf("?") + 1).split("&");
            if (n[0] === t.location.href)
                return {};
            for (var o = 0; o < n.length; o++)
                n[o].length < 3 || (e = n[o].split("="),
                i[e[0]] = e[1]);
            return i
        },
        push: function() {
            if (!this.controller.isPlayingBrowseLog) {
                var e = this.model.spotJson;
                if (this.isPoped || null == e)
                    return this.isPoped = !1,
                    void 0;
                var i = e.ba
                  , n = t.location
                  , o = n.pathname + this._setUrlSearches(this._getUrlSearches(), i);
                if (this.firstReplace())
                    try {
                        t.history.replaceState(null, null, o)
                    } catch (s) {}
                else
                    ;
            }
        },
        firstReplace: function() {
            return this.layoutInfo.useUrlHashFragment ? (this.firstReplace = function() {
                return !1
            }
            ,
            !0) : !0
        },
        pop: function() {
            var e = t.parseUrlParameter("spotId");
            return this.controller.SelectSpotById(e) ? (this.isPoped = !0,
            void 0) : (this.controller.SelectPlanAndSpot(0, 0),
            void 0)
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.push()
        }
    },
    t.Zenkei != e && (t.Zenkei.UrlHashFragmentHandler = i)
}(window),
function(t, e) {
    function i(t) {
        this.Initialize(t)
    }
    i.prototype = {
        model: null,
        controller: null,
        historyArray: [],
        layoutInfo: null,
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        ELEMENT_ID_HISTORY: "history",
        ELEMENT_ID_BACK_BUTTON: "backButton",
        BACK_BUTTON_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjODlkZWM3NC0wMDhiLTdjNDMtOTBhMS1hNWU2ZDJmNTU4YzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUI3MzQ1M0RDNkQ3MTFFM0FBNzBENzU5RjlBRTQ1ODAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUI3MzQ1M0NDNkQ3MTFFM0FBNzBENzU5RjlBRTQ1ODAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmViMWJiODgzLTU1YWYtNjA0Yy1iNDYxLTY1NzM5OGFhN2E5YiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjODlkZWM3NC0wMDhiLTdjNDMtOTBhMS1hNWU2ZDJmNTU4YzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4zqzAeAAACa0lEQVR42syWz2sTURDHZzcBqxTbnqQoBIKCWj2IbeIth/TiJh7tWdt6FzzoQbzoQSvqf6CCh0Z6MkljDoqaYze18VAsWAIBa7FCtVIkWc2uM2ESN+tu3tukFge+hLxH5pM378d8FRCHghpBjaKOo4ZR/Ty3jVpHvUfpqGWUJUrWaW4cdZ4hMkHwOdQLL7AX8ADqKuoIdBcfUHdQn50Tqv3Lj2qNPk6i7vcAA/4t5TjBOT1XeAp1AxXslC0aPQM1owalpSUR+BfqJuqtG/Ag6gFqrwj2LJ0G0zRB087KQKuoy6g1e0np84osbP/AAAwODUEu9xzC4bAI2Me5VTswLtqzSCTagjUjn89DpVKR3dN4E6jw0e8IS2cybbDU7Cxcmp6Cer0ue5CIoah8qYf9wJ6mUn5hwIwRlV8QX7DpqUm/sGaMEvDYLsEojtL+PUEN2kfHxiKQyWbbYJZlQaFQ8AV78/oV3J2ZsQ99C9oeYk9Y48IqCsRiMV/L+bKx4RzqV50jpmXCv4wgt5hWSReLRUgkNJifz7WtkkqZxT31U1JdX3AObRPwk3MP3aCBQAAMw4DJixd6OTRrVNIVtxmCJpMJ+L619efmTkzAw0ePG/AuY0XlTu0aRV3faWhRZVuwvgtQYiyrbAXmOv6tnYESw2pei5dsC3xB4+NxCIVCMrBVZrTak8mWoCqCnksmG9Cvm5uQ0DQol8syDfgeM/6yGKdR10UWg14j46cB70olGYtxiw69q6chw7Ovbw9Br3Gn7iVoZbcx5yLmFNrEQ2wLDncJW+UyfvxvjbCb1Y9QP/Ow+vRaLchY/d8CDAAYDQJTD4oF7QAAAABJRU5ErkJggg==",
        BACK_BUTTON_IMAGE_DATA2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfCAYAAACOTBv1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4YTlmZmVhZC05NjdhLWVmNDMtOWFkOS01NTczMGJjY2E2MjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjExNDYxMTFFRkNGMTFFNDkwRDRGMUREQTZFQTQ3RUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjExNDYxMTBFRkNGMTFFNDkwRDRGMUREQTZFQTQ3RUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGE5ZmZlYWQtOTY3YS1lZjQzLTlhZDktNTU3MzBiY2NhNjIzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhhOWZmZWFkLTk2N2EtZWY0My05YWQ5LTU1NzMwYmNjYTYyMyIv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",
        BACK_BUTTON_IMAGE_DATA2_DISABLED: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfCAYAAACOTBv1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4YTlmZmVhZC05NjdhLWVmNDMtOWFkOS01NTczMGJjY2E2MjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0VBNjdFMEZGNjEwMTFFNEJCOEZGNUQyMkRFMDc1MkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0VBNjdFMEVGNjEwMTFFNEJCOEZGNUQyMkRFMDc1MkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjZlNzkwYmMtZGFjOC00ZDQwLTlhZGUtODExNmQzZTZlZTJhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhhOWZmZWFkLTk2N2EtZWY0My05YWQ5LTU1NzMwYmNjYTYyMyIv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",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.backbutton,
            this.layoutInfo != e && null != this.layoutInfo && "false" == this.layoutInfo.visible ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.backSpotEventHandler.Register(this.model_BackSpot.bind(this)),
            this.CreateElements(),
            this.UpdateVisibility(),
            this.UpdateBackgroundImage(),
            void 0)
        },
        CreateElements: function() {
            $(document.getElementById(this.ELEMENT_ID_HISTORY)).remove(),
            $("<div></div>").attr("id", this.ELEMENT_ID_HISTORY).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
            var e = {
                "background-size": "contain",
                position: "absolute",
                margin: "0px",
                padding: "0px",
                "z-index": "5000",
                "tap-highlight-color": "rgba(0,0,0,0)"
            };
            this.layoutInfo = t.Zenkei.layoutInfo.backbutton;
            var i = "28px"
              , n = "28px"
              , o = !1
              , s = !1
              , a = !1;
            null != this.layoutInfo && (null != this.layoutInfo.width && (i = this.layoutInfo.width),
            null != this.layoutInfo.height && (n = this.layoutInfo.height),
            null != this.layoutInfo.top ? (e.top = this.layoutInfo.top,
            a = !0) : null != this.layoutInfo.bottom && (e.bottom = this.layoutInfo.bottom,
            a = !0),
            null != this.layoutInfo.left ? (e.left = this.layoutInfo.left,
            s = !0) : null != this.layoutInfo.right && (e.right = this.layoutInfo.right,
            s = !0),
            2 == this.layoutInfo.type && (e["background-image"] = "url(" + this.BACK_BUTTON_IMAGE_DATA2 + ")",
            o = !0)),
            s || (e.left = "20px"),
            a || (e.top = "20px"),
            o || (e["background-image"] = "url(" + this.BACK_BUTTON_IMAGE_DATA + ")"),
            e.width = i,
            e.height = n,
            $("<div></div>").attr("id", this.ELEMENT_ID_BACK_BUTTON).css(e).on("click", this.backButton_Click.bind(this)).appendTo(document.getElementById(this.ELEMENT_ID_HISTORY))
        },
        UpdateVisibility: function() {
            var t = "none"
              , e = this.GetHistoryLength() > 0;
            this.model.isHmdModeEnabled || (null != this.layoutInfo ? (this.layoutInfo.alwaysvisible || e && "none" != this.layoutInfo.display) && (t = "block") : e && (t = "block")),
            $(document.getElementById(this.ELEMENT_ID_BACK_BUTTON)).css("display", t)
        },
        UpdateBackgroundImage: function() {
            null != this.layoutInfo && this.layoutInfo.alwaysvisible && 2 == this.layoutInfo.type && (this.GetHistoryLength() > 0 ? (this.controller.canBackSpot = !0,
            $(document.getElementById(this.ELEMENT_ID_BACK_BUTTON)).css("background-image", "url(" + this.BACK_BUTTON_IMAGE_DATA2 + ")")) : (this.controller.canBackSpot = !1,
            $(document.getElementById(this.ELEMENT_ID_BACK_BUTTON)).css("background-image", "url(" + this.BACK_BUTTON_IMAGE_DATA2_DISABLED + ")")))
        },
        PushHistory: function() {
            this.historyArray.push({
                planIndex: this.model.planIndex,
                spotIndex: this.model.spotIndex
            }),
            this.RemoveDuplicatedHistory()
        },
        RemoveDuplicatedHistory: function() {
            for (var t = this.historyArray.length, i = t - 1; i >= 0; i--)
                this.historyArray[i - 1] !== e && this.historyArray[i - 1].planIndex === this.historyArray[i].planIndex && this.historyArray[i - 1].spotIndex === this.historyArray[i].spotIndex && this.historyArray.splice(i, 1)
        },
        PopHistory: function() {
            return this.GetHistoryLength() <= 0 ? null : this.historyArray.pop()
        },
        GetHistoryLength: function() {
            var t = this.historyArray.length - 1;
            return t - 1 >= 0 ? t : 0
        },
        model_PlayerSizeChanged: function() {
            $(document.getElementById(this.ELEMENT_ID_HISTORY)).remove(),
            this.CreateElements(),
            this.UpdateVisibility(),
            this.UpdateBackgroundImage()
        },
        model_SpotSelect: function() {
            this.PushHistory()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && (this.UpdateVisibility(),
            this.UpdateBackgroundImage())
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility()
        },
        model_WalkThroughEnded: function() {
            this.UpdateVisibility(),
            this.UpdateBackgroundImage()
        },
        model_BackSpot: function() {
            var t = this.PopHistory();
            if (null != t && t != e) {
                var i = this.historyArray[this.GetHistoryLength()];
                this.controller.SelectPlanAndSpot(i.planIndex, i.spotIndex)
            }
        },
        backButton_Click: function(t) {
            var i = this.PopHistory();
            if (null != i && i != e) {
                if (this.controller.hasAccessLogId) {
                    var n = t.originalEvent
                      , o = {
                        x: n.clientX,
                        y: n.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_BACK_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, o)
                }
                var s = this.historyArray[this.GetHistoryLength()];
                this.controller.SelectPlanAndSpot(s.planIndex, s.spotIndex)
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.History = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        ELEMENT_ID_GYRO_BUTTON: "gyroButton",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        HTML_CODE_EMPTY_DIV: "<div></div>",
        BUTTON_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZmJkZjY0OC1iM2ZjLTZmNGMtOGU2NC00Mzc3ODk2OGE4YmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjZEOEUyRUVFRkQwMTFFNEE3RkREMDkzOTk5MEI5RjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjZEOEUyRURFRkQwMTFFNEE3RkREMDkzOTk5MEI5RjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2Q0NWE5Y2UtODMxZi1lNDQ0LWE3MjctOWNkMDQ0MDNjMzUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJmYmRmNjQ4LWIzZmMtNmY0Yy04ZTY0LTQzNzc4OTY4YThiYiIv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",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.gyrobutton,
            null == this.layoutInfo ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.isGyroEventSupportedChangedEventHandler.Register(this.model_IsGyroEventSupportedChanged.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateLayout(),
            this.UpdateVisibility(),
            void 0)
        },
        CreateElements: function() {
            if (null != this.layoutInfo) {
                var t = $(this.HTML_CODE_EMPTY_DIV).attr("id", this.ELEMENT_ID_GYRO_BUTTON).css({
                    "background-size": "35px 35px",
                    "background-repeat": "no-repeat",
                    "background-position": "center center",
                    position: "absolute",
                    "z-index": "5000",
                    display: "none",
                    "tap-highlight-color": "rgba(0,0,0,0)",
                    "background-image": "url(" + this.BUTTON_IMAGE_DATA + ")"
                }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
                t.on("click", this.gyroButton_Click.bind(this))
            }
        },
        UpdateLayout: function() {
            if (null != this.layoutInfo) {
                var t = "35px"
                  , e = "35px"
                  , i = !1
                  , n = !1
                  , o = {};
                null != this.layoutInfo.width && (t = this.layoutInfo.width),
                null != this.layoutInfo.height && (e = this.layoutInfo.height),
                null != this.layoutInfo.top ? (o.top = this.layoutInfo.top,
                o.bottom = "",
                n = !0) : null != this.layoutInfo.bottom && (o.bottom = this.layoutInfo.bottom,
                o.top = "",
                n = !0),
                null != this.layoutInfo.left ? (o.left = this.layoutInfo.left,
                o.right = "",
                i = !0) : null != this.layoutInfo.right && (o.right = this.layoutInfo.right,
                o.left = "",
                i = !0),
                i || (o.left = "10px"),
                n || (o.top = "10px"),
                o.width = t,
                o.height = e,
                $(document.getElementById(this.ELEMENT_ID_GYRO_BUTTON)).css(o)
            }
        },
        UpdateVisibility: function() {
            var t = "none";
            this.model.isGyroEventSupported && !this.model.isHmdModeEnabled && null != this.layoutInfo && "none" != this.layoutInfo.display && (t = "block"),
            $(document.getElementById(this.ELEMENT_ID_GYRO_BUTTON)).css("display", t)
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo.gyrobutton,
            this.UpdateLayout(),
            this.UpdateVisibility()
        },
        model_IsGyroEventSupportedChanged: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStart: function() {
            this.UpdateLayout(),
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateLayout(),
            this.UpdateVisibility()
        },
        gyroButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_GYRO_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.SwitchGyroMode()
        }
    },
    t.Zenkei != e && (t.Zenkei.GyroButton = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        ELEMENT_ID_CLOSE_WINDOW_BUTTON: "closeWindowButton",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateLayout()
        },
        CreateElements: function() {
            var t = $("<div></div>").attr("id", this.ELEMENT_ID_CLOSE_WINDOW_BUTTON).css({
                position: "absolute",
                "z-index": "5000",
                cursor: "pointer",
                "tap-highlight-color": "rgba(0,0,0,0)"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
            $('<div style="background-color: #e0e0e0; border: 1px solid #a9a9a9; border-radius: 5px; font-size: 14px; padding: 4px 8px;"><span style="margin-right: 4px; vertical-align: middle;">閉じる</span><img width="16" height="16" style="vertical-align: middle;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACuoAAArqAVDM774AAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAJ1JREFUOE+tk8ENwyAQBKmWJ9QAHdENXyq5ZIiQFgejKPikxeg8uwKMnZl1lVIsxmje+61gYIevDznnJbwTnh5A2gr4RXidLjulZLVWCyFMIKLHO5jRw+sUAqBaa1MIc3oUjHqmAAVHyKqnnikAXQ07M/oKQBpC3ZnR8wFq5qnzVcizh/jXZzy+SMdX+b2qs5+JAZGm27kTDOzHZ+4FtqCRWx7U0KYAAAAASUVORK5CYII="></div>').appendTo(t),
            t.on("click", this.closeWindowButton_Click.bind(this))
        },
        UpdateLayout: function() {
            var i = null;
            null != t.Zenkei.layoutInfo && t.Zenkei.layoutInfo != e && null != t.Zenkei.layoutInfo.closewindowbutton && t.Zenkei.layoutInfo.closewindowbutton != e && (i = t.Zenkei.layoutInfo.closewindowbutton);
            var n = null != i && "false" != i.visible && !this.model.isHmdModeEnabled;
            if (n) {
                var o = ""
                  , s = ""
                  , a = ""
                  , l = ""
                  , h = "";
                i.padding != e && (o = i.padding),
                i.left != e ? s = i.left : i.right != e && (a = i.right),
                i.top != e ? l = i.top : i.bottom != e && (h = i.bottom),
                $(document.getElementById(this.ELEMENT_ID_CLOSE_WINDOW_BUTTON)).css({
                    display: "block",
                    padding: o,
                    left: s,
                    right: a,
                    top: l,
                    bottom: h
                })
            } else
                $(document.getElementById(this.ELEMENT_ID_CLOSE_WINDOW_BUTTON)).css("display", "none")
        },
        model_PlayerSizeChanged: function() {
            this.UpdateLayout()
        },
        model_HmdModeStart: function() {
            this.UpdateLayout()
        },
        model_HmdModeStop: function() {
            this.UpdateLayout()
        },
        closeWindowButton_Click: function(e) {
            if (this.controller.hasAccessLogId) {
                var i = e.originalEvent
                  , n = {
                    x: i.clientX,
                    y: i.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CLOSE_WINDOW_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, n, !0)
            }
            t.close()
        }
    },
    t.Zenkei != e && (t.Zenkei.CloseWindowButton = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        ELEMENT_ID_NEXT_SPOT_BUTTON: "nextSpotButton",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        BUTTON_IMAGE_DATA1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAQ1JREFUSEu1lWENwjAUhGcBC1jAAhbwhAUsYGEWsIAFLIzvRpdsrO/1GNmX3I/2HXdpt4xuL4ZhGJWC4YKeqEeHsm2hcCmEocJfaOKnErxxAYPv8Am7BF+9QAEoQyXHYg/Bkxbo3jP6Yg/BUy8QDE6oWYLCkzCLC4R+jGrPYU74TNjPCwQGlTgnWZWw1y4QmHRdzkkW18XaKxAYrWdS7COs/QKB2Sm5FvumgjNqXdW2AoxO+L3YR1h7BZiscLR4k1i3CzAovHXvq3DBXl7A0Hk9q+GC/biAgfupqIYLZmlBi78/dhnhtczBkxZEb44VLvDFBYKhSubY4QJvXiAw6K/zgW7IDhcKl3bjUzB0b5oija5M/XdEAAAAAElFTkSuQmCC",
        BUTTON_IMAGE_DATA2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA+CAYAAABdhInWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRTVCNUQzQjE2RDAxMUU0QTU5OTgwQzY3NjJBODhEQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRTVCNUQzQzE2RDAxMUU0QTU5OTgwQzY3NjJBODhEQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFFNUI1RDM5MTZEMDExRTRBNTk5ODBDNjc2MkE4OERBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFFNUI1RDNBMTZEMDExRTRBNTk5ODBDNjc2MkE4OERBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rDDqqQAABXBJREFUeNrMml1II1cUx5NRYzRd3SYxRmM1q8Zds4JBfdGi+NbiS1/aQh/0pS26+LVmi/qiRNgX3WC1YvwsiM9FiqCo4EPfShFbqeu3sFqrlt1Vo66a1SQ9d7gj0+lMMpk4k7nwZzL5uPPLuffcOfecURYWFiqCNCXjSDU/4yhqi+YBSTCEmo8mPz5GDJSCjKEpGr9/A7qmSbGwsCAItqioiNf3iCCfITg1KAGki4mJSYajAZQE+hCkAcWi78IFCTEtSgR4P4oGicBMLperZWxsrA1ep4OMIK1UsEQASHTxD0B6BFlTU/OZzWb7Ki8v74u+vj47vGcGpUgFS3DMSxWGRBApJSUlRVVVVTVKpZL8fnFx8Sfd3d01UlqW4HCeeNB9ULJWq81sb29/olKp1PQflpWVlTudzm+lgmWCIq+OAyVS87Knp6dar9cns/24vLy8FGC/kQKWoEFG4SHXYI82OhyOL61W6+NAHUgFSzBeq6hhr6ys/LiiouJTPp1IAUsw5icaenVpaam5urr6a4IglHw7EhuWzZmiWlpanqjVak2onYkJSzCCDHQbvBkeHv7x4uLiTEiHYsESDEh0376cnJxc6ejoeAGw53KBpf/AC3oPegc6mp+f/72tre0HucBGpaamKljiTFI7Ozvn29vb++BcNghIVKHCms3mjJycHP3c3Nw2NgQlMkSEKcY7nmWC+mlxJtkpwJ6JCcs3+OayqI/eqRxg2UBlCcsFKjvYQKCygg0GKhtYPqCygOULGnHYUEAjChsqqNSwFLAg0ECwB3cAu4kTHO/x0RsOKBusD8UGW1tbh7DxyxcKm5ubq52dnV2B0yuQB0d0N+GAMmHJ+bS7u3u1trb2FqInqxDYjIwMs81muzc1NbUApxcYNmxQ+hJC7WJj9/b2lAD7l1BYk8lkyc/Pv5qenv4NxcfIqsQdQTIt611aWjo+gCakU7fbfTg+Pj5Pyxb6o8MEpdI/MTgfgAJjTXx8fOLIyMjnWVlZllA7PDo6emO3258vLy//TXOosECpXSuVo0K5AINGo0kbHR2ttFgsD4VANjQ0vIBps4UMi4cdgfqi7wDyHkpJglITEhIegCXrBFrydX19fff6+vpLOP0HdEIDFWRRVsjExMRsgHyamZmZLQSyrq7u+42NjWU43Qe9AZ3hJYq0KHEXkFqtNgeGuylMyD/hFM3L16BTOiSfHH4gSD2GtIAlm2D9eyAWZCignJBgSXt6erpZTEi+oLc5KdpwmwwGQw5sd+1paWnpYkMGKzawQZJpcribPYThlgwymEXZIFPh9pY7MDDwFGA/kgoyECirJaE9GhoashuNRpOUkIGqIhTkbekGHMYKc/JZJCDZLMqEJC0JS48VhrsJHCglEpBsqfH/QcIinjc4OGgXAzKUsiRXsYGsL2VnZz92uVxNSUlJxkhCsuXwqUKYzmq1Purv7/+Oq3QjJSRz6KmyoqagoMDc29vbqtPpkuQASXcmJTX8sbGxcU6n0wEhm0EukKzLk8fj8S4uLv4iJ0iuYoOnubn5Z7jgS7lAchYbfD7fMcAOn56eHvOBrK2tFRWSzaK3VRHY8r7q6uoa83q9N8EgNzc3RYUMBIoseTgzM/PrxMTEVKQhmUNP7cs9eL/yFnTQ2dn508rKyhLLnHRKBcnm9X58/73CF0YAe62trb1utxvtDBUnJyeHjY2Nz8Wek3xAKe+/wFvWw/39/XUI7xwAuwVO9mx1dfUP9AekgiQXeo4nyehP6VAZkDhoqsvLy2sM9g7/mbAg+T73xBU4Uxf10JzsHCAJfE7lL6/FtiSfrYifFi9eYysrFf8tQ5LiaxUxQf0K7mfv/AqJHiBE7V8BBgAwmDd8XsHtdgAAAABJRU5ErkJggg==",
        BUTTON_IMAGE_DATA3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABfCAYAAABV97HXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNzRmYmZmMS1mZWNlLTA1NDgtYjFlMy1kMGRjN2NjODBmNGUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDA1MTg0QUNGODcxMTFFNEJDRTBEMERCRkI3MjAzNTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDA1MTg0QUJGODcxMTFFNEJDRTBEMERCRkI3MjAzNTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTc0ZmJmZjEtZmVjZS0wNTQ4LWIxZTMtZDBkYzdjYzgwZjRlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE3NGZiZmYxLWZlY2UtMDU0OC1iMWUzLWQwZGM3Y2M4MGY0ZSIv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",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.nextspotbutton,
            null == this.layoutInfo ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateVisibility(),
            this.UpdateLayout(),
            $(document.getElementById(this.ELEMENT_ID_NEXT_SPOT_BUTTON)).on("click", this.nextButton_Click.bind(this)),
            void 0)
        },
        CreateElements: function() {
            $("<div></div>").attr("id", this.ELEMENT_ID_NEXT_SPOT_BUTTON).css({
                "background-repeat": "no-repeat",
                "background-position": "center",
                position: "absolute",
                cursor: "pointer",
                "z-index": "5000",
                "tap-highlight-color": "rgba(0,0,0,0)"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
        },
        UpdateLayout: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_NEXT_SPOT_BUTTON));
            if ("none" != t.css("display") && null != this.layoutInfo) {
                var e = "44px"
                  , i = "64px"
                  , n = !1
                  , o = !1
                  , s = !1
                  , a = {};
                if (null != this.layoutInfo.width && (e = this.layoutInfo.width),
                null != this.layoutInfo.height && (i = this.layoutInfo.height),
                null != this.layoutInfo.top ? (a.top = this.layoutInfo.top,
                a.bottom = "",
                s = !0) : null != this.layoutInfo.bottom && (a.bottom = this.layoutInfo.bottom,
                a.top = "",
                s = !0),
                null != this.layoutInfo.left ? (a.left = this.layoutInfo.left,
                a.right = "",
                o = !0) : null != this.layoutInfo.right && (a.right = this.layoutInfo.right,
                a.left = "",
                o = !0),
                null != this.layoutInfo.margintop && (a["margin-top"] = this.layoutInfo.margintop),
                null != this.layoutInfo.backgroundcolor && (a["background-color"] = this.layoutInfo.backgroundcolor),
                null != this.layoutInfo.backgroundsize && (a["background-size"] = this.layoutInfo.backgroundsize),
                null != this.layoutInfo.type)
                    switch (n = !0,
                    this.layoutInfo.type) {
                    case 1:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA1 + ")";
                        break;
                    case 2:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA2 + ")";
                        break;
                    case 3:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA3 + ")";
                        break;
                    default:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA1 + ")"
                    }
                n || (a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA1 + ")"),
                o || (a.right = "0px"),
                s || (a.top = "50px"),
                a.width = e,
                a.height = i,
                t.css(a)
            }
        },
        UpdateVisibility: function() {
            var t = "none";
            if (0 != this.model.totalSpotCount && !this.model.isHmdModeEnabled && null != !this.layoutInfo && "none" != this.layoutInfo.display)
                if (this.layoutInfo.isloopable)
                    t = "block";
                else {
                    var e = this.model.projectJson;
                    if (null != e) {
                        var i = e.pl;
                        if (null != i && 0 != i.length)
                            for (var n = this.model.planIndex, o = this.model.spotIndex, s = i.length, a = !1, l = s - 1; l >= 0; l--) {
                                var h = i[l]
                                  , r = h.sp;
                                if (null != r && 0 != r.length) {
                                    (l != n || r.length - 1 != o) && (t = "block"),
                                    a = !0;
                                    break
                                }
                                if (a)
                                    break
                            }
                    }
                }
            $(document.getElementById(this.ELEMENT_ID_NEXT_SPOT_BUTTON)).css("display", t)
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo.nextspotbutton,
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && (this.UpdateVisibility(),
            this.UpdateLayout())
        },
        model_WalkThroughEnded: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        nextButton_Click: function(t) {
            var e = this.model.projectJson;
            if (null != e) {
                var i = this.model.planJson;
                if (null != i) {
                    var n = this.model.planIndex;
                    if (!(null == n || 0 > n)) {
                        var o = this.model.spotIndex;
                        if (!(null == o || 0 > o)) {
                            var s = n
                              , a = o + 1
                              , l = i.sp;
                            if (null != l) {
                                if (a >= l.length) {
                                    var h = e.pl;
                                    if (null == h || 0 == h.length)
                                        return;
                                    if (a = 0,
                                    s++,
                                    null != this.layoutInfo && !this.layoutInfo.isloopable && s >= h.length)
                                        return;
                                    for (var r = !1, d = h.length, c = s; d > c; c++) {
                                        var i = h[c];
                                        if (l = i.sp,
                                        null != l && 0 != l.length) {
                                            s = c,
                                            r = !0;
                                            break
                                        }
                                    }
                                    if (!r)
                                        for (var c = 0; d > c; c++) {
                                            var i = h[c];
                                            if (null != l && 0 != l.length) {
                                                s = c;
                                                break
                                            }
                                        }
                                }
                                if (this.controller.hasAccessLogId) {
                                    var u = t.originalEvent
                                      , g = {
                                        x: u.clientX,
                                        y: u.clientY
                                    };
                                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_NEXT_SPOT_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, g)
                                }
                                this.controller.SelectPlanAndSpot(s, a)
                            }
                        }
                    }
                }
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.NextSpotButton = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        ELEMENT_ID_PREV_SPOT_BUTTON: "prevSpotButton",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        BUTTON_IMAGE_DATA1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAQxJREFUSEu1lQENwjAQRWdhFmYBC1jAExawgAUsYAELWBjvkza02916XcZLLoHe773RDRjmef7W39gjID9SD+pFXdKyjYaropDNwzNvypfQDAvILYdnfAmNkIDMRFnDS8YU/8FiVNAarvvRL6AXuXINP6UtNTRcAevemZfo/Ke0ZQ1NU8BaZLiu3B8uCKwE2kRFrtw+lhJClmD/mS8hWAl4faW2iA8XhHsFOppzirchXAkE7+/UFnEJQUugJ+gYCaGVQLAWkeh+bEsImALBevST+DedpisQ9KJfuP6fihIyLYl7DFFB87hStEbrXm8JOU/iP1E0wgJB1pL4TxLNLoEgL8mNelLH/un3MQwfreaNrhhTeeEAAAAASUVORK5CYII=",
        BUTTON_IMAGE_DATA2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA+CAYAAABdhInWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE5RjQ1NzE2Q0YxMUU0QkUwOEJDQkNBMDE1NDM4OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE5RjQ1ODE2Q0YxMUU0QkUwOEJDQkNBMDE1NDM4OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTlGNDU1MTZDRjExRTRCRTA4QkNCQ0EwMTU0Mzg4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTlGNDU2MTZDRjExRTRCRTA4QkNCQ0EwMTU0Mzg4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t1ZSPgAABbxJREFUeNrMmltMY0UYx3tOS7nI0gClWC7lLm2ttAReGp8MPvhqePKFQAJI+qaGRBIDL0ICgeAWA4hcEqn6oDExkSLhFu6wFBOi7kKiXXYL6+JlpSiFLW2P3yFzYKgtbc+ldJIvzTRzTn/55uvM9/1niIqKClEUG+H3yTQKWdAmiSIk6WcEgvNhFhSYM6jNZgs5prKykkS/FYcZieDOMfMIBhoBZAJYErIEiUQS5/F4aLhTMBcyBtIXaDqiBZkCJgfLNhgMeqvV+kV1dfWr0FeCpYG9ABaPhUV0QINA5qjVan1XV1d3Wlqa1mQyfahSqbTw/Ytgqcjb0kCwZDQ9WVJS8kpvb+8HAJlFj5PJZIrOzs53SZJUQVdBfwWWiMWwcKDBIIuLi3Vms/m9jIyMTHw8wGva29tr6DFgGegZ+lkxzkdGC7Kvr+8df0imVVVVvVZTU/M6itd0sGQUr5ew5G1DXkCQJNHU1PSW0WjUI68yISBhYpW8bUimSaXShLa2trdhbBY2/fyB8gHJNLlcroBnTGKxmFmqGFBCnJWVxXVb5AWSabAiKLOzsx3z8/M/oU2A3hR8ZCxB0s1ut//Q3d29gLZTZv9nPfWCQO7u7v5cV1fXfXx8fATd52BeJlEhYwVyZ2fnfkNDw0cnJydPoetEOYCHrUeFgnzQ2Nhodrlcj6D7O9gxF1AhIe8CpB26T8D+AvsXzI2m3hcJaLQhn+OQ4YLeOmQ4oDEBGQo0ZiBvAo0pyGCgMQcZCDQmIf1BYxYSB70VSJvN5otktyHQpxSVrHQ1qIRaRhsrkDioGANNKy0tLQlUiEUI+TFAPoTub1wh/aeeLlGTysrKVAD5PhdIyIJGANIB3UM+IEV4qk97FershJ6enrbU1FQlW8j6+vqvz87OaLgjLAtyc4FkPHmp9zidTjeUAN/4fD4vm5etrq4+AEgf+jd7/VQ6zlIgI0rRud9ZR0fHjMViGWUDW1tb+6bJZNKhujwZSTTxjPIBhSDBFpQp7ghMtxRvbGz8KZFIzg0Gg44giLBzVhhL6PV6DZS+7s3NzX005R7Mw9TQ0BAFf7TLZ6AfNmgg9ZfWPQ9JkjwvLy9/mQWsOjk5mVpfX3+CQTKhcA02ElC8z8TUxYu3traesoXV6XSalJQUcm1t7QB/pz8sG1AKk6q9fMHCCiJeWVnZDwYbaYwKBSvSarXq9PT0uOXl5X0M0htKsw8FKgisRqMpVSgU0qWlJUcgz4YDG0zS4R1WrVa/lJmZmbC4uOgI9AcLBXuT9iQEbIlSqUxaWFh4HKlnQ4lkvMLSDRKe4pycnDuwAz6KxLPhqHm8w0IKWaRSqe7Mzc3t+YF6MVAqUlBBYCEpL8zPz5fNzs7uYVs4fop3DTYSfZR32KKiogKw1JmZmYcBYvYabKRCblBYgHSzgS0sLMyHUJBPT0//GiBmfWxBb4I9ZAtbUFCQBytCxtTU1C8oBJiz0UtYttI477B5eXkq2HLlk5OT9+l0E1UEjKJHcdHweYfNzc3Ng5w13Wq12iiKOkGwF57letjAOyxsCAWQB3snJibuocOGC69yBeUd1u12n/b3939it9v3cUGX8zkTJNgUgjtHHjhC1acD0rjvhoeHvwy3rIHpFo2Pj38Gy9UeHp9cTkUEgYXicGVgYGAeq17PI5XGBYc9ODhwtLS0jKPDBvxUxMf2+IZ3WCixXa2trZ8i0eIPPo5vOMOOjo5+jsNCXFIjIyPj29vbP0KXPmP6W3R1tOgVDDQE7OPBwcFvLRbLMAMLpfnk2NjY90ijeuYnSVK4pCMSChYWb8ZzLmwpc5vN5q9kMtkzo9H4RnNz812kT9Ge/CeYbkpwvUkW6t4TUkfESC1JFF1dKYpPTEwUn0ITXV0nOkWg/5OBBL1OFCQMnMiDh8DISJJObBcKqFURUbybh8tGJOYk/2tvvmCyY7QaDhRQRrqpuPtPgAEAdwJDX3DJAgQAAAAASUVORK5CYII=",
        BUTTON_IMAGE_DATA3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABfCAYAAABV97HXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNzRmYmZmMS1mZWNlLTA1NDgtYjFlMy1kMGRjN2NjODBmNGUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0E5NzMzODlGODcxMTFFNEJGRkNFNEJGNkE2QTRFMDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0E5NzMzODhGODcxMTFFNEJGRkNFNEJGNkE2QTRFMDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTc0ZmJmZjEtZmVjZS0wNTQ4LWIxZTMtZDBkYzdjYzgwZjRlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE3NGZiZmYxLWZlY2UtMDU0OC1iMWUzLWQwZGM3Y2M4MGY0ZSIv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",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.prevspotbutton,
            null == this.layoutInfo ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateVisibility(),
            this.UpdateLayout(),
            $(document.getElementById(this.ELEMENT_ID_PREV_SPOT_BUTTON)).on("click", this.prevButton_Click.bind(this)),
            void 0)
        },
        CreateElements: function() {
            $("<div></div>").attr("id", this.ELEMENT_ID_PREV_SPOT_BUTTON).css({
                "background-repeat": "no-repeat",
                "background-position": "center",
                position: "absolute",
                cursor: "pointer",
                "z-index": "5000",
                "tap-highlight-color": "rgba(0,0,0,0)"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
        },
        UpdateLayout: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_PREV_SPOT_BUTTON));
            if ("none" != t.css("display") && null != this.layoutInfo) {
                var e = "44px"
                  , i = "64px"
                  , n = !1
                  , o = !1
                  , s = !1
                  , a = {};
                if (null != this.layoutInfo.width && (e = this.layoutInfo.width),
                null != this.layoutInfo.height && (i = this.layoutInfo.height),
                null != this.layoutInfo.top ? (a.top = this.layoutInfo.top,
                a.bottom = "",
                s = !0) : null != this.layoutInfo.bottom && (a.bottom = this.layoutInfo.bottom,
                a.top = "",
                s = !0),
                null != this.layoutInfo.left ? (a.left = this.layoutInfo.left,
                a.right = "",
                o = !0) : null != this.layoutInfo.right && (a.right = this.layoutInfo.right,
                a.left = "",
                o = !0),
                null != this.layoutInfo.margintop && (a["margin-top"] = this.layoutInfo.margintop),
                null != this.layoutInfo.backgroundcolor && (a["background-color"] = this.layoutInfo.backgroundcolor),
                null != this.layoutInfo.backgroundsize && (a["background-size"] = this.layoutInfo.backgroundsize),
                null != this.layoutInfo.type)
                    switch (n = !0,
                    this.layoutInfo.type) {
                    case 1:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA1 + ")";
                        break;
                    case 2:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA2 + ")";
                        break;
                    case 3:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA3 + ")";
                        break;
                    default:
                        a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA1 + ")"
                    }
                n || (a["background-image"] = "url(" + this.BUTTON_IMAGE_DATA1 + ")"),
                o || (a.left = "0px"),
                s || (a.top = "50px"),
                a.width = e,
                a.height = i,
                t.css(a)
            }
        },
        UpdateVisibility: function() {
            var t = "none";
            if (0 != this.model.totalSpotCount && !this.model.isHmdModeEnabled && null != !this.layoutInfo && "none" != this.layoutInfo.display)
                if (this.layoutInfo.isloopable)
                    t = "block";
                else {
                    var e = this.model.planIndex
                      , i = this.model.spotIndex;
                    null != e && null != i && (e > 0 || i > 0) && (t = "block")
                }
            $(document.getElementById(this.ELEMENT_ID_PREV_SPOT_BUTTON)).css("display", t)
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo.prevspotbutton,
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && (this.UpdateVisibility(),
            this.UpdateLayout())
        },
        model_WalkThroughEnded: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        prevButton_Click: function(t) {
            var e = this.model.projectJson;
            if (null != e) {
                var i = this.model.planIndex
                  , n = this.model.spotIndex;
                if (null != i && null != n)
                    if (0 != i || 0 != n) {
                        var o = i
                          , s = n - 1;
                        if (0 > s) {
                            if (o -= 1,
                            0 > o)
                                return;
                            var a = e.pl[o];
                            if (null == a)
                                return;
                            var l = a.sp;
                            if (null == l || 0 == l.length)
                                return;
                            s = l.length - 1
                        }
                        if (this.controller.hasAccessLogId) {
                            var h = t.originalEvent
                              , r = {
                                x: h.clientX,
                                y: h.clientY
                            };
                            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_PREV_SPOT_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, r)
                        }
                        this.controller.SelectPlanAndSpot(o, s)
                    } else {
                        if (null == this.layoutInfo || !this.layoutInfo.isloopable)
                            return;
                        var d = e.pl;
                        if (null != d && 0 != d.length)
                            for (var c = d.length, u = c - 1; u >= 0; u--) {
                                var g = d[u]
                                  , p = g.sp;
                                if (null != p && 0 != p.length) {
                                    this.controller.SelectPlanAndSpot(u, p.length - 1);
                                    break
                                }
                            }
                    }
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.PrevSpotButton = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        selectedSpotIndex: -1,
        allItemCount: 0,
        displayItemCount: 0,
        maxDisplayItemCount: 3,
        layoutInfo: null,
        fontColor: "#ffffff",
        backgroundColor: "#181818",
        selectedFontColor: "#ed4b03",
        selectedBorderColor: "#ed4b03",
        isUpdatingLayout: !1,
        ELEMENT_ID_SPOT_LIST_EX: "spotListEx",
        ELEMENT_ID_CAROUSEL: "carousel",
        ELEMENT_ID_PREV_THUMB_BUTTON: "prevThumbButton",
        ELEMENT_ID_NEXT_THUMB_BUTTON: "nextThumbButton",
        Initialize: function() {
            return this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.planSelectEventHandler.Register(this.model_PlanSelect.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.scrollSpotListExEventHandler.Register(this.model_ScrollSpotListEx.bind(this)),
            this.UpdateLayoutInfo(),
            this.CreateElements(),
            this
        },
        CreateElements: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_SPOT_LIST_EX)).css({
                width: "100%",
                "background-color": this.backgroundColor
            });
            $("<div></div>").attr("id", this.ELEMENT_ID_PREV_THUMB_BUTTON).css({
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAQxJREFUSEu1lQENwjAQRWdhFmYBC1jAExawgAUsYAELWBjvkza02916XcZLLoHe773RDRjmef7W39gjID9SD+pFXdKyjYaropDNwzNvypfQDAvILYdnfAmNkIDMRFnDS8YU/8FiVNAarvvRL6AXuXINP6UtNTRcAevemZfo/Ke0ZQ1NU8BaZLiu3B8uCKwE2kRFrtw+lhJClmD/mS8hWAl4faW2iA8XhHsFOppzirchXAkE7+/UFnEJQUugJ+gYCaGVQLAWkeh+bEsImALBevST+DedpisQ9KJfuP6fihIyLYl7DFFB87hStEbrXm8JOU/iP1E0wgJB1pL4TxLNLoEgL8mNelLH/un3MQwfreaNrhhTeeEAAAAASUVORK5CYII=)",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-color": this.backgroundColor,
                height: "auto",
                "float": "left",
                cursor: "pointer"
            }).appendTo(t),
            $("<div></div>").attr("id", this.ELEMENT_ID_CAROUSEL).css({
                "background-color": this.backgroundColor,
                "float": "left"
            }).appendTo(t),
            $("<div></div>").attr("id", this.ELEMENT_ID_NEXT_THUMB_BUTTON).css({
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAQ1JREFUSEu1lWENwjAUhGcBC1jAAhbwhAUsYGEWsIAFLIzvRpdsrO/1GNmX3I/2HXdpt4xuL4ZhGJWC4YKeqEeHsm2hcCmEocJfaOKnErxxAYPv8Am7BF+9QAEoQyXHYg/Bkxbo3jP6Yg/BUy8QDE6oWYLCkzCLC4R+jGrPYU74TNjPCwQGlTgnWZWw1y4QmHRdzkkW18XaKxAYrWdS7COs/QKB2Sm5FvumgjNqXdW2AoxO+L3YR1h7BZiscLR4k1i3CzAovHXvq3DBXl7A0Hk9q+GC/biAgfupqIYLZmlBi78/dhnhtczBkxZEb44VLvDFBYKhSubY4QJvXiAw6K/zgW7IDhcKl3bjUzB0b5oija5M/XdEAAAAAElFTkSuQmCC)",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-color": this.backgroundColor,
                height: "auto",
                "float": "left",
                cursor: "pointer"
            }).appendTo(t),
            $(document.getElementById(this.ELEMENT_ID_PREV_THUMB_BUTTON)).on("click", this.prevThumbButton_Click.bind(this)),
            $(document.getElementById(this.ELEMENT_ID_NEXT_THUMB_BUTTON)).on("click", this.nextThumbButton_Click.bind(this))
        },
        UpdateLayoutInfo: function() {
            if (null != t.Zenkei.layoutInfo && null != t.Zenkei.layoutInfo.spotlistex) {
                this.layoutInfo = t.Zenkei.layoutInfo.spotlistex;
                var e = this.layoutInfo.fontColor;
                null != e && "" != e && (this.fontColor = e);
                var i = this.layoutInfo.backgroundColor;
                null != i && "" != i && (this.backgroundColor = i);
                var n = this.layoutInfo.selectedFontColor;
                null != n && "" != n && (this.selectedFontColor = n);
                var o = this.layoutInfo.selectedBorderColor;
                null != o && "" != o && (this.selectedBorderColor = o)
            } else
                this.layoutInfo = null
        },
        UpdateVisibility: function() {
            null != this.layoutInfo && "false" != this.layoutInfo.visible && this.allItemCount > 1 && !this.model.isHmdModeEnabled ? $(document.getElementById(this.ELEMENT_ID_SPOT_LIST_EX)).css("display", "block") : $(document.getElementById(this.ELEMENT_ID_SPOT_LIST_EX)).css("display", "none")
        },
        UpdateCarouselSize: function() {
            if (null != this.layoutInfo && "false" != this.layoutInfo.visible) {
                this.layoutInfo.size.width,
                this.layoutInfo.size.height;
                var t = 25 * this.displayItemCount + 2 * this.displayItemCount;
                $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).css("width", t + "%");
                var e = (100 - t) / 2;
                $(document.getElementById(this.ELEMENT_ID_PREV_THUMB_BUTTON)).css("width", e + "%"),
                $(document.getElementById(this.ELEMENT_ID_NEXT_THUMB_BUTTON)).css("width", e + "%")
            }
        },
        UpdateThumbnailSize: function() {
            if (null != this.layoutInfo && "false" != this.layoutInfo.visible) {
                var t = this.layoutInfo.size.width
                  , e = this.layoutInfo.size.height;
                $(document.getElementById(this.ELEMENT_ID_SPOT_LIST_EX)).css({
                    width: t + "px",
                    height: e + "px"
                });
                var i = $(document.getElementById(this.ELEMENT_ID_PREV_THUMB_BUTTON)).css("height", e + "px");
                $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).css("height", e + "px");
                var n = $(document.getElementById(this.ELEMENT_ID_NEXT_THUMB_BUTTON)).css("height", e + "px")
                  , o = Math.floor(t / 24) - 1
                  , s = Math.floor(t / 100)
                  , a = .1875 * t
                  , l = a + 2 * s;
                i.height(l),
                n.height(l),
                $(".spotListExItem").css("font-size", o + "px"),
                $(".spotListExThumb").css({
                    padding: s + "px",
                    "padding-top": 2 * s + "px"
                }),
                $(".spotListExThumb img").css("height", a + "px")
            }
        },
        UpdateButtonVisibility: function() {
            if (this.allItemCount <= this.displayItemCount)
                return $(document.getElementById(this.ELEMENT_ID_PREV_THUMB_BUTTON)).css("visibility", "hidden"),
                $(document.getElementById(this.ELEMENT_ID_NEXT_THUMB_BUTTON)).css("visibility", "hidden"),
                void 0;
            var t = $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).data("owlCarousel");
            null != t && (t.currentItem <= 0 ? $(document.getElementById(this.ELEMENT_ID_PREV_THUMB_BUTTON)).css("visibility", "hidden") : $(document.getElementById(this.ELEMENT_ID_PREV_THUMB_BUTTON)).css("visibility", "visible"),
            t.currentItem >= this.allItemCount - this.displayItemCount ? $(document.getElementById(this.ELEMENT_ID_NEXT_THUMB_BUTTON)).css("visibility", "hidden") : $(document.getElementById(this.ELEMENT_ID_NEXT_THUMB_BUTTON)).css("visibility", "visible"))
        },
        JumpCarouselTo: function(t) {
            if (!(0 > t || t >= this.allItemsCount)) {
                var e = $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).data("owlCarousel");
                if (null != e) {
                    var i = t - this.maxDisplayItemCount + 1;
                    0 > i && (i = 0);
                    var n = t
                      , o = e.currentItem;
                    return i > o ? (e.jumpTo(i),
                    void 0) : o > n ? (e.jumpTo(n),
                    void 0) : void 0
                }
            }
        },
        model_PlayerSizeChanged: function() {
            this.UpdateLayoutInfo(),
            this.UpdateVisibility(),
            this.UpdateCarouselSize(),
            this.UpdateThumbnailSize()
        },
        model_ScrollSpotListEx: function(t) {
            var e = $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).data("owlCarousel");
            null != e && e.goTo(t)
        },
        model_PlanSelect: function() {
            var t = this.model.projectJson;
            if (null != t) {
                var e = this.model.planJson;
                if (null != e) {
                    var i = e.sp;
                    if (null != i) {
                        this.allItemCount = i.length,
                        this.displayItemCount = Math.min(this.maxDisplayItemCount, this.allItemCount),
                        this.UpdateCarouselSize();
                        for (var n = $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).empty(), o = 0; o < this.allItemCount; o++) {
                            var s = i[o];
                            $('<div id="spotListExItem' + o + '" class="spotListExItem" style="color: ' + this.fontColor + '; height: auto; text-align: center; text-shadow: none; cursor: pointer;"></div>').appendTo(n),
                            $('<div id="spotListExThumb' + o + '" class="spotListExThumb"></div>').appendTo("#spotListExItem" + o);
                            var a = t.aa + s.ad;
                            "/" != a.substring(a.length - 1) && (a += "/"),
                            $('<img class="spotListExImage" src="' + a + 'thumb.jpg" style="display: block; width: 100%; outline-offset: -4px;"></div>').appendTo("#spotListExThumb" + o),
                            $("<span>" + s.ab + "</span>").appendTo("#spotListExItem" + o),
                            $("#spotListExItem" + o).on("click", function(t) {
                                var e = parseInt(t.currentTarget.id.replace("spotListExItem", ""));
                                if (this.controller.hasAccessLogId) {
                                    var i = t.originalEvent
                                      , n = {
                                        x: i.clientX,
                                        y: i.clientY
                                    };
                                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTEX, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, n)
                                }
                                this.controller.SelectSpot(e)
                            }
                            .bind(this))
                        }
                        n.owlCarousel({
                            items: this.displayItemCount,
                            itemsDesktop: [1199, this.displayItemCount],
                            itemsDesktopSmall: [979, this.displayItemCount],
                            itemsTablet: [768, this.displayItemCount],
                            itemsMobile: [479, this.displayItemCount],
                            pagination: !1,
                            afterMove: this.carousel_AfterMove
                        }),
                        this.UpdateVisibility(),
                        this.UpdateThumbnailSize(),
                        this.UpdateButtonVisibility()
                    }
                }
            }
        },
        model_SpotSelect: function() {
            this.selectedSpotIndex != this.model.spotIndex && (-1 != this.selectedSpotIndex && ($("#spotListExItem" + this.selectedSpotIndex).css("color", this.fontColor),
            $("#spotListExItem" + this.selectedSpotIndex + " img").css("outline", "")),
            this.selectedSpotIndex = this.model.spotIndex,
            $("#spotListExItem" + this.selectedSpotIndex).css("color", this.selectedFontColor),
            $("#spotListExItem" + this.selectedSpotIndex + " img").css("outline", "4px solid " + this.selectedBorderColor),
            this.JumpCarouselTo(this.model.spotIndex))
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility()
        },
        carousel_AfterMove: function() {
            return 0 == this.maximumItem ? ($(document.getElementById("prevThumbButton")).css("visibility", "hidden"),
            $(document.getElementById("nextThumbButton")).css("visibility", "hidden"),
            void 0) : (this.currentItem <= 0 ? $(document.getElementById("prevThumbButton")).css("visibility", "hidden") : $(document.getElementById("prevThumbButton")).css("visibility", "visible"),
            this.currentItem >= this.maximumItem ? $(document.getElementById("nextThumbButton")).css("visibility", "hidden") : $(document.getElementById("nextThumbButton")).css("visibility", "visible"),
            t.mainPlayerController.LogOperation(t.mainPlayerController.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTEX, t.mainPlayerController.constValues.BROWSE_LOG_ACTION_ID_SCROLL, this.currentItem),
            void 0)
        },
        prevThumbButton_Click: function(t) {
            var e = $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).data("owlCarousel");
            if (null != e) {
                if (this.controller.hasAccessLogId) {
                    var i = t.originalEvent
                      , n = {
                        x: i.clientX,
                        y: i.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTEX_PREV_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, n)
                }
                e.prev()
            }
        },
        nextThumbButton_Click: function(t) {
            var e = $(document.getElementById(this.ELEMENT_ID_CAROUSEL)).data("owlCarousel");
            if (null != e) {
                if (this.controller.hasAccessLogId) {
                    var i = t.originalEvent
                      , n = {
                        x: i.clientX,
                        y: i.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTEX_NEXT_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, n)
                }
                e.next()
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.SpotListEx = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        ELEMENT_ID_SPOT_TITLE: "spotTitle",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.CreateElements(),
            this.UpdateLayout()
        },
        CreateElements: function() {
            $("<div></div>").css({
                "background-color": "rgba(24,24,24,0.5)",
                color: "#ffffff",
                "text-align": "center",
                "font-size": "18px",
                "font-weight": "bold",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                position: "absolute",
                left: "50%",
                bottom: "0px",
                width: "150px",
                "margin-left": "-75px",
                padding: "4px 0",
                "z-index": "5000",
                overflow: "hidden"
            }).attr("id", this.ELEMENT_ID_SPOT_TITLE).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
        },
        UpdateLayout: function() {
            var i = t.Zenkei.layoutInfo
              , n = null;
            null != i && i != e && null != i.spottitle && i.spottitle != e && (n = i.spottitle),
            null != n && "false" != n.visible && 0 == this.model.isHmdModeEnabled ? $(document.getElementById(this.ELEMENT_ID_SPOT_TITLE)).css("display", "block") : $(document.getElementById(this.ELEMENT_ID_SPOT_TITLE)).css("display", "none")
        },
        model_PlayerSizeChanged: function() {
            this.UpdateLayout()
        },
        model_SpotSelect: function() {
            var t = this.model.spotJson;
            null != t && $(document.getElementById(this.ELEMENT_ID_SPOT_TITLE)).html(t.ab)
        },
        model_HmdModeStart: function() {
            this.UpdateLayout()
        },
        model_HmdModeStop: function() {
            this.UpdateLayout()
        }
    },
    t.Zenkei != e && (t.Zenkei.SpotTitle = i)
}(window),
function(t, e) {
    function i() {
        this.init()
    }
    function n() {
        this.init()
    }
    var o, s = "upperButtonContainer", a = "lowerButtonContainer", l = "enabled", h = "active", r = "gobackButton", d = "gobackButton", c = "planButton", u = "planButton", g = "planLongButton", g = "planLongButton", p = "sceneListButton", A = "sceneListButton", m = "sceneListLongButton", m = "sceneListLongButton", E = "callButton", I = "callEnableButton", T = "callTapButton", v = "documentRequestButton", S = "documentRequestEnableButton", f = "documentRequestTapButton", y = "shareListButton", w = "shareListEnableButton", M = "shareListTapButton", C = "howtoView", O = "ZENKEIPlayerHelpCookie", D = "helpPanorama", b = "helpPlan", L = "sceneListModalView", N = "sceneList", B = "sceneListLabel", R = "sceneListItemContainer", G = "sceneListItem", k = "listItemFloorplanTitle", P = "listItemSceneTitle", _ = "floorplanTitle", H = "sceneTitle", U = "scrollingListItem", x = "selected", W = "closeSceneListButton", F = "sceneTextContainer", Z = "planModalView", Y = "planTitle", V = "planDisplay", z = "closePlanButton", j = "firstPlanButton", J = "prevPlanButton", Q = "nextPlanButton", X = "poweredByLabel", K = "sceneTitleContainer", q = "titlePillow", s = "upperButtonContainer", te = "kd", ee = [], ie = !0, ne = -1, oe = -1, se = 0, ae = !1, le = null, he = null, re = null, de = null, ce = null, ue = null, ge = null, pe = null, Ae = null, me = null, Ee = null, Ie = null, Te = !1;
    i.prototype = {
        model: null,
        controller: null,
        statusOrientation: "",
        gobackButton: null,
        planButton: null,
        sceneListButton: null,
        callButton: null,
        documentRequestButton: null,
        shareButton: null,
        howtoView: null,
        lastPublishURL: null,
        lastSceneId: -1,
        prevButtonImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA+CAYAAABdhInWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE5RjQ1NzE2Q0YxMUU0QkUwOEJDQkNBMDE1NDM4OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE5RjQ1ODE2Q0YxMUU0QkUwOEJDQkNBMDE1NDM4OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTlGNDU1MTZDRjExRTRCRTA4QkNCQ0EwMTU0Mzg4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTlGNDU2MTZDRjExRTRCRTA4QkNCQ0EwMTU0Mzg4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t1ZSPgAABbxJREFUeNrMmltMY0UYx3tOS7nI0gClWC7lLm2ttAReGp8MPvhqePKFQAJI+qaGRBIDL0ICgeAWA4hcEqn6oDExkSLhFu6wFBOi7kKiXXYL6+JlpSiFLW2P3yFzYKgtbc+ldJIvzTRzTn/55uvM9/1niIqKClEUG+H3yTQKWdAmiSIk6WcEgvNhFhSYM6jNZgs5prKykkS/FYcZieDOMfMIBhoBZAJYErIEiUQS5/F4aLhTMBcyBtIXaDqiBZkCJgfLNhgMeqvV+kV1dfWr0FeCpYG9ABaPhUV0QINA5qjVan1XV1d3Wlqa1mQyfahSqbTw/Ytgqcjb0kCwZDQ9WVJS8kpvb+8HAJlFj5PJZIrOzs53SZJUQVdBfwWWiMWwcKDBIIuLi3Vms/m9jIyMTHw8wGva29tr6DFgGegZ+lkxzkdGC7Kvr+8df0imVVVVvVZTU/M6itd0sGQUr5ew5G1DXkCQJNHU1PSW0WjUI68yISBhYpW8bUimSaXShLa2trdhbBY2/fyB8gHJNLlcroBnTGKxmFmqGFBCnJWVxXVb5AWSabAiKLOzsx3z8/M/oU2A3hR8ZCxB0s1ut//Q3d29gLZTZv9nPfWCQO7u7v5cV1fXfXx8fATd52BeJlEhYwVyZ2fnfkNDw0cnJydPoetEOYCHrUeFgnzQ2Nhodrlcj6D7O9gxF1AhIe8CpB26T8D+AvsXzI2m3hcJaLQhn+OQ4YLeOmQ4oDEBGQo0ZiBvAo0pyGCgMQcZCDQmIf1BYxYSB70VSJvN5otktyHQpxSVrHQ1qIRaRhsrkDioGANNKy0tLQlUiEUI+TFAPoTub1wh/aeeLlGTysrKVAD5PhdIyIJGANIB3UM+IEV4qk97FershJ6enrbU1FQlW8j6+vqvz87OaLgjLAtyc4FkPHmp9zidTjeUAN/4fD4vm5etrq4+AEgf+jd7/VQ6zlIgI0rRud9ZR0fHjMViGWUDW1tb+6bJZNKhujwZSTTxjPIBhSDBFpQp7ghMtxRvbGz8KZFIzg0Gg44giLBzVhhL6PV6DZS+7s3NzX005R7Mw9TQ0BAFf7TLZ6AfNmgg9ZfWPQ9JkjwvLy9/mQWsOjk5mVpfX3+CQTKhcA02ElC8z8TUxYu3traesoXV6XSalJQUcm1t7QB/pz8sG1AKk6q9fMHCCiJeWVnZDwYbaYwKBSvSarXq9PT0uOXl5X0M0htKsw8FKgisRqMpVSgU0qWlJUcgz4YDG0zS4R1WrVa/lJmZmbC4uOgI9AcLBXuT9iQEbIlSqUxaWFh4HKlnQ4lkvMLSDRKe4pycnDuwAz6KxLPhqHm8w0IKWaRSqe7Mzc3t+YF6MVAqUlBBYCEpL8zPz5fNzs7uYVs4fop3DTYSfZR32KKiogKw1JmZmYcBYvYabKRCblBYgHSzgS0sLMyHUJBPT0//GiBmfWxBb4I9ZAtbUFCQBytCxtTU1C8oBJiz0UtYttI477B5eXkq2HLlk5OT9+l0E1UEjKJHcdHweYfNzc3Ng5w13Wq12iiKOkGwF57letjAOyxsCAWQB3snJibuocOGC69yBeUd1u12n/b3939it9v3cUGX8zkTJNgUgjtHHjhC1acD0rjvhoeHvwy3rIHpFo2Pj38Gy9UeHp9cTkUEgYXicGVgYGAeq17PI5XGBYc9ODhwtLS0jKPDBvxUxMf2+IZ3WCixXa2trZ8i0eIPPo5vOMOOjo5+jsNCXFIjIyPj29vbP0KXPmP6W3R1tOgVDDQE7OPBwcFvLRbLMAMLpfnk2NjY90ijeuYnSVK4pCMSChYWb8ZzLmwpc5vN5q9kMtkzo9H4RnNz812kT9Ge/CeYbkpwvUkW6t4TUkfESC1JFF1dKYpPTEwUn0ITXV0nOkWg/5OBBL1OFCQMnMiDh8DISJJObBcKqFURUbybh8tGJOYk/2tvvmCyY7QaDhRQRrqpuPtPgAEAdwJDX3DJAgQAAAAASUVORK5CYII=)",
        nextButtonImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA+CAYAAABdhInWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRTVCNUQzQjE2RDAxMUU0QTU5OTgwQzY3NjJBODhEQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRTVCNUQzQzE2RDAxMUU0QTU5OTgwQzY3NjJBODhEQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFFNUI1RDM5MTZEMDExRTRBNTk5ODBDNjc2MkE4OERBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFFNUI1RDNBMTZEMDExRTRBNTk5ODBDNjc2MkE4OERBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rDDqqQAABXBJREFUeNrMml1II1cUx5NRYzRd3SYxRmM1q8Zds4JBfdGi+NbiS1/aQh/0pS26+LVmi/qiRNgX3WC1YvwsiM9FiqCo4EPfShFbqeu3sFqrlt1Vo66a1SQ9d7gj0+lMMpk4k7nwZzL5uPPLuffcOfecURYWFiqCNCXjSDU/4yhqi+YBSTCEmo8mPz5GDJSCjKEpGr9/A7qmSbGwsCAItqioiNf3iCCfITg1KAGki4mJSYajAZQE+hCkAcWi78IFCTEtSgR4P4oGicBMLperZWxsrA1ep4OMIK1UsEQASHTxD0B6BFlTU/OZzWb7Ki8v74u+vj47vGcGpUgFS3DMSxWGRBApJSUlRVVVVTVKpZL8fnFx8Sfd3d01UlqW4HCeeNB9ULJWq81sb29/olKp1PQflpWVlTudzm+lgmWCIq+OAyVS87Knp6dar9cns/24vLy8FGC/kQKWoEFG4SHXYI82OhyOL61W6+NAHUgFSzBeq6hhr6ys/LiiouJTPp1IAUsw5icaenVpaam5urr6a4IglHw7EhuWzZmiWlpanqjVak2onYkJSzCCDHQbvBkeHv7x4uLiTEiHYsESDEh0376cnJxc6ejoeAGw53KBpf/AC3oPegc6mp+f/72tre0HucBGpaamKljiTFI7Ozvn29vb++BcNghIVKHCms3mjJycHP3c3Nw2NgQlMkSEKcY7nmWC+mlxJtkpwJ6JCcs3+OayqI/eqRxg2UBlCcsFKjvYQKCygg0GKhtYPqCygOULGnHYUEAjChsqqNSwFLAg0ECwB3cAu4kTHO/x0RsOKBusD8UGW1tbh7DxyxcKm5ubq52dnV2B0yuQB0d0N+GAMmHJ+bS7u3u1trb2FqInqxDYjIwMs81muzc1NbUApxcYNmxQ+hJC7WJj9/b2lAD7l1BYk8lkyc/Pv5qenv4NxcfIqsQdQTIt611aWjo+gCakU7fbfTg+Pj5Pyxb6o8MEpdI/MTgfgAJjTXx8fOLIyMjnWVlZllA7PDo6emO3258vLy//TXOosECpXSuVo0K5AINGo0kbHR2ttFgsD4VANjQ0vIBps4UMi4cdgfqi7wDyHkpJglITEhIegCXrBFrydX19fff6+vpLOP0HdEIDFWRRVsjExMRsgHyamZmZLQSyrq7u+42NjWU43Qe9AZ3hJYq0KHEXkFqtNgeGuylMyD/hFM3L16BTOiSfHH4gSD2GtIAlm2D9eyAWZCignJBgSXt6erpZTEi+oLc5KdpwmwwGQw5sd+1paWnpYkMGKzawQZJpcribPYThlgwymEXZIFPh9pY7MDDwFGA/kgoyECirJaE9GhoashuNRpOUkIGqIhTkbekGHMYKc/JZJCDZLMqEJC0JS48VhrsJHCglEpBsqfH/QcIinjc4OGgXAzKUsiRXsYGsL2VnZz92uVxNSUlJxkhCsuXwqUKYzmq1Purv7/+Oq3QjJSRz6KmyoqagoMDc29vbqtPpkuQASXcmJTX8sbGxcU6n0wEhm0EukKzLk8fj8S4uLv4iJ0iuYoOnubn5Z7jgS7lAchYbfD7fMcAOn56eHvOBrK2tFRWSzaK3VRHY8r7q6uoa83q9N8EgNzc3RYUMBIoseTgzM/PrxMTEVKQhmUNP7cs9eL/yFnTQ2dn508rKyhLLnHRKBcnm9X58/73CF0YAe62trb1utxvtDBUnJyeHjY2Nz8Wek3xAKe+/wFvWw/39/XUI7xwAuwVO9mx1dfUP9AekgiQXeo4nyehP6VAZkDhoqsvLy2sM9g7/mbAg+T73xBU4Uxf10JzsHCAJfE7lL6/FtiSfrYifFi9eYysrFf8tQ5LiaxUxQf0K7mfv/AqJHiBE7V8BBgAwmDd8XsHtdgAAAABJRU5ErkJggg==)",
        willLoadImageCount: 0,
        didLoadImageCount: 0,
        firstPlanButtonImageNormal: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGNkE4NzEwRDExNzExRTRCQzQ0QTE5QkI1RDVCNEREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGNkE4NzExRDExNzExRTRCQzQ0QTE5QkI1RDVCNEREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkY2QTg3MEVEMTE3MTFFNEJDNDRBMTlCQjVENUI0REQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkY2QTg3MEZEMTE3MTFFNEJDNDRBMTlCQjVENUI0REQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6IZ2L2AAAE6klEQVR42uycXWxTZRjH/z09Xb/bbaBdBiKRROJwCGOis2yJHyQkxksTEm+8MDF6Y6JeeMElMfHGSw2JMTF+XSgCwxCUkEy2GQTagUsXQYMy5tzWYWa3la1rT33el9PtiO3WHprTrn3+zZO1XbP37S//5zzPe87Oa/vwo3dgkJ3iTYpuij0UrahvjVNEKPop3qfI5H6hGj60j+IIRRtYObXq8QLFyxSvUgwYwe3TqaIl9CDadzyJjRta4fH465paMjmL6VvjGI6dx8TkjTadkcjGAVVPT+E0PNYeRmfHs+wzXcI4WzzbseWB7bgUPYsrw4Pi7Q8odgpwh0V6Cqft2fU0slkNmpamn1l6O1vn6Gyw2WxQFFWymZgcxeTUzXbBTNGth87dBA0aMpmUhMfQIBkIFpIJsRGMdHULxwmCaGzcSE5bYlYFJNg0Nd2fe7lLgAvIPsRu153GKiTBSFdguR3JZjNMZq3ENTBSDdnMZEqQajgOssyAY8eZdhyDM+k4ljnHMTqTjuNUZcdZ7DiGwY7jYxyD41RlseN4rcprVU7Vwnr3vbfhcDigrJxNxVtvHL6nvynOXNtsSm2nqoAWDAbhcrlQjrFTqUV8c+JTHHzxldp2nHCagObxeHCvYycSM/jq6MeYnfvH8uJWHcc4E2NPxf/C0WOfYGlpUToYlQJXyapa6tjXr1/FyW+/hOpQJTS32235/Kuijytl7Ej0R/zQ/x08bhf8fr9M+zuXNhlcQZ0524tYLAKfzyfD5XRCUZSKzH9dgEunl3Dq9Nf448avCAQC8Hq9aGhoWIbG4PJofn4Wx3s/x8zMNAKUmsJpoqUR/wxjNt3LvMivPsWnJ3D8xGfkuBQCVAS81MKoqvo/aHW7yM839s2x39F78gty10rlFEWgEDROVVIsFkXfuVNwUsUMGCpnuSpzTfZxA4NncPnKT7IA+EXlJGjGIlCuXrBmVg6icp7+/hhGR39bLgJ3V85yrz5qIlXtdhUtoU1UEMYlNCf1aKUUgbo+xnXs7qI+LYjYyEX5HoMr4Utve+gRajv8uBjpo9YDRaeq1fNXjANbEYW+tDFClLLhpw7ARtPLZDJFg7Ny/oqxKlnxKFQR7340NjYjHD5ArnNS4Uiv6Sir51+VjsuFx+NDT8/z8HiDSJPzVoNn9fyrfq2qUrUNd+1HdGgQ8fifedepFT3GyT7IiijUg60Sik1BZ0c3Nm/ahlQqlR+SxfNfV+fjHt3RKSvuL9eG7lwp49NKxY+9devDtIZ14+fh8/9pVxhcEWoJbSbH9WDo8oC8aYNPnZeg5qb70PXEfly41CfP12maZul5unULTsjt9hK85xCJnpMnCVTVweCKlcPRgL2PPyPdZuV3sBzcSwdfK3sPlkvRmgZXK1oGp/G9qiYdp7HjTKYqO85kqrLjOFU5VdcFOHYcH+M4VTlVGRyLwTG4ioLje7lMO45hmHMc33ZZksS1tYRsgDXeBm0tGRjNCXDD4tnCYpLJrKGFhfnc06gAJ7exjcfHOF1XVRZT02O5F/0C3CGKkflkAlPxMeZTQIKN2BdYz9BDojiIxBU7KveLzYKTt+ewobkFbpfP0uuU1Shxrfb2whxu/T1B0BK5t183VlWxDbXY1vYIfaDN8CHWikaQZ8vuHLydWNkkfi9FqM5hTVJcQJ5N4v8VYAAyk4l/OMdJNAAAAABJRU5ErkJggg==)",
        firstPlanButtonImageTouch: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIyMkM4OEU3RDExNzExRTRCNDdFQzBGRkRFOUU1QTNEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIyMkM4OEU4RDExNzExRTRCNDdFQzBGRkRFOUU1QTNEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjIyQzg4RTVEMTE3MTFFNEI0N0VDMEZGREU5RTVBM0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjIyQzg4RTZEMTE3MTFFNEI0N0VDMEZGREU5RTVBM0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6LanLHAAAGdUlEQVR42uycS28bVRTH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)",
        prevPlanButtonImageNormal: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkzNENERDU3RDExNzExRTRCMDYwQkExM0ZCODM2ODhFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkzNENERDU4RDExNzExRTRCMDYwQkExM0ZCODM2ODhFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTM0Q0RENTVEMTE3MTFFNEIwNjBCQTEzRkI4MzY4OEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTM0Q0RENTZEMTE3MTFFNEIwNjBCQTEzRkI4MzY4OEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nkv1yAAAEmUlEQVR42uyc729TVRjHv/f2dv3d/QDpMhAJJBAHQxgTnWVL/EFCYvwffGfiS1/xgpe+5iWGRE1IFEiEgMMQEEkm23QC7cCli4pBGWNu6zCj20rXrbc+5+R2u0BL1xtDz9Ln2zxZe3eTnXz2fe7znHN7j/bZ54dhk4viE4ouin0ULahtjVPEKPoojlLkCr8wbCcdoDhO0QpWQS1WfEDxIcVHFP12cAcsqmiOvIK2nW9i/boW+P2hmqaWTs9i+uE4hhODmJi812oxEtnYb1jpKZyG19qi6Gh/l31mSRhns38HNr+8AzfjV3F7eEAcPkaxW4D7VKSncNq+PW8jnzdhmkv0M0+H8zWOToOmadB1Q7KZmBzF5NT9NsFMt6yHjr0EDSZyuayEx9AgGQgWkgmxEYwsdQnHCYJoaFhPTltkViUk2DQ2bih83CPAhWUf4nJZTmOVkmBkKbzcjuTzOSZTLnFtjAxbNjOZCmTYroMsJ+DYcY4dx+AcOo7lzHGMzqHjOFXZcS/YcQyDHcfXOAbHqcpix/FcleeqnKr/v8TqtKbpyoxHt6eqqq+FbAanz3yhxFjWjONSqRl8c/ZLzM49UmqMSl/jppL/4Oy5E1hcXEB9fb1SY1S2qt69+zsufHcKhtuQ0Hw+n1JjVDJVY/Gf8GPfZfh9XoRCIXi9Xuv2JYMrqStXe5BIxBAMBmV4PR7ouq7cP1cZcEtLi7h46Qz+vncH4XAYgUAAdXV1y9AYXBHNz8/ifM/XmJmZRphSUzjN7XbLL7w82cupWFWrpOT0BM5/+xU5LoswFYGA3w/DMJ6BxjMHm+6P/YWeCyfJXSuVUxSBUtA4VUmJRBy91y7CQxUzbKucz5921Xgf1z9wBbdu/yILQEhUToJmLwIlwaFGZw6icl76/hxGR/9cLgJPV84ylqvNVHW5DDRHNlJBGJfQPNSjVVIEavoa1763k/q0eiRGbsi/yeAq0Latr1LbEcKNWC+1Hlh1qqoETrcP6kVGhFI2+tYhaDSEXC63anDVjmfBVeHV0NCEaPQQuc5DhWOprKN4IdMmvz+I7u738fPgDzT1egSDG+AKBkHVNtp5EPGhASSTD4rOU5W9xskeqYqhazo62ruwaeM2ZLPZ4pCqPEZ7H6ncetyunR2y4v72x5B0Hi8rVaAtW7bTHNaHX4cHn2hXGNwq1BzZRI7rxtCtfvlgBi+dV6CmxpfQ+cZBXL/ZK9frTNNUZp1O+fuqPl+A4L2HWPyaXCQwDDeDW63c7jrsf/0d6TZVxrlmvjtSSFEGt8a1DM7kZ1UdOs5kxzlMVXacw1Rlx3GqcqquCXDsOL7GcapyqjI4FoNjcFUFx89yOXYcw3DmOH7ssiKJ+24p2QCbvA1aOdkYzQlww+JdZiHNZMook5kvvI0LcHIb22RyjNP1ucpjanqs8KFPgDtCMTKfTmEqOcZ8SkiwEfsCWxl6RBQHkbhiR+U+sVlw+vEc1jU1w+cNKnMPs1oS93EfZ+bw8N8JgpYqHP7YXlXFNtRiW9vjdEKr7STWikZQZMvuArzdWNkkfj9FpMZhTVJcR5FN4v8TYADRiUwAGCNfQgAAAABJRU5ErkJggg==)",
        prevPlanButtonImageTouch: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2QUQ0QkI2RDExNzExRTRBODc2ODVDODBFQjM5QzJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg2QUQ0QkI3RDExNzExRTRBODc2ODVDODBFQjM5QzJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZBRDRCQjREMTE3MTFFNEE4NzY4NUM4MEVCMzlDMkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZBRDRCQjVEMTE3MTFFNEE4NzY4NUM4MEVCMzlDMkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4n778OAAAGJUlEQVR42uycS28bVRTH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)",
        nextPlanButtonImageNormal: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyNDIxN0M3RDExNzExRTRBNjQ4RkY0QkQ1MjAxRDZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyNDIxN0M4RDExNzExRTRBNjQ4RkY0QkQ1MjAxRDZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTI0MjE3QzVEMTE3MTFFNEE2NDhGRjRCRDUyMDFENkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTI0MjE3QzZEMTE3MTFFNEE2NDhGRjRCRDUyMDFENkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zOtxjAAAEP0lEQVR42uycy28TVxTGv7HHiUlIlFcT15Sk4hXqvJwHKCX2goeqbvI/dIfEkhULlqxZUiHBnoqo6gpoK9jkoRbRSCEUqSpdxIlCnAcQJ3ZisD2cMxrDqElwMkiZO/L5rCO/RsrVL9+558z1zNV+vHUFNvkpLlPEKfopwihvzVP8RTFKcZ0iX/xCtx0Uo7hJEYGoqLAVwxQ/UFykGLODi1lUEWppQ1fHIJoaw6iqqilrapnMGpZX5jH99x9YSM5ELEacjWO6lZ7sNPR0DWGg77z4zBIbp7WqHa2H2/Fk8iGmpsf54xsU3QzuGqcnO60/ehaGUUChkKNngz42yhydBk3T4PPpJpuFZALJxdkuZuazrIeBXoKGAvL5tyY8gQaTAbMwmRAbZmQpzo5jgqirayKnvRNWO4jZ1Nc3F99GGVyt2Yf4/ZbTRDuJGVmq/dCOGEZeyJRKXBsj3ZbNQmYP0m3zoMgJOHGcY8cJOIeOEzlznKBz6DhJVXHcPjtOYIjjZI4TcJKqInGcnKvKuaqkqjPxCrSm+TwBzmdPVbcfd0ZuI/s2q8RYdnpsBWcYrkci8R9Gfr6NVOqNEuPZLraAM+c4l0P3+7G5mca9X3/CynJSiTFtCRVTlSY46LoODQU8+P0uZhIvlE1V5fo4rQiPnkfH76M7NYjOjn6pqrsV/4YZDAbx9NmfWE29xpnB8wJu1yXf50OwshKzs//i0UYG8dj3phvVakcUqlj/h1dJ8FZevcSD3+4inV5TrKoqLJ7vAoEAstk0FY0RgrgojivluC1Fgyruw0e/YH4+4eoYPbU6Yq+4YxNUcbu+xYnjnbI6speKy/Pe1NMJpNZeo78vJqsje6q41K7MzPyD9bVVDJ35bl8rrqcXMosVNxQ6ZF3fZwi43YKLfDOArw4d2ffxexac36+jLxpHQ0OzK2P3JLhgsAq9PTHU1NS5Nm7PVdXq6lr09sZxgOC5OWZPOa6+/gtEe4bMNHV7vJ4B92WoDSdP9pkFQYWxeqKPa2s9gWNHO5Uap9KO41Or9uNRhMNfKzc+hRcydXRETqGxoUXJf6oy4HK5HDTrdUVFpXnrp5vthmfA5fM5q92ooR4tbvZqKhcsZcDx329pDmPw9AUEAhXKV3llwOl6AOfODlO74fdET6lUceDrRrxy6ifXx30uuILcq+rQcQVxnMNUFcc5TFVxnKSqpKq0IzLHiSRVJVUFnIATcKJS4OReLseOExjOHCe3Xe5JfA1wymyAC7INWinZGK0zuGl+tZnNCJkS4vvMLE0yOHMb26WlOUnXT8rA4vJc8c0og7tK8TydSWFxaU747CBmw/sCWxl6lYsDJy7vqDzKmwVnNtbR2BDCgeBB8ye7clYu9w4bm+tYebVA0FLFjy/ZqypvQ83b2t6kAyK2g0Qf9RzbbNldhNeNj5vEn6ZoKXNYSYrH2GaT+PcCDAB+k68u0AwAOAAAAABJRU5ErkJggg==)",
        nextPlanButtonImageTouch: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwOUExOEM0RDExNzExRTQ5MTU2QzBCRDEyMDRGMzZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwOUExOEM1RDExNzExRTQ5MTU2QzBCRDEyMDRGMzZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjA5QTE4QzJEMTE3MTFFNDkxNTZDMEJEMTIwNEYzNkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjA5QTE4QzNEMTE3MTFFNDkxNTZDMEJEMTIwNEYzNkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6i1F5XAAAF0klEQVR42uycy28bVRTGvzsev5M0ToJCw6bqBhRBVEqpCmqFWCAkJPgb2CGxZMWiS9YsQZXYsqjYgVAELUU05lVKnrRVE6Iukra0atoSx079mBnOuZ6JZ+yxA6b1XMv3OCe27FES/XIe333MFZ9+9iF8FiP/gPwU+UvkUxhsu0X+O/kc+cfklveB6bvoJPkZ8mlo82zK9bfJ3yV/jzzvB3fSpQrLsskBQ8QgpPO7Qn4NhDn1bw49O44FmzxGeRiLGdMuI87GvOmmJ0caalWbLkginU0hHk/QawYnIAaGmseOwTkUQBaq1QrK5UfEpgwzbvDHn5DPMLiPOD1t20EikUUmk0UqmaaLCJxhEDhjIHPUcSjzbJuAVfAosYtiaYdA7sIwxAvMzHRDjyyOdIbBDSHJ4EyTLiJoYtDizctWBzaDowAyKPP4vUKhxnnJn55icEwQyUSSIi1F0FLyNeW0rG1CiAGNOEIVcyjrYhKlZdVQKSdRrUlwRxjciOwSZhJmLC5dRhoM9wcMakMV0hlFzDDrbEwGV+QPR/bkCMMSMjUh09PBwBJr4kdZZwjJph5QTTpO+BWHo6GFxp+vapl+VjLKnHor1hYoeK5ECQFXB1Yvihpca6OQSHxczIDo8z20NQniJi5mQL04PtcWSFU35MJqnBNwbc2pGuQSaA7Q4NqLYadNc+Cxmd+1BcetzVx0qv7fVIUDDW4fcAhPVR1xXTYHDa47cNDNYd/mgLbNAXvDLm2t+len6uMWwN4ihQYXAs6bHRFaAHclgIVo0XHRp2o2m0Op9FC5iG/oOEVr3NDQKCbGD2Lz5ipqtaqSNU6oCC6RSGLq4CGC9zSWV35EubLbHwIYEdc4XsHlNd3xsUmCmMLi0g/YKf6tRI2rswkBJ+Wd0/CojNdxOfI4ZV8+9gYWV/LY2rodKbg9Lu0nMlVZcxCIx+PIjT6FYy++jivXfsPG5mrEqeoJYKG6ABaIxUwMU8OYef4VuZ9lbX05kjIS5CJCBLCCIweGl82M4LlnjyKVyuLK1V9Rs6oRgQuZVqpPNvldHeMV9Ex6CIcPTSOdzmJh6SLK5VIv0bVwUUoAd24aBkVcBs9MHUaani9dPt+zjhsmgI12NS4K/zcdNyk77hRePfEWxnKTkf2NwQXpvpgdaXTcE8ffxBIJ5Y3Ntd7UOPT9Sr6AacYxMpzD0SOvIZMZxvW1hSfWcTuv5Dvou5V87rhD2RHYVo2EvfUkQ86bd1NzkP+fFT3B+umXWazf+CO6sWq/7Vaq1so4f+EL3Lm70bORA/p96rxIMuTbC2fx8OE9FWZH+qPE3X9wF+e+O4tiqdDDkUMrl2DEeQ9Fyd26fQPnKD17PckZxqVvUnV1bRH5n2dlQ4h2kN9HOm5hOY/L899HN63UbzqO/8MX819i9c+lqP+QDjrOt5VVhVStVsuynm3eXFfhP7i381y5GidvtnOXkEq7Bcx+8znubf2lTOTvI4CjBFeHVyg8wNezX2GnuK1Mjd1nXTXaGWD+nYXt+1hcmkOlUlaqOXWcAY46Vfmm2mvX55WUQopvLHSUHbHoHZkanFIjB9t3gd7mFQoubCur7TSW+oWOuIA1toZAPR3XDxEXruNsFxo/Cw0uAM7HJqQ5+LeyCk0rEHGd7uXy3VauU7U1VTsM8vW9XF0NuXRz6HqQrw8z6AxO31nzuEcO+hSIDtMP7dccdHPoujlA1Q2ZKoRcCxdd47qscUYQq7b9Q68BTq6K8EKJjrbOEec79nKHX63wq3jCdG+f1vBaoKE+R5lIxr235xmcPMZ2YiKHmmXBtmx5NqSGV4fGLJgJs2FGrs1xczhN/k42m5kePVDB9naxnsPyRNbBPiNTHmlrW6hWqhg9MIxMJg03Q08zON7+wycqz42NjyKVTkp4Vq1KtDHQ4OT5mKaJ3OSYB43tfb8c4WOo+VjbM3TBtO8ibQ27ipAjuz14M2gcEn+cfHLAYd0hv4SQQ+L/EWAAcyJowEdWqtIAAAAASUVORK5CYII=)",
        isMultiPlan: !1,
        sceneListJQuery: null,
        init: function() {
            null != t.Zenkei.layoutInfo && t.Zenkei.layoutInfo != e,
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.isMultiPlan = t.projectJson.pl.length > 1,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.planSelectEventHandler.Register(this.model_PlanSelect.bind(this)),
            this.model.planSilentSelectEventHandler.Register(this.model_PlanSilentSelect.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.showCustomDesignHelpViewEventHandler.Register(this.model_ShowCustomDesignHelpView.bind(this)),
            this.model.customDesignPlanButtonClickedEventHandler.Register(this.model_CustomDesignPlanButtonClicked.bind(this)),
            this.model.customDesignClosePlanButtonClickedEventHandler.Register(this.model_CustomDesignClosePlanButtonClicked.bind(this)),
            this.model.customDesignSpotListButtonClickedEventHandler.Register(this.model_CustomDesignSpotListButtonClicked.bind(this)),
            this.model.customDesignCloseSpotListButtonClickedEventHandler.Register(this.model_CustomDesignCloseSpotListButtonClicked.bind(this)),
            this.model.walkThroughStartedEventHandler.Register(this.model_WalkThroughStarted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            null == this.lastPublishURL && (this.lastPublishURL = t.location.href),
            this.isMultiPlan || ($("#planNavigationBar").css("display", "none"),
            $("#" + V + "." + te).css("border-bottom", "4px solid #333333")),
            $("#" + K).css({
                visibility: "hidden"
            }),
            $("#" + F).css({
                visibility: "hidden"
            }),
            $("#" + Z).css("overflow", "hidden"),
            this.initButtons(),
            this.initHelpView(),
            this.initSceneList(),
            this.updateLayout()
        },
        initButtons: function() {
            this.willLoadImageCount = 0,
            this.gobackButton = $("#" + r);
            var e = t.mainPlayerController.hasAccessLogId;
            if (this.gobackButton[0]) {
                var i = $("#" + r).attr("class");
                ce = d + " " + l + " " + i,
                ue = d + " " + h + " " + i,
                de = t.projectJson.aj,
                $("#" + r).attr("class", ce),
                this.gobackButton.on("touchstart", function() {
                    $("#" + r).attr("class", ue),
                    ae = !0
                }),
                this.gobackButton.on("touchmove", function() {
                    $("#" + r).attr("class", ce),
                    ae = !1
                }),
                this.gobackButton.on("touchend", function(e) {
                    if (ae) {
                        if (t.mainPlayerController.hasAccessLogId) {
                            var i = e.originalEvent
                              , n = i.touches;
                            if (1 == n.length) {
                                var o = n[0]
                                  , s = {
                                    x: o.pageX,
                                    y: o.pageY
                                };
                                t.mainPlayerController.LogOperation(t.mainPlayerController.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_BACK_BUTTON, t.mainPlayerController.constValues.BROWSE_LOG_ACTION_ID_CLICK, s, !0)
                            }
                        }
                        top.location.href = de,
                        ae = !1
                    }
                    $("#" + r).attr("class", ce)
                }),
                this.willLoadImageCount++
            }
            if (this.planButton = $("#" + c),
            this.planButton[0]) {
                var i = this.planButton.attr("class");
                this.gobackButton[0] ? (ge = u + " " + l + " " + i,
                pe = u + " " + h + " " + i) : (ge = g + " " + l + " " + i,
                pe = g + " " + h + " " + i),
                $("#" + c).attr("class", ge),
                this.planButton.on("touchstart", function() {
                    $("#" + c).attr("class", pe),
                    ae = !0
                }),
                this.planButton.on("touchmove", function() {
                    $("#" + c).attr("class", ge),
                    ae = !1
                }),
                this.planButton.on("touchend", $.proxy(this.openPlanView, this)),
                e && this.planButton.on("click", $.proxy(this.planButton_Click, this)),
                this.willLoadImageCount++
            }
            if (this.sceneListButton = $("#" + p),
            this.sceneListButton[0]) {
                var i = this.sceneListButton.attr("class");
                this.gobackButton[0] ? (Ae = A + " " + l + " " + i,
                me = A + " " + h + " " + i) : (Ae = m + " " + l + " " + i,
                me = m + " " + h + " " + i),
                $("#" + p).attr("class", Ae),
                this.sceneListButton.on("touchstart", function() {
                    $("#" + p).attr("class", me),
                    ae = !0
                }),
                this.sceneListButton.on("touchmove", function() {
                    $("#" + p).attr("class", Ae),
                    ae = !1
                }),
                this.sceneListButton.on("touchend", $.proxy(this.openSceneList, this)),
                e && this.sceneListButton.on("click", $.proxy(this.sceneListButton_Click, this)),
                this.willLoadImageCount++
            }
            this.callButton = $("#" + E),
            this.callButton[0] && (he = t.projectJson.ai,
            $("#" + E).attr("class", I),
            this.callButton.on("touchstart", function() {
                $("#" + E).attr("class", T),
                ae = !0
            }),
            this.callButton.on("touchmove", function() {
                $("#" + E).attr("class", I),
                ae = !1
            }),
            this.callButton.on("touchend", function() {
                ae && (t.top.location = "tel:" + he,
                ae = !1),
                $("#" + E).attr("class", I)
            }),
            e && this.callButton.on("click", $.proxy(this.callButton_Click, this)),
            this.willLoadImageCount++),
            this.documentRequestButton = $("#" + v),
            this.documentRequestButton[0] && (le = t.projectJson.ak,
            $("#" + v).attr("class", S),
            this.documentRequestButton.on("touchstart", function() {
                $("#" + v).attr("class", f),
                ae = !0
            }),
            this.documentRequestButton.on("touchmove", function() {
                $("#" + v).attr("class", S),
                ae = !1
            }),
            this.documentRequestButton.on("touchend", function() {
                ae && (t.open(le, "_blank"),
                ae = !1),
                $("#" + v).attr("class", S)
            }),
            e && this.documentRequestButton.on("click", $.proxy(this.documentRequestButton_Click, this)),
            this.willLoadImageCount++),
            this.shareButton = $("#" + y),
            this.shareButton[0] && ($("#" + y).attr("class", w),
            this.shareButton.on("touchstart", function() {
                $("#" + y).attr("class", M),
                ae = !0
            }),
            this.shareButton.on("touchmove", function() {
                $("#" + y).attr("class", w),
                ae = !1
            }),
            this.shareButton.on("touchend", function() {
                ae && (t.top.location = re,
                ae = !1),
                $("#" + y).attr("class", w)
            }),
            e && this.shareButton.on("click", $.proxy(this.shareButton_Click, this)),
            this.willLoadImageCount++),
            this.loadImage(this.gobackButton),
            this.loadImage(this.planButton),
            this.loadImage(this.sceneListButton),
            this.loadImage(this.callButton),
            this.loadImage(this.documentRequestButton),
            this.loadImage(this.shareButton),
            $("#" + z).on("click", $.proxy(this.closePlanButton_Click, this)),
            $("#" + j).on("click", $.proxy(this.firstPlanButton_Click, this)),
            $("#" + j).on("touchstart", $.proxy(this.firstPlanButton_TouchStart, this)),
            $("#" + j).on("touchend", $.proxy(this.firstPlanButton_TouchEnd, this)),
            $("#" + j).on("touchleave", $.proxy(this.firstPlanButton_TouchLeave, this)),
            $("#" + j).on("touchcancel", $.proxy(this.firstPlanButton_TouchCancel, this)),
            $("#" + J).on("click", $.proxy(this.prevPlanButton_Click, this)),
            $("#" + J).on("touchstart", $.proxy(this.prevPlanButton_TouchStart, this)),
            $("#" + J).on("touchend", $.proxy(this.prevPlanButton_TouchEnd, this)),
            $("#" + J).on("touchleave", $.proxy(this.prevPlanButton_TouchLeave, this)),
            $("#" + J).on("touchcancel", $.proxy(this.prevPlanButton_TouchCancel, this)),
            $("#" + Q).on("click", $.proxy(this.nextPlanButton_Click, this)),
            $("#" + Q).on("touchstart", $.proxy(this.nextPlanButton_TouchStart, this)),
            $("#" + Q).on("touchend", $.proxy(this.nextPlanButton_TouchEnd, this)),
            $("#" + Q).on("touchleave", $.proxy(this.nextPlanButton_TouchLeave, this)),
            $("#" + Q).on("touchcancel", $.proxy(this.nextPlanButton_TouchCancel, this))
        },
        loadImage: function(t) {
            if (null != t && t[0]) {
                var i = $(t).css("background-image");
                if (i != e) {
                    var n = new Image;
                    n.src = i.replace(/url\(|\)$|"/gi, "");
                    var o = this;
                    n.onload = function() {
                        t.originalWidth = n.width,
                        t.originalHeight = n.height,
                        o.didLoadImageCount++,
                        o.didLoadImageCount == o.willLoadImageCount && o.updateLayout()
                    }
                }
            }
        },
        openPlanView: function() {
            ae ? "hidden" != $("#" + Z).css("visibility") ? ($("#" + Z).css({
                visibility: "hidden"
            }),
            $("#" + c).attr("class", ge)) : (this.closeSceneList(),
            this.controller.StopAutoPan(),
            this.controller.StopSlideshow(),
            $("#" + Z).css({
                visibility: "visible"
            }),
            $("#" + c).attr("class", pe),
            this.controller.FirePlanButtonClickedEvent(!0)) : $("#" + c).attr("class", ge)
        },
        closePlanView: function() {
            $("#" + Z).css({
                visibility: "hidden"
            }),
            $("#" + c).attr("class", ge),
            this.model.planIndex != this.model.planIndexSilent && this.controller.SelectPlanSilent(this.model.planIndex)
        },
        selectFirstPlanSilent: function() {
            var t = this.model.planIndexSilent;
            null == t || t == e || 0 >= t || this.controller.SelectPlanSilent(0)
        },
        firstPlanButton_TouchStart: function() {
            $("#" + j).css("background-image", this.firstPlanButtonImageTouch)
        },
        firstPlanButton_TouchEnd: function() {
            $("#" + j).css("background-image", this.firstPlanButtonImageNormal)
        },
        firstPlanButton_TouchLeave: function() {
            $("#" + j).css("background-image", this.firstPlanButtonImageNormal)
        },
        firstPlanButton_TouchCancel: function() {
            $("#" + j).css("background-image", this.firstPlanButtonImageNormal)
        },
        prevPlanButton_TouchStart: function() {
            $("#" + J).css("background-image", this.prevPlanButtonImageTouch)
        },
        prevPlanButton_TouchEnd: function() {
            $("#" + J).css("background-image", this.prevPlanButtonImageNormal)
        },
        prevPlanButton_TouchLeave: function() {
            $("#" + J).css("background-image", this.prevPlanButtonImageNormal)
        },
        prevPlanButton_TouchCancel: function() {
            $("#" + J).css("background-image", this.prevPlanButtonImageNormal)
        },
        nextPlanButton_TouchStart: function() {
            $("#" + Q).css("background-image", this.nextPlanButtonImageTouch)
        },
        nextPlanButton_TouchEnd: function() {
            $("#" + Q).css("background-image", this.nextPlanButtonImageNormal)
        },
        nextPlanButton_TouchLeave: function() {
            $("#" + Q).css("background-image", this.nextPlanButtonImageNormal)
        },
        nextPlanButton_TouchCancel: function() {
            $("#" + Q).css("background-image", this.nextPlanButtonImageNormal)
        },
        selectPrevPlanSilent: function() {
            var t = this.model.planIndexSilent;
            if (!(null == t || t == e || 0 >= t)) {
                var i = t - 1;
                this.controller.SelectPlanSilent(i)
            }
        },
        selectNextPlanSilent: function() {
            var i = this.model.planIndexSilent
              , n = t.projectJson.pl.length;
            if (!(null == i || i == e || 0 > i || i >= n - 1)) {
                var o = i + 1;
                this.controller.SelectPlanSilent(o)
            }
        },
        initSceneList: function() {
            this.sceneListJQuery = $("#" + N);
            var e = this.sceneListJQuery.attr("data-visible-item-count");
            !isNaN(e) && e > 0 && (this.sceneListVisibleItemCount = e),
            $("#" + W).on("click", $.proxy(this.closeSceneListButton_Click, this));
            for (var i = 0, n = 0; n < t.projectJson.pl.length; n++)
                for (var o = t.projectJson.pl[n], s = 0; s < o.sp.length; s++) {
                    var a = o.sp[s]
                      , l = $("#" + G).clone();
                    l.planIndex = n,
                    l.sceneIndex = s;
                    var h = $(l).attr("id") + i;
                    $(l).attr({
                        id: h
                    }).appendTo("#" + R),
                    $(l[0].getElementsByClassName(k)).text(o.ab),
                    $(l[0].getElementsByClassName(P)).text(a.ab),
                    $(l).bind("click", {
                        item: l,
                        parent: this
                    }, function(t) {
                        var e = t.data.parent;
                        e.closeSceneList();
                        var i = t.data.item.planIndex
                          , n = t.data.item.sceneIndex;
                        if (e.controller.hasAccessLogId) {
                            var o = t.originalEvent
                              , s = {
                                x: o.clientX,
                                y: o.clientY
                            };
                            e.controller.LogOperation(e.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_SPOTLIST, e.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, s)
                        }
                        e.controller.SelectPlanAndSpot(i, n)
                    }),
                    i++
                }
            $("#" + G).remove()
        },
        openSceneList: function() {
            ae ? "none" != $("#" + L).css("display") ? ($("#" + L).css({
                display: "none"
            }),
            $("#" + p).attr("class", Ae)) : (this.closePlanView(),
            this.controller.StopAutoPan(),
            this.controller.StopSlideshow(),
            $("#" + L).css({
                display: "block"
            }),
            $("#" + p).attr("class", me),
            this.updateLayout(),
            $("#" + N).scrollTop(se)) : $("#" + p).attr("class", Ae)
        },
        closeSceneList: function() {
            $("#" + L).css({
                display: "none"
            }),
            $("#" + p).attr("class", Ae)
        },
        setMailto: function(e) {
            var i = t.layoutInfo.mailTitle;
            this.lastPublishURL = this.lastPublishURL.replace(this.lastSceneId, e);
            var n = this.lastPublishURL
              , o = t.layoutInfo.mailText;
            o = o.replace("<urlForMobile>", n),
            o = o.replace("<gobackUrl>", de),
            o = o.replace(/&/g, "%26"),
            o = o.replace(/\?/g, "%3f"),
            this.model.userAgent.isChrome && this.model.userAgent.isAndroid && (o = o.replace(/%0d%0a%0d%0a/g, "%0d%0a"),
            o = o.replace(/%0d%0a/g, "%e3%80%80")),
            re = "mailto:?subject=" + i + "&body=" + o
        },
        initHelpView: function() {
            this.howtoView = $("#" + C),
            this.howtoView[0] && (this.willLoadImageCount += 2);
            var t = $("#" + C).attr("class");
            Ee = D + " " + t,
            $("#" + C).attr("class", Ee),
            this.loadImage(this.howtoView),
            Ie = b + " " + t,
            $("#" + C).attr("class", Ie),
            this.loadImage(this.howtoView)
        },
        getCookie: function(t) {
            var e = t + "="
              , i = document.cookie
              , n = i.indexOf(e)
              , o = null;
            if (-1 != n) {
                var s = n + e.length
                  , a = i.indexOf(";", s);
                -1 == a && (a = i.length),
                o = decodeURIComponent(i.substring(s, a))
            }
            return o
        },
        setCookie: function(t, e) {
            document.cookie = t + "=" + escape(e)
        },
        updateLayout: function() {
            if (this.willLoadImageCount == this.didLoadImageCount) {
                var e, i = t.Zenkei.layoutInfo.panorama.size.width, n = t.Zenkei.layoutInfo.panorama.size.height, l = $("#" + s);
                if (l[0])
                    if (this.model.isOrientationPortrait) {
                        var h, r, d = parseInt(.015 * n);
                        this.gobackButton[0] ? (h = this.gobackButton.originalWidth,
                        r = this.gobackButton.originalHeight) : (h = this.planButton.originalWidth,
                        r = this.planButton.originalHeight);
                        var c;
                        if (this.gobackButton[0]) {
                            var u = this.gobackButton.originalWidth
                              , g = this.planButton.originalWidth
                              , p = this.sceneListButton.originalWidth
                              , A = u + g + p
                              , m = l.width() - 4 * d
                              , E = u / A * m
                              , I = g / A * m
                              , T = p / A * m
                              , v = this.gobackButton.originalHeight * E / u
                              , S = this.planButton.originalHeight * I / g
                              , f = this.sceneListButton.originalHeight * T / p;
                            e = Math.ceil((v + S + f) / 3 + 2 * d),
                            this.gobackButton.css({
                                left: d,
                                top: .5 * (e - v),
                                width: E,
                                height: v
                            }),
                            this.planButton.css({
                                left: 2 * d + E,
                                top: .5 * (e - S),
                                width: I,
                                height: S
                            }),
                            this.sceneListButton.css({
                                left: 3 * d + E + I,
                                top: .5 * (e - f),
                                width: T,
                                height: f
                            })
                        } else {
                            c = (i - 3 * d) / 2 / h;
                            var y = parseInt(this.planButton.originalWidth * c)
                              , w = parseInt(this.planButton.originalHeight * c)
                              , M = d
                              , C = parseInt((l.width() - 2 * y) / 3)
                              , O = C;
                            this.planButton.css({
                                left: O,
                                top: M,
                                width: y,
                                height: w
                            });
                            var D = C + y + C;
                            this.sceneListButton.css({
                                left: D,
                                top: M,
                                width: y,
                                height: w
                            }),
                            e = parseInt(r * c) + 2 * d
                        }
                        l.css({
                            visibility: "visible",
                            height: e
                        })
                    } else
                        l.css({
                            visibility: "hidden"
                        });
                if ($("#" + F)[0]) {
                    var b, N;
                    l[0] && "hidden" != l.css("visibility") ? (b = l.height(),
                    N = l.height()) : (b = 0,
                    N = this.model.isOrientationPortrait ? .12 * n : .18 * n);
                    var R = parseInt(.28 * N);
                    $("#" + F).css({
                        top: b,
                        height: N,
                        "font-size": R,
                        "line-height": N + "px"
                    }),
                    this.updateTitlePillowLayout()
                }
                var k = $("#" + a);
                if (k[0])
                    if (this.model.isOrientationPortrait) {
                        var d = parseInt(.015 * n)
                          , P = (this.callButton.originalWidth + this.documentRequestButton.originalWidth + this.shareButton.originalWidth) / 3
                          , c = (i - 4 * d) / 3 / P
                          , _ = parseInt($("#" + s).css("height"));
                        (isNaN(e) || 0 == e) && (_ = parseInt(this.callButton.originalHeight * c) + 2 * d),
                        k.css({
                            visibility: "visible",
                            height: _
                        });
                        var H = parseInt(this.callButton.originalWidth * c)
                          , W = parseInt(this.callButton.originalHeight * c)
                          , z = d
                          , j = d;
                        this.callButton.css({
                            left: j,
                            top: z,
                            width: H,
                            height: W
                        });
                        var J = parseInt(this.documentRequestButton.originalWidth * c)
                          , Q = parseInt(this.documentRequestButton.originalHeight * c)
                          , K = d
                          , q = j + H + d;
                        this.documentRequestButton.css({
                            left: q,
                            top: K,
                            width: J,
                            height: Q
                        });
                        var te = this.shareButton.originalWidth * c
                          , ee = this.shareButton.originalHeight * c
                          , ie = d
                          , ne = q + J + d;
                        this.shareButton.css({
                            left: ne,
                            top: ie,
                            width: te,
                            height: ee
                        })
                    } else
                        k.css({
                            visibility: "hidden"
                        });
                if ($("#" + L)[0]) {
                    var oe = n
                      , ae = 0
                      , e = parseInt($("#" + s).css("height"));
                    e > 0 && (oe -= e,
                    ae = e);
                    var _ = parseInt($("#" + a).css("height"));
                    if (_ > 0 && (oe -= _),
                    parseInt($("#" + L).css("width")),
                    $("#" + L).css({
                        top: ae,
                        height: oe
                    }),
                    $("#" + B)[0]) {
                        var le = $("#" + B)
                          , he = le.parent();
                        if (null != he) {
                            var re = he.height()
                              , R = Math.floor(.36 * re);
                            R = Math.max(R, 14),
                            le.css({
                                "line-height": re + "px",
                                "font-size": R + "px"
                            })
                        }
                    }
                    var de = this.sceneListJQuery.width()
                      , ce = de - 10
                      , ue = parseInt($("#" + G + "0").css("padding-left"));
                    parseInt(.5 * (de - ce - ue));
                    var ge = this.sceneListJQuery.height();
                    o = parseInt(ge / this.sceneListVisibleItemCount);
                    for (var pe = 0, Ae = 0; Ae < t.projectJson.pl.length; Ae++)
                        for (var me = t.projectJson.pl[Ae], Ee = 0; Ee < me.sp.length; Ee++) {
                            var Ie = o * pe
                              , Te = G + pe;
                            parseInt(.4 * o),
                            $("#" + Te).css({
                                top: Ie,
                                width: ce,
                                height: o,
                                "font-size": R,
                                "line-height": o + "px"
                            }),
                            Ae == this.model.planIndex && Ee == this.model.spotIndex && ($(this.sceneListJQuery[0].getElementsByClassName(U)).removeClass(x),
                            $("#" + Te).addClass(x),
                            se = pe * o),
                            pe++
                        }
                    var ve = parseInt($("#" + B).parent().css("top"))
                      , Se = parseInt($("#" + B).parent().css("height"));
                    $("#" + B).css({
                        top: ve,
                        height: Se
                    }),
                    this.model.isOrientationPortrait || ($("#" + L).css({
                        display: "none"
                    }),
                    this.closeSceneList())
                }
                var fe = $("#" + Z);
                if (fe[0]) {
                    var ye = n
                      , we = 0
                      , e = parseInt($("#" + s).css("height"));
                    e > 0 && (ye -= e,
                    we = e);
                    var _ = parseInt($("#" + a).css("height"));
                    _ > 0 && (ye -= _),
                    fe.css({
                        top: we,
                        height: ye
                    });
                    var Me = parseInt($("#" + Y).parent().css("top"))
                      , Ce = parseInt($("#" + Y).parent().css("height"));
                    $("#" + Y).css({
                        top: Me,
                        height: Ce
                    });
                    var Oe = Me + Ce
                      , De = ye - 2 * Me - Ce;
                    if (this.isMultiPlan && (De -= 64),
                    $("#" + V).css({
                        top: Oe,
                        height: De
                    }),
                    this.isMultiPlan) {
                        var be = Oe + De;
                        $("#planNavigationBar").css({
                            top: be
                        })
                    }
                    this.model.isOrientationPortrait || this.closePlanView()
                }
                var Le = $("#" + Y);
                if (Le[0]) {
                    var Ne = Le.parent();
                    if (null != Ne) {
                        var re = Ne.height()
                          , R = Math.floor(.36 * re);
                        R = Math.max(R, 14),
                        Le.css({
                            "line-height": re + "px",
                            "font-size": R + "px"
                        })
                    }
                }
                if ($("#" + X)[0]) {
                    var R;
                    R = $("#" + F)[0] ? parseInt(.2 * $("#" + F).height()) : .025 * n;
                    var Be = 0;
                    if (this.model.isOrientationPortrait) {
                        var _ = parseInt($("#" + a).css("height"));
                        _ > 0 && (Be = _,
                        !this.model.userAgent.isAndroid || this.model.userAgent.isChrome || this.model.userAgent.isWindowsMobile || (Be -= 1))
                    }
                    $("#" + X).css({
                        "font-size": R + "px",
                        bottom: Be
                    })
                }
                this.setHelpViewLayout(),
                this.controller.FireCustomDesignLayoutUpdatedEvent()
            }
        },
        setHelpViewLayout: function() {
            if (null != this.howtoView[0]) {
                var e = 0
                  , i = 0
                  , n = 0
                  , o = $("#" + X);
                null != o[0] && "hidden" != o.css("visibility") && (e = o.height());
                var l = $("#" + s);
                null != l[0] && "hidden" != l.css("visibility") && (i = l.height());
                var h = $("#" + a);
                null != h[0] && "hidden" != h.css("visibility") && (n = h.height());
                var r = t.Zenkei.layoutInfo.panorama.size.height - i - n - e
                  , d = parseInt(.9 * r)
                  , c = parseInt(.5 * (r - d))
                  , u = t.Zenkei.layoutInfo.panorama.size.width - 2 * c
                  , g = this.howtoView.originalWidth
                  , p = this.howtoView.originalHeight
                  , A = u / g
                  , m = d / p
                  , E = 1;
                E = A > m ? m : A;
                var I = g * E
                  , T = p * E
                  , v = .5 * (d - T) + i + c
                  , S = .5 * (u - I) + c;
                this.howtoView.css({
                    top: v,
                    left: S,
                    width: I,
                    height: T
                })
            }
        },
        model_PlayerSizeChanged: function() {
            this.updateLayout()
        },
        model_PlanSelect: function() {
            this.updateSelectPlanSilentButton(this.model.planIndex)
        },
        model_PlanSilentSelect: function() {
            this.updateSelectPlanSilentButton(this.model.planIndexSilent)
        },
        updateSelectPlanSilentButton: function(e) {
            var i = t.projectJson.pl.length;
            0 == e ? ($("#" + j).css({
                display: "none"
            }),
            $("#" + J).css({
                display: "none"
            })) : ($("#" + j).css({
                display: "block"
            }),
            $("#" + J).css({
                display: "block"
            })),
            e >= i - 1 ? $("#" + Q).css({
                display: "none"
            }) : $("#" + Q).css({
                display: "block"
            }),
            $("#" + Y).html(t.projectJson.pl[e].ab),
            this.isMultiPlan && $("#planCount").html(e + 1 + " / " + i)
        },
        updateTitlePillowLayout: function() {
            var t, e = parseInt($("#" + F).css("height")), i = parseInt(.3 * e), n = parseInt(.5 * (e - i));
            t = this.model.isOrientationPortrait ? .06 * parseInt($("#" + F).width()) : .03 * parseInt($("#" + F).width()),
            $($("#" + q)).css({
                top: n,
                left: t,
                height: i
            })
        },
        hideSceneTitle: function() {
            "visible" == $("#" + K).css("visibility") && $("#" + K).css({
                visibility: "hidden"
            })
        },
        hideHowtoView: function() {
            "visible" == $("#" + C).css("visibility") && $("#" + C).css({
                visibility: "hidden"
            })
        },
        hideSceneText: function() {
            "visible" == $("#" + F).css("visibility") && ($("#" + F).css("visibility", "hidden"),
            $("#" + F).empty())
        },
        hidePoweredByLabel: function() {
            "visible" == $("#" + X).css("visibility") && $("#" + X).css({
                visibility: "hidden"
            })
        },
        prepareForNextScene: function() {
            var t = this.model.planIndex
              , e = this.model.spotIndex;
            if (ne != t || oe != e) {
                var i = this.model.planJson
                  , n = this.model.spotJson
                  , o = $("#" + B)[0];
                $(o.getElementsByClassName(_)).text(i.ab),
                $(o.getElementsByClassName(H)).text(n.ab);
                var s, a, l, h = this.getCookie(O);
                "true" == h || Te ? (s = 0,
                a = 0,
                l = 0) : (s = 0,
                a = 7e3,
                l = a + 500,
                Te = !0);
                var r = "webkitAnimationEnd oanimationend msAnimationEnd animationend"
                  , d = 0
                  , c = 3e3;
                ie && (ee.push(setTimeout(function() {
                    "hidden" == $("#" + X).css("visibility") && $("#" + X).css({
                        visibility: "visible"
                    }),
                    $("#" + X).attr({
                        "class": "fade-in"
                    })
                }, d)),
                ee.push(setTimeout(function() {
                    $("#" + X).attr({
                        "class": "fade-out"
                    }).on(r, function() {
                        $("#" + X).off(r),
                        $("#" + X).css({
                            visibility: "hidden"
                        }),
                        ie = !1
                    })
                }, c))),
                0 == a || this.controller.isPlayingBrowseLog || (this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_HELPVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_START, null),
                ee.push(setTimeout(function() {
                    "hidden" == $("#" + C).css("visibility") && $("#" + C).css({
                        visibility: "visible"
                    });
                    var t = "fade-in " + Ee;
                    $("#" + C).attr({
                        "class": t
                    })
                }, s)),
                ee.push(setTimeout(function() {
                    $("#" + C).attr({
                        "class": Ie
                    })
                }, 3e3)),
                ee.push(setTimeout(function(t) {
                    var e = "fade-out " + Ie;
                    $("#" + C).attr({
                        "class": e
                    }).on(r, function() {
                        $("#" + C).off(r),
                        $("#" + C).css({
                            visibility: "hidden"
                        }),
                        t.setCookie(O, !0)
                    })
                }, a, this)));
                var u = n.ba;
                this.setMailto(u),
                this.lastSceneId = u;
                var g = i.ab + "　" + n.ab;
                if (g.length <= 0)
                    return;
                g = "　　" + g;
                var p, A = 0, m = 0;
                if (n.ac.length > 0) {
                    g += "　　　" + n.ac;
                    var E = new RegExp("<BR />","g");
                    g = g.replace(E, ""),
                    A = 3e3,
                    m = parseInt(g.length / 6),
                    p = l + 1e3 * m + A
                } else
                    p = l + 3e3;
                var I = this;
                ee.push(setTimeout(function() {
                    "hidden" == $("#" + F).css("visibility") && $("#" + F).css({
                        visibility: "visible"
                    }),
                    $("#" + F).attr({
                        "class": "fade-in"
                    });
                    var t = "sceneTextInner";
                    $('<p id="' + t + '" style="margin:0; display:inline-block; white-space:nowrap;"></p>').text(g).appendTo("#" + F),
                    $('<div id="titlePillow" style="position: absolute; background-color: rgb(96,159,62); width:3px"></div>').appendTo("#" + t),
                    I.updateTitlePillowLayout();
                    var e = parseInt($("#" + t).width())
                      , i = parseInt($("#" + F).width());
                    e > i && ee.push(setTimeout(function() {
                        $("#" + t).css({
                            "-webkit-animation-name": "marquee",
                            "-webkit-animation-timing-function": "linear",
                            "-webkit-animation-duration": m + "s",
                            "-webkit-animation-iteration-count": "1",
                            "-webkit-animation-play-state": "running",
                            "-moz-animation-name": "marquee",
                            "-moz-animation-timing-function": "linear",
                            "-moz-animation-duration": m + "s",
                            "-moz-animation-iteration-count": "1",
                            "-moz-animation-play-state": "running",
                            "-ms-animation-name": "marquee",
                            "-ms-animation-timing-function": "linear",
                            "-ms-animation-duration": m + "s",
                            "-ms-animation-iteration-count": "infinite",
                            "-ms-animation-play-state": "running",
                            "-o-animation-name": "marquee",
                            "-o-animation-timing-function": "linear",
                            "-o-animation-duration": m + "s",
                            "-o-animation-iteration-count": "1",
                            "-o-animation-play-state": "running",
                            "animation-name": "marquee",
                            "animation-timing-function": "linear",
                            "animation-duration": m + "s",
                            "animation-iteration-count": "1",
                            "animation-play-state": "running"
                        })
                    }, A))
                }, l)),
                ee.push(setTimeout(function() {
                    $("#" + F).attr({
                        "class": "fade-out"
                    }).on(r, function() {
                        $("#" + F).off(r),
                        $("#" + F).empty(),
                        ee.push(setTimeout(function() {
                            $("#" + F).css({
                                visibility: "hidden"
                            })
                        }, 500))
                    })
                }, p)),
                ne = t,
                oe = e
            }
        },
        model_SpotSelect: function() {
            this.model.isWalkThroughExecuting && this.model.userAgent.canFadeAnimation || (this.closePlanView(),
            this.closeSceneList(),
            this.hideSceneTitle(),
            this.hideHowtoView(),
            this.hideSceneText(),
            this.hidePoweredByLabel(),
            this.clearTimeouts())
        },
        model_WalkThroughStarted: function() {
            this.model.userAgent.canFadeAnimation && (this.hideSceneTitle(),
            this.hideHowtoView(),
            this.hideSceneText(),
            this.hidePoweredByLabel(),
            this.clearTimeouts())
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.prepareForNextScene()
        },
        model_WalkThroughEnded: function() {
            this.model.userAgent.canFadeAnimation && this.prepareForNextScene()
        },
        model_ShowCustomDesignHelpView: function() {
            this.ShowHelpView()
        },
        model_CustomDesignPlanButtonClicked: function() {
            ae = !0,
            this.openPlanView()
        },
        model_CustomDesignClosePlanButtonClicked: function() {
            this.closePlanView()
        },
        model_CustomDesignSpotListButtonClicked: function() {
            ae = !0,
            this.openSceneList()
        },
        model_CustomDesignCloseSpotListButtonClicked: function() {
            ae = !0,
            this.closeSceneList()
        },
        ShowHelpView: function() {
            ee.push(setTimeout(function() {
                "hidden" == $("#" + C).css("visibility") && $("#" + C).css({
                    visibility: "visible"
                });
                var t = "fade-in " + Ee;
                $("#" + C).attr({
                    "class": t
                })
            }, 0)),
            ee.push(setTimeout(function() {
                $("#" + C).attr({
                    "class": Ie
                })
            }, 3e3)),
            ee.push(setTimeout(function() {
                var t = "fade-out " + Ie;
                $("#" + C).attr({
                    "class": t
                }).on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
                    $("#" + C).off("webkitAnimationEnd oanimationend msAnimationEnd animationend"),
                    $("#" + C).css({
                        visibility: "hidden"
                    })
                })
            }, 7e3, this))
        },
        clearTimeouts: function() {
            for (var t = 0; t < ee.length; t++) {
                var e = ee[t];
                clearTimeout(e)
            }
            ee = []
        },
        planButton_Click: function(t) {
            var e = t.originalEvent
              , i = {
                x: e.clientX,
                y: e.clientY
            };
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_PLAN_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
        },
        sceneListButton_Click: function(t) {
            var e = t.originalEvent
              , i = {
                x: e.clientX,
                y: e.clientY
            };
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_SPOTLIST_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
        },
        callButton_Click: function(t) {
            var e = t.originalEvent
              , i = {
                x: e.clientX,
                y: e.clientY
            };
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_PHONE_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i, !0)
        },
        documentRequestButton_Click: function(t) {
            var e = t.originalEvent
              , i = {
                x: e.clientX,
                y: e.clientY
            };
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_DOCUMENT_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
        },
        shareButton_Click: function(t) {
            var e = t.originalEvent
              , i = {
                x: e.clientX,
                y: e.clientY
            };
            this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_SHARE_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
        },
        closePlanButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_CLOSE_PLAN_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.FireCustomDesignClosePlanButtonClickedEvent()
        },
        firstPlanButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_TOP_PLAN_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.selectFirstPlanSilent()
        },
        prevPlanButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_PREV_PLAN_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.selectPrevPlanSilent()
        },
        nextPlanButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_NEXT_PLAN_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.selectNextPlanSilent()
        },
        closeSceneListButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_CLOSE_SPOTLIST_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.closeSceneList()
        }
    },
    n.prototype = {
        paneSwitchList: null,
        init: function() {
            return this.paneSwitchList = $(".paneSwitch"),
            0 == this.paneSwitchList.length ? null : (this.paneSwitchList.on("click", $.proxy(this.paneSwitch_Click, this)),
            void 0)
        },
        paneSwitch_Click: function(t) {
            for (var e = t.srcElement, i = e.getAttribute("data-pane-id"), n = $(".pane"), o = 0; o < n.length; o++) {
                var s = n[o]
                  , a = s.getAttribute("data-pane-id");
                if (a == i)
                    return s.style.display = "none",
                    void 0
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.CustomDesign = i,
    t.Zenkei.PaneSwitch = n)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        ELEMENT_ID_HMD_BUTTON: "hmdButton",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        HTML_CODE_EMPTY_DIV: "<div></div>",
        BUTTON_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZmJkZjY0OC1iM2ZjLTZmNGMtOGU2NC00Mzc3ODk2OGE4YmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0YzQTBBQ0RFRkQyMTFFNDkxMzZBREVDRkNEMTBCMzkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0YzQTBBQ0NFRkQyMTFFNDkxMzZBREVDRkNEMTBCMzkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2Q0NWE5Y2UtODMxZi1lNDQ0LWE3MjctOWNkMDQ0MDNjMzUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJmYmRmNjQ4LWIzZmMtNmY0Yy04ZTY0LTQzNzc4OTY4YThiYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp+JFA4AAATYSURBVHja7JzPT2JXFMdBfuqIovgTVKbRgWrFX7GdakwTExcanVY01pBYF+pe3bhsNF3J/+CqiT/qQk2NcWHcmGkNjNZGUhSp9QcKjvJLqBKGQs81hVCGkcd7zsPI/SY3UTnn3fc+795zz7kPHzMQCDCw3hczAswX0L6BJoPGTxIGHmgGaIvQtNHAfAft2yQfKD9B+zEczOfQvscT6E4/QNOk/PdLJ+YREgoljCCYF5hHSC/CwaRiHiGlhoPBihAGg8FgMBgMBoPBYDAYDAaDwWAwSS02ESO1Wl3/1C58bGzsDWUw+/v7BXgqYWEwGAwGg8E8juWaqPh8/rvy8nJzRUXFVW5u7i2LxQrYbDaeXq/P0el0hW63+0Ee4kmlUqtCobBIJBJXZmam1+VycU9PTwW7u7v5x8fHOY8GDJPJDDQ0NBz29PQYMzIy3kV+3tTUdOH1evVLS0vP19bW5D6fj0Wmn/z8fKdKpdIBFHvkZ/X19VdKpfIvuAHCmZkZhcViyUzoVEpJSQkMDAxoBwcH9dGgBMXlcv0A7nBkZOQXGFneePuRy+WWiYmJ19GghKuystIxPj7+Go3chILp7u7+vbGx8S1Rezhh59DQ0Bs0yoj6iMVix+jo6DaHw/ETsUd2w8PDv8FUsycETElJibW1tdUUr19tba2tpqbmlOA0ZfT19e0ShRIOB/khf9rBtLW1HZD17erqIuRbWlr6FqaRk0wfMpnsuqys7IJWMDwez1dXV2cl6w/T4zYvLy/mBVdXV1uo3DwYmWZawWRnZ7vZbDalbx0BGHcsm+LiYheVPoqKity0gkE5C9XAnZaWFvMYsNJ5qfQhFAq9tIK5ubnhUgUDCV/MYzgcDh6VPux2O49WMFarNd3j8bConLTZbI6ZhB0eHlJK1Mj6kwaDstfNzc08sv4GgyED7uazWHY7OzuFVMCQ9ae0XK+ursr8fj+pRGFxcVFGxM5kMmVrtVpS9c/29rbo5ORERDuYy8tLwdzcXGm8fuvr6+J4tktnZ2cVUCjGVdch++npaUXCSgIoCj9dWFj4hKj9xsZGAVxoTTx9QAB+Njk5+SVMPUIB3+l0ctRq9UuwT09odb28vPzZwcGBqLe3Vy+VSv/+wOjizc/Py7a2tqQkA7UQisOv2tvb9S0tLeeoeI20QdMabpR4ZWWlHEYMpS2O4NdZf77PCCrnDqLbD5CQ2SAVvxSJRMH9GL7RaMw5OjrKgYD9IBtjAoHgForRC8ieXfDz3X7M+fl5+t7eXsH19TWh7xNOTU0t3/PxqwfdqALITBTs4gl4WVlZbqhnrgoLC92QNPogBWDD6EhHMD80FQBEqkajec74iGIzEiSJRGLr7Ozcv6/eQqsKrF7ys7OzbLrPLyFgIEbsQTz6M1qcCBeCBkXgr2jlQ0H+SYPp6OjQKZXKI8LLJsBTqVRGNM0gyFfSdZ60PiWoqqoyxQMlXMgP+T85MBwO55/+/v4/qBwD+aPjPCkwaCsTViBKWwjIn+iWKC0xBu3QU+2oubn5QS4IHQdylY/+T2aEErwk1Cv8iPYxrEoYDAaDwWAwWBgMBoPBYDAYDAbzWMHcYhQhecLBHGAeIRnCwSxhHiHdscAv1vm/3nuxTlAvoX3NSM5XMaGRogn+kYlf3hVd/wowAGTc0RsHJjriAAAAAElFTkSuQmCC",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.hmdbutton,
            null == this.layoutInfo ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.isGyroEventSupportedChangedEventHandler.Register(this.model_IsGyroEventSupportedChanged.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateLayout(),
            this.UpdateVisibility(),
            void 0)
        },
        CreateElements: function() {
            if (null != this.layoutInfo) {
                var t = $(this.HTML_CODE_EMPTY_DIV).attr("id", this.ELEMENT_ID_HMD_BUTTON).css({
                    "background-size": "35px 35px",
                    "background-repeat": "no-repeat",
                    "background-position": "center center",
                    position: "absolute",
                    "z-index": "5000",
                    display: "none",
                    "tap-highlight-color": "rgba(0,0,0,0)",
                    "background-image": "url(" + this.BUTTON_IMAGE_DATA + ")"
                }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
                t.on("click", this.hmdButton_Click.bind(this))
            }
        },
        UpdateLayout: function() {
            if (null != this.layoutInfo) {
                var t = this.model.isHmdModeEnabled
                  , e = "35px"
                  , i = "35px"
                  , n = !1
                  , o = !1
                  , s = {};
                null != this.layoutInfo.width && (e = this.layoutInfo.width),
                null != this.layoutInfo.height && (i = this.layoutInfo.height),
                null != this.layoutInfo.top ? (s.top = t ? 10 : this.layoutInfo.top,
                s.bottom = "",
                o = !0) : null != this.layoutInfo.bottom && (s.bottom = t ? 10 : this.layoutInfo.bottom,
                s.top = "",
                o = !0),
                null != this.layoutInfo.left ? (s.left = t ? 10 : this.layoutInfo.left,
                s.right = "",
                n = !0) : null != this.layoutInfo.right && (s.right = t ? 10 : this.layoutInfo.right,
                s.left = "",
                n = !0),
                n || (s.left = "10px"),
                o || (s.top = "10px"),
                s.width = e,
                s.height = i,
                $(document.getElementById(this.ELEMENT_ID_HMD_BUTTON)).css(s)
            }
        },
        UpdateVisibility: function() {
            var t = "none";
            this.model.isGyroEventSupported && this.model.userAgent.canShowMultiView && null != this.layoutInfo && (this.model.isHmdModeEnabled || "none" != this.layoutInfo.display) && (t = "block"),
            $(document.getElementById(this.ELEMENT_ID_HMD_BUTTON)).css("display", t)
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo.hmdbutton,
            this.UpdateLayout(),
            this.UpdateVisibility()
        },
        model_IsGyroEventSupportedChanged: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStart: function() {
            this.UpdateLayout(),
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateLayout(),
            this.UpdateVisibility()
        },
        hmdButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_HMD_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.SwitchHmdMode()
        }
    },
    t.Zenkei != e && (t.Zenkei.HmdButton = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        canvasSize: 70,
        canvasSizeHalf: 0,
        radius: 0,
        currentPercentage: 0,
        context: null,
        pi2: 2 * Math.PI,
        piH: .5 * Math.PI,
        targetContentType: null,
        intervalNumber: null,
        contextArray: new Array,
        isDivCreated: !1,
        ELEMENT_ID_PROGRESS_CIRCLE: "progressCircle",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.canvasSizeHalf = .5 * this.canvasSize,
            this.radius = this.canvasSizeHalf - 10,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.annotationFrontOverEventHandler.Register(this.model_AnnotationFrontOver.bind(this)),
            this.model.annotationFrontOutEventHandler.Register(this.model_AnnotationFrontOut.bind(this)),
            this.model.walkThroughFrontOverEventHandler.Register(this.model_WalkThroughFrontOver.bind(this)),
            this.model.walkThroughFrontOutEventHandler.Register(this.model_WalkThroughFrontOut.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this))
        },
        ClearInterval: function() {
            null != this.intervalNumber && (clearInterval(this.intervalNumber),
            this.intervalNumber = null),
            this.targetContentType = null,
            this.currentPercentage = 0
        },
        StartInterval: function(t) {
            if (this.isDivCreated) {
                this.ClearInterval();
                for (var e = this.contextArray.length, i = 0; e > i; i++) {
                    var n = this.contextArray[i];
                    n.clearRect(0, 0, this.canvasSize, this.canvasSize),
                    n.lineWidth = 6,
                    n.strokeStyle = "#7fffd4"
                }
                var o = .01 * t;
                this.intervalNumber = setInterval(this.Progress.bind(this), o)
            }
        },
        Progress: function() {
            this.currentPercentage++;
            for (var t = this.contextArray.length, e = 0; t > e; e++) {
                var i = this.contextArray[e];
                i.clearRect(0, 0, this.canvasSize, this.canvasSize),
                i.beginPath(),
                i.arc(this.canvasSizeHalf, this.canvasSizeHalf, this.radius, -this.piH, .01 * this.pi2 * this.currentPercentage - this.piH, !1),
                i.stroke()
            }
            this.currentPercentage >= 100 && (this.ClearInterval(),
            this.Hide(),
            this.controller.ExecuteProgressCircleTarget())
        },
        ClearCanvas: function() {
            if (null != this.contextArray)
                for (var t = this.contextArray.length, e = 0; t > e; e++)
                    this.contextArray[e].clearRect(0, 0, this.canvasSize, this.canvasSize)
        },
        Show: function() {
            var t = 1;
            this.model.isHmdModeEnabled && (t = 2);
            for (var e = 0; t > e; e++) {
                var i = this.ELEMENT_ID_PROGRESS_CIRCLE + e;
                $(document.getElementById(i)).css("display", "block")
            }
        },
        Hide: function() {
            var t = 1;
            this.model.isHmdModeEnabled && (t = 2);
            for (var e = 0; t > e; e++) {
                var i = this.ELEMENT_ID_PROGRESS_CIRCLE + e;
                $(document.getElementById(i)).css("display", "none")
            }
        },
        UpdatePosition: function() {
            if (this.model.isHmdModeEnabled) {
                var t = 1;
                this.model.isHmdModeEnabled && (t = 2);
                for (var e = this.model.isOrientationPortrait, i = 0; t > i; i++) {
                    var n = "50%"
                      , o = "50%";
                    e ? o = 25 + 50 * i + "%" : n = 25 + 50 * i + "%";
                    var s = this.ELEMENT_ID_PROGRESS_CIRCLE + i;
                    $(document.getElementById(s)).css({
                        left: n,
                        top: o
                    })
                }
            }
        },
        model_PlayerSizeChanged: function() {
            this.UpdatePosition()
        },
        model_SpotSelect: function() {
            this.model.isHmdModeEnabled && this.Hide()
        },
        model_SpotImageLoadCompleted: function(t) {
            this.model.isHmdModeEnabled && !this.model.isWalkThroughExecuting && t.isMainView && t.isFrontView && (this.ClearCanvas(),
            0 != this.model.spotLensType ? this.Show() : this.controller.canBackSpot && (this.Show(),
            this.StartInterval(1e4)))
        },
        model_AnnotationFrontOver: function() {
            this.model.isHmdModeEnabled && !this.model.isWalkThroughExecuting && this.StartInterval(1e3)
        },
        model_AnnotationFrontOut: function() {
            this.model.isHmdModeEnabled && (this.ClearInterval(),
            this.ClearCanvas())
        },
        model_WalkThroughFrontOver: function() {
            this.model.isHmdModeEnabled && !this.model.isWalkThroughExecuting && this.StartInterval(1e3)
        },
        model_WalkThroughFrontOut: function() {
            this.model.isHmdModeEnabled && (this.ClearInterval(),
            this.ClearCanvas())
        },
        model_WalkThroughEnded: function() {
            this.model.isHmdModeEnabled && (this.ClearCanvas(),
            this.Show())
        },
        model_HmdModeStart: function() {
            this.ClearInterval(),
            this.contextArray = new Array;
            var t = 1;
            this.model.isHmdModeEnabled && (t = 2);
            var e = this.model.isOrientationPortrait
              , i = "block";
            0 != this.model.spotLensType || this.controller.canBackSpot || (i = "none");
            for (var n = 0; t > n; n++) {
                var o = "50%"
                  , s = "50%";
                e ? s = 25 + 50 * n + "%" : o = 25 + 50 * n + "%";
                var a = this.ELEMENT_ID_PROGRESS_CIRCLE + n
                  , l = $('<div id="' + a + '" class="' + this.ELEMENT_ID_PROGRESS_CIRCLE + '"></div>').css({
                    position: "absolute",
                    width: this.canvasSize + "px",
                    height: this.canvasSize + "px",
                    "margin-left": -this.canvasSizeHalf + "px",
                    "margin-top": -this.canvasSizeHalf + "px",
                    left: o,
                    top: s,
                    display: i,
                    "z-index": 5e3
                }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
                  , h = $('<canvas class="backCanvas"></canvas>').css({
                    position: "absolute"
                }).appendTo(l)
                  , r = $('<canvas class="frontCanvas"></canvas>').css({
                    position: "absolute"
                }).appendTo(l)
                  , d = h[0].getContext("2d");
                d.beginPath(),
                d.strokeStyle = "rgba(192,192,192,0.3)",
                d.lineWidth = 6,
                d.arc(this.canvasSizeHalf, this.canvasSizeHalf, this.radius, 0, this.pi2, !1),
                d.stroke(),
                this.contextArray.push(r[0].getContext("2d"))
            }
            this.isDivCreated = !0,
            0 == this.model.spotLensType && this.controller.canBackSpot && this.StartInterval(1e4)
        },
        model_HmdModeStop: function() {
            this.isDivCreated = !1,
            this.ClearInterval(),
            this.contextArray = new Array,
            $("." + this.ELEMENT_ID_PROGRESS_CIRCLE).remove()
        }
    },
    t.Zenkei != e && (t.Zenkei.ProgressCircle = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        touchStartX: null,
        touchStartY: null,
        isVisible: !1,
        canUseFadeAnimation: !0,
        ELEMENT_ID_POPUP: "popup",
        ELEMENT_ID_POPUP_BACKGROUND: "popupBackground",
        ELEMENT_ID_POPUP_CLOSE_BUTTON: "popupCloseButton",
        ELEMENT_ID_POPUP_TITLE: "popupTitle",
        ELEMENT_ID_POPUP_DESCRIPTION: "popupDescription",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        POPUP_MARGIN: 20,
        CLOSE_BUTTON_SIZE: 44,
        DESCRIPTION_PADDING: 10,
        CLOSE_BUTTON_ICON_DATA: "data:image/png;base64,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",
        DOWN_ARROW_ICON_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAFhJREFUKFOVi9sNwCAMAxkmygyM1g0YO62rBMUEKvXjeNi+Zma/mA8R6bnI5O49VPV6MNxRBGsX4fCQJLxTPqawkxwak7CRyhiQADA4jQF9ApfKGJTgG2s3g+kAmmuQ2+MAAAAASUVORK5CYII=",
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.userAgent.isAndroid && this.model.userAgent.osVersionFloat <= 4.2 && !this.model.userAgent.isChrome && !this.model.userAgent.isWindowsMobile && (this.canUseFadeAnimation = !1),
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.planSelectEventHandler.Register(this.model_PlanSelect.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.showPopupTextEventHandler.Register(this.model_ShowPopupText.bind(this)),
            this.model.hidePopupTextEventHandler.Register(this.model_HidePopupText.bind(this))
        },
        Show: function(t, e) {
            this.isVisible && this.Hide(!1);
            var i = $(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY))
              , n = i.width()
              , o = i.height()
              , s = .5 * n
              , a = .5 * o
              , l = n - 2 * this.POPUP_MARGIN
              , h = o - 2 * this.POPUP_MARGIN;
            $("<div></div>").attr("id", this.ELEMENT_ID_POPUP_BACKGROUND).css({
                position: "absolute",
                "z-index": "5050",
                width: n + "px",
                height: o + "px",
                "background-color": "rgba(0,0,0,0.35)",
                "tap-highlight-color": "rgba(0,0,0,0)"
            }).prependTo(i);
            var r = $("<div></div>").attr("id", this.ELEMENT_ID_POPUP).css({
                position: "absolute",
                "z-index": "5100",
                width: n + "px",
                height: o + "px",
                "tap-highlight-color": "rgba(0,0,0,0)",
                opacity: "0"
            }).prependTo(i)
              , d = $("<div></div>").attr("id", this.ELEMENT_ID_POPUP_TITLE).css({
                position: "absolute",
                "z-index": "5500",
                left: "0px",
                top: "0px",
                "text-align": "left",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                overflow: "hidden",
                "background-color": "#222222",
                "tap-highlight-color": "rgba(0,0,0,0)",
                color: "#FFFFFF"
            }).html(t).appendTo(r)
              , c = d.height()
              , u = .5 * (this.CLOSE_BUTTON_SIZE - c);
            d.css({
                height: c + "px",
                padding: u + "px " + this.DESCRIPTION_PADDING + "px"
            });
            var g = $("<div></div>").attr("id", this.ELEMENT_ID_POPUP_CLOSE_BUTTON).css({
                position: "absolute",
                "z-index": "5500",
                right: "0px",
                top: "0px",
                "background-image": "url(" + this.CLOSE_BUTTON_ICON_DATA + ")",
                "background-size": "32px 32px",
                "background-repeat": "no-repeat",
                "background-position": "center center",
                "background-color": "#222222",
                "tap-highlight-color": "rgba(0,0,0,0)",
                width: this.CLOSE_BUTTON_SIZE + "px",
                height: this.CLOSE_BUTTON_SIZE + "px"
            }).appendTo(r)
              , p = $("<div></div>").attr("id", this.ELEMENT_ID_POPUP_DESCRIPTION).css({
                position: "absolute",
                "z-index": "5500",
                padding: this.DESCRIPTION_PADDING + "px",
                left: "0px",
                top: this.CLOSE_BUTTON_SIZE + "px",
                "text-align": "left",
                "background-color": "#FFFFFF",
                "tap-highlight-color": "rgba(0,0,0,0)",
                scrollbar: "width: 5px",
                "overflow-scrolling": "touch",
                overflow: "scroll"
            }).html(e).appendTo(r)
              , A = p.width()
              , m = p.height()
              , E = m
              , I = A + 2 * this.DESCRIPTION_PADDING;
            s > I ? (I = s,
            A = I - 2 * this.DESCRIPTION_PADDING) : I > l && (I = l,
            A = I - 2 * this.DESCRIPTION_PADDING);
            var T = I - this.CLOSE_BUTTON_SIZE
              , v = m + this.CLOSE_BUTTON_SIZE + 2 * this.DESCRIPTION_PADDING;
            a > v ? (v = a,
            m = v - this.CLOSE_BUTTON_SIZE - 2 * this.DESCRIPTION_PADDING) : v > h && (v = h,
            m = v - this.CLOSE_BUTTON_SIZE - 2 * this.DESCRIPTION_PADDING);
            var S = .5 * (n - I)
              , f = .5 * (o - v);
            r.css({
                left: S + "px",
                top: f + "px",
                width: I + "px",
                height: v + "px"
            }),
            d.css({
                width: T + "px"
            }),
            p.css({
                width: A + "px",
                height: m + "px"
            }),
            this.canUseFadeAnimation ? r.fadeTo(300, 1) : r.css("opacity", ""),
            this.model.userAgent.isTouchDevice && Math.abs(E - m) > 10 && p.css({
                "background-image": "url(" + this.DOWN_ARROW_ICON_DATA + ")",
                "background-size": "13px 7px",
                "background-repeat": "no-repeat",
                "background-position": "right bottom"
            }).on("scroll", this.popupDescription_Scroll.bind(this)),
            g.on("click", this.popupCloseButton_Click.bind(this)),
            this.isVisible = !0
        },
        Hide: function(t) {
            return this.canUseFadeAnimation || (t = !1),
            this.touchStartX = null,
            this.touchStartY = null,
            this.isVisible = !1,
            t ? ($(document.getElementById(this.ELEMENT_ID_POPUP)).fadeTo(300, 0, this.popup_FadeToZeroCompleted.bind(this)),
            void 0) : ($(document.getElementById(this.ELEMENT_ID_POPUP)).remove(),
            $(document.getElementById(this.ELEMENT_ID_POPUP_BACKGROUND)).remove(),
            void 0)
        },
        popupCloseButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_POPUPTEXT_CLOSE_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.Hide(!0)
        },
        popup_FadeToZeroCompleted: function() {
            $(document.getElementById(this.ELEMENT_ID_POPUP)).remove(),
            $(document.getElementById(this.ELEMENT_ID_POPUP_BACKGROUND)).remove()
        },
        popupDescription_Scroll: function() {
            $(document.getElementById(this.ELEMENT_ID_POPUP_DESCRIPTION)).css("background-image", ""),
            $(document.getElementById(this.ELEMENT_ID_POPUP_DESCRIPTION)).off("scroll")
        },
        model_PlayerSizeChanged: function() {
            this.Hide(!1)
        },
        model_PlanSelect: function() {
            this.Hide(!1)
        },
        model_SpotSelect: function() {
            this.Hide(!1)
        },
        model_ShowPopupText: function(t) {
            if (null != t) {
                var e = t.title
                  , i = t.description;
                this.Show(e, i)
            }
        },
        model_HidePopupText: function(t) {
            this.Hide(t)
        }
    },
    t.Zenkei != e && (t.Zenkei.PopupText = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        isEnabled: !0,
        ELEMENT_ID_ANNOTATION_BUTTON: "annotationButton",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        HTML_CODE_EMPTY_DIV: "<div></div>",
        BUTTON_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZmJkZjY0OC1iM2ZjLTZmNGMtOGU2NC00Mzc3ODk2OGE4YmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDFDODlGRDBFRkQwMTFFNDk1MDk4RTMwODZCQkYzNTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDFDODlGQ0ZFRkQwMTFFNDk1MDk4RTMwODZCQkYzNTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmZiZGY2NDgtYjNmYy02ZjRjLThlNjQtNDM3Nzg5NjhhOGJiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJmYmRmNjQ4LWIzZmMtNmY0Yy04ZTY0LTQzNzc4OTY4YThiYiIv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",
        BUTTON_IMAGE_DATA_DISABLED: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZmJkZjY0OC1iM2ZjLTZmNGMtOGU2NC00Mzc3ODk2OGE4YmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzY5REU2QTZGNUUxMTFFNDlFNURGQzIzOEVGNUM1NDQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzY5REU2QTVGNUUxMTFFNDlFNURGQzIzOEVGNUM1NDQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGNkYmNlNzMtODUyZi02MzQyLTg4ZTAtZDYxZGU3ZTllMGYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJmYmRmNjQ4LWIzZmMtNmY0Yy04ZTY0LTQzNzc4OTY4YThiYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhvIlNYAAAVSSURBVHja7FzJbhtHEOW+7/siUIoRR0GQkxXZl/yC4px8y9fl5lOE/EMQ2HCQ2LIQOwsEhpRIivsuikvek0mCUSSbw+nhcKwpoKDh9HDm9evqqurpEo2TycSgy//Fcu3zQ+hj6GdQxx3hoA99C/0B+nx20rhgMd9Bn9xxQ3kK/Z4HpumJfZ2UK3kynTVzYr7VOZnL40Vi7ut8zOX+IjFOnY+5OBeJ0eWa6MToxMhL8BSVy8tLe7fbDfR6veBgMPAMh0MX1IFcygK9GiSj0TiGDi0WSx/atdlsbafTWXO5XHWr1Xrx0RADApy1Wi3d6XQSOA586HoSBLXhWqoPRBrq9fpVG0iqu93uQjAYzOO4p0liWq1WuFqt3oN1xGgIgkgOUEH0LqyoFAqF/vZ6vRVNEIMR9pdKpS/6/X5YwQE1gvB4Pp+POxyOSiwWO8ZUawh9wHSt9KPcG43HY3OhUPi82WzuiLIQCTLx+XwniUTid5PJNBJwvwMhFgPr8GD09uBcvSoFESMG5BNYUSSdTr+AFbVVD9fwJZFsNvu1iqQsRj0vsRCTqsQ0Go346enpI0wji2FDhFiIidhUcb7tdjsEn7IHHyXLnyBnmfj9/j/hIwr8jCmRQKc+lXNffpfYzGbzzx6Pp7o2i0HIdGBU9mdJmRyJx+Mv4DTfMKpQecxzsr0xsBEjsa6FGI4GHO0DmKxVLni73V4LBAKF6+d5jm0CppWVWFexPsnEVCqVzMXFRUiEP0D22lylTYoQKzErSsxoNLIgm90V5Si5VlqlTaoQM7ErRgwekIF52kQBZt7BTPmm7JltAiOVjdgVIwbRYkd0YpbL5R5ikZikH6DymOdEZ89SsS9tXlgd+0Wa98Jo2hlaobN9HEWWE8TOPmB13hBqMchb4gZlxaj0GktKH5YmBushv0HjIqUPS08lvjQS/s7DYumkUqkbkzkkZ3swf7fI50npg0WCL7AJnztG4wjZbvO2NgX8mU34VELEMGt9Kknpg75LIJcYk8k00HxnJfRhaWLgKHtaJ0ZKH5YmRtSiTk2R0oeliUH0KGudGPShIpwYn893zrdtWiWF2NGHkhI+ZuB0OotaJYbY2QdFwnUoFPpLq8RIxS6JGI/HU+PWqAatpUTsihFDicfjr1mRoCHfMiZmxRK8mTgcjk44HD7WCjHESsyKE0OJRCInbrc7v+mkECOxrpQMrvrQdDr9WzabdcipahiNRi7c46vb2uSQwioIYlx5CsqpdmCFAzq2D3Iim2QpIKWcyWSey6h8OJC1uuaDt7e3n8HjZzeFFGIhJrnlILJfO9Drb21tvYzFYr8q8XJJAo4RMRCLiKgprEoBCVQOo1U5Ozv7ktVO685qk8nkkci6PGEVVYvC+rtyubwraiv3NrHb7VVEnTcK1OEdKFLXQqDQn7iPU6vVdrrdblJUDQ18xxCr5LNgMHiy7B7RxljMDdHLBCuKgqgo/m6xrlei/xiC6ByIOMffc5CjdOZ9sJZKKHbE7/cXqbCgarFYfCDl+3CqL2Ehp+v0W2t/Gc4OYtSzEqZldt2kqEIMBRHktdVqbX3oOl7Da9XAqAoxTL5SqdQv78t72MZrBNXtaoOYae7RQqg9es9C9YjXqIVP1Q23cDj8z02rdJ5jm5rYVN+JxHR5xc39eSr+bqP/ldq4VCfGbDYPp/6G/6c05jHPqY1rIyq6Wd+Ltdbx7HgTMG1MqXs0Gj3ZpHc6erWDToxOjFBiejoVc+kvEvOHzsdc3i4Sc6jzMZfDRWKeGd79qMxdl6dTLv7zi0OUR9BvDHfzp5gOZ6TcRIwuU/lXgAEActRyiJLpAKAAAAAASUVORK5CYII=",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.annotationbutton,
            null == this.layoutInfo ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateLayout(),
            this.UpdateBackgroundImage(),
            this.UpdateVisibility(),
            void 0)
        },
        CreateElements: function() {
            if (null != this.layoutInfo) {
                var t = $(this.HTML_CODE_EMPTY_DIV).attr("id", this.ELEMENT_ID_ANNOTATION_BUTTON).css({
                    "background-size": "35px 35px",
                    "background-repeat": "no-repeat",
                    "background-position": "center center",
                    position: "absolute",
                    "z-index": "5000",
                    display: "none",
                    "tap-highlight-color": "rgba(0,0,0,0)"
                }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
                t.on("click", this.annotationButton_Click.bind(this))
            }
        },
        UpdateLayout: function() {
            if (null != this.layoutInfo) {
                var t = "35px"
                  , e = "35px"
                  , i = !1
                  , n = !1
                  , o = {};
                null != this.layoutInfo.width && (t = this.layoutInfo.width),
                null != this.layoutInfo.height && (e = this.layoutInfo.height),
                null != this.layoutInfo.top ? (o.top = this.layoutInfo.top,
                o.bottom = "",
                n = !0) : null != this.layoutInfo.bottom && (o.bottom = this.layoutInfo.bottom,
                o.top = "",
                n = !0),
                null != this.layoutInfo.left ? (o.left = this.layoutInfo.left,
                o.right = "",
                i = !0) : null != this.layoutInfo.right && (o.right = this.layoutInfo.right,
                o.left = "",
                i = !0),
                i || (o.left = "10px"),
                n || (o.top = "10px"),
                o.width = t,
                o.height = e,
                $(document.getElementById(this.ELEMENT_ID_ANNOTATION_BUTTON)).css(o)
            }
        },
        UpdateBackgroundImage: function() {
            this.isEnabled = !1;
            var t = this.model.spotJson;
            if (null != t) {
                var e = t.an;
                if (null != e)
                    for (var i = e.length, n = 0; i > n; n++) {
                        var o = e[n]
                          , s = o.ab;
                        if (3 != s) {
                            this.isEnabled = !0;
                            break
                        }
                    }
            }
            this.isEnabled ? $(document.getElementById(this.ELEMENT_ID_ANNOTATION_BUTTON)).css("background-image", "url(" + this.BUTTON_IMAGE_DATA + ")") : $(document.getElementById(this.ELEMENT_ID_ANNOTATION_BUTTON)).css("background-image", "url(" + this.BUTTON_IMAGE_DATA_DISABLED + ")")
        },
        UpdateVisibility: function() {
            var t = "none";
            this.model.isHmdModeEnabled || null == !this.layoutInfo || "none" == this.layoutInfo.display || (t = "block"),
            $(document.getElementById(this.ELEMENT_ID_ANNOTATION_BUTTON)).css("display", t)
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo.annotationbutton,
            this.UpdateLayout(),
            this.UpdateBackgroundImage(),
            this.UpdateVisibility()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.UpdateBackgroundImage()
        },
        model_WalkThroughEnded: function() {
            this.UpdateBackgroundImage()
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility()
        },
        annotationButton_Click: function(t) {
            if (this.isEnabled) {
                if (this.controller.hasAccessLogId) {
                    var e = t.originalEvent
                      , i = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_ANNOTATION_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
                }
                this.controller.SwitchShouldShowAnnotation()
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.AnnotationButton = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        ELEMENT_ID_CONTROL_BAR: "controlbar",
        ELEMENT_ID_SPOT_TITLE: "spotTitle",
        ELEMENT_ID_PLAN_BUTTON: "planbutton",
        ELEMENT_ID_THUMBNAIL_BUTTON: "thumbnailbutton",
        ELEMENT_ID_HELP_BUTTON: "helpbutton",
        PLAN_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2ZmJlMzlhZC0yZTI3LTI0NDYtYmZiZS1mMDFmNTkxZTBjOGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUY4NzQ5RjNGQTIyMTFFNDlBNzNEQUQ3MDY2NTk3NzAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUY4NzQ5RjJGQTIyMTFFNDlBNzNEQUQ3MDY2NTk3NzAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDEyMjkyMmMtNGFkMS0wMTRhLTk5MzctNmIxZjZjZGE5ZWE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZmYmUzOWFkLTJlMjctMjQ0Ni1iZmJlLWYwMWY1OTFlMGM4YSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmV32k4AAAT7SURBVHja7FxbSFRBGJ7VtLyEmmtXuhpd1gyjiOxC1kuXZyWCIqiXHnzI6EEJZEFEkaSXXqKXoKCHEoIuGFIZdCMiiO5JZEZkZGUlKaZu/4//0mlcd2fOmZlz1s4PH56d888///z7zX3WQCQSYb6MlRQ/BH5g/MD4gfEDY14muVx+KiADkG7xZQgwCOgHDP9PjAkCqgAPKAA/AV8AnwhfKG2QdKooj1nBeYwhZAHqAX0ReemjvFmm/A0YmuCVAs4B5ju08w6wG3BvIjSlPYBbCoLCyMYtsqlVdDMGK3BGk+29gLPJGJhS+nbTNNn/Ddisq1npCkw24BlgnmbGdwGKAH3J0sfUGggKozJqk4UxQRo9Mg3NOH5Rp9zjdcbslwzKfcABwGrCAUoTlUwq0/MTvEcSE7cjgEAMGwF6JyqPVNdDdVAKJCrTIGCvQcJegcq6qG5KKwX1vgLqBPTqSFdl2a70MUsE9a5SpynSsV5VXLYrgcmWWPMwxbrZXg6MqL08CZt5btRFdWBEZ6BbJWxuVVy2K4HpFNRbBigX0CsnXZVluxKYlxK6pwAlcd6XkI6Oso0H5o3E1DwXcAdwFDDdkj6d0u6Qjoj0UNmeXiudF2wm/0zAAd30PBP9ksx/AVDh9bXSFTtfEGAWIWCoTOOMQfrjbn+6odU1nibMAPR6nTHo4CVmTi6pDorOjaqTBgOjpSxdW5vYT7wALNUclFeA5dR5JwVj0NFGA2xp1BEUnYxBSaO5xVxN9t8DCtnoaQFLFsYwcrhJo/0mXUHRzRiUDGLNLMV2PxJb+nU5rvuIFh3XcbxRqzMoJhiDgvdenkiskkUWi8Vs9B4NS1bGMKpAjUJ7NbqDYooxUcHV8nqHNu4CNphw1mRg1rDRG1IBm/nR0bWAhyacNXnVDCt02kH+06aCYpoxKLjX8howVTIf3snD45FuU446vbU5RWC0eWrpLLFi9TaWC/VcUNDvFQKj14D9RY2zo8xqgaPTSi5POqBD4ugVdSdzNioF8lW7dXadDegRcPAbIMjl3SkRmJ1c3iDZTCQ95KPxs+tKQL6AXi41BavgsetlgbyX2dgj2nomtkmeTz4abUqibInKCGAVZ6MQMBAnzwDpWPOsIluiYps1KYrZ8pMWjHkcpgGec7q4uDwWp4xmNvZI5DnZyhsHO5SxRhFbblvS9knYygR0xfimu+idHf/aVbBG1UhUBmim57uS9ipi2KtwMCiUqRihZCd4ODF7yzUjvMtbBlgM6KC0w4BvcfZSrnFpNwBb6PkmG3uQv01yT6eBJpNRwR9uLKSmrqUphcdhS/T9dYEOcQgQ4uwWUfoQPVvfhSjdqYR1MQaHyE5ATgy2RGU7oNryGQ/dSun5Mft7/tMOCHP2j9PfKi49zJWBEgIUAD7H6NSjggyeY/n8HbCAiZ5BKWRLLOyzTPIS/aQmhyDiy0Gy2w1Ik+hrwqo731xAL1dIm8TV1ibFt0NxlPlBtnfF0WvjfO6luigLTCy2rEuQZ5OlT5mv4T7xCbLfHkdnnV3W2GVLq0C+FtJt0fQrtJDFn6I4eq12WCOy7XCI63BRFlEHGk820t9iAV0nZ1d4sHcR8GEcndnc5xyqU9jJRlWskWgiSMIRKsUGWyaCRFljizGpNGOciIGJsgZn8MOyW5sjTPE1dA/KiFc2w5NG/P/t4AfGD4wfGD8wLsgfAQYAL2WVQCmw7IEAAAAASUVORK5CYII=",
        THUMBNAIL_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2ZmJlMzlhZC0yZTI3LTI0NDYtYmZiZS1mMDFmNTkxZTBjOGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTlGRDg5RUZGQTIyMTFFNEFFOENGOTY0RTRBQ0Q2RTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTlGRDg5RUVGQTIyMTFFNEFFOENGOTY0RTRBQ0Q2RTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDEyMjkyMmMtNGFkMS0wMTRhLTk5MzctNmIxZjZjZGE5ZWE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZmYmUzOWFkLTJlMjctMjQ0Ni1iZmJlLWYwMWY1OTFlMGM4YSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoW5UZAAAAFpSURBVHja7NuxT8JAFMfxnlBBDcSQGBNI3NicHVyZ/NvVwcXBkcjCYIJMCFpfw22Ee0nLL6nyfckvDNfktZ+WK2mPUBRFRu3WCQTAAAMMMMA0ptrO+Lulbzn0PT3Ez4nlcc82ueXVci3qv7SMqsKMxCem44zfWE5FvXt1vkqfYpiNM/4h7L1kjmHyBQYYYIABBhhggKGAAQYYYIABBhhggDkymM4/7t/9yzAXwt55atB7fXIXcTYCkPLdzktim7LnveVM0L887lVqg8D6GCZfYIABBpjGlHe7ziPez4H7hpivLL3Eox3zLbggymNaV71dv1kuBTsW4s49WJ4TJ+XJMhT8jmlZFpZx1StmLL5iz53xW+HX/arOHKNeH7N2xufC3qyP4a4EDDDAAAMMMMAAQwEDDDDAAAMMMMAAc2wwfXF/72H8QNi7V2fHZmKclTM+zbZ/L1ZU8mE4y0CYY4ABBhhggGl8/QowACTFMGbCKYg4AAAAAElFTkSuQmCC",
        HELP_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2ZmJlMzlhZC0yZTI3LTI0NDYtYmZiZS1mMDFmNTkxZTBjOGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTE1QTA3NTlGQTIyMTFFNEI0REVGNTVGOTA0QzJCRkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTE1QTA3NThGQTIyMTFFNEI0REVGNTVGOTA0QzJCRkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDEyMjkyMmMtNGFkMS0wMTRhLTk5MzctNmIxZjZjZGE5ZWE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZmYmUzOWFkLTJlMjctMjQ0Ni1iZmJlLWYwMWY1OTFlMGM4YSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhHD6c8AAANpSURBVHja7JtbiE1RGMfXTMfgyCUPLhljXEouR2k8uI48YDpKSdQ0M/GkpinlUuKJ4gkPShRRhHiSMg8uiSkkk/uEkWuc5DonymiG7f+1l4g469uzztqXtb76Pc3a6+zzm73W/ta31inxPE+4+DtKnBgnxolxYpwYJ8aJQQwGU0AGVIAhoEz+LQ9egsfgDmizQUwtWAYWgrTiNffBOXAQ3E6amI2gDkzqYT9nwDFwOO5iRoPTYKLmfpvlk/cljmKWg31gYJH6p3moHlyKk5g5oMXQMJ0JrsZBTIWcJAcZEkNfohzkoi6mrQhzSqG4AaqiLGY+OBtSbrQFbI6qmHsBX8lvwDvQF1TSvQX8/LSWNxWJ0UiNx4s8aALTQOq3fspBFuz1+FGv47voFtPM+AKPpIBCfc5mimnR8V10DyXKK0YotOsGQ8EHxX6rGblKpxyOPYpSjVKGKUqh2MCQImQ+tJXx6o7U5EtZ7gnFp2pkgP7pmhcK7T6BAVF6YjKK7Y4E7J+Stw5T732dYsYqtrsQsP9vsj4TOzHVjHwlaHSaEpPS2NcBWWJQGRJB73W8KTFxqvnSwvS5Qrsu8atEaoUYqtg1KLT7KPx6shViVFOBnwJX2CCGyhd3GS+K6eBa0sWQlFZGip9jZN+xFTNL1nXSjGuqZMEqsWIWCX9ngRPrwc4kv65Xg13Ma2ivqSbJeQz917czr7kFpiY5wdsGNjGvuQnmCX+vO5FiFoNTzGuegHFCU/0limJol7Jd+KcdVOM6WAJeJXmtRPWZOkZ72oXIFPumwhZDa5r3jPYP5JzyOulissI/taAa/cFnEzdWGvIwWsBou8aUlCg8MVfADMUhNMHkjYUphrZgnwm/AFUoVoJDtojpJ1fDKlsdk4XhA4phzjFlQn3/p4/pm0uFKOYrOC7LCt//M9wo3hof5+4AtBPjxDgxFojpJfwK3CjQW/h7Qw/BZZvF0GHG/VLKn3FUJnfdtomZCy4WaEOJHZUuu2wRQyvlDsUkk56oVbaIoa2OtYz2Y8BTG5YEWWb7WlvWStwDzsNtEcP97LwtYlqZ7U/aMvlWMibT8zLfsSaPaQR7FMoT9EbK2SSGYh3Y8Y+/0Y/B6DRVu61rJSpdLpXDi6p1dJyeflK8262u3eraiXFinBgnxsUPAQYA1Qf5j1q5m1oAAAAASUVORK5CYII=",
        Initialize: function() {
            if (this.layoutInfo = t.Zenkei.layoutInfo.controlbar,
            null == this.layoutInfo)
                return null;
            var e = $(document.getElementById(this.ELEMENT_ID_CONTROL_BAR));
            0 != e.length && (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateVisibility(),
            this.UpdateLayout())
        },
        CreateElements: function() {
            $("<button></button>").attr("id", this.ELEMENT_ID_PLAN_BUTTON).css({
                "background-image": "url(" + this.PLAN_BUTTON_IMAGE + ")",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-size": "contain",
                "background-color": "rgba(0,0,0,0)",
                border: "none",
                outline: "none",
                padding: "0px",
                position: "absolute",
                "tap-highlight-color": "rgba(0,0,0,0)",
                cursor: "pointer"
            }).appendTo(document.getElementById(this.ELEMENT_ID_CONTROL_BAR)).on("click", this.planButton_Click.bind(this)),
            $("<button></button>").attr("id", this.ELEMENT_ID_THUMBNAIL_BUTTON).css({
                "background-image": "url(" + this.THUMBNAIL_BUTTON_IMAGE + ")",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-size": "contain",
                "background-color": "rgba(0,0,0,0)",
                border: "none",
                outline: "none",
                padding: "0px",
                position: "absolute",
                "tap-highlight-color": "rgba(0,0,0,0)",
                cursor: "pointer"
            }).appendTo(document.getElementById(this.ELEMENT_ID_CONTROL_BAR)).on("click", this.thumbnailButton_Click.bind(this)),
            $("<button></button>").attr("id", this.ELEMENT_ID_HELP_BUTTON).css({
                "background-image": "url(" + this.HELP_BUTTON_IMAGE + ")",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-size": "contain",
                "background-color": "rgba(0,0,0,0)",
                border: "none",
                outline: "none",
                padding: "0px",
                position: "absolute",
                "tap-highlight-color": "rgba(0,0,0,0)",
                cursor: "pointer"
            }).appendTo(document.getElementById(this.ELEMENT_ID_CONTROL_BAR)).on("click", this.helpButton_Click.bind(this)),
            $("<div></div>").attr("id", this.ELEMENT_ID_SPOT_TITLE).css({
                position: "absolute",
                "font-weight": "bold",
                "text-overflow": "ellipsis",
                overflow: "hidden",
                "white-space": "nowrap"
            }).appendTo(document.getElementById(this.ELEMENT_ID_CONTROL_BAR))
        },
        UpdateLayout: function() {
            var t = $(document.getElementById(this.ELEMENT_ID_CONTROL_BAR));
            if ("none" != t.css("display") && null != this.layoutInfo) {
                var e = "100%"
                  , i = "32px"
                  , n = "35px"
                  , o = "#ffffff"
                  , s = {};
                null != this.layoutInfo.width && (e = this.layoutInfo.width),
                null != this.layoutInfo.height && (i = this.layoutInfo.height),
                null != this.layoutInfo.top ? (s.top = this.layoutInfo.top,
                s.bottom = "") : null != this.layoutInfo.bottom && (s.bottom = this.layoutInfo.bottom,
                s.top = ""),
                null != this.layoutInfo.left ? (s.left = this.layoutInfo.left,
                s.right = "") : null != this.layoutInfo.right && (s.right = this.layoutInfo.right,
                s.left = ""),
                null != this.layoutInfo.backgroundcolor && (s["background-color"] = this.layoutInfo.backgroundcolor),
                null != this.layoutInfo.fontsize && (s["font-size"] = this.layoutInfo.fontsize),
                null != this.layoutInfo.position && (s.position = this.layoutInfo.position),
                null != this.layoutInfo.buttonsize && (n = this.layoutInfo.buttonsize),
                null != this.layoutInfo.color && (o = this.layoutInfo.color),
                s.width = e,
                s.height = i,
                t.css(s);
                var a = $(document.getElementById(this.ELEMENT_ID_PLAN_BUTTON)).css({
                    width: n,
                    height: n
                })
                  , l = $(document.getElementById(this.ELEMENT_ID_THUMBNAIL_BUTTON)).css({
                    width: n,
                    height: n
                })
                  , h = $(document.getElementById(this.ELEMENT_ID_HELP_BUTTON)).css({
                    width: n,
                    height: n
                })
                  , r = t.height()
                  , d = .5 * (r - h.height());
                h.css({
                    top: d + "px",
                    right: d + "px"
                });
                var c = h.width() + d;
                l.css({
                    top: d + "px",
                    right: c + "px"
                });
                var u = c + a.width() + d;
                a.css({
                    top: d + "px",
                    right: u + "px"
                });
                var g = $(document.getElementById(this.ELEMENT_ID_SPOT_TITLE))
                  , p = .4 * r;
                g.css("font-size", p + "px");
                var A = .5 * (r - g.height())
                  , m = t.width() - u - a.width() - A;
                g.css({
                    top: A + "px",
                    left: A + "px",
                    width: m + "px",
                    color: o
                })
            }
        },
        UpdateVisibility: function() {
            var t = "none";
            0 == this.model.totalSpotCount || this.model.isHmdModeEnabled || null == !this.layoutInfo || "none" == this.layoutInfo.display || (t = "block"),
            $(document.getElementById(this.ELEMENT_ID_CONTROL_BAR)).css("display", t)
        },
        UpdateSpotTitle: function() {
            var t = ""
              , e = this.model.spotJson;
            null != e && (t = e.ab),
            $(document.getElementById(this.ELEMENT_ID_SPOT_TITLE)).html(t),
            this.UpdateLayout()
        },
        planButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CONTROL_BAR_PLAN_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.FirePlanButtonClickedEvent(!1)
        },
        thumbnailButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CONTROL_BAR_THUMBNAIL_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.FireThumbnailButtonClickedEvent()
        },
        helpButton_Click: function(t) {
            if (this.controller.hasAccessLogId) {
                var e = t.originalEvent
                  , i = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_CONTROL_BAR_HELP_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.controller.FireHelpButtonClickedEvent()
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo.controlbar,
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && (this.UpdateVisibility(),
            this.UpdateLayout(),
            this.UpdateSpotTitle())
        },
        model_WalkThroughEnded: function() {
            this.UpdateVisibility(),
            this.UpdateLayout(),
            this.UpdateSpotTitle()
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility(),
            this.UpdateLayout()
        }
    },
    t.Zenkei != e && (t.Zenkei.ControlBar = i)
}(window),
function(t, e) {
    var i = function() {
        function e() {
            this.Initialize()
        }
        return e.prototype = {
            HELP_VIEW_ID: "helpView",
            HELP_IMAGE_ID: "helpImage",
            PANORMA_DISPLAY_ID: "panoramaDisplay",
            PLAYER_ID: "player",
            SHOW_START_TIME: 1e3,
            PORTRAIT_WIDTH_RATIO: .85,
            LANDSCAPE_HEIGHT_RATIO: .9,
            MAX_IMAGE_WIDTH: 500,
            MAX_CLOSE_BUTTON_WIDTH: 54,
            MAX_CLOSE_BUTTON_HEIGHT: 54,
            CLOSE_BUTTON_RIGHT_MARGIN: 0,
            CLOSE_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98FDQovOsyxN/4AAALBSURBVHja7ZpdTiJBEMfZvYB4AbNoQCP4eUt9l7NwiCXimyYgkohHoLtq/tW9D8zs9nZGRQR3erZ+Cck8DJXUf+pjumoaDUVRFEVRFEVRFEVRFEVRFCUky7ImM18T0eGmbBLRETNfZVnWTFKUxWKxA6AvIh7AiJlPPmuTmU8A3OU2bxaLxU5Sohhj9gAMnHPeOedyR6bW2u66Nq21PQBTEfFuiQcwMMbspRQpAxGBC8jFeTbG7K8h9AGAeSBKYRMABpWPnCzLdgH0i0iJycWZMHPvA+nTAzCJRQnwAPqVrjnMfP2GA6E4D0TUW1GUh1VsMvNVZYUhokMAozJHvPc+espja23nDVsdAJMw+iIbodAjIupUOp3yzhEWSedz8uvQobm19rxElEsAL4WN4j+hncDG4yY63pdgre0CeI4jJ3eq+IlzzovIjIjOAlHORWQW3lNoUlbMrbXHqbXsfQDj6Kn7+KnnaXVLRC0i2gcwitOnEDSKtrExppXkSx4zdwHcB46GKRWnxBDAME7BKNIKIe+ZudtImVycInIkdDSIgN8pk1//FWF/9FtGSvKiBHWjDWAepUhpx4qu4/eVORG1a3WgjIqqK0uXsjQrbhORJyK6qOVpm4jOANyKiBcRiUWJxZElRXE+rfUogohaAIZF5PhXCNJnSERf3n2+J6Lnt7pHy7qpNCKi87qK8tniOyOiy7qJsql2/VL5w+I/fMH70DynLkeCnyseCR6SFWfNQ+QPALcrHiInxpiDpET55NjhVESeVhw7zK21vVTSZxODqotw+P3OoGpa+UHVhkebbQDjFUebd0R09D8Nw7sA7pMfhmdZ1tzC+iRs96+tT24qv7Ld0sKtVVbMk1m4BY5sY0V7DOAx2RVtFDnbWOqPcpv95Jb6Qc3Z3cJnIJ2kPwNRFEVRFEVRFEVRFEVRFEXZHr8AxOMGzIz2vewAAAAASUVORK5CYII=",
            COOKIE_NAME: "DISPLAY_ZENKEI_PLAYER_HELP",
            CLICK_EVENT_TYPE: "click",
            Z_INDEX: 9999,
            view: null,
            viewTop: "0%",
            viewLeft: "0%",
            viewWidth: "100%",
            viewHeight: "100%",
            image: null,
            imageWidth: 0,
            imageHeight: 0,
            imageSrc: "data:image/png;base64,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",
            closeButton: null,
            panoramaDisplay: null,
            model: null,
            controller: null,
            shouldCheckCookie: !0
        },
        e.prototype.Initialize = function() {
            return this.view = document.getElementById(this.HELP_VIEW_ID),
            this.view ? (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.parseLayoutInfo(),
            this.new(),
            this.registerEventHandlers(),
            void 0) : null
        }
        ,
        e.prototype.parseLayoutInfo = function() {
            var e = t.layoutInfo;
            if (e && e.helpview) {
                var i = e.helpview;
                this.shouldCheckCookie = 0 != i.shouldcheckcookie,
                i.src && (this.imageSrc = i.src)
            }
        }
        ,
        e.prototype.registerEventHandlers = function() {
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.thumbnailButtonClickedEventHandler.Register(this.model_ThumbnailButtonClicked.bind(this)),
            this.model.planButtonClickedEventHandler.Register(this.model_PlanButtonClicked.bind(this)),
            this.model.helpButtonClickedEventHandler.Register(this.model_HelpButtonClicked.bind(this)),
            this.model.helpViewCloseButtonClickedEventHandler.Register(this.model_HelpViewCloseButtonClicked.bind(this)),
            this.model.showHelpViewByCookieEventHandler.Register(this.model_ShowHelpViewByCookie.bind(this))
        }
        ,
        e.prototype.new = function() {
            this.view.style.position = "absolute",
            this.view.style.top = 0,
            this.view.style.left = 0,
            this.view.style.width = "100%",
            this.view.style.height = "100%",
            this.view.style.backgroundColor = "rgba(0,0,0,0.5)",
            this.view.style.zIndex = this.Z_INDEX,
            this.view.style.display = "none",
            this.image = new Image,
            this.image.style.position = "absolute",
            this.image.src = this.imageSrc,
            this.image.onload = this.onLoadImage.bind(this),
            this.view.appendChild(this.image),
            this.closeButton = document.createElement("div"),
            this.closeButton.style.position = "absolute",
            this.closeButton.style.backgroundImage = "url(" + this.CLOSE_BUTTON_IMAGE + ")",
            this.closeButton.style.backgroundRepeat = "no-repeat",
            this.closeButton.style.backgroundSize = "contain",
            this.closeButton.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)",
            this.closeButton.style.mozTapHighlightColor = "rgba(0, 0, 0, 0)",
            this.closeButton.style.tapHighlightColor = "rgba(0, 0, 0, 0)",
            this.closeButton.addEventListener(this.CLICK_EVENT_TYPE, this.closeButton_Click.bind(this), !1),
            this.view.appendChild(this.closeButton),
            this.panoramaDisplay = document.getElementById(this.PANORMA_DISPLAY_ID)
        }
        ,
        e.prototype.onLoadImage = function() {
            if (!this.controller.isPlayingBrowseLog && this.shouldCheckCookie) {
                var t = this.getCookie(this.COOKIE_NAME);
                t || (this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_HELPVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_START, null),
                this.controller.FireShowHelpViewByCookieEvent())
            }
        }
        ,
        e.prototype.model_ThumbnailButtonClicked = function() {
            "block" == this.view.style.display && this.close()
        }
        ,
        e.prototype.model_PlanButtonClicked = function() {
            "block" == this.view.style.display && this.close()
        }
        ,
        e.prototype.model_HelpButtonClicked = function() {
            "none" == this.view.style.display ? this.open() : this.close()
        }
        ,
        e.prototype.model_HelpViewCloseButtonClicked = function() {
            this.close()
        }
        ,
        e.prototype.model_HmdModeStart = function() {
            this.close()
        }
        ,
        e.prototype.model_CloseHelpView = function() {
            this.close()
        }
        ,
        e.prototype.model_ShowHelpViewByCookie = function() {
            setTimeout(this.open.bind(this), this.SHOW_START_TIME)
        }
        ,
        e.prototype.open = function() {
            Zenkei.Utility.fadein(this.view, 350),
            this.updateLayout()
        }
        ,
        e.prototype.close = function() {
            Zenkei.Utility.fadeout(this.view, 350),
            this.getCookie(this.COOKIE_NAME) || this.setCookie(this.COOKIE_NAME, "true")
        }
        ,
        e.prototype.closeButton_Click = function(t) {
            if (this.controller.hasAccessLogId) {
                var e = {
                    x: t.clientX,
                    y: t.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_HELPVIEW_CLOSE_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, e)
            }
            this.controller.FireHelpViewCloseButtonClickedEvent()
        }
        ,
        e.prototype.model_PlayerSizeChanged = function() {
            this.updateLayout()
        }
        ,
        e.prototype.updateLayout = function() {
            if ("none" != this.view.style.display) {
                var t = $("#" + this.PLAYER_ID);
                t && (this.viewWidth = t.width() + "px",
                this.viewHeight = t.height() + "px"),
                this.view.style.width = this.viewWidth,
                this.view.style.height = this.viewHeight;
                var e, i, n, o, s = this.image.height / this.image.width;
                this.model.isOrientationPortrait ? (n = this.view.clientWidth * this.PORTRAIT_WIDTH_RATIO,
                n > this.MAX_IMAGE_WIDTH && (n = this.MAX_IMAGE_WIDTH),
                o = n * s,
                i = .5 * (this.view.clientWidth - n),
                e = .5 * (this.view.clientHeight - o)) : (o = this.view.clientHeight * this.LANDSCAPE_HEIGHT_RATIO,
                n = o / s,
                i = .5 * (this.view.clientWidth - n),
                e = .5 * (this.view.clientHeight - o)),
                this.image.width = n,
                this.image.height = o,
                this.image.style.left = i + "px",
                this.image.style.top = e + "px";
                var a = .1 * o
                  , l = .95 * a
                  , h = l;
                l > this.MAX_CLOSE_BUTTON_HEIGHT && (l = this.MAX_CLOSE_BUTTON_HEIGHT),
                h > this.MAX_CLOSE_BUTTON_WIDTH && (h = this.MAX_CLOSE_BUTTON_WIDTH),
                this.closeButton.style.width = h + "px",
                this.closeButton.style.height = l + "px",
                this.closeButton.style.top = this.image.offsetTop + .5 * (a - h) + "px",
                this.closeButton.style.right = this.image.offsetLeft + this.CLOSE_BUTTON_RIGHT_MARGIN + "px"
            }
        }
        ,
        e.prototype.getCookie = function(t) {
            var e = t + "="
              , i = document.cookie
              , n = i.indexOf(e)
              , o = null;
            if (-1 != n) {
                var s = n + e.length
                  , a = i.indexOf(";", s);
                -1 == a && (a = i.length),
                o = decodeURIComponent(i.substring(s, a))
            }
            return o
        }
        ,
        e.prototype.setCookie = function(t, e) {
            document.cookie = t + "=" + escape(e)
        }
        ,
        e
    }();
    t.Zenkei != e && (t.Zenkei.HelpView = i)
}(window),
function(t, e) {
    var i = function() {
        function e() {
            this.Initialize()
        }
        return e.prototype = {
            MARQUEE_TEXT_CONTAINER_ID: "marqueeTextContainer",
            MARQUEE_TEXT_ID: "marqueeText",
            PANORAMA_DISPLAY_ID: "panoramaDisplay",
            ANIMATION_NAME: "marquee",
            ANIMATION_TIMINING_FUNCTION: "linear",
            ANIMATION_ITERATION_COUNT: "1",
            PORTRAIT_DEFAULT_TOP: "10%",
            PORTRAIT_DEFAULT_LEFT: "0",
            PORTRAIT_DEFAULT_WIDTH: "100%",
            PORTRAIT_DEFAULT_HEIGHT: "10%",
            PORTRAIT_DEFAULT_FONT_SIZE: "20px",
            LANDSCAPE_DEFAULT_TOP: "10%",
            LANDSCAPE_DEFAULT_LEFT: "0",
            LANDSCAPE_DEFAULT_WIDTH: "100%",
            LANDSCAPE_DEFAULT_HEIGHT: "10%",
            LANDSCAPE_DEFAULT_FONT_SIZE: "20px",
            model: null,
            controller: null,
            panoramaDisplay: null,
            panoramaDisplayTop: "0%",
            panoramaDisplayBottom: "0%",
            panoramaDisplayLeft: "0%",
            panoramaDisplayWidth: "100%",
            panoramaDisplayHeight: "100%",
            timerIds: [],
            portraitTop: "10%",
            portraitLeft: "0",
            portraitBottom: "0",
            portraitRight: "0",
            portraitWidth: "100%",
            portraitHeight: "10%",
            portraitFontSize: "20px",
            portraitDisplay: "block",
            landscapeTop: "10%",
            landscapeLeft: "0",
            landscapeBottom: "0",
            landscapeRight: "0",
            landscapeWidth: "100%",
            landscapeHeight: "10%",
            landscapeFontSize: "20px",
            landscapeDisplay: "block",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            textShadow: "0 0 0px #ffffff",
            fontWeight: "normal",
            speedRatio: 1
        },
        e.prototype.Initialize = function() {
            return this.marqueeTextContainer = document.getElementById(this.MARQUEE_TEXT_CONTAINER_ID),
            this.marqueeTextContainer ? (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.parseLayoutInfo(),
            this.new(),
            this.registerEventHandlers(),
            void 0) : null
        }
        ,
        e.prototype.parseLayoutInfo = function() {
            var e = t.layoutInfo;
            if (e && e.marqueetext) {
                var i = e.marqueetext;
                i.color && (this.color = i.color),
                i.backgroundColor && (this.backgroundColor = i.backgroundColor),
                i.textShadow && (this.textShadow = i.textShadow),
                i.fontWeight && (this.fontWeight = i.fontWeight),
                i.speedRatio && (this.speedRatio = i.speedRatio)
            }
            if (e) {
                var n = e.portrait;
                if (n && n.marqueetext) {
                    var i = n.marqueetext;
                    i.top ? (this.portraitTop = i.top,
                    this.portraitBottom = "") : i.bottom && (this.portraitTop = "",
                    this.portraitBottom = i.bottom),
                    i.left ? (this.portraitLeft = i.left,
                    this.portraitRight = "") : i.right && (this.portraitLeft = "",
                    this.portraitRight = i.right),
                    i.width && (this.portraitWidth = i.width),
                    i.height && (this.portraitHeight = i.height),
                    i.fontSize && (this.portraitFontSize = i.fontSize),
                    i.display && (this.portraitDisplay = i.fontSize)
                }
                var o = e.landscape;
                if (o && o.marqueetext) {
                    var i = o.marqueetext;
                    i.top ? (this.landscapeTop = i.top,
                    this.landscapeBottom = "") : i.bottom && (this.landscapeTop = "",
                    this.landscapeBottom = i.bottom),
                    i.left ? (this.landscapeLeft = i.left,
                    this.landscapeRight = "") : i.right && (this.landscapeLeft = "",
                    this.landscapeRight = i.right),
                    i.width && (this.landscapeWidth = i.width),
                    i.height && (this.landscapeHeight = i.height),
                    i.fontSize && (this.landscapeFontSize = i.fontSize),
                    i.display && (this.landscapeDisplay = i.fontSize)
                }
            }
        }
        ,
        e.prototype.registerEventHandlers = function() {
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.walkThroughStartedEventHandler.Register(this.mode_WalkThroughStarted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.mode_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.model.shouldShowSpotTextChangedEventHandler.Register(this.model_ShouldShowSpotTextChanged.bind(this))
        }
        ,
        e.prototype.new = function() {
            this.marqueeTextContainer.style.position = "absolute",
            this.marqueeTextContainer.style.overflow = "hidden",
            this.marqueeTextContainer.style.display = "none",
            this.marqueeTextContainer.style.zIndex = "5000",
            this.marqueeTextContainer.style.backgroundColor = this.backgroundColor,
            this.marqueeTextContainer.style.color = this.color,
            this.marqueeTextContainer.style.textShadow = this.textShadow,
            this.marqueeTextContainer.style.fontWeight = this.fontWeight,
            this.panoramaDisplay = document.getElementById(this.PANORAMA_DISPLAY_ID)
        }
        ,
        e.prototype.setText = function(t) {
            this.marqueeTextContainer && (this.marqueeTextContainer.childElementCount > 0 && this.marqueeTextContainer.removeChild(this.marqueeTextContainer.firstChild),
            this.marqueeText = document.createElement("div"),
            this.marqueeText.id = this.MARQUEE_TEXT_ID,
            this.marqueeText.style.display = "inline-block",
            this.marqueeText.style.whiteSpace = "nowrap",
            this.marqueeText.style.margin = "0 0 0 10px",
            this.marqueeTextContainer.appendChild(this.marqueeText),
            this.marqueeText.innerHTML = t)
        }
        ,
        e.prototype.animate = function() {
            this.timerIds.push(setTimeout(this.fadein.bind(this), 0));
            var t = 3e3;
            this.timerIds.push(setTimeout(this.marquee.bind(this), t)),
            this.duration = Math.floor(this.marqueeText.textContent.length / 3) / this.speedRatio;
            var e = t + 1e3 * this.duration;
            this.timerIds.push(setTimeout(this.fadeout.bind(this), e))
        }
        ,
        e.prototype.fadein = function() {
            this.marqueeTextContainer && (Zenkei.Utility.fadein(this.marqueeTextContainer, 350),
            this.updateLayout())
        }
        ,
        e.prototype.fadeout = function() {
            this.marqueeText && this.marqueeTextContainer && (this.marqueeTextContainer.childElementCount > 0 && this.marqueeTextContainer.removeChild(this.marqueeTextContainer.firstChild),
            Zenkei.Utility.fadeout(this.marqueeTextContainer, 350))
        }
        ,
        e.prototype.hide = function() {
            this.marqueeText && this.marqueeTextContainer && (this.marqueeTextContainer.childElementCount > 0 && this.marqueeTextContainer.removeChild(this.marqueeTextContainer.firstChild),
            this.marqueeTextContainer.className = "",
            this.marqueeTextContainer.style.display = "none")
        }
        ,
        e.prototype.marquee = function() {
            this.marqueeTextContainer.clientWidth > this.marqueeText.clientWidth + this.marqueeText.offsetLeft || (this.marqueeText.style.animationName = this.ANIMATION_NAME,
            this.marqueeText.style.animationTimingFunction = this.ANIMATION_TIMINING_FUNCTION,
            this.marqueeText.style.animationDuration = this.duration + "s",
            this.marqueeText.style.animationIterationCount = this.ANIMATION_ITERATION_COUNT,
            this.marqueeText.style.webkitAnimationName = this.ANIMATION_NAME,
            this.marqueeText.style.webkitAnimationTimingFunction = this.ANIMATION_TIMINING_FUNCTION,
            this.marqueeText.style.webkitAnimationDuration = this.duration + "s",
            this.marqueeText.style.webkitAnimationIterationCount = this.ANIMATION_ITERATION_COUNT,
            this.marqueeText.style.msAnimationName = this.ANIMATION_NAME,
            this.marqueeText.style.msAnimationTimingFunction = this.ANIMATION_TIMINING_FUNCTION,
            this.marqueeText.style.msAnimationDuration = this.duration + "s",
            this.marqueeText.style.msAnimationIterationCount = this.ANIMATION_ITERATION_COUNT)
        }
        ,
        e.prototype.model_PlayerSizeChanged = function() {
            this.updateLayout()
        }
        ,
        e.prototype.model_SpotSelect = function() {
            this.clearTimers(),
            this.hide()
        }
        ,
        e.prototype.model_SpotImageLoadCompleted = function(t) {
            t.isMainView && t.isFrontView && this.start()
        }
        ,
        e.prototype.mode_WalkThroughStarted = function() {
            this.stop()
        }
        ,
        e.prototype.mode_WalkThroughEnded = function() {
            this.start()
        }
        ,
        e.prototype.model_HmdModeStart = function() {
            this.stop()
        }
        ,
        e.prototype.model_HmdModeStop = function() {
            this.start()
        }
        ,
        e.prototype.model_ShouldShowSpotTextChanged = function() {
            "none" == this.marqueeTextContainer.style.display ? this.start() : this.stop()
        }
        ,
        e.prototype.updateLayout = function() {
            var e = this.orientedLayoutInfo();
            this.marqueeTextContainer.style.top = e.top,
            this.marqueeTextContainer.style.bottom = e.bottom,
            this.marqueeTextContainer.style.left = e.left,
            this.marqueeTextContainer.style.right = e.right,
            this.marqueeTextContainer.style.width = e.width,
            this.marqueeTextContainer.style.height = e.height,
            this.marqueeTextContainer.style.display = e.display,
            this.marqueeText && (this.marqueeText.style.height = e.height,
            this.marqueeText.style.fontSize = e.fontSize,
            this.marqueeText.style.lineHeight = this.marqueeTextContainer.clientHeight + "px");
            var i = Zenkei.Utility.GetLayoutInfoFromElement(this.panoramaDisplay)
              , n = Zenkei.Utility.GetLayoutInfoFromElement(this.marqueeTextContainer);
            if (this.marqueeTextContainer.style.top ? this.marqueeTextContainer.style.top = i.top + n.top + "px" : this.marqueeTextContainer.style.bottom = i.bottom + n.bottom + "px",
            this.marqueeTextContainer.style.left) {
                var o = i.left + n.left
                  , s = n.width;
                if (t.innerWidth < o + s) {
                    var a = o + s - t.innerWidth;
                    s -= a
                }
                this.marqueeTextContainer.style.left = o + "px",
                this.marqueeTextContainer.style.width = s + "px"
            } else {
                var l = i.right + n.right;
                this.marqueeTextContainer.style.right = l + "px"
            }
        }
        ,
        e.prototype.orientedLayoutInfo = function() {
            var t, e, i, n, o, s, a, l;
            this.model.isOrientationPortrait ? (t = this.portraitTop,
            e = this.portraitBottom,
            i = this.portraitLeft,
            n = this.portraitRight,
            o = this.portraitWidth,
            s = this.portraitHeight,
            a = this.portraitFontSize,
            l = this.portraitDisplay) : (t = this.landscapeTop,
            e = this.landscapeBottom,
            i = this.landscapeLeft,
            n = this.landscapeRight,
            o = this.landscapeWidth,
            s = this.landscapeHeight,
            a = this.landscapeFontSize,
            l = this.landscapeDisplay);
            var h = $(this.panoramaDisplay).width()
              , r = $(this.panoramaDisplay).height();
            t && (t = Zenkei.Utility.GetPixelSize(t, r)),
            e && (e = Zenkei.Utility.GetPixelSize(e, r)),
            i && (i = Zenkei.Utility.GetPixelSize(i, h)),
            n && (n = Zenkei.Utility.GetPixelSize(n, h)),
            o && (o = Zenkei.Utility.GetPixelSize(o, h)),
            s && (s = Zenkei.Utility.GetPixelSize(s, r));
            var d = {
                top: t + "px",
                bottom: e + "px",
                left: i + "px",
                right: n + "px",
                width: o + "px",
                height: s + "px",
                fontSize: a,
                display: l
            };
            return d
        }
        ,
        e.prototype.start = function() {
            if ("none" == this.marqueeTextContainer.style.display && !this.model.isHmdModeEnabled) {
                var t = this.model.spotJson
                  , e = t.ac;
                e && e.length > 0 && (e = e.replace(/(<br>|<br \/>)/gi, ""),
                this.setText(e),
                this.updateLayout(),
                this.animate())
            }
        }
        ,
        e.prototype.stop = function() {
            "block" == this.marqueeTextContainer.style.display && (this.clearTimers(),
            this.fadeout())
        }
        ,
        e.prototype.clearTimers = function() {
            for (var t = 0; t < this.timerIds.length; t++) {
                var e = this.timerIds[t];
                clearTimeout(e)
            }
            this.timerIds = []
        }
        ,
        e
    }();
    t.Zenkei != e && (t.Zenkei.MarqueeText = i)
}(window),
function(t, e) {
    var i = function() {
        function e() {
            this.Initialize()
        }
        return e.prototype = {
            SPOT_LIST_VIEW_ID: "spotListView",
            SPOT_LIST_VIEW_HEADER_ID: "spotListHeader",
            SPOT_LIST_VIEW_TITLE_ID: "spotListTitle",
            SPOT_LIST_VIEW_BODY_ID: "spotListBody",
            SPOT_LIST_ITEM_CONTAINER_ID: "spotListItemContainer",
            CLOSE_SPOT_LIST_VIEW_BUTTON_ID: "closeSpotListViewButton",
            PANORMA_DISPLAY_ID: "panoramaDisplay",
            CLICK_EVENT_TYPE: "click",
            BACKGOUND_COLOR: "#333333",
            TITLE_COLOR: "#FFFFFF",
            TITLE_FONTWEIGHT: "bold",
            TITLE_TEXT: "撮影ポイント一覧",
            TITLE_WIDTH: "80%",
            TITLE_MARGIN: "0 10%",
            TITLE_FONT_SIZE: 16,
            TITLE_MAX_FONT_SIZE: 20,
            PORTRAIT_HEADER_LEFT: "5%",
            PORTRAIT_HEADER_WIDTH: "90%",
            PORTRAIT_BODY_LEFT: "5%",
            PORTRAIT_BODY_WIDTH: "90%",
            PORTRAIT_BODY_HEIGHT: "75%",
            LANDSCAPE_HEADER_LEFT: "10%",
            LANDSCAPE_HEADER_WIDTH: "80%",
            LANDSCAPE_BODY_LEFT: "10%",
            LANDSCAPE_BODY_WIDTH: "80%",
            LANDSCAPE_BODY_HEIGHT: "70%",
            CLOSE_BUTTON_WIDTH: 36,
            CLOSE_BUTTON_HEIGHT: 36,
            CLOSE_BUTTON_RIGHT_MARGIN: 5,
            ITEM_MAX_HEIGHT: 120,
            ITEM_DEFAULT_HEIGHT: 80,
            HEADER_MAX_HEIGHT: 60,
            HEADER_DEFAULT_HEIGHT: 50,
            BASE_SCREEN_AREA: 147200,
            SPOT_TEXT_LEFT_MARGIN: 10,
            SPOT_TEXT_BOTTOM_MARGIN: 5,
            SPOT_TEXT_MAX_FONT_SIZE: 20,
            PLAN_TEXT_LEFT_MARGIN: 10,
            PLAN_TEXT_TOP_MARGIN: 5,
            PLAN_TEXT_MAX_FONT_SIZE: 18,
            THUMBNAIL_ASPECT: 4 / 3,
            CLOSE_BUTTON_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98FDQovOsyxN/4AAALBSURBVHja7ZpdTiJBEMfZvYB4AbNoQCP4eUt9l7NwiCXimyYgkohHoLtq/tW9D8zs9nZGRQR3erZ+Cck8DJXUf+pjumoaDUVRFEVRFEVRFEVRFEVRFCUky7ImM18T0eGmbBLRETNfZVnWTFKUxWKxA6AvIh7AiJlPPmuTmU8A3OU2bxaLxU5Sohhj9gAMnHPeOedyR6bW2u66Nq21PQBTEfFuiQcwMMbspRQpAxGBC8jFeTbG7K8h9AGAeSBKYRMABpWPnCzLdgH0i0iJycWZMHPvA+nTAzCJRQnwAPqVrjnMfP2GA6E4D0TUW1GUh1VsMvNVZYUhokMAozJHvPc+espja23nDVsdAJMw+iIbodAjIupUOp3yzhEWSedz8uvQobm19rxElEsAL4WN4j+hncDG4yY63pdgre0CeI4jJ3eq+IlzzovIjIjOAlHORWQW3lNoUlbMrbXHqbXsfQDj6Kn7+KnnaXVLRC0i2gcwitOnEDSKtrExppXkSx4zdwHcB46GKRWnxBDAME7BKNIKIe+ZudtImVycInIkdDSIgN8pk1//FWF/9FtGSvKiBHWjDWAepUhpx4qu4/eVORG1a3WgjIqqK0uXsjQrbhORJyK6qOVpm4jOANyKiBcRiUWJxZElRXE+rfUogohaAIZF5PhXCNJnSERf3n2+J6Lnt7pHy7qpNCKi87qK8tniOyOiy7qJsql2/VL5w+I/fMH70DynLkeCnyseCR6SFWfNQ+QPALcrHiInxpiDpET55NjhVESeVhw7zK21vVTSZxODqotw+P3OoGpa+UHVhkebbQDjFUebd0R09D8Nw7sA7pMfhmdZ1tzC+iRs96+tT24qv7Ld0sKtVVbMk1m4BY5sY0V7DOAx2RVtFDnbWOqPcpv95Jb6Qc3Z3cJnIJ2kPwNRFEVRFEVRFEVRFEVRFEXZHr8AxOMGzIz2vewAAAAASUVORK5CYII=",
            INDICATOR_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE1LTA1LTEzVDEyOjI5OjA4KzA5OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNS0wNS0xM1QxMjozMDo0NyswOTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNS0wNS0xM1QxMjozMDo0NyswOTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzFFMkI1QjdGOTIwMTFFNDgzODNDNjFDQ0IzM0FDOUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzFFMkI1QjhGOTIwMTFFNDgzODNDNjFDQ0IzM0FDOUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RS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",
            INDICATOR_RIGHT_MARGIN: "5.0",
            THUMBNAIL_FILE_NAME: "thumb.jpg",
            model: null,
            controller: null,
            layoutInfo: null,
            view: null,
            viewTop: "0%",
            viewLeft: "0%",
            viewWidth: "100%",
            viewHeight: "100%",
            header: null,
            title: null,
            body: null,
            itemContainer: null,
            closeButton: null,
            panoramaDisplay: null,
            itemBorderColor: "#cccccc",
            itemBackgroundColor: "#eeeeee",
            planTextFontSize: "12.0",
            planTextDefaultColor: "#999999",
            planTextActiveColor: "#ee8484",
            spotTextFontSize: "14.0",
            spotTextDefaultColor: "#000000",
            spotTextActiveColor: "#ee1111",
            portraitDisplay: "block",
            landscapeDisplay: "block"
        },
        e.prototype.Initialize = function() {
            return this.view = document.getElementById(this.SPOT_LIST_VIEW_ID),
            this.view ? (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.setLayoutInfo(),
            this.new(),
            this.registerEventHandlers(),
            void 0) : null
        }
        ,
        e.prototype.setLayoutInfo = function() {
            var e = t.layoutInfo;
            e && e.portrait && e.portrait.spotlistview && e.portrait.spotlistview.display && (this.portraitDisplay = e.portrait.spotlistview.display),
            e && e.landscape && e.landscape.spotlistview && e.landscape.spotlistview.display && (this.landscapeDisplay = e.landscape.spotlistview.display),
            e && layoutInfo.spotlistview && (layoutInfo.spotlistview.item && (layoutInfo.spotlistview.item.borderColor && (this.itemBorderColor = layoutInfo.spotlistview.item.borderColor),
            layoutInfo.spotlistview.item.backgroundColor && (this.itemBackgroundColor = layoutInfo.spotlistview.item.backgroundColor)),
            layoutInfo.spotlistview.plantext && (layoutInfo.spotlistview.plantext.defaultColor && (this.planTextDefaultColor = layoutInfo.spotlistview.plantext.defaultColor),
            layoutInfo.spotlistview.plantext.activeColor && (this.planTextActiveColor = layoutInfo.spotlistview.plantext.activeColor)),
            t.layoutInfo.spotlistview.spottext && (t.layoutInfo.spotlistview.spottext.defaultColor && (this.spotTextDefaultColor = t.layoutInfo.spotlistview.spottext.defaultColor),
            t.layoutInfo.spotlistview.spottext.activeColor && (this.spotTextActiveColor = t.layoutInfo.spotlistview.spottext.activeColor)))
        }
        ,
        e.prototype.new = function() {
            this.view.style.position = "absolute",
            this.view.style.top = 0,
            this.view.style.left = 0,
            this.view.style.backgroundColor = "rgba(0,0,0,0.5)",
            this.view.style.display = "none",
            this.view.style.zIndex = 5e3,
            this.header = document.createElement("div"),
            this.header.id = this.SPOT_LIST_VIEW_HEADER_ID,
            this.header.style.position = "absolute",
            this.header.style.backgroundColor = this.BACKGOUND_COLOR,
            this.view.appendChild(this.header),
            this.title = document.createElement("div"),
            this.title.id = this.SPOT_LIST_VIEW_TITLE_ID,
            this.title.style.color = this.TITLE_COLOR,
            this.title.style.fontWeight = this.TITLE_FONTWEIGHT,
            this.title.style.textAlign = "center",
            this.title.style.overflow = "hidden",
            this.title.style.msTextOverflow = "ellipsis",
            this.title.style.oTextOverflow = "ellipsis",
            this.title.style.textOverflow = "ellipsis",
            this.title.style.whiteSpace = "nowrap",
            this.title.style.width = this.TITLE_WIDTH,
            this.title.style.margin = this.TITLE_MARGIN,
            this.title.textContent = this.TITLE_TEXT,
            this.header.appendChild(this.title),
            this.body = document.createElement("div"),
            this.body.id = this.SPOT_LIST_VIEW_BODY_ID,
            this.body.style.position = "absolute",
            this.body.style.backgroundColor = this.BACKGOUND_COLOR,
            this.body.style.webkitBoxSizing = "border-box",
            this.body.style.mozBoxSizing = "border-box",
            this.body.style.boxSizing = "border-box",
            this.body.style.overflowX = "hidden",
            this.body.style.webkitOverflowScrolling = "touch",
            this.view.appendChild(this.body),
            this.itemContainer = document.createElement("ul"),
            this.itemContainer.id = this.SPOT_LIST_ITEM_CONTAINER_ID,
            this.itemContainer.style.listStyleType = "none",
            this.itemContainer.style.margin = "0",
            this.itemContainer.style.padding = "0",
            this.itemContainer.style.width = "100%",
            this.itemContainer.style.height = "100%",
            this.body.appendChild(this.itemContainer),
            this.closeButton = document.createElement("div"),
            this.closeButton.id = this.CLOSE_SPOT_LIST_VIEW_BUTTON_ID,
            this.closeButton.style.position = "absolute",
            this.closeButton.style.backgroundImage = "url(" + this.CLOSE_BUTTON_IMAGE + ")",
            this.closeButton.style.backgroundRepeat = "no-repeat",
            this.closeButton.style.backgroundSize = "100%",
            this.closeButton.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)",
            this.closeButton.style.mozTapHighlightColor = "rgba(0, 0, 0, 0)",
            this.closeButton.style.tapHighlightColor = "rgba(0, 0, 0, 0)",
            this.closeButton.addEventListener(this.CLICK_EVENT_TYPE, this.closeButton_Click.bind(this), !1),
            this.view.appendChild(this.closeButton),
            this.panoramaDisplay = document.getElementById(this.PANORMA_DISPLAY_ID)
        }
        ,
        e.prototype.addItems = function() {
            for (var t = 0; t < this.model.projectJson.pl.length; t++)
                for (var e = this.model.projectJson.pl[t], i = 0; i < e.sp.length; i++) {
                    var n = this.createItem();
                    n.addEventListener(this.CLICK_EVENT_TYPE, this.item_Click.bind(this, t, i), !1),
                    this.itemContainer.appendChild(n);
                    var o = e.sp[i]
                      , s = this.model.projectJson.aa + o.ad + "/" + this.THUMBNAIL_FILE_NAME
                      , a = this.createThumbnail(s);
                    n.appendChild(a);
                    var l = this.createSpotText(o.ab);
                    n.appendChild(l);
                    var h = this.createPlanText(e.ab);
                    n.appendChild(h);
                    var r = this.createIndicator();
                    n.appendChild(r)
                }
        }
        ,
        e.prototype.createItem = function() {
            var t = document.createElement("li");
            return t.style.position = "absolute",
            t.style.borderWidth = "1px 0px 1px 0px",
            t.style.borderColor = this.itemBorderColor,
            t.style.background = this.itemBackgroundColor,
            t.style.left = "0",
            t.style.width = "100%",
            t.style.fontWeight = "bold",
            t.style.borderStyle = "solid",
            t.style.listStyle = "none",
            t.style.overflow = "hidden",
            t.style.msTextOverflow = "ellipsis",
            t.style.oTextOverflow = "ellipsis",
            t.style.textOverflow = "ellipsis",
            t.style.whiteSpace = "nowrap",
            t.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)",
            t.style.mozTapHighlightColor = "rgba(0, 0, 0, 0)",
            t.style.tapHighlightColor = "rgba(0, 0, 0, 0)",
            t
        }
        ,
        e.prototype.createThumbnail = function(t) {
            var e = new Image;
            return e.style.position = "absolute",
            e.style.height = "100%",
            e.src = t,
            e
        }
        ,
        e.prototype.createIndicator = function() {
            var t = document.createElement("div");
            return t.style.position = "absolute",
            t.style.backgroundImage = "url(" + this.INDICATOR_IMAGE + ")",
            t.style.backgroundRepeat = "no-repeat",
            t.style.backgroundSize = "contain",
            t
        }
        ,
        e.prototype.createPlanText = function(t) {
            var e = document.createElement("div");
            return e.style.position = "absolute",
            e.textContent = t,
            e
        }
        ,
        e.prototype.createSpotText = function(t) {
            var e = document.createElement("div");
            return e.style.position = "absolute",
            e.textContent = t,
            e
        }
        ,
        e.prototype.registerEventHandlers = function() {
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotSelectEventHandler.Register(this.model_SpotSelect.bind(this)),
            this.model.thumbnailButtonClickedEventHandler.Register(this.model_ThumbnailButtonClicked.bind(this)),
            this.model.planButtonClickedEventHandler.Register(this.model_PlanButtonClicked.bind(this)),
            this.model.helpButtonClickedEventHandler.Register(this.model_HelpButtonClicked.bind(this)),
            this.model.spotListViewCloseButtonClickedEventHandler.Register(this.model_SpotListViewCloseButtonClicked.bind(this))
        }
        ,
        e.prototype.model_PlayerSizeChanged = function() {
            this.updateLayout()
        }
        ,
        e.prototype.model_SpotSelect = function() {
            "block" == this.view.style.display && this.close()
        }
        ,
        e.prototype.model_ThumbnailButtonClicked = function() {
            "none" == this.view.style.display ? this.open() : this.close()
        }
        ,
        e.prototype.model_PlanButtonClicked = function() {
            "block" == this.view.style.display && this.close()
        }
        ,
        e.prototype.model_HelpButtonClicked = function() {
            "block" == this.view.style.display && this.close()
        }
        ,
        e.prototype.model_SpotListViewCloseButtonClicked = function() {
            this.close()
        }
        ,
        e.prototype.updateItemSelected = function() {
            if (0 != this.itemContainer.childElementCount)
                for (var t = this.model.projectJson, e = 0, i = 0; i < t.pl.length; i++)
                    for (var n = t.pl[i], o = 0; o < n.sp.length; o++) {
                        var s, a, l = this.itemContainer.children[e];
                        i == this.model.planIndex && o == this.model.spotIndex ? (a = this.spotTextActiveColor,
                        s = this.planTextActiveColor,
                        this.body.scrollTop = e * l.clientHeight) : (a = this.spotTextDefaultColor,
                        s = this.planTextDefaultColor);
                        var h = l.children[1];
                        h.style.color = a;
                        var r = l.children[2];
                        r.style.color = s,
                        e++
                    }
        }
        ,
        e.prototype.updateLayout = function() {
            if ("none" != this.view.style.display && (this.view.style.display = this.model.isOrientationPortrait ? this.portraitDisplay : this.landscapeDisplay,
            "none" != this.view.style.display)) {
                this.panoramaDisplay && (this.viewLeft = this.panoramaDisplay.offsetLeft + "px",
                this.viewTop = this.panoramaDisplay.offsetTop + "px",
                this.viewWidth = this.panoramaDisplay.clientWidth + "px",
                this.viewHeight = this.panoramaDisplay.clientHeight + "px"),
                this.view.style.left = this.viewLeft,
                this.view.style.top = this.viewTop,
                this.view.style.width = this.viewWidth,
                this.view.style.height = this.viewHeight;
                var t, e, i, n, o;
                this.model.isOrientationPortrait ? (t = this.PORTRAIT_HEADER_LEFT,
                e = this.PORTRAIT_HEADER_WIDTH,
                i = this.PORTRAIT_BODY_LEFT,
                n = this.PORTRAIT_BODY_WIDTH,
                o = this.PORTRAIT_BODY_HEIGHT) : (t = this.LANDSCAPE_HEADER_LEFT,
                e = this.LANDSCAPE_HEADER_WIDTH,
                i = this.LANDSCAPE_BODY_LEFT,
                n = this.LANDSCAPE_BODY_WIDTH,
                o = this.LANDSCAPE_BODY_HEIGHT);
                var s = Math.sqrt(this.model.playerHeight * this.model.playerWidth) / Math.sqrt(this.BASE_SCREEN_AREA)
                  , a = Math.floor(this.HEADER_DEFAULT_HEIGHT * s);
                a > this.HEADER_MAX_HEIGHT && (a = this.HEADER_MAX_HEIGHT);
                var l = Math.floor(.07 * this.view.clientHeight);
                this.header.style.top = l + "px",
                this.header.style.left = t,
                this.header.style.width = e,
                this.header.style.height = a + "px";
                var a = this.header.clientHeight;
                this.title.style.lineHeight = a + "px";
                var h = this.TITLE_FONT_SIZE * s;
                h > this.TITLE_MAX_FONT_SIZE && (h = this.TITLE_MAX_FONT_SIZE),
                this.title.style.fontSize = h + "px",
                this.body.style.top = l + a + "px",
                this.body.style.left = i,
                this.body.style.width = n,
                this.body.style.height = o,
                this.closeButton.style.width = this.CLOSE_BUTTON_WIDTH + "px",
                this.closeButton.style.height = this.CLOSE_BUTTON_HEIGHT + "px",
                this.closeButton.style.top = this.header.offsetTop + .5 * (a - this.CLOSE_BUTTON_WIDTH) + "px",
                this.closeButton.style.right = this.header.offsetLeft + this.CLOSE_BUTTON_RIGHT_MARGIN + "px";
                var r = Math.floor(this.ITEM_DEFAULT_HEIGHT * s);
                r > this.ITEM_MAX_HEIGHT && (r = this.ITEM_MAX_HEIGHT),
                r < this.ITEM_DEFAULT_HEIGHT && (r = this.ITEM_DEFAULT_HEIGHT);
                var d = r * this.THUMBNAIL_ASPECT
                  , c = d + this.SPOT_TEXT_LEFT_MARGIN
                  , u = .5 * r + this.SPOT_TEXT_BOTTOM_MARGIN
                  , g = this.spotTextFontSize * s;
                g > this.SPOT_TEXT_MAX_FONT_SIZE && (g = this.SPOT_TEXT_MAX_FONT_SIZE);
                var p = d + this.PLAN_TEXT_LEFT_MARGIN
                  , A = .5 * r + this.PLAN_TEXT_TOP_MARGIN
                  , m = this.planTextFontSize * s;
                m > this.PLAN_TEXT_MAX_FONT_SIZE && (m = this.PLAN_TEXT_MAX_FONT_SIZE);
                for (var E = .3 * r, I = .5 * (r - E), T = 0; T < this.itemContainer.childElementCount; T++) {
                    var v = this.itemContainer.children[T];
                    v.style.height = r + "px",
                    v.style.top = r * T + "px";
                    var S = v.children[0];
                    S.style.width = d + "px";
                    var f = v.children[1];
                    f.style.left = c + "px",
                    f.style.fontSize = g + "px",
                    f.style.lineHeight = g + "px",
                    f.style.bottom = u + "px";
                    var y = v.children[2];
                    y.style.left = p + "px",
                    y.style.fontSize = m + "px",
                    y.style.lineHeight = m + "px",
                    y.style.top = A + "px";
                    var w = v.children[3];
                    w.style.right = this.INDICATOR_RIGHT_MARGIN + "px",
                    w.style.top = I + "px",
                    w.style.width = E + "px",
                    w.style.height = E + "px"
                }
            }
        }
        ,
        e.prototype.open = function() {
            Zenkei.Utility.fadein(this.view, 350),
            this.itemContainer && 0 == this.itemContainer.childElementCount && this.addItems(),
            this.updateLayout(),
            this.updateItemSelected()
        }
        ,
        e.prototype.close = function() {
            Zenkei.Utility.fadeout(this.view, 350)
        }
        ,
        e.prototype.item_Click = function(t, e) {
            if (this.controller.hasAccessLogId) {
                var i = {
                    x: event.clientX,
                    y: event.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTVIEW, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
            }
            this.close(),
            this.controller.SelectPlanAndSpot(t, e)
        }
        ,
        e.prototype.closeButton_Click = function(t) {
            if (this.controller.hasAccessLogId) {
                var e = {
                    x: t.clientX,
                    y: t.clientY
                };
                this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOTLISTVIEW_CLOSE_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, e)
            }
            this.controller.FireSpotListViewCloseButtonClickedEvent()
        }
        ,
        e.prototype.model_HmdModeStart = function() {
            this.close()
        }
        ,
        e
    }();
    t.Zenkei != e && (t.Zenkei.SpotListView = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        controller: null,
        layoutInfo: null,
        isEnabled: !0,
        ELEMENT_ID_SPOT_TEXT_BUTTON: "spotTextButton",
        ELEMENT_ID_PANORAMA_DISPLAY: "panoramaDisplay",
        HTML_CODE_EMPTY_DIV: "<div></div>",
        BUTTON_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZmJkZjY0OC1iM2ZjLTZmNGMtOGU2NC00Mzc3ODk2OGE4YmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ1MzNEQkFFRkQwMTFFNDhCMjE5NTk4MUJFNUU3ODYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQ1MzNEQjlFRkQwMTFFNDhCMjE5NTk4MUJFNUU3ODYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmZiZGY2NDgtYjNmYy02ZjRjLThlNjQtNDM3Nzg5NjhhOGJiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJmYmRmNjQ4LWIzZmMtNmY0Yy04ZTY0LTQzNzc4OTY4YThiYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkArR+cAAALCSURBVHja7JzBixJRHMcdm9CJNHBVlCJTWAXt4KEM/wERqTY87EUDQUaP4sWbf4BHD57E0972lNTJYzcLzKRVsIMRpFEkpOHuIo29X+kwu5vspq0z+n5f+MH43u8x732c3+/9nuAwk8lEhTor9tRnH7EdYk5iWkoYHBFrE3tG7PWskZE8MU+J7VL+oOwT24ML9bThPkL5rd1p1IhgniATUTtSMNvIQ9S2FAyHPERxUjCoU0IwCAbBIJhVHgnmKh6PP9yEBZdKpRf4xGAoIRgEg2AQDIKhq445Tzqd7tBqtX6XczG9Xu/GcDjkFAXGbrd/S6VSdTnB5PN5b6PRuIWhhDlmjXNMp9PZyuVy9+TOMYoDA0nvfyU+DCUEQ3GOcbvdn3iefyfnYorF4t1ms3lTUWBYlp3o9fqxrN8ymQOG0rqEEtmRNLVabUvOxcAclFjHmAqFggl3JdyuMccsJbPZPPB4PJ8XHT8aja5Wq1X7xoGxWCyDaDTaXnR8t9u9piQwGEoIRqZQarVa1nQ6vXAdIwgCs5FgxuPxFWL4swPmGASDQjAIBsEgGMXVMZlM5uWyN6tUKnfq9frtRcZ6vd6PgUDgg+LAuFyuwbI3s9lsB9ls1tDv96//yziDwfCD5/kDrVb7cyNDCRZGFlhTq9XChSdIfGHMKqHIkmOcTucgGAy2LuoPvjCGiuQbDoc7Dofj63l+4AO+1OxKDMOokslkneO443k+0Ac+4EvVdm00Go8jkcjbef3QBz5U1jF+v/+Lz+c7EyrQBn1UF3ixWKxlMpnE5ArX0EZ95avRaIREIvGGZVkBDK6hbW0q38sU2X2GoVCoObtWwpxmf0h/jqejE3qEh0g8XSMYBLMKMIeIQtSRFMx75CGqLQVTRh6iylIwr1R/XipDu/anLE68cQj0gNhjFZ2vYirPoPwNDGqqXwIMAGXaylDCM4GeAAAAAElFTkSuQmCC",
        BUTTON_IMAGE_DATA_DISABLED: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZmJkZjY0OC1iM2ZjLTZmNGMtOGU2NC00Mzc3ODk2OGE4YmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzJGRDI0Q0VGNjEwMTFFNDkzNzdDMTBFNUUxNzc5MkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzJGRDI0Q0RGNjEwMTFFNDkzNzdDMTBFNUUxNzc5MkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YWQyZWUzNjgtOWFkNC0wYzRhLWI0NzUtM2I3Mzc2ZTUzOGVmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJmYmRmNjQ4LWIzZmMtNmY0Yy04ZTY0LTQzNzc4OTY4YThiYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgrCwpUAAAKfSURBVHja7JzNjtJQFMcpHykFAgkNoVRidDGGhQsXo76Eo67c+SpufBR3rpzoU4yJjokjBEkwBIjRSGIppQ3Qeo6RpmHGAWHkFvr/Jycp7Snc+8s9H7cJlTzPi0HnJS2AuUf2iOwWWToiDGyyJtkrsrcXgXlK9iTiC+Ul2YsgmLtkzxBAv/Wc7CT+58Nj8PDFqSQ2B3MAHr4OgmAU8PClBMFACwIYgAEYgPmfSq7q2Gg0HuzDhGu12husGIQSwAAMwAAMwESrj1mmRCIxlmX5p8jJOI5TmM1mSqjAKIryo1qtnooE0+1275imWUUoIcfscI4Zj8dqp9M5FJ1jQgeGk55lWQpCCTkGOWYjZbPZnq7rH0VOpt/v3x6NRtdCBUaSJI+avIlIMDwGhNKuhNJ0OpWHw6EqcjI8htCBsW271Ov1SqhKKNfIMRsplUoZVLK/rnu/67opwzBu7h0YWZYNTdOaG+xzMmECg1ACGEGhRK14pdVqrd3HeJ4n7SUYmliCGiw8dkCOARgIYAAGYABmW5r/yeL1MkfLsvKb/thgMLhhmub1de7N5XKdYrH4ZdMxZDIZYwW3o+QVf+GlSqfTZ+12uziZTHL/uHM3dV0/i8fjs70MJZ5YpVJ5J0mSu/KSJl++Z5tQhOQYXnkUEvVV/dn3KlbrTiTfUqnUVhTl+zI/9mHfSFUlyhmnFB7OJWHnsE/kyjUlVKdcLn/423W+xj6R7GMKhcK3fD5/LlT4HF+LdIOnaVqdH6QHVhI/O66LHpdwMJRLXMol77kss/ExnxM9rmQsBKLqM1RV9dP8eKe2BBHTETaR2F0DDMBsA8wYKHzZQTCfwcNXMwjmGDx8HQf7GBZerHPBi3Xmuk/2MBbNVzHxSjlZ7HyhBf0SYACxoMyM9ndJfwAAAABJRU5ErkJggg==",
        Initialize: function() {
            return this.layoutInfo = t.Zenkei.layoutInfo.spottextbutton,
            null == this.layoutInfo ? null : (this.model = t.mainPlayerModel,
            this.controller = t.mainPlayerController,
            this.model.playerSizeChangedEventHandler.Register(this.model_PlayerSizeChanged.bind(this)),
            this.model.spotImageLoadCompletedEventHandler.Register(this.model_SpotImageLoadCompleted.bind(this)),
            this.model.walkThroughEndedEventHandler.Register(this.model_WalkThroughEnded.bind(this)),
            this.model.hmdModeStartEventHandler.Register(this.model_HmdModeStart.bind(this)),
            this.model.hmdModeStopEventHandler.Register(this.model_HmdModeStop.bind(this)),
            this.CreateElements(),
            this.UpdateLayout(),
            this.UpdateBackgroundImage(),
            this.UpdateVisibility(),
            void 0)
        },
        CreateElements: function() {
            if (null != this.layoutInfo) {
                var t = $(this.HTML_CODE_EMPTY_DIV).attr("id", this.ELEMENT_ID_SPOT_TEXT_BUTTON).css({
                    "background-size": "35px 35px",
                    "background-repeat": "no-repeat",
                    "background-position": "center center",
                    position: "absolute",
                    "z-index": "5000",
                    display: "none",
                    "tap-highlight-color": "rgba(0,0,0,0)"
                }).appendTo(document.getElementById(this.ELEMENT_ID_PANORAMA_DISPLAY));
                t.on("click", this.spotTextButton_Click.bind(this))
            }
        },
        UpdateLayout: function() {
            if (null != this.layoutInfo) {
                var t = "35px"
                  , e = "35px"
                  , i = !1
                  , n = !1
                  , o = {};
                null != this.layoutInfo.width && (t = this.layoutInfo.width),
                null != this.layoutInfo.height && (e = this.layoutInfo.height),
                null != this.layoutInfo.top ? (o.top = this.layoutInfo.top,
                o.bottom = "",
                n = !0) : null != this.layoutInfo.bottom && (o.bottom = this.layoutInfo.bottom,
                o.top = "",
                n = !0),
                null != this.layoutInfo.left ? (o.left = this.layoutInfo.left,
                o.right = "",
                i = !0) : null != this.layoutInfo.right && (o.right = this.layoutInfo.right,
                o.left = "",
                i = !0),
                i || (o.left = "10px"),
                n || (o.top = "10px"),
                o.width = t,
                o.height = e,
                $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT_BUTTON)).css(o)
            }
        },
        UpdateBackgroundImage: function() {
            null != this.model.spotJson && this.model.spotJson.ac ? (this.isEnabled = !0,
            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT_BUTTON)).css("background-image", "url(" + this.BUTTON_IMAGE_DATA + ")")) : (this.isEnabled = !1,
            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT_BUTTON)).css("background-image", "url(" + this.BUTTON_IMAGE_DATA_DISABLED + ")"))
        },
        UpdateVisibility: function() {
            var t = "none";
            this.model.isHmdModeEnabled || null == !this.layoutInfo || "none" == this.layoutInfo.display || (t = "block"),
            $(document.getElementById(this.ELEMENT_ID_SPOT_TEXT_BUTTON)).css("display", t)
        },
        model_PlayerSizeChanged: function() {
            this.layoutInfo = t.Zenkei.layoutInfo.spottextbutton,
            this.UpdateLayout(),
            this.UpdateBackgroundImage(),
            this.UpdateVisibility()
        },
        model_SpotImageLoadCompleted: function(t) {
            t.isMainView && t.isFrontView && this.UpdateBackgroundImage()
        },
        model_WalkThroughEnded: function() {
            this.UpdateBackgroundImage()
        },
        model_HmdModeStart: function() {
            this.UpdateVisibility()
        },
        model_HmdModeStop: function() {
            this.UpdateVisibility()
        },
        spotTextButton_Click: function(t) {
            if (this.isEnabled) {
                if (this.controller.hasAccessLogId) {
                    var e = t.originalEvent
                      , i = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    this.controller.LogOperation(this.controller.constValues.BROWSE_LOG_TARGET_ID_SPOTTEXT_BUTTON, this.controller.constValues.BROWSE_LOG_ACTION_ID_CLICK, i)
                }
                this.controller.SwitchShouldShowSpotText()
            }
        }
    },
    t.Zenkei != e && (t.Zenkei.SpotTextButton = i)
}(window),
function(t, e) {
    function i() {}
    i.prototype = {
        get BROWSE_LOG_TARGET_ID_ANNOTATION() {
            return 0
        },
        get BROWSE_LOG_TARGET_ID_ANNOTATION_BUTTON() {
            return 1
        },
        get BROWSE_LOG_TARGET_ID_AUTOPAN() {
            return 2
        },
        get BROWSE_LOG_TARGET_ID_BACK_BUTTON() {
            return 3
        },
        get BROWSE_LOG_TARGET_ID_CLOSE_WINDOW_BUTTON() {
            return 4
        },
        get BROWSE_LOG_TARGET_ID_CONTROL_BAR() {
            return 5
        },
        get BROWSE_LOG_TARGET_ID_CONTROL_BAR_THUMBNAIL_BUTTON() {
            return 6
        },
        get BROWSE_LOG_TARGET_ID_CONTROL_BAR_PLAN_BUTTON() {
            return 7
        },
        get BROWSE_LOG_TARGET_ID_CONTROL_BAR_HELP_BUTTON() {
            return 8
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN() {
            return 9
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_HELPVIEW() {
            return 10
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_BACK_BUTTON() {
            return 11
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_PLAN_BUTTON() {
            return 12
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_SPOTLIST() {
            return 13
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_SPOTLIST_BUTTON() {
            return 14
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_CLOSE_PLAN_BUTTON() {
            return 15
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_CLOSE_SPOTLIST_BUTTON() {
            return 16
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_TOP_PLAN_BUTTON() {
            return 17
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_PREV_PLAN_BUTTON() {
            return 18
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_NEXT_PLAN_BUTTON() {
            return 19
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_PHONE_BUTTON() {
            return 20
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_DOCUMENT_BUTTON() {
            return 21
        },
        get BROWSE_LOG_TARGET_ID_CUSTOMDESIGN_SHARE_BUTTON() {
            return 22
        },
        get BROWSE_LOG_TARGET_ID_BROWSER_GYRO_EVENT() {
            return 23
        },
        get BROWSE_LOG_TARGET_ID_GYRO_BUTTON() {
            return 24
        },
        get BROWSE_LOG_TARGET_ID_HELPVIEW() {
            return 25
        },
        get BROWSE_LOG_TARGET_ID_HELPVIEW_CLOSE_BUTTON() {
            return 26
        },
        get BROWSE_LOG_TARGET_ID_HMD_BUTTON() {
            return 27
        },
        get BROWSE_LOG_TARGET_ID_NEXT_SPOT_BUTTON() {
            return 28
        },
        get BROWSE_LOG_TARGET_ID_PANORAMA() {
            return 29
        },
        get BROWSE_LOG_TARGET_ID_PLAN() {
            return 30
        },
        get BROWSE_LOG_TARGET_ID_PLAN_AND_SPOT() {
            return 31
        },
        get BROWSE_LOG_TARGET_ID_PLAN_COMBOBOX() {
            return 32
        },
        get BROWSE_LOG_TARGET_ID_PLANVIEW() {
            return 33
        },
        get BROWSE_LOG_TARGET_ID_PLANVIEW_CLOSE_BUTTON() {
            return 34
        },
        get BROWSE_LOG_TARGET_ID_PLANVIEW_PREV_BUTTON() {
            return 35
        },
        get BROWSE_LOG_TARGET_ID_PLANVIEW_NEXT_BUTTON() {
            return 36
        },
        get BROWSE_LOG_TARGET_ID_PLANVIEW_CIRCLE_BUTTON() {
            return 37
        },
        get BROWSE_LOG_TARGET_ID_PLANVIEW_SPOTICON() {
            return 38
        },
        get BROWSE_LOG_TARGET_ID_PLANVIEW_SPOTMARKER() {
            return 39
        },
        get BROWSE_LOG_TARGET_ID_PLAYER() {
            return 40
        },
        get BROWSE_LOG_TARGET_ID_PLAY_BUTTON() {
            return 41
        },
        get BROWSE_LOG_TARGET_ID_PREV_SPOT_BUTTON() {
            return 42
        },
        get BROWSE_LOG_TARGET_ID_POPUPTEXT() {
            return 43
        },
        get BROWSE_LOG_TARGET_ID_POPUPTEXT_CLOSE_BUTTON() {
            return 44
        },
        get BROWSE_LOG_TARGET_ID_SLIDESHOW() {
            return 45
        },
        get BROWSE_LOG_TARGET_ID_SPOT() {
            return 46
        },
        get BROWSE_LOG_TARGET_ID_SPOT_COMBOBOX() {
            return 47
        },
        get BROWSE_LOG_TARGET_ID_SPOTLIST() {
            return 48
        },
        get BROWSE_LOG_TARGET_ID_SPOTLISTEX() {
            return 49
        },
        get BROWSE_LOG_TARGET_ID_SPOTLISTEX_PREV_BUTTON() {
            return 50
        },
        get BROWSE_LOG_TARGET_ID_SPOTLISTEX_NEXT_BUTTON() {
            return 51
        },
        get BROWSE_LOG_TARGET_ID_SPOTLISTVIEW() {
            return 52
        },
        get BROWSE_LOG_TARGET_ID_SPOTLISTVIEW_CLOSE_BUTTON() {
            return 53
        },
        get BROWSE_LOG_TARGET_ID_SPOTTEXT_BUTTON() {
            return 54
        },
        get BROWSE_LOG_TARGET_ID_WALKTHROUGH() {
            return 55
        },
        get BROWSE_LOG_ACTION_ID_CENTER_CHANGE() {
            return 0
        },
        get BROWSE_LOG_ACTION_ID_CHANGE() {
            return 1
        },
        get BROWSE_LOG_ACTION_ID_CLICK() {
            return 2
        },
        get BROWSE_LOG_ACTION_ID_END() {
            return 3
        },
        get BROWSE_LOG_ACTION_ID_FOV_CHANGE() {
            return 4
        },
        get BROWSE_LOG_ACTION_ID_ITEM_CLICK() {
            return 5
        },
        get BROWSE_LOG_ACTION_ID_LOAD_COMPLETE() {
            return 6
        },
        get BROWSE_LOG_ACTION_ID_MAP_CENTER_CHANGE() {
            return 7
        },
        get BROWSE_LOG_ACTION_ID_MAP_ZOOM_CHANGE() {
            return 8
        },
        get BROWSE_LOG_ACTION_ID_MOUSE_DOWN() {
            return 9
        },
        get BROWSE_LOG_ACTION_ID_MOUSE_MOVE() {
            return 10
        },
        get BROWSE_LOG_ACTION_ID_MOUSE_UP() {
            return 11
        },
        get BROWSE_LOG_ACTION_ID_MOUSE_WHEEL() {
            return 12
        },
        get BROWSE_LOG_ACTION_ID_SCALE_CHANGE() {
            return 13
        },
        get BROWSE_LOG_ACTION_ID_SCROLL() {
            return 14
        },
        get BROWSE_LOG_ACTION_ID_SELECT() {
            return 15
        },
        get BROWSE_LOG_ACTION_ID_SILENT_SELECT() {
            return 16
        },
        get BROWSE_LOG_ACTION_ID_SIZE_CHANGE() {
            return 17
        },
        get BROWSE_LOG_ACTION_ID_START() {
            return 18
        },
        get BROWSE_LOG_ACTION_ID_TOUCH_START() {
            return 19
        },
        get BROWSE_LOG_ACTION_ID_TOUCH_MOVE() {
            return 20
        },
        get BROWSE_LOG_ACTION_ID_TOUCH_END() {
            return 21
        },
        get POINTER_UP_EVENT() {
            return "pointerup"
        },
        get POINTER_DOWN_EVENT() {
            return "pointerdown"
        },
        get MSGESTURE_TAP_EVENT() {
            return "MSGestureTap"
        },
        get MSGESTURE_HOLD_EVENT() {
            return "MSGestureHold"
        },
        get MSGESTURE_START_EVENT() {
            return "MSGestureStart"
        },
        get MSGESTURE_CHANGE_EVENT() {
            return "MSGestureChange"
        },
        get MSGESTURE_END_EVENT() {
            return "MSGestureEnd"
        }
    },
    t.Zenkei != e && (t.Zenkei.ConstValues = i)
}(window),
function(t, e) {
    function i() {
        this.Initialize()
    }
    i.prototype = {
        model: null,
        ELEMENT_ID_TOUCH_PRETENDER: "touchPretender",
        ELEMENT_ID_CLICK_PRETENDER: "clickPretender",
        ELEMENT_ID_PLAYER: "player",
        TOUCH_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABiUlEQVRYw+2XMUvDQBTHfydFxMmhk0Ncs/kJ+g0qiNKpTo6dbhSkBOki2CGrg7uISIcM7v0CbkpxkBt0kY4ipTQuz6U0l2uTnA79r0l4v7x3773/wVp/LLXMy0Gc7gBNoAGEQF0ejYERMAQSo9VnqQBBnAZAFzgBtnJenwC3QM9o9VoIIIhTgA5wBWwvmd1vIAL6RqvZ0gBBnNaAa+C0YJnvgbbRauIMIH9+U0LwXz0ArUWZ2Mj4oFNicIAj4MwpA3LgnleoOQ6Hc99o9ZKXgW4FwQE2gZ41A9LnHw6ttqqmwJ7R6j0rA80KgwPU5DxklqDhYfo2bAChB4DQBlD3AFB3mQPeNA8w9hBzbAMYeQAY2QCGHgCGNoBERmZVmgGDTABxMncVAiRGq7e8LrgQM1HFGI5y17HYqKgCgL7R6snVD/TFyZSlR9myOAGIc2mLkykj+LHRauoMIBAToAWcr9gZU+ASODBafRW15aGYiUNZqXmtlgDRopoXvZjsyj63XUwG86221r/WD3cwaVOoYSxkAAAAAElFTkSuQmCC",
        CLICK_IMAGE_DATA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAYVJREFUWEftlj1KQ1EQhR8hpLCySJUiWARM6YIsrCVFKotsIGsQsRCrEFKkSi2uIASXkCWIiEj8DowQuPN+M6JCDnzVnTnn5d53Jy876l9p1z8/hUu4hSd4MZ7hHq6ga+VxwrQPd/AGuxLe4QEG1t5cmIhreAUvrAg97A20zK6eaGyDttUzr8McOmZbTTSIiPBvFlB9JyjWtntGhzAx+2JRqBeuyZmXoZdzaDH5okhvu2cQwdxifFGge17lqjXlA3oWl4pFDRmvMZKRxaViURPOa4pkZnGpWNR49ZoiWVtcKhY1172mSLYWl4rFX38A/at5TZFsLC4Vi5HjN4+FxaViUf/nXlMkY4tLxWIXNDK9xgg+4czifFHwuNcQzdJi8kXRAH5iHGsMX1hMsSjUl4xncghTsy8XxS3Ql4xn1IQVtM2+mmjogL5kPMM6KPzEbOuJRu3EBJrcDJ35FOr9ck+YDEFHIlMvbB9dtSVUe+HqCNMejGAGa9gaG9BxjaH4nh/1t5RlX7BC1r+hkzklAAAAAElFTkSuQmCC",
        Initialize: function() {
            this.model = t.mainPlayerModel,
            this.model.pretendTouchEventHandler.Register(this.model_PretendTouch.bind(this)),
            this.model.pretendClickEventHandler.Register(this.model_PretendClick.bind(this)),
            this.CreateElements()
        },
        Hide: function() {
            $(document.getElementById(this.ELEMENT_ID_TOUCH_PRETENDER + "0")).css("display", "none"),
            $(document.getElementById(this.ELEMENT_ID_TOUCH_PRETENDER + "1")).css("display", "none"),
            $(document.getElementById(this.ELEMENT_ID_CLICK_PRETENDER)).css("display", "none")
        },
        CreateElements: function() {
            $("<div></div>").attr("id", this.ELEMENT_ID_TOUCH_PRETENDER + "0").css({
                width: "32px",
                height: "32px",
                left: "0px",
                "background-image": "url(" + this.TOUCH_IMAGE_DATA + ")",
                "background-size": "32px 32px",
                "background-repeat": "no-repeat",
                "background-position": "center center",
                position: "absolute",
                "z-index": "20000",
                display: "none",
                "tap-highlight-color": "rgba(0,0,0,0)"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PLAYER)),
            $("<div></div>").attr("id", this.ELEMENT_ID_TOUCH_PRETENDER + "1").css({
                width: "32px",
                height: "32px",
                left: "0px",
                "background-image": "url(" + this.TOUCH_IMAGE_DATA + ")",
                "background-size": "32px 32px",
                "background-repeat": "no-repeat",
                "background-position": "center center",
                position: "absolute",
                "z-index": "20000",
                display: "none",
                "tap-highlight-color": "rgba(0,0,0,0)"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PLAYER)),
            $("<div></div>").attr("id", this.ELEMENT_ID_CLICK_PRETENDER).css({
                width: "32px",
                height: "32px",
                left: "0px",
                "background-image": "url(" + this.CLICK_IMAGE_DATA + ")",
                "background-size": "32px 32px",
                "background-repeat": "no-repeat",
                "background-position": "center center",
                position: "absolute",
                "z-index": "20000",
                display: "none",
                "tap-highlight-color": "rgba(0,0,0,0)"
            }).appendTo(document.getElementById(this.ELEMENT_ID_PLAYER))
        },
        model_PretendTouch: function(t) {
            for (var e = 0; 2 > e; e++)
                null != t && e < t.length ? $(document.getElementById(this.ELEMENT_ID_TOUCH_PRETENDER + e)).css({
                    left: t[e].x - 16 + "px",
                    top: t[e].y - 16 + "px",
                    display: "block"
                }) : $(document.getElementById(this.ELEMENT_ID_TOUCH_PRETENDER + e)).css("display", "none")
        },
        model_PretendClick: function(t) {
            this.Hide(),
            $(document.getElementById(this.ELEMENT_ID_CLICK_PRETENDER)).css({
                left: t.x - 16 + "px",
                top: t.y - 16 + "px",
                display: "block"
            }),
            setTimeout(this.Hide.bind(this), 300)
        },
        clickPretender_AnimateFinished: function() {
            $(document.getElementById(this.ELEMENT_ID_CLICK_PRETENDER)).hide()
        }
    },
    t.Zenkei != e && (t.Zenkei.TouchPretender = i)
}(window);
