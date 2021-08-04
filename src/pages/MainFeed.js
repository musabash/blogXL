import React from 'react'
import { Feed, TabView } from '../components'
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { feedTabsList } from '../components/menu-lists'

export function MainFeed() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      setBlogs(snapshot.docs.map(doc => doc.data()))
    })
    return (() => unsubscribe())
  }, [])

  return (
    <Feed>
      <TabView tabs={feedTabsList}>
        <TabView.Frame>
          <Feed.Group>Hello World</Feed.Group>
          <TabView.Tabs>
            {feedTabsList.map((tab, index) => (
              <TabView.Tab id={index} key={tab.name} name={tab.name}>{tab.title}</TabView.Tab> 
            ))}
          </TabView.Tabs>
          <TabView.Slider />
        </TabView.Frame>
        <TabView.Body blogs={blogs} showAuthor/>
      </TabView>
    </Feed>
  )
}
  