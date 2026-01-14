# CrowdStrike Falcon RTR Demo

**Primary Purpose**: Demonstrates **OpenC2 export** for SOAR platform autodiscovery of security capabilities.

## Overview

This demo shows how security tools can use SCP's `x-security` extensions to expose their capabilities in an OpenC2-compatible format. SOAR platforms can automatically discover and orchestrate security tools based on this metadata.

## CrowdStrike Falcon RTR

| Property             | Value                               |
| -------------------- | ----------------------------------- |
| **URN**              | `urn:scp:crowdstrike-falcon:rtr`    |
| **Tier**             | 1 (Critical)                        |
| **Actuator Profile** | EDR (Endpoint Detection & Response) |
| **Type**             | Security Tool                       |

## Security Capabilities

The service provides three OpenC2-compatible security capabilities:

### 1. Host Containment

- **Profile**: EDR
- **Actions**: `contain`, `allow`, `query`
- **Targets**: `hostname`, `device_id`
- **Use Case**: Isolate compromised endpoints from network

### 2. Threat Intelligence

- **Profile**: EDR
- **Actions**: `query`
- **Targets**: `ioc`, `hash`, `domain`
- **Use Case**: Query threat indicators and file hashes

### 3. Process Control

- **Profile**: EDR
- **Actions**: `remediate`, `query`
- **Targets**: `process`, `file`
- **Use Case**: Remote shell execution, forensics, remediation

## OpenC2 Export Example

Export security capabilities for SOAR platforms:

```bash
scp-cli scan ./scp-demo/crowdstrike-falcon -e openc2 -o falcon-capabilities.json
```

**Output structure:**

```json
{
  "openc2_version": "1.0",
  "actuators": [
    {
      "actuator_id": "urn:scp:crowdstrike-falcon:rtr",
      "name": "CrowdStrike Falcon RTR",
      "capability": "host-containment",
      "profile": "edr",
      "actions": ["contain", "allow", "query"],
      "targets": ["hostname", "device_id"],
      "api": {
        "type": "rest",
        "contract": "./api/containment.yaml"
      },
      "metadata": {
        "team": "security-operations",
        "tier": 1,
        "domain": "security"
      }
    },
    {
      "actuator_id": "urn:scp:crowdstrike-falcon:rtr",
      "name": "CrowdStrike Falcon RTR",
      "capability": "threat-intelligence",
      "profile": "edr",
      "actions": ["query"],
      "targets": ["ioc", "hash", "domain"],
      "api": {
        "type": "rest",
        "contract": "./api/intel.yaml"
      },
      "metadata": {
        "team": "security-operations",
        "tier": 1,
        "domain": "security"
      }
    },
    {
      "actuator_id": "urn:scp:crowdstrike-falcon:rtr",
      "name": "CrowdStrike Falcon RTR",
      "capability": "process-control",
      "profile": "edr",
      "actions": ["remediate", "query"],
      "targets": ["process", "file"],
      "api": {
        "type": "rest",
        "contract": "./api/rtr.yaml"
      },
      "metadata": {
        "team": "security-operations",
        "tier": 1,
        "domain": "security"
      }
    }
  ],
  "count": 3
}
```

## Key Features Demonstrated

✅ **x-security Extensions**: OpenC2-compatible security metadata in SCP manifests  
✅ **SOAR Autodiscovery**: Structured capability definitions for automated security orchestration  
✅ **Multiple Capabilities**: Single tool providing multiple security functions  
✅ **Actuator Profiles**: EDR, SIEM, SLPF classifications  
✅ **Action-Target Pairs**: Standardized OpenC2 command vocabulary

## Use Cases

**For Security Teams:**

- Document security tool capabilities in machine-readable format
- Enable SOAR platforms to auto-discover available security actions
- Standardize security orchestration across multiple tools

**For SOAR Platforms:**

- Query available actuators via `openc2` export
- Dynamically build playbooks based on discovered capabilities
- Correlate tool actions with OpenC2 command vocabulary

## Other Export Formats

While this demo emphasizes OpenC2, other formats are also available:

```bash
# JSON graph
scp-cli scan ./scp-demo/crowdstrike-falcon -e json -o graph.json
```
