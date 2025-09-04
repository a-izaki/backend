
const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe ('Calcular média', () => {
    test('A função foi definida?', () => {
        expect(calcularMediaAluno).toBeDefined()
    })

    test('A função trata notas indefinidas?', () => {        
        expect(() => calcularMediaAluno(undefined, undefined)).toThrow("Notas a1, a2 ou a3 não informadas")
        
    })

    test('A função trata números negativos?', () => {        
        expect(() => calcularMediaAluno(-8, 7)).toThrow("As notas não podem ser negativas.")
        
    })

    test('A função trata a3 como indefinida?', () => {        
        expect(() => calcularMediaAluno(-8, 7, undefined)).toThrow("As notas não podem ser negativas.")
        
    })

    test('A função trata a3 negativa?', () => {        
        expect(() => calcularMediaAluno(8, 7, -6)).toThrow("A nota a3 não pode ser negativa.")
        
    })

    test('A função trata melhor combinação a1 com a3', () => {        
        expect(calcularMediaAluno(3, 5, 6)). toBeCloseTo(5.4)
        
    })

    test('A função trata melhor combinação a2 com a3', () => {        
        expect(calcularMediaAluno(5, 3, 6)). toBeCloseTo(5.6)
        
    })
})