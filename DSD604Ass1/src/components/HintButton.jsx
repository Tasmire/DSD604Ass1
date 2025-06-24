import { React, useEffect, useState } from 'react';

export default function HintButton({ components, placename }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false);
    }, [placename]);

    return (
        <div>
            <button className="hint-button" onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Hide hint' : 'Need a hint?'}
            </button>

            {isVisible && (
                <div className="hint-box">
                    <p>{components ? components : "No hint available."}</p>
                </div>
            )}
        </div>
        );
};