import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingHero from '../components/LandingHero';
import IntroSection from '../components/IntroSection';
import ResumeExperience from '../components/ResumeExperience';
import ResearchSection from '../components/ResearchSection';
import ProjectsSection from '../components/ProjectsSection';
import InterestsSection from '../components/InterestsSection';
import ArticlesSection from '../components/ArticlesSection';
import ChairSection from '../components/ChairSection';
import styles from '../App.module.css';

const Home: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('scrollTo') === 'articles') {
            const el = document.getElementById('articles');
            if (el) {
                // Short timeout ensures the DOM has fully rendered the sections before jumping
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'auto' });
                    // Clean up the URL so it doesn't break Vite on refresh
                    window.history.replaceState({}, '', window.location.pathname);
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            <LandingHero />
            <div className={styles.mainContent}>
                <IntroSection />
                <ResumeExperience />
                <ResearchSection />
                <ProjectsSection />
                <InterestsSection />
                <ArticlesSection />
                <ChairSection />
            </div>
        </>
    );
};

export default Home;
