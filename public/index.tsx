import { render } from 'preact';

const App = () => <h1>Hi</h1>;

render(<App />, document.getElementById('app') || document.body);
