const UserService = require('../service/user.service');
const Config = require('../db/config');

const UserController = () => {
    const userService = UserService(Config().db);
    const create = async (req, res) => {
        const payload = req.body;
        const newUser = await userService.create(payload);
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success user create',
            data: newUser
        });
    }

    const list = async (req, res) => {
        const users = await userService.list();
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success user list',
            data: users
        });
    }

    const get = async (req, res) => {
        const { id } = req.params;
        const user = await userService.get(id);
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success user get by id',
            data: user
        });
    }

    return { create, list, get }
}

module.exports = UserController;