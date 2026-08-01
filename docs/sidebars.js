module.exports = {
  tutorialSidebar: [
    'technical-spec',
    {
      items: [
        {
          items: [
            'screens/README',
            'screens/login',
            'screens/goals',
            'screens/new-goal-actions',
            'screens/create-goal',
            'screens/users',
          ],
          label: 'Экраны',
          type: 'category',
        },
        'ui/common-elements',
      ],
      label: 'Документация',
      link: {
        id: 'documentation',
        type: 'doc',
      },
      type: 'category',
    },
  ],
};
