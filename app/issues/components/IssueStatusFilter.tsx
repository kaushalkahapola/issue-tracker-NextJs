'use client'

import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter } from "next/navigation"


const statuses : {label: string, value: Status | undefined}[] = [
    {label: 'All', value: undefined},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Done', value: 'DONE'},
]


const IssueStatusFilter = () => {
    const router = useRouter()
  return (
    <Select.Root 
        onValueChange={(value) =>
         {
            const status = value === '0' ? undefined : value
            const query = status ? '?status=' + status : ''
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