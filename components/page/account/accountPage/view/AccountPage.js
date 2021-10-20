import React from "react";

import { FullLayout } from "@/layout/fullLayout";
import { Footer } from "@/layout/footer";
import { MainContent } from "@/layout/mainContent";
import { AccountBanner } from "@/components/account/accountBanner";
import { AccountContainer } from "@/components/account/accountContainer";
import { AccountContent } from "@/components/account/accountContent";

const AccountPage = () => {
	return (
		<>
			<FullLayout>
				<AccountBanner></AccountBanner>
				<MainContent>
					<AccountContainer>
						<AccountContent></AccountContent>
					</AccountContainer>
				</MainContent>
			</FullLayout>
			<Footer></Footer>
		</>
	);
};

export default AccountPage;
