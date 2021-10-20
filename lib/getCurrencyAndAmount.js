import isNil from "lodash/isNil";

const getCurrencyAndAmount = (currency, amount, currencyCode) => {
	if (!isNil(currencyCode)) {
		const minorUnit = new Intl.NumberFormat(undefined, {
			style: "currency",
			currency: currencyCode
		}).resolvedOptions().maximumFractionDigits;
		const resu =
			currencyCode + " " + amount.toString().slice(0, minorUnit * -1);

		return resu;
	}

	if (!isNil(currency)) {
		return currency + " " + amount;
		/* let currencyTranslate = null;
		switch (currency) {
			case 1: 
				currencyTranslate = "USD";
				break;
			case 2: 
				currencyTranslate = "JPY";
				break;
			case 3: 
				currencyTranslate = "TWD";
				break;
			case 4: 
				currencyTranslate = "AUD";
				break;
			case 5: 
				currencyTranslate = "ZAR";
				break;
			case 6: 
				currencyTranslate = "NZD";
				break;
			case 7: 
				currencyTranslate = "EUR";
				break;
			case 8: 
				currencyTranslate = "HKD";
				break;
			case 9: 
				currencyTranslate = "MXN";
				break;
			case 10: 
				currencyTranslate = "CAD";
				break;
			case 11: 
				currencyTranslate = "CHF";
				break;
			case 12: 
				currencyTranslate = "GBP";
				break;
			case 13: 
				currencyTranslate = "SEK";
				break;
			case 14: 
				currencyTranslate = "SGB";
				break;
			case 15: 
				currencyTranslate = "THB";
				break;
			case 16: 
				currencyTranslate = "CNY";
				break;
			default:
				currencyTranslate = "???"
		}

		return currencyTranslate + " " + amount; */
	}

	return null;
};

export default getCurrencyAndAmount;
