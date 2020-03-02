import Mail from '../../lib/Mail';

class CanceledDeliveryMail {
  get key() {
    return 'CanceledDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Cancelamento de Encomenda',
      template: 'canceledDelivery',
      context: {
        id: delivery.id,
        deliveryman: delivery.deliveryman.name,
        recipient: delivery.recipient.nome,
      },
    });
  }
}

export default new CanceledDeliveryMail();
