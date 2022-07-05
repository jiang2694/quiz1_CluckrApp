const faker = require("faker");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("clucks")
    .del()
    .then(function () {
      const clucks = Array.from({ length: 50 }).map(() => {
        return {
          username: faker.animal.type(),
          content: faker.company.catchPhrase(),
          imageUrl: faker.image.imageUrl(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),

        };
      });

      return knex("clucks").insert(clucks);
    });
};
