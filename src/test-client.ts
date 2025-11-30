#!/usr/bin/env node
/**
 * Simple MCP test client for testing servers locally
 * This connects to your MCP server via stdio and lets you test tools
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

async function testServer() {
  console.log("🚀 Starting MCP Test Client\n");

  // Start the server process
  const serverProcess = spawn("node", ["build/index.js"], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  // Create the transport using the server's stdio
  const transport = new StdioClientTransport({
    command: "node",
    args: ["build/index.js"],
  });

  // Create the client
  const client = new Client(
    {
      name: "test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  try {
    // Connect to the server
    console.log("📡 Connecting to server...");
    await client.connect(transport);
    console.log("✅ Connected successfully!\n");

    // List available tools
    console.log("🔧 Listing available tools...");
    const toolsList = await client.listTools();
    console.log(`Found ${toolsList.tools.length} tool(s):\n`);
    
    toolsList.tools.forEach((tool, index) => {
      console.log(`${index + 1}. ${tool.name}`);
      console.log(`   Description: ${tool.description}`);
      console.log(`   Input Schema:`, JSON.stringify(tool.inputSchema, null, 2));
      console.log();
    });

    // TODO - Test the 'greet' tool

    console.log("✅ All tests completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    // Clean up
    await client.close();
    serverProcess.kill();
    console.log("\n👋 Test client closed");
  }
}

// Run the test
testServer().catch(console.error);
