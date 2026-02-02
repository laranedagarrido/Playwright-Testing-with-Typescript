import { test, expect } from '@playwright/test';

test('fill up the forum', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com')
    await page.getByRole('textbox', { name: 'Name' }).fill('Luis');
    await page.getByRole('textbox', { name: 'Email' }).fill('l.q@gmail.com');
    await page.getByRole('textbox', { name: 'phone' }).fill('912345678');
    await page.getByRole('textbox', { name: 'Address' }).fill('my house');
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByRole('checkbox', { name: 'sunday'}).check();
    await page.getByLabel('Country').selectOption('Germany');
    await page.getByLabel('Colors').selectOption('Blue');
    await page.getByLabel('Sorted List').selectOption('Deer');
    await page.locator('#datepicker').fill('08/15/2024');
    /*await page.locator('#txtDate').click();
    await page.getByRole('link', { name: '15' }).click();*/
    await page.getByPlaceholder('Start Date').fill('2026-02-11');
    await page.getByPlaceholder('End Date').fill('2026-02-12');
    await page.getByRole('button', { name: 'Submit' }).nth(0).click();
    const result = await page.locator('#result').innerText();
    expect(result).toBe('You selected a range of 1 days.')
    await expect(page.getByRole('textbox', { name: 'Name'})).toHaveValue('Luis');
}
);  

test('making click on a link to another page' , async ({ page })=>{
    await page.goto('https://testautomationpractice.blogspot.com');
    const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Comments' }).click(),
    ]);
    await expect(newPage).toHaveURL('https://testautomationpractice.blogspot.com/feeds/posts/default');
})

test('upload files with inputfile' , async ({page})=> {
    await page.goto('https://testautomationpractice.blogspot.com');
    await page.locator('#singleFileInput').setInputFiles('C:/Users/Luchito/Desktop/repos/playwright-ts/package.json')
    await page.getByRole('button', {name:'Upload Single File'}).click();
    await expect(page.locator('text=package.json')).toBeVisible();
})

test('drag and drop an object', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com');
    await page.dragAndDrop('#draggable', '#droppable');
    await expect(page.locator('#droppable')).toHaveText('Dropped!');
})

test('take name of books author', async ({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com');
    const amountBooks = await page.locator('#BookTable tr td' , { hasText: 'Animesh' } );
    const bookname = await amountBooks.first().innerText();
    console.log(bookname);
    expect(bookname).toBe('Animesh');
}

)

