import React from "react";
import Link from "next/link";
import { KKLink } from "@/common/kklink";

import {
	SearchVideoContainer,
	SearchVideoList,
	SearchVideoBox,
	SearchVideoImg,
	SearchVideoText,
	SearchVideoTextContainer,
	SearchVideoEmptyText
} from "../style/SearchVideo.style";

const SearchVideo = () => {
	const isEmpty = false;
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
			url: "Soul.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "6",
			url: "Bird-of-prey.jpg",
			title: "lord_of_ring_2"
		},
		{
			id: "7",
			url: "lord_of_ring_3.jpg",
			title: "lord_of_ring_2"
		}
	];

	return (
		<SearchVideoContainer isEmpty={isEmpty}>
			<>
				{isEmpty ? (
					<>
						<SearchVideoEmptyText>
							Sorry, no matching result. Please try something else.
						</SearchVideoEmptyText>
					</>
				) : (
					<>
						<SearchVideoTextContainer>
							<SearchVideoText>
								{listElement?.length} matching results.
							</SearchVideoText>
						</SearchVideoTextContainer>
						<SearchVideoList>
							{listElement.map((element) => {
								return (
									<SearchVideoBox key={element.id}>
										<SearchVideoImg
											url={`/images/Movie/${element.url}`}
										></SearchVideoImg>
										<Link href="/detailMovie">
											<KKLink>{element.title}</KKLink>
										</Link>
									</SearchVideoBox>
								);
							})}
						</SearchVideoList>
					</>
				)}
			</>
		</SearchVideoContainer>
	);
};

export default SearchVideo;
