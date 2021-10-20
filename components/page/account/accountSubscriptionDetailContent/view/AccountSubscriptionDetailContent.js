import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import isNil from "lodash/isNil";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { KKLink } from "@/common/kklink";
import { AccountContainer } from "@/components/account/accountContainer";
import { KKText } from "@/common/kkText";
import PurchaseApi from "@/api/PurchaseApi";
import SubscriptionApi from "@/api/SubscriptionApi";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";
import { getLocalStorage } from "@/lib/localStorage";
import * as gtag from "@/lib/gtag";

import {
	AccountSubscriptionContainer,
	AccountSubscriptionText
} from "../style/AccountSubscriptionDetailContent.style";

const { MERCHANT_ID, ORG_ID, PROJECT_ID } = getPublicRuntimeConfig();

const data = {
	merchantId: MERCHANT_ID,
	orgId: ORG_ID,
	projectId: PROJECT_ID,
	videoId: null
};

const AccountSubscriptionDetailContent = ({ onCancel }) => {
	const { t, i18n } = useTranslation("common");
	const { getPurchaseInfo } = PurchaseApi();
	const { startTransaction } = SubscriptionApi();
	const router = useRouter();

	const [nextChargeDate, setNextChargeDate] = useState(null);
	const [validateToWithGracePeriod, setValidateToWithGracePeriod] =
		useState(null);
	const [nextSubscriptionDate, setNextSubscriptionDate] = useState(null);
	const [orderStatus, setOrderStatus] = useState("NO STATUS RECEIVE");
	const [amount, setAmount] = useState("0");

	const dateFormat = datestamp => {
		const date = new Date(datestamp * 1000);

		return (
			date.getFullYear() +
			"/" +
			("0" + (date.getMonth() + 1)).slice(-2) +
			"/" +
			("0" + date.getDate()).slice(-2)
		);
	};

	useEffect(() => {
		const checkResult = async result => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				return;
			}

			if (result.status === 404) {
				setOrderStatus("default");
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

			if (!isNil(result.data.nextChargeDate)) {
				setNextChargeDate(dateFormat(result.data.nextChargeDate));
			}

			if (!isNil(result.data.nextSubscriptionDate)) {
				setNextSubscriptionDate(dateFormat(result.data.nextSubscriptionDate));
			}

			if (!isNil(result.data.validateToWithGracePeriod)) {
				setValidateToWithGracePeriod(
					dateFormat(result.data.validateToWithGracePeriod)
				);
			}

			setOrderStatus(result.data.buttonAction);
			setAmount(result.data.currency + result.data.amount);
		};

		const getInfo = async () => {
			const result = await getPurchaseInfo(getLocalStorage("access_token"));
			await checkResult(result);
		};

		getInfo();
	}, []);

	/* get the paiement token and redirect to paiement page */
	const getPaiementToken = async () => {
		const checkResult = async result => {
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
					button: "subscribe"
				}
			});
			router.push({
				pathname: "/account/subscriptionpaiement",
				query: {
					orderId: result.data.orderId,
					merchantToken: result.data.merchantToken,
					amount: result.data.currency + result.data.amount
				}
			});
		};

		const result = await startTransaction(
			data,
			getLocalStorage("access_token")
		);
		await checkResult(result);
	};

	const renderAccountSubscriptionText = lang => {
		if (lang === "zh-TW") {
			return (
				<KKText>
					{t("subscription_title")}&nbsp;
					<KKText classList="strong">{nextChargeDate}</KKText>
					&nbsp;{t("on")}&nbsp;
					<KKText classList="strong">{amount}</KKText>
				</KKText>
			);
		}
		if (lang === "ja-JP") {
			return (
				<KKText>
					<KKText classList="strong">{nextChargeDate}</KKText>
					&nbsp;{t("on")}&nbsp;
					<KKText classList="strong">{amount}</KKText>
					{t("subscription_title")}&nbsp;
				</KKText>
			);
		}
		return (
			<KKText>
				{t("subscription_title")}&nbsp;
				<KKText classList="strong">{amount}</KKText>
				&nbsp;{t("on")}&nbsp;
				<KKText classList="strong">{nextChargeDate}</KKText>
			</KKText>
		);
	};

	const renderCancelText = lang => {
		if (lang === "ja-JP") {
			return (
				<KKText>
					{t("subscription_cancel")}&nbsp;
					<KKText classList="strong">{validateToWithGracePeriod}.</KKText>
					{t("subscription_cancel_date")}&nbsp;
					<KKText classList="strong">{nextSubscriptionDate}.</KKText>
					{t("able_subscribe")}&nbsp;
				</KKText>
			);
		}

		if (lang === "zh-TW") {
			return (
				<KKText>
					{t("subscription_cancel")}&nbsp;
					<KKText classList="strong">{nextSubscriptionDate}. </KKText>
					{t("able_subscribe")}&nbsp;
					<KKText classList="strong">{validateToWithGracePeriod}</KKText>
					{t("subscription_cancel_date")}&nbsp;
				</KKText>
			);
		}

		return (
			<KKText>
				{t("subscription_cancel")}&nbsp;
				<KKText classList="strong">{validateToWithGracePeriod}.</KKText>
				&nbsp;
				{t("able_subscribe")}&nbsp;
				<KKText classList="strong">{nextSubscriptionDate}.</KKText>
			</KKText>
		);
	};

	const renderDescription = () => {
		// In progress
		if (orderStatus === "CANCEL") {
			return (
				<>
					<AccountSubscriptionText>
						{renderAccountSubscriptionText(i18n.language)}
					</AccountSubscriptionText>

					<KKLink
						classList="theme-1 inline-block"
						onClick={() => onCancel(validateToWithGracePeriod)}
					>
						{t("cancel_membership")}
					</KKLink>
				</>
			);
		}

		// Draft or Fail
		if (orderStatus === "SUBSCRIBE") {
			return (
				<>
					<AccountSubscriptionText>
						<KKText>{t("non_subscribe_page_title")}&nbsp;</KKText>
					</AccountSubscriptionText>

					<KKLink onClick={getPaiementToken} classList="theme-1 inline-block">
						{t("subscription_button")}
					</KKLink>
				</>
			);
		}

		// COMPLETED
		if (isNil(nextSubscriptionDate)) {
			if (i18n.language === "ja-JP") {
				return (
					<>
						<AccountSubscriptionText>
							<KKText>
								<KKText classList="strong">{validateToWithGracePeriod}.</KKText>
								{t("end_subscription")}&nbsp;
							</KKText>
						</AccountSubscriptionText>
					</>
				);
			}

			return (
				<>
					<AccountSubscriptionText>
						<KKText>
							{t("end_subscription")}&nbsp;
							<KKText classList="strong">{validateToWithGracePeriod}.</KKText>
						</KKText>
					</AccountSubscriptionText>
				</>
			);
		}

		// Cancel
		return (
			<>
				<AccountSubscriptionText>
					{renderCancelText(i18n.language)}
				</AccountSubscriptionText>
			</>
		);
	};

	return (
		<AccountContainer>
			<AccountSubscriptionContainer>
				{renderDescription()}
			</AccountSubscriptionContainer>
		</AccountContainer>
	);
};

AccountSubscriptionDetailContent.propTypes = {
	onCancel: PropTypes.func.isRequired,
};

export default AccountSubscriptionDetailContent;
