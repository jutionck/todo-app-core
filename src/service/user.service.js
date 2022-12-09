const {v4: uuidv4} = require('uuid');

const UserService = (db) => {
    const create = async (payload) => {
        const {email, password} = payload;
        const sql = `insert into mst_user (id, email, password)
                     values ($1, $2, $3) returning *`;
        const result = await db.query(sql, [uuidv4(), email, password]);
        const user = {
            id: result.rows[0].id,
            email: result.rows[0].email,
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at,
        }
        return user;
    }

    const list = async () => {
        const sql = `select id, email, created_at, updated_at
                     from mst_user`;
        const result = await db.query(sql);
        return result.rows.map((u) => {
            return {
                id: u.id,
                email: u.email,
                createdAt: u.created_at,
                updatedAt: u.updated_at,
            }
        });
    }

    const get = async (id) => {
        const sql = `select id, email, created_at, updated_at
                     from mst_user
                     where id = $1`;
        const result = await db.query(sql, [id]);
        const user = result.rows.map((u) => {
            return {
                id: u.id,
                email: u.email,
                createdAt: u.created_at,
                updatedAt: u.updated_at,
            }
        });
        return user[0];
    }

    return {create, list, get}
}

module.exports = UserService;