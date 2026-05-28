import React, { useRef, useLayoutEffect } from 'react';
import styles from './ProjectsSection.module.css';

const baseProjects = [
    {
        name: "IntEvoBCI",
        description: "A Hybrid Architecture Fusing Deep Memory and Dynamic Neural Fields for Intention Decoding.",
        url: "https://github.com/tanmaytekale/IntEvoBCI"
    },
    {
        name: "Repro3DGS",
        description: "Deployment focused and beginner friendly 3D Gaussian Splatting environment that automates setup and dependency management.",
        url: "https://github.com/tanmaytekale/Repro3DGS"
    },
    {
        name: "apollo-scraper",
        description: "Apollo Free Email Scraper is a Chrome extension designed to simplify the process of scraping data from web pages with just a single click.",
        url: "https://github.com/tanmaytekale/apollo-scraper"
    },
    {
        name: "rewind-website",
        description: "On going hardware project that captures your 3d view and the current state of emotions, and store it as a memory.",
        url: "https://github.com/tanmaytekale/rewind-website.github.io"
    },
    {
        name: "chrome-tabs-saver",
        description: "A sleek tool to instantly save and manage your browser tabs.",
        url: "https://github.com/tanmaytekale/chrome-tabs-saver"
    }
];

// Create a massively duplicated array to simulate infinite scroll without complex math
const infiniteProjects = Array(50).fill(baseProjects).flat();

const ProjectsSection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Start in the exact middle of the 50 repeated blocks so the user can scroll both ways endlessly
        if (scrollRef.current) {
            const middleIndex = Math.floor(infiniteProjects.length / 2);
            // approximate card width + gap (450px + 3rem/48px)
            scrollRef.current.scrollLeft = middleIndex * 498;
        }
    }, []);

    const getScrollAmount = () => {
        if (!scrollRef.current) return 498;
        const card = scrollRef.current.querySelector(`.${styles.card}`);
        if (!card) return 498;
        const gap = parseFloat(getComputedStyle(scrollRef.current).gap) || 48;
        return card.clientWidth + gap;
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.header}>projects.</h2>
                    <a
                        href="https://github.com/tanmaytekale"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubSublink}
                    >
                        github ↗
                    </a>
                </div>
                <div className={styles.controls}>
                    <button className={styles.scrollButton} onClick={scrollLeft} aria-label="Scroll left">←</button>
                    <button className={styles.scrollButton} onClick={scrollRight} aria-label="Scroll right">→</button>
                </div>
            </div>

            <div className={styles.scrollTrack} ref={scrollRef}>
                {infiniteProjects.map((project, index) => (
                    <div className={styles.card} key={index}>
                        <h3 className={styles.title}>{project.name}</h3>
                        <p className={styles.description}>{project.description}</p>
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkButton}
                        >
                            View on GitHub ↗
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;
