var BUTTONS = require('controls/buttons');
var KEYBOARD = require('mobile/keyboard');
var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen')
var CONTROL = require('mobile/control');

/* ASSETS */
var blackSkin = new Skin({ fill: '#5A6060',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});
var addButtonSkin = new Skin({fill:"#117384", borders:{top: 1, right: 1}, stroke: "#7f7f7f"});

/* STYLES */
var tabStyle = new Style({  font: '16px Petala Pro Thin', horizontal: 'center', color: "#545454",vertical: 'middle', lines: 1, });
var quantityStyle = new Style({ font: '36px Petala Pro Thin', horizontal: 'center', lines: 1, });
var productDescriptionStyle = new Style({  font: '18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });
var fieldStyle = new Style({ color: '#5A6060', font: '22px Petala Pro SemiLight', horizontal: 'left', vertical: 'middle', left: 22, right: 5, top: 5, bottom: 5, });
var hintStyle  = new Style({  font: '22px Petala Pro SemiLight', horizontal: 'left', vertical: 'middle',color: "#a7a9ab",left: 20, right: 5, top: 5, bottom: 5, lines: 1, })

/* STATIC */
var suggestionsRecentList =[ "Potatoes", "Cucumbers", "Rice", "Bread", "Milk","Soymilk", "Onions"];
var suggestionsFrequentList =[ "Tofu", "Lettuce", "Eggs","Oreos", "Orange Juice", "Corn", "Pasta"];
var currTime = parseInt(new Date().getTime() / 1000);

//Canned data for grocery lists!
var groceryList = [ {name: "Trader Joe's", lastUpdated: currTime - 1, 
						items: [{name: "apples", checkbox: "assets/unchecked-icon.png"}, 
								{name: "bananas", checkbox: "assets/unchecked-icon.png"}, 
								{name: "broccoli", checkbox: "assets/unchecked-icon.png"}, 
								{name: "hummus", checkbox: "assets/unchecked-icon.png"}], },
					{name: "Costco", lastUpdated: currTime - 20, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Walgreens", lastUpdated: currTime - 10384, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Whole Foods", lastUpdated: currTime - 14956, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "BBQ Party", lastUpdated: currTime - 28374, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Trader Joe's", lastUpdated: currTime - 30485, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Costco", lastUpdated: currTime - 49586, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Trader Joe's", lastUpdated: currTime - 51873, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Whole Foods", lastUpdated: currTime - 73947, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Safeway", lastUpdated: currTime - 82937, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},	
					{name: "Trader Joe's", lastUpdated: currTime - 90376, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Whole Foods", lastUpdated: currTime - 103944, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},
					{name: "Safeway", lastUpdated: currTime - 103946, 
								items: [{name: "coconut water", checkbox: "assets/checked-icon.png"}, 
								{name: "strawberries", checkbox: "assets/unchecked-icon.png"}, 
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, 
								{name: "milk", checkbox: "assets/unchecked-icon.png"},
								{name: "salmon", checkbox: "assets/unchecked-icon.png"}, ],},	
					]		
var currGroceryList = {name: "Untitled", items: [], lastUpdated: parseInt(new Date().getTime() / 1000)};
var viewListScreen = null;
var groceryListLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, { 	 
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {
		    KEYBOARD.hide();
			application.focus();
			application.remove(groceryMainBody);
			topBar.notifButton.remove(newListButton);
			addButtonOn = false;
			viewListScreen = new viewListScreenTemplate({title: $.name});
			viewListScreen.add(new viewListHeaderTemplate());
			viewListBuilder($.items);
			application.add(viewListScreen);
			currentView = viewListScreen;
			}}}),
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 52, 
     			contents: [
     			           Label($, { left: 25, style: productNameStyle, string: $.name,}),
     			           Label($, { left:25, style: expirationStyle, string: "Updated " + timeStringCreator(currTime - $.lastUpdated) + " ago",}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),], }});

