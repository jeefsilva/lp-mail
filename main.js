
var myform = $("form#myform");
myform.submit(function(event){
	event.preventDefault();

  // Change to your service ID, or keep using the default service
  var service_id = "default_service";
  var template_id = "template_o9GzUQFI";

var tag = document.createElement("label");
tag.classList.add("error-label")
var text = document.createTextNode("Esse campo é obrigatório");
tag.appendChild(text);
var teste = $("#field-"+ myform[0].elements[0].name)
teste.after(tag);
teste.addClass("error-border")


  myform.find("button").text("Sending...");
  for (var i = 0; i < myform[0].elements.length; i++) {
    if (myform[0].elements[i].value === "") {

    }
 }
});