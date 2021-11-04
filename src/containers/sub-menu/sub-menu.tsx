import { Icon, Text } from 'citric'
import React, { Fragment, useEffect, useState } from 'react'
import { Horizontal } from '../../components/spacings/horizontal/horizontal'
import { Vertical } from '../../components/spacings/vertical/vertical'
import strings from '../../constants/strings'
import { MenuModule } from '../../data/protocols/data/menu'
import { pathCleaner } from '../../utils/strings'
import { history } from '../history/history'
import {
  CloseButtonContainer,
  Container,
  MenuContextContainer,
  MenuHeader,
  MenuItem,
  MenuList,
  MenuSubItemsContainer,
  SubItem,
  SubItemText
} from './sub-menu-styles'

type SubMenuProps = {
  menuOptionSelected: MenuModule
  handleClose: () => void
}

export const SubMenu: React.FC<SubMenuProps> = ({
  handleClose,
  menuOptionSelected
}: SubMenuProps) => {
  const [selectedContext, setSelectedContext] = useState(0)

  const { CLOSE } = strings.CONTAINERS.SUB_MENU

  const handleMenuItemClick = (route: string): void => {
    history.push(route)
    handleClose()
  }

  const verifyIsActiveRoute = (contextRoute?: string): string => {
    return pathCleaner(history.asPath) === contextRoute
      ? 'color.primary.main'
      : 'color.base.b10'
  }

  const getIcon = (contextId?: number): string =>
    selectedContext === contextId ? 'chevron-down' : 'chevron-right'

  const markThisContextSelected = (contextId: number): void => {
    const id = selectedContext === contextId ? 0 : contextId
    setSelectedContext(id)
  }

  useEffect(() => {
    const contexts = menuOptionSelected.contexts
    contexts.forEach((context) => {
      if (history.asPath.includes(context.route)) {
        setSelectedContext(context.id)
      }
    })
  }, [])

  return (
    <>
      {menuOptionSelected.contexts && (
        <Container>
          <MenuHeader>
            <CloseButtonContainer
              data-testid="close-button"
              onClick={handleClose}
            >
              <Icon.Rounded
                name={'arrow-left'}
                color={'color.base.b10'}
                bgColor={'color.base.b8'}
              />
              <Horizontal width={8} />
              <Text.Body1 weight="semibold">{CLOSE}</Text.Body1>
            </CloseButtonContainer>
          </MenuHeader>
          <MenuContextContainer>
            <Text.H3 color="color.base.b8">
              {menuOptionSelected.moduleName}
            </Text.H3>
          </MenuContextContainer>
          <Vertical heigth={32} />
          <MenuList>
            {menuOptionSelected.contexts.map((context) => {
              return (
                <Fragment key={context.id}>
                  {context.contextName === '' && (
                    <>
                      {context.pages.map((page) => {
                        const route = `${menuOptionSelected.route}${
                          page.route && `/${page.route}`
                        }`
                        return (
                          <MenuItem
                            key={page.id}
                            onClick={() => handleMenuItemClick(route)}
                          >
                            <Text.Body1
                              weight="semibold"
                              color={verifyIsActiveRoute(route)}
                            >
                              {page.name}
                            </Text.Body1>
                          </MenuItem>
                        )
                      })}
                    </>
                  )}
                  {context.contextName !== '' && (
                    <>
                      <MenuItem
                        onClick={() => markThisContextSelected(context.id)}
                      >
                        <Text.Body1 weight="semibold">
                          {context.contextName}
                        </Text.Body1>
                        <Icon.Default
                          name={getIcon(context.id)}
                          size="micro"
                          color={'color.base.b10'}
                        />
                      </MenuItem>
                      {context.id === selectedContext && (
                        <MenuSubItemsContainer>
                          {context.pages.map((page) => (
                            <SubItem
                              onClick={() =>
                                handleMenuItemClick(
                                  `${menuOptionSelected.route}/${page.route}`
                                )
                              }
                              key={page.id}
                            >
                              <SubItemText
                                color={verifyIsActiveRoute(
                                  `${menuOptionSelected.route}/${page.route}`
                                )}
                              >
                                {page.name}
                              </SubItemText>
                            </SubItem>
                          ))}
                        </MenuSubItemsContainer>
                      )}
                    </>
                  )}
                </Fragment>
              )
            })}
          </MenuList>
        </Container>
      )}
    </>
  )
}
