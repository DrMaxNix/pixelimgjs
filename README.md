# Pixelimg.js
[![GitHub release](https://img.shields.io/badge/release-v1.0.1-orange)](https://github.com/DrMaxNix/pixelimgjs)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/DrMaxNix/pixelimgjs/blob/main/LICENSE)
[![Maintaner](https://img.shields.io/badge/maintainer-DrMaxNix-blue)](https://www.drmaxnix.de)

Pixelimg.js is a rather small js-library to display code-generated pixel images inside of a html image-element.


## Installation
To include Pixelimg.js in your html code you have two options:
- Either download the pixelimg.js file from the repo and serve it by yourself
- Or use a CDN

Example using jsdelivr.net:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/DrMaxNix/pixelimgjs@1.0/pixelimg.min.js"></script>
```


## Usage
### HTML image element
The only two important parts here are:
1. The element must be an image `<img />`
2. The element should have an id-tag (or any other data-tag) which helps specifying the element later when we will be loading data into the image
```html
<img id="img1" />
```

### Create Pixelimg-object
To be able to work with your image you need to create an object for each of them.
```javascript
const img1 = new Pixelimg(document.getElementById("img1"), {matrix:8, image:512});
```
Arguments shown above:
- `matrix` The pixel-matrix will have 8 by 8 pixels in size
- `image` The png image which is generated will have a size of 512 by 512 pixels (=resolution)

More arguments for the constructor can be found in the Functions section at [new Pixelimg(ELEMENT, OPTIONS)](#new-pixelimgelement-options).





# Functions
## new Pixelimg(ELEMENT, OPTIONS)
_Return a new Pixelimg-object for an ELEMENT with OPTIONS_

### Arguments
- ELEMENT: Reference to the img-element to be linked
- OPTIONS: Named args
  - `OPTIONS.matrix` Matrix size for width and height
  - `OPTIONS.matrix_width` Matrix width (only when OPTIONS.matrix not used)
  - `OPTIONS.matrix_height` Matrix height (only when OPTIONS.matrix not used)
  - `OPTIONS.image` Image size for width and height for resulting png (=resolution)
  - `OPTIONS.image_width` Image width (only when OPTIONS.image not used)
  - `OPTIONS.image_height` Image height (only when OPTIONS.image not used)
  - `OPTIONS.autodraw` Redraw image every time the matrix is changed; _default: `false`_
  - `OPTIONS.firstdraw` Draw image after the constructor was called; _default: `true`_

### Returns
A Pixelimg-object


## color_from_hex(HEX_STRING)
_Get pixelimg-compatible rgba color from css-like hex-color_

### Arguments
- HEX_STRING: Hex-color as string
  - eg. `#FF0000` -> Red
  - eg. `#F8A` -> `#FF88AA` -> Pink-ish
  - eg. `#0` -> `#000000` -> Black
  - eg. `#08` -> `#080808` -> A bit lighter than black
  - eg. `0F0` -> `#00FF00` -> Green

### Returns
A [Pixelimg-color-object](#color-object)


## color_from_rgba(R, G, B, A)
_Get pixelimg-compatible rgba color from rgba-values_

### Arguments
- R: Red component; _Range: `0-255 (int)`_
- G: Green component; _Range: `0-255 (int)`_
- B: Blue component; _Range: `0-255 (int)`_
- A: Alpha (opacity); _Range: `0.0-1.0 (float)`_

### Returns
A [Pixelimg-color-object](#color-object)


## setPixel(OPTIONS)
_Set pixel at X, Y to COLOR_

### Arguments
- OPTIONS: Named args
  - `OPTIONS.x` Pixel's x-coordinate; _Starting from `0` = furthest left_
  - `OPTIONS.y` Pixel's y-coordinate; _Starting from `0` = furthest top_
  - `OPTIONS.color` Color for that pixel ([Pixelimg-color-object](#color-object))


## setMatrix(MATRIX)
_Update whole matrix from 2d-array_

### Arguments
- MATRIX: 2d-array of [Pixelimg-color-objects](#color-object)


## draw()
_Draw new image from matrix_


## Color-object
An object storing red, green, blue and alpha data for a color (all _Range: `0-255 (int)`_)
```javascript
{r:255, g:127, b:0, a:255}
```

### How to get it
- [color_from_hex()](#color_from_hexhex_string)
- [color_from_rgba()](#color_from_rgbar-g-b-a)






# Examples
## 1. 2x2 Red, Green, Yellow and Blue pixels

## 2. xxx RGB color-palette
