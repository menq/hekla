import { Navigation } from 'react-native-navigation';
import { StatusBar } from 'react-native';
import TopBarSearch from '../components/top-bar-search/TopBarSearch';
import Stories from './stories/Stories';
import Story from './story/Story';
import Search from './search/Search';
import Account from './account/Account';
import AccountHidden from './account/Hidden';
import AccountVoted from './account/Voted';
import Reply from './reply/Reply';
import Settings from './settings/Settings';
import SettingsGeneral from './settings/General';
import SettingsAppearance from './settings/Appearance';
import SettingsThemeScreen from './settings/Theme';
import SettingsDonate from './settings/Donate';
import SettingsAbout from './settings/About';
import User from './user/User';
import UserSubmissions from './user/Submissions';
import UserComments from './user/Comments';
import UserFavorites from './user/Favorites';
import IPad from './misc/IPad';
import UI from '../stores/UI';
import Item from '../stores/models/Item';
import prettyNumber from 'utils/prettyNumber';

type IItemType = typeof Item.Type;

export const STORIES_SCREEN = 'hekla.StoriesScreen';
export const STORY_SCREEN = 'hekla.StoryScreen';
export const SEARCH_SCREEN = 'hekla.SearchScreen';
export const ACCOUNT_SCREEN = 'hekla.AccountScreen';
export const ACCOUNT_HIDDEN_SCREEN = 'hekla.AccountHiddenScreen';
export const ACCOUNT_VOTED_SCREEN = 'hekla.AccountVotedScreen';
export const REPLY_SCREEN = 'hekla.ReplyScreen';
export const SETTINGS_SCREEN = 'hekla.SettingsScreen';
export const SETTINGS_GENERAL_SCREEN = 'hekla.SettingsGeneralScreen';
export const SETTINGS_APPEARANCE_SCREEN = 'hekla.SettingsAppearanceScreen';
export const SETTINGS_THEME_SCREEN = 'hekla.SettingsThemeScreen';
export const SETTINGS_ABOUT_SCREEN = 'hekla.SettingsAboutScreen';
export const SETTINGS_DONATE_SCREEN = 'hekla.SettingsDonateScreen';
export const USER_SCREEN = 'hekla.UserScreen';
export const USER_SUBMISSIONS_SCREEN = 'hekla.UserSubmissionsScreen';
export const USER_COMMENTS_SCREEN = 'hekla.UserCommentsScreen';
export const USER_FAVORITES_SCREEN = 'hekla.UserFavoritesScreen';
export const IPAD_SCREEN = 'hekla.IPadScreen';
export const TOP_BAR_SEARCH = 'hekla.TopBarSearch';

export const Screens = new Map();
Screens.set(STORIES_SCREEN, Stories);
Screens.set(STORY_SCREEN, Story);
Screens.set(SEARCH_SCREEN, Search);
Screens.set(ACCOUNT_SCREEN, Account);
Screens.set(ACCOUNT_HIDDEN_SCREEN, AccountHidden);
Screens.set(ACCOUNT_VOTED_SCREEN, AccountVoted);
Screens.set(REPLY_SCREEN, Reply);
Screens.set(SETTINGS_SCREEN, Settings);
Screens.set(SETTINGS_GENERAL_SCREEN, SettingsGeneral);
Screens.set(SETTINGS_APPEARANCE_SCREEN, SettingsAppearance);
Screens.set(SETTINGS_THEME_SCREEN, SettingsThemeScreen);
Screens.set(SETTINGS_ABOUT_SCREEN, SettingsAbout);
Screens.set(SETTINGS_DONATE_SCREEN, SettingsDonate);
Screens.set(USER_SCREEN, User);
Screens.set(USER_SUBMISSIONS_SCREEN, UserSubmissions);
Screens.set(USER_COMMENTS_SCREEN, UserComments);
Screens.set(USER_FAVORITES_SCREEN, UserFavorites);
Screens.set(IPAD_SCREEN, IPad);
Screens.set(TOP_BAR_SEARCH, TopBarSearch);

