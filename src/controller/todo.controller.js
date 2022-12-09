const TodoService = require('../service/todo.service');
const Config = require('../db/config');

const TodoController = () => {
    const todoService = TodoService(Config().db);
    const create = async (req, res) => {
        const {name} = req.body;
        const {id} = req.user
        const newTodo = await todoService.create({name, id});
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo create',
            data: newTodo
        });
    }

    const list = async (req, res) => {
        const {id} = req.user;
        const todos = await todoService.list(id);
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo list',
            data: todos
        });
    }

    const get = async (req, res) => {
        const {id} = req.params;
        const userId = req.user.id;
        const todo = await todoService.get(id, userId);
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo get by id',
            data: todo
        });
    }

    const update = async (req, res) => {
        const {id, name, isCompleted} = req.body;
        const userId = req.user.id;
        const todo = await todoService.update({id, name, isCompleted, userId});
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success todo update',
            data: todo
        });
    }

    const remove = async (req, res) => {
        const {id} = req.params;
        const userId = req.user.id;
        await todoService.remove(id, userId);
        res.status(204).send();
    }

    return {create, list, get, update, remove}
}

module.exports = TodoController;