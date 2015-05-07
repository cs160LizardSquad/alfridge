var BUTTONS = require('controls/buttons');
var KEYBOARD = require('mobile/keyboard');
var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen')
var CONTROL = require('mobile/control');


function timeAgo(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}


/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
//var graySkin	= new Skin({ fill: '#a7a9ab'});
//var darkGraySkin = new Skin({ fill: '#7f7f7f'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});
var addButtonSkin = new Skin({fill:"#117384", borders:{top: 1, right: 1}, stroke: "#7f7f7f"});

/* STYLES */
var tabStyle = new Style({  font: '16px Petala Pro Thin', horizontal: 'center', color: "#545454",vertical: 'middle', lines: 1, });
//var productNameStyle = new Style({  font: '24px Petala Pro SemiLight', horizontal: 'left', top: -10, lines: 1, });
//var expirationStyle = new Style({ font: '14px Petala Pro Thin', horizontal: 'left', top: 20, lines: 1, });
var quantityStyle = new Style({ font: '36px Petala Pro Thin', horizontal: 'center', lines: 1, });
var productDescriptionStyle = new Style({  font: '18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });
var fieldStyle = new Style({ color: 'black', font: '22px Petala Pro SemiLight', horizontal: 'left', vertical: 'middle', left: 22, right: 5, top: 5, bottom: 5, });
var hintStyle  = new Style({  font: '22px Petala Pro SemiLight', horizontal: 'left', vertical: 'middle',color: "#a7a9ab",left: 20, right: 5, top: 5, bottom: 5, lines: 1, })

/* STATIC */
/* A simple array of objects. Each will be used as a single
 * entry in our scrollable list. */
 /*
 {"lettuce":{"compartment":1,"expiration":10,"quantity":1},"tomatoes":{"compartment":1,"expiration":1,"quantity":5},
 "cucumbers":{"compartment":1,"expiration":7,"quantity":4},"milk":{"compartment":2,"expiration":14,"quantity":3},
 "chicken thighs":{"compartment":3,"expiration":20,"quantity":5},
 "chicken drumsticks":{"compartment":3,"expiration":5,"quantity":4},"steak":{"compartment":4,"expiration":14,"quantity":10},"salmon fillets":{"compartment":5,"expiration":20,"quantity":5},"tilapia fillets":{"compartment":5,"expiration":4,"quantity":6},"shrimp":{"compartment":5,"expiration":20,"quantity":12},"clams":{"compartment":5,"expiration":20,"quantity":8},"cake":{"compartment":6,"expiration":3,"quantity":1}}response was 0
{"temp1":0,"temp2":30,"temp3":30,"temp4":0,"temp5":15,"temp6":10}response was 3
*/

var suggestionsList =[ "Potatoes", "Cucumbers", "Rice", "Bread", "Milk",
						"Soymilk", "Chicken", "Tofu", "Lettuce", "Eggs",
						"Oreos", "Orange Juice"]
 
var groceryList = [
					{name: "Whole Foods", lastUpdated: 2},
					{name: "Safeway", lastUpdated: 2},
				]
 
/*var groceryList = [ {name: "Trader Joe's", lastUpdated: 23},
					{name: "Costco", lastUpdated: 21},
					{name: "Walgreens", lastUpdated: 21},
					{name: "Whole Foods", lastUpdated: 20},
					{name: "BBQ Party", lastUpdated: 16},
					{name: "Trader Joe's", lastUpdated: 16},
					{name: "Costco", lastUpdated: 11},
					{name: "Trader Joe's", lastUpdated: 8},
					{name: "Whole Foods", lastUpdated: 5},
					{name: "Safeway", lastUpdated: 4},	
					{name: "Trader Joe's", lastUpdated: 4},
					{name: "Whole Foods", lastUpdated: 2},
					{name: "Safeway", lastUpdated: 2},	
					]*/
					
var currGroceryList = []
var currListName = "";

function grocerySearchResults(query){
	var results = [];
	for(i = groceryList.length -1; i >=0; i--){
		if(groceryList[i]["name"].match(new RegExp(query, "i"))){
			results.push(groceryList[i]);
		}
	}
	return results;
}

//{"Trader Joe's": [("apple", 1), "orange"], "Walgreens": ["ketchup"]}
var itemsList = {};

var groceryListLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {
    	/* Gives the user some visual feedback on which entry they have tapped.
    	 * note that the skin is reverted to white in onTouchEnded() */    	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		container.skin = graySkin;
    	}},
    	/* Traces out the value of the first Label's string. The
    	 * silly string of "first" in the trace can be thought of as
    	 * container.Column.Container.Label.string.  This pattern can
    	 * be seen reading down the contents of this object below */
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			container.skin = lightGraySkin;
			trace(container.first.first.first.string+"\n");
     		KEYBOARD.hide();
     		container.focus();
		}},
		onTouchCancelled: { value: function(container, id, x, y, ticks) {
			if(container.skin == lightGraySkin){
				container.skin = graySkin;
			}else{
				container.skin = lightGraySkin;
			}
			trace(container.first.first.first.string+"\n");
     		KEYBOARD.hide();
     		container.focus();
     	}},
    }),
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 52, 
     			contents: [
     			           Label($, { left: 25, style: productNameStyle, string: $.name,}),
     			           Label($, { left:25, style: expirationStyle, string: "Updated " + timeAgo($.lastUpdated) + " ago",}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});


