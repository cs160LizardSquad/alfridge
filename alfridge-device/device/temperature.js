//@module
exports.pins = {
	comp1: { type: "A2D", pin: 51 },
	comp2: { type: "A2D", pin: 52 },
	comp3: { type: "A2D", pin: 53 },
	comp4: { type: "A2D", pin: 54 },
	comp5: { type: "A2D", pin: 55 },
	comp6: { type: "A2D", pin: 56 },
	comp7: { type: "A2D", pin: 57 },
	comp8: { type: "A2D", pin: 58 } 
};

exports.configure = function( led ) {
	this.comp1.init();
	this.comp2.init();
	this.comp3.init();
	this.comp4.init();
	this.comp5.init();
	this.comp6.init();
	this.comp7.init();
	this.comp8.init();
}

exports.write = function( parameters ) {
	switch( parameters ){
	}
}

exports.close = function( led ){
	this.comp1.close();
	this.comp2.close();
	this.comp3.close();
	this.comp4.close();
	this.comp5.close();
	this.comp6.close();
	this.comp7.close();
	this.comp8.close();
}

