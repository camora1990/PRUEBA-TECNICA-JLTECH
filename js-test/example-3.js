import { cleanConsole, createAll } from "./data";
import { capitalize } from "./example-1";
const companies = createAll();

cleanConsole(3, companies);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Cree una función tomando la variable "companies" como parámetro y devolviendo
// un booleano que valida que todos los nombres de las empresas y los atributos
// "firstName" y "lastName" de "users" están en mayúsculas.
// Debes probar la operación de esta función importando la función creada
// en el "example-1.js".

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the "companies" variable as a parameter and returning
// a boolean validating that all the names of the companies and the attributes "firstName"
// and "lastName" of "users" are capitalized. You must test the operation
// of this function by importing the function created for "example-1.js"

console.log("---- SOLUTION EXAMPLE 3 --- ", companies);
const companiesCapitalize = capitalize(companies);
const validatecapitalized = (companies) => {
  companies.forEach((company) => {
    if (company.name.at(0) === company.name.at(0).toUpperCase()) {
      company.users.forEach((user) => {
        if (
          user.firstName?.at(0) !== user.firstName.at(0)?.toUpperCase() ||
          user.lastNAme?.at(0) !== user.lastNAme?.at(0).toUpperCase()
        ) {

          console.error(`the user is not capitalized`, user);
          throw new Error(`failed`);
        }
      });
    } else {
   
      console.error(`the company is not capitalized`, company);
      throw new Error(`failed`);
    }
  });
};

try {
  validatecapitalized(companiesCapitalize);
  console.log("all names are capitalized");
} catch (error) {
  console.log("all names are not capitalized");
}
