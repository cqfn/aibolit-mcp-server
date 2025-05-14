# MCP Server for Aibolit, Java Code Analyzer

[![DevOps By Rultor.com](https://www.rultor.com/b/cqfn/aibolit-mcp-server)](https://www.rultor.com/p/cqfn/aibolit-mcp-server)

[![make](https://github.com/cqfn/aibolit-mcp-server/actions/workflows/make.yml/badge.svg)](https://github.com/cqfn/aibolit-mcp-server/actions/workflows/make.yml)
[![codecov](https://codecov.io/gh/cqfn/aibolit-mcp-server/graph/badge.svg?token=3dr2Il91wJ)](https://codecov.io/gh/cqfn/aibolit-mcp-server)
[![Hits-of-Code](https://hitsofcode.com/github/cqfn/aibolit-mcp-server)](https://hitsofcode.com/view/github/cqfn/aibolit-mcp-server)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/cqfn/aibolit-mcp-server/blob/master/LICENSE.txt)

If you use AI agents, such as [Claude Code], [Cursor], or [Windsurf],
  for code refactoring, you may enjoy using this [MCP] server.
Your AI agent, when you ask it to "make code better,"
  may wonder what exactly needs to be improved.
Sadly, it may often overlook important problems.
AI agents, by design, pay more attention to cosmetic issues,
  which are "low-hanging fruits" for them.
This [MCP] server will give your agent a hint:
  what is the **most critical design issue** in the code.
Then, the agent will refactor it and fix the issue.

First, install [Node], [Npm], [Python], [Pip], and [aibolit]:

```bash
aibolit --version
```

Then, add this [MCP] server to [Claude Code]
(or simply edit `~/claude.json`, but it's not recommended):

```bash
claude mcp add aibolit npx aibolit-mcp-server@0.0.2
```

Then, restart [Claude Code] and ask it something along these lines:
"Find the most critical design issue in my code base and fix it."

## How to Contribute

To test this project, simply run the following commands
(you'll need [Node] 18+, [Npm], and [GNU make] installed):

```bash
npm install
make
```

If everything builds correctly after your changes, submit a pull request.

[MCP]: https://modelcontextprotocol.io/
[Npm]: https://www.npmjs.com/
[Node]: https://nodejs.org/en
[aibolit]: https://github.com/cqfn/aibolit
[Claude Code]: https://github.com/anthropics/claude-code
[Cursor]: https://www.cursor.com/
[Windsurf]: https://windsurf.com/editor
[GNU make]: https://www.gnu.org/software/make/
[Python]: https://www.python.org/
[Pip]: https://pypi.org/project/pip/
