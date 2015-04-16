include("items.js");
include("groceryLists.js")
include("troubleshoot.js")
include("settings.js")
var currentView = null;	
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var MODEL = require('mobile/model');
var tealSkin = new Skin({fill:"#117384"});
var darkgreySkin = new Skin({fill:"#5A6060"});
var whiteSkin = new Skin({fill:"white"});
var titleStyle = new Style({font:"24px Petala Pro SemiLight", color:"white"});
var semilightStyle = new Style({font:"24px Petala Pro SemiLight", color:"black"});
var textStyle = new Style({font:"20px Petala Pro Thin", color:"#5A6060"});

var sideBarPopped = false;

var allItemsDict = {};
var comp1ItemsDict = {};
var comp2ItemsDict = {};
var comp3ItemsDict = {};
var comp4ItemsDict = {};
var comp5ItemsDict = {};
var comp6ItemsDict = {};
var itemsDictList = [null, comp1ItemsDict, comp2ItemsDict, comp3ItemsDict, comp4ItemsDict, comp5ItemsDict, comp6ItemsDict]
var temp1 = 0;
var temp2 = 0;
var temp3 = 0;
var temp4 = 0;
var temp5 = 0;
var temp6 = 0;

var sideMenuButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:40, left:10, 
	skin: tealSkin,
	contents:[
		new Picture({left:0, width:40, height: 30, url: "assets/menu-icon.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if (sideBarPopped) {
				application.remove(sideBar)
				sideBarPopped = false;
			} else {
				application.add(sideBar);
				sideBarPopped = true;
				}
		}}
	})
}});

var count = 0;
var groceryListsMainBody = BUTTONS.Button.template(function($){ return{top:0, bottom:0, right: 0, left:0, skin:whiteSkin, 
			contents:[
				new Picture({name: "defaultpic", left:-154, top: 0, height: 544, width: 630, url: "assets/groceries2.png"}),],
			behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
					if(count == 0){
					content.defaultpic.url = "assets/groceries3.png"
					}else if (count == 1){
					content.defaultpic.url = "assets/groceries4.png"
					}else if (count == 2){
					content.defaultpic.url = "assets/groceries2.png"
					}
					count++;
						}}})
		}});
				
var notificationButtonTemplate = BUTTONS.Button.template(function($){ return{
	right: 10, width: 30, top: 5,
	skin: tealSkin,
	contents:[
		new Picture({right:0, width:30, height: 30, url: "assets/bell-icon.png"}),
	],
	behavior:Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						trace("notification button tapped")
						
						}}
					}),
}});

var subviewButtonTemplate = BUTTONS.Button.template(function($){ return{
	left: 15, height: 30,top: $.top,
	skin: darkgreySkin,
	contents:[
		new Picture({width: 20, left:5, height:20, url: $.url}),
		new Label({left:40, height:30,  string:$.textForLabel, style:new Style({font:"20px Petala Pro Thin", color:"white"})})
	],
	behavior: $.myBehavior
}});

var topBar = new Line({left:0, right:0, top:0, height:50, skin:tealSkin, 
			contents:[
				new Column({width: 50, top:10, bottom:0, contents:[
					new sideMenuButtonTemplate()]}),
				new Column({name: "headerCol", left:0, right:0, top:7, bottom:0, contents:[
					new Label({left:10, top:8, string: "Alfridge", style: titleStyle, name: "currentView" }),]}),
				new Column({left:0, right:0, top:6, bottom:0, contents:[
					new notificationButtonTemplate()]}),
			], 	
		});

	
var sideBar = new Column({left:0, width:200 , top:50, bottom:0,  skin:darkgreySkin, 
			contents:[
				new subviewButtonTemplate({textForLabel:"Home",
				url: "assets/home-icon.png", top:10,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.headerCol.currentView.string = "Alfridge"
						application.remove(currentView);
						currentView = mainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
						
						}}
					})}),
				new subviewButtonTemplate({textForLabel:"Items", 
				url: "assets/items-icon.png",  top:10,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.headerCol.currentView.string = "Items"
						application.remove(currentView);
						currentView = itemsMainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);

						
						}}
					})}),
				new subviewButtonTemplate({textForLabel:"Grocery Lists", 
				url: "assets/groceries-icon.png", top:10,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.headerCol.currentView.string = "Grocery Lists"
						application.remove(currentView);
						currentView = new groceryListsMainBody();
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);

						}}
					})}),
				new subviewButtonTemplate({textForLabel:"Troubleshoot",
				url: "assets/troubleshoot-icon.png", top:10,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.headerCol.currentView.string = "Troubleshoot"
						application.remove(currentView);
						currentView = troubleshootMainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
				
						}}
					})}),
					
				new subviewButtonTemplate({textForLabel:"Settings",
				url: "assets/settings-icon.png", top:270,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.headerCol.currentView.string = "Settings"
						application.remove(currentView);
						currentView = settingsMainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
						
						}}
					})}),
				
			], 	
		});

var defrostButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:80,  
	skin: tealSkin,
	contents:[
		new Label({name: "defrostLabel", height:30, width:70, string: "defrost", style: new Style({font:"20px Petala Pro SemiLight", color:"white"})}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
		content.defrostLabel.string = "stop";
		statusLabel.string = "status: defrosting";
		//send message
		/*
			if (sideBarPopped) {
				application.remove(sideBar)
				sideBarPopped = false;
			} else {
				application.add(sideBar);
				sideBarPopped = true;
				} */
		}} 
	})
}});

var compartmentButtonTemplate = BUTTONS.Button.template(function($){ return{
	name: $.name, width:$.width, top: 4, left: 4, right: 4, bottom: 4, height:100,
	contents:[ 
		new Column({name: "col1", height: 80, left:0, right:0, contents:[
			new Line({name: "line1", height:50, right:0, left:0, contents: [
				new Label({name: "nameTempLabel", top: 15, left:0, right:0, height:45, string:$.textForLabel + "  10" + "\xB0" + "F", style:new Style({font:"28px Petala Pro Thin", color:"white", horizontal: "center"})}),
		]}),
		new Line({height:30, left:0, right:0, contents: [
			new Label({top: 0, left:0, right:0, height:20,  string:$.subtextForLabel, style:new Style({font:"14px Petala Pro Thin", color:"white"})}) ]}),
	]}),
	],
	behavior: $.myButtonBehaviour,
	skin: $.mySkin
}});

var backButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:100, left:0, top: 5, 
	skin: tealSkin,
	contents:[
		new Label({left:10, top:2, height:30,  string:"<", style:new Style({font:"38px Petala Pro", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove($.myView)
						}}
					})
}});
var statusLabel = new Label({left:0, right:0, height:20, top: 5, string:"status: not defrosting", style:new Style({font:"18px Petala Pro Thin", color:"black"})}),
var insideCompartment = Column.template(function($) { return {
  top:0, bottom:0, right:0, left:0, skin:whiteSkin,
			contents:[
				  new Line({left:0, right:0, top:0, height:50, skin:tealSkin, contents:[
				  	new backButtonTemplate({myView: this}),
				  	new Label({left:-170, right:0, height:30, top:10, string:"Compartment 1", style: new Style({font:"22px Petala Pro SemiLight", color:"white"})}), 
				  ]}),
				  new Line({top:10,  height:30, right:0, left:0, contents:[
				  	new Label({left:0, right:0, height:30, top:10, string:"Compartment Name", style: semilightStyle}), 
				  	]}),
				  new Line({top:20,  height:40, right:0, left:0, contents:[
				  	new Label({left:0, right:0, height:30, top:5, string:$.compName, style:textStyle}),
				  ]}),
				  	//new Label({left:0, right:0, height:30, top:5,  string:"Live Capture", style:new Style({font:"20px", color:"black"})}),
				  	//new Label({left:0, right:0, height:90, top: 5, string:"X", style:new Style({font:"50px", color:"black"})}),
				  new Line({top:10,  height:20, right:0, left:0, contents:[	
				  	new Label({left:0, right:0, height:20, top: 5,  string:"Temperature", style:semilightStyle}),
				  ]}),
				  new Line({top:5,  height:40, right:0, left:0, contents:[
				  	new Label({left:0, right:0, height:50, top: 5, string:$.currTemp + "\xB0" + "F", style:new Style({font:"50px Petala Pro", color:"black"})}),
				  ]}),
				  new Line({top:10,  height:20, right:0, left:0, contents:[
				  	statusLabel,
				  ]}),
				  new Line({top:10,  height:30, right:0, left:120, contents:[
				  	new defrostButtonTemplate(),
				  	//new Label({left:0, right:0, height:20, top: 5, string:"status: not defrosting", style:new Style({font:"18px Petala Pro Thin", color:"black"})}),
				  ]}),
				  new Line({top:15, height:30, right:0, left:0, contents:[	
				  	new Label({left:0, right:0, height:30, top: 5, string:"Items in Compartment", style: semilightStyle}),
				  ]}),
				  new Line({top:10, height: 30, right:0, left:0, contents:[	
				  	new Label({left:0, right:0, height:30, top: 5, string:$.foodName, style:textStyle}),
				  	new Label({right:0, left:0, height:30, top: 10, string:$.quantity, horizontal: "right", style:semilightStyle}),
				  ]}),
				  new Line({height: 20, top: 5, right:0, left:0, contents:[	
					new Label({right:133, left: 10, height:20, top: 0, string:"Expires in " + $.expirationDuration, style:new Style({font:"14px Petala Pro Thin", color:"black"})}),
				  ]}),
				  new Line({top:0, height: 30, right:0, left:0, contents:[	
				  	new Label({left:0, right:13, height:30, top: 5, string:"Tomatoes", style:textStyle}),
				  	new Label({right:0, left:0, height:30, top: 10, string:"5", horizontal: "right", style:semilightStyle}),
				  ]}),
				  new Line({height: 20, top: 5, right:0, left:0, contents:[	
					new Label({right:133, left: 10, height:20, top: 0, string:"Expires in " + "10 days", style:new Style({font:"14px Petala Pro Thin", color:"black"})}),
				  ]}),
				  new Line({top:0, height: 30, right:0, left:0, contents:[	
				  	new Label({left:0, right:43, height:30, top: 5, string:"Lettuce", style:textStyle}),
				  	new Label({right:10, left:0, height:30, top: 10, string:"1", horizontal: "right", style:semilightStyle}),
				  ]}),
				  new Line({height: 20, top: 5, right:0, left:0, contents:[	
					new Label({right:133, left: 10, height:20, top: 0, string:"Expires in " + "12 days", style:new Style({font:"14px Petala Pro Thin", color:"black"})}),
				  ]}),				
			] 	
}});

