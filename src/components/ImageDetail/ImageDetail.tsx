import React, { ReactElement, FC, useEffect, useState } from "react";
import { fetchImageDetails, imageDetail, picture } from "../../utils/ImageFetcher";

interface detailProps {
    imageIndex: number | undefined
    setImageIndex: (index: number | undefined) => void
    pictures: picture[]
}

const ImageDetail: FC<detailProps> = ({ imageIndex, setImageIndex, pictures }): ReactElement => {
    const [details, setDetails] = useState<imageDetail | undefined>(undefined)

    useEffect(() => {
        imageIndex && fetchImageDetails(pictures[imageIndex].id).then(
            res => setDetails(res)
        )
    }, [imageIndex])

    const close = () => setImageIndex(undefined)

    const tags = (fullTags: string): string[] => (fullTags.split('#').slice(1))

    const nextImage = () => imageIndex && imageIndex < pictures.length && setImageIndex(imageIndex + 1)
    const prevImage = () => imageIndex && imageIndex > 0 && setImageIndex(imageIndex - 1)
    const shareImage = () => {
        const shareData = {
            title: imageIndex ? pictures[imageIndex].id : '',
            text: 'picture by ' + details?.author,
            url: details?.full_picture,
        }
        navigator.share(shareData)
            .then(response => console.log('image shared.', response))
            .catch(error => console.log('Image wass not shared.', error))
    }

    return (
        <section className={`${imageIndex ? 'absolute' : 'hidden'} w-full px-2`}>
            <div className={`rounded-lg bg-white border-2 w-full p-4 box-shadow`}>
                <h2 className='mb-2'>
                    Picture ID:
                    <strong>
                        {imageIndex && pictures[imageIndex].id}
                    </strong>
                </h2>
                <img src={details?.full_picture} alt={imageIndex ? pictures[imageIndex].id : ''} className='mb-2 object-contain mx-auto border rounded-xl' />
                <p className='mb-2'>
                    Author: {details?.author}
                </p>
                <p className='mb-2'>Camera with which the picture was taken: {details?.camera}</p>
                <div>
                    {details && tags(details.tags)
                        .map((tag, index) => (
                            <a key={index} href={`https://www.facebook.com/hashtag/${tag}`} target='_blank' className='mx-3'>
                                #{tag}
                            </a>
                        ))}
                </div>
                <div className='flex flex-row justify-between mb-8'>
                    <button className='bg-blue-400 rounded px-2 py-1 md:px-4 md:py-2' onClick={prevImage}>
                        Previous Image
                </button>
                    <button className='bg-blue-400 rounded px-2 py-1 md:px-4 md:py-2' onClick={nextImage}>
                        Next Image
                </button>
                </div>
                <div className='flex justify-between'>

                    <button className='rounded p-2 bg-red-400' onClick={close}>
                        Close
                </button>
                    {navigator.share && <button onClick={shareImage} className='rounded-full text-white bg-green-800 h-full p-3'>
                        Share
                </button>}
                </div>
            </div>
        </section >
    )
}

export default ImageDetail