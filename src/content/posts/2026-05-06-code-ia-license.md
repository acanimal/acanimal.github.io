---
title: De quien es el código que escribe la IA? Y por qué debería importarte
pubDatetime: 2026-05-06T08:34:00Z
description: Si eres como el 99% de los programadores de hoy en día, probablemente uses una IA, ya sea Claude, Cursor, GitHub Copilot, o cualquier otro que existe ahora mismo. Es genial, le pides un componente en React, una función compleja en Python o un script de base de datos, y en segundos tienes código listo para producción. Pero, si estás construyendo un proyecto personal, una startup o trabajando para clientes, hay una pregunta incómoda que la mayoría de los devs ignoramos ¿De quién es realmente ese código?
tags:
  - Actualidad
  - IA
---

Si eres como el 99% de los programadores de hoy en día, probablemente uses una IA, ya sea Claude, Cursor, GitHub Copilot, o cualquier otro que existe ahora mismo. Es genial: le pides un componente en React, una función compleja en Python o un script de base de datos, y en segundos tienes código listo para producción.

Pero, si estás construyendo un proyecto personal, una startup o trabajando para clientes, hay una pregunta incómoda que la mayoría de los devs ignoramos: ¿De quién es realmente ese código?

Hace poco, un artículo de LegalLayer desglosó este tema y la respuesta corta da un poco de miedo: Tú tienes toda la responsabilidad legal, pero ninguna de las protecciones.

Vamos a traducirlo a un lenguaje más "asequible" para todos.

## El espejismo de los "Términos y Condiciones"

Si vas a los términos de servicio de Anthropic (los creadores de Claude), leerás algo que te dejará tranquilo: "El usuario es dueño de todo el Output (resultado)".

Problema resuelto, ¿verdad? Falso.

Un contrato entre tú y una empresa de IA no está por encima de la ley de Propiedad Intelectual. La ley (especialmente en EE. UU., que marca la pauta global) es muy clara: el copyright o los derechos de autor solo se otorgan a seres humanos.

Escribir un prompt larguísimo y súper detallado no cuenta como "autoría" para la ley. Es el equivalente legal a decirle a un taxista a dónde quieres ir; tú no estás conduciendo el coche.

> Nota: el prompt si te pertenece, así que puede ser buena idea comenzar a guardarlos en el repositorio como parte del proyecto.

## Los dos grandes peligros para tu código

Si tu código está generado sustancialmente por IA, te enfrentas a dos problemas graves:

1. El código de dominio público (cualquiera puede copiarte)
   Como la IA no es humana, el código que genera de forma autónoma no tiene copyright. Básicamente, nace en el dominio público.

   **¿Qué significa esto en la práctica?** Si tu startup o proyecto se basa en código 100% generado por IA sin intervención humana significativa, cualquier competidor podría ver tu código (si se filtra o es público), copiarlo exactamente igual y no podrías demandarlos. Para los inversores, esto significa que tu tecnología principal "no es defendible".

1. Contaminación de licencias (el fantasma del GPL)
   Aquí es donde te cae la responsabilidad. Las IA como Claude o Copilot han sido entrenadas leyendo miles de millones de líneas de código de repositorios de código abierto. Muchos de estos repositorios usan licencias copyleft restrictivas (como la GPL).

   Si la IA memorizó un fragmento de código GPL y te lo escupe exactamente igual y tú lo metes en tu software privado (cerrado)... ¡Felicidades! Acabas de infringir los derechos de autor de otro programador. Podrías enfrentarte a demandas y verte obligado a hacer que todo tu proyecto sea de código abierto.

## ¿Cómo nos protegemos en el día a día?

No entres en pánico, no tienes que desinstalar Claude. Solo tienes que cambiar tu modelo mental. Piensa en la IA no como una máquina de escribir, sino como un Junior Developer muy rápido pero un poco despistado.
Aquí tienes 3 reglas de oro para blindar tu código:

1. **No seas solo un "copiador"**: Para que el código tenga copyright tuyo, necesitas hacer aportaciones humanas. Diseña tú la arquitectura, haz refactorizaciones pesadas, cambia la lógica. Si la IA te da el 80% y tú le aplicas tu toque humano en el 20%, la ley empieza a verte como el autor real.
2. **Documenta tu trabajo (¡Usa bien Git!)**: Escribe mensajes de commit detallados que expliquen el "por qué" y el "cómo" de los cambios, no solo lo que hizo la IA. Esto demuestra tu intencionalidad y diseño arquitectónico.
3. **Pasa un escáner de licencias**: Si estás construyendo algo comercial serio, usa herramientas que escanean tu base de código para detectar si tienes fragmentos robados de repositorios con licencias GPL o similares.

## En resumen

La IA ha creado un vacío legal gigante. Hace que sea más fácil que nunca construir software rápido, pero también hace que sea facilísimo construir software que legalmente no es tuyo.
Sigue usando la IA para ir a la velocidad de la luz, pero recuerda: la responsabilidad final de limpiar, revisar y "humanizar" el código, es siempre tuya.
¿Qué opinas? ¿Crees que la ley debería cambiar para darle derechos de autor a los programadores que usan IA?
