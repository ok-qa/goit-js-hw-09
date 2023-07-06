const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let n=null;t.addEventListener("click",function(){n=setInterval(()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`},1e3),t.disabled=!0}),e.addEventListener("click",function(){clearInterval(n),t.disabled=!1});
//# sourceMappingURL=01-color-switcher.c65db10a.js.map
