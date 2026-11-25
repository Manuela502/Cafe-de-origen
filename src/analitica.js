
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

function unidadesVendidas(ventas) {
  let total = 0
  for (const unidad of ventas) {
      total += unidad.cantidad;
    
  }
  return total;
}
console.log(unidadesVendidas(ventas))

function ventaMayor(ventas) {
  if (ventas.length === 0){
    return null
  }
  
  let mayor = ventas[0]

  for (const v of ventas) {
    if (valorVenta(v) > valorVenta(mayor)) {
      mayor = v
    }
  }
  return mayor
}
console.log(ventaMayor(ventas))

function ticketPromedio(ventas) {
  let total = 0
  let cantidadVentas = 0
  for (const v of ventas) {
    if (v.cantidad > 0) {
      total += valorVenta(v)
      cantidadVentas++
    }
  } 
  
  if (cantidadVentas === 0) {
       return 0;
    }
  
  return total / cantidadVentas
}
console.log(ticketPromedio(ventas))

function normalizacion(texto) {
  return texto.trim().toLowerCase()
}
function ventasPorCiudad(ventas, ciudad) {
  let total = 0
  for (const v of ventas) {
    if (normalizacion(v.ciudad) === normalizacion(ciudad)) {
      total += valorVenta(v)
    }

  } return total
}
console.log(ventasPorCiudad(ventas, "Medellín"))

const unaVenta = [ventas[0]]
const sinVenta = []

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

function totalVendidoM(ventas) {
  return ventas.reduce((total, venta) => total + valorVenta(venta), 0)
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((total, unidad) => total + (unidad.cantidad > 0 ? unidad.cantidad : 0), 0)
}

function ventasPorCiudadM(ventas, ciudad) {
  return ventas.filter((v) => normalizacion(v.ciudad) === normalizacion(ciudad)).reduce((total, venta) => total + valorVenta(venta), 0)
}

function totalPorCiudad(ventas) {
  return ventas.reduce((acumulador, venta) => {
    let ciudadNormalizada = normalizacion(venta.ciudad);
    let valorVentaActual = valorVenta(venta)
    if (acumulador[ciudadNormalizada]) {
      acumulador[ciudadNormalizada] += valorVentaActual;

    } else {
      acumulador[ciudadNormalizada] = valorVentaActual;
    }

    return acumulador;

  }, {});

} console.table(totalPorCiudad(ventas))

function unidadesPorProducto(ventas) {
  return ventas.reduce((acumulador, venta) => {
    let nombreProducto = venta.producto;
    let cantidadVendida = venta.cantidad;

    if (acumulador[nombreProducto]) {
      acumulador[nombreProducto] += cantidadVendida;
    } else {
      acumulador[nombreProducto] = cantidadVendida;
    }

    return acumulador;

  }, {});
}console.table(unidadesPorProducto(ventas));

function topProductosPorValor(ventas, k) {
  const totalProducto = ventas.reduce((acumulador, venta) => {
    const producto = normalizacion(venta.producto)
    acumulador[producto] = (acumulador[producto] || 0) + valorVenta(venta)
    return acumulador
  }, {})

  const products = Object.entries(totalProducto)
  const jerarquia = [...products].sort((a, b) => b[1] - a[1]);
  const top = jerarquia.slice(0, k)

  return top

}console.log(topProductosPorValor(ventas, 3));

function clientesRecurrentes(ventas) {
  const vistos = [];
  const recurrentes = [];

  for (let i = 0; i < ventas.length; i++) {
    const cli = ventas[i].cliente;
    if (vistos.includes(cli) && !recurrentes.includes(cli)) {
      recurrentes.push(cli);
    } else if (!vistos.includes(cli)) {
      vistos.push(cli);
    }
  }

  return recurrentes;
}
console.log(clientesRecurrentes(ventas)); // ["C01", "C02", "C03"]

function totalCiudadCadena(ventas, ciudad) {
  const objetivo = normalizacion(ciudad);
  return ventas
    .map((v) => ({ ...v, ciudad: normalizacion(v.ciudad) }))
    .filter((v) => v.ciudad === objetivo)
    .map((v) => valorVenta(v))
    .reduce((acc, monto) => acc + monto, 0);
}

function totalCiudadUnaPasada(ventas, ciudad) {
  const objetivo = normalizacion(ciudad);
  let total = 0;
  for (const v of ventas) {
    if (normalizacion(v.ciudad) === objetivo) {
      total += valorVenta(v);
    }
  }
  return total;
}

function clientesRecurrentesSet(ventas) {
  const vistos = new Set();
  const recurrentes = new Set();

  for (let i = 0; i < ventas.length; i++) {
    const cli = ventas[i].cliente;

    // Si ya estaba en vistos, ahora es recurrente; si no, lo marcamos como visto
    if (vistos.has(cli)) {
      recurrentes.add(cli);
    } else {
      vistos.add(cli);
    }
  }

  return Array.from(recurrentes)
  //[...recurrentes]
}

function comprasPorCliente(ventas) {
  const conteo = new Map();

  for (let i = 0; i < ventas.length; i++) {
    const cli = ventas[i].cliente;
    const actual = conteo.has(cli) ? conteo.get(cli) : 0;
    conteo.set(cli, actual + 1);
  }

  return conteo;
} console.log("conteo Map: ", comprasPorCliente(ventas))

function clientesRecurrentesMap(ventas) {
  const conteo = comprasPorCliente(ventas);
  const recurrentes = [];

  for (const [cli, cantidad] of conteo) {
    if (cantidad > 1) {
      recurrentes.push(cli);
    }
  }

  return recurrentes;
}

