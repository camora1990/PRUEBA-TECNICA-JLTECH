import { cleanConsole, createAll } from "./data";
const companies = createAll();
cleanConsole(7, companies);

const getIndexUser = (indexCompany, idUser) => {
  const index = companies[indexCompany].users.findIndex(
    (user) => user.id === idUser
  );

  if (index === -1) {
    throw new Error("User not found");
  }
  return index;
};

const getIndexCompany = (id) => {
  const index = companies.findIndex((company) => company.id === id);
  if (index == -1) {
    throw new Error("Company not found");
  }
  return index;
};

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Parte 1: Crear una función tomando como parámetro un "id" de "company" y
// devolviendo el nombre de esta "company".

const getCompanyById = (id) => {
  return companies.find((company) => company.id === id).name;
};

const companyName = getCompanyById(7);

console.log("---- SOLUTION EXAMPLE 7 part 1 --- ", companyName);

// Parte 2: Crear una función tomando como parámetro un "id" de "company" y
// quitando la "company" de la lista.
const deleteCompanyById = (id) => {
  const index = getIndexCompany(id);
  const companyDeleted = companies.splice(index, 1);
  console.log("Company deleted was", companyDeleted);
  return companies;
};

try {
  const newCompanies = deleteCompanyById(7);
  console.log("---- SOLUTION EXAMPLE 7 part 2 --- ", newCompanies);
} catch (error) {
  console.error(error);
}
// Parte 3: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PATCH/PUT (como con una llamada HTTP) en todos los
// atributos de esta "company" excepto en el atributo "users".

const patchCompany = (idCompany, company = {}) => {
  const { isOpen, name } = company;

  if (isOpen == null || typeof isOpen != "boolean" || !name) {
    throw new Error("Atributtes required [isOpen: Type boolean, name]");
  }
  const indexCompany = getIndexCompany(idCompany);

  const tempCompany = companies[indexCompany];
  companies[indexCompany] = {
    ...tempCompany,
    isOpen: isOpen || tempCompany.isOpen,
    name: name || tempCompany.name,
  };
};
try {
  patchCompany(1, { name: "prueba name", isOpen: true });
  console.log("---- SOLUTION EXAMPLE 7 part 3 --- ", companies);
} catch (error) {
  console.error(error);
}
// Parte 4: Crear una función tomando como parámetro un "id" de "company" y un
// nuevo "user" cuyo el apelido es "Delgado", el nombre "Juan", de 35 años y
// dueño de un carro. El nuevo "user" debe agregarse a la lista de "users" de este
// "company" y tener un "id" generado automáticamente. La función también debe modificar
// el atributo "usersLength" de "company".

const addUserToCompany = (id, user) => {
  const index = getIndexCompany(id);
  user["id"] = companies[index].usersLength + 1;
  companies[index].users.push(user);
  companies[index].usersLength += 1;
};

const user = {
  lastName: "prueba",
  firstName: "Juan",
  age: 35,
  car: true,
};

try {
  addUserToCompany(5, user);
  console.log("---- SOLUTION EXAMPLE 7 part 4 --- ", companies);
} catch (error) {
  console.error(error);
}

// Parte 5: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PUT (como con una llamada HTTP) en esta "company" excepto
// en el atributo "users".

const putCompany = (idCompany, company = {}) => {
  const { isOpen, name } = company;
  const indexCompany = getIndexCompany(idCompany);

  const tempCompany = companies[indexCompany];
  companies[indexCompany] = {
    ...tempCompany,
    isOpen: isOpen || tempCompany.isOpen,
    name: name || tempCompany.name,
  };
};
try {
  putCompany(4, { name: "Adidas S.A.S" });
  console.log("---- SOLUTION EXAMPLE 7 part 5 --- ", companies);
} catch (error) {
  console.error(error);
}

// Parte 6: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user". La función debe quitar este "user" de la lista de "users"
// de "company" y cambiar el atributo "usersLength" de "company".

const deleteUserCompany = (idUser, idCompany) => {
  const indexCompany = getIndexCompany(idCompany);
  const indexUser = getIndexUser(indexCompany, idUser);

  const userDelete = companies[indexCompany].users.splice(indexUser, 1);
  companies[indexCompany].usersLength -= 1;

  console.log("User deleted was", userDelete);
};
try {
  deleteUserCompany(1, 1);
  console.log("---- SOLUTION EXAMPLE 7 part 6 --- ", companies);
} catch (error) {
  console.error(error);
}

