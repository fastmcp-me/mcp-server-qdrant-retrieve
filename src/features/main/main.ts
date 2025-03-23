import type { AppState } from "@features/app-state/AppState";
import { getAppState } from "@features/app-state/getAppState";
import { initializeAppState } from "@features/app-state/initializeAppState";
import { createMcpServer } from "@features/mcp-server/createMcpServer";
import { setupMcpServerGracefulShutdown } from "@features/mcp-server/setupMcpServerGracefulShutdown";
import { setupMcpTransports } from "@features/mcp-server/setupMcpTransports";
import { registerTools } from "@features/mcp-tool-request-handler/registerTools";
import { setupRestServer } from "@features/rest-server/setupRestServer";
import { parseCliArgs } from "./internal/parseCliArgs";
import { tools } from "./internal/tools";

/**
 * Main entry point for the application
 * Initializes and configures the MCP server and related components
 */
export async function main() {
  const cliArgs = parseCliArgs();

  // Read the API key from environment variables
  const qdrantApiKey = process.env.QDRANT_API_KEY;

  // Create the application state with CLI args, tools, and API key
  const initialState: AppState = {
    ...cliArgs,
    tools,
    mode: "mcpAct", // Default mode
    qdrantApiKey, // This will be undefined if env var is not set
  };

  // Initialize the global application state
  initializeAppState(initialState);

  try {
    const server = createMcpServer(getAppState());

    registerTools(server);
    await setupMcpTransports(server);
    setupMcpServerGracefulShutdown(server);

    const appState = getAppState();
    if (appState.enableRestServer) {
      setupRestServer();
    }
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}
