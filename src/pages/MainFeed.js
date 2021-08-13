import React from 'react'
import { Feed, TabView } from '../components'
import { feedTabsList } from '../components/menu-lists'
import { useAuthListener } from '../hooks'

export function MainFeed() {
  const {user} = useAuthListener()
  const qOne = {where: "published", condition: "==", val: true}

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
        <TabView.Body userId={user.uid} qOne={qOne} showAuthor/>
      </TabView>
    </Feed>
  )
}
  