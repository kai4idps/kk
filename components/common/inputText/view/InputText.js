import React from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import {
	InputTextContainer,
	InputTextElem,
	InputClear
} from "../style/InputText.style.js";

function InputText(props) {
	const theme = useTheme();

	let width = "100%";
	let height = "auto";
	let margin = "0";
	let padding = "15px";
	let classList = props.classList;
	let type = "text";

	if (props.width) {
		width = props.width;
	}

	if (props.height) {
		height = props.height;
	}

	if (props.margin) {
		margin = props.margin;
	}

	if (props.padding) {
		padding = props.padding;
	}

	if (props.type) {
		type = props.type;
	}

	return (
		<InputTextContainer>
			<InputTextElem
				type={type}
				id={props.id}
				name={props.name}
				className={classList}
				height={height}
				width={width}
				margin={margin}
				padding={padding}
				icon={props.icon}
				onChange={props.onChange}
				value={props.value}
				placeholder={props.placeholder}
				background={theme.colors.background2}
				color={theme.colors.text}
				focusColor={theme.colors.background3}
				defaultBackgroundColor={theme.colors.theme}
			/>
			{props.value !== "" &&
				props.value !== undefined &&
				props.clearButton === "true" && <InputClear onClick={props.onClick} />}
		</InputTextContainer>
	);
}

InputText.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	margin: PropTypes.string,
	padding: PropTypes.string,
	type: PropTypes.string,
	classList: PropTypes.string,
	icon: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	clearButton: PropTypes.bool,
	onClick: PropTypes.func
};

export default InputText;
