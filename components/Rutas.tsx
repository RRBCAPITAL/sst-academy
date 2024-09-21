"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import { Box, Typography, Link as MuiLink } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { deslugify } from '@/utils/deslugify';

const Rutas = () => {
    const pathname = usePathname();

    const renderPath = () => {
        const pathSegments = pathname?.split('/').filter(Boolean);
        const lastSegment = pathSegments ? pathSegments[pathSegments.length - 1] : '';

        return (
            <>
                <MuiLink href="/" color="inherit" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <HomeIcon fontSize="small" />
                </MuiLink>
                <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: 1, marginRight: 1, width: '12px', height: '12px', color: '#4F4F4F' }} />
                {pathSegments?.includes('cursos-virtuales') && (
                    <>
                        <MuiLink href="/cursos-virtuales" color="inherit" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" component="span" sx={{ color: '#4F4F4F', fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1rem' } }}>
                                Cursos Virtuales
                            </Typography>
                        </MuiLink>
                        {lastSegment !== 'cursos-virtuales' && (
                            <>
                                <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: 1, marginRight: 1, width: '12px', height: '12px', color: '#4F4F4F' }} />
                                <Typography variant="body1" component="span" sx={{ color: '#4F4F4F', fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1rem' } }}>
                                    {deslugify(lastSegment)}
                                </Typography>
                            </>
                        )}
                    </>
                )}
            </>
        );
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 4 }}>
            {renderPath()}
        </Box>
    );
};

export default Rutas;
