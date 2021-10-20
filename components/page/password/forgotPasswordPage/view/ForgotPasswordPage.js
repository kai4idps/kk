import React from "react";
import { ForgotPassWord } from "@/components/password/forgotPassword";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const ForgotPassWordPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<ForgotPassWord></ForgotPassWord>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default ForgotPassWordPage;
