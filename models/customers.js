module.exports = (pool) => {

    const db = {};

    db.create = async ({ companyName, contactName, contactEmail, contactNumber }) => {
        return (await pool.query(`INSERT INTO customers VALUES (DEFAULT, $1,$2,$3,$4) RETURNING id`, [companyName, contactName, contactEmail, contactNumber])).rows[0].id
    }


    db.update = async (id, { companyName, contactName, contactEmail, contactNumber }) => {
        if (companyName) {
            await pool.query(`UPDATE customers SET companyName = $2 WHERE id = $1`, [id, companyName])
        }
        if (contactName) {
            await pool.query(`UPDATE customers SET contactName = $2 WHERE id = $1`, [id, contactName])
        }
        if (contactEmail) {
            await pool.query(`UPDATE customers SET contactEmail = $2 WHERE id = $1`, [id, contactEmail])
        }
        if (contactNumber) {
            await pool.query(`UPDATE customers SET contactNumber = $2 WHERE id = $1`, [id, contactNumber])
        }
    }
    db.delete = async (id) => {
        await pool.query(`DELETE FROM customers WHERE id = $1`, [id])

    }

    db.read = async (id) => {
        let res;
        if (id) {
            res = await pool.query('SELECT * FROM customers WHERE id = $1', [id])
        } else {
            res = await pool.query('SELECT * FROM customers')
        }
        return res.rows;

    }
    return db;
}