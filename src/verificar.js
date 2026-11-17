const ventas = require("./datos")

const {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM
} = require("./analitica")

const estadoTotal = totalVendido(ventas) === totalVendidoM(ventas) ? "OK": "DIFERENTE"
console.log(estadoTotal)

const estadoUnidades = unidadesVendidas(ventas) === unidadesVendidasM(ventas) ? "OK": "DIFERENTE"
console.log(estadoUnidades)

const estadoCiudad = ventasPorCiudad(ventas, "Medellín") === ventasPorCiudadM(ventas, "Medellín") ? "OK": "DIFERENTE"
console.log(estadoCiudad)