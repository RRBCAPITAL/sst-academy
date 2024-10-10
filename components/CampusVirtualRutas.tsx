"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import { Box, Typography, Link as MuiLink } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { deslugify } from '@/utils/deslugify';

const CampusVirtualRutas = () => {
    const pathname = usePathname();

    const renderPath = () => {
        const pathSegments = pathname?.split('/').filter(Boolean);
        const lastSegment = pathSegments ? pathSegments[pathSegments.length - 1] : '';

        return (
            <>

                {pathSegments?.includes('campus-virtual') && pathSegments?.includes('curso') && (
                    <>
                                        <MuiLink href="/" color="inherit" sx={{color: '#737373', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <HomeIcon fontSize="small" />
                </MuiLink>
                <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: 1, marginRight: 1, width: '12px', height: '12px', color: '#737373', }} />
                        <MuiLink href="/" color="inherit" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" component="span" sx={{ color: '#737373', fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1rem' } }}>
                            Programas de Especialización
                            </Typography>
                        </MuiLink>
                        {lastSegment !== 'cursos-virtuales' && (
                            <>
                                <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: 1, marginRight: 1, width: '12px', height: '12px', color: '#737373', }} />
                                <Typography variant="body1" component="span" sx={{ color: '#737373', fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1rem' } }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: 4, marginLeft: '100px' }}>
            {renderPath()}
        </Box>
    );
};

export default CampusVirtualRutas;
