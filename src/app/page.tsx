import type { NextPage } from 'next';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HomePage: NextPage = () => (
    <Box>
        <Typography variant="h1">Hello, World!</Typography>
        <Link href="/other">
            <Typography variant="h2">Go to other page</Typography>
        </Link>
    </Box>
);

export default HomePage;
