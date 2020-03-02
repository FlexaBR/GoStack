import Dp from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveriesProblemsController {
  // Listagem de todas encomendas com problema
  async index(req, res) {
    const { page } = req.query;

    const deliveryProblems = await Dp.findAll({
      attributes: ['id', 'delivery_id', 'description', 'created_at'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['deliveryman_id', 'recipient_id', 'product'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveryProblems);
  }
}

export default new DeliveriesProblemsController();