export const startApp = () => {
  StatusBar.setBarStyle('dark-content', true);
  const isSplitView = UI.isIpad && UI.settings.appearance.iPadSidebarEnabled;

  const tabs = [
    {
      stack: {
        id: 'STORY_SCREEN',
        children: isSplitView ? [{
          component: {
            name: IPAD_SCREEN,
          },
        }] : [{
          component: {
            name: STORIES_SCREEN,
          },
        }],
        options: {
          bottomTab: {
            text: 'Stories',
            testID: 'STORIES_TAB',
            icon: require('assets/icons/25/stories.png'),
            selectedIconColor: 'red',
            selectedTextColor: 'red',
          },
        },
      },
    },
    {
      stack: {
        children: [{
          component: {
            name: ACCOUNT_SCREEN,
          },
        }],
        options: {
          bottomTab: {
            text: 'Account',
            testID: 'ACCOUNT_TAB',
            icon: require('assets/icons/25/user.png'),
          },
        },
      },
    }, {
      stack: {
        children: [{
          component: {
            name: SEARCH_SCREEN,
          },
        }],
        options: {
          bottomTab: {
            text: 'Search',
            testID: 'SEARCH_TAB',
            icon: require('assets/icons/25/search.png'),
          },
        },
      },
    }, {
      stack: {
        children: [{
          component: {
            name: SETTINGS_SCREEN,
          },
        }],
        options: {
          bottomTab: {
            text: 'Settings',
            testID: 'SETTINGS_TAB',
            icon: require('assets/icons/25/settings.png'),
          },
        },
      },
    },
  ];

  if (isSplitView) {
    return Navigation.setRoot({
      root: {
        splitView: {
          id: 'SPLIT_VIEW',
          master: {
            stack: {
              id: 'MASTER_ID',
              children: [
                {
                  component: {
                    name: STORIES_SCREEN,
                  },
                },
              ],
            },
          },
          detail: {
            bottomTabs: {
              children: tabs,
            },
          },
        },
      },
    });
  }

  return Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'ROOT',
        children: tabs,
      },
    },
  });
};

export const replyScreen = (itemId: string, edit: boolean = false) => Navigation.showModal({
  stack: {
    children: [
      {
        component: {
          name: REPLY_SCREEN,
          passProps: {
            itemId,
            edit,
          },
        },
      },
    ],
  },
});

export const userScreen = (id: string) => Navigation.push(UI.componentId, {
  component: {
    name: USER_SCREEN,
    passProps: {
      id,
    },
    options: {
      topBar: {
        title: {
          text: id,
        },
      },
    },
  },
});

export const userSubmissionsScreen = (userId: string) => Navigation.push(UI.componentId, {
  component: {
    name: USER_SUBMISSIONS_SCREEN,
    passProps: {
      userId,
    },
  },
});

export const userCommentsScreen = (userId: string) => Navigation.push(UI.componentId, {
  component: {
    name: USER_COMMENTS_SCREEN,
    passProps: {
      userId,
    },
  },
});

export const userFavoritesScreen = (userId: string) => Navigation.push(UI.componentId, {
  component: {
    name: USER_FAVORITES_SCREEN,
    passProps: {
      userId,
    },
  },
});

export const accountHiddenScreen = () => Navigation.push(UI.componentId, {
  component: {
    name: ACCOUNT_HIDDEN_SCREEN,
  },
});

export const accountVotedScreen = (userId: string) => Navigation.push(UI.componentId, {
  component: {
    name: ACCOUNT_VOTED_SCREEN,
    passProps: {
      userId,
    },
  },
});

export const storyScreen = async (story: IItemType | string, reactTag?: number) => {
  const isSplitView = UI.isIpad && UI.settings.appearance.iPadSidebarEnabled;
  const id = typeof story === 'object' ? story.id : story;
  const comments = typeof story === 'object' ? story.descendants || 0 : null;
  const opts = {
    component: {
      name: STORY_SCREEN,
      passProps: {
        id: story.id,
      },
      options: {
        topBar: {
          title: {
            text: comments ? prettyNumber(comments, 'Comments') : undefined,
          },
        },
        preview: reactTag ? {
          reactTag,
          commit: true,
        } : undefined,
      },
    },
  } as any;

  if (isSplitView) {
    opts.component.options.animate = false;
    await Navigation.popToRoot(UI.iPadComponentId);
    await setTimeout(() => null, 100);
    return Navigation.push(UI.iPadComponentId, opts);
  }

  return Navigation.push(UI.componentId, opts);
};
