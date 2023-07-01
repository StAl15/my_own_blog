import React, {useEffect, useMemo, useState} from "react";
import {getRecentPosts, getSimilarPosts} from "@/services";
import moment from "moment";
import Link from "next/link";

const PostWidget = ({categories, slug}) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        return () => {
            if (slug) {
                getSimilarPosts(categories, slug)
                    .then((result) => {
                        setRelatedPosts(result)
                    })
            } else {
                getRecentPosts(categories, slug)
                    .then((result) => setRelatedPosts(result))
            }
        };
    }, [slug]);

    console.log(relatedPosts)

    return (
        <div className={'bg-white shadow-lg rounded-lg p-8 mb-8'}>
            <h3 className={'text-xl mb-8 font-semibold border-b pb-4'}>{slug ? 'Related Posts' : "Recent Posts"}</h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className={'flex items-center w-full mb-4'}>
                    <div className={'w-full flex'}>
                        <img
                            src={post.feuturedImage.url} className={'align-middle rounded-full w-[40px] h-[40px]'}
                            alt={post.title}/>
                        <div className={'flex-grow ml-4'}>
                            <p className={'text-gray-500 font-xs'}>
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <Link key={post.title} href={`/post/${post.slug}`} className={'text-md'}>
                                {post.title}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default PostWidget;
