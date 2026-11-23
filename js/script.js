/* =========================================================
 CONFIGURACIÓN DEL NEGOCIO
 CAMBIA SOLAMENTE ESTA PRIMERA PARTE
 ========================================================= */

// Escribe tu número con 504, sin espacios ni guiones.
const WHATSAPP = "50498557807";

// Imagen principal de la página.
// Esta imagen debe estar dentro de la carpeta img.
const PORTADA = {
 foto: "img/portada.jpg",
 posicion: "center"
};

// Lista de productos.
//
// IMPORTANTE:
// Cada archivo debe estar dentro de la carpeta img.
// Si tus imágenes son PNG, cambia .jpg por .png.
//
// precio:
// Si colocas 0, la página mostrará "Consultar".
const PRODUCTOS = [
 {
 id: 1,
 nombre: "Camarón",
 categoria: "Mariscos",
 precio: 130,
 foto: "img/camaron.jpg",
 posicion: "center",
 emoji: "🦐",
 descripcion: "Camarón fresco, limpio y listo para preparar.",
 etiqueta: ""
 },
 {
 id: 2,
 nombre: "Caracol",
 categoria: "Mariscos",
 precio: 160,
 foto: "img/caracol.jpg",
 posicion: "center",
 emoji: "🐚",
 descripcion: "Caracol fresco, limpio y bien tierno.",
 etiqueta: ""
 },
 {
 id: 3,
 nombre: "Ceviche de camarón",
 categoria: "Ceviches",
 precio: 200,
 foto: "img/ceviche-camaron.jpg",
 posicion: "center",
 emoji: "🍤",
 descripcion: "Camarón, limón, cebolla, tomate y culantro.",
 etiqueta: "Más vendido"
 },
 {
 id: 4,
 nombre: "Ceviche de caracol",
 categoria: "Ceviches",
 precio: 175,
 foto: "img/ceviche-caracol.jpg",
 posicion: "center",
 emoji: "🥣",
 descripcion: "Caracol curtido en limón con su toque catracho.",
 etiqueta: ""
 },
 {
 id: 5,
 nombre: "Ceviche de caracol con tajadas",
 categoria: "Ceviches",
 precio: 200,
 foto: "img/ceviche-caracol-tajadas.jpg",
 posicion: "50% 55%",
 escala: "90%",
 emoji: "🍲",
 descripcion: "Combinación de camarón y caracol.",
 etiqueta: "Recomendado"
 },
 {
 id: 6,
 nombre: "Tajadas",
 categoria: "Acompañantes",
 precio: 25,
 foto: "img/tajadas.jpg",
 posicion: "center",
 emoji: "🍌",
 descripcion: "Tajadas de plátano verde bien tostaditas.",
 etiqueta: ""
 },
 {
id: 7,
 nombre: "Ceviche de caracol Familiar",
 categoria: "Ceviches",
 precio: 25,
 foto: "img/ceviches.jpg",
 posicion: "center",
 emoji: "nada",
 descripcion: "Ideal para pasar tiempo con la familia.",
 etiqueta: ""
}
];
/* =========================================================
 FUNCIONAMIENTO INTERNO
 NO NECESITAS MODIFICAR ESTA PARTE
 ========================================================= */

let carrito = {};
let filtroActual = "Todos";
let temporizadorToast;

/* =========================================================
 FUNCIONES GENERALES
 ========================================================= */

function obtenerElemento(id) {
 return document.getElementById(id);
}

function formatoLempiras(cantidad) {
 return "L " + Number(cantidad).toLocaleString("es-HN", {
 minimumFractionDigits: 2,
 maximumFractionDigits: 2
 });
}

/* =========================================================
 CARGAR IMÁGENES
 ========================================================= */

function cargarFoto(contenedor, ruta, posicion, textoAlternativo) {
 if (!contenedor) {
 return;
 }

 const imagen = document.createElement("img");

 imagen.src = ruta;
 imagen.alt = textoAlternativo;
 imagen.loading = "lazy";
 imagen.style.objectPosition = posicion || "center";

 if (textoAlternativo === "Ceviche de caracol con tajadas") {
 imagen.style.width = "88%";
 imagen.style.height = "88%";
 imagen.style.inset = "6%";
 imagen.style.borderRadius = "8px";
}

 imagen.addEventListener("load", function () {
 contenedor.classList.add("con-foto");
 });

 imagen.addEventListener("error", function () {
 console.error("No se pudo cargar la imagen:", ruta);

 // Si la imagen no existe, se elimina la etiqueta
 // y queda visible el emoji de respaldo.
 imagen.remove();
 contenedor.classList.remove("con-foto");
 });

 contenedor.appendChild(imagen);
}

