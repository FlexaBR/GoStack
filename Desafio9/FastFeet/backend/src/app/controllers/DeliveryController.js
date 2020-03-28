import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Signature from '../models/Signature';

import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/NewDeliveryMail';

class DeliveryController {
  async index(req, res) {
    const { id, page, q } = req.query;

    if (id) {
      const deliveryExists = await Delivery.findOne({
        where: {
          id,
        },
        attributes: [
          'id',
          'product',
          'canceled_at',
          'start_date',
          'end_date',
          'recipient_id',
          'signature_id',
          'deliveryman_id',
        ],
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'nome',
              'rua',
              'numero',
              'complemento',
              'cidade',
              'estado',
              'cep',
            ],
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
          {
            model: Signature,
            as: 'signature',
            attributes: ['path', 'url'],
          },
        ],
      });

      if (!deliveryExists) {
        return res.status(400).json({ error: 'Delivery not found.' });
      }

      return res.json(deliveryExists);
    }

    if (page) {
      const limit = 6;

      const where = q ? { product: { [Op.iLike]: `%${q}%` } } : {};

      const deliveriesCount = await Delivery.count({ where });

      const lastPage = page * limit >= deliveriesCount;

      const deliveries = await Delivery.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        attributes: [
          'id',
          'product',
          'canceled_at',
          'start_date',
          'end_date',
          'recipient_id',
          'signature_id',
          'deliveryman_id',
        ],
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'nome',
              'rua',
              'numero',
              'complemento',
              'cidade',
              'estado',
              'cep',
            ],
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
          {
            model: Signature,
            as: 'signature',
            attributes: ['path', 'url'],
          },
        ],
        order: [['created_at', 'ASC']],
      });

      return res.json({ lastPage, content: deliveries });
    }

    const deliveries = await Delivery.findAll();

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    // Verifica se o destinatário e entregador existem
    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(NewDeliveryMail.key, {
      recipient,
      deliveryman,
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'This delivery does not exist' });
    }

    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number().integer(),
      deliveryman_id: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    // Verifica se o destinatário e entregador existem
    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const { id, product } = await delivery.update(req.body);

    return res.json({
      id,
      product,
      deliveryman_id,
      recipient_id,
    });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery does not exist' });
    }

    await delivery.destroy();

    return res.json();
  }
}

export default new DeliveryController();
