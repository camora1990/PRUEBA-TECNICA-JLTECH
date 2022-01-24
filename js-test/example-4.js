import { cleanConsole, createAll } from "./data";

const companies = createAll();

cleanConsole(4, companies);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando como parámetro la variable "companies" y agrupando
// todos los "users" de todas las "companies" en una sola tabla. Cada "user"
// debe tener un nuevo atributo "company" que tenga como valor el nombre de la
// dicha "company". Los "users" deben ordenarse de acuerdo con sus edad
// (de mayor a menor).

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking as parameter the "companies" variable and grouping
// all "users" of all "companies" in a single table. Each "user"
// must have a new attribute "company" having for value the name of the "company"
// to which it belongs. The "users" must be sorted according to their
// age (from oldest to youngest)

const groupingUsers = (companies) => {
  const tableUser = [];
  companies.forEach((company) => {
    company.users.forEach((user) => {
      tableUser.push({
        age: user.age,
        car: user.car,
        firstName: user.firstName,
        id: user.id,
        lastName: user.lastName,
        company: company.name,
      });
    });
  });

  return tableUser.sort((a, b) => b.age - a.age);
};

const newUsersTable = groupingUsers(companies);

console.log("---- SOLUTION EXAMPLE 4 --- ", newUsersTable);

export { groupingUsers };
