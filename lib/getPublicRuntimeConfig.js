import getConfig from "next/config";

const getPublicRuntimeConfig = () => {
  const CLIENT_API_ENDPOINT =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_CLIENT_API_ENDPOINT;
  const MEMBER_API_ENDPOINT =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_MEMBER_API_ENDPOINT;
  const ORG_ID = getConfig().publicRuntimeConfig?.NEXT_PUBLIC_ORG_ID;
  const PAYMENT_API_ENDPOINT =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_PAYMENT_API_ENDPOINT;
  const PLAYBACK_API_ENDPOINT =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_PLAYBACK_API_ENDPOINT;
  const PROJECT_ID = getConfig().publicRuntimeConfig?.NEXT_PUBLIC_PROJECT_ID;
  const MERCHANT_ID = getConfig().publicRuntimeConfig?.NEXT_PUBLIC_MERCHANT_ID;
  const BITMOVIN_LINCENSE_KEY =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_BITMOVIN_LINCENSE_KEY;
  const ECPAY_SERVER_TYPE =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_ECPAY_SERVER_TYPE;
  const PROJECT_TITLE =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_PROJECT_TITLE;
  const FAVICON = getConfig().publicRuntimeConfig?.NEXT_PUBLIC_FAVICON;
  const ENABLED_EMAIL_SIGNIN =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_ENABLED_EMAIL_SIGNIN;
  const ENABLED_GOOGLE_SIGNIN =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_ENABLED_GOOGLE_SIGNIN;
  const ENABLED_APPLE_SIGNIN =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_ENABLED_APPLE_SIGNIN;
  const SSO_GOOGLE_CLIENT_ID =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_SSO_GOOGLE_CLIENT_ID;
  const GOOGLE_ANALYTICS =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  const SSO_APPLE_CLIENT_ID =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_SSO_APPLE_CLIENT_ID;
  const SSO_APPLE_REDIRECT_URL =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_SSO_APPLE_REDIRECT_URL;
  const GOOGLE_ANALYTICS_CUSTOMER =
    getConfig().publicRuntimeConfig?.NEXT_PUBLIC_GOOGLE_ANALYTICS_CUSTOMER;
  const WEB_VERSION = "1.1.21";

  return {
    MEMBER_API_ENDPOINT,
    PAYMENT_API_ENDPOINT,
    CLIENT_API_ENDPOINT,
    PLAYBACK_API_ENDPOINT,
    ORG_ID,
    PROJECT_ID,
    MERCHANT_ID,
    BITMOVIN_LINCENSE_KEY,
    ECPAY_SERVER_TYPE,
    ENABLED_EMAIL_SIGNIN,
    ENABLED_GOOGLE_SIGNIN,
    ENABLED_APPLE_SIGNIN,
    SSO_GOOGLE_CLIENT_ID,
    GOOGLE_ANALYTICS,
    SSO_APPLE_CLIENT_ID,
    SSO_APPLE_REDIRECT_URL,
    GOOGLE_ANALYTICS_CUSTOMER,
    PROJECT_TITLE,
    FAVICON,
    WEB_VERSION,
  };
};

export default getPublicRuntimeConfig;
