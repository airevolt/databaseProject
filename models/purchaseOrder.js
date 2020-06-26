module.exports = (pool) => {

    const db = {};

    db.create = async ({  itemId_, qty, dateOrdered, dateRcvd, manufacturer_ }) => {
        return (await pool.query(`INSERT INTO purchaseOrder VALUES (DEFAULT, $1,$2,$3,$4,$5) RETURNING id`, [ itemId_, qty, dateOrdered, dateRcvd, manufacturer_])).rows[0].id
    }


    db.update = async (id, { itemId_, qty, dateOrdered, dateRcvd, manufacturer_ }) => {
        if (itemId_) {
            await pool.query(`UPDATE purchaseOrder SET itemId_ = $2 WHERE id = $1`, [id, itemId_])
        }
        if (qty) {
            await pool.query(`UPDATE purchaseOrder SET qty = $2 WHERE id = $1`, [id, qty])
        }
        if (dateOrdered) {
            await pool.query(`UPDATE purchaseOrder SET dateOrdered = $2 WHERE id = $1`, [id, dateOrdered])
        }
        if (dateRcvd) {
            await pool.query(`UPDATE purchaseOrder SET dateRcvd = $2 WHERE id = $1`, [id, dateRcvd])
        }
        if (manufacturer_) {
            await pool.query(`UPDATE purchaseOrder SET manufacturer_ = $2 WHERE id = $1`, [id, manufacturer_])
        }
    }
    db.delete = async (id) => {
        await pool.query(`DELETE FROM purchaseOrder WHERE id = $1`, [id])

    }

    db.read = async (id) => {
        let res;
        if (id) {
            res = await pool.query('SELECT * FROM purchaseOrder WHERE id = $1', [id])
        } else {
            res = await pool.query('SELECT * FROM purchaseOrder')
        }
        return res.rows;

    }
    return db;
}