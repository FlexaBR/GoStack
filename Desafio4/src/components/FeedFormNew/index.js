import React from 'react';

import './index.css';

function FeedFormNew({ onSubmit, onChange, post }) {
  return (
    <form id="new-post" onSubmit={ onSubmit }>
      <textarea onChange={ onChange } cols="30" rows="10" placeholder='O que você está desenvolvendo agora?' value={post}></textarea>
      <div className="actions">
        <button type="submit">Postar</button>
      </div>
    </form>
  );
}

export default FeedFormNew;
