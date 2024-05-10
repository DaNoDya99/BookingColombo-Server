const TravellerService = require('../services/traveller-services');

class TravellerController {

  async registerTraveller(req, res) {
    const data = req.body;
    try {
        const traveller = await TravellerService.registerTraveller(data);
        res.status(201).json({ status:'success', message: 'Traveller created successfully!', data: traveller });
    }catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async loginTraveller(req, res) {
    const data = req.body;
    try {
        const traveller = await TravellerService.loginTraveller(data);
        res.status(200).json({ status:'success', message: 'Traveller logged in successfully!', data: traveller });
    }catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async sayHello(req, res) {
    res.status(200).json({ message: await TravellerService.sayHello() });
  }

  async getTraveller(req, res) {
    try{
        const id = req.body.params;
        const traveller = TravellerService.getTraveller(id);
        return res.status(200).json({status: "success", message: "Traveller found", data: traveller});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
}

module.exports = new TravellerController();
