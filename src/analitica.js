const ventas = require("./datos");

const normalizar = (texto) => texto.trim().toLowerCase();

// function valorVenta (venta){
//     return venta.cantidad * venta.precio
// }

const valorVenta = (venta) => venta.cantidad * venta.precio


function totalVendido(ventas){
    let total = 0 ;
    for (const venta of ventas){
         total += valorVenta(venta)

    }
    return total;
}

console.table(ventas)

console.log(totalVendido(ventas))

const Unidades = (t) => Unidades.cantidad
function unidadesVendidas(ventas){
    let total = 0
    for (const t of ventas){
        total += Unidades (t)
    }
    return total;
}

console.log(unidadesVendidas(ventas))


