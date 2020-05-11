const jwt = require('jsonwebtoken');

/**
 * Verificar Token
 */

const checkToken = (req, res, next) => {

    let token = req.get('token'); //authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no Válido'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
};

/**
 * Verificar Role
 */

const checkAdminRole = (req, res, next) => {

    const user = req.user;

    if (user.role === 'ADMIN') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'Rol de usuario no válido'
            }
        });
    }

}


module.exports = {
    checkToken,
    checkAdminRole
}