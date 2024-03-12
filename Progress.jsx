import React from 'react';
function Progress({ index, points, answer }) {
    return (
        <header className="progress">
            <progress value={index+1} max={15}/>
            <p>Question <strong>{index + 1}</strong>/15</p>
            <p>
                <strong>{points}</strong> / 280
            </p>
        </header>
    );
}

export default Progress;