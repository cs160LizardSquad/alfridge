//@module
var PinsSimulators = require('PinsSimulators');

exports.configure = function(configuration) {
  this.pinsSimulator = shell.delegate("addSimulatorPart", {
      header : { 
        label : "Compartments", 
        name : "Temperature Control", 
        iconVariant : PinsSimulators.SENSOR_KNOB 
      },
      axes : [
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (1)",
            valueID : "comp1",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (2)",
            valueID : "comp2",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (3)",
            valueID : "comp3",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (4)",
            valueID : "comp4",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (5)",
            valueID : "comp5",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (6)",
            valueID : "comp6",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (7)",
            valueID : "comp7",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
        new PinsSimulators.AnalogInputAxisDescription(
          {
            valueLabel : "Compartment (8)",
            valueID : "comp8",
            speed : 0.5,
            dataType: "float",
            defaultControl: "SLIDER",
          }
        ),
      ]
    });
    
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
      header : { 
        label : "Item Sensor", 
        name : "Add items to Alfridge", 
        iconVariant : PinsSimulators.SENSOR_KNOB 
      },
      axes : [
        new PinsSimulators.AnalogInputAxisDescription(
          {
          	dataType: "float",
            valueLabel : "djskal",
            valueID : "dsads",
            speed : 0.5
          }
        ),
      ]
    });
        
}

exports.close = function() {
  shell.delegate("removeSimulatorPart", this.pinsSimulator);
}

exports.read = function() {
  return this.pinsSimulator.delegate("getValue");
}

exports.pins = {
  comp1: { type: "A2D" },
  comp2: { type: "A2D" },
  comp3: { type: "A2D" },
  comp4: { type: "A2D" },
  comp5: { type: "A2D" },
  comp6: { type: "A2D" },
  comp7: { type: "A2D" },
  comp8: { type: "A2D" }
};
