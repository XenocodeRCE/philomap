function w(){}const X=t=>t;function mt(t,e){for(const n in e)t[n]=e[n];return t}function pt(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function Y(t){return t()}function K(){return Object.create(null)}function E(t){t.forEach(Y)}function D(t){return typeof t=="function"}function It(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function yt(t){return Object.keys(t).length===0}function gt(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Ht(t,e,n){t.$$.on_destroy.push(gt(e,n))}function Gt(t,e,n,i){if(t){const r=Z(t,e,n,i);return t[0](r)}}function Z(t,e,n,i){return t[1]&&i?mt(n.ctx.slice(),t[1](i(e))):n.ctx}function Jt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const s=[],c=Math.max(e.dirty.length,r.length);for(let u=0;u<c;u+=1)s[u]=e.dirty[u]|r[u];return s}return e.dirty|r}return e.dirty}function Kt(t,e,n,i,r,s){if(r){const c=Z(e,n,i,s);t.p(c,r)}}function Qt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Ut(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}const tt=typeof window<"u";let et=tt?()=>window.performance.now():()=>Date.now(),B=tt?t=>requestAnimationFrame(t):w;const v=new Set;function nt(t){v.forEach(e=>{e.c(t)||(v.delete(e),e.f())}),v.size!==0&&B(nt)}function it(t){let e;return v.size===0&&B(nt),{promise:new Promise(n=>{v.add(e={c:t,f:n})}),abort(){v.delete(e)}}}const Vt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let P=!1;function bt(){P=!0}function wt(){P=!1}function xt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function $t(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&l.push(f)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const o=e[l].claim_order,f=(r>0&&e[n[r]].claim_order<=o?r+1:xt(1,r,d=>e[n[d]].claim_order,o))-1;i[l]=n[f]+1;const a=f+1;n[a]=l,r=Math.max(a,r)}const s=[],c=[];let u=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(s.push(e[l-1]);u>=l;u--)c.push(e[u]);u--}for(;u>=0;u--)c.push(e[u]);s.reverse(),c.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<c.length;l++){for(;o<s.length&&c[l].claim_order>=s[o].claim_order;)o++;const f=o<s.length?s[o]:null;t.insertBefore(c[l],f)}}function rt(t,e){t.appendChild(e)}function st(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function vt(t){const e=q("style");return kt(st(t),e),e.sheet}function kt(t,e){return rt(t.head||t,e),e.sheet}function Et(t,e){if(P){for($t(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Xt(t,e,n){P&&!n?Et(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function F(t){t.parentNode&&t.parentNode.removeChild(t)}function q(t){return document.createElement(t)}function Nt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function Yt(){return I(" ")}function Zt(){return I("")}function Q(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function te(t){return function(e){return e.preventDefault(),t.call(this,e)}}function ee(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function At(t){return Array.from(t.childNodes)}function Ct(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ct(t,e,n,i,r=!1){Ct(t);const s=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const u=t[c];if(e(u)){const l=n(u);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),u}}for(let c=t.claim_info.last_index-1;c>=0;c--){const u=t[c];if(e(u)){const l=n(u);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,u}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function ot(t,e,n,i){return ct(t,r=>r.nodeName===e,r=>{const s=[];for(let c=0;c<r.attributes.length;c++){const u=r.attributes[c];n[u.name]||s.push(u.name)}s.forEach(c=>r.removeAttribute(c))},()=>i(e))}function ne(t,e,n){return ot(t,e,n,q)}function ie(t,e,n){return ot(t,e,n,Nt)}function St(t,e){return ct(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>I(e),!0)}function re(t){return St(t," ")}function se(t,e){e=""+e,t.data!==e&&(t.data=e)}function ce(t,e){t.value=e??""}function oe(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let S;function jt(){if(S===void 0){S=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{S=!0}}return S}function le(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=q("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=jt();let s;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",s=Q(window,"message",c=>{c.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{s=Q(i.contentWindow,"resize",e),e()}),rt(t,i),()=>{(r||s&&i.contentWindow)&&s(),F(i)}}function ue(t,e,n){t.classList[n?"add":"remove"](e)}function zt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function ae(t,e){return new t(e)}const z=new Map;let M=0;function Mt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ot(t,e){const n={stylesheet:vt(e),rules:{}};return z.set(t,n),n}function lt(t,e,n,i,r,s,c,u=0){const l=16.666/i;let o=`{
`;for(let m=0;m<=1;m+=l){const p=e+(n-e)*s(m);o+=m*100+`%{${c(p,1-p)}}
`}const f=o+`100% {${c(n,1-n)}}
}`,a=`__svelte_${Mt(f)}_${u}`,d=st(t),{stylesheet:_,rules:h}=z.get(d)||Ot(d,t);h[a]||(h[a]=!0,_.insertRule(`@keyframes ${a} ${f}`,_.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${a} ${i}ms linear ${r}ms 1 both`,M+=1,a}function R(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?s=>s.indexOf(e)<0:s=>s.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),M-=r,M||Dt())}function Dt(){B(()=>{M||(z.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&F(e)}),z.clear())})}let A;function y(t){A=t}function H(){if(!A)throw new Error("Function called outside component initialization");return A}function fe(t){H().$$.on_mount.push(t)}function de(t){H().$$.after_update.push(t)}const $=[],U=[];let k=[];const V=[],ut=Promise.resolve();let W=!1;function at(){W||(W=!0,ut.then(G))}function _e(){return at(),ut}function C(t){k.push(t)}const L=new Set;let x=0;function G(){if(x!==0)return;const t=A;do{try{for(;x<$.length;){const e=$[x];x++,y(e),Pt(e.$$)}}catch(e){throw $.length=0,x=0,e}for(y(null),$.length=0,x=0;U.length;)U.pop()();for(let e=0;e<k.length;e+=1){const n=k[e];L.has(n)||(L.add(n),n())}k.length=0}while($.length);for(;V.length;)V.pop()();W=!1,L.clear(),y(t)}function Pt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}function Tt(t){const e=[],n=[];k.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),k=e}let N;function ft(){return N||(N=Promise.resolve(),N.then(()=>{N=null})),N}function O(t,e,n){t.dispatchEvent(zt(`${e?"intro":"outro"}${n}`))}const j=new Set;let b;function Lt(){b={r:0,c:[],p:b}}function Rt(){b.r||E(b.c),b=b.p}function dt(t,e){t&&t.i&&(j.delete(t),t.i(e))}function Wt(t,e,n,i){if(t&&t.o){if(j.has(t))return;j.add(t),b.c.push(()=>{j.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const _t={duration:0};function he(t,e,n){const i={direction:"in"};let r=e(t,n,i),s=!1,c,u,l=0;function o(){c&&R(t,c)}function f(){const{delay:d=0,duration:_=300,easing:h=X,tick:g=w,css:m}=r||_t;m&&(c=lt(t,0,1,_,d,h,m,l++)),g(0,1);const p=et()+d,ht=p+_;u&&u.abort(),s=!0,C(()=>O(t,!0,"start")),u=it(T=>{if(s){if(T>=ht)return g(1,0),O(t,!0,"end"),o(),s=!1;if(T>=p){const J=h((T-p)/_);g(J,1-J)}}return s})}let a=!1;return{start(){a||(a=!0,R(t),D(r)?(r=r(i),ft().then(f)):f())},invalidate(){a=!1},end(){s&&(o(),s=!1)}}}function me(t,e,n){const i={direction:"out"};let r=e(t,n,i),s=!0,c;const u=b;u.r+=1;function l(){const{delay:o=0,duration:f=300,easing:a=X,tick:d=w,css:_}=r||_t;_&&(c=lt(t,1,0,f,o,a,_));const h=et()+o,g=h+f;C(()=>O(t,!1,"start")),it(m=>{if(s){if(m>=g)return d(0,1),O(t,!1,"end"),--u.r||E(u.c),!1;if(m>=h){const p=a((m-h)/f);d(1-p,p)}}return s})}return D(r)?ft().then(()=>{r=r(i),l()}):l(),{end(o){o&&r.tick&&r.tick(1,0),s&&(c&&R(t,c),s=!1)}}}function pe(t,e){const n=e.token={};function i(r,s,c,u){if(e.token!==n)return;e.resolved=u;let l=e.ctx;c!==void 0&&(l=l.slice(),l[c]=u);const o=r&&(e.current=r)(l);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,d)=>{d!==s&&a&&(Lt(),Wt(a,1,1,()=>{e.blocks[d]===a&&(e.blocks[d]=null)}),Rt())}):e.block.d(1),o.c(),dt(o,1),o.m(e.mount(),e.anchor),f=!0),e.block=o,e.blocks&&(e.blocks[s]=o),f&&G()}if(pt(t)){const r=H();if(t.then(s=>{y(r),i(e.then,1,e.value,s),y(null)},s=>{if(y(r),i(e.catch,2,e.error,s),y(null),!e.hasCatch)throw s}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,t),!0;e.resolved=t}}function ye(t,e,n){const i=e.slice(),{resolved:r}=t;t.current===t.then&&(i[t.value]=r),t.current===t.catch&&(i[t.error]=r),t.block.p(i,n)}function ge(t){t&&t.c()}function be(t,e){t&&t.l(e)}function Bt(t,e,n,i){const{fragment:r,after_update:s}=t.$$;r&&r.m(e,n),i||C(()=>{const c=t.$$.on_mount.map(Y).filter(D);t.$$.on_destroy?t.$$.on_destroy.push(...c):E(c),t.$$.on_mount=[]}),s.forEach(C)}function Ft(t,e){const n=t.$$;n.fragment!==null&&(Tt(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function qt(t,e){t.$$.dirty[0]===-1&&($.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function we(t,e,n,i,r,s,c,u=[-1]){const l=A;y(t);const o=t.$$={fragment:null,ctx:[],props:s,update:w,not_equal:r,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:K(),dirty:u,skip_bound:!1,root:e.target||l.$$.root};c&&c(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(a,d,..._)=>{const h=_.length?_[0]:d;return o.ctx&&r(o.ctx[a],o.ctx[a]=h)&&(!o.skip_bound&&o.bound[a]&&o.bound[a](h),f&&qt(t,a)),d}):[],o.update(),f=!0,E(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){bt();const a=At(e.target);o.fragment&&o.fragment.l(a),a.forEach(F)}else o.fragment&&o.fragment.c();e.intro&&dt(t.$$.fragment),Bt(t,e.target,e.anchor,e.customElement),wt(),G()}y(l)}class xe{$destroy(){Ft(this,1),this.$destroy=w}$on(e,n){if(!D(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!yt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{D as $,Bt as A,Ft as B,Gt as C,Kt as D,Qt as E,Jt as F,Et as G,w as H,Ht as I,X as J,Ut as K,Q as L,E as M,Vt as N,te as O,C as P,he as Q,me as R,xe as S,pe as T,ye as U,ue as V,ce as W,Nt as X,ie as Y,le as Z,gt as _,Yt as a,Xt as b,re as c,Wt as d,Zt as e,Rt as f,dt as g,F as h,we as i,de as j,q as k,ne as l,At as m,ee as n,fe as o,oe as p,I as q,St as r,It as s,_e as t,se as u,Lt as v,U as w,ae as x,ge as y,be as z};
