var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.resource('products', function() {
    this.resource('product', { path: '/:product_id' });
  });
  this.resource('contacts', function() {
    this.resource('contact', { path: '/:contact_id' });
  });
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'images/logo.png',
  time: function() {
  	return (new Date()).toDateString();
  }.property()
});

App.ContactsIndexController = Ember.Controller.extend({
  contactName: 'Anostagia',
  avatar: 'images/avatar.png',
  open: function() {
  	var day = (new Date()).getDay();
  	if (day === 0) {
  	  return 'We are closed on Sunday :(';
  	} else {
  	  return 'We are open today!';
  	}
  }.property()
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
  	return this.store.findAll('product');
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
});

App.Product = DS.Model.extend({
  title: DS.attr('sting'),
  price: DS.attr('number'),
  description: DS.attr('sting'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('sting'),
  reviews: DS.hasMany('review', {async: true}),
  crafter: DS.belongsTo('contact', {async: true})
});

App.Product.FIXTURES = [
  {
  	id: 1,
  	title: 'Flint',
  	price: 99,
  	description: 'Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.',
  	isOnSale: true,
  	image: 'images/products/flint.png',
  	reviews: [100, 101],
  	crafter: 1
  },
  {
  	id: 2,
  	title: 'Kindling',
  	price: 249,
  	description: 'Easily combustible small sticks or twigs used for starting a fire.',
  	isOnSale: false,
  	image: 'images/products/kindling.png',
  	reviews: [],
  	crafter: 2
  }
];

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
});

App.Review.FIXTURES = [
  {
  	id: 100,
  	product: 1,
  	text: 'Started a fire in no time!'
  },
  {
  	id: 101,
  	product: 1,
  	text: 'Not the brightest flame, but warm!'
  }
];

App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  about: DS.attr('string'),
  avatar: DS.attr('string'),
  products: DS.hasMany('product', {async: true})
});

App.Contact.FIXTURES = [
  {
  	id: 1,
    name: 'Giamia',
    about: 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.',
    avatar: 'images/contacts/giamia.png',
    products: [1]
  },
  {
  	id: 2,
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'images/contacts/anostagia.png',
    products: [2]
  }
];


















