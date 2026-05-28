import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './LandingHero.module.css';

const LandingHero: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const deviceRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(titleRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
            .from(deviceRef.current, { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5");
    }, { scope: containerRef });

    return (
        <section className={styles.hero} ref={containerRef}>
            <div className={styles.textContainer}>
                <h1 className={styles.title} ref={titleRef}>
                    <span className={styles.titleLine}>radical</span>
                    <br />
                    <span className={styles.titleLine}>creativity</span>
                </h1>
            </div>
            <div className={styles.deviceFrame} ref={deviceRef}>
                <div className={styles.deviceImageContainer}>
                    <img
                        src="/images/device-frame.jpg"
                        alt="Device frame"
                        className={styles.deviceImage}
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingHero;
