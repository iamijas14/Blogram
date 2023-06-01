import React, { useState } from 'react'
import { useDatalayer } from '../DataProvider'

const DisplayBlog = () => {
    const [{ blog }] = useDatalayer()

    const [isDisplayblog, setDisplayblog] = useState(false)
    const [detailedBlog, setDetailedBlog] = useState();

    const togglePopup = (id) => {
        setDisplayblog(true);
        const filterData = blog.filter((item) => item.id === id)
        setDetailedBlog(filterData)
        console.log(filterData)
    }

    const extractHTMLContent = (data) => {
        var span = document.createElement('span');
        span.innerHTML = data;
        const content = span.textContent || span.innerText;
        return content
    };

    return (
        <div className='card_wrapper'>
            {blog.map(({ title, description, content, id }, ind) => (
                <div className='card_container' key={ind}>

                    <div className='card_title'>
                        <span>
                            {title.slice(0, 22)}
                        </span>
                        {title.length > 22 && <span>
                            ...
                        </span>}
                    </div>

                    <div className='card_desc'>
                        <span>{description.slice(0, 30)}</span>{description.length > 30 && <span>...</span>}
                    </div>

                    <hr />

                    <div className='card_content'>
                        <span>{extractHTMLContent(content).slice(0, 250)}</span>{extractHTMLContent(content).length > 30 && <span>...</span>}
                    </div>

                    <button className='card_view_btn' onClick={() => togglePopup(id)}>view more ⮕</button>
                </div>
            ))}

            {isDisplayblog && (
                detailedBlog?.map((item) => (
                    <div className='blog_container' key={item.id}>
                        <div className='blog_content'>
                            <h2>{item?.title}</h2>
                            <p>{item?.description}</p>
                            <div className='blog_data' dangerouslySetInnerHTML={{ __html: item?.content }} />
                        </div>
                        <button className='blog_close_btn' onClick={togglePopup}><span>← </span>Go Back</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default DisplayBlog;

