interface QiitaArticle{
    'id': string,
    'title': string,
    'url': string,
    'likes_count': number,
    'tags': Array<QiitaTag>,
    'stocks_count': number,
    'created_at': string,
    'user': {
        'name': string,
        'id': string
    }
}

interface QiitaTag{
    'name': string
}

export default QiitaArticle
