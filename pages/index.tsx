import Head from 'next/head'
import { Noto_Sans_JP } from '@next/font/google'
import React, { useEffect, useState } from 'react'
import fetcher from '../libs/fetcher'
import QiitaArticle from '../types/QiitaArticle'
import QiitaArticleCard from '../components/QiitaArticleCard'
import ZennArticleList, { ZennArticle } from '../types/ZennArticle'
import ZennArticleCard from '../components/ZennArticleCard'

const font_medium = Noto_Sans_JP({ weight: '400', subsets: ['latin'] })
const font_bold = Noto_Sans_JP({ weight: '900', subsets: ['latin'] })

export default function Home() {
  const api_url = 'https://qiita.com/api/v2/items'
  // zenn_api?q={word}&order=daily&source=articles&page={number}
  // Common
  const [searchingWord, setSearchingWord] = useState('')

  // Qiita
  const [qiitaArticles, setQiitaArticles] = useState(Array<QiitaArticle>)
  const [qiitaCount, setQiitaCount] = useState(1)
  const [qiitaSort, setQiitaSort] = useState('rel')

  // Zenn
  const [zennArticles, setZennArticles] = useState(Array<ZennArticle>)
  const [zennCount, setZennCount] = useState(1)


  useEffect( () => {
    const q = window.localStorage.getItem('qiita')
    if (q) setQiitaArticles(JSON.parse(q) as Array<QiitaArticle>)
    const z = window.localStorage.getItem('zenn')
    if (z) setZennArticles(JSON.parse(z) as Array<ZennArticle>)
  }, [])



  const getQiitaItems = (word: string, sort: string) => {
    fetcher<Array<QiitaArticle>>(
      `${api_url}?query=${encodeURI(word)}&sort=${sort}`
    )
      .then(items => {
        setQiitaArticles(items)
        window.localStorage.setItem("qiita", JSON.stringify(items))
        console.log(items)
      })
      .catch(err => console.log(err))
  }


  const getZennItems = (word: string) => {

    fetcher<ZennArticleList>(
      `/zenn?q=${encodeURI(word)}&order=daily&source=articles&page=${zennCount}`,{
        mode: 'cors'
      }
    )
      .then(body => {
        setZennArticles(body.articles)
        window.localStorage.setItem("zenn", JSON.stringify(body.articles))
      })
      .catch(err => console.log(err))
  }



  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    e.preventDefault()
    let w = (document.getElementById('search-word') as HTMLInputElement).value
    if(!w) return

    // 検索単語の確定
    const search = w.trim()
    if(!search) return
    setSearchingWord(search)

    // 記事を取得
    getQiitaItems(search, qiitaSort)
    getZennItems(search)
  }


  const handleChangeSelection = (e: React.FormEvent) => {
    e.preventDefault()


    // 現在選択しているoptionを取得
    const elm = e.currentTarget as HTMLSelectElement
    const sort = elm.value

    // Qiitaの記事をoptionに応じてソート
    const list = qiitaArticles.splice(0)
    switch (sort) {
      case 'created':
        list.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
        )
        break
      case 'rel':
        list.sort((a, b) => {
          return b.likes_count - a.likes_count
        }
        )
        break
      case 'stock':
        list.sort((a, b) => {
          return b.stocks_count - a.stocks_count
        }
        )
        break
      default:
        break
    }
    console.log(list)

    // Qiitaの記事を更新
    setQiitaArticles(list)
    window.localStorage.setItem("qiita", JSON.stringify(list))
  }



  return (
    <>
      <Head>
        <title>Quick Searcher</title>
        <meta name="description" content="Quick Searcher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-gray-100 min-h-screen'>
        <div className={'max-w-6xl mx-auto px-4 ' + font_medium}>

          <div className='py-6'>
            <h1 className='text-4xl  font-bold'>Quick Searcher</h1>
          </div>

          <div id='search' className='w-full py-4'>
            <div className='w-full flex border-gray-200 border-2 rounded-lg bg-gray-200'>
              <div className='text-center text-gray-600 text-xl flex items-center p-2'>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input id='search-word' type="text" placeholder='検索' onKeyDown={handleSearchSubmit}
                className='bg-transparent p-2 border-transparent focus:ring-0 focus:border-transparent w-full' />
            </div>
          </div>

          <div id='articles' className='w-full flex justify-evenly flex-wrap'>
            <div className='py-8 max-w-[512px] w-full'>
              <div className='flex justify-between flex-wrap'>
                <h2 className={'text-3xl py-4 ' + font_bold.className}>📗 Qiita Articles</h2>
                <select defaultValue="rel" name="sort" id="sort" onChange={handleChangeSelection}
                  className='bg-transparent border-transparent focus:ring-0 focus:border-transparent select-none'>
                  <option value="created">新着順</option>
                  <option value="rel" >関連順</option>
                  <option value="stock">ストック順</option>
                  <option value="like">いいね数順</option>
                </select>
              </div>
              <div className='grid grid-cols-1 gap-y-4 max-h-[600px] overflow-y-scroll'>
                { qiitaArticles.map((article) =>
                  <QiitaArticleCard article={article} key={article.id}>
                  </QiitaArticleCard>
                )}
              </div>
              <div className='flex justify-around pt-4'>
                <div className='h-12 w-12 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className='h-12 w-12 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <span>{qiitaCount}</span>
                </div>
                <div className='h-12 w-12 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
            <div className='py-8 max-w-[512px] w-full'>
              <h2 className={'text-3xl py-4 ' + font_bold.className}>📘 Zenn Articles</h2>
              <div className='grid grid-cols-1 gap-y-4 max-h-[600px] overflow-y-scroll'>
                { zennArticles.map((article) =>
                  <ZennArticleCard article={article} key={article.id}>
                  </ZennArticleCard>
                )}
              </div>
              <div className='flex justify-around pt-4'>
                <div className='h-12 w-12 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className='h-12 w-12 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <span>{zennCount}</span>
                </div>
                <div className='h-12 w-12 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
