import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@/common/button";
import { KKText } from "@/common/kkText";
import { useTheme } from "@emotion/react";
import isNil from "lodash/isNil";
import PropTypes from "prop-types";

import {
	ModalOverLay,
	ModalWrapper,
	ModalContainer,
	ModalFooterSingle,
	ModalFooter
} from "../style/Modal.style";

const Modal = ({
	confirm,
	isShowing,
	title,
	content,
	hide,
	isSingleButton = false,
	confirmText,
	cancelText
}) => {
	const theme = useTheme();
	const { t } = useTranslation("common");
	const [isClickBtn, setIsClickBtn] = useState(false);
	let confirmTextFinal = t("confirm_button");
	let cancelTextFinal = t("cancel_button");

	if (confirmText) {
		confirmTextFinal = confirmText;
	}

	if (cancelText) {
		cancelTextFinal = cancelText;
	}

	return (
		<>
			{isShowing && (
				<ModalOverLay background={theme.colors.background4}>
					<ModalWrapper>
						<ModalContainer
							background={theme.colors.background2}
							padding={isSingleButton ? "24px 36px" : "24px"}
						>
							{!isNil(title) && title !== "" && (
								<KKText classList="block title-1" padding="0 0 20px 0">
									{title}
								</KKText>
							)}

							{!isNil(content) && content !== "" && (
								<KKText classList="small">{content}</KKText>
							)}

							{isSingleButton ? (
								<ModalFooterSingle>
									<Button
										text={t("ok")}
										width="100%"
										onClick={() => hide()}
									></Button>
								</ModalFooterSingle>
							) : (
								<ModalFooter>
									<Button
										classList="dark-gray"
										text={cancelTextFinal}
										margin="0 20px 0 0"
										padding="10px 25px"
										onClick={() => hide()}
									></Button>
									<Button
										disabled={isClickBtn}
										classList=""
										text={confirmTextFinal}
										padding="10px 25px"
										onClick={() => {
											confirm();
											setIsClickBtn(true);
										}}
									></Button>
								</ModalFooter>
							)}
						</ModalContainer>
					</ModalWrapper>
				</ModalOverLay>
			)}
		</>
	);
};

Modal.propTypes = {
	confirm: PropTypes.func,
	isShowing: PropTypes.bool,
	title: PropTypes.string,
	content: PropTypes.string,
	hide: PropTypes.func,
	isSingleButton: PropTypes.bool,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string
};

export default Modal;
