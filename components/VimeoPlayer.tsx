// components/VimeoPlayer.tsx
import React, { useEffect } from 'react';

interface VimeoPlayerProps {
    video_url: string;
}


const VimeoPlayer = (props: VimeoPlayerProps) => {
    useEffect(() => {
        // Verifica si el script de Vimeo ya está cargado
        if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
            const script = document.createElement('script');
            script.src = "https://player.vimeo.com/api/player.js";
            script.async = true;
            document.body.appendChild(script);

            return () => {
                // Limpieza del script al desmontar el componente
                document.body.removeChild(script);
            };
        }
    }, []);

    if (!props.video_url) {
        return <div></div>;
    }

    return (
        // <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
                //src="https://player.vimeo.com/video/1003732755?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                src={`${props.video_url}`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                title="U1_Lección 1"
            ></iframe>
    );
};

export default VimeoPlayer;
