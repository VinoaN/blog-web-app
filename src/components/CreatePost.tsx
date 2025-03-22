'use client';

import { Routes } from '@/constants/globalConstants';
import { useAddUpdatePost } from '@/hooks/useAddUpdatePost';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { AddPostFormType, PostType } from '@/types/types';
import { Box } from '@mui/material';
import { BlogForm } from '@siddant-rachha/blog-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import nextConfig from '../../next.config';

export const CreatePost = () => {
  const router = useRouter();
  const {
    selectors: { userDetails },
  } = useAuthSlice();
  const { handleFormAddPost, handleFormUpdatePost } = useAddUpdatePost();

  const {
    selectors: { editPost },
    actions: { setEditPost },
  } = usePostsSlice();

  const [resetForm, setResetForm] = useState(false);

  let firstRenderWithStrictMode = true;

  const handleFormSubmit = async (formData: {
    imageFile: File | null | string;
    title: string;
    desc: string;
  }) => {
    try {
      // if edit post
      if (editPost.id) {
        await handleFormUpdatePost({
          ...formData,
          postId: editPost.id,
        });
        setResetForm(true);
        return;
      }

      // if new post
      await handleFormAddPost(formData as AddPostFormType);
      setResetForm(true);
      router.push(Routes['Home']);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    return () => {
      // ------ this case is only for strict mode true while development ---------
      if (nextConfig.reactStrictMode === true) {
        if (firstRenderWithStrictMode === false) {
          setEditPost({} as PostType);
        } else {
          firstRenderWithStrictMode = false;
        }
        return;
      }
      // ------------------

      // ------ this case is only for strict mode false or while production ---------
      setEditPost({} as PostType);
    };
  }, []);

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
        title={editPost.title || ''}
        desc={editPost.desc || ''}
        resetForm={resetForm}
      />
    </Box>
  );
};
