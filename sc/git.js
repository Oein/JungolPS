let argvs = process.argv;
let fs = require('fs');
const { exec } = require("child_process");
if(argvs.length <= 2) {
    console.log("Usage: node code.js <number>");
    process.exit(1);
}

console.log("Base Dir :" , process.cwd());
let baseDir = process.cwd();

let fileName = argvs.slice(2).join("");
console.log("File Name :" , fileName , ". cpp");

let fileFolder = fileName.slice(0, fileName.length - 2) + "__";
console.log("File Folder :" , fileFolder);

// createFolder
let folderPath = baseDir + "\\" + fileFolder;
console.log("Folder Path :" , folderPath);

if(!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

// createFile
let filePath = folderPath + "\\" + fileName + ".cpp";
console.log("File Path :" , filePath);

let preset = fs.readFileSync(__dirname + "\\preset", "utf8");

if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, preset);

exec("git add " + filePath, (err, stdout, stderr) => {
    console.log("GIT ADD");
    exec("git commit -m \"Add" + fileName + "\"", (err, stdout, stderr) => {
        console.log("GIT COMMIT");
        exec("git push", (err, stdout, stderr) => {
            console.log("GIT PUSH");
        })
    })
})