import { gql } from "@apollo/client"

export const GET_ALL_POST = gql`

query getPostWithName  {
    posts{
      post
      by{
        _id
        name
      }
    }
  }

`

export const GET_POST_BY_ID = gql `

query getPostByQueryVariable ( $postId : ID! ){
  postById( _id : $postId ){
    _id
    by
    post
  }
}

`

// export const GET_USER_BY_ID = gql `

// query getUserByQueryVariable ( $userId : ID!) {
  
//   user(_id: $userId){
//     _id
//     name
//     email
//     password
//     website
//   }
  
// }

// `

export const GET_MY_PROFILE = gql`

query getUserAndPost {
  myprofile{
    _id
    name
    email
    password
    website
    posts {
      _id
      by 
      post
    }
  }
}


`

export const GET_ANOTHER_PROFILE = gql `

query getUserByQueryVariable ( $userId : ID!) {
  
  user(_id: $userId){
    _id
    name
    email
    password
    website
    posts{
      by
      post
    }
  }
  
}


`