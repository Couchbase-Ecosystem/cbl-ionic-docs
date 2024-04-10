---
id: using-logs
sidebar_position: 1
---

# Using Logs for Troubleshooting

> Description — _Couchbase Lite on Ionic — Using Logs for Troubleshooting_  
> Related Content — [Troubleshooting Queries](troubeshoot-queries.md) | [Troubleshooting Crashes](troubleshoot-crashes.md)

:::note
* The retrieval of logs from the device is out of scope of this feature.
* This content applies to the post 2.5 versions. If you are using a Couchbase Lite release prior to 2.5 see Deprecated functionality.
:::

## Introduction

Couchbase Lite provides a robust Logging API — see: API References for Logging classes — which make debugging and troubleshooting easier during development and in production. It delivers flexibility in terms of how logs are generated and retained, whilst also maintaining the level of logging required by Couchbase Support for investigation of issues.

Log output is split into the following streams:

* File based logging

    Here logs are written to separate log files filtered by log level, with each log level supporting individual retention policies.

* Console based logging

    You can independently configure and control console logs, which provides a convenient method of accessing diagnostic information during debugging scenarios. With console logging, you can fine-tune diagnostic output to suit specific debug scenarios, without interfering with any logging required by Couchbase Support for the investigation of issues.

* Custom logging

    For greater flexibility you can implement a custom logging class using the ILogger interface.

## Console based logging

Console based logging is often used to facilitate troubleshooting during development.

Console logs are your go-to resource for diagnostic information. You can easily fine-tune their diagnostic content to meet the needs of a particular debugging scenario, perhaps by increasing the verbosity and-or choosing to focus on messages from a specific domain; to better focus on the problem area.

Changes to console logging are independent of file logging, so you can make change without compromising any files logging streams. It is enabled by default. To change default settings use database’s setLogLevel method to set the required values — see Example 1.

#### Example 1. Change Console Logging Settings

```typescript
database.setLogLevel(LogDomain.ALL, Loglevel.VERBOSE);
```
