import React from "react";
import { FavoriteVideo } from "@/components/favorite/favoriteVideo";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";

const FavoriteVideoPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<FavoriteVideo></FavoriteVideo>
				</MainContent>
			</FullLayout>
			<Footer></Footer>
		</>
	);
};

export default FavoriteVideoPage;
