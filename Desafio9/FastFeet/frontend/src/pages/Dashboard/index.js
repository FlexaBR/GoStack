import React from 'react';

import { FaPlus } from 'react-icons/fa'

import { Container, Form, SubmitButton } from './styles';

export default function Dashboard() {

  return (
    <Container>

      <Form onSubmit={() => {}}>

        <h1>Gerenciando encomendas</h1>
        <div class="search">
          <input
            type="text"
            placeholder="Buscar por encomendas"
          />
          <SubmitButton disabled>
            <FaPlus color="#FFF" size={14} />
          </SubmitButton>
        </div>

      </Form>

    </Container>
  );
}
