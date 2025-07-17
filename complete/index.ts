import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Securely get NASA API key from environment variable
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

// Add a friendly greeting tool
server.registerTool(
  "friendly-greeting",
  {
    title: "Friendly Greeting",
    description: "Provides a warm, friendly greeting to brighten someone's day",
    inputSchema: {
      name: z.string().describe("The name of the person to greet"),
      timeOfDay: z
        .enum(["morning", "afternoon", "evening"])
        .optional()
        .describe("Time of day for context-appropriate greeting"),
    },
  },
  async ({ name, timeOfDay }) => {
    let greeting = "";

    // Choose greeting based on time of day
    switch (timeOfDay) {
      case "morning":
        greeting = `Good morning, ${name}! ☀️ Hope you have a wonderful day ahead!`;
        break;
      case "afternoon":
        greeting = `Good afternoon, ${name}! 🌞 Hope your day is going great!`;
        break;
      case "evening":
        greeting = `Good evening, ${name}! 🌙 Hope you're having a lovely evening!`;
        break;
      default:
        greeting = `Hello there, ${name}! 👋 It's great to meet you! Have an amazing day!`;
    }

    return {
      content: [
        {
          type: "text",
          text: greeting,
        },
      ],
    };
  }
);

// NASA APOD (Astronomy Picture of the Day) Tool
server.registerTool(
  // Register the NASA APOD tool
  "nasa-apod", // Tool name
  {
    title: "NASA APOD", // Title for the tool
    description:
      "Get NASA's Astronomy Picture of the Day (APOD) with optional parameters for specific dates, HD images, and more", // Description for the tool
    inputSchema: {
      date: z
        .string()
        .optional()
        .describe(
          "Date of image to retrieve (YYYY-MM-DD format). Defaults to today's date. Cannot be before 1995-06-16."
        ),
    },
  },
  async ({ date }) => {
    // Function to fetch NASA APOD data
    try {
      // Build the API URL
      const apiUrl = new URL("https://api.nasa.gov/planetary/apod");
      apiUrl.searchParams.set("api_key", NASA_API_KEY); // Set the API key

      // Add parameters if provided
      if (date) apiUrl.searchParams.set("date", date); // Set the date if provided

      // Make the API request
      const response = await fetch(apiUrl.toString()); // Fetch the data from NASA API

      if (!response.ok) {
        // Check for HTTP errors
        throw new Error(
          `NASA API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.text(); // Get the response text
      return {
        content: [
          {
            type: "text",
            text: data,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text",
            text: errorMessage,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
