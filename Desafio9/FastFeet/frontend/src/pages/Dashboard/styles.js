import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
`;

export const Form = styled.form`
  margin: 10px 90px;

  h1 {
    font-size: 24px;
  }

  div.search {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: 237px;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      height: 36px;
      padding: 0 12px 0 30px;
      color: #999999;
      font-size: 14px;
      margin-top: 35px;
      background: #f5f8fa url('/images/search.svg') no-repeat 190px center;
    }
  }
`;

export const SubmitButton = styled.button`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
