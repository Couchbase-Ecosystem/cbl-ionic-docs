import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/cbl-ionic-docs/__docusaurus/debug',
    component: ComponentCreator('/cbl-ionic-docs/__docusaurus/debug', '5cc'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/__docusaurus/debug/config',
    component: ComponentCreator('/cbl-ionic-docs/__docusaurus/debug/config', 'bf4'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/__docusaurus/debug/content',
    component: ComponentCreator('/cbl-ionic-docs/__docusaurus/debug/content', '0d4'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/cbl-ionic-docs/__docusaurus/debug/globalData', 'd2e'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/cbl-ionic-docs/__docusaurus/debug/metadata', 'a5d'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/__docusaurus/debug/registry',
    component: ComponentCreator('/cbl-ionic-docs/__docusaurus/debug/registry', 'a68'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/__docusaurus/debug/routes',
    component: ComponentCreator('/cbl-ionic-docs/__docusaurus/debug/routes', '01b'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog',
    component: ComponentCreator('/cbl-ionic-docs/blog', '727'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog/archive',
    component: ComponentCreator('/cbl-ionic-docs/blog/archive', '00b'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog/intro-blog-post',
    component: ComponentCreator('/cbl-ionic-docs/blog/intro-blog-post', '5f0'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog/tags',
    component: ComponentCreator('/cbl-ionic-docs/blog/tags', '990'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog/tags/couchbase-lite',
    component: ComponentCreator('/cbl-ionic-docs/blog/tags/couchbase-lite', '1aa'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog/tags/hello',
    component: ComponentCreator('/cbl-ionic-docs/blog/tags/hello', 'bf6'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog/tags/ionic',
    component: ComponentCreator('/cbl-ionic-docs/blog/tags/ionic', 'f6f'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/blog/tags/mobile',
    component: ComponentCreator('/cbl-ionic-docs/blog/tags/mobile', '521'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/',
    component: ComponentCreator('/cbl-ionic-docs/', '908'),
    routes: [
      {
        path: '/cbl-ionic-docs/',
        component: ComponentCreator('/cbl-ionic-docs/', 'ccb'),
        routes: [
          {
            path: '/cbl-ionic-docs/',
            component: ComponentCreator('/cbl-ionic-docs/', 'bd3'),
            routes: [
              {
                path: '/cbl-ionic-docs/api-reference',
                component: ComponentCreator('/cbl-ionic-docs/api-reference', '327'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/blobs',
                component: ComponentCreator('/cbl-ionic-docs/blobs', 'b28'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/category/data-sync',
                component: ComponentCreator('/cbl-ionic-docs/category/data-sync', '638'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/category/product-notes',
                component: ComponentCreator('/cbl-ionic-docs/category/product-notes', '163'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/category/queries',
                component: ComponentCreator('/cbl-ionic-docs/category/queries', '064'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/category/start-here',
                component: ComponentCreator('/cbl-ionic-docs/category/start-here', '6e1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/category/troubleshooting',
                component: ComponentCreator('/cbl-ionic-docs/category/troubleshooting', '67e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/database-prebuilt',
                component: ComponentCreator('/cbl-ionic-docs/database-prebuilt', '5ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/databases',
                component: ComponentCreator('/cbl-ionic-docs/databases', '307'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/DataSync/capella',
                component: ComponentCreator('/cbl-ionic-docs/DataSync/capella', '13f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/DataSync/remote-sync-gateway copy',
                component: ComponentCreator('/cbl-ionic-docs/DataSync/remote-sync-gateway copy', '38d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/documents',
                component: ComponentCreator('/cbl-ionic-docs/documents', '6ff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/full-text-search',
                component: ComponentCreator('/cbl-ionic-docs/full-text-search', '5c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/indexes',
                component: ComponentCreator('/cbl-ionic-docs/indexes', '8ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/learning-path',
                component: ComponentCreator('/cbl-ionic-docs/learning-path', '799'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/migration',
                component: ComponentCreator('/cbl-ionic-docs/migration', 'a35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/ProductNotes/compatibility',
                component: ComponentCreator('/cbl-ionic-docs/ProductNotes/compatibility', '82c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/ProductNotes/release-notes',
                component: ComponentCreator('/cbl-ionic-docs/ProductNotes/release-notes', '6c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/ProductNotes/supported-platforms',
                component: ComponentCreator('/cbl-ionic-docs/ProductNotes/supported-platforms', '396'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Queries/live-queries',
                component: ComponentCreator('/cbl-ionic-docs/Queries/live-queries', '846'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Queries/query-builder',
                component: ComponentCreator('/cbl-ionic-docs/Queries/query-builder', '60c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Queries/query-result-set',
                component: ComponentCreator('/cbl-ionic-docs/Queries/query-result-set', '9c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Queries/query-troubleshooeting',
                component: ComponentCreator('/cbl-ionic-docs/Queries/query-troubleshooeting', '319'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Queries/sqlplusplus',
                component: ComponentCreator('/cbl-ionic-docs/Queries/sqlplusplus', '0a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Queries/sqlplusplus-and-query-builder-differences',
                component: ComponentCreator('/cbl-ionic-docs/Queries/sqlplusplus-and-query-builder-differences', 'ed7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Queries/sqlplusplus-mobile-and-server-differences',
                component: ComponentCreator('/cbl-ionic-docs/Queries/sqlplusplus-mobile-and-server-differences', '74a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/scopes-collections',
                component: ComponentCreator('/cbl-ionic-docs/scopes-collections', '4c7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/StartHere/build-run',
                component: ComponentCreator('/cbl-ionic-docs/StartHere/build-run', '13b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/StartHere/install',
                component: ComponentCreator('/cbl-ionic-docs/StartHere/install', 'd5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/StartHere/prerequisties',
                component: ComponentCreator('/cbl-ionic-docs/StartHere/prerequisties', '880'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Troubleshooting/troubleshoot-crashes',
                component: ComponentCreator('/cbl-ionic-docs/Troubleshooting/troubleshoot-crashes', 'c60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Troubleshooting/troubleshoot-queries',
                component: ComponentCreator('/cbl-ionic-docs/Troubleshooting/troubleshoot-queries', '547'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/Troubleshooting/using-logs',
                component: ComponentCreator('/cbl-ionic-docs/Troubleshooting/using-logs', '7ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/typed-data',
                component: ComponentCreator('/cbl-ionic-docs/typed-data', '2ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/',
                component: ComponentCreator('/cbl-ionic-docs/', 'a94'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
