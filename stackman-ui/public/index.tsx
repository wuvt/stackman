if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  await import('preact/debug');
}

import { render } from 'preact';

import App from '../src/components/App';

render(<App />, document.body);
