include("items.js");
include("troubleshoot.js");
include("groceryLists.js");


var currentView = null;	
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var greySkin = new Skin({fill:"#C0C0C0"});
var darkgreySkin = new Skin({fill:"#808080"});
var whiteSkin = new Skin({fill:"white"});
var buttonSkin = new Skin({
	fill:"white", 
	borders:{left:3, right:3, top:3, bottom:3}, 
	stroke:"black"});
var titleStyle = new Style({font:"20px", color:"black"});
var sideBarPopped = false;

var sideMenuButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:30, left:10, 
	skin: greySkin,
	contents:[
		new Label({left:0, right:0, height:30,  string:$.textForLabel, style:new Style({font:"40px", color:"black"})})
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



var subviewButtonTemplate = BUTTONS.Button.template(function($){ return{
	left: 10, height: 30, width:140,  top: $.myTop,
	skin: darkgreySkin,
	contents:[
		new Label({left:0, height:30,  string:$.textForLabel, style:new Style({font:"20px", color:"white"})})
	],
	behavior: $.myBehavior
}});

var topBar = new Container({left:0, width:320, top:0, height:40, skin:greySkin, 
			contents:[
				new sideMenuButtonTemplate({textForLabel:"="}),
				new Label({left:45, top:10, string: "Alfridge", style: titleStyle, name: "currentView" }),
				new Label({left:250, right:0, top:10, string: "TShoot", style: titleStyle }),
			], 	
		
		});

	
var sideBar = new Container({left:0, width:160 , top:40, bottom:0,  skin:darkgreySkin, 
			contents:[
				new subviewButtonTemplate({textForLabel:"Home", myTop:10, 
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.currentView.string = "Alfridge"
						application.remove(currentView);
						currentView = mainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
						}}
					})}),
				new subviewButtonTemplate({textForLabel:"Items", myTop:50, 
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.currentView.string = "Items"
						application.remove(currentView);
						currentView = itemsMainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
						
						}}
					})}),
				new subviewButtonTemplate({textForLabel:"Grocery Lists", myTop:90, 
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.currentView.string = "Grocery Lists"
						application.remove(currentView);
						currentView = groceryListsMainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
						}}
					})}),
				new subviewButtonTemplate({textForLabel:"Troubleshoot", myTop:130, 
				myBehavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						topBar.currentView.string = "Troubleshoot"
						application.remove(currentView);
						currentView = troubleshootMainBody;
						application.remove(sideBar);
						sideBarPopped = false;
						application.add(currentView);
						}}
					})}),
				
			], 	
		});


var compartmentButtonTemplate = BUTTONS.Button.template(function($){ return{
	 width:$.myWidth, top: $.myTop, left: $.myLeft, right: $.myRight, height:$.myHeight,
	contents:[
		new Label({left:0, right:0, height:30, string:$.textForLabel, style:new Style({font:"20px", color:"black"})}),
		new Label({left:0, right:0, bottom: $.myBottom, height:20,  string:$.subtextForLabel, style:new Style({font:"10px", color:"black"})})
	],
	behavior: $.myButtonBehaviour,
	skin: buttonSkin
}});

var backButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:100, left:0, top: 5, 
	skin: greySkin,
	contents:[
		new Label({left:10, height:30,  string:"<", style:new Style({font:"40px", color:"black"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove($.myView)
						}}
					})
}});

var insideCompartment = Container.template(function($) { return {
  top:0, bottom:0, skin:whiteSkin,
			contents:[
				  new Container({left:0, width:320, top:0, height:40, skin:greySkin }),
				  new Label({left:0, right:0, height:30, top:45, string:"Compartment Name", style:new Style({font:"20px", color:"black"})}),
				  new Label({left:0, right:0, height:30, top:85, string:$.compName, style:new Style({font:"16px", color:"black"})}),
				  new Label({left:0, right:0, height:30, top:120,  string:"Live Capture", style:new Style({font:"20px", color:"black"})}),
				  new Label({left:0, right:0, height:90, top: 160, string:"X", style:new Style({font:"50px", color:"black"})}),
				  new Label({left:0, right:0, height:30, top: 260,  string:"Temperature", style:new Style({font:"20px", color:"black"})}),
				  new Label({left:0, right:0, height:30, top: 295, string:$.currTemp, style:new Style({font:"20px", color:"black"})}),
				  new Label({left:0, right:0, height:30, top: 340, string:"Items in Compartment", style:new Style({font:"20px", color:"black"})}),
				  new Label({left:10, height:30, top: 375, string:$.foodName, style:new Style({font:"20px", color:"black"})}),
				  new Label({right:25, height:30, top: 385, string:$.quantity, style:new Style({font:"30px", color:"black"})}),
				  new Label({left:10, height:30, top: 410, string:"Expires in " + $.expirationDuration, style:new Style({font:"16px", color:"black"})}),
			] 	
}});

var mainBody = new Container({top:40, bottom:0, skin:whiteSkin, 
			contents:[
				new Label({left:0, right:0, top:10,  string: "Brian's Fridge", style: titleStyle }),
				new compartmentButtonTemplate({myBottom: 20, myHeight: 100, myTop: 40, myLeft: 10, myRight: 10, myWidth: 300, textForLabel: "Soymilk", subtextForLabel: "Expires: 2 months", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "Soymilk", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "2 months"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 12, myHeight: 80, myTop: 150, myLeft: 10, myRight: 165, myWidth: 130, textForLabel: "Beef", subtextForLabel: "Expires: 2 months", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
		
				}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 12,myHeight: 80, myTop: 150, myLeft: 165, myRight: 10, myWidth: 130, textForLabel: "Pork", subtextForLabel: "Expires: 2 months", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
		
				}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 7,myHeight: 70, myTop: 240, myLeft: 10, myRight: 10, myWidth: 300, textForLabel: "Chicken", subtextForLabel: "Expires: 2 months", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
				
				}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 12,myHeight: 80, myTop: 320, myLeft: 10, myRight: 165, myWidth: 130, textForLabel: "Soymilk", subtextForLabel: "Expires: 2 months", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
				
				}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 12,myHeight: 80, myTop: 320, myLeft: 165, myRight: 10, myWidth: 130, textForLabel: "Soymilk", subtextForLabel: "Expires: 2 months", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
				
				}}
				})}), 
			], 	
		});


application.add(topBar);
currentView = mainBody
application.add(currentView);