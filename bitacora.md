Diccionario de datos:
con ventas.length observamos que tenemos 12 elementos, ventas [0] nos mostró el primer elemento que es toda la primera fila. 

ventas.[ventas.length-1] nos dijo la posición del último elemento y finalmente console.table nos imprimió la tabla en la consola. 

Casos borde detectados:
En la fila 8 dice que el cliente C06 no compró nada, como es una tabla de ventas y una fila no representa mucha información la eliminaría. 
El nombre de las ciudades comienza con mayuscula y algunas tienen tildes a excepción de una, lo que haría es convertir todos los nombres de las ciudades a minuscula y sin tilde.

Plan:
INICIALIZAR variables:
  totalVentas = 0
  totalUnidades = 0
  ventaMaxima = 0
  contadorTransacciones = 0

VERIFICAR CASO BORDE:
  Si la lista de ventas está vacía:
    Retornar resultados en 0.

PARA CADA venta EN la lista de ventas:
  Acumulador de dinero
  totalVentas = totalVentas + venta.valor
  
  Acumulador de unidades
  totalUnidades = totalUnidades + venta.unidades
  
  Patrón Máximo
  Si venta.valor > ventaMaxima:
    ventaMaxima = venta.valor
    
  Contador de transacciones
  contadorTransacciones = contadorTransacciones + 1

FIN PARA

Cálculo del Ticket Promedio con validación de división por cero
Si contadorTransacciones > 0:
  ticketPromedio = totalVentas / contadorTransacciones
Sino:
  ticketPromedio = 0
