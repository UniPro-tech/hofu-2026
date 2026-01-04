import NextAuth from "next-auth";

export const { handlers, auth } = NextAuth({
  providers: [
    {
      id: "unique", // signIn("my-provider") and will be part of the callback URL
      name: "UniQUE", // optional, used on the default login page as the button text.
      type: "oidc", // or "oauth" for OAuth 2 providers
      issuer: "https://auth.uniproject.jp", // to infer the .well-known/openid-configuration URL
      clientId: process.env.AUTH_CLIENT_ID, // from the provider's dashboard
      clientSecret: process.env.AUTH_CLIENT_SECRET, // from the provider's dashboard
      idToken: true, // whether to request an ID token
      checks: ["pkce"], // see https://authjs.dev/guides/providers/oidc#checks
    },
  ],
});
