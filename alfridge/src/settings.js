var whiteSkin = new Skin({fill:"white"});
var titleStyle = new Style({font:"20px", color:"black"}); 
var settingsStyle = new Style({  font: '20px Petala Pro Light', horizontal: 'left', top: 0, lines: 1, color:"#5A6060"});
var settingsHeaderStyle = new Style({  font: '22px Petala Pro Light', horizontal: 'left', top: 0, lines: 1, color:"#5A6060"});

var settingsLine = Line.template(function($) { return { top:0, height:35, left: 0, right: 0, active: true, skin: lightGraySkin,
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 34, 
     			contents: [
     			           Label($, { top:9, left: 15, style: settingsStyle, string: $.string,}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});
 
var settingsHeaderLine = Line.template(function($) { return { top:5, height:41, left: 0, right: 0, active: true, skin: whiteSkin,
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 4, right: 4, height: 40, 
     			contents: [
     			           Label($, { top:12, left: 15, style: settingsHeaderStyle, string: $.string,}),
 			           ]}),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});

var settingsMainBody =  new Column({top:50, bottom:0, right: 0, left:0, skin:whiteSkin, 
			contents:[
				new settingsHeaderLine({string: "Refrigerator"}),
				new settingsLine({string: "Configure Refrigerator"}),
				new settingsLine({string: "Refrigerator Details"}),
				new settingsLine({string: "Account Details"}),
				new settingsHeaderLine({string: "Notifications"}),
				new settingsLine({string: "Notification Settings"}),
				new settingsLine({string: "Reminders"}),
				new settingsHeaderLine({string: "About"}),
				new settingsLine({string: "Version"}),
				new settingsLine({string: "Terms and Conditions"}),
				new settingsLine({string: "Rate Alfridge"}),
				new settingsLine({string: "Contact Us"}),
				], 	
		});
		


