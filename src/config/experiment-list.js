const experimentList = {
  experiments: [
    {
      id: 'devx-experiment-2018',
      title: '',
      subtitle: '',
      description: '',
      url: '',
    },
    {
      id: 'christmas-experiment-2017',
      title: '',
      subtitle: '',
      description: '',
      url: '',
    },
    {
      id: 'devx-experiment-2017',
      title: '',
      subtitle: '',
      description: '',
      url: '',
    },
    {
      id: 'christmas-experiment-2016',
      title: '',
      subtitle: '',
      description: '',
      url: '',
    },
    {
      id: 'rasengan',
      title: '',
      subtitle: '',
      description: '',
      url: '',
    },
  ],

  getProject(id) {
    return experimentList.experiments.find( project => project.id === id );
  },

};

module.exports = experimentList;
