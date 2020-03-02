import * as Yup from 'yup';
import { Op } from 'sequelize';
import Dp from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  // Listagem de encomenda baseada no ID
  async index(req, res) {
    const { page } = req.query;
    const Delivery_id = req.params.deliveryId;

    const deliveryProblems = await Dp.findAll({
      where: {
        delivery_id: Delivery_id,
      },
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

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const delivery_id = req.params.deliveryId;

    const delivery = await Delivery.findOne({
      id: delivery_id,
      start_date: {
        [Op.ne]: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery does not exist' });
    }

    const { description } = req.body;

    const problem = await Dp.create({
      delivery_id: delivery_id,
      description,
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemController();
