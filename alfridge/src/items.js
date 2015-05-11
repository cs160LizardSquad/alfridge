var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');

/* ASSETS */
var blackSkin = new Skin({ fill: '#5A6060',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
var graySkin	= new Skin({ fill: '#bcbcbc'});
var darkGraySkin = new Skin({ fill: '#afafaf'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});

/* STYLES */
var productNameStyle = new Style({  font: '24px Petala Pro Light', color: '#5A6060', horizontal: 'left', top: -10, lines: 1, });
var expirationStyle = new Style({ font: '12px Petala Pro Thin',  color: '#5A6060', horizontal: 'left', top: 20, lines: 1, });
var productDescriptionStyle = new Style({  font: '18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });
var fieldStyle = new Style({ color: '#5A6060', font: '22px Petala Pro SemiLight', horizontal: 'left', vertical: 'middle', left: 22, right: 5, top: 5, bottom: 5, });
var hintStyle  = new Style({  font: '22px Petala Pro SemiLight', horizontal: 'left', vertical: 'middle',color: "#a7a9ab",left: 20, right: 5, top: 5, bottom: 5, lines: 1, })

/* STATIC */

var ProcessorLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
    behavior: Object.create(Behavior.prototype, {
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
     		KEYBOARD.hide();
     		application.focus();
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
     			           Label($, {  right:43, style: new Style({ font: '34px Petala Pro Thin', vertical: 'center',  color: '#5A6060', lines: 1, }), string: $.quantity}),
     			           Label($, {  style: new Style({  font: '18px Petala Pro Thin',  color: '#5A6060', right:-55, top: 5,lines: 1, }), string: "ct"}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});

var ScreenContainer = Container.template(function($) { return {
	name: "list", left:0, right:0, top:50, bottom:0, skin: new Skin({fill: "white"}),
	contents: [
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
					if(data.name.length > 0){
					clearitemsScreen();
					searchedList = searchItems(data.name);
					searchListBuilder(searchedList);}
					else{
         			clearitemsScreen();
         			ListBuilder(allItemsDict, false);
         			}
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

function ListBuilder(dict, addSearchBar) {
	if(addSearchBar === true){
	itemsMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	itemsMainBody.list.first.menu.add(new searchBar({name: ""}));
	itemsMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	}
	for (var key in dict){
		if (dict.hasOwnProperty(key)) {
			currItem = new ProcessorLine(dict[key]);
			itemsMainBody.list.first.menu.add(currItem);
			itemsOnScreen.push(currItem);
		}
	}
}

function searchListBuilder(list){
	for (i = 0; i <  list.length; i++){
		var currItem = new ProcessorLine(list[i])
		itemsMainBody.list.first.menu.add(currItem);
		itemsOnScreen.push(currItem);
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

function searchItems(keyword) {
	itemsArray = dictToArray(allItemsDict);
	tempList = []
	for (var i = 0; i < itemsArray.length; i++){    
		if(itemsArray[i].name.toLowerCase().indexOf(keyword) != -1){
        	tempList.push(itemsArray[i]);
		}}
	return tempList;	
	};
