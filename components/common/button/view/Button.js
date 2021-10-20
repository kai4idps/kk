import React from "react";
import { useTheme } from "@emotion/react";

import { ButtonElem, InputElem } from "../style/Button.style.js";

function Button(props) {
	const theme = useTheme();

	let width = "auto";
	let height = "auto";
	let margin = "0";
	let padding = "";
	let classList = props.classList;
	let divType = "button";
	let display = "inline-block";
	let disabled = false;

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

	if (props.icon) {
		classList += " icon";
	}

	if (props.submitButton) {
		divType = "input";
	}

	if (props.display) {
		display = props.display;
	}

	if (props.disabled) {
		disabled = props.disabled;
	}

	const renderButton = () => {
		if (divType === "button") {
			return (
				<ButtonElem
					disabled={disabled}
					divType={divType}
					className={classList}
					width={width}
					height={height}
					icon={props.icon}
					margin={margin}
					padding={padding}
					onClick={props.onClick}
					iconTopAdjustment={props.iconTopAdjustment}
					iconLeftAdjustment={props.iconLeftAdjustment}
					color={theme.colors.text}
					border={theme.colors.border}
					hoverColor={theme.colors.background}
					defaultBackgroundColor={theme.colors.theme}
					defaultHoverBackground={theme.colors.theme2}
					display={display}
				>
					<span>{props.text}</span>
				</ButtonElem>
			);
		} else if (divType === "input") {
			return (
				<InputElem
					divType={divType}
					className={classList}
					width={width}
					height={height}
					icon={props.icon}
					margin={margin}
					padding={padding}
					onClick={props.onClick}
					value={props.text}
					iconTopAdjustment={props.iconTopAdjustment}
					iconLeftAdjustment={props.iconLeftAdjustment}
					color={theme.colors.text}
					border={theme.colors.border}
					hoverColor={theme.colors.background}
					defaultBackgroundColor={theme.colors.theme}
					defaultHoverBackground={theme.colors.theme2}
					display={display}
					type="submit"
				/>
			);
		}
	};

	return renderButton();
}

export default Button;
