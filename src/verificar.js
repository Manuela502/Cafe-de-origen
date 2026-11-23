const ventas = require("./datos")

const {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM,
  totalCiudadCadena,
  totalCiudadUnaPasada
} = require("./analitica")

const estadoTotal = totalVendido(ventas) === totalVendidoM(ventas) ? "OK": "DIFERENTE"
console.log(estadoTotal)

const estadoUnidades = unidadesVendidas(ventas) === unidadesVendidasM(ventas) ? "OK": "DIFERENTE"
console.log(estadoUnidades)

const estadoCiudad = ventasPorCiudad(ventas, "Medellín") === ventasPorCiudadM(ventas, "Medellín") ? "OK": "DIFERENTE"
console.log(estadoCiudad)

const { generarVentas } = require("./generador");

const ventas10k = generarVentas(10000);
const rCadena = totalCiudadCadena(ventas10k, "Medellín");
const rUnaPasada = totalCiudadUnaPasada(ventas10k, "Medellín");

console.log({ rCadena, rUnaPasada, iguales: rCadena === rUnaPasada });

console.log("Desde aquí")

const ventasDia1 = require("./datos");

const {
  clientesRecurrentes,
  clientesRecurrentesSet,
  clientesRecurrentesMap,
} = require("./analitica");

const ordenar = (arr) => [...arr].sort();

// 1. Verificar igualdad con Día 1 (12 ventas)
const d1Orig = ordenar(clientesRecurrentes(ventasDia1));
const d1Set = ordenar(clientesRecurrentesSet(ventasDia1));
const d1Map = ordenar(clientesRecurrentesMap(ventasDia1));

console.log(
  "Día 1 iguales:",
  JSON.stringify(d1Orig) === JSON.stringify(d1Set) &&
    JSON.stringify(d1Set) === JSON.stringify(d1Map),
  d1Set
);

// 2. Verificar igualdad con 5.000 ventas
const v5k = generarVentas(5000);
const r5kOrig = ordenar(clientesRecurrentes(v5k));
const r5kSet = ordenar(clientesRecurrentesSet(v5k));
const r5kMap = ordenar(clientesRecurrentesMap(v5k));

console.log(
  "5.000 ventas iguales:",
  JSON.stringify(r5kOrig) === JSON.stringify(r5kSet) &&
    JSON.stringify(r5kSet) === JSON.stringify(r5kMap)
);

// 3. Medición de tiempos
for (const n of [1000, 10000, 100000]) {
  const dataset = generarVentas(n);

  if (n <= 10000) {
    console.time(`original n=${n}`);
    clientesRecurrentes(dataset);
    console.timeEnd(`original n=${n}`);
  }

  console.time(`set n=${n}`);
  clientesRecurrentesSet(dataset);
  console.timeEnd(`set n=${n}`);

  console.time(`map n=${n}`);
  clientesRecurrentesMap(dataset);
  console.timeEnd(`map n=${n}`);
}

