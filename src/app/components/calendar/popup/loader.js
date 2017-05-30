define(['text!./view.html', './model',
    'text!./metadata.json', 'ojs/ojcomposite'],
  function(view, viewModel, metadata) {
    oj.Composite.register('calendar-popup',
      {
        metadata: {inline: JSON.parse(metadata)},
        view: {inline: view},
        viewModel: {inline: viewModel}
      });
     }
);