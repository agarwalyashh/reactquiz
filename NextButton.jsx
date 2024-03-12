import React from 'react';
export default function NextButton({dispatch,index}){
    if(index<14){
    return(
        <button className="btn btn-ui" onClick={()=>dispatch({type:'nextQuestion'})}>
            Next
        </button>
    )}
    else {
        return (
            <button className="btn btn-ui" onClick={()=>dispatch({type:'finished'})}>Finish</button>
        )
    }
}