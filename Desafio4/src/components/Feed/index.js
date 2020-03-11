import React, { Component } from 'react';

import './index.css';
import FeedFormNew from '../FeedFormNew';
import FeedPost from '../FeedPost';

class Feed extends Component {
  state = {
    newPost: '',
    posts: []
  };

  componentDidMount() {
    if (localStorage.getItem('posts') !== null && this.state.posts !== localStorage.getItem('posts')) {
      this.setState({ posts: JSON.parse(localStorage.getItem('posts')) });
    }
    console.log('montado');
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.posts) {
      localStorage.setItem('posts', JSON.stringify(this.state.posts));
    }
    console.log('atualizou o component');
  }

  handleInputChange = e => {
    this.setState({ newPost: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      posts: [...this.state.posts, this.state.newPost],
      newPost: ''
    });
  }

  render() {
    return (
      <div id="feed">
        <div className="content">
          <FeedFormNew 
            onSubmit={this.handleSubmit} 
            onChange={this.handleInputChange} 
            post={this.state.newPost}
            />

          <hr className='divider'/>

          {this.state.posts.map(post => 
            <FeedPost key={post} post={post} />
          )}
        </div>
      </div>
    );
  }
}

export default Feed;
