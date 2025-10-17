// ==================================================================
// 1. Main Application Logic
// ==================================================================
document.addEventListener("DOMContentLoaded", () => {
    
        initializeMobileApp();
    });

const stopStyle = [
  'font-size: 50px',
  'font-weight: bold',
  'color: red',
  'padding: 10px 0'
].join(';');

const messageStyle = [
  'font-size: 18px',
  'line-height: 1.5'
].join(';');


console.log('%cStop!', stopStyle);

console.warn(
  '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to get free internet, increase your speed, or "hack" into our system, it is a scam. Doing so will give them access to your FiBear Network account and personal information.',
  messageStyle
);

console.log(
  '%cIf you have any questions or need support, please visit our official facebook: https://www.facebook.com/fntc.kasiglahanvillage2023 or contact our customer service directly. Never share your account details or paste code given to you by an untrusted source.',
  messageStyle
);