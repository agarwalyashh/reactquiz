import React from 'react';
export default function FinishedScreen({points}){
    return(
        <p className="result">
            You scored <strong>{points}</strong> points out of 280
        </p>
    )
}