function comboRegaloBruta(catalogo, valor) {
  if (!Array.isArray(catalogo) || catalogo.length < 2) {
    return null;
  }

  for (let i = 0; i < catalogo.length; i++) {
    for (let j = i + 1; j < catalogo.length; j++) {
      if (catalogo[i].precio + catalogo[j].precio === valor) {
        return [catalogo[i], catalogo[j]];
      }
    }
  }

  return null;
}

function comboRegalo(catalogo, valor) {
  if (!Array.isArray(catalogo) || catalogo.length < 2) {
    return null;
  }

  const vistos = new Map(); // precio -> objeto producto

  for (const item of catalogo) {
    const complemento = valor - item.precio;

    if (vistos.has(complemento)) {
      return [vistos.get(complemento), item];
    }

    if (!vistos.has(item.precio)) {
      vistos.set(item.precio, item);
    }
  }

  return null;
}

function comboRegaloBruta(catalogo, valor) {
  if (!Array.isArray(catalogo) || catalogo.length < 2) {
    return null;
  }

  for (let i = 0; i < catalogo.length; i++) {
    for (let j = i + 1; j < catalogo.length; j++) {
      if (catalogo[i].precio + catalogo[j].precio === valor) {
        return [catalogo[i], catalogo[j]];
      }
    }
  }

  return null;
}

function comboRegalo(catalogo, valor) {
  if (catalogo.length < 2) {
    return null;
  }

  const vistos = new Map(); // precio -> objeto producto

  for (const item of catalogo) {
    const complemento = valor - item.precio;

    if (vistos.has(complemento)) {
      return [vistos.get(complemento), item];
    }

    if (!vistos.has(item.precio)) {
      vistos.set(item.precio, item);
    }
  }

  return null;
}

function productoEstrellaPorCiudad(ventas) {
  if (!Array.isArray(ventas) || ventas.length === 0) {
    return {};
  }

  const porCiudad = new Map(); // ciudad -> Map(producto -> conteo)

  for (const venta of ventas) {
    const ciudad = normalizacion(venta.ciudad);
    const producto = venta.producto;

    if (!porCiudad.has(ciudad)) {
      porCiudad.set(ciudad, new Map());
    }

    const conteoProductos = porCiudad.get(ciudad);
    conteoProductos.set(producto, (conteoProductos.get(producto) || 0) + 1);
  }

  const resultado = {};

  for (const [ciudad, conteoProductos] of porCiudad.entries()) {
    let estrella = null;
    let maxVeces = 0;

    // Desempate: gana el primero que alcanza el máximo conteo
    for (const [producto, veces] of conteoProductos.entries()) {
      if (veces > maxVeces) {
        maxVeces = veces;
        estrella = producto;
      }
    }

    resultado[ciudad] = estrella;
  }

  return resultado;
}

function primerClienteUnico(ventas) {
  if (!Array.isArray(ventas) || ventas.length === 0) {
    return null;
  }

  const frecuencias = new Map();

  // Primer recorrido: contar apariciones de cada cliente
  for (const venta of ventas) {
    frecuencias.set(venta.cliente, (frecuencias.get(venta.cliente) || 0) + 1);
  }

  // Segundo recorrido: respetar el orden original de las ventas
  for (const venta of ventas) {
    if (frecuencias.get(venta.cliente) === 1) {
      return venta.cliente;
    }
  }

  return null;
}

function mejorSemanaBruta(dias, k) {
  if (!Array.isArray(dias) || dias.length === 0 || k <= 0 || k > dias.length) {
    return null;
  }

  let maxTotal = -Infinity;
  let mejorInicio = 0;

  for (let i = 0; i <= dias.length - k; i++) {
    let suma = 0;
    for (let j = 0; j < k; j++) {
      suma += dias[i + j];
    }
    if (suma > maxTotal) {
      maxTotal = suma;
      mejorInicio = i;
    }
  }

  return { inicio: mejorInicio, total: maxTotal };
}

function mejorSemana(dias, k) {
  if (!Array.isArray(dias) || dias.length === 0 || k <= 0 || k > dias.length) {
    return null;
  }

  let sumaVentana = 0;
  for (let i = 0; i < k; i++) {
    sumaVentana += dias[i];
  }

  let maxTotal = sumaVentana;
  let mejorInicio = 0;

  for (let i = k; i < dias.length; i++) {
    // Entra el nuevo día (dias[i]) y sale el día que quedó atrás (dias[i - k])
    sumaVentana = sumaVentana + dias[i] - dias[i - k];
    if (sumaVentana > maxTotal) {
      maxTotal = sumaVentana;
      mejorInicio = i - k + 1;
    }
  }

  return { inicio: mejorInicio, total: maxTotal };
}

function parMasCercano(catalogo, presupuesto) {
  if (!Array.isArray(catalogo) || catalogo.length < 2 || typeof presupuesto !== "number") {
    return null;
  }

  const ordenados = [...catalogo].sort((a, b) => a.precio - b.precio);
  let izq = 0;
  let der = ordenados.length - 1;
  let mejorPar = null;
  let mejorSuma = -Infinity;

  while (izq < der) {
    const suma = ordenados[izq].precio + ordenados[der].precio;

    if (suma <= presupuesto) {
      if (suma > mejorSuma) {
        mejorSuma = suma;
        mejorPar = [ordenados[izq], ordenados[der]];
      }
      izq++;
    } else {
      der--;
    }
  }

  return mejorPar;
}
module.exports = {
  totalCiudadCadena,
  totalCiudadUnaPasada,
  normalizacion,
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM,
  valorVenta,
  clientesRecurrentes,
  clientesRecurrentesSet,
  clientesRecurrentesMap,
  comprasPorCliente,
  comboRegalo,
  comboRegaloBruta,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorSemana, mejorSemanaBruta
}

