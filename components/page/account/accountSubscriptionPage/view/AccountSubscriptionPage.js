import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import isNil from "lodash/isNil";
import isArray from "lodash/isArray";

import { AccountSubscriptionBanner } from "@/components/account/accountSubscriptionBanner";
import { AccountSubscriptionDetailContent } from "@/components/account/accountSubscriptionDetailContent";
import { AccountTable } from "@/components/account/accountTable";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { Modal } from "@/common/modal";
import SubscriptionApi from "@/api/SubscriptionApi";
import PurchaseApi from "@/api/PurchaseApi";
import { getLocalStorage } from "@/lib/localStorage";
import * as gtag from "@/lib/gtag";

const AccountSubscriptionPage = () => {
	const router = useRouter();
	const [isShowing, setIsShowing] = useState(false);

	const { cancelSubscription } = SubscriptionApi();

	const { getPurchaseHistory, getPurchasePlan } = PurchaseApi();
	const { t } = useTranslation("common");

	const [accountHistory, setAccountHistory] = useState([]);
	const [modalContent, setModalContent] = useState(
		t("cancel_subscription_context")
	);

	useEffect(() => {
		const checkResult = async result => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				return;
			}

			if (result.status === 404) {
				setAccountHistory([]);
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

			if (
				isNil(result.data.has_active_purchase) ||
				isNil(result.data.purchase_histories)
			) {
				console.error("Server error: Incorrect data");
				return;
			}

			setAccountHistory(result.data.purchase_histories);
		};

		const getHistory = () => {
			getPurchasePlan(getLocalStorage("access_token"))
				.then(async result => {
					if (result === null) {
						return;
					}
					if (isArray(result?.data)) {
						const getPurchaseHistoryResult = await getPurchaseHistory(
							getLocalStorage("access_token"),
							result.data[0].plan_type
						);
						checkResult(getPurchaseHistoryResult);
					}
				})
				.catch(err => console.error(err));
		};

		getHistory();
	}, [getLocalStorage("access_token")]);

	const handleConfirm = () => {
		cancelSubscription(getLocalStorage("access_token"))
			.then(result => {
				if (result === null) {
					return;
				}

				if (result.status === 201) {
					gtag.event({
						action: "subscription",
						params: {
							button: "cancel membership",
							content: new Date(result?.data?.subscriptionPlan_endDate * 1000),
							subscription_price: result?.data?.subscription_price
						}
					});
					router.push({ pathname: "/account/subscription" });
				}
			})
			.catch(err => console.error("cancelSubscription", err));
	};

	const setModalContentAndShow = date => {
		setModalContent(t("cancel_subscription_context", { date: date }));
		setIsShowing(true);
	};

	return (
		<>
			<FullLayout>
				<Modal
					isShowing={isShowing}
					title={t("cancel_membership")}
					content={modalContent}
					hide={() => setIsShowing(!isShowing)}
					confirm={() => handleConfirm()}
				/>

				<AccountSubscriptionBanner />

				<MainContent>
					<AccountSubscriptionDetailContent onCancel={setModalContentAndShow} />

					<AccountTable history={accountHistory} />
				</MainContent>
			</FullLayout>
			<Footer />
		</>
	);
};

export default AccountSubscriptionPage;
