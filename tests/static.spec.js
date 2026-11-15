const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function read(p) {
  return fs.readFileSync(path.join(root, p), 'utf8');
}

test('viewport 不再强制禁缩', () => {
  for (const file of ['index.html', 'assets/index.html']) {
    const html = read(file);
    expect(html, `${file} 不应有 user-scalable=no`).not.toContain('user-scalable=no');
    expect(html, `${file} 不应有 maximum-scale=1`).not.toContain('maximum-scale=1');
    expect(html, `${file} 应保留 width=device-width`).toContain('width=device-width');
  }
});

test('Android WebView 不再写死初始缩放', () => {
  const java = read('android/java/com/doubao/mctoolbox/MainActivity.java');
  expect(java).not.toContain('setInitialScale(100)');
  expect(java).toContain('setLoadWithOverviewMode(true)');
});
