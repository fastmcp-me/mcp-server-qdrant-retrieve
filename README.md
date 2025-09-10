[![Add to Cursor](https://fastmcp.me/badges/cursor_dark.svg)](https://fastmcp.me/MCP/Details/754/qdrant-retrieve)
[![Add to VS Code](https://fastmcp.me/badges/vscode_dark.svg)](https://fastmcp.me/MCP/Details/754/qdrant-retrieve)
[![Add to Claude](https://fastmcp.me/badges/claude_dark.svg)](https://fastmcp.me/MCP/Details/754/qdrant-retrieve)
[![Add to ChatGPT](https://fastmcp.me/badges/chatgpt_dark.svg)](https://fastmcp.me/MCP/Details/754/qdrant-retrieve)
[![Add to Codex](https://fastmcp.me/badges/codex_dark.svg)](https://fastmcp.me/MCP/Details/754/qdrant-retrieve)
[![Add to Gemini](https://fastmcp.me/badges/gemini_dark.svg)](https://fastmcp.me/MCP/Details/754/qdrant-retrieve)

# Qdrant Retrieve MCP Server

MCP server for semantic search with Qdrant vector database.

## Features

- Semantic search across multiple collections
- Multi-query support
- Configurable result count
- Collection source tracking

**Note**: The server connects to a Qdrant instance specified by URL. 

**Note 2**: The first retrieve might be slower, as the MCP server downloads the required embedding model.

## API

### Tools

- **qdrant_retrieve**
  - Retrieves semantically similar documents from multiple Qdrant vector store collections based on multiple queries
  - Inputs:
    - `collectionNames` (string[]): Names of the Qdrant collections to search across
    - `topK` (number): Number of top similar documents to retrieve (default: 3)
    - `query` (string[]): Array of query texts to search for
  - Returns:
    - `results`: Array of retrieved documents with:
      - `query`: The query that produced this result
      - `collectionName`: Collection name that this result came from
      - `text`: Document text content
      - `score`: Similarity score between 0 and 1

## Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "qdrant": {
      "command": "npx",
      "args": ["-y", "@gergelyszerovay/mcp-server-qdrant-retrive"],
      "env": {
        "QDRANT_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Command Line Options

```
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
  $ mcp-qdrant --embeddingModelType=Xenova/all-MiniLM-L6-v2
```
