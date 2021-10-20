import React from "react";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { CreateAccountFail } from "@/components/createAccount/createAccountFail";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const CreateAccountFailPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<CreateAccountFail></CreateAccountFail>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default CreateAccountFailPage;
