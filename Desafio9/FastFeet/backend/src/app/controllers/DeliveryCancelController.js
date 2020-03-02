import Dp from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import CanceledDeliveryMail from '../jobs/CanceledDeliveryMail';

class DeliveryCancelController {
  async delete(req, res) {
    const id_problem = req.params.id;

    // A partir do ID do problema, pode se cancelar a entrega da encomenda
    const problem = await Dp.findByPk(id_problem);

    if (!problem) {
      return res.status(400).json({ error: 'Does not exist this probem' });
    }

    // Encontra a encomenda com problema na entrega
    const delivery = await Delivery.findOne({
      where: { id: problem.delivery_id },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['nome'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    delivery.canceled_at = new Date();
    await delivery.save();

    await Queue.add(CanceledDeliveryMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new DeliveryCancelController();
