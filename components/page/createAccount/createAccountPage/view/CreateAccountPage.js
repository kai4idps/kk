import React from "react";
import { CreateAccount } from "@/components/createAccount/createAccount";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const CreateAccountPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<CreateAccount></CreateAccount>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default CreateAccountPage;
