// Initialize material elements
var buttons = document.querySelectorAll('.mdc-ripple');
for(i=0; i <buttons.length; i++){
    mdc.ripple.MDCRipple.attachTo(buttons[i]);
}

var textfields =document.querySelectorAll('.mdc-textfield');
for(i=0; i <textfields.length; i++){
    mdc.textfield.MDCTextfield.attachTo(textfields[i]);
}

// Get instances of IO fields
var inputField = document.getElementById('input_area');
var formattingField = document.getElementById('formatting_area');
var outputField = document.getElementById('output_area');

// Focus the inputField per default
inputField.focus();

function onBtnConvert() {
    var inputText = inputField.value;
    var formattingText = formattingField.value;
    
    // Check user input
    if(inputText.length == 0){
        logError("Input must not be empty");
        return;
    }
    if(formattingText.length == 0){
        logError("Formatting must not be empty");
        return;
    }

    // Parse input to JSON array
    jsonArray = parseTextToJSON(inputText);
    if(jsonArray == null){
        return;
    }

    // Perform mapping of input <-> custom-formatting
    var outputText = convertToCustomFormat(jsonArray, formattingText);
    // Display output
    setTextAreaValue(outputField, outputText);
}

function onBtnCopyToClipboard(){
    copyToClipboard(outputField);
}

function onBtnClearFields()
{
    setTextAreaValue(inputField, "");
    setTextAreaValue(outputField, "");
    setTextAreaValue(formattingField, "");
}

function onBtnShowExample(){
    setTextAreaValue(inputField, inputText);
    setTextAreaValue(formattingField, formattingText);
    onBtnConvert();
}

/**
 * Take a given JSONArray and use a custom formatting with keywords
 * that are either key or value of the inputText (must be enclosed $).
 * See example_data.js for details.
 * @param {JSONArray} inputText 
 * @param {string} formatting 
 * @returns {string} Processes the inputText and maps it to the custom formatting.
 */
function convertToCustomFormat(jsonArray, formatting){
    var result = "";
    jsonArray.map(function(jsonObject){
        var keys = Object.keys(jsonObject);
        var tmpText =formatting;
        keys.map(function(key){
            var value =jsonObject[key];
            tmpText =tmpText.replaceAll('$'+key+'$', value);
        });
        result += tmpText;
    });
    return result;
}

/**
 * Parses text to a json object and checks if is an array.
 * @param {string} text
 * @returns {null|JSONArray} error|success
 */
function parseTextToJSON(text){
    var jsonArray;
    try{
        jsonArray = JSON.parse(text);
        if(jsonArray.length == 0){
            logError("Input must be a JSON Array!");
        }
    }catch(exception){
        logError("Error parsing text", exception);
        return null;
    }
    return jsonArray;
}

/**
 * Copies the content of a given textarea to the clipboard.
 * @param {TextArea} field 
 */
function copyToClipboard(field){
    field.select();
    try{
        var success = document.execCommand('copy');
        if(!success){
            logError("Couldn't copy to clipboard - please do it manually");
            return;
        }
        document.getSelection().removeAllRanges();
        field.blur();
    }catch(exception){
        logError("Couldn't copy to clipboard - please do it manually", exception);
    }
}

/**
 * Sets the value of a textarea and fixes some display issues with the floating label.
 * @param {TextArea} field 
 * @param {string} text 
 */
function setTextAreaValue(field, text){
    field.value = text;
    // Workaround to fix position of floating label after setting text
    field.focus();
    field.blur();
    // Reset scroll position
    field.scrollTop = 0;
}

/**
 * Standard function to log errors and inform users.
 * Could be fancier.
 * @param {string} message 
 * @param {Exception} error Optional parameter
 */
function logError(message, error){
    if(typeof error != typeof undefined){
        console.log(error);
    }
    window.alert(message);
}

/**
 * Search for a pattern and replace all occurences.
 * @param search The pattern
 * @param replacement Replace all occurences of 'search' with this string
 */
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
