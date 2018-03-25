const Fs = require('fs');
const exec = require('child_process').exec;
let list =  {};
Fs.readdir('./', (err, files) => {
  files.forEach((file, index) => {
    if(file.indexOf('.png')>-1){

      const command = `convert ${file} +dither -colors 1 -unique-colors txt:`;
      exec(command, function(err, stdout, stderr) {

        let color = stdout.match(/(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))/i);
        if(color && color[0]){
          color = color[0]
          color = color.substring(0, color.length - 2);
          console.log(file, color, '-');
        }

      });

    }
  });
});



// exec('cat *.js bad_file | wc -l', (err, stdout, stderr) => {
//   if (err) {
//     // node couldn't execute the command
//     return;
//   }
//
//   // the *entire* stdout and stderr (buffered)
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
