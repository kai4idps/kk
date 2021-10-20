const path = require("path");

module.exports = {
	i18n: {
		defaultLocale: "en",
		locales: ["en", "zh-TW", "ja-JP"],
		localePath: path.resolve("./public/locales"),
		browserLanguageDetection: false,
		serverLanguageDetection: false,
		localeDetection: false
	}
};
