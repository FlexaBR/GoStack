/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { FaPlus } from 'react-icons/fa';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import Title from '~/components/Title';
import DropDown from '~/components/DropDown';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  DataHeader,
  Data,
  NoData,
  Paginator,
  Status,
  DotCircle,
} from './styles';

export default function Deliveries() {
  const [product, setProduct] = useState();
  const [deliveries, setDeliveries] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadDeliveries(1);
  }, []);

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

        return {
          ...delivery,
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
                  <td>{delivery.deliveryman.name}</td>

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
                        <button type="button" onClick={() => {}}>
                          <MdRemoveRedEye size={15} color="#8E5BE8" />{' '}
                          Visualizar
                        </button>
                        <button
                          type="button"
                          onClick={() => history.push(`editar/${delivery.id}`)}
                        >
                          <MdEdit size={15} color="#4D85EE" /> Editar
                        </button>
                        <button type="button" onClick={() => {}}>
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
          <span>Nenhuma entrega encontrada</span>
        </NoData>
      )}
    </Container>
  );
}
