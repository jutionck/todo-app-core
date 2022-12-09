const {v4: uuidv4} = require('uuid');

const TodoService = (db) => {
    const create = async (payload) => {
        const {name} = payload;
        const sql = `insert into trx_todo (id, name)
                     values ($1, $2) returning *`;
        const result = await db.query(sql, [uuidv4(), name]);
        const todo = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            isCompleted: result.rows[0].is_completed,
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at,
        }
        return todo;
    }

    const list = async () => {
        const sql = `select id, name, is_completed, created_at, updated_at
                     from trx_todo`;
        const result = await db.query(sql);
        const todos = result.rows.map((t) => {
            return {
                id: t.id,
                name: t.name,
                isCompleted: t.is_completed,
                createdAt: t.created_at,
                updatedAt: t.updated_at,
            }
        });
        return todos;
    }

    const get = async (id) => {
        const sql = `select id, name, is_completed, created_at, updated_at
                     from trx_todo
                     where id = $1`;
        const result = await db.query(sql, [id]);
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
        const {id, name, isCompleted} = payload;
        const sql = `update trx_todo
                     set name         = $1,
                         is_completed = $2,
                         updated_at   = $3
                     where id = $4 returning *`;
        const result = await db.query(sql, [name, isCompleted, new Date(), id]);
        const todo = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            isCompleted: result.rows[0].is_completed,
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at,
        }
        return todo;
    }

    const remove = async (id) => {
        const sql = `delete
                     from trx_todo
                     where id = $1`;
        await db.query(sql, [id]);
    }

    return {create, list, get, update, remove}
}

module.exports = TodoService;