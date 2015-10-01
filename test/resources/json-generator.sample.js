//noinspection BadExpressionStatementJS
[
  {
    //'repeat:5': {
      _id: '{{objectId().$}}',
      index: '{{index().$}}',
      guid: '{{guid().$}}',
      isActive: '{{bool().$}}',
      balance: '{{floating().min(1000).max(4000).decimal(2).format("$0,0.00").$)}}'
      //  picture: 'http://placehold.it/32x32',
      //  age: '{{integer(20, 40)}}',
      //  eyeColor: '{{random("blue", "brown", "green")}}',
      //  name: {
      //    first: '{{firstName()}}',
      //    last: '{{surname()}}'
      //  },
      //  company: '{{company().toUpperCase()}}',
      //  email: function (g) { // defered function. required other field to be generated: name.first, name.last, company
      //    return (this.name.first + '.' + this.name.last + '@' + this.company + g.domainZone()).toLowerCase();
      //  },
      //  phone: '+1 {{phone()}}',
      //  address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
      //  about: '{{lorem(1, "paragraphs")}}',
      //  registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}', // allow 3rd party???
      //  latitude: '{{floating(-90.000001, 90)}}',
      //  longitude: '{{floating(-180.000001, 180)}}',
      //  tags: [
      //    {
      //      'repeat:7': '{{lorem(1, "words")}}'
      //    },
      //    'custom_tag'
      //  ],
      //  range: range(10), // allow function return value
      //  friends: [
      //    {
      //      'repeat:3': {
      //        id: '{{index()}}',
      //        name: '{{firstName()}} {{surname()}}'
      //      }
      //    }
      //  ],
      //  greeting: function (g) {
      //    return 'Hello, ' + this.name.first + '! You have ' + g.integer(5, 10) + ' unread messages.';
      //  },
      //  favoriteFruit: function (g) {
      //    var fruits = ['apple', 'banana', 'strawberry'];
      //    return fruits[g.integer(0, fruits.length - 1)];
      //  }
    //}
  }
]