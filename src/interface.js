class Interface {
	constructor(file = null) {
		console.log("Interface: loading file:" + file);
		if(!file) return false;
		main_loadJsonPayload(file)
			.then(function(res) {
				console.log(res);
				this.elements = res.elements;
				this.width = res.width;
				this.height = res.height;
			}.bind(this))
			.catch(main_payloadError);

		this.activeItem = -1;
		this.mouseState = 0;
	};

	update() {
		if(intersectTest(MOUSE.x, MOUSE.y,
			0,0,
			this.x, this.y,
			this.width, this.height)) {
				this.elements.forEach(function(element, index) {
					if(intersectTest(MOUSE.x, MOUSE.y,
					0,0,
					this.x + element.x,
					this.y + element.y,
					element.width, element.height)) {
						this.activeItem = index;
						return index;
					}
				}, this);
				//this.activeItem = -1;
				return -1;
			} else {
				this.activeItem = -1;
				return -1;
			}
	};

	clickHandler() {
		if(this.activeItem != -1) return this.elements[this.activeItem].handle;
		else return false;
	};


};
