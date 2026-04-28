import {useState} from "react";

function Counter() {
    // let count = 0;
    const [count, setCount] = useState(0)

    const increment = () => {
        //count = count + 1;
        //console.log(count); // This logs the new value, but the UI doesn't change
        setCount((old)=>{
            return old + 1
        })
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Add 1</button>
        </div>
    );
}