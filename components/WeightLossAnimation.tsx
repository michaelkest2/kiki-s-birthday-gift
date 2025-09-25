import React, { useState, useEffect } from 'react';
import { PandaIcon } from './Icons';

const ScaleIcon: React.FC = () => (
    <svg viewBox="0 0 150 50">
        {/* Base */}
        <rect x="5" y="20" width="140" height="20" rx="5" fill="#a0aec0" />
        {/* Top Plate */}
        <rect x="0" y="15" width="150" height="5" rx="2" fill="#718096" />
        {/* Display */}
        <rect x="45" y="25" width="60" height="10" fill="#2d3748" />
    </svg>
);

interface WeightLossAnimationProps {
    levelCompleted: number;
}

const WeightLossAnimation: React.FC<WeightLossAnimationProps> = ({ levelCompleted }) => {
    const startWeight = 150 - (levelCompleted - 1) * 10;
    const endWeight = 150 - levelCompleted * 10;
    const [weight, setWeight] = useState(startWeight);

    useEffect(() => {
        const duration = 2500; // milliseconds
        let startTime: number | null = null;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease-out quadratic easing function
            const easedPercentage = percentage * (2 - percentage);
            
            const currentWeight = startWeight - (startWeight - endWeight) * easedPercentage;
            setWeight(currentWeight);

            if (percentage < 1) {
                requestAnimationFrame(animate);
            } else {
                setWeight(endWeight);
            }
        };

        const animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [startWeight, endWeight]);

    return (
        <div className="flex flex-col items-center justify-center my-4">
            <div className="relative w-48 h-48">
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-24">
                    <PandaIcon />
                </div>
                <div className="absolute bottom-0 w-full">
                    <ScaleIcon />
                    <div className="absolute w-full text-center text-white font-mono text-lg" style={{ top: '23px' }}>
                        {weight.toFixed(1)}kg
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeightLossAnimation;