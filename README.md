# NAACT Website

NAACT is a Laravel 12, Inertia, React, and TypeScript website with a public site and an administrator-only dashboard.

## Requirements

- PHP 8.2 or newer with the extensions required by Laravel and the selected database
- Composer 2
- Node.js 22 and npm
- SQLite for local development or MySQL for production

## Local setup

```bash
composer install
npm ci
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan storage:link
npm run build
php artisan serve
```

The default local administrator is `test@test.com` with password `12345678`. These credentials are development-only and the seeder refuses to use them when `APP_ENV=production`.

For active frontend development, run `npm run dev` in a second terminal. `composer dev` also starts the web server, frontend watcher, queue listener, and log viewer together.

## Environment configuration

Keep `.env` private and never commit or include it in a distributable ZIP. Important production values include:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://example.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=database_user
DB_PASSWORD=strong_database_password

ADMIN_NAME="Site Administrator"
ADMIN_EMAIL=private-admin@example.com
ADMIN_PASSWORD=a-unique-password-of-at-least-12-characters

MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=smtp_user
MAIL_PASSWORD=smtp_password
MAIL_SCHEME=tls
MAIL_FROM_ADDRESS=no-reply@example.com
MAIL_FROM_NAME="NAACT"
```

Generate each production `APP_KEY` with `php artisan key:generate`; never reuse or casually rotate it because encrypted data and sessions depend on it. Configure the host's real MySQL and SMTP values. Password reset mail will not reach users while `MAIL_MAILER=log`.

The public disk stores uploaded content under `storage/app/public`. Run `php artisan storage:link` once per deployment location and ensure `storage` and `bootstrap/cache` are writable by PHP.

## Checks before deployment

Run the same checks used by CI:

```bash
composer test
vendor/bin/pint --test
npm run types
npm run lint:check
npm run format:check
npm run build
composer audit --locked --no-interaction
npm audit --omit=dev
```

Resolve reported production dependency vulnerabilities before deployment. If no patched compatible release exists, document the affected feature, compensating controls, and review date rather than silently ignoring the finding. Dependabot or another dependency-update service can supplement, but not replace, these repeatable checks.

Current audit exception: Quill 2.0.3 has a low-severity HTML-export advisory and is still the newest release as of 6 September 2026. Its editor is administrator-only, and all post, event, and programme HTML is sanitized with an explicit server-side allowlist before storage. Recheck this exception during every dependency audit and remove it when a patched Quill release is available.

## Shared-hosting deployment

The application behaves the same whether it reaches the server through Git or a ZIP. Git makes repeat deployments and rollbacks easier; a ZIP is acceptable when shell or repository access is unavailable.

The domain document root must point to the project's `public` directory. Do not expose the repository root, `.env`, `storage`, or `vendor` directly through the web server.

For Git deployment, clone or pull the intended release on the host. For ZIP deployment, build and test locally, include `vendor` and `public/build` if Composer or Node are unavailable on the host, upload into a release directory, and preserve the server's `.env` and persistent `storage/app/public` files.

Run these release commands from the project directory when the host provides terminal access:

```bash
php artisan down
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
php artisan migrate --force
php artisan storage:link
php artisan optimize
php artisan queue:restart
php artisan up
```

Build frontend assets locally with `npm ci && npm run build` before uploading, or run those commands on the server if Node.js is available. Always upload the generated `public/build` directory. Run `php artisan db:seed --force` in production only when creating the first administrator and only after setting safe `ADMIN_*` values. The seeder does not overwrite an existing account.

If a deployment fails, keep the site in maintenance mode, restore the previous code release and database backup, then run `php artisan up`. Database migrations should be reviewed for rollback safety before every production release.

## Queues and scheduled work

The application defaults to the database queue. On a managed server, supervise `php artisan queue:work --tries=3`. On shared hosting, either:

- configure a once-per-minute cron job that runs `php artisan queue:work --stop-when-empty --tries=3`, or
- set `QUEUE_CONNECTION=sync` when background processing is not needed and request latency is acceptable.

Review failures with `php artisan queue:failed`, retry deliberately with `php artisan queue:retry`, and restart workers after deployment. If scheduled commands are added later, configure one cron entry for `php artisan schedule:run` every minute.

## Backups and persistent files

Back up both the database and `storage/app/public`; either one alone is incomplete. Use the host's automated MySQL backups or `mysqldump`, retain encrypted off-server copies, and define daily/weekly retention appropriate to the site. Local SQLite backups should copy `database/database.sqlite` while writes are paused.

Test a restore regularly in a separate environment. Before a risky migration, take an on-demand database backup and verify it is readable. Never overwrite uploaded files during Git pulls or ZIP extraction.

## Logs, monitoring, and health

- Keep `APP_DEBUG=false` in production.
- Rotate and retain `storage/logs/laravel.log` using the host's log rotation or Laravel's daily log channel; monitor disk usage.
- Monitor HTTP status, response time, certificate expiry, queue failures, and storage capacity.
- Use `GET /up` as the application health endpoint. An external uptime monitor should alert when it stops returning HTTP 200.
- Check Laravel and web-server logs after each deployment and configure error alerts through the hosting provider or a monitoring service.
- Verify SMTP delivery and password-reset mail after production mail configuration changes.

## Routine operation

Use `php artisan migrate:status` to confirm schema state and `php artisan about` to review runtime configuration. Clear and rebuild cached configuration after `.env` changes with `php artisan optimize:clear` followed by `php artisan optimize`. Never run `migrate:fresh` against production because it deletes all application data.
