import React, { ReactElement, FC, useState, useEffect } from "react";
import ImageDisplayer from "../../components/ImageDisplayer";
import { fetchImages, picture } from "../../utils/ImageFetcher";


const Main: FC = (): ReactElement => {
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(1)
    const [pictures, setPictures] = useState<picture[]>([])

    useEffect(() => {
        fetchImages(page)
            .then(response => {
                const { pictures, pageCount } = response
                setPictures(pictures)
                setPageCount(pageCount)
            })
    }, [])

    useEffect(() => {
        fetchImages(page)
            .then(response => {
                const { pictures } = response
                setPictures(pictures)
            })

    }, [page])


    return (
        <main className='py-10 px-5'>
            <h1 className='text-xl mb-8'>
                <strong>
                    AgileEngine Interview
                </strong>
            </h1>

            <div className='flex flex-row justify-between mb-8'>
                <button className='bg-blue-400 rounded px-2 py-1 md:px-4 md:py-2' onClick={() => page > 1 && setPage(page - 1)}>
                    Previous
                </button>
                <p>
                    Current page: {page}
                </p>
                <button className='bg-blue-400 rounded px-2 py-1 md:px-4 md:py-2' onClick={() => page < pageCount && setPage(page + 1)}>
                    Next
                </button>
            </div>
            <ImageDisplayer pictures={pictures} />
        </main>
    )
}


export default Main