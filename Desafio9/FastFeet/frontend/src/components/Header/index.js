import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, User } from './styles';

export default function Header() {

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="FastFeet" />
          </Link>
        </nav>

        <aside>
          <User>
            <div>
              <strong>User Logado</strong>
              <Link to="/">sair do sistema</Link>
            </div>
          </User>
        </aside>
      </Content>
    </Container>
  );
}
