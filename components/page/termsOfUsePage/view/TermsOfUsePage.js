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

import { ContentText } from "../style/TermsOfUsePage.style";

const TermsOfUsePage = () => {
	const { t } = useTranslation("common");
	const dispatch = useDispatch();
	const { getTermsOfUsePageDetail } = GetPageApi(dispatch);
	const [content, setContent] = useState(null);

	useEffect(() => {
		getTermsOfUsePageDetail()
			.then(result => {
				setContent(result.data.content);
			})
			.catch(error => {
				console.error("getTermsOfUsePageDetail", error);
			});
		return () => {};
	}, []);

	return (
		<>
			<FullLayout>
				<Banner>
					<KKText classList="title-3">{t("terms_of_use")}</KKText>
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

export default TermsOfUsePage;
