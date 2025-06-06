import { Typography } from '@mui/material';
import { Suspense } from 'react';
import BlogPageView from '@/components/ModuleComponents/BlogPageView';

export default function Page() {
  return (
    <Suspense fallback={<Typography variant="h6">Loading...</Typography>}>
      <BlogPageView />
    </Suspense>
  );
}