function timeStringCreator(diffInSeconds){
	toReturn = "";
	if (diffInSeconds < 60){
	toReturn = diffInSeconds + " seconds";
	}else if (diffInSeconds < 3600){
	toReturn = parseInt(diffInSeconds/60) + " minutes";
	}else if (diffInSeconds < 86400){
	toReturn = parseInt(diffInSeconds/3600) + " hours";
	}else if (diffInSeconds < 2592000){
	toReturn = parseInt(diffInSeconds/86400) + " days";
	}else if (diffInSeconds < 31536000){
	toReturn = parseInt(diffInSeconds/60) + " months";
	}else{
	toReturn = parseInt(diffInSeconds/31536000) + " years";
	}
	//quick grammar check for plurals
	if (toReturn.indexOf("1 ") === 0){
		toReturn = toReturn.substring(0, toReturn.length -1);
	}
	return toReturn;
};

var newListButtonTemplate = BUTTONS.Button.template(function($){ return{
	right: 10, width: 25, top: 7,
	contents:[
		new Picture({right:5, width:25, height: 25, url: "assets/add-icon.png"}),
	],
	behavior:Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
					    KEYBOARD.hide();
						application.focus();
						application.remove(groceryMainBody);
						topBar.notifButton.remove(newListButton);
						addButtonOn = false;
						topBar.headerCol.currentView.string = "New Grocery List";
						currGroceryList = {name: "Untitled", items: [], lastUpdated: parseInt(new Date().getTime() / 1000)};
						application.remove(topBar);
						suggestionsScreen = new suggestionsTemplate(groceryData);
						suggestionsBuilder(suggestionsRecentList, suggestionsFrequentList);
						application.add(suggestionsScreen);
						application.add(topBar);
						suggestionsHeader = new suggestionsHeaderTemplate();
						suggestionsFooter = new suggestionsFooterTemplate();
						application.add(suggestionsHeader);
						application.add(suggestionsFooter);
						suggestionsOn = true;
						currentView = suggestionsScreen;
						}}
					}),}});
					
var suggestionsScreen = null;
var newListButton = new newListButtonTemplate();

var groceryScreenContainer = Container.template(function($) { return {
	name: "list", left:0, right:0, top:0, bottom:0, skin: new Skin({fill: "white"}),
	contents: [
	   		SCROLLER.VerticalScroller($, {
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, {top:0 }),
              			]})
	   		]}});

var groceryData = new Object();

var grocerySearchBar = Line.template(function($) { return { 
 left: 0, right: 0, height: 40, active: true, skin: whiteSkin, 
 	contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 25, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
    		onTouchEnded: { value: function() {	
     			KEYBOARD.show();
			}},
         		onEdited: { value: function(label){
         			var data = this.data;
              		data.name = label.string;
					if(data.name.length > 0){
					clearListsScreen();
					searchedList = searchGrocerylists(data.name);
					groceryListBuilder(searchedList, false);}
					else{
         			clearListsScreen();
         			groceryListBuilder(groceryList, false);
         			}
              		label.container.hint.visible = ( data.name.length == 0 );
         		
         		}\}}),}),
         Picture($, {left:12, top:4, width:25, height: 25, url: "assets/search-icon.png"}),
         Label($, {
   			 	left:22, right:0, top:0, bottom:0, style: hintStyle, string:"Search...", name:"hint"
         })] })] }});

var groceryMainBody = null;

var groceryListTemplate = Container.template(function($) { return { 
 right:0, left:0, top:50, bottom:0, contents: [
   new groceryScreenContainer(groceryData)
  ]
}});

var newGroceryListTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: lightGraySkin,
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, {top:0 }),
              			]})
	   		]}});

var suggestionsOn = false;
var suggestionsHeader = null;
var suggestionsFooter = null;
var suggestionsHeaderTemplate = Column.template(function($) {return {top:50, height:51, left:0, right:0, skin: whiteSkin, contents:[
	   					Line($,{top:0, height:50, left:0, right:0, contents:[
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					new Label({style: new Style({font:"20px Petala Pro SemiLight", color:"#5A6060",  horizontal: 'center'}), string: "Suggestions"}),
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					]}),
	   					Line($,{ left: 3, right: 3, height: 1, skin: separatorSkin, }),
              			]}});
              			
var suggestionsRecentHeader = Column.template(function($){return{top:0, height:36, right:0, left:0, skin: whiteSkin, contents:[
						new Line({top:0, height:35, left:0, right:0, contents:[
	   					new Label({left: 10, style: new Style({font:"20px Petala Pro SemiLight", color:"#5A6060",  horizontal: 'center'}), string: "Recently Depleted"}),
	   					]}),
	   					new Line({ left: 3, right: 3, height: 1, bottom:0, skin: separatorSkin, })]}});
