import { ENV } from "./env";

const config = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_AO4wSmoNJ",
    userPoolWebClientId: "4768g659min5sg9v5mg595o19p",
    oauth: {
      domain: "auth.party-box.ca",
      scope: ["email", "openid", "profile"],
      redirectSignIn: ENV.WEBSITE_URL,
      redirectSignOut: ENV.WEBSITE_URL,
      responseType: "code",
    },
  },
};

export default config;
