const pg = require('pg');
const usersModel = require("../models/users");

(async () => {

    const Pool = pg.Pool
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'galvanize',
        password: 'galvanize',
        port: 5432,
    })

    try {

        await pool.query(`
        DROP TABLE IF EXISTS users, manufacturers, customers, items, purchaseOrder, salesOrder
        `);
        await pool.query(`
        CREATE TABLE users(
            id serial PRIMARY KEY,
            firstname varchar(20) NOT NULL,
            lastname varchar(20) NOT NULL,
            email varchar(40) NOT NULL
            )
            `);
        await pool.query(`
            CREATE TABLE manufacturers(
                id serial PRIMARY KEY,
                companyName varchar(20) NOT NULL,
                contactName varchar(20) NOT NULL,
                contactEmail varchar(40) NOT NULL,
                contactNumber varchar(20) NOT NULL
                )
                `);
        await pool.query(`
                CREATE TABLE customers(
                    id serial PRIMARY KEY,
                    companyName varchar(20) NOT NULL,
                    contactName varchar(20) NOT NULL,
                    contactEmail varchar(40) NOT NULL,
                    contactNumber varchar(20) NOT NULL
                    )
                    `);
        await pool.query(`
                    CREATE TABLE items(
                        id serial PRIMARY KEY,
                        itemName varchar(20) NOT NULL,
                        description varchar(100) NOT NULL
                        )
                        `);
        await pool.query(`
                        CREATE TABLE purchaseOrder(
                            id serial PRIMARY KEY,
                            itemId_ integer NOT NULL REFERENCES items(id),
                            qty integer NOT NULL,
                            dateOrdered bigint NOT NULL,
                            dateRcvd bigInt NOT NULL,
                            manufacturer_ integer NOT NULL REFERENCES manufacturers(id)
                            )
                            `);
        await pool.query(`
                            CREATE TABLE salesOrder(
                                id serial PRIMARY KEY,
                                itemId_ integer NOT NULL REFERENCES items(id),
                                qty integer NOT NULL,
                                dateOrdered bigint NOT NULL,
                dateRcvd bigInt NOT NULL,
                customerId_ integer NOT NULL REFERENCES customers(id)
                )
                `);


        console.log("Complete!");

    } catch (error) {
        console.error("######  DATABASE ERROR  ######")
        console.error(error)
    }


    const users = usersModel(pool)

    
    var matthewID = await users.create({ firstname: "matthew", lastname: "howard", email: "myemail@gmail" });
    var aliceID = await users.create({ firstname: "alice", lastname: "howard", email: "other@gmail" });
    await users.delete(1);
    var bobID = await users.create({ firstname: "bob", lastname: "howard", email: "foo@gmail" });
    console.log(await users.read(matthewID))
    console.log(await users.read(aliceID))
    console.log(await users.read())
    await users.update(bobID, { email: "bar@gmail.com" });
    await pool.end();
})();