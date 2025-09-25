import React from 'react';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    return <div className="absolute rounded-full" style={style}></div>;
};

const Confetti: React.FC = () => {
    const pieces = Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 8 + 4; // 4px to 12px
        const style: React.CSSProperties = {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${-20 + Math.random() * -100}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 80%)`,
            animation: `fall ${Math.random() * 5 + 8}s linear ${Math.random() * 5}s infinite`,
        };
        return <ConfettiPiece key={i} style={style} />;
    });

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            {pieces}
            <style>{`
                @keyframes fall {
                    to {
                        transform: translateY(105vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default Confetti;