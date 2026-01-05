# SCP Demo - 3-Tier Application

A demonstration monorepo showing a 3-tier application with SCP manifests.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│     API     │────▶│  Database   │
│   (React)   │     │   (Node)    │     │  (Postgres) │
│   [Tier 2]  │     │   [Tier 1]  │     │   [Tier 1]  │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Services

| Service | Description | Port |
|---------|-------------|------|
| [frontend](./services/frontend) | React web app | 3000 |
| [api](./services/api) | Express REST API | 4000 |
| [database](./services/database) | PostgreSQL database | 5432 |

## Quick Start

```bash
# Start all services
git clone https://github.com/krackenservices/scp-viewer.git
git clone https://github.com/krackenservices/scp-demo.git

cd scp-viewer

make up
V_DATA=../scp-demo/services make scan

http://localhost:3000
```

## SCP Manifests

Each service has an `scp.yaml` manifest describing:
- System identity and classification
- Ownership information
- Provided capabilities
- Dependencies on other services
- Runtime bindings

Use the [SCP Constructor](https://github.com/krackenservices/scp-integrations) to scan and visualize:

```bash
uv run scp-cli scan ./services --export mermaid
```
