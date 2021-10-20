import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import isNil from "lodash/isNil";
import PropTypes from "prop-types";

import { KKLink } from "@/common/kklink";
import { KKText } from "@/common/kkText";
import * as gtag from "@/lib/gtag";

import {
	Element_carousel,
	Element_link_container,
	Element_carousel_img,
	ElementLoading,
	ElementOverlay,
	Element_play_button,
	Element_loadBarGrey,
	Element_loadBarTheme,
	Element_info
} from "../style/CarouselElementVideo.style.js";

function CarouselElementVideo(props) {
	const theme = useTheme();
	const reduxState = useSelector(state => state.auth);
	const elementCarouselImg = useRef(null);
	const [isLoaded, setIsLoaded] = useState(false);

	function getBgUrl(element) {
		var bg = "";
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

	// Check if image is loaded
	useEffect(() => {
		var image = document.createElement("img");
		image.src = getBgUrl(elementCarouselImg.current);
		image.onload = function () {
			setIsLoaded(true);
		};
	}, []);

	const getClassLink = () => {
		if (props.screenSize === "HD" || props.screenSize === "Desktop") {
			return "overflow";
		}

		return "small overflow";
	};

	const getTheme = () => {
		if (isNil(reduxState.theme)) {
			return "theme_black";
		} else {
			return reduxState.theme;
		}
	};

	return (
		<Element_carousel
			className="element_carousel"
			data-title={props.title}
			data-progress={props.progress}
			data-size={props.size}
			margin={props.elemMargin + "px"}
			id={props.id}
			width={props.elemWidth + "px"}
		>
			<Link
				href={{
					pathname: "/detailsmovie",
					query: {
						videoId: props.id,
						videoTitle: props.title,
						size: props?.size
					}
				}}
			>
				<Element_link_container
					onClick={() => {
						gtag.event({
							action: "video_click",
							params: {
								module: props.collection.title,
								module_id: props.collection.id,
								video_id: props.id,
								video: props.title,
								size: props.size,
								order: props.number
							}
						});
					}}
				>
					<Element_carousel_img
						url={props.url}
						alt={props.title}
						ref={elementCarouselImg}
					>
						<ElementLoading
							className={isLoaded ? "hidden" : ""}
							theme={getTheme()}
						/>

						<ElementOverlay overlay={theme.colors.background} />
						<Element_play_button />
						{props.progress !== 0 && (
							<>
								<Element_loadBarGrey />
								<Element_loadBarTheme
									width={props.progress + "%"}
									background={theme.colors.theme}
								/>
							</>
						)}
					</Element_carousel_img>
				</Element_link_container>
			</Link>
			<Link
				href={{
					pathname: "/detailsmovie",
					query: {
						videoId: props.id,
						size: props?.size,
						videoTitle: props.title
					}
				}}
			>
				<KKLink
					classList={getClassLink()}
					onClick={() => {
						gtag.event({
							action: "video_click",
							params: {
								module: props.collection.title,
								module_id: props.collection.id,
								video_id: props.id,
								video: props.title,
								size: props.size,
								order: props.number,
								content: "wording"
							}
						});
					}}
				>
					{props.title}
				</KKLink>
			</Link>

			<Element_info>
				<KKText classList="block extra-small theme-1">{props.info}</KKText>
			</Element_info>
		</Element_carousel>
	);
}

CarouselElementVideo.propTypes = {
	id: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	info: PropTypes.string,
	size: PropTypes.string.isRequired,
	progress: PropTypes.number,
	elemWidth: PropTypes.number.isRequired,
	elemMargin: PropTypes.number.isRequired,
	collection: PropTypes.object.isRequired,
	screenSize: PropTypes.string.isRequired
}

export default CarouselElementVideo;
