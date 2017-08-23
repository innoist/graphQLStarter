//const k = require('loadash');

const graphql = require('graphql');
const axios = require('axios');
const serverPort = "http:///localhost:3000";
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company', //type you are defining, will be string
    fields:{//all the properties that user have
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
    }
});

const UserType = new GraphQLObjectType({
    name: 'User', //type you are defining, will be string
    fields:{//all the properties that user have
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company:{
            type: CompanyType,
            resolve( parentValue,args){
                console.log("ppp",parentValue,args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(resp => resp.data);
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
     fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    }
     }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

