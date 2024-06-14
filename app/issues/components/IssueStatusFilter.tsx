'use client'

import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"


const statuses : {label: string, value: Status | undefined}[] = [
    {label: 'All', value: undefined},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Done', value: 'DONE'},
]


const IssueStatusFilter = () => {
    const router = useRouter()

    // check for already existing orderBy params in url
     const searchParams = useSearchParams()
     const orderBy = searchParams.get('orderBy')

  return (
    <Select.Root 
        onValueChange={(value) =>
         {
            const status = value === '0' ? undefined : value
            let query = status ? '?status=' + status : ''
            orderBy && (query ? (query += '&orderBy=' + orderBy) : (query = '?orderBy=' + orderBy))
            router.push('/issues' + query)
    }
}>
        <Select.Trigger placeholder="Filter by status"/>
        <Select.Content>
            {statuses.map(({label, value}) => (
                <Select.Item key={label} value={value ? value : '0'}>{label}</Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter