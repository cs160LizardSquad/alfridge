
/* "backend" */
var THEME = require('themes/sample/theme');
var fieldStyle = new Style({ color: 'black', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'black',});
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
	"Tradder Jodjske's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Trader Jdasoe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
	"Trader ASJoe's": {updated: new Date().getTime(), items: ["Popcorn", "Hotdogs", "Cheese"]},
};

function updateSuggestions(allItemsDict){
	var data = {};
	for(var item in JSON.parse(allItemsDict)){
	
	}
}

function updateGroceryLists(){
	groceryListsColumn.empty();
	for(listName in groceryLists){
		groceryListsColumn.add(new Container({top: 0, right: 0, left: 0, height: 60, skin: listSkin, active: true,
			contents: [
				new Label({top: 12, right: 0, left: 20, string: listName, style: textStyle }),
				new Label({top: 36, right: 0, left: 20, string: "Updated " + groceryLists[listName]["updated"], style: subtextStyle}),
			],
			behavior: {
				onTouchBegan: function(content, id, x, y, ticks){
					updateGroceryListList(listName)
					application.add(groceryListsItemsView);
				}
			}
		}));
	}
}

function updateGroceryListList(listName){
	groceryListsColumn.empty();
	for(item in groceryLists[listName]["items"]){
		groceryListsItemsColumn.add(new Label({string: groceryLists[listName]["items"][item]}));
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
updateGroceryLists();

var groceryListsItemsColumn = new Column({left: 0, right: 0, top: 50, bottom: 0, skin: whiteSkin, style: textStyle,
	contents: [
		new Label({string: "CHEESE", style: textStyle})
	]
});
//updateGroceryListList(listName)

var searchBar = new Container({left: 0, right: 60, top: 0, height: 50, skin: searchBarSkin,
	contents: [
		new Label({string: "Search", style: new Style({font:"20px Petala Pro Thin", color:"#5A6060"}),
			editable:true, active:true, left: 20,
			behavior: CONTROL.FieldLabelBehavior({
        		onDisplaying: function(container) {
					//container.focus();
				}
			})
		})
	]
});

var nameBar = new Container({left: 0, right: 110, top: 0, height: 50, skin: whiteSkin,
	contents: [
		new Label({string: "Grocery List Name", style: new Style({font:"20px Petala Pro Thin", color:"#5A6060"})})
	]
});

var itemsBar = new Container({left: 0, right: 235, top: 80, height: 50, skin: whiteSkin,
	contents: [
		new Label({string: "Items", style: new Style({font:"20px Petala Pro Thin", color:"#5A6060"})})
	]
});

var MyField = Container.template(function($) { return { 
  width: 280, height: 36, top:$.itemTop,skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        listName=Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Name...", name:"hint"
         })
      ]
    })
  ]
}});

var MyField1 = Container.template(function($) { return { 
  width: 280, height: 36, top:$.itemTop, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        itemLabel1=Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Item...", name:"hint"
         })
      ]
    })
  ]
}});

var MyField2 = Container.template(function($) { return { 
  width: 280, height: 36, top:$.itemTop, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        itemLabel2=Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Item...", name:"hint"
         })
      ]
    })
  ]
}});

var MyField3 = Container.template(function($) { return { 
  width: 280, height: 36, top:$.itemTop, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        itemLabel3=Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Item...", name:"hint"
         })
      ]
    })
  ]
}});

/*var MyField4 = Container.template(function($) { return { 
  width: 280, height: 36, top:$.itemTop, skin: nameInputSkin, contents: [
  	//new XButton,
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        itemLabel4=Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Item...", name:"hint"
         })
      ]
    })
  ]
}});

var MyField5 = Container.template(function($) { return { 
  width: 280, height: 36, top:$.itemTop, skin: nameInputSkin, contents: [
  	//new XButton,
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        itemLabel5=Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         			var data = this.data;
              data.name = label.string;
              label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Item...", name:"hint"
         })
      ]
    })
  ]
}});*/


