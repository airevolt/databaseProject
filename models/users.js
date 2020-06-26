module.exports = (pool) => {

    const db = {};

    db.create = async ({ firstname, lastname, email }) => {
        return (await pool.query(`INSERT INTO users VALUES (DEFAULT, $1,$2,$3) RETURNING id`, [firstname, lastname, email])).rows[0].id
    }


    db.update = async (id, { firstname, lastname, email }) => {
        if (firstname) {
            await pool.query(`UPDATE users SET firstname = $2 WHERE id = $1`, [id, firstname])
        }
        if (lastname) {
            await pool.query(`UPDATE users SET lastname = $2 WHERE id = $1`, [id, lastname])
        }
        if (email) {
            await pool.query(`UPDATE users SET email = $2 WHERE id = $1`, [id, email])
        }
    }
    db.delete = async (id) => {
        await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    }

    db.read = async (id) => {
        let res;
        if (id) {
            res = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        } else {
            res = await pool.query('SELECT * FROM users')
        }
        return res.rows;

    }
    return db;
}