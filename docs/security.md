# Security Study Notes

The source treats security as part of development.

Important protections covered by the notes:
- Input validation
- Authentication
- Authorization
- Secure password hashing
- API-key and secret protection
- XSS protection
- Injection protection
- CSRF protection where relevant
- CORS
- Rate limiting
- CAPTCHA/bot protection where realistic
- Backups
- HTTPS

A key rule from the source: anything shipped to the browser can generally be inspected by the user, so frontend JavaScript should not be treated as a private place for server secrets.
