define(['text!calendar/view.html', 'calendar/model',
    'text!calendar/metadata.json', 'ojs/ojcomposite'],
  function(view, viewModel, metadata) {
    oj.Composite.register('calendar',
      {
        metadata: {inline: JSON.parse(metadata)},
        view: {inline: view},
        viewModel: {inline: viewModel}
      });
     }
);