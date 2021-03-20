const BlogParagraph = ({content, setParagraph}) => {
  return (
    <>
      <textarea
        required
        value={content}
        onChange={(e) => setParagraph(e.target.value)}
      />
    </>
  );
}
 
export default BlogParagraph;