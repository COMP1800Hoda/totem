import { createRoot } from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import GlobalStyles from './styles/GlobalStyles.ts';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <App />
    <GlobalStyles />
  </StyleSheetManager>
);

function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    return isPropValid(propName);
  }
  return true;
}
