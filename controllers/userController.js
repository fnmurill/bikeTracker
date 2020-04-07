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

/** Obtiene todos los usuarios */

exports.getUsers = async(req, res, next) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    }
}

/* Obtiene un Usuario en especifico por su ID*/
exports.getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    }
}

/** Actualizar un Usuario por su ID */
exports.updateUser = async(req, res, next) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    }
}


/* Eliminar un paciente por su ID*/
exports.deleteUser = async(req, res, next) => {
    try {
        await User.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'User deleted correctly' });
    } catch (error) {
        console.log(error);
        next();
    }
}