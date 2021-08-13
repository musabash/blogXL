import {DashboardActiveElement} from "../../containers"
import UserBlogs from "../user-blogs"
import * as ROUTES from '../../constants/routes'

export const dashboardMenuList = [
    {
      name: "blogs",
      title: "Your Blogs",
      component: <UserBlogs />
    },
    {
      name: "bookmarks",
      title: "Blogs You Bookmarked",
      component: <DashboardActiveElement name="bookmarks" />
    },
    {
      name: "recent",
      title: "Your Recent Views",
      component: <DashboardActiveElement name="recent"/> 
    },
    {
      name: "likes",
      title: "Blogs You Liked",
      component: <DashboardActiveElement name="likes"/>
    },
    {
      name: "comments",
      title: "Blogs You Commented on",
      component: <DashboardActiveElement name="comments"/>
    }
  ]

export const userBlogsTabs = [
    {
      name: "published",
      title: "Published",
      def: function(){return {where: "published", condition: "==", val: true}}
    },
    {
      name: "drafts",
      title: "Drafts",
      def: function(){return {where: "published", condition: "==", val: false}}
    },
    {
      name: "deleted",
      title: "Deleted",
      def: function(){return {where: "deleted", condition: "==", val: true}}
    },
    {
      name: "comments",
      title: "Comments",
      def: function(){return {where: "comments", condition: "!=", val: []}}
    }
  ]
export const feedTabsList = [
    {
      name: "following",
      title: "Follows",
      def: function(arr) {return {where: "authorId", condition: "in", val: arr}}
    },
    {
      name: "all",
      title: "All Blogs",
      def: function(){return {where: "published", condition: "==", val: true}}
    }
  ]

export const menuList = [
  {
    name: 'Dashboard',
    id: 0,
    to: ROUTES.MY_ACTIVITIES
  },
  {
    name: 'Profile Page',
    id: 1,
    to: ROUTES.PROFILE_PAGE
  },
  {
    name: 'Create New Blog',
    id: 2,
    to: ROUTES.CREATE
  },
  {
    name: 'All Blogs',
    id: 3,
    to: ROUTES.BLOGS
  },
  {
    name: 'Reset Password',
    id: 4,
    to: ROUTES.PASSWORD_RESET
  },
]