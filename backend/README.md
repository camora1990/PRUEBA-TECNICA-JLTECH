## INSTALAR LAS DEPENDENCIAS DEL PROYECTO

`npm i`

## CONFIGURAR ARCHIVO .env

se debe crear un archivo .env.

En el archivo `.env.prueba` se encuentra alojado el ejemplo de cómo debe estar creado,el archivo .enves necesario ya que se encuentran almacenadas las variables globales para:

- puerto (PORT)
- conexión a base de datos (CONNECTION_STRING)
- llave secreta para generación y verificación de JWT (PRIVATE_KEY)

## IMPORTAR LA COLLECION EN POSTMAN

en el archivo `prueba tecnica JLTECH.postman_collection.json` se encuentran todas las request con los endpoints necesarios para realizar los CRUDs, para importarlo en tu postman seguir las instrucciones que se encuentran en la documentación oficial de postman.

[Documentación postman](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)

## EJECUTAR EL PROYECTO

`npm run dev`

## CREAR DE USUARIO INICIAL

se expone un endpoint `http://localhost:8081/api/v1/register` para registrar un usuario o usuarios, esta ruta solo estará disponible en ambiente de desarrollo, la puedes encontrar en la colección de postman con el nombre de `POST_REGISTER`

los roles disponible son `["ADMINISTRATOR", "SELLER", "HUMAN RESOURCES", "WAREHOUSEMAN"]`

## CREAR CATEGORIAS DE PRODUCTOS

a la hora de la creacion de un producto necesitaras una categoria, estas solo las pueden crear los roles `["ADMINISTRATOR", "WAREHOUSEMAN"]` las puedes crear en en siguiente endpoint `http://localhost:8081/api/v1/categories` y el nombre de la request en postman es `POST_CATEGORY`

# NOTA

`todas las rutas están protegidas por JWT a excepción login` el envio del token se realiza en los headers con la key: Authorization y el value: Bearer token
