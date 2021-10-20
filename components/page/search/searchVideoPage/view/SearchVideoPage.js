import React from "react";
import { SearchVideo } from "@/components/search/searchVideo";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";

const SearchVideoPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<SearchVideo></SearchVideo>
				</MainContent>
			</FullLayout>
			<Footer></Footer>
		</>
	);
};

export default SearchVideoPage;
