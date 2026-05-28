import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './SkillsMarquee.module.css';

const skillsRow1 = ["3D Computer Vision", "Deep Neural Nets", "BCI / EEG", "Python", "Blender", "3ds Max", "VFX"];
const skillsRow2 = ["0→1 Products", "Fundraising", "GTM", "Marketing", "Learning to Sew", "Polymath", "Building"];

// Double the arrays to ensure seamless looping
const row1 = [...skillsRow1, ...skillsRow1];
const row2 = [...skillsRow2, ...skillsRow2];

const SkillsMarquee: React.FC = () => {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Continuous left-to-right or right-to-left animation
        gsap.to(row1Ref.current, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1
        });

        gsap.fromTo(row2Ref.current, {
            xPercent: -50
        }, {
            xPercent: 0,
            ease: "none",
            duration: 20,
            repeat: -1
        });

    }, []);

    return (
        <section className={styles.marqueeContainer}>
            <div className={styles.marqueeRow} ref={row1Ref}>
                {row1.map((skill, index) => (
                    <React.Fragment key={index}>
                        <span className={styles.skillItem}>{skill}</span>
                        <span className={styles.separator}>*</span>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.marqueeRow} ref={row2Ref}>
                {row2.map((skill, index) => (
                    <React.Fragment key={index}>
                        <span className={styles.skillItem}>{skill}</span>
                        <span className={styles.separator}>*</span>
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

export default SkillsMarquee;
