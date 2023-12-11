const ajv = require("ajv");

async function validate(name, jsObject, schema) {
    const ajValidator = new ajv();
    const validate = ajValidator.compile(schema);
    const result = await validate(jsObject);
    
    if(result == false){
        console.log("");
        console.log("Error on Object : %o", name);
        validate.errors.forEach(
            (error, idx) => {
                console.log("AJV error %d : %o", idx, error);
            }
        );
    }
    return result;
}

module.exports = validate;