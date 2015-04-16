var currentView = null;	
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var SCREEN = require('mobile/screen');
var SCROLLER = require('mobile/scroller');
var greySkin = new Skin({fill:"#C0C0C0"});
var darkgreySkin = new Skin({fill:"#808080"});
var whiteSkin = new Skin({fill:"white"});
var buttonSkin = new Skin({
	fill:"#F0F0F0", 
	borders:{left:3, right:3, top:3, bottom:3}, 
	stroke:"black"});
var searchStyle = new Style({font:"20px", color:"black"});
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

var sideMenuButtonTemplateRight = BUTTONS.Button.template(function($){ return{
	height: 30, width:30, right:10, 
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
				new Label({left:45, top:10, string: "Grocery Lists", name: "currentView" }),
				new sideMenuButtonTemplateRight({textForLabel:"+"}),
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
		new Label({left:40, bottom: $.myBottom-10, height:10,  string:$.textForLabel, style:new Style({font:"20px", color:"black"})}),
		new Label({left:40, bottom: $.myBottom-30, height:20, string:$.subtextForLabel, style:new Style({font:"10px", color:"black"})}),
		
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
				  new Label({left:10, height:30, top: 410, string:"Updated " + $.expirationDuration, style:new Style({font:"16px", color:"black"})}),
			] 	
}});


var seaLabel=new Label({left:80,  top:5, editable:true, string: "Search:", style: searchStyle });

var searchField = new Label({
    left:200, right:0, top:5, editable:true, active:true, style:searchStyle,
	behavior : CONTROL.FieldLabelBehavior({
        onDisplaying : function(container) {
            container.focus();
        },
    }),
    string:""
});


var XButton = BUTTONS.Button.template(function($){ return{
	 width:0, top: 0, left: 40, right: 300, height:30,
	contents:[
		new Label({left:0, right:0, top:0,bottom: 0, height:20,  string:"X", style:new Style({font:"20px", color:"black"})}),	
	],
	skin: buttonSkin,

}});

var mainCon = Container.template(function($) { return {
    left:0, right:0, top:10,
    skin: whiteSkin,
    contents:[
    	seaLabel,
    	new XButton(),
    	
        Scroller($, {
            left: 0, right: 165, top: 0, active: true,
            behavior: SCROLLER.VerticalScrollerBehavior,
            contents: [
                searchField,
                
            ]
        }),
        
    ]
}});

var groceryListsMainBody = new Container({top:40, bottom:0, skin:whiteSkin, 
			contents:[
				mainCon({}),
				//new Label({left:0, right:190, top:15,  string: "X  Search...", style: searchStyle }),
				new compartmentButtonTemplate({myBottom: 50, myHeight: 70, myTop: 50, myLeft: 10, myRight: 10, myWidth: 350, textForLabel: "Trader Joe's", subtextForLabel: "Updated 3 hours ago", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "Trader Joe's", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "3 hours ago"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 50, myHeight: 70, myTop: 107, myLeft: 10, myRight: 10, myWidth: 350, textForLabel: "Costco", subtextForLabel: "Updated 3 hours ago", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "Costco", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "3 hours ago"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 50, myHeight: 70, myTop: 159, myLeft: 10, myRight: 10, myWidth: 350, textForLabel: "Walgreens", subtextForLabel: "Updated 3 hours ago", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "Walgreens", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "3 hours ago"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 50, myHeight: 70, myTop: 211, myLeft: 10, myRight: 10, myWidth: 350, textForLabel: "Safeway", subtextForLabel: "Updated 3 hours ago", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "Safeway", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "3 hours ago"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 50, myHeight: 70, myTop: 263, myLeft: 10, myRight: 10, myWidth: 350, textForLabel: "Trader Joe's", subtextForLabel: "Updated 3 hours ago", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "Trader Joe's", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "3 hours ago"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 50, myHeight: 70, myTop: 315, myLeft: 10, myRight: 10, myWidth: 350, textForLabel: "BBQ Party", subtextForLabel: "Updated 3 hours ago", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "BBQ Party", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "3 hours ago"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
				new compartmentButtonTemplate({myBottom: 50, myHeight: 70, myTop: 367, myLeft: 10, myRight: 10, myWidth: 350, textForLabel: "Trader Joe's", subtextForLabel: "Updated 3 hours ago", 
				myButtonBehaviour: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(button){
						topCompartment = new insideCompartment({compName: "Trader Joe's", quantity: "10", currTemp: "0", foodName: "Soymilk", expirationDuration: "3 hours ago"});
						topCompartment.add(new backButtonTemplate({myView: topCompartment}));
						application.add(topCompartment)
					}}
				})}), 
				
			], 	
		});