import styled from 'styled-components';
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
