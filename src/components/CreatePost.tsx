'use client';

import { useAddPost } from '@/hooks/useAddPost';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { Box } from '@mui/material';
import { BlogForm } from '@siddant-rachha/blog-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CreatePost = () => {
  const router = useRouter();
  const {
    selectors: { userDetails },
  } = useAuthSlice();
  const { handleFormAddPost } = useAddPost();

  const [resetForm, setResetForm] = useState(false);

  const handleFormSubmit = async (formData: {
    imageFile: File | null;
    title: string;
    desc: string;
  }) => {
    try {
      await handleFormAddPost(formData);
      setResetForm(true);
      router.push('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (resetForm) {
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <Box
      sx={{
        width: { md: '80%' },
        margin: 'auto',
      }}
    >
      <BlogForm
        handleFormSubmit={handleFormSubmit}
        name={userDetails?.displayName || 'Anonymous'}
        resetForm={resetForm}
      />
    </Box>
  );
};
