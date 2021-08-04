import { InteractionBar } from "../components"
import { GoBackBtn } from "../components/buttons"

export function InteractionBarContainer({id, authorised, blog, history}) {

  return (
    <InteractionBar id={id} blog={blog}>
      <GoBackBtn history={history}/>
      <InteractionBar.Share />
      {
        authorised
        ?
        <InteractionBar.Authorised />
        :
        <>
        <InteractionBar.Comment />
        <InteractionBar.Bookmark />
        <InteractionBar.Like />
        </>
      }
    </InteractionBar>
  )
}
