import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import getPublicRuntimeConfig from "@/lib/getPublicRuntimeConfig";

export default class MyDocument extends Document {
	constructor(props) {
		super(props);
		this.state = {
			GOOGLE_ANALYTICS: getPublicRuntimeConfig().GOOGLE_ANALYTICS,
			GOOGLE_ANALYTICS_CUSTOMER:
				getPublicRuntimeConfig().GOOGLE_ANALYTICS_CUSTOMER
		};
	}

	render() {
		return (
			<Html>
				<Head>
					<script
						type="text/javascript"
						src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
					></script>

					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${this.state.GOOGLE_ANALYTICS}`}
					/>

					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${this.state.GOOGLE_ANALYTICS_CUSTOMER}`}
					/>
					
					<script
						dangerouslySetInnerHTML={{
							__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${this.state.GOOGLE_ANALYTICS}', {
							page_path: window.location.pathname,
							});

							gtag('config', '${this.state.GOOGLE_ANALYTICS_CUSTOMER}', {
							page_path: window.location.pathname,
							});

          `
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
