/*!
 * CanvasBubble
 * A plugin for setting bubble-background of an element using canvas.
 * author: xovel
 * last update: 2016-08-03 11:42:15
 * License: MIT
 */
+function(window, document, undefined){

// -------
// Helpers

// color handlers
var _color = {

  /**
   * @function: hexToRgb
   * @param: hex color
   * @return: object{r,g,b}
   * @example: 
   *  ...('#d1d2d3') --> {r: 209, g: 210, b: 211}
   *  ...('#f00') -->  {r: 255, g: 0, b: 0}
   *  ...('abcdef') --> {r: 171, g: 205, b: 239}
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

  _toHex: function(v){
    var ret = v.toString(16);
    return ret.length === 1 ? '0' + ret : ret;
  },

  /**
   * @funciton: rgbToHex
   * @params: r,g,b RGB value
   * @return: hex color
   * @example:
   *  ...(225, 225, 225) --> '#e1e1e1'
   *  ...(158, 68, 238) --> '#9e44ee'
   */
  rgbToHex: function(r, g, b){
    return '#' + _color._toHex(r) +  _color._toHex(g) +  _color._toHex(b);
  }

}

// get a random number between min and max
var _random = function(min, max){
  return Math.random() * (max - min) + min;
}

// extend on object
var _extend = function( dest, source ){
  for( var name in source ){
    dest[name] = source[name];
  }
  return dest;
}

// css selector using querySelector/querySelectorAll
var _$ = function(selector, all){

  return !selector ? null :
    !all ?
      document.querySelector(selector) :
      document.querySelectorAll(selector);
}

// EventListener
var _on = function( elem, type, fun ){
  elem.addEventListener(type, fun, false);
}

// createElement
var _div = function(className, tagName){
  tagName = tagName || 'div';
  var div = document.createElement(tagName);

  if(!!className){
    div.className = className;
  }

  return div;
}

// wrap an element
var _wrap = function(elem, wrap){

  var div = _div(wrap);

  div.innerHTML = elem.innerHTML;
  
  elem.innerHTML = '';
  elem.appendChild(div);
  
  return div;
}

// set styles for an element
var _css = function(elem, styles){
  for(var style in styles){
    elem.style[style] = styles[style];
  }
}

// get size of an element
var _getSize = function(elem){
  return {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  }
}

// traversal for an array or an object
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

// Helpers End
// -----------

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
    opacity: [.1, 1],
    speedX: [-1, 1],
    speedY: [-1, 1],
    rotate: [.05, .8],
    canvasOpacity: .95,
    wrap: false,
    fps: 60
  }, options||{});

  var elem = _$(options.selector);
  var size = _getSize(elem);

  _css(elem,{'position':'relative','overflow':'hidden'});

  // wrap it
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

  // set color to RGB style
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

  // get every bubble's param and run this CanvasBubble effect
  function _bubbles(){
    for(var i = 0; i < options.num; ++i ){
      // random color
      var color = options.colors[~~_random(0, options.colors.length)];
      // random borderColor
      var borderColor = options.borderColors[~~_random(0, options.borderColors.length)];
      // randowm opacity
      var opacity = _random(options.opacity[0], options.opacity[1]);

      params[i] = {
        // random scale
        scale: _random(options.scale[0], options.scale[1]),

        x: _random(0, size.width),

        y: _random(0, size.height),

        // init rotation
        rotation: 0,

        // random speed for x-direction
        speedX: _random(options.speedX[0], options.speedX[1]),

        // random speed for x-direction
        speedY: _random(options.speedY[0], options.speedY[1]),

        // random speed for totate
        speedR: _random(options.rotate[0], options.rotate[1]),

        // rgba color
        color: 'rgba(' + color + ',' + opacity + ')',
        
        opacity: opacity,
        
        borderColor: 'rgb(' + borderColor + ')'
      }
    }
    // run it!
    _run();
  }

  function _run(){
    setInterval(function(){
      // clear canvas
      // size = _getSize(elem);
      context.clearRect(0, 0, size.width, size.height);

      // repaint
      for(var i = 0; i < options.num; ++i ){
        var temp = params[i];
        temp.x += temp.speedX;
        temp.y += temp.speedY;
        var ss = options.size * temp.scale;

        if( temp.x > size.width + ss || temp.y > size.height + ss || temp.x < -(ss * 1.5) || temp.y < -(ss * 1.5) ){
          // out of sight too far, adjust it
          _adjust(temp);
        }else{
          // draw it~
          _draw(temp);
        }
      }
    }, 1000 / options.fps);
  }

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

  function _draw(v){
    context.fillStyle = v.color;

    // border
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

    // circle or square
    if( options.shape === 'circle' ){
      context.arc( -t2, -t2, t1, 0, 2 * Math.PI, false );
    }else{
      context.fillRect( -t2, -t2, t1, t1 );
    }

    context.restore();
    context.fill();
  }

  _bubbles();

  // window resize
  function _resize(){
    size = _getSize(elem);
    _css(canvas,{'width':size.width + 'px','height':size.height+'px'});
  }
  _resize();
  _on(window,'resize',_resize);
}

// expose
CanvasBubble.util = {
  'color': _color,
  'random': _random,
  'on': _on,
  'extend': _extend,
  '$': _$
}

window.CanvasBubble = CanvasBubble;

// AMD
if( typeof define === "function" && define.amd ){
  define("CanvasBubble", [], function(){
    return CanvasBubble;
  });
}

}(window, document);

