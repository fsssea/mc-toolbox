const { test, expect } = require('@playwright/test');

test('重置版制作器可生成完整附加包结构', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.locator('#btnMaker').click();
  await expect(page.locator('#modalBody.makerbox')).toBeVisible();
  await expect(page.locator('.mkhead h3')).toContainText('重置版');

  await page.fill('#mkName', '测试包');
  await page.fill('#mkNs', 'testpack');
  await page.fill('#mkBlockId', 'test_block');
  await page.fill('#mkBlockZh', '测试方块');
  await page.fill('#mkItemId', 'test_item');
  await page.fill('#mkItemZh', '测试物品');
  await page.check('#mkEntityOn');
  await page.fill('#mkEntityId', 'test_mob');
  await page.fill('#mkEntityZh', '测试生物');
  await page.check('#mkScriptOn');

  await expect(page.locator('#mkErrors')).toContainText('检查通过');
  await page.locator('#mkBuild').click();
  await expect(page.locator('#modal')).toBeHidden();

  await page.locator('#tree').getByText('behavior_packs').first().click();
  await expect(page.locator('#tree')).toContainText('testpack_bp');
  await page.locator('#tree').getByText('testpack_bp').first().click();
  await page.locator('#tree .node').filter({ hasText: 'blocks' }).first().click();
  await page.locator('#tree .node').filter({ hasText: 'items' }).first().click();
  await page.locator('#tree .node').filter({ hasText: 'entities' }).first().click();

  await page.locator('#tree .node').filter({ hasText: 'manifest.json' }).first().click();
  await expect(page.locator('#editor textarea')).toHaveValue(/format_version/);

  await page.locator('#tree .node').filter({ hasText: 'test_block.json' }).first().click();
  await expect(page.locator('#editor textarea')).toHaveValue(/testpack:test_block/);
  await expect(page.locator('#editor textarea')).toHaveValue(/material_instances/);

  await page.locator('#tree .node').filter({ hasText: 'test_item.json' }).first().click();
  await expect(page.locator('#editor textarea')).toHaveValue(/testpack:test_item/);

  const tree = await page.locator('#tree').innerText();
  expect(tree).toContain('behavior_packs');
  expect(tree).toContain('testpack_bp');
  expect(tree).toContain('resource_packs');
  expect(tree).toContain('manifest.json');
  expect(tree).toContain('test_block');
  expect(tree).toContain('test_item');
  expect(tree).toContain('test_mob');
  expect(errors).toEqual([]);
});

test('制作器错误配置会拦住生成', async ({ page }) => {
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.locator('#btnMaker').click();
  await page.fill('#mkNs', 'Bad Namespace');
  await expect(page.locator('#mkErrors')).toContainText('命名空间');
  await expect(page.locator('#mkBuild')).toBeDisabled();
});
