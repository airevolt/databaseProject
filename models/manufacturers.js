
module.exports = (pool) => {

    const db = {};

    db.create = async ({ companyName, contactName, contactEmail,contactNumber }) => {
        return (await pool.query(`INSERT INTO manufacturers VALUES (DEFAULT, $1,$2,$3,$4) RETURNING id`, [companyName, contactName, contactEmail,contactNumber])).rows[0].id
    }


    db.update = async (id, { companyName, contactName, contactNumber, contactEmail }) => {
        if (companyName) {
            await pool.query(`UPDATE manufacturers SET companyName = $2 WHERE id = $1`, [id, companyName])
        }
        if (contactName) {
            await pool.query(`UPDATE manufacturers SET contactName = $2 WHERE id = $1`, [id, contactName])
        }
        if (contactNumber) {
            await pool.query(`UPDATE manufacturers SET contactNumber = $2 WHERE id = $1`, [id, contactNumber])
        }
        if (contactEmail) {
            await pool.query(`UPDATE manufacturers SET contactEmail = $2 WHERE id = $1`, [id, contactEmail])
        }
    }
    db.delete = async (id) => {
        await pool.query(`DELETE FROM manufacturers WHERE id = $1`, [id])

    }

    db.read = async (id) => {
        let res;
        if (id) {
            res = await pool.query('SELECT * FROM manufacturers WHERE id = $1', [id])
        } else {
            res = await pool.query('SELECT * FROM manufacturers')
        }
        return res.rows;

    }
    return db;
}