var compartmentSkin = new Skin({fill:"#B4C9CC", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}});
			//new Skin({fill:"#B4C9CC", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}});
var testSkin = new Skin({fill:"white", 
	//borders:{left:1, right:1, top:1, bottom:1, stroke:"black"}
	});
var mainBody = new Column({top:50, bottom:0, left:0, right:0, skin: testSkin, 
			contents:[
				new Line({height: 35, right:7, left:7, top: 10,skin: testSkin, contents: [
					new Label({left:0, right:0, top:0, bottom:0,  string: "Brian's Fridge", style:
					new Style({font:"22px Petala Pro Thin", color:"#5A6060"})}),	
				]}),
				new Line({name: "line1", top:0, bottom:0, right:7, left:7, skin: testSkin, contents: [
				//COMPARTMENT 1
					new compartmentButtonTemplate({name: "compartment1", mySkin: compartmentSkin, 
						width: 300, textForLabel: "Vegetables", subtextForLabel: "Expires: 2 months", 
					myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value:  function(button){
							topCompartment = new insideCompartment({compName: "Vegetables", quantity: "4", currTemp: "30", foodName: "Cucumbers", expirationDuration: "7 days"});
							application.add(topCompartment)
						}}
					})}), 
				]}),
				//COMPARTMENT 2
				new Line({name: "line2", top:0, bottom:0, right:7, left:7, skin: testSkin, contents: [
					new compartmentButtonTemplate({name: "compartment2", mySkin: compartmentSkin, width: 130, textForLabel: "Milk", subtextForLabel: "Expires: 2 months", 
					myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value:  function(button){
			
					}}
					})}), 
				//COMPARTMENT 3
					new compartmentButtonTemplate({name: "compartment3", mySkin: compartmentSkin, width: 130, textForLabel: "Meat", subtextForLabel: "Expires: 2 months", 
					myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value:  function(button){
	
					}}
					})}), 
				]}), 
				new Line({name: "line3", top:0, bottom:0, right:7, left:7, skin: testSkin, contents: [
				//COMPARTMENT 4
					new compartmentButtonTemplate({name: "compartment4", mySkin: compartmentSkin, 
						width: 300, textForLabel: "Steak", subtextForLabel: "Expires: 2 months", 
					myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value:  function(button){
							topCompartment = new insideCompartment({compName: "Soymilk", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "2 months"});
							topCompartment.add(new backButtonTemplate({myView: topCompartment}));
							application.add(topCompartment)
						}}
					})}), 
				]}),
				new Line({name: "line4", height: 100, right:7, left:7, bottom: 10, skin: testSkin, contents: [
				//COMPARTMENT 5
					new compartmentButtonTemplate({name: "compartment5", mySkin: compartmentSkin, width: 130, textForLabel: "Fish", subtextForLabel: "Expires: 2 months", 
					myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value:  function(button){
			
					}}
					})}), 
				//COMPARTMENT 6
					new compartmentButtonTemplate({name: "compartment6", mySkin: compartmentSkin, width: 130, textForLabel: "Cake", subtextForLabel: "Expires: 2 months", 
					myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value:  function(button){
	
					}}
					})}), 
				]}), 
				

			], 	
		});
		
