import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const HeaderComponent = styled.div`
	height: ${variables.headerHeight};
	padding: 0 ${variables.paddingMainContent};
	background-color: ${props => props.background};
	z-index: 1000;
`;

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: block;
		width: 100%;
	}
`;

export const LeftSide = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: block;
		width: 100%;
		position: relative;
	}
`;

export const RightSide = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none;
	}
`;

export const HamburgerMenu = styled.div`
	display: none;
	position: absolute;
	left: ${variables.paddingMainContent};
	top: 50%;
	transform: translate(0, -50%);
	width: 30px;
	height: 30px;
	z-index: 205;
	div {
		position: absolute;
		width: 20px;
		height: 2px;
		background-color: ${props => props.color};
		top: 50%;
		margin-top: -1px;
		border-radius: 2px;
		transition: 0.5s;
		&:before {
			display: block;
			content: "";
			position: absolute;
			top: -6px;
			width: 20px;
			height: 2px;
			border-radius: 2px;
			background-color: ${props => props.color};
			transition: 0.5s;
		}

		&:after {
			display: block;
			content: "";
			position: absolute;
			bottom: -6px;
			width: 20px;
			height: 2px;
			border-radius: 2px;
			background-color: ${props => props.color};
			transition: 0.5s;
		}
	}

	&.active {
		div {
			transform: rotate(45deg);
			&:before {
				top: 0;
				transform: rotate(90deg);
			}

			&:after {
				bottom: 0;
				transform: rotate(90deg);
			}
		}
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: block;
	}
`;

export const FormSearch = styled.form`
	display: none;
	max-width: 200px;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none;
	}
`;

export const InputSubmit = styled.input`
	display: none;
`;

export const SearchIcon = styled.div`
	background-image: url("/images/Icons/${props => props.image}");
	background-size: contain;
	cursor: pointer;
	display: none; /* block */
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translate(0, -50%);
	width: 20px;
	height: 20px;
	z-index: 10;
`;

export const PersonIcon = styled.div`
	background-image: url("/images/Icons/${props => props.image}");
	background-repeat: no-repeat;
	background-position: center;
	width: 20px;
	height: 20px;
	background-size: 20px;
	padding: 20px;
	cursor: pointer;
	margin-left: auto;
	&:hover {
		background-color: ${props => props.background};
		border-radius: 50%;
	}
`;

export const AccountElement = styled.div`
	width: 65px;
	text-align: right;
`;

export const LogoBlock = styled.img`
	max-width: 240px;
	max-height: 36px;
	cursor: pointer;
	margin-right: 24px;
	vertical-align: middle;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		position: absolute;
		max-width: 200px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 1;
		transition: 0.5s;
		&.hidden {
			opacity: 0;
		}
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		max-width: 150px;
	}
`;

export const MenuContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none;
	}
`;

export const MenuItem = styled.div`
	height: 100%;
	display: ${props => props.display};
	/* &:hover {
		background-color: ${props => props.backgroundHover};
		a div {
			color: ${variables.Light_02};
		}
	} */

	a {
		display: block;
		height: 100%;
		cursor: pointer;
		width: 100px;
		position: relative;
		div {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	&:last-child {
		margin-right: 0px;
	}

	&:first-of-type {
		margin-left: 0px;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		width: 100%;
		padding-bottom: 20px;
		height: auto;
		a {
			height: 30px;
			width: 100%;
			div {
				font-size: 20px;
			}
		}

		&:hover {
			background-color: transparent;
			a div {
				color: ${props => props.color};
			}
		}
	}
`;

export const MobileMenu = styled.div`
	display: none;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: block;
		position: fixed;
		top: -100%;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: ${props => props.background}F2;
		z-index: 200;
		padding-top: 150px;
		transition: 0.5s;
		&.active {
			top: 0;
		}

		hr {
			width: 50%;
			height: 1px;
			margin: 0 auto 20px auto;
			background-color: ${props => props.color};
			border: none;
		}
	}
`;

export const SearchMenuMobil = styled.div`
	display: none;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none; /* flex */
		position: absolute;
		right: -100%;
		top: 50%;
		transform: translate(0, -50%);
		transition: 0.5s;
		align-items: center;
		&.active {
			right: ${variables.paddingMainContent};
		}
	}
`;

export const SearchIconMobil = styled.div`
	display: none;
	@media screen and (max-width: ${variables.Screen_tablet}) {
		display: none; /* block */
		position: absolute;
		background-image: url("/images/Icons/${props => props.image}");
		background-size: contain;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		right: ${variables.paddingMainContent};
		top: 50%;
		transform: translate(0, -50%);
		z-index: 50;
		transition: 0.5s;
		&.active {
			margin-right: 10px;
		}
	}
`;

export const HideSearchMenu = styled.div`
	background-image: url("/images/Icons/full-arrow-icon.svg");
	background-size: contain;
	background-repeat: no-repeat;
	height: 20px;
	width: 20px;
	transition: 0.5s;
	transform: rotate(360deg);
	transition-delay: 0s;
	&.active {
		transform: rotate(180deg);
		transition-delay: 0.5s;
	}
`;

export const FormSearchMobil = styled.form`
	max-width: 200px;
`;