var newListButtonTemplate = BUTTONS.Button.template(function($){ return{
	right: 10, width: 25, top: 7,
	//skin: tealSkin,
	contents:[
		new Picture({right:5, width:25, height: 25, url: "assets/add-icon.png"}),
	],
	behavior:Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						//trace("notification button tapped")
						application.remove(groceryMainBody);
						topBar.notifButton.remove(newListButton);
						addButtonOn = false;
						topBar.headerCol.currentView.string = "New Grocery List";
						currGroceryList = [];
						application.remove(topBar);
						suggestionsScreen = new suggestionsTemplate(groceryData);
						suggestionsBuilder(suggestionsList);
						//suggestionsScreen.first.first.add(new suggestionLine({name: "HELLO"}));
						application.add(suggestionsScreen);
						application.add(topBar);
						suggestionsHeader = new suggestionsHeaderTemplate();
						suggestionsFooter = new suggestionsFooterTemplate();
						application.add(suggestionsHeader);
						application.add(suggestionsFooter);
						suggestionsOn = true;
						currentView = suggestionsScreen;
						}}
					}),
}});
var suggestionsScreen = null;
var newListButton = new newListButtonTemplate();

var groceryScreenContainer = Container.template(function($) { return {
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
              trace(data.name);
              label.container.hint.visible = ( data.name.length == 0 );
         		}},
         		onKeyUp: { value: function(label, key, modifiers, count, ticks){
         			if(key.match(/\r/)){
         				KEYBOARD.hide();
         				content.container.focus();
         			}
         			/*groceryMainBody.list.first.menu.empty();
					groceryListBuilder(grocerySearchResults(label.string));	*/
					groceryMainBody.list.first.menu.theList.empty();
					var searchResults = grocerySearchResults(label.string);
					for (i = searchResults.length -1; i >=0; i--){
						groceryMainBody.list.first.menu.theList.add(new groceryListLine(searchResults[i]));
					}
         		}}
         	}),
         }),
         Picture($, {left:12, top:4, width:25, height: 25, url: "assets/search-icon.png"}),
         Label($, {
   			 	left:22, right:0, top:2, bottom:0, style: hintStyle, string:"Search...", name:"hint"
         })
      ]
    }),
  ]
}});

var groceryMainBody = null;

var groceryListTemplate = Container.template(function($) { return { 
 right:0, left:0, top:50, bottom:0, contents: [
   new groceryScreenContainer(groceryData)
  ]
}});

/*var newGroceryListTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: lightGraySkin,
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, {top:0 }),
              			]
	   		})
	   		]
	}});*/

var suggestionsOn = false;
var suggestionsHeader = null;
var suggestionsFooter = null;
var suggestionsHeaderTemplate = Column.template(function($) {return {top:50, height:51, left:0, right:0, skin: whiteSkin, contents:[
	   					Line($,{top:0, height:50, left:0, right:0, contents:[
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					new Label({style: new Style({font:"20px Petala Pro SemiLight", color:"black",  horizontal: 'center'}), string: "Suggestions"}),
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					]}),
	   					Line($,{ left: 3, right: 3, height: 1, skin: separatorSkin, }),
	   					/*
	   					Line($,{top:0, height:30, left:0, right:0, contents:[
	   					new Label({left: 10, style: new Style({font:"18px Petala Pro Thin", color:"black",  horizontal: 'center'}), string: "Recently Depleted"}),
	   					]}),
	   					Line($,{ left: 3, right: 3, height: 1, skin: separatorSkin, }),*/
              			]}});
              			
