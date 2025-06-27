---
id: peer-to-peer
sidebar_position: 3
---

# Peer-to-Peer Sync

> Description - _Couchbase Lite for Ionic — Synchronizing data changes between devices in a peer-to-peer network_

:::note
All code examples are indicative only. They demonstrate the basic concepts and approaches to using a feature. Use them as inspiration and adapt these examples to best practice when developing applications for your platform.
:::

## Introduction

Couchbase Lite for Ionic provides API support for secure, bi-directional synchronization of data changes between mobile applications in a peer-to-peer network. This allows devices to synchronize data directly with each other without requiring a central server.

The **replicator** is designed to manage replication of documents and document changes between a source and a target database. In a peer-to-peer scenario, each device acts as both a client and a server, enabling direct data synchronization between devices.

The **replicator** is the **Active Peer** (client) and the **URL endpoint listener** is the **Passive Peer** (server). The active peer initiates the replication and the passive peer listens for incoming replication requests.

## Prerequisites

Before implementing peer-to-peer sync, ensure you have:

- Couchbase Lite for Ionic installed in your project
- Network connectivity between devices

## Basic Setup

### Creating a Listener

To set up a listener that other peers can connect to:

```typescript
import { URLEndpointListener } from 'cblite-js';

// Create and start a listener
const listener = await URLEndpointListener.create({
  collections: [{
    databaseName: 'mydb',
    scopeName: '_default',
    name: '_default'
  }],
  port: port, // Choose an available port
  networkInterface: networkInterface, // '0.0.0.0' for all interfaces
});

await listener.start();
console.log(`Listener started on port ${listener.getPort()}`);
```

### Connecting to the Listener

To connect to the listener from another device:

```typescript
import { Replicator, ReplicatorConfiguration, URLEndpoint, ReplicatorType } from 'cblite-js';

const endpoint = new URLEndpoint('ws://192.168.1.100:4988/mydb');
const config = new ReplicatorConfiguration(endpoint);
config.addCollection(collection);
config.setReplicatorType(ReplicatorType.PUSH_AND_PULL);

const replicator = await Replicator.create(config);

// Monitor replication status
const token = await replicator.addChangeListener((change) => {
  console.log('Status:', change.status.getActivityLevel());
  if (change.status.getError()) {
    console.error('Error:', change.status.getError());
  }
});

await replicator.start();
```

## Authentication Options

### Basic Authentication

Basic authentication provides a simple username/password mechanism for securing access to your listener.

#### Server-Side Configuration

```typescript
import { URLEndpointListener } from 'cblite-js';

const listener = await URLEndpointListener.create({
  // ... other listener config
  authenticatorConfig: {
    type: 'basic',
    data: {
      username: 'admin',
      password: 'securepassword123'
    }
  }
});
```

#### Client-Side Configuration

```typescript
import { Replicator, ReplicatorConfiguration, URLEndpoint, BasicAuthenticator } from 'cblite-js';

const endpoint = new URLEndpoint('ws://192.168.1.100:4988/mydb');
const config = new ReplicatorConfiguration(endpoint);
// ... other config

// Set basic authentication
config.setAuthenticator(new BasicAuthenticator('admin', 'securepassword123'));

const replicator = await Replicator.create(config);
```

### Certificate-Based Authentication
:::note
Certificate-based authentication is not yet implemented in the current version.
:::

## TLS Configuration

TLS (Transport Layer Security) encrypts the connection between peers, ensuring that all data transmitted between devices is secure and cannot be intercepted by third parties. Couchbase Lite provides flexible TLS configuration options to meet various security requirements.

:::caution Development Only
For development and testing purposes, you may choose to disable TLS. **This is not recommended for production environments** as it leaves your data vulnerable to interception. To disable TLS, set `disableTLS: true` in your listener configuration.

```typescript
const listener = await URLEndpointListener.create({
  // ... other config
  disableTLS: true  // Only for development!
});
```
:::

### Self-Signed Certificates

