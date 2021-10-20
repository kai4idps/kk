import React from "react";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { UpdatePassWord } from "@/components/password/updatePassword";

const UpdatePassWordPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<UpdatePassWord></UpdatePassWord>
				</MainContent>
			</FullLayout>
			<Footer />
		</>
	);
};

export default UpdatePassWordPage;
