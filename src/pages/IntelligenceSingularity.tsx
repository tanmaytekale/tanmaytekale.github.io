import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Article.module.css';

const IntelligenceSingularity: React.FC = () => {
    return (
        <div className={styles.articleWrapper}>
            <nav className={styles.nav}>
                <Link to="/?scrollTo=articles" className={styles.homeLink}>home</Link>
            </nav>

            <header className={styles.header}>
                <span className={styles.date}>26 dec, 2025</span>
                <h1 className={styles.title}>intelligence singularity</h1>
                <p className={styles.subtitle}>
                    intelligence keeps collapsing the gap between thought and reality.
                </p>
            </header>

            <article className={styles.content}>
                <p className={styles.paragraph}>
                    quick disclaimer before this goes anywhere: this is speculative. borderline sci-fi in places. but the core ideas are grounded in how technology, neuroscience, and computation already work today. think of it less like a prediction and more like a trajectory pushed to its logical extreme.
                    <br /><br />
                    there’s a pattern in how humans reduce effort. every major leap in technology is just us collapsing steps. fire reduced the effort to digest food. tools reduced physical strain. computers reduced cognitive load. the internet reduced distance. ai is reducing thinking-as-labor. bci is just the next compression.
                    <br /><br />
                    i’m extremely bullish on brain–computer interfaces. not in a “cool demo” way, but in a “this becomes boring and normal” way. a chip in your brain making your life easier won’t feel radical for long. it’ll feel like glasses. like smartphones. like something you forget you’re even using.
                    <br /><br />
                    the real objective of bci isn’t mind control or superpowers. it’s reducing the friction between intent and outcome. right now, even the simplest idea has insane overhead. you think a thought. decide to act. move your arm. pick up your phone. unlock it. open an app. type with fingers. wait. read. interpret. respond. that entire pipeline is absurdly slow.
                    <br />
                    imagine compressing all of that into milliseconds. you think the question, and the answer is just… there. not read. not typed. just integrated. it sounds ambitious, almost naive, but that’s literally what interfaces do. they remove steps. bci just removes the body as middleware.
                    <br /><br />
                    once you put ai inside the loop, something more interesting happens. at first, it’s a tool. an assistant. autocomplete for thoughts. but over time, the boundary starts dissolving. the ai learns your patterns, preferences, abstractions. you offload memory, reasoning, simulation. eventually, it stops making sense to say “you” and “the ai” separately. it becomes one coupled system. a single intelligence distributed across biology and silicon.
                    <br /><br />
                    this isn’t sudden. it’s gradual. just like how your phone already feels like an extension of your memory. just tighter. faster. deeper.
                    <br />
                    push this far enough and intelligence itself changes shape. each human brain becomes a high-bandwidth node. edge computing, but biological. your brain doesn’t just consume intelligence, it produces it. inference happens locally. creativity happens locally. learning happens locally. now connect these nodes.
                    <br /><br />
                    at that point, humans aren’t just individuals anymore. they’re a network. not metaphorically. literally. shared context. shared abstractions. shared models of reality. communication stops being language-based and becomes state-based. you don’t explain ideas, you transmit them.
                    <br />
                    when intelligence reaches that scale, physical reality starts feeling inefficient. bodies are fragile. space is slow. energy is wasted maintaining biology. it becomes rational, not dystopian, to move inward. to simulate. to virtualize experience.
                    <br /><br />
                    a matrix-like system stops sounding insane and starts sounding optimized. humans live inside high-fidelity simulations. bodies are maintained as machines. experience is decoupled from physical constraints. suffering, scarcity, distance—all optional parameters now.
                    <br />
                    this isn’t about escape. it’s about efficiency. the same reason we moved from letters to email, from travel to video calls, from memory to cloud storage.
                    <br /><br />
                    whether this future is good or bad isn’t the point. good and bad are human-scale judgments. what matters is momentum. intelligence tends to minimize friction. systems tend to optimize themselves. once the tools exist, not using them becomes the unnatural choice.
                    <br />
                    this might never happen exactly like this. timelines could stretch. forms could change. but the direction feels consistent.
                    <br />
                    collapse steps. merge systems. network intelligence.
                    <br />
                    and at some point, reality itself becomes just another interface.
                </p>
            </article>
        </div>
    );
};

export default IntelligenceSingularity;
