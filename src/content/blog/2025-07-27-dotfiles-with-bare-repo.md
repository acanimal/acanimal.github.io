---
title: Gestiona tus dotfiles con Git y un Bare Repo
pubDatetime: 2025-07-27T08:23:00Z
description: Los dotfiles son archivos ocultos que comienzan con un punto (como .bashrc, .vimrc, o .gitconfig) y sirven para personalizar herramientas como el terminal, tu shell o tu editor de texto. Vaya, que son los archivos de configuración y son esenciales para que tu entorno de desarrollo se sienta tuyo y funcione como te gusta. Tenerlos organizados no solo mejora tu productividad diaria, sino que también te permite replicar fácilmente esa configuración en otros equipos.

tags:
  - tips
  - developer
  - productivity
---

Los dotfiles son archivos ocultos que comienzan con un punto (como .bashrc, .vimrc, o .gitconfig) y sirven para personalizar herramientas como la terminal, tu shell o tu editor de texto. Vaya, que son los archivos de configuración y son esenciales para que tu entorno de desarrollo se sienta tuyo y funcione como te gusta. Tenerlos organizados no solo mejora tu productividad diaria, sino que también te permite replicar fácilmente esa configuración en otros equipos.

Una de las mejores formas de gestionar estos archivos es usando Git. ¿Por qué? Porque Git te permite hacer un seguimiento de los cambios, volver a versiones anteriores y sincronizarlos fácilmente en la nube.

En este artículo, vamos a explorar una técnica potente y elegante: usar un _bare repo_ para controlar tus dotfiles sin moverlos de su lugar ni duplicarlos. Con este método, lograrás:

- Versionar tus archivos de configuración sin complicaciones.

- Evitar el uso de enlaces simbólicos u otras herramientas adicionales.

- Mantener tus archivos en las rutas originales, como esperan tus programas.

- Migrar tu entorno de desarrollo a nuevas máquinas en pocos pasos.

## ⚙️ ¿Qué es un "Bare Repository"?

Un bare repository (o repositorio desnudo) es una versión de Git sin un directorio de trabajo. Normalmente, cuando clonas un repositorio tienes una carpeta .git con los datos internos y los archivos visibles. En un bare repo, solo tienes los datos de Git, sin archivos visibles.

Esto nos viene perfecto para versionar nuestros dotfiles. ¿Por qué? Porque en vez de tener una copia de los archivos en una carpeta separada, Git trabajará directamente sobre tu directorio home (~). La carpeta .dotfiles guardará todo el historial de Git y tus archivos seguirán en su lugar habitual.

Con esto, puedes hacer commits, ver historial y sincronizar cambios como en cualquier repositorio Git. Pero sin tener que mover tus archivos ni crear enlaces simbólicos. Todo está donde debe estar.

## 🏠 Guía paso a paso para configurar tu bare repo

1. Crear el repositorio

Primero, crea el repositorio oculto:

```bash
git init --bare $HOME/.dotfiles
```

Esto crea una carpeta .dotfiles que almacenará todo lo relacionado con Git.

2. Crear un alias para facilitar los comandos

Cada vez que uses Git para este repo, tendrás que indicarle dónde está con --git-dir, así que como esto es un engorro lo mejor es simplificar y crear un alias dotfiles para cuando queramos usar git con nuestro dotfiles:

```bash
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
```

Agrega esta línea a tu archivo .bashrc, .zshrc o el que uses, para que esté disponible cada vez que abras la terminal.

3. Ocultar archivos no versionados

Por defecto, Git te mostrará todo lo que no está siendo rastreado. Pero no queremos ver toda tu carpeta personal como "no versionada". Para evitarlo:

```bash
dotfiles config --local status.showUntrackedFiles no
```

4. Añadir tus primeros dotfiles

Ya puedes empezar a versionar tus configuraciones como si de un repo de git se tratase (porque de eso se trata):

```bash
dotfiles add .bashrc .zshrc .gitconfig .config/nvim/init.vim
dotfiles commit -m "Primer commit de mis dotfiles"
```

Este paso guarda tu configuración actual en el historial de Git.

5. Subir tus dotfiles a un repositorio remoto

Si quieres hacer backup en GitHub u otro servicio, añade un repositorio remoto:

```bash
dotfiles remote add origin <git@github.com>:tuusuario/dotfiles.git
dotfiles push -u origin master
```

Con esto, tus dotfiles están guardados en la nube.

> IMPORTANTE: Si tu repositorio remoto es publico (como suele pasar con GitHub) recuerda no subir archivos que contengan información importante, como passwords, api keys, etc. Te sorprendería lo que se puede obtener con <https://github.com/search?q=openai_api_key&type=repositories> .

## 📄 Usar tus dotfiles en otra computadora

Si tienes otro equipo y quieres clonar tu configuración de dotfiles los pasos son similares:

1. Clonar el repositorio remoto como bare

```bash
git clone --bare <git@github.com>:tuusuario/dotfiles.git $HOME/.dotfiles
```

Esto descarga tu repositorio en la misma carpeta oculta.

2. Volver a crear el alias

```bash
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
```

Es importante tener este alias para seguir trabajando cómodamente.

3. Hacer checkout de los archivos

```bash
dotfiles checkout
```

Esto intenta colocar tus dotfiles en su lugar.

## ⚠️ ¿Conflictos con archivos ya existentes?

Es probable que el sistema ya tenga archivos como .bashrc. En ese caso, haz una copia (no está de más ser previsor):

```bash
mkdir -p .dotfiles-backup
dotfiles checkout 2>&1 | grep -E "\s+\." | awk {'print $1'} | xargs -I{} mv {} .dotfiles-backup/
dotfiles checkout
```

Con esto, tus archivos originales no se pierden y puedes revisar qué conservar.

### 🔧 Recomendaciones útiles

- Crea un buen .gitignore para evitar subir archivos innecesarios o sensibles.

- No uses dotfiles add \* porque podrías agregar más de lo que deseas.

- Haz commits frecuentemente con mensajes que te ayuden a entender qué cambiaste.

- Si trabajas en varios sistemas operativos, usa ramas diferentes o condicionales dentro de los dotfiles.

- Escribe un script install.sh que clone tu repo, cree el alias y haga el checkout automáticamente.

- Considera incluir configuraciones de VS Code, tmux, o scripts personalizados.

- Documenta tus decisiones dentro de los archivos con comentarios útiles.

## ❓ Preguntas comunes

### ❌ ¿Qué pasa si hago reset --hard?

Ten mucho cuidado: si haces esto, podrías borrar archivos importantes de tu HOME. Antes de usarlo, asegúrate de saber qué archivos están versionados y haz un backup.

### 🚀 ¿Puedo guardar solo algunos archivos?

¡Claro! Solo tienes que hacer dotfiles add archivo1 archivo2 y Git solo rastreará esos archivos.

### 🧰 ¿Puedo tener configuraciones distintas por computadora?

Sí. Puedes usar ramas (main, laptop, trabajo, etc.) o usar condicionales en tus dotfiles como:

```bash
if [ "$HOSTNAME" = "mi-laptop" ]; then
export EDITOR=nano
fi
```

## 🎉 Conclusión

Usar un bare repo para manejar tus dotfiles es una forma ordenada, minimalista y profesional de mantener tu entorno bajo control. No necesitas herramientas extra ni estructuras complejas: solo Git y algo de organización. Puedes hacer cambios, deshacer errores y replicar tu entorno en minutos.

¿Lo mejor? Todo está en tu carpeta personal, donde los programas esperan encontrar sus configuraciones. Así que no solo es práctico, sino también natural para tu sistema.
