import { getAppState } from "@features/app-state/getAppState";
import { HuggingFaceEmbedding } from "@llamaindex/huggingface";
import { QdrantVectorStore } from "@llamaindex/qdrant";
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import type { JsonContent } from "@shared/mcp-tool/JsonContent";
import { McpToolError } from "@shared/mcp-tool/McpToolError";
import { MetadataMode, Settings, VectorStoreIndex } from "llamaindex";
import type { QdrantRetrieveInput } from "./QdrantRetrieveInputSchema";
import type { QdrantRetrieveOutput } from "./QdrantRetrieveOutputSchema";

type QdrantRetrieveMcpToolHandlerParams = {
  params: QdrantRetrieveInput;
};

/**
 * Handler for the Qdrant Retrieve MCP tool
 * Retrieves similar documents from a Qdrant vector store
 */
export async function qdrantRetrieveMcpToolHandler({
  params,
}: QdrantRetrieveMcpToolHandlerParams): Promise<
  Array<TextContent | JsonContent<QdrantRetrieveOutput>> | McpToolError
> {
  try {
    // Get configuration from app state
    const appState = getAppState();
    const { qdrantUrl, embeddingModelType, qdrantApiKey } = appState;

    Settings.embedModel = new HuggingFaceEmbedding({
      modelType: embeddingModelType, // Use the model type from app state
    });

    const { collectionNames, topK, query } = params;

    // Process all queries across all collections
    const allResults = [];

    for (const collectionName of collectionNames) {
      try {
        // Connect to Qdrant vector store for this collection using the URL from app state
        const vectorStoreConfig = {
          url: qdrantUrl,
          collectionName: collectionName,
          apiKey: qdrantApiKey,
        };

        const vectorStore = new QdrantVectorStore(vectorStoreConfig);

        // Create an index from the vector store
        const index = await VectorStoreIndex.fromVectorStore(vectorStore);

        // Create a retriever with the specified topK
        const retriever = index.asRetriever({
          similarityTopK: topK,
        });

        // Retrieve similar documents for each query in this collection
        for (const singleQuery of query) {
          const nodesWithScore = await retriever.retrieve({
            query: singleQuery,
          });

          if (nodesWithScore && nodesWithScore.length > 0) {
            // Format the results for this query including collection name
            const queryResults = nodesWithScore.map((node) => ({
              query: singleQuery,
              collectionName: collectionName,
              text: node.node.getContent(MetadataMode.NONE) || "",
              score: node.score || 0,
            }));

            allResults.push(...queryResults);
          }
        }
      } catch (error) {
        console.error(
          `Error retrieving from collection ${collectionName}:`,
          error
        );
        // Continue with other collections even if one fails
      }
    }

    // Sort results by score (descending)
    allResults.sort((a, b) => b.score - a.score);

    // Limit to topK results overall
    const limitedResults = allResults.slice(0, topK);

    if (allResults.length === 0) {
      return [
        {
          type: "text",
          text: "No relevant documents found for any of the queries.",
        },
      ];
    }

    // Use the limited results

    // Create text representation of the results
    // const textResults = results
    //   .map((result, index) => {
    //     return `Result ${index + 1} (Score: ${result.score.toFixed(4)}):\n${
    //       result.text
    //     }\n`;
    //   })
    //   .join("\n");

    return [
      // Text response
      // {
      //   type: "text",
      //   text: `Found ${results.length} relevant documents`,
      // },
      // JSON response
      {
        type: "json",
        data: {
          results: limitedResults,
        },
      },
    ];
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in Qdrant Retrieve tool:", error);
    if (error instanceof Error) {
      return new McpToolError(error.message);
    }
    return new McpToolError(
      "An unexpected error occurred in the Qdrant Retrieve tool"
    );
  }
}
