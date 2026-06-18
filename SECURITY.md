<!-- markdownlint-disable MD013 MD033 -->

# Security Policy

## Supported Versions

Security updates are actively provided for the following versions:

| Version | Supported |
| ------- | --------- |
| 1.0.x   | Yes       |
| < 1.0   | No        |

## Reporting a Vulnerability

If you discover a security vulnerability, please do not disclose it publicly. Report it directly to our security engineering team:

- **Email**: security@taybeen.com
- We aim to acknowledge reports within 48 hours and provide a fix or mitigation path within 7 days.

## Security Boundaries & Rules

- **Secrets Management**: Never commit API keys, credentials, or private access tokens into source control. All secrets must be mapped via `.env` files.
- **Input Validation**: Client-side forms must validate length, types, and schema boundaries to prevent malformed payloads from being dispatched.
- **Admin Stacking Order**: Modals and dropdown triggers must maintain clean `z-index` layering boundaries (`z-45` for sidebar, `z-[90]` for portal dropdown action lists, and `z-[100]` for modal confirm dialogs) to prevent access clipping or adjacent layer execution.
