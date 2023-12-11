const emptyRegex = /^\s+$/gm;
const varRegex = /(.*)?var /gm;
const letRegex = /(.*)?let /gm;
const constRegex = /(.*)?const /gm;
const betweenParantheses = /(?<=\().*(?=\))/;
const betweenBrackets = /(?<=\{).*(?=\})/;
const functionRegex = /(.*)?function /gm; // /(.*)?function |=>/gm
const regexRegex = /\/.*\/(gm)?;/;
const spaceRegex = /( )/gm;
const openParenthesis = /\(/gm;
const closeParenthesis = /\)/gm;
const parenthesisRegex = /\(|\)/gm;
const openBracket = /\{/gm;
const closeBracket = /\}/gm;
const EOL = /;/gm;
const commentLineIndicator = /^(\/\*)(?=.*)(\*\/)|(\/\/)(?=.*)/gm;
const functionCommentStart = /^\/\*\*/gm;
const commentStart = /^\/\*/gm;
const commentEnd = /\*\//gm;
const accollades = /{|}/gm;
const importPathRegex = /require\("(.*)"\)/;
const classRegex = /(?=.*)?(?:class )(.*){/;
const questionMark = /\?/;
const conditionStartRegex = /(?<!else )if/;
const nextConditionRegex = /(?<=else.*)if/;
const hasFailScriptRegex = /else(?=[^)]\{)/;
const chunkNumberRegex = /"\.([^)]*)\.chunk/gm;

const objectDeclarationRegex = /new /;

module.exports = {
    emptyRegex,
    varRegex,
    letRegex,
    constRegex,
    betweenParantheses,
    betweenBrackets,
    functionRegex,
    regexRegex,
    spaceRegex,
    openParenthesis,
    closeParenthesis,
    parenthesisRegex,
    openBracket,
    closeBracket,
    EOL,
    commentLineIndicator,
    functionCommentStart,
    commentStart,
    commentEnd,
    accollades,
    importPathRegex,
    classRegex,
    questionMark,
    objectDeclarationRegex,
    conditionStartRegex,
    nextConditionRegex,
    hasFailScriptRegex,
    chunkNumberRegex,
};