include("items.js");
include("groceryLists.js")
include("troubleshoot.js")
include("settings.js")
include("compartmentView.js")
var currentView = null;	
var BUTTONS = require('controls/buttons');
var THEME = require('themes/flat/theme');
var MODEL = require('mobile/model');
var SCREEN = require('mobile/screen');
var SCROLLER = require('mobile/scroller');
var THEME = require('themes/sample/theme');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var tealSkin = new Skin({fill:"#117384"});
var darkgreySkin = new Skin({fill:"#5A6060"});
var whiteSkin = new Skin({fill:"white"});
var separatorSkin = new Skin({ fill: 'silver',});
var titleStyle = new Style({font:"24px Petala Pro SemiLight", color:"white", horizontal: "center"});
var headerStyle = new Style({font:"18px Petala Pro Thin", color:"#5A6060",  horizontal: "center"});
var semilightStyle = new Style({font:"18px Petala Pro Thin", color:"black",  horizontal: "center"});
var textStyle = new Style({font:"20px Petala Pro Thin", color:"#5A6060", horizontal: "center"});

var sideBarPopped = false;
var notifButtonOn = true;
var addButtonOn = false;
var keyboardOn = false;

var allItemsDict = {
			"lettuce": {name: "lettuce", compartment: 1, expiration: 10,quantity:1},
			"tomatoes": {name: "tomatoes", compartment: 1, expiration: 1,quantity:5},
			"cucumbers": {name: "cucumbers", compartment: 1, expiration: 7,quantity:4},
			"milk": {name: "milk", compartment: 2, expiration: 14,quantity:3},
			"chicken thighs": {name: "chicken thighs", compartment: 3, expiration: 20,quantity:5},
			"chicken drumsticks": {name: "chicken drumsticks", compartment: 3, expiration: 5,quantity:4},
			"steak": {name: "steak", compartment: 4, expiration: 14,quantity:10},
			"salmon fillets": {name: "salmon fillets", compartment: 5, expiration: 20,quantity:5},
			"tilapia fillets": {name: "tilapia fillets", compartment: 5, expiration: 4,quantity:6},
			"shrimp": {name: "shrimp", compartment: 5, expiration: 20,quantity:12},
			"crab": {name: "crab", compartment: 5, expiration: 18,quantity:1},
			"scallops": {name: "scallops", compartment: 5, expiration: 19,quantity:24},
			"tuna steaks": {name: "tuna steaks", compartment: 5, expiration:11,quantity:3},
			"clams": {name: "clams", compartment: 5, expiration: 20,quantity:8},
			"cake": {name: "cake", compartment: 6, expiration: 3,quantity:1},
			"asparagus": {name: "asparagus", compartment: 1, expiration: 34,quantity:13},
			"carrots": {name: "carrots", compartment: 1, expiration: 23,quantity:3},
			"onions": {name: "onions", compartment: 1, expiration: 14,quantity:5},
			};
var comp1ItemsDict = {
			"lettuce": {name: "lettuce", compartment: 1, expiration: 10,quantity:1},
			"tomatoes": {name: "tomatoes", compartment: 1, expiration: 1,quantity:5},
			"cucumbers": {name: "cucumbers", compartment: 1, expiration: 7,quantity:4},
			"asparagus": {name: "asparagus", compartment: 1, expiration: 34,quantity:13},
			"carrots": {name: "carrots", compartment: 1, expiration: 23,quantity:3},
			"onions": {name: "onions", compartment: 1, expiration: 14,quantity:5},
			};
var comp2ItemsDict = {
			"milk": {name: "milk", compartment: 2, expiration: 14,quantity:3},
			};
var comp3ItemsDict = {
			"chicken thighs": {name: "chicken thighs", compartment: 3, expiration: 20,quantity:5},
			"chicken drumsticks": {name: "chicken drumsticks", compartment: 3, expiration: 5,quantity:4},
			};
var comp4ItemsDict = {
			"steak": {name: "steak", compartment: 4, expiration: 14,quantity:10},
			};
var comp5ItemsDict = {
			"salmon fillets": {name: "salmon fillets", compartment: 5, expiration: 20,quantity:5},
			"tilapia fillets": {name: "tilapia fillets", compartment: 5, expiration: 4,quantity:6},
			"shrimp": {name: "shrimp", compartment: 5, expiration: 20,quantity:12},
			"crab": {name: "crab", compartment: 5, expiration: 18,quantity:1},
			"scallops": {name: "scallops", compartment: 5, expiration: 19,quantity:24},
			"tuna steaks": {name: "tuna steaks", compartment: 5, expiration:11,quantity:3},
			"clams": {name: "clams", compartment: 5, expiration: 20,quantity:8},
			};
