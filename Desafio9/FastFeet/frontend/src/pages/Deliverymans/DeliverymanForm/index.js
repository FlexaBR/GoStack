/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdChevronLeft, MdCheck, MdImage } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Title from '~/components/Title';

import { Wrapper, Header, Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do entregador é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function FormPage({ match }) {
  const [file, setFile] = useState();
  const [url, setUrl] = useState('');
  const [idFile, setIdFile] = useState('');
  const [deliveryman, setDeliveryman] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [textHeader, setTextHeader] = useState('Cadastro de entregador');

  useEffect(() => {
    async function loadDeliveryman(id) {
      try {
        const response = await api.get('deliverymans', {
          params: { id },
        });

        if (response.data.avatar) {
          setUrl(response.data.avatar.url);
        }

        setDeliveryman(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    if (match.params.id) {
      setTextHeader('Edição de entregadores');
      loadDeliveryman(match.params.id);
    }
  }, [match.params, deliveryman, name, email]);

  useEffect(() => {
    if (file) {
      setUrl(window.URL.createObjectURL(file));
    }
  }, [file, match.params.id]);

  async function createUpdateDeliveryman(fileId) {
    const obj = {
      name,
      email,
    };

    if (fileId) {
      obj.avatar_id = fileId;
    }

    if (match.params.id) {
      await api.put(`deliverymans/${match.params.id}`, obj);
      toast.success('Entregador atualizado com sucesso!');
    } else {
      await api.post('deliverymans', obj);

      history.push('/deliverymans');
    }
  }

  async function handleSubmit() {
    if (file) {
      const data = new FormData();
      data.append('file', file);

      const response = await api.post('avatars', data);

      const { id } = response.data;

      setIdFile(id);

      createUpdateDeliveryman(id, name, email);
    } else {
      createUpdateDeliveryman(idFile, name, email);
    }
  }

  return (
    <Wrapper>
      <Form
        noValidate
        autoComplete="off"
        schema={schema}
        onSubmit={handleSubmit}
        initialData={deliveryman}
      >
        <Header>
          <Title title={textHeader} />

          <div>
            <Link to="/deliverymans">
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
            <div className="img">
              <label htmlFor="file">
                {url && <img src={url} alt="" />}

                {!url && (
                  <>
                    <MdImage size={40} color="#DDDDDD" />
                    <p>Adicionar foto</p>
                  </>
                )}
              </label>
              <Input
                hidden
                type="file"
                name="file"
                id="file"
                onChange={e => setFile(e.target.files[0])}
              />
            </div>

            <div className="texto">
              <label htmlFor="name">Nome</label>
              <Input
                name="name"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="texto">
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@rocketseat.com"
              />
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
