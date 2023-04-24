export function isTextboxValid(text) {
    text = text.trim();
    if ( text === "") {
      return "Please Enter a Message to Send";
    } else {
      return true;
    }
}

