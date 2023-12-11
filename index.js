const rootPath = require("./root");
const ServerFolder = require("./folder/ServerFolder.class");
const ServerFile = require("./file/ServerFile.class");
const Parser = require("./file/parser.class");


function parseGalaxyFile(numberGalaxy = true){
    let folder = new ServerFolder({
        folderPath:rootPath+"/data/"
    });
    
    let fileNames = folder.getFiles()
    
    let fileData = new ServerFile({
        filePath:rootPath+"/data/data"
    });
    
    let fileContent = fileData.content;
    
    const data = fileContent.toString();
    
    const parser = new Parser({
        lines:  data
    });

    const linesCount = parser.lines.length;
    let map = [];
    let { 
        currentLineIndex,
        currentCharacterIndex
    } = parser;
    
    let char;
    let y, x;
    let galaxyIndex = 1;
    do {
        y = parser.currentLineIndex;
        x = parser.currentCharacterIndex;
        char = parser.currentCharacter;
        if(!map[y]){
            map[y] = [];
        }
    
        // \n && \r
        if(![".", "#"].includes(char)){
            parser.nextLine()
        }else {
            if(char == "#" && numberGalaxy)
                char = galaxyIndex++;
    
            map[y][x] = char;
        }
        parser.nextCharacter();
    }while(parser.currentLine)

    return {
        map
    };
}

function displayMap(map) {
    let lines = "";
    map.forEach(
        (line, idx ) => {
            line.forEach(
                (char, idx2) =>{
                    lines += char;
                }
            )
            lines += "\n";
        }
    )
    console.log(lines);
}    

const {map:nbMap} = parseGalaxyFile();
const {map} = parseGalaxyFile(false);

// displayMap(map);
// displayMap(nbMap);

