Meteor.startup(function () {
  console.log('started');
});

Meteor.methods({
  import: function () {
    var path = Npm.require('path');

    //var itemsFile = path.join('../../../../../dumps/dumps/export_item.json');

    //var absoluteFilePath = path.resolve(itemsFile);

    //var items = Npm.require(absoluteFilePath)

    //for (var i = 0; i < items.length; i++) {
    //Items.insert(items[i]);
    //}

    //console.log('done', i, 'items');

    var recipesFile = path.join('../../../../../public/crafting_handler/recipes.json');

    var absoluteRecipeFilePath = path.resolve(recipesFile);
    console.log(absoluteRecipeFilePath);

    var handlers = Npm.require(absoluteRecipeFilePath)

    for (var i = 0; i < handlers.length; i++) {
      var handler = handlers[i];

      console.log('start', handler.name);
      for (var j = 0; j < handler.recipes.length; j++) {
        var recipe = handler.recipes[j];
        recipe.handlerName = handler.name;

        Recipes.insert(recipe);
      }

    }

  },
  //getRecipes: function (output) {

    //var query = {
      //'result.items.id': output.id
    //};

    //if (item.meta) {
      //query['result.items.meta'] = output.meta;
    //};

    //var recipes = Recipes.find(query).fetch();

  //}
});

Meteor.publish('items', function (params) {
  console.log('in publish', params);

  var query = {};
  if (params.query) {
    query.displayName = {
      $regex: new RegExp(params.query, 'i')
    };
  }

  return Items.find(query, {
    limit: 20
  });
});

Meteor.publish('recipes', function (item) {

  var query = {
    'result.items.id': item.id
  };

  if (item.meta) {
    query['result.items.meta'] = item.meta;
  };

  console.log('call query', query);

  return Recipes.find(query);
});
