/* eslint-disable no-undef */
const config = {
  baseUrl: '/',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  markdown: {
    mermaid: true,
  },
  onBrokenLinks: 'ignore',

  onBrokenMarkdownLinks: 'warn',
  plugins: [
    function removeIncompatibleWebpackProgressPlugin() {
      const isWebpackBarPlugin = (plugin) => {
        const constructorName = plugin?.constructor?.name;
        const options = plugin?.options;

        return (
          constructorName === 'WebpackBarPlugin' ||
          Boolean(
            options &&
            typeof options === 'object' &&
            'name' in options &&
            'color' in options &&
            'reporter' in options &&
            'reporters' in options,
          )
        );
      };

      return {
        configureWebpack(webpackConfig) {
          const initialPlugins = webpackConfig.plugins ?? [];
          const plugins = initialPlugins.filter((plugin) => !isWebpackBarPlugin(plugin));

          if (plugins.length === initialPlugins.length) {
            return {};
          }

          return {
            mergeStrategy: { plugins: 'replace' },
            plugins,
          };
        },
        name: 'remove-incompatible-webpack-progress-plugin',
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        blog: false,
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  tagline: 'Project and product documentation',

  themeConfig: {
    navbar: {
      items: [{ label: 'Документация', position: 'left', to: '/' }],
      title: 'Goals Front Docs',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  title: 'Goals Front Docs',
  url: 'http://localhost',
};

module.exports = config;
