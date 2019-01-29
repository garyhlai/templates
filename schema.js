//Schema defines the root query and all the object types (blueprints)
//Every GraphQLObjectType needs to have: 1. a name 2. a field
//Everything here must be a type object

/*
const <objectTypeName> = new GraphQLObjectType({
    name: 'objectName',
    field: {
        property1: {type: GraphQLString},
        property2: {type: ...},
        ...
    }
})
*/

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Hardcoded data, our data array called "customers", later we can change to any database we want
const customers = [
    {id: '1', name: 'Gary Lai', email: 'gary@gmail.com', age:29},
    {id: '2', name: 'David Lee', email: 'david@gmail.com', age:16},
    {id: '3', name: 'Sam Smith', email: 'sam@gmail.com', age:37},
];

// Customer type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    //properties of this type
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

// Root Query
/* A actual root query will look like this where "1" is the argument, asking for a CustomerType, 
and in it what we want (its name, email and age) <-- instead of returning everything like in REST API
{
    customer(id:"1"){
      name,
      email,
      age
    }
  }
 */ 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //for our root query, we want to get this thing named "customer" below
    fields: {
        //customer returns a CustomerType
        customer: {
            type: CustomerType, //defined above
            args: {
                id: {type: GraphQLString}
            },
            //here is what we return for "customer", in this case, the customers with an id that matches the argument
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        },
        //get all customers, an array of objects of type CustomerType
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(){
                return customers;
            }

        }
    }
});




//GraphQLSchema takes a root query
module.exports = new GraphQLSchema({
    query: RootQuery
});