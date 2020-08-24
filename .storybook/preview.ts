import { addParameters } from '@storybook/vue'
import { newViewport } from './assets/viewport'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
  viewport: { viewports: newViewport },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
})