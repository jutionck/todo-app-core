const Config = require('../db/config');

module.exports = {
    // Generate user token
    generatedToken: (id) => {
        return id;
    },

    // Verify user token
    verifyToken: async (req, res, next) => {
        const token = req.headers['token'];
        try {
            if (token) {
                const result = await Config().db.query(`select *
                                                        from mst_user
                                                        where id = $1`, [token]);
                req.user = {id: result.rows[0].id};
                next()
            } else {
                return res.status(401).json({errorMsg: 'Not authorized, token failed!'})
            }
        } catch (e) {
            return res.status(401).json({errorMsg: 'Not authorized, token failed!'})
        }
    },
}

