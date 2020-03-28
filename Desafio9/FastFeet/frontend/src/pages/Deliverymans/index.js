/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';

import Title from '~/components/Title';
import DropDown from '~/components/DropDown';
import DataHeader from '~/components/DataHeader';

import api from '~/services/api';

import {
  Container,
  Data,
  Initials,
  NoData,
  Paginator,
  DotCircle,
  Alert,
} from './styles';

export default function Deliverymans() {
  const [name, setName] = useState();
  const [deliverymans, setDeliverymans] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [deliverymanId, setDeliverymanId] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadDeliverymans(1);
  }, []);

  async function loadDeliverymans(currentPage) {
    try {
      const { data } = await api.get('deliverymans', {
        params: { q: name, page: currentPage },
      });

      const resp = data.content.map(deliveryman => {
        const initials = deliveryman.name
          .split(' ')
          .map(n => n[0])
          .join('');

        return {
          ...deliveryman,
          showMenu: false,
          initials,
        };
      });

      setPage(currentPage);
      setLastPage(data.lastPage);
      setDeliverymans(resp);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleMenu(id) {
    const newBbj = deliverymans.map(item => {
      if (item.id === id) {
        item.showMenu = !item.showMenu;
      } else {
        item.showMenu = false;
      }
      return item;
    });

    setDeliverymans(newBbj);
  }

  // eslint-disable-next-line no-shadow
  function handleAlertDelete({ name, id }) {
    setDeliverymans(
      deliverymans.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setName(name);
    setDeliverymanId(id);
    setShowAlert(true);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`deliverymans/${id}`);
      const index = deliverymans.findIndex(item => item.id === id);
      const newDeliverymans = deliverymans;
      newDeliverymans.splice(index, 1);
      setDeliverymans(newDeliverymans);
      setShowAlert(false);
      toast.success(`O entregador ${name} foi excluido com sucesso!`);
    } catch (error) {
      setShowAlert(false);
      toast.error(`Não foi possível excluir o entregador ${name}!`);
    }
  }

  function handlePreviousPageChange() {
    const currentPage = page - 1;
    loadDeliverymans(currentPage);
  }

  function handleNextPageChange() {
    const currentPage = page + 1;
    loadDeliverymans(currentPage);
  }

  return (
    <Container>
      <Title title="Gerenciando entregadores" />

      <DataHeader
        name="name"
        placeholder="Buscar por entregadores"
        load={() => this.loadDeliverymans(1)}
        change={() => this.handleNameChange()}
        click={() => history.push('/deliverymans/new')}
      />

      {deliverymans.length ? (
        <>
          <Data>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymans.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>#{deliveryman.id}</td>
                  <td>
                    <Initials>{deliveryman.initials}</Initials>
                  </td>

                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>

                  <td>
                    <div
                      className="actions"
                      onClick={() => handleMenu(deliveryman.id)}
                      onKeyPress={() => handleMenu(deliveryman.id)}
                      role="button"
                      tabIndex="0"
                    >
                      <DropDown showMenu={deliveryman.showMenu}>
                        <button
                          type="button"
                          onClick={() =>
                            history.push(`deliverymans/${deliveryman.id}`)
                          }
                        >
                          <MdEdit size={15} color="#4D85EE" /> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlertDelete(deliveryman)}
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
          <span>Nenhuma entregador cadastrado.</span>
        </NoData>
      )}

      <Alert showAlert={showAlert}>
        <div>
          <div className="title">
            <h3>
              Tem certeza que deseja excluir o entregador{' '}
              <span>
                {name}, id: {deliverymanId}
              </span>
              ?
            </h3>
          </div>
          <div className="actions">
            <button
              type="button"
              className="accept"
              onClick={() => handleDelete(deliverymanId)}
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
    </Container>
  );
}
