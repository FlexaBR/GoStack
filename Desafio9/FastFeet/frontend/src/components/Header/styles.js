import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 1px 1px #DDDDDD;
  padding: 0 30px;
  position: relative;
  z-index: 1;

  nav {
    display: flex;
    align-items: center;

    img {
      max-height: 32px;
      border-right: 1px solid #DDDDDD;
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 32px;

  button {
    margin-right: 20px;
    font-size: 15px;
    font-weight: bold;
    color: #444444;
    border: 0;
    background: none;
  }
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  strong {
    font-size: 14px;
    color: #666666;
  }

  button {
    margin-top: 2px;
    font-size: 14px;
    color: #DE3B3B;
    border: 0;
    background: none;
  }
`;
