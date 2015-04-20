/* "backend" */
var groceryLists = {
	"Trader Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Tradedsar Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"TradASder Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Tradsader Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Tradder Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Tradsader Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Tradasder Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"TraASDder Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Tradasder Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Tradder Joe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Trader Jdasoe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Trader ASJoe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
};

/////// STEVEN FILL THIS OUT. IN MAIN.JS, on receiveItemReading, also call updateSuggestions and pass in the dict //////
function updateSuggestions(allItemsDict){
	var data = {};
	for(var item in JSON.parse(allItemsDict)){
	
	}
}
/////// STEVEN FILL THIS OUT. IN MAIN.JS, on receiveItemReading, also call updateSuggestions and pass in the dict //////

function updateGroceryLists(){
	groceryListsColumn.empty();
	for(list in groceryLists){
		groceryListsColumn.add(new Container({top: 0, right: 0, left: 0, height: 60, skin: listSkin,
			contents: [
				new Label({top: 12, right: 0, left: 20, string: list, style: textStyle }),
				new Label({top: 36, right: 0, left: 20, string: "Updated " + groceryLists[list]["updated"], style: subtextStyle}),
			]
		}));
	}
}

/////// STEVEN CALL updateGroceryListList  //////
function updateGroceryListList(listName){
	groceryListsColumn.empty();
	for(item in groceryLists[listName]["items"]){
		/////// STEVEN FILL THIS OUT AND MAKE IT LOOK LIKE THE MAIN LIST CONTAINER /////////
		groceryListsColumn.add(new Label({string: item}));
		/////// STEVEN FILL THIS OUT AND MAKE IT LOOK LIKE THE MAIN LIST CONTAINER /////////
	}
}


/* skins and styles for groceryLists */
var addButtonSkin = new Skin({fill:"#a7a9ac", borders:{top: 1, right: 1}, stroke: "#818285"});
var textStyle = new Style({font:"22px Petala Pro Thin", color:"#5A6060", horizontal: "left", indentation: 10});
var subtextStyle = new Style({font:"13px Petala Pro SemiLight", color:"#5A6060", horizontal: "left", indentation: 10});
var searchBarSkin = new Skin({fill:"#ffffff", borders:{left: 1, right: 1, top: 1, bottom: 0}, stroke:"#818285"});
var listSkin = new Skin({fill:"#f3f3f4", borders:{left: 1, right: 1, top: 1, bottom: 0}, stroke:"#818285"});

var groceryListsColumn = new Column({left: 0, right: 0, top: 50, bottom: 0, skin: whiteSkin, style: textStyle,
	contents: [
		new Label({string: "CORN"})
	]
});

//////// STEVEN CALL THIS FUNC AGAIN EVERY TIME YOU RETURN TO THE MAIN GROCERYLISTS CONTAINER (i.e. clicking done on Add List) //////////
updateGroceryLists();
//////// STEVEN CALL THIS FUNC AGAIN EVERY TIME YOU RETURN TO THE MAIN GROCERYLISTS CONTAINER (i.e. clicking done on Add List)//////////

//////// STEVEN FILL THIS OUT. UPDATE var groceryLists. then call updateGroceryLists() on return ////////
var groceryListsItemsColumn = new Column({left: 0, right: 0, top: 50, bottom: 0, skin: whiteSkin, style: textStyle,
	contents: [
		new Label({string: "CHEESE", style: textStyle}) // these should be editable on the fly
	]
});
//////// STEVEN FILL THIS OUT. UPDATE var groceryLists. then call updateGroceryLists() on return ////////

var searchBar = new Container({left: 0, right: 60, top: 0, height: 50, skin: searchBarSkin,
	contents: [
		new Label({string: "Search", style: new Style({font:"20px Petala Pro Thin", color:"#5A6060"}),
			editable:true, active:true, left: 20,
			//////// STEVEN FILL THIS OUT //////////
			behavior: CONTROL.FieldLabelBehavior({
        		onDisplaying: function(container) {
					//container.focus();
				}
			})
			//////// STEVEN FILL THIS OUT //////////
		})
	]
});

var addButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 50, width:60, top: 0, right: 0,
	skin: addButtonSkin,
	contents:[
		new Label({left:18, top:0, height:50, string:"+", style:new Style({font:"38px Petala Pro", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.add(groceryListsAddView);
						}}
					})
}});

//////// STEVEN FILL THIS OUT //////////
var suggestions = new Container();
//////// STEVEN FILL THIS OUT //////////

var groceryListsListView = new Container({left: 0, right: 0, top:50, skin: whiteSkin, 
	contents: [
	//////// STEVEN PAY ATTENTION TO THIS //////////
		searchBar,
		new addButtonTemplate(),
		suggestions,
		groceryListsColumn
	//////// STEVEN PAY ATTENTION TO THIS //////////
		
	], 	
});

var groceryListsAddView = new Container({left: 0, right: 0, top: 50, skin: whiteSkin,
	contents: [
		groceryListsItemsColumn // STEVEN CHANGE THIS
	]
});

var groceryListsItemsView = new Container({left: 0, right: 0, top: 50, skin: whiteSkin,
	contents: [
		groceryListsItemsColumn
	]
});