let t;const e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");e.addEventListener("click",function(){t&&(t=setInterval(function(){let t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.background=t},1e3),e.disabled=!0)}),n.addEventListener("click",function(){clearInterval(t),t=void 0,e.disabled=!1});
//# sourceMappingURL=01-color-switcher.f42d9905.js.map