// Parte 7: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PATCH (como con una llamada HTTP) en este
// "user".

const patchUser = (idCompany, idUser, user = {}) => {
  const { age, firstName, lastName, car } = user;
  const indexCompany = getIndexCompany(idCompany);
  const indexUser = idUser;
  const userCompany = companies[indexCompany].users[indexUser];
  companies[indexCompany].users[indexUser] = {
    ...userCompany,
    age: age || userCompany.age,
    firstName: firstName || userCompany.firstName,
    lastName: lastName || userCompany.lastName,
    car: car || userCompany.car,
  };
};

try {
  patchUser(5, 1, { firstName: "¨Pepito" });
  console.log("---- SOLUTION EXAMPLE 7 part 7 --- ", companies);
} catch (error) {
  console.error(error);
}

// Parte 8: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PUT (como con una llamada HTTP) en este
// "user".

const putUser = (idCompany, idUser, user) => {
  const indexCompany = getIndexCompany(idCompany);
  const indexUser = getIndexUser(indexCompany, idUser);
  const { age, firstName, lastName, car } = user;
  const userTemp = companies[indexCompany].users[indexUser];

  companies[indexCompany].users[indexUser] = {
    ...userTemp,
    age: age || userTemp.age,
    firstName: firstName || userTemp.firstName,
    lastName: lastName || userTemp.lastName,
    car: car || userTemp.car,
  };
};

try {
  putUser(2, 1, { age: 125 });
  console.log("---- SOLUTION EXAMPLE 7 part 8 --- ", companies);
} catch (error) {
  console.error(error);
}

// Parte 9: Crear una función tomando como parámetro dos "id" de "company" y
// un "id" de "user". La función debe permitir que el user sea transferido de la
// primera "company" a la segunda "company". El atributo "usersLength" de cada
// "company" debe actualizarse.

const moveUser = (FromCompanyId, toCompanyId, userId) => {
  const fromCompanyIndex = getIndexCompany(FromCompanyId);
  const userIndex = getIndexUser(fromCompanyIndex, userId);
  const toCompanyIndex = getIndexCompany(toCompanyId);
  const userToMove = companies[fromCompanyIndex].users.splice(userIndex, 1);
  companies[fromCompanyIndex].usersLength -= 1;
  const usersTemp = companies[toCompanyIndex].users;
  companies[toCompanyIndex].users = [...usersTemp, userToMove[0]];
  companies[toCompanyIndex].usersLength += 1;
};

try {
  moveUser(0, 5, 0);
  console.log("---- SOLUTION EXAMPLE 7 part 9 --- ", companies);
} catch (error) {
  console.error(error);
}

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Part 1: Create a function taking as parameter an "id" of "company" and
// returning the name of this "company".

// Part 2: Create a function taking as parameter an "id" of "company" and
// removing the "company" from the list.

// Part 3: Create a function taking as a parameter an "id" of "company" and
// allowing to make a PATCH (as with an HTTP call) on all
// attributes of this "company" except on the "users" attribute.

// Part 4: Create a function taking as parameter an "id" of "company" and a
// new "user" whose name is "Delgado", the first name "Juan", aged 35 and
// a car. The new "user" must be added to the "users" list of this
// "company" and have an automatically generated "id". The function must also modify
// the "usersLength" attribute of "company".

// Part 5: Create a function taking as parameter an "id" of "company" and
// allowing to make a PUT (as with an HTTP call) on this "company" except
// on the "users" attribute.

// Part 6: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user". The function must remove this "user" from the list of "users"
// from "company" and change the attribute "usersLength" from "company".

// Part 7: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PATCH (as with an HTTP call) on this
// "user".

// Part 8: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PUT (as with an HTTP call) on this
// "user".

// Part 9: Create a function taking as parameter two "id" of "company" and
// an "id" of "user". The function must allow the user to be transferred as a parameter
// from the 1st "company" to the 2nd "company". The "usersLength" attribute of each
// "company" must be updated
