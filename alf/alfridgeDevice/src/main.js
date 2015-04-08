//@program server ijo kinoma

//@program
deviceURL = ""

var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var labelStyleH = new Style( { font: "bold 20px", color:"black" } );

Handler.bind("/respond", Behavior({
	onInvoke: function(handler, message){
		message.responseText = "You found me!";
		message.status = 200;	
	}
}));

var labelStyle = new Style( { font: "bold 17px", color:"black" } );
var labelbot = new Style( { font: "bold italic 20px", color:"black" } );
var labelbot12 = new Style( { font: "italic 20px", color:"green" } );
var labelbot122 = new Style( { font: "italic 20px", color:"red" } );
var labelbot123 = new Style( { font: "italic 15px", color:"black" } );
var whiteS = new Skin({fill:"white"});

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("tutorial3phone.app");
	},
	onQuit: function(application) {
		application.forget("tutorial3phone.app");
	},
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.shared = false;
	},
})

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		var discovery = JSON.parse(message.requestText);
		deviceURL = JSON.parse(message.requestText).url;
		handler.invoke(new Message(discovery.url + "respond"), Message.TEXT);
	},
	onComplete: function(handler, message, text){
		/*for(var key in message){
      trace(key+"\n");
   }*/
		trace("Response was: " + text + "\n");
		
	}
}));

application.invoke( new MessageWithObject( "pins:configure", {
                analogSensor: {
                    require: "analog",
                    pins: {
                        analog: { pin: 52 },
                        analog1: { pin: 52 }
                        
                    }
                }
                }));
                

application.invoke(new MessageWithObject("pins:/analogSensor/read?" +
	serializeQuery({
		repeat: "on",
		interval: 20,
		callback: "/gotAnalogResult"
	})));

Handler.bind("/gotAnalogResult", Object.create(Behavior.prototype, {
	onInvoke:{value: function(handler, message){ 
		var resultsemua = message.requestObject;
		var result=resultsemua.analogValue4;
		//application.distribute("onAnalogValueChanged", result);
		a=result*100;
		labelHead.string=a.toString().substring(0,1)+"0";
		
		var result1 = resultsemua.analogValue1;
		//application.distribute("onAnalogValueChanged", result1);
		a=result1*100;
		labelHea.string=a.toString().substring(0,1)+"0";
		
		var result2 = resultsemua.analogValue2;
		//application.distribute("onAnalogValueChanged", result1);
		a=result2*100;
		labelHeea.string=a.toString().substring(0,4);
		
		var result3 = resultsemua.analogValue3;
		//application.distribute("onAnalogValueChanged", result1);
		a=result3*100;
		labelHeea5.string=a.toString().substring(0,4);
		}}
		}));
	



Handler.bind("/feed", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify( { count: labelHead.string } );
		message.status = 200;
	}
}));


var MainCon = Container.template(function($) { return {
    left: 0, right: 0, top: 30, bottom: 68, skin: whiteS, active: true,
    //contents:[new Label({left:0, right:0, top:30, height: 30, string: "Temperature Converter", style: labelStyle})]
}});

var refreshS=new Skin({fill:"#FF0000"});


Handler.bind("/refresh", Behavior({
	onInvoke: function(handler, message){
		if(Number(labelHeea5.string)<70){
				application.invoke(new Message(deviceURL + "heartlow"), Message.JSON);
			}else if(Number(labelHeea5.string)>80){
				application.invoke(new Message(deviceURL + "heartfast"), Message.JSON);
			}else{
				application.invoke(new Message(deviceURL + "heartnormal"), Message.JSON);
			}
			
			if(Number(labelHeea.string)<25){
				application.invoke(new Message(deviceURL + "underr"), Message.JSON);
			}else if(Number(labelHeea.string)>35){
				application.invoke(new Message(deviceURL + "overr"), Message.JSON);
			}else{
				application.invoke(new Message(deviceURL + "normall"), Message.JSON);
			}
			
			if(Number(labelHea.string)<70){
				application.invoke(new Message(deviceURL + "lowm"), Message.JSON);
			}else if(Number(labelHea.string)>80){
				application.invoke(new Message(deviceURL + "highm"), Message.JSON);
			}else{
				application.invoke(new Message(deviceURL + "normm"), Message.JSON);
			}
			
			
			if(Number(labelHead.string)==90){
				application.invoke(new Message(deviceURL + "full90"), Message.JSON);
			}else if(Number(labelHead.string)==80){
				application.invoke(new Message(deviceURL + "full80"), Message.JSON);
			}else if(Number(labelHead.string)==70){
				application.invoke(new Message(deviceURL + "full70"), Message.JSON);
			}else if(Number(labelHead.string)==60){
				application.invoke(new Message(deviceURL + "full60"), Message.JSON);
			}else if(Number(labelHead.string)==50){
				application.invoke(new Message(deviceURL + "full50"), Message.JSON);
			}else if(Number(labelHead.string)==40){
				application.invoke(new Message(deviceURL + "full40"), Message.JSON);
			}else if(Number(labelHead.string)==30){
				application.invoke(new Message(deviceURL + "full30"), Message.JSON);
			}else if(Number(labelHead.string)==20){
				application.invoke(new Message(deviceURL + "full20"), Message.JSON);
			}else if(Number(labelHead.string)==10){
				application.invoke(new Message(deviceURL + "full10"), Message.JSON);
			}
			
			
			if(Number(labelHea.string)==90){
				application.invoke(new Message(deviceURL + "full900"), Message.JSON);
			}else if(Number(labelHea.string)==80){
				application.invoke(new Message(deviceURL + "full800"), Message.JSON);
			}else if(Number(labelHea.string)==70){
				application.invoke(new Message(deviceURL + "full700"), Message.JSON);
			}else if(Number(labelHea.string)==60){
				application.invoke(new Message(deviceURL + "full600"), Message.JSON);
			}else if(Number(labelHea.string)==50){
				application.invoke(new Message(deviceURL + "full500"), Message.JSON);
			}else if(Number(labelHea.string)==40){
				application.invoke(new Message(deviceURL + "full400"), Message.JSON);
			}else if(Number(labelHea.string)==30){
				application.invoke(new Message(deviceURL + "full300"), Message.JSON);
			}else if(Number(labelHea.string)==20){
				application.invoke(new Message(deviceURL + "full200"), Message.JSON);
			}else if(Number(labelHea.string)==10){
				application.invoke(new Message(deviceURL + "full100"), Message.JSON);
			}
		message.responseText = JSON.stringify( { count: labelHead.string } );
		message.status = 200;
	}
}));

