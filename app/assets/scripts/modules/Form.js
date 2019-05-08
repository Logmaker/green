import $ from "jquery";

class Contact {
  constructor(){
    $("#form-actions").submit(function(e){
      console.log("testing ground... ");
    });
  }
}

export default Contact;
