var THEME = require ("themes/flat/theme");
var CONTROL = require ("mobile/control");
var PinsSimulators = require ("PinsSimulators");

var buttonStyle = new Style({font:"20px Petala Pro Thin", color:["white","white", "white"], horizontal:"center" });
var enabledEffect = new Effect;
enabledEffect.colorize("#117384");
var selectedEffect = new Effect;
selectedEffect.colorize("#117384");
var testSkin = new Skin({fill: "white",
			//stroke: "black", borders:{right:1, left:1, top:1, bottom:1}
					});
var buttonSkin = new THEME.DynamicSkin( THEME.buttonTexture, THEME.disabledEffect, 
											enabledEffect, selectedEffect, undefined,
											{ left : 5, top : 5, right : 5, bottom : 5 });
var textStyle = new Style({font:"20px Petala Pro Thin", color: "gray", horizontal:"left"});
var orientationInstance = null;
var addItemScreen = null;
var body = null;

/**
dictionary of items in the refrigerator!\
key: item name, as a string
value: {compartment: xx, expiration: xx, quantity: xx}
**/
var allItemsDict = {};
var comp1ItemsDict = {};
var comp2ItemsDict = {};
var comp3ItemsDict = {};
var comp4ItemsDict = {};
var comp5ItemsDict = {};
var comp6ItemsDict = {};
var itemsDictList = [null, comp1ItemsDict, comp2ItemsDict, comp3ItemsDict, comp4ItemsDict, comp5ItemsDict, comp6ItemsDict]

var OrientationBehavior = function(column, data) {
  Behavior.call(this, column, data);
}
OrientationBehavior.prototype = Object.create(Behavior.prototype, {
  onCreate: { value: function(column, data) {
  	body = mainContainer(data)
  	column.partContentsContainer.add(body);
    addItemScreen = new addItemScreenTemplate(data); 
    orientationColumn = column;
  }},
});

var emptyContainer = Container.template(function($) { return {
  left:0, right:0, top:0, bottom:0,active:true, skin: testSkin,}});
  
