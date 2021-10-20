import React from "react";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Detail } from "@/components/createAccount/detail";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const CreateAccountDetailPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<Detail></Detail>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default CreateAccountDetailPage;
