"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 10 * position} -${189 + i * 10}C-${
            380 - i * 10 * position
        } -${189 + i * 10} -${312 - i * 10 * position} ${216 - i * 10} ${
            152 - i * 10 * position
        } ${343 - i * 10}C${616 - i * 10 * position} ${470 - i * 10} ${
            684 - i * 10 * position
        } ${875 - i * 10} ${684 - i * 10 * position} ${875 - i * 10}`,
        color: `rgba(79,140,255,${0.04 + i * 0.03})`,
        width: 0.4 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.color}
                        strokeWidth={path.width}
                        initial={{ pathLength: 0.3, opacity: 0.3 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.15, 0.4, 0.15],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + path.id * 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}
