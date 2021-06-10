const eventName = 'PrePush';
const fs=require('fs');
const { exec } = require("child_process");

async function run(context, args) {
  var projectDetails = context.amplify.getProjectMeta();
  var checked = [];

  if(projectDetails.hasOwnProperty("function")) {
    // I'm assuming we have some node functions...
    for (const property in projectDetails.function) {
      var path = context.amplify.pathManager.getBackendDirPath() + "/function/" + property + "/src";
      var result = await fromDir(path);
      checked = checked.concat(result);
    }
    context.print.table(checked);
  }

  async function fromDir(startPath){
    if (!fs.existsSync(startPath)){
        context.print.warning(`${startPath} is not a directory`);
        return;
    }

    var files=fs.readdirSync(startPath);

    var jsFiles = files.filter(file => file.endsWith(".js"));

    var checked = await Promise.all(jsFiles.map(async (jsFile) => {
      try {
        var fullPath = path + "/" + jsFile;
        var result = await checkFile(fullPath);
        return [fullPath, result];
      } catch (error) {
        console.log('error'+ error);
      }
    }))
    .catch(function(err) {
      console.log(err);
    });

    return checked;
  };

  function checkFile(jsFile){
    return new Promise((resolve, reject) => {
      exec(`node --check ${jsFile}`, (error, stdout, stderr) => {
       if (error) {
        // We could/should log here - but it'll mess up the output
       }
       resolve(stdout? stdout : stderr);
      });
     });
  }
}

module.exports = {
  run,
};
