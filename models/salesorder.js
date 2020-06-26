module.exports = (pool) => {

    const db = {};

    db.create = async ({  itemId_, qty, dateOrdered, dateRcvd, customerId_ }) => {
        return (await pool.query(`INSERT INTO salesOrder VALUES (DEFAULT, $1,$2,$3,$4,$5) RETURNING id`, [ itemId_, qty, dateOrdered, dateRcvd, customerId_])).rows[0].id
    }


    db.update = async (id, { itemId_, qty, dateOrdered, dateRcvd, customerId_ }) => {
        if (itemId_) {
            await pool.query(`UPDATE salesOrder SET itemId_ = $2 WHERE id = $1`, [id, itemId_])
        }
        if (qty) {
            await pool.query(`UPDATE salesOrder SET qty = $2 WHERE id = $1`, [id, qty])
        }
        if (dateOrdered) {
            await pool.query(`UPDATE salesOrder SET dateOrdered = $2 WHERE id = $1`, [id, dateOrdered])
        }
        if (dateRcvd) {
            await pool.query(`UPDATE salesOrder SET dateRcvd = $2 WHERE id = $1`, [id, dateRcvd])
        }
        if (customerId_) {
            await pool.query(`UPDATE salesOrder SET customerId_ = $2 WHERE id = $1`, [id, customerId_])
        }
    }
    db.delete = async (id) => {
        await pool.query(`DELETE FROM salesOrder WHERE id = $1`, [id])

    }

    db.read = async (id) => {
        let res;
        if (id) {
            res = await pool.query('SELECT * FROM salesOrder WHERE id = $1', [id])
        } else {
            res = await pool.query('SELECT * FROM salesOrder')
        }
        return res.rows;

    }
    return db;
}