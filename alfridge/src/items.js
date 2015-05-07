var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');

/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
var graySkin	= new Skin({ fill: '#bcbcbc'});
var darkGraySkin = new Skin({ fill: '#afafaf'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});

/* STYLES */
//var tabStyle = new Style({  font: '16px Petala Pro Thin', horizontal: 'center', color: "#545454",vertical: 'middle', lines: 1, });
var productNameStyle = new Style({  font: '24px Petala Pro Light', horizontal: 'left', top: -10, lines: 1, });
var expirationStyle = new Style({ font: '12px Petala Pro Thin', horizontal: 'left', top: 20, lines: 1, });
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

/* This is a template that will be used to for each entry populating the list. 
 * Note that it is anticipating an object each time in is instanciated */
var ProcessorLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {
    	/* Gives the user some visual feedback on which entry they have tapped.
    	 * note that the skin is reverted to white in onTouchEnded() */    	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		//container.skin = graySkin;
    	}},
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
     			           Label($, { left: 27, style: productNameStyle, string: $.name,}),
     			           Label($, { left: 27, style: expirationStyle, string: "Expires in " + $.expiration + " days",}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     	Column($, { width:100, contents: [
     		Container($, { left: -17, right: 0, height: 52, 
     			contents: [
     			           Label($, {  right:43, style: new Style({ font: '34px Petala Pro Thin', vertical: 'center', lines: 1, }), string: $.quantity}),
     			           Label($, {  style: new Style({  font: '18px Petala Pro Thin', right:-55, top: 5,lines: 1, }), string: "ct"}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});

/* This is template for a container which takes up the
 * whole screen.  It contains only a single object,
 * the SCROLLER.VerticalScroller.  Although we are not
 * referencing any values from an object passed on creation,
 * an object is still required as the SCROLLER uses it internally. */
var ScreenContainer = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: new Skin({fill: "white"}),
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


var data = new Object();
var itemsTabs = Line.template(function($) { return { name: "tabs", top: 0, right:0, left:0, height:50, contents:[
			Column($,{name: "recentTab", active: true, skin: darkGraySkin, right:0, left:0, top:0, bottom:0, 
			behavior: Object.create(Behavior.prototype, {	
				onTouchEnded: { value: function(container) {	
     				container.skin = darkGraySkin;
     				itemsMainBody.tabs.alphaTab.skin = graySkin;
     				itemsMainBody.tabs.quantityTab.skin = graySkin;
     				itemsMainBody.tabs.expirationTab.skin = graySkin;
     				clearitemsScreen();
     				bubbleSortListBy("recent");
				}}, 
			}), contents:[
				new Label({top:0, bottom:0, right:0, left:0, style: tabStyle, string: "Recent"}),
			]}),
			
			Column($, {name: "alphaTab",active: true, skin: graySkin, right:0, left:0, top:0, bottom:0, 
			behavior: Object.create(Behavior.prototype, {	
				onTouchEnded: { value: function(container) {	
     				container.skin = darkGraySkin;
     				itemsMainBody.tabs.recentTab.skin = graySkin;
     				itemsMainBody.tabs.quantityTab.skin = graySkin;
     				itemsMainBody.tabs.expirationTab.skin = graySkin;
     				clearitemsScreen();
     				bubbleSortListBy("alpha");
				}}, 
			}),
			contents:[
				new Label({top:0, bottom:0, right:0, left:0, style: tabStyle, string: "a-z"}),
			]}),
			Column($, {name: "quantityTab",active: true, skin: graySkin, right:0, left:0, top:0, bottom:0, 
			behavior: Object.create(Behavior.prototype, {	
				onTouchEnded: { value: function(container) {	
     				container.skin = darkGraySkin;
     				itemsMainBody.tabs.alphaTab.skin = graySkin;
     				itemsMainBody.tabs.recentTab.skin = graySkin;
     				itemsMainBody.tabs.expirationTab.skin = graySkin;
     				clearitemsScreen();
     				bubbleSortListBy("quantity");
				}}, 
			}),
				contents:[
				new Label({top:0, bottom:0, right:0, left:0, style: tabStyle, string: "Quantity"}),
			]}),
			Column($, {name: "expirationTab",active: true, skin: graySkin, right:0, left:0, top:0, bottom:0, 
			behavior: Object.create(Behavior.prototype, {	
				onTouchEnded: { value: function(container) {	
     				container.skin = darkGraySkin;
     				itemsMainBody.tabs.alphaTab.skin = graySkin;
     				itemsMainBody.tabs.recentTab.skin = graySkin;
     				itemsMainBody.tabs.quantityTab.skin = graySkin;
     				clearitemsScreen();
     				bubbleSortListBy("expiration");
				}}, 
			}),
			contents:[
				new Label({top:0, bottom:0, right:0, left:0, style: tabStyle, string: "Expiration"}),
			]}),

		]}});


/* giving all items are in allItemsDict, and it looks like allItemsDict = [{name: "potato", compartment: 1, expiration: 10,quantity:1},{name: "tomatoes", compartment: 1, expiration: 1,quantity:5}];
the argument for this function is the name of the items we want to search.
calling this function, we will get an array of items that are match/superstring of the searched string
also, call this function in the onEdited function of the searchBar

function searchItem (itemName) {
    var arrayOfSearchItem=[]
    for (var i = 0; i < allItemsDict.length; i++) {
		if (allItemsDict[i].name.indexOf(itemName) > -1){ 
			arrayOfSearchItem.push(allItemsDict[i])};
    	}
    return arrayOfSearchItem;
};
*/

	
var searchBar = Line.template(function($) { return { 
 name: "itemSearchBar", left: 0, right: 0, height: 40, active: true, skin: whiteSkin, 
 	contents: [
    Scroller($, { 
      name: "scroller", left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { name:"label",
          left: 25, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
    		onTouch: { value: function() {	
     			KEYBOARD.show();
			}},
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              trace(data.name);
              
              //call searchItem here with arg=label.string
              label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Picture($, {left:12, top:4, width:25, height: 25, url: "assets/search-icon.png"}),
         Label($, {
   			 	left:22, right:0, top:0, bottom:0, style: hintStyle, string:"Search...", name:"hint"
         })
      ]
    }),
  ]
}});

var itemsMainBody = null;

var itemsListTemplate = Container.template(function($) { return { 
 right:0, left:0, top:50, bottom:0, contents: [
   new ScreenContainer(data)
  ]
}});

var itemsOnScreen = []

/* This simple function exists so we can call "forEach" on
 * our array of list entries (menuItems).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ListBuilder(dict) {
	itemsMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	itemsMainBody.list.first.menu.add(new searchBar({name: ""}));
	itemsMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	for (var key in dict){
		if (dict.hasOwnProperty(key)) {
			currItem = new ProcessorLine(dict[key]);
			itemsMainBody.list.first.menu.add(currItem);
			itemsOnScreen.push(currItem);
		}
	}
}

function clearitemsScreen(){
	while(itemsOnScreen.length > 0){
		itemsMainBody.list.first.menu.remove(itemsOnScreen.pop());
	}
};
//easiest sort to implement... bubble sort!
function bubbleSortListBy(id) {
	itemsArray = dictToArray(allItemsDict);
	switch(id) {
	    case "recent":
			populateItemsScreen();
			break;
		case "alpha":
			for (var out = Object.keys(allItemsDict).length - 1; out > 0; out--){    
				for (var inn = 0; inn < out; inn++) {
					//Are they out of order?
            		if (itemsArray[inn].name > itemsArray[inn+1].name){
                		swap(itemsArray, inn, inn+1);   }                             
				}
			}       
			populateItemsScreen();
			break;    
		case "quantity":
			for (var out = Object.keys(allItemsDict).length - 1; out > 0; out--){    
				for (var inn = 0; inn < out; inn++) {
					//Are they out of order?
            		if (itemsArray[inn].quantity > itemsArray[inn+1].quantity){
                		swap(itemsArray, inn, inn+1);   }                             
				}
			}       
			populateItemsScreen();
			break;  
		case "expiration":
			for (var out = Object.keys(allItemsDict).length - 1; out > 0; out--){    
				for (var inn = 0; inn < out; inn++) {
					//Are they out of order?
            		if (itemsArray[inn].expiration > itemsArray[inn+1].expiration){
                		swap(itemsArray, inn, inn+1);   }                             
				}
			}       
			populateItemsScreen();
			break;             								       								      								       								   							 
		}
}
function populateItemsScreen(){
	for (var i = 0; i < itemsArray.length; i++){
		currItem = new ProcessorLine(itemsArray[i]);
		itemsMainBody.list.first.menu.add(currItem);
		itemsOnScreen.push(currItem);
	}
};

function dictToArray(dict){
	tempArray = []
	for (var key in dict){
		if (dict.hasOwnProperty(key)) {
			tempArray.push(dict[key]);
		}}
	return tempArray;
}

function swap(array, one, two) {
    var tmp = array[one];
    array[one] = array[two];
    array[two] = tmp;                    
};
/*
function bubbleSort(dict, id) {   
    callback(elements);
    //Loop over all the elements
    for (var out = elements.length - 1; out > 0; out--){                            
        for (var inn = 0; inn < out; inn++) {
            //Are they out of order?
            if (elements[inn] > elements[inn+1]){
                swap(inn, inn+1);                                
            } 
        }
        callback(elements);
    }                    
}; */