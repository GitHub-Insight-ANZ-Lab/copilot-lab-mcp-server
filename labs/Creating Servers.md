# Creating Servers

## Introduction

An MCP (Model Context Protocol) server is a specialized server designed to manage, interpret, and serve contextual data for applications that rely on dynamic, context-aware interactions. It acts as a central hub that processes requests, maintains state, and provides relevant information or actions based on the current context of users or systems. By leveraging protocols and structured data, an MCP server enables more intelligent, adaptive, and responsive application behavior.

In this lab we'll be going through the process of setting up a server which GitHub Copilot will interact with to get information from NASA APIs. We'll be utilising the TypeScript MCP SDK and the Node environment to get up and running fast - however - you can find a list of SDK's for server development [here](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#model-context-protocol-servers).

## Requirements:

1. [Node](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
1. TypeScript: OPTIONAL
1. [NASA APIKey](https://api.nasa.gov): OPTIONAL - you'll still be able to use this server without an API Key but the call limit is reduced greatly.

## Instructions

1. Navigate to the SRC project and run `npm install` to set up the environment. The Node package.json has [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk), typescript and @types/node associated.

2. Navigate to the index.ts file. This is the basis of the MCP server - it's including the packages to utilize Prompts, Tools and Resources, the transport method for connecting the server to a client and providing a name.

   Try to use Copilot to create a tool by having the agent use the following command:

   ```
   #fetch https://github.com/modelcontextprotocol/typescript-sdk

   Please add a tool to provide a friendly greeting
   ```

   This will let your Copilot agent read the Typescript SDK documentation and learn how to add a Tool to your MCP Server to get you started.

3. Now that we've added a tool - let's test it out. First run `npm run build`, then run the below code to launch the [MCP Inspector tool](https://modelcontextprotocol.io/docs/tools/inspector). Using the Inspector Tool you can test Tools, Prompts and Resources to make sure they function before integrating them with a client.

```
npx @modelcontextprotocol/inspector node index.js
```

4. One of the reasons we use and define MCP servers is to engage external systems. In this tutorial we'll show you how to set up the server to call the APOD NASA API. Add the following line of code underneath the import statements. If you decided to get your own NASA APIKey, you can add this to a `.env` file.

```
// Securely get NASA API key from environment variable
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
```

5. Now to add the functionality for the tool. There are 2 ways to do this:

<details>
<summary> 1. Writing the tool manually while checking the Typescript SDK documentation and NASA APOD API.</summary>

- [Documentation for Typescript SDK](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#tools)
- [Documentation for NASA APIs](https://api.nasa.gov)

1. The APOD API has several optional parameters and the required APIKey (you can choose to use the demo key we've already set up.). Start by setting up the 'front end' part of the tool, which defines the title, description and input schema:

```typescript
// NASA APOD (Astronomy Picture of the Day) Tool
server.registerTool( // Register the NASA APOD tool
  "nasa-apod", // Tool name
  {
    title: "NASA APOD", // Title for the tool
    description:
      "Get NASA's Astronomy Picture of the Day (APOD) with optional parameters for specific dates, HD images, and more", // Description for the tool - this shows up on the MCP Inspector
    inputSchema: {
      date: z // Zod is a Typescript library and rules. 'date' here is the name of the input value.
        .string() // Type of data expected
        .optional() // Telling us it's optional.
        .describe(
          "Date of image to retrieve (YYYY-MM-DD format). Defaults to today's date. Cannot be before 1995-06-16."
        ) // Giving us an example of what to input. Please note that bc NASA is an American government agency, it's in US time.
    },
  },

```

2. The next part of setting up a tool is to actually define the functionality behind the tool. The APOD API is a simple GET API and can be called with `fetch()` - so we're going to set up a simple async function. Let's also throw in some error handling.

```typescript
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
        content: [ // Specify Content returned.
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
        content: [ // Specify Content returned for error.
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
```

3. Time to test! Run the below command in the terminal to test the tool in the MCP Inspector:
```bash
npm run build && npx @modelcontextprotocol/inspector node index.js
```

4. You should get something like this as a response:
```json
{
  "date": "2025-07-16",
  "explanation": "Would the Rosette Nebula by any other name look as sweet? The bland New General Catalog designation of NGC 2237 doesn't appear to diminish the appearance of this flowery emission nebula, as captured by the Dark Energy Camera (DECam) on the Blanco 4-meter telescope at the NSF's Cerro Tololo Inter-American Observatory in Chile.  Inside the nebula lies an open cluster of bright young stars designated NGC 2244. These stars formed about four million years ago from the nebular material and their stellar winds are clearing a hole in the nebula's center, insulated by a layer of dust and hot gas. Ultraviolet light from the hot cluster stars causes the surrounding nebula to glow. The Rosette Nebula spans about 100 light-years across, lies about 5000 light-years away, and can be seen with a small telescope towards the constellation of the Unicorn (Monoceros).   Open Science: Browse 3,700+ codes in the Astrophysics Source Code Library",
  "hdurl": "https://apod.nasa.gov/apod/image/2507/Rosette_Decam_4000.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "The Rosette Nebula from DECam",
  "url": "https://apod.nasa.gov/apod/image/2507/Rosette_Decam_960.jpg"
}
```


</details>

<details>
<summary> 2. Asking Copilot to add the tool and fetch the documentation in the chat.</summary>

1. Add the following prompt to Copilot Chat in Agent mode:

```
Add a tool to call the APOD API from NASA here: #fetch https://api.nasa.gov AND leverage the Typescript SDK: #fetch https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#tools
```

This prompt will tell Copilot to retrieve the documentation for the API and for the Typescript SDK, which will provide guidance on setting up the tool and package correctly.

2. Review the code generated and test in the MCP inspector by running the following command:

```bash
npm run build && npx @modelcontextprotocol/inspector node index.js
```

</details>
<br>

## Next Steps! 

There are a few different directions to go from here:
* Try adding a Prompt and/or Resource
* Update the tool to actually display the Image based on the returned URL from the APOD API.
* Add additional external resources.