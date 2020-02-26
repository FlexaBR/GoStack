import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Signature from '../models/Signature';
import Deliveryman from '../models/Deliveryman';

class DeliveryCheckOutController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number()
        .integer()
        .required(),
      delivery_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validatios fails' });
    }

    const deliveryman_id = req.params.deliverymanId;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'This deliveryman does not exist' });
    }

    const { signature_id, delivery_id } = req.body;

    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
        start_date: {
          [Op.ne]: null,
        },
      },
    });

    if (!delivery) {
      return res.status(401).json({ error: 'Does not your deliveries' });
    }

    if (!(await Signature.findByPk(signature_id))) {
      return res.status(400).json({ error: 'This signature does not exist' });
    }

    await delivery.update({
      signature_id,
      end_date: new Date(),
    });

    return res.json(delivery);
  }
}

export default new DeliveryCheckOutController();
