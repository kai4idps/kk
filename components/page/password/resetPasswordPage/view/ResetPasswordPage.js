import React from "react";
import { ResetPassword } from "@/components/password/resetPassword";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const ResetPasswordPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<ResetPassword></ResetPassword>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default ResetPasswordPage;
