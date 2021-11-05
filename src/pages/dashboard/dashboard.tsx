import { Loader, Text } from 'citric'
import { Vertical } from 'components/spacings/vertical/vertical'
import Widgets from 'containers/widgets/widgets'
import { RemoteComponent } from 'core/utils/loaderMfe'
import React, { ReactElement } from 'react'
import constants from '../../constants/constants'
import strings from '../../constants/strings'
import { useStore } from '../../store/store'
import {
  HomeBody,
  HomeContainer,
  HomeWidgetsContainer,
  LoaderContainer
} from './dashboard-styles'

const Dashboard = (): ReactElement => {
  const {
    ORANGE_STACK,
    INTRODUCTION,
    TEMPLATES,
    SECTION_DESCRIPTION,
    DASHBOARD
  } = strings.PAGES.HOME
  const { store } = useStore()
  const { user } = store
  const { WELCOME: WELCOME_ID } = constants.DATA_TESTID.PAGES.HOME
  const { HOME_PROFILE_MFES } = constants
  const { name } = user

  return (
    <>
      <HomeContainer>
        {!name && (
          <LoaderContainer>
            <Loader color="primary" size="major" />
          </LoaderContainer>
        )}
        {name && (
          <>
            <HomeBody>
              <Text.Body2 weight="semibold" color="color.base.b9">
                {ORANGE_STACK}
              </Text.Body2>
              <Vertical heigth={16} />
              <Text.Display color="color.base.b10" data-testid={WELCOME_ID}>
                {DASHBOARD}
              </Text.Display>
              <Vertical heigth={16} />
              <Text.Subtitle1 color="color.base.b8">
                {INTRODUCTION}
              </Text.Subtitle1>
              <RemoteComponent
                remoteComponent={HOME_PROFILE_MFES.SETUP_DASHBOARD.SYSTEM}
              />
              <Vertical heigth={45} />
              <Text.H1 color="color.base.b9">{TEMPLATES}</Text.H1>
              <Vertical heigth={8} />
              <Text.Body1 weight="regular" color="color.base.b8">
                {SECTION_DESCRIPTION}
              </Text.Body1>
              <Vertical heigth={32} />
              <HomeWidgetsContainer>
                <Widgets />
              </HomeWidgetsContainer>
              <RemoteComponent
                remoteComponent={HOME_PROFILE_MFES.TEAMS_AREA.SYSTEM}
              />
            </HomeBody>
          </>
        )}
      </HomeContainer>
    </>
  )
}

export default Dashboard
