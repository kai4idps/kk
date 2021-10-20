import React from "react";
import { Player, getBVKDrmConfig } from "playcraft";
import PropTypes from "prop-types";

import * as gtag from "@/lib/gtag";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";
import { getLocalStorage } from "@/lib/localStorage";

const VideoPlayer = props => {
	const { BITMOVIN_LINCENSE_KEY, PLAYBACK_API_ENDPOINT } =
		getPublicRuntimeConfig();

	/* Wait to know if need to delete or not */
	// if (!global.document) {
	//	global.document = {};
	//}

	function getPercent(number, total) {
		let sec = parseFloat(number);
		let totalVideoSec = parseFloat(total);
		if (isNaN(number) || isNaN(total)) {
			return "-";
		}
		if (total <= 0) {
			return "0%";
		}
		return Math.round((sec / totalVideoSec) * 10000) / 100.0 > 100
			? "100%"
			: Math.round((sec / totalVideoSec) * 10000) / 100.0 + "%";
	}

	return (
		<Player
			drm={getBVKDrmConfig}
			host={PLAYBACK_API_ENDPOINT}
			content={{
				contentType: "videos",
				contentId: props.videoId
				//contentId: "5fbf9eb0-7bb4-4457-b744-f5eabe4c0de9"
			}}
			accessToken={"Bearer " + getLocalStorage("access_token")}
			deviceId="sample-device-0"
			customHeader={{
				"X-Device-Type": "web"
			}}
			onBack={props.closePlayer}
			licenseKey={BITMOVIN_LINCENSE_KEY}
			onLogging={(type, property) => {
				if (
					type === "video_playback_stopped" ||
					type === "video_playback_ended" ||
					type === "video_seeking_ended"
				) {
					gtag.event({
						action: "video_playback_ended",
						params: {
							page_title: "video_full_screen",
							page_referrer: props?.page_referrer,
							video_id: property.id,
							video: property.name,
							video_playback_ended_at_percentage: getPercent(
								property.current_position,
								property.video_total_duration
							),
							video_total_played_duration: property.video_total_duration
						}
					});
				}

				if (type === "video_playback_began") {
					gtag.event({
						action: "video_playback_began",
						params: {
							page_title: "video_full_screen",
							page_referrer: props?.page_referrer,
							video_id: property.id,
							video: property.name,
							video_startup_time: property.video_startup_time
						}
					});
				}
			}}
			autoplay
			thumbnailSeeking
		/>
	);
};

VideoPlayer.propTypes = {
	closePlayer: PropTypes.func,
	videoId: PropTypes.string,
	page_referrer: PropTypes.string
};

export default VideoPlayer;
