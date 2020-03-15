/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';
import { GiPlainCircle } from 'react-icons/gi';
import { parseISO, format } from 'date-fns';

import history from '~/services/history';

import Title from '~/components/Title';
import Search from '~/components/Search';
import Button from '~/components/btnRegister';

import api from '~/services/api';

import {
  Wrapper,
  Header,
  Table,
  THead,
  TBody,
  Initials,
  Status,
  Menu,
  Modal,
  Info,
  Alert,
} from './styles';

export default function List() {
  const [deliveries, setDeliveries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [recipient, setRecipient] = useState({});
  const [datesRecipient, setDatesRecipient] = useState({});
  const [imageSignature, setImageSignature] = useState('');
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadDeliveries(1);
  }, []);

  async function loadDeliveries(currentPage) {
    const response = await api.get('deliveries', {
      params: { q: productName, page: currentPage },
    });

    const data = response.data.map(item => {
      let statusText = '';
      let canceled = false;
      let delivered = false;
      let pending = false;
      let withdrawal = false;

      const initials = item.deliveryman.name
        .split(' ')
        .map(n => n[0])
        .join('');

      if (item.canceled_at) {
        statusText = 'CANCELADA';
        canceled = true;
      } else if (item.start_date && !item.end_date) {
        statusText = 'RETIRADA';
        withdrawal = true;
      } else if (item.end_date) {
        statusText = 'ENTREGUE';
        delivered = true;
      } else {
        statusText = 'PENDENTE';
        pending = true;
      }

      item.start_date = item.start_date
        ? format(parseISO(item.start_date), 'dd/MM/yyyy')
        : null;
      item.end_date = item.end_date
        ? format(parseISO(item.end_date), 'dd/MM/yyyy')
        : null;

      return {
        ...item,
        showMenu: false,
        initials,
        statusText,
        canceled,
        withdrawal,
        delivered,
        pending,
      };
    });

    setDeliveries(data);
  }

  useEffect(() => {
    window.onclick = ({ target }) => {
      if (showModal && target.id === 'modal') {
        setShowModal(false);
      }
    };
  }, [showModal]);

  function handleMenu(id) {
    const newBbj = deliveries.map(item => {
      if (item.id === id) {
        item.showMenu = !item.showMenu;
      } else {
        item.showMenu = false;
      }
      return item;
    });

    setDeliveries(newBbj);
  }

  function handlePreview(info) {
    setDeliveries(
      deliveries.map(item => {
        item.showMenu = false;
        return item;
      })
    );
    setShowModal(!showModal);
    setRecipient(info.recipient);
    setDatesRecipient({ start: info.start_date, end: info.end_date });
    setImageSignature(info.signature ? info.signature.url : '');
  }

  function handleAlertDelete({ product, id }) {
    setDeliveries(
      deliveries.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setProductName(product);
    setProductId(id);
    setShowAlert(true);
  }

  async function handleDelete(id) {
    await api.delete(`deliveries/${id}`);
    const index = deliveries.findIndex(item => item.id === id);
    const newDeliveries = deliveries;
    newDeliveries.splice(index, 1);
    setDeliveries(newDeliveries);
    setShowAlert(false);
    toast.success(`O produto ${productName} foi excluido com sucesso!`);
  }

  async function handleSearch(text) {
    if (text.length >= 3) {
      const param = { q: text };
      loadDeliveries(param);
    } else {
      loadDeliveries();
    }
  }

  return (
    <Wrapper>
      <Title title="Gerenciando encomendas" />

      <Header>
        <Search titleSearch="encomedas" fn={handleSearch} />
        <Button url="cadastrar" />
      </Header>
      {deliveries.length > 0 && (
        <Table>
          <THead>
            <li>ID</li>
            <li>Destinatário</li>
            <li>Entregador</li>
            <li>Cidade</li>
            <li>Estado</li>
            <li>Status</li>
            <li>Ações</li>
          </THead>
          <TBody>
            {deliveries.map(item => (
              <ul key={item.id}>
                <li>#{item.id}</li>
                <li>{item.recipient.name}</li>
                <li>
                  <Initials
                    canceled={item.canceled}
                    delivered={item.delivered}
                    pending={!item.pending}
                  >
                    {item.initials}
                  </Initials>
                  <span>{item.deliveryman.name}</span>
                </li>
                <li>{item.recipient.city}</li>
                <li>{item.recipient.state}</li>
                <li>
                  <Status
                    canceled={item.canceled}
                    delivered={item.delivered}
                    pending={!item.pending}
                  >
                    <span>{item.statusText}</span>
                  </Status>
                </li>
                <li>
                  <div
                    className="actions"
                    onClick={() => handleMenu(item.id)}
                    onKeyPress={handleMenu(item.id)}
                  >
                    <GiPlainCircle size={5} color="#666666" />
                    <GiPlainCircle size={5} color="#666666" />
                    <GiPlainCircle size={5} color="#666666" />
                  </div>

                  <Menu showMenu={item.showMenu}>
                    <button type="button" onClick={() => handlePreview(item)}>
                      <MdRemoveRedEye size={15} color="#8E5BE8" /> Visualizar
                    </button>
                    <button
                      type="button"
                      onClick={() => history.push(`editar/${item.id}`)}
                    >
                      <MdEdit size={15} color="#4D85EE" /> Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAlertDelete(item)}
                    >
                      <MdDeleteForever size={15} color="#DE3B3B" /> Excluir
                    </button>
                  </Menu>
                </li>
              </ul>
            ))}
          </TBody>
        </Table>
      )}

      {deliveries.length === 0 && (
        <Info>Nenhuma encomenda cadastrada no momento!</Info>
      )}

      <Alert showAlert={showAlert}>
        <div>
          <div className="title">
            <h3>
              Tem certeza que deseja excluir o produto{' '}
              <span>{productName}</span>?
            </h3>
          </div>
          <div className="actions">
            <button
              type="button"
              className="accept"
              onClick={() => handleDelete(productId)}
            >
              Sim
            </button>
            <button
              type="button"
              className="reject"
              onClick={() => setShowAlert(false)}
            >
              Não
            </button>
          </div>
        </div>
      </Alert>

      <Modal showModal={showModal}>
        <div>
          <div>
            <h3>Informações da encomenda</h3>

            <span>
              {recipient.street}, {recipient.number}
            </span>
            <span>
              {recipient.city} - {recipient.state}
            </span>
            <span>{recipient.zip_code}</span>
          </div>

          {datesRecipient.start ||
            (datesRecipient.end && (
              <div>
                <h3>Datas</h3>
                {datesRecipient.start && (
                  <strong>
                    Retirada: <span>{datesRecipient.start}</span>
                  </strong>
                )}
                {datesRecipient.end && (
                  <strong>
                    Entrega: <span>{datesRecipient.end}</span>
                  </strong>
                )}
              </div>
            ))}

          {imageSignature && (
            <div>
              <h3>Assinatura do destinatário</h3>
              <div>
                <img src={imageSignature} alt="Assinatura" />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </Wrapper>
  );
}
