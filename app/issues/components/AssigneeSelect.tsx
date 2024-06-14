'use client'

import { Select } from '@radix-ui/themes'
import axios from 'axios';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = ({issue}:{issue :Issue}) => {

  const {data: users , error, isLoading} =  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime : 1000 * 60 ,
    retry : 3
  })

  if(isLoading) return <Skeleton/>

  if(error) return null

  return (
    <Select.Root 
    defaultValue={issue.assignedUserId || "0"}
    onValueChange={(userId) =>{
      axios.patch(`/api/issues/${issue.id}` , { assignedUserId: userId === "0" ? null : userId})
    }}>
        <Select.Trigger placeholder='Assign to' / >
    <Select.Content>
        <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            <Select.Item  value="0">Unassign</Select.Item>
            {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            ))}
        </Select.Group>
    </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect