import { createAll, cleanConsole } from "./data";
const companies = createAll();

cleanConsole(1, companies);


// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando la variable "companies" como parámetro y reemplazando
// todos los valores "undefined" en "usuarios" por un string vacío.
// El nombre de cada "company" debe tener una letra mayúscula al principio, así como
// el apellido y el nombre de cada "user".
// Las "companies" deben ordenarse por su total de "user" (orden decreciente)
// y los "users" de cada "company" deben aparecer en orden alfabético.


const sorted = (companies) => {
  companies.sort((a, b) => b.usersLength - a.usersLength);
  companies.forEach((company) => {
    company.users.sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.firstName}`
      )
    );
  });
  return companies;
};

const capitalize = (companies) => {
  const temCompanies = companies.map((company) => {
    return {
      ...company,
      name: company.name.at(0).toUpperCase() + company.name.slice(1),
      users: company.users.map((user) => {
        return {
          ...user,
          firstName:
            user.firstName?.at(0).toUpperCase() + user.firstName?.slice(1) ||
            "",
          lastName:
            user.lastName?.at(0).toUpperCase() + user.lastName?.slice(1) || "",
        };
      }),
    };
  });

  return sorted(temCompanies);
};

const newCompanies = capitalize(companies)

console.log("----SOLUTION EXAMPLE 1 --- ", newCompanies);

export{
    capitalize
}



// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the variable "companies" as a parameter and replacing
// all values "undefined" in "users" by an empty string.
// The name of each "company" must have a capital letter at the beginning as well as
// the last name and first name of each "user".
// The "companies" must be sorted by their number of "user" (decreasing order)
// and the "users" of each "company" must be listed in alphabetical order
