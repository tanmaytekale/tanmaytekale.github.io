import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './IntroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const IntroSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        gsap.from(headerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%"
            },
            x: -50, opacity: 0, duration: 0.8
        });

        gsap.from(`.${styles.image}`, {
            scrollTrigger: {
                trigger: `.${styles.feature}`,
                start: "top 80%"
            },
            scale: 0.9, opacity: 0, duration: 0.8
        });

    }, { scope: containerRef });

    return (
        <div className={styles.introWrapper} ref={containerRef}>
            <div className={styles.heroSub}>
                <h2 className={styles.header} ref={headerRef}>hello?</h2>
            </div>

            <div className={styles.feature}>
                <div className={styles.imageContainer}>
                    <div className={styles.imageInner}>
                        <img
                            src="/radical-creativity.github.io/images/profile-feature.png"
                            alt="Feature"
                            className={styles.image}
                        />
                    </div>
                </div>
                <div className={styles.textContainer}>
                    <h3 className={styles.subHeader}>i am tanmay</h3>
                    <p className={styles.paragraph}>
                        i'm 19, based in mumbai, doing my undergrad and working on projects. i try to treat life like a polymath experiment. outside of work: training for ironman 70.3 and everest base camp, making electronic music, learning to sew. genuinely bullish on BCI.
                    </p>
                    <p className={styles.paragraph}>
                        i LOVE doing everything everywhere, all at once. the type of guy who says yes to every opportunity and make it happen. i sincerely do it for the lore.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
