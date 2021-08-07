import React, { useState, createContext } from 'react';
import {Container, Title, Link, NoLink, Meta, Group, Text, SmallText} from './styles/card'

const CardContext = createContext();

export default function Card({children, ...restProps}) {
  const [cardFeature, setCardFeature] = useState(false);
  return (
    <CardContext.Provider value={{ cardFeature, setCardFeature }}>
        <Container {...restProps}>{children}</Container>
    </CardContext.Provider>
  )
}

Card.Container = function CardContainer({children,...restProps}) {
  return (<Container {...restProps}>{children}</Container>)
}

Card.Title = function CardTitle({children,...restProps}) {
  return (<Title {...restProps}>{children}</Title>)
}

Card.Text = function CardText({children,...restProps}) {
  return (<Text {...restProps}>{children}</Text>)
}
Card.SmallText = function CardSmallText({children,...restProps}) {
  return (<SmallText {...restProps}>{children}</SmallText>)
}

Card.Meta = function CardMeta({children,...restProps}) {
  return (<Meta {...restProps}>{children}</Meta>)
}

Card.Link = function CardLink({children, ...restProps}) {
  return (<Link {...restProps}>{children}</Link>)
}

Card.NoLink = function CardNoLink({children, ...restProps}) {
  return (<NoLink {...restProps}>{children}</NoLink>)
}

Card.Group = function CardGroup({children,...restProps}) {
  return <Group {...restProps}>{children}</Group>
}

// Feed.Item = function FeedItem({children, user, handleClick, blog,...restProps}) {
//   return (
//     <div className="blog-preview" {...restProps}>
//       <ProfilePicture handleClick={handleClick} photoURL={user.photoURL} size="40px" borderRadius="50%"/> 
//       <Link to={`blogs/${blog.id}`}>
//         <h2>{blog.title}</h2>
//         <p>Written by: {blog.author}</p>
//       </Link>
//       {children}
//     </div>
//   )
// }
