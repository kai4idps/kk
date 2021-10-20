import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { FullLayout } from "@/layout/fullLayout";
import { Footer } from "@/layout/footer";
import { MainContent } from "@/layout/mainContent";
import { Banner } from "@/layout/banner";
import { KKText } from "@/common/kkText";
import { useTranslation } from "next-i18next";
import GetPageApi from "@/api/GetPageApi";
import { ContentText } from "../style/PrivacyPolicyPage.style";

const PrivacyPolicyPage = () => {
	const { t } = useTranslation("common");
	const dispatch = useDispatch();
	const { getPolicyPageDetail } = GetPageApi(dispatch);
	const [content, setContent] = useState(null);

	useEffect(() => {
		getPolicyPageDetail()
			.then(result => {
				setContent(result.data.content);
			})
			.catch(error => {
				console.error("getPolicyPageDetail", error);
			});
		return () => {};
	}, []);

	return (
		<>
			<FullLayout>
				<Banner>
					<KKText classList="title-3">{t("privacy_policy")}</KKText>
				</Banner>
				<MainContent>
					<ContentText>
						<KKText classList="small block">
							<ReactMarkdown>{content}</ReactMarkdown>
						</KKText>
					</ContentText>
				</MainContent>
			</FullLayout>
			<Footer />
		</>
	);
};

export default PrivacyPolicyPage;
