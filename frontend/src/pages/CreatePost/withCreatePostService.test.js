import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { createPostService } from './withCreatePostService';

const MockCreatePost = ({ errorMessage, onSubmit }) => {
  useEffect(() => {
    onSubmit();
  });
  return <p>{`MockCreatePost ${errorMessage}`}</p>;
};
MockCreatePost.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
MockCreatePost.defaultProps = {
  errorMessage: null,
};

describe('withCreatePostService', () => {
  it('renders the wrapped component', () => {
    const mockSubmitPost = () => {};
    const CreatePostServiced = createPostService(mockSubmitPost)(MockCreatePost);
    const { getByText } = render(<CreatePostServiced />);
    const child = getByText(/MockCreatePost/i);
    expect(child).toBeInTheDocument();
  });

  it('supplies an error message when there is an error in submiting a post', () => {
    const mockSubmitPost = jest.fn(() => {
      throw new Error('an error message');
    });
    const CreatePostServiced = createPostService(mockSubmitPost)(MockCreatePost);
    const { getByText } = render(<CreatePostServiced />);
    const child = getByText(/an error message/i);
    expect(child).toBeInTheDocument();
  });
});
