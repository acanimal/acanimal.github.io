---
title: Builders vs Keepers — la guerra civil de la ingeniería de software
pubDatetime: 2026-08-10T10:15:00Z
description: "En los últimos años ha surgido una división cada vez más profunda dentro de los equipos de ingeniería. No hablo de lenguajes, frameworks o religión de tabs vs espacios. Hablo de algo más fundamental: la guerra entre builders y keepers. Dos formas de ver el software que chocan constantemente y que, si no se gestionan bien, pueden dinamitar un equipo."
tags:
  - opinion
  - ingeniería
  - career
draft: true
---

Si trabajas en un equipo de programación seguro que has sentido esta tensión entre dos tipos de profesionales. En cuanto te los describa te vas a sentir identificado con uno de ellos. Dependiendo en el tipo de empresa donde hayas trabajado puede predominar más uno u otro. No es lo mismo un equipo que mantiene un producto consolidado y estable, con un cliente definido y estable, a una startup buscando su market fit adaptandose a las necesidades a medida que avanza.

Si, hoy voy a hablar de esa guerra silenciosa que existe en la ingeniería de software.

Por un lado están **los builders**. Esos ingenieros que se llevan el subidón de dopamina cuando ven a usuarios usando lo que han construido. Que no echan de menos escribir código a mano. Que prefieren darle al producto antes que leerse un artículo técnico. Los más extremos ya van por ahí predicando que el código ha muerto, que los LLMs lo harán todo y que la idea es lo único que importa.

Por el otro lado están **los keepers**. Los que disfrutan construyendo sistemas bien hechos por el puro reto técnico. Los que odian el código cutre y no pueden evitar hacer un refactor cada vez que tocan una parte del sistema. Su versión extrema te suelta que los modelos siempre producirán basura, que el vibe coding arruinará empresas y que si no lees el código estás perdido.

> Y lo peor de todo es que los dos tienen razón. Y los dos están equivocados.

El artículo de Anton Zaides en [Manager.dev](https://www.manager.dev/newsletter/the-software-engineering-war) describe esta guerra perfectamente. Y viene con una historia personal que duele porque muchos la hemos vivido.

## La historia que todos conocemos

Zaides se convirtió en CTO de una startup con su amigo de la infancia como CEO. Primer mes genial. Segundo mes, discusiones. Su cofundador no entendía por qué era tan lento en un mundo con LLMs. Quería pushear features desde el móvil sin leer código. "Si tenemos un bug, que los agentes lo arreglen".

Zaides sentía que estaban construyendo un castillo de naipes que se derrumbaría en cuanto llegase un cliente real.

Discusiones que se convirtieron en peleas. Siete meses después se separaron. Cero clientes de pago y un producto que apenas funcionaba.

> Él era un builder. Yo era un keeper. Es la misma pelea que nuestra industria está teniendo ahora mismo.

Duele porque es verdad. Y duele porque todos hemos estado en algún lado de esa mesa.

## El builder

El builder vive para el impacto. Para él, el software es un medio para conseguir un fin: que alguien use lo que ha hecho. No le importa si el código interno es bonito, le importa que funcione y que llegue rápido.

**Lo bueno**: los builders son los que mueven la aguja. Sin ellos, las startups nunca saldrían del garaje. Son los que se atreven a lanzar algo imperfecto y aprender del mercado. Tienen una obsesión por el usuario que los keepers a veces perdemos.

**Lo malo**: cuando se pasan de frenada, construyen castillos de naipes. Deuda técnica hasta el cuello, sistemas que nadie entiende, y una base de código que duele mirar. El día que algo se rompe de verdad, no saben por dónde empezar a mirar.

## El keeper

El keeper vive para la calidad. Para él, el software es una disciplina de ingeniería. Le gusta que las cosas estén bien hechas, bien diseñadas, bien pensadas. Un buen keeper duerme mejor sabiendo que su sistema no se va a caer.

**Lo bueno**: los keepers son los que hacen que el software dure. Sin ellos, los sistemas serían ingobernables en menos de un año. Son los que pagan la deuda técnica antes de que llegue el recibo. Los que construyen bases sólidas sobre las que otros pueden construir.

**Lo malo**: cuando se pasan, nunca terminan nada. Buscar la perfección es una trampa. He visto keepers incapaces de soltar una funcionalidad porque "todavía no está lista". Spoiler: nunca lo está. El 80% bien hecho a tiempo vale más que el 100% perfecto que nunca llega.

## El equilibrio es jodidamente difícil

Y aquí está el problema gordo: **los extremos son el peor lugar para estar**.

El builder que vende código a producción sin leer una línea, y el keeper que se niega a usar un LLM en 2026 — los dos están atrapados en opiniones obsoletas, negándose a admitir que el otro lado tiene algo de razón.

La clave no está en elegir bando. Está en entender cuándo ser cada uno.

Zaides lo explica muy bien con el concepto de posición relativa: tu orientación no es fija, depende de con quién estés hablando. Con tu CEO no técnico, probablemente representes al keeper. Dentro de tu equipo de ingenieros, puede que seas el builder. Y eso está bien, siempre que seas consciente de ello.

> La gente que más respeto es la que puede cambiar de opinión con el tiempo y no se avergüenza de admitir que estaba equivocada.

DHH es un gran ejemplo. Hace un año decía que no dejaba que la IA escribiera código por él, que sentía la competencia escaparse de sus dedos. Seis meses después, tuiteó que la IA ya era lo suficientemente buena y que había cambiado de opinión. Sin drama. Sin falsa coherencia. Simplemente evolucionó.

## Cómo convivir sin matarse

Si lideras un equipo o simplemente quieres mejorar la dinámica con tus compañeros, aquí van algunas ideas:

1. **Reconoce el sesgo de tu bando**. Si eres builder, asume que tu impaciencia tiene un coste técnico. Si eres keeper, asume que tu perfeccionismo tiene un coste de oportunidad.

2. **El contexto lo dicta todo**. Una startup en fase pre-seed necesita builders. Un producto consolidado con miles de usuarios necesita keepers. El problema es cuando no sabes en qué fase estás o no quieres aceptarlo.

3. **No demonices al otro lado**. El builder no es un irresponsable. El keeper no es un lentorrón. Son perspectivas distintas que, combinadas, dan mejores resultados.

4. **Acepta que puedes estar equivocado**. Como dice Zaides, los que más respeta son los que pueden cambiar de opinión. La rigidez mental es el verdadero enemigo.

5. **Busca el término medio consciente**. No se trata de ser tibio. Se trata de saber cuándo apretar el acelerador y cuándo pisar el freno, y tener criterio para decidirlo.

## En resumen

Esta guerra no se va a acabar. La IA no ha hecho más que ponerle combustible. Pero como toda dicotomía en ingeniería, la respuesta no está en un extremo.

> La próxima vez que discutas con un compañero sobre si hay que soltar ya o esperar a que esté perfecto, para un segundo y pregúntate: ¿qué necesita esto ahora? ¿Un builder o un keeper?

Lo más probable es que necesites un poco de los dos. Y si eres capaz de verlo, estarás un paso más cerca de ser un ingeniero completo, no solo un soldado de un bando.
