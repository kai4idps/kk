import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isNil from "lodash/isNil";

import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { CarouselElementVideo } from "@/common/carousel/carouselElementVideo";
import { Carousel } from "@/common/carousel";
import { MainCarousel } from "@/common/mainCarousel";
import { Footer } from "@/layout/footer";
import GetPageApi from "@/api/GetPageApi";
import { variables } from "@/styles/styleUtils";

import { 
	HomeContainer
} 
from "../style/HomePage.style";

/* Testing data */
//import {mainListElementTmp, listElementTmp} from "@/mockdata/MovieList.js";

const carouselElementWidthDesktop = 240;
const carouselElementMarginDesktop = 15;
const carouselElementWidthTablet = 200;
const carouselElementMarginTablet = 15;
const carouselElementWidthMobile = 136;
const carouselElementMarginMobile = 10;

/* PageName should be same as in theme.js file */
const PageName = "home";

const HomePage = () => {
	const reduxToken = useSelector(state => state.auth);
	const dispatch = useDispatch({});
	const { getPageDetailById, getListPages } = GetPageApi(dispatch);
	const [listMainCarousels, setListMainCarousels] = useState([]);
	const [listCarousels, setListCarousels] = useState([]);
	const [carouselData, setCarouselData] = useState({
		screen: "",
		width: 0,
		margin: 0
	});

	useEffect(() => {
		function updateSize() {
			if (window.innerWidth > parseInt(variables.Screen_small)) {
				if (carouselData.screen !== "HD") {
					setCarouselData({
						screen: "HD",
						width: carouselElementWidthDesktop,
						margin: carouselElementMarginDesktop
					});
				}
			} else if (window.innerWidth > parseInt(variables.Screen_tablet)) {
				if (carouselData.screen !== "Desktop") {
					setCarouselData({
						screen: "Desktop",
						width: carouselElementWidthDesktop,
						margin: carouselElementMarginDesktop
					});
				}
			} else if (window.innerWidth > parseInt(variables.Screen_mobil)) {
				if (carouselData.screen !== "Tablet") {
					setCarouselData({
						screen: "Tablet",
						width: carouselElementWidthTablet,
						margin: carouselElementMarginTablet
					});
				}
			} else if (carouselData.screen !== "Mobile") {
				setCarouselData({
					screen: "Mobile",
					width: carouselElementWidthMobile,
					margin: carouselElementMarginMobile
				});
			}
		}

		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	useEffect(() => {
		function findPageId(page_list) {
			if (page_list === null || typeof page_list === "undefined") {
				return null;
			}

			const page = page_list.find(page => {
				return page.name === PageName;
			});
			return page?.id;
		}

		const saveMainCarouselItems = collections => {
			const items = [];
			collections.forEach(collection => {
				collection.items.forEach((item, index) => {
					const urlResizedPic = item.thumbnail.url.replace(
						"/upload",
						"/upload/b_black,c_pad,h_540,w_960"
					);
					items.push({
						id: item.id,
						url: urlResizedPic,
						name: item.title,
						key: index,
						size: collection?.size
					});
				});
			});
			//setListMainCarousels(mainListElementTmp);
			setListMainCarousels(items);
		};

		const saveListCarouselsItems = collections => {
			const items = [];
			collections.forEach(collection => {
				const tmpCollection = {
					title: collection.title,
					id: collection.id,
					items: []
				};

				tmpCollection.items = collection.items.map(item => {
					const urlResizedPic = item.thumbnail.url.replace(
						"/upload",
						"/upload/b_black,c_pad,h_135,w_240"
					);
					return {
						id: item.id,
						url: urlResizedPic,
						title: item.title,
						progress: item.progress * 100,
						size: collection?.size
					};
				});
				items.push(tmpCollection);
			});
			setListCarousels(items);
			//setListCarousels(listElementTmp.collections);
		};

		const setCollection = result => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				return;
			}

			if (result.status !== 200) {
				if (isNil(result.data)) {
					console.error("Server error");
					return;
				}

				if (isNil(result.data.error_code) || isNil(result.data.message)) {
					console.error("Server error");
					return;
				}

				console.error(
					"Server error " + result.data.error_code + " : " + result.data.message
				);
				return;
			}

			if (isNil(result.data)) {
				console.error("Server error: No data");
				return;
			}

			if (isNil(result.data.collections)) {
				console.error("Server error: Incorrect data");
				return;
			}

			const { collections } = result.data;

			const mainCollections = collections.filter(
				collection => collection.size === "big"
			);
			saveMainCarouselItems(mainCollections);

			const otherCollections = collections.filter(
				collection => collection.size !== "big"
			);
			saveListCarouselsItems(otherCollections);
		};

		const loadCarousel = async page_list => {
			const pageId = findPageId(page_list);
			if (pageId !== null && typeof pageId !== "undefined") {
				const result = await getPageDetailById(pageId);
				await setCollection(result);
			}
		};

		loadCarousel(reduxToken.page_list);
	}, [reduxToken.page_list]);

	useEffect(async () => {
		await getListPages();
		return () => {};
	}, []);

	return (
		<>
			<FullLayout>
				<HomeContainer>
					<MainCarousel
						screenSize={carouselData.screen}
						items={listMainCarousels}
					/>
					<MainContent>
						{listCarousels.map((collection, i) => {
							return (
								<Carousel
									key={i}
									id={collection.id}
									margin="60px 0 0 0"
									title={collection.title}
									elemWidth={carouselData.width}
									elemMargin={carouselData.margin}
									nbElement={collection.items.length}
									screenSize={carouselData.screen}
								>
									{collection.items.map((element, key) => {
										return (
											<CarouselElementVideo
												key={key}
												id={element.id}
												number={Number(key) + 1}
												url={element.url}
												title={element.title}
												info={element.info}
												size={element.size}
												progress={element.progress}
												elemWidth={carouselData.width}
												elemMargin={carouselData.margin}
												collection={collection}
												screenSize={carouselData.screen}
											/>
										);
									})}
								</Carousel>
							);
						})}
					</MainContent>
				</HomeContainer>
			</FullLayout>
			<Footer />
		</>
	);
};

HomePage.propTypes = {};

export default HomePage;
