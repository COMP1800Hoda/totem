import { useNavigate } from 'react-router-dom';
import { Storybook } from '../types/Storybook.ts';

export const useNavigateToBookDetail = () => {
  const navigate = useNavigate();

  return (book: Storybook) => {
    navigate('/book-detail', {
      state: {
        book,
      },
    });
  };
};
