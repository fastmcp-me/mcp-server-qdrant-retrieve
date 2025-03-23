/**
 * Command line arguments for server configuration
 */
export type ServerCliArgs = {
  /** Whether to enable HTTP transport */
  enableHttpTransport: boolean;
  /** Whether to enable stdio transport */
  enableStdioTransport: boolean;
  /** Whether to enable REST server */
  enableRestServer: boolean;
  /** Port for MCP HTTP server */
  mcpHttpPort: number;
  /** Port for REST HTTP server */
  restHttpPort: number;
  /** URL for Qdrant vector database */
  qdrantUrl: string;
  /** Type of embedding model to use */
  embeddingModelType: string;
};
