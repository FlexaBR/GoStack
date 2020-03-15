import { darken } from 'polished';

const validationErrorSpan = {
  color: '#ee4d64',
  alignSelf: 'flex-start',
  margin: '0 0 10px',
  fontWeight: 'bold',
  marginTop: '3px',
};

const button = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  border: '0',
  fontWeight: 'bold',
  color: '#fff',
  fontSize: '14px',
  transition: 'background 0.2s',
};

const actionButton = {
  ...button,
  background: '#7D40E7',

  '&:hover': {
    background: darken(0.03, '#7D40E7'),
  },
};

const cancelButton = {
  ...button,
  background: '#cccccc',

  '&:hover': {
    background: darken(0.03, '#cccccc'),
  },
};

export { validationErrorSpan, actionButton, cancelButton };
