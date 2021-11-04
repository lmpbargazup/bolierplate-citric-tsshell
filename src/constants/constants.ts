const PREFIX = ''

const withPrefix = (string: string): string => `${PREFIX}${string}`

const constants = {
  URL: {
    HOST: {
      BASE_URL: process.env.API_HOST
    },
    PLUGIN_MANAGER: {
      BASE_PATH: '/plugin-manager',
      PLUGINS: '/plugins'
    },
    NOTIFICATION_MANAGER: {
      BASE_PATH: '/notification-manager',
      READ: '/read',
      PUBLIC_NOTIFICATIONS: '/public/notifications'
    },
    USER_MANAGER: {
      BASE_PATH: '/user-manager/users',
      CURRENT_USER: '/current-user'
    },
    MENU: {
      BASE_PATH: '/plugin-manager',
      MODULES: '/bff/menu'
    },
    ROUTES: {
      BASE_PATH: '/plugin-manager',
      MODULES: '/routes'
    }
  },
  ROUTES: {
    DASHBOARD: withPrefix('/'),
    IDE: withPrefix('/ide'),
    AUTH: withPrefix('/auth'),
    PAGE_NOT_FOUND: '/404',
    SERVER_ERROR: '/500',
    ADMINISTRATION_PROFILE: '/administration/profile',
    ADMINISTRATION_SETUP: '/administration/setup',
    SLUG: '/[...slug]'
  },
  HEADERS: {
    BEARER: 'Bearer '
  },
  REDUX: {
    APPS: {
      PLATFORM: 'PlatformApp'
    }
  },
  DATA_TESTID: {
    PLUGIN: 'plugin',
    TITLE_CONTAINER: 'title-container',
    CODE_EDITOR: 'code-editor',
    CONTAINERS: {
      NAVBAR: {
        NAVBAR_DATA: {
          CONTAINER: 'navbar-data-container',
          NAME: 'navbar-data-name',
          USERNAME: 'navbar-data-username'
        },
        NAVBAR_PROFILE: {
          NAVBAR_PROFILE_CONTAINER: 'navbar-profile-container',
          NAVBAR_PROFILE_INITIALS: 'navbar-profile-initials',
          NAVBAR_PROFILE_DROPDOWN: 'navbar-profile-dropdown',
          NAVBAR_PROFILE_DROPDOWN_INITIALS: 'navbar-profile-dropdown-initials',
          NAVBAR_PROFILE_DROPDOWN_NAME: 'navbar-profile-dropdown-name',
          NAVBAR_PROFILE_DROPDOWN_EMAIL: 'navbar-profile-dropdown-email',
          NAVBAR_PROFILE_DROPDOWN_LOGOUT_BUTTON:
            'navbar-profile-dropdown-logout-button',
          NAVBAR_PROFILE_DROPDOWN_LINK_TO_PROFILE:
            'navbar-profile-dropdown-link-to-profile',
          NAVBAR_PROFILE_PHOTO: 'navbar-profile-photo'
        },
        NAVBAR_NOTIFICATIONS: {
          NAVBAR_NOTIFICATIONS_CONTAINER: 'navbar-notifications-container',
          NAVBAR_NOTIFICATIONS_ALERT: 'navbar-notifications-alert',
          NAVBAR_NOTIFICATIONS_EMPTY: 'navbar-notifications-empty',
          NAVBAR_NOTIFICATIONS_DROPDOWN: 'navbar-notifications-dropdown',
          NAVBAR_NOTIFICATIONS_MARK_ALL: 'navbar-notifications-mark-all',
          NAVBAR_NOTIFICATION_TITLE: 'navbar-notification-title',
          NAVBAR_NOTIFICATION_TIME: 'navbar-notification-time',
          NAVBAR_NOTIFICATION_MESSAGE: 'navbar-notification-message'
        }
      },
      MENU: {
        MENU_OPTION: 'menu-option',
        MENU_OPTION_ICON_CONTAINER: 'menu-option-icon-container'
      },
      WIDGETS: {
        WIDGETS: 'widgets',
        COMPONENTS: {
          EMPTY_STATE: {
            ILLUSTRATION: 'illustration',
            TITLE: 'empty-title',
            TEXT_NOTHING_TO_SHOW: 'text-nothing-to-show',
            TEXT_TRY_AGAIN: 'text-try-again'
          },
          CARD: {
            LOADING: 'card-loading',
            WIDGET: 'card-widget',
            ERROR: 'card-error',
            ERROR_BUTTON: 'card-error-button',
            WIDGET_CONTAINER: 'card-widget-container'
          }
        }
      }
    },
    PAGES: {
      HOME: {
        WELCOME: 'welcome'
      }
    }
  },
  ALT_IMGS: {
    HOME: 'home'
  },
  MENU: {
    HOME: 'Home'
  },
  HOME_PROFILE_MFES: {
    TEAMS_AREA: {
      SYSTEM: {
        url: process.env.NEXT_PUBLIC_TEAMS_AREA_MFE_URL,
        scope: 'administration_profile',
        module: './module',
        component: 'administration-profile'
      },
      COMPONENT: 'TeamsArea'
    },
    SETUP_DASHBOARD: {
      SYSTEM: {
        url: process.env.NEXT_PUBLIC_SETUP_DASHBOARD_MFE_URL,
        scope: 'administration_profile',
        module: './module',
        component: 'administration-profile'
      },
      COMPONENT: 'SetupDashboard'
    },
    CATALOG: {
      SYSTEM: {
        url: process.env.NEXT_PUBLIC_SETUP_CATALOG_SYSTEM_URL,
        scope: 'catalog',
        module: './module',
        component: '@orange/stacklifecycle-catalog'
      },
      COMPONENT: 'WidgetHome'
    }
  }
}

export default constants
