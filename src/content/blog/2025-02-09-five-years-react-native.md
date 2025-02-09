---
title: Cinco años de react native en Shopify
pubDatetime: 2025-02-09T09:34:00Z
description: Shopify ha estado utilizando React Native durante los últimos cinco años y recientemente ha compartido sus experiencias, logros y desafíos del viaje. En este post, resumo los puntos clave del artículo "Five years of React Native at Shopify" (https://shopify.engineering/five-years-of-react-native-at-shopify) y reflexiono sobre lo que podemos aprender de sus aciertos y errores al adoptar dicha tecnología.
tags:
  - resumen
  - react native
---

Shopify ha estado utilizando React Native durante los últimos cinco años y recientemente ha compartido sus experiencias, logros y desafíos del viaje. En este post, resumo los puntos clave del artículo [Five years of React Native at Shopify](https://shopify.engineering/five-years-of-react-native-at-shopify) y reflexiono sobre lo que podemos aprender de sus aciertos y errores al adoptar dicha tecnología.

## ¿Por qué Shopify apostó por React Native?

Hace cinco años, Shopify tomó la decisión de adoptar React Native con el objetivo de mejorar la eficiencia del desarrollo móvil y maximizar la reutilización de código entre plataformas.

Su idea era minimizar la duplicación de trabajo entre las versiones de iOS y Android, lo que podría traducirse en tiempos de desarrollo más rápidos y menos esfuerzo de mantenimiento.

Esta apuesta también respondía a la necesidad de ofrecer una experiencia de usuario consistente en todas sus aplicaciones, sin el coste de gestionar dos bases de código separadas.

React Native prometía velocidad y agilidad en la entrega de nuevas funcionalidades y una curva de aprendizaje más suave para desarrolladores familiarizados con JavaScript y React.

## Los beneficios claves que encontraron

A lo largo de estos cinco años, Shopify ha identificado una serie de ventajas clave en el uso de React Native:

### Código compartido

Tener un solo código base para iOS y Android ha optimizado el uso de recursos, reduciendo los tiempos de desarrollo y simplificando la corrección de errores. Además, ha permitido a los equipos trabajar de manera más coordinada, evitando esfuerzos duplicados y asegurando que las mejoras y correcciones beneficien a ambas plataformas simultáneamente.

### Mayor velocidad de iteración

Gracias a herramientas como Fast Refresh, los desarrolladores pueden ver los cambios en tiempo real sin necesidad de recompilar la app, lo que mejora la productividad. Esto ha hecho que los ciclos de desarrollo sean más ágiles y que se puedan realizar ajustes rápidos sin afectar la estabilidad del proyecto.

### Ecosistema activo y en crecimiento

React Native cuenta con una comunidad en constante evolución, lo que permite aprovechar mejoras constantes y soluciones a problemas comunes. Shopify ha podido beneficiarse de esta comunidad abierta, adoptando herramientas y librerías que facilitan la implementación de nuevas funcionalidades sin tener que desarrollar todo desde cero.

### Compatibilidad con tecnologías web

Al compartir la misma lógica con React en la web, Shopify pudo unificar parte de su stack tecnológico y facilitar la colaboración entre equipos. Esto ha significado que desarrolladores con experiencia en frontend web han podido contribuir de manera más fluida al desarrollo móvil sin tener que aprender un ecosistema completamente distinto.

### Flexibilidad y adaptabilidad

Aunque React Native permite un alto grado de reutilización de código, también ofrece la posibilidad de integrar código nativo en aquellas áreas donde se requiere un rendimiento óptimo. Esto le ha dado a Shopify la libertad de optimizar su aplicación en áreas críticas sin comprometer los beneficios de una plataforma compartida.

## Los retos que han enfrentado

Sin embargo, el camino no estuvo exento de desafíos. Shopify tuvo que lidiar con varios problemas técnicos y organizacionales al adoptar React Native:

### Rendimiento en aplicaciones complejas

A medida que sus aplicaciones crecían, algunas partes requerían optimización nativa más profunda para mantener un rendimiento fluido. Esto fue especialmente importante en funciones que demandaban un alto rendimiento gráfico o procesamiento intensivo, donde React Native no siempre ofrecía la misma eficiencia que el código nativo.

### Curva de aprendizaje para desarrolladores

No todos los ingenieros estaban familiarizados con React Native desde el inicio, por lo que fue necesario invertir en formación y buenas prácticas. Shopify tuvo que proporcionar formación interna, guías de estilo y sesiones de mentoría para asegurar una transición fluida y eficiente hacia este nuevo ecosistema.

### Mantenimiento de código híbrido

A pesar de usar principalmente React Native, hubo casos donde Shopify necesitó integrar código nativo para funcionalidades específicas, lo que requirió una gestión cuidadosa para evitar inconsistencias. Esto implicó la necesidad de mantener equipos con experiencia en tecnologías móviles tradicionales, como Swift y Kotlin, para cubrir estos escenarios.

### Dependencias en la comunidad

Aunque la comunidad de React Native es activa, algunas herramientas y plugins externos no siempre estaban actualizados, lo que a veces generaba bloqueos en el desarrollo. Shopify tuvo que evaluar cuidadosamente las dependencias que utilizaba, contribuir con mejoras a proyectos de código abierto y, en algunos casos, desarrollar sus propias soluciones internas para mitigar estos problemas.

## ¿Qué pasará ahora?

A pesar de estos desafíos, Shopify sigue confiando en React Native y continúa invirtiendo en mejorar sus herramientas y procesos. Su experiencia reafirma que React Native es una gran opción para muchas empresas, especialmente aquellas que buscan rapidez en el desarrollo, consistencia entre plataformas y una integración fluida con tecnologías web.

En el futuro, Shopify planea continuar explorando nuevas optimizaciones de rendimiento y mejorar la experiencia del desarrollador dentro de su stack de React Native. Además, buscan contribuir activamente a la comunidad, compartiendo mejoras y aprendizajes que puedan beneficiar a otras empresas que estén en el mismo camino.

## Reflexión final

La experiencia de Shopify demuestra que React Native puede ser una excelente elección, pero no es una solución universal. Si bien ofrece grandes beneficios, es fundamental evaluar las necesidades específicas de cada proyecto y estar preparados para complementar con soluciones nativas cuando sea necesario.

En definitiva, React Native sigue evolucionando y, con el apoyo de empresas como Shopify, su futuro parece prometedor.

Para quienes estén considerando adoptarlo, la clave está en entender sus ventajas, prepararse para sus desafíos y aprovechar al máximo su flexibilidad para construir experiencias móviles de alta calidad.
