import React from "react";
import { AccountBlock } from "../style/AccountContainer.style";
import PropTypes from "prop-types";

const AccountContainer = ({ children }) => {
	return (
		<>
			<AccountBlock>
				{children}
			</AccountBlock>
		</>
	)
}

AccountContainer.propTypes = {
	children: PropTypes.node.isRequired
};

export default AccountContainer;
