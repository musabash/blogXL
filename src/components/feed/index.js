import React, { useState, createContext } from 'react';
import { FaChartLine } from "react-icons/fa"
import {Title, Container, Group, Link, Entities, Meta, Item, FeatureText, SubTitle } from './styles/feed'

const FeatureContext = createContext();

function Feed({children, ...restProps}) {
  const [showFeature, setShowFeature] = useState(false);
    const [itemFeature, setItemFeature] = useState(false);
  return (
    <FeatureContext.Provider value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}>
        <Container {...restProps}>{children}</Container>
    </FeatureContext.Provider>
  )
}

Feed.Group = function FeedGroup({children, ...restProps}) {
  return (<Group{...restProps}>{children}</Group>)
}

Feed.Trending = function FeedTrending({children, ...restProps}) {
  return (<Group {...restProps}>
  <FaChartLine />
  {children}
  </Group>)
}

Feed.Title = function FeedTitle({children,...restProps}) {
  return (<Title {...restProps}>{children}</Title>)
}
Feed.Entities = function FeedEntities({children,...restProps}) {
  return (<Entities {...restProps}>{children}</Entities>)
}
Feed.Meta = function FeedMeta({children,...restProps}) {
  return (<Meta {...restProps}>{children}</Meta>)
}

Feed.Discover = function FeedDiscover({children, ...restProps}) {
  return (<div className="feed__discover" {...restProps}>{children}</div>)
}

Feed.All = function FeedAll({children, ...restProps}) {
  return (<div className="feed__all" {...restProps}>{children}</div>)
}

Feed.Link = function FeedLink({children, ...restProps}) {
  return (<Link {...restProps}>{children}</Link>)
}

Feed.Item = function FeedItem({children, ...restProps}) {
  return (<Item {...restProps}>{children}</Item>)
}

Feed.FeatureText = function FeedFeatureText({children, ...restProps}) {
  return (<FeatureText {...restProps}>{children}</FeatureText>)
}

Feed.SubTitle = function FeedSubTitle({children, ...restProps}) {
  return (<SubTitle {...restProps}>{children}</SubTitle>)
}

export default Feed
