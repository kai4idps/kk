import React from "react";
import { useTranslation } from "next-i18next";

import { FullLayout } from "@/layout/fullLayout";
import { Footer } from "@/layout/footer";
import { MainContent } from "@/layout/mainContent";
import { Banner } from "@/layout/banner";
import { KKText } from "@/common/kkText";
import { KKLink } from "@/common/kklink";

import {
	ContentText,
	List 
} from "../style/cookiePolicyPage.style";


const paddingParagraph = "0 0 15px 0";
const paddingTitle = "15px 0 15px 0";

const CookiePolicyPage = () => {
	const { t } = useTranslation("common");
	const { t:tc } = useTranslation("cookiePolicy");

	return (
		<>
			<FullLayout>
				<Banner>
					<KKText classList="title-3">{t("cookie_policy")}</KKText>
				</Banner>
				<MainContent>
					<ContentText>
						<KKText>
							<KKText classList="block" padding={paddingParagraph}>
								{tc("part1_paragraph1")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part1_paragraph2")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part1_paragraph3")}
							</KKText>

							<KKText classList="block title-3" padding={paddingTitle}>
								{tc("part2_title")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part2_paragraph1")}
							</KKText>

							<KKText classList="block title-3" padding={paddingTitle}>
								{tc("part3_title")}
							</KKText>

							<KKText classList="block">
								{tc("part3_paragraph1")}
							</KKText>

							<List>
								<li>
									<KKText classList="block">
										{tc("part3_list1_item1")}
									</KKText>
								</li>
								<li>
									<KKText classList="block">
										{tc("part3_list1_item2")}
									</KKText>
								</li>
								<li>
									<KKText classList="block">
										{tc("part3_list1_item3")}
									</KKText>
								</li>
								<li>
									<KKText classList="block">
										{tc("part3_list1_item4")}
									</KKText>
								</li>
							</List>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part3_paragraph2")}
							</KKText>

							<KKText classList="block title-3" padding={paddingTitle}>
								{tc("part4_title")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part4_paragraph1")}
							</KKText>

							<KKText classList="block strong">
								{tc("part4_subtitle1")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part4_paragraph2")}
							</KKText>

							<KKText classList="block strong">
								{tc("part4_subtitle2")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part4_paragraph3")}
							</KKText>

							<KKText classList="block strong">
								{tc("part4_subtitle3")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part4_paragraph4")}
							</KKText>

							<KKText classList="block title-3" padding={paddingTitle}>
								{tc("part5_title")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part5_paragraph1")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part5_paragraph2")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part5_paragraph3")}
							</KKText>

							<List>
								<li>
									<KKText classList="block">
										{tc("part5_list1_item1")}
									</KKText>

									<List>
										<li>
											<KKText classList="block">
												{tc("part5_list2_item1")}
											</KKText>
										</li>

										<List>
											<li>
												<KKText classList="block">
													{tc("part5_list3_item1")}
												</KKText>
											</li>

											<li>
												<KKText classList="block">
													{tc("part5_list3_item2")}
													&nbsp;
													<KKLink classList="underline" target="_blank" href="https://support.google.com/analytics/answer/6004245?hl=zh-Hant">
														{tc("manage_cookies_ga_link")}
													</KKLink>
												</KKText>
											</li>
										</List>
									</List>
								</li>
							</List>

							<KKText classList="block title-3" padding={paddingTitle}>
								{tc("part6_title")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part6_paragraph1")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part6_paragraph2")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part6_paragraph3")}
							</KKText>

							<List>
								<li>
									<KKText classList="block">
										<KKLink classList="underline" target="_blank" href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop">
											{tc("part6_list1_item1")}
										</KKLink>
									</KKText>
								</li>

								<li>
									<KKLink classList="underline" target="_blank" href="https://support.apple.com/zh-tw/guide/safari/sfri11471/mac">
										{tc("part6_list1_item2")}
									</KKLink>
								</li>

								<li>
									<KKLink classList="underline" target="_blank" href="https://support.microsoft.com/zh-tw/topic/%E5%A6%82%E4%BD%95%E5%88%AA%E9%99%A4-internet-explorer-%E4%B8%AD%E7%9A%84-cookie-%E6%AA%94%E6%A1%88-bca9446f-d873-78de-77ba-d42645fa52fc">
										{tc("part6_list1_item3")}
									</KKLink>
								</li>

								<li>
									<KKLink classList="underline" target="_blank" href="https://support.mozilla.org/zh-TW/kb/block-websites-storing-site-preferences">
										{tc("part6_list1_item4")}
									</KKLink>
								</li>
							</List>

							<KKText classList="block title-3" padding={paddingTitle}>
								{tc("part7_title")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part7_paragraph1")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part7_paragraph2")}
							</KKText>

							<KKText classList="block" padding={paddingParagraph}>
								{tc("part7_paragraph3")}
							</KKText>

							<KKText classList="block">
								{tc("part7_paragraph4")}
							</KKText>
						</KKText>
					</ContentText>
				</MainContent>
			</FullLayout>
			<Footer />
		</>
	);
};

export default CookiePolicyPage;
