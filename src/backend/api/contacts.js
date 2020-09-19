const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async(request, response) => {
    try {
        // knex syntax for selecting things. Look up the documentation for knex for further info
        const names = await knex("contacts").select('*');
        response.json(names);
    } catch (error) {
        throw error;
    }
});

// POST creating a new contact
// router.post("/", async(request, response) => {
//     try {
//         console.log(response.body);
//         // This could be insecure!!
//         const insertedContact = await knex("contacts").insert(response.body);
//         response.json(insertedContact);
//     } catch (error) {
//         throw error;
//     }
// });
router.post("/", async(request, response) => {
    createContact({
            body: request.body,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const createContact = async({ body }) => {
    const {
        Name,
        Email,
        Location,
        Phone,
    } = body;
    return await knex("contacts").insert({
        Name: Name,
        Email: Email,
        Location: Location,
        Phone: Phone,
    });
};


module.exports = router;