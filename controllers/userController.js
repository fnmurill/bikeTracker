const User = require('../models/Users');


//cuando se crea un nuevo usuario
exports.newUser = async(req, res, next) => {

    // Crear objeto de Usuario con datos de req.body
    const user = new User({
        name: req.body.name,
        idNumber: req.body.idNumber,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await user.save();
        res.json({ message: 'User added correctly' });
    } catch (error) {
        console.log(error);
        next();
    };
};

/**Ruta login */
exports.loginUser = (req, res) => {
    //comprobamos que el correo exista
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) res.json({ message: 'Login failed, user not found' })
            // Si el email existe, entonces comparará la contraseña
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) return res.status(400).json({
                message: 'Wrong Password'
            });
            res.status(200).send('Logged in successfully')
        });

    });

};

/** Obtiene todos los usuarios */

exports.getUsers = async(req, res, next) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    };
};

// /* Obtiene un Usuario en especifico por su idNumber*/
exports.getUser = async(req, res, next) => {
    try {
        const user = await User.findOne({ idNumber: req.params.idNumber }, req.body, {
            new: true
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    };
};

/** Actualizar un Usuario por su idNumber */
exports.updateUser = async(req, res, next) => {
    try {
        const user = await User.findOneAndUpdate({ idNumber: req.params.idNumber }, req.body, {
            new: true
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    };
};

/* Eliminar un usuario por su isNumber*/
exports.deleteUser = async(req, res, next) => {
    try {
        await User.findOneAndDelete({ idNumber: req.params.idNumber });
        res.json({ message: 'User deleted correctly' });
    } catch (error) {
        console.log(error);
        next();
    };
};