import { createQdrantRetrieveMcpTool } from "@features/tool-qdrant-retrieve/createQdrantRetrieveMcpTool";
import type { McpTool } from "@shared/mcp-tool/McpTool";

export const tools: McpTool[] = [...createQdrantRetrieveMcpTool()];
