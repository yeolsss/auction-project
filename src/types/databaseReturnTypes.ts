export interface User_info {
  user_id: string /* primary key */;
  created_at: string;
  address1?: string;
  address2?: string;
  profile_image?: string;
  user_email: string;
  nickname?: string;
}

export interface Auction_answer {
  auction_answer_id: string /* primary key */;
  created_at: string;
  answer: string;
  user_id: string /* foreign key to user_info.user_id */;
  auction_question_id: string /* foreign key to user_info.user_id */;
  user_info?: User_info;
}

export interface Category {
  category_id?: string /* primary key */;
  created_at?: string;
  category_name: string;
  selected?: boolean;
}

export interface Auction_post {
  auction_like: any;
  auction_id: string /* primary key */;
  created_at: string;
  title: string;
  auction_start_date: string;
  auction_end_date: string;
  product_status: string;
  shipping_type: string;
  upper_limit: number;
  lower_limit: number;
  content: string;
  auction_status: string;
  user_id: string /* foreign key to user_info.user_id */;
  category_id: string /* foreign key to category.category_id */;
  user_info?: User_info;
  category?: Category;
  auction_images?: Auction_images[];
}
export interface Insert_auction_post {
  auction_id?: string /* primary key */;
  created_at?: string;
  title: string;
  auction_start_date: string;
  auction_end_date: string;
  product_status: string;
  shipping_type: string;
  upper_limit: number;
  lower_limit: number;
  content: string;
  auction_status: string;
  user_id: string /* foreign key to user_info.user_id */;
  category_id: string /* foreign key to category.category_id */;
  user_info?: User_info;
  category?: Category;
  auction_images?: Auction_images[];
}
export interface Update_auction_post {
  title: string;
  auction_start_date: string;
  auction_end_date: string;
  product_status: string;
  shipping_type: string;
  upper_limit: number;
  lower_limit: number;
  content: string;
  auction_status: string;
  user_id: string /* foreign key to user_info.user_id */;
  category_id?: string;
}

export interface Auction_images {
  image_id: string /* primary key */;
  created_at: string;
  image_path?: string;
  auction_id: string /* foreign key to auction_post.auction_id */;
  auction_post?: Auction_post;
}

export interface Auction_question {
  auction_question_id: string /* primary key */;
  created_at: string;
  question: string;
  user_id: string /* foreign key to user_info.user_id */;
  auction_id: string /* foreign key to auction_post.auction_id */;
  user_info?: User_info;
  auction_post?: Auction_post;
  auction_answer?: Auction_answer[];
}

export interface Auction_like {
  like_id: string /* primary key */;
  created_at: string;
  user_id: string /* foreign key to user_info.user_id */;
  auction_id: string /* foreign key to auction_post.auction_id */;
  user_info?: User_info;
  auction_post?: Auction_post;
}

export enum ActionOrderBy {
  CREATED_AT = "created_at",
  TITLE = "title",
}

export interface Auction_option {
  searchKeyword?: string;
  categories?: Category[];
  limit?: number;
  offset?: number;
  orderBy?: ActionOrderBy.CREATED_AT | ActionOrderBy.TITLE;
  order?: boolean;
  user_id?: string;
  pageParam?: number;
}

export interface Bids {
  bid_id?: string;
  created_at?: string;
  auction_id: string;
  user_id: string;
  bid_price: number;
  auction_post?: Auction_post;
  user_info?: User_info;
}

export interface Payload<T> {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: string;
  new: T;
  old?: T;
}

export interface MaxBids {
  bid_id: string;
  auction_id: string;
  user_id: string;
  bid_price: number;
  created_at: string;
  user_email: string;
  nickname: string;
}
