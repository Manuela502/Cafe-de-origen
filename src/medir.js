const {
  generarVentas,
  totalVendidoI,
  ventaMayorI,
  totalPorCiudadI,
  primeraVenta,
} = require("./generador");

const tamanos = [100, 1000, 10000, 100000];

const tabla = tamanos.map((n) => {
  const ventas = generarVentas(n);
  const cTotal = { ops: 0 };
  const cMayor = { ops: 0 };
  const cCiudad = { ops: 0 };
  const cPrimera = { ops: 0 };

  totalVendidoI(ventas, cTotal);
  ventaMayorI(ventas, cMayor);
  totalPorCiudadI(ventas, cCiudad);
  primeraVenta(ventas, cPrimera);

  return {
    n,
    totalVendido: cTotal.ops,
    ventaMayor: cMayor.ops,
    totalPorCiudad: cCiudad.ops,
    primeraVenta: cPrimera.ops,
  };
});

console.table(tabla);