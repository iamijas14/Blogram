import React, { useState } from 'react'
import { useDatalayer } from '../DataProvider';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as blogID } from 'uuid';

const CreateBlog = () => {
  const [isBlogData, setBlogData] = useState({
    title: '',
    desc: '',
    content: '',
    isChecked: false
  })

  const [isMaxCharLength, setMaxCharLength] = useState(0)

  const [isPopup, setPopup] = useState(false)

  const [{ }, dispatch] = useDatalayer()

  const confirmHandler = () => {
    {
      isBlogData.isChecked ? setPopup(!isPopup) : (
        setBlogData((item) => {
          return { ...item, title: '', desc: '', content: '', isChecked: false }
        })
      )
    }
  }

  const createBlogHandler = () => {
    dispatch({
      type: 'ADD_TO_BLOG',
      item: {
        title: isBlogData.title,
        description: isBlogData.desc,
        content: isBlogData.content,
        id: blogID(),
        isPublish: isBlogData.isChecked
      }
    },
    )
    setBlogData((item) => {
      return { ...item, title: '', desc: '', content: '', isChecked: false }
    })

    setPopup(!isPopup)
  }

  const cancelPopUpHandler = () => {
    setPopup(!isPopup)
    setBlogData((item) => {
      return { ...item, title: '', desc: '', content: '', isChecked: false }
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
              extractHTMLContent(event) <= 2000 && setBlogData((item) => {
                return { ...item, content: event }
              })
            }}
          />
          <div className='char_length_indicator'>{isMaxCharLength}/2000</div>
        </div>

        <div>
          <input
            checked={isBlogData.isChecked}
            type='checkbox'
            onClick={(event) => setBlogData((item) => {
              return { ...item, isChecked: event.target.checked }
            })}
          />
        </div>

        <button
          className='create_blog_btn'
          disabled={(isBlogData.title && isBlogData.desc && isBlogData.content) === ""}
          onClick={confirmHandler}>
          Create Blog
        </button>

        {
          isPopup && (
            <div className='pop_up_screen'>
              <div className='pop_up_container'>
                <p>Are you sure, you want to Publish this blog</p>

                <div className='popup_btn'>
                  <button className='popup_btn_1' onClick={createBlogHandler}>Yes</button>
                  <button className='popup_btn_2' onClick={cancelPopUpHandler}>Cancel</button>
                </div>

              </div>
            </div>
          )
        }

      </div>
    </>
  )
}

export default CreateBlog; 
