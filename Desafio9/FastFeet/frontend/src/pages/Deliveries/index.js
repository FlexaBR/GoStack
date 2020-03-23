/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';
import { parseISO, format } from 'date-fns';

import history from '~/services/history';

import Title from '~/components/Title';
import DropDown from '~/components/DropDown';

import api from '~/services/api';

import {
  Container,
  DataHeader,
  Data,
  Initials,
  NoData,
  Paginator,
  Status,
  DotCircle,
  Alert,
  Modal,
} from './styles';

export default function Deliveries() {
  const [product, setProduct] = useState();
  const [deliveries, setDeliveries] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [productId, setProductId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [recipient, setRecipient] = useState({});
  const [datesRecipient, setDatesRecipient] = useState({});
  const [imageSignature, setImageSignature] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadDeliveries(1);
  }, []);

  useEffect(() => {
    window.onclick = ({ target }) => {
      if (showModal && target.id === 'modal') {
        setShowModal(false);
      }
    };
  }, [showModal]);

  async function loadDeliveries(currentPage) {
    try {
      const { data } = await api.get('deliveries', {
        params: { q: product, page: currentPage },
      });

      const resp = data.content.map(delivery => {
        let statusText = '';
        let canceled = false;
        let delivered = false;
        let pending = false;
        let withdrawal = false;

        const initials = delivery.deliveryman.name
          .split(' ')
          .map(n => n[0])
          .join('');

        if (delivery.canceled_at) {
          statusText = 'CANCELADA';
          canceled = true;
        } else if (delivery.start_date && !delivery.end_date) {
          statusText = 'RETIRADA';
          withdrawal = true;
        } else if (delivery.end_date) {
          statusText = 'ENTREGUE';
          delivered = true;
        } else {
          statusText = 'PENDENTE';
          pending = true;
        }

        delivery.start_date = delivery.start_date
          ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
          : null;
        delivery.end_date = delivery.end_date
          ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
          : null;

        return {
          ...delivery,
          showMenu: false,
          initials,
          statusText,
          canceled,
          delivered,
          pending,
          withdrawal,
        };
      });

      setPage(currentPage);
      setLastPage(data.lastPage);
      setDeliveries(resp);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handleProductChange(e) {
    setProduct(e.target.value);
  }

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

  // eslint-disable-next-line no-shadow
  function handleAlertDelete({ product, id }) {
    setDeliveries(
      deliveries.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setProduct(product);
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
    toast.success(`O produto ${product} foi excluido com sucesso!`);
  }

  function handlePreviousPageChange() {
    const currentPage = page - 1;
    loadDeliveries(currentPage);
  }

  function handleNextPageChange() {
    const currentPage = page + 1;
    loadDeliveries(currentPage);
  }

  return (
    <Container>
      <Title title="Gerenciando encomendas" />

      <DataHeader>
        <span>
          <input
            name="product"
            placeholder="Buscar por encomendas"
            onKeyDown={event => event.key === 'Enter' && loadDeliveries(1)}
            onChange={handleProductChange}
          />
        </span>

        <button type="button" onClick={() => history.push('/deliveries/new')}>
          <FaPlus color="#FFF" size={16} />
          <span>CADASTRAR</span>
        </button>
      </DataHeader>

      {deliveries.length ? (
        <>
          <Data>
            <thead>
              <tr>
                <th>ID</th>
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(delivery => (
                <tr key={delivery.id}>
                  <td>#{delivery.id}</td>
                  <td>{delivery.recipient.nome}</td>
                  <td>
                    <Initials
                      canceled={delivery.canceled}
                      delivered={delivery.delivered}
                      pending={!delivery.pending}
                    >
                      {delivery.initials}
                    </Initials>
                    {delivery.deliveryman.name}
                  </td>

                  <td>{delivery.recipient.cidade}</td>
                  <td>{delivery.recipient.estado}</td>
                  <td>
                    <Status
                      canceled={delivery.canceled}
                      delivered={delivery.delivered}
                      pending={!delivery.pending}
                      withdrawal={!delivery.withdrawal}
                    >
                      <span>{delivery.statusText}</span>
                    </Status>
                  </td>
                  <td>
                    <div
                      className="actions"
                      onClick={() => handleMenu(delivery.id)}
                      onKeyPress={() => handleMenu(delivery.id)}
                      role="button"
                      tabIndex="0"
                    >
                      <DropDown showMenu={delivery.showMenu}>
                        <button
                          type="button"
                          onClick={() => handlePreview(delivery)}
                        >
                          <MdRemoveRedEye size={15} color="#8E5BE8" />
                          Visualizar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            history.push(`deliveries/${delivery.id}`)
                          }
                        >
                          <MdEdit size={15} color="#4D85EE" /> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlertDelete(delivery)}
                        >
                          <MdDeleteForever size={15} color="#DE3B3B" /> Excluir
                        </button>
                      </DropDown>
                      <DotCircle>
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </DotCircle>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Data>

          <Paginator>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => {
                handlePreviousPageChange();
              }}
            >
              Anterior
            </button>
            <button
              disabled={lastPage}
              type="button"
              onClick={() => {
                handleNextPageChange();
              }}
            >
              Próxima
            </button>
          </Paginator>
        </>
      ) : (
        <NoData>
          <span>Nenhuma entrega cadastrada.</span>
        </NoData>
      )}

      <Alert showAlert={showAlert}>
        <div>
          <div className="title">
            <h3>
              Tem certeza que deseja excluir o produto{' '}
              <span>
                {product}, id: {productId}
              </span>
              ?
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
          <div className="info">
            <h3>Informações da encomenda</h3>
            <span>
              {recipient.rua}, {recipient.numero}
            </span>
            <span>
              {recipient.cidade} - {recipient.estado}
            </span>
            <span>{recipient.cep}</span>
          </div>
          <div className="datas">
            <h3>Datas</h3>
            {datesRecipient.start && (
              <span>
                <strong>Retirada: </strong>
                {datesRecipient.start}
              </span>
            )}
            {datesRecipient.end && (
              <span>
                <strong>Entrega: </strong>
                {datesRecipient.end}
              </span>
            )}
          </div>

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
    </Container>
  );
}
