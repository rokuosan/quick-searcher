interface ZennArticleList {
    'articles': Array<ZennArticle>,
    'next_page': number
}

export interface ZennArticle{
    'id': string,
    'post_type': string,
    'title': string,
    'slug': string,
    'published': boolean,
    'comments_count': string,
    'liked_count': number,
    'body_letters_count': number,
    'article_type': string,
    'emoji': string,
    'published_at': string,
    'path': string,
    'user': ZennUser,
}

interface ZennUser{
    'id': number,
    'username': string,
    'name': string,
    'avatar_small_url': string,
}

export default ZennArticleList