var comp6ItemsDict = {
			"cake": {name: "cake", compartment: 6, expiration: 3,quantity:1},};
			
var itemsDictList = [null, comp1ItemsDict, comp2ItemsDict, comp3ItemsDict, comp4ItemsDict, comp5ItemsDict, comp6ItemsDict]
var temp1 = 31;
var temp2 = 24;
var temp3 = 0;
var temp4 = 32;
var temp5 = 27;
var temp6 = 32;

//these statuses state whether specific compartments are defrosting or not.
var compartmentStatusStrings = [null, "status: not defrosting", "status: not defrosting", "status: not defrosting", "status: not defrosting", "status: not defrosting", "status: not defrosting"];
var defrostButtonStrings = [null, "defrost", "defrost", "defrost", "defrost", "defrost", "defrost"];

var sideMenuButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:40, left:10, 
	skin: tealSkin,
	contents:[
		new Picture({left:0, width:40, height: 30, url: "assets/menu-icon.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			KEYBOARD.hide();
			application.focus();
			if (sideBarPopped) {
				application.remove(sideBar);
				sideBarPopped = false;
			} else {
				sideBarPopped = true;
				application.add(sideBar);
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
		new Picture({right:5, width:30, height: 30, url: "assets/bell-icon.png"}),
	],
	behavior:Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						trace("notification button tapped")
						
						}}
					}),
}});
var outlineSkin = new Skin({fill: "white", borders:{left:2, right:2, top:2, bottom:2, stroke:"black"}});
var subviewButtonTemplate = BUTTONS.Button.template(function($){ return{
	left: 0, right:0, height: 45,top: $.top,
	skin: darkgreySkin,
	contents:[
		
		new Picture({width: 25, left:22, height:25, url: $.url}),
		new Label({left:63, height:30,  string:$.textForLabel, style:new Style({font:"20px Petala Pro Thin", color:"white"})})
	],
	behavior: $.myBehavior
}});
var notificationButton = new notificationButtonTemplate();

var topBar = new Line({left:0, right:0, top:0, height:50, skin:tealSkin, 
			contents:[
				new Column({width: 50, top:10, bottom:0, contents:[
					new sideMenuButtonTemplate()]}),
				new Column({name: "headerCol", left:0, right:0, top:7, bottom:0, contents:[
					new Label({left:10, top:8, string: "Alfridge", style: titleStyle, name: "currentView" }),]}),
				new Column({name: "notifButton",left:0, right:0, top:6, bottom:0, contents:[]}),
			], 	
		});
		


topBar.notifButton.add(notificationButton);

highlight = new Column({width: 5, left:0, top:0, bottom:0, skin: tealSkin});
highlightedButton = null;

function resetHighlight(button) {
	if (highlightedButton == "homeButton") {
		homeButton.remove(highlight)
	}
	if (highlightedButton == "itemsButton") {
		itemsButton.remove(highlight)
	}
	if (highlightedButton == "gListButton") {
		gListButton.remove(highlight)
	}
	if (highlightedButton == "troubleshootButton") {
		troubleshootButton.remove(highlight)
	}
	if (highlightedButton == "settingsButton") {
		settingsButton.remove(highlight)
	}
}

var homeButton = new subviewButtonTemplate({textForLabel:"Home", 
				url: "assets/home-icon.png", top:5,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						resetHighlight(highlightedButton);
						highlightedButton = "homeButton";
						content.add(highlight);
						topBar.headerCol.currentView.string = "Alfridge"
						application.remove(currentView);
						currentView = mainBody;
						application.remove(sideBar);
						if (addButtonOn){
						topBar.notifButton.remove(newListButton);
						addButtonOn = false;
						}
						if (!notifButtonOn){
						topBar.notifButton.add(notificationButton);
						notifButtonOn = true;
						}
						if(suggestionsOn){
						application.remove(suggestionsHeader);
						application.remove(suggestionsFooter);
						suggestionsOn = false;
						}
						sideBarPopped = false;
						application.add(currentView);
						
						}}
					})}),

var itemsButton = new subviewButtonTemplate({textForLabel:"Items", name:"itemsButton", 
				url: "assets/items-icon.png",  top:0,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						resetHighlight(highlightedButton);
						highlightedButton = "itemsButton";
						content.add(highlight);
						topBar.headerCol.currentView.string = "Items";
						application.remove(topBar);
						itemsMainBody = new itemsListTemplate();
						itemsMainBody.add(new itemsTabs());
						itemsOnScreen = [];
						ListBuilder(allItemsDict, true);
						application.replace(currentView, itemsMainBody);
						if (addButtonOn){
						topBar.notifButton.remove(newListButton);
						addButtonOn = false;
						}
						if (notifButtonOn){
						topBar.notifButton.remove(notificationButton);
						notifButtonOn = false;
						}
						if(suggestionsOn){
						application.remove(suggestionsHeader);
						application.remove(suggestionsFooter);
						suggestionsOn = false;
						}
						application.add(topBar);
						currentView = itemsMainBody;
						application.remove(sideBar);
						sideBarPopped = false;

						
						}}
					})})
					
