var whiteSkin = new Skin({fill:"white"});
var titleStyle = new Style({font:"20px", color:"black"}); 
var settingsMainBody =  new Container({top:50, bottom:0, right: 0, left:0, skin:whiteSkin, 
			contents:[
				new Label({left:0, right:0, top:10,  string: "Settings", style: titleStyle }),	], 	
		});
