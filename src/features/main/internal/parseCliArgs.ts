import meow from "meow";
import type { ServerCliArgs } from "./ServerCliArgs";

/**
 * Parses command line arguments and returns the parsed CLI options
 *
 * @returns Parsed command line arguments
 */
export function parseCliArgs(): ServerCliArgs {
  const usage = `
MCP server for semantic search with Qdrant vector database.

Options
  --enableHttpTransport      Enable HTTP transport [default: false]
  --enableStdioTransport     Enable stdio transport [default: true]
  --enableRestServer         Enable REST API server [default: false]
  --mcpHttpPort=<port>       Port for MCP HTTP server [default: 3001]
  --restHttpPort=<port>      Port for REST HTTP server [default: 3002]
  --qdrantUrl=<url>          URL for Qdrant vector database [default: http://localhost:6333]
  --embeddingModelType=<type> Type of embedding model to use [default: Xenova/all-MiniLM-L6-v2]
  --help                     Show this help message

Environment Variables
  QDRANT_API_KEY            API key for authenticated Qdrant instances (optional)

Examples
  $ mcp-qdrant --enableHttpTransport
  $ mcp-qdrant --mcpHttpPort=3005 --restHttpPort=3006
  $ mcp-qdrant --qdrantUrl=http://qdrant.example.com:6333
  $ mcp-qdrant --embeddingModelType=onnx-community/gte-small
`;

  const cli = meow(usage, {
    importMeta: import.meta,
    flags: {
      enableHttpTransport: {
        type: "boolean",
        default: false,
      },
      enableStdioTransport: {
        type: "boolean",
        default: true,
      },
      enableRestServer: {
        type: "boolean",
        default: false,
      },
      mcpHttpPort: {
        type: "number",
        default: 3001,
      },
      restHttpPort: {
        type: "number",
        default: 3002,
      },
      qdrantUrl: {
        type: "string",
        default: "http://localhost:6333",
      },
      embeddingModelType: {
        type: "string",
        default: "Xenova/all-MiniLM-L6-v2",
      },
    },
  });

  return cli.flags satisfies ServerCliArgs;
}
