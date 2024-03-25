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
    path: '/cbl-ionic-docs/markdown-page',
    component: ComponentCreator('/cbl-ionic-docs/markdown-page', 'fc5'),
    exact: true
  },
  {
    path: '/cbl-ionic-docs/docs',
    component: ComponentCreator('/cbl-ionic-docs/docs', '6cf'),
    routes: [
      {
        path: '/cbl-ionic-docs/docs',
        component: ComponentCreator('/cbl-ionic-docs/docs', 'd7b'),
        routes: [
          {
            path: '/cbl-ionic-docs/docs',
            component: ComponentCreator('/cbl-ionic-docs/docs', 'da1'),
            routes: [
              {
                path: '/cbl-ionic-docs/docs/api-reference',
                component: ComponentCreator('/cbl-ionic-docs/docs/api-reference', '4a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/blobs',
                component: ComponentCreator('/cbl-ionic-docs/docs/blobs', 'd86'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/category/data-sync',
                component: ComponentCreator('/cbl-ionic-docs/docs/category/data-sync', '16c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/category/product-notes',
                component: ComponentCreator('/cbl-ionic-docs/docs/category/product-notes', '003'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/category/queries',
                component: ComponentCreator('/cbl-ionic-docs/docs/category/queries', '23f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/category/start-here',
                component: ComponentCreator('/cbl-ionic-docs/docs/category/start-here', 'f72'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/category/troubleshooting',
                component: ComponentCreator('/cbl-ionic-docs/docs/category/troubleshooting', '150'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/database-prebuilt',
                component: ComponentCreator('/cbl-ionic-docs/docs/database-prebuilt', 'f28'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/databases',
                component: ComponentCreator('/cbl-ionic-docs/docs/databases', '5fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/DataSync/capella',
                component: ComponentCreator('/cbl-ionic-docs/docs/DataSync/capella', 'fec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/DataSync/remote-sync-gateway copy',
                component: ComponentCreator('/cbl-ionic-docs/docs/DataSync/remote-sync-gateway copy', 'd69'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/documents',
                component: ComponentCreator('/cbl-ionic-docs/docs/documents', '833'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/full-text-search',
                component: ComponentCreator('/cbl-ionic-docs/docs/full-text-search', '32b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/indexes',
                component: ComponentCreator('/cbl-ionic-docs/docs/indexes', '70f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/intro',
                component: ComponentCreator('/cbl-ionic-docs/docs/intro', 'e4d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/learning-path',
                component: ComponentCreator('/cbl-ionic-docs/docs/learning-path', 'ab0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/migration',
                component: ComponentCreator('/cbl-ionic-docs/docs/migration', '742'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/ProductNotes/compatibility',
                component: ComponentCreator('/cbl-ionic-docs/docs/ProductNotes/compatibility', '71e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/ProductNotes/release-notes',
                component: ComponentCreator('/cbl-ionic-docs/docs/ProductNotes/release-notes', '597'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/ProductNotes/supported-platforms',
                component: ComponentCreator('/cbl-ionic-docs/docs/ProductNotes/supported-platforms', '1d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Queries/live-queries',
                component: ComponentCreator('/cbl-ionic-docs/docs/Queries/live-queries', '80f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Queries/query-builder',
                component: ComponentCreator('/cbl-ionic-docs/docs/Queries/query-builder', '4f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Queries/query-result-set',
                component: ComponentCreator('/cbl-ionic-docs/docs/Queries/query-result-set', '5da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Queries/query-troubleshooeting',
                component: ComponentCreator('/cbl-ionic-docs/docs/Queries/query-troubleshooeting', 'a0c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Queries/sqlplusplus',
                component: ComponentCreator('/cbl-ionic-docs/docs/Queries/sqlplusplus', 'e2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Queries/sqlplusplus-and-query-builder-differences',
                component: ComponentCreator('/cbl-ionic-docs/docs/Queries/sqlplusplus-and-query-builder-differences', '699'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Queries/sqlplusplus-mobile-and-server-differences',
                component: ComponentCreator('/cbl-ionic-docs/docs/Queries/sqlplusplus-mobile-and-server-differences', 'a74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/scopes-collections',
                component: ComponentCreator('/cbl-ionic-docs/docs/scopes-collections', 'ff9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/StartHere/build-run',
                component: ComponentCreator('/cbl-ionic-docs/docs/StartHere/build-run', '459'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/StartHere/install',
                component: ComponentCreator('/cbl-ionic-docs/docs/StartHere/install', 'cdb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/StartHere/prerequisties',
                component: ComponentCreator('/cbl-ionic-docs/docs/StartHere/prerequisties', 'b06'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Troubleshooting/troubleshoot-crashes',
                component: ComponentCreator('/cbl-ionic-docs/docs/Troubleshooting/troubleshoot-crashes', 'cca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Troubleshooting/troubleshoot-queries',
                component: ComponentCreator('/cbl-ionic-docs/docs/Troubleshooting/troubleshoot-queries', '5e1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/Troubleshooting/using-logs',
                component: ComponentCreator('/cbl-ionic-docs/docs/Troubleshooting/using-logs', 'd7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cbl-ionic-docs/docs/typed-data',
                component: ComponentCreator('/cbl-ionic-docs/docs/typed-data', '001'),
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
    path: '/cbl-ionic-docs/',
    component: ComponentCreator('/cbl-ionic-docs/', 'ad4'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
