import{i as p}from"./vendor.e6dceefc.js";const h=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};h();const s=n=>document.querySelector(n);p({columnGutters:[{track:1,element:s(".gutter-col-1")}],rowGutters:[{track:1,element:s(".gutter-row-1")}]});const l=s("#js"),d=s("#css"),u=s("#html");l.addEventListener("input",a);d.addEventListener("input",a);u.addEventListener("input",a);function w(){const{pathname:n}=window.location,[o,r,i]=n.slice(1).split("%7C"),e=window.atob(o),t=window.atob(r),c=window.atob(i);u.value=e,d.value=t,l.value=c;const f=m({html:e,css:t,js:c});s("iframe").setAttribute("srcdoc",f)}function a(){const n=u.value,o=d.value,r=l.value,i=`${window.btoa(n)}|${window.btoa(o)}|${window.btoa(r)}`;window.history.replaceState(null,null,`/${i}`);const e=m({html:n,css:o,js:r});s("iframe").setAttribute("srcdoc",e)}function m({html:n,css:o,js:r}){return`
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <style>
        ${o}
        </style>
    </head>
      <body>
        ${n}
        <script>${r}<\/script>
      </body>
  </html>
  `}w();
