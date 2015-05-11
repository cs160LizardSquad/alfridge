var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');

/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});



var backButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 45, width:100, left:0, top: 5, 
	skin: tealSkin,
	contents:[
		new Picture({left:15, top:6, width:25, height: 25, url: "assets/back-icon.png"})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove($.myView)
						application.remove(compartmentView)
						application.add(mainBody);
						currentView = mainBody;
						}}
					})
}});

var defrostButtonTemplate = BUTTONS.Button.template(function($){ return{
	top:0, right:60, height: 30, width:80,
	skin: tealSkin,
	contents:[
		new Label({name: "defrostLabel", height:30, width:70, string: $.buttonString, style: new Style({font:"20px Petala Pro SemiLight", color:"white"})}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if(content.defrostLabel.string == "defrost"){
				content.invoke(new Message(deviceURL + "defrost" + $.compNumber), Message.JSON);
				content.defrostLabel.string = "stop";
				compartmentStatusStrings[$.compNumber] = "status: defrosting";
				defrostButtonStrings[$.compNumber] = "stop";
				topCompartment.statusLine.first.string = "status: defrosting";
			}else{
				content.invoke(new Message(deviceURL + "stop_defrost" + $.compNumber), Message.JSON);
				content.defrostLabel.string = "defrost";
				compartmentStatusStrings[$.compNumber] = "status: not defrosting";
				defrostButtonStrings[$.compNumber] = "defrost";
				topCompartment.statusLine.first.string = "status: not defrosting";
			}
		}},
		onComplete: { value: function(content, message, json){
		}}   
		
	})
}});

var compartmentScreenContainer = Container.template(function($) { return {
	name: "list", left:0, right:0, top:0, bottom:0, skin: new Skin({fill: "white"}),
	contents: [
	   		/* Note that the scroller is declared as having only an empty
	   		 * Column and a scrollbar.  All the entries will be added 
	   		 * programmatically. */ 
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, {top:0 }),
              			]
	   		})
	   		]
	}});
	
var compartmentView = null;
var compartmentData = new Object();
var compartmentListTemplate = Container.template(function($) { return { 
 right:0, left:0, top:310, bottom:0, contents: [
   new compartmentScreenContainer(compartmentData)
  ]
}});

var statusLabel = Label.template(function($){ return{
left:0, right:0, height:20, top: 5, string:$.string, style:new Style({horizontal: "center",font:"18px Petala Pro Thin", color:"#5A6060"})
}});

var insideCompartment = Column.template(function($) { return {
  top:0, height:310, right:0, left:0, skin:whiteSkin,
			contents:[
				  new Line({left:0, right:0, top:0, height:50, skin:tealSkin, contents:[
				  	new backButtonTemplate({myView: this}),
				  	new Label({left:-170, right:0, height:30, top:11, string:"Compartment " + $.compNumber, style: new Style({horizontal: "center", font:"23px Petala Pro SemiLight", color:"white"})}), 
				  ]}),
				  new Line({top:10, height:30, right:0, left:0, contents:[
				  	new Label({left:0, right:0, height:30, top:10, string:"Compartment Name", style: headerStyle}), 
				  	]}),
				  new Line({ left: 0, right: 0, top: 6, height: 1, skin: new Skin({fill: "silver"}), }),
				  new Line({top:2,  height:40, right:0, left:0, contents:[
				  	new Label({left:0, right:0, height:30, top:5, string:$.compName, style:new Style({font:"18px Petala Pro Thin", color:"#5A6060", horizontal: "center"})}),
				  ]}),
				  new Line({top:10,  height:20, right:0, left:0, contents:[	
				  	new Label({left:0, right:0, height:20, top: 5,  string:"Temperature", style: headerStyle}),
				  ]}),
				  new Line({ left: 0, right: 0, top: 6, height: 1, skin: new Skin({fill: "silver"}), }),
				  new Line({ name: "statusLine", left: 15, right: 15, top: 6, contents:[new statusLabel({string: compartmentStatusStrings[$.compNumber]}),
					] }),
				  new Line({top:5,  height:50, right:0, left:0, contents:[
				  	new Column({top:0, bottom:0, right:0, left:0, contents:[
				  		new Label({right:-30, top:0, bottom:0, string:$.currTemp + "\xB0" + "F", style:new Style({horizontal: "right",font:"50px Petala Pro", color:"#5A6060"})}),
				  	]}),
				  	new Column({top:0, botttom:0, right:0, left:0, contents:[
				  			new Container({right:0, left:0, top:0, height:10}),
				  			new defrostButtonTemplate({compNumber: $.compNumber, buttonString: defrostButtonStrings[$.compNumber]}),
				  			new Container({right:0, left:0, top:0, bottom:0}), ]}),
				  ]}),
				  new Line({top:13, height:30, right:0, left:0, contents:[	
				  	new Label({left:0, right:0, height:30, top: 5, string:"Items in Compartment", style: headerStyle}),
				  ]}),
				  new Line({ left: 0, right: 0, top: 4, height: 1, skin: new Skin({fill: "silver"}), }),		
			] 	
}});

var itemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {
    	/* Gives the user some visual feedback on which entry they have tapped.
    	 * note that the skin is reverted to white in onTouchEnded() */    	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
		}}
    }),
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 52, 
     			contents: [
     			           Label($, { left: 20, style: productNameStyle, string: $.name,}),
     			           Label($, { left:20, style: expirationStyle, string: "Expires in " + $.expiration + " days",}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     	Column($, { width:100, contents: [
     		Container($, { left: -17, right: 0, height: 52, 
     			contents: [
     			           Label($, {  style: new Style({ font: '34px Petala Pro Thin',  color: '#5A6060', horizontal: 'right', lines: 1, }), string: $.quantity}),
     			           Label($, {  style: new Style({  font: '18px Petala Pro Thin',  color: '#5A6060', right:-55, top: 5,lines: 1, }), string: "ct"}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     	
     	
     ], 
 }});
 
function compartmentListBuilder(dict) {
	for (var key in dict){
		if (dict.hasOwnProperty(key)) {
			compartmentView.list.first.menu.add(new itemLine(dict[key]));
		}
	}
}