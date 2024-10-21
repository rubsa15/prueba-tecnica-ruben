# Prueba Técnica Ruben

Este es un proyecto de prueba técnica desarrollado con React, Vite, TypeScript y TailwindCSS.

## Requisitos

Antes de empezar, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) como gestor de paquetes.

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/usuario/prueba-tecnica-ruben.git
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

   o si usas yarn:

   ```bash
   yarn install
   ```

## Scripts Disponibles

En el archivo `package.json`, se han definido los siguientes scripts:

### `dev`

Inicia el servidor de desarrollo de Vite, que permite el desarrollo rápido y la recarga en caliente.

```sh
npm run dev
```

### `build`

Compila el proyecto utilizando TypeScript y luego construye los archivos optimizados para producción con Vite.

```sh
npm run build
```

### `lint`

Ejecuta ESLint en los archivos .ts y .tsx para asegurar la calidad del código y que se sigan las convenciones establecidas.

```sh
npm run lint
```

### `test`

Ejecuta los test con Vitest.

```sh
npm run test
```

## Decisiones tomadas

Lo primero que he hecho al comenzar el proyecto ha sido realizar toda la maquetación de la pantalla. Para ello, he creado los componentes Button, Input y Dropdown para poder reutilizarlos. Después, he ido maquetando el resto de la pantalla en función de estos componentes. Para maquetar el proyecto, he decidido usar la librería Tailwind, que facilita el desarrollo.

La segunda decisión ha sido pensar en cómo iba a ser el modelo de los datos que iba a recibir para gestionar las plantas y las salas. En este caso, he gestionado las salas y las plantas desde un mismo objeto, pero también se podrían haber gestionado los datos de las salas por un lado, y los de las plantas por otro. Al haberme decantado por esta opción, luego a la hora de añadir, modificar y eliminar salas, ha sido más complicado.

Después de decidir cómo gestionar los datos, he creado un servicio y un hook para recuperar todos los datos. Estos datos los he mapeado, para que si en un futuro la respuesta del endpoint cambiara, solo sería necesario adaptar este mapeo. Además de esto, la gestión de los errores en este caso no se ha tratado, pero se debería hacer.

A continuación, he creado un context para gestionar los datos de las plantas y poder acceder a los datos y acciones para modificar, eliminar y añadir desde todas las partes del proyecto. He creado un hook para acceder al context, por si en un futuro se decidiera gestionar cómo pasar los datos de alguna manera diferente. De esta forma, conseguimos abstraerlo. He decidido manejar los datos mediante useState, pero también se podría hacer mediante un useReducer. Sin embargo, he optado por useState porque el número de acciones a ejecutar no era muy grande. Dentro de este context, he decidido guardar en un estado la id de la planta seleccionada en vez de la propia planta, porque me servía tanto para gestionar la opción del dropdown como para ayudarme después cuando había que modificar el objeto de las plantas.

Por último, he decidido añadir tests unitarios tanto a los servicios, como a los hooks y a los componentes para asegurarnos de un correcto funcionamiento.

## Dificultades encontradas

Las dificultades que me he encontrado han sido al ir a definir cómo iba a ser el objeto que me iba a devolver el endpoint, ya que esto iba a definir gran parte del desarrollo del proyecto. Además, por definir el objeto de esa manera, luego se iba a complicar añadir, modificar y eliminar salas, ya que había que estar todo el rato buscando la id dentro del array para poder acceder después a la posición de dicho array.
