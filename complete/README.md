# NASA MCP Server

This MCP server provides access to NASA's APIs, particularly the Astronomy Picture of the Day (APOD) API, along with additional utility tools for enhanced user interaction.

## 📦 Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your environment:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your NASA API key
   # NASA_API_KEY=your_actual_api_key_here
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Run the server:**
   ```bash
   # Production mode
   npm start
   
   # Development mode with MCP Inspector
   npm run dev
   ```

## 🔐 Security: Handling API Keys

### Method 1: Environment Variables (Recommended)

1. **Get your NASA API key:**
   - Visit [https://api.nasa.gov](https://api.nasa.gov)
   - Sign up for a free API key (much higher rate limits than DEMO_KEY)

2. **Set up environment variable:**
   ```bash
   # Option A: Set in your shell
   export NASA_API_KEY="your_actual_api_key_here"
   
   # Option B: Use a .env file (if using dotenv)
   echo "NASA_API_KEY=your_actual_api_key_here" > .env
   ```

3. **Run your server:**
   ```bash
   npm run build
   npm start
   ```

   Or for development with MCP Inspector:
   ```bash
   npm run dev
   ```

### Method 2: Using dotenv (Optional)

If you want to use a `.env` file:

1. **Install dotenv:**
   ```bash
   npm install dotenv
   ```

2. **Update your index.ts:**
   ```typescript
   import 'dotenv/config';
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API key
   ```

### 🚨 Security Best Practices

- **Never commit API keys to version control**
- **Add `.env` to your `.gitignore`**
- **Use environment variables in production**
- **Rotate API keys regularly**
- **Use DEMO_KEY only for testing (30 requests/hour limit)**

## 🚀 Features

### Tools
- **`friendly-greeting`**: Provides a warm, friendly greeting with optional time-of-day context
- **`nasa-apod`**: Fetch NASA's Astronomy Picture of the Day with optional date parameter

### Resources  
- **`nasa-apod-data`**: Direct access to raw NASA APOD JSON data via URI `nasa://apod/{date?}`

### Prompts
- **`analyze-nasa-apod`**: AI prompt template for analyzing and discussing APOD content

## 📁 Project Structure

```
complete/
├── index.ts           # Main MCP server implementation
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
├── build/             # Compiled JavaScript output
└── node_modules/      # Dependencies (after npm install)
```

## 🛠️ Available Scripts

- **`npm install`** - Install project dependencies
- **`npm run build`** - Compile TypeScript to JavaScript
- **`npm start`** - Run the compiled server
- **`npm run dev`** - Run server with MCP Inspector for development

## 📊 Rate Limits

- **With API Key**: 1,000 requests/hour
- **DEMO_KEY**: 30 requests/hour, 50 requests/day per IP

## 🧪 Testing

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test with MCP Inspector (development mode)
npm run dev

# Or test directly
npm start
```

## 🌟 Example Usage

1. **Get a friendly greeting:**
   ```
   Tool: friendly-greeting
   Parameters: { "name": "Alice", "timeOfDay": "morning" }
   ```

2. **Get today's APOD:**
   ```
   Tool: nasa-apod
   Parameters: {}
   ```

3. **Get APOD for specific date:**
   ```
   Tool: nasa-apod  
   Parameters: { "date": "2023-12-25" }
   ```

4. **Access raw data:**
   ```
   Resource: nasa://apod/2023-12-25
   ```
