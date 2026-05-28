import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './InterestsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const InterestsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(`.${styles.gallery}`, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%"
            },
            opacity: 0, y: 50, duration: 0.8
        });
    }, { scope: containerRef });

    return (
        <div className={styles.interestsWrapper} ref={containerRef}>
            <div className={styles.body}>
                <div className={styles.mainContent}>
                    <h2 className={styles.quote}>
                        “to fuck around is human,<br /> &nbsp;&nbsp;to find out is divine.”
                    </h2>
                    <p className={styles.paragraph}>
                        i absolutely love how self glazing and performative this website is, but just trying to portray a true picture of me. my philosophy is to love what i do, and have fun while doing it.
                    </p>
                </div>
            </div>

            <div className={styles.gallery}>
                <div className={styles.imageContainer1}>
                    <div className={styles.imageInner1}>
                        {/* Image 1 had NO object-fit in legacy, so it uses .img (stretched) */}
                        <img src="/radical-creativity.github.io/images/gallery-1.jpg" alt="Gallery 1" className={styles.img} loading="lazy" />
                    </div>
                </div>
                <div className={styles.imageContainer2}>
                    <div className={styles.imageInner2}>
                        {/* Image 2 HAD object-fit: cover in legacy */}
                        <img src="/radical-creativity.github.io/images/gallery-2.jpg" alt="Gallery 2" className={styles.imgCover} loading="lazy" />
                    </div>
                </div>
                <div className={styles.imageContainer3}>
                    <div className={styles.imageInner3}>
                        {/* Image 3 had NO object-fit in legacy */}
                        <img src="/radical-creativity.github.io/images/gallery-3.jpg" alt="Gallery 3" className={styles.img} loading="lazy" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterestsSection;
