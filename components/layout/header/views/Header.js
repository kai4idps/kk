import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { InputText } from "@/common/inputText";
import { KKLink } from "@/common/kklink";
import { useTheme } from "@emotion/react";
import * as gtag from "@/lib/gtag";
import { getLocalStorage } from "@/lib/localStorage";
import GetPageApi from "@/api/GetPageApi";

import {
	HeaderComponent,
	HeaderContent,
	LeftSide,
	RightSide,
	HamburgerMenu,
	LogoBlock,
	FormSearch,
	SearchIcon,
	InputSubmit,
	AccountElement,
	PersonIcon,
	MenuContainer,
	MenuItem,
	SearchIconMobil,
	MobileMenu,
	SearchMenuMobil,
	HideSearchMenu,
	FormSearchMobil
} from "../style/Header.style";

const Header = () => {
	const router = useRouter();
	const theme = useTheme();
	const dispatch = useDispatch();
	const { t } = useTranslation("common");
	const { getListPages } = GetPageApi(dispatch);

	const reduxToken = useSelector(state => state.auth);

	const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
	const [inputText, setInputText] = useState("");
	const [isSearchMobile, setIsSearchMobile] = useState(false);

	const renderComponent = () => {
		if (
			router.pathname === "/signin" ||
			router.pathname === "/signin/resetpassword" ||
			router.pathname.indexOf("signin/createaccountdetail") >= 0
		) {
			return <></>;
		}

		if (getLocalStorage("access_token") === "null" ||
			getLocalStorage("access_token") === null ||
			!getLocalStorage("access_token")) {
			return (
				<Link href="/signin">
					<KKLink>{t("log_in_page_signin")}</KKLink>
				</Link>
			);
		} else {
			return (
				<Link href="/account">
					<PersonIcon
						image={theme.images.personIcon}
						background={theme.colors.background3}
						onClick={() => {
							gtag.event({
								action: "click",
								params: {
									button: "account",
									module: "navigation"
								}
							});
						}}
					/>
				</Link>
			);
		}
	};

	const renderComponentMobil = () => {
		if (getLocalStorage("access_token") === "null" ||
			getLocalStorage("access_token") === null ||
			!getLocalStorage("access_token")) {
			return (
				<MenuItem color={renderRedText("/signin")}>
					<Link href="/signin">
						<KKLink>
							<div>{t("log_in_page_signin")}</div>
						</KKLink>
					</Link>
				</MenuItem>
			);
		} else {
			return (
				<MenuItem color={renderRedText("/account")}>
					<Link href="/account">
						<KKLink>
							<div
								onClick={() => {
									gtag.event({
										action: "click",
										params: {
											button: "account",
											module: "navigation"
										}
									});
								}}
							>
								{t("accountpage_account")}
							</div>
						</KKLink>
					</Link>
				</MenuItem>
			);
		}
	};

	const renderRedText = path => {
		if (path !== router?.route) {
			return undefined;
		}

		return "true";
	};

	const changeHamburgerMenuActive = () => {
		if (hamburgerMenuActive) {
			document.body.classList.remove("lock-scroll");
		} else {
			document.body.classList.add("lock-scroll");
		}
		
		setHamburgerMenuActive(!hamburgerMenuActive);
	};

	const handleSubmit = event => {
		event.preventDefault();

		if (inputText === "") {
			return;
		}

		router.push({
			pathname: "/search",
			query: {
				data: inputText
			}
		});
	};

	const searchMobilClick = event => {
		if (isSearchMobile) {
			handleSubmit(event);
		} else {
			setIsSearchMobile(true);
		}
	};

	const renderMenuItemLabel = value => {
		if (value === "home") {
			return <>{t("homepage_home")}</>;
		}
		if (value === "") {
			return <>{t("homepage_home")}</>;
		}
		return <div>{value}</div>;
	};

	return (
		<HeaderComponent background={theme.colors.background}>
			<HeaderContent>
				<LeftSide>
					<LogoBlock
						className={isSearchMobile ? "hidden" : ""}
						onClick={async () => {
							await getListPages();
							if (router.pathname === "/") {
								window.scrollTo(0, 0);
							} else {
								router.push({
									pathname: "/"
								});
							}
						}}
						src={theme.images.logo}
					/>

					<MenuContainer>
						{reduxToken.page_list &&
							reduxToken.page_list.map((menu, index) => (
								<MenuItem
									key={index}
									display={renderRedText(menu.path)
											? "none"
											: "block"}
									backgroundHover={theme.colors.theme2}
								>
									<KKLink>
										<div
											onClick={() => {
												if (router.pathname === menu.path) {
													window.scrollTo(0, 0);
												} else {
													gtag.event({
														action: "click",
														params: {
															button: menu?.label,
															module: "navigation"
														}
													});

													router.push({
														pathname: "/"
													});
												}
											}}
										>
											{renderMenuItemLabel(menu.name)}
										</div>
									</KKLink>
								</MenuItem>
							))}
					</MenuContainer>
				</LeftSide>

				<RightSide>
					<FormSearch onSubmit={handleSubmit}>
						<SearchIcon
							type="submit"
							onClick={handleSubmit}
							image={theme.images.searchIcon}
						/>

						<InputText
							placeholder="Search"
							padding="10px 10px 10px 35px"
							width="200px"
							id="searchInput"
							value={inputText}
							clearButton={true}
							onChange={e => {
								setInputText(e.target.value);
							}}
							onClick={() => {
								setInputText("");
							}}
						/>

						<InputSubmit type="submit" value="Search" />
					</FormSearch>
					<AccountElement>
						{renderComponent()}
					</AccountElement>
				</RightSide>
			</HeaderContent>

			<HamburgerMenu
				color={theme.colors.text}
				className={hamburgerMenuActive ? "active" : ""}
				onClick={() => changeHamburgerMenuActive()}
			>
				<div></div>
			</HamburgerMenu>

			<MobileMenu
				className={hamburgerMenuActive ? "active" : ""}
				background={theme.colors.background}
				color={theme.colors.text}
			>
				{reduxToken.page_list &&
					reduxToken.page_list.map((menu, index) => (
						<MenuItem
							key={index}
							color={
								renderRedText(menu.path)
									? theme.colors.theme
									: theme.colors.text
							}
						>
							<KKLink classList="big">
								<div
									onClick={() => {
										gtag.event({
											action: "click",
											params: {
												button: menu?.label,
												module: "navigation"
											}
										});

										if (router.pathname === menu.path) {
											changeHamburgerMenuActive();
										} else {
											router.push({
												pathname: "/"
											});
										}
									}}
								>
									{renderMenuItemLabel(menu.name)}
								</div>
							</KKLink>
						</MenuItem>
					))}
				<hr />
				{renderComponentMobil()}
			</MobileMenu>

			<SearchIconMobil
				className={isSearchMobile ? "active" : ""}
				onClick={searchMobilClick}
				image={theme.images.searchIcon}
			/>

			<SearchMenuMobil className={isSearchMobile ? "active" : ""}>
				<HideSearchMenu
					className={isSearchMobile ? "active" : ""}
					onClick={() => setIsSearchMobile(false)}
				/>
				<FormSearchMobil onSubmit={handleSubmit}>
					<InputText
						placeholder="Search"
						padding="10px 10px 10px 10px"
						width="200px"
						id="searchInputMobil"
						value={inputText}
						onChange={e => {
							setInputText(e.target.value);
						}}
						onClick={() => {
							setInputText("");
						}}
					/>

					<InputSubmit type="submit" value="Search" />
				</FormSearchMobil>
			</SearchMenuMobil>
		</HeaderComponent>
	);
};

export default Header;