var MainContainerTemplate = Container.template(function($) { return {
  left: 40, right: 40, top: $.mytop,  skin: whiteSkin, active: true,
  behavior: Object.create(Container.prototype, {
    onTouchEnded: { value: function(content){
      KEYBOARD.hide();
      content.focus();
    }}
  })
}});

var namefield = new MyField({ itemTop:40, name: "" });

var itemsfield1 = new MyField1({ itemTop:120, name: "" });
var itemsContainer = new MainContainerTemplate({mytop:0});
itemsContainer.add(nameBar);
itemsContainer.add(namefield);
itemsContainer.add(itemsBar);
itemsContainer.add(itemsfield1);

var itemsfield2 = new MyField2({ itemTop: 160,name: "" });
itemsContainer.add(itemsfield2);

var itemsfield3 = new MyField3({ itemTop: 200,name: "" });
itemsContainer.add(itemsfield3);

/*var itemsfield4 = new MyField4({ itemTop: 120,name: "" });
itemsContainer.add(itemsfield4);

var itemsfield5 = new MyField5({ itemTop: 160,name: "" });
itemsContainer.add(itemsfield5);*/

function clearAllFields(){
	listName.string="";
	listName.container.hint.visible=true;
	itemLabel1.string="";
	itemLabel1.container.hint.visible=true;
	itemLabel2.string="";
	itemLabel2.container.hint.visible=true;
	itemLabel3.string="";
	itemLabel3.container.hint.visible=true;
	/*itemLabel4.string="";
	itemLabel4.container.hint.visible=true;
	itemLabel5.string="";
	itemLabel5.container.hint.visible=true;*/
}


var backButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:100, left:0, top: 5, 
	skin: tealSkin,
	contents:[
		new Label({left:10, top:2, height:30,  string:"<", style:new Style({font:"38px Petala Pro", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.remove($.myView)
						}}
					})
}});

var addButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 50, width:60, top: 0, right: 0,
	skin: addButtonSkin,
	contents:[
		new Label({left:18, top:0, height:50, string:"+", style:new Style({font:"38px Petala Pro", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						application.add(groceryListsAddView({}));
					}}
				})
}});

var suggestions = new Container();

var groceryListsListView = new Container({left: 0, right: 0, top:50, skin: whiteSkin, 
	contents: [
		searchBar,
		new addButtonTemplate(),
		suggestions,
		groceryListsColumn
	],
	behavior: Object.create(Container.prototype, {
	    onTouchEnded: { value: function(content){
	      KEYBOARD.hide();
	      content.focus();
	    }}})
});

var submitButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:80, top:350, right: 60,
	skin: addButtonSkin,
	contents:[
		new Label({top:0, height:30, string:"Submit", style:new Style({font:"20px Petala Pro", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						KEYBOARD.hide();
						groceryLists[listName.string]={updated: new Date().getTime(), items: [itemLabel1.string,itemLabel2.string,itemLabel3.string,itemLabel4.string,itemLabel5.string] };
						updateGroceryLists();
						application.remove(groceryListsListView)
						application.add(groceryListsListView)
						//application.remove(groceryListsAddView({}));
					}}
				})
}});

var cancelButtonTemplate = BUTTONS.Button.template(function($){ return{
	height: 30, width:80,top:350, left: 60,
	skin: addButtonSkin,
	contents:[
		new Label({top:0, height:30, string:"Cancel", style:new Style({font:"20px Petala Pro", color:"white"})})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
					onTap: { value:  function(content){
						KEYBOARD.hide();
						clearAllFields();
					}}
				})
}});

var groceryListsAddView = Container.template(function($) { return {left: 0, right: 0, top: 50, bottom: 0, skin: whiteSkin,
	contents: [
		//nameBar,
		//mainContainer,
		//itemsBar,
		itemsContainer,
		new submitButtonTemplate({}),
		new cancelButtonTemplate({}),  
	],
	behavior: Object.create(Container.prototype, {
	    onTouchEnded: { value: function(content){
	      KEYBOARD.hide();
	      content.focus();
	    }}})
}});

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
