import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, User } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user.profile);


  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="/">
          <img src={logo} alt="FastFeet" />
        </Link>
      </nav>
      <Content>
        <button type="button" onClick={() => {}}>
          ENCOMENDAS
        </button>
        <button type="button" onClick={() => {}}>
          ENTREGADORES
        </button>
        <button type="button" onClick={() => {}}>
          DESTINATÁRIOS
        </button>
        <button type="button" onClick={() => {}}>
          PROBLEMAS
        </button>
      </Content>
      <User>
        <strong>User Logado</strong>
        <button type="button" onClick={handleSignOut}>
          sair do sistema
        </button>
      </User>

    </Container>
  );
}
