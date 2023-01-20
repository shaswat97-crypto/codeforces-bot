const puppeteer = require('puppeteer');
const {installMouseHelper} = require('./install-mouse-helper');
const ans =
    `#include <bits/stdc++.h>
using namespace std;

int main(){
	int n; cin>>n;
	if(n%2 == 0 && n>2) cout<<"YES"<<endl;
	else cout<<"NO"<<endl;

`
const id = "piconimifug";
const pass = "123qazws123";
const url = 'https://codeforces.com';
let page;
(async function () {
    try {
        let boPromise = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start - maximized']
        });
        page = await boPromise.newPage();
        await installMouseHelper(page);
        await page.goto(url);
        await waitAndClick(".lang-chooser>:last-child>:first-child");
        await waitAndType("#handleOrEmail", id);
        await waitAndType("#password", pass, 200);
        await waitAndClick("input[type=submit]", 200);
        await delay(3000);
        await waitAndClick(".menu-list.main-menu-list>:nth-child(6)", 200);
        await waitAndClick("a[title=Difficulty]", 200);
        await waitAndClick("a[title=Difficulty]", 200);
        await waitAndClick(".id.dark.left+.dark a", 200);
        await page.waitForSelector(".backLava");
        await waitAndClick(".second-level-menu-list>:nth-child(3)", 200);
        await questionSolver("div.ace_content", 200);
    } catch (error) {
        console.log(error);
    }
})();

async function questionSolver(selector, time) {
    try {
        await page.waitForSelector(selector);
        await waitAndClick(selector, time);
        await waitAndType(selector, ans);
        return await waitAndClick("input.submit");
    } catch (error) {
        console.log(error);
    }
}

async function waitAndClick(selector, time) {
    try {
        await page.waitForSelector(selector);
        return await page.click(selector, { delay: time });
    } catch (error) {
        console.log(error);
    }
}

async function waitAndType(selector, text, time) {
    try {
        await page.waitForSelector(selector);
        return await page.type(selector, text, {delay:time});
    } catch (error) {
        console.log(error);
    }
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
