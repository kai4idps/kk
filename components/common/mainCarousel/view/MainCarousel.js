import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import isNil from "lodash/isNil";
import cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import * as gtag from "@/lib/gtag";

import {
	Carousel_super_container,
	Carousel_container,
	Elements_container,
	Element_carousel,
	Element_carousel_img,
	ElementLoading,
	Dot_list,
	Element_dot
} from "../style/MainCarousel.style.js";

let isMoving = false;
let isMoved = false;

/* Element of the carousel */
function Element(props) {
	const router = useRouter();
	const elementCarouselImg = useRef(null);
	const elementLoading = useRef(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const reduxState = useSelector(state => state.auth);

	function getBgUrl(element) {
		let bg = "";
		if (element.currentStyle) {
			// IE
			bg = element.currentStyle.backgroundImage;
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			// Firefox
			bg = document.defaultView.getComputedStyle(element, "").backgroundImage;
		} else {
			// try and get inline style
			bg = element.style.backgroundImage;
		}

		return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
	}

	useEffect(() => {
		const image = document.createElement("img");
		image.src = getBgUrl(elementCarouselImg.current);
		image.onload = function () {
			setIsLoaded(true);
		};
	}, []);

	const getTheme = () => {
		if (isNil(reduxState.theme)) {
			return "theme_black";
		} else {
			return reduxState.theme;
		}
	};

	return (
		<Element_carousel
			id={props.id}
			onClick={() => {
				if (!isMoved) {
					router.push({
						pathname: "/detailsmovie",
						query: {
							videoId: props.id,
							size: props?.size,
							videoTitle: props.name
						}
					});
				}

				gtag.event({
					action: "video_click",
					params: {
						module: "top_banner",
						video_id: props.id,
						video: props.name,
						size: "big",
						order: Number(props.progress) + 1
					}
				});
			}}
		>
			<Element_carousel_img
				ref={elementCarouselImg}
				url={props.url}
				alt={props.name}
			/>
			<ElementLoading
				className={isLoaded ? "hidden" : ""}
				ref={elementLoading}
				theme={getTheme()}
			/>
		</Element_carousel>
	);
}

Element.propTypes = {
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	progress: PropTypes.number,
	size: PropTypes.string
};

/* Function that return true if element given in parameter is in view port */
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function MainCarousel(props) {
	const theme = useTheme();

	const [count, setCount] = useState(0);
	const [transform, setTransform] = useState(0);
	const [transformDrag, setTransformDrag] = useState(0);
	const [widthElementContainer, setWidthElementContainer] = useState(0);
	const elementContainer = useRef(null);
	const dotContainer = useRef(null);
	const functionRepeat = useRef(null);
	const carouselContainer = useRef(null);
	const nbElement = useRef(0);
	const listGa = useRef([]);
	const listItems = useRef([]);

	let actualX = 0;
	let saveTransfrom = 0;
	let saveWidthElement = 0;

	/* Deal the drag on carousel */
	useEffect(() => {
		const enterDragMode = event => {
			let clientX = null;

			if (props.items.length <= 1) {
				return;
			}

			if (!isNil(event.clientX)) {
				clientX = event.clientX;
			}

			if (!isNil(event.touches)) {
				clientX = event.touches[0].clientX;
			}

			actualX = carouselContainer.current.offsetLeft - clientX;

			const element = carouselContainer.current.getElementsByTagName("a")[0];
			if (isNil(element)) {
				return;
			}

			saveWidthElement =
				carouselContainer.current.getElementsByTagName("a")[0].offsetWidth;
			isMoving = true;
			clearTimeout(functionRepeat.current);
		};

		const moveCarousel = event => {
			let clientX = null;

			if (props.items.length <= 1) {
				return;
			}

			if (!isNil(event.clientX)) {
				clientX = event.clientX;
			}

			if (!isNil(event.touches)) {
				clientX = event.touches[0].clientX;
			}

			if (isMoving) {
				isMoved = true;
				setTransformDrag(clientX + actualX);
				saveTransfrom = clientX + actualX;
			}
		};

		const endDragMode = () => {
			if (props.items.length <= 1) {
				return;
			}

			checkIfMove();
			actualX = 0;
			isMoving = false;
			setTimeout(function () {
				isMoved = false;
			}, 50);
		};

		carouselContainer.current.addEventListener("mousedown", enterDragMode);
		carouselContainer.current.addEventListener("touchstart", enterDragMode);
		document.addEventListener("mousemove", moveCarousel);
		document.addEventListener("touchmove", moveCarousel);
		document.addEventListener("mouseup", endDragMode);
		document.addEventListener("touchend", endDragMode);
		document.addEventListener("scroll", checkIfNewElementInViewPort);

		return () => {
			document.removeEventListener("mousemove", moveCarousel);
			document.removeEventListener("touchmove", moveCarousel);
			document.removeEventListener("mouseup", endDragMode);
			document.removeEventListener("touchend", endDragMode);
			document.removeEventListener("scroll", checkIfNewElementInViewPort);
		};
	}, [count]);

	/* Every 5 second the carousel need to move automatically */
	useEffect(() => {
		functionRepeat.current = setTimeout(function () {
			goToNextElement();
		}, 5000);

		return () => {
			clearTimeout(functionRepeat.current);
		};
	}, [count]);

	/* Calcul of the number of element */
	useEffect(() => {
		nbElement.current = props.items.length;
		listItems.current = props.items;
	}, [props.items]);

	useEffect(() => {
		const checkGa = setInterval(function () {
			if (listItems.current.length !== 0) {
				checkIfNewElementInViewPort();
				clearInterval(checkGa);
			}
		}, 5);

		return () => {
			clearInterval(checkGa);
		};
	}, []);

	const setTransformAndWidth = () => {
		let tmpNbElement = nbElement.current;
		if (nbElement.current === 2) {
			tmpNbElement = 4;
		}

		if (props.screenSize === "HD") {
			const newTransform = Math.ceil(tmpNbElement / 2) * -50 + 75;
			const newWidth = (tmpNbElement + 1) * 50;

			setTransform(newTransform);
			setWidthElementContainer(newWidth);
		} else if (
			props.screenSize === "Desktop" ||
			props.screenSize === "Tablet"
		) {
			const newTransform = Math.ceil(tmpNbElement / 2) * -90 + 95;
			const newWidth = (tmpNbElement + 1) * 90;

			setTransform(newTransform);
			setWidthElementContainer(newWidth);
		} else if (props.screenSize === "Mobile") {
			const newTransform = Math.ceil(tmpNbElement / 2) * -100 + 100;
			const newWidth = (tmpNbElement + 1) * 100;

			setTransform(newTransform);
			setWidthElementContainer(newWidth);
		}
	};

	/* Check screen size update */
	useEffect(() => {
		setTransformAndWidth();
	}, [props.screenSize, nbElement.current]);

	/*
		Function that check everyelement from hero carousel and send GA event
		if they are in view port and not alreaddy send
	*/
	const checkIfNewElementInViewPort = () => {
		/* Check if we are on a page whit a MainCarousel component */
		if (isNil(carouselContainer.current)) {
			return;
		}

		const listCarouselElements =
			carouselContainer.current.getElementsByTagName("a");

		for (let i = 0; i < listCarouselElements.length; i++) {
			const elem = listCarouselElements[i];
			const listProps = listItems.current.find(
				carouselElement => carouselElement.id === elem.id
			);
			if (!listGa.current.includes(elem.id) && !isNil(listProps)) {
				if (isInViewport(elem)) {
					gtag.event({
						action: "video_impression",
						params: {
							module: "top_banner",
							video_id: elem.id,
							video: listProps.name,
							size: listProps.size,
							order: Number(listProps.key) + 1
						}
					});
					listGa.current.push(listCarouselElements[i].id);
				}
			}
		}
	};

	/* Check if the carousel has been moved using the mouse */
	const checkIfMove = () => {
		if (saveTransfrom > 0) {
			const animate = setInterval(function () {
				saveTransfrom += 10;
				if (saveTransfrom > saveWidthElement) {
					setTransformDrag(0);

					//Js is not able to do negative modulo by himself
					var nextElement =
						(((count - 1) % nbElement.current) + nbElement.current) %
						nbElement.current;
					goToElement(nextElement, false);
					clearInterval(animate);
				} else {
					setTransformDrag(saveTransfrom);
				}
			}, 5);
		}

		if (saveTransfrom < 0) {
			//Reduce progrssivly transformDrag to animate the change
			const animate = setInterval(function () {
				saveTransfrom -= 10;
				if (saveTransfrom < saveWidthElement * -1) {
					setTransformDrag(0);
					goToElement((count + 1) % nbElement.current, false);
					clearInterval(animate);
				} else {
					setTransformDrag(saveTransfrom);
				}
			}, 5);
		}
	};

	function goToNextElement() {
		goToElement((count + 1) % nbElement.current, true);
	}

	/* Go the element of the carousel given as parameter */
	const listGoToElement = [];
	function goToElement(elementId, animate) {
		if (nbElement.current > 0) {
			/* Cancel the auto move */
			clearTimeout(functionRepeat.current);

			const diffWithActual = elementId - count;
			const diffFromEnd = nbElement.current - count + elementId;
			const diffToEnd = elementId - count - nbElement.current;
			let totalMouvement = 0;

			/* Find out if the carousel should move to the right or to the left */
			/* If 2 items alway move to right if not current */
			if (props.items.length === 2 && count !== elementId) {
				totalMouvement = 1;
			} else {
				if (Math.abs(diffWithActual) <= Math.abs(diffFromEnd)) {
					if (Math.abs(diffWithActual) <= Math.abs(diffToEnd)) {
						totalMouvement = diffWithActual;
					} else {
						totalMouvement = diffToEnd;
					}
				} else if (Math.abs(diffFromEnd) <= Math.abs(diffToEnd)) {
					totalMouvement = diffFromEnd;
				} else {
					totalMouvement = diffToEnd;
				}
			}

			/* Move the carousel */
			let mouvement = totalMouvement;
			let addition = 0;
			while (mouvement !== 0) {
				/* If move to right */
				if (mouvement > 0) {
					/* if elementContainer is null it's mean the page has change */
					if (isNil(elementContainer.current)) {
						return;
					}

					/* Find what element need to be reduced 
					to create an animation and then  moved */
					const element =
						elementContainer.current.childNodes[
							totalMouvement - mouvement + addition
						];
					if (element.classList.contains("reduced")) {
						addition++;
					} else {
						/* If animation is needeed */
						if (animate) {
							element.classList.add("reduced");

							setTimeout(function () {
								if (elementContainer.current !== null) {
									element.classList.remove("reduced");
									elementContainer.current.append(element);
									checkIfNewElementInViewPort();
								}
							}, 500);
						} else {
							elementContainer.current.append(element);
						}

						mouvement--;
					}
					/* If move to right */
				} else {
					/* if elementContainer is null it's mean the page has change */
					if (isNil(elementContainer.current)) {
						return;
					}

					/* Find what element need to be reduced 
					to create an animation and then  moved */
					const element =
						elementContainer.current.childNodes[
							elementContainer.current.childNodes.length - 1
						];
					/* If animation is needeed */
					if (animate) {
						element.classList.add("fast-reduced");
					}

					elementContainer.current.prepend(element);

					/* If animation is needeed */
					if (animate) {
						setTimeout(function () {
							if (element !== null) {
								element.classList.add("extend");
								element.classList.remove("fast-reduced");
							}

							if (listGoToElement.length > 0) {
								goToElement(listGoToElement.shift(), true);
							}
						}, 20);

						setTimeout(function () {
							if (element !== null) {
								element.classList.remove("extend");
								checkIfNewElementInViewPort();
							}
						}, 500);
					}

					mouvement++;
				}
			}

			/* Update current position + Restart the auto moving carousel timer */
			setCount(elementId);
			checkIfNewElementInViewPort();
		}
	}

	const renderElementContainer = listItems => {
		if (listItems.length <= 0) {
			return;
		}

		if (listItems.length === 1) {
			return (
				<Elements_container
					containerTransform={
						"calc(" + transform + "vw" + " + " + transformDrag + "px)"
					}
				>
					<Element
						key={listItems[0].key}
						url={listItems[0].url}
						name={listItems[0].name}
						id={listItems[0].id}
						progress={listItems[0].key}
						size={listItems[0].size}
					/>
				</Elements_container>
			);
		}

		let listItemsUpdated = cloneDeep(listItems);

		if (listItems.length === 2) {
			let tmp = cloneDeep(listItems[0]);
			tmp.key = listItemsUpdated.length;
			listItemsUpdated.push(tmp);

			tmp = cloneDeep(listItems[1]);
			tmp.key = listItemsUpdated.length;
			listItemsUpdated.push(tmp);

			tmp = listItemsUpdated.pop();
			listItemsUpdated.unshift(tmp);
		} else {
			/* Put the element in order before printing (depending of the initial translate)*/
			var mouvItem = Math.ceil(listItems.length / 2) - 1;
			for (let i = 0; i < mouvItem; i++) {
				let tmp = listItemsUpdated.pop();
				listItemsUpdated.unshift(tmp);
			}
		}

		return (
			<>
				<Elements_container
					ref={elementContainer}
					containerWidth={widthElementContainer + "%"}
					containerTransform={
						"calc(" + transform + "vw" + " + " + transformDrag + "px)"
					}
				>
					{listItemsUpdated.map(element => {
						return (
							<Element
								key={element.key}
								url={element.url}
								name={element.name}
								id={element.id}
								progress={element.key}
								size={element.size}
							/>
						);
					})}
				</Elements_container>

				<Dot_list ref={dotContainer}>
					{listItems.map(element => {
						return (
							<Element_dot
								onClick={() => goToElement(element.key, true)}
								className={count === element.key ? "selected" : null}
								key={element.key}
								background={theme.colors.theme}
							>
								{" "}
							</Element_dot>
						);
					})}
				</Dot_list>
			</>
		);
	};

	return (
		<>
			<Carousel_super_container>
				<Carousel_container ref={carouselContainer}>
					{renderElementContainer(props.items)}
				</Carousel_container>
			</Carousel_super_container>
		</>
	);
}

MainCarousel.propTypes = {
	screenSize: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired
};

export default MainCarousel;
