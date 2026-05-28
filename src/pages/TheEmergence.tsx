import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Article.module.css';

const TheEmergence: React.FC = () => {
    return (
        <div className={styles.articleWrapper}>
            <nav className={styles.nav}>
                <Link to="/?scrollTo=articles" className={styles.homeLink}>home</Link>
            </nav>

            <header className={styles.header}>
                <span className={styles.date}>25 dec, 2025</span>
                <h1 className={styles.title}>the emergence</h1>
                <p className={styles.subtitle}>
                    there is a pattern everywhere.<br />
                    a phenomenon that requires more attention
                </p>
            </header>

            <article className={styles.content}>
                <p className={styles.paragraph}>
                    there’s a pattern hiding in pretty much everything you do. not in an obvious way, not in a motivational-quote way, just quietly repeating itself across random, unrelated things. you notice it once, then it keeps showing up. atoms, neurons, people, code. simple stuff interacting, and then suddenly something appears that wasn’t there before.
                    <br /><br />
                    that moment is emergence.
                    <br /><br />
                    emergence is what you run into when zooming in stops helping. you can understand every component perfectly and still miss the point. the behavior you actually care about lives at a different level. not inside the parts, but in how they interact. the whole isn’t just larger, it’s operating differently.
                    <br /><br />
                    people usually split this idea into weak and strong emergence. weak emergence is the comfortable version. simple rules, surprising outcomes, but nothing fundamentally mysterious. traffic jams exist without accidents. ants build cities without knowing what a city is. you couldn’t predict it easily, but once it happens, you can trace it back. scale does the heavy lifting.
                    <br /><br />
                    strong emergence is where things get awkward. this is when the higher-level thing can’t be reduced back down, even in theory. the system starts pushing back on its own parts. consciousness usually ends up here. neurons fire, but the experience of thinking isn’t sitting inside any neuron. that gap makes people uneasy.
                    <br /><br />
                    the weird part is that emergence isn’t rare. it’s the default.
                    <br />
                    birds flock like they’re sharing a single mind. snowflakes form symmetry without instructions. water flips behavior when it freezes or boils, even though the molecules didn’t change. galaxies organize themselves into spirals through nothing but local gravity acting locally.
                    <br />
                    life feels like a long emergent accident. physics becomes chemistry, chemistry lines up just right, and biology happens. evolution runs experiments. intelligence shows up. consciousness follows. no blueprint, no goal, just interaction compounding over time.
                    <br />
                    technology makes this impossible to ignore. large language models do things they weren’t explicitly programmed to do. cellular automata run on dead-simple rules and produce motion and structure. the internet clogs itself in ways no one controls. systems cross a threshold and start behaving differently.
                    <br /><br />
                    society works the same way. language invents grammar without asking. markets discover prices without a central brain. cities grow messy, organic shapes because humans take shortcuts. culture, norms, hierarchies all emerge as side effects.
                    <br />
                    even objects play this game. a hammer can do something neither its parts can do alone. bronze isn’t just copper plus tin, it’s a new thing with new properties.
                    <br /><br />
                    a clean mental image is an orchestra. no instrument contains the symphony. the music exists only while they’re playing together.
                    <br />
                    motion makes it clearer. gravity isn’t really a pull, it’s spacetime doing geometry. water forms a vortex only while it’s flowing. block the drain and the pattern disappears, even though the water’s still there. life feels similar. not the parts, but the flow.
                    <br />
                    learning works the same way. at first everything feels fragmented. then it clicks. you’re not just adding information, you’ve moved up a level. complexity collapses into simplicity.
                    <br /><br />
                    this even happens mid-conversation. you start talking about a topic and suddenly you’re questioning why it exists at all. you slipped from content to meta without noticing. that shift itself is emergence.
                    <br />
                    in some sense, everything runs on this. atoms, minds, societies, universes. meaning doesn’t live inside components.
                    <br />
                    it shows up in between.
                </p>
            </article>
        </div>
    );
};

export default TheEmergence;
