'use client'

import { Select } from '@radix-ui/themes'
import axios from 'axios';
import { User } from '@prisma/client';
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {

  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const {data} = await axios.get<User[]>("http://localhost:3000/api/users");
      setUsers(data);
    };
    fetchUsers();
  }, []
  )

  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign to' / >
    <Select.Content>
        <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            {/* <Select.Item value='1'>Kaushal Viraj</Select.Item> */}
            {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            ))}
        </Select.Group>
    </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect