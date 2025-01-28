'use client';

import type { MyModel } from '@prisma/client';

import type { FC } from 'react';

import { useApiStore } from '@/providers/apiStoreProvider';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

export interface UsersListProps {
    initialUsers: MyModel[];
}

const UsersList: FC<UsersListProps> = ({ initialUsers }) => {
    const users = useApiStore(store => store.users);
    const getUsers = useApiStore(store => store.getUsers);

    const data = users || initialUsers;

    return (
        <Box p={1}>
            <Typography variant="h2">Users</Typography>
            <List>
                {data.map(user => (
                    <ListItem key={user.id}>
                        {user.name} {'->'} {user.email}
                    </ListItem>
                ))}
                {data.length === 0 ? <ListItem>No users found</ListItem> : null}
            </List>
            <Button onClick={getUsers}>Refresh</Button>
        </Box>
    );
};

export default UsersList;
