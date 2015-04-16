exports.pins = {
	temp: { type: "A2D" }
};

exports.configure = function() {
    this.tempSensor.init();
}

exports.write = function() {
    return this.tempSensor.write();
}

exports.close = function() {
	this.tempSensor.close();
}