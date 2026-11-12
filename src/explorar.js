const ventas = require('./datos'); // Importas lo que el archivo exportó

console.log(ventas.length); // Muestra 12
console.log(ventas[0]);
console.log([ventas.length-1]);
console.log(ventas[11]);
console.log(ventas[4].producto);
console.table(ventas);