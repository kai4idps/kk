import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import {
	DropDownContainer,
	DropDownInput,
	DropDownList,
	DropDownElement
} from "../style/DropDown.style.js";

function DropDown(props) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [actualValue, setActualValue] = useState("");
	const [listDropDown, setListDropDown] = useState([]);
	const dropDownInput = useRef(null);
	const dropDownList = useRef(null);
	let width = "auto";
	let height = "auto";
	let margin = "0";
	let padding = "15px";
	let classList = props.classList;
	let widthInput = "220px";
	let elementClass = "";
	let listClass = "";

	useEffect(() => {
		const tmpList = [];
		props.list.forEach(function (element) {
			const newElement = { text: element.text, value: element.value };
			tmpList.push(newElement);
			if (element.default) {
				setActualValue(newElement);
			}
		});

		setListDropDown(tmpList);
	}, []);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropDownInput.current &&
				!dropDownInput.current.contains(event.target) &&
				dropDownList.current &&
				!dropDownList.current.contains(event.target)
			) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropDownInput, dropDownList]);

	function updateDropDownValue(element) {
		props.onChange(element.value);
		setActualValue(element);
		setOpen(false);
	}

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

	if (props.widthInput) {
		widthInput = props.widthInput;
	}

	if (classList.includes("column-3")) {
		elementClass += "column-3";
		listClass += "column-3";
	}

	return (
		<DropDownContainer
			className={classList}
			width={width}
			height={height}
			margin={margin}
		>
			<DropDownInput
				onClick={() => {
					setOpen(!open);
				}}
				background={theme.colors.background3}
				color={theme.colors.text}
				padding={padding}
				className={open ? "open" : ""}
				widthInput={widthInput}
				ref={dropDownInput}
			>
				{actualValue.text}
			</DropDownInput>
			<DropDownList
				className={open ? listClass + " open" : listClass}
				color={theme.colors.text}
				background={theme.colors.background2}
				ref={dropDownList}
				widthInput={widthInput}
			>
				{listDropDown.map((element, i) => {
					if (element !== actualValue) {
						return (
							<DropDownElement
								key={i}
								padding={padding}
								hoverBackground={theme.colors.background3}
								className={elementClass}
								onClick={() => {
									updateDropDownValue(element);
								}}
							>
								{element.text}
							</DropDownElement>
						);
					}
				})}
			</DropDownList>
		</DropDownContainer>
	);
}

DropDown.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	margin: PropTypes.string,
	padding: PropTypes.string,
	widthInput: PropTypes.string,
	classList: PropTypes.string,
	list: PropTypes.array.isRequired,
	onChange: PropTypes.func
};

export default DropDown;