var updateButton = BUTTONS.Button.template(function($){ return{
	left: 0, right: 0, height:30, skin:refreshS,
	contents: [
		new Label({left:0, right:0, height:41, string:"Click to refresh client data", style: labelStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			if(Number(labelHeea5.string)<70){
				content.invoke(new Message(deviceURL + "heartlow"), Message.JSON);
			}else if(Number(labelHeea5.string)>80){
				content.invoke(new Message(deviceURL + "heartfast"), Message.JSON);
			}else{
				content.invoke(new Message(deviceURL + "heartnormal"), Message.JSON);
			}
			
			if(Number(labelHeea.string)<25){
				content.invoke(new Message(deviceURL + "underr"), Message.JSON);
			}else if(Number(labelHeea.string)>35){
				content.invoke(new Message(deviceURL + "overr"), Message.JSON);
			}else{
				content.invoke(new Message(deviceURL + "normall"), Message.JSON);
			}
			
			if(Number(labelHea.string)<70){
				content.invoke(new Message(deviceURL + "lowm"), Message.JSON);
			}else if(Number(labelHea.string)>80){
				content.invoke(new Message(deviceURL + "highm"), Message.JSON);
			}else{
				content.invoke(new Message(deviceURL + "normm"), Message.JSON);
			}
			
			
			if(Number(labelHead.string)==90){
				content.invoke(new Message(deviceURL + "full90"), Message.JSON);
			}else if(Number(labelHead.string)==80){
				content.invoke(new Message(deviceURL + "full80"), Message.JSON);
			}else if(Number(labelHead.string)==70){
				content.invoke(new Message(deviceURL + "full70"), Message.JSON);
			}else if(Number(labelHead.string)==60){
				content.invoke(new Message(deviceURL + "full60"), Message.JSON);
			}else if(Number(labelHead.string)==50){
				content.invoke(new Message(deviceURL + "full50"), Message.JSON);
			}else if(Number(labelHead.string)==40){
				content.invoke(new Message(deviceURL + "full40"), Message.JSON);
			}else if(Number(labelHead.string)==30){
				content.invoke(new Message(deviceURL + "full30"), Message.JSON);
			}else if(Number(labelHead.string)==20){
				content.invoke(new Message(deviceURL + "full20"), Message.JSON);
			}else if(Number(labelHead.string)==10){
				content.invoke(new Message(deviceURL + "full10"), Message.JSON);
			}
			
			
			if(Number(labelHea.string)==90){
				content.invoke(new Message(deviceURL + "full900"), Message.JSON);
			}else if(Number(labelHea.string)==80){
				content.invoke(new Message(deviceURL + "full800"), Message.JSON);
			}else if(Number(labelHea.string)==70){
				content.invoke(new Message(deviceURL + "full700"), Message.JSON);
			}else if(Number(labelHea.string)==60){
				content.invoke(new Message(deviceURL + "full600"), Message.JSON);
			}else if(Number(labelHea.string)==50){
				content.invoke(new Message(deviceURL + "full500"), Message.JSON);
			}else if(Number(labelHea.string)==40){
				content.invoke(new Message(deviceURL + "full400"), Message.JSON);
			}else if(Number(labelHea.string)==30){
				content.invoke(new Message(deviceURL + "full300"), Message.JSON);
			}else if(Number(labelHea.string)==20){
				content.invoke(new Message(deviceURL + "full200"), Message.JSON);
			}else if(Number(labelHea.string)==10){
				content.invoke(new Message(deviceURL + "full100"), Message.JSON);
			}
			
			
			
			
			
		}},
	})
}});

