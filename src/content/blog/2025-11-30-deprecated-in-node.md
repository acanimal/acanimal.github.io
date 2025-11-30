---
title: Cómo gestionar código obsoleto en Node.js con `deprecated`
pubDatetime: 2025-11-30T09:28:00Z
description: Todo evoluciona y tu código tampoco se libra de ello. Si has escrito o mantenido alguna vez una librería o código que usan otras personas ya sabrás que es comun que los nuevos cambios dejen obsoletas otras partes de tu código. En este artículo te explico la mejor forma de marcar como "deprecated" aquellas partes de tu codigo, de forma que tus usuarios sean concientes de ello y se muevan a utilizar las nuevas funcionalidades.
tags:
  - programación
  - tips
language: spanish
---

Todo evoluciona y el código no es una excepción. Si has escrito o mantenido alguna vez una librería o código que usan otras personas ya sabrás que es comun que los nuevos cambios dejen obsoletas otras partes de tu código. En este artículo te explico la mejor forma de marcar como "deprecated" aquellas partes de tu codigo, de forma que tus usuarios sean concientes de ello y se muevan a utilizar las nuevas funcionalidades.

Supon que has desarrollado una libraría que ayuda a realizar ciertos cálculos y tienes una función `calcularTotal` que por motivos varios pasar a llamarse simplemente `calcular`. Fácil, no? cambias el nombre y listo. No, en la vida real, donde tu librería ya ha sido publicada en un repositorio y cientos de personas hacen uso de ella, la cosa no es tan simple.

## Paso 1: El buen hábito de la documentación

Efectivamente, documenta tu función. Se "organizado" e indica a otros programadores que una funcion está obsoleta y, potencial, será borrada en una futura versión con la etiqueta `@deprecated` de JSDoc.

```typescript
/**
 * @deprecated Usa 'calcular' en lugar 'calcularTotal'. Esta funcion será eliminada en próximas versions.
 * @param {number} cantidad El valor a procesar.
 * @returns {number} El resultado del cálculo antiguo.
 */
function calcularTotal(cantidad: number): number {
  return cantidad * 1.05; // 5% de impuesto
}

/**
 * @param {number} cantidad El valor a procesar.
 * @param {number} impuesto Incremento en el precio
 * @returns {number} El resultado del cálculo antiguo.
 */
function calcular(cantidad: number, impuesto: number): number {
  return cantidad * (1 + impuesto);
}
```

Simple y deonata preocupación por ser pulido. Gracias a la etiqueta `@deprecated` el editor de código (debe ser uno muy simple para que no lo haga) avisará visualmente a los usuarios que quieran usar la función obsoleta `calculoTotal`. Eso si, ten en cuenta que solo es un "aviso visual", y que el editor no evita que quien quiera usarla la use.

![deprecated tag](@content/blog/images/2025-11-30-deprecated.png)

## Paso 2: Informa en tiempo de ejecución

Hay otro forma de notificar a tus usuarios que una funcion ha quedado obsoleta y no hay necesidad de usen el editor para ello. Basta con usar la función nativa de Node.js `util.deprecated()`.

### ¿Qué hace `util.deprecated`?

La funcion `util.deprecated` es un _wrapper_ (debe envolver) a tu función obsoleta. De esta forma, en tiempo de ejecución, cuando `util.deprecated` se ejecuta hace dos cosas:

- Advertencia en la consola: La primera vez que el código llama a la función _envuelta_, Node.js emitirá la advertencia en la salida de error estándar (stderr), informando al usuario sobre el cambio.

- Advertencia única: la advertencia solo se emite una vez, evitando inundar la consola si la función obsoleta se llama miles de veces.

```typescript
/**
 * @deprecated Usa 'calcular' en lugar 'calcularTotal'. Esta funcion será eliminada en próximas versions.
 * @param {number} cantidad El valor a procesar.
 * @returns {number} El resultado del cálculo antiguo.
 */
function _calcularTotal(cantidad: number): number {
  return cantidad * 1.05; // 5% de impuesto
}

// Creamos wrapper
export const calcularTotal = deprecated(
  _calcularTotal,
  'La función "calcularTotal" está obsoleta. Usa "calcular" en su lugar. La funcion "calcularTotal" sera eliminada en la proxima version.'
);
```

El resultado por consola sería algo como:

```bash:dark
(node:21682) DeprecationWarning: La función "calcularTotal" está obsoleta. Usa "calcular" en su lugar. La funcion "calcularTotal" sera eliminada en la proxima version.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

## Conclusión

La combinación de `@deprecated` en la documentación y `util.deprecated` en el código es el estándar de oro para la migración de APIs.

Usa `@deprecated` para advertir al desarrollador en su editor y utilizas `util.deprecated` para advertir al usuario cuando su código realmente se esté ejecutando en producción o pruebas.

De esta manera, facilitas la vida de tus usuarios y mantienes tu código base listo para el futuro.
