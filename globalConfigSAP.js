window.SAP = window.SAP || {};

window.SAP.global = {
  trustArc: {
    domain: "www.sap.com",
    privacyPolicyLink: "https://sap-samples.github.io/sap-btp-ai-best-practices/privacy",
    cookieLink: "https://sap-samples.github.io/sap-btp-ai-best-practices/cookies"
  },
  isProd: false // Default value, will be set correctly by environment
};

// Environment will be set by a Webpack-processed script
