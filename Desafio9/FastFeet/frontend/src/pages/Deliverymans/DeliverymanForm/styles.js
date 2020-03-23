import styled from 'styled-components';
import { darken } from 'polished';

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
  height: 401px;
  margin: 0 auto;
  padding: 30px 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  label {
    color: #444444;
    font-size: 14px;
    font-weight: bold;
  }

  input {
    height: 45px;
    width: 840px;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    margin-top: 8px;
    background: #fff;
    color: #000;
    margin-bottom: 20px;
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

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
  }

  .img {
    display: flex;
    width: 150px;
    height: 150px;
    border: 1px dashed #dddddd;
    border-radius: 50%;
    margin-bottom: 20px;

    label {
      width: 100%;
      height: 100%;
      cursor: pointer;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        background: #dddddd;
        border: 1px dashed #dddddd;
        border-radius: 50%;
      }

      > p {
        color: #dddddd;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        white-space: nowrap;
      }
    }
  }

  .texto {
    display: flex;
    flex-direction: column;
  }
`;
