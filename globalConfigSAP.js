window.SAP = window.SAP || {};

window.SAP.global = {
  trustArc: {
    domain: "www.sap.com",
    privacyPolicyLink: "https://btp-ai-bp.docs.sap/privacy",
    cookieLink: "https://btp-ai-bp.docs.sap/cookies"
  },
  isProd: false // This will be set in the src/client/delayedScripts.ts file using environment variables
};

// // Create and append div with id "teconsent" to received the link open the cookie consent popup
// function createCookieConsentDiv() {
//   const teconsentDiv = document.createElement("div");
//   teconsentDiv.id = "teconsent";
//   document.querySelector("body").appendChild(teconsentDiv);
// }

// createCookieConsentDiv();
