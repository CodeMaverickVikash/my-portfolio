import { useEffect, useState } from "react";

import {
  API_NAME,
  API_PREFIX,
  APP_NAME,
  getApiBaseUrl,
  getApiHealthUrl,
} from "@repo/shared";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";

const features = [
  "Vite-powered React frontend",
  "NestJS API mounted in the same Turborepo",
  "Shared packages for UI and constants",
];

interface HealthResponse {
  status: string;
  timestamp: string;
}

export default function App() {
  const apiBaseUrl = getApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadHealth() {
      try {
        const response = await fetch(getApiHealthUrl(import.meta.env.VITE_API_BASE_URL));

        if (!response.ok) {
          throw new Error(`API request failed with ${response.status}`);
        }

        const payload = (await response.json()) as HealthResponse;

        if (isActive) {
          setHealth(payload);
          setError(null);
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError instanceof Error ? fetchError.message : "Unable to reach the API");
        }
      }
    }

    void loadHealth();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">{APP_NAME}</p>
        <h1>React for web. NestJS for API. One monorepo.</h1>
        <p className="hero-copy">
          The frontend is ready for Vercel and the API is exposed from{" "}
          <Code>{API_PREFIX}</Code> with a shared configuration package.
        </p>
        <div className="hero-actions">
          <Button appName="web" className="primary-button">
            Test shared UI button
          </Button>
          <a
            className="secondary-link"
            href={apiBaseUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open API
          </a>
        </div>
        <div className="status-card">
          <strong>{API_NAME}</strong>
          <p>
            Base URL: <Code>{apiBaseUrl}</Code>
          </p>
          <p>
            Health:{" "}
            <span className={health ? "status-ok" : "status-pending"}>
              {health ? `${health.status} at ${new Date(health.timestamp).toLocaleString()}` : "Checking..."}
            </span>
          </p>
          {error ? <p className="status-error">{error}</p> : null}
        </div>
      </section>

      <section className="grid">
        {features.map((feature) => (
          <Card
            key={feature}
            className="feature-card"
            href="https://turbo.build/repo/docs"
            title={feature}
          >
            Ready for building your portfolio pages and backend routes.
          </Card>
        ))}
      </section>
    </main>
  );
}
