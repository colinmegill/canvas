/********** CONSTRUCTORS **********/

var UniversalModel = Backbone.Model.extend({
  initialize: function(){
    console.log('Model [UniversalModel] initialized.');
    this.on('change', function(){
      console.log('customer segment model changed')
    });
  },
  defaults: {
    title: 'foo', 
    color: '#DDDDD',
    description: ''
  } 
});

var UniversalModelView = Backbone.View.extend({
  tagName: 'div',
  className: '',  
  render: function() {
    this.$el.html(this.model.get('title'));
  }
});

var UniversalCollection = Backbone.Collection.extend({
  model: UniversalModel,
  
})

/* i think the problem is that while i'm iterating over all of the models in the collectionview i'm rendering, i'm not iterating over all of the collections and rendering a collection view for each of them. */

var UniversalCollectionView = Backbone.View.extend({
  render: function(){
    var that = this;
    this.collection.each(function(m){
      universalModelView = new UniversalModelView({
        model: m
      })
      universalModelView.render();
      that.$el.append(universalModelView.el)
    });
  },
  events: {
    "submit form": "createNew"
  },
  createNew: function(e){
    e.preventDefault();
    this.collection.add([{"title": $('input[name="title"]').val()}]);
    $('input[name="title"]').val("");
  },
  initialize: function(){
    this.collection.on('add', this.addModel, this)
  },
  addModel: function(model, collection, options){
    universalModelView = new UniversalModelView({
        model: model
      })
      universalModelView.render();
      this.$el.append(universalModelView.el)
  }

})


/********** COLLECTIONS **********/

var segments = new UniversalCollection([

  {title: 'professors with large classrooms'},
  {title: 'internal business communications'},
  {title: 'political communications'},
  {title: 'conference speakers'}

]);

var relationships = new UniversalCollection([

  {title: 'automated through dashboard'},
  {title: 'automated through email'},
  {title: 'hands on for bigger fish'}


  ]);

var channels = new UniversalCollection([

  {title: 'web application'}

  ]);

var revenue = new UniversalCollection([

  {title: 'licensing via polis.io'},
  {title: 'licensing via API'}

  ]);

var valueProp = new UniversalCollection([

  {title: 'people'},
  {title: 'code'}

  ]);

var activities = new UniversalCollection([

  {title: 'coding'},
  {title: 'hustling'}

  ]);

var resources = new UniversalCollection([

  {title: 'people'},
  {title: 'code'}

  ]);

var partners = new UniversalCollection([

  {title: 'identity providers'},
  {title: 'governments'}

  ]);

var costs = new UniversalCollection([

  {title: 'AWS'},
  {title: 'engineering'},
  {title: 'legal'}

  ]);



/********** COLLECTION VIEWS **********/ 



var segmentsView = new UniversalCollectionView({
  collection: segments,
  el: $('#segments')
})

var relationshipsView = new UniversalCollectionView({
  collection: relationships,
  el: $('#relationships')
})

var channelsView = new UniversalCollectionView({
  collection: channels,
  el: $('#channels')
})

var revenueView = new UniversalCollectionView({
  collection: revenue,
  el: $('#revenue')
})

var valuePropView = new UniversalCollectionView({
  collection: valueProp,
  el: $('#valueProp')
})

var activitiesView = new UniversalCollectionView({
  collection: activities,
  el: $('#activities')
})

var resourcesView = new UniversalCollectionView({
  collection: resources,
  el: $('#resources')
})

var partnersView = new UniversalCollectionView({
  collection: partners,
  el: $('#partners')
})

var costsView = new UniversalCollectionView({
  collection: costs,
  el: $('#costs')
})



setInterval( function() {
  $.ajax({
    url: '/api/costs',
    type: 'GET',
  }).then(function(data) {
    console.dir(data);
  });

  $.ajax({
    url: '/api/costs',
    type: 'POST',
    data: {
      time: Date.now()
    }
  });
}, 5000);



/********** FUNCTION CALLS **********/

segmentsView.render()
relationshipsView.render()
channelsView.render()
revenueView.render()
valuePropView.render()
activitiesView.render()
resourcesView.render()
partnersView.render()
costsView.render()


