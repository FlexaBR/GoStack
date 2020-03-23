import styled from 'styled-components';
import { darken } from 'polished';
import { actionButton } from '~/styles/util';

import searchIcon from '~/assets/searchIcon.svg';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
`;

export const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 237px;
    height: 36px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 0 12px 0 35px;
    color: #999999;
    font-size: 14px;
    background: url(${searchIcon}) no-repeat center left 10px #ffffff;
  }

  button {
    ${actionButton}
    width: 142px;
    height: 36px;
    span {
      margin-left: 8px;
    }
  }
`;

export const NoData = styled.div`
  margin-top: 20px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
  }
`;

export const Data = styled.table`
  width: 100%;
  font-size: 16px;
  margin: 10px 0 0 0;
  border-collapse: collapse;

  thead th {
    text-align: left;
    color: #666666;
    font-weight: bold;
    line-height: 50px;
    padding: 0 15px 0 20px;
    background-color: #f5f5f5;
    &:nth-child(7) {
      text-align: center;
    }
  }

  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }
  background: #ffffff;
  line-height: 50px;
  td {
    color: #666666;
    padding: 0 0 0 20px;
    &:nth-child(1) {
      width: 90px;
    }
    &:nth-child(2) {
      width: 210px;
    }
    &:nth-child(3) {
      width: 180px;
      display: flex;
      align-items: center;
    }
    &:nth-child(4) {
      width: 165px;
    }
    &:nth-child(5) {
      width: 220px;
    }
    &:nth-child(6) {
      width: 260px;
    }
    &:last-child {
      width: 60px;
    }
  }
  &:last-child {
    td {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }
`;

export const Initials = styled.span`
  width: 35px;
  height: 35px;
  background: ${props => {
    if (props.canceled) return '#FFEEF1';
    if (props.delivered) return '#EBFBFA';
    if (props.pending) return '#FCF4EE';
    return '#F4EFFC';
  }};
  border-radius: 50%;
  color: ${props => {
    if (props.canceled) return '#CC7584';
    if (props.delivered) return '#83CEC9';
    if (props.pending) return '#CB946C';
    return '#A28FD0';
  }};
  font-size: 16px;
  margin-right: 5px;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.div`
  width: 110px;
  height: 25px;
  background: ${props => {
    if (props.canceled) return '#FAB0B0';
    if (props.delivered) return '#DFF0DF';
    if (props.pending) return '#F0F0DF';
    if (props.withdrawal) return '#BAD2FF';
    return '#F0F0DF';
  }};
  border-radius: 12px;
  border: 1px solid #dff0df;

  display: flex;
  align-items: center;
  justify-content: left;

  span {
    font-weight: bold;
    font-size: 14px;
    color: ${props => {
      if (props.canceled) return '#DE3B3B';
      if (props.delivered) return '#2CA42B';
      if (props.pending) return '#C1BC35';
      if (props.withdrawal) return '#4D85EE';
      return '#C1BC35';
    }};
  }

  &:before {
    content: '';
    width: 10px;
    height: 10px;
    background: ${props => {
      if (props.canceled) return '#DE3B3B';
      if (props.delivered) return '#2CA42B';
      if (props.pending) return '#C1BC35';
      if (props.withdrawal) return '#4D85EE';
      return '#C1BC35';
    }};
    border-radius: 50%;
    margin: 0 6px;
  }
`;

export const DotCircle = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 18px;
  margin-top: 3px;
  background: none;

  > span {
    height: 4px;
    width: 4px;
    background-color: #c6c6c6;
    border-radius: 50%;
    margin: 1px;
  }
`;

export const Modal = styled.div.attrs({
  id: 'modal',
})`
  display: ${props => (props.showModal ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;

  > div {
    width: 450px;
    height: 353px;
    background: #ffffff;
    padding: 25px;
    box-shadow: 0px 0px 10px #00000033;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    div.info {
      h3 {
        color: #444444;
        font-size: 14px;
        font-weight: bold;
        padding: 0 0 10px 0;
      }
      span {
        color: #666666;
        font-size: 16px;
        padding: 0 0 10px 0;

        &:last-child {
          border-right: 1px solid transparent;
          border-bottom: 1px solid #eeeeee;
        }
      }
    }

    div.datas {
      h3 {
        color: #444444;
        font-size: 14px;
        font-weight: bold;
        padding: 0 0 10px 0;
      }
      span {
        color: #666666;
        font-size: 16px;
        padding: 0 0 10px 0;

        &:last-child {
          border-right: 1px solid transparent;
          border-bottom: 1px solid #eeeeee;
        }
      }
    }

    div {
      margin-bottom: 21px;

      display: flex;
      flex-direction: column;

      &:last-child {
        margin-bottom: 0;
      }

      > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 23px;

        img {
          width: 234px;
          height: 41px;
        }
      }
    }
  }
`;

export const Paginator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background: #fff;
    font-weight: bold;
    color: #ee4d64;
    font-size: 16px;
    transition: background 0.2s;
    &:disabled {
      color: #ddd;
    }
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const Alert = styled.div`
  display: ${props => (props.showAlert ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;

  > div {
    width: 550px;
    border-radius: 4px;
    background: #fff;
    padding: 20px;
    box-shadow: 0px 0px 2px #000;

    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      &.title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 1.143rem;
        font-weight: 900;
        text-align: center;

        span {
          font-size: 1rem;
          color: #999;
        }
      }

      &.actions {
        margin-top: 21px;
        width: 250px;
        padding: 5px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        button {
          width: 80px;
          height: 40px;
          color: #fff;
          font-weight: 900;
          border-radius: 4px;
          transition: background 0.2s;
          border-color: transparent;

          &.accept {
            background: #28a745;

            &:hover {
              background: ${darken(0.08, '#28a745')};
            }
          }

          &.reject {
            background: #dc3545;

            &:hover {
              background: ${darken(0.08, '#dc3545')};
            }
          }
        }
      }
    }
  }
`;
