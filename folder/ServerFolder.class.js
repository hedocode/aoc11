const fs = require("fs");

const Folder = require("./Folder.class");
const File = require("../file/File.class");
const ServerFile = require("../file/ServerFile.class");

class ServerFolder extends Folder {
    constructor({
        folderPath,
        name
    }) {
        const props = {
            folderPath,
            name
        };
        super(props);
    }

        
    /**
     * @param {boolean} directory 
     * @param {boolean} files 
     * @returns {object} An array with the name of all the directory / files inside the directory
     */
    getChildren(directory, files) {
        let res = [];
        let filesInDir = fs.readdirSync(this.getFullPath());
        if (directory && files) {
            res = filesInDir;
        } else {
            filesInDir.forEach(
                (file) => {
                    var fileStats = fs.lstatSync(
                        this.getFullPath() + "/" + file
                    );
                    if (
                        directory &&
                        fileStats.isDirectory()
                    ||
                        files &&
                        fileStats.isFile()
                    ){
                        res.push(file);
                    }
                }
            );
        }
        return res;
    }

    /**
     * @returns An array with the name of all the directory inside the directory
     */
    getSubFolders() {
        return this.getChildren(true, false);
    }

    getAllFilesPaths(addDirectoryPath = false) {
        let res = this.getFiles();
        let directories = this.getSubFolders();
        directories.forEach(
            (directory) => {
                let newDirectory= new ServerFolder({
                    folderPath: this.getFullPath() + "/" + directory
                });
                let filesInNewDirectory = newDirectory.getAllFilesPaths(directory);

                res = res.concat(
                    filesInNewDirectory
                );
            }
        );

        if (addDirectoryPath) {
            res = res.map(
                path => (
                    addDirectoryPath === true ?
                        this.getFullPath()
                    :
                        addDirectoryPath
                ) + "/" + path 
            );
        }

        return res;
    }

    
    /**
     * @returns An array with the name of all the files inside the directory
     */
    getFiles(regex, asObject = false) {
        let files = this.getChildren(false, true);

        if(regex) {
            files = files.filter(
                f => f.match(regex)
            );
        }
        if (asObject) {
            return files.map(
                (fileName) => new File({
                    folderPath: this.getFullPath(),
                    name: fileName,
                })
            );
        } else {
            return files;
        }
    }

    /**
     * @param {RegExp} regex 
     */
    getFileWithContent(regex) {
        const allFilesPath = this.getAllFilesPaths(true);
        let found = false;
        for (let index = 0; index < allFilesPath.length; index++) {
            const filePath = allFilesPath[index];
            const file = new ServerFile({
                filePath
            });
            const fileStringContent = file.content.toString();

            console.log("filePath : %o", filePath);
            console.log("fileStringCOntent : ", fileStringContent);
            if (fileStringContent.match(regex)) {
                found = file;
                break;
            }
        }

        return found;
    }

    exists () {
        return fs.existsSync(
            this.getFullPath()
        );
    }

    create() {
        const folderDoNotExist = !this.exists();
        if (folderDoNotExist) {
            fs.mkdirSync(
                this.getFullPath(),
                { recursive: true }
            );
        }

        return this;
    }
}

module.exports = ServerFolder;