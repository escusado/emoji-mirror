const Fs = require('fs');
const exec = require('child_process').exec;
let list =  {};
// use the emoji url list to download them with:
// $ xargs -P 10 -n 1 curl -O < list.txt
// then run this file
// you can use any tile type just create the list.json for it using this file
Fs.readdir('./', (err, files) => {
  files.forEach((file, index) => {
    if(file.indexOf('.png')>-1){
      // go over each emoji and use image magick to extract dominant color
      const command = `convert ${file} +dither -colors 1 -unique-colors txt:`;
      exec(command, function(err, stdout, stderr) {
        let color = stdout.match(/(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))/i);
        if(color && color[0]){
          color = color[0]
          color = color.substring(0, color.length - 2);
          console.log(file, color, '-'); //copy/paste output into an editor and manually build list.json
        }
      });
    }
  });
});
