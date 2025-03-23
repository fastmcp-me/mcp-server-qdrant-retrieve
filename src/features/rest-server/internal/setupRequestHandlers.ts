import { isError } from "@shared/isError";
import type { McpTool } from "@shared/mcp-tool/McpTool";
import type { Express, Request, Response } from "express";
import { z } from "zod";
import { createContentArraySchema } from "./ContentSchemas";

/**
 * Parameters for setting up request handlers
 */
type SetupRequestHandlersParams = {
  /** Express application instance */
  app: Express;
  /** Tools enabled for REST mode */
  restEnabledTools: McpTool[];
};

/**
 * Configures request handlers for each enabled tool
 *
 * @param params - Configuration parameters
 */
export function setupRequestHandlers({
  app,
  restEnabledTools,
}: SetupRequestHandlersParams): void {
  restEnabledTools.forEach((tool) => {
    app.post(`/api/${tool.name}`, (req: Request, res: Response) => {
      (async () => {
        try {
          // Validate request body against schema
          const params = (tool.inputSchema as z.ZodObject<{}>).parse(req.body);

          const result = await tool.handler({ params });

          if (isError(result)) {
            // Return error response
            return res.status(500).json({
              isError: true,
              content: [
                {
                  type: "text",
                  text: result.message,
                },
              ],
            });
          }

          const schema = createContentArraySchema(
            tool.outputSchema as z.ZodTypeAny
          );
          // Validate response against schema
          const validatedResponse = schema.parse(result);

          // Return successful response
          res.status(201).json({
            isError: false,
            content: validatedResponse,
          });
        } catch (error) {
          // Fallback error handling
          console.error(`Error in ${tool.name} endpoint:`, error);

          if (error instanceof z.ZodError) {
            // Handle validation errors
            return res.status(400).json({
              error: "Validation error",
              details: error.errors,
            });
          }

          if (error instanceof Error) {
            // Handle known errors with message
            return res.status(500).json({
              error: "Server error",
              message: error.message,
            });
          }

          // Handle unknown errors
          res.status(500).json({
            error: "Internal server error",
            message: "An unexpected error occurred",
          });
        }
      })();
    });
  });
}
