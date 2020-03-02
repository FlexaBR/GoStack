import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveriesOpenedController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    if (!(await Deliveryman.findByPk(id))) {
      return res.status(400).json({ error: 'This Deliveryman does not exist' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
      limit: 20,
      page: (page - 1) * 20,
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['nome', 'rua', 'cidade'],
        },
      ],
    });
    return res.json(deliveries);
  }
}

export default new DeliveriesOpenedController();
