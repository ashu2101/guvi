//  This counter app is based on Functional companent

import React, {useReducer, useEffect} from 'react';

//Global Action paramaters
const Increment = "Increment"
const Decrement = "Decrement"
const Reset = "Reset"

function toChange (state, action){
    console.log(state,action)
    switch(action.type){
        case Increment : {
            return state = state+1
        }
        case Decrement : {
            return state = state-1
        }
        case Reset : {
            return state = 0
        }
        default:{
            return state
        }
    }
}

function Counter() {
    const [state, dispatch ] = useReducer(toChange, 0);

    // To implement lifecycle methods in Functional component use useEffect
    // Example 1 : useEffect in replacement of componentDidMount
    useEffect(()=>{
        //Initial API calls here
        //This will be used only once during inititation of component
        console.log("Did Mount")
    }, []) //This empty [] acts as componentDidMount

    // Example 2 : useEffect in replacement of componentDidUpdate
    useEffect(()=>{
        //Initial API calls here
        //This will be triggered for any state change
        console.log("Did Update")
    }) 

    // Example 3 : useEffect in replacement of componentDidUpdate
    useEffect(()=>{
        //Initial API calls here
        //This will be used for every update of state value
        console.log("Did Update when only state value is changed, else this will not run.")
    }, [state]) //This  [state] acts as componentDidUpdate only when state value is changed, 
    // for other value change it will not be triggered
    
    // Example 4 : useEffect in replacement of componentWillUnmount
    useEffect(()=>{
        // Clear the caches, sessions or after component close processing.
        //This will be used when the component is unmounting
        // Return with a function is manditory
        return(
       ()=> console.log("UnMounting the element now"))

    },[]) //This return function can be used in any of the useEffect defined above (ex . 1,2,3)

    
    return (
        
        <div style={{textAlign: 'center'}}> 
        {console.log("Rendering")}
        <p>Count : {state}</p>
        {/* Best practice is to send the action as Objects, for exaple we have sent {Increment}, {Decrement}, {Reset}
        instead of only passing Increment, Decrement and Reset */}
        <button onClick={()=>dispatch({type: Increment})}>Increment</button>
        <button onClick={()=>dispatch({type: Decrement})}>Decrement</button>
        <button onClick={()=>dispatch({type: Reset})}>Reset</button>
        </div>
    )
}

export default Counter
