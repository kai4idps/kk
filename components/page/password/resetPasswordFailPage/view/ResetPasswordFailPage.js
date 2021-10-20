import React from "react";
import { FullLayout } from "@/layout/fullLayout";
import { MainContent } from "@/layout/mainContent";
import { ResetPasswordFail } from "@/components/password/resetPasswordFail";
import { Footer } from "@/layout/footer";
import { Subfooter } from "@/layout/subfooter";

const ResetPasswordFailPage = () => {
	return (
		<>
			<FullLayout>
				<MainContent>
					<ResetPasswordFail></ResetPasswordFail>
				</MainContent>
			</FullLayout>
			<Subfooter></Subfooter>
			<Footer />
		</>
	);
};

export default ResetPasswordFailPage;
