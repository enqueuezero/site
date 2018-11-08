module.exports = {
  title: 'Enqueue Zero',
  description: 'Enqueue Zero is publishing code principles.',
  themeConfig: {
    repo: 'soasme/enqueuezero',
    editLinks: true,
    sidebar: {
      '/category/': ['algorithm', 'architecture', 'programming', 'utility'],
      '/changelog.html': ['', 'changelog'],
    }
  },
  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-36183732-4'
    },
    '@vuepress/last-updated': {

    },
    '@vuepress/active-header-links': {

    },
    '@vuepress/plugin-search': {
      searchMaxSuggestions: 10
    }
  }
}
