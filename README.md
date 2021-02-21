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
#### HTML image element
The only two important parts here are:
1. The element must be an image `<img />`
2. The element should have an id-tag (or any other data-tag) which helps specifying the element later when we will be loading data into the image
```html
<img id="img1" />
```

#### Create Pixelimg-object
To be able to work with your image you need to create an object for each of them.
```javascript
const img1 = new Pixelimg(document.getElementById("img1"), {matrix:8, image:512});
```
Arguments shown above:
- `matrix`: The pixel-matrix will have 8 by 8 pixels in size
- `image`: The png image which is generated will have a size of 512 by 512 pixels (=resolution)

More arguments for the constructor can be found in the [Functions/constructor](#constructor) section.


## Functions
#### constructor
Bla


## Examples
#### 1. Do something

#### 2. Do something else
