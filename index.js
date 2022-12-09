const express = require('express');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 8888;
app.use(express.json());

const ApiUrl = {
    POST_USER_REGISTRATION: '/users/registration',
    POST_USER_LOGIN: '/users/login',
    GET_USER_LIST: '/users',
    GET_USER_BY_ID: '/users/:id',
    POST_TODO: '/todos',
    PUT_TODO: '/todos',
    GET_TODO_LIST: '/todos',
    GET_TODO_BY_ID: '/todos/:id',
    DELETE_TODO: '/todos/:id'
}

// TODO membuat koneksi ke database
const config = {
    dbHost: 'localhost',
    dbPort: 5432,
    dbUser: 'jutioncandrakirana',
    dbPassword: '',
    dbName: 'todo_app',
    dbDriver: 'postgresql'
}

// Menggunakan koneksi string
const connectionString = `${config.dbDriver}://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const db = new Pool({ connectionString });

// uuid
const generateId = () => {
    return uuidv4();
}

// TODO membuat user service
app.post(ApiUrl.POST_USER_REGISTRATION, async (req, res) => {
    const { email, password } = req.body;
    const sql = `insert into mst_user (id, email, password) values ($1, $2, $3) returning *`;
    const result = await db.query(sql, [generateId(), email, password]);
    const user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at,
    }
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success user create',
        data: user
    });
});

app.get(ApiUrl.GET_USER_LIST, async (req, res) => {
    const sql = `select id, email, created_at, updated_at from mst_user`;
    const result = await db.query(sql);
    const users = result.rows.map((u) => {
        return {
            id: u.id,
            email: u.email,
            createdAt: u.created_at,
            updatedAt: u.updated_at,
        }
    });
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success user list',
        data: users
    });
});

app.get(ApiUrl.GET_USER_BY_ID, async (req, res) => {
    const { id } = req.params;
    const sql = `select id, email, created_at, updated_at from mst_user where id = $1`;
    const result = await db.query(sql, [id]);
    const user = result.rows.map((u) => {
        return {
            id: u.id,
            email: u.email,
            createdAt: u.created_at,
            updatedAt: u.updated_at,
        }
    });
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success user get by id',
        data: user[0]
    });
});

// TODO membuat todo service
app.post(ApiUrl.POST_TODO, async (req, res) => {
    const { name } = req.body;
    const sql = `insert into trx_todo (id, name) values ($1, $2) returning *`;
    const result = await db.query(sql, [generateId(), name]);
    const todo = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        isCompleted: result.rows[0].is_completed,
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at,
    }
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success todo create',
        data: todo
    });
});

app.get(ApiUrl.GET_TODO_LIST, async (req, res) => {
    const sql = `select id, name, is_completed, created_at, updated_at from trx_todo`;
    const result = await db.query(sql);
    const todos = result.rows.map((t) => {
        return {
            id: t.id,
            name: t.name,
            isCompleted: t.is_completed,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
        }
    })
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success todo list',
        data: todos
    });
});

app.get(ApiUrl.GET_TODO_BY_ID, async (req, res) => {
    const { id } = req.params;
    const sql = `select id, name, is_completed, created_at, updated_at from trx_todo where id = $1`;
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
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success todo get by id',
        data: todo[0]
    });
});

app.put(ApiUrl.PUT_TODO, async (req, res) => {
    const { id, name, isCompleted } = req.body;
    const sql = `update trx_todo set name = $1, is_completed = $2, updated_at = $3 where id = $4 returning *`;
    const result = await db.query(sql, [name, isCompleted, new Date(), id]);
    const todo = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        isCompleted: result.rows[0].is_completed,
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at,
    }
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success todo update',
        data: todo
    });
});

app.delete(ApiUrl.DELETE_TODO, async (req, res) => {
    const { id } = req.params;
    const sql = `delete from trx_todo where id = $1`;
    await db.query(sql, [id]);
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`App is running on ${port}`)
});