import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const workspaceRoot = process.cwd();

const server = new McpServer({
  name: 'playwright-automation-helper',
  version: '1.0.0',
});

async function safeReadDir(relativeDir) {
  const absoluteDir = path.join(workspaceRoot, relativeDir);
  const entries = await readdir(absoluteDir, { withFileTypes: true });

  return entries
    .filter(entry => !entry.name.startsWith('.'))
    .map(entry => ({
      name: entry.name,
      path: path.posix.join(relativeDir, entry.name),
      type: entry.isDirectory() ? 'directory' : 'file',
    }));
}

server.registerTool(
  'workspace_summary',
  {
    description: 'List the main Playwright and Cucumber automation assets in this workspace.',
    inputSchema: {},
  },
  async () => {
    const directories = ['features', 'tests', 'pageobjects', 'utils'];
    const sections = await Promise.all(
      directories.map(async directory => {
        try {
          const items = await safeReadDir(directory);
          return {
            directory,
            items,
          };
        } catch {
          return {
            directory,
            items: [],
          };
        }
      }),
    );

    const text = sections
      .map(section => {
        const lines = section.items.map(item => `- ${item.type}: ${item.path}`);
        return [`${section.directory}:`, ...(lines.length ? lines : ['- missing'])].join('\n');
      })
      .join('\n\n');

    return {
      content: [
        {
          type: 'text',
          text,
        },
      ],
    };
  },
);

server.registerTool(
  'read_project_file',
  {
    description: 'Read a text file from the workspace using a relative path.',
    inputSchema: {
      relativePath: z.string().min(1).describe('Workspace-relative file path, for example tests/ClientApp.spec.js'),
    },
  },
  async ({ relativePath }) => {
    const normalizedPath = path.normalize(relativePath);
    const absolutePath = path.resolve(workspaceRoot, normalizedPath);

    if (!absolutePath.startsWith(workspaceRoot + path.sep) && absolutePath !== workspaceRoot) {
      throw new Error('Path must stay within the workspace.');
    }

    const fileStats = await stat(absolutePath);
    if (!fileStats.isFile()) {
      throw new Error('Path does not point to a file.');
    }

    const content = await readFile(absolutePath, 'utf8');

    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();

server.connect(transport).catch(error => {
  console.error('Failed to start playwright-automation-helper:', error);
  process.exit(1);
});