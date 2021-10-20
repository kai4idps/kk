import React from "react";
import Link from "next/link";
import { KKLink } from "@/common/kklink";

import {
	FavoriteVideoContainer,
	FavoriteVideoBox,
	FavoriteVideoImg
} from "../style/FavoriteVideo.style";

const FavoriteVideo = () => {
	const listElement = [
		{
			id: "1",
			url: "lord_of_ring_1.jpg",
			title: "lord_of_ring_1"
		},
		{
			id: "2",
			url: "lord_of_ring_2.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "3",
			url: "Soul.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "4",
			url: "Bird-of-prey.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "5",
			url: "lord_of_ring_3.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "6",
			url: "lord_of_ring_1.jpg",
			title: "lord_of_ring_1"
		},
		{
			id: "7",
			url: "lord_of_ring_2.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "8",
			url: "Soul.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "9",
			url: "Bird-of-prey.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "10",
			url: "lord_of_ring_3.jpg",
			title: "lord_of_ring_2"
		}
	];

	return (
		<FavoriteVideoContainer>
			{listElement.map((element) => {
				return (
					<FavoriteVideoBox key={element.id}>
						<FavoriteVideoImg
							url={`/images/Movie/${element.url}`}
						></FavoriteVideoImg>
						<Link href="/detailMovie">
							<KKLink>{element.title}</KKLink>
						</Link>
					</FavoriteVideoBox>
				);
			})}
		</FavoriteVideoContainer>
	);
};

export default FavoriteVideo;
