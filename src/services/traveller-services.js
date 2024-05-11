const { Traveller } = require('../models');
const {hash, compare} = require("bcrypt");

class TravellerServices {

  async registerTraveller(data) {

    const traveller = await Traveller.findOne({ where: { email: data.email } }).then(traveller => {
        return traveller;
    }).catch(error => {
        return null;
    });

    if(traveller) {
      throw new Error('Traveller already exists!');
    }

    const hashedPassword = await hash(data.password, 10);

    return await Traveller.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      contact: data.contact,
    }).then(traveller => {
      return traveller;
    }).catch(error => {
      throw new Error(error.message);
    });

  }

  async loginTraveller(data) {
    try {
      const traveller = await Traveller.findOne({ where: { email: data.email } });

      if (!traveller) {
        throw new Error('Traveller not found!');
      }

      const passwordMatch = await compare(data.password, traveller.password);

      if (!passwordMatch) {
        throw new Error('Invalid password!');
      }

      return traveller.dataValues;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async sayHello() {
    return 'Hello Traveller!';
  }

  async getTraveller(id) {
    try{
        const traveller = Traveller.findOne({where: {id: id}});
        return traveller
    } catch (error) {
        throw new Error(error)
    }
  }

  
}

module.exports = new TravellerServices();