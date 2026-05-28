import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ArticlesSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const ArticlesSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(`.${styles.item}`, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%"
            },
            y: 20, opacity: 0, stagger: 0.1, duration: 0.5
        });
    }, { scope: containerRef });

    return (
        <div id="articles" className={styles.experience} ref={containerRef}>
            <span className={styles.headerText}>wanna read some?</span>
            <div className={styles.rows}>
                <Link to="/the-emergence" className={styles.item}>
                    <span className={styles.itemTitle}>the emergence</span>
                    <span className={styles.itemNumber}>001</span>
                </Link>
                <Link to="/intelligence-singularity" className={styles.item}>
                    <span className={styles.itemTitle}>intelligence singularity</span>
                    <span className={styles.itemNumber}>002</span>
                </Link>
                <Link to="/collapse-of-capitalism" className={styles.item}>
                    <span className={styles.itemTitle}>collapse of capitalism</span>
                    <span className={styles.itemNumber}>003</span>
                </Link>
            </div>
        </div>
    );
};

export default ArticlesSection;
