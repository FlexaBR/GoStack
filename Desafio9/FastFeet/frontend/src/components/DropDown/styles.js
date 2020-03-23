import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 120px;
  right: 84px;
  margin: 20px 0 0 0;
  background: #ffffff;
  border-radius: 4px;
  padding: 15px 10px;

  cursor: default;
  z-index: 1;

  display: ${props => (props.showMenu ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    top: -24px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ffffff;
    margin-left: 56px;
    padding-top: 14px;
  }

  button {
    width: 100%;
    color: #999999;
    font-size: 16px;
    transition: color 0.2s;
    border-color: #ffffff;
    border-right: 1px solid transparent;
    border-bottom: 1px solid #eeeeee;
    padding-top: 6px;
    padding-bottom: 6px;
    background: #ffffff;

    display: flex;
    align-items: center;

    > svg {
      margin-right: 8px;
    }

    &:hover {
      color: ${darken(0.08, '#999999')};
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }

  button:active {
    outline: none;
    border: none;
  }
`;
