import React, { useCallback, useState } from 'react'
import ChildComponent from './Child-Component';
const useCallbackExample = () => {
	const [custAddress, setCustAddress] = useState('');
	const [custSalary, setcustSalary] = useState(1200);

	const handleChange = (e) => {
		e.preventDefault();
		setcustSalary(e.target.value);
	}

	const Learning = useCallback(
		() => {
		console.log('Learning..')
	},[]);

	return (
		<div className='all-centered'>
			<h2>Example of useCallback</h2>
			<h3><ChildComponent Learning={Learning} /></h3>

			<div className='wrapped'>
				<input type='text' onChange={(e) => setCustAddress(e.target.value)} />
				<h3>Customer Address: {custAddress} </h3>
			</div>
			<div className='wrapped'>
				<input type='text' value={custSalary} name='custSalary' onChange={handleChange} />
				<h3>Customer Salary: {custSalary} </h3>
			</div>

		</div>
	)
}

export default useCallbackExample;