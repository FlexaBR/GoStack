import styled from 'styled-components';
import { actionButton } from '~/styles/util';

import searchIcon from '~/assets/searchIcon.svg';

export const Header = styled.div`
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
