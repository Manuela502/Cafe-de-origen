
const ventas = require("./datos");

function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += valorVenta(venta);
  }
  return total;
}
console.log("Total vendido:", totalVendido(ventas));

function unidadesVendidas(ventas){
  let total = 0
  for (const unidad of ventas){
    if (unidad.cantidad > 0){
    total += unidad.cantidad;  
    } 
  }
  return total;
}
console.log(unidadesVendidas(ventas))

function ventaMayor(ventas){
  let mayor = ventas[0]
  for(const v of ventas){
    if (valorVenta(v) > valorVenta(mayor)){
      mayor = v
    }
  } 
  return mayor
}
console.log(ventaMayor(ventas))

function ticketPromedio(ventas){
  let total = 0
  let cantidadVentas = 0
  for(const v of ventas){
    if (v.cantidad > 0){
      total += valorVenta(v)
      cantidadVentas ++
    }
  }return total/cantidadVentas
}
console.log(ticketPromedio(ventas))

function normalizacion (texto){
  return texto.trim().toLowerCase()
}
function ventasPorCiudad(ventas, ciudad){
  let total = 0
  for (const v of ventas){
    if (normalizacion(v.ciudad) === normalizacion(ciudad)){
      total += valorVenta(v)
    }

    }return total
  }
  console.log(ventasPorCiudad(ventas, "Medellín"))

const unaVenta = [ventas[0]]
const sinVenta  = []

console.log("\nPruebas con totalVendido:");
console.log("Prueba completa: ", totalVendido(ventas));
console.log("Prueba un elemento: ", totalVendido(unaVenta));
console.log("Prueba vacio: ", totalVendido(sinVenta));

console.log("\nPruebas con unidadesVendidas:");
console.log("Prueba completa: ", unidadesVendidas(ventas));
console.log("Prueba un elemento: ", unidadesVendidas(unaVenta));
console.log("Prueba vacio: ", unidadesVendidas(sinVenta));

console.log("\nPruebas con ventaMayor:");
console.log("Prueba completa: ", ventaMayor(ventas));
console.log("Prueba un elemento: ", ventaMayor(unaVenta));
console.log("Prueba vacio: ", ventaMayor(sinVenta));

console.log("\nPruebas con ticketPromedio:");
console.log("Prueba completa: ", ticketPromedio(ventas));
console.log("Prueba un elemento: ", ticketPromedio(unaVenta));
console.log("Prueba vacio: ", ticketPromedio(sinVenta));

console.log("\nPruebas con ventasPorCiudad:");
console.log("Prueba completa: ", ventasPorCiudad(ventas, "Medellín"));
console.log("Prueba un elemento: ", ventasPorCiudad(unaVenta, "Medellín"));
console.log("Prueba vacio: ", ventasPorCiudad(sinVenta, "Medellín"));

function totalVendidoM(ventas){
  return ventas.reduce((total, venta)=>total + valorVenta(venta), 0)
}

function unidadesVendidasM(ventas){
  return ventas.reduce((total, unidad)=>total + (unidad.cantidad > 0  ? unidad.cantidad : 0), 0)
}

function ventasPorCiudadM(ventas, ciudad){
  return ventas.filter((v)=> normalizacion(v.ciudad) === normalizacion (ciudad)).reduce((total, venta) => total + valorVenta(venta), 0 )
}

function totalPorCiudad(ventas){
  return ventas.reduce((acumulador, venta) => {
    let ciudadNormalizada = normalizacion(venta.ciudad);
    let valorVentaActual = valorVenta(venta)
    if (acumulador[ciudadNormalizada]){
      acumulador[ciudadNormalizada] += valorVentaActual;
   
    }else{
      acumulador[ciudadNormalizada] = valorVentaActual;
    }

    return acumulador;

  },{});

}console.table(totalPorCiudad(ventas))

function unidadesPorProducto(ventas){
  return ventas.reduce ((acumulador, venta) => {
    let nombreProducto = venta.producto;
    let cantidadVendida = venta.cantidad;

    if (acumulador[nombreProducto]){
      acumulador[nombreProducto] += cantidadVendida;
    } else {
      acumulador[nombreProducto] = cantidadVendida;
    }

    return acumulador;

  }, {});
}console.table(unidadesPorProducto(ventas))

function topProductosPorValor(ventas, k){
  const totalProducto = ventas.reduce((acumulador, venta) => {
    const producto = normalizacion(venta.producto)
    acumulador [producto] = (acumulador[producto] || 0) + valorVenta(venta)
    return acumulador
  } )
  
  const products = Object.entries(totalProducto)
  const jerarquia = [...products].sort((a, b)=> )

}

console.log(topProductosPorValor(ventas, 3));


module.exports = {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM
}

