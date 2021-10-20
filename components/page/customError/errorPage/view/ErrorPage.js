import React from "react";
import { Error } from "@/components/customError/error";
import { FullLayout } from "@/layout/fullLayout";
import { Footer } from "@/layout/footer";

const ErrorPage = () => {

	return (
		<>
			<FullLayout>
				<Error></Error>
			</FullLayout>
			<Footer />
		</>
	);
};

export default ErrorPage;
