import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page } = req.query;
    const recipientQuery = `%${req.query.q}%`;

    const recipients = await Recipient.findAll({
      where: {
        nome: {
          [Op.iLike]: recipientQuery,
        },
      },
      attributes: [
        'id',
        'nome',
        'rua',
        'numero',
        'complemento',
        'cidade',
        'estado',
        'cep',
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().integer(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    // Verificando se já possui 'nome' cadastrado
    const { nome } = req.body;
    const recipient = await Recipient.findOne({
      where: { nome },
    });

    if (recipient) {
      return res
        .status(400)
        .json({ error: 'The name of recipient already has registration' });
    }

    const {
      id,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    } = await Recipient.create(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const schema = Yup.object().shape({
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      cidade: Yup.string(),
      estate: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const {
      nome,
      rua,
      numero,
      complemento,
      cidade,
      estate,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      cidade,
      estate,
      cep,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    await recipient.destroy();

    return res.json();
  }
}

export default new RecipientController();
