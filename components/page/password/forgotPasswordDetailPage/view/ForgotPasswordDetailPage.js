import React from "react";
import { ForgotPassWordDetail } from "@/components/password/forgotPasswordDetail";
import { MainContent } from "@/layout/mainContent";
import { FullLayout } from "@/layout/fullLayout";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const ForgotPassWordDetailPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<ForgotPassWordDetail></ForgotPassWordDetail>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default ForgotPassWordDetailPage;