var upCon = Container.template(function($) { return {
    left: 0, right: 0, top: 0, bottom: 212, skin: whiteS, active: true,
}});

var botCon = Container.template(function($) { return {
    left: 0, right: 0, top: 173, bottom: 0, skin: whiteS, active: true,
    //contents:[new Label({left:0, right:0, top:30, height: 30, string: "Temperature Converter", style: labelStyle})]
}});


var MainContainer = new MainCon;
	
var labelHead=new Label({left:150, right:0, top:10, height: 30, string: "Temperature Converter", style: labelStyle })
var labelHead1=new Label({left:0, right:100, top:0, height: 30, string: "Full Level: ", style: labelStyle })
var labelHead2=new Label({left:230, right:0, top:10, height: 30, string: '%', style: labelStyle })
MainContainer.add(labelHead1);
MainContainer.add(labelHead2);
MainContainer.add(labelHead);	

var labelHea=new Label({left:150, right:0, top:50, height: 30, string: "50", style: labelStyle })
var labelHea1=new Label({left:0, right:100, top:35, height: 30, string: "Mood Level: ", style: labelStyle })
var labelHea2=new Label({left:230, right:0, top:50, height: 30, string: '%', style: labelStyle })
MainContainer.add(labelHea1);
MainContainer.add(labelHea2);
MainContainer.add(labelHea);	

var labelHeea=new Label({left:150, right:0, top:85, height: 30, string: "60", style: labelStyle })
var labelHeea1=new Label({left:0, right:100, top:70, height: 30, string: "Weight: ", style: labelStyle })
var labelHeea2=new Label({left:230, right:0, top:85, height: 30, string: 'lb', style: labelStyle })
MainContainer.add(labelHeea1);
MainContainer.add(labelHeea2);
MainContainer.add(labelHeea);

var labelHeea5=new Label({left:150, right:0, top:120, height: 30, string: "150", style: labelStyle })
var labelHeea15=new Label({left:0, right:100, top:105, height: 30, string: "Heart Rate: ", style: labelStyle })
var labelHeea25=new Label({left:230, right:0, top:120, height: 30, string: 'bpm', style: labelStyle })
MainContainer.add(labelHeea15);
MainContainer.add(labelHeea25);
MainContainer.add(labelHeea5);





var labelMus=new Label({left:0, right:0, bottom:50, height: 15, string: "Now Listening To Music", style: labelbot12 })
var labelMus2=new Label({left:0, right:0, bottom:25, height: 20, string: "Some Food Left", style: labelbot12 })
var labelMus3=new Label({left:0, right:0, bottom:5, height: 20, string: "Recent Activity: Turning On Music", style: labelbot123 })


var actButton = BUTTONS.Button.template(function($){ return{
	bottom:5, left: 50, right: 50, height:20,
	contents: [
		new Label({left:0, right:0, height:30, string:"Recent Activities", style: labelStyleH})
	],
	/*behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "reset"), Message.JSON);
		}},
		onComplete: { value: function(content, message, json){
			//counterLabel.string = json.count;
		}}
	})*/
}});




count=0;
Handler.bind("/musicOn", Behavior({
	onInvoke: function(handler, message){
		labelMus.string = "Now Listening To Music";
		labelMus.style = labelbot12;
		labelMus3.string = "Recent Activity: Turning On Music";
		message.responseText = JSON.stringify( { count: "0" } );
		message.status = 200;
	}
}));

Handler.bind("/musicOff", Behavior({
	onInvoke: function(handler, message){
		labelMus.string = "Music Is Off";
		labelMus.style = labelbot122;
		labelMus3.string = "Recent Activity: Turning Off Music";
		message.responseText = JSON.stringify( { count: "0" } );
		message.status = 200;
	}
}));

Handler.bind("/throww", Behavior({
	onInvoke: function(handler, message){
		labelMus2.string = "No Food Left";
		labelMus2.style = labelbot122;
		labelMus3.string = "Recent Activity: Throwing Food";
		message.responseText = JSON.stringify( { count: "0" } );
		message.status = 200;
	}
}));

Handler.bind("/feedd", Behavior({
	onInvoke: function(handler, message){
		var myObject = JSON.parse(message.requestText);
		labelMus2.string = myObject.getWeight.toString().substring(0,1)+"lb Food Left";
		labelMus2.style = labelbot12;
		labelMus3.string = "Recent Activity: Feeding "+myObject.getWeight.toString().substring(0,1)+ "lb Food";
		message.responseText = JSON.stringify( { count: "0" } );
		message.status = 200;
	}
}));







bot=new botCon();
c=new upCon
count = 0;
application.add(MainContainer);

application.add(bot);
bot.add(labelMus);
bot.add(labelMus2);
bot.add(labelMus3);
//bot.add(new actButton());
//MainContainer.add(upbot);
application.add(c);
c.add(new updateButton());


application.behavior = new ApplicationBehavior();