import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7D40E7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  height: 425px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 0 30px;
  text-align: center;

  img {
    margin-top: 60px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 40px 0 60px 0;

    h4 {
      display: flex;
      font-size: 14px;
      margin: 20px 0 12px 0;
      color: #444444;
    }

    h4:first-child {
      margin: 0 0 12px 0;
    }

    input {
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      font-size: 16px;
      color: #444444;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 2px;
      font-weight: bold;
      font-size: 11px;
    }

    button {
      height: 45px;
      background: #7D40E7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      margin-top: 15px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7D40E7')};
      }
    }
  }
`;
