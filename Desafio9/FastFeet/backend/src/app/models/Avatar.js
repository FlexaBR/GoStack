import Sequelize, { Model } from 'sequelize';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        // Formatação p/ levar p/ front o link de acesso ao avatar
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/avatars/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Avatar;
