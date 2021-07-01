import React from 'react'
import { Story, Meta } from '@storybook/react'

import Carousel from '../blocks/Carousel/Carousel'

export default {
  title: 'Example/Carousel',
  component: Carousel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template = (args: JSX.IntrinsicAttributes) => <Carousel {...args} />

export const Primary = Template.bind({})
// @ts-ignore
Primary.args = {
  slides: [
    {
      title: '\n',
      buttonLabel: 'View Collection',
      image:
        'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2Fe93ff90eebc342f8bc74b38d6df2fd72',
      titleLine1: 'Seven',
      titleLine2: 'Collection',
      buttonUrl: '/collections/seven-collection',
    },
    {
      title: 'Another Collection',
      buttonLabel: 'View Collection',
      image:
        'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2F576b32586d34408f8628cfb7a0810b78',
    },
    {
      title: 'Another Collection',
      buttonLabel: 'View Collection',
      image:
        'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2Ff486cbbf5e0b4af18150b1ad3114be16',
      titleLine1: 'other',
      titleLine2: 'collection',
    },
  ],
}
