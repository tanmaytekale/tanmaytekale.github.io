import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from "gsap/all";
import styles from './Gramophone.module.css';
import { TRACKS } from '../data/tracks';
import VinylDisc from './VinylDisc';

gsap.registerPlugin(Draggable);

const Gramophone: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const tonearmRef = useRef<HTMLImageElement>(null);
    const lightRef = useRef<HTMLImageElement>(null);
    const knobRef = useRef<HTMLImageElement>(null);
    const timeline = useRef<gsap.core.Timeline | null>(null);

    // Make isMobile reactive - Initialize with function to get immediate value if window exists
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

    // Vinyl Carousel State
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
    const [currentRecord, setCurrentRecord] = useState<typeof TRACKS[0] | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const proxyVinylRef = useRef<HTMLDivElement>(null);
    const proxyDraggableRef = useRef<Draggable[] | null>(null);
    const platterRef = useRef<HTMLDivElement>(null);

    // Audio Logic
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false); // Controls Spin & Audio

    // Gramophone Hint State (appears on every page load)
    const [showHint, setShowHint] = useState(true);
    const hintRef = useRef<HTMLDivElement>(null);

    // Dismiss hint if drawer is opened
    useEffect(() => {
        if (isOpen) {
            setShowHint(false);
        }
    }, [isOpen]);

    const handleCloseHint = () => {
        if (hintRef.current) {
            gsap.to(hintRef.current, {
                opacity: 0,
                y: -10,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => setShowHint(false)
            });
        } else {
            setShowHint(false);
        }
    };

    useGSAP(() => {
        if (showHint && hintRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(hintRef.current, 
                { opacity: 0, y: 15, scale: 0.9 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
            tl.to(hintRef.current, 
                { opacity: 0, y: -10, scale: 0.95, duration: 0.5, delay: 10, ease: "power2.in", onComplete: () => setShowHint(false) }
            );
        }
    }, { scope: hintRef, dependencies: [showHint] });

    // Initialize Audio Object
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Load Track when Record Changes
    useEffect(() => {
        if (currentRecord && audioRef.current) {
            audioRef.current.src = currentRecord.src;
            // If we were playing, stop? Or allow hot swap? 
            // Gramophone logic: New record = Reset tonearm usually.
            // We'll handle this in the DragEnd of Proxy.
        }
    }, [currentRecord]);

    // Sync Playback with State
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Audio Play Error:", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const handleScroll = useCallback(() => {
        if (!carouselRef.current) return;

        const scrollLeft = carouselRef.current.scrollLeft;
        // O(1) Math: Each item is 150px wide + 20px gap = 170px total width step
        const index = Math.max(0, Math.min(TRACKS.length - 1, Math.round(scrollLeft / 170)));
        const closestId = TRACKS[index]?.id;

        if (closestId && closestId !== activeTrackId) {
            setActiveTrackId(closestId);
        }
    }, [activeTrackId]);

    // Initial center calculation
    useEffect(() => {
        handleScroll();
    }, [isMobile, isOpen, handleScroll]); // Re-calc on resize/open

    useEffect(() => {
        // Redundant check in case of resize, but the initial state above helps startup
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleGramophone = () => {
        setIsOpen(!isOpen);
    };

    useGSAP(() => {
        // Kill previous timeline if it exists to avoid conflicts when switching modes
        if (timeline.current) timeline.current.kill();

        const tl = gsap.timeline({ paused: true });

        if (isMobile) {
            // Mobile Animation: Use autoAlpha for robust show/hide (handles visibility + opacity)
            tl.to(drawerRef.current, {
                autoAlpha: 1, // goes to opacity: 1, visibility: visible
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            // Desktop Animation: Slide out from left
            // FORCE autoAlpha: 1 just in case, ensuring it's visible
            tl.to(drawerRef.current, {
                left: 0,
                autoAlpha: 1, // Safety measure
                duration: 0.8,
                ease: "power3.inOut"
            })
                .to(`.${styles.toggleButton}`, {
                    left: 650, // Move button with drawer (match new width)
                    duration: 0.8,
                    ease: "power3.inOut"
                }, "<");
        }

        timeline.current = tl;

        // If state is already open (e.g. after resize), ensure we are at the end of the timeline
        if (isOpen) {
            tl.progress(1);
        }

    }, { scope: containerRef, dependencies: [isMobile] }); // Re-run when isMobile changes

    useGSAP(() => {
        if (!tonearmRef.current) return;

        // Helper to get fresh bounds
        const getBounds = () => {
            const style = getComputedStyle(tonearmRef.current!);
            const minRot = parseFloat(style.getPropertyValue('--min-rotation')) || -180;
            const maxRot = parseFloat(style.getPropertyValue('--max-rotation')) || 180;
            return { minRot, maxRot };
        };

        const { minRot: initialMin, maxRot: initialMax } = getBounds();

        Draggable.create(tonearmRef.current, {
            type: "rotation",
            inertia: true,
            bounds: { minRotation: initialMin, maxRotation: initialMax }, // Note: Bounds are set at creation. Refresh helps, but strict constraint might need appliedBounds.
            onDrag: function () {
                // console.log("Tonearm Angle:", this.rotation);
            },
            onDragEnd: function () {
                // Read FRESH values here to ensure snapping is correct even if bounds were slightly stale
                const { minRot, maxRot } = getBounds();
                const midPoint = (minRot + maxRot) / 2;

                // Logic: if past midpoint, go to max.
                const isPlaying = this.rotation > midPoint;
                const targetRotation = isPlaying ? maxRot : minRot;

                console.log(`[Gramophone] DragEnd: Rot=${this.rotation.toFixed(2)}, Min=${minRot}, Max=${maxRot}, Target=${targetRotation}, Light=${isPlaying ? 'ON' : 'OFF'}`);

                // Snap Tonearm
                gsap.to(this.target, {
                    rotation: targetRotation,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: true,
                    onComplete: () => {
                        // Only start playing AFTER snap animation finishes (simulating needle drop)
                        if (isPlaying) setIsPlaying(true);
                    }
                });

                // Toggle Light & Sync Playback State (Immediate feedback? Or wait for needle?)
                // User said: "Vinyl only start spinning once tonearm reaches max angle"
                // So set state HERE if we want it to happen when it decides target, or onComplete above.
                // Let's set it immediately for responsiveness, but maybe the visual spin waits?
                // Actually, "once reaches" implies onComplete or strict sync. 
                // Let's use the 'isPlaying' logic variable we calculated.

                if (isPlaying) {
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }

                if (lightRef.current) {
                    gsap.to(lightRef.current, {
                        opacity: isPlaying ? 1 : 0,
                        duration: 0.1,
                        overwrite: true
                    });
                }
            }
        });
    }, { scope: containerRef }); // Run once to setup draggable

    useGSAP(() => {
        if (!knobRef.current) return;

        // Set initial state to Max Volume (140deg = 100%)
        gsap.set(knobRef.current, { rotation: 140 });

        Draggable.create(knobRef.current, {
            type: "rotation",
            inertia: true,
            bounds: { minRotation: -140, maxRotation: 140 },
            onDrag: function () {
                const rotation = this.rotation;
                // Map -140..140 to 0..1
                const normalized = rotation + 140; // 0..280
                const volume = Math.max(0, Math.min(1, normalized / 280)); // 0..1

                if (audioRef.current) {
                    audioRef.current.volume = volume;
                }
                // console.log(`[Gramophone] Volume: ${volume.toFixed(2)}`);
            }
        });
    }, { scope: containerRef });

    // Proxy Vinyl Draggable Logic (with liveSnap)
    useGSAP(() => {
        if (!proxyVinylRef.current) return;

        let snapX = 0;
        let snapY = 0;
        let hasSnapTarget = false;

        const d = Draggable.create(proxyVinylRef.current, {
            type: "x,y",
            zIndexBoost: false,
            onPress: function () {
                hasSnapTarget = false;
            },
            onDragStart: function () {
                hasSnapTarget = false;
            },
            liveSnap: {
                points: function (point: { x: number, y: number }) {
                    // Lazy Calculate Snap Target
                    if (!hasSnapTarget) {
                        if (platterRef.current && proxyVinylRef.current) {
                            const platterRect = platterRef.current.getBoundingClientRect();
                            const proxyRect = proxyVinylRef.current.getBoundingClientRect(); // Position BEFORE this drag frame applies

                            const startProxyCenterX = proxyRect.left + proxyRect.width / 2;
                            const startProxyCenterY = proxyRect.top + proxyRect.height / 2;

                            const platterCenterX = platterRect.left + platterRect.width / 2;
                            const platterCenterY = platterRect.top + platterRect.height / 2;

                            snapX = platterCenterX - startProxyCenterX;
                            snapY = platterCenterY - startProxyCenterY;
                            hasSnapTarget = true;
                        }
                    }

                    if (!hasSnapTarget) return point;

                    const dx = point.x - snapX;
                    const dy = point.y - snapY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Magnetic Radius: 100px
                    if (dist < 100) {
                        return { x: snapX, y: snapY };
                    }
                    return point;
                }
            },
            onDragEnd: function () {
                const proxy = this.target as HTMLElement;

                const dx = this.x - snapX;
                const dy = this.y - snapY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (hasSnapTarget && dist < 5) { // Snapped!
                    // 1. Update State (Real Record Appears)
                    const track = TRACKS.find(t => t.id === activeTrackId);
                    if (track) {
                        setCurrentRecord(track);
                        setIsPlaying(false); // Instantly pause audio for the new record

                        // Force Tonearm back to resting position
                        if (tonearmRef.current) {
                            const style = getComputedStyle(tonearmRef.current);
                            const minRot = parseFloat(style.getPropertyValue('--min-rotation')) || 1;
                            gsap.to(tonearmRef.current, {
                                rotation: minRot,
                                duration: 0.8,
                                ease: "power2.out",
                                overwrite: true
                            });
                        }

                        // Turn off the light
                        if (lightRef.current) {
                            gsap.to(lightRef.current, {
                                opacity: 0,
                                duration: 0.2,
                                overwrite: true
                            });
                        }
                    }

                    // 2. Animate Disappear/Reset
                    if (platterRef.current) {
                        const platterRect = platterRef.current.getBoundingClientRect();
                        const scale = platterRect.width / (proxy.offsetWidth / 1.1);
                        gsap.to(proxy, { scale: scale, duration: 0.1 });
                    }

                    gsap.to(proxy, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            proxy.classList.remove(styles.activeDrag);
                            gsap.set(proxy, { x: 0, y: 0, scale: 1.1, opacity: 1 });
                        }
                    });
                } else {
                    // Snap back to carousel
                    gsap.to(this.target, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        onComplete: () => {
                            proxy.classList.remove(styles.activeDrag);
                        }
                    });
                }
            }
        });
        proxyDraggableRef.current = d;
    }, { scope: containerRef, dependencies: [activeTrackId] });

    // Native Scroll is used for X-axis (CSS Scroll Snap).
    // We only need JS to detect "Drag Up" to Pick Up the record (Handoff).
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let startX = 0;
        let startY = 0;
        let isDragging = false;

        const onPointerDown = (e: PointerEvent) => {
            // Only care if touching a carousel item
            if (!(e.target as HTMLElement).closest('.carousel-item')) return;

            startX = e.clientX;
            startY = e.clientY;
            isDragging = true;
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging) return;

            const deltaY = e.clientY - startY;
            const deltaX = Math.abs(e.clientX - startX);

            // Logic: If dragged UP significantly (> 20px) and MORE than sideways
            if (deltaY < -20 && Math.abs(deltaY) > deltaX) {
                // Dragging UP!
                e.preventDefault();
                isDragging = false; // Stop checking

                // Wake up Proxy
                if (proxyVinylRef.current && proxyDraggableRef.current) {
                    proxyVinylRef.current.classList.add(styles.activeDrag);

                    // Manually start GSAP drag on proxy
                    proxyDraggableRef.current[0].startDrag(e as unknown as MouseEvent);
                }
            }
        };

        const onPointerUp = () => {
            isDragging = false;
        };

        carousel.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        return () => {
            carousel.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
        };
    }, [activeTrackId]); // Re-attach if track changes (mostly safe to be static, but keeps context fresh)

    // 1. CAROUSEL WHEEL HANDLER (Vertical Wheel -> Horizontal Scroll)
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const onCarouselWheel = (e: WheelEvent) => {
            if (e.ctrlKey) return;

            // If the scroll is primarily horizontal (like trackpad horizontal swipe),
            // let the browser handle it natively.
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                // Stop the event from reaching the drawer wheel handler (so it doesn't block horizontal scroll),
                // but DO NOT call e.preventDefault(), allowing native horizontal scroll to occur.
                e.stopPropagation();
                return;
            }

            // Manual Horizontal Scroll using Vertical Wheel (for mouse wheel users)
            carousel.scrollLeft += e.deltaY;

            // Prevent vertical page scroll
            e.preventDefault();

            // Stop this event from reaching the drawer handler (or document)
            e.stopPropagation();
        };

        // Non-passive to allow preventDefault
        carousel.addEventListener('wheel', onCarouselWheel, { passive: false });
        return () => carousel.removeEventListener('wheel', onCarouselWheel);
    }, []);

    // 2. DRAWER WHEEL HANDLER (Block Background Scroll)
    useEffect(() => {
        const drawer = drawerRef.current;
        if (!drawer) return;

        const onDrawerWheel = (e: WheelEvent) => {
            if (e.ctrlKey) return;

            // If the event reaches here, it means it wasn't stopped by the carousel handler.
            // So we are wheeling on the wood/active drawer area.
            // We want to BLOCK the background site from scrolling.
            e.preventDefault();
        };

        drawer.addEventListener('wheel', onDrawerWheel, { passive: false });
        // NOTE: We do NOT need to remove it strictly if the component never unmounts, but good practice.
        return () => drawer.removeEventListener('wheel', onDrawerWheel);
    }, []);

    useEffect(() => {
        if (timeline.current) {
            if (isOpen) {
                timeline.current.play();
                // Lock body scroll on mobile
                if (isMobile) {
                    document.body.style.overflow = 'hidden';
                }
            } else {
                timeline.current.reverse();
                // Unlock body scroll
                document.body.style.overflow = '';
            }
        }

        // Cleanup lock on unmount
        return () => { document.body.style.overflow = ''; };
    }, [isOpen, isMobile]);

    const animateRecordToPlatter = (track: typeof TRACKS[0]) => {
        if (!platterRef.current || !proxyVinylRef.current) return;

        // Ensure proxy element is visible
        proxyVinylRef.current.classList.add(styles.activeDrag);

        const platterRect = platterRef.current.getBoundingClientRect();
        const proxyRect = proxyVinylRef.current.getBoundingClientRect();

        const startProxyCenterX = proxyRect.left + proxyRect.width / 2;
        const startProxyCenterY = proxyRect.top + proxyRect.height / 2;

        const platterCenterX = platterRect.left + platterRect.width / 2;
        const platterCenterY = platterRect.top + platterRect.height / 2;

        const destX = platterCenterX - startProxyCenterX;
        const destY = platterCenterY - startProxyCenterY;

        // Calculate target scale relative to initial proxy width
        const targetScale = platterRect.width / (proxyVinylRef.current.offsetWidth / 1.1);

        // Kill any active GSAP animations on proxy
        gsap.killTweensOf(proxyVinylRef.current);

        gsap.timeline()
            .fromTo(proxyVinylRef.current,
                { x: 0, y: 0, scale: 1.1, opacity: 1, rotation: 0 },
                {
                    x: destX,
                    y: destY,
                    scale: targetScale,
                    rotation: 360,
                    duration: 0.8,
                    ease: "power2.inOut",
                }
            )
            .to(proxyVinylRef.current, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    if (proxyVinylRef.current) {
                        proxyVinylRef.current.classList.remove(styles.activeDrag);
                        gsap.set(proxyVinylRef.current, { x: 0, y: 0, scale: 1.1, opacity: 1, rotation: 0 });
                    }

                    setCurrentRecord(track);
                    setIsPlaying(false);

                    // Force Tonearm back to resting position
                    if (tonearmRef.current) {
                        const style = getComputedStyle(tonearmRef.current);
                        const minRot = parseFloat(style.getPropertyValue('--min-rotation')) || 1;
                        gsap.to(tonearmRef.current, {
                            rotation: minRot,
                            duration: 0.8,
                            ease: "power2.out",
                            overwrite: true
                        });
                    }

                    // Turn off the light
                    if (lightRef.current) {
                        gsap.to(lightRef.current, {
                            opacity: 0,
                            duration: 0.2,
                            overwrite: true
                        });
                    }
                }
            });
    };

    const handleCarouselItemClick = (track: typeof TRACKS[0]) => {
        if (track.id === activeTrackId) {
            animateRecordToPlatter(track);
        } else {
            const index = TRACKS.findIndex(t => t.id === track.id);
            if (index !== -1 && carouselRef.current) {
                carouselRef.current.scrollTo({
                    left: index * 170,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {showHint && (
                <div className={styles.hintBubble} ref={hintRef}>
                    <button className={styles.closeHint} onClick={handleCloseHint} aria-label="Close hint">×</button>
                    <span>you can listen to songs while you enjoy the website.</span>
                    <div className={styles.hintArrow} />
                </div>
            )}

            <div
                className={styles.toggleButton}
                onClick={toggleGramophone}
                style={{ display: (isOpen && isMobile) ? 'none' : 'flex' }} // Hide toggle on mobile when open
            >
                <div className={`${styles.arrowIcon} ${isOpen ? styles.open : ''}`} />
            </div>

            {/* Mobile Close Button - Moved OUTSIDE drawer for z-index reliability */}
            <div className={`${styles.drawer} ${isOpen && isMobile ? styles.mobileOpen : ''}`} ref={drawerRef}>
                {/* Vintage Status & Now Playing Plaque */}
                <div className={styles.statusPlaque}>
                    <div className={styles.plaqueInner}>
                        {!currentRecord ? (
                            <div className={styles.plaqueText}>
                                <span className={styles.plaqueTitle}>STATUS</span>
                                <span className={styles.plaqueMessage}>SELECT A RECORD (CLICK OR DRAG UP)</span>
                            </div>
                        ) : !isPlaying ? (
                            <div className={styles.plaqueText}>
                                <span className={styles.plaqueTitle}>STATUS</span>
                                <span className={styles.plaqueMessage}>READY • PLACE NEEDLE ON VINYL</span>
                            </div>
                        ) : (
                            <div className={styles.plaqueTextPlaying}>
                                <span className={styles.plaqueTitlePlaying}>NOW PLAYING</span>
                                <span className={styles.plaqueTrackTitle}>{currentRecord.title}</span>
                                <span className={styles.plaqueTrackArtist}>by {currentRecord.artist || 'Unknown'}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.playerWrapper}>
                    {/* ... existing player assets ... */}
                    <img
                        src={import.meta.env.BASE_URL + "record player assets/record player board.png"}
                        alt="Record Player Board"
                        className={styles.board}
                    />

                    {/* The Playing Record */}
                    {currentRecord && (
                        <div
                            key={currentRecord.id}
                            className={`${styles.playingDiscWrapper} ${isPlaying ? styles.spinning : ''}`}
                        >
                            <VinylDisc cover={currentRecord.cover} />
                        </div>
                    )}

                    {/* INVISIBLE Drop Target (Same position/size as playingDiscWrapper) */}
                    <div
                        ref={platterRef}
                        className={styles.playingDiscWrapper}
                        style={{ opacity: 0, pointerEvents: 'none', zIndex: 0 }}
                    />

                    {/* Platter Guide Ring */}
                    {!currentRecord && (
                        <div className={styles.platterGuide}>
                            <span className={styles.platterGuideText}>Place Vinyl Here</span>
                        </div>
                    )}

                    {/* ... tonearm, light, knob ... */}
                    <img
                        ref={tonearmRef}
                        src={import.meta.env.BASE_URL + "record player assets/tonearm.png"}
                        alt="Tonearm"
                        className={`${styles.tonearm} ${currentRecord && !isPlaying ? styles.pulseNeedle : ''}`}
                    />
                    <img
                        ref={lightRef}
                        src={import.meta.env.BASE_URL + "record player assets/light.png"}
                        alt="Light"
                        className={styles.light}
                    />
                    <img
                        ref={knobRef}
                        src={import.meta.env.BASE_URL + "record player assets/volume nob.png"}
                        alt="Volume Knob"
                        className={styles.knob}
                    />
                </div>

                {/* Vinyl Carousel */}
                <div
                    className={styles.carousel}
                    ref={carouselRef}
                    onScroll={handleScroll}
                >
                    {TRACKS.map((track) => (
                        <div
                            key={track.id}
                            className={`${styles.carouselItem} carousel-item ${activeTrackId === track.id ? styles.active : ''}`}
                            onClick={() => handleCarouselItemClick(track)}
                        >
                            <VinylDisc cover={track.cover} />
                        </div>
                    ))}
                </div>

                {/* Proxy Vinyl - The one you actually drag */}
                {activeTrackId && (
                    <div className={styles.proxyDisc} ref={proxyVinylRef}>
                        <VinylDisc
                            cover={TRACKS.find(t => t.id === activeTrackId)?.cover || ''}
                        />
                    </div>
                )}
            </div>

            {/* Mobile Close Button - Rendered AFTER drawer to ensure top stacking */}
            {isOpen && isMobile && (
                <button
                    className={styles.closeButtonMobile}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Close button clicked (Fixed)");
                        setIsOpen(false); // Direct set
                    }}
                    type="button"
                    aria-label="Close menu"
                >
                    <div className={styles.closeIcon} />
                </button>
            )}
        </div>
    );
};

export default Gramophone;
