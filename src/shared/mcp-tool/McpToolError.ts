export class McpToolError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = "McpToolError";
  }
}
