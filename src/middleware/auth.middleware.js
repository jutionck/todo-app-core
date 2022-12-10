const Config = require('../db/config');
const jwt = require('jsonwebtoken');

module.exports = {
    // Generate user token
    generatedToken: (id) => {
        return id;
    },

    // Verify user token
    verifyToken: async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                "message": "Unauthorized"
            })
        }
        const token = authHeader.replace('Bearer ', '');
        try {
            if (token) {
                // TODO jwt.verify(token, process.env.TOKEN_SECRET, '', null);
                const key = 'EN1GmaBoZZZ!';
                const jwtVerify = jwt.verify(token, key, '', null);
                const user = await Config().db.query(`select *
                                                      from mst_user
                                                      where id = $1`, [jwtVerify.id]);
                req.user = {id: user.rows[0].id}
                next()
            } else {
                return res.status(401).json({errorMsg: 'Not authorized, token failed!'})
            }
        } catch (e) {
            return res.status(401).json({errorMsg: 'Not authorized, token failed!'})
        }
    },
}

