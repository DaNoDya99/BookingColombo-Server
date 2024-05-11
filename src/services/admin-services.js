const {Admin} = require('../models');
const {compare} = require("bcrypt");

class AdminServices{
    async login(data){
        try {
            const admin = await Admin.findOne({where: {email: data.email}});
            if(!admin){
                throw new Error("Admin not found");
            }
            const passwordMatch = await compare(data.password, admin.password);
            if(!passwordMatch){
                throw new Error("Invalid password");
            }
            return admin;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new AdminServices();