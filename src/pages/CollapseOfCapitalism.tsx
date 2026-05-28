import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Article.module.css';

const CollapseOfCapitalism: React.FC = () => {
    return (
        <div className={styles.articleWrapper}>
            <nav className={styles.nav}>
                <Link to="/?scrollTo=articles" className={styles.homeLink}>home</Link>
            </nav>

            <header className={styles.header}>
                <span className={styles.date}>27 dec, 2025</span>
                <h1 className={styles.title}>collapse of capitalism</h1>
                <p className={styles.subtitle}>
                    communism is our upcoming<br />
                    economic system
                </p>
            </header>

            <article className={styles.content}>
                <p className={styles.paragraph}>
                    yo, ill write about this soon. rn in usa for the rover project, will get back to writing when i can. just wanted to get the title out there. its gonna be a banger.
                </p>
            </article>
        </div>
    );
};

export default CollapseOfCapitalism;
