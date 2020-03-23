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
  nome: Yup.string().required('O nome do destinatário é obrigatório'),
  rua: Yup.string().required('O nome da rua é obrigatório'),
  numero: Yup.number().required('O nome numero é obrigatório'),
  cidade: Yup.string().required('O nome da cidade é obrigatório'),
});

export default function FormPage({ match }) {
  const [recipient, setRecipient] = useState('');
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState(0);
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [textHeader, setTextHeader] = useState('Cadastro de destinatário');

  useEffect(() => {
    async function loadRecipient(id) {
      const { data } = await api.get(`recipients/${id}`);

      setRecipient(data);
      setNome(data.nome);
      setRua(data.rua);
      setNumero(data.numero);
      setComplemento(data.complemento);
      setCidade(data.cidade);
      setEstado(data.estado);
      setCep(data.cep);
    }
    if (match.params.id) {
      setTextHeader('Editação de destinatário');
      loadRecipient(match.params.id);
    }
  }, [match.params]);

  async function handleSubmit(data) {
    if (match.params.id) {
      await api.put(`recipients/${match.params.id}`, data);
      toast.success('A edição foi feita com sucesso');
    } else {
      await api.post('recipients', data);
      history.push('/recipients');
    }
  }

  return (
    <Wrapper>
      <Form
        noValidate
        autoComplete="off"
        schema={schema}
        onSubmit={handleSubmit}
        initialData={recipient}
      >
        <Header>
          <Title title={textHeader} />

          <div>
            <Link to="/recipients">
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
          <div className="form">
            <div>
              <label htmlFor="nome">Nome</label>
              <Input
                type="text"
                placeholder="Ludwig van Beethoven"
                value={nome}
                id="nome"
                name="nome"
                onChange={e => setNome(e.target.value)}
              />
            </div>
            <div className="three">
              <div className="rua">
                <label htmlFor="rua">Rua</label>
                <Input
                  type="text"
                  placeholder="Rua Beethoven"
                  value={rua}
                  id="rua"
                  name="rua"
                  onChange={e => setRua(e.target.value)}
                />
              </div>
              <div className="numero">
                <label htmlFor="numero">Número</label>
                <Input
                  type="numero"
                  placeholder="1729"
                  value={numero}
                  id="numero"
                  onChange={e => setNumero(e.target.value)}
                  name="numero"
                />
              </div>

              <div className="complemento">
                <label htmlFor="complemento">Complemento</label>
                <Input
                  type="text"
                  value={complemento}
                  id="complemento"
                  name="complemento"
                  onChange={e => setComplemento(e.target.value)}
                />
              </div>
            </div>
            <div className="three">
              <div className="cidade">
                <label htmlFor="cidade">Cidade</label>
                <Input
                  type="text"
                  placeholder="Diadema"
                  value={cidade}
                  id="cidade"
                  name="cidade"
                  onChange={e => setCidade(e.target.value)}
                />
              </div>
              <div className="estado">
                <label htmlFor="estado">Estado</label>
                <Input
                  type="text"
                  placeholder="São Paulo"
                  value={estado}
                  id="estado"
                  name="estado"
                  onChange={e => setEstado(e.target.value)}
                />
              </div>
              <div className="cep">
                <label htmlFor="cep">CEP</label>
                <Input
                  type="text"
                  placeholder="09960-580"
                  value={cep}
                  id="cep"
                  name="cep"
                  onChange={e => setCep(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Container>
      </Form>
    </Wrapper>
  );
}

FormPage.propTypes = {
  match: PropTypes.shape().isRequired,
};
