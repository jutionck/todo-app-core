const {v4: uuidv4} = require('uuid');

const TodoService = (db) => {
    const create = async (payload) => {
        const sql = `insert into trx_todo (id, name, user_id)
                     values ($1, $2, $3) returning *`;
        const result = await db.query(sql, [uuidv4(), payload.name, payload.id]);
        const todo = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            isCompleted: result.rows[0].is_completed,
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at,
        }
        return todo;
    }

    const list = async (userId) => {
        const sql = `select t.id, t.name, t.is_completed, t.created_at, t.updated_at
                     from trx_todo t
                              join mst_user u on u.id = t.user_id
                     where t.user_id = $1`;
        const result = await db.query(sql, [userId]);
        return result.rows.map((t) => {
            return {
                id: t.id,
                name: t.name,
                isCompleted: t.is_completed,
                createdAt: t.created_at,
                updatedAt: t.updated_at,
            }
        });
    }

    const get = async (id, userId) => {
        const sql = `select t.id, t.name, t.is_completed, t.created_at, t.updated_at
                     from trx_todo t
                              join mst_user u on u.id = t.user_id
                     where t.id = $1
                       and t.user_id = $2`;
        const result = await db.query(sql, [id, userId]);
        const todo = result.rows.map((t) => {
            return {
                id: t.id,
                name: t.name,
                isCompleted: t.is_completed,
                createdAt: t.created_at,
                updatedAt: t.updated_at,
            }
        })
        return todo[0];
    }

    const update = async (payload) => {
        const {id, name, isCompleted, userId} = payload;
        const sql = `update trx_todo
                     set name         = $1,
                         is_completed = $2,
                         updated_at   = $3
                     where id = $4
                       and user_id = $5 returning *`;
        const result = await db.query(sql, [name, isCompleted, new Date(), id, userId]);
        const todo = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            isCompleted: result.rows[0].is_completed,
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at,
        }
        return todo;
    }

    const remove = async (id, userId) => {
        const sql = `delete
                     from trx_todo
                     where id = $1
                       and user_id = $2`;
        await db.query(sql, [id, userId]);
    }

    return {create, list, get, update, remove}
}

module.exports = TodoService;