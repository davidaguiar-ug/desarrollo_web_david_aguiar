const validateName = (name) => {
  if(!name) return false;
  let lengthValid = 3 <= name.trim().length && name.trim().length <= 200;

  return lengthValid;
};

const validateEmail = (email) => {
  if (!email) return false;
  let lengthValid = 15 < email.length && email.length <= 100;

  // validamos el formato
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // devolvemos la lógica AND de las validaciones.
  return (lengthValid && formatValid);
};

const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return true;
  // validación de longitud
  let lengthValid = phoneNumber.length = 13;

  // validación de formato
  let re = /^\+569\.[0-9]{8}$/;
  let formatValid = re.test(phoneNumber);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};

document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("fotosWrap");
  const addBtn = document.getElementById("btnAgregarFoto");
  const preview = document.getElementById("previewFotos");
  const maxFotos = parseInt(wrap.dataset.maxFotos || "5", 10);

  // Vincula listeners a un input file
  function bindInput(input) {
    input.addEventListener("change", renderPreviews);
  }

  // Vincula el primer input existente
  wrap.querySelectorAll('input[type="file"]').forEach(bindInput);

  // Crea un nuevo input (hasta 5)
  addBtn.addEventListener("click", () => {
    const inputs = wrap.querySelectorAll('input[type="file"]');
    if (inputs.length >= maxFotos) {
      alert(`Solo puedes seleccionar hasta ${maxFotos} fotos.`);
      return;
    }
    const idx = inputs.length + 1;
    const input = document.createElement("input");
    input.type = "file";
    input.name = "fotos[]";
    input.id = `foto${idx}`;
    input.accept = "image/*";
    bindInput(input);
    wrap.appendChild(input);
  });

  // Renderiza previews apiladas con las fotos actualmente elegidas
  function renderPreviews() {
    preview.innerHTML = "";
    const files = [];
    wrap.querySelectorAll('input[type="file"]').forEach(inp => {
      if (inp.files && inp.files[0]) files.push(inp.files[0]);
    });

    // Limita visualmente a máx. 5
    files.slice(0, maxFotos).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement("img");
        img.src = e.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("#contactosOpciones input[type='checkbox']");
  const container = document.getElementById("contactosExtras");
  const maxContactos = 5;

  const labels = {
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    x: "X (Twitter)",
    instagram: "Instagram",
    tiktok: "TikTok",
    otra: "Otra"
  };

  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      // contar seleccionados
      const seleccionados = Array.from(checkboxes).filter(c => c.checked);
      if (seleccionados.length > maxContactos) {
        cb.checked = false; // desmarcar el último clic
        return;
      }

      // reconstruir inputs
      container.innerHTML = "";
      seleccionados.forEach(c => {
        const div = document.createElement("div");
        div.classList.add("contacto-extra");

        const label = document.createElement("label");
        label.textContent = `ID o URL para ${labels[c.value]}:`;

        const input = document.createElement("input");
        input.type = "text";
        input.name = `contacto_${c.value}`;
        input.placeholder = "Opcional (4–50 caracteres)";
        input.minLength = 4;
        input.maxLength = 50;

        div.appendChild(label);
        div.appendChild(input);
        container.appendChild(div);
      });
    });
  });
});
const validateAmount = (amount) => {
    if (!amount) return false;

    return (amount >= 1);
};

const validateAge = (age) => {
    if (!age) return false;

    return (1<= age && age <= 122);
};

const validarFechaEntrega = (fecha) => {

  if (!fecha) {
    return false;
  }

  const fechaSeleccionada = new Date(fecha);
  const ahora = new Date();

  // regla 1: no puede ser pasada
  if (fechaSeleccionada < ahora) {
    return false;
  }

  // regla 2 (opcional): debe ser al menos +3 horas
  const minimo = new Date();
  minimo.setHours(minimo.getHours() + 3);
  if (fechaSeleccionada < minimo) {
    return false;
  }

  return true;
}


const validateFiles = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 1 <= files.length && files.length <= 5;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image";
  }

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && typeValid;
};

const validateSelect = (select) => {
  if(!select) return false;
  return true
};

const validateForm = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let myForm = document.forms["myForm"];
  let email = myForm["email"].value;
  let phoneNumber = myForm["telefono"].value;
  let name = myForm["name"].value;
  let region = myForm["select-region"].value;
  let commune = myForm["select-commune"].value;
  let fecha = myForm["deliveryDate"].value;
  let cantidad = myForm["amount"].value;
  let años = myForm["age"].value;
  let unidad = myForm["ageUnit"].value;
  let tipo = myForm["tipe"].value


  // variables auxiliares de validación y función.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // lógica de validación
  if (!validateName(name)) {
    setInvalidInput("Nombre");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validatePhoneNumber(phoneNumber)) {
    setInvalidInput("Número");
  }
  if (!validateSelect(region)) {
    setInvalidInput("Region");
  }
  if (!validateSelect(commune)) {
    setInvalidInput("Comuna");
  }
  if (!validateSelect(tipo)) {
    setInvalidInput("Tipo de mascota")
  }
  if (!validarFechaEntrega(fecha)) {
    setInvalidInput("Fecha disponible para entrega")
  }
  if(!validateAmount(cantidad)) {
    setInvalidInput("Cantidad")
  }
  if(!validateAge(años)) {
    setInvalidInput("Años")
  }
  if(!validateSelect(unidad)) {
    setInvalidInput("Unidad de edad")
  }

  // finalmente mostrar la validación
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");
  let formContainer = document.querySelector(".main-container");

  if (!isValid) {
    validationListElem.textContent = "";
    // agregar elementos inválidos al elemento val-list.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    // establecer val-msg
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";

    // aplicar estilos de error
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  } else {
    // Ocultar el formulario
    myForm.style.display = "none";

    // establecer mensaje de éxito
    validationMessageElem.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
    validationListElem.textContent = "";

    // aplicar estilos de éxito
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";

    // Agregar botones para enviar el formulario o volver
    let submitButton = document.createElement("button");
    submitButton.innerText = "Sí, estoy seguro";
    submitButton.style.marginRight = "10px";
    submitButton.addEventListener("click", () => {
        window.location.href = "portadas.html"
      // myForm.submit();
      // no tenemos un backend al cual enviarle los datos
    });

    let backButton = document.createElement("button");
    backButton.innerText = "No, no estoy seguro, quiero volver al formulario";
    backButton.addEventListener("click", () => {
      // Mostrar el formulario nuevamente
      myForm.style.display = "block";
      validationBox.hidden = true;
    });

    validationListElem.appendChild(submitButton);
    validationListElem.appendChild(backButton);

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  }
};


let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);