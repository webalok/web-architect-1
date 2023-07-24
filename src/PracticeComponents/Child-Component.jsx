import React, {memo} from 'react'

const ChildComponent = (props) => {
	console.log('Child Calling...')
		return (
				<div>Child-Component</div>
		)
}
export default memo(ChildComponent)