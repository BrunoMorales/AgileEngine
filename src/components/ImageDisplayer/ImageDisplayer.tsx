import React, { ReactElement, FC, useState, } from "react";
import { picture } from "../../utils/ImageFetcher";
import ImageDetail from "../ImageDetail";


interface imageDisplayerProps {
    pictures: picture[]
}


const ImageDisplayer: FC<imageDisplayerProps> = ({ pictures }): ReactElement => {
    const [detailImageIndex, setdetailImageIndex] = useState<number | undefined>(undefined)

    return (
        <section className='flex flex-wrap justify-center'>
            {
                pictures.map((picture, index) =>
                    <button
                        className='rounded-lg overflow-hidden w-1/2 md:w-1/5 lg:w-1/12 lg:mx-2 border-green-600 border flex-grow'
                        onClick={() => setdetailImageIndex(index)}
                    >
                        <img key={index} className='object-contain' src={picture.cropped_picture} alt={picture.id} />
                    </button>
                )
            }
            <ImageDetail imageIndex={detailImageIndex} setImageIndex={setdetailImageIndex} pictures={pictures} />
        </section>
    )
}

export default ImageDisplayer