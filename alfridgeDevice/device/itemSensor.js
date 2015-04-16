exports.pins = {
	ts: {type: "Digital", direction: "input"},
 	reset: {type: "Digital", direction: "output"},
  	data: {type: "I2C", address: 0x42},
};

exports.configure = function() {
    this.ts.init();
}

exports.read = function() {
    return this.ts.read();
}

exports.close = function() {
	this.ts.close();
}