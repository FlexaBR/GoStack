import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers)
  }
}

export default new ProviderController();

// tras todos usuarios
// const providers = await User.findAll({

// tras todos providers com todas informações
// const providers = await User.findAll({
//  where: { provider: true },

// tras todos providers somente com id, name, email e avatar_id
// const providers = await User.findAll({
//  where: { provider: true },
//  attributes: ['id', 'name', 'email', 'avatar_id']

// tras todos providers somente com id, name, email, avatar_id e o relacionamento com o File
// trazendo assim, as informações do File também
// const providers = await User.findAll({
//  where: { provider: true },
//  attributes: ['id', 'name', 'email', 'avatar_id']
//  include: [File],
