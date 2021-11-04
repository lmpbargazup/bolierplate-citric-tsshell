import { fireEvent, RenderResult } from '@testing-library/react'
import React from 'react'
import constants from '../../../../constants/constants'
import renderWithDependencies from '../../../../jest/render-with-dependencies'
import { mockUser } from '../../../../jest/__mocks__/user'
import { NavbarProfile } from './navbar-profile'

const mockKeycloakLogout = jest.fn()

jest.mock('../../../keycloak/keycloak', () => ({
  keycloakLogout: () => mockKeycloakLogout()
}))

type SutType = {
  sut: RenderResult
}

const makeSut = (user = mockUser): SutType => {
  const sut = renderWithDependencies({
    children: <NavbarProfile user={user} />
  })

  return { sut }
}

const {
  NAVBAR_PROFILE_CONTAINER,
  NAVBAR_PROFILE_INITIALS,
  NAVBAR_PROFILE_DROPDOWN,
  NAVBAR_PROFILE_DROPDOWN_NAME,
  NAVBAR_PROFILE_DROPDOWN_EMAIL,
  NAVBAR_PROFILE_DROPDOWN_LOGOUT_BUTTON,
  NAVBAR_PROFILE_DROPDOWN_LINK_TO_PROFILE,
  NAVBAR_PROFILE_PHOTO
} = constants.DATA_TESTID.CONTAINERS.NAVBAR.NAVBAR_PROFILE

const { ADMINISTRATION_PROFILE } = constants.ROUTES

describe('NavbarData component', () => {
  test('should render correctly', () => {
    const { sut } = makeSut()
    expect(sut).toBeTruthy()
  })

  test('should render menu options when mouse click in profile', async () => {
    const { sut } = makeSut()

    let profileDropdown = await sut.findByTestId(NAVBAR_PROFILE_DROPDOWN)
    expect(profileDropdown).not.toBeVisible()

    const profile = sut.getByTestId(NAVBAR_PROFILE_CONTAINER)
    expect(profile).toBeVisible()

    fireEvent.click(profile)

    profileDropdown = await sut.findByTestId(NAVBAR_PROFILE_DROPDOWN)
    expect(profileDropdown).toBeVisible()

    const profileDropdownName = sut.getByTestId(NAVBAR_PROFILE_DROPDOWN_NAME)
    const profileDropdownEmail = sut.getByTestId(NAVBAR_PROFILE_DROPDOWN_EMAIL)

    expect(profileDropdownName).toBeVisible()
    expect(profileDropdownEmail).toBeVisible()
    expect(profileDropdownName.textContent).toBe(mockUser.name)
    expect(profileDropdownEmail.textContent).toBe(mockUser.email)
  })

  test('should hidde menu options when mouse leave profile dropdown', async () => {
    const { sut } = makeSut()

    let profileDropdown = await sut.findByTestId(NAVBAR_PROFILE_DROPDOWN)
    expect(profileDropdown).not.toBeVisible()

    const profile = sut.getByTestId(NAVBAR_PROFILE_CONTAINER)
    expect(profile).toBeVisible()

    fireEvent.click(profile)

    profileDropdown = await sut.findByTestId(NAVBAR_PROFILE_DROPDOWN)
    expect(profileDropdown).toBeVisible()

    fireEvent.mouseLeave(profileDropdown)

    profileDropdown = await sut.findByTestId(NAVBAR_PROFILE_DROPDOWN)
    expect(profileDropdown).not.toBeVisible()
  })

  test('should keycloak logout called after button logout is clicked', async () => {
    const { sut } = makeSut()

    const profile = sut.getByTestId(NAVBAR_PROFILE_CONTAINER)
    expect(profile).toBeVisible()

    fireEvent.click(profile)

    const profileDropdownLogoutButton = await sut.findByTestId(
      NAVBAR_PROFILE_DROPDOWN_LOGOUT_BUTTON
    )
    expect(profileDropdownLogoutButton).toBeVisible()

    fireEvent.click(profileDropdownLogoutButton)

    expect(mockKeycloakLogout).toBeCalled()
  })
})
