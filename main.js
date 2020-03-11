var myform = $("form#myform");
myform.submit(function(event) {
  event.preventDefault();
  var required = false;
  // Change to your service ID, or keep using the default service
  var service_id = "default_service";
  var template_id = "template_o9GzUQFI";

  for (var i = 0; i < myform[0].elements.length - 3; i++) {
    if (myform[0].elements[i].value === "") {
      let tag = document.createElement("label");
      tag.classList.add("error-label");
      let text = document.createTextNode("Esse campo é obrigatório");
      tag.appendChild(text);
      let error = $("#field-" + myform[0].elements[i].name);
      if (!error.hasClass("error-border")) {
        error.after(tag);
        error.addClass("error-border");
        required = false;
      }
    } else {
      let ok = $("#field-" + myform[0].elements[i].name);
      if (ok.hasClass("error-border")) {
        ok.removeClass("error-border");
        ok.next("label").remove();
      }
      required = true;
    }
  }

  let regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let email = $("#email");

  let regUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  let url = $("#url");

  let phone = $("#phone");

  var reqMail = false;
  var reqUrl = false;
  var reqPhone = false;

  if (!regEmail.test(email[0].value) && email[0].value !== "") {
    let tagEmail = document.createElement("label");
    tagEmail.classList.add("error-label");
    let textEmail = document.createTextNode("Endereço de email inválido");
    tagEmail.appendChild(textEmail);
    let fieldEmail = $("#field-email");
    if (!fieldEmail.hasClass("error-border")) {
      fieldEmail.addClass("error-border");
      fieldEmail.after(tagEmail);
    }
    reqMail = false;
  } else if (regEmail.test(email[0].value)) {
    let ok = $("#field-email");
    if (ok.hasClass("error-border")) {
      ok.removeClass("error-border");
      ok.next("label").remove();
    }
    reqMail = true;
  }

  if (!regUrl.test(url[0].value) && url[0].value !== "") {
    let tagUrl = document.createElement("label");
    tagUrl.classList.add("error-label");
    let textUrl = document.createTextNode("Domínio incompleto ou inválido");
    tagUrl.appendChild(textUrl);
    let fieldUrl = $("#field-url");
    if (!fieldUrl.hasClass("error-border")) {
      fieldUrl.addClass("error-border");
      fieldUrl.after(tagUrl);
    }
    reqUrl = false;
  } else if (regUrl.test(url[0].value)) {
    let ok = $("#field-url");
    if (ok.hasClass("error-border")) {
      ok.removeClass("error-border");
      ok.next("label").remove();
    }
    reqUrl = true;
  }

  if (phone[0].value.length < 14) {
    let tagPhone = document.createElement("label");
    tagPhone.classList.add("error-label");
    let textPhone = document.createTextNode("Número incompleto ou inválido");
    tagPhone.appendChild(textPhone);
    let fieldPhone = $("#field-phone");
    if (!fieldPhone.hasClass("error-border")) {
      fieldPhone.addClass("error-border");
      fieldPhone.after(tagPhone);
    }
    reqPhone = false;
  } else {
    let ok = $("#field-phone");
    if (ok.hasClass("error-border")) {
      ok.removeClass("error-border");
      ok.next("label").remove();
    }
    reqPhone = true;
  }

  if(required && reqMail && reqUrl && reqPhone) {
    let form = $('#form-section')
    form.css("display", "none")
    var bubbles = $('#bubbles')
    bubbles.css("display", "flex")
    emailjs.sendForm(service_id,template_id,myform[0])
  	.then(function(){ 
      bubbles.css("display", "none")
      let thanksSection = $('#thanks-section')
      thanksSection.css("display", "flex")
    }, function(err) {
       alert("Envio Falhou!\r\n Response:\n " + JSON.stringify(err));
    });
  }

  return false;
});

$("#phone").maskbrphone({
  useDdd: true,
  useDddParenthesis: true,
  dddSeparator: " ",
  numberSeparator: "-"
});
