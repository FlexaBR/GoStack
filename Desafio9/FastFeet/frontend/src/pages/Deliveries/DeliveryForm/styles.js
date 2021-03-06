import styled from 'styled-components';
import { darken } from 'polished';

import arrowDownIcon from '~/assets/ic_keyboard_arrow_down_24px.svg';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  margin: 0 auto;

  > div {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    a,
    button {
      width: 112px;
      height: 36px;
      border-radius: 4px;
      color: #fff;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
      border-color: transparent;

      & > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 0 20px;

        & > div.icon {
          margin-right: 2px;
          display: flex;
          align-items: center;
        }
      }
    }

    a {
      background: #cccccc;
      margin-right: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#cccccc')};
      }
    }

    button {
      background: #7d40e7;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 900px;
  height: 220px;
  margin: 0 auto;
  padding: 30px 30px;

  display: flex;
  flex-direction: column;

  label {
    color: #444444;
    font-size: 14px;
    font-weight: bold;
  }

  input {
    height: 45px;
    width: 405px;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    margin-top: 8px;
    background: url(${arrowDownIcon}) no-repeat center right 10px #fff;
    color: #000;
  }

  span {
    color: #dc3545;
    margin-top: 5px;
    font-size: 10px;

    &:before {
      content: '*';
      margin-right: 3px;
      padding-left: 3px;
    }
  }

  .two {
    display: flex;
    justify-content: space-between;
    width: 840px;
    height: 80px;

    .two-one {
      width: 420px;
    }
    .two-two {
      width: 420px;
      padding: 0 0 0 15px;
    }

    ul {
      position: absolute;
      width: 405px;
      background: #fff;
      position: fixed;
      z-index: 1;

      border: 1px solid #dddddd;

      li {
        height: 25px;
        display: flex;
        align-items: center;

        button {
          width: 100%;
          height: 100%;
          text-align: inherit;
          font-size: 16px;
          color: #444444;
          padding: 0 15px;
          border: none;
          background: transparent;
        }

        &:hover {
          background-color: #7159c1;

          button {
            font-weight: 900;
            color: #fff;
          }
        }
      }
    }
  }

  .one {
    display: flex;
    flex-direction: column;
    width: 840px;
    height: 80px;
    padding-top: 10px;

    input {
      width: 100%;
      background: #fff;
      height: 45px;
    }
  }
`;
