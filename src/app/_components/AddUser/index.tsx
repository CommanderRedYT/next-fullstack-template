'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import { useState } from 'react';

import { useApiStore } from '@/providers/apiStoreProvider';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const AddUser: FC = () => {
    const router = useRouter();

    const addUser = useApiStore(store => store.addUser);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

    const handleAddUser = async (): Promise<void> => {
        const result = await addUser(name, email);

        if (!result?.success) {
            setError(result?.error || 'An error occurred');
            return;
        }

        setName('');
        setEmail('');

        router.refresh();
    };

    return (
        <Box p={1}>
            <Typography variant="h2">Add user</Typography>
            <Box p={1}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    slotProps={{
                        htmlInput: {
                            'data-testid': 'name-input',
                        },
                    }}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    slotProps={{
                        htmlInput: {
                            'data-testid': 'email-input',
                        },
                    }}
                />
                {error ? (
                    <FormHelperText data-testid="error" error>
                        {error}
                    </FormHelperText>
                ) : null}
                <Button onClick={handleAddUser}>Add user</Button>
            </Box>
        </Box>
    );
};

export default AddUser;
