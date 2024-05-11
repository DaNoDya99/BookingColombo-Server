const adminServices = require('../services/admin-services');

class AdminController {
    async login(req, res){
        try {
            const data = req.body;
            console.log(data);
            const admin = await adminServices.login(data);

            return res.status(200).json({status: "success", message: "Admin logged in successfully", data: admin});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AdminController();