const { closeBracket, openBracket, hasFailScriptRegex, nextConditionRegex } = require("./regex");

class Parser {
    constructor({
        lines,
        currentLineIndex = 0,
        currentCharacterIndex = 0,
    }) {
        if(typeof lines == "string") {
            this.lines = lines.split("\n");
        } else if (Array.isArray(lines)) {
            this.lines = lines;
        }
        this.currentLineIndex = currentLineIndex;
        this.currentCharacterIndex = currentCharacterIndex;
        this.updateCurrent();
    }

    nextLine() {
        this.currentLineIndex = this.currentLineIndex + 1;
        this.currentCharacterIndex = 0;
        this.updateCurrent();
    }

    nextCharacter() {
        if(this.currentCharacterIndex + 1 < this.currentLine.length) {
            this.currentCharacterIndex = this.currentCharacterIndex + 1;
        } else {
            this.nextLine();
        }
        this.updateCurrent();
    }

    updateCurrent() {
        // console.log("lines : %o", this.lines);
        // console.log("currentLineIndex : %o", this.currentLineIndex);
        // console.log("this.currentCharacterIndex : %o", this.currentCharacterIndex);
        this.currentLine = this.lines[this.currentLineIndex];
        if(this.currentLine) {
            this.currentCharacter = this.currentLine[this.currentCharacterIndex];
        }
    }

    parseContext(isCondition) {
        let contextCode = [];
        let contextDepth = 1;
        console.log("firstLine : %o", this.currentLine);
        do {
            this.nextLine();
            if(
                !this.currentLine ||
                (
                    isCondition
                    && (
                        this.currentLine.match(closeBracket)
                        && (
                            this.currentLine.match(nextConditionRegex)
                            || this.currentLine.match(hasFailScriptRegex)
                        )
                    )
                )
            ) {
                console.log("");
                console.log("Break");
                console.log("currentLine : %o", this.currentLine);
                console.log("currentLineIndex : %o", this.currentLineIndex);
                break;
            }

            if ( this.currentLine.match(closeBracket) ) {
                contextDepth--;
            }
            if ( this.currentLine.match(openBracket) ) {
                contextDepth++;
            }
            if (contextDepth != 0) {
                contextCode.push(this.currentLine);
            }
        } while (contextDepth != 0);

        // do {
        //     this.nextCharacter();
        //     console.log("this.currentCharacter : %o", this.currentCharacter);
        //     if (this.currentCharacter === "}") {
        //         contextDepth--;
        //     }
        //     if (
        //         this.currentCharacter === "{"
        //         // && !this.currentLine.match(nextConditionRegex)
        //         // && !this.currentLine.match(hasFailScriptRegex)
        //     ) {
        //         contextDepth++;
        //     }
            
        //     if (contextDepth != 0) {
        //         if (this.currentCharacterIndex === this.currentLine.length - 1) {
        //             contextCode.push(this.currentLine);
        //         }
        //     } else {
        //         contextCode.push(
        //             this.currentLine.substring(
        //                 0,
        //                 this.currentCharacterIndex
        //             )
        //         );
        //     }
        // } while (contextDepth != 0);

        return contextCode;
    }
    
}

module.exports = Parser;