import AxiosClient from "./AxiosClient"
import getToken from "./TokenFetcher"

export interface picture {
    id: string,
    cropped_picture: string,
}

export interface imagePage {
    hasMore: boolean,
    page: number,
    pageCount: number,
    pictures: picture[],
}

export const fetchImages = async (page: number): Promise<imagePage> => {
    const { token } = await getToken()
    try {
        const response = await AxiosClient.get('/images', {
            params: { page }, headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw Error(error)
    }
}

export interface imageDetail {
    author: string,
    camera: string,
    full_picture: string,
    tags: string,
}

export const fetchImageDetails = async (id: string): Promise<imageDetail> => {
    const { token } = await getToken()
    try {
        const response = await AxiosClient.get(`/images/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw Error(error)
    }
}