import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { useRouter, withRouter } from "next/router";
import getConfig from "next/config";
import isNil from "lodash/isNil";
import nextI18NextConfig from "../../next-i18next.config";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PropTypes from "prop-types";

import DetailApi from "@/api/DetailApi";
import { DetailMoviePage } from "@/components/detailMoviePage";
import { GlobalContainer } from "@/layout/globalContainer";

const DetailsMovie = (props) => {
	const router = useRouter();
	const dispatch = useDispatch({});
	const { getVideoDetail } = DetailApi(dispatch);
	const [info, setInfos] = useState({});
	const { PROJECT_TITLE } = getPublicRuntimeConfig();
	const [isMovieExist, setIsMovieExist] = useState(true);

	useEffect(() => {
		const setMovieDetails = result => {
			if (isNil(result)) {
				console.error("Response from server empty.");
				return;
			}

			if (result.status === 404) {
				setIsMovieExist(false);
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

			if (
				isNil(result.data.active_start_time) ||
				isNil(result.data.active_end_time)
			) {
				console.error("Server error: Incorrect data");
				return;
			}

			const urlResizedPic = result.data.cover_url.replace(
				"/upload",
				"/upload/b_black,c_pad,h_270,w_480"
			);

			setInfos({
				active_end_time: result.data.active_end_time,
				active_start_time: result.data.active_start_time,
				cast: result.data.cast,
				cover_url: result.data.cover_url,
				picture_url: urlResizedPic,
				duration: result.data.duration,
				id: result.data.id,
				long_description: result.data.long_description,
				short_description: result.data.short_description,
				territory: result.data.territory,
				title: result.data.title
			});
		};

		const loadMovieDetails = async videoId => {
			if (isNil(videoId)) {
				return false;
			}

			const resultMovieDetails = await getVideoDetail(videoId);
			await setMovieDetails(resultMovieDetails);
		};

		loadMovieDetails(props.router.query.videoId);
	}, [router.query]);

	return (
		<>
			<Head>
				<title>
					{info.title + "-" + PROJECT_TITLE}
				</title>
				<meta name="Description" CONTENT={info.long_description} />
			</Head>
			<GlobalContainer>
				<DetailMoviePage info={info} isMovieExist={isMovieExist}/>
			</GlobalContainer>
		</>
	);
};

DetailsMovie.propTypes = {
	router: PropTypes.object
};

export default withRouter(DetailsMovie);

export const getServerSideProps = async ({ locale }) => {
	const { publicRuntimeConfig } = getConfig();

	return {
		props: {
			publicRuntimeConfig,
			...(await serverSideTranslations(locale, ["common"], nextI18NextConfig))
		}
	};
};
