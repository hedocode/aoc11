
const validate = require("../validation");
const folderSchema = require("./folder.schema");
const path = require("path");

class Folder {
    constructor({
        folderPath,
        name = ""
    }) {
        folderPath = folderPath.replace(path.sep, '/');
        if(name) {
            this.folderPath = folderPath;
            this.name = name;
        } else {
            const pathAsArray = folderPath.split("/");
            this.name = pathAsArray.pop();
            this.folderPath = pathAsArray.join("/");
        }
        

        validate(
            "Folder " + this.name,
            this,
            folderSchema
        );
    }

    getFullPath() {
        return this.folderPath + "/" + this.name;
    }
}

module.exports = Folder;