import React, {Fragment, useEffect, useReducer} from 'react';
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
export default function App()
{
    const initialState={
        questions:[],
        status:'loading',
        index:0,
        answer:null,
        points:0,
    }
    function reducer(state,action){
        switch (action.type){
            case 'dataReceived':
                return {
                    ...state,
                    questions: action.payload ,
                    status: "ready"
                }
            case 'dataFailed':
                return {
                    ...state,
                    status:"error"
                }
            case 'start':
                return {
                    ...state,status:"active"
                }
            case 'newAnswer':
                const question = state.questions.at(state.index)
                return {
                    ...state,
                    answer:action.payload,
                    points:action.payload===question.correctOption?state.points+question.points:state.points
                }
            case 'nextQuestion':
                return {
                    ...state,
                    index:state.index+1,
                    answer:null
                }
            case 'finished':
                return {
                    ...state,
                    status:'finished'
                }
            default:
                throw new Error("Invalid action")
        }
    }
    const [state,dispatch] = useReducer(reducer, initialState)
    const {questions,status,index,answer,points} =state
    useEffect(() => {
        async function fake_api() {
            try {
                const response = await fetch('http://localhost:8000/questions')
                if (!response.ok)
                    throw new Error("Something went wrong")
                const data = await response.json()
                dispatch({type: 'dataReceived', payload: data})
            } catch (err) {
                dispatch({type: 'dataFailed'})
            }
        }
        fake_api()
    }, []);

    return(
        <div className="app">
            <Header/>
            <Main>
                {status==='loading' && <Loader/>}
                {status==='error' && <Error/>}
                {status==='ready'&&<StartScreen dispatch={dispatch}/>}
                {status==='active' &&
                    <Fragment>
                        <Progress index={index} points={points} answer={answer}/>
                        <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
                        {answer!==null && <NextButton dispatch={dispatch} index={index}/>}
                    </Fragment>
                }
                {status==='finished' && <FinishedScreen points={points}/>}
            </Main>
        </div>
    )
}