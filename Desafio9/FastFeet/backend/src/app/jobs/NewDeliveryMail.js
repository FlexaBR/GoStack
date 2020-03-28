import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { recipient, deliveryman, delivery } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Você tem uma nova entrega para realizar',
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        nome: recipient.nome,
        rua: recipient.rua,
        cidade: recipient.cidade,
        estado: recipient.estado,
        cep: recipient.cep,
      },
    });
  }
}

export default new NewDeliveryMail();
