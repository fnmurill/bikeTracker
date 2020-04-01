const User = require('../models/Users');


//cuando se crea un nuevo usuario
exports.newUser = async(req, res, next) => {

    // Crear objeto de Usuario con datos de req.body
    const user = new User(req.body);

    try {
        await user.save();
        res.json({ message: 'User added correctly' });
    } catch (error) {
        console.log(error);
        next();
    }

}