var gListButton = new subviewButtonTemplate({textForLabel:"Grocery Lists", name:"groceryListsButton",
				url: "assets/groceries-icon.png", top:0,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						resetHighlight(highlightedButton);
						highlightedButton = "gListButton";
						content.add(highlight);
						topBar.headerCol.currentView.string = "Grocery Lists";
						application.remove(topBar);
						listsOnScreen = [];
						groceryMainBody = new groceryListTemplate();
						currTime = parseInt(new Date().getTime() / 1000);
						bubbleSortGroceryLists();
						groceryListBuilder(groceryList, true);
						application.replace(currentView, groceryMainBody);
						if (notifButtonOn){
						topBar.notifButton.remove(notificationButton);
						notifButtonOn = false;
						}
						if(suggestionsOn){
						application.remove(suggestionsHeader);
						application.remove(suggestionsFooter);
						suggestionsOn = false;
						}
						if (!addButtonOn){
						topBar.notifButton.add(newListButton);
						addButtonOn = true;}
						notifButtonOn = false;
						currentView = groceryMainBody;
						application.add(topBar);
						application.remove(sideBar);
						sideBarPopped = false;

						}}
					})}),
					
var troubleshootButton = new subviewButtonTemplate({textForLabel:"Troubleshoot", name:"troubleshoot",
				url: "assets/troubleshoot-icon.png", top:0,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						resetHighlight(highlightedButton);
						highlightedButton = "troubleshootButton";
						content.add(highlight);
						topBar.headerCol.currentView.string = "Troubleshoot"
						application.remove(currentView);
						currentView = troubleshootMainBody;
						if (addButtonOn){
						topBar.notifButton.remove(newListButton);
						addButtonOn = false;
						}
						if (notifButtonOn){
						topBar.notifButton.remove(notificationButton);
						notifButtonOn = false;
						}
						if(suggestionsOn){
						application.remove(suggestionsHeader);
						application.remove(suggestionsFooter);
						suggestionsOn = false;
						}
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
				
						}}
					})}),

var settingsButton = new subviewButtonTemplate({textForLabel:"Settings",
				url: "assets/settings-icon.png", top:245,
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						resetHighlight(highlightedButton);
						highlightedButton = "settingsButton";
						content.add(highlight);
						topBar.headerCol.currentView.string = "Settings"
						application.remove(currentView);
						if (addButtonOn){
						topBar.notifButton.remove(newListButton);
						addButtonOn = false;
						}
						if (notifButtonOn){
						topBar.notifButton.remove(notificationButton);
						notifButtonOn = false;
						}
						if(suggestionsOn){
						application.remove(suggestionsHeader);
						application.remove(suggestionsFooter);
						suggestionsOn = false;
						}
						currentView = settingsMainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
						
						}}
					})}),
					
var sideBar = new Column({left:0, width:230 , top:50, bottom:0,  skin:darkgreySkin,  
			contents:[
			], 	
		});
		
sideBar.add(homeButton)
sideBar.add(itemsButton)
sideBar.add(gListButton)
sideBar.add(troubleshootButton)
sideBar.add(settingsButton)
		


var compartmentButtonTemplate = BUTTONS.Button.template(function($){ return{
	name: $.name, width:$.width, top: 4, left: 4, right: 4, bottom: 4, height:100,
	contents:[ 
		new Column({name: "col1", height: 80, left:0, right:0, contents:[
			new Line({name: "line1", height:50, right:0, left:0, contents: [
				new Label({name: "nameTempLabel", top: 15, left:0, right:0, height:45, string:$.textForLabel + "  " + $.temp.toString() + "\xB0" + "F", style:new Style({font:"28px Petala Pro Thin", color:"white", horizontal: "center"})}),
		]}),
		new Line({height:30, left:0, right:0, contents: [
			new Label({top: 0, left:0, right:0, height:20,  string:$.subtextForLabel, style:new Style({font:"14px Petala Pro Thin", color:"white"})}) ]}),
	]}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value:  function(button){
							application.remove(currentView);
							compartmentView = new compartmentListTemplate();
							switch($.compNumber) {
							    case 1:
       								compartmentListBuilder(comp1ItemsDict);
       								temp = temp1;
       								break;
       							case 2:
       								compartmentListBuilder(comp2ItemsDict);
       								temp = temp2;
       								break;    
       							case 3:
       								compartmentListBuilder(comp3ItemsDict);
       								temp = temp3;
       								break;  
       							case 4:
       								compartmentListBuilder(comp4ItemsDict);
       								temp = temp4;
       								break;   
       							case 5:
       								compartmentListBuilder(comp5ItemsDict);
       								temp = temp5;
       								break;    
       							case 6:
       								compartmentListBuilder(comp6ItemsDict);
       								temp = temp6;
       								break;           								       								      								       								   							 
							}
							topCompartment = new insideCompartment({compNumber: $.compNumber, compName: $.textForLabel, currTemp: temp});
							currentView = compartmentView;
							application.add(compartmentView);
							application.add(topCompartment);
						}}
					}),
	skin: $.mySkin
}});

