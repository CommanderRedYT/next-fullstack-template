'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { useApiStore } from '@/providers/apiStoreProvider';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const EnterNameField: FC = () => {
    const handleFetch = useApiStore(store => store.fetchHello);
    const myVariable = useApiStore(store => store.myVariable);

    const [name, setName] = useState<string>('');

    const doFetch = async (): Promise<void> => {
        await handleFetch(name);
    };

    return (
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
            <Typography>Response: </Typography>
            <Typography border={1} p={1}>
                {myVariable}
            </Typography>
            <Button onClick={doFetch}>Fetch</Button>
        </Box>
    );
};

export default EnterNameField;
