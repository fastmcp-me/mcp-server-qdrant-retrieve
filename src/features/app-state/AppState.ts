import type { McpTool } from "@shared/mcp-tool/McpTool";

/**
 * Application state object with immutable properties
 */
export type AppState = {
  /** Whether to enable HTTP transport */
  readonly enableHttpTransport: boolean;
  /** Whether to enable stdio transport */
  readonly enableStdioTransport: boolean;
  /** Whether to enable REST server */
  readonly enableRestServer: boolean;
  /** Port for MCP HTTP server */
  readonly mcpHttpPort: number;
  /** Port for REST HTTP server */
  readonly restHttpPort: number;
  /** URL for Qdrant vector database */
  readonly qdrantUrl: string;
  /** API key for Qdrant vector database (if required) */
  readonly qdrantApiKey?: string;
  /** Type of embedding model to use */
  readonly embeddingModelType: string;
  /** Current operational mode */
  readonly mode: "mcpAct" | "mcpPlan";
  /** List of available tools */
  readonly tools: readonly McpTool[];
};
