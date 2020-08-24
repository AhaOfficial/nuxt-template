import { addParameters } from '@storybook/vue'
import { newViewport } from './assets/viewport'

addParameters({
  viewport: { viewports: newViewport }
})