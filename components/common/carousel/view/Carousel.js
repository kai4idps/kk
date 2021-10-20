import React, { useState, useEffect, useRef } from "react";
import * as gtag from "@/lib/gtag";
import isNil from "lodash/isNil";
import PropTypes from "prop-types";

import { KKText } from "@/common/kkText";
import { useTheme } from "@emotion/react";

import {
	Carousel_super_container,
	Carousel_container,
	Carousel_Title,
	Carousel_arrow_right,
	Carousel_arrow_left,
	Element_super_container,
	Element_container
} from "../style/Carousel.style.js";

/* 
	Function that return true if element given in parameter is in view port. 
	We check the right side of the element with his left side + 60px
	LIke that element will be condider inside view port even if 
	only partical of it is really inside
*/
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.left + 60 <=
			(window.innerWidth || document.documentElement.clientWidth)
	);
}

function Carousel(props) {
	const theme = useTheme();
	const listGa = useRef([]);

	const [transform, setTransform] = useState(0);
	const [arrowRightEnable, setArrowRightEnable] = useState(false);
	const [arrowLeftEnable, setArrowLeftEnable] = useState(true);

	const elementContainer = useRef(null);
	const count = useRef(0);
	const elementSuperContainer = useRef(null);
	const maxElementOnScreen = useRef(1);

	const carouselWidth = (props.elemWidth + props.elemMargin) * props.nbElement;
	let titleClass = props.titleClass;

	useEffect(() => {
		if (props.titleIcon) {
			titleClass += " icon";
		}
	}, []);

	useEffect(() => {
		setParameter(props.screenSize);
	}, [props.screenSize]);

	/* Set the number max Element printable on screen to disabled arrow when needed */
	useEffect(() => {
		function handleResize() {
			const maxPrintOnscreen = Math.floor(
				window.innerWidth / (props.elemWidth + props.elemMargin)
			);
			maxElementOnScreen.current = maxPrintOnscreen;
			checkArrowState();
		}

		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const checkGa = setInterval(function () {
			if (!isNil(props.screenSize)) {
				checkIfNewElementInViewPort();
				clearInterval(checkGa);
			}
		}, 5);

		return () => {
			clearInterval(checkGa);
		};
	}, []);

	useEffect(() => {
		document.addEventListener("scroll", checkIfNewElementInViewPort);
		return () => {
			document.removeEventListener("scroll", checkIfNewElementInViewPort);
		};
	}, []);

	/* Update carousel depending of the screen size */
	function setParameter(screen) {
		if (screen === "Desktop" || screen === "HD") {
			elementSuperContainer.current.scrollLeft = 0;
			checkArrowState();
		} else if (screen === "Tablet") {
			count.current = 0;
			updateTransformElementContainer();
		} else if (screen === "Mobile") {
			count.current = 0;
			updateTransformElementContainer();
		}
	}

	function updateTransformElementContainer() {
		const transformTmp =
			count.current * (props.elemWidth + props.elemMargin) * -1;
		setTransform(transformTmp + "px");
		setTimeout(checkIfNewElementInViewPort, 600);
	}

	function nextElement() {
		if (count.current < props.nbElement - 1) {
			count.current++;
			updateTransformElementContainer();
		}
		checkArrowState();
	}

	function previousElement() {
		if (count.current > 0) {
			count.current--;
			updateTransformElementContainer();
		}
		checkArrowState();
	}

	function checkArrowState() {
		if (count.current <= 0) {
			setArrowLeftEnable(true);
		} else {
			setArrowLeftEnable(false);
		}

		if (count.current >= props.nbElement - maxElementOnScreen.current) {
			setArrowRightEnable(true);
		} else {
			setArrowRightEnable(false);
		}
	}

	const checkIfNewElementInViewPort = () => {
		/* Check if we are on a page whit a MainCarousel component */
		if (isNil(elementContainer.current)) {
			return;
		}

		const listCarouselElements =
			elementContainer.current.getElementsByClassName("element_carousel");

		for (let i = 0; i < listCarouselElements.length; i++) {
			const elem = listCarouselElements[i];
			if (!listGa.current.includes(elem.id)) {
				if (isInViewport(elem)) {
					gtag.event({
						action: "video_impression",
						params: {
							module: props.title,
							module_id: props.id,
							video_id: elem.id,
							video: elem.dataset.title,
							size: elem.dataset.size,
							order: i + 1
						}
					});
					listGa.current.push(listCarouselElements[i].id);
				}
			}
		}
	};

	return (
		<Carousel_super_container margin={props.margin}>
			<Carousel_Title className={titleClass} icon={props.titleIcon}>
				<KKText classList="title-1 overflow">{props.title}</KKText>
			</Carousel_Title>

			<Carousel_container>
				<Element_super_container ref={elementSuperContainer}>
					<Carousel_arrow_right
						className={arrowRightEnable ? "disabled" : null}
						image={theme.images.arrowIcon}
						imageDisabled={theme.images.arrowIconDisabled}
						onClick={nextElement}
						color={theme.colors.background}
					/>
					<Carousel_arrow_left
						className={arrowLeftEnable ? "disabled" : null}
						image={theme.images.arrowIcon}
						imageDisabled={theme.images.arrowIconDisabled}
						onClick={previousElement}
						color={theme.colors.background}
					/>

					<Element_container
						ref={elementContainer}
						width={carouselWidth}
						transform={transform}
					>
						{props.children}
					</Element_container>
				</Element_super_container>
			</Carousel_container>
		</Carousel_super_container>
	);
}

Carousel.propTypes = {
	id: PropTypes.string.isRequired,
	margin: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	elemWidth: PropTypes.number.isRequired,
	elemMargin: PropTypes.number.isRequired,
	nbElement: PropTypes.number.isRequired,
	screenSize: PropTypes.string.isRequired,
	children: PropTypes.node,
	titleClass: PropTypes.string,
	titleIcon: PropTypes.string
};

export default Carousel;
