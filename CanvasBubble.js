/*!
 * CanvasBubble
 * 制作背景泡泡
 * author: xovel
 * License: MIT
 */
+function(window, document, undefined){

// Helpers

// 颜色处理
var _color = {

  /**
   * 十六进制颜色转RGB 
   * 非十六进制颜色默认使用白色
   */
  hexToRgb: function(v){
    if(v.length === 4){
      v = '#' + v.charAt(1) + v.charAt(1) + v.charAt(2) + v.charAt(2) + v.charAt(3) + v.charAt(3);
    }
    var re = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(v);
    return re ? {
      r: parseInt(re[1], 16),
      g: parseInt(re[2], 16),
      b: parseInt(re[3], 16)
    } : {
      r: 255, g: 255, b: 255
    }
  },

  /**
   * 十六进制转换辅助函数
   */
  _toHex: function(v){
    var ret = v.toString(16);
    return ret.length === 1 ? '0' + ret : ret;
  },

  /**
   * RGB转十六进制
   */
  rgbToHex: function(r, g, b){
    return '#' + _color._toHex(r) +  _color._toHex(g) +  _color._toHex(b);
  }

}

// 取随机数
var _random = function(min, max){
  return Math.random() * (max - min) + min;
}

// 扩展对象
var _extend = function( dest, source ){
  for( var name in source ){
    dest[name] = source[name];
  }
  return dest;
}

// 选择器
var _$ = function(selector, all){

  return !selector ? null :
    !all ?
      document.querySelector(selector) :
      document.querySelectorAll(selector);
}

// 事件侦听
var _on = function( elem, type, fun ){
  elem.addEventListener(type, fun, false);
}

// 创建元素
var _div = function(className, tagName){
  tagName = tagName || 'div';
  var div = document.createElement(tagName);

  if(!!className){
    div.className = className;
  }

  return div;
}

// 元素包裹
var _wrap = function(elem, wrap){

  var div = _div(wrap);

  div.innerHTML = elem.innerHTML;
  
  elem.innerHTML = '';
  elem.appendChild(div);
  
  return div;
}

// 设置样式
var _css = function(elem, styles){
  for(var style in styles){
    elem.style[style] = styles[style];
  }
}

// 获取元素的宽高
var _getSize = function(elem){
  return {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  }
}

// 数组或元素的遍历
var _each = function(obj, fn){
  
  var value, i = 0, length = obj.length;
  
  if( length === undefined ){
    for( i in obj ){
      if( false === fn.call( obj[ i ], i, obj[ i ] ) ) break;
    }
  } else {
    for ( ; i < length; i++ ) {
      if( false === fn.call( obj[ i ], i, obj[ i ] ) ) break;
    }
  }
  
  return obj;
}

var CanvasBubble = function( options ){
  options = _extend({
    selector: 'body',
    num: 30,
    size: 30,
    colors: ['#ffffff', '#e1e1e1', '27,27,27'],
    border: false,
    borderColors: ['#f00', '#0f0', '#00f'],
    shape: 'circle',
    scale: [.5, 1],
    opacity: [.2, 1],
    speedX: [-1, 1],
    speedY: [-1, 1],
    rotate: [.05, .1],
    canvasOpacity: .95,
    wrap: false,
    fps: 60
  }, options||{});

  var elem = _$(options.selector);
  var size = _getSize(elem);

  _css(elem,{'position':'relative','overflow':'hidden'});

  // 包裹
  if(options.wrap){
    var wrapElem = _wrap(elem);
    _css(wrapElem,{'position':'absolute','zIndex':2, 'width':'100%'});
  }

  var canvas = _div('','canvas');
  _css(canvas,{'position':'absolute','top':0,'left':0,'zIndex':1});
  elem.appendChild(canvas);

  if( options.canvasOpacity ){
    _css(canvas,{'opacity': options.canvasOpacity});
  }

  var context = canvas.getContext("2d");

  // 处理颜色
  _each(options.colors, function(i,v){
    if( v.substr(0, 1) === '#' ){
      var _rgb = _color.hexToRgb(v);
      options.colors[i] = _rgb.r + ',' + _rgb.g + ',' + _rgb.b;
    }
  });
  _each(options.borderColors, function(i,v){
    if( v.substr(0, 1) === '#' ){
      var _rgb = _color.hexToRgb(v);
      options.borderColors[i] = _rgb.r + ',' + _rgb.g + ',' + _rgb.b;
    }
  });

  var params = [];

  // 设置每个泡泡的参数并执行
  function _bubbles(){
    for(var i = 0; i < options.num; ++i ){
      // 获取随机颜色
      var color = options.colors[~~_random(0, options.colors.length)];
      // 获取随机边框色
      var borderColor = options.borderColors[~~_random(0, options.borderColors.length)];
      // 随机透明度
      var opacity = _random(options.opacity[0], options.opacity[1]);

      params[i] = {
        // 缩放比例
        scale: _random(options.scale[0], options.scale[1]),
        // 宽度
        x: _random(0, size.width),
        // 高度
        y: _random(0, size.height),
        // 旋转
        rotation: 0,
        // 横向速度
        speedX: _random(options.speedX[0], options.speedX[1]),
        // 纵向速度
        speedY: _random(options.speedY[0], options.speedY[1]),
        // 旋转速度
        speedR: _random(options.rotate[0], options.rotate[1]),
        // 颜色
        color: 'rgba(' + color + ',' + opacity + ')',
        // 透明度
        opacity: opacity,
        // 边框色
        borderColor: 'rgb(' + borderColor + ')'
      }
    }
    // 执行效果
    _run();
  }

  // 运行
  function _run(){
    setInterval(function(){
      // 清除画布
      size = _getSize(elem);
      context.clearRect(0, 0, size.width, size.height);
      // 重绘画布
      for(var i = 0; i < options.num; ++i ){
        var temp = params[i];
        temp.x += temp.speedX;
        temp.y += temp.speedY;
        var ss = options.size * temp.scale;

        if( temp.x > size.width + ss || temp.y > size.height + ss || temp.x < -(ss * 1.5) || temp.y < -(ss * 1.5) ){
          // 移出画布很远，进行重新调整
          _adjust(temp);
        }else{
          // 绘制
          _draw(temp);
        }
      }
    }, 1000 / options.fps);
  }

  // 调整效果
  function _adjust(v){
    var rnd = _random(0, 1);
    var ss = options.size * v.scale;
    if(rnd > .5){
      v.x = v.speedX > 0 ? -rnd : size.width + rnd;
      v.y = _random(0, size.height);
    }else{
      v.x = _random(0, size.width);
      v.y = v.speedY > 0 ? -rnd : size.height + rnd;
    }
    _draw(v);
  }

  // 绘制
  function _draw(v){
    context.fillStyle = v.color;

    // 绘制边框
    if(options.border){
      context.strokeStyle = v.borderColor;
      context.stroke();
    }

    context.beginPath();
    v.rotation += v.speedR;
    context.save();
    context.translate(v.x, v.y);
    context.rotate(v.rotation * Math.PI / 180);

    var t1 = options.size * v.scale;
    var t2 = t1 / 2;

    // 画圆与画方
    if( options.shape === 'circle' ){
      context.arc( -t2, -t2, t1, 0, 2 * Math.PI, false );
    }else{
      context.fillRect( -t2, -t2, t1, t1 );
    }

    context.restore();
    context.fill();
  }

  _bubbles();

  // 自适应调整
  function _resize(){
    size = _getSize(elem);
    _css(canvas,{'width':size.width + 'px','height':size.height+'px'});
  }
  _resize();
  _on(window,'resize',_resize);
}

// 暴露变量
CanvasBubble.util = {
  'color': _color,
  'random': _random,
  'on': _on,
  'extend': _extend,
  '$': _$
}
window.CanvasBubble = CanvasBubble;

}(window, document);

