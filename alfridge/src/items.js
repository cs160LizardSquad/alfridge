=
var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');

/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var lightGraySkin = new Skin({fill: "#f1f1f2"});
var graySkin	= new Skin({ fill: '#a7a9ab'});
var darkGraySkin = new Skin({ fill: '#7f7f7f'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});

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

/* This is a template that will be used to for each entry populating the list. 
 * Note that it is anticipating an object each time in is instanciated */
var ProcessorLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: lightGraySkin,
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
     			           Label($, { left:25, style: expirationStyle, string: "Expires in " + $.expiration + " days",}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     	Column($, { width:90, contents: [
     		Container($, { left: 4, right: 0, height: 52, 
     			contents: [
     			           Label($, {  style: quantityStyle, string: $.quantity,}),
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
	name: "list", left:0, right:0, top:50, bottom:0, skin: new Skin({fill: "#f1f1f2"}),
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
     				itemsMainBody.tabs.quantityTab.skin = graySkin;
     				itemsMainBody.tabs.expirationTab.skin = graySkin;
				}}, 
			}), contents:[
				new Label({top:0, bottom:0, style: tabStyle, string: "Recent"}),
			]}),
			Column($, {name: "quantityTab",active: true, skin: graySkin, right:0, left:0, top:0, bottom:0, 
			behavior: Object.create(Behavior.prototype, {	
				onTouchEnded: { value: function(container) {	
     				container.skin = darkGraySkin;
     				itemsMainBody.tabs.recentTab.skin = graySkin;
     				itemsMainBody.tabs.expirationTab.skin = graySkin;
				}}, 
			}),
				contents:[
				new Label({top:0, bottom:0, style: tabStyle, string: "Quantity"}),
			]}),
			Column($, {name: "expirationTab",active: true, skin: graySkin, right:0, left:0, top:0, bottom:0, 
			behavior: Object.create(Behavior.prototype, {	
				onTouchEnded: { value: function(container) {	
     				container.skin = darkGraySkin;
     				itemsMainBody.tabs.recentTab.skin = graySkin;
     				itemsMainBody.tabs.quantityTab.skin = graySkin;
				}}, 
			}),
			contents:[
				new Label({top:0, bottom:0, style: tabStyle, string: "Expiration"}),
			]}),

		]}});
		
var searchBar = Line.template(function($) { return { 
 name: "itemSearchBar", left: 0, right: 0, height: 40, active: true, skin: lightGraySkin, 
 	contents: [
    Scroller($, { 
      name: "scroller", left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { name:"label",
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
    		onTouch: { value: function() {	
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

var itemsMainBody = null;

var itemsListTemplate = Container.template(function($) { return { 
 right:0, left:0, top:50, bottom:0, contents: [
   new ScreenContainer(data)
  ]
}});


/* This simple function exists so we can call "forEach" on
 * our array of list entries (menuItems).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ListBuilder(dict) {
	itemsMainBody.list.first.menu.add(new searchBar({name: ""}));
	itemsMainBody.list.first.menu.add(new Line({ left: 0, right: 0, height: 1, skin: separatorSkin, }));
	for (var key in dict){
		if (dict.hasOwnProperty(key)) {
			itemsMainBody.list.first.menu.add(new ProcessorLine(dict[key]));
		}
	}
}

