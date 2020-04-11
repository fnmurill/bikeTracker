const User = require('../models/Users');


//cuando se crea un nuevo usuario
exports.newUser = async(req, res, next) => {

    // Crear objeto de Usuario con datos de req.body
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await user.save();
        res.json({ message: 'User added correctly' });
    } catch (error) {
        console.log(error);
        next();
    }
}

/**Ruta login */

// exports.loginUser = async(req,res,next) =>{
//     try {
//         const user = await User.findOne({ email: req.params.email }, req.body);
//         res.json(user);
//     } catch (error) {
//         console.log(error, 'Logged');
//         next();
//     };
// }
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
    };
};

/* Eliminar un usuario por su ID*/
exports.deleteUser = async(req, res, next) => {
    try {
        await User.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'User deleted correctly' });
    } catch (error) {
        console.log(error);
        next();
    }
}