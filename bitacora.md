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


PREDICCIÓN
Si n se multiplica por 10, las operaciones de totalVendidoI, ventaMayorI y totalPorCiudadI se multiplican por ~10, y primeraVenta se multiplica por 1 (se mantiene igual).

Recorridos y arreglos: totalCiudadCadena hace 4 recorridos (map, filter, map, reduce) y crea 3 arreglos intermedios; su complejidad es $O(n)$ en tiempo y $O(n)$ en espacio. totalCiudadUnaPasada hace 1 recorrido (for...of) y crea 0 arreglos intermedios; su complejidad es $O(n)$ en tiempo y $O(1)$ en espacio.Por qué ambas son $O(n)$ en tiempo: en Big O se eliminan las constantes multiplicativas ($4n$ y $1n$). Si n se multiplica por 10, ambas crecen unas 10 veces, por lo que las dos son $O(n)$ en tiempo.Espacio de las funciones del motor:$O(1)$ (constante): valorVenta, normalizacion, totalVendido, totalVendidoM, unidadesVendidas, unidadesVendidasM, ventaMayor, ticketPromedio y ventasPorCiudad (y ventasPorCiudadM si solo miras el acumulador final, aunque .filter() crea un arreglo intermedio).$O(n)$ (proporcional a los datos / claves únicas): totalPorCiudad (objeto por ciudad), unidadesPorProducto (objeto por producto) y topProductosPorValor (objeto por producto + arreglos Object.entries, [...products].sort(...) y .slice(0, k)).Decisión para el motor: me quedo con totalCiudadUnaPasada porque es clara, fácil de leer y evita crear arreglos intermedios, manteniendo el espacio en $O(1)$ al crecer los datos.

1. Entender:Entrada: arreglo ventas (objetos con cliente, producto, ciudad, cantidad, precio, etc.).   Salida: lista/arreglo de clientes que aparecen 2 o más veces (sin duplicados en la salida).Restricciones: debe responder en menos de 1 segundo con 100.000 ventas; el orden de los clientes recurrentes puede variar según la estrategia.2. Ejemplos y casos borde:Arreglo vacío []: devuelve [].Una sola venta [{ cliente: "C01", ... }]: devuelve [] (solo 1 aparición, no es recurrente).Todos distintos (C01, C02, C03): devuelve [].Un cliente repetido 4 veces (C01, C01, C01, C01): devuelve ["C01"] una sola vez, no repetido.Datos del Día 1 (12 ventas): devuelve ["C01", "C02", "C03"].   3. Fuerza bruta y su complejidad:Usar arreglos vistos y recurrentes con .includes() en cada venta obliga a re-recorrer esos arreglos desde el inicio. En el peor caso (todos clientes distintos), hace búsquedas acumuladas proporcionales a $n^2$: tiempo $O(n^2)$ y espacio $O(n)$.4. Idea de optimización:Cambiar búsquedas lineales en arreglos (.includes()) por estructuras hash (Set y Map), donde comprobar o insertar una clave toma tiempo constante promedio $O(1)$ en vez de re-escanear todo el arreglo.5. Implementar y 6. Probar:Se implementan clientesRecurrentesSet y comprasPorCliente en src/analitica.js y se prueban/miden comparando resultados ordenados y tiempos con console.time.

| `n` ventas | Original (ms) | `Set` (ms) | `Map` (ms) |
| :--- | :--- | :--- | :--- |
| `1.000` | `0.997` | `0.157` | `0.073` |
| `10.000` | `118.666` | `1.821` | `0.450` |
| `100.000` | *Omitida (crecimiento cuadrático)* | `14.637` | `5.891` |

Tiempo: pasamos de $O(n^2)$ a $O(n)$; al crecer n de 10.000 a 100.000 (10x), Set crece ~8x (1.821 ms → 14.637 ms) y Map ~13x (0.45 ms → 5.891 ms), manteniéndose en milisegundos.Memoria: pasamos de casi sin estructuras extra en la original a guardar Set o Map en memoria con espacio $O(n)$ en el peor caso (cuando todos los clientes son distintos). Es un intercambio directo: usamos más memoria en estructuras hash para evitar re-recorrer arreglos y bajar drásticamente el tiempo.

Inicio: vistos = Map {}, valor = 87000.

1. Origen Nariño 250 g (26000): complemento = 61000. ¿Está 61000 en vistos? No. Guarda 26000 -> Origen Nariño 250 g.

2. Origen Huila 500 g (42000): complemento = 45000. ¿Está 45000 en vistos? No. Guarda 42000 -> Origen Huila 500 g.

3. Origen Sierra 500 g (45000): complemento = 42000. ¿Está 42000 en vistos? Sí. Devuelve [Origen Huila 500 g, Origen Sierra 500 g].


valor = 87.000
Inicio: vistos = Map {}, valor = 87000.

1. Origen Nariño 250 g (26000): complemento = 61000. ¿Está 61000 en vistos? No. Guarda 26000 -> Origen Nariño 250 g.

2. Origen Huila 500 g (42000): complemento = 45000. ¿Está 45000 en vistos? No. Guarda 42000 -> Origen Huila 500 g.

3. Origen Sierra 500 g (45000): complemento = 42000. ¿Está 42000 en vistos? Sí. Devuelve [Origen Huila 500 g, Origen Sierra 500 g].