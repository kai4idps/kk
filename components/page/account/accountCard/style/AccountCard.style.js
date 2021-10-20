import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";

export const SectionAccountCard = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

export const CardContainer = styled.div`
	width: calc(33.333% - 10px);
	margin: 20px 0 0 0px;
	border-radius: 8px;
	background-color: ${props => props.background};
	&:nth-of-type(3n + 1) {
		margin-right: 10px;
	}

	&:nth-of-type(3n + 2) {
		margin-right: 5px;
		margin-left: 5px;
	}

	&:nth-of-type(3n + 3) {
		margin-left: 10px;
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		width: calc(50% - 10px);
		&:nth-of-type(2n + 1) {
			margin-right: 10px;
			margin-left: 0;
		}

		&:nth-of-type(2n + 2) {
			margin-right: 0;
			margin-left: 10px;
		}
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		width: 100%;
		&:nth-of-type(3n + 1) {
			margin-right: 0px;
		}

		&:nth-of-type(3n + 2) {
			margin-right: 0px;
			margin-left: 0px;
		}

		&:nth-of-type(3n + 3) {
			margin-left: 0px;
		}
	}
`;

export const CardTitle = styled.div`
	margin: 0 0 20px;
	padding: 20px;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	background-color: ${props => props.background};
	display: flex;
	flex-direction: row;
`;

export const CardTitleText = styled.div`
	position: relative;
	padding-left: 30px;
	&:before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(0, -50%);
		width: 24px;
		height: 24px;
		background-size: contain;
		background-repeat: no-repeat;
	}

	&:before {
		background-image: url("/images/Icons/${props => props.image}");
	}
`;

export const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
	font-size: 16px;
	color: ${variables.Light_02};
`;

export const CardContentDetail = styled.div`
	padding: 0 0 15px;
	border-radius: 8px;
	cursor: pointer;
`;