var suggestionsDefaultHeader = 	Column.template(function($){return{top:0, height:31, right:0, left:0, skin: lightGraySkin, contents:[
						new Line({top:0, height:30, left:0, right:0, contents:[
	   					new Label({left: 10, style: new Style({font:"18px Petala Pro SemiLight", color:"black",  horizontal: 'center'}), string: "Recently Depleted"}),
	   					]}),
	   					new Line({ left: 3, right: 3, height: 1, skin: separatorSkin, })]}});

var suggestionsFooterTemplate = new Column.template(function($){return{bottom:0, height:70, left:0, right:0,skin: whiteSkin, contents:[
              			new Line({ top:0, left: 3, right: 3, height: 1, skin: separatorSkin }),
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
						suggestionsOn = false;
						newListScreen = new newListScreenTemplate(groceryData);
						currentView = newListScreen;
						newListBuilder(currGroceryList);
						application.add(currentView);
						//currentView 
						//KEYBOARD.hide();
						//groceryLists[listName.string]={updated: new Date().getTime(), items: [itemLabel1.string,itemLabel2.string,itemLabel3.string,itemLabel4.string,itemLabel5.string] };
						//updateGroceryLists();
						//application.remove(newListScreen)
						//application.add(suggestionScreen)
						//application.remove(groceryListsAddView({}));
					}}
				})
}});

var doneButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:95, top:17, 
	skin: addButtonSkin,
	contents:[
		new Label({top:0, height:30, string:"Save", style:new Style({font:"20px Petala Pro SemiLight", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove(currentView);
						//refresh lists????
						application.remove(topBar);
						application.add(groceryMainBody);
						topBar.notifButton.add(newListButton);
						application.add(topBar);
						addButtonOn = true;
						currentView = groceryMainBody;
						currListName = currListName == "" ? "Untitled List":currListName;
						if(itemsList.hasOwnProperty(currListName)){
							currListName += "*";
						}
						itemsList[currListName] = currGroceryList;
						groceryList.push({name: currListName, lastUpdated: new Date().getTime()});
						trace("\n" + JSON.stringify(groceryList) + "\n");
						trace("\n" + JSON.stringify(itemsList) + "\n");
						groceryMainBody.list.first.menu.theList.empty();
						for (i = groceryList.length -1; i >=0; i--){
							groceryMainBody.list.first.menu.theList.add(new groceryListLine(groceryList[i]));
						}
						currListName = "";
						//currentView 
						//KEYBOARD.hide();
						//groceryLists[listName.string]={updated: new Date().getTime(), items: [itemLabel1.string,itemLabel2.string,itemLabel3.string,itemLabel4.string,itemLabel5.string] };
						//updateGroceryLists();
						//application.remove(newListScreen)
						//application.add(suggestionScreen)
						//application.remove(groceryListsAddView({}));
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
						application.remove(currentView);
						application.remove(topBar);
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
						//KEYBOARD.hide();
						//clearAllFields();
					}}
				})
}});

var suggestionLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		container.active = false;
    		container.plusIcon.first.url = "assets/check.png";
    		container.skin = graySkin;
    		currGroceryList.push($.name);
    		trace(currGroceryList + "\n");
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			container.skin = lightGraySkin;
		}},
		onTouchCancelled: { value: function(container, id, x, y, ticks) {
			if(container.skin == lightGraySkin){
				container.skin = graySkin;
			}else{
				container.skin = lightGraySkin;
			}
			trace(container.first.first.first.string+"\n");
     		KEYBOARD.hide();
     	}}}),	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 47, 
     			contents: [
     			           Label($, { left: 25, style: new Style({font:"26px Petala Pro Thin", vertical: "middle", color:"black"}), string: $.name,}),
 			           ]}),
 			     new Line({ left: 0, right: -25, height: 1, skin: separatorSkin, })
     	], }), Column($, { name: "plusIcon", left: 0, width:25, 
     			contents: [Picture($,{right:20, width:25, height: 25, url: "assets/add-icon-dark.png"}),]}),
     ], 
 }});
 
 	   		
var groceryTitleBar = Line.template(function($) { return { 
 left: 0, right: 0, height: 40, active: true, skin: lightGraySkin, 
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
              currListName = label.string;
              trace(data.name);
              label.container.titleList.visible = ( data.name.length == 0 );	
         		}},
         		onKeyUp: { value: function(content, key, modifiers, count, ticks){
         			if(key.match(/\r/)){
         				KEYBOARD.hide();
         				content.container.focus();
         			}
         		}}
         	}),
         }),
         Label($, {
   			 	left:22, right:0, top:2, bottom:0, style: hintStyle, string:"Untitled List", name:"titleList"
         })
      ]
    }),
  ]
}});



