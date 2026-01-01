export type THeight = {
  imperial: string
  metric: string
}

export type TWeight = {
  imperial: string
  metric: string
}

export type TImage = {
  id: string
  width: number
  height: number
  url: string
  breeds?: TBreed[]
}

export type TBreed = {
  id: number
  name: string
  temperament?: string
  life_span: string
  origin?: string
  bred_for?: string
  breed_group?: string
  height: THeight
  weight: TWeight
  image?: TImage
  reference_image_id: string
  description?: string
}

export type TVote = {
  id: number
  image_id: string
  sub_id?: string
  created_at: string
  value: number // -1 (dislike), 1 (like), 2 (super like)
  country_code?: string
  image?: TImage
}
