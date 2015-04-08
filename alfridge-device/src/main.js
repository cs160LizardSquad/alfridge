application.invoke(new MessageWithObject("pins:configure", {
	temperatureControl: {
		require: "temperature",
		pins: {
			comp1: { pin: 51 },
			comp2: { pin: 52 },
			comp3: { pin: 53 },
			comp4: { pin: 54 },
			comp5: { pin: 55 },
			comp6: { pin: 56 },
			comp7: { pin: 57 },
			comp8: { pin: 58 },
		}
	}
}));