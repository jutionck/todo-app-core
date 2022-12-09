const {v4: uuidv4} = require('uuid');
const {generatedToken} = require('../middleware/auth.middleware');

const UserService = (db) => {
    const register = async (payload) => {
        const {email, password} = payload;
        const queryEmail = `select email
                            from mst_user
                            where email = $1`;
        const isEmailExist = await db.query(queryEmail, [email]);
        if (isEmailExist.rowCount > 0) {
            return `User with email ${email} already exist!`;
        }
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

    const login = async (payload) => {
        const {email} = payload;
        const sql = `select id, email
                     from mst_user
                     where email = $1`;
        const result = await db.query(sql, [email]);
        if (result.rowCount === 0) {
            return `Email or password not correct!`;
        }
        const token = generatedToken(result.rows[0].id);
        return {
            id: result.rows[0].id,
            email: result.rows[0].email,
            token: token,
        };
    }

    return {register, list, get, login}
}

module.exports = UserService;