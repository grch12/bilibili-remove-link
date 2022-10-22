// ==UserScript==
// @name         bilibili remove links
// @license      MIT
// @namespace    http://tampermonkey.net/
// @version      0.31
// @description  自动去除阿B视频评论区中AI生成的搜索链接。
// @author       Bilibili @显卡厨师
// @match        www.bilibili.com/video/*
// @icon         none
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function handler() {
        document.querySelectorAll('a.search-word').forEach(link => {
            //移除无用的类与属性
            link.classList.remove('jump-link', 'search-word');
            link.removeAttribute('data-url');
            link.removeAttribute('data-search-key');

            //恢复普通文本样式
            link.style.color = 'var(--text1)';
            link.style.cursor = 'text';

            //阻止点击事件
            link.onclick = eventObj => eventObj.preventDefault();

            //移除搜索图标
            document.querySelectorAll('i.search-word').forEach(icon => {
                icon.remove();
            })
        });
    }
    var observer = new MutationObserver(handler);
    observer.observe(document.querySelector('div.left-container-under-player'), {
        subtree: true,
        childList: true
    });
})();