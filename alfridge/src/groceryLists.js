
var BUTTONS = require('controls/buttons');
var KEYBOARD = require('mobile/keyboard');

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen')
var CONTROL = require('mobile/control');



/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
var graySkin	= new Skin({ fill: '#a7a9ab'});
var darkGraySkin = new Skin({ fill: '#7f7f7f'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});
var addButtonSkin = new Skin({fill:"#117384", borders:{top: 1, right: 1}, stroke: "#7f7f7f"});

/* STYLES */
var tabStyle = new Style({  font: '18px Petala Pro Thin', horizontal: 'center', color: "#545454",vertical: 'middle', lines: 1, });
var productNameStyle = new Style({  font: '24px Petala Pro SemiLight', horizontal: 'left', top: -10, lines: 1, });
var expirationStyle = new Style({ font: '14px Petala Pro Thin', horizontal: 'left', top: 20, lines: 1, });
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
 
var groceryList = [ {name: "Trader Joe's", lastUpdated: 23},
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
					]
					
var currGroceryList = []

var groceryListLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
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
			trace(container.first.first.first.string+"\n");
     		KEYBOARD.hide();
		}}
    }),
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 52, 
     			contents: [
     			           Label($, { left: 25, style: productNameStyle, string: $.name,}),
     			           Label($, { left:25, style: expirationStyle, string: "Updated " + $.lastUpdated + " hours ago",}),
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
						suggestionsScreen = new suggestionsTemplate(groceryData);
						suggestionsBuilder(suggestionsList);
						//suggestionsScreen.first.first.add(new suggestionLine({name: "HELLO"}));
						application.add(suggestionsScreen);
						currentView = suggestionsScreen;
						}}
					}),
}});
var suggestionsScreen = null;
var newListButton = new newListButtonTemplate();

var groceryScreenContainer = Container.template(function($) { return {
	name: "list", left:0, right:0, top:0, bottom:0, skin: new Skin({fill: "#f1f1f2"}),
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
 left: 0, right: 0, height: 40, active: true, skin: lightGraySkin, 
 	contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
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
         		}}
         	}),
         }),
         Label($, {
   			 	left:0, right:0, top:0, bottom:0, style: hintStyle, string:"Search...", name:"hint"
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

var newGroceryListTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: new Skin({fill: "#f1f1f2"}),
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, {top:0 }),
              			]
	   		})
	   		]
	}});
	
var suggestionsTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: new Skin({fill: "#f1f1f2"}),
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
	   					Column($,{top:0, bottom:0, left:0, right:0, contents:[
	   					Line($, {top:0, height:50, left:0, right:0, contents:[
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					new Label({style: new Style({font:"20px Petala Pro", color:"black",  horizontal: 'center'}), string: "Suggestions"}),
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					]}),
	   					Line($, {top:0, height:30, left:0, right:0, contents:[
	   					new Label({left: 10, style: new Style({font:"18px Petala Pro Thin", color:"black",  horizontal: 'center'}), string: "Recently Depleted"}),
	   					]}),
	   					Line($, { left: 3, right: 3, height: 1, skin: separatorSkin, }),
              			]}),
              			SCROLLER.VerticalScrollbar($, {top:50, bottom:0 }),
              			
              			Line($, {bottom:0, height:70, left:0, right:0,contents:[
              			new Container({top:0, bottom:0, right:0, left:0}),
              			new cancelButtonTemplate(),
              			new Container({top:0, bottom:0, width:10}),
              			new nextButtonTemplate(),
              			new Container({top:0, bottom:0, right:0, left:0}),
              			]})
              			]
	   		})
	   		]
	}});

var nextButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:95, top:17, 
	skin: addButtonSkin,
	contents:[
		new Label({top:0, height:30, string:"Next", style:new Style({font:"20px Petala Pro SemiLight", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove(suggestionsScreen);
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
		new Label({top:0, height:30, string:"Done", style:new Style({font:"20px Petala Pro SemiLight", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove(currentView);
						//refresh lists????
						application.add(groceryMainBody);
						topBar.notifButton.add(newListButton);
						currentView = groceryMainBody;
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
						application.add(groceryMainBody);
						topBar.notifButton.add(newListButton);
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
    		
    		currGroceryList.push($.name);
    		trace(currGroceryList + "\n");
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			//container.skin = lightGraySkin;
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
 
var newListItemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		//container.plusIcon.first.url = "";
    		//currGroceryList.push($.name);
    		//trace(currGroceryList + "\n");
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			//container.skin = lightGraySkin;
		}}}),	contents: [
	 	Column($, { name: "plusIcon", left: 0, width:50, 
     			contents: [new Picture({left:25, width:25, height: 25, url: "assets/unchecked.png"}), ]}),
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 37, 
     			contents: [
     			           Label($, { left: 15, style: new Style({font:"22px Petala Pro Thin", vertical: "middle", color:"black"}), string: $.name,}),
 			           ]}),
 			     //new Line({ left: 0, right: -25, height: 1, skin: separatorSkin, })
     	], }),
     ], 
 }});
var newListScreenTemplate = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: new Skin({fill: "#f1f1f2"}),
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
	   					Column($,{top:0, bottom:0, left:0, right:0, contents:[
	   					Line($, {top:10, height:50, left:20, right:0, contents:[
	   					new Label({style: new Style({font:"22px Petala Pro SemiLight", color:"black",  horizontal: 'left'}), string: "Title"}),
	   					new Container({top:0, bottom:0, right:0, left:0}),
	   					]}),
	   					Line($, { left: 20, right: 20, top:-5, height: 1, skin: separatorSkin, }),
              			]}),
              			SCROLLER.VerticalScrollbar($, {top:50, bottom:0 }),
              			
              			Line($, {bottom:0, height:70, left:0, right:0,contents:[
              			new Container({top:0, bottom:0, right:0, left:0}),
              			new cancelButtonTemplate(),
              			new Container({top:0, bottom:0, width:10}),
              			new doneButtonTemplate(),
              			new Container({top:0, bottom:0, right:0, left:0}),
              			]})
              			]
	   		})
	   		]
	}});
	
function newListBuilder(list) {
	for (i = 0; i < list.length; i++){
			newListScreen.first.first.add(new newListItemLine({name: list[i]}));
	}
}

<<<<<<< HEAD
var groceryListsItemsView = new Container({left: 0, right: 0, top: 50, bottom: 0, skin: whiteSkin,
	contents: [
		new backButtonTemplate({myView: this}),
		groceryListsItemsColumn
	],
	behavior: Object.create(Container.prototype, {
	    onTouchEnded: { value: function(content){
	      KEYBOARD.hide();
	      content.focus();
	    }}})
});
 
function suggestionsBuilder(list) {
	for (i = 6; i >=0; i--){
			suggestionsScreen.first.first.add(new suggestionLine({name: list[i]}));
	}
}


/* This simple function exists so we can call "forEach" on
 * our array of list entries (menuItems).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function groceryListBuilder(dict) {
	groceryMainBody.list.first.menu.add(new grocerySearchBar({name: ""}));
	groceryMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	for (i = dict.length -1; i >=0; i--){
			groceryMainBody.list.first.menu.add(new groceryListLine(dict[i]));
	}
}
