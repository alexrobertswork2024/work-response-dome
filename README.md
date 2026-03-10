# Work Response Dome

Static civic operations dashboard with hardened client-side event handling and CSP-ready architecture.

## Structure

- `index.html/` contains the app source files.

## Run

Open `index.html/index.html` in a browser.

## Security Headers

Use this strict Content Security Policy in production:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; upgrade-insecure-requests;
```

### Nginx

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; upgrade-insecure-requests;" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### Apache

```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "DENY"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

### Node.js (Express)

```js
app.use((req, res, next) => {
	res.setHeader(
		"Content-Security-Policy",
		"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
	);
	res.setHeader("X-Content-Type-Options", "nosniff");
	res.setHeader("X-Frame-Options", "DENY");
	res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
	next();
});
```

### Important Note About Fonts

Current styles import Google Fonts in `index.html/styles.css`. With strict `style-src 'self'`, that import will be blocked.

Options:
- Keep strict CSP and self-host fonts.
- Allow Google Fonts by adding `https://fonts.googleapis.com` to `style-src` and `https://fonts.gstatic.com` to `font-src`.
