**Modelo Entidad-Relación:**


![Entidad-Relación](https://github.com/Barahona1602/AYD_P1_G7/blob/feature202110773/dataBase/server/Relational%20AyD1.png)

**Diagrama de Casos de Uso**


![Diagrama de Casos de Uso](https://github.com/Barahona1602/AYD_P1_G7/blob/feature202110773/dataBase/server/Diagrama%20de%20Casos%20de%20Uso.png)

**Casos de Uso de Alto Nivel:**

| **Registro de Usuario** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios registrarse en la plataforma proporcionando información personal necesaria. |

| **Inicio de Sesión** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios/Administrador |
| Descripción | Permite a los usuarios autenticarse en la plataforma usando su correo electrónico y contraseña. |

| **Ingreso de Libros** | |
| --- | --- |
| Tipo | Primario |
| Roles | Administrador |
| Descripción | Permite al administrador agregar nuevos libros a la biblioteca virtual, especificando detalles como título, sinopsis, autor, etc. |

| **Actualizar Libros** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Administrador |
| Descripción | Permite al administrador modificar cualquier atributo de un libro existente en la biblioteca. |

| **Eliminar Libros** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Administrador |
| Descripción | Permite al administrador eliminar libros de la biblioteca virtual que ya no cumplen con los estándares o no se venden. |

| **Eliminar Usuarios** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Administrador |
| Descripción | Permite al administrador eliminar usuarios que no cumplan con las normas de la aplicación o no hayan devuelto libros a tiempo. |

| **Página Principal del Usuario** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios |
| Descripción | Muestra el perfil del usuario después de iniciar sesión, permitiéndole editar la información personal. |

| **Compra/Alquiler de Libros** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios adquirir libros mediante compra o alquiler, con restricciones para la disponibilidad y devolución. |

| **Comentar Libros** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios dejar comentarios sobre los libros en la biblioteca, con opción para eliminar sus propios comentarios. |

| **Devolver Libros** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios devolver los libros alquilados, con mensajes de alerta si la devolución se realiza después de la fecha límite. |

| **Historial de Compras y Rentas** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios ver su historial de compras y alquileres de libros realizados a lo largo del tiempo. |

**Casos de Uso Expandidos:**

| **Registro de Usuario** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios registrarse en la plataforma proporcionando información personal necesaria. |
| **Flujo:** | |
|| 1. El usuario accede a la página de registro. |
|| 2. Completa el formulario con los datos requeridos. |
|| 3. Envía el formulario. |
|| 4. La plataforma verifica la validez de los datos. |
|| 5. Si los datos son válidos, se registra el usuario y se le redirige a la página de inicio de sesión. Si hay errores, se muestran mensajes de error. |
| **Flujo alterno:** | |
|| - Si el usuario intenta registrarse con un correo electrónico ya existente, se muestra un mensaje de error indicando la duplicación. |

| **Inicio de Sesión** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios autenticarse en la plataforma usando su correo electrónico y contraseña. |
| **Flujo:** | |
|| 1. El usuario ingresa su correo electrónico y contraseña. |
|| 2. La plataforma verifica la autenticidad de la información. |
|| 3. Si la autenticación es exitosa, se redirige al usuario a su página principal. Si falla, se muestra un mensaje de error. |
| **Flujo alterno:** | |
|| - Si el usuario intenta iniciar sesión con un correo no registrado, se muestra un mensaje de error. |

| **Ingreso de Libros** | |
| --- | --- |
| Tipo | Primario |
| Roles | Administrador |
| Descripción | Permite al administrador agregar nuevos libros a la biblioteca virtual, especificando detalles como título, sinopsis, autor, etc. |
| **Flujo:** | |
|| 1. El administrador accede a la sección de ingreso de libros. |
|| 2. Completa el formulario con los detalles del libro. |
|| 3. Envía el formulario. |
|| 4. La plataforma valida la información y agrega el libro a la biblioteca. |
| **Flujo alterno:** | |
|| - Si algún campo obligatorio no se completa, se muestra un mensaje de error. |

| **Actualizar Libros** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Administrador |
| Descripción | Permite al administrador modificar cualquier atributo de un libro existente en la biblioteca. |
| **Flujo:** | |
|| 1. El administrador selecciona un libro existente para editar. |
|| 2. Modifica los atributos necesarios del libro. |
|| 3. Guarda los cambios. |
|| 4. La plataforma actualiza la información del libro. |
| **Flujo alterno:** | |
|| - Si el administrador intenta cambiar el estado del libro, se muestra un mensaje de error. |

| **Eliminar Libros** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Administrador |
| Descripción | Permite al administrador eliminar libros de la biblioteca virtual que ya no cumplen con los estándares o no se venden. |
| **Flujo:** | |
|| 1. El administrador selecciona un libro para eliminar. |
|| 2. Confirma la eliminación. |
|| 3. La plataforma elimina el libro de la biblioteca. |
| **Flujo alterno:** | |
|| - Si el libro está siendo utilizado por algún usuario, se muestra un mensaje de error. |

| **Eliminar Usuarios** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Administrador |
| Descripción | Permite al administrador eliminar usuarios que no cumplan con las normas de la aplicación o no hayan devuelto libros a tiempo. |
| **Flujo:** | |
|| 1. El administrador selecciona a un usuario para eliminar. |
|| 2. Confirma la eliminación. |
|| 3. La plataforma elimina al usuario y sus datos asociados. |
| **Flujo alterno:** | |
|| - Si el usuario tiene libros pendientes, se muestra un mensaje de advertencia. |

| **Página Principal del Usuario** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios |
| Descripción | Muestra el perfil del usuario después de iniciar sesión, permitiéndole editar la información personal. |
| **Flujo:** | |
|| 1. El usuario inicia sesión y accede a su página principal. |
|| 2. Visualiza y edita la información de su perfil. |
|| 3. Guarda los cambios si es necesario. |
| **Flujo alterno:** | |
|| - Si el usuario intenta editar con datos inválidos, se muestra un mensaje de error. |

| **Compra/Alquiler de Libros** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios adquirir libros mediante compra o alquiler, con restricciones para la disponibilidad y devolución. |
| **Flujo:** | |
|| 1. El usuario selecciona un libro y elige comprar o alquilar. |
|| 2. Completa el proceso de compra o alquiler. |
|| 3. La plataforma actualiza el estado del libro y registra la transacción. |
| **Flujo alterno:** | |
|| - Si el usuario intenta alquilar un libro ya ocupado, se muestra un mensaje de error. |

| **Comentar Libros** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios dejar comentarios sobre los libros en la biblioteca, con opción para eliminar sus propios 
| **Flujo:** | |
|| 1. El usuario navega por la biblioteca y selecciona un libro. |
|| 2. Deja un comentario sobre el libro. |
|| 3. La plataforma registra el comentario y lo muestra en la página del libro. |
| **Flujo alterno:** | |
|| - El usuario puede eliminar sus propios comentarios si lo desea. |

| **Devolver Libros** | |
| --- | --- |
| Tipo | Primario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios devolver los libros alquilados, con mensajes de alerta si la devolución se realiza después de la fecha límite. |
| **Flujo:** | |
|| 1. El usuario accede a su colección de libros alquilados. |
|| 2. Selecciona un libro para devolver. |
|| 3. Confirma la devolución. |
|| 4. La plataforma actualiza el estado del libro y registra la devolución. |
| **Flujo alterno:** | |
|| - Si la devolución se realiza después de la fecha límite, se muestra un mensaje de advertencia. |

| **Historial de Compras y Rentas** | |
| --- | --- |
| Tipo | Secundario |
| Roles | Usuarios |
| Descripción | Permite a los usuarios ver su historial de compras y alquileres de libros realizados a lo largo del tiempo. |
| **Flujo:** | |
|| 1. El usuario accede a la sección de historial. |
|| 2. Visualiza una lista de sus compras y rentas anteriores. |
| **Flujo alterno:** | |
|| - Si el historial está vacío, se muestra un mensaje indicando que no hay registros. |


**Tablero Kanban:**

![Tablero 1](https://github.com/Barahona1602/AYD_P1_G7/blob/feature202110773/dataBase/server/Tablero%201.jpg)

![Tablero 2](https://github.com/Barahona1602/AYD_P1_G7/blob/feature202110773/dataBase/server/Tablero%202.jpg)

![Tablero 3](https://github.com/Barahona1602/AYD_P1_G7/blob/feature202110773/dataBase/server/Tablero%203.jpg)

![Tablero 4](https://github.com/Barahona1602/AYD_P1_G7/blob/feature202110773/dataBase/server/Tablero%204.jpg)

![Tablero 5](https://github.com/Barahona1602/AYD_P1_G7/blob/feature202110773/dataBase/server/Tablero%205.jpg)