/* =========================================================
 CREAR CONTENEDOR PARA UNA IMAGEN
 ========================================================= */

function crearFoto(producto, claseContenedor) {
 const contenedor = document.createElement("div");
 contenedor.className = claseContenedor;

 const emoji = document.createElement("span");

 emoji.className = "emoji";
 emoji.textContent = producto.emoji;
 emoji.setAttribute("aria-hidden", "true");

 contenedor.appendChild(emoji);

 cargarFoto(
 contenedor,
 producto.foto,
 producto.posicion,
 producto.nombre
 );

 return contenedor;
}

/* =========================================================
 FILTROS DE PRODUCTOS
 ========================================================= */

function pintarFiltros() {
 const zonaFiltros = obtenerElemento("filtros");

 if (!zonaFiltros) {
 return;
 }

 const categorias = [
 "Todos",
 ...new Set(
 PRODUCTOS.map(function (producto) {
 return producto.categoria;
 })
 )
 ];

 zonaFiltros.innerHTML = "";

 categorias.forEach(function (categoria) {
 const boton = document.createElement("button");

 boton.type = "button";

 boton.className =
 "filtro" +
 (categoria === filtroActual ? " activo" : "");

 boton.textContent = categoria;

 boton.addEventListener("click", function () {
 filtroActual = categoria;

 pintarFiltros();
 pintarMenu();
 });

 zonaFiltros.appendChild(boton);
 });
}

/* =========================================================
 MENÚ DE PRODUCTOS
 ========================================================= */

function pintarMenu() {
 const grid = obtenerElemento("gridProductos");

 if (!grid) {
 return;
 }

 grid.innerHTML = "";

 const productosFiltrados = PRODUCTOS.filter(
 function (producto) {
 return (
 filtroActual === "Todos" ||
 producto.categoria === filtroActual
 );
 }
 );

 productosFiltrados.forEach(function (producto) {
 const tarjeta = document.createElement("article");
 tarjeta.className = "card producto";

 const foto = crearFoto(
 producto,
 "producto-foto"
 );

 if (producto.etiqueta) {
 const etiqueta = document.createElement("span");

 etiqueta.className = "etiqueta";
 etiqueta.textContent = producto.etiqueta;

 foto.appendChild(etiqueta);
 }

 const cuerpo = document.createElement("div");
 cuerpo.className = "producto-cuerpo";

 const titulo = document.createElement("h3");
 titulo.textContent = producto.nombre;

 const descripcion = document.createElement("p");
 descripcion.textContent = producto.descripcion;

 const pie = document.createElement("div");
 pie.className = "producto-pie";

 const precio = document.createElement("span");
 precio.className = "precio";

 precio.textContent =
 producto.precio > 0
 ? formatoLempiras(producto.precio)
 : "Consultar";

 const botonAgregar = document.createElement("button");

 botonAgregar.type = "button";
 botonAgregar.className = "btn btn-primary btn-sm";
 botonAgregar.textContent = "+ Agregar";

 botonAgregar.addEventListener(
 "click",
 function () {
 agregarAlCarrito(producto.id);
 }
 );

 pie.appendChild(precio);
 pie.appendChild(botonAgregar);

 cuerpo.appendChild(titulo);
 cuerpo.appendChild(descripcion);
 cuerpo.appendChild(pie);

 tarjeta.appendChild(foto);
 tarjeta.appendChild(cuerpo);

 grid.appendChild(tarjeta);
 });
}

/* =========================================================
 AGREGAR PRODUCTOS AL CARRITO
 ========================================================= */

