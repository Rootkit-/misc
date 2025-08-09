import {r as n} from "./index.RH_Wq4ov.js";
/* empty css                        */
var k = {
    exports: {}
}
  , A = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D;
function H() {
    if (D)
        return A;
    D = 1;
    var d = Symbol.for("react.transitional.element")
      , l = Symbol.for("react.fragment");
    function r(E, o, u) {
        var s = null;
        if (u !== void 0 && (s = "" + u),
        o.key !== void 0 && (s = "" + o.key),
        "key"in o) {
            u = {};
            for (var i in o)
                i !== "key" && (u[i] = o[i])
        } else
            u = o;
        return o = u.ref,
        {
            $$typeof: d,
            type: E,
            key: s,
            ref: o !== void 0 ? o : null,
            props: u
        }
    }
    return A.Fragment = l,
    A.jsx = r,
    A.jsxs = r,
    A
}
var Y;
function $() {
    return Y || (Y = 1,
    k.exports = H()),
    k.exports
}
var t = $();
const I = {
    TIMER: "timer",
    VERIFY: "verify",
    COMPLETED: "completed"
};
function G({timerSeconds: d, activationDelay: l, onTimerComplete: r, autoStart: E=!0}) {
    const [o,u] = n.useState({
        phase: I.TIMER,
        activationSecondsLeft: l,
        isButtonEnabled: !1,
        timerSecondsLeft: d,
        mounted: !1
    })
      , s = n.useRef(null)
      , i = n.useRef(!1)
      , c = n.useCallback( () => {
        s.current && (clearInterval(s.current),
        s.current = null)
    }
    , [])
      , e = n.useCallback( () => {
        s.current || i.current || (s.current = setInterval( () => {
            u(m => {
                const p = m.timerSecondsLeft - 1;
                return p <= 0 ? {
                    ...m,
                    timerSecondsLeft: 0,
                    phase: I.VERIFY,
                    isButtonEnabled: !0
                } : {
                    ...m,
                    timerSecondsLeft: p
                }
            }
            )
        }
        , 1e3))
    }
    , [])
      , _ = n.useCallback( () => {
        i.current || (i.current = !0,
        c(),
        u(m => ({
            ...m,
            phase: I.COMPLETED
        })),
        r?.())
    }
    , [c, r])
      , x = n.useCallback( () => {
        u(m => ({
            ...m,
            isButtonEnabled: !0
        }))
    }
    , [])
      , C = n.useCallback( () => {
        c(),
        i.current = !1,
        u({
            phase: I.TIMER,
            activationSecondsLeft: l,
            isButtonEnabled: !1,
            timerSecondsLeft: d,
            mounted: !1
        })
    }
    , [c, l, d]);
    return n.useEffect( () => (u(m => ({
        ...m,
        mounted: !0
    })),
    E && e(),
    () => {
        c()
    }
    ), [e, c, E]),
    n.useEffect( () => {
        o.phase === I.VERIFY && !o.isButtonEnabled && x()
    }
    , [o.phase, o.isButtonEnabled, x]),
    {
        state: o,
        actions: {
            startTimer: e,
            completeTimer: _,
            enableButton: x,
            resetTimer: C
        }
    }
}
function U(d, l=0) {
    const r = document.querySelector('meta[name="referrer"]');
    if (r)
        r.setAttribute("content", "no-referrer");
    else {
        const E = document.createElement("meta");
        E.name = "referrer",
        E.content = "no-referrer",
        document.head.appendChild(E)
    }
    l > 0 ? setTimeout( () => {
        window.location.href = d
    }
    , l) : window.location.href = d
}
function X({session: d, onSuccess: l, onError: r}) {
    const [E,o] = n.useState(!1)
      , [u,s] = n.useState(null)
      , i = n.useCallback(async () => {
        if (!(!d?.id || E)) {
            o(!0),
            s(null);
            try {
                const c = await fetch(`/api/session/${d.id}/step/increment`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!c.ok)
                    throw new Error(`HTTP error! status: ${c.status}`);
                const e = await c.json();
                if (!e.success)
                    throw new Error(e.error || "Failed to update session");
                if (console.log(`Session step incremented for session ${d.id}`, e),
                e.redirect) {
                    console.log(`Session completed, redirecting to: ${e.redirect}`),
                    U(e.redirect);
                    return
                }
                l?.(e)
            } catch (c) {
                const e = c instanceof Error ? c.message : "Failed to increment session step";
                console.error("Session update error:", e),
                s(e),
                r?.(c instanceof Error ? c : new Error(e))
            } finally {
                o(!1)
            }
        }
    }
    , [d?.id, E, l, r]);
    return {
        isLoading: E,
        error: u,
        updateSession: i
    }
}
const F = {
    TIMER_SECONDS: 5,
    ACTIVATION_DELAY: 0,
    POSITION: 0
}
  , N = {
    TIMER_PHASE: {
        WAIT_MESSAGE: "Please wait",
        SECONDS_SUFFIX: "seconds before continuing",
        HELP_TEXT: "This helps ensure you're actually reading the content"
    },
    VERIFY_PHASE: {
        TITLE: "Continue reading",
        DESCRIPTION: "Click to verify you're reading this article",
        BUTTON_TEXT: "Verify reading"
    },
    COMPLETED_PHASE: {
        TITLE: "Go to the next article",
        DESCRIPTION: "Please continue to the next article by using the recent posts sidebar or clicking next article at the end of this article (scroll down). You can also just navigate through the site to go to the next article."
    }
}
  , q = {
    INLINE_TIMER_COMPLETED: "inlineTimerCompleted"
}
  , a = {
    CONTAINER: "inline-verify-timer-container",
    TIMER_PHASE: "timer-phase",
    TIMER_CONTENT: "timer-content",
    TIMER_HEADER: "timer-header",
    TIMER_ICON: "timer-icon",
    TIMER_MESSAGE: "timer-message",
    TIMER_SECONDS: "timer-seconds",
    TIMER_PROGRESS: "timer-progress",
    TIMER_PROGRESS_BAR: "timer-progress-bar",
    TIMER_FOOTER: "timer-footer",
    VERIFY_PHASE: "verify-phase",
    VERIFY_CONTENT: "verify-content",
    VERIFY_ICON: "verify-icon",
    VERIFY_TEXT: "verify-text",
    VERIFY_BUTTON: "inline-verify-button",
    VERIFY_IMAGE: "verify-image",
    COMPLETED_PHASE: "completed-phase",
    COMPLETED_CONTENT: "completed-content",
    COMPLETED_ICON: "completed-icon",
    COMPLETED_TEXT: "completed-text"
}
  , W = ({currentPostId: d, position: l=F.POSITION, session: r, uniqueId: E=`inline-${l}`, activationDelay: o=0, timerSeconds: u=5, clickOfferEnabled: s=!1, onTimerComplete: i}) => {
    const c = r?.stepTime || 5;
    console.log("Session settings:", {
        sessionId: r?.id,
        totalSteps: r?.totalSteps,
        settingsSteps: r?.settings?.steps,
        currentStep: r?.currentStep,
        stepTime: r?.stepTime,
        effectiveTimerSeconds: c
    });
    const {state: e, actions: _} = G({
        timerSeconds: c,
        activationDelay: 0,
        onTimerComplete: i,
        autoStart: !1
    })
      , {updateSession: x, isLoading: C, error: m} = X({
        session: r,
        onSuccess: v => {
            console.log("Session updated successfully:", v)
        }
        ,
        onError: v => {
            console.error("Session update failed:", v)
        }
    })
      , [p,L] = n.useState(15)
      , [M,h] = n.useState(!1)
      , [O,y] = n.useState(!0)
      , f = n.useRef(null)
      , T = n.useRef("")
      , S = n.useRef(!1)
      , [g,R] = n.useState(!0)
      , V = n.useCallback( () => {
        if (console.log("startClickOfferTimer called"),
        !s || e.phase !== I.VERIFY) {
            console.log("startClickOfferTimer early return:", {
                clickOfferEnabled: s,
                phase: e.phase
            });
            return
        }
        console.log("Starting click offer timer - setting button disabled"),
        S.current || (S.current = !0,
        T.current = document.title,
        h(!0)),
        y(!1),
        f.current = setInterval( () => {
            L(v => {
                const b = v - 1;
                return document.title = `(${b}s) ${T.current}`,
                b <= 0 ? (j(),
                0) : b
            }
            )
        }
        , 1e3)
    }
    , [s, e.phase])
      , w = n.useCallback( () => {
        console.log("pauseClickOfferTimer called"),
        f.current && (clearInterval(f.current),
        f.current = null),
        y(!0),
        T.current && (document.title = T.current)
    }
    , [])
      , j = n.useCallback( () => {
        f.current && (clearInterval(f.current),
        f.current = null),
        T.current && (document.title = T.current),
        h(!1),
        L(Math.random() < .5 ? 12 : 18),
        y(!0),
        S.current = !1
    }
    , [r?.stepTime])
      , P = n.useCallback( () => {
        console.log("handleVisibilityChange called, document.hidden:", document.hidden),
        console.log("cOfferEnabled:", s, "state.phase:", e.phase),
        R(!document.hidden),
        !(!s || e.phase !== I.VERIFY) && (document.hidden ? (console.log("Starting/resuming click offer timer"),
        V()) : (console.log("Pausing click offer timer"),
        w()))
    }
    , [s, e.phase, V, w])
      , B = n.useCallback(async () => {
        if (e.phase !== I.VERIFY || !e.isButtonEnabled || C || M)
            return;
        _.completeTimer(),
        r?.id && await x();
        const v = new CustomEvent(q.INLINE_TIMER_COMPLETED,{
            detail: {
                position: E,
                currentPostId: d
            }
        });
        document.dispatchEvent(v),
        console.log(`Verify button clicked for position ${E}`)
    }
    , [e.phase, e.isButtonEnabled, C, _, r?.id, x, E, d]);
    return m && console.error("Session error:", m),
    console.log("cOfferEnabled:", s),
    console.log("isButtonDisabled:", M),
    console.log("cOfferTimer:", p),
    console.log("isTimerPaused:", O),
    console.log("state.phase:", e.phase),
    console.log("hasUserFocus:", g),
    n.useEffect( () => {
        const v = () => {
            console.log("InlineVerifyTimer received verified event, starting timer"),
            _.startTimer()
        }
        ;
        return document.addEventListener("verified", v),
        () => document.removeEventListener("verified", v)
    }
    , [_]),
    n.useEffect( () => {
        if (s)
            return R(!document.hidden),
            e.phase === I.VERIFY && (h(!0),
            L(Math.random() < .5 ? 12 : 18),
            y(!0),
            S.current = !0,
            T.current = document.title),
            document.addEventListener("visibilitychange", P),
            () => {
                document.removeEventListener("visibilitychange", P),
                j()
            }
    }
    , [s, e.phase, P, j, r?.stepTime]),
    n.useEffect( () => {
        e.phase !== I.VERIFY && j()
    }
    , [e.phase, j]),
    t.jsxs("div", {
        className: a.CONTAINER,
        children: [e.phase === I.TIMER && t.jsx("div", {
            className: a.TIMER_PHASE,
            children: t.jsxs("div", {
                className: a.TIMER_CONTENT,
                children: [t.jsxs("div", {
                    className: a.TIMER_HEADER,
                    children: [t.jsx("div", {
                        className: a.TIMER_ICON,
                        children: t.jsxs("svg", {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: [t.jsx("circle", {
                                cx: "12",
                                cy: "12",
                                r: "10"
                            }), t.jsx("polyline", {
                                points: "12,6 12,12 16,14"
                            })]
                        })
                    }), t.jsxs("div", {
                        className: a.TIMER_MESSAGE,
                        children: [N.TIMER_PHASE.WAIT_MESSAGE, " ", t.jsx("span", {
                            className: a.TIMER_SECONDS,
                            children: e.timerSecondsLeft
                        }), " ", N.TIMER_PHASE.SECONDS_SUFFIX]
                    })]
                }), t.jsx("div", {
                    className: a.TIMER_PROGRESS,
                    children: t.jsx("div", {
                        className: a.TIMER_PROGRESS_BAR,
                        style: {
                            width: `${(c - e.timerSecondsLeft) / c * 100}%`
                        }
                    })
                }), t.jsx("div", {
                    className: a.TIMER_FOOTER,
                    children: N.TIMER_PHASE.HELP_TEXT
                })]
            })
        }), e.phase === I.VERIFY && t.jsx("div", {
            className: a.VERIFY_PHASE,
            children: t.jsxs("div", {
                className: a.VERIFY_CONTENT,
                children: [t.jsx("div", {
                    className: a.VERIFY_ICON,
                    children: t.jsxs("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: [t.jsx("path", {
                            d: "M9 12l2 2 4-4"
                        }), t.jsx("circle", {
                            cx: "12",
                            cy: "12",
                            r: "9"
                        })]
                    })
                }), t.jsxs("div", {
                    className: a.VERIFY_TEXT,
                    children: [t.jsx("h3", {
                        children: N.VERIFY_PHASE.TITLE
                    }), t.jsx("p", {
                        children: N.VERIFY_PHASE.DESCRIPTION
                    }), r?.settings?.steps && t.jsxs("p", {
                        className: "session-progress",
                        children: ["Step ", r.currentStep, " of ", r.settings.steps]
                    })]
                }), t.jsxs("button", {
                    className: a.VERIFY_BUTTON,
                    type: "button",
                    disabled: !e.mounted || !e.isButtonEnabled || C || s && (!g || M),
                    onClick: B,
                    children: [t.jsx("span", {
                        children: C ? "Loading..." : M && p > 0 && !O ? `Come back! (${p}s)` : M && p > 0 && O ? `${p}s` : N.VERIFY_PHASE.BUTTON_TEXT
                    }), !C && t.jsxs("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: [t.jsx("path", {
                            d: "M5 12h14"
                        }), t.jsx("path", {
                            d: "M12 5l7 7-7 7"
                        })]
                    })]
                }), s && t.jsx("div", {
                    children: t.jsx("img", {
                        src: "https://i.ibb.co/xt43kjd8/smiley-4.gif",
                        alt: "smiley-4",
                        className: a.VERIFY_IMAGE
                    })
                })]
            })
        }), e.phase === I.COMPLETED && t.jsx("div", {
            className: a.COMPLETED_PHASE,
            children: t.jsxs("div", {
                className: a.COMPLETED_CONTENT,
                children: [t.jsx("div", {
                    className: a.COMPLETED_ICON,
                    children: t.jsxs("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: [t.jsx("path", {
                            d: "M9 12l2 2 4-4"
                        }), t.jsx("circle", {
                            cx: "12",
                            cy: "12",
                            r: "9"
                        })]
                    })
                }), t.jsxs("div", {
                    className: a.COMPLETED_TEXT,
                    children: [t.jsx("h3", {
                        children: N.COMPLETED_PHASE.TITLE
                    }), t.jsx("p", {
                        children: N.COMPLETED_PHASE.DESCRIPTION
                    })]
                })]
            })
        })]
    })
}
  , Q = ({currentPostId: d, position: l, session: r, timerSeconds: E, activationDelay: o, skipMode: u, isPredictableArticle: s, serverPositioned: i=!1, clickOfferEnabled: c=!1}) => {
    const [e,_] = n.useState(!1)
      , [x,C] = n.useState(i)
      , m = n.useRef(i)
      , p = n.useRef(null)
      , L = () => {
        if (i || !e || m.current || !p.current)
            return;
        const h = document.getElementById("article-content");
        if (!h)
            return;
        const O = h.querySelector(".article-content-slot");
        if (!O) {
            console.warn("No content slot found, cannot position inline timer.");
            return
        }
        const y = O.querySelectorAll("p, h2, h3, h4, h5, h6, li, blockquote, div.content-section")
          , f = Array.from(y).filter(T => T.textContent && T.textContent.trim().length > 30);
        if (console.log(`Found ${f.length} substantial content elements, positioning inline timer at position ${l}`),
        f.length > l) {
            const T = Math.min(l, f.length - 1)
              , S = f[T]
              , g = document.createElement("div");
            g.className = "inline-component-wrapper";
            const R = p.current.cloneNode(!0);
            R.style.display = "block",
            R.style.opacity = "1",
            R.style.visibility = "visible",
            g.appendChild(R),
            S.parentNode && S.parentNode.insertBefore(g, S.nextSibling),
            m.current = !0,
            C(!0),
            console.log(`Inline timer positioned after element ${T + 1} of ${f.length}`)
        } else if (f.length > 3) {
            const T = Math.min(Math.floor(f.length * .3), f.length - 1)
              , S = f[T]
              , g = document.createElement("div");
            g.className = "inline-component-wrapper";
            const R = p.current.cloneNode(!0);
            R.style.display = "block",
            R.style.opacity = "1",
            R.style.visibility = "visible",
            g.appendChild(R),
            S.parentNode && S.parentNode.insertBefore(g, S.nextSibling),
            m.current = !0,
            C(!0),
            console.log(`Inline timer positioned at fallback position ${T + 1}`)
        }
    }
    ;
    n.useEffect( () => {
        if (i)
            return;
        const h = () => {
            e || _(!0)
        }
        ;
        return document.addEventListener("verified", h),
        () => document.removeEventListener("verified", h)
    }
    , [e, i]),
    n.useEffect( () => {
        if (!i)
            return;
        const h = () => {
            e || _(!0)
        }
        ;
        return document.addEventListener("verified", h),
        () => document.removeEventListener("verified", h)
    }
    , [e, i]),
    n.useEffect( () => {
        i || !e || m.current || setTimeout( () => {
            L()
        }
        , 100)
    }
    , [e, i]);
    const M = () => {
        const h = new CustomEvent("skipModeReady",{
            detail: {
                ready: !0,
                allTimersCompleted: !0
            }
        });
        document.dispatchEvent(h)
    }
    ;
    return t.jsx("div", {
        ref: p,
        className: i ? "inline-timer-server-positioned" : "inline-timer-manager",
        style: {
            display: i && e || !i && x ? "block" : "none"
        },
        "data-position": l,
        "data-skip-mode-active": u,
        "data-is-predictable": s,
        "data-session-id": r?.id,
        "data-server-positioned": i,
        children: t.jsx(W, {
            currentPostId: d,
            position: l,
            session: r,
            timerSeconds: E,
            uniqueId: `verify-${l}`,
            activationDelay: o,
            clickOfferEnabled: c,
            onTimerComplete: M
        })
    })
}
;
export {Q as default};
