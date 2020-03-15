import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  box-shadow: 0 1px 1px #dddddd;
  max-width: 1440px;

  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;

  aside {
    justify-self: flex-end;
    display: flex;
    align-items: center;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-right: 30px;
  padding-right: 35px;
  border-right: 1px solid #dddddd;

  img {
    width: 140px;
  }
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 0 4px 0;
`;

export const NavItem = styled(Link)`
  text-decoration: none;
  color: ${props => (props.active === 'true' ? '#444444' : '#999999')};
  font-size: 15px;
  display: inline;
  font-weight: bold;
  padding-right: 20px;
  transition: color 0.2s;
  ${props =>
    props.active === 'false' &&
    css`
      &:hover {
        color: ${darken(0.1, '#999999')};
      }
    `}
  & + li {
    padding: 0 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  strong {
    color: #666666;
    font-weight: bold;
  }
  button {
    line-height: 16px;
    margin-top: 4px;
    font-size: 14px;
    color: #de3b3b;
    background: none;
    border: 0;
  }
`;
