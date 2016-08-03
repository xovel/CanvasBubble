# CanvasBubble
A plugin for setting bubble-background of an element using canvas.

----

## Example

```js
CanvasBubble({
  selector: '#test',
  wrap: true,
  num: 100,
  colors: ['#ffde4a','#f00'],
  size: 10
});
```

## Options

### Default options

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

`string`, the CSS selector of the element.

### num

`integer`, total num of bubbles to set.

### size

`integer`, main size of each bubble. *the unit is `px`*

### colors

`array`, background-color for the bubbles, `CanvasBubble` will get a random selection.

### border

`booleen`, whether the bubble has a border or not.

### borderColor

`array`, border-color of the bubble, similar to [border](#border).

### shape

`string`, shape of the bubble. There is only two shapes: `circle`, or other. *call it `square`*

### scale

`array`, the range of bubble's scale.

### opacity

`array`, the range of bubble's opacity.

### speedX

`array`, the range of x-direction speed of bubble.

### speedY

`array`, the range of y-direction speed of bubble.

### rotate

`array`, the range of rotate of bubble's rotation.

### canvasOpacity

`number`, the opacity of canvans.

### wrap

`boolean`, wrap the element's children or not.

### fps

`integer`, times of repaint the canvas per second.

## Utils

**CanvasBubble.util**

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

Change hex color to RGB color.

#### color.rgbToHex

Change RGB color to hex color.

### random

generate a random number between the two arguments.

### on

EventListener

### .extend

extend object

### $

CSS selector

-----

## TODO

- [x] AMD
- [ ] DEMO
- [ ] Responsive
- [ ] ...

## Thanks to

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- `qslinz.js`
- `easyBackground.js`
