import React from "react";
import { ResetPasswordSuccess } from "@/components/password/resetPasswordSuccess";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const ResetPasswordSuccessPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<ResetPasswordSuccess></ResetPasswordSuccess>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default ResetPasswordSuccessPage;
