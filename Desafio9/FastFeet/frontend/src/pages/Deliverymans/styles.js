import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
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
    &:nth-child(5) {
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
      width: 200px;
    }
    &:nth-child(2) {
      width: 260px;
    }
    &:nth-child(3) {
      width: 300px;
    }
    &:nth-child(4) {
      width: 350px;
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
