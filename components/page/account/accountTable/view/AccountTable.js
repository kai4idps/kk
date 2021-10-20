import React from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "@emotion/react";
import isNil from "lodash/isNil";
import getCurrencyAndAmount from "lib/getCurrencyAndAmount";
import PropTypes from "prop-types";

import { AccountContainer } from "@/components/account/accountContainer";
import { KKText } from "@/common/kkText";

import {
	AccountSubscriptionContainer,
	AccountSubscriptionContainerMobil,
	AccountSubscriptionTitle,
	AccountSubscriptionElement,
	Table,
	Thread,
	Tbody,
	Tr,
	Th,
	Td
} from "../style/AccountTable.style";

const AccountTable = (props) => {
	const { t } = useTranslation("common");
	const theme = useTheme();

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

	const rendererTable = () => {
		if (!isNil(props.history) && props.history.length > 0) {
			return (
				<AccountContainer>
					<AccountSubscriptionContainer>
						<Table>
							<Thread>
								<Tr>
									<Th>
										<KKText classList="theme-1">
											{t("subscription_history")}
										</KKText>
									</Th>
									<Th>
										<KKText classList="theme-1">
											{t("subscription_price")}
										</KKText>
									</Th>
									<Th>
										<KKText classList="theme-1">
											{t("subscription_date_charge")}
										</KKText>
									</Th>
									<Th>
										<KKText classList="theme-1">
											{t("subscription_plan_end")}
										</KKText>
									</Th>
								</Tr>
							</Thread>
							<Tbody>
								{props.history.map((element, i) => {
									return (
										<Tr key={i}>
											<Td>
												<KKText>{element.plan_name}</KKText>
											</Td>
											<Td>
												<KKText>
													{getCurrencyAndAmount(
														element.currency,
														element.amount,
														element.currency_code
													)}
												</KKText>
											</Td>
											<Td>
												<KKText>{dateFormat(element.validate_from)}</KKText>
											</Td>
											<Td>
												<KKText>{dateFormat(element.validate_to)}</KKText>
											</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</AccountSubscriptionContainer>

					<AccountSubscriptionContainerMobil>
						<AccountSubscriptionTitle>
							<KKText classList="theme-1">{t("subscription_history")}</KKText>
						</AccountSubscriptionTitle>

						{props.history.map((element, i) => {
							return (
								<AccountSubscriptionElement key={i} border={theme.colors.color}>
									<KKText padding="20px 0 0 0" classList="block">
										{element.plan_name}
									</KKText>
									<Table>
										<Thread>
											<Tr>
												<Th>
													<KKText classList="theme-1 extra-small">
														{t("subscription_price")}
													</KKText>
												</Th>
												<Th>
													<KKText classList="theme-1 extra-small">
														{t("subscription_date_charge")}
													</KKText>
												</Th>
												<Th>
													<KKText classList="theme-1 extra-small">
														{t("subscription_plan_end")}
													</KKText>
												</Th>
											</Tr>
										</Thread>
										<Tbody>
											<Tr>
												<Td>
													<KKText classList="small">
														{getCurrencyAndAmount(
															element.currency,
															element.amount,
															element.currency_code
														)}
													</KKText>
												</Td>
												<Td>
													<KKText classList="small">
														{dateFormat(element.validate_from)}
													</KKText>
												</Td>
												<Td>
													<KKText classList="small">
														{dateFormat(element.validate_to)}
													</KKText>
												</Td>
											</Tr>
										</Tbody>
									</Table>
								</AccountSubscriptionElement>
							);
						})}
					</AccountSubscriptionContainerMobil>
				</AccountContainer>
			);
		}
	};

	return <>{rendererTable()}</>;
};

AccountTable.propTypes = {
	history: PropTypes.array
};

export default AccountTable;
