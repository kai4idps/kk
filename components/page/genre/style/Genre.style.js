import styled from "@emotion/styled";
import { variables } from "@/styles/styleUtils";


export const GenreContent = styled.div`
	margin-top: 20px;
`;

export const GenreVideoContainer = styled.div`
	padding: 50px 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

export const GenreVideoBox = styled.div`
	width: 20%;
	padding: 0 10px 40px 0;

	&:nth-of-type(5n) {
		padding-right: 0;
	}

	@media screen and (max-width: ${variables.Screen_Medium}) {
		width: 25%;
		&:nth-of-type(5n) {
			padding-right: 10px;
		}

		&:nth-of-type(4n) {
			padding-right: 0px;
		}
	}

	@media screen and (max-width: ${variables.Screen_small}) {
		width: 33.333%;
		&:nth-of-type(4n) {
			padding-right: 10px;
		}

		&:nth-of-type(3n) {
			padding-right: 0px;
		}
	}

	@media screen and (max-width: ${variables.Screen_tablet}) {
		width: 50%;
		&:nth-of-type(3n) {
			padding-right: 10px;
		}

		&:nth-of-type(2n) {
			padding-right: 0px;
		}
	}

	@media screen and (max-width: ${variables.Screen_mobil}) {
		width: 100%;
		padding-right: 0;
	}
`;

export const GenreVideoImg = styled.div`
	background-image: url(${props => props.url});
	background-size: cover;
	position: relative;
	display: inline-block;
	width: 100%;
	height: 170px;
	border-radius: 4px;
`;
