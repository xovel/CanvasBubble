# CanvasBubble

`CanvasBubble`使用canvas生成一个带泡泡背景层的一个插件。无依赖。

----

##  英文版

参见 [README.md](README.md)

## 示例

```js
CanvasBubble({
  selector: '#test',
  wrap: true,
  num: 100,
  colors: ['#ffde4a','#f00'],
  size: 10
});
```

[演示](http://xovel.cn/CanvasBubble/index_zh.html)

## 参数

### 默认参数

```js
{
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
}
```

### selector

字符串，元素的CSS选择器。

### num

正整数，泡泡的总数量。

> 这个数量并非是显示在视野里面的泡泡数量，有部分泡泡会移动至视野外一定距离才重新计算位移路线。

### size

正整数，单位为`px`，泡泡的主要大小。

### colors

数组，泡泡的背景色。`CanvasBubble`会随机从中取颜色进行设置。

### border

布尔值，泡泡是否带边框。

### borderColor

数组，泡泡的边框色。

### shape

字符串，泡泡的形状。这里只有两个形状：圆形与方形。默认值为`circle`/`圆形`。

### scale

数组，泡泡的缩放范围。

### opacity

数组，泡泡的透明度范围。

### speedX

数组，泡泡横向移动的偏移量范围。

### speedY

数组，泡泡纵向移动的偏移量范围。

### rotate

数组，泡泡旋转时的旋转偏移量范围。

### canvasOpacity

数值，画布的透明度。

### wrap

布尔值，元素内部元素是否需要包裹起来。

### fps

正整数，帧率，画布的刷新重绘频率。

## 工具

工具函数挂载在命名空间之下：**CanvasBubble.util**

```js
CanvasBubble.util = {
  'color': _color,
  'random': _random,
  'on': _on,
  'extend': _extend,
  '$': _$
}
```

### color

#### color.hexToRgb

十六进制颜色转RGB颜色。

#### color.rgbToHex

RGB颜色转十六进制颜色。

### random

随机数生成器，指定最小值与最大值。

### on

事件侦听。

### extend

对象扩展函数。

### $

CSS选择器。

-----

## TODO

- [x] AMD
- [x] DEMO
- [x] Responsive
- [ ] ...

## 致谢

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- `qslinz.js`
- `easyBackground.js`
