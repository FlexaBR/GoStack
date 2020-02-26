import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveriesClosedController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    if (!(await Deliveryman.findByPk(id))) {
      return res.status(400).json({ error: 'This Deliveryman does not exist' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['nome', 'rua', 'cidade'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveries);
  }
}

export default new DeliveriesClosedController();
