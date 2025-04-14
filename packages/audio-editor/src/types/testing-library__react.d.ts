// Type definitions for @testing-library/react
declare module '@testing-library/react' {
  import { queries, BoundFunction } from '@testing-library/dom';
  import { ReactElement } from 'react';

  export * from '@testing-library/dom';

  type RenderResult = {
    container: HTMLElement;
    unmount: () => void;
    rerender: (ui: ReactElement) => void;
    asFragment: () => DocumentFragment;
    debug: (baseElement?: HTMLElement | DocumentFragment) => void;
    findAllByAltText: BoundFunction<typeof queries.findAllByAltText>;
    findAllByDisplayValue: BoundFunction<typeof queries.findAllByDisplayValue>;
    findAllByLabelText: BoundFunction<typeof queries.findAllByLabelText>;
    findAllByPlaceholderText: BoundFunction<typeof queries.findAllByPlaceholderText>;
    findAllByRole: BoundFunction<typeof queries.findAllByRole>;
    findAllByTestId: BoundFunction<typeof queries.findAllByTestId>;
    findAllByText: BoundFunction<typeof queries.findAllByText>;
    findAllByTitle: BoundFunction<typeof queries.findAllByTitle>;
    findByAltText: BoundFunction<typeof queries.findByAltText>;
    findByDisplayValue: BoundFunction<typeof queries.findByDisplayValue>;
    findByLabelText: BoundFunction<typeof queries.findByLabelText>;
    findByPlaceholderText: BoundFunction<typeof queries.findByPlaceholderText>;
    findByRole: BoundFunction<typeof queries.findByRole>;
    findByTestId: BoundFunction<typeof queries.findByTestId>;
    findByText: BoundFunction<typeof queries.findByText>;
    findByTitle: BoundFunction<typeof queries.findByTitle>;
    getAllByAltText: BoundFunction<typeof queries.getAllByAltText>;
    getAllByDisplayValue: BoundFunction<typeof queries.getAllByDisplayValue>;
    getAllByLabelText: BoundFunction<typeof queries.getAllByLabelText>;
    getAllByPlaceholderText: BoundFunction<typeof queries.getAllByPlaceholderText>;
    getAllByRole: BoundFunction<typeof queries.getAllByRole>;
    getAllByTestId: BoundFunction<typeof queries.getAllByTestId>;
    getAllByText: BoundFunction<typeof queries.getAllByText>;
    getAllByTitle: BoundFunction<typeof queries.getAllByTitle>;
    getByAltText: BoundFunction<typeof queries.getByAltText>;
    getByDisplayValue: BoundFunction<typeof queries.getByDisplayValue>;
    getByLabelText: BoundFunction<typeof queries.getByLabelText>;
    getByPlaceholderText: BoundFunction<typeof queries.getByPlaceholderText>;
    getByRole: BoundFunction<typeof queries.getByRole>;
    getByTestId: BoundFunction<typeof queries.getByTestId>;
    getByText: BoundFunction<typeof queries.getByText>;
    getByTitle: BoundFunction<typeof queries.getByTitle>;
    queryAllByAltText: BoundFunction<typeof queries.queryAllByAltText>;
    queryAllByDisplayValue: BoundFunction<typeof queries.queryAllByDisplayValue>;
    queryAllByLabelText: BoundFunction<typeof queries.queryAllByLabelText>;
    queryAllByPlaceholderText: BoundFunction<typeof queries.queryAllByPlaceholderText>;
    queryAllByRole: BoundFunction<typeof queries.queryAllByRole>;
    queryAllByTestId: BoundFunction<typeof queries.queryAllByTestId>;
    queryAllByText: BoundFunction<typeof queries.queryAllByText>;
    queryAllByTitle: BoundFunction<typeof queries.queryAllByTitle>;
    queryByAltText: BoundFunction<typeof queries.queryByAltText>;
    queryByDisplayValue: BoundFunction<typeof queries.queryByDisplayValue>;
    queryByLabelText: BoundFunction<typeof queries.queryByLabelText>;
    queryByPlaceholderText: BoundFunction<typeof queries.queryByPlaceholderText>;
    queryByRole: BoundFunction<typeof queries.queryByRole>;
    queryByTestId: BoundFunction<typeof queries.queryByTestId>;
    queryByText: BoundFunction<typeof queries.queryByText>;
    queryByTitle: BoundFunction<typeof queries.queryByTitle>;
  } & typeof queries;

  export interface RenderOptions {
    container?: HTMLElement;
    baseElement?: HTMLElement;
    hydrate?: boolean;
    wrapper?: React.ComponentType;
  }

  export function render(
    ui: ReactElement,
    options?: RenderOptions
  ): RenderResult;

  export function cleanup(): void;

  export function act(callback: () => void): void;
  export function act<T>(callback: () => Promise<T>): Promise<T>;

  export function fireEvent(element: Document | Element | Window, event: Event): boolean;
  
  interface FireEventInterface {
    (element: Document | Element | Window, event: Event): boolean;
    click: (element: Element) => boolean;
    change: (element: Element, options?: any) => boolean;
    input: (element: Element, options?: any) => boolean;
    keyDown: (element: Element, options?: any) => boolean;
    keyUp: (element: Element, options?: any) => boolean;
    keyPress: (element: Element, options?: any) => boolean;
    focus: (element: Element) => boolean;
    blur: (element: Element) => boolean;
    submit: (element: Element) => boolean;
    mouseDown: (element: Element, options?: any) => boolean;
    mouseUp: (element: Element, options?: any) => boolean;
    mouseEnter: (element: Element, options?: any) => boolean;
    mouseLeave: (element: Element, options?: any) => boolean;
    mouseMove: (element: Element, options?: any) => boolean;
    mouseOver: (element: Element, options?: any) => boolean;
    mouseOut: (element: Element, options?: any) => boolean;
    drag: (element: Element, options?: any) => boolean;
    drop: (element: Element, options?: any) => boolean;
    dragOver: (element: Element, options?: any) => boolean;
    dragEnter: (element: Element, options?: any) => boolean;
    dragLeave: (element: Element, options?: any) => boolean;
    touchStart: (element: Element, options?: any) => boolean;
    touchEnd: (element: Element, options?: any) => boolean;
    touchMove: (element: Element, options?: any) => boolean;
  }
  
  export const fireEvent: FireEventInterface;

  export const screen: RenderResult;
}
