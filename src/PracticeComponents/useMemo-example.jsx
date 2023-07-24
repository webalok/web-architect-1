import React, { useState, useMemo, useEffect } from 'react';
import axios from "axios";
export default function Dashboard() {

	const [apiData, setApiData] = useState([]);

	const [count, setCount] = useState(0);
	const [todos, setTodos] = useState([]);
	const calculation = useMemo(() => expensiveCalculation(count), [count]);

	const increment = () => {
		setCount((c) => c + 1);
	};
	const addTodo = () => {
		setTodos((t) => [...t, "New Todo"]);
	};

	useEffect(() => {
		const getApiData = async () => {
			const response = await axios("http://18.221.18.141/Georgia/fake-api.php");
			setApiData(response.data);
		};
		getApiData();
	}, [apiData]);

	return (
		<div>
			<h4>API Testing 1 <br /> {apiData.length == 0 ? 'Loading..' : apiData.US} </h4>

			<div>
				<h2>My Todos</h2>
				<button onClick={addTodo}>Add Todo</button>
				{todos.map((todo, index) => {
					return <p key={index}>{todo}</p>;
				})}

			</div>

			<hr />

			<div>
				Count: {count}
				<button onClick={increment}>+</button>
				<h2>Expensive Calculation</h2>
				{calculation}
			</div>


		</div>
	);
}

const expensiveCalculation = (num) => {
	console.log("Calculating...");
	for (let i = 0; i < 1000000000; i++) {
		num += 1;
	}
	return num;
};