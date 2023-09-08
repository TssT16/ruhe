(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();let j=R;const w=1,_=2,U={owned:null,cleanups:null,context:null,owner:null};var h=null;let N=null,d=null,p=null,g=null,v=0;function q(e,t){const n=d,i=h,l=e.length===0,s=l?U:{owned:null,cleanups:null,context:null,owner:t===void 0?i:t},r=l?e:()=>e(()=>C(()=>E(s)));h=s,d=null;try{return S(r,!0)}finally{d=n,h=i}}function x(e,t,n){const i=K(e,t,!1,w);P(i)}function C(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function G(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&S(()=>{for(let l=0;l<e.observers.length;l+=1){const s=e.observers[l],r=N&&N.running;r&&N.disposed.has(s),(r?!s.tState:!s.state)&&(s.pure?p.push(s):g.push(s),s.observers&&D(s)),r||(s.state=w)}if(p.length>1e6)throw p=[],new Error},!1)),t}function P(e){if(!e.fn)return;E(e);const t=h,n=d,i=v;d=h=e,H(e,e.value,i),d=n,h=t}function H(e,t,n){let i;try{i=e.fn(t)}catch(l){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(E),e.owned=null),e.updatedAt=n+1,F(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?G(e,i):e.value=i,e.updatedAt=n)}function K(e,t,n,i=w,l){const s={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:h,context:null,pure:n};return h===null||h!==U&&(h.owned?h.owned.push(s):h.owned=[s]),s}function I(e){if(e.state===0)return;if(e.state===_)return T(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<v);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===w)P(e);else if(e.state===_){const i=p;p=null,S(()=>T(e,t[0]),!1),p=i}}function S(e,t){if(p)return e();let n=!1;t||(p=[]),g?n=!0:g=[],v++;try{const i=e();return Q(n),i}catch(i){n||(g=null),p=null,F(i)}}function Q(e){if(p&&(R(p),p=null),e)return;const t=g;g=null,t.length&&S(()=>j(t),!1)}function R(e){for(let t=0;t<e.length;t++)I(e[t])}function T(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const l=i.state;l===w?i!==t&&(!i.updatedAt||i.updatedAt<v)&&I(i):l===_&&T(i,t)}}}function D(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=_,n.pure?p.push(n):g.push(n),n.observers&&D(n))}}function E(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const s=l.pop(),r=n.observerSlots.pop();i<l.length&&(s.sourceSlots[r]=i,l[i]=s,n.observerSlots[i]=r)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)E(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function F(e){throw e}function V(e,t){return C(()=>e(t||{}))}function W(e,t,n){let i=n.length,l=t.length,s=i,r=0,o=0,f=t[l-1].nextSibling,u=null;for(;r<l||o<s;){if(t[r]===n[o]){r++,o++;continue}for(;t[l-1]===n[s-1];)l--,s--;if(l===r){const c=s<i?o?n[o-1].nextSibling:n[s-o]:f;for(;o<s;)e.insertBefore(n[o++],c)}else if(s===o)for(;r<l;)(!u||!u.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[s-1]&&n[o]===t[l-1]){const c=t[--l].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--s],c),t[l]=n[s]}else{if(!u){u=new Map;let a=o;for(;a<s;)u.set(n[a],a++)}const c=u.get(t[r]);if(c!=null)if(o<c&&c<s){let a=r,$=1,B;for(;++a<l&&a<s&&!((B=u.get(t[a]))==null||B!==c+$);)$++;if($>c-o){const M=t[r];for(;o<c;)e.insertBefore(n[o++],M)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}function J(e,t,n,i={}){let l;return q(s=>{l=s,t===document?e():Z(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{l(),t.textContent=""}}function X(e,t,n){let i;const l=()=>{const r=document.createElement("template");return r.innerHTML=e,n?r.content.firstChild.firstChild:r.content.firstChild},s=t?()=>C(()=>document.importNode(i||(i=l()),!0)):()=>(i||(i=l())).cloneNode(!0);return s.cloneNode=s,s}function Y(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function A(e,t){t==null?e.removeAttribute("class"):e.className=t}function Z(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return b(e,t,i,n);x(l=>b(e,t(),l,n),i)}function b(e,t,n,i,l){for(;typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,r=i!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=y(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||s==="boolean")n=y(e,n,i);else{if(s==="function")return x(()=>{let o=t();for(;typeof o=="function";)o=o();n=b(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],f=n&&Array.isArray(n);if(L(o,t,n,l))return x(()=>n=b(e,o,n,i,!0)),()=>n;if(o.length===0){if(n=y(e,n,i),r)return n}else f?n.length===0?O(e,o,i):W(e,n,o):(n&&y(e),O(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(r)return n=y(e,n,i,t);y(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function L(e,t,n,i){let l=!1;for(let s=0,r=t.length;s<r;s++){let o=t[s],f=n&&n[s],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))l=L(e,o,f)||l;else if(u==="function")if(i){for(;typeof o=="function";)o=o();l=L(e,Array.isArray(o)?o:[o],Array.isArray(f)?f:[f])||l}else e.push(o),l=!0;else{const c=String(o);f&&f.nodeType===3&&f.data===c?e.push(f):e.push(document.createTextNode(c))}}return l}function O(e,t,n=null){for(let i=0,l=t.length;i<l;i++)e.insertBefore(t[i],n)}function y(e,t,n,i){if(n===void 0)return e.textContent="";const l=i||document.createTextNode("");if(t.length){let s=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(l!==o){const f=o.parentNode===e;!s&&!r?f?e.replaceChild(l,o):e.insertBefore(l,n):f&&o.remove()}else s=!0}}else e.insertBefore(l,n);return[l]}const z=""+new URL("logo-123b04bc.svg",import.meta.url).href,k="_App_9g4xh_1",ee="_logo_9g4xh_5",te="_header_9g4xh_11",ne="_link_9g4xh_22",m={App:k,logo:ee,"logo-spin":"_logo-spin_9g4xh_1",header:te,link:ne},se=X('<div><header><img alt="logo"><p>Edit <code>src/App.tsx</code> and save to reload.</p><a href="https://github.com/solidjs/solid" target="_blank" rel="noopener noreferrer">Learn Solid'),le=()=>(()=>{const e=se(),t=e.firstChild,n=t.firstChild,i=n.nextSibling,l=i.nextSibling;return Y(n,"src",z),x(s=>{const r=m.App,o=m.header,f=m.logo,u=m.link;return r!==s._v$&&A(e,s._v$=r),o!==s._v$2&&A(t,s._v$2=o),f!==s._v$3&&A(n,s._v$3=f),u!==s._v$4&&A(l,s._v$4=u),s},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),e})(),ie=document.getElementById("root");J(()=>V(le,{}),ie);
