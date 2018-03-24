var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/tty.usbmodem1421");
var player = require('play-sound')(opts = {})

serialport.on('open', function(){
  console.log('Serial Port Opend');
  let playing = false;
  serialport.on('data', function(data){
      const isButtonPressed = parseInt(data[0]);
      if(isButtonPressed && !playing){
        playing = true;
        player.play('./parmigiano_reggiano.mp3', function(err){
          if (err) throw err
          playing = false;
        })
      }
  });
});