Self-signed certificates provide a quick way to enable TLS encryption without requiring a certificate authority (CA). They're ideal for development and testing, though production environments should consider using certificates from a trusted CA.

#### Server Configuration

When creating a self-signed certificate, you'll need to specify:

- `label`: A unique identifier for the certificate
- `expiration`: Certificate validity period (ISO 8601 format)

:::note
On iOS, the expiration date can be in the past without triggering an error. However, on Android, if the expiration date is in the past, an error will be thrown.
:::
- `attributes`: Certificate metadata including organization details

Example configuration:

```typescript
import { URLEndpointListener } from 'cblite-js';

const listener = await URLEndpointListener.create({
  // ... other config
  tlsIdentityConfig: {
    mode: 'selfSigned',
    label: 'my-server-identity',  // Unique identifier for this certificate
    expiration: '2030-01-01T00:00:00.000Z', // Certificate expiration date (ISO 8601 format)
    attributes: {
      certAttrCommonName: 'My Server',       // Server's common name (e.g., hostname)
      certAttrOrganization: 'My Company',    // Your organization name
      certAttrOrganizationUnit: 'Mobile',
      certAttrEmailAddress: 'admin@mycompany.com'
    }
  }
});
```

### Accepting Self-Signed Certificates on Client

When connecting to a server using a self-signed certificate, the client must be configured to trust it. This is typically needed in development and testing environments where you're using self-signed certificates instead of certificates from a trusted Certificate Authority (CA).

#### Client Configuration

```typescript
const config = new ReplicatorConfiguration(endpoint);
// ... other configuration options

// Configure the client to accept self-signed certificates
config.setAcceptOnlySelfSignedCerts(true);
```

### Using Pre-Existing Certificates

For production environments, you might want to use certificates signed by a trusted Certificate Authority (CA) or certificates generated by your organization's PKI. Couchbase Lite supports importing these certificates, though with platform-specific limitations.

:::note Platform Limitations
- **iOS**: Full support for importing existing certificates
- **Android**: Not supported in the current version
:::

#### iOS Implementation

On iOS, you can import existing PKCS#12 (.p12) certificates. This is useful when you need to use certificates issued by your organization's PKI or a public CA.

```typescript
import { URLEndpointListener } from 'cblite-js';

// The certificate should be in PKCS#12 format and Base64 encoded
const pkcs12Data = 'BASE64_ENCODED_PKCS12_CERTIFICATE';

const listener = await URLEndpointListener.create({
  // ... other listener configuration
  tlsIdentityConfig: {
    mode: 'imported',
    label: 'my-imported-identity',  // Unique identifier for this identity
    password: 'your-secure-password', // Password used to protect the PKCS#12 file
    certBase64: pkcs12Data  // Base64 encoded PKCS#12 certificate
  }
});
```

Provide the pinned certificate to the client:

```typescript
import { Replicator, ReplicatorConfiguration, URLEndpoint } from 'cblite-js';

const pinnedCert = 'BASE64_ENCODED_PINNED_CERTIFICATE';

const config = new ReplicatorConfiguration(endpoint);
// ... other config

// Set pinned certificate
config.setPinnedServerCertificate(pinnedCert);
```

### TLS Identity Management

#### Deleting a TLS Identity

```typescript
try {
  await URLEndpointListener.deleteIdentity({ 
    label: 'my-server-identity' 
  });
} catch (error) {
  console.error('Failed to delete identity:', error);
  // On Android this is not supported and will throw an error
}  
```

### Platform-Specific Notes

#### iOS
- Full TLS support including self-signed and imported certificates
- Uses secure keychain for certificate storage

#### Android
- Limited to self-signed certificates
- Cannot import existing certificates
- `deleteIdentity` is a no-op


## Security - Best Practices
 - Always use TLS in production environments
 - Never hardcode credentials in your application
 - Use strong passwords for certificates
 - Rotate certificates periodically
 - Validate server certificates on the client side