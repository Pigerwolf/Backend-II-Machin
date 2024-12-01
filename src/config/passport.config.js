const  passport = require ("passport");
const local = require ("passport-local"); 
const  UserModel = require ("../model/users.model.js");
const { createHash, isValidPassword } = require ("../utils/util.js");

const LocalStrategy = local.Strategy; 

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true, 

        usernameField: "email"

    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body; 

        try {

            let user = await UserModel.findOne({email: email}); 
            if(user) return done(null, false); 

            //Si no existe, voy a crear un registro nuevo: 

            let nuevoUser = {
                first_name, 
                last_name, 
                email,
                age, 
                password: createHash(password)
            }

            let result = await UserModel.create(nuevoUser); 

            return done(null, result); 
        } catch (error) {
            return done(error); 
        }
    }))


    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {

            const user = await UserModel.findOne({email}); 
            if(!user) {
                return done(null, false);
            }
            //Si existe Usuario se valida la contraseña
            if(!isValidPassword(password, user)) return done(null, false); 

            return done(null, user); 
        } catch (error) {
            
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id); 
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id:id});
        done(null, user);
    })
}

module.exports = { initializePassport };