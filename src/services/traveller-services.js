class TravellerServices {
  async sayHello() {
    return 'Hello Traveller!';
  }
}

module.exports = new TravellerServices();