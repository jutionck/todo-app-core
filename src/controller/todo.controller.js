const TodoService = require('../service/todo.service');
const Config = require('../db/config');

const TodoController = () => {
    const todoService = TodoService(Config().db);
    const create = async (req, res) => {
        const payload = req.body;
        const newTodo = await todoService.create(payload);
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo create',
            data: newTodo
        });
    }

    const list = async (req, res) => {
        const todos = await todoService.list();
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo list',
            data: todos
        });
    }

    const get = async (req, res) => {
        const {id} = req.params;
        const todo = await todoService.get(id);
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo get by id',
            data: todo
        });
    }

    const update = async (req, res) => {
        const payload = req.body;
        const todo = await todoService.update(payload);
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo update',
            data: todo
        });
    }

    const remove = async (req, res) => {
        const {id} = req.params;
        await todoService.remove(id);
        res.status(204).send();
    }

    return {create, list, get, update, remove}
}

module.exports = TodoController;