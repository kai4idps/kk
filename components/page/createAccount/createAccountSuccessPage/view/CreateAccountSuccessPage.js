import React from "react";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { CreateAccountSuccess } from "@/components/createAccount/createAccountSuccess";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const CreateAccountSuccessPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<CreateAccountSuccess></CreateAccountSuccess>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default CreateAccountSuccessPage;
