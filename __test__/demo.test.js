/**
 * @Author zifer
 * @Description 测试用例demo
 * */
function sum (a, b) {
  return a + b;
}

test('10 + 20 should be equal 30', () => {
  expect(sum(10, 20)).toBe(30);
});
