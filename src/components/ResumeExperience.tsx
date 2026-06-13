import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ResumeExperience.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
    title: string;
    company: string;
    date: string;
    url?: string;
    points: string[];
}

const experiences: Experience[] = [
    {
        title: "Founder",
        company: "Polycosmos",
        date: "Jun 2024 — present",
        url: "https://www.polycosmos.in",
        points: [
            "building an AI avatar creation & orchestration platform: 3D computer vision, solo.",
            "shipped VTON proof-of-concept with House of Masaba in 2024. real brand, real output.",
            "selected buildspace N&W s5. most who get in don't ship. shipped."
        ]
    },
    {
        title: "R&D intern",
        company: "Eccentric",
        date: "Jun 2026 — present",
        url: "https://www.weareeccentric.com",
        points: [
            "working on 3d gaussian splatting and comfyui."
        ]
    },
    {
        title: "Project Manager",
        company: "Team Mushak",
        date: "Sep 2025 — May 2026",
        url: "https://www.teammushak.in",
        points: [
            "built an autonomous lunar rover that performs sampling tasks for treacherous terrain.",
            "managed the full team across engineering, ops, media.",
            "raised $30K from Emergent Ventures.",
            "top 7 / 56 universities at NASA HERC 2026, Huntsville AL. 2 international awards."
        ]
    },
    {
        title: "AI Engineer",
        company: "Reliable Capital",
        date: "Mar — Nov 2024",
        points: [
            "built deep neural nets to predict stock price movements on a ~$35K live portfolio using technical indicators. designed, trained, deployed — solo."
        ]
    },
    {
        title: "Founder",
        company: "ykz",
        date: "May 2023 — Feb 2025",
        url: "https://www.ykz.com",
        points: [
            "marketing agency in high school. ₹4L seed. 7 full-time. fashion & consumer brands.",
            "killed it at 21 months. operations broke before scale could. best education I've had."
        ]
    },
    {
        title: "Co-Host",
        company: "Philosophy Connect",
        date: "Nov 2024 — present",
        url: "https://www.instagram.com/connect_philosophy/",
        points: [
            "built a 450+ thinker philosophy community in mumbai.",
            "monthly meetups, 35 people showing up to argue about existence."
        ]
    },
    {
        title: "Cyber Security Analyst",
        company: "GlobalShala",
        date: "Sep 2022 — Oct 2022",
        points: [
            "learned the fundamentals of cybersecurity from a defense and an attacking point of view.",
            "used various tools to analyze the vulnerabilities and cure them."
        ]
    },
    {
        title: "Digital Marketing Manager",
        company: "LEARNOVATE ECOMMERCE",
        date: "Nov 2021 — Dec 2021",
        points: [
            "learned and worked on canva, photoshop, facebook, and instagram ads."
        ]
    },
    {
        title: "Freelance",
        company: "vfx  → 3d animator",
        date: "2017 — 2022",
        points: [
            "paid client work in Blender, 3ds Max, Photoshop from age 9. this is where it started."
        ]
    }
];

const ResumeExperience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<Element>(`.${styles.card}`);

        cards.forEach((card) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Starts animating when the top of the card is 85% down the viewport
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section className={styles.wrapper} ref={containerRef}>
            <div className={styles.centeredTextContainer}>
                <h2 className={styles.header}>some grind</h2>
            </div>

            <div className={styles.cardsContainer}>
                {experiences.map((exp, index) => (
                    <div className={styles.card} key={index}>
                        <h3 className={styles.title}>{exp.title}</h3>
                        <div className={styles.companyDate}>
                            {exp.url ? (
                                <a href={exp.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>{exp.company}</span>
                                    <span style={{ fontSize: '0.8rem' }}>↗</span>
                                </a>
                            ) : (
                                <span>{exp.company}</span>
                            )}
                            <span className={styles.date}>{exp.date}</span>
                        </div>
                        <ul className={styles.pointsList}>
                            {exp.points.map((point: string, i: number) => (
                                <li key={i} className={styles.point}>
                                    <span className={styles.arrow}>→</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ResumeExperience;
