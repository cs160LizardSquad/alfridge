
var whiteSkin = new Skin({fill:"white"});
var titleStyle = new Style({font:"20px", color:"black"}); 
var troubleshootSearchBar = Line.template(function($) { return { 
 name: "itemSearchBar", top:-50,left: 40, right: 40, height: 40, active: false, skin: whiteSkin, 
 	contents: [
    Scroller($, { 
      name: "scroller", left: 4, right: 4, top: 4, bottom: 4, active: false, 
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
         			//trace('\n' + data.name);
              		label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Picture($, {left:12, top:4, width:25, height: 25, behavior: Object.create(Behavior.prototype, {	 
    				onTouchEnded: { value: function(container, id, x,  y, ticks) {	
    					KEYBOARD.hide();
						application.focus();}}}),url: "assets/search-icon.png"}),
         Label($, {
   			 	left:22, right:0, top:0, bottom:0, style: hintStyle, string:"Search...", name:"hint"
         })
      ]
    }),
  ]
}});
var troubleshootMainBody =  new Column({top:50, bottom:0, right: 0, left:0, skin:lightGraySkin, 
			behavior: Object.create(Behavior.prototype, {	 
    				onTouchEnded: { value: function(container, id, x,  y, ticks) {	
    					KEYBOARD.hide();
						application.focus();}}}),
			contents:[
				new Picture({top:0, left:15, width:300, height: 316, url: "assets/troubleshoot-pic.png"}),
				new troubleshootSearchBar({name: ""}),]

		});
				
				
