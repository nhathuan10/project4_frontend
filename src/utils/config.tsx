import { createBrowserHistory } from "@remix-run/router";

export const DOMAIN = 'https://www.google.com/'

export const history = createBrowserHistory({ v5Compat: true })