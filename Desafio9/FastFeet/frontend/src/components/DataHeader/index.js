import React from 'react';

import { FaPlus } from 'react-icons/fa';

import { Header } from './styles';

// eslint-disable-next-line react/prop-types
function DataHeader({ name, placeholder, change, click }) {
  return (
    <Header>
      <span>
        <input name={name} placeholder={placeholder} onChange={change} />
      </span>

      <button type="button" onClick={click}>
        <FaPlus color="#FFF" size={16} />
        <span>CADASTRAR</span>
      </button>
    </Header>
  );
}

export default DataHeader;
