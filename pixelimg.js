/*! Pixelimg.js v1.0.0 | (c) DrMaxNix 2021 | www.drmaxnix.de */

class Pixelimg {
	/*
		Return a new Pixelimg-object for an ELEMENT with OPTIONS
	*/
	constructor(ELEMENT, OPTIONS){
		// STORE ELEMENT //
		this.element = ELEMENT;
		
		
		// MATRIX SIZE //
		if(OPTIONS.matrix !== undefined){
			this.matrix_width = OPTIONS.matrix;
			this.matrix_height = OPTIONS.matrix;
			
		} else if(OPTIONS.matrix_width !== undefined && OPTIONS.matrix_height !== undefined){
			this.matrix_width = OPTIONS.matrix_width;
			this.matrix_height = OPTIONS.matrix_height;
			
		} else {
			throw 'No matrix-size provided!';
		}
		
		
		// INITIALIZE MATRIX //
		var matrix = [];
		for(var x = 0; x < this.matrix_width; x++){
			matrix[x] = [];
			
			for(var y = 0; y < this.matrix_height; y++){
				matrix[x][y] = {r:0, g:0, b:0, a:0};
			}
		}
		this.matrix = matrix;
		
		
		// IMAGE SIZE (RESOLUTION) //
		if(OPTIONS.image !== undefined){
			this.image_width = OPTIONS.image;
			this.image_height = OPTIONS.image;
			
		} else if(OPTIONS.image_width !== undefined && OPTIONS.image_height !== undefined){
			this.image_width = OPTIONS.image_width;
			this.image_height = OPTIONS.image_height;
			
		} else {
			throw 'No image-size provided!';
		}
		
		
		// AUTODRAW AND FIRSTDRAW //
		//autodraw (redraw image every time the matrix is changed)
		if(OPTIONS.autodraw !== undefined && OPTIONS.autodraw === true){
			this.autodraw = true;
		} else {
			this.autodraw = false;
		}
		
		//firstdraw (draw image at end of constructor)
		if(OPTIONS.firstdraw === undefined || OPTIONS.firstdraw === true){
			this.draw();
		}
	}
	
	
	/*
		Get pixelimg-compatible rgba color from hex
	*/
	static color_from_hex(HEX_STRING){
		// CHECK IF THIS IS A STRING //
		if(typeof(HEX_STRING) !== "string"){
			throw "Hex-color-code must be a string";
		}
		
		
		// MAYBE REMOVE LEADING '#' //
		if(HEX_STRING.substr(0, 1) == "#"){
			HEX_STRING = HEX_STRING.substr(1);
		}
		
		
		// MAYBE EXTEND LENGTH //
		//1->2
		if(HEX_STRING.length == 1){
			HEX_STRING = HEX_STRING.repeat(2);
		}
		
		//3->6
		if(HEX_STRING.length == 3){
			HEX_STRING = HEX_STRING.substr(0, 1).repeat(2) + HEX_STRING.substr(1, 1).repeat(2) + HEX_STRING.substr(2, 1).repeat(2);
		}
		
		
		// GET DEPENDING ON LENGTH //
		//2 grayscale
		if(HEX_STRING.length == 2){
			//get grayscale
			var grayscale = parseInt(HEX_STRING, 16);
			
			//compose color
			var color = {r:grayscale, g:grayscale, b:grayscale, a:255};
		}
		
		//6 rgb
		if(HEX_STRING.length == 6){
			//get 3 colors
			var red = parseInt(HEX_STRING.substr(0, 2), 16);
			var green = parseInt(HEX_STRING.substr(2, 2), 16);
			var blue = parseInt(HEX_STRING.substr(4, 2), 16);
			
			//compose color
			var color = {r:red, g:green, b:blue, a:255};
		}
		
		// RETURN //
		if(color !== undefined){
			return color;
		} else {
			throw "Unable to parse hex-color";
		}
	}
	/*
		Get pixelimg-compatible rgba color from rgba-values
	*/
	static color_from_rgba(R, G, B, A){
		return {r:R, g:G, b:B, a:(A * 255)};
	}
	
	/*
		Set pixel at X, Y to COLOR
	*/
	setPixel(OPTIONS){
		// CHECK AND GET INPUTS //
		//x
		if(OPTIONS.x === parseInt(OPTIONS.x, 10) && OPTIONS.x > -1 && OPTIONS.x < this.matrix_width){
			var x = OPTIONS.x;
		} else {
			throw "Invalid x coord";
		}
		
		//y
		if(OPTIONS.y === parseInt(OPTIONS.y, 10) && OPTIONS.y > -1 && OPTIONS.y < this.matrix_width){
			var y = OPTIONS.y;
		} else {
			throw "Invalid y coord";
		}
		
		//color
		if(OPTIONS.color !== undefined){
			var color = OPTIONS.color;
		} else {
			throw "No color given";
		}
		
		
		// SET PIXEL //
		var matrix = this.matrix;
		matrix[x][y] = color;
		this.matrix = matrix;
		
		
		// MAYBE DO AUTODRAW //
		if(this.autodraw){
			this.draw();
		}
	}
	
	
	
	/*
		Update whole matrix from 2d-array
	*/
	setMatrix(MATRIX){
		// SET NEW MATRIX //
		this.matrix = MATRIX;
		
		
		// MAYBE DO AUTODRAW //
		if(this.autodraw){
			this.draw();
		}
	}
	
	
	/*
		Draw new image from matrix
	*/
	draw(){
		//create buffer for rgba-pixels
		var buffer = new Uint8ClampedArray(this.image_width * this.image_height * 4);
		
		//load matrix
		var matrix = this.matrix;
		
		//pixel-magic!
		for(var x = 0; x < this.image_width; x++){
			for(var y = 0; y < this.image_height; y++){
				//get matrix-pixel at this image position
				var matrix_x = Math.floor(x / (this.image_width / this.matrix_width));
				var matrix_y = Math.floor(y / (this.image_height / this.matrix_height));
				
				var pixel = matrix[matrix_x][matrix_y];
				
				//get byte address to start from
				var offset = (y * this.image_width + x) * 4;
				
				//save bytes
				buffer[offset+0] = pixel.r; //red
				buffer[offset+1] = pixel.g; //green
				buffer[offset+2] = pixel.b; //blue
				buffer[offset+3] = pixel.a; //alpha
			}
		}
		
		//create off-screen canvas element
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		
		canvas.width = this.image_width;
		canvas.height = this.image_height;
		
		//create imageData object
		var idata = ctx.createImageData(this.image_width, this.image_height);
		
		//set buffer as source
		idata.data.set(buffer);
		
		//update canvas with new data
		ctx.putImageData(idata, 0, 0);
		
		//get as base64 png-data
		var dataUri = canvas.toDataURL();
		
		//set as img-data
		this.element.src = dataUri;
	}
}