var groceryListItemBar = Line.template(function($) { var tempItemName = ""; return { 
 top: 1, left: 0, right: 0, height: 40, active: true, skin: whiteSkin, 
 	contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 25, top: 0, bottom: 0, skin: whiteSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
	         	onDisplayed: { value: function(content){
	         		tempItemName = $.name;
	         	}},
	    		onTouchEnded: { value: function(container, id, x,  y, ticks) {
	     			KEYBOARD.show();
				}},
	         	onEdited: { value: function(label){
	         		var data = this.data;
	         		data.name = label.string;
	         		for(i = 0; i < currGroceryList.length; i++){
	         			if(currGroceryList[i] == tempItemName){
	         				currGroceryList[i] = label.string;
	         				tempItemName = label.string;
	         			}
	              }
	              //trace(data.name);
	         	}},
	         	onKeyUp: { value: function(content, key, modifiers, count, ticks){
	         		if(key.match(/\r/)){
	         			KEYBOARD.hide();
	         			content.container.focus();
	         		}
	         	}}
	         }),
	     })
      ]
    }),
  ]
}});
 
var newListItemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: whiteSkin,
    behavior: Object.create(Behavior.prototype, {	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		//container.skin = darkGraySkin;
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			//container.skin = lightGraySkin;
			container.plusIcon.first.url = "assets/unchecked.png";
    		//currGroceryList.push($.name);
    		//trace(currGroceryList + "\n");
		}}
	}),
	contents: [
	 	Column($, { name: "plusIcon", left: 0, width:50, active: true,
     		contents: [
     			new Picture({name: "checkbox", left:25, width:25, height: 25, url: "assets/unchecked.png"})
     		],
     		behavior: Object.create(Behavior.prototype, {
     			onTouchEnded: { value: function(container, id, x, y, tickets){
     				if(container.first.url.match("unchecked")){
     					container.first.url = "assets/check.png";
     				}else{
     					container.first.url = "assets/unchecked.png";
     				}
     			}}
     		})
     	}),
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 37, 
     			contents: [
     			           //Label($, { left: 15, style: new Style({font:"22px Petala Pro Thin", vertical: "middle", color:"black"}), string: $.name,}),
 			           			new groceryListItemBar({name: $.name})
 			           ]}),
 			     //new Line({ left: 0, right: -25, height: 1, skin: separatorSkin, })
     	], }),
     ], 
 }});
var newListScreenTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: whiteSkin,
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
	   					Column($,{top:0, bottom:0, left:0, right:0, contents:[
	   					Line($, {top:0, height:50, left:0, right:0, skin: new Skin({fill: "#f1f1f2"}),contents:[
	   					//new Label({top:10, left:20, style: new Style({font:"22px Petala Pro SemiLight", color:"black",  horizontal: 'left'}), string: "Untitled",}),
	   					new groceryTitleBar({"name": ""}),
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					]}),
	   					Line($, { left: 0, right: 0, top:-7, height: 1, skin: separatorSkin, }),
              			]}),
              			SCROLLER.VerticalScrollbar($, {top:50, bottom:0 }),
              			Line($, {bottom:0, height:70, left:0, right:0,contents:[
              			new Container({top:0, bottom:0, right:0, left:0}),
              			new cancelButtonTemplate(),
              			new Container({top:0, bottom:0, width:30}),
              			new doneButtonTemplate(),
              			new Container({top:0, bottom:0, right:0, left:0}),
              			]}),
              			//Line($, { left: 0, right: 0, top:-50, height: 1, skin: separatorSkin, }),
              			
              			]
	   		})
	   		]
	}});
	
function newListBuilder(list) {
	for (i = 0; i < list.length; i++){
			newListScreen.first.first.add(new newListItemLine({name: list[i]}));
	}
}

 
function suggestionsBuilder(list) {
	suggestionsScreen.first.first.add(new suggestionsDefaultHeader());
	for (i = 6; i >=0; i--){
			suggestionsScreen.first.first.add(new suggestionLine({name: list[i]}));
	}
}

/* This simple function exists so we can call "forEach" on
 * our array of list entries (menuItems).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function groceryListBuilder(dict) {
	groceryMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	groceryMainBody.list.first.menu.add(new grocerySearchBar({name: ""}));
	groceryMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	var theList = new Column({ left: 0, right: 0, top: 0, right: 0, name: "theList" });
	groceryMainBody.list.first.menu.add(theList);
	for (i = dict.length -1; i >=0; i--){
			groceryMainBody.list.first.menu.theList.add(new groceryListLine(dict[i]));
	}
	
}
