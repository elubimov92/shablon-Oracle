define(['text!./view.html', './model',
    'text!./metadata.json', 'ojs/ojcomposite'],
  function(view, viewModel, metadata) {
    oj.Composite.register('side-panel',
      {
        metadata: {inline: JSON.parse(metadata)},
        view: {inline: view},
        viewModel: {inline: viewModel}
      });
  }
);