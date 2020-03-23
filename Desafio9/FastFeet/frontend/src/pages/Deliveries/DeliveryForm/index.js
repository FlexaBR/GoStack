/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Title from '~/components/Title';

import { Wrapper, Header, Container } from './styles';

const schema = Yup.object().shape({
  recipient: Yup.string().required('O nome do destinatário é obrigatório'),
  deliveryMan: Yup.string().required('O nome do entregador é obrigatório'),
  product: Yup.string().required('O nome do produto é obrigatório'),
});

export default function FormPage({ match }) {
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [deliveryman, setDeliveryman] = useState('');
  const [deliverymanId, setDeliverymanId] = useState('');
  const [delivery, setDelivery] = useState('');
  const [product, setProduct] = useState('');
  const [textHeader, setTextHeader] = useState('Cadastro de encomendas');

  useEffect(() => {
    async function loadDelivery(id) {
      try {
        const response = await api.get('deliveries', {
          params: { id },
        });

        setDelivery(response.data);
        setRecipient(response.data.recipient.nome);
        setRecipientId(response.data.recipient.id);

        setDeliveryman(response.data.deliveryman.name);
        setDeliverymanId(response.data.deliveryman.id);

        setProduct(response.data.product);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    if (match.params.id) {
      setTextHeader('Edição de encomendas');
      loadDelivery(match.params.id);
    }
  }, [match.params, delivery, product, recipient, deliveryman]);

  async function loadRecipients() {
    const response = await api.get('recipients', {
      params: {},
    });
    setRecipients(response.data);
  }

  async function loadDeliveryman() {
    const response = await api.get('deliverymans', {
      params: {},
    });
    setDeliverymans(response.data);
  }

  // eslint-disable-next-line no-shadow
  async function handleSubmit() {
    const data = {
      recipient_id: recipientId,
      deliveryman_id: deliverymanId,
      product,
    };

    if (match.params.id) {
      await api.put(`deliveries/${match.params.id}`, data);

      toast.success('A edição foi feita com sucesso');
    } else {
      await api.post('deliveries', data);
      history.push('/deliveries');
    }
  }

  return (
    <Wrapper>
      <Form
        noValidate
        autoComplete="off"
        schema={schema}
        onSubmit={handleSubmit}
        initialData={delivery}
      >
        <Header>
          <Title title={textHeader} />

          <div>
            <Link to="/deliveries">
              <div>
                <div className="icon">
                  <MdChevronLeft size={20} color="#FFFFFF" />
                </div>
                Voltar
              </div>
            </Link>

            <button type="submit">
              <div>
                <div className="icon">
                  <MdCheck size={20} color="#FFFFFF" />
                </div>
                Salvar
              </div>
            </button>
          </div>
        </Header>
        <Container>
          <div className="two">
            <div className="two-one">
              <label htmlFor="recipient">Destinatário</label>
              <Input
                name="recipient"
                id="recipient"
                value={recipient}
                placeholder="Ludwig van Beethoven"
                onClick={() => {
                  loadRecipients();
                }}
                onChange={v => {
                  setRecipient(v.target.value);
                }}
              />
              {recipients.length > 0 && (
                <ul>
                  {recipients.map(item => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setRecipient(item.nome);
                          setRecipientId(item.id);
                          setRecipients([]);
                        }}
                      >
                        {item.nome}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="two-two">
              <label htmlFor="deliveryMan">Entregador</label>
              <Input
                name="deliveryMan"
                id="deliveryMan"
                value={deliveryman}
                placeholder="John Doe"
                onClick={() => {
                  loadDeliveryman();
                }}
                onChange={v => {
                  setDeliveryman(v.target.value);
                }}
              />

              {deliverymans.length > 0 && (
                <ul>
                  {deliverymans.map(item => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setDeliveryman(item.name);
                          setDeliverymanId(item.id);
                          setDeliverymans([]);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="one">
            <label htmlFor="product">Nome do produto</label>
            <Input
              name="product"
              id="product"
              value={product}
              onChange={v => {
                setProduct(v.target.value);
              }}
              placeholder="Yamaha SX7"
            />
          </div>
        </Container>
      </Form>
    </Wrapper>
  );
}

FormPage.propTypes = {
  match: PropTypes.shape().isRequired,
};
