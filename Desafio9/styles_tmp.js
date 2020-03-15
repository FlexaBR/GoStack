import styled from 'styled-components';
import { actionButton } from '~/styles/util';
import searchIcon from '~/assets/searchIcon.svg';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
`;

export const Title = styled.div`
  strong {
    display: flex;
    color: #444444;
    font-size: 24px;
    font-weight: bold;
    padding: 35px 0 40px 0;
  }
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
      text-align: right;
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
      text-align: right;
    }
    button {
      background: none;
      border: 0;
      &:first-child {
        color: #4d85ee;
        margin-right: 23px;
      }
      &:last-child {
        color: #de3b3b;
      }
    }
  }
  &:last-child {
    td {
      border-bottom: 0;
      padding-bottom: 0;
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
  margin-right: 5px;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.div`
  width: 60%;
  height: 25px;
  background: ${props => {
    if (props.canceled) return '#FAB0B0';
    if (props.delivered) return '#BAD2FF';
    if (props.pending) return '#F0F0DF';
    return '#DFF0DF';
  }};
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-weight: 700;
    font-size: 1rem;
    color: ${props => {
      if (props.canceled) return '#DE3B3B';
      if (props.delivered) return '#4D85EE';
      if (props.pending) return '#C1BC35';
      return '#2CA42B';
    }};
  }

  &:before {
    content: '';
    width: 10px;
    height: 10px;
    background: ${props => {
      if (props.canceled) return '#DE3B3B';
      if (props.delivered) return '#4D85EE';
      if (props.pending) return '#C1BC35';
      return '#2CA42B';
    }};
    border-radius: 50%;
    margin: 0 6px;
  }
`;