function agregarAlCarrito(idProducto) {
 if (!carrito[idProducto]) {
 carrito[idProducto] = 0;
 }

 carrito[idProducto]++;

 pintarCarrito();

 const producto = PRODUCTOS.find(
 function (elemento) {
 return elemento.id === idProducto;
 }
 );

 if (producto) {
 mostrarAviso(
 "✅ " + producto.nombre + " agregado"
 );
 }
}

/* =========================================================
 CAMBIAR CANTIDAD
 ========================================================= */

function cambiarCantidad(idProducto, cambio) {
 if (!carrito[idProducto]) {
 return;
 }

 carrito[idProducto] += cambio;

 if (carrito[idProducto] <= 0) {
 delete carrito[idProducto];
 }

 pintarCarrito();
}

/* =========================================================
 VACIAR CARRITO
 ========================================================= */

function vaciarCarrito() {
 carrito = {};

 pintarCarrito();

 mostrarAviso("El pedido fue vaciado");
}

/* =========================================================
 CALCULAR TOTAL
 ========================================================= */

function calcularTotal() {
 return Object.entries(carrito).reduce(
 function (acumulado, entrada) {
 const idProducto = Number(entrada[0]);
 const cantidad = entrada[1];

 const producto = PRODUCTOS.find(
 function (elemento) {
 return elemento.id === idProducto;
 }
 );

 if (!producto) {
 return acumulado;
 }

 return (
 acumulado +
 producto.precio * cantidad
 );
 },
 0
 );
}

/* =========================================================
 MOSTRAR EL CARRITO
 ========================================================= */

function pintarCarrito() {
 const lista = obtenerElemento("carritoLista");
 const total = obtenerElemento("carritoTotal");

 if (!lista || !total) {
 return;
 }

 lista.innerHTML = "";

 const idsProductos = Object.keys(carrito);

 if (idsProductos.length === 0) {
 const mensajeVacio =
 document.createElement("p");

 mensajeVacio.className = "vacio";

 mensajeVacio.textContent =
 "Todavía no has agregado productos.";

 lista.appendChild(mensajeVacio);
 } else {
 idsProductos.forEach(function (id) {
 const idProducto = Number(id);
 const cantidad = carrito[idProducto];

 const producto = PRODUCTOS.find(
 function (elemento) {
 return elemento.id === idProducto;
 }
 );

 if (!producto) {
 return;
 }

 const item = document.createElement("div");
 item.className = "item";

 const foto = crearFoto(
 producto,
 "item-foto"
 );

 const informacion =
 document.createElement("div");

 informacion.className = "item-info";

 const nombre =
 document.createElement("strong");

 nombre.textContent = producto.nombre;

 const subtotal =
 document.createElement("span");

 subtotal.textContent =
 producto.precio > 0
 ? formatoLempiras(
 producto.precio * cantidad
 )
 : "Precio a consultar";

 informacion.appendChild(nombre);
 informacion.appendChild(subtotal);

 const controles =
 document.createElement("div");

 controles.className = "item-cant";

 const botonMenos =
 document.createElement("button");

 botonMenos.type = "button";
 botonMenos.textContent = "−";

 botonMenos.setAttribute(
 "aria-label",
 "Quitar una unidad de " +
 producto.nombre
 );

 const cantidadTexto =
 document.createElement("span");

 cantidadTexto.textContent = cantidad;

 const botonMas =
 document.createElement("button");

 botonMas.type = "button";
 botonMas.textContent = "+";

 botonMas.setAttribute(
 "aria-label",
 "Agregar una unidad de " +
 producto.nombre
 );

 botonMenos.addEventListener(
 "click",
 function () {
 cambiarCantidad(
 idProducto,
 -1
 );
 }
 );

 botonMas.addEventListener(
 "click",
 function () {
 cambiarCantidad(
 idProducto,
 1
 );
 }
 );

 controles.appendChild(botonMenos);
 controles.appendChild(cantidadTexto);
 controles.appendChild(botonMas);

 item.appendChild(foto);
 item.appendChild(informacion);
 item.appendChild(controles);

 lista.appendChild(item);
 });
 }

 total.textContent =
 formatoLempiras(calcularTotal());
}

/* =========================================================
 VALIDAR FORMULARIO
 ========================================================= */

