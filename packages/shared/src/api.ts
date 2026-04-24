import {
  API_HEALTH_PATH,
  API_PREFIX,
  DEFAULT_DEV_API_ORIGIN,
} from "./constants";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getApiBaseUrl(explicitBaseUrl?: string) {
  const baseUrl = explicitBaseUrl?.trim();

  if (baseUrl) {
    return trimTrailingSlash(baseUrl);
  }

  return `/${API_PREFIX}`;
}

export function getDevApiBaseUrl() {
  return `${DEFAULT_DEV_API_ORIGIN}/${API_PREFIX}`;
}

export function getApiHealthUrl(explicitBaseUrl?: string) {
  return `${getApiBaseUrl(explicitBaseUrl)}/${API_HEALTH_PATH}`;
}
