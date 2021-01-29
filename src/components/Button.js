import PropTypes from 'prop-types'
import React from 'react'

const Button = ({ color, text, onClick }) => {
	return (
		<button
			style={{
				background: color,
			}}
			className='btn'
			onClick={onClick}
		>
			{text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
}

export default Button
