var THEME = require('themes/sample/theme');
//include("main.js");
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');

/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
//var graySkin	= new Skin({ fill: '#a7a9ab'});
//var darkGraySkin = new Skin({ fill: '#7f7f7f'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});
var fieldStyle = new Style({ color: "#5A6060", font: '18px Petala Pro Thin', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var changeStyle = new Style({ color: '#aaa', font: '10px', horizontal: 'center', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray', fill:'white'});

var backButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 45, width:100, left:0, top: 5, 
	skin: tealSkin,
	contents:[
		new Picture({left:15, top:6, width:25, height: 25, url: "assets/back-icon.png"})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						KEYBOARD.hide();
     			 		content.focus();
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
		new Label({name: "defrostLabel", height:30, width:70, string: "defrost", style: new Style({font:"20px Petala Pro SemiLight", color:"white"})}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
		content.defrostLabel.string = "stop";
		statusLabel.string = "defrosting";
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

var compartmentScreenContainer = Container.template(function($) { return {
	name: "list", left:0, right:0, top:0, bottom:0, skin: new Skin({fill: "white"}),
	contents: [
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

var compartmentTitleField = Line.template(function($) { return { 
 left: 0, right: 0, height: 40, top: 100, active: true, skin: nameInputSkin, 
 	contents: [
    Scroller($, { 
      left: 20, right: 0, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, {
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true,  string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
    		onTouchEnded: { value: function() {	
     			KEYBOARD.show();
			}},
         		onEdited: { value: function(label){
         			var data = this.data;
              		data.name = label.string;
              		//label.container.hint.visible = ( data.name.length == 0 );	
              		if (data.name != "Tap to change title") {
              			trace(customisedTitlesOn);
              			customisedTitlesOn = true;
              			titlebut.label.string= data.name
              			switch($.compNumber) {
							    case 1:
       								mainBody.line1.compartment1.col1.line1.nameTempLabel.string = data.name
       								compartmentNamesArray[0] = data.name
       								break;
       							case 2:
       								mainBody.line2.compartment2.col1.line1.nameTempLabel.string = data.name
       								compartmentNamesArray[1] = data.name
       								break;    
       							case 3:
       								mainBody.line2.compartment3.col1.line1.nameTempLabel.string = data.name
       								compartmentNamesArray[2] = data.name
       								break;  
       							case 4:
       								mainBody.line3.compartment4.col1.line1.nameTempLabel.string = data.name
       								compartmentNamesArray[3] = data.name
       								break;   
       							case 5:
       								mainBody.line4.compartment5.col1.line1.nameTempLabel.string = data.name
       								compartmentNamesArray[4] = data.name
       								break;    
       							case 6:
       								mainBody.line4.compartment6.col1.line1.nameTempLabel.string = data.name
       								compartmentNamesArray[5] = data.name
       								break; 
       					}
              		}
         		}}
         	}),
         }),
  
      ]
    }),
  ]
}})

var newTitleField = null;
var titlebut; 
var compTitleButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 20, left:0, right:0, top: 5, 
	skin: whiteSkin,
	contents:[
		new Label({left:0, right:0, height:30, top:5, string:$.title, style:new Style({font:"18px Petala Pro Thin", color:"#5A6060", horizontal: "center" }), name:"label"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						newTitleField = new compartmentTitleField({name:"Tap to change title", compNumber: $.compNumber,})
						application.add(newTitleField)
						}}
					})
}});

var insideCompartment = Column.template(function($) { return {
  top:0, height:310, right:0, left:0, skin:whiteSkin, active:true,
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
				  		 titlebut = new compTitleButtonTemplate({title:compartmentNamesArray[$.compNumber-1], compNumber: $.compNumber})
					]}),
				  	//new Label({left:0, right:0, height:30, top:5,  string:"Live Capture", style:new Style({font:"20px", color:"black"})}),
				  	//new Label({left:0, right:0, height:90, top: 5, string:"X", style:new Style({font:"50px", color:"black"})}),
				  new Line({top:10,  height:20, right:0, left:0, contents:[	
				  	new Label({left:0, right:0, height:20, top: 5,  string:"Temperature", style: headerStyle}),
				  ]}),
				  new Line({ left: 0, right: 0, top: 6, height: 1, skin: new Skin({fill: "silver"}), }),
				  new Line({ left: 15, right: 15, top: 6, contents:[new statusLabel({string: "status: not defrosting"}),] }),
				  new Line({top:5,  height:50, right:0, left:0, contents:[
				  	new Column({top:0, bottom:0, right:0, left:0, contents:[
				  		new Label({right:-30, top:0, bottom:0, string:$.currTemp + "\xB0" + "F", style:new Style({horizontal: "right",font:"50px Petala Pro", color:"black"})}),
				  	]}),
				  	new Column({top:0, botttom:0, right:0, left:0, contents:[
				  	/*
				  		new Line({height:20, right:0, left:0, contents:[new statusLabel({string: "status:"}),]}),
				  		new Line({top:0, bottom:0, right:0, left:0, contents:[new Label({left:0, right:0, height:20, top: 5,style: new Style({horizontal: "center",font:"16px Petala Pro Thin", color:"black"}),string: "not defrosting"}),]}),
				  		*/
				  			new Container({right:0, left:0, top:0, height:10}),
				  			new defrostButtonTemplate(),
				  			new Container({right:0, left:0, top:0, bottom:0}), ]}),
				  ]}),
				  new Line({top:13, height:30, right:0, left:0, contents:[	
				  	new Label({left:0, right:0, height:30, top: 5, string:"Items in Compartment", style: headerStyle}),
				  ]}),
				  new Line({ left: 0, right: 0, top: 4, height: 1, skin: new Skin({fill: "silver"}), }),
				  //new itemLine({name: "test1", expiration: "5", quantity: "20"}),			
			],
			behavior: Object.create(Column.prototype, {
   				 onTouchEnded: { value: function(content){
     				 	KEYBOARD.hide();
     			 		content.focus();
     			 		if (newTitleField) {
     			 			application.remove(newTitleField)
     			 			newTitleField = null;
     			 			}
    			}}})
			 }});

var itemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {
    	/* Gives the user some visual feedback on which entry they have tapped.
    	 * note that the skin is reverted to white in onTouchEnded() */    	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		//container.skin = graySkin;
    	}},
    	/* Traces out the value of the first Label's string. The
    	 * silly string of "first" in the trace can be thought of as
    	 * container.Column.Container.Label.string.  This pattern can
    	 * be seen reading down the contents of this object below */
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			//container.skin = lightGraySkin;
			//trace(container.first.first.first.string+"\n");
     		//KEYBOARD.hide();
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
     			           Label($, {  style: new Style({ font: '34px Petala Pro Thin', horizontal: 'right', lines: 1, }), string: $.quantity}),
     			           Label($, {  style: new Style({  font: '18px Petala Pro Thin', right:-55, top: 5,lines: 1, }), string: "ct"}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     	
     	
     ], 
     
 }});
 
function compartmentListBuilder(dict) {
	//compartmentView.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	//compartmentView.list.first.menu.add(new searchBar({name: ""}));
	//compartmentView.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	for (var key in dict){
		if (dict.hasOwnProperty(key)) {
			compartmentView.list.first.menu.add(new itemLine(dict[key]));
		}
	}
}