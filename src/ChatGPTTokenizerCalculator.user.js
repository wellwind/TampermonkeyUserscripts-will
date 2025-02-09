// ==UserScript==
// @name         ChatGPT: 自動統計網頁中選取的文字範圍的 Token 數量
// @version      1.0.1
// @description  自動統計網頁中選取的文字範圍的 Token 數量 (OpenAI GPT-3 的 Tokenizer 規則)
// @license      MIT
// @homepage     https://blog.miniasp.com/
// @homepageURL  https://blog.miniasp.com/
// @website      https://www.facebook.com/will.fans
// @source       https://github.com/doggy8088/TampermonkeyUserscripts/raw/main/src/ChatGPTTokenizerCalculator.user.js
// @namespace    https://github.com/doggy8088/TampermonkeyUserscripts/raw/main/src/ChatGPTTokenizerCalculator.user.js
// @match        *://*/*
// @author       Will Huang
// @run-at       context-menu
// @grant        GM_openInTab
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// ==/UserScript==

(async function () {
    "use strict";

    let text = '';

    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    if (!text) {
        // 取得頁面中的第一個 article 標籤
        text = document.querySelector("article")?.innerText;
    }

    if (text) {

        let prompt = text
            .replace(/\r/g, '')
            .replace(/\s+$/g, '')
            .replace(/\n{3,}/sg, '\n\n')
            .replace(/^\s+|\s+$/sg, '')

        var script = document.createElement('script');
        script.onload = function () {

            var tokenCount = gpt3encoder.countTokens(text);

            var result = `選取內容共有 ${tokenCount} Tokens`;

            console.log(result);

            alert(result);

        };
        // Docs:   https://syonfox.github.io/GPT-3-Encoder/browser.html
        // NPM:    https://www.npmjs.com/package/@syonfox/gpt-3-encoder
        // GitHub: https://github.com/syonfox/GPT-3-Encoder
        // HTML Usage: https://github.com/syonfox/GPT-3-Encoder/blob/master/browser.html
        script.src = 'https://cdn.jsdelivr.net/npm/@syonfox/gpt-3-encoder/browser.js';
        document.head.appendChild(script);
    }

})();
