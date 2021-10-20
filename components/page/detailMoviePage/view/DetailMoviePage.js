import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import isNil from "lodash/isNil";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import * as gtag from "@/lib/gtag";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { Button } from "@/common/button";
import { KKText } from "@/common/kkText";
import PurchaseApi from "@/api/PurchaseApi";
import SubscriptionApi from "@/api/SubscriptionApi";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";
import { getLocalStorage } from "@/lib/localStorage";

import {
	DetailMovieSuperContainer,
	BackgroundContainer,
	TopBackground,
	DetailMovieContainerRadientBackground,
	PlayerContainer,
	DetailMovieContainer,
	DetailMovieColums,
	DetailMoviePicture,
	DetailMovieLeft,
	ButtonList,
	ButtonListMobil,
	DetailMovieRight,
	UnderTitleBar,
	UnderTitleBarItem,
	CastList,
	CastElement,
	ButtonListBigScreen,
	MovieMissingContainer
} from "../style/DetailMoviePage.style.js";

const { MERCHANT_ID, ORG_ID, PROJECT_ID } = getPublicRuntimeConfig();

const data = {
	merchantId: MERCHANT_ID,
	orgId: ORG_ID,
	projectId: PROJECT_ID,
	videoId: null
};

const DetailMoviePage = props => {
	const theme = useTheme();
	const router = useRouter();

	const { getPurchaseStatus } = PurchaseApi();
	const { startTransaction } = SubscriptionApi();

	const { t } = useTranslation("common");
	const DynamicVideoComponent = dynamic(() =>
		import("@/common/videoPlayer").then(mod => mod.VideoPlayer)
	);

	const [isBusy, setIsBusy] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);
	const [isPlayButtonHidden, setIsPlayButtonHidden] = useState(false);
	const [isPlayerVisible, setIsPlayerVisible] = useState(false);
	const [isSubscribe, setIsSubscribe] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const checkIfUserSubscribe = async result => {
			if (isMounted) {
				setIsBusy(false);
				if (isNil(result)) {
					console.error("Response from server empty.");
					return;
				}

				//permission denied (license for video is not available)
				if (result.status === 403) {
					console.error(
						"Permission denied: license for video is not available"
					);
					return;
				}

				// user do not purchase record.
				if (result.status === 402) {
					setIsSubscribe(false);
					return;
				}

				if (result.status === 404) {
					setIsPlayButtonHidden(true);
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
						"Server error " +
							result.data.error_code +
							" : " +
							result.data.message
					);
					return;
				}

				//User can watch video
				if (result.status === 200) {
					setIsSubscribe(true);
				}
			}
		};

		const loadMovieDetails = async videoId => {
			if (videoId === null || typeof videoId === "undefined") {
				return false;
			}

			if (
				getLocalStorage("access_token") !== null &&
				getLocalStorage("access_token")
			) {
				const resultPurchaseStatus = await getPurchaseStatus(
					videoId,
					getLocalStorage("access_token")
				);
				await checkIfUserSubscribe(resultPurchaseStatus);
			} else {
				setIsBusy(false);
			}
		};

		const checkPlayButtonVisibility = () => {
			var today = new Date().getTime();
			if (
				today < props.info.active_start_time * 1000 ||
				today > props.info.active_end_time * 1000
			) {
				setIsPlayButtonHidden(true);
			}
		};

		loadMovieDetails(props.info?.id);
		checkPlayButtonVisibility();

		return () => {
			isMounted = false;
		};
	}, [props.info, getLocalStorage("access_token")]);

	function addFavoriteClick() {
		setIsFavorite(!isFavorite);
	}

	function renderIconFavorite() {
		if (isFavorite) {
			return "/images/Icons/star-fill-icon.svg";
		} else {
			return "/images/Icons/icon-star.svg";
		}
	}

	function renderTextFavorite() {
		if (isFavorite) {
			return "Remove from favorite";
		} else {
			return "Add to favorite";
		}
	}

	function getDurationText(duration) {
		if (duration === null) {
			return "";
		} else {
			let hours = parseInt(duration / 3600) || 0;
			let minutes = parseInt((duration % 3600) / 60) || 0;
			return (
				hours +
				`${t("detail_page_duration_hr")}` +
				minutes +
				`${t("detail_page_duration_min")}`
			);
		}
	}

	//TODO: (Phase2) later when more detaisl given
	function getParentalWarningText(warning) {
		let resu = "";
		if (typeof warning !== "undefined" && warning != null) {
			for (const country in warning) {
				resu = warning[country].parental_warning_type;
			}
		}
		return resu;
	}

	const redirectToPaiement = async () => {
		const checkResult = async (result) => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				return;
			}

			if (result.status !== 201) {
				console.error("Server error");
				return;
			}

			if (isNil(result.data)) {
				console.error("Server error: No data");
				return;
			}

			if (
				isNil(result.data.orderId) ||
				isNil(result.data.merchantToken) ||
				isNil(result.data.amount) ||
				isNil(result.data.currency)
			) {
				console.error("Server error: Incorrect data");
				return;
			}

			gtag.event({
				action: "subscription",
				params: {
					video_id: router.query.videoId,
					video: router.query.videoTitle,
					button: "subscribe"
				}
			});

			router.push({
				pathname: "/account/subscriptionpaiement",
				query: {
					orderId: result.data.orderId,
					merchantToken: result.data.merchantToken,
					videoId: router.query.videoId,
					video: router.query.videoTitle,
					amount: result.data.currency + result.data.amount
				}
			});
		};

		data.videoId = props.info?.id;
		const result = await startTransaction(
			{ ...data, video: props.info?.title },
			getLocalStorage("access_token")
		);

		await checkResult(result, data.videoId);
	};

	function renderPlayButton() {
		if (isPlayButtonHidden || isBusy) {
			return;
		}

		if (
			getLocalStorage("access_token") === null ||
			getLocalStorage("access_token") === "null" ||
			!getLocalStorage("access_token")
		) {
			return (
				<Button
					text={t("play_video")}
					classList=""
					margin="0 10px 0 0"
					icon="/images/Icons/play-icon.svg"
					onClick={() => {
						router.push({
							pathname: "/signin",
							query: {
								videoId: router.query.videoId,
								video: router.query.videoTitle
							}
						});
					}}
					width="240px"
				/>
			);
		} else if (isSubscribe) {
			return (
				<Button
					text={t("play_video")}
					classList=""
					margin="0 10px 0 0"
					icon="/images/Icons/play-icon.svg"
					onClick={() => {
						setIsPlayerVisible(true);
						gtag.event({
							action: "video_click",
							params: {
								video_id: router.query.videoId,
								video: router.query.videoTitle,
								size: router.query?.size,
								button: "play video"
							}
						});
					}}
					width="240px"
				/>
			);
		} else {
			return (
				<Button
					text={t("subscription_button")}
					classList=""
					margin="0 10px 0 0"
					icon="/images/Icons/play-icon.svg"
					onClick={() => {
						redirectToPaiement();
					}}
					width="240px"
				/>
			);
		}
	}

	return (
		<>
			<FullLayout>
				{props.isMovieExist ? (
					<DetailMovieSuperContainer>
						{isPlayerVisible ? (
							<PlayerContainer>
								<DynamicVideoComponent
									closePlayer={() => setIsPlayerVisible(false)}
									videoId={props.info?.id}
									page_referrer="DetailMoviePage"
								/>
							</PlayerContainer>
						) : (
							<>
								<BackgroundContainer>
									<TopBackground
										background={theme.colors.background}
										image={props.info?.cover_url}
									/>

									<DetailMovieContainerRadientBackground
										background={theme.colors.background}
									/>
								</BackgroundContainer>
								
								<MainContent>
									<DetailMovieContainer>
										<DetailMovieColums>
											<DetailMovieLeft>
												<DetailMoviePicture image={props.info?.picture_url} />
												<ButtonList>
													{renderPlayButton()}

													<Button
														text={renderTextFavorite()}
														classList="light-black"
														icon={renderIconFavorite()}
														onClick={addFavoriteClick}
														display="none"
													/>
												</ButtonList>
											</DetailMovieLeft>

											<DetailMovieRight>
												<KKText classList="title-2">{props.info?.title}</KKText>

												<UnderTitleBar>
													<UnderTitleBarItem>
														<KKText>
															{getDurationText(props.info?.duration)}
														</KKText>
													</UnderTitleBarItem>
													<UnderTitleBarItem>
														<KKText>
															{getParentalWarningText(props.info?.territory)}
														</KKText>
													</UnderTitleBarItem>
												</UnderTitleBar>

												<ButtonListMobil>
													{renderPlayButton()}

													<Button
														text={renderTextFavorite()}
														classList="light-black"
														icon={renderIconFavorite()}
														onClick={addFavoriteClick}
														display="none"
													/>
												</ButtonListMobil>

												<KKText classList="block" padding="20px 0 0 0">
													{props.info?.long_description}
												</KKText>

												<KKText classList="strong block" padding="30px 0 0 0">
													{t("cast")}
												</KKText>

												<CastList>
													{props.info?.cast &&
														props.info.cast.map((text, i) => {
															return (
																<CastElement key={i}>
																	<KKText>{text}</KKText>
																</CastElement>
															);
														})}
												</CastList>

												<ButtonListBigScreen>
													{renderPlayButton()}

													<Button
														text={renderTextFavorite()}
														classList="light-black"
														icon={renderIconFavorite()}
														onClick={addFavoriteClick}
														width="240px"
														display="none"
													/>
												</ButtonListBigScreen>
											</DetailMovieRight>
										</DetailMovieColums>
									</DetailMovieContainer>
								</MainContent>
							</>
						)}
					</DetailMovieSuperContainer>
				) : (
					<MovieMissingContainer>
						<KKText classList="title-2 center block">
							{t("video_not_found_title")}
						</KKText>

						<KKText classList="block  center" padding="10px 0 50px 0">
							{t("video_not_found_content")}
						</KKText>

						<Button
							text={t("reset_password_button")}
							classList=""
							width="100%"
							margin="10px 0"
							iconLeftAdjustment="-4px"
							onClick={() => {
								router.push({ pathname: "/" });
							}}
						></Button>
					</MovieMissingContainer>
				)}
			</FullLayout>
			<Footer />
		</>
	);
};

DetailMoviePage.propTypes = {
	info: PropTypes.object,
	isMovieExist: PropTypes.bool,
};

export default DetailMoviePage;
