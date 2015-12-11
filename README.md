## How the object should be parsed

Given the schema for the generated object. Named as `A` string
```
{
  field1: '{{random().min(1).max(10).$}}' // random field value
  field2: [
    repeat(5): { // repeater builder
        field21: '{{random().float().min(0).max(1).$}}'
        city: '{{city()}}',
        address: {{address()}},
        full_address: function(gen){
            return [this.address, this.city].join(' ');
        }
    }
  ]
  first_name: '{{firstName()}}',
  last_name: '{{lastName()}}',
  hello: function(gen){ // dynamic value base on current object context
    return ['welcome', this.first_name, this.last_name].join(' ');
  }
}
```

Sketching solutions:

```

compose(
randomValueGenerator,
repeaterGenerator,
functionalGenerator
)(compile)(A)

```





