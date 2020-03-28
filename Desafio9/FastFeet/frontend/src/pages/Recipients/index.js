/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';

import Title from '~/components/Title';
import DataHeader from '~/components/DataHeader';
import DropDown from '~/components/DropDown';

import api from '~/services/api';

import { Container, Data, NoData, Paginator, DotCircle, Alert } from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [nome, setNome] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadRecipients(1);
  }, []);

  async function loadRecipients(currentPage) {
    try {
      const { data } = await api.get('recipients', {
        params: { q: nome, page: currentPage },
      });

      const resp = data.content.map(recipient => {
        return {
          ...recipient,
          showMenu: false,
          endereco: `${recipient.rua}, ${recipient.numero}, - ${recipient.cidade}`,
        };
      });

      setPage(currentPage);
      setLastPage(data.lastPage);
      setRecipients(resp);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleNameChange(e) {
    setNome(e.target.value);
  }

  function handleMenu(id) {
    const newBbj = recipients.map(item => {
      if (item.id === id) {
        item.showMenu = !item.showMenu;
      } else {
        item.showMenu = false;
      }
      return item;
    });

    setRecipients(newBbj);
  }

  // eslint-disable-next-line no-shadow
  function handleAlertDelete({ id, nome }) {
    setRecipients(
      recipients.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setNome(nome);
    setRecipientId(id);
    setShowAlert(true);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`recipients/${id}`);
      const index = recipients.findIndex(item => item.id === id);
      const newRecipients = recipients;
      newRecipients.splice(index, 1);
      setRecipients(newRecipients);
      setShowAlert(false);
      toast.success(`O destinatário ${nome} foi excluido com sucesso!`);
    } catch (error) {
      setShowAlert(false);
      toast.error(`Não foi possível excluir o destinatário ${nome}!`);
    }
  }

  function handlePreviousPageChange() {
    const currentPage = page - 1;
    loadRecipients(currentPage);
  }

  function handleNextPageChange() {
    const currentPage = page + 1;
    loadRecipients(currentPage);
  }

  return (
    <Container>
      <Title title="Gerenciando destinatários" />

      <DataHeader
        name="nome"
        placeholder="Buscar por destinatários"
        load={() => this.loadRecipients(1)}
        change={() => this.handleNameChange()}
        click={() => history.push('/recipients/new')}
      />

      {recipients.length ? (
        <>
          <Data>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map(recipient => (
                <tr key={recipient.id}>
                  <td>#{recipient.id}</td>

                  <td>{recipient.nome}</td>
                  <td>{recipient.endereco}</td>

                  <td>
                    <div
                      className="actions"
                      onClick={() => handleMenu(recipient.id)}
                      onKeyPress={() => handleMenu(recipient.id)}
                      role="button"
                      tabIndex="0"
                    >
                      <DropDown showMenu={recipient.showMenu}>
                        <button
                          type="button"
                          onClick={() =>
                            history.push(`recipients/${recipient.id}`)
                          }
                        >
                          <MdEdit size={15} color="#4D85EE" /> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlertDelete(recipient)}
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
          <span>Nenhuma destinatário cadastrado.</span>
        </NoData>
      )}

      <Alert showAlert={showAlert}>
        <div>
          <div className="title">
            <h3>
              Tem certeza que deseja excluir o destinatário{' '}
              <span>
                {nome}, id: {recipientId}
              </span>
              ?
            </h3>
          </div>
          <div className="actions">
            <button
              type="button"
              className="accept"
              onClick={() => handleDelete(recipientId)}
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
