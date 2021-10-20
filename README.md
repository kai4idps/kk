# KK-BV-WEB

KK-BV-WEB is a website to do video streaming made by 4idps for KKstream.

## Setup

Use yarn package manager inside the git folder to setup the project

```bash
yarn
```

## Usage

To launch a local version of the website use this command line inside the git folder of the project:

```bash
yarn run dev:[env]
```

Where [env] refeer to different .env files. Values can be (dev, stag, prod).
Then you can access the website by opening the following link in your browser:
http://localhost:5001 (http://localhost:5008 for dev env)

## Build

To build the project you just need to use the command:

```bash
yarn run build:[env]
```

Where [env] refeer to different .env files. Values can be (dev, stag, prod).

## Config

### .env files

The .env.xxx files are used to configure the difference between each environement. If you want to create a new env you can duplicate one file, change its name and update the variable inside. All files need to have the same variables.

Next you need to update the Jenkinsfile and add a new build config depending of the new environement.

**env**

- NEXT_PUBLIC_MEMBER_API_ENDPOINT : Member Server
- NEXT_PUBLIC_CLIENT_API_ENDPOINT : KK Server
- NEXT_PUBLIC_PAYMENT_API_ENDPOINT : Payment Server
- NEXT_PUBLIC_PLAYBACK_API_ENDPOINT : Video endpoint
- NEXT_PUBLIC_BITMOVIN_LINCENSE_KEY : KK video sdk lincense
- NEXT_PUBLIC_ORG_ID
- NEXT_PUBLIC_MERCHANT_ID
- NEXT_PUBLIC_PROJECT_ID
- NEXT_PUBLIC_ECPAY_SERVER_TYPE : Stage or Prod
- NEXT_PUBLIC_PROJECT_TITLE
- NEXT_PUBLIC_FAVICON: favicon

**Third-party ID、URL**

- NEXT_PUBLIC_GOOGLE_ANALYTICS
- NEXT_PUBLIC_SSO_GOOGLE_CLIENT_ID
- NEXT_PUBLIC_GOOGLE_ANALYTICS_CUSTOMER
- NEXT_PUBLIC_SSO_APPLE_CLIENT_ID
- NEXT_PUBLIC_SSO_APPLE_REDIRECT_URL
- NEXT_PUBLIC_ENABLED_EMAIL_SIGNIN : check email signin isVisible
- NEXT_PUBLIC_ENABLED_GOOGLE_SIGNIN : check Google signin button isVisible
- NEXT_PUBLIC_ENABLED_APPLE_SIGNIN : check Apple signin button isVisible

### Languages

You can change the languages traduction by updating the files inside the public/locales folders. Each folders should have the same files with the sames json key. Only the json values should be different from one files to another.

## Technique

This website is made using libraries and frameworks:

- React
- Next
- Emotion
- Redux

## Environment version

Project is created using:

- Node.js : v14.16.1

## Runtime Configuration

example:

```properties
docker build . -t docker-image-name
docker run -d -e NEXT_PUBLIC_ENABLED_EMAIL_SIGNIN='false' -e NEXT_PUBLIC_ENABLED_GOOGLE_SIGNIN='false' --name docker-container-name -p 5001:3000 docker-image-name
```

## Support

4idps (https://www.4idps.com/):

- [yohannPerson](https://github.com/yohannPerson) (yohann@4idps.com)
- [kai](https://github.com/kai4idps) (kai@4idps.com)

## Project status

In development