var mainContainer = Container.template(function($) { return {
  left:0, right:0, top:0, bottom:10, active:true, skin: testSkin,
  contents:[new Column({name: "mainCol", top:0, bottom:0, right:0, left:0, contents:[
	  			new Line({height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Actions"})]}),
	  			new Line({height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new emptyContainer(),
	  					new addItemButton(), new setItemsButton({string: "Clear All", preset: "clear"}),
	  					new emptyContainer(),]}),
	  			new Line({height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Presets"})]}),
	  			new Line({height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new emptyContainer(),
	  					new setItemsButton({string: "Preset 1", preset: "1"}),
	  					new setItemsButton({string: "Preset 2", preset: "2"}),
	  					new setItemsButton({string: "Preset 3", preset: "3"}),
	  					new emptyContainer(),]}),
	  			new Line({top:5, height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Compartment 1"})]}),
	  			new Line({name: "comp1", top:0, bottom:0, right:0, left:0, skin: testSkin, contents:[
	  					]}),
	  			new Line({top:5, height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Compartment 2"})]}),
	  			new Line({name: "comp2", top:0, bottom:0, right:0, left:0, skin: testSkin, contents:[
	  					]}),
	  			new Line({top:5, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Compartment 3"})]}),
	  			new Line({name: "comp3", top:0, bottom:0, right:0, left:0, skin: testSkin, contents:[
	  					]}),
	  			new Line({top:5, height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Compartment 4"})]}),
	  			new Line({name: "comp4", top:0, bottom:0, right:0, left:0, skin: testSkin, contents:[
	  					]}),
	  			new Line({top:5, height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Compartment 5"})]}),	
	  			new Line({name: "comp5", top:0, bottom:0, right:0, left:0, skin: testSkin, contents:[
	  					]}),		
	  			new Line({top:5, height: 30, right:0, left:0, skin: testSkin, contents:[
	  					new Label({height: 30, left:0, right:0, style: textStyle, string: "Compartment 6"})]}),	
	  			new Line({name: "comp6", top:0, bottom:10, right:0, left:0, skin: testSkin, contents:[
	  					]}), 		  							  			
  			]})
  		]}});
  		
var removeItemButton = Column.template(function($) { return {
    width:20, height:20, active:true, skin:buttonSkin,
    behavior: Object.create(CONTROL.ButtonBehavior.prototype, {
      onTap: { value: function(container) {
      trace('removing item');
      if ($.quantity < allItemsDict[$.itemName]){
      	allItemsDict[$.itemName].quantity -=$.quantity;
      }else{
       delete allItemsDict[$.itemName];
      }
		delete itemsDictList[$.num][$.itemName];
		refreshCompartments();
		orientationColumn.partContentsContainer.remove(body);
		orientationColumn.partContentsContainer.add(body);
       
      }},
    }),
    contents: [Label($, { top:0, bottom:0, style:buttonStyle, string:"x"}),]
}});
  		
var itemColTemplate = Column.template(function($) { return {
    left:0, right:0, top:0, bottom:0, skin:testSkin,
    contents: []
}});

var itemLineTemplate = Line.template(function($) { return {
    right:0, left:0, height:25, active:true, skin: new Skin({fill: "white"}),
    contents: [
    	Column($, {left:10, right:0, top:0, bottom:0, contents:[
    		Label($, { left:0, right:0, top:0, bottom:0, style:new Style({font:"24px Petala Pro", color: "#117384", horizontal:"left"}), string:$.itemName}),
    	]}),
    	Column($, {width: 40, right:20, top:0, bottom:0, skin: testSkin, contents:[
    		Label($, { left:0, right:0, top:0, bottom:0, style:new Style({font:"24px Petala Pro", color: "#117384", horizontal:"right"}), string:$.quantity}),
    	]}),
		new removeItemButton({num: $.num, itemName: $.itemName, quantity: $.quantity}),
    ]
}});
var compartmentsList = [];

function refreshCompartments(){
	if(!!compartmentsList[1]){body.mainCol.comp1.remove(compartmentsList[1]);}
	if(!!compartmentsList[2]){body.mainCol.comp2.remove(compartmentsList[2]);}
	if(!!compartmentsList[3]){body.mainCol.comp3.remove(compartmentsList[3]);}
	if(!!compartmentsList[4]){body.mainCol.comp4.remove(compartmentsList[4]);}
	if(!!compartmentsList[5]){body.mainCol.comp5.remove(compartmentsList[5]);}
	if(!!compartmentsList[6]){body.mainCol.comp6.remove(compartmentsList[6]);}
	for	(i = 1; i < 7; i++){
		compartmentsList[i] = new itemColTemplate({num: i});}
	for (var key in itemsDictList[1]) {
		compartmentsList[1].add(new itemLineTemplate({num: 1, itemName: key, quantity: itemsDictList[1][key].quantity}));}
	for (var key in itemsDictList[2]) {
		compartmentsList[2].add(new itemLineTemplate({num: 2, itemName: key, quantity: itemsDictList[2][key].quantity}));}
	for (var key in itemsDictList[3]) {
		compartmentsList[3].add(new itemLineTemplate({num: 3, itemName: key, quantity: itemsDictList[3][key].quantity}));}
	for (var key in itemsDictList[4]) {
		compartmentsList[4].add(new itemLineTemplate({num: 4, itemName: key, quantity: itemsDictList[4][key].quantity}));}
	for (var key in itemsDictList[5]) {
		compartmentsList[5].add(new itemLineTemplate({num: 5, itemName: key, quantity: itemsDictList[5][key].quantity}));}
	for (var key in itemsDictList[6]) {
		compartmentsList[6].add(new itemLineTemplate({num: 6, itemName: key, quantity: itemsDictList[6][key].quantity}));}		
	body.mainCol.comp1.add(compartmentsList[1]);
	body.mainCol.comp2.add(compartmentsList[2]);	
	body.mainCol.comp3.add(compartmentsList[3]);	
	body.mainCol.comp4.add(compartmentsList[4]);	
	body.mainCol.comp5.add(compartmentsList[5]);	
	body.mainCol.comp6.add(compartmentsList[6]);	
}; 
 
var addItemButton = Container.template(function($) { return {
    width:80, right:10, height:30, active:true, skin:buttonSkin,
    behavior: Object.create(CONTROL.ButtonBehavior.prototype, {
      onCreate: { value: function(container, $) {
        CONTROL.ButtonBehavior.prototype.onCreate.call(this, container);
      }},
      onTap: { value: function(container) {
        orientationColumn.partContentsContainer.remove(body);
		orientationColumn.partContentsContainer.add(addItemScreen);
      }},
    }),
    contents: [
      Label($, { top:0, bottom:0, style:buttonStyle, string:"Add Item"}),
    ]
}});

var setItemsButton = Container.template(function($) { return {
    width:80, right:10, height:30, active:true, skin:buttonSkin,
    behavior: Object.create(CONTROL.ButtonBehavior.prototype, {
      onCreate: { value: function(container, $) {
        CONTROL.ButtonBehavior.prototype.onCreate.call(this, container);
      }},
      onTap: { value: function(container) {
		if ($.preset == "clear"){
		trace('clearing all items');
			allItemsDict = {};
			comp1ItemsDict = {};
			comp2ItemsDict = {};
			comp3ItemsDict = {};
			comp4ItemsDict = {};
			comp5ItemsDict = {};
			comp6ItemsDict = {};
			itemsDictList = [null, comp1ItemsDict, comp2ItemsDict, comp3ItemsDict, comp4ItemsDict, comp5ItemsDict, comp6ItemsDict]
			refreshCompartments();
			orientationColumn.partContentsContainer.remove(body);
			orientationColumn.partContentsContainer.add(body);
		}else if ($.preset == "1"){
		trace('setting items to preset 1 \n');
			allItemsDict = {
				"potatoes": {compartment: 1, expiration: 4,quantity:20},
				"cabbage": {compartment: 2, expiration: 10,quantity:3},
				"soymilk": {compartment: 3, expiration: 100,quantity:28},	
				"carrots": {compartment: 2, expiration: 13,quantity:5},
				"apples": {compartment: 2, expiration: 7,quantity:4},
				"ice cream": {compartment: 4, expiration: 100,quantity:5},
			};
			comp1ItemsDict = {
				"potatoes": {compartment: 1, expiration: 4,quantity:20},
			};
			comp2ItemsDict = {
				"cabbage": {compartment: 2, expiration: 10,quantity:3},
				"carrots": {compartment: 2, expiration: 13,quantity:5},
				"apples": {compartment: 2, expiration: 7,quantity:4},
			};
			comp3ItemsDict = {
				"soymilk": {compartment: 3, expiration: 100,quantity:20},
			};
			comp4ItemsDict = {
				"ice cream": {compartment: 4, expiration: 100,quantity:5},
			};
			comp5ItemsDict = {
				"soymilk": {compartment: 5, expiration: 100,quantity:2},
			};	
			comp6ItemsDict = {
				"soymilk": {compartment: 6, expiration: 100,quantity:6},
			};
			itemsDictList = [null, comp1ItemsDict, comp2ItemsDict, comp3ItemsDict, comp4ItemsDict, comp5ItemsDict, comp6ItemsDict]
			refreshCompartments();
			orientationColumn.partContentsContainer.remove(body);
			orientationColumn.partContentsContainer.add(body);
		}else if ($.preset == "2"){
		trace('setting items to preset 2 \n');
			allItemsDict = {
			"lettuce": {compartment: 1, expiration: 10,quantity:1},
			"tomatoes": {compartment: 1, expiration: 1,quantity:5},
			"cucumbers": {compartment: 1, expiration: 7,quantity:4},
			"milk": {compartment: 2, expiration: 14,quantity:3},
			"chicken thighs": {compartment: 3, expiration: 20,quantity:5},
			"chicken drumsticks": {compartment: 3, expiration: 5,quantity:4},
			"steak": {compartment: 4, expiration: 14,quantity:10},
			"salmon fillets": {compartment: 5, expiration: 20,quantity:5},
			"tilapia fillets": {compartment: 5, expiration: 4,quantity:6},
			"shrimp": {compartment: 5, expiration: 20,quantity:12},
			"clams": {compartment: 5, expiration: 20,quantity:8},
			"cake": {compartment: 6, expiration: 3,quantity:1},
			};
			comp1ItemsDict = {
			"lettuce": {compartment: 1, expiration: 10,quantity:1},
			"tomatoes": {compartment: 1, expiration: 1,quantity:5},
			"cucumbers": {compartment: 1, expiration: 7,quantity:4},
			};
			comp2ItemsDict = {
			"milk": {compartment: 2, expiration: 14,quantity:3},
			};
			comp3ItemsDict = {
			"chicken thighs": {compartment: 3, expiration: 20,quantity:5},
			"chicken drumsticks": {compartment: 3, expiration: 5,quantity:4},
			};
			comp4ItemsDict = {
			"steak": {compartment: 4, expiration: 14,quantity:10},
			};
			comp5ItemsDict = {
			"salmon fillets": {compartment: 5, expiration: 20,quantity:5},
			"tilapia fillets": {compartment: 5, expiration: 4,quantity:6},
			"shrimp": {compartment: 5, expiration: 20,quantity:12},
			"clams": {compartment: 5, expiration: 20,quantity:8},
			};
			comp6ItemsDict = {
			"cake": {compartment: 6, expiration: 3,quantity:1},};
			itemsDictList = [null, comp1ItemsDict, comp2ItemsDict, comp3ItemsDict, comp4ItemsDict, comp5ItemsDict, comp6ItemsDict]
			refreshCompartments();
			orientationColumn.partContentsContainer.remove(body);
			orientationColumn.partContentsContainer.add(body);			
		}else if ($.preset == "3"){
		trace('setting items to preset 3 \n');
			allItemsDict = {"soymilk": {compartment: 1, expiration: 100,quantity:24},};
			comp1ItemsDict = {"soymilk": {compartment: 1, expiration: 100, quantity:4},};
			comp2ItemsDict = {"soymilk": {compartment: 2, expiration: 100, quantity:4},};
			comp3ItemsDict = {"soymilk": {compartment: 3, expiration: 100, quantity:4},};
			comp4ItemsDict = {"soymilk": {compartment: 4, expiration: 100, quantity:4},};
			comp5ItemsDict = {"soymilk": {compartment: 5, expiration: 100, quantity:4},};
			comp6ItemsDict = {"soymilk": {compartment: 6, expiration: 100, quantity:4},};
			itemsDictList = [null, comp1ItemsDict, comp2ItemsDict, comp3ItemsDict, comp4ItemsDict, comp5ItemsDict, comp6ItemsDict]
			refreshCompartments();
			orientationColumn.partContentsContainer.remove(body);
			orientationColumn.partContentsContainer.add(body);
		}
      }},
    }),
    contents: [
      Label($, { top:0, bottom:0, style:buttonStyle, string:$.string}),
    ]
}});

var itemName = "- - -";
var compartmentNum = "- - -";
var expiresIn = "- - -";
var quantity = "- - -";

/**
The following is a template for all buttons on the 'add item' screen.
**/
var KeyboardButton = Container.template(function($) { return {
    width:80, height:30, active:true, skin:buttonSkin,
    behavior: Object.create(CONTROL.ButtonBehavior.prototype, {
      onCreate: { value: function(container, $) {
        CONTROL.ButtonBehavior.prototype.onCreate.call(this, container, $.data);
        this.value = $.string;
        this.field = $.field;
      }},
      onTap: { value: function(container) {
      	if (this.field == "name"){
	      	if (itemName == "- - -" && (this.value == "<-" || this.value == "_")){
	      	}else if (itemName == "- - -"){
	      	itemName = this.value;
	      	}else if (this.value == "<-"){
	      	itemName = itemName.substring(0, itemName.length-1);
	      	}else if (this.value == "_"){
	      	itemName += " ";
	      	}else{itemName += this.value;}
	        addItemScreen.addItemCol.itemNameLine.nameString.string = itemName;
        }else if (this.field == "compartment"){
        	compartmentNum = this.value;
        	addItemScreen.addItemCol.compartmentLine.compartmentString.string = compartmentNum;
        }else if (this.field == "expiration"){
			if (expiresIn == "- - -" && this.value == "<-"){
	      	}else if (expiresIn == "- - -"){
	      	expiresIn = this.value;
	      	}else if (this.value == "<-"){
	      	expiresIn = expiresIn.substring(0, expiresIn.length-1);
	      	}else if (parseInt(expiresIn) > 999){
	      		if (this.value == "<-"){
	      			expiresIn = expiresIn.substring(0, expiresIn.length-1);}
	      	}else{expiresIn += this.value;}
	        addItemScreen.addItemCol.expirationLine.expirationString.string = expiresIn;
        }else if (this.field == "quantity"){
        	if (quantity == "- - -" && this.value == "<-"){
	      	}else if (quantity == "- - -"){
	      	quantity = this.value;
	      	}else if (this.value == "<-"){
	      	quantity = quantity.substring(0, quantity.length-1);
	      	}else if (parseInt(quantity) > 999){
	      		if (this.value == "<-"){
	      			quantity = quantity.substring(0, quantity.length-1);}
	      	}else{quantity += this.value;}
	        addItemScreen.addItemCol.quantityLine.quantityString.string = quantity;
        }
      }},
    }),
    contents: [
      Label($, { top:0, bottom:0, style:buttonStyle, string:$.string }),
    ]
}});

var itemScreenButton = Container.template(function($) { return {
    width:80, height:30, right:10, active:true, skin:buttonSkin,
    behavior: Object.create(CONTROL.ButtonBehavior.prototype, {
      onCreate: { value: function(container, $) {
        CONTROL.ButtonBehavior.prototype.onCreate.call(this, container);
      }},
      onTap: { value: function(container) {
      	if((itemName != "- - -" && itemName != "") &&
      		(compartmentNum != "- - -" && compartmentNum != "") &&
      		(expiresIn != "- - -" && expiresIn != "") &&
      		(quantity != "- - -" && quantity != "")){
			if ($.string == "Done"){
				var currDict = itemsDictList[parseInt(compartmentNum)];
				if(itemName in currDict){
					currDict[itemName].expiration = Math.min(currDict[itemName].expiration, parseInt(expiresIn));
					currDict[itemName].quantity += parseInt(quantity);
					allItemsDict[itemName].expiration = Math.min(allItemsDict[itemName].expiration, parseInt(expiresIn));
					allItemsDict[itemName].quantity += parseInt(quantity);
					trace('item in refrigerator, new numbers: \n' + 
						'item name: ' + itemName + '\n' +
						'expires in: ' + currDict[itemName].expiration + '\n' +
						'quantity: ' + currDict[itemName].quantity + '\n');
 				}else{
 					trace('item is not in dict \n');
 					//trace(Math.min(5,6));
					currDict[itemName] = {compartment: parseInt(compartmentNum),
											expiration: parseInt(expiresIn),
											quantity: parseInt(quantity)};
					allItemsDict[itemName] = {compartment: parseInt(compartmentNum),
											expiration: parseInt(expiresIn),
											quantity: parseInt(quantity)};					
					trace('new item: \n' + 
						'item name: ' + itemName + '\n' +
						'expires in: ' + currDict[itemName].expiration + '\n' +
						'quantity: ' + currDict[itemName].quantity + '\n');
				}
				trace(Object.keys(allItemsDict).length + ' items in refrigerator \n');
			}}
			itemName = "- - -";
			compartmentNum = "- - -";
			expiresIn = "- - -";
			quantity = "- - -";
			addItemScreen.addItemCol.itemNameLine.nameString.string = itemName;
			addItemScreen.addItemCol.compartmentLine.compartmentString.string = compartmentNum;
			addItemScreen.addItemCol.expirationLine.expirationString.string = expiresIn;
			addItemScreen.addItemCol.quantityLine.quantityString.string = quantity;
			refreshCompartments();
			orientationColumn.partContentsContainer.remove(addItemScreen);
			orientationColumn.partContentsContainer.add(body);
      }},
    }),
    contents: [
      Label($, { top:0, bottom:0, style:buttonStyle, string:$.string}),
    ]
}});


var keyWidth = 29;
var addItemScreenTemplate = Container.template(function($) { return {
  left:0, right:0, top:0, bottom:10,active:true, name: "linename",
  contents: [
  	Column(null, {name: "addItemCol", left:0, right:0, top:0, bottom:0, contents:[
	Line(null,{name: "itemNameLine", left:0, right:0, top: 10, bottom:0, contents:[
		Label($,{ name: "xx",width: 100, top:5, height:20, skin: testSkin, style:textStyle, string: "Item Name:" }),
		Label($,{ name: "nameString", left:0, right:0, top:5, height:20, style:textStyle, string: itemName }),
		//new emptyContainer(),
	]}),
  	Line(null,{top:5, bottom:0, right:0, left:0, contents:[
  		new emptyContainer(),
  		KeyboardButton({ data:$, string:"q", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"w", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"e", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"r", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"t", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"y", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"u", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"i", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"o", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"p", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"<-", field: "name"}, {width:keyWidth}),
  		new emptyContainer(),
  	]}),
  	 Line(null,{top:5, bottom:0, right:0, left:0, contents:[
  	 	new emptyContainer(),
  		KeyboardButton({ data:$, string:"a", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"s", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"d", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"f", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"g", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"h", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"j", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"k", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"l", field: "name"}, {width:keyWidth}),
  		new emptyContainer(),
  	]}),
  	Line(null,{top:5, bottom:0, right:0, left:0, contents:[
  		new emptyContainer(),
  		KeyboardButton({ data:$, string:"z", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"x", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"c", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"v", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"b", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"n", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"m", field: "name"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"_", field: "name"}, {width:keyWidth}),
  		new emptyContainer(),
  	]}),
	Line(null,{name: "compartmentLine", left:0, right:0, top: 10, bottom:0, contents:[
		Label($,{ name: "xx",width: 120, top:5, height:20, skin: testSkin, style:textStyle, string: "Compartment:" }),
		Label($,{ name: "compartmentString", left:0, right:0, top:5, height:20, style:textStyle, string: compartmentNum }),
		//new emptyContainer(),
	]}),
  	Line(null,{top:5, bottom:0, right:0, left:0, contents:[
  		new emptyContainer(),
  		KeyboardButton({ data:$, string:"1", field: "compartment"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"2", field: "compartment"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"3", field: "compartment"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"4", field: "compartment"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"5", field: "compartment"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"6", field: "compartment"}, {width:keyWidth}),
  		new emptyContainer(),
  	]}),	
	Line(null,{name: "expirationLine", left:0, right:0, top: 10, bottom:0, contents:[
		Label($,{ name: "xx",width: 150, top:5, height:20, skin: testSkin, style:textStyle, string: "Expires in (days):" }),
		Label($,{ name: "expirationString", left:0, right:0, top:5, height:20, style:textStyle, string: expiresIn }),
		//new emptyContainer(),
	]}),
  	Line(null,{top:5, bottom:0, right:0, left:0, contents:[
  		new emptyContainer(),
  		KeyboardButton({ data:$, string:"0", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"1", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"2", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"3", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"4", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"5", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"6", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"7", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"8", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"9", field: "expiration"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"<-", field: "expiration"}, {width:keyWidth}),
  		new emptyContainer(),
  	]}),	
	Line(null,{name: "quantityLine", left:0, right:0, top: 10, bottom:10, contents:[
		Label($,{ name: "xx",width: 80, top:5, height:20, skin: testSkin, height:20, style:textStyle, string: "Quantity:" }),
		Label($,{ name: "quantityString", left:0, right:0, top:5, height:20, style:textStyle, string: quantity }),
		//new emptyContainer(),
	]}),
  	Line(null,{top:0, bottom:0, right:0, left:0, contents:[
  		new emptyContainer(),
  		KeyboardButton({ data:$, string:"0", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"1", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"2", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"3", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"4", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"5", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"6", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"7", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"8", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"9", field: "quantity"}, {width:keyWidth}),
  		KeyboardButton({ data:$, string:"<-", field: "quantity"}, {width:keyWidth}),
  		new emptyContainer(),
  	]}),
	Line(null,{top: 20, left:0, right:0, height:30, contents:[
	//add cancel and done buttons
		new emptyContainer(),
		itemScreenButton({string: "Done"}),
		itemScreenButton({string: "Cancel"}),
		new emptyContainer(),
	]}),
    ]})
  ],
}});
    
/**
The following is for configuring simulator pins.
**/
exports.pins = {
  ts: {type: "Digital", direction: "input"},
  reset: {type: "Digital", direction: "output"},
  data: {type: "I2C", address: 0x42},
}
exports.configure = function(configuration) {
    this.data = {
      id: 'itemSensor',
      behavior: OrientationBehavior,
      header : { 
        label : "Item Sensor",
        name : "", 
        iconVariant : PinsSimulators.SENSOR_KNOB 
      },
    value: undefined
  };
    this.container = shell.delegate("addSimulatorPart", this.data);
  }
exports.close = function() {
    shell.delegate("removeSimulatorPart", this.container);
}
exports.read = function() {
    var value = {
    compartment1:{items: Object.keys(comp1ItemsDict).length},
    compartment2:{items: Object.keys(comp2ItemsDict).length},
    compartment3:{items: Object.keys(comp3ItemsDict).length},
    compartment4:{items: Object.keys(comp4ItemsDict).length},
    compartment5:{items: Object.keys(comp5ItemsDict).length},
    compartment6:{items: Object.keys(comp6ItemsDict).length},
   	allItemsDict: allItemsDict,
    itemDict1: comp1ItemsDict,
	itemDict2: comp2ItemsDict,
	itemDict3: comp3ItemsDict,
	itemDict4: comp4ItemsDict,
	itemDict5: comp5ItemsDict,
	itemDict6: comp6ItemsDict,
    };
    return value;
}