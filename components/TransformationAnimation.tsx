import React, { useState, useEffect } from 'react';
import { PandaIcon, DeerIcon } from './Icons';

const TransformationAnimation: React.FC = () => {
    const [isPandaVisible, setIsPandaVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPandaVisible(false);
        }, 1000); // Start fade after 1 second

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center my-4">
            <div className="relative w-40 h-40">
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isPandaVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <PandaIcon />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-1000 ${!isPandaVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <DeerIcon />
                </div>
            </div>
        </div>
    );
};

export default TransformationAnimation;
