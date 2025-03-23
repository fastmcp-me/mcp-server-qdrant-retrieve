# Qdrant Retrieve Tool

## Feature Type

MCP Tool (following the MCP Tool Blueprint)

## Purpose and Scope

The Qdrant Retrieve tool provides semantic search capabilities by retrieving documents from multiple Qdrant vector database collections based on multiple queries. It allows users to find semantically similar content rather than relying on exact keyword matches.

This tool is designed to:
- Connect to multiple specified Qdrant collections
- Search across all specified collections
- Accept multiple natural language queries
- Retrieve a configurable number of semantically similar documents
- Return structured JSON results with collection information

## Requirements

### Functional Requirements

- Connect to a Qdrant vector store at http://localhost:6333
- Allow specification of multiple collection names to search across
- Allow configuration of the number of results to return (topK)
- Accept an array of natural language queries
- Return documents with similarity scores and collection information
- Provide structured JSON responses
- Handle failures in individual collections gracefully

### Non-Functional Requirements

- Response time should be reasonable (< 2 seconds for most queries)
- Error handling should be robust and provide clear error messages
- The tool should gracefully handle the case where no results are found

## Technical Design

### Data Structures

The tool uses these key data structures:
- QdrantRetrieveInput: Parameters for the retrieval operation, including arrays of collection names and queries
- QdrantRetrieveOutput: Structured results including original query, collection name, text content, and similarity scores

### Dependencies

The tool relies on:
- LlamaIndex library for vector store integration
- Qdrant vector database (expected to be running at http://localhost:6333)

### Error Handling

The tool handles these error cases:
- Connection failures to Qdrant
- Invalid collection names
- Malformed queries
- Empty result sets

## Dependencies

### External Services

- Qdrant vector database service (expected to be running at http://localhost:6333)

### Shared Utilities

- McpTool type from @shared/mcp-tool/McpTool
- JsonContent type from @shared/mcp-tool/JsonContent
- McpToolError from @shared/mcp-tool/McpToolError
- TextContent type from @modelcontextprotocol/sdk/types.js

## Testing Strategy

### Unit Testing

- Test input validation with valid and invalid parameters
- Test error handling for different error scenarios
- Test JSON and text response formatting

### Integration Testing

- Test actual retrieval from a test Qdrant collection
- Verify result quality with known data sets
- Test performance with various query complexity levels

### Test Data Requirements

- Sample Qdrant collection with known contents
- Set of test queries with expected results
