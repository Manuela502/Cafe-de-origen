const ventas = require("./datos")

const { normalizacion } = require("./analitica")
const {valorVenta} = require("./analitica")

const productos = Array.from(new Set(ventas.map(v => v.producto)))
const precio = Array.from(new Set(ventas.map(v => v.precio)))
const ciudades = Array.from(new Set(ventas.map(v => normalizacion(v.ciudad))))

const azar = (max, min) => Math.floor(Math.random() * (max - min) + min);

function generarVentas(n) {
    const cliente = Math.max(1, Math.floor(n / 3));
    const ventasR = []

    for (let i = 1; i <= n; i++) {
        const p = productos[azar(productos.length - 1, 0)];

        ventasR.push({
            id: i,
            fecha: "2026-09-" + String(azar(0, 30)).padStart(2, "0"),
            cliente: "C" + String(azar(1, cliente)).padStart(2, "0"),
            producto: p,
            ciudad: ciudades[azar(ciudades.length - 1, 0)],
            cantidad: azar(1, 5),
            precio: precio[azar(precio.length - 1, 0)]
        })
    }
    return ventasR

}
 console.table(generarVentas(5));

const contador =  {valor:0}

function totalVendidoI(ventas, contador){    
    

    contador.valor += ventas.length;

    return ventas.reduce((total, venta) => total + valorVenta(venta), 0 )
    
} 
console.log(totalVendidoI(generarVentas(5), contador))
console.log(contador.valor);


function ventaMayorI(ventas){
    let contador =  0
    
    if (ventas.length === 0){
    return null
  }
  
  let mayor = ventas[0]

  for (const v of ventas) {
    contador ++
    if (valorVenta(v) > valorVenta(mayor)) {
      mayor = v
    }
  }
  return {mayor: mayor, contador: contador}
 
}

const ventasPrueba = generarVentas(5)

const ventaM = ventaMayorI(ventas)

console.log("contador de venta mayor: ", ventaM.contador)

console.table(ventasPrueba)

console.log(ventaMayorI(ventasPrueba, contador))
console.log(contador.valor)


module.exports = {
    generarVentas
}

