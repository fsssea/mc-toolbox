# 回归测试

## 本地运行

```bash
cd tests
npm install
npx playwright install chromium
npm test
```

测试会自动在仓库根目录启动 `python3 -m http.server 8123`，不需要手动开服务。

## 已覆盖

- 12 种视口：320 / 360 / 390 / 412 / 480 / 720 / 800 / 1024 / 1366 / 1440 / 1920 / 1280
- 连续打开三次、旋转、改窗口
- 320 / 480 / 1366 / 1920 下打开制作器弹窗
- viewport 强制禁缩、Android `setInitialScale` 静态规则

## 新增 bug 的规则

每修一个用户可见的问题，就在 `layout.spec.js` 增加一个能复现的用例，修完保留。不要只改代码不补用例。
