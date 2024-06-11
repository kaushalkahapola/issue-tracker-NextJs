import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoadingPage = () => {
  return (
    <Box className='max-w-xl mx-auto mt-5 space-y-3'>
      <Skeleton height='2rem' width='20rem' className='mb-5'/>
      <Skeleton/>
      <Skeleton height='25rem'/>
      </Box>
  )
}

export default NewIssueLoadingPage