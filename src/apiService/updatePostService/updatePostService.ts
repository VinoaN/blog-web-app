import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';
import { UpdatePostFormType } from '@/types/types';

type UpdatePostRequest = UpdatePostFormType;
interface UpdatePostResponse {
  message: string | undefined;
  postId: string | undefined;
  error: string | undefined;
}

export const updatePostService = async (formData: UpdatePostRequest) => {
  try {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('desc', formData.desc);
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }
    const response = await post<typeof data, UpdatePostResponse>(
      endpoints.updatePostById(formData.postId),
      data,
      { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 15000 }
    );
    return response;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};
