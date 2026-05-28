import React, { useState } from 'react';
import styles from './ResearchSection.module.css';

const researchPapers = [
    {
        title: "AWS-AN: Dataset Agnostic EEG Classification Architecture",
        publisher: "The 14th International Winter Conference on Brain-Computer Interfaces (BCI 2026)",
        description: "Our work introduces a step toward truly universal, calibration-efficient EEG intelligence by enabling a single adaptive architecture to generalize across diverse brain-computer interface paradigms, bringing us closer to practical real-world neuroprosthetic and human-AI systems; this research also earned me a competitive travel grant from ATLAS SkillTech University to present the paper in South Korea.",
        url: "https://ieeexplore.ieee.org/abstract/document/11435101"
    },
    {
        title: "IntEvoBCI: Human Intention Tracking",
        publisher: "2nd Congress on Intelligent Machines and Algorithms",
        description: "IntEvoBCI redefines brain-computer interfaces by enabling machines to evolve and interpret human intention in real time, mirroring the dynamics of human thought itself. By merging neuroscience, neuro-symbolic AI, and uncertainty-aware cognition, it opens the path toward safer, human-like AI systems for prosthetics, rehabilitation, and next-generation human-machine communication."
    }
];

const ResearchSection: React.FC = () => {
    // State to track which accordion is open. 0 means the first one is open by default.
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null); // Close if already open
        } else {
            setOpenIndex(index); // Open the clicked one
        }
    };

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.header}>research.</h2>

            <div className={styles.accordionContainer}>
                {researchPapers.map((paper, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div className={styles.accordionItem} key={index}>
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={isOpen}
                            >
                                <h3 className={styles.title}>{paper.title}</h3>
                                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>+</span>
                            </button>

                            <div className={`${styles.accordionContentWrapper} ${isOpen ? styles.accordionContentWrapperOpen : ''}`}>
                                <div className={styles.accordionContent}>
                                    <div className={styles.contentInner}>
                                        <div className={styles.publisher}>{paper.publisher}</div>
                                        <p className={styles.description}>
                                            {paper.description}
                                            {paper.url && (
                                                <a
                                                    href={paper.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.paperLink}
                                                >
                                                    read paper ↗
                                                </a>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ResearchSection;
