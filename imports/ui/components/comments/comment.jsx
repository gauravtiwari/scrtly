import React from 'react';
import Relay from 'react-relay';

const Comment = (props) => {
  const { comment } = props;
  return (
    <li>
      <p>
        Someone thought this was <span>{comment.body}</span>
      </p>
    </li>
  );
}

Comment.propTypes = {
  comment: React.PropTypes.object,
};


const CommentContainer = Relay.createContainer(Comment, {
  fragments: {
    comment: () => Relay.QL`
      fragment on Comment {
        id,
        body,
      }
    `,
  },
});

export default CommentContainer;