function validarFormularioPedido() {
 const camposObligatorios = [
 "nombre",
 "telefono",
 "fecha",
 "direccion"
 ];

 let formularioValido = true;

 camposObligatorios.forEach(
 function (idCampo) {
 const campo = obtenerElemento(idCampo);

 if (!campo) {
 return;
 }

 const campoVacio =
 campo.value.trim() === "";

 campo.classList.toggle(
 "invalido",
 campoVacio
 );

 if (campoVacio) {
 formularioValido = false;
 }
 }
 );

 return formularioValido;
}

/* =========================================================
 CREAR MENSAJE DE WHATSAPP
 ========================================================= */

function crearMensajePedido() {
 const numeroPedido =
 "PED-" +
 Date.now().toString().slice(-6);

 const nombre =
 obtenerElemento("nombre").value.trim();

 const telefono =
 obtenerElemento("telefono").value.trim();

 const fecha =
 obtenerElemento("fecha").value;

 const hora =
 obtenerElemento("hora").value;

 const direccion =
 obtenerElemento("direccion").value.trim();

 const pago =
 obtenerElemento("pago").value;

 const notas =
 obtenerElemento("notas").value.trim();

 let mensaje = "";

 mensaje +=
 "*NUEVO PEDIDO " +
 numeroPedido +
 "*\n\n";

 mensaje +=
 "👤 *Cliente:* " +
 nombre +
 "\n";

 mensaje +=
 "📱 *Teléfono:* " +
 telefono +
 "\n";

 mensaje +=
 "📅 *Entrega:* " +
 fecha;

 if (hora) {
 mensaje += " a las " + hora;
 }

 mensaje += "\n";

 mensaje +=
 "📍 *Dirección:* " +
 direccion +
 "\n";

 mensaje +=
 "💵 *Forma de pago:* " +
 pago +
 "\n\n";

 mensaje += "*DETALLE DEL PEDIDO:*\n";

 Object.entries(carrito).forEach(
 function (entrada) {
 const idProducto =
 Number(entrada[0]);

 const cantidad = entrada[1];

 const producto = PRODUCTOS.find(
 function (elemento) {
 return (
 elemento.id === idProducto
 );
 }
 );

 if (!producto) {
 return;
 }

 mensaje +=
 "• " +
 cantidad +
 " x " +
 producto.nombre;

 if (producto.precio > 0) {
 mensaje +=
 " – " +
 formatoLempiras(
 producto.precio * cantidad
 );
 } else {
 mensaje +=
 " – Precio a consultar";
 }

 mensaje += "\n";
 }
 );

 mensaje +=
 "\n*TOTAL: " +
 formatoLempiras(calcularTotal()) +
 "*";

 if (notas) {
 mensaje +=
 "\n\n📝 *Notas:* " +
 notas;
 }

 return mensaje;
}

/* =========================================================
 ENVIAR PEDIDO POR WHATSAPP
 ========================================================= */

function enviarPedido(evento) {
 evento.preventDefault();

 const mensajeError =
 obtenerElemento("mensajeError");

 if (mensajeError) {
 mensajeError.textContent = "";
 }

 if (Object.keys(carrito).length === 0) {
 if (mensajeError) {
 mensajeError.textContent =
 "Agregá al menos un producto a tu pedido.";
 }

 const seccionMenu =
 obtenerElemento("menu");

 if (seccionMenu) {
 seccionMenu.scrollIntoView({
 behavior: "smooth"
 });
 }

 return;
 }

 if (!validarFormularioPedido()) {
 if (mensajeError) {
 mensajeError.textContent =
 "Completá todos los campos marcados con *.";
 }

 return;
 }

 const mensaje = crearMensajePedido();

 const enlaceWhatsApp =
 "https://wa.me/" +
 WHATSAPP +
 "?text=" +
 encodeURIComponent(mensaje);

 window.open(
 enlaceWhatsApp,
 "_blank",
 "noopener,noreferrer"
 );
}

/* =========================================================
 AVISO FLOTANTE
 ========================================================= */

function mostrarAviso(texto) {
 const toast = obtenerElemento("toast");

 if (!toast) {
 return;
 }

 toast.textContent = texto;
 toast.classList.add("visible");

 clearTimeout(temporizadorToast);

 temporizadorToast = setTimeout(
 function () {
 toast.classList.remove("visible");
 },
 1800
 );
}

