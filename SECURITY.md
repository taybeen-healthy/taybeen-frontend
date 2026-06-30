<!-- markdownlint-disable MD013 MD033 -->

# Security Policy

## Supported Versions

Security updates are actively provided for the following storefront versions:

| Version | Supported |
| ------- | --------- |
| 0.1.x   | Yes       |
| < 0.1   | No        |

## Reporting a Vulnerability

If you discover a security vulnerability, please do not disclose it publicly. Report it directly to our security engineering team:

- **Email**: security@taybeen.com
- We aim to acknowledge reports within 48 hours and provide a fix or mitigation path within 7 days.

## Security Boundaries & Rules

- **Secrets Management**: Never commit API keys, webhook signing secrets, or private keys into source control. Storefront secrets are managed by the sibling backend, while local configuration keys must reside in `.env.local` files (which are git-ignored).
- **Session Tokens Storage**: Store JWT tokens securely. The frontend uses `taybeen_access_token` and `taybeen_refresh_token` stored in HTTP-ready cookie spaces to limit clientside injection paths.
- **Overlay Stacking Order**: Modals and dropdown triggers must maintain clean `z-index` layering boundaries (`z-40` for sticky headers, `z-50` for mobile navigation drawers and sliding cart overlays, and `z-[100]` for modal dialog boxes and alerts) to prevent access clipping or background click leakage.
- **Input Sanitization**: Ensure customer-facing form elements (e.g. shipping address lines, review text areas, partner applications) run validations and type checking before sending payloads to the API.
