# MCP Server Tutorial

Welcome to the MCP Client Tutorial! The purpose of this tutorial is to show how to utilise third party MCP servers locally so that relevant tools can be set up for Copilot. This is a hands-on, practical guide suitable for developers of all experience levels.

## Introduction

### What is an MCP?

MCP stands for [Model Context Protocol](https://modelcontextprotocol.io/faqs). It is an open protocol designed to standardize communication between clients and AI model servers. MCP enables clients to send requests (such as queries, completions, or other model operations) and receive structured responses in a consistent, interoperable way. 

### What's the difference between Hosts, Clients and Servers?

In the Model Context Protocol (MCP) ecosystem, there are three key components that work together:

**🏠 Hosts**
- The main application that orchestrates the entire MCP experience
- Examples: Claude Desktop, VS Code with Copilot, or other AI-powered applications
- Responsible for managing the connection between clients and servers
- Handles user interactions and coordinates requests/responses

**👤 Clients**
- The bridge between the host application and MCP servers
- Translates requests from the host into MCP protocol messages
- Manages the communication channel (like stdio, HTTP, or WebSocket)
- Examples: Built-in MCP clients in applications like Claude Desktop or VS Code

**🔧 Servers**
- Provide specific tools, resources, or capabilities to the MCP ecosystem
- Run as separate processes that expose their functionality via the MCP protocol
- Can be anything from file system access, web APIs, databases, or custom business logic
- Examples: GitHub MCP server, filesystem server, weather API server, or [any third party server](https://github.com/modelcontextprotocol/servers)
## Prerequisites

1. Copilot License Enabled
1. [Visual Studio Code](https://www.google.com/search?client=safari&rls=en&q=Get+started+with+Visual+Studio+Code&ie=UTF-8&oe=UTF-8)

## Labs

Filename | Description
--- | ---
[Running Servers Locally.md](</labs/Running Servers Locally.md>) | Instructions for setting up an existing server locally in your workspace.
[Creating Servers.md](</labs/Creating Servers.md>) | Creating a server.

## Documentation and Bibliography

Resources used to create this tutorial.

Resource | Description
--- | ---
[Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction) | User guide explaining Model Context Protocol.
[Github Official MCP Server](https://github.com/github/github-mcp-server) | GitHub Official MCP Server Repository
[Managing Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) | GitHub Documentation for setting up Personal Access Tokens.