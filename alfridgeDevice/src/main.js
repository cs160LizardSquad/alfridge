var tealSkin = new Skin({fill: "#117384"});
var defaultStyle = new Style({ color: 'black', font: '15px Petala Pro Thin', horizontal: "left"});
var numStyle = new Style({ color: "#117384", font: '36px Petala Pro'});
var currObject = null;
var currTempObject = null;
Handler.bind("/itemResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
				application.distribute( "receiveItemReading", message.requestObject );
			}}
}));
Handler.bind("/tempResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
				application.distribute( "receiveTempReading", message.requestObject );
			}}
}));
/**
Handler.bind("/feedAtUp", Behavior({
	onInvoke: function(handler, message){
	
		count = parseInt(feedAtFullness.string);
		count = (count + 1).toString();
		feedAtString = count;
		feedAtFullness.string = count;
		//application.invoke( new MessageWithObject( "pins:/analogSensor/write" ) );
		message.responseText = JSON.stringify( { count: count } );
		message.status = 200;
	}
}));
**/
var numContainer = Column.template(function($) { return { width: 35, top: 5, bottom: 5, 
	skin: new Skin({ fill: 'white',}), 
	contents: [
		Label($, {left: 5, top:0, bottom:0, right: 8, style: numStyle, 
			string: $.number }),
], }});


var compartmentContainer = Column.template(function($) { return { left: 3, right: 3, top: 13, bottom: 0, 
	skin: new Skin({ fill: 'white',}), 
	contents: [
		new Line({ name:"itemLine", top:0, bottom:0, right:0, left:0, contents:[
			Label($, { name: "itemLabel", left: 0, top:0, bottom:0, right: 0, style: defaultStyle, 
				//behavior: Object.create(($.behavior).prototype), 
				string: "items: " + $.items }),
			]}),
		new Line({ name:"tempLine", top:0, bottom:0, right:0, left:0, contents:[
			Label($, { name: "tempLabel", left: 0, top:0, bottom:0, right: 0, style: defaultStyle, 
				string: "temperature: " + $.temperature + " F"}),]}),
		new Line({ name:"statusLine", top:0, bottom:0, right:0, left:0, contents:[
			Label($, { name: "statusLabel", left: 0, top:0, bottom:0, right: 0, style: defaultStyle, 
				string: "status: not defrosting" }),]})
], }});

var compartment1 = new compartmentContainer({items: "0", temperature: "0"});
var compartment2 = new compartmentContainer({items: "0", temperature: "0"});
var compartment3 = new compartmentContainer({items: "0", temperature: "0"});
var compartment4 = new compartmentContainer({items: "0", temperature: "0"});
var compartment5 = new compartmentContainer({items: "0", temperature: "0"});
var compartment6 = new compartmentContainer({items: "0", temperature: "0"});

//@line 37
var MainContainer = Column.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0, 
	skin: new Skin({ fill: 'white',}), 
	behavior: Object.create((MainContainer.behavior).prototype),
	contents: [
	new Line({skin: tealSkin,height: 45, right:0, left:0, contents:[
		new Picture({ top:0, bottom: 0, right:190, left:0, url: 'assets/device-header.png'}),
	]}),
	new Line({top:0, bottom:0, right:0, left:0, contents:[
	new numContainer({number: "1"}),
	compartment1,
	new numContainer({number: "2"}),
	compartment2,
	]}),
	new Line({top:0, bottom:0, right:0, left:0, contents:[
	new numContainer({number: "3"}),
	compartment3,
	new numContainer({number: "4"}),
	compartment4,
	]}),
	new Line({top:0, bottom:0, right:0, left:0, contents:[
	new numContainer({number: "5"}),
	compartment5,
	new numContainer({number: "6"}),
	compartment6
	]}),
	new Line({height:11, right:0, left:0}),
	//Label($, { left: 0, right: 0, 
	//style: new Style({ color: 'black', font: '46px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[0]).prototype), string: '- - -', }),
], }});

MainContainer.behavior = Behavior.template({
	receiveItemReading: function(content, data) {
		currObject = data;
		compartment1.itemLine.itemLabel.string = "items: " + data.compartment1.items;
		compartment2.itemLine.itemLabel.string = "items: " + data.compartment2.items;
		compartment3.itemLine.itemLabel.string = "items: " + data.compartment3.items;
		compartment4.itemLine.itemLabel.string = "items: " + data.compartment4.items;
		compartment5.itemLine.itemLabel.string = "items: " + data.compartment5.items;
		compartment6.itemLine.itemLabel.string = "items: " + data.compartment6.items;
	},

	receiveTempReading: function(content, data) {
		currTempObject = data;
		compartment1.tempLine.tempLabel.string = "temperature: " + parseInt(data.temp1) + " F";
		compartment2.tempLine.tempLabel.string = "temperature: " + parseInt(data.temp2) + " F";
		compartment3.tempLine.tempLabel.string = "temperature: " + parseInt(data.temp3) + " F";
		compartment4.tempLine.tempLabel.string = "temperature: " + parseInt(data.temp4) + " F";
		compartment5.tempLine.tempLabel.string = "temperature: " + parseInt(data.temp5) + " F";
		compartment6.tempLine.tempLabel.string = "temperature: " + parseInt(data.temp6) + " F";
	},
})

//@line 50
/* Create message for communication with hardware pins.
    	   analogSensor: name of pins object, will use later for calling 'analogSensor' methods.
    	   require: name of js or xml bll file.
    	   pins: initializes 'analog' (matches 'analog' object in the bll)
    	  	   	 with the given pin numbers. Pin types and directions
    	  		 are set within the bll.	*/
		application.invoke( new MessageWithObject( "pins:configure", {
            tempSensor: {
                require: "tempSensor",
                pins: {
					temp1: { pin: 52 },
					temp2: { pin: 53 },
					temp3: { pin: 54 },
					temp4: { pin: 55 },
					temp5: { pin: 56 },
					temp6: { pin: 57 },
                }
            },
            itemSensor: {
                require: "itemSensor",
                pins: {
                      ts: {pin: 49},
  					  reset: {pin: 50},
  					  data: {pin: 51},
                }
            },
        }));
    	/* Use the initialized analogSensor object and repeatedly 
    	   call its read method with a given interval.  */
		application.invoke( new MessageWithObject( "pins:/itemSensor/read?" + 
			serializeQuery( {
				repeat: "on",
				interval: 50,
				callback: "/itemResult"
		} ) ) );
		
		
		application.invoke( new MessageWithObject( "pins:/tempSensor/read?" + 
			serializeQuery( {
				repeat: "on",
				interval: 50,
				callback: "/tempResult"
		} ) ) );


Handler.bind("/getUpdate", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify( currObject );
		message.status = 200;
	}
}));

Handler.bind("/getTempUpdate", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify( currTempObject );
		message.status = 200;
	}
}));

var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.shared = false;
	},
})

application.behavior = new ApplicationBehavior();
application.add( new MainContainer() );