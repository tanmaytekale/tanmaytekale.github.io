import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ChairSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const ChairSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const chairRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%"
            }
        });

        tl.from(textRef.current, { x: 50, opacity: 0, duration: 0.8 })
            .from(chairRef.current, { scale: 0.9, opacity: 0, duration: 0.8 }, "-=0.6");
    }, { scope: containerRef });

    return (
        <div className={styles.chairWrapper} ref={containerRef}>
            <span className={styles.footerText} ref={textRef}>take a seat, relax.</span>
            <div className={styles.chair} ref={chairRef}>
                <img
                    src="/images/chair.png"
                    alt="chair"
                    className={styles.chairImg}
                    loading="lazy"
                />
            </div>
            <div className={styles.footerLinks}>
                <a href="https://linkedin.com/in/tanmaytekale" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>linkedin</a>
                <a href="https://x.com/tanmaytekale" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>twitter</a>
                <a href="https://github.com/tanmaytekale" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>github</a>
                <a href="https://instagram.com/tanmaytekale" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>instagram</a>
            </div>
        </div>
    );
};

export default ChairSection;
