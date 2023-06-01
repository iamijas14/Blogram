import React, { useState } from 'react'
import { useDatalayer } from '../DataProvider';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as blogID } from 'uuid';

const CreateBlog = () => {
  const [isBlogData, setBlogData] = useState({
    title: '',
    desc: '',
    content: ''
  })
  const [isMaxCharLength, setMaxCharLength] = useState(0)

  const [{ }, dispatch] = useDatalayer()
  console.log(blogID())
  const createBlogHandler = () => {
    dispatch({
      type: 'ADD_TO_BLOG',
      item: {
        title: isBlogData.title,
        description: isBlogData.desc,
        content: isBlogData.content,
        id: blogID()
      }
    })
    setBlogData((item) => {
      return { ...item, title: '', desc: '', content: '' }
    })
  }

  const extractHTMLContent = (data) => {
    var span = document.createElement('span');
    span.innerHTML = data;
    const content = span.textContent || span.innerText;
    setMaxCharLength(content.length)
    return content.length
  };

  return (
    <>
      <div className='container'>
        <div className='input_text'>
          <label className='label'>Title</label>
          <input
            autoComplete='off'
            className='input_text_title'
            value={isBlogData.title}
            onChange={(event) => setBlogData((item) => {
              return { ...item, title: event.target.value }
            })}
          />
        </div>

        <div className='input_text'>
          <label className='label'>Description</label>
          <input
            autoComplete='off'
            className='input_text_description'
            value={isBlogData.desc}
            onChange={(event) => setBlogData((item) => {
              return { ...item, desc: event.target.value }
            })}
          />
        </div>

        <div className='input_text'>
          <label className='label'>Content</label>
          <ReactQuill
            className='input_text_content'
            theme="snow"
            value={isBlogData.content}
            onChange={(event) => {
              extractHTMLContent(event) < 2000 && setBlogData((item) => {
                return { ...item, content: event }
              })
            }}
          />
          <div className='char_length_indicator'>{isMaxCharLength}/2000</div>
        </div>

        <button
          className='create_blog_btn'
          disabled={(isBlogData.title && isBlogData.desc && isBlogData.content) === ""}
          onClick={() => createBlogHandler()}>
          Create Blog
        </button>
      </div>
    </>
  )
}

export default CreateBlog; 