var suggestionsFrequentHeader = Column.template(function($){return{top:0, height:36, right:0, left:0, skin: whiteSkin, contents:[
						new Line({top:0, height:35, left:0, right:0, contents:[
	   					new Label({left: 10, style: new Style({font:"20px Petala Pro SemiLight", color:"#5A6060",  horizontal: 'center'}), string: "Frequent Items"}),
	   					]}),
	   					new Line({ left: 3, right: 3, height: 1, bottom: 0, skin: separatorSkin, })]}});

var suggestionsFooterTemplate = new Column.template(function($){return{bottom:0, height:70, left:0, right:0,skin: whiteSkin, contents:[
              			new Line({ top:0, left: 3, right: 3, height: 1, skin: separatorSkin, }),
              			new Line({top:0, bottom:0, right:0, left:0, contents:[
              			new Container({top:0, bottom:0, right:0, left:0}),
              			new cancelButtonTemplate(),
              			new Container({top:0, bottom:0, width:30}),
              			new nextButtonTemplate(),
              			new Container({top:0, bottom:0, right:0, left:0}),]}),
              			]}});
	
var suggestionsTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:100, bottom:0, skin: lightGraySkin,
	contents: [
	   		SCROLLER.VerticalScroller($, { contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, {top:0 }),
              			]})
	   		]}});

var nextButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:95, top:17, 
	skin: addButtonSkin,
	contents:[
		new Label({top:0, height:30, string:"Next", style:new Style({font:"20px Petala Pro SemiLight", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove(suggestionsScreen);
						application.remove(suggestionsHeader);
						application.remove(suggestionsFooter);
						application.remove(topBar);
						suggestionsOn = false;
						newListScreen = new newListScreenTemplate(groceryData);
						newListScreen.add(new newListTitleBar({name: "Untitled"}));
						currentView = newListScreen;
						newListBuilder(currGroceryList.items);
						application.add(currentView);
						application.add(topBar);
					}}
				})
}});

var doneButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:95, top:17, 
	skin: addButtonSkin,
	contents:[
		new Label({top:0, height:30, string:"Done", style:new Style({font:"20px Petala Pro SemiLight", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						KEYBOARD.hide();
						application.focus();
						application.remove(currentView);
						//refresh lists????
						application.remove(topBar);
						currGroceryList.lastUpdated = parseInt(new Date().getTime() / 1000);
						/*
						if(currGroceryList.name = " "){
							currGroceryList.name = "Untitled";
						} */
						groceryList.push(currGroceryList);
						clearListsScreen();
						bubbleSortGroceryLists();
						groceryListBuilder(groceryList, false);
						application.add(groceryMainBody);
						topBar.notifButton.add(newListButton);
						application.add(topBar);
						addButtonOn = true;
						currentView = groceryMainBody;
					}}
				})
}});

var cancelButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:95,top:17,
	skin: addButtonSkin,
	contents:[
		new Label({top:0, height:30, string:"Cancel", style:new Style({font:"20px Petala Pro SemiLight", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						KEYBOARD.hide();
						application.focus();
						application.remove(currentView);
						application.remove(topBar);
						currGroceryList = {name: "Untitled", items: [], lastUpdated: parseInt(new Date().getTime() / 1000)};
						if(suggestionsOn){
						application.remove(suggestionsHeader);
						application.remove(suggestionsFooter);
						suggestionsOn = false;
						}
						application.add(groceryMainBody);
						application.add(topBar);
						topBar.notifButton.add(newListButton);
						addButtonOn = true;
						currentView = groceryMainBody;
					}}
				})
}});

var suggestionLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    			container.active = false;
    			container.plusIcon.first.url = "assets/check.png";
    			currGroceryList.items.push({name: $.name, checkbox: "assets/unchecked-icon.png"});
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
		}}}),	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 47, 
     			contents: [
     			           Label($, { left: 25, style: new Style({font:"26px Petala Pro Thin", vertical: "middle", color:"#5A6060"}), string: $.name,}),
 			           ]}),
 			     new Line({ left: 0, right: -25, height: 1, skin: separatorSkin, })
     	], }), Column($, { name: "plusIcon", left: 0, width:25, 
     			contents: [Picture($,{right:20, width:25, height: 25, url: "assets/add-icon-dark.png"}),]}),
     ], 
 }});
 
var newListItemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: whiteSkin,
    behavior: Object.create(Behavior.prototype, {	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		//container.plusIcon.first.url = "";
    		//currGroceryList.push($.name);
    		//trace(currGroceryList + "\n");
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
    		KEYBOARD.hide();
			application.focus();
		}}}),	contents: [
	 	Column($, { name: "plusIcon", left: 0, width:50, 
     			contents: [new Picture({left:25, width:25, height: 25, url: $.checkbox}), ]}),
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 37, 
     			contents: [
     			           Label($, { left: 15, style: new Style({font:"22px Petala Pro Thin", vertical: "middle", color:"#5A6060"}), string: $.name,}),
 			           ]}),
     	], }),
     ], 
 }});
var newListScreenTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:40, bottom:0, skin: whiteSkin,
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			behavior: Object.create(Behavior.prototype, {	 
    				onTouchEnded: { value: function(container, id, x,  y, ticks) {	
    					KEYBOARD.hide();
						application.focus();}}}),
	   			contents: [
	   					Column($,{top:50, bottom:0, left:0, right:0, 
	   					contents:[
	   					
	   					/*
	   					Line($, {top:0, height:50, left:0, right:0, skin: new Skin({fill: "#f1f1f2"}),contents:[
	   					new Label({top:10, left:20, style: new Style({font:"22px Petala Pro SemiLight", color:"#5A6060",  horizontal: 'left'}), string: "Untitled"}),
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					]}), */
	   					Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
              			]}),
              			SCROLLER.VerticalScrollbar($, {top:50, bottom:0 }),
              			Line($, {bottom:0, height:70, left:0, right:0,contents:[
              			new Container({top:0, bottom:0, right:0, left:0}),
              			new cancelButtonTemplate(),
              			new Container({top:0, bottom:0, width:30}),
              			new doneButtonTemplate(),
              			new Container({top:0, bottom:0, right:0, left:0}),
              			]}),
              			]
	   		})
	   		]
	}});
	
var newListTitleBar = Line.template(function($) { return { 
 top:0, left: 0, right: 0, height: 50, active: true, skin: lightGraySkin, 
 	contents: [
    Scroller($, { 
      left: 4, right: 4, top: 15, height:30, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, 
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
    		onTouchEnded: { value: function() {	
     			KEYBOARD.show();
			}},
         		onEdited: { value: function(label){
         			var data = this.data;
              		data.name = label.string;
             		// trace(data.name);
              		currGroceryList.name = data.name;
              		label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {left:20, right:0, top:0, bottom:0, style: new Style({font:"22px Petala Pro SemiLight", color:"#5A6060",  horizontal: 'left'}), string:"Untitled", name:"hint"})
      ]
    }),
  ]
}});	

var viewListBackButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 45, width:100, left:0, top: 5, 
	skin: tealSkin,
	contents:[
		new Picture({left:15, top:6, width:25, height: 25, url: "assets/back-icon.png"})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						//application.remove($.myView)
						//application.remove(currentView)
						application.remove(topBar);
						listsOnScreen = [];
						groceryMainBody = new groceryListTemplate();
						currTime = parseInt(new Date().getTime() / 1000);
						bubbleSortGroceryLists();
						//add addbutton
						groceryListBuilder(groceryList, true);
						application.replace(currentView, groceryMainBody);
						currentView = groceryMainBody;
						application.add(topBar);
						topBar.notifButton.add(newListButton);
						addButtonOn = true;
						}}
					})
}});

var viewListItemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: whiteSkin,
    behavior: Object.create(Behavior.prototype, {	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		//container.plusIcon.first.url = "";
    		//currGroceryList.push($.name);
    		//trace(currGroceryList + "\n");
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
    		KEYBOARD.hide();
			application.focus();
			if($.checkbox = "assets/unchecked-icon.png"){
				$.checkbox = "assets/checked-icon.png";
				container.plusIcon.first.url = "assets/checked-icon.png";
			}else{
				$.checkbox = "assets/unchecked-icon.png";
				container.plusIcon.first.url = "assets/unchecked-icon.png";
			}
		}}}),	contents: [
	 	Column($, { name: "plusIcon", left: 0, width:50, 
     			contents: [new Picture({left:25, width:25, height: 25, url: $.checkbox}), ]}),
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 37, 
     			contents: [
     			           Label($, { left: 15, style: new Style({font:"22px Petala Pro Thin", vertical: "middle", color:"#5A6060"}), string: $.name,}),
 			           ]}),
     	], }),
     ], 
 }});
 
var viewListHeaderTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:0, height:50, skin: tealSkin,
	contents: [
			new viewListBackButtonTemplate(),
			new Picture({top:10, right:60, width:30, height: 30, url: "assets/trash-icon.png"}),
			new Picture({top:10, right:17, width:30, height: 30, url: "assets/edit-icon.png"}),
	   		]
	}});

var viewListScreenTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:0, bottom:0, skin: whiteSkin,
	contents: [
			Line($,{top:-50, height:50, right:0, left:0,skin: whiteSkin}),
	   		SCROLLER.VerticalScroller($, { 
	   			name: "scroller",
	   			behavior: Object.create(Behavior.prototype, {	 
    				onTouchEnded: { value: function(container, id, x,  y, ticks) {	
    					KEYBOARD.hide();
						application.focus();}}}),
	   			contents: [
	   					Column($,{top:50, bottom:0, left:0, right:0, 
	   					contents:[
	   					Line($, {top:0, height:50, left:0, right:0, skin: new Skin({fill: "#f1f1f2"}),contents:[
	   					new Label({top:15, left:20, style: new Style({font:"22px Petala Pro SemiLight", color:"#5A6060",  horizontal: 'left'}), string: $.title}),
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					]}), 
	   					Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
              			]}),
              			]
	   		})
	   		]
	}});
	
function viewListBuilder(list) {
	viewListScreen.scroller.first.add(new Line({right:0, left:0, top:0, height:10, skin: whiteSkin}));
	for (i = 0; i < list.length; i++){
			viewListScreen.scroller.first.add(new viewListItemLine(list[i]));}};
	
function newListBuilder(list) {
	newListScreen.first.first.add(new Line({right:0, left:0, top:0, height:10, skin: whiteSkin}));
	for (i = 0; i < list.length; i++){
			newListScreen.first.first.add(new newListItemLine(list[i]));}};

 
function suggestionsBuilder(recentList, frequentList) {
	suggestionsScreen.first.first.add(new suggestionsRecentHeader());
	for (i = 4; i >=0; i--){
			suggestionsScreen.first.first.add(new suggestionLine({name: recentList[i]}));
			}
	suggestionsScreen.first.first.add(new suggestionsFrequentHeader());
		for (i = 4; i >=0; i--){
			suggestionsScreen.first.first.add(new suggestionLine({name: frequentList[i]}));
			}
	};
			

var listsOnScreen = []

function groceryListBuilder(lists, addSearchBar) {
	if (addSearchBar == true){
	groceryMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	groceryMainBody.list.first.menu.add(new grocerySearchBar({name: ""}));
	groceryMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	}
	currTime = parseInt(new Date().getTime() / 1000);
	for (i = 0; i <  lists.length; i++){
		var currList = new groceryListLine(lists[i])
		groceryMainBody.list.first.menu.add(currList);
		listsOnScreen.push(currList);
	}
}
function clearListsScreen(){
	while(listsOnScreen.length > 0){
		groceryMainBody.list.first.menu.remove(listsOnScreen.pop());
	}
};
//easiest sort to implement... bubble sort!
function bubbleSortGroceryLists() {
	for (var out = groceryList.length - 1; out > 0; out--){    
		for (var inn = 0; inn < out; inn++) {
			if (groceryList[inn].lastUpdated < groceryList[inn+1].lastUpdated){
	    		swap(groceryList, inn, inn+1);   }                             
		}}};
		
function searchGrocerylists(keyword) {
	tempList = []
	for (var i = 0; i < groceryList.length; i++){    
		//trace('name: ' + groceryList[i].name.toLowerCase() + ' match? ' + groceryList[i].name.toLowerCase().indexOf(keyword));
		if(groceryList[i].name.toLowerCase().indexOf(keyword) != -1){
        	tempList.push(groceryList[i]);
		}}
	return tempList;	
	};