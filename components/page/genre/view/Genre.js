import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { DropDown } from "@/common/dropdown";
import { KKLink } from "@/common/kklink";

import {
	GenreContent,
	GenreVideoContainer,
	GenreVideoBox,
	GenreVideoImg
} from "../style/Genre.style";

const listGenre = [
	{ text: "All", value: "all", default: true },
	{ text: "Action", value: "action", default: false },
	{ text: "Romance", value: "romance", default: false },
	{ text: "Science fiction", value: "sf", default: false },
	{ text: "Comedie", value: "comedie", default: false },
	{ text: "Drama", value: "drama", default: false },
	{ text: "Horor", value: "horor", default: false },
	{ text: "Fantasie", value: "fantasie", default: false }
];

const listVideo = [
	{
		id: "1",
		url: "lord_of_ring_1.jpg",
		title: "Lord of the ring: la communaute de l'anneau",
		genre: "fantasie"
	},
	{
		id: "2",
		url: "lord_of_ring_2.jpg",
		title: "Lord of the ring: The two towers",
		genre: "fantasie"
	},
	{
		id: "3",
		url: "Soul.jpg",
		title: "Soul",
		genre: "comedie"
	},
	{
		id: "4",
		url: "Bird-of-prey.jpg",
		title: "Bird of prey",
		genre: "action"
	},
	{
		id: "5",
		url: "lord_of_ring_3.jpg",
		title: "Lord of the ring - Le retour du roi",
		genre: "fantasie"
	},
	{
		id: "6",
		url: "lord_of_ring_1.jpg",
		title: "Lord of the ring: The Fellowship of the Ring",
		genre: "fantasie"
	},
	{
		id: "7",
		url: "lord_of_ring_2.jpg",
		title: "Lord of the ring: Les deux tours",
		genre: "fantasie"
	},
	{
		id: "8",
		url: "Soul.jpg",
		title: "Soul",
		genre: "comedie"
	},
	{
		id: "9",
		url: "Bird-of-prey.jpg",
		title: "Harley queen and her band",
		genre: "action"
	},
	{
		id: "10",
		url: "lord_of_ring_3.jpg",
		title: "Lord of the ring : return of the king",
		genre: "fantasie"
	}
];

const Genre = () => {
	const [movieList, setMovieList] = useState([]);
	function getList(genre) {
		const newList = [];
		listVideo.forEach(function (movie) {
			if (movie.genre === genre || genre === "all") {
				newList.push(movie);
			}
		});
		setMovieList(newList);
	}

	useEffect(() => {
		getList("all");
	}, []);

	return (
		<>
			<FullLayout>
				<MainContent>
					<GenreContent>
						<DropDown 
							classList={listGenre.length > 6 ? "column-3" : ""} 
							list={listGenre} 
							width="220px" 
							onChange={getList} 
						/>

						<GenreVideoContainer>
							{movieList.map((element) => {
								return (
									<GenreVideoBox key={element.id}>
										<GenreVideoImg
											url={`/images/Movie/${element.url}`}
										></GenreVideoImg>
										<Link href="/detailMovie">
											<KKLink>{element.title}</KKLink>
										</Link>
									</GenreVideoBox>
								);
							})}
						</GenreVideoContainer>
					</GenreContent>
				</MainContent>
			</FullLayout>
			<Footer />
		</>
	);
};

export default Genre;
