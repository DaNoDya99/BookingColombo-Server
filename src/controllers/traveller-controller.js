const TravellerService = require('../services/traveller-services');

class TravellerController {
  async sayHello(req, res) {
    res.status(200).json({ message: await TravellerService.sayHello() });
  }
}

module.exports = new TravellerController();
