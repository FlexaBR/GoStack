import Sequelize from 'sequelize';

// Importação de todos modelos
import User from '../app/models/User';
import Avatar from '../app/models/Avatar';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import Recipient from '../app/models/Recipient';
import Signature from '../app/models/Signature';
import DeliveryProblem from '../app/models/DeliveryProblem';

import databaseConfig from '../config/database';

const models = [
  User,
  Avatar,
  Delivery,
  Deliveryman,
  Recipient,
  Signature,
  DeliveryProblem,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
