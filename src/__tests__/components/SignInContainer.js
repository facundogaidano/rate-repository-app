/* eslint-env jest */
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { SignInContainer } from '../../components/SignIn'

describe('SignInContainer', () => {
  it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
    const mockSubmit = jest.fn()
    const { getByPlaceholderText, getByTestId } = render(<SignInContainer onSubmit={mockSubmit} />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    fireEvent.changeText(usernameInput, 'Kalle')
    fireEvent.changeText(passwordInput, 'password')

    const submitButton = getByTestId('signInButton')
    fireEvent.press(submitButton)

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled()
      const call = mockSubmit.mock.calls[0][0]
      expect(call.username).toBe('Kalle')
      expect(call.password).toBe('password')
    })
  })
})
