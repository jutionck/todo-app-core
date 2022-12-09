const UserService = require('../service/user.service');
const Config = require('../db/config');

const UserController = () => {
    const userService = UserService(Config().db);
    const registerUser = async (req, res) => {
        const payload = req.body;
        const result = await userService.register(payload);
        if (typeof result === "string") {
            res.status(400).json({
                code: res.statusCode,
                msg: result
            });
            return;
        }
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success user create',
            data: result
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

    const loginUser = async (req, res) => {
        const { email, password } = req.body;
        const result = await userService.login({email, password});
        if (typeof result === "string") {
            res.status(400).json({
                code: res.statusCode,
                msg: result
            });
            return;
        }
        res.status(200).json({
            code: res.statusCode,
            msg: 'Success user login',
            data: result
        });
    }

    return { registerUser, list, get, loginUser }
}

module.exports = UserController;