
var whiteSkin = new Skin({fill:"white"});
var titleStyle = new Style({font:"20px", color:"black"}); 
var groceryListsMainBody =  new Container({top:40, bottom:0, right: 0, left:0, skin:whiteSkin, 
			contents:[
				new Label({left:0, right:0, top:10,  string: "Grocery Lists", style: titleStyle }),	], 	
		});
					