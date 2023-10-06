(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const Ce=(e,t)=>e===t,U={equals:Ce};let ge=we;const _=1,j=2,me={owned:null,cleanups:null,context:null,owner:null};var y=null;let J=null,d=null,h=null,$=null,G=0;function Ee(e,t){const n=d,s=y,r=e.length===0,l=r?me:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},o=r?e:()=>e(()=>C(()=>H(l)));y=l,d=null;try{return N(o,!0)}finally{d=n,y=s}}function g(e,t){t=t?Object.assign({},U,t):U;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=r=>(typeof r=="function"&&(r=r(n.value)),be(n,r));return[ye.bind(n),s]}function F(e,t,n){const s=z(e,t,!1,_);I(s)}function ke(e,t,n){ge=Le;const s=z(e,t,!1,_);(!n||!n.render)&&(s.user=!0),$?$.push(s):I(s)}function q(e,t,n){n=n?Object.assign({},U,n):U;const s=z(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,I(s),ye.bind(s)}function C(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function Be(e){const t=q(e),n=q(()=>Y(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}function ye(){if(this.sources&&this.state)if(this.state===_)I(this);else{const e=h;h=null,N(()=>R(this),!1),h=e}if(d){const e=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(e)):(d.sources=[this],d.sourceSlots=[e]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function be(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&N(()=>{for(let r=0;r<e.observers.length;r+=1){const l=e.observers[r],o=J&&J.running;o&&J.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?h.push(l):$.push(l),l.observers&&$e(l)),o||(l.state=_)}if(h.length>1e6)throw h=[],new Error},!1)),t}function I(e){if(!e.fn)return;H(e);const t=y,n=d,s=G;d=y=e,Ie(e,e.value,s),d=n,y=t}function Ie(e,t,n){let s;try{s=e.fn(t)}catch(r){return e.pure&&(e.state=_,e.owned&&e.owned.forEach(H),e.owned=null),e.updatedAt=n+1,_e(r)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?be(e,s):e.value=s,e.updatedAt=n)}function z(e,t,n,s=_,r){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:y,context:null,pure:n};return y===null||y!==me&&(y.owned?y.owned.push(l):y.owned=[l]),l}function W(e){if(e.state===0)return;if(e.state===j)return R(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<G);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===_)I(e);else if(e.state===j){const s=h;h=null,N(()=>R(e,t[0]),!1),h=s}}function N(e,t){if(h)return e();let n=!1;t||(h=[]),$?n=!0:$=[],G++;try{const s=e();return Ne(n),s}catch(s){n||($=null),h=null,_e(s)}}function Ne(e){if(h&&(we(h),h=null),e)return;const t=$;$=null,t.length&&N(()=>ge(t),!1)}function we(e){for(let t=0;t<e.length;t++)W(e[t])}function Le(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:W(s)}for(t=0;t<n;t++)W(e[t])}function R(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const r=s.state;r===_?s!==t&&(!s.updatedAt||s.updatedAt<G)&&W(s):r===j&&R(s,t)}}}function $e(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=j,n.pure?h.push(n):$.push(n),n.observers&&$e(n))}}function H(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const l=r.pop(),o=n.observerSlots.pop();s<r.length&&(l.sourceSlots[o]=s,r[s]=l,n.observerSlots[s]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)H(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function _e(e){throw e}function Y(e){if(typeof e=="function"&&!e.length)return Y(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=Y(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function A(e,t){return C(()=>e(t||{}))}const De=e=>`Stale read from <${e}>.`;function Oe(e){let t=!1;const n=(l,o)=>l[0]===o[0]&&(t?l[1]===o[1]:!l[1]==!o[1])&&l[2]===o[2],s=Be(()=>e.children),r=q(()=>{let l=s();Array.isArray(l)||(l=[l]);for(let o=0;o<l.length;o++){const i=l[o].when;if(i)return t=!!l[o].keyed,[o,i,l[o]]}return[-1]},void 0,{equals:n});return q(()=>{const[l,o,i]=r();if(l<0)return e.fallback;const a=i.children;return typeof a=="function"&&a.length>0?C(()=>a(t?o:()=>{if(C(r)[0]!==l)throw De("Match");return i.when})):a},void 0,void 0)}function P(e){return e}function Pe(e,t,n){let s=n.length,r=t.length,l=s,o=0,i=0,a=t[r-1].nextSibling,p=null;for(;o<r||i<l;){if(t[o]===n[i]){o++,i++;continue}for(;t[r-1]===n[l-1];)r--,l--;if(r===o){const c=l<s?i?n[i-1].nextSibling:n[l-i]:a;for(;i<l;)e.insertBefore(n[i++],c)}else if(l===i)for(;o<r;)(!p||!p.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[i]===t[r-1]){const c=t[--r].nextSibling;e.insertBefore(n[i++],t[o++].nextSibling),e.insertBefore(n[--l],c),t[r]=n[l]}else{if(!p){p=new Map;let m=i;for(;m<l;)p.set(n[m],m++)}const c=p.get(t[o]);if(c!=null)if(i<c&&c<l){let m=o,f=1,L;for(;++m<r&&m<l&&!((L=p.get(t[m]))==null||L!==c+f);)f++;if(f>c-i){const E=t[o];for(;i<c;)e.insertBefore(n[i++],E)}else e.replaceChild(n[i++],t[o++])}else o++;else t[o++].remove()}}}const ue="_$DX_DELEGATE";function Me(e,t,n,s={}){let r;return Ee(l=>{r=l,t===document?e():T(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{r(),t.textContent=""}}function b(e,t,n){let s;const r=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>C(()=>document.importNode(s||(s=r()),!0)):()=>(s||(s=r())).cloneNode(!0);return l.cloneNode=l,l}function Ue(e,t=window.document){const n=t[ue]||(t[ue]=new Set);for(let s=0,r=e.length;s<r;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,je))}}function ce(e,t){t==null?e.removeAttribute("class"):e.className=t}function T(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return V(e,t,s,n);F(r=>V(e,t(),r,n),s)}function je(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const s=n[t];if(s&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?s.call(n,r,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function V(e,t,n,s,r){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number")if(l==="number"&&(t=t.toString()),o){let i=n[0];i&&i.nodeType===3?i.data=t:i=document.createTextNode(t),n=v(e,n,s,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||l==="boolean")n=v(e,n,s);else{if(l==="function")return F(()=>{let i=t();for(;typeof i=="function";)i=i();n=V(e,i,n,s)}),()=>n;if(Array.isArray(t)){const i=[],a=n&&Array.isArray(n);if(Z(i,t,n,r))return F(()=>n=V(e,i,n,s,!0)),()=>n;if(i.length===0){if(n=v(e,n,s),o)return n}else a?n.length===0?fe(e,i,s):Pe(e,n,i):(n&&v(e),fe(e,i));n=i}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=v(e,n,s,t);v(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function Z(e,t,n,s){let r=!1;for(let l=0,o=t.length;l<o;l++){let i=t[l],a=n&&n[l],p;if(!(i==null||i===!0||i===!1))if((p=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))r=Z(e,i,a)||r;else if(p==="function")if(s){for(;typeof i=="function";)i=i();r=Z(e,Array.isArray(i)?i:[i],Array.isArray(a)?a:[a])||r}else e.push(i),r=!0;else{const c=String(i);a&&a.nodeType===3&&a.data===c?e.push(a):e.push(document.createTextNode(c))}}return r}function fe(e,t,n=null){for(let s=0,r=t.length;s<r;s++)e.insertBefore(t[s],n)}function v(e,t,n,s){if(n===void 0)return e.textContent="";const r=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const i=t[o];if(r!==i){const a=i.parentNode===e;!l&&!o?a?e.replaceChild(r,i):e.insertBefore(r,n):a&&i.remove()}else l=!0}}else e.insertBefore(r,n);return[r]}const Fe="_App_9g4xh_1",qe="_logo_9g4xh_5",We="_header_9g4xh_11",Re="_link_9g4xh_22",ae={App:Fe,logo:qe,"logo-spin":"_logo-spin_9g4xh_1",header:We,link:Re},Ve=b('<svg class="progress-ring" width="120" height="120"><circle class="progress-ring__circle" stroke="white" stroke-width="4" fill="transparent" stroke-Dasharray="327 327" stroke-Dashoffset="327" r="52" cx="60" cy="60">'),de=b('<span class="text-2xl">');function Ge(e){return ke(()=>{var t=document.querySelector("circle");t.classList.add("progress-ring__circle");var n=t.r.baseVal.value,s=n*2*Math.PI;t.style.strokeDasharray=`${s} ${s}`,t.style.strokeDashoffset=`${s}`;const r=s-parseInt(e.percent)/100*s;t.style.strokeDashoffset=r}),[Ve(),(()=>{const t=de();return T(t,()=>e.text),t})(),(()=>{const t=de();return T(t,()=>e.count),t})()]}const He=b('<button class="btn btn-blue">Breathing 4-6'),Ke=b('<button class="btn btn-blue mt-3">Working session'),he=b('<button class="btn btn-blue">Stop'),pe=b('<span class="absolute bottom-0 right-16 sm:right-1 text-xs">'),Qe=b('<button class="btn btn-blue">10 min'),Xe=b('<button class="btn btn-blue mt-3 !px-6">5 min'),Je=b('<button class="btn btn-blue mt-3 !px-6">1 min'),Ye=b('<button class="btn btn-blue mt-3 !px-6">Back'),Ze=b('<div><header><span class="absolute bottom-0 left-16 sm:left-1 text-xs">v0.04'),ze=b("<div>Not Found");function M(e){return(e<10?"0":"")+e}const et=()=>{const[e,t]=g(0),[n,s]=g(4),[r,l]=g(6),[o,i]=g(4),[a,p]=g(""),[c,m]=g(0),[f,L]=g(null),[E,Ae]=g(null),[ee,xe]=g(null),[te,ne]=g(0),[D,x]=g(5),[se,re]=g(""),[S,Se]=g(0),[ve,O]=g(!1),K=()=>{Se(Math.round(f().currentTime)%10);let w=te()-f().currentTime;re(M(parseInt(w%(60*60)/60))+":"+M(parseInt(w%60))),f().paused&&(Q(),ve()&&(m(3),f().src="audio/binaural_meditation_25min.mp3",f().play(),x(25),ne(D()*60),setTimeout(X,500))),S()<n()||S()==10?((S()==0||S()==10)&&(p("Inhale"),i(n()+1)),t(e()+100/n()),100<e()&&t(100)):S()>=n()&&(n()==S()&&(p("Exhale"),i(r()+1)),t(e()-100/r()),1>e()&&t(0)),c()==1?(i(o()-1),100<1e3-(f().currentTime-parseInt(f().currentTime))*1e3?setTimeout(K,1e3-(f().currentTime-parseInt(f().currentTime))*1e3):setTimeout(K,1e3)):t(0)},le=()=>{c()==1&&(E().play(),setTimeout(Te,1e4))},Te=()=>{c()==1&&(ee().play(),setTimeout(le,1e4))},k=()=>{m(1),f()==null?L(new Audio("audio/4-6_"+D()+"min.mp3")):f().src="audio/4-6_"+D()+"min.mp3",f().play(),E()==null&&(Ae(new Audio("audio/water.mp3")),xe(new Audio("audio/water.mp3"))),le(),setTimeout(K,500),p("Inhale"),i(n()),ne(D()*60)},Q=()=>{m(0),E().pause(),ee().pause(),f().pause()},X=()=>{let w=te()-f().currentTime;re(M(parseInt(w%(60*60)/60))+":"+M(parseInt(w%60))),f().paused&&c()==3&&(x(5),k()),c()==3&&(100<1e3-(f().currentTime-parseInt(f().currentTime))*1e3?setTimeout(X,1e3-(f().currentTime-parseInt(f().currentTime))*1e3):setTimeout(X,1e3))};return(()=>{const w=Ze(),B=w.firstChild;return B.firstChild,T(B,A(Oe,{get fallback(){return ze()},get children(){return[A(P,{get when(){return c()==0},get children(){return[(()=>{const u=He();return u.$$click=()=>m(2),u})(),(()=>{const u=Ke();return u.$$click=()=>{x(10),k(),O(!0)},u})()]}}),A(P,{get when(){return c()==1},get children(){return[A(Ge,{get percent(){return e()},get text(){return a()},get count(){return o()}}),(()=>{const u=he();return u.$$click=Q,u})(),(()=>{const u=pe();return T(u,se),u})()]}}),A(P,{get when(){return c()==2},get children(){return[(()=>{const u=Qe();return u.$$click=()=>{x(10),k(),O(!1)},u})(),(()=>{const u=Xe();return u.$$click=()=>{x(5),k(),O(!1)},u})(),(()=>{const u=Je();return u.$$click=()=>{x(1),k(),O(!1)},u})(),(()=>{const u=Ye();return u.$$click=()=>m(0),u})()]}}),A(P,{get when(){return c()==3},get children(){return[(()=>{const u=he();return u.$$click=Q,u})(),(()=>{const u=pe();return T(u,se),u})()]}})]}}),null),F(u=>{const ie=ae.App,oe=ae.header;return ie!==u._v$&&ce(w,u._v$=ie),oe!==u._v$2&&ce(B,u._v$2=oe),u},{_v$:void 0,_v$2:void 0}),w})()};Ue(["click"]);const tt=document.getElementById("root");Me(()=>A(et,{}),tt);
