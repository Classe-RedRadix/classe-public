import React from 'react'
import Radio from '../Radio'

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    label: {
      name: 'label',
      defaultValue: 'Empresa',
      control: {
        type: 'text'
      },
    },
    isChecked: {
      name: 'isChecked',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
    },
  }
}

export const radio = ({ ...args }) => (
  <Radio
    handleChange={() => { }}
    name=""
    value=""
    {...args}
  />
)
