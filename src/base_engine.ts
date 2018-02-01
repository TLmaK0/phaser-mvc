export interface BaseEngine {
  preload(): void;
  create(): void;
  update(): void;
  render(): void;
}
