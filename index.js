const express = require('express')
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

// TODO membuat service registration -> id, email, password
const users = [];
app.post(ApiUrl.POST_USER_REGISTRATION, (req, res) => {
    const {email, password} = req.body;
    const user = {
        id: users.length + 1,
        email: email,
        password: password
    }
    users.push(user);
    res.status(201).json({
        code: res.statusCode,
        msg: 'Registration Success',
        data: {
            id: user.id,
            email: user.email
        }
    });
});

app.get(ApiUrl.GET_USER_LIST, (req, res) => {
    const result = users.map((u) => {
        return {
            id: u.id,
            email: u.email
        }
    });
    res.status(200).json({
        code: res.statusCode,
        msg: 'User List',
        data: result
    });
});

app.get(ApiUrl.GET_USER_BY_ID, (req, res) => {
    const {id} = req.params;
    const user = users.find((u) => {
        return u.id === +id
    });
    res.status(200).json({
        code: res.statusCode,
        msg: 'User',
        data: {
            id: user.id,
            email: user.email
        }
    });
});

// app.post(ApiUrl.POST_USER_LOGIN, (req, res) => {
//     const {email, password} = req.body;
//     const findUserByEmailPassword = users.find((u) => {
//         if (u.email === email && u.password === password) {
//             return u;
//         }
//     });
//
//     if (!findUserByEmailPassword) {
//         res.status(400).json({
//             code: res.statusCode,
//             msg: 'User Login',
//             data: `Username atau Password salah!`
//         })
//     } else {
//         console.log(req.user)
//         res.status(201).json({
//             code: res.statusCode,
//             msg: 'User Login',
//             data: {
//                 id: findUserByEmailPassword.id,
//             }
//         });
//     }
// });

// TODO membuat service todo -> id, name, isCompleted
const todos = [];
app.post(ApiUrl.POST_TODO, (req, res) => {
    const { name } = req.body;
    const newTodo = {
        id: todos.length + 1,
        name: name,
        isCompleted: false
    }
    todos.push(newTodo);
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success create todo',
        data: newTodo
    });
});

app.get(ApiUrl.GET_TODO_LIST, (req, res) => {
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success get all todo',
        data: todos
    });
});

app.get(ApiUrl.GET_TODO_BY_ID, (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === +id);
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success get todo',
        data: todo
    });
});

app.put(ApiUrl.PUT_TODO, (req, res) => {
    const { id, name, isCompleted } = req.body;
    todos.map((t) => {
        if (t.id === +id) {
            t.id = id;
            t.name = name;
            t.isCompleted = isCompleted
        }
        return t;
    });
    res.status(200).json({
        code: res.statusCode,
        msg: 'Success update todo',
        data: {
            id: id,
            name: name,
            isCompleted: isCompleted
        }
    });
});

app.delete(ApiUrl.DELETE_TODO, (req, res) => {
    const { id } = req.params;
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].id === +id) {
            todos.splice(index, 1);
        }
    }
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`App is running on ${port}`)
});