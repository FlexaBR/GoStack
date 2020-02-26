import * as Yup from 'yup';
import { Op } from 'sequelize'; // Operadores do sequelize
import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  isAfter,
  isBefore,
} from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class DeliveryCheckInController {
  async update(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validatios fails' });
    }

    const deliveryman_id = req.params.deliverymanId;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'This deliveryman does not exist' });
    }

    const { delivery_id } = req.body;
    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
        start_date: null,
      },
    });

    // Verificando se a encomenda é realmente do entregrador
    if (!delivery) {
      return res.status(401).json({ error: 'Does not your deliveries' });
    }

    // Verificando o limite de retirada de encomenda, máximo 5 por dia p/ entregador
    const dateNow = new Date();

    const checkInDelivery = await Delivery.findAll({
      where: {
        deliveryman_id,
        start_date: {
          // operador between do sequelize para pegar agendamentos entre o começo e final do dia
          [Op.between]: [startOfDay(dateNow), endOfDay(dateNow)],
        },
      },
    });

    if (checkInDelivery.length > 4) {
      return res
        .status(401)
        .json({ error: 'Your checkins deliveries already over today' });
    }

    // Verificando o horário de retirada, entre 08:00 as 18:00h
    const startHour = setSeconds(setMinutes(setHours(dateNow, 8), 0), 0);
    const endHour = setSeconds(setMinutes(setHours(dateNow, 20), 0), 0);

    if (!(isBefore(dateNow, endHour) && isAfter(dateNow, startHour))) {
      return res
        .status(401)
        .json({ error: 'Is not permitted get a delivery this time' });
    }

    await delivery.update({
      start_date: new Date(),
    });

    return res.json(delivery);
  }
}

export default new DeliveryCheckInController();
