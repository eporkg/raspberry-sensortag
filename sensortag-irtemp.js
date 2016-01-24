
var SensorTag = require('sensortag');		// sensortag library

// listen for tags:
SensorTag.discover(function(tag) {
	// when you disconnect from a tag, exit the program:
	tag.on('disconnect', function() {
		console.log('disconnected!');
		process.exit(0);
	});

	function connectAndSetUpMe() {			// attempt to connect to the tag
     console.log('connectAndSetUp');
     tag.connectAndSetUp(enableIrTempMe);		// when you connect, call enableIrTempMe
   }

   function enableIrTempMe() {		// attempt to enable the IR Temperature sensor
     console.log('enableIRTemperatureSensor');
     // when you enable the IR Temperature sensor, start notifications:
     tag.enableIrTemperature(notifyMe);
   }

	function notifyMe() {
   	tag.notifyIrTemperature(listenForTempReading);   	// start the accelerometer listener
		tag.notifySimpleKey(listenForButton);		// start the button listener
   }

   // When you get an accelermeter change, print it out:
	function listenForTempReading() {
		tag.on('irTemperatureChange', function(objectTemp, ambientTemp) {
	     console.log('\tObject Temp = %d deg. C', objectTemp.toFixed(1));
	     console.log('\tAmbient Temp = %d deg. C', ambientTemp.toFixed(1));
	   });
	}

	// when you get a button change, print it out:
	function listenForButton() {
		tag.on('simpleKeyChange', function(left, right) {
			if (left) {
				console.log('left: ' + left);
			}
			if (right) {
				console.log('right: ' + right);
			}
			// if both buttons are pressed, disconnect:
			if (left && right) {
				tag.disconnect();
			}
	   });
	}

	// Now that you've defined all the functions, start the process:
	connectAndSetUpMe();
});