!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;t.addEventListener("click",function(){n=setInterval(function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16)),console.log("current color is "+document.body.style.background)},1e3),t.disabled=!0}),e.addEventListener("click",function(){clearInterval(n),t.disabled=!1})}();
//# sourceMappingURL=01-color-switcher.29f284b2.js.map