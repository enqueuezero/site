module.exports = {
  title: 'Enqueue Zero',
  description: 'Enqueue Zero is publishing code principles.',
  ga: 'UA-36183732-4',
  themeConfig: {
    repo: 'soasme/enqueuezero',
    editLinks: true,
    sidebar: {
      '/category/': ['algorithm', 'architecture', 'programming', 'utility'],
      '/changelog.html': ['', 'changelog'],
    }
  },
  plugins: {
    '@vuepress/plugin-search': {
      searchMaxSuggestions: 5
    }
  }
}
