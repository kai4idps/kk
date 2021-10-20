import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "next-i18next";
import { useRouter, withRouter } from "next/router";
import jwt_decode from "jwt-decode";
import isNil from "lodash/isNil";
import * as gtag from "@/lib/gtag";
import PropTypes from "prop-types";

import { KKText } from "@/common/kkText";
import { Button } from "@/common/button";
import { FullLayout } from "@/layout/fullLayout";
import { Footer } from "@/layout/footer";
import SubscriptionApi from "@/api/SubscriptionApi";
import { getLocalStorage } from "@/lib/localStorage";

import {
	ValidateContainer,
	ValidateIcon,
	ValidateText,
	ErrorIcon
} from "../style/AccountSubscriptionValidatePage.style";

const AccountSubscriptionValidatePage = (props) => {
	const theme = useTheme();
	const { t } = useTranslation("common");
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState(false);
	const [isGetAnswer, setIsGetAnswer] = useState(false);
	const [redirect, setRedirect] = useState({ pathname: "/" });

	const { checkSubscription } = SubscriptionApi();

	useEffect(() => {
		const videoId = props.router.query.videoId;
		const orderId = props.router.query.orderId;

		if (isNil(orderId)) {
			return false;
		}

		if (!isNil(videoId)) {
			setRedirect({ pathname: "/detailsmovie", query: { videoId: videoId } });
		}

		const checkResult = result => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				return;
			}

			if (result.status !== 200) {
				console.error("Server error");
				return;
			}

			if (isNil(result.data)) {
				console.error("Server error: No data");
				return;
			}

			if (isNil(result.data.tradeStatus)) {
				console.error("Server error: Incorrect data");
				return;
			}
			if (
				result?.data?.video &&
				result.data.tradeStatus === "1" &&
				result?.data?.subscriptionPlan_endDate
			) {
				gtag.event({
					action: "subscription",
					params: {
						button: "subscription completed",
						content: new Date(result?.data?.subscriptionPlan_endDate * 1000),
						subscription_price: result?.data?.subscription_price,
						video: result?.data?.video,
						videoId: result?.data?.video_id
					}
				});
			}

			if (
				!result?.data?.video &&
				result.data.tradeStatus === "1" &&
				result?.data?.subscriptionPlan_endDate
			) {
				gtag.event({
					action: "subscription",
					params: {
						button: "subscription completed",
						content: new Date(result?.data?.subscriptionPlan_endDate * 1000),
						subscription_price: result?.data?.subscription_price
					}
				});
			}

			gtag.setUserProperties({ userType: "subscribed" });

			setIsGetAnswer(true);
			if (result.data.tradeStatus === "0") {
				setIsSuccess(false);
			} else {
				setIsSuccess(true);
			}
		};

		const checkPaymentResult = async () => {
			const result = await checkSubscription(
				getLocalStorage("access_token"),
				orderId
			);
			await checkResult(result);
		};

		checkPaymentResult();
	}, [props.router]);

	useEffect(() => {
		const videoId = props.router.query.videoId;
		if (videoId === null || typeof videoId === "undefined") {
			return false;
		}

		setRedirect({ pathname: "/detailsmovie", query: { videoId: videoId } });
	}, []);

	function getTokenDetail() {
		if (!getLocalStorage("access_token")) {
			return;
		}

		try {
			return jwt_decode(getLocalStorage("access_token"))?.email;
		} catch (error) {
			return null;
		}
	}

	return (
		<>
			<FullLayout>
				{isGetAnswer && (
					<ValidateContainer>
						{isSuccess ? (
							<>
								<ValidateIcon
									background={theme.colors.background}
									color={theme.colors.theme}
								/>

								<ValidateText>
									<KKText
										classList="title-2 center block"
										padding="20px 0 20px 0"
									>
										{t("payment_complete")}
									</KKText>

									<KKText classList="block  center">
										{t("payment_complete_text")}
									</KKText>

									<KKText classList="block  center strong">
										{getTokenDetail()}
									</KKText>
								</ValidateText>

								<Button
									text={t("payment_complete_btn")}
									classList=""
									width="100%"
									margin="10px 0"
									iconLeftAdjustment="-4px"
									onClick={() => {
										router.push(redirect);
									}}
								></Button>
							</>
						) : (
							<>
								<ErrorIcon
									background={theme.colors.background}
									color={theme.colors.theme}
								/>

								<KKText
									classList="title-2 center block"
									padding="20px 0 20px 0"
								>
									{t("payment_fail")}
								</KKText>

								<KKText classList="block  center" padding="0 0 50px 0">
									{t("payment_fail_text")}
								</KKText>

								<Button
									text={t("payment_fail_btn")}
									classList=""
									width="100%"
									margin="10px 0"
									iconLeftAdjustment="-4px"
									onClick={() => {
										router.push({ pathname: "/account/subscription/" });
									}}
								></Button>
							</>
						)}
					</ValidateContainer>
				)}
			</FullLayout>
			<Footer />
		</>
	);
};

AccountSubscriptionValidatePage.propTypes = {
	router: PropTypes.object
};

export default withRouter(AccountSubscriptionValidatePage);
