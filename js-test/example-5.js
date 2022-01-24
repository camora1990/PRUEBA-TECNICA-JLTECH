import { cleanConsole, createAll } from "./data";
import { groupingUsers } from "./example-4";
const companies = createAll();

cleanConsole(5, companies);


// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Use la función creada en el ejemplo 4 para crear una nueva función tomando
// como parámetro la variable "companies" y devuelve un nuevo objeto con los
// siguientes atributos:
//     'size' => total de "users"
//     'average' => edad promedio de "users"
//     'hasCar' => total de "users" propietarios de un carro
//     'averageWithCar' => edad promedio de los "users" con un carro

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Use the function created in example 4 to create a
// new function taking as parameter the "companies" variable and returning
// a new object with the following attributes:
//     'size' => number of "users"
//     'average' => average age of "users"
//     'hasCar' => number of "users" owning a car
//     'averageWithCar' => average age of users with a car.

const getInformation = (companies) => {
  const tableUsers = groupingUsers(companies);
  const information = {};
  let toltaAge = 0;
  let sumAgeUserCar = 0;
  let countUserHasCar = 0;
  tableUsers.forEach((user) => {
    const { age } = user;
    toltaAge += age;
    if (user.car) {
      sumAgeUserCar += age;
      countUserHasCar++;
    }
  });
  information.size = tableUsers.length;
  information.average = toltaAge / information.size;
  information.hasCar = countUserHasCar,
  information.averageWithCar = sumAgeUserCar/countUserHasCar

 return information
 
};
const information = getInformation(companies);
console.log("---- SOLUTION EXAMPLE 5 --- ", information);
