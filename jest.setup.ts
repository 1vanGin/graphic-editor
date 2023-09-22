import "@testing-library/jest-dom";

const cryptoMock = {
    randomUUID: jest.fn(() => Math.random().toString()),
}

Object.defineProperty(window, 'crypto', {
    value: cryptoMock,
    writable: true,
})