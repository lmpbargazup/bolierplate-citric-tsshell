import { render } from '@testing-library/react'

import App from './App'

describe("App component", () => {
  it("should renders correctly", async () => {
    const root = render(<App />)
    expect(root).toBeTruthy()
  })
})
