Diccionario de datos:
con ventas.length observamos que tenemos 12 elementos, ventas [0] nos mostró el primer elemento que es toda la primera fila. 

ventas.[ventas.length-1] nos dijo la posición del último elemento y finalmente console.table nos imprimió la tabla en la consola. 

Casos borde detectados:
En la fila 8 dice que el cliente C06 no compró nada, como es una tabla de ventas y una fila no representa mucha información la eliminaría. 
El nombre de las ciudades comienza con mayuscula y algunas tienen tildes a excepción de una, lo que haría es convertir todos los nombres de las ciudades a minuscula y sin tilde.

Verificación manual con tablas de traza
Traza de totalVendido(ventas)
| ID | Cantidad | Precio | Operación | Total acumulado |
|---:|---:|---:|---:|---:|
| 1 | 2 | 42000 | 2 * 42000 = 84000 | 84000 |
| 2 | 1 | 26000 | 1 * 26000 = 26000 | 110000 |
| 3 | 1 | 95000 | 1 * 95000 = 95000 | 205000 |
| 4 | 1 | 42000 | 1 * 42000 = 42000 | 247000 |
| 5 | 3 | 45000 | 3 * 45000 = 135000 | 382000 |
| 6 | 2 | 26000 | 2 * 26000 = 52000 | 434000 |
| 7 | 1 | 120000 | 1 * 120000 = 120000 | 554000 |
| 8 | 0 | 42000 | 0 * 42000 = 0 | 554000 |
| 9 | 2 | 45000 | 2 * 45000 = 90000 | 644000 |
| 10 | 4 | 42000 | 4 * 42000 = 168000 | 812000 |
| 11 | 1 | 95000 | 1 * 95000 = 95000 | 907000 |
| 12 | 3 | 26000 | 3 * 26000 = 78000 | 985000 |

Resultado manual: 985000
Resultado del programa: totalVendido(ventas) = 985000
Los resultados coinciden.

Traza de ventasPorCiudad(ventas, "Medellín")
| ID | Ciudad normalizada | ¿Coincide? | Valor de la venta | Total acumulado |
|---:|---|---|---:|---:|
| 1 | medellín | Sí | 84000 | 84000 |
| 2 | bogotá | No | 26000 | 84000 |
| 3 | cali | No | 95000 | 84000 |
| 4 | medellín | Sí | 42000 | 126000 |
| 5 | medellín | Sí | 135000 | 261000 |
| 6 | bogotá | No | 52000 | 261000 |
| 7 | bogotá | No | 120000 | 261000 |
| 8 | cali | No | 0 | 261000 |
| 9 | cali | No | 90000 | 261000 |
| 10 | pereira | No | 168000 | 261000 |
| 11 | medellín | Sí | 95000 | 356000 |
| 12 | bogotá | No | 78000 | 356000 |

Resultado manual: 356000
Resultado del programa: ventasPorCiudad(ventas, "Medellín") = 356000
Los resultados coinciden.
