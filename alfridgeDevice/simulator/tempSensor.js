var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Temperature Sensors", 
				name : "", 
				iconVariant : PinsSimulators.SENSOR_GUAGE
				
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Compartment 1",
						valueID : "temp1",
						speed : 0.5,
						value: 0,
						maxValue : 40,
						defaultControl : PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Compartment 2",
						valueID : "temp2",
						speed : 0.5,
						value: 30,
						maxValue : 40,
						defaultControl : PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Compartment 3",
						valueID : "temp3",
						speed : 0.5,
						value: 30,
						maxValue : 40,
						defaultControl : PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Compartment 4",
						valueID : "temp4",
						speed : 0.5,
						value: 0,
						maxValue : 40,
						defaultControl : PinsSimulators.SLIDER
					}
				),		
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Compartment 5",
						valueID : "temp5",
						speed : 0.5,
						value: 15,
						maxValue : 40,
						defaultControl : PinsSimulators.SLIDER
					}
				),	
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Compartment 6",
						valueID : "temp6",
						speed : 0.5,
						value: 10,
						maxValue : 40,
						defaultControl : PinsSimulators.SLIDER
					}
				),		
			]
		});
}
//@line 40
var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}
//@line 44
var read = exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return axes;
}

//@line 50
exports.pins = {
			temp1: { type: "A2D" },
			temp2: { type: "A2D" },
			temp3: { type: "A2D" },
			temp4: { type: "A2D" },
			temp5: { type: "A2D" },
			temp6: { type: "A2D" },
		};