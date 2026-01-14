# ACMEPay Payment System

A dummy monorepo modeling a real-world payment processing system, used for demonstrating [SCP (System Capability Protocol)](https://github.com/krackenservices/scp-definition) architecture diagrams.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ EXTERNAL UPSTREAMS (call into us)                               │
│   Web/Mobile Checkout, Merchant Backend, Admin Portal, Batch    │
└──────────────────────────────┬──────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│ EDGE (Trust Boundary: Public Edge)                              │
│   ├── api-gateway         Routes to internal services           │
│   └── auth-identity       Authentication & identity             │
└──────────────────────────────┬──────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│ CORE (Trust Boundary: Internal Microservices)                   │
│   ├── checkout-service    Initiates payment flows               │
│   ├── payment-orchestrator  Central payment coordination        │
│   ├── fraud-service       Fraud detection                       │
│   ├── psp-adapter         Payment gateway integration           │
│   ├── webhook-ingress     Receives PSP callbacks                │
│   ├── ledger-service      Transaction ledger                    │
│   ├── notification-service  Email/SMS notifications             │
│   ├── settlement-service  Bank settlements                      │
│   ├── reconciliation-service  Transaction reconciliation        │
│   ├── reporting-service   Analytics & reporting                 │
│   └── event-bus           Kafka-like event backbone             │
└──────────────────────────────┬──────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│ EXTERNAL DOWNSTREAMS (we call out to)                           │
│   PSP Gateway, Fraud Provider, Bank Rails, Messaging, DWH       │
└─────────────────────────────────────────────────────────────────┘
```

## Services

| Layer | Service         | URN                            |
| ----- | --------------- | ------------------------------ |
| Edge  | API Gateway     | `urn:scp:acmepay-gateway`      |
| Edge  | Auth/Identity   | `urn:scp:acmepay-auth`         |
| Core  | Checkout        | `urn:scp:acmepay-checkout`     |
| Core  | Orchestrator    | `urn:scp:acmepay-orchestrator` |
| Core  | Fraud           | `urn:scp:acmepay-fraud`        |
| Core  | PSP Adapter     | `urn:scp:acmepay-psp`          |
| Core  | Webhook Ingress | `urn:scp:acmepay-webhook`      |
| Core  | Ledger          | `urn:scp:acmepay-ledger`       |
| Core  | Notification    | `urn:scp:acmepay-notify`       |
| Core  | Settlement      | `urn:scp:acmepay-settlement`   |
| Core  | Reconciliation  | `urn:scp:acmepay-recon`        |
| Core  | Reporting       | `urn:scp:acmepay-reporting`    |
| Core  | Event Bus       | `urn:scp:acmepay-eventbus`     |

## Usage

Use with [scp-viewer](https://github.com/krackenservices/scp-viewer) to visualize the architecture:

```bash
git clone https://github.com/krackenservices/scp-viewer.git
git clone https://github.com/krackenservices/scp-demo.git

cd scp-viewer
V_DATA=../scp-demo/ACMEPay make scan
```

Use with [scp-cli](https://github.com/krackenservices/scp-cli) to generate diagrams:

```bash
scp-cli scan ./scp-demo/ACMEPay --export mermaid -o acmepay.mmd
```

## Architecture Diagram

```mermaid
flowchart LR

    %% Systems
    acmepay_checkout[["🔴 Checkout Service"]]
    acmepay_orchestrator[["🔴 Payment Orchestrator"]]
    acmepay_eventbus[["🔴 Event Bus"]]
    acmepay_fraud["🟡 Fraud Service"]
    ext_fraud_provider["Ext Fraud Provider"]
    acmepay_ledger[["🔴 Ledger Service"]]
    acmepay_notify["Notification Service"]
    ext_messaging["Ext Messaging"]
    acmepay_psp[["🔴 PSP Adapter"]]
    ext_psp_gateway["Ext Psp Gateway"]
    acmepay_recon["🟡 Reconciliation Service"]
    acmepay_reporting["🟡 Reporting Service"]
    ext_dwh["Ext Dwh"]
    acmepay_settlement[["🔴 Settlement Service"]]
    ext_bank_rails["Ext Bank Rails"]
    acmepay_webhook["🟡 Webhook Ingress"]
    acmepay_gateway[["🔴 API Gateway"]]
    acmepay_auth[["🔴 Auth Identity Service"]]

    %% Direct Dependencies
    acmepay_checkout -->|payment-processing| acmepay_orchestrator
    acmepay_fraud -->|ml-scoring| ext_fraud_provider
    acmepay_ledger -->|unknown| acmepay_eventbus
    acmepay_notify -->|unknown| acmepay_eventbus
    acmepay_notify -->|email-sms-delivery| ext_messaging
    acmepay_orchestrator -->|fraud-check| acmepay_fraud
    acmepay_orchestrator -->|charge-processing| acmepay_psp
    acmepay_orchestrator -->|unknown| acmepay_eventbus
    acmepay_psp -->|payment-processing| ext_psp_gateway
    acmepay_recon -->|unknown| acmepay_eventbus
    acmepay_reporting -->|unknown| acmepay_eventbus
    acmepay_reporting -->|data-export| ext_dwh
    acmepay_settlement -->|unknown| acmepay_eventbus
    acmepay_settlement -->|payout-processing| ext_bank_rails
    acmepay_webhook -->|payment-update| acmepay_orchestrator
    acmepay_gateway -->|token-validation| acmepay_auth
    acmepay_gateway -->|checkout-api| acmepay_checkout
    acmepay_gateway -->|payment-api| acmepay_orchestrator
    acmepay_gateway -->|ledger-query| acmepay_ledger
    acmepay_gateway -->|reporting-api| acmepay_reporting
    acmepay_gateway -->|settlement-query| acmepay_settlement
    acmepay_gateway -->|recon-query| acmepay_recon

    %% Styling
    classDef critical fill:#ff6b6b,stroke:#333,stroke-width:2px
    class acmepay_checkout,acmepay_orchestrator,acmepay_eventbus,acmepay_ledger,acmepay_psp,acmepay_settlement,acmepay_gateway,acmepay_auth critical
```
