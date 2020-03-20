import React, { useEffect } from 'react';
import { render, wait } from '@testing-library/react';
import { createPostService } from './withCreatePostService';
import { SubmitPostError } from '../../../services/createPostService';

const MockCreatePost = ({ errorMessage, onSubmit }) => {
  useEffect(() => {
    onSubmit();
  });
  return <p>{`MockCreatePost ${errorMessage}`}</p>;
};

describe('withCreatePostService', () => {
  it('renders the wrapped component', async () => {
    const mockSubmitPost = () => {};
    const CreatePostServiced = createPostService(mockSubmitPost)(MockCreatePost);
    const { getByText } = render(<CreatePostServiced showModal setModal={() => {}} />);
    const child = getByText(/MockCreatePost/i);
    expect(child).toBeInTheDocument();
    await wait();
  });

  it('supplies an error message when there is an error in submiting a post', async () => {
    const mockSubmitPost = jest.fn(() => {
      throw new SubmitPostError('an error message');
    });
    const CreatePostServiced = createPostService(mockSubmitPost)(MockCreatePost);
    const { getByText } = render(<CreatePostServiced showModal setModal={() => {}} />);
    const child = getByText(/an error message/i);
    expect(child).toBeInTheDocument();
    await wait();
  });
});
