const validate = require("../validation");
const fileSchema = require("./file.schema");
const path = require("path");

class File {
    constructor({
        folderPath,
        name,
        extension,
        filePath,
        content = "",
    }) {
        folderPath = folderPath && folderPath.replaceAll(path.sep, '/');
        name = name && name.replaceAll(path.sep, '/');
        filePath = filePath && filePath.replaceAll(path.sep, '/');

        if(filePath) {
            this.buildFileFromFilePath(filePath);
        }else {
            this.buildFileFromFolderPathAndName(
                folderPath,
                name,
                extension
            );
        }
        
        this.setContent(content);
        
        this.path = (
            this.folderPath[this.folderPath.length - 1] === "/" ?
                this.folderPath
            :
                this.folderPath + "/"
        ) + (
            this.name + (
                this.extension ? 
                    ("." + this.extension)
                :
                    ""
            )
        );

        validate(
            "File " + this.name,
            this,
            fileSchema
        );
    }

    buildFileFromFilePath(filePath) {
        let filePaths = filePath.split("/");
        
        let fileNameWithExtension = filePaths.pop();
        if (fileNameWithExtension.includes(".")) {
            let fileName = fileNameWithExtension.split(".");
            if(fileName.length > 1) {
                this.extension = fileName.pop();
            }
            this.name = fileName.join("."); // Si il y'avais d'autres points que celui de l'extension on les remet
        } else {
            this.name = fileNameWithExtension;
        }
        this.folderPath = filePaths.join("/");
    }
    
    buildFileFromFolderPathAndName(folderPath, name, extension) {
        this.folderPath = folderPath;
        this.name = name;
        if(extension) {
            this.extension = extension;
        }else {
            const tmp = name.split(".");
            if(tmp.length > 1) {
                this.extension = tmp.pop();
            }
            this.name = tmp.join(".");
        }
    }
    
    setContent(content) {
        this.content = content;
        return this;
    }
    
    getFullPath(){
        return this.path;
    }
}

module.exports = File;