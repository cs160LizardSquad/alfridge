
var whiteSkin = new Skin({fill:"white"});
var qStyle = new Style({font:"15px Petala Pro Thin", color:"black",  horizontal: "left"});
var aStyle = new Style({font:"15px Petala Pro Thin", color:"#5A6060", horizontal: "left"});
var troubleshootMainBody =  new Container({top:50, bottom:0, right: 0, left:0, skin:whiteSkin, 
			contents:[
				new Text({left:10, right:0, top:10,  string: "Q: I'd like to customise compartment names - can I do that?", style: qStyle }),
				new Text({left:10, right:0, top:50,  string: "A: Yes, easily! Just double tap on the name of the compartment ", style: aStyle }),
				new Text({left:10, right:0, top:95,  string: "Q: How do I defrost an item? ", style: qStyle }),
				new Text({left:10, right:0, top:115,  string: "A: Click on the compartment you'd like to defrost on home page, and click on the blue button next to the temperature", style: aStyle }),
				new Text({left:10, right:0, top:180,  string: "Q: I'd like to check on a specific food item - how do I do so?", style: qStyle }),
				new Text({left:10, right:0, top:220,  string: "A: Open up the navigation bar with the top left buttom, click on Items, and Alfridge will display the information you need", style: aStyle }) ,	
				new Text({left:10, right:0, top:285,  string: "Q: How do I make a grocery list?", style: qStyle }),
				new Text({left:10, right:0, top:305,  string: "A: Open up Grocery List fron the navigation bar, then click on + button on top right", style: aStyle }),
			],
		});
					