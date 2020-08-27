// * global preview options을 설정합니다.

import { addParameters } from '@storybook/vue'
import { newViewport } from './assets/viewport'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import { injectVueInstance } from '../client/core'
import '../client/assets/css/tailwind.scss'
injectVueInstance()

addParameters({
  viewport: { viewports: newViewport },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
})