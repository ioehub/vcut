// Global Jest type declarations
declare global {
  const jest: any;
  namespace jest {
    function fn(): any;
    function fn<T>(): jest.Mock<T>;
    function mock(moduleName: string, factory?: any): void;
    function clearAllMocks(): void;
    function resetAllMocks(): void;
    function restoreAllMocks(): void;
    interface Mock<T = any> {
      new (...args: any[]): T;
      (...args: any[]): any;
      mockImplementation(fn: (...args: any[]) => any): this;
      mockReturnValue(value: any): this;
      mockReturnThis(): this;
      mockResolvedValue(value: any): this;
    }
  }
  
  function describe(name: string, fn: () => void): void;
  function beforeEach(fn: () => void): void;
  function test(name: string, fn: () => void): void;
  function expect(value: any): any;
}

export {};
