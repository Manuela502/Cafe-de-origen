const ventas = require("./datos")

const { normalizacion } = require("./analitica")
const {valorVenta} = require("./analitica")

const productos = Array.from(new Set(ventas.map(v => v.producto)))
const precio = Array.from(new Set(ventas.map(v => v.precio)))
const ciudades = Array.from(new Set(ventas.map(v => normalizacion(v.ciudad))))

const azar = (min, max) => Math.floor(Math.random() * (max - min +1)) + min;

function generarVentas(n) {
    const cliente = Math.max(1, Math.floor(n / 3));
    const ventasR = []

    for (let i = 1; i <= n; i++) {
        const p = productos[azar(0, productos.length - 1)];

        ventasR.push({
            id: i,
            fecha: "2026-09-" + String(azar(1, 28)).padStart(2, "0"),
            cliente: "C" + String(azar(1, cliente)).padStart(2, "0"),
            producto: p,
            ciudad: ciudades[azar(0, ciudades.length - 1)],
            cantidad: azar(1, 5),
            precio: precio[azar(0, precio.length - 1)]
        })
    }
    return ventasR

}
 console.table(generarVentas(5));

const contador =  {valor:0}

function totalVendidoI(ventas, contador) {
  let total = 0;
  for (const venta of ventas) {
    contador.ops++;
    total += valorVenta(venta);
  }
  return total;
}


function ventaMayorI(ventas, contador) {
  contador.ops++;
  if (ventas.length === 0) {
    return null;
  }

  let mayor = ventas[0];
  for (let i = 1; i < ventas.length; i++) {
    contador.ops++;
    if (valorVenta(ventas[i]) > valorVenta(mayor)) {
      mayor = ventas[i];
    }
  }
  return mayor;
}

function totalPorCiudadI(ventas, contador) {
  const acumulador = {};
  for (const venta of ventas) {
    contador.ops++;
    const ciudadNorm = normalizacion(venta.ciudad);
    contador.ops++;
    acumulador[ciudadNorm] = (acumulador[ciudadNorm] || 0) + valorVenta(venta);
  }
  return acumulador;
}

function primeraVenta(ventas, contador) {
  contador.ops++;
  if (ventas.length === 0) {
    return null;
  }
  contador.ops++;
  return ventas[0];
}





module.exports = {
  generarVentas,
  totalVendidoI,
  ventaMayorI,
  totalPorCiudadI,
  primeraVenta,
};
