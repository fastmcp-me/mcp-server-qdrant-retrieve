import type { McpTool } from "@shared/mcp-tool/McpTool";
import { QdrantRetrieveInputSchema } from "./internal/QdrantRetrieveInputSchema";
import { QdrantRetrieveOutputSchema } from "./internal/QdrantRetrieveOutputSchema";
import { qdrantRetrieveMcpToolHandler } from "./internal/qdrantRetrieveMcpToolHandler";

/**
 * Creates and returns the Qdrant Retrieve MCP tool configuration
 *
 * @returns Array containing the Qdrant Retrieve MCP tool configuration
 */
export function createQdrantRetrieveMcpTool(): McpTool[] {
  return [
    {
      name: "qdrant_retrieve",
      description:
        "Retrieves semantically similar documents from multiple Qdrant vector store collections based on multiple queries",
      inputSchema: QdrantRetrieveInputSchema,
      inputSchemaName: "QdrantRetrieveInputSchema",
      outputTypes: ["text", "json"],
      outputSchema: QdrantRetrieveOutputSchema,
      outputSchemaName: "QdrantRetrieveOutputSchema",
      handler: qdrantRetrieveMcpToolHandler,
      enabledInModes: ["rest", "mcpAct", "mcpPlan"],
    },
  ];
}
