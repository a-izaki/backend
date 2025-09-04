const calculadora = require('../src/index.js')

test("2 + 2 = 4", () => {
    expect(2 + 2).toBe(4)
    expect(calculadora.soma).toBeDefined();
    expect(calculadora.soma(2, 2)).toBe(4);
})

test ("2 + 0 = 2", () => 
{
    expect(calculadora.soma(2, 0)).toBe(2);
})

test("-2 + -2 = -4", () => {
    expect(calculadora.soma(-2, -2)).toBe(-4);
})

test("se a > b então a - b >= 0", () => {
    expect(calculadora.subtracao(3, 1)).toBeDefined();
    expect(calculadora.subtracao(2, 1)).toBeGreaterThanOrEqual(0)
    expect(calculadora.subtracao(2, -2)).toBeGreaterThanOrEqual(0)
    expect(calculadora.subtracao(-2, -4)).toBeGreaterThanOrEqual(0)
})

test("se a < b então a - b <= 0", () =>{
    expect(calculadora.subtracao(1, 2)).toBeLessThan(0);
    expect(calculadora.subtracao(-2, -1)).toBeLessThan(0);
    expect(calculadora.subtracao(-2, 1)).toBeLessThan(0);
});

test ( "Se a ou b = 0, então a * b = 0", () => {
    expect(calculadora.multiplicacao).toBeDefined();
    expect(calculadora.multiplicacao(0, 4)).toEqual(0);
    expect(calculadora.multiplicacao(4, 0)).toEqual(0);
});

test ( "Se a > 0 e b > 0, então a * b > 0", () => {
    expect(calculadora.multiplicacao(2, 4)).toBeGreaterThan(0);
    expect(calculadora.multiplicacao(-4, -1)).toBeGreaterThan(0);
})

test ( "Se a > 0 e b < 0, então a * b < 0", () => {
    expect(calculadora.multiplicacao(-2, 4)).toBeLessThan(0);
    expect(calculadora.multiplicacao(4, -1)).toBeLessThan(0);
})