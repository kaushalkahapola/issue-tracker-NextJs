import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuePage = () => {
  return (
      <Link href='/issues/new'>
        <Button>
          Create New Issue
        </Button>
      </Link>
    )
}

export default IssuePage