const endpoint = process.argv[2] || `${process.env.CMS_ORIGIN || 'http://127.0.0.1:8787'}/api/health`;

try {
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(8000) });
  const payload = await response.json();
  if (!response.ok || payload.ok !== true) throw new Error(`Unexpected response: ${response.status}`);
  console.log(`AFRUS OAuth healthy: ${endpoint}`);
} catch (error) {
  console.error(`AFRUS OAuth health check failed: ${error.message}`);
  process.exit(1);
}
