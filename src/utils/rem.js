// 适配动态修改字体大小问题
(function (doc, win) {
  //  用原生方法获取用户设置的浏览器的字体大小(兼容ie)
  let user_webset_font = "37.5px"
  if (doc.documentElement.currentStyle) {
    user_webset_font = doc.documentElement.currentStyle['fontSize'];
  } else {
    user_webset_font = getComputedStyle(doc.documentElement, false)['fontSize'];
  }

  // doc.documentElement.style.fontSize = 76.8 + 'px';
  //      取整后与默认16px的比例系数
  let xs = parseFloat(user_webset_font) / 37.5;
  if (user_webset_font.split('px') && user_webset_font.split('px')[0] && user_webset_font.split('px')[0] >= 76.8) {
    doc.documentElement.style.fontSize = 76.8 + 'px';
    console.log(user_webset_font); // 41.4 px 原来的字体大小
  }
  // 设置rem的js设置的字体大小
  let view_jsset_font, result_font;
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    clientWidth,
    recalc = function () {
      clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (!doc.addEventListener) return;

      if (clientWidth >= 1000){
        docEl.style.fontSize = 100 + 'px';
      } else if (clientWidth <= 320){
        docEl.style.fontSize = 32 + 'px';
      } else {
        // 设置rem的js设置的字体大小
        view_jsset_font = 75 * (clientWidth / 750);
        // 最终的字体大小为rem字体/系数
        result_font = view_jsset_font / xs;
        // 设置根字体大小
        docEl.style.fontSize = result_font + 'px';
      }
    };
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false); // 首次不加载，改变字体大小的时候动态设置字体
})(document, window);