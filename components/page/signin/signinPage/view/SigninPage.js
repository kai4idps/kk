import React from "react";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Signin } from "@/components/signin/signin";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const SigninPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<Signin></Signin>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default SigninPage;
