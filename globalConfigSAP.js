window.SAP = window.SAP || {};

window.SAP.global = {
  trustArc: {
    domain: "www.sap.com",
    privacyPolicyLink: "https://sap-samples.github.io/sap-btp-ai-best-practices/privacy",
    cookieLink: "https://sap-samples.github.io/sap-btp-ai-best-practices/cookies"
  },
  isProd: false // This will be set in the src/client/delayedScripts.ts file using environment variables
};
