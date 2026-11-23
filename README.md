# Café de Origen

## ¿Qué es el proyecto?

Café de Origen es un proyecto didáctico en JavaScript que analiza un conjunto de ventas de productos relacionados con el café. Los datos contienen el producto, la ciudad, la cantidad vendida, el precio y otras referencias de cada operación.

El proyecto permite calcular indicadores comerciales con ciclos y con métodos funcionales, comparar sus resultados y mostrar los datos en tablas.

## Cómo ejecutarlo

Requisitos:

- Tener instalado Node.js.
- Ejecutar los comandos desde la raíz del proyecto.

Comandos disponibles:

```bash
node src/explorar.js
node src/analitica.js
node src/verificar.js
node src/reporte.js
```

- `explorar.js` muestra la cantidad de ventas y los registros disponibles.
- `analitica.js` calcula los indicadores y muestra resultados y pruebas con datos completos, de un elemento y vacíos.
- `verificar.js` compara las implementaciones realizadas con ciclos y con métodos modernos de JavaScript.
- `reporte.js` presenta el listado completo de las ventas en una tabla.

## Preguntas que responde

- ¿Cuál fue el valor total vendido?
- ¿Cuántas unidades se vendieron?
- ¿Cuál fue la venta de mayor valor?
- ¿Cuál es el ticket promedio por venta?
- ¿Cuánto se ha vendido en una ciudad determinada?
- ¿Cuánto se vendió por ciudad?
- ¿Cuántas unidades se vendieron por producto?
- ¿Cuáles son los tres productos con mayor valor vendido?

# Rendimiento del motor de analítica

## Tabla de funciones (base: 10.000 ventas)

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación | Medición (10.000 ventas) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `valorVenta` | Calcula `cantidad * precio` de una venta | $O(1)$ | $O(1)$ | Operación aritmética directa sin bucles ni estructuras extra | ~0 ms / 1 op por venta |
| `normalizacion` | Limpia espacios y pasa texto a minúsculas | $O(1)$ | $O(1)$ | Depende del largo del texto de ciudad/producto, no de `n` | ~0 ms / 1 op por llamada |
| `totalVendido` | Suma el valor total de todas las ventas | $O(n)$ | $O(1)$ | Un solo recorrido sumando en un acumulador numérico | 10.000 ops |
| `unidadesVendidas` | Suma cantidades mayores a 0 | $O(n)$ | $O(1)$ | Un recorrido y acumulador escalar | ~10.000 ops |
| `ventaMayor` | Encuentra la venta de mayor valor | $O(n)$ | $O(1)$ | Un recorrido comparando cada venta con el máximo actual | 10.000 ops |
| `ticketPromedio` | Calcula el promedio de ventas con cantidad > 0 | $O(n)$ | $O(1)$ | Un recorrido con dos acumuladores numéricos | ~10.000 ops |
| `ventasPorCiudad` | Suma el valor de ventas de una ciudad dada | $O(n)$ | $O(1)$ | Un recorrido filtrando por ciudad y acumulando un total | ~10.000 ops |
| `totalPorCiudad` | Agrupa el total vendido por cada ciudad | $O(n)$ | $O(n)$* | Un recorrido; guarda un total por ciudad distinta en un objeto | 20.000 ops |
| `unidadesPorProducto` | Agrupa unidades vendidas por producto | $O(n)$ | $O(n)$* | Un recorrido; guarda totales por producto distinto en un objeto | ~20.000 ops |
| `topProductosPorValor` | Ordena productos por valor y toma el top `k` | $O(n + m \log m)$ | $O(n)$* | Agrupa por producto, ordena entradas y recorta `k` elementos | ~ms (según `m` productos) |
| `clientesRecurrentes` | Lista clientes que aparecen más de una vez | $O(n^2)$ | $O(n)$ | Por cada venta revisa `.includes()` sobre arreglos acumulados | Medir en ms con `console.time` |
| `totalCiudadCadena` | Normaliza, filtra, mapea valores y suma en cadena | $O(n)$ | $O(n)$ | 4 pasadas (`map`, `filter`, `map`, `reduce`) y 3 arreglos intermedios | ~40.000 ops / ~ms |
| `totalCiudadUnaPasada` | Suma el valor de una ciudad en un solo ciclo | $O(n)$ | $O(1)$ | Un `for...of` sin arreglos intermedios ni acumulador por clave | ~10.000 ops / ~ms |

*\*Acotada por cantidad de ciudades/productos únicos (`m`), que en el peor caso escala con `n`.*

## Proyección (1.000.000 de ventas)

- **Funciones lineales $O(n)$** (`totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, `totalPorCiudad`, `unidadesPorProducto`, `totalCiudadUnaPasada`, `totalCiudadCadena`): al pasar de `10.000` a `1.000.000` de ventas (`100x`), las operaciones y el tiempo crecen unas **100 veces** respecto a `n = 10.000` (o **62.5x** respecto a `n = 16.000`).
- **Función cuadrática $O(n^2)$** (`clientesRecurrentes`): al multiplicar `n` por `100` desde `10.000` (o `62.5x` desde `16.000`), el trabajo crece cuadráticamente ($100^2 = 10.000\text{x}$ desde `10.000`, o $62.5^2 \approx 3.906\text{x}$ desde `16.000`), tomando tu tiempo medido en `16.000` como base: $T_{1.000.000} \approx T_{16.000} \times 3.906$.

## Riesgos

Criterio: de **mayor a menor riesgo** al crecer `n`, priorizando **crecimiento temporal** ($O(n^2)$ primero, luego $O(n \log n)$ / múltiples pasadas) y luego **uso de memoria** ($O(n)$ antes que $O(1)$).

1. **`clientesRecurrentes`** — Riesgo crítico ($O(n^2)$ tiempo, $O(n)$ espacio): se dispara de forma cuadrática con muchos clientes distintos.
2. **`topProductosPorValor`** — Riesgo alto ($O(n + m \log m)$ tiempo, $O(n)$ espacio): crea varias estructuras intermedias y ordena arreglos.
3. **`totalCiudadCadena`** — Riesgo medio-alto ($O(n)$ tiempo con constante `4`, $O(n)$ espacio): genera arreglos intermedios innecesarios en cada ejecución.
4. **`totalPorCiudad` y `unidadesPorProducto`** — Riesgo medio ($O(n)$ tiempo, $O(n)$ espacio): crecen linealmente en tiempo y acumulan objetos según claves únicas.
5. **`totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, `totalCiudadUnaPasada`** — Riesgo bajo ($O(n)$ tiempo, $O(1)$ espacio): escalan linealmente sin asignar memoria proporcional a `n`.
6. **`valorVenta` y `normalizacion`** — Riesgo muy bajo ($O(1)$ tiempo, $O(1)$ espacio).

## Plan de optimización

- **Función objetivo:** `clientesRecurrentes`.
- **Trabajo que se repite:** en cada venta se vuelve a recorrer desde el inicio `vistos` y `recurrentes` mediante `.includes()`, repitiendo búsquedas lineales una y otra vez.
- **Información a guardar:** usar estructuras de búsqueda en tiempo promedio constante (`Set`), por ejemplo `vistos = new Set()` para registrar clientes ya vistos y `recurrentes = new Set()` para guardar los repetidos sin duplicados (o un `Map` / objeto con conteo de apariciones por cliente), evitando re-escanear arreglos en cada iteración.
