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
  padding: 30px;
  text-align: center;

  img {
    padding-top: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    h4 {
      display: flex;
      font-size: 14px;
      align-items: center;
      margin: 5px 0;
      padding-top: 10px;
      color: #444444;
    }

    input {
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      font-size: 16px;
      margin: 0 0 10px;
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
      font-size: 10px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7D40E7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7D40E7')};
      }
    }
  }
`;