var compartmentSkin = new Skin({fill:"#B4C9CC", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}});
var testSkin = new Skin({fill:"white", 
	});
var mainBody = new Column({top:50, bottom:0, left:0, right:0, skin: testSkin, 
			contents:[
				new Line({height: 35, right:7, left:7, top: 10,skin: testSkin, contents: [
					new Label({left:0, right:0, top:0, bottom:0,  string: "Brian's Refrigerator ", style:
					new Style({horizontal: "center",font:"22px Petala Pro Thin", color:"#5A6060"})}),	
				]}),
				new Line({name: "line1", top:0, bottom:0, right:7, left:7, skin: testSkin, contents: [
				//COMPARTMENT 1
					new compartmentButtonTemplate({name: "compartment1", mySkin: new Skin({fill:"#c0d5d8", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}}), 
						width: 300, textForLabel: "Vegetables", subtextForLabel: "Expires: 2 months", compNumber: 1, temp: temp1, }), 
				]}),
				//COMPARTMENT 2
				new Line({name: "line2", top:0, bottom:0, right:7, left:7, skin: testSkin, contents: [
					new compartmentButtonTemplate({name: "compartment2", mySkin: new Skin({fill:"#bcd0d3", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}}), 
						width: 130, textForLabel: "Milk", subtextForLabel: "Expires: 2 months", compNumber: 2, temp: temp2, }), 
				//COMPARTMENT 3
					new compartmentButtonTemplate({name: "compartment3", mySkin: new Skin({fill:"#cce2e5", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}}), 
						width: 130, textForLabel: "Meat", subtextForLabel: "Expires: 2 months", compNumber: 3, temp: temp3, }), 
				]}), 
				new Line({name: "line3", top:0, bottom:0, right:7, left:7, skin: testSkin, contents: [
				//COMPARTMENT 4
					new compartmentButtonTemplate({name: "compartment4", mySkin: new Skin({fill:"#aabcbf", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}}), 
						width: 300, textForLabel: "Steak", subtextForLabel: "Expires: 2 months", compNumber: 4, temp: temp4, }), 
				]}),
				new Line({name: "line4", height: 100, right:7, left:7, bottom: 10, skin: testSkin, contents: [
				//COMPARTMENT 5
					new compartmentButtonTemplate({name: "compartment5", mySkin: new Skin({fill:"#cce2e5", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}}), 
						width: 130, textForLabel: "Fish", subtextForLabel: "Expires: 2 months", compNumber: 5, temp: temp5, }), 
				//COMPARTMENT 6
					new compartmentButtonTemplate({name: "compartment6", mySkin: new Skin({fill:"#B4C9CC", borders:{left:2, right:2, top:2, bottom:2, stroke:"#F0FFFF"}}), 
						width: 130, textForLabel: "Cake", subtextForLabel: "Expires: 2 months", compNumber: 6, temp: temp6, }), 
				]}),], 	
		});
		
var deviceURL = "";
Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		handler.invoke(new Message("/getResponse"));
	}
}));

Handler.bind("/getResponse", {
    onInvoke: function(handler, message){
        handler.invoke(new Message(deviceURL + "getUpdate"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	allItemsDict = json.allItemsDict,
    	comp1ItemsDict = json.itemDict1,
    	comp2ItemsDict = json.itemDict2,
    	comp3ItemsDict = json.itemDict3,
    	comp4ItemsDict = json.itemDict4,
    	comp5ItemsDict = json.itemDict5,
    	comp6ItemsDict = json.itemDict6,
        handler.invoke( new Message("/getTempResponse"));
        application.distribute( "receiveItemReading", json );
    }
});

Handler.bind("/getTempResponse", {
    onInvoke: function(handler, message){
        handler.invoke(new Message(deviceURL + "getTempUpdate"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	temp1 = convert(json.temp1),
    	temp2 = convert(json.temp2),
    	temp3 = convert(json.temp3),
    	temp4 = convert(json.temp4),
    	temp5 = convert(json.temp5),
    	temp6 = convert(json.temp6),
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

currentView = mainBody
application.add(currentView);
application.add(topBar);