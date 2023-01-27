interface QiitaArticle{
    'id': string,
    'title': string,
    'url': string,
    'likes_count': number,
    'tags': Array<QiitaTag>,
    'user': {
        'name': string,
        'id': string
    }
}

interface QiitaTag{
    'name': string
}

export default QiitaArticle