/* =========================================================
 MENÚ PARA CELULAR
 ========================================================= */

function configurarMenuMovil() {
 const botonMenu =
 obtenerElemento("menuToggle");

 const navegacion =
 obtenerElemento("nav");

 if (!botonMenu || !navegacion) {
 return;
 }

 botonMenu.addEventListener(
 "click",
 function () {
 const menuAbierto =
 navegacion.classList.toggle(
 "abierto"
 );

 botonMenu.setAttribute(
 "aria-expanded",
 String(menuAbierto)
 );

 botonMenu.textContent =
 menuAbierto ? "✕" : "☰";
 }
 );

 const enlaces =
 navegacion.querySelectorAll("a");

 enlaces.forEach(function (enlace) {
 enlace.addEventListener(
 "click",
 function () {
 navegacion.classList.remove(
 "abierto"
 );

 botonMenu.setAttribute(
 "aria-expanded",
 "false"
 );

 botonMenu.textContent = "☰";
 }
 );
 });
}

/* =========================================================
 CONFIGURAR FECHA DE ENTREGA
 ========================================================= */

function configurarFechaEntrega() {
 const campoFecha =
 obtenerElemento("fecha");

 if (!campoFecha) {
 return;
 }

 const ahora = new Date();

 const fechaLocal = new Date(
 ahora.getTime() -
 ahora.getTimezoneOffset() * 60000
 )
 .toISOString()
 .split("T")[0];

 campoFecha.min = fechaLocal;
 campoFecha.value = fechaLocal;
}

/* =========================================================
 CONFIGURAR WHATSAPP
 ========================================================= */

function configurarWhatsApp() {
 const botonFlotante =
 obtenerElemento("whatsappFlotante");

 const textoWhatsApp =
 obtenerElemento("textoWhatsApp");

 if (botonFlotante) {
 botonFlotante.href =
 "https://wa.me/" +
 WHATSAPP;
 }

 if (textoWhatsApp) {
 if (WHATSAPP.startsWith("504")) {
 const numeroLocal =
 WHATSAPP.slice(3);

 textoWhatsApp.textContent =
 "+504 " +
 numeroLocal.slice(0, 4) +
 "-" +
 numeroLocal.slice(4);
 } else {
 textoWhatsApp.textContent =
 "+" +
 WHATSAPP;
 }
 }
}

/* =========================================================
 QUITAR BORDE ROJO AL ESCRIBIR
 ========================================================= */

function configurarCamposFormulario() {
 const idsCampos = [
 "nombre",
 "telefono",
 "fecha",
 "direccion"
 ];

 idsCampos.forEach(
 function (idCampo) {
 const campo =
 obtenerElemento(idCampo);

 if (!campo) {
 return;
 }

 campo.addEventListener(
 "input",
 function () {
 if (
 campo.value.trim() !== ""
 ) {
 campo.classList.remove(
 "invalido"
 );
 }
 }
 );
 }
 );
}

/* =========================================================
 INICIAR LA PÁGINA
 ========================================================= */

document.addEventListener(
 "DOMContentLoaded",
 function () {
 /* Cargar imagen principal */
 const contenedorPortada =
 obtenerElemento("heroImg");

 if (contenedorPortada) {
 cargarFoto(
 contenedorPortada,
 PORTADA.foto,
 PORTADA.posicion,
 "Mariscos frescos y ceviches"
 );
 }

 /* Crear productos y carrito */
 pintarFiltros();
 pintarMenu();
 pintarCarrito();

 /* Activar funciones */
 configurarMenuMovil();
 configurarFechaEntrega();
 configurarWhatsApp();
 configurarCamposFormulario();

 /* Año automático */
 const anio =
 obtenerElemento("anio");

 if (anio) {
 anio.textContent =
 new Date().getFullYear();
 }

 /* Formulario */
 const formulario =
 obtenerElemento("formPedido");

 if (formulario) {
 formulario.addEventListener(
 "submit",
 enviarPedido
 );
 }

 /* Botón para vaciar pedido */
 const botonVaciar =
 obtenerElemento("btnVaciar");

 if (botonVaciar) {
 botonVaciar.addEventListener(
 "click",
 vaciarCarrito
 );
 }
 }
);