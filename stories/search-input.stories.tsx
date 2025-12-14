import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchInput } from '../src/atoms/search-input'

const meta = {
  title: 'Atoms/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input field with integrated search icon for filtering and searching.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-80">
        <SearchInput value={value} onChange={setValue} />
      </div>
    )
  },
}

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-80">
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search users..."
        />
      </div>
    )
  },
}

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState('React')
    return (
      <div className="w-80">
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search libraries..."
        />
      </div>
    )
  },
}

export const FilteringList: Story = {
  render: () => {
    const [query, setQuery] = useState('')
    const items = [
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Elderberry',
      'Fig',
      'Grape',
      'Honeydew',
    ]

    const filtered = items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    )

    return (
      <div className="w-80">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search fruits..."
        />
        <div className="mt-4 space-y-2">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item}
                className="rounded border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-100"
              >
                {item}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No results found</p>
          )}
        </div>
      </div>
    )
  },
}
