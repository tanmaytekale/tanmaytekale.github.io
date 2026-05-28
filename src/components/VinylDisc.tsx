import React, { forwardRef } from 'react';
import styles from './VinylDisc.module.css';

interface VinylDiscProps {
    cover: string;
    isActive?: boolean; // For future opacity logic
    className?: string;
    style?: React.CSSProperties;
}

const VinylDisc = forwardRef<HTMLDivElement, VinylDiscProps>(({ cover, className, style }, ref) => {
    return (
        <div className={`${styles.container} ${className || ''}`} style={style} ref={ref}>
            <img
                src={import.meta.env.BASE_URL + "record player assets/vinyl.png"}
                alt="Vinyl Record"
                className={styles.vinyl}
                draggable={false}
            />
            <img
                src={cover}
                alt="Album Cover"
                className={styles.cover}
                draggable={false}
            />
        </div>
    );
});

export default VinylDisc;
