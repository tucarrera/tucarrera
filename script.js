const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 100);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

menu.onscroll = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.remove("open");
};

const filterItems = document.querySelectorAll(".filter-item");

// Get all university rows
const universityRows = document.querySelectorAll(".row");

// Add click event listener to each filter item
filterItems.forEach((filterItem) => {
  filterItem.addEventListener("click", () => {
    // Toggle the active-filter class for the clicked filter item
    filterItem.classList.toggle("active-filter");

    // Get the selected filters
    const selectedFilters = getSelectedFilters();

    // Show/hide university rows based on the selected filters
    universityRows.forEach((row) => {
      const dataFilters = row.getAttribute("data-filter").split(" ");
      if (
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) => dataFilters.includes(filter))
      ) {
        row.style.display = "block";
      } else {
        row.style.display = "none";
      }
    });
  });
});

// Function to get selected filters
function getSelectedFilters() {
  const selectedFilters = [];
  filterItems.forEach((filterItem) => {
    if (filterItem.classList.contains("active-filter")) {
      selectedFilters.push(filterItem.getAttribute("data-filter"));
    }
  });
  return selectedFilters;
}



const testForm = document.getElementById('testForm');
const resultadoDiv = document.getElementById('resultado');

function calcularResultado() {
    const respuestas = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0
    };

    // Recorre todas las preguntas y suma los valores de las respuestas seleccionadas
    for (let i = 1; i <= 7; i++) {
        const pregunta = `pregunta${i}`;
        const respuestaSeleccionada = document.querySelector(`input[name="${pregunta}"]:checked`);

        if (respuestaSeleccionada) {
            const valorRespuesta = respuestaSeleccionada.value;
            respuestas[valorRespuesta]++;
        } else {
            // Si no se seleccionó ninguna respuesta, puedes mostrar un mensaje de error o manejarlo como desees.
            // En este caso, simplemente devolvemos un mensaje de error en el div resultadoDiv.
            resultadoDiv.innerHTML = 'Por favor, responde todas las preguntas para obtener el resultado.';
            return;
        }
    }

    // Encuentra el resultado con mayor número de respuestas y muéstralo en el div resultadoDiv.
    const resultado = Object.keys(respuestas).reduce((a, b) => respuestas[a] > respuestas[b] ? a : b);
    resultadoDiv.innerHTML = `Mayor número de ${resultado}: Podrías tener inclinaciones hacia carreras relacionadas con ${obtenerArea(resultado)}.`;
}

// Función para obtener el área asociada a la letra de resultado.
function obtenerArea(resultado) {
    const areas = {
        A: 'ciencias, tecnología, ingeniería o matemáticas',
        B: 'campos creativos, como diseño, arte, arquitectura o manualidades',
        C: 'comunicación, psicología, recursos humanos o ventas',
        D: 'medicina, asistencia social, educación o trabajo en organizaciones sin fines de lucro',
        E: 'administración, gestión de proyectos o emprendimiento'
    };
    return areas[resultado];
}
