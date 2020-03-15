import * as Yup from 'yup';
import { Op } from 'sequelize';

import Avatar from '../models/Avatar';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const { id, page, q } = req.query;

    if (id) {
      const deliverymanExists = await Deliveryman.findByPk(id);

      if (!deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman not found.' });
      }

      return res.json(deliverymanExists);
    }

    if (page) {
      const limit = 5;

      const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

      const deliverymansCount = await Deliveryman.count({ where });

      const lastPage = page * limit >= deliverymansCount;

      const deliverymans = await Deliveryman.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        attributes: ['id', 'name', 'email', 'avatar_id'],
        include: [
          {
            model: Avatar,
            as: 'avatar',
            // Precisa passar o path p/ printar a url
            attributes: ['path', 'url'],
          },
        ],
        order: [['created_at', 'ASC']],
      });

      return res.json({ lastPage, content: deliverymans });
    }

    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email } = req.body;

    const deliverymanExist = await Deliveryman.findOne({
      where: { email },
    });

    if (deliverymanExist) {
      return res.status(400).json({ error: 'Email already has registration' });
    }

    const { id, avatar_id, name } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email } = req.body;
    // Se o email for alterado, verificar se já existe no sistema
    if (email) {
      const emailExist = await Deliveryman.findOne({ where: { email } });

      if (emailExist) {
        return res
          .status(400)
          .json({ error: 'This email already has registration' });
      }
    }

    const { id, name, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    await deliveryman.destroy();

    return res.json();
  }
}

export default new DeliverymanController();
