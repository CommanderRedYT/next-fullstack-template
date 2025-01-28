import type { NextPage } from 'next';
import { notFound } from 'next/navigation';

import { fetchUsers } from '@/app/_api';

import AddUser from '@components/AddUser';
import EnterNameField from '@components/EnterNameField';
import UsersList from '@components/UsersList';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const MainPage: NextPage = async () => {
    const response = await fetchUsers();

    const initialUsers = response.success ? response.data : null;

    if (!initialUsers) {
        notFound();
    }

    return (
        <Box>
            <Typography variant="h1">Hello, World!</Typography>
            <Divider />
            <EnterNameField />
            <Divider />
            <UsersList initialUsers={initialUsers} />
            <Divider />
            <AddUser />
        </Box>
    );
};

export default MainPage;
