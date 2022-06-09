const Carrito = document.querySelector("#carrito");
const tablaDeCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const ListaDeCursos = document.querySelector("#lista-cursos");
const contador = document.querySelector("#contador");
let llenandoCarrito = [];

registrarEvento();

function registrarEvento() {
  ListaDeCursos.addEventListener("click", seleccionandoCurso);
  Carrito.addEventListener("click", eliminarCurso);
  btnVaciarCarrito.addEventListener("click", () => {
    llenandoCarrito = [];
    bgWhite();
    limpiarCarritoPrevio();
    eliminarVista();
  });
  document.addEventListener('DOMContentLoaded', ()=>{
    llenandoCarrito=JSON.parse(localStorage.getItem('llenandoCarrito')) || [];
    console.log(llenandoCarrito);
    bgBlue();
    generarHtmlEnCarrito();
  })
}
function seleccionandoCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursoSeleccionado(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  const claseBorrar = e.target.classList.contains("borrar-curso");
  if (claseBorrar) {
    const cursoABorrar = e.target.getAttribute("data-id");

    llenandoCarrit = llenandoCarrito.some(
      (cursoParaBorrar) => cursoParaBorrar.idDeCurso === cursoABorrar
    );
    if (llenandoCarrit) {
      const eliminar = llenandoCarrito.map((elimin) => {
        if (elimin.idDeCurso === cursoABorrar) {
          elimin.cantidad--;
          const limite = 0;
          if (elimin.cantidad === limite) {
            llenandoCarrito = llenandoCarrito.filter(
              (cursoParaBorrar) => cursoParaBorrar.idDeCurso !== cursoABorrar
            );
          }
          bgWhite();
          generarHtmlEnCarrito();
        }
      });
    }
  }
}

function leerDatosCursoSeleccionado(cursoSeleccionado) {
  const infoCursoSeleccionado = {
    imagenDeCurso: cursoSeleccionado.querySelector("img").src,
    tituloDeCurso: cursoSeleccionado.querySelector("h4").textContent,
    precioDeCurso: cursoSeleccionado.querySelector(".precio span").textContent,
    idDeCurso: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  const cursosExistentes = llenandoCarrito.some(
    (cursoExistente) =>
      cursoExistente.idDeCurso === infoCursoSeleccionado.idDeCurso
  );
  if (cursosExistentes) {
    //actializar cantidad
    const verCursosExistentes = llenandoCarrito.map((verCursoExistente) => {
      if (verCursoExistente.idDeCurso === infoCursoSeleccionado.idDeCurso) {
        verCursoExistente.cantidad++;

        return verCursoExistente;
      } else {
        return verCursoExistente;
      }
    });
    llenandoCarrito = [...verCursosExistentes];
  } else {
    //agregar curso al carrito
    llenandoCarrito = [...llenandoCarrito, infoCursoSeleccionado];
  }
  bgBlue();

  generarHtmlEnCarrito();
}
function bgBlue() {
  const red = llenandoCarrito.length;
  if (red >= 0) {
    const bg = document.querySelector("#img-carrito");
    bg.style.backgroundColor = "#1EAEDB";
  }
}
function bgWhite() {
  if (llenandoCarrito.length === 0) {
    const bgw = document.querySelector("#img-carrito");
    bgw.style.backgroundColor = "white";
  }
}

function generarHtmlEnCarrito() {
  limpiarCarritoPrevio();

  llenandoCarrito.forEach((cursoComprado) => {
    const { imagenDeCurso, tituloDeCurso, precioDeCurso, cantidad } =
      cursoComprado;
    const tr = document.createElement("tr");
    tr.setAttribute("id", "campo");
    tr.innerHTML = ` 
            <td>
                <img src="${imagenDeCurso}" width="100"/>
            </td>
            <td>
                ${tituloDeCurso}
            </td>
            <td>
                ${precioDeCurso}
            </td>
            <td class="cantidad">
               ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${cursoComprado.idDeCurso}"> X </a>
            </td>
            
        `;

    tablaDeCarrito.appendChild(tr);
  });
  sincronizarStorage();
  contadores();
}
function limpiarCarritoPrevio() {
  while (tablaDeCarrito.firstChild) {
    const r = tablaDeCarrito.removeChild(tablaDeCarrito.firstChild);
  }
}
function eliminarVista() {
  while (contador.firstChild) {
    const f = contador.removeChild(contador.firstChild);
  }
}
function contadores() {
  let t = llenandoCarrito.map((cantidad) => {
    let suma = cantidad.cantidad;
    return suma;
  });
  const array = t;
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  eliminarVista();
  vistaContador(sum);
}

function vistaContador(sum) {
  if (sum > 0) {
    const p = document.createElement("span");
    p.innerHTML = ` 
        ${"+" + sum}
    `;
    contador.appendChild(p);
  }
}
function sincronizarStorage(){
  localStorage.setItem('llenandoCarrito', JSON.stringify(llenandoCarrito));
}
