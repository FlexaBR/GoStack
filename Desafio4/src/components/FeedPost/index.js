import React from 'react';

import './index.css';
import userComment from '../../assets/user-comment.png';
import userPost from '../../assets/avatar.jpg';

function FeedPost({ post }) {
  return (
    <div className="post">
      <header>
        <img src={userPost} alt=""/>
        <div className="user-info">
          <p>Patrick Maciel</p>
          <small>04 Jun 2019</small>
        </div>
      </header>

      <div className="post-content">{ post }</div>
      <div className="divider"></div>

      <div className="comments">
        <div className="comment">
          <a href="#">
            <img src={userComment} alt=""/>
          </a>
          <p>BORA CODAR!</p>
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
