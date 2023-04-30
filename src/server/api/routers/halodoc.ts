export interface HaloResult {
    result: Result[]
    next_page: boolean
    total_hits: any
    total_count: any
  }
  
  export interface Result {
    external_id: string
    slug: string
    canon_slug: any
    name: string
    image_url: string
    thumbnail_url: string
    min_price: number
    base_price: number
    selling_unit: string
    prescription_required: boolean
    consultation_required: boolean
    controlled_substance_type?: string
    visual_cues: string[]
    images_map: ImagesMap
    is_promotion_parent: boolean
    general_indication: any
  }
  
  export interface ImagesMap {
    image_url: ImageUrl[]
    thumbnail_url: ThumbnailUrl[]
  }
  
  export interface ImageUrl {
    extension: string
    url: string
  }
  
  export interface ThumbnailUrl {
    extension: string
    url: string
  }
  