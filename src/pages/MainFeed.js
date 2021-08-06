import React from 'react'
import { Feed, TabView } from '../components'
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { feedTabsList } from '../components/menu-lists'
import { useAuthListener, useDocument } from '../hooks'

export function MainFeed() {
  const [blogs, setBlogs] = useState([])
  const {user} = useAuthListener()
  const userLog = useDocument("users", user.uid)

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
          <TabView.Tabs>
            {feedTabsList.map((tab, index) => (
              <TabView.Tab id={index} key={tab.name} name={tab.name} def={tab.def}>{tab.title}</TabView.Tab> 
            ))}
          </TabView.Tabs>
          <TabView.Slider />
        </TabView.Frame>
        <TabView.Body blogs={blogs} userLog={userLog} showAuthor/>
      </TabView>
    </Feed>
  )
}
  