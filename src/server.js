const express = require('express');
const ApiUrl = require('./shared/api-url');
const UserController = require('./controller/user.controller');
const TodoController = require('./controller/todo.controller');
const Server = () => {
    const app = express();
    const port = 8888;
    app.use(express.json());

    const run = () => {
        app.post(ApiUrl.POST_USER_REGISTRATION, UserController().create);
        app.get(ApiUrl.GET_USER_LIST, UserController().list);
        app.get(ApiUrl.GET_USER_BY_ID, UserController().get);

        app.post(ApiUrl.POST_TODO, TodoController().create);
        app.get(ApiUrl.GET_TODO_LIST, TodoController().list);
        app.get(ApiUrl.GET_TODO_BY_ID, TodoController().get);
        app.put(ApiUrl.PUT_TODO, TodoController().update);
        app.delete(ApiUrl.DELETE_TODO, TodoController().remove);
    }

    app.listen(port, () => {
        console.log(`App is running on ${port}`)
    });

    return { run }
}

module.exports = Server;