var deviceURL = "";
Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		//trace(deviceURL);
		handler.invoke(new Message("/getResponse"));
	}
}));

Handler.bind("/getResponse", {
    onInvoke: function(handler, message){
        handler.invoke(new Message(deviceURL + "getUpdate"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	trace('response was ' + json.compartment1.items + '\n');
    	allItemsDict = json.allItemsDict,
    	itemDict1 = json.itemDict1,
    	itemDict2 = json.itemDict2,
    	itemDict3 = json.itemDict3,
    	itemDict4 = json.itemDict4,
    	itemDict5 = json.itemDict5,
    	itemDict6 = json.itemDict6,
    	trace(JSON.stringify(allItemsDict));
        handler.invoke( new Message("/getTempResponse"));
        application.distribute( "receiveItemReading", json );
    }
});

Handler.bind("/getTempResponse", {
    onInvoke: function(handler, message){
        handler.invoke(new Message(deviceURL + "getTempUpdate"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	trace('response was ' + temp1 + '\n');
    	temp1 = json.temp1,
    	temp2 = json.temp2,
    	temp3 = json.temp3,
    	temp4 = json.temp4,
    	temp5 = json.temp5,
    	temp6 = json.temp6,
    	trace(JSON.stringify(json));
    	var comp1temp = mainBody.line1.compartment1.col1.line1.nameTempLabel.string;
    	mainBody.line1.compartment1.col1.line1.nameTempLabel.string = comp1temp.substring(0, comp1temp.length - 4) + convert(temp1) + "\xB0" + "F";
    	var comp2temp = mainBody.line2.compartment2.col1.line1.nameTempLabel.string;
    	mainBody.line2.compartment2.col1.line1.nameTempLabel.string = comp2temp.substring(0, comp2temp.length - 4) + convert(temp2) + "\xB0" + "F";
       	var comp3temp = mainBody.line2.compartment3.col1.line1.nameTempLabel.string;
    	mainBody.line2.compartment3.col1.line1.nameTempLabel.string = comp3temp.substring(0, comp3temp.length - 4) + convert(temp3) + "\xB0" + "F";
    	var comp4temp = mainBody.line3.compartment4.col1.line1.nameTempLabel.string;
    	mainBody.line3.compartment4.col1.line1.nameTempLabel.string = comp4temp.substring(0, comp4temp.length - 4) + convert(temp4) + "\xB0" + "F";
    	var comp5temp = mainBody.line4.compartment5.col1.line1.nameTempLabel.string;
    	mainBody.line4.compartment5.col1.line1.nameTempLabel.string = comp5temp.substring(0, comp5temp.length - 4) + convert(temp5) + "\xB0" + "F";
    	var comp6temp = mainBody.line4.compartment6.col1.line1.nameTempLabel.string;
    	mainBody.line4.compartment6.col1.line1.nameTempLabel.string = comp6temp.substring(0, comp6temp.length - 4) + convert(temp6) + "\xB0" + "F";
        handler.invoke( new Message("/delay"));
        //application.distribute( "receiveTempReading", a );
    }
});

function convert(temp){
	if(parseInt(temp) < 10){
	return " " + parseInt(temp).toString();
	}else{
	return parseInt(temp).toString();}};

Handler.bind("/delay", {
    onInvoke: function(handler, message){
        handler.wait(1000); //will call onComplete after 1 seconds
    },
    onComplete: function(handler, message){
        handler.invoke(new Message("/getResponse"));
    }
});

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("alfridgedevice.app");
	},
	onQuit: function(application) {
		application.forget("alfridgedevice.app");
	},
})

application.behavior = new ApplicationBehavior();
application.add(topBar);
currentView = mainBody
application.add(currentView);