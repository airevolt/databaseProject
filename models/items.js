module.exports = (pool) => {

    const db = {};

    db.create = async ({ itemName, description }) => {
        return (await pool.query(`INSERT INTO items VALUES (DEFAULT, $1,$2) RETURNING id`, [itemName, description])).rows[0].id
    }


    db.update = async (id, { itemName, description }) => {
        if (itemName) {
            await pool.query(`UPDATE items SET itemName = $2 WHERE id = $1`, [id, itemName])
        }
        if (description) {
            await pool.query(`UPDATE items SET description = $2 WHERE id = $1`, [id, description])
        }
    }
    db.delete = async (id) => {
        await pool.query(`DELETE FROM items WHERE id = $1`, [id])

    }

    db.read = async (id) => {
        let res;
        if (id) {
            res = await pool.query('SELECT * FROM items WHERE id = $1', [id])
        } else {
            res = await pool.query('SELECT * FROM items')
        }
        return res.rows;

    }
    return db;
}