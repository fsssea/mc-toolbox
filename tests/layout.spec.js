const { test, expect } = require('@playwright/test');

// 每个曾经出过问题的尺寸都留在这里，修完不要删。
const viewports = [
  { name: 'Android320', width: 320, height: 640, dpr: 2, mobile: true },
  { name: 'Android360', width: 360, height: 800, dpr: 3, mobile: true },
  { name: 'Android390', width: 390, height: 844, dpr: 3, mobile: true },
  { name: 'Android412', width: 412, height: 915, dpr: 2.625, mobile: true },
  { name: 'Android480', width: 480, height: 1067, dpr: 1.5, mobile: true },
  { name: 'Android720', width: 720, height: 1600, dpr: 1.5, mobile: true },
  { name: 'Tablet800', width: 800, height: 1280, dpr: 2, mobile: true },
  { name: 'Laptop1024', width: 1024, height: 768, dpr: 1, mobile: false },
  { name: 'Windows1366', width: 1366, height: 768, dpr: 1, mobile: false },
  { name: 'Windows1440', width: 1440, height: 900, dpr: 1, mobile: false },
  { name: 'Windows1920', width: 1920, height: 1080, dpr: 1, mobile: false },
  { name: 'Linux1280', width: 1280, height: 800, dpr: 1, mobile: false },
];

async function measure(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const body = document.body;
    const main = document.querySelector('main');
    const overflow = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && r.right > de.clientWidth + 1) {
        if (overflow.length < 8) {
          overflow.push(`${el.id || el.className || el.tagName}:${Math.round(r.right)}`);
        }
      }
    }
    return {
      innerWidth,
      clientWidth: de.clientWidth,
      scrollWidth: de.scrollWidth,
      bodyWidth: Math.round(body.getBoundingClientRect().width),
      mainWidth: main ? Math.round(main.getBoundingClientRect().width) : 0,
      overflow,
      bigscreen: body.classList.contains('bigscreen'),
      visualScale: window.visualViewport ? window.visualViewport.scale : null,
    };
  });
}

for (const vp of viewports) {
  test.describe(vp.name, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dpr,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });

    test('页面无横向溢出、宽度跟随视口', async ({ page }) => {
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto('/index.html', { waitUntil: 'networkidle' });
      await expect(page.locator('h1')).toBeVisible();

      const m = await measure(page);
      expect(errors, '页面不应有未捕获异常').toEqual([]);
      expect(m.scrollWidth, '文档不应横向滚动').toBeLessThanOrEqual(m.clientWidth + 1);
      expect(m.overflow, '可见元素不应超出右边缘').toEqual([]);
      expect(m.bodyWidth, 'body 应铺满视口宽度').toBeGreaterThanOrEqual(m.clientWidth - 1);
      expect(m.visualScale == null || m.visualScale === 1, '初始缩放应为 100%').toBeTruthy();
    });
  });
}

test.describe('连续打开与旋转', () => {
  test.use({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

  test('连续打开三次、旋转、改窗口后宽度仍正确', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    for (let i = 0; i < 3; i++) {
      await page.reload({ waitUntil: 'networkidle' });
      const m = await measure(page);
      expect(m.scrollWidth).toBeLessThanOrEqual(m.clientWidth + 1);
      expect(m.bodyWidth).toBeGreaterThanOrEqual(m.clientWidth - 1);
    }

    for (const [w, h] of [[480, 800], [800, 480], [360, 640], [720, 900]]) {
      await page.setViewportSize({ width: w, height: h });
      await page.waitForTimeout(300);
      const m = await measure(page);
      expect(m.clientWidth).toBe(w);
      expect(m.scrollWidth).toBeLessThanOrEqual(w + 1);
      expect(m.bodyWidth).toBeGreaterThanOrEqual(w - 1);
    }
  });
});

for (const width of [320, 480, 1366, 1920]) {
  test(`弹窗 ${width}px 不出屏`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    await page.locator('#btnMaker').click();
    await expect(page.locator('#modal')).toBeVisible();
    const r = await page.locator('#modal .modalbox').boundingBox();
    expect(r, '弹窗应存在').not.toBeNull();
    expect(r.x).toBeGreaterThanOrEqual(-1);
    expect(r.x + r.width).toBeLessThanOrEqual(width + 1);
  